// Sistema de Indexacao de Conteudo
// Converte arquivos JS em chunks e gera embeddings para o Vectorize

import { generateEmbeddingsBatch, prepareText, estimateTokens, estimateCost } from './embeddings.js';

/**
 * Handler para webhook do GitHub
 * Processa pushes e reindexa arquivos alterados
 * @param {Request} request - HTTP request do webhook
 * @param {object} env - Environment
 * @returns {Promise<Response>} - HTTP response
 */
export async function handleGitHubWebhook(request, env) {
  // Verifica assinatura do webhook
  const signature = request.headers.get('X-Hub-Signature-256');
  if (!await verifyGitHubSignature(request.clone(), signature, env)) {
    return new Response(JSON.stringify({
      error: 'Assinatura invalida'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const payload = await request.json();

  // Apenas processa pushes para main/master
  const ref = payload.ref || '';
  if (!ref.endsWith('/main') && !ref.endsWith('/master')) {
    return new Response(JSON.stringify({
      message: 'Ignorando push para branch diferente de main/master',
      ref
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Identifica arquivos alterados nos commits
  const changedFiles = new Set();
  for (const commit of payload.commits || []) {
    const files = [
      ...(commit.added || []),
      ...(commit.modified || [])
    ];

    files.forEach(f => {
      // Filtra apenas arquivos de conteudo de tenants
      if (f.startsWith('src/data/tenants/') && f.endsWith('.js')) {
        changedFiles.add(f);
      }
    });
  }

  if (changedFiles.size === 0) {
    return new Response(JSON.stringify({
      message: 'Nenhum arquivo de conteudo alterado',
      commits: payload.commits?.length || 0
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Log do processamento
  const webhookLog = {
    timestamp: new Date().toISOString(),
    files: Array.from(changedFiles),
    pusher: payload.pusher?.name || 'unknown',
    commits: payload.commits?.length || 0
  };

  // Salva log no KV (se disponivel)
  if (env.CACHE) {
    try {
      const history = await env.CACHE.get('webhook-history', 'json') || [];
      history.unshift(webhookLog);
      await env.CACHE.put('webhook-history', JSON.stringify(history.slice(0, 50)));
    } catch (e) {
      console.warn('Erro ao salvar log no KV:', e);
    }
  }

  // Processa reindexacao
  // Nota: em ambiente real, isso seria feito em background com ctx.waitUntil()
  const results = await processIndexing(Array.from(changedFiles), env);

  return new Response(JSON.stringify({
    message: 'Reindexacao processada',
    filesProcessed: changedFiles.size,
    log: webhookLog,
    results
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * Handler para indexacao manual
 * @param {Request} request - HTTP request
 * @param {object} env - Environment
 * @returns {Promise<Response>} - HTTP response
 */
export async function handleManualIndex(request, env) {
  try {
    const { tenant, fullReindex = false, files } = await request.json();

    if (!tenant) {
      return new Response(JSON.stringify({
        error: 'Tenant obrigatorio'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Lista arquivos para indexar
    const filesToIndex = files || [
      `src/data/tenants/${tenant}/playbook.js`,
      `src/data/tenants/${tenant}/playbook-expandido.js`,
      `src/data/tenants/${tenant}/objecoes.js`,
      `src/data/tenants/${tenant}/scripts.js`,
      `src/data/tenants/${tenant}/precos.js`,
      `src/data/tenants/${tenant}/agentes.js`
    ];

    let deletedCount = 0;
    if (fullReindex && env.VECTORIZE_INDEX) {
      // Remove vetores existentes do tenant
      deletedCount = await deleteVectorsByTenant(tenant, env);
    }

    const results = await processIndexing(filesToIndex, env, tenant);

    return new Response(JSON.stringify({
      message: fullReindex ? 'Reindexacao completa concluida' : 'Indexacao incremental concluida',
      tenant,
      deletedVectors: deletedCount,
      results
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Manual index error:', error);
    return new Response(JSON.stringify({
      error: 'Erro na indexacao',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Retorna status do indice
 * @param {object} env - Environment
 * @returns {Promise<Response>} - HTTP response
 */
export async function handleIndexStatus(env) {
  try {
    let indexStats = { available: false };

    if (env.VECTORIZE_INDEX) {
      const stats = await env.VECTORIZE_INDEX.describe();
      indexStats = {
        available: true,
        vectorCount: stats.vectorCount,
        dimensions: stats.dimensions,
        metric: stats.metric
      };
    }

    // Busca historico de webhooks
    let webhookHistory = [];
    if (env.CACHE) {
      webhookHistory = await env.CACHE.get('webhook-history', 'json') || [];
    }

    return new Response(JSON.stringify({
      status: 'online',
      index: indexStats,
      lastWebhooks: webhookHistory.slice(0, 5),
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      status: 'error',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Processa indexacao de arquivos
 * @param {string[]} files - Lista de arquivos para indexar
 * @param {object} env - Environment
 * @param {string} tenantOverride - Tenant para override
 * @returns {Promise<Array>} - Resultados do processamento
 */
async function processIndexing(files, env, tenantOverride = null) {
  const results = [];

  if (!env.VECTORIZE_INDEX) {
    return [{ status: 'skipped', reason: 'VECTORIZE_INDEX nao configurado' }];
  }

  if (!env.OPENAI_API_KEY) {
    return [{ status: 'skipped', reason: 'OPENAI_API_KEY nao configurada' }];
  }

  for (const file of files) {
    try {
      // Extrai tenant do path do arquivo
      const tenantMatch = file.match(/tenants\/([^\/]+)\//);
      const tenant = tenantOverride || (tenantMatch ? tenantMatch[1] : null);

      if (!tenant) {
        results.push({ file, status: 'skipped', reason: 'Tenant nao identificado' });
        continue;
      }

      // Carrega e processa conteudo
      const chunks = await loadAndChunkContent(file, tenant, env);

      if (chunks.length === 0) {
        results.push({ file, status: 'skipped', reason: 'Sem conteudo para indexar' });
        continue;
      }

      // Gera embeddings em batch
      const texts = chunks.map(c => c.text);
      const embeddings = await generateEmbeddingsBatch(texts, env);

      // Prepara vetores para upsert
      const vectors = chunks.map((chunk, i) => ({
        id: `${tenant}-${chunk.id}`,
        values: embeddings[i],
        metadata: {
          tenant,
          source: file,
          category: chunk.category,
          title: chunk.title || '',
          content: chunk.text.substring(0, 1000) // Limita metadata a 1000 chars
        }
      }));

      // Upsert no Vectorize em batches de 100
      for (let i = 0; i < vectors.length; i += 100) {
        const batch = vectors.slice(i, i + 100);
        await env.VECTORIZE_INDEX.upsert(batch);
      }

      results.push({
        file,
        status: 'success',
        chunksIndexed: chunks.length,
        tokens: texts.reduce((sum, t) => sum + estimateTokens(t), 0)
      });

    } catch (error) {
      console.error(`Error indexing ${file}:`, error);
      results.push({
        file,
        status: 'error',
        error: error.message
      });
    }
  }

  return results;
}

/**
 * Carrega conteudo do GitHub e divide em chunks
 * Busca o arquivo raw do repositorio e processa
 * @param {string} file - Path do arquivo
 * @param {string} tenant - ID do tenant
 * @param {object} env - Environment com GITHUB_REPO opcional
 * @returns {Promise<Array>} - Chunks para indexacao
 */
async function loadAndChunkContent(file, tenant, env = {}) {
  const fileName = file.split('/').pop().replace('.js', '');
  console.log(`[Indexer] Processando ${fileName} para tenant ${tenant}`);

  // Configuracao do repositorio (pode vir do env ou usar padrao)
  const repoOwner = env.GITHUB_REPO_OWNER || 'papervines';
  const repoName = env.GITHUB_REPO_NAME || 'playbook-vendas';
  const branch = env.GITHUB_BRANCH || 'main';

  // URL raw do GitHub
  const rawUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${file}`;

  try {
    // Busca conteudo do arquivo
    const response = await fetch(rawUrl);

    if (!response.ok) {
      console.warn(`[Indexer] Arquivo nao encontrado: ${rawUrl} (${response.status})`);
      return [];
    }

    const content = await response.text();

    // Processa o conteudo baseado no tipo de arquivo
    return parseJSContent(content, fileName, tenant);

  } catch (error) {
    console.error(`[Indexer] Erro ao carregar ${file}:`, error);
    return [];
  }
}

/**
 * Faz parse de conteudo JS e extrai chunks
 * @param {string} content - Conteudo do arquivo JS
 * @param {string} fileName - Nome do arquivo (sem extensao)
 * @param {string} tenant - ID do tenant
 * @returns {Array} - Chunks extraidos
 */
function parseJSContent(content, fileName, tenant) {
  const chunks = [];

  // Remove comentarios de bloco
  const cleanContent = content.replace(/\/\*[\s\S]*?\*\//g, '');

  // Regex para extrair exports
  const exportRegex = /export\s+const\s+(\w+)\s*=\s*(\{[\s\S]*?\n\};|\[[\s\S]*?\n\];|`[\s\S]*?`;|'[^']*';|"[^"]*";)/g;

  let match;
  while ((match = exportRegex.exec(cleanContent)) !== null) {
    const [, exportName, exportValue] = match;

    try {
      // Tenta extrair chunks baseado no tipo de export
      const extracted = extractChunksFromExport(exportName, exportValue, fileName, tenant);
      chunks.push(...extracted);
    } catch (e) {
      console.warn(`[Indexer] Erro ao processar export ${exportName}:`, e.message);
    }
  }

  // Se nao encontrou exports, tenta processar como conteudo geral
  if (chunks.length === 0) {
    chunks.push({
      id: `${fileName}-content`,
      category: mapFileToCategory(fileName),
      title: fileName,
      text: content.substring(0, 2000), // Limite de seguranca
      tenant
    });
  }

  console.log(`[Indexer] ${fileName}: ${chunks.length} chunks extraidos`);
  return chunks;
}

/**
 * Extrai chunks de um export especifico
 */
function extractChunksFromExport(exportName, exportValue, fileName, tenant) {
  const chunks = [];
  const category = mapFileToCategory(fileName);
  const normalizedName = exportName.toLowerCase();

  // Tenta fazer parse do valor se for objeto/array
  if (exportValue.startsWith('{') || exportValue.startsWith('[')) {
    try {
      // Converte para JSON valido (remove trailing commas, etc)
      const jsonStr = exportValue
        .replace(/,(\s*[}\]])/g, '$1')
        .replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":');

      const parsed = JSON.parse(jsonStr);

      // Processa baseado na estrutura
      if (Array.isArray(parsed)) {
        parsed.forEach((item, idx) => {
          if (typeof item === 'object' && item !== null) {
            chunks.push({
              id: `${fileName}-${exportName}-${idx}`,
              category,
              title: item.titulo || item.nome || item.name || `${exportName} ${idx + 1}`,
              text: JSON.stringify(item, null, 2),
              tenant
            });
          }
        });
      } else if (typeof parsed === 'object') {
        Object.entries(parsed).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            chunks.push({
              id: `${fileName}-${exportName}-${key}`,
              category,
              title: value.titulo || value.nome || key,
              text: JSON.stringify(value, null, 2),
              tenant
            });
          }
        });
      }
    } catch (e) {
      // Se parse falhar, usa o valor como texto
      chunks.push({
        id: `${fileName}-${exportName}`,
        category,
        title: exportName,
        text: exportValue.substring(0, 2000),
        tenant
      });
    }
  } else {
    // String ou outro valor simples
    chunks.push({
      id: `${fileName}-${exportName}`,
      category,
      title: exportName,
      text: exportValue.replace(/^['"`]|['"`]$/g, ''),
      tenant
    });
  }

  return chunks;
}

/**
 * Mapeia nome de arquivo para categoria
 */
function mapFileToCategory(fileName) {
  const categoryMap = {
    'playbook': 'playbook',
    'playbook-expandido': 'playbook',
    'objecoes': 'objecoes',
    'scripts': 'scripts',
    'precos': 'precos',
    'agentes': 'agentes'
  };
  return categoryMap[fileName] || 'geral';
}

/**
 * Remove vetores de um tenant
 * @param {string} tenant - ID do tenant
 * @param {object} env - Environment
 * @returns {Promise<number>} - Quantidade de vetores removidos
 */
async function deleteVectorsByTenant(tenant, env) {
  if (!env.VECTORIZE_INDEX) return 0;

  // Vectorize nao suporta delete por filtro diretamente
  // Estrategia: buscar IDs e deletar em batch
  const dummyVector = new Array(1536).fill(0);

  try {
    const results = await env.VECTORIZE_INDEX.query(dummyVector, {
      topK: 10000,
      filter: { tenant },
      returnMetadata: false,
      returnValues: false
    });

    const ids = results.matches.map(m => m.id);

    if (ids.length > 0) {
      // Vectorize delete em batches
      for (let i = 0; i < ids.length; i += 100) {
        const batch = ids.slice(i, i + 100);
        await env.VECTORIZE_INDEX.deleteByIds(batch);
      }
    }

    return ids.length;
  } catch (error) {
    console.error('Error deleting vectors:', error);
    return 0;
  }
}

/**
 * Verifica assinatura do webhook GitHub
 * @param {Request} request - HTTP request
 * @param {string} signature - Header X-Hub-Signature-256
 * @param {object} env - Environment com GITHUB_WEBHOOK_SECRET
 * @returns {Promise<boolean>} - Se assinatura e valida
 */
async function verifyGitHubSignature(request, signature, env) {
  if (!signature || !env.GITHUB_WEBHOOK_SECRET) {
    console.warn('Missing signature or secret');
    return false;
  }

  try {
    const body = await request.text();
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(env.GITHUB_WEBHOOK_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
    const expectedSig = 'sha256=' + Array.from(new Uint8Array(sig))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return signature === expectedSig;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

// Exporta funcao helper para estimar custos
export function estimateIndexingCost(charCount) {
  const tokens = estimateTokens({ length: charCount });
  return {
    tokens,
    costUSD: estimateCost(tokens)
  };
}
