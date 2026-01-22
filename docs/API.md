# API Reference - Playbook de Vendas

Documentacao completa dos endpoints da API RAG.

## Base URL

```
https://vendas.papervines.digital
```

## Autenticacao

A API usa header `X-Tenant-ID` para identificar o tenant:

```bash
curl -H "X-Tenant-ID: papervines" https://vendas.papervines.digital/api/rag/search
```

Se nao informado, usa o tenant padrao configurado em `DEFAULT_TENANT`.

---

## Endpoints RAG

### POST /api/rag/search

Busca semantica no playbook de vendas.

**Request:**

```json
{
  "query": "como tratar objecao de preco",
  "tenant": "papervines",
  "category": "objecoes",
  "topK": 5,
  "minScore": 0.7
}
```

| Parametro | Tipo | Obrigatorio | Descricao |
|-----------|------|-------------|-----------|
| query | string | Sim | Texto da busca |
| tenant | string | Nao | ID do tenant (default: header ou config) |
| category | string | Nao | Filtrar por categoria |
| topK | number | Nao | Maximo de resultados (default: 5) |
| minScore | number | Nao | Score minimo (default: 0.7) |

**Response (200):**

```json
{
  "results": [
    {
      "id": "papervines-objecao-preco-esta-muito-caro",
      "score": 0.89,
      "metadata": {
        "tenant": "papervines",
        "category": "objecoes",
        "title": "Esta muito caro",
        "subcategory": "Preco e Investimento",
        "content": "Objecao: \"Esta muito caro\"..."
      }
    }
  ],
  "query": "como tratar objecao de preco",
  "tenant": "papervines",
  "timing": {
    "embedding": 45,
    "search": 12,
    "total": 57
  }
}
```

**Response (400):**

```json
{
  "error": "Query obrigatoria"
}
```

---

### POST /api/rag/objection

Busca especifica para objecoes de clientes.

**Request:**

```json
{
  "objection": "cliente disse que esta muito caro",
  "tenant": "papervines"
}
```

| Parametro | Tipo | Obrigatorio | Descricao |
|-----------|------|-------------|-----------|
| objection | string | Sim | Descricao da objecao |
| tenant | string | Nao | ID do tenant |

**Response (200):**

```json
{
  "objection": "cliente disse que esta muito caro",
  "suggestions": [
    {
      "id": "objecao-preco-esta-muito-caro",
      "title": "Esta muito caro",
      "score": 0.92,
      "content": "Objecao: \"Esta muito caro\"...",
      "category": "Preco e Investimento"
    }
  ],
  "techniques": [
    {
      "name": "LAER",
      "description": "Ouvir, Reconhecer, Explorar, Responder"
    }
  ]
}
```

---

## Endpoints de Indexacao

### POST /index/webhook

Endpoint para receber webhooks do GitHub.

**Headers:**

```
Content-Type: application/json
X-Hub-Signature-256: sha256=abc123...
```

**Request (GitHub Push Event):**

```json
{
  "ref": "refs/heads/main",
  "commits": [
    {
      "added": [],
      "modified": ["src/data/tenants/papervines/objecoes.js"],
      "removed": []
    }
  ],
  "pusher": {
    "name": "usuario"
  }
}
```

**Response (200):**

```json
{
  "message": "Reindexacao processada",
  "filesProcessed": 1,
  "log": {
    "timestamp": "2025-01-21T22:45:00.000Z",
    "files": ["src/data/tenants/papervines/objecoes.js"],
    "pusher": "usuario",
    "commits": 1
  },
  "results": [
    {
      "file": "src/data/tenants/papervines/objecoes.js",
      "status": "success",
      "chunksIndexed": 11,
      "tokens": 2850
    }
  ]
}
```

**Response (401):**

```json
{
  "error": "Assinatura invalida"
}
```

---

### POST /index/manual

Indexacao manual de conteudo de um tenant.

**Request:**

```json
{
  "tenant": "papervines",
  "fullReindex": true,
  "files": [
    "src/data/tenants/papervines/objecoes.js"
  ]
}
```

| Parametro | Tipo | Obrigatorio | Descricao |
|-----------|------|-------------|-----------|
| tenant | string | Sim | ID do tenant |
| fullReindex | boolean | Nao | Se true, remove vetores antigos antes |
| files | array | Nao | Lista especifica de arquivos (default: todos) |

**Response (200):**

```json
{
  "message": "Reindexacao completa concluida",
  "tenant": "papervines",
  "deletedVectors": 59,
  "results": [
    {
      "file": "src/data/tenants/papervines/objecoes.js",
      "status": "success",
      "chunksIndexed": 11,
      "tokens": 2850
    }
  ]
}
```

