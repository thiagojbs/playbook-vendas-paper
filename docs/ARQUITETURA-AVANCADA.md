# Arquitetura Avancada - Playbook SaaS

Guia completo para implementar:
1. **MCP com RAG** usando Cloudflare Vectorize
2. **Multi-tenant** para multiplos clientes
3. **GitHub Webhooks** para atualizacao automatica

---

## Indice

1. [Visao Geral da Arquitetura](#1-visao-geral-da-arquitetura)
2. [Pre-requisitos](#2-pre-requisitos)
3. [Parte 1: Multi-tenant Setup](#3-parte-1-multi-tenant-setup)
4. [Parte 2: RAG com Cloudflare Vectorize](#4-parte-2-rag-com-cloudflare-vectorize)
5. [Parte 3: GitHub Webhooks](#5-parte-3-github-webhooks)
6. [Deploy e Configuracao](#6-deploy-e-configuracao)
7. [Manutencao e Monitoramento](#7-manutencao-e-monitoramento)

---

## 1. Visao Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ARQUITETURA FINAL                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   GitHub Repo                    Cloudflare Workers                 │
│   ┌──────────┐                  ┌─────────────────┐                │
│   │ /tenants │──── webhook ────▶│  Index Worker   │                │
│   │  /paper  │                  │  (reindexacao)  │                │
│   │  /cliente│                  └────────┬────────┘                │
│   └──────────┘                           │                         │
│                                          ▼                         │
│                                 ┌─────────────────┐                │
│                                 │   Vectorize     │                │
│                                 │   (embeddings)  │                │
│                                 └────────┬────────┘                │
│                                          │                         │
│   Usuario/IA                             │                         │
│   ┌──────────┐                  ┌────────▼────────┐                │
│   │   MCP    │◀────────────────▶│   API Worker    │                │
│   │  Client  │                  │  (consulta RAG) │                │
│   └──────────┘                  └─────────────────┘                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Fluxo de Dados

1. **Commit no GitHub** → Webhook dispara
2. **Index Worker** → Processa arquivos alterados
3. **OpenAI API** → Gera embeddings do texto
4. **Vectorize** → Armazena vetores
5. **MCP/API** → IA consulta por similaridade

---

## 2. Pre-requisitos

### Contas Necessarias

| Servico | Uso | Custo Estimado |
|---------|-----|----------------|
| Cloudflare | Workers, Vectorize, D1 | ~$5-25/mes |
| OpenAI | Embeddings API | ~$0.0001/1K tokens |
| GitHub | Repositorio + Webhooks | Gratis |

### Ferramentas Locais

```bash
# Node.js 18+
node --version

# Wrangler CLI
npm install -g wrangler

# Login no Cloudflare
wrangler login
```

### Limites do Cloudflare Vectorize

- **Plano Workers Paid**: Obrigatorio ($5/mes)
- **Indices**: 10 por conta
- **Vetores**: 5M por indice
- **Dimensoes**: Ate 1536 (OpenAI)
- **Metadata**: 10KB por vetor

---

## 3. Parte 1: Multi-tenant Setup

### 3.1 Estrutura de Pastas

```
playbook-saas/
├── src/
│   ├── data/
│   │   └── tenants/
│   │       ├── papervines/
│   │       │   ├── config.js      # Configuracoes do tenant
│   │       │   ├── playbook.js    # Conteudo principal
│   │       │   ├── objecoes.js    # Tratamento de objecoes
│   │       │   ├── scripts.js     # Scripts de vendas
│   │       │   ├── precos.js      # Tabela de precos
│   │       │   └── agentes.js     # Perfis de agentes
│   │       │
│   │       ├── cliente-telecom/
│   │       │   ├── config.js
│   │       │   ├── playbook.js
│   │       │   └── ...
│   │       │
│   │       └── cliente-saude/
│   │           ├── config.js
│   │           ├── playbook.js
│   │           └── ...
│   │
│   ├── api/
│   │   ├── tenant.js          # Roteamento por tenant
│   │   ├── rag.js             # Consultas RAG
│   │   └── mcp.js             # Endpoint MCP
│   │
│   └── workers/
│       ├── main.js            # Worker principal
│       └── indexer.js         # Worker de indexacao
│
├── wrangler.toml
└── package.json
```

### 3.2 Arquivo de Configuracao do Tenant

Crie `/src/data/tenants/papervines/config.js`:

```javascript
// Configuracao do tenant Paper Vines
export const TENANT_CONFIG = {
  id: 'papervines',
  nome: 'Paper Vines',

  // Aparencia
  tema: {
    corPrimaria: '#667eea',
    corSecundaria: '#764ba2',
    logo: '/assets/papervines-logo.png'
  },

  // Integracao CRM
  crm: {
    provider: 'wtschat',
    baseUrl: 'https://api.v2.wtschat.com',
    // API key via environment variable: PAPERVINES_CRM_KEY
  },

  // RAG Settings
  rag: {
    indexName: 'papervines-playbook',
    topK: 5,  // Numero de resultados
    minScore: 0.7  // Score minimo de similaridade
  },

  // Modulos habilitados
  modulos: {
    calculadora: true,
    desempenho: true,
    objecoes: true,
    scripts: true
  }
};
```

### 3.3 Sistema de Roteamento por Tenant

Crie `/src/api/tenant.js`:

```javascript
// Sistema de roteamento multi-tenant

// Cache de configuracoes carregadas
const tenantCache = new Map();

/**
 * Extrai o tenant ID da URL ou header
 * Suporta: subdominio, path, ou header
 */
export function getTenantId(request) {
  const url = new URL(request.url);

  // Opcao 1: Subdominio (papervines.playbook.com)
  const subdomain = url.hostname.split('.')[0];
  if (subdomain !== 'www' && subdomain !== 'playbook') {
    return subdomain;
  }

  // Opcao 2: Path (/tenant/papervines/...)
  const pathMatch = url.pathname.match(/^\/tenant\/([^\/]+)/);
  if (pathMatch) {
    return pathMatch[1];
  }

  // Opcao 3: Header customizado
  const headerTenant = request.headers.get('X-Tenant-ID');
  if (headerTenant) {
    return headerTenant;
  }

  // Default tenant
  return 'papervines';
}

/**
 * Carrega configuracao do tenant
 */
export async function loadTenantConfig(tenantId) {
  // Verifica cache
  if (tenantCache.has(tenantId)) {
    return tenantCache.get(tenantId);
  }

  try {
    // Import dinamico do modulo de configuracao
    const configModule = await import(`../data/tenants/${tenantId}/config.js`);
    const config = configModule.TENANT_CONFIG;

    // Valida configuracao obrigatoria
    if (!config.id || !config.nome) {
      throw new Error(`Configuracao invalida para tenant: ${tenantId}`);
    }

    // Armazena em cache
    tenantCache.set(tenantId, config);

    return config;
  } catch (error) {
    console.error(`Erro ao carregar tenant ${tenantId}:`, error);
    return null;
  }
}

/**
 * Carrega dados especificos do tenant
 */
export async function loadTenantData(tenantId, dataFile) {
  try {
    const module = await import(`../data/tenants/${tenantId}/${dataFile}.js`);
    return module;
  } catch (error) {
    console.error(`Erro ao carregar ${dataFile} do tenant ${tenantId}:`, error);
    return null;
  }
}

/**
 * Lista todos os tenants disponiveis
 */
export function listTenants() {
  // Em producao, isso viria de um banco de dados
  return [
    { id: 'papervines', nome: 'Paper Vines', status: 'ativo' },
    { id: 'cliente-telecom', nome: 'Telecom Cliente', status: 'ativo' },
    { id: 'cliente-saude', nome: 'Clinica Saude', status: 'desenvolvimento' }
  ];
}

/**
 * Middleware para injetar tenant no request
 */
export async function tenantMiddleware(request, env, ctx) {
  const tenantId = getTenantId(request);
  const config = await loadTenantConfig(tenantId);

  if (!config) {
    return new Response(JSON.stringify({
      error: 'Tenant nao encontrado',
      tenantId
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Anexa ao request para uso posterior
  request.tenant = {
    id: tenantId,
    config
  };

  return null; // Continua para o proximo handler
}
```

### 3.4 Atualizacao do wrangler.toml

```toml
name = "playbook-saas"
main = "src/workers/main.js"
compatibility_date = "2024-01-01"

# Rotas por tenant (subdominio)
routes = [
  { pattern = "*.playbook.seudominio.com", zone_name = "seudominio.com" }
]

# Variaveis de ambiente (por tenant)
[vars]
DEFAULT_TENANT = "papervines"

# Secrets (configurar via wrangler secret put)
# OPENAI_API_KEY = "sk-..."
# PAPERVINES_CRM_KEY = "..."
# CLIENTE_TELECOM_CRM_KEY = "..."

# Vectorize binding
[[vectorize]]
binding = "VECTORIZE_INDEX"
index_name = "playbook-embeddings"

# D1 Database (para metadata dos tenants)
[[d1_databases]]
binding = "DB"
database_name = "playbook-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# KV para cache
[[kv_namespaces]]
binding = "CACHE"
id = "xxxxxxxx"
```

---

## 4. Parte 2: RAG com Cloudflare Vectorize

### 4.1 Criar Indice Vectorize

```bash
# Criar indice para embeddings OpenAI (1536 dimensoes)
wrangler vectorize create playbook-embeddings \
  --dimensions=1536 \
  --metric=cosine

# Verificar criacao
wrangler vectorize list
```

### 4.2 Servico de Embeddings

Crie `/src/api/embeddings.js`:

```javascript
// Servico para gerar embeddings via OpenAI

const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;

/**
 * Gera embedding para um texto
 */
export async function generateEmbedding(text, env) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OPENAI_EMBEDDING_MODEL,
      input: text,
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

/**
 * Gera embeddings em batch (mais eficiente)
 */
export async function generateEmbeddingsBatch(texts, env) {
  // OpenAI permite ate 2048 inputs por request
  const batchSize = 100;
  const allEmbeddings = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);

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

    // Rate limiting: pequena pausa entre batches
    if (i + batchSize < texts.length) {
      await new Promise(r => setTimeout(r, 100));
    }
  }

  return allEmbeddings;
}

/**
 * Prepara texto para embedding
 * - Remove formatacao excessiva
 * - Limita tamanho
 */
export function prepareTextForEmbedding(text, maxTokens = 8000) {
  // Remove espacos multiplos e quebras de linha excessivas
  let cleaned = text
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Estimativa grosseira: 1 token ~ 4 caracteres
  const maxChars = maxTokens * 4;
  if (cleaned.length > maxChars) {
    cleaned = cleaned.substring(0, maxChars);
  }

  return cleaned;
}
```

### 4.3 Sistema RAG

Crie `/src/api/rag.js`:

```javascript
// Sistema RAG (Retrieval Augmented Generation)

import { generateEmbedding, prepareTextForEmbedding } from './embeddings.js';

/**
 * Busca documentos similares no Vectorize
 */
export async function searchSimilar(query, tenantId, env, options = {}) {
  const {
    topK = 5,
    minScore = 0.7,
    filter = {}
  } = options;

  // Gera embedding da query
  const queryEmbedding = await generateEmbedding(
    prepareTextForEmbedding(query),
    env
  );

  // Busca no Vectorize com filtro por tenant
  const results = await env.VECTORIZE_INDEX.query(queryEmbedding, {
    topK,
    filter: {
      tenant: tenantId,
      ...filter
    },
    returnMetadata: true,
    returnValues: false  // Nao precisamos dos vetores de volta
  });

  // Filtra por score minimo e formata resultados
  return results.matches
    .filter(match => match.score >= minScore)
    .map(match => ({
      id: match.id,
      score: match.score,
      content: match.metadata?.content || '',
      source: match.metadata?.source || '',
      category: match.metadata?.category || '',
      title: match.metadata?.title || ''
    }));
}

/**
 * Busca e formata contexto para a IA
 */
export async function getRAGContext(query, tenantId, env) {
  const results = await searchSimilar(query, tenantId, env);

  if (results.length === 0) {
    return {
      found: false,
      context: '',
      sources: []
    };
  }

  // Formata contexto para a IA
  const contextParts = results.map((r, i) =>
    `[Fonte ${i + 1}: ${r.source}]\n${r.content}`
  );

  return {
    found: true,
    context: contextParts.join('\n\n---\n\n'),
    sources: results.map(r => ({
      source: r.source,
      title: r.title,
      score: r.score
    })),
    topScore: results[0].score
  };
}

/**
 * Endpoint de busca RAG
 */
export async function handleRAGSearch(request, env) {
  try {
    const { query, tenantId } = await request.json();

    if (!query || !tenantId) {
      return new Response(JSON.stringify({
        error: 'Query e tenantId sao obrigatorios'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = await getRAGContext(query, tenantId, env);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('RAG search error:', error);
    return new Response(JSON.stringify({
      error: 'Erro na busca',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

### 4.4 Endpoint MCP

Crie `/src/api/mcp.js`:

```javascript
// Endpoint MCP (Model Context Protocol)
// Permite que IAs consultem o playbook via protocolo padrao

import { getRAGContext } from './rag.js';
import { loadTenantConfig, loadTenantData } from './tenant.js';

/**
 * Handler principal MCP
 * Segue especificacao: https://modelcontextprotocol.io/
 */
export async function handleMCP(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/mcp', '');

  // Rotas MCP
  switch (path) {
    case '/manifest':
      return getMCPManifest();

    case '/tools':
      return getMCPTools();

    case '/execute':
      return executeMCPTool(request, env);

    default:
      return new Response('Not Found', { status: 404 });
  }
}

/**
 * Manifesto MCP - descreve capacidades do servidor
 */
function getMCPManifest() {
  return new Response(JSON.stringify({
    name: 'playbook-vendas',
    version: '1.0.0',
    description: 'Playbook de vendas com RAG para consultas semanticas',
    capabilities: {
      tools: true,
      resources: true,
      prompts: false
    },
    tools: [
      'search_playbook',
      'get_objection_response',
      'get_script',
      'get_pricing',
      'list_topics'
    ]
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * Lista de ferramentas disponiveis
 */
function getMCPTools() {
  return new Response(JSON.stringify({
    tools: [
      {
        name: 'search_playbook',
        description: 'Busca semantica no playbook de vendas. Use para perguntas abertas sobre processos, tecnicas, ou informacoes gerais.',
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Pergunta ou termo de busca'
            },
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente'
            }
          },
          required: ['query', 'tenant']
        }
      },
      {
        name: 'get_objection_response',
        description: 'Retorna resposta sugerida para uma objecao especifica do cliente',
        parameters: {
          type: 'object',
          properties: {
            objection: {
              type: 'string',
              description: 'A objecao do cliente (ex: "esta muito caro")'
            },
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente'
            }
          },
          required: ['objection', 'tenant']
        }
      },
      {
        name: 'get_script',
        description: 'Retorna script de vendas para uma situacao especifica',
        parameters: {
          type: 'object',
          properties: {
            situation: {
              type: 'string',
              description: 'Tipo de situacao (ex: "primeiro_contato", "followup", "fechamento")'
            },
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente'
            }
          },
          required: ['situation', 'tenant']
        }
      },
      {
        name: 'get_pricing',
        description: 'Retorna informacoes de precos e planos',
        parameters: {
          type: 'object',
          properties: {
            product: {
              type: 'string',
              description: 'Nome do produto ou "all" para tabela completa'
            },
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente'
            }
          },
          required: ['tenant']
        }
      },
      {
        name: 'list_topics',
        description: 'Lista todos os topicos disponiveis no playbook',
        parameters: {
          type: 'object',
          properties: {
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente'
            }
          },
          required: ['tenant']
        }
      }
    ]
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * Executa uma ferramenta MCP
 */
async function executeMCPTool(request, env) {
  try {
    const { tool, parameters } = await request.json();
    const tenant = parameters.tenant || 'papervines';

    let result;

    switch (tool) {
      case 'search_playbook':
        result = await getRAGContext(parameters.query, tenant, env);
        break;

      case 'get_objection_response':
        result = await searchObjection(parameters.objection, tenant, env);
        break;

      case 'get_script':
        result = await getScript(parameters.situation, tenant, env);
        break;

      case 'get_pricing':
        result = await getPricing(parameters.product, tenant, env);
        break;

      case 'list_topics':
        result = await listTopics(tenant, env);
        break;

      default:
        return new Response(JSON.stringify({
          error: `Ferramenta desconhecida: ${tool}`
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({
      success: true,
      result
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Funcoes auxiliares para cada ferramenta

async function searchObjection(objection, tenant, env) {
  // Busca especifica em objecoes
  return await getRAGContext(
    `objecao cliente: ${objection}`,
    tenant,
    env
  );
}

async function getScript(situation, tenant, env) {
  const scripts = await loadTenantData(tenant, 'scripts');
  if (!scripts) {
    return { error: 'Scripts nao encontrados' };
  }

  // Busca script por situacao
  const script = scripts.SCRIPTS?.find(s =>
    s.situacao?.toLowerCase().includes(situation.toLowerCase())
  );

  return script || { error: `Script para "${situation}" nao encontrado` };
}

async function getPricing(product, tenant, env) {
  const precos = await loadTenantData(tenant, 'precos');
  if (!precos) {
    return { error: 'Precos nao encontrados' };
  }

  if (!product || product === 'all') {
    return precos.PRECOS;
  }

  return precos.PRECOS[product] || { error: `Produto "${product}" nao encontrado` };
}

async function listTopics(tenant, env) {
  const config = await loadTenantConfig(tenant);
  if (!config) {
    return { error: 'Tenant nao encontrado' };
  }

  return {
    tenant: config.nome,
    topics: [
      'Processo de vendas',
      'Tratamento de objecoes',
      'Scripts de atendimento',
      'Tabela de precos',
      'Perfis de clientes',
      'Tecnicas de fechamento'
    ],
    modules: config.modulos
  };
}
```

### 4.5 Worker de Indexacao

Crie `/src/workers/indexer.js`:

```javascript
// Worker para indexar conteudo no Vectorize
// Acionado via webhook do GitHub ou manualmente

import { generateEmbeddingsBatch, prepareTextForEmbedding } from '../api/embeddings.js';

/**
 * Handler principal do indexer
 */
export async function handleIndexRequest(request, env) {
  const url = new URL(request.url);

  // Rotas do indexer
  if (url.pathname === '/index/webhook') {
    return handleGitHubWebhook(request, env);
  }

  if (url.pathname === '/index/manual') {
    return handleManualIndex(request, env);
  }

  if (url.pathname === '/index/status') {
    return getIndexStatus(env);
  }

  return new Response('Not Found', { status: 404 });
}

/**
 * Processa webhook do GitHub
 */
async function handleGitHubWebhook(request, env) {
  // Verifica assinatura do webhook
  const signature = request.headers.get('X-Hub-Signature-256');
  if (!await verifyGitHubSignature(request, signature, env)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await request.json();

  // Apenas processa pushes para main/master
  if (payload.ref !== 'refs/heads/main' && payload.ref !== 'refs/heads/master') {
    return new Response(JSON.stringify({
      message: 'Ignorando push para branch diferente de main/master'
    }), { headers: { 'Content-Type': 'application/json' } });
  }

  // Identifica arquivos alterados nos commits
  const changedFiles = new Set();
  for (const commit of payload.commits || []) {
    [...(commit.added || []), ...(commit.modified || [])].forEach(f => {
      // Filtra apenas arquivos de conteudo
      if (f.startsWith('src/data/tenants/') && f.endsWith('.js')) {
        changedFiles.add(f);
      }
    });
  }

  if (changedFiles.size === 0) {
    return new Response(JSON.stringify({
      message: 'Nenhum arquivo de conteudo alterado'
    }), { headers: { 'Content-Type': 'application/json' } });
  }

  // Processa reindexacao em background
  const results = await reindexFiles(Array.from(changedFiles), env);

  return new Response(JSON.stringify({
    message: 'Reindexacao iniciada',
    filesProcessed: changedFiles.size,
    results
  }), { headers: { 'Content-Type': 'application/json' } });
}

/**
 * Indexacao manual (para setup inicial ou reindexacao completa)
 */
async function handleManualIndex(request, env) {
  const { tenant, fullReindex } = await request.json();

  if (!tenant) {
    return new Response(JSON.stringify({
      error: 'Tenant obrigatorio'
    }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  // Lista arquivos do tenant
  const files = [
    `src/data/tenants/${tenant}/playbook.js`,
    `src/data/tenants/${tenant}/objecoes.js`,
    `src/data/tenants/${tenant}/scripts.js`,
    `src/data/tenants/${tenant}/precos.js`,
    `src/data/tenants/${tenant}/agentes.js`
  ];

  if (fullReindex) {
    // Remove vetores existentes do tenant
    await deleteVectorsByTenant(tenant, env);
  }

  const results = await reindexFiles(files, env, tenant);

  return new Response(JSON.stringify({
    message: fullReindex ? 'Reindexacao completa concluida' : 'Indexacao incremental concluida',
    tenant,
    results
  }), { headers: { 'Content-Type': 'application/json' } });
}

/**
 * Reindexa arquivos especificos
 */
async function reindexFiles(files, env, tenantOverride = null) {
  const results = [];

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
      const chunks = await loadAndChunkFile(file, tenant);

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
          title: chunk.title,
          content: chunk.text.substring(0, 1000) // Limita metadata
        }
      }));

      // Upsert no Vectorize (em batches de 100)
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

/**
 * Carrega arquivo e divide em chunks para embedding
 */
async function loadAndChunkFile(file, tenant) {
  // Em producao, isso buscaria do GitHub ou storage
  // Por agora, simula leitura do arquivo

  const chunks = [];
  const fileName = file.split('/').pop().replace('.js', '');

  // Estrategia de chunking por tipo de arquivo
  switch (fileName) {
    case 'playbook':
      // Divide playbook por secoes
      chunks.push(...chunkPlaybook(tenant));
      break;

    case 'objecoes':
      // Uma chunk por objecao
      chunks.push(...chunkObjecoes(tenant));
      break;

    case 'scripts':
      // Uma chunk por script
      chunks.push(...chunkScripts(tenant));
      break;

    case 'precos':
      // Chunks por categoria de preco
      chunks.push(...chunkPrecos(tenant));
      break;

    default:
      // Chunk generico
      chunks.push({
        id: `${fileName}-full`,
        category: fileName,
        title: fileName,
        text: `Conteudo de ${fileName}`
      });
  }

  return chunks;
}

/**
 * Estrategias de chunking por tipo de conteudo
 */
function chunkPlaybook(tenant) {
  // Implementar baseado na estrutura real do playbook
  return [
    {
      id: 'playbook-processo',
      category: 'playbook',
      title: 'Processo de Vendas',
      text: 'Descricao do processo de vendas...'
    },
    {
      id: 'playbook-funil',
      category: 'playbook',
      title: 'Etapas do Funil',
      text: 'Etapas do funil de vendas...'
    }
  ];
}

function chunkObjecoes(tenant) {
  // Uma chunk por objecao permite busca mais precisa
  return [
    {
      id: 'objecao-preco',
      category: 'objecoes',
      title: 'Objecao de Preco',
      text: 'Quando o cliente diz que esta caro...'
    }
  ];
}

function chunkScripts(tenant) {
  return [
    {
      id: 'script-abertura',
      category: 'scripts',
      title: 'Script de Abertura',
      text: 'Ola! Tudo bem? Aqui e [nome]...'
    }
  ];
}

function chunkPrecos(tenant) {
  return [
    {
      id: 'precos-planos',
      category: 'precos',
      title: 'Planos e Precos',
      text: 'Nossos planos sao: Basic, Master, Fusion...'
    }
  ];
}

/**
 * Remove vetores de um tenant
 */
async function deleteVectorsByTenant(tenant, env) {
  // Vectorize nao suporta delete por filtro diretamente
  // Estrategia: buscar IDs e deletar em batch
  const dummyVector = new Array(1536).fill(0);

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
}

/**
 * Verifica assinatura do webhook GitHub
 */
async function verifyGitHubSignature(request, signature, env) {
  if (!signature || !env.GITHUB_WEBHOOK_SECRET) {
    return false;
  }

  const body = await request.clone().text();
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

/**
 * Status do indice
 */
async function getIndexStatus(env) {
  try {
    // Busca estatisticas do indice
    const stats = await env.VECTORIZE_INDEX.describe();

    return new Response(JSON.stringify({
      status: 'online',
      vectorCount: stats.vectorCount,
      dimensions: stats.dimensions,
      metric: stats.metric
    }), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({
      status: 'error',
      error: error.message
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
```

---

## 5. Parte 3: GitHub Webhooks

### 5.1 Configurar Webhook no GitHub

1. **Acesse as configuracoes do repositorio**
   ```
   GitHub > Seu Repo > Settings > Webhooks > Add webhook
   ```

2. **Configure o webhook**:
   - **Payload URL**: `https://seu-worker.workers.dev/index/webhook`
   - **Content type**: `application/json`
   - **Secret**: Gere um secret seguro (guarde para o proximo passo)
   - **Events**: Selecione "Just the push event"
   - **Active**: Marcado

3. **Salve o webhook**

### 5.2 Configurar Secret no Cloudflare

```bash
# Adiciona secret do webhook
wrangler secret put GITHUB_WEBHOOK_SECRET
# Cole o secret que voce gerou no GitHub

# Adiciona API key da OpenAI
wrangler secret put OPENAI_API_KEY
# Cole sua API key da OpenAI
```

### 5.3 Testar Webhook

```bash
# Faca um commit de teste
echo "// test" >> src/data/tenants/papervines/playbook.js
git add .
git commit -m "test: webhook trigger"
git push

# Verifique os logs
wrangler tail
```

### 5.4 Monitoramento de Webhooks

Crie um endpoint para verificar status:

```javascript
// Em /src/workers/main.js
export async function handleWebhookStatus(request, env) {
  // Busca ultimos webhooks processados do KV
  const history = await env.CACHE.get('webhook-history', 'json') || [];

  return new Response(JSON.stringify({
    lastProcessed: history[0] || null,
    recentWebhooks: history.slice(0, 10),
    indexStatus: await getIndexStats(env)
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function getIndexStats(env) {
  try {
    const stats = await env.VECTORIZE_INDEX.describe();
    return {
      healthy: true,
      vectorCount: stats.vectorCount
    };
  } catch {
    return { healthy: false };
  }
}
```

---

## 6. Deploy e Configuracao

### 6.1 Setup Inicial Completo

```bash
# 1. Clone o repositorio
git clone https://github.com/seu-usuario/playbook-saas.git
cd playbook-saas

# 2. Instale dependencias
npm install

# 3. Login no Cloudflare
wrangler login

# 4. Crie o indice Vectorize
wrangler vectorize create playbook-embeddings \
  --dimensions=1536 \
  --metric=cosine

# 5. Crie o banco D1 (opcional, para metadata)
wrangler d1 create playbook-db

# 6. Crie o namespace KV (para cache)
wrangler kv:namespace create CACHE

# 7. Atualize wrangler.toml com os IDs gerados

# 8. Configure secrets
wrangler secret put OPENAI_API_KEY
wrangler secret put GITHUB_WEBHOOK_SECRET
wrangler secret put PAPERVINES_CRM_KEY

# 9. Deploy
wrangler deploy

# 10. Indexacao inicial
curl -X POST https://seu-worker.workers.dev/index/manual \
  -H "Content-Type: application/json" \
  -d '{"tenant": "papervines", "fullReindex": true}'
```

### 6.2 Adicionar Novo Tenant

```bash
# 1. Crie a pasta do tenant
mkdir -p src/data/tenants/novo-cliente

# 2. Copie template de arquivos
cp src/data/tenants/papervines/*.js src/data/tenants/novo-cliente/

# 3. Edite os arquivos com conteudo do novo cliente

# 4. Commit e push (webhook indexa automaticamente)
git add src/data/tenants/novo-cliente
git commit -m "feat: adiciona tenant novo-cliente"
git push

# 5. Ou indexe manualmente
curl -X POST https://seu-worker.workers.dev/index/manual \
  -H "Content-Type: application/json" \
  -d '{"tenant": "novo-cliente", "fullReindex": true}'
```

### 6.3 Configurar DNS para Multi-tenant

No Cloudflare Dashboard:

1. **Adicione registro wildcard**:
   ```
   Tipo: CNAME
   Nome: *
   Destino: seu-worker.workers.dev
   Proxy: Ativado
   ```

2. **Configure SSL**:
   - SSL/TLS > Edge Certificates
   - Ative "Always Use HTTPS"

Resultado: `papervines.playbook.seudominio.com` funciona automaticamente.

---

## 7. Manutencao e Monitoramento

### 7.1 Comandos Uteis

```bash
# Ver logs em tempo real
wrangler tail

# Ver metricas
wrangler metrics

# Verificar status do indice
curl https://seu-worker.workers.dev/index/status

# Reindexar tenant especifico
curl -X POST https://seu-worker.workers.dev/index/manual \
  -H "Content-Type: application/json" \
  -d '{"tenant": "papervines", "fullReindex": true}'

# Listar tenants
curl https://seu-worker.workers.dev/api/tenants

# Testar busca RAG
curl -X POST https://seu-worker.workers.dev/api/rag/search \
  -H "Content-Type: application/json" \
  -d '{"query": "como lidar com cliente que acha caro", "tenantId": "papervines"}'
```

### 7.2 Custos Estimados

| Componente | Uso | Custo Mensal |
|------------|-----|--------------|
| Workers | 10M requests | $5 (plano paid) |
| Vectorize | 100K vetores | Incluido |
| D1 | 5GB storage | Incluido |
| KV | 1GB storage | Incluido |
| OpenAI Embeddings | 1M tokens | ~$0.10 |
| **Total** | | **~$5-10/mes** |

### 7.3 Checklist de Seguranca

- [ ] GITHUB_WEBHOOK_SECRET configurado e forte
- [ ] OPENAI_API_KEY como secret (nao em codigo)
- [ ] CRM API keys por tenant como secrets
- [ ] CORS configurado corretamente
- [ ] Rate limiting implementado
- [ ] Logs de acesso ativos

### 7.4 Troubleshooting

| Problema | Causa Provavel | Solucao |
|----------|---------------|---------|
| Webhook nao dispara | Secret incorreto | Verificar GITHUB_WEBHOOK_SECRET |
| Busca retorna vazio | Indice vazio | Executar indexacao manual |
| Erro 429 OpenAI | Rate limit | Adicionar retry com backoff |
| Tenant nao encontrado | Pasta nao existe | Criar estrutura de pastas |
| Embeddings incorretos | Texto muito longo | Verificar chunking |

---

## Proximos Passos Recomendados

1. **Fase 1** (Semana 1-2)
   - [ ] Setup inicial do projeto
   - [ ] Migrar conteudo Paper Vines para nova estrutura
   - [ ] Configurar Vectorize e indexacao inicial

2. **Fase 2** (Semana 3-4)
   - [ ] Implementar GitHub webhook
   - [ ] Testar fluxo completo de atualizacao
   - [ ] Criar primeiro tenant adicional de teste

3. **Fase 3** (Semana 5-6)
   - [ ] Implementar endpoint MCP
   - [ ] Integrar com Claude ou outra IA
   - [ ] Documentar API para clientes

4. **Fase 4** (Continuo)
   - [ ] Onboarding de novos clientes
   - [ ] Monitoramento e otimizacao
   - [ ] Melhorias no sistema de busca

---

## Arquivos de Referencia

Para implementacao completa, os seguintes arquivos devem ser criados:

```
playbook-saas/
├── src/
│   ├── api/
│   │   ├── embeddings.js    # Servico OpenAI
│   │   ├── mcp.js           # Endpoint MCP
│   │   ├── rag.js           # Sistema RAG
│   │   └── tenant.js        # Roteamento multi-tenant
│   ├── data/
│   │   └── tenants/
│   │       └── papervines/  # Conteudo existente
│   └── workers/
│       ├── main.js          # Worker principal
│       └── indexer.js       # Worker de indexacao
├── wrangler.toml
├── package.json
└── docs/
    └── ARQUITETURA-AVANCADA.md  # Este documento
```

---

*Documentacao criada para o projeto Playbook de Vendas - Paper Vines*
*Versao 1.0 - Janeiro 2025*
