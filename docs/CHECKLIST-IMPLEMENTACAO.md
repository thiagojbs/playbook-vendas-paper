# Checklist de Implementacao

Guia rapido passo a passo para implementar RAG Multi-tenant com GitHub Webhooks.

---

## Fase 1: Preparacao (30 min)

### 1.1 Pre-requisitos

- [ ] Node.js 18+ instalado
- [ ] Conta Cloudflare ativa
- [ ] Plano Workers Paid ativado ($5/mes)
- [ ] Conta OpenAI com API key
- [ ] Repositorio GitHub criado

### 1.2 Instalacoes

```bash
# Instalar Wrangler CLI
npm install -g wrangler

# Login Cloudflare
wrangler login

# Verificar autenticacao
wrangler whoami
```

---

## Fase 2: Setup Cloudflare (15 min)

### 2.1 Criar Indice Vectorize

```bash
wrangler vectorize create playbook-embeddings \
  --dimensions=1536 \
  --metric=cosine
```

- [ ] Comando executado com sucesso
- [ ] Indice aparece em `wrangler vectorize list`

### 2.2 Criar Namespace KV

```bash
wrangler kv:namespace create PLAYBOOK_CACHE
```

- [ ] Anotar o ID gerado: `________________`

### 2.3 Configurar Secrets

```bash
# OpenAI API Key
wrangler secret put OPENAI_API_KEY
# Cole: sk-...

# GitHub Webhook Secret (gere um random)
openssl rand -hex 32
# Anote: ________________________________

wrangler secret put GITHUB_WEBHOOK_SECRET
# Cole o secret gerado
```

- [ ] OPENAI_API_KEY configurado
- [ ] GITHUB_WEBHOOK_SECRET configurado e anotado

---

## Fase 3: Estrutura Multi-tenant (20 min)

### 3.1 Criar Estrutura de Pastas

```bash
mkdir -p src/data/tenants/papervines
mkdir -p src/api
mkdir -p src/workers
```

### 3.2 Mover Conteudo Existente

```bash
# Mover arquivos de dados para pasta do tenant
mv src/data/playbook.js src/data/tenants/papervines/
mv src/data/objecoes.js src/data/tenants/papervines/
mv src/data/scripts.js src/data/tenants/papervines/
mv src/data/precos.js src/data/tenants/papervines/
mv src/data/agentes.js src/data/tenants/papervines/
```

- [ ] Arquivos movidos
- [ ] Paths atualizados nos imports

### 3.3 Criar config.js do Tenant

Criar `src/data/tenants/papervines/config.js`:

```javascript
export const TENANT_CONFIG = {
  id: 'papervines',
  nome: 'Paper Vines',
  tema: {
    corPrimaria: '#667eea',
    corSecundaria: '#764ba2'
  },
  crm: {
    provider: 'wtschat'
  },
  modulos: {
    calculadora: true,
    desempenho: true,
    objecoes: true,
    scripts: true
  }
};
```

- [ ] config.js criado

---

## Fase 4: Deploy Worker RAG (15 min)

### 4.1 Atualizar wrangler.toml

```toml
name = "playbook-saas"
main = "src/workers/main-rag.js"
compatibility_date = "2024-01-01"

[vars]
DEFAULT_TENANT = "papervines"

[[vectorize]]
binding = "VECTORIZE_INDEX"
index_name = "playbook-embeddings"

[[kv_namespaces]]
binding = "CACHE"
id = "SEU_KV_ID_AQUI"  # <-- Substituir!
```

- [ ] wrangler.toml atualizado com KV ID

### 4.2 Deploy

```bash
wrangler deploy
```

- [ ] Deploy concluido
- [ ] URL do worker: `https://playbook-saas.SEU_SUBDOMAIN.workers.dev`

### 4.3 Testar Health Check

```bash
curl https://playbook-saas.SEU_SUBDOMAIN.workers.dev/health
```

Resposta esperada:
```json
{"status":"ok","timestamp":"..."}
```

- [ ] Health check funcionando

---

## Fase 5: Configurar GitHub Webhook (10 min)

### 5.1 Acessar Configuracoes do Repo

1. GitHub > Seu Repositorio > Settings > Webhooks
2. Clicar "Add webhook"

### 5.2 Preencher Dados

| Campo | Valor |
|-------|-------|
| Payload URL | `https://playbook-saas.SEU_SUBDOMAIN.workers.dev/index/webhook` |
| Content type | `application/json` |
| Secret | O secret que voce gerou na Fase 2.3 |
| Events | `Just the push event` |
| Active | Marcado |

- [ ] Webhook configurado
- [ ] Ping inicial com sucesso (check verde)

