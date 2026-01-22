/**
 * Worker Principal - Playbook SaaS Multi-tenant com RAG
 *
 * Endpoints:
 * - /api/rag/search    - Busca semantica
 * - /api/tenants       - Lista tenants
 * - /mcp/*             - Endpoint MCP para IAs
 * - /index/webhook     - GitHub webhook
 * - /index/manual      - Indexacao manual
 * - /index/status      - Status do indice
 * - /*                 - Aplicacao principal (existente)
 */

// ============================================
// IMPORTS E CONFIGURACOES
// ============================================

const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;

// Cache de tenants
const tenantCache = new Map();

// ============================================
// HANDLER PRINCIPAL
// ============================================

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Tenant-ID',
    };

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Rotas de API RAG
      if (path.startsWith('/api/rag/')) {
        const response = await handleRAGRoutes(request, env, path);
        return addCorsHeaders(response, corsHeaders);
      }

      // Rotas de indexacao
      if (path.startsWith('/index/')) {
        const response = await handleIndexRoutes(request, env, path);
        return addCorsHeaders(response, corsHeaders);
      }

      // Rotas MCP
      if (path.startsWith('/mcp/')) {
        const response = await handleMCPRoutes(request, env, path);
        return addCorsHeaders(response, corsHeaders);
      }

      // Rota de tenants
      if (path === '/api/tenants') {
        return addCorsHeaders(
          jsonResponse(listTenants()),
          corsHeaders
        );
      }

      // Rota de health check
      if (path === '/health') {
        return addCorsHeaders(
          jsonResponse({ status: 'ok', timestamp: new Date().toISOString() }),
          corsHeaders
        );
      }

      // Fallback para aplicacao principal (se existir)
      // Aqui voce integraria com o worker existente
      return new Response('Playbook SaaS API - Use /api/rag/search para buscas', {
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return addCorsHeaders(
        jsonResponse({ error: error.message }, 500),
        corsHeaders
      );
    }
  }
};

// ============================================
// ROTAS RAG
// ============================================

async function handleRAGRoutes(request, env, path) {
  if (path === '/api/rag/search' && request.method === 'POST') {
    return handleRAGSearch(request, env);
  }

  if (path === '/api/rag/context' && request.method === 'POST') {
    return handleRAGContext(request, env);
  }

  return jsonResponse({ error: 'Endpoint nao encontrado' }, 404);
}

async function handleRAGSearch(request, env) {
  const { query, tenantId, topK = 5, minScore = 0.7 } = await request.json();

  if (!query) {
    return jsonResponse({ error: 'Query obrigatoria' }, 400);
  }

  const tenant = tenantId || getTenantFromRequest(request);

  // Gera embedding da query
  const queryEmbedding = await generateEmbedding(query, env);

  // Busca no Vectorize
  const results = await env.VECTORIZE_INDEX.query(queryEmbedding, {
    topK,
    filter: { tenant },
    returnMetadata: true,
    returnValues: false
  });

  // Filtra e formata resultados
  const matches = results.matches
    .filter(m => m.score >= minScore)
    .map(m => ({
      id: m.id,
      score: m.score,
      content: m.metadata?.content || '',
      source: m.metadata?.source || '',
      category: m.metadata?.category || '',
      title: m.metadata?.title || ''
    }));

  return jsonResponse({
    query,
    tenant,
    found: matches.length > 0,
    count: matches.length,
    results: matches
  });
}

async function handleRAGContext(request, env) {
  const { query, tenantId } = await request.json();

  if (!query) {
    return jsonResponse({ error: 'Query obrigatoria' }, 400);
  }

  const tenant = tenantId || getTenantFromRequest(request);
  const results = await searchSimilar(query, tenant, env);

  if (results.length === 0) {
    return jsonResponse({
      found: false,
      context: 'Nenhuma informacao relevante encontrada no playbook.',
      sources: []
    });
  }

  // Formata contexto para IA
  const contextParts = results.map((r, i) =>
    `[Fonte ${i + 1}: ${r.title || r.source}]\n${r.content}`
  );

  return jsonResponse({
    found: true,
    context: contextParts.join('\n\n---\n\n'),
    sources: results.map(r => ({
      source: r.source,
      title: r.title,
      score: r.score
    })),
    topScore: results[0].score
  });
}

