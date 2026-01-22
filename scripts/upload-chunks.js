#!/usr/bin/env node

/**
 * Script de Upload de Chunks para Cloudflare Vectorize
 * Playbook de Vendas - RAG Multi-tenant
 *
 * Este script le os chunks gerados e faz upload para o Vectorize
 * via API do Cloudflare (nao requer wrangler local)
 *
 * Uso:
 *   node scripts/upload-chunks.js [tenant]
 *
 * Variaveis de ambiente necessarias:
 *   CLOUDFLARE_ACCOUNT_ID - ID da conta Cloudflare
 *   CLOUDFLARE_API_TOKEN - Token com permissao Vectorize
 *   OPENAI_API_KEY - Chave da API OpenAI
 *   VECTORIZE_INDEX_NAME - Nome do indice (padrao: playbook-embeddings)
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'output');

// Configuracoes
const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;
const BATCH_SIZE = 50; // Embeddings por batch
const VECTORIZE_BATCH_SIZE = 100; // Vetores por upsert
const MAX_ID_LENGTH = 64; // Limite do Vectorize

/**
 * Gera um ID seguro com no máximo 64 bytes
 */
function generateSafeId(tenant, chunkId) {
  const fullId = `${tenant}-${chunkId}`;

  if (fullId.length <= MAX_ID_LENGTH) {
    return fullId;
  }

  // Se muito longo, usa hash do ID original
  const hash = createHash('md5').update(fullId).digest('hex').substring(0, 12);
  const truncatedId = fullId.substring(0, MAX_ID_LENGTH - 13); // 13 = 1 hífen + 12 hash
  return `${truncatedId}-${hash}`;
}

/**
 * Gera embeddings via OpenAI API
 */
async function generateEmbeddings(texts, apiKey) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: OPENAI_EMBEDDING_MODEL,
      input: texts,
      dimensions: EMBEDDING_DIMENSIONS
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.data.map(d => d.embedding);
}

/**
 * Faz upsert de vetores no Cloudflare Vectorize
 */
async function upsertVectors(vectors, accountId, indexName, apiToken) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/v2/indexes/${indexName}/upsert`;

  // Vectorize espera NDJSON (newline-delimited JSON)
  const ndjson = vectors.map(v => JSON.stringify({
    id: v.id,
    values: v.values,
    metadata: v.metadata
  })).join('\n');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Authorization': `Bearer ${apiToken}`
    },
    body: ndjson
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Cloudflare API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

/**
 * Verifica status do indice Vectorize
 */
async function getIndexInfo(accountId, indexName, apiToken) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/v2/indexes/${indexName}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiToken}`
    }
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    const error = await response.text();
    throw new Error(`Cloudflare API error: ${response.status} - ${error}`);
  }

  return await response.json();
}

/**
 * Funcao principal
 */
