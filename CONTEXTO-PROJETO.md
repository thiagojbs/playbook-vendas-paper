# 📋 CONTEXTO DO PROJETO - Playbook de Vendas Paper Vines

> Documento de referência rápida para continuidade de desenvolvimento

---

## 🎯 Visão Geral

**Nome:** Playbook de Vendas Multi-tenant com RAG
**Cliente:** Paper Vines Digital
**URL Produção:** https://vendas.papervines.digital
**Worker:** https://playbook-vendas-paper.thiagojbs.workers.dev
**Repositório:** playbook-vendas-paper

### O que é?

Sistema completo de Playbook de Vendas que combina:
- **RAG (Retrieval Augmented Generation)** - Busca semântica inteligente
- **MCP (Model Context Protocol)** - Integração com IAs (Claude, etc)
- **Multi-tenant** - Suporte a múltiplos clientes isolados

---

## 🏗️ Stack Tecnológica

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| **Runtime** | Cloudflare Workers | Serverless functions |
| **Database** | Cloudflare D1 | SQLite (clientes, propostas, contratos) |
| **Vetores** | Cloudflare Vectorize | Armazenamento de embeddings |
| **Cache** | Cloudflare KV | Cache de webhooks e resultados |
| **Embeddings** | OpenAI API | text-embedding-3-small (1536D) |
| **Frontend** | JavaScript ES6+ | Server-side rendering |

---

## 📁 Estrutura do Projeto

```
playbook-vendas-paper/
├── wrangler.toml              # Config Cloudflare (bindings, routes)
├── package.json               # Dependências (apenas wrangler)
│
├── docs/                      # Documentação
│   ├── API.md                 # Endpoints documentados
│   ├── MCP.md                 # Integração MCP
│   ├── WEBHOOK-SETUP.md       # Config GitHub webhook
│   ├── NEW-TENANT.md          # Guia novos clientes
│   ├── ARQUITETURA-AVANCADA.md
│   ├── CHECKLIST-IMPLEMENTACAO.md
│   └── LOG-IMPLEMENTACAO.md
│
├── scripts/                   # Automação
│   ├── configure-cloudflare.sh
│   ├── generate-chunks.js     # Gera chunks do playbook
│   ├── test-chunks.js         # Valida chunks
│   ├── upload-chunks.js       # Upload para Vectorize
│   └── test-api.sh            # Testes de API
│
├── output/                    # Arquivos gerados
│   ├── papervines-chunks.json # 59 chunks validados
│   └── papervines-stats.json
│
└── src/
    ├── index.js               # Entry point (roteamento)
    │
    ├── templates/
    │   └── layout.js          # Template HTML base
    │
    ├── data/
    │   ├── tenant-loader.js   # Sistema multi-tenant
    │   └── tenants/
    │       └── papervines/    # Tenant Paper Vines
    │           ├── config.js      # Configurações
    │           ├── playbook.js    # Processo de vendas
    │           ├── objecoes.js    # 40+ objeções
    │           ├── scripts.js     # 45+ scripts
    │           ├── precos.js      # Tabela de preços
    │           └── agentes.js     # Agentes IA
    │
    ├── pages/
    │   ├── home.js            # Dashboard principal
    │   ├── playbook.js        # Central de conhecimento
    │   ├── calculadora.js     # Calculadora de propostas
    │   ├── clientes.js        # CRM básico
    │   ├── propostas.js       # Histórico propostas
    │   ├── contratos.js       # Gestão contratos
    │   └── desempenho.js      # Dashboard performance
    │
    └── api/
        ├── index.js           # Router API
        ├── crm.js             # CRUD clientes
        └── rag/               # Módulo RAG
            ├── index.js       # Router RAG
            ├── embeddings.js  # OpenAI embeddings
            ├── search.js      # Busca Vectorize
            ├── mcp.js         # Servidor MCP
            └── indexer.js     # Webhooks/indexação
```

---

## 🔌 Endpoints Principais

### RAG (Busca Semântica)

| Endpoint | Método | Função |
|----------|--------|--------|
| `/api/rag/search` | POST | Busca semântica genérica |
| `/api/rag/objection` | POST | Busca de objeções |

### MCP (Integração IA)

| Endpoint | Método | Função |
|----------|--------|--------|
| `/mcp/manifest` | GET | Manifesto MCP |
| `/mcp/tools` | GET | Lista 5 ferramentas |
| `/mcp/execute` | POST | Executa ferramenta |
| `/mcp/health` | GET | Health check |

### Indexação

| Endpoint | Método | Função |
|----------|--------|--------|
| `/index/webhook` | POST | GitHub webhook (HMAC) |
| `/index/manual` | POST | Reindexação manual |
| `/index/status` | GET | Status do índice |

### Geral

| Endpoint | Método | Função |
|----------|--------|--------|
| `/health` | GET | Health check geral |
| `/api/clientes` | GET/POST | CRUD clientes |

---

## 🔧 Bindings Cloudflare (wrangler.toml)