// ============================================
// ROTAS DE INDEXACAO
// ============================================

async function handleIndexRoutes(request, env, path) {
  if (path === '/index/webhook' && request.method === 'POST') {
    return handleGitHubWebhook(request, env);
  }

  if (path === '/index/manual' && request.method === 'POST') {
    return handleManualIndex(request, env);
  }

  if (path === '/index/status') {
    return getIndexStatus(env);
  }

  return jsonResponse({ error: 'Endpoint nao encontrado' }, 404);
}

async function handleGitHubWebhook(request, env) {
  // Verifica assinatura
  const signature = request.headers.get('X-Hub-Signature-256');
  if (!await verifyGitHubSignature(request.clone(), signature, env)) {
    return jsonResponse({ error: 'Assinatura invalida' }, 401);
  }

  const payload = await request.json();

  // Apenas processa pushes para main/master
  if (payload.ref !== 'refs/heads/main' && payload.ref !== 'refs/heads/master') {
    return jsonResponse({
      message: 'Ignorando push para branch diferente de main/master',
      ref: payload.ref
    });
  }

  // Identifica arquivos alterados
  const changedFiles = new Set();
  for (const commit of payload.commits || []) {
    [...(commit.added || []), ...(commit.modified || [])].forEach(f => {
      if (f.startsWith('src/data/tenants/') && f.endsWith('.js')) {
        changedFiles.add(f);
      }
    });
  }

  if (changedFiles.size === 0) {
    return jsonResponse({
      message: 'Nenhum arquivo de conteudo alterado',
      commits: payload.commits?.length || 0
    });
  }

  // Log do processamento
  const webhookLog = {
    timestamp: new Date().toISOString(),
    files: Array.from(changedFiles),
    pusher: payload.pusher?.name || 'unknown'
  };

  // Salva log no KV (se disponivel)
  if (env.CACHE) {
    const history = await env.CACHE.get('webhook-history', 'json') || [];
    history.unshift(webhookLog);
    await env.CACHE.put('webhook-history', JSON.stringify(history.slice(0, 50)));
  }

  // Processa reindexacao
  const results = await processIndexing(Array.from(changedFiles), env);

  return jsonResponse({
    message: 'Reindexacao processada',
    filesProcessed: changedFiles.size,
    results
  });
}

async function handleManualIndex(request, env) {
  const { tenant, fullReindex = false, files } = await request.json();

  if (!tenant) {
    return jsonResponse({ error: 'Tenant obrigatorio' }, 400);
  }

  // Lista arquivos para indexar
  const filesToIndex = files || [
    `src/data/tenants/${tenant}/playbook.js`,
    `src/data/tenants/${tenant}/objecoes.js`,
    `src/data/tenants/${tenant}/scripts.js`,
    `src/data/tenants/${tenant}/precos.js`,
    `src/data/tenants/${tenant}/agentes.js`
  ];

  if (fullReindex) {
    // Remove vetores existentes
    const deleted = await deleteVectorsByTenant(tenant, env);
    console.log(`Deleted ${deleted} vectors for tenant ${tenant}`);
  }

  const results = await processIndexing(filesToIndex, env, tenant);

  return jsonResponse({
    message: fullReindex ? 'Reindexacao completa concluida' : 'Indexacao incremental concluida',
    tenant,
    results
  });
}

async function getIndexStatus(env) {
  try {
    const stats = await env.VECTORIZE_INDEX.describe();

    // Busca historico de webhooks
    let webhookHistory = [];
    if (env.CACHE) {
      webhookHistory = await env.CACHE.get('webhook-history', 'json') || [];
    }

    return jsonResponse({
      status: 'online',
      index: {
        vectorCount: stats.vectorCount,
        dimensions: stats.dimensions,
        metric: stats.metric
      },
      lastWebhooks: webhookHistory.slice(0, 5)
    });
  } catch (error) {
    return jsonResponse({
      status: 'error',
      error: error.message
    }, 500);
  }
}

// ============================================
// ROTAS MCP
// ============================================

async function handleMCPRoutes(request, env, path) {
  const mcpPath = path.replace('/mcp', '');

  if (mcpPath === '/manifest' || mcpPath === '/') {
    return getMCPManifest();
  }

  if (mcpPath === '/tools') {
    return getMCPTools();
  }

  if (mcpPath === '/execute' && request.method === 'POST') {
    return executeMCPTool(request, env);
  }

  return jsonResponse({ error: 'Endpoint MCP nao encontrado' }, 404);
}

