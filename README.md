# Paper Vines - Playbook de Vendas

Sistema completo de Playbook de Vendas para a Paper Vines, com RAG (Retrieval Augmented Generation), MCP (Model Context Protocol) e arquitetura multi-tenant.

## Funcionalidades

### Playbook de Vendas
- Processo de vendas em 6 etapas
- Scripts prontos para cada fase (prospecção, proposta, contrato, pós-venda)
- Tratativas de objeções com respostas prontas
- Checklists comercial e de contrato
- Links úteis integrados

### RAG (Retrieval Augmented Generation)
- Busca semântica no conteúdo do playbook
- Embeddings via OpenAI (text-embedding-3-small)
- Armazenamento no Cloudflare Vectorize
- Reindexação automática via GitHub Webhook

### MCP (Model Context Protocol)
- Integração com assistentes de IA (Claude, etc.)
- 5 ferramentas disponíveis:
  - `search_playbook`: Busca semântica
  - `get_objection_response`: Tratativas de objeções
  - `get_script`: Scripts de vendas
  - `get_pricing`: Informações de preços
  - `list_topics`: Categorias disponíveis

### Multi-tenant
- Arquitetura para múltiplos clientes
- Dados isolados por tenant
- Configurações personalizáveis

### Calculadora de Propostas
- Configuração interativa de planos
- Cálculo automático de mensalidade e implantação
- Geração de proposta formatada para WhatsApp

### Gestão de Clientes (CRUD)
- Cadastro completo de clientes
- Filtros por status e busca
- Integração com banco D1

## Tecnologias

- **Cloudflare Workers** - Serverless functions
- **Cloudflare D1** - Banco de dados SQLite
- **Cloudflare Vectorize** - Banco de vetores para RAG
- **Cloudflare KV** - Cache de dados
- **OpenAI API** - Geração de embeddings
- **JavaScript ES6+** - Frontend e Backend

## Estrutura do Projeto

```
playbook-vendas-paper/
├── wrangler.toml           # Configuração Cloudflare
├── package.json
├── docs/                   # Documentação
│   ├── LOG-IMPLEMENTACAO.md
│   ├── API.md
│   ├── MCP.md
│   ├── WEBHOOK-SETUP.md
│   └── NEW-TENANT.md
├── scripts/                # Scripts de automação
│   ├── configure-cloudflare.sh
│   ├── generate-chunks.js
│   ├── test-chunks.js
│   ├── upload-chunks.js
│   └── test-api.sh
├── output/                 # Arquivos gerados
│   ├── papervines-chunks.json
│   └── papervines-stats.json
└── src/
    ├── index.js            # Entry point
    ├── templates/
    │   └── layout.js
    ├── data/
    │   ├── tenant-loader.js    # Sistema multi-tenant
    │   ├── playbook.js         # Compatibilidade
    │   └── tenants/
    │       └── papervines/     # Tenant Paper Vines
    │           ├── config.js
    │           ├── playbook.js
    │           ├── objecoes.js
    │           ├── scripts.js
    │           ├── precos.js
    │           └── agentes.js
    ├── pages/
    │   ├── home.js
    │   ├── playbook.js
    │   ├── calculadora.js
    │   ├── clientes.js
    │   ├── propostas.js
    │   ├── contratos.js
    │   └── desempenho.js
    └── api/
        ├── index.js
        ├── crm.js
        └── rag/               # Módulo RAG
            ├── index.js
            ├── embeddings.js
            ├── search.js
            ├── mcp.js
            └── indexer.js
```

## Instalação

### 1. Pré-requisitos

```bash
npm install -g wrangler
wrangler login
```

### 2. Configurar Cloudflare

```bash
# Criar recursos Cloudflare (Vectorize, KV)
chmod +x scripts/configure-cloudflare.sh
./scripts/configure-cloudflare.sh
```

### 3. Configurar Secrets

```bash
wrangler secret put OPENAI_API_KEY
wrangler secret put GITHUB_WEBHOOK_SECRET
```

### 4. Atualizar wrangler.toml

Adicione os IDs gerados pelo script de configuração.

### 5. Deploy

```bash
wrangler deploy
```

## Indexação de Conteúdo

### Gerar Chunks

```bash
node scripts/generate-chunks.js papervines
```

### Validar Chunks

```bash
node scripts/test-chunks.js papervines
```

### Upload para Vectorize

```bash
export CLOUDFLARE_ACCOUNT_ID="..."
export CLOUDFLARE_API_TOKEN="..."
export OPENAI_API_KEY="..."

node scripts/upload-chunks.js papervines
```

## API Endpoints

### RAG

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/rag/search` | POST | Busca semântica |
| `/api/rag/objection` | POST | Busca de objeções |
| `/index/webhook` | POST | GitHub Webhook |
| `/index/manual` | POST | Indexação manual |
| `/index/status` | GET | Status do índice |

### MCP

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/mcp/manifest` | GET | Manifesto MCP |
| `/mcp/tools` | GET | Lista ferramentas |
| `/mcp/execute` | POST | Executa ferramenta |
| `/mcp/health` | GET | Health check MCP |

### Exemplo de Busca

```bash
curl -X POST https://vendas.papervines.digital/api/rag/search \
  -H "Content-Type: application/json" \
  -d '{"query": "como tratar objeção de preço", "tenant": "papervines"}'
```

## Integração MCP

Adicione ao Claude Desktop config:

```json
{
  "mcpServers": {
    "playbook-vendas": {
      "url": "https://vendas.papervines.digital/mcp",
      "headers": {
        "X-Tenant-ID": "papervines"
      }
    }
  }
}
```

## Documentação

- [LOG-IMPLEMENTACAO.md](docs/LOG-IMPLEMENTACAO.md) - Log detalhado de implementação
- [API.md](docs/API.md) - Documentação completa da API
- [MCP.md](docs/MCP.md) - Guia de integração MCP
- [WEBHOOK-SETUP.md](docs/WEBHOOK-SETUP.md) - Configuração do webhook
- [NEW-TENANT.md](docs/NEW-TENANT.md) - Guia para novos tenants

## Testes

```bash
# Testes locais
./scripts/test-api.sh http://localhost:8787

# Testes em produção
./scripts/test-api.sh https://vendas.papervines.digital
```

## URLs

- **Produção**: https://vendas.papervines.digital
- **Worker**: https://playbook-vendas-paper.thiagojbs.workers.dev

## Custos Estimados

| Recurso | Custo |
|---------|-------|
| Cloudflare Workers | Gratuito (até 100k req/dia) |
| Cloudflare Vectorize | Gratuito (até 30M queries/mês) |
| OpenAI Embeddings | ~$0.0001 por indexação completa |

## Licença

Propriedade de Paper Vines Digital.