```toml
# D1 Database
[[d1_databases]]
binding = "DB"
database_name = "papervines-playbook"
database_id = "a73b2208-94cd-481c-acfb-516e3e7c0e29"

# KV Cache
[[kv_namespaces]]
binding = "CACHE"
id = "9f148151fd734ff38412bf460b7c7180"

# Vectorize
[[vectorize]]
binding = "VECTORIZE_INDEX"
index_name = "playbook-embeddings"
```

### Secrets Necessários

```bash
wrangler secret put OPENAI_API_KEY
wrangler secret put GITHUB_WEBHOOK_SECRET
wrangler secret put WTS_API_KEY  # já configurado
```

---

## 📊 Dados do Tenant Paper Vines

### Conteúdo Indexado (59 chunks)

| Categoria | Quantidade | Descrição |
|-----------|------------|-----------|
| **playbook** | 6 etapas | Processo de vendas completo |
| **objecoes** | 40+ | Tratativas com técnicas e scripts |
| **scripts** | 45+ | Por etapa do funil + variações |
| **precos** | ~15 | Planos, adicionais, implantação |
| **agentes** | ~5 | Perfis de agentes IA |

### Planos de Produto

| Plano | Mensalidade | Usuários | Canais |
|-------|-------------|----------|--------|
| Essential | R$ 487 | 3 | 1 WhatsApp |
| Pro | R$ 687 | 5 | Múltiplos |
| Plus+ | R$ 987 | 10 | Múltiplos |
| Advanced | R$ 1.487 | 20 | Múltiplos |

---

## 🚀 Status de Implementação

### ✅ Concluído (100%)

- [x] Estrutura multi-tenant completa
- [x] Módulos RAG funcionais (embeddings, search, mcp, indexer)
- [x] Integração MCP com 5 ferramentas
- [x] 59 chunks indexados no Vectorize
- [x] Sistema de templates/layout
- [x] Páginas frontend (home, playbook, calculadora, clientes)
- [x] Documentação completa (API & MCP dentro do Playbook)
- [x] Vectorize configurado em produção
- [x] GitHub Webhook configurado e testado
- [x] Busca RAG funcionando (minScore: 0.3)
- [x] Página de documentação técnica no frontend

### 📋 Commits Recentes (referência)

```
27f2a76 fix: corrigir sintaxe de template literals na documentação API
458f482 feat: mover documentação API & MCP para dentro do Playbook
d877787 feat: adicionar página de documentação técnica API & MCP
f4f96dd fix: corrigir deleteVectorsByTenant para Vectorize v2
14824e9 fix: corrigir erro 'undefined is not iterable' na indexação
86473ac fix: Melhorar tratamento de erros e filtrar textos vazios
1523c83 test: Trigger webhook para testar reindexacao automatica
8cd190c fix: Reduzir minScore para 0.3 para capturar mais resultados
```

---

## 🔄 Fluxo de Dados

### Busca RAG

```
Query do usuário
    ↓
generateEmbedding() → vetor 1536D
    ↓
VECTORIZE_INDEX.query()
    ↓
Filtra por tenant + categoria
    ↓
Retorna top-K resultados com score
```

### Indexação (GitHub Webhook)

```
Push para main
    ↓
POST /index/webhook (HMAC verificado)
    ↓
Detecta arquivos alterados em src/data/tenants/
    ↓
Carrega conteúdo via GitHub API
    ↓
Gera embeddings em batch
    ↓
Upsert no Vectorize
```

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento local
wrangler dev

# Deploy
wrangler deploy

# Logs em tempo real
wrangler tail

# Gerar chunks
node scripts/generate-chunks.js papervines

# Testar API
./scripts/test-api.sh https://vendas.papervines.digital

# Status do índice
curl https://vendas.papervines.digital/index/status
```

---

## 📝 Notas para Desenvolvimento

### Adicionar Novo Tenant

1. Criar pasta `src/data/tenants/{novo-tenant}/`
2. Criar config.js, playbook.js, objecoes.js, scripts.js, precos.js
3. Registrar em tenant-loader.js
4. Gerar chunks: `node scripts/generate-chunks.js {novo-tenant}`
5. Reindexar: `POST /index/manual {"tenant": "{novo-tenant}"}`

### Padrão de Identificação de Tenant

Ordem de prioridade:
1. Header `X-Tenant-ID`
2. Subdomínio (vendas.papervines.digital → papervines)
3. Path `/tenant/{id}/...`
4. Query `?tenant=id`
5. Fallback: `papervines`

### Categorias de Chunks

- `playbook` - Processo de vendas, etapas, checklists
- `objecoes` - Tratativas de objeções
- `scripts` - Scripts de vendas por etapa
- `precos` - Tabela de preços
- `agentes` - Perfis de agentes IA

---

## 🔗 Links Importantes

- **Produção:** https://vendas.papervines.digital
- **Figma (Propostas):** Link interno
- **Drive (Contratos):** Link interno
- **Meta Business:** business.facebook.com

---

*Última atualização: Janeiro 2026*