function getMCPManifest() {
  return jsonResponse({
    name: 'playbook-vendas',
    version: '1.0.0',
    description: 'Playbook de vendas com RAG para consultas semanticas',
    capabilities: {
      tools: true,
      resources: true,
      prompts: false
    },
    endpoints: {
      tools: '/mcp/tools',
      execute: '/mcp/execute'
    }
  });
}

function getMCPTools() {
  return jsonResponse({
    tools: [
      {
        name: 'search_playbook',
        description: 'Busca semantica no playbook de vendas. Use para perguntas abertas.',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'Pergunta ou termo de busca' },
            tenant: { type: 'string', description: 'ID do tenant' }
          },
          required: ['query', 'tenant']
        }
      },
      {
        name: 'get_objection_response',
        description: 'Resposta sugerida para objecao do cliente',
        parameters: {
          type: 'object',
          properties: {
            objection: { type: 'string', description: 'Objecao do cliente' },
            tenant: { type: 'string', description: 'ID do tenant' }
          },
          required: ['objection', 'tenant']
        }
      },
      {
        name: 'get_pricing',
        description: 'Informacoes de precos e planos',
        parameters: {
          type: 'object',
          properties: {
            product: { type: 'string', description: 'Produto ou "all"' },
            tenant: { type: 'string', description: 'ID do tenant' }
          },
          required: ['tenant']
        }
      }
    ]
  });
}

async function executeMCPTool(request, env) {
  const { tool, parameters } = await request.json();
  const tenant = parameters.tenant || 'papervines';

  let result;

  switch (tool) {
    case 'search_playbook':
      const searchResults = await searchSimilar(parameters.query, tenant, env);
      result = {
        found: searchResults.length > 0,
        results: searchResults
      };
      break;

    case 'get_objection_response':
      const objResults = await searchSimilar(
        `objecao cliente: ${parameters.objection}`,
        tenant,
        env
      );
      result = {
        found: objResults.length > 0,
        suggestions: objResults.map(r => r.content)
      };
      break;

    case 'get_pricing':
      // Aqui integraria com os dados de precos do tenant
      result = {
        message: 'Integrar com dados de precos do tenant',
        tenant
      };
      break;

    default:
      return jsonResponse({ error: `Ferramenta desconhecida: ${tool}` }, 400);
  }

  return jsonResponse({ success: true, result });
}

// ============================================
// FUNCOES DE EMBEDDING E BUSCA
// ============================================

async function generateEmbedding(text, env) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OPENAI_EMBEDDING_MODEL,
      input: prepareText(text),
      dimensions: EMBEDDING_DIMENSIONS
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