---

## Fase 6: Indexacao Inicial (10 min)

### 6.1 Gerar Chunks do Conteudo

```bash
node scripts/content-to-chunks.js papervines
```

- [ ] Arquivo `output/papervines-chunks.json` gerado

### 6.2 Executar Indexacao Manual

```bash
curl -X POST https://playbook-saas.SEU_SUBDOMAIN.workers.dev/index/manual \
  -H "Content-Type: application/json" \
  -d '{"tenant": "papervines", "fullReindex": true}'
```

Resposta esperada:
```json
{
  "message": "Reindexacao completa concluida",
  "tenant": "papervines",
  "results": [...]
}
```

- [ ] Indexacao concluida

### 6.3 Verificar Status do Indice

```bash
curl https://playbook-saas.SEU_SUBDOMAIN.workers.dev/index/status
```

- [ ] `vectorCount` > 0

---

## Fase 7: Testar Sistema (15 min)

### 7.1 Testar Busca RAG

```bash
curl -X POST https://playbook-saas.SEU_SUBDOMAIN.workers.dev/api/rag/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "como lidar com cliente que acha caro",
    "tenantId": "papervines"
  }'
```

- [ ] Resultados retornados
- [ ] Score > 0.7

### 7.2 Testar Endpoint MCP

```bash
# Manifesto
curl https://playbook-saas.SEU_SUBDOMAIN.workers.dev/mcp/manifest

# Ferramentas
curl https://playbook-saas.SEU_SUBDOMAIN.workers.dev/mcp/tools

# Execucao
curl -X POST https://playbook-saas.SEU_SUBDOMAIN.workers.dev/mcp/execute \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "search_playbook",
    "parameters": {
      "query": "tecnicas de fechamento",
      "tenant": "papervines"
    }
  }'
```

- [ ] Manifesto retorna info do servidor
- [ ] Tools lista ferramentas disponiveis
- [ ] Execute retorna resultados

### 7.3 Testar Webhook (Commit de Teste)

```bash
# Faca pequena alteracao
echo "// updated $(date)" >> src/data/tenants/papervines/playbook.js

git add .
git commit -m "test: trigger webhook"
git push
```

Verificar logs:
```bash
wrangler tail
```

- [ ] Webhook recebido nos logs
- [ ] Reindexacao processada

---

## Fase 8: Adicionar Novo Tenant (Opcional)

### 8.1 Criar Estrutura

```bash
mkdir -p src/data/tenants/novo-cliente
```

### 8.2 Copiar Template

```bash
cp src/data/tenants/papervines/config.js src/data/tenants/novo-cliente/
```

### 8.3 Editar config.js

```javascript
export const TENANT_CONFIG = {
  id: 'novo-cliente',
  nome: 'Nome do Cliente',
  // ... resto da config
};
```

### 8.4 Adicionar Conteudo

Criar arquivos:
- `playbook.js`
- `objecoes.js`
- `scripts.js`
- `precos.js`

### 8.5 Indexar

```bash
curl -X POST https://playbook-saas.SEU_SUBDOMAIN.workers.dev/index/manual \
  -H "Content-Type: application/json" \
  -d '{"tenant": "novo-cliente", "fullReindex": true}'
```

- [ ] Novo tenant funcionando

---

## Troubleshooting

### Webhook nao dispara

1. Verificar secret esta correto nos dois lados
2. Verificar URL do webhook esta acessivel
3. Ver "Recent Deliveries" no GitHub

### Busca retorna vazio

1. Verificar indexacao foi executada
2. Verificar `index/status` mostra vectorCount > 0
3. Tentar query mais simples

### Erro 401 no OpenAI

1. Verificar API key esta correta
2. Verificar creditos disponiveis na conta OpenAI

### Erro "Tenant nao encontrado"

1. Verificar pasta do tenant existe
2. Verificar config.js tem `id` correto
3. Verificar header `X-Tenant-ID` ou subdominio

---

## URLs de Referencia

| Recurso | URL |
|---------|-----|
| Worker | `https://playbook-saas.SEU_SUBDOMAIN.workers.dev` |
| Health | `/health` |
| RAG Search | `/api/rag/search` |
| MCP Manifest | `/mcp/manifest` |
| Index Status | `/index/status` |
| Index Manual | `/index/manual` |
| Webhook | `/index/webhook` |

---

## Custos Mensais Estimados

| Item | Custo |
|------|-------|
| Cloudflare Workers Paid | $5 |
| OpenAI Embeddings (100K tokens) | ~$0.01 |
| **Total** | **~$5/mes** |

---

*Checklist criado para Playbook Paper Vines - Janeiro 2025*