---

### GET /index/status

Retorna status do indice e historico de webhooks.

**Response (200):**

```json
{
  "status": "online",
  "index": {
    "available": true,
    "vectorCount": 59,
    "dimensions": 1536,
    "metric": "cosine"
  },
  "lastWebhooks": [
    {
      "timestamp": "2025-01-21T22:45:00.000Z",
      "files": ["src/data/tenants/papervines/objecoes.js"],
      "pusher": "usuario",
      "commits": 1
    }
  ],
  "timestamp": "2025-01-21T22:50:00.000Z"
}
```

---

## Endpoints MCP

### GET /mcp/manifest

Retorna o manifesto do servidor MCP.

**Response (200):**

```json
{
  "name": "playbook-vendas-rag",
  "version": "1.0.0",
  "description": "RAG para playbook de vendas multi-tenant",
  "protocol_version": "2024-10-07",
  "capabilities": {
    "tools": true,
    "sampling": false,
    "resources": false
  }
}
```

---

### GET /mcp/tools

Lista ferramentas disponiveis no servidor MCP.

**Response (200):**

```json
{
  "tools": [
    {
      "name": "search_playbook",
      "description": "Busca semantica no playbook de vendas",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query": { "type": "string", "description": "Texto da busca" },
          "category": { "type": "string", "description": "Filtrar por categoria" },
          "topK": { "type": "number", "description": "Maximo de resultados" }
        },
        "required": ["query"]
      }
    },
    {
      "name": "get_objection_response",
      "description": "Obtem sugestoes para tratar objecoes de clientes"
    },
    {
      "name": "get_script",
      "description": "Busca scripts de vendas por situacao"
    },
    {
      "name": "get_pricing",
      "description": "Retorna informacoes de precos e planos"
    },
    {
      "name": "list_topics",
      "description": "Lista categorias disponiveis no playbook"
    }
  ]
}
```

---

### POST /mcp/execute

Executa uma ferramenta MCP.

**Request:**

```json
{
  "tool": "search_playbook",
  "input": {
    "query": "vantagens do chatbot para empresas",
    "topK": 3
  }
}
```

| Parametro | Tipo | Obrigatorio | Descricao |
|-----------|------|-------------|-----------|
| tool | string | Sim | Nome da ferramenta |
| input | object | Sim | Parametros da ferramenta |

**Response (200):**

```json
{
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Encontrei 3 resultados relevantes:\n\n1. Diferenciais Paper Vines (score: 0.91)..."
      }
    ]
  },
  "tool": "search_playbook",
  "timing": 67
}
```

---

### GET /mcp/health

Health check do servidor MCP.

**Response (200):**

```json
{
  "status": "healthy",
  "service": "mcp",
  "capabilities": ["tools"],
  "timestamp": "2025-01-21T22:50:00.000Z"
}
```

---

## Endpoint de Health Check

### GET /health

Retorna status geral do worker.

**Response (200):**

```json
{
  "status": "healthy",
  "service": "playbook-vendas",
  "version": "1.0.0",
  "features": {
    "d1": true,
    "vectorize": true,
    "kv": true,
    "rag": true
  },
  "timestamp": "2025-01-21T22:50:00.000Z"
}
```

---

## Codigos de Erro

| Codigo | Descricao |
|--------|-----------|
| 200 | Sucesso |
| 400 | Parametros invalidos |
| 401 | Autenticacao falhou (webhook) |
| 404 | Recurso nao encontrado |
| 500 | Erro interno do servidor |

## Rate Limits

- **OpenAI Embeddings:** ~3000 requests/min
- **Vectorize Queries:** ~1000 queries/sec
- **Webhook Processing:** 1 por vez (fila interna)

## Exemplos cURL

### Busca simples

```bash
curl -X POST https://vendas.papervines.digital/api/rag/search \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: papervines" \
  -d '{"query": "como funciona a IA"}'
```

### Buscar objecao

```bash
curl -X POST https://vendas.papervines.digital/api/rag/objection \
  -H "Content-Type: application/json" \
  -d '{"objection": "ja uso outra plataforma", "tenant": "papervines"}'
```

### Executar tool MCP

```bash
curl -X POST https://vendas.papervines.digital/mcp/execute \
  -H "Content-Type: application/json" \
  -d '{"tool": "get_pricing", "input": {"planType": "chatbots"}}'
```

### Verificar status

```bash
curl https://vendas.papervines.digital/health
```

---

*Documentacao criada em: 2025-01-21*