async function generateEmbeddingsBatch(texts, env) {
  const batchSize = 100;
  const allEmbeddings = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize).map(prepareText);

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: OPENAI_EMBEDDING_MODEL,
        input: batch,
        dimensions: EMBEDDING_DIMENSIONS
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI batch error at index ${i}`);
    }

    const data = await response.json();
    allEmbeddings.push(...data.data.map(d => d.embedding));

    // Rate limiting
    if (i + batchSize < texts.length) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  return allEmbeddings;
}

function prepareText(text, maxChars = 32000) {
  let cleaned = text
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (cleaned.length > maxChars) {
    cleaned = cleaned.substring(0, maxChars);
  }

  return cleaned;
}

async function searchSimilar(query, tenant, env, options = {}) {
  const { topK = 5, minScore = 0.7 } = options;

  const queryEmbedding = await generateEmbedding(query, env);

  const results = await env.VECTORIZE_INDEX.query(queryEmbedding, {
    topK,
    filter: { tenant },
    returnMetadata: true,
    returnValues: false
  });

  return results.matches
    .filter(m => m.score >= minScore)
    .map(m => ({
      id: m.id,
      score: m.score,
      content: m.metadata?.content || '',
      source: m.metadata?.source || '',
      category: m.metadata?.category || '',
      title: m.metadata?.title || ''
    }));
}

// ============================================
// FUNCOES DE INDEXACAO
// ============================================

async function processIndexing(files, env, tenantOverride = null) {
  const results = [];

  for (const file of files) {
    try {
      // Extrai tenant do path
      const tenantMatch = file.match(/tenants\/([^\/]+)\//);
      const tenant = tenantOverride || (tenantMatch ? tenantMatch[1] : null);

      if (!tenant) {
        results.push({ file, status: 'skipped', reason: 'Tenant nao identificado' });
        continue;
      }

      // Simula carregamento de chunks
      // Em producao, isso buscaria o conteudo real do arquivo
      const chunks = await loadAndChunkFile(file, tenant);

      if (chunks.length === 0) {
        results.push({ file, status: 'skipped', reason: 'Sem conteudo' });
        continue;
      }

      // Gera embeddings
      const texts = chunks.map(c => c.text);
      const embeddings = await generateEmbeddingsBatch(texts, env);

      // Prepara vetores
      const vectors = chunks.map((chunk, i) => ({
        id: `${tenant}-${chunk.id}`,
        values: embeddings[i],
        metadata: {
          tenant,
          source: file,
          category: chunk.category,
          title: chunk.title,
          content: chunk.text.substring(0, 1000)
        }
      }));

      // Upsert no Vectorize
      for (let i = 0; i < vectors.length; i += 100) {
        const batch = vectors.slice(i, i + 100);
        await env.VECTORIZE_INDEX.upsert(batch);
      }

      results.push({
        file,
        status: 'success',
        chunksIndexed: chunks.length
      });

    } catch (error) {
      results.push({
        file,
        status: 'error',
        error: error.message
      });
    }
  }

  return results;
}

async function loadAndChunkFile(file, tenant) {
  // Esta funcao deveria carregar o conteudo real
  // Por enquanto retorna chunks de exemplo
  const fileName = file.split('/').pop().replace('.js', '');

  // Estrutura de exemplo - substituir por carregamento real
  const chunkTemplates = {
    playbook: [
      { id: 'playbook-introducao', category: 'playbook', title: 'Introducao', text: 'Texto de introducao...' },
      { id: 'playbook-processo', category: 'playbook', title: 'Processo de Vendas', text: 'Etapas do processo...' }
    ],
    objecoes: [
      { id: 'objecao-preco', category: 'objecoes', title: 'Preco Alto', text: 'Quando cliente diz que esta caro...' },
      { id: 'objecao-tempo', category: 'objecoes', title: 'Sem Tempo', text: 'Quando cliente diz que nao tem tempo...' }
    ],
    scripts: [
      { id: 'script-abertura', category: 'scripts', title: 'Script de Abertura', text: 'Ola, tudo bem?...' }
    ],
    precos: [
      { id: 'precos-planos', category: 'precos', title: 'Tabela de Precos', text: 'Plano Basic, Master, Fusion...' }
    ]
  };

  return chunkTemplates[fileName] || [];
}

async function deleteVectorsByTenant(tenant, env) {
  const dummyVector = new Array(EMBEDDING_DIMENSIONS).fill(0);

  const results = await env.VECTORIZE_INDEX.query(dummyVector, {
    topK: 10000,
    filter: { tenant },
    returnMetadata: false,
    returnValues: false
  });

  const ids = results.matches.map(m => m.id);

  if (ids.length > 0) {
    for (let i = 0; i < ids.length; i += 100) {
      const batch = ids.slice(i, i + 100);
      await env.VECTORIZE_INDEX.deleteByIds(batch);
    }
  }

  return ids.length;
}

// ============================================
// FUNCOES AUXILIARES
// ============================================

function getTenantFromRequest(request) {
  // Header customizado
  const headerTenant = request.headers.get('X-Tenant-ID');
  if (headerTenant) return headerTenant;

  // Subdominio
  const url = new URL(request.url);
  const subdomain = url.hostname.split('.')[0];
  if (subdomain !== 'www' && subdomain !== 'playbook') {
    return subdomain;
  }

  return 'papervines'; // Default
}

function listTenants() {
  // Em producao, viria do banco de dados
  return [
    { id: 'papervines', nome: 'Paper Vines', status: 'ativo' }
  ];
}

async function verifyGitHubSignature(request, signature, env) {
  if (!signature || !env.GITHUB_WEBHOOK_SECRET) {
    return false;
  }

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
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function addCorsHeaders(response, corsHeaders) {
  const newResponse = new Response(response.body, response);
  Object.entries(corsHeaders).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  return newResponse;
}