async function main() {
  console.log('');
  console.log('===========================================');
  console.log('  Upload de Chunks para Cloudflare Vectorize');
  console.log('===========================================');
  console.log('');

  // Validar variaveis de ambiente
  const requiredEnv = [
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_API_TOKEN',
    'OPENAI_API_KEY'
  ];

  const missing = requiredEnv.filter(v => !process.env[v]);
  if (missing.length > 0) {
    console.error('Erro: Variaveis de ambiente obrigatorias nao configuradas:');
    missing.forEach(v => console.error(`  - ${v}`));
    console.log('');
    console.log('Configure as variaveis e execute novamente:');
    console.log('  export CLOUDFLARE_ACCOUNT_ID="seu_account_id"');
    console.log('  export CLOUDFLARE_API_TOKEN="seu_api_token"');
    console.log('  export OPENAI_API_KEY="sua_openai_key"');
    console.log('');
    process.exit(1);
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  const openaiKey = process.env.OPENAI_API_KEY;
  const indexName = process.env.VECTORIZE_INDEX_NAME || 'playbook-embeddings';

  // Tenant a processar
  const tenant = process.argv[2] || 'papervines';
  const chunksFile = join(OUTPUT_DIR, `${tenant}-chunks.json`);

  // Verificar arquivo de chunks
  if (!existsSync(chunksFile)) {
    console.error(`Erro: Arquivo de chunks nao encontrado: ${chunksFile}`);
    console.log('Execute primeiro: node scripts/generate-chunks.js');
    process.exit(1);
  }

  // Carregar chunks
  console.log(`[1/4] Carregando chunks de ${chunksFile}...`);
  const chunks = JSON.parse(readFileSync(chunksFile, 'utf8'));
  console.log(`      ${chunks.length} chunks carregados`);

  // Verificar indice Vectorize
  console.log('');
  console.log(`[2/4] Verificando indice Vectorize: ${indexName}...`);
  const indexInfo = await getIndexInfo(accountId, indexName, apiToken);

  if (!indexInfo) {
    console.error(`Erro: Indice "${indexName}" nao existe`);
    console.log('Crie o indice primeiro:');
    console.log(`  wrangler vectorize create ${indexName} --dimensions=1536 --metric=cosine`);
    process.exit(1);
  }

  console.log(`      Indice encontrado: ${indexInfo.result?.name || indexName}`);
  console.log(`      Dimensoes: ${indexInfo.result?.config?.dimensions || 'N/A'}`);
  console.log(`      Metrica: ${indexInfo.result?.config?.metric || 'N/A'}`);

  // Gerar embeddings em batches
  console.log('');
  console.log('[3/4] Gerando embeddings via OpenAI...');

  const allVectors = [];
  const totalBatches = Math.ceil(chunks.length / BATCH_SIZE);

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;

    process.stdout.write(`      Batch ${batchNum}/${totalBatches} (${batch.length} chunks)...`);

    const texts = batch.map(c => c.text);
    const embeddings = await generateEmbeddings(texts, openaiKey);

    // Preparar vetores para upsert
    batch.forEach((chunk, idx) => {
      allVectors.push({
        id: generateSafeId(tenant, chunk.id),
        values: embeddings[idx],
        metadata: {
          tenant: chunk.tenant,
          category: chunk.category,
          title: chunk.title,
          subcategory: chunk.subcategory || '',
          content: chunk.text.substring(0, 1000) // Limite de metadata
        }
      });
    });

    console.log(' OK');

    // Pausa entre batches para evitar rate limit
    if (i + BATCH_SIZE < chunks.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log(`      Total: ${allVectors.length} vetores gerados`);

  // Upload para Vectorize
  console.log('');
  console.log('[4/4] Fazendo upload para Vectorize...');

  const uploadBatches = Math.ceil(allVectors.length / VECTORIZE_BATCH_SIZE);
  let uploadedCount = 0;

  for (let i = 0; i < allVectors.length; i += VECTORIZE_BATCH_SIZE) {
    const batch = allVectors.slice(i, i + VECTORIZE_BATCH_SIZE);
    const batchNum = Math.floor(i / VECTORIZE_BATCH_SIZE) + 1;

    process.stdout.write(`      Batch ${batchNum}/${uploadBatches} (${batch.length} vetores)...`);

    const result = await upsertVectors(batch, accountId, indexName, apiToken);

    if (result.success) {
      uploadedCount += batch.length;
      console.log(' OK');
    } else {
      console.log(' ERRO');
      console.error('      ', result.errors);
    }

    // Pausa entre uploads
    if (i + VECTORIZE_BATCH_SIZE < allVectors.length) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  // Resumo
  console.log('');
  console.log('===========================================');
  console.log('  UPLOAD CONCLUIDO');
  console.log('===========================================');
  console.log('');
  console.log(`  Tenant: ${tenant}`);
  console.log(`  Indice: ${indexName}`);
  console.log(`  Chunks processados: ${chunks.length}`);
  console.log(`  Vetores enviados: ${uploadedCount}`);
  console.log('');
  console.log('  Proximos passos:');
  console.log('    1. Deploy do worker: wrangler deploy');
  console.log('    2. Testar busca: curl -X POST https://seu-worker/api/rag/search');
  console.log('');
}

// Executar
main().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
