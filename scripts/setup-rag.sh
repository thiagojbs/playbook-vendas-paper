#!/bin/bash
# Script de Setup - RAG Multi-tenant com Cloudflare
# Execute: chmod +x setup-rag.sh && ./setup-rag.sh

set -e

echo "=========================================="
echo "  Setup RAG Multi-tenant - Playbook SaaS"
echo "=========================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funcao para verificar comando
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}Erro: $1 nao encontrado. Por favor instale antes de continuar.${NC}"
        exit 1
    fi
}

# Funcao para confirmar acao
confirm() {
    read -p "$1 (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        return 1
    fi
    return 0
}

echo "1. Verificando pre-requisitos..."
echo "--------------------------------"

check_command node
check_command npm
check_command git

# Verifica versao do Node
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}Node.js 18+ necessario. Versao atual: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}Node.js: $(node -v)${NC}"

# Verifica/instala wrangler
if ! command -v wrangler &> /dev/null; then
    echo -e "${YELLOW}Wrangler nao encontrado. Instalando...${NC}"
    npm install -g wrangler
fi
echo -e "${GREEN}Wrangler: $(wrangler --version)${NC}"

echo ""
echo "2. Verificando autenticacao Cloudflare..."
echo "-----------------------------------------"

if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}Voce precisa fazer login no Cloudflare${NC}"
    wrangler login
fi

ACCOUNT_INFO=$(wrangler whoami 2>&1)
echo -e "${GREEN}Autenticado como:${NC}"
echo "$ACCOUNT_INFO"

echo ""
echo "3. Criando estrutura de pastas..."
echo "---------------------------------"

# Cria estrutura de pastas
mkdir -p src/api
mkdir -p src/data/tenants/papervines
mkdir -p src/workers
mkdir -p docs
mkdir -p scripts

echo -e "${GREEN}Estrutura de pastas criada${NC}"

echo ""
echo "4. Criando indice Vectorize..."
echo "------------------------------"

INDEX_NAME="playbook-embeddings"

# Verifica se indice ja existe
if wrangler vectorize list 2>&1 | grep -q "$INDEX_NAME"; then
    echo -e "${YELLOW}Indice '$INDEX_NAME' ja existe${NC}"
else
    if confirm "Criar indice Vectorize '$INDEX_NAME'?"; then
        wrangler vectorize create $INDEX_NAME \
            --dimensions=1536 \
            --metric=cosine
        echo -e "${GREEN}Indice criado com sucesso${NC}"
    fi
fi

echo ""
echo "5. Criando namespace KV..."
echo "--------------------------"

KV_NAMESPACE="PLAYBOOK_CACHE"

# Lista namespaces existentes
EXISTING_KV=$(wrangler kv:namespace list 2>&1 || echo "")

if echo "$EXISTING_KV" | grep -q "$KV_NAMESPACE"; then
    echo -e "${YELLOW}Namespace KV '$KV_NAMESPACE' ja existe${NC}"
else
    if confirm "Criar namespace KV '$KV_NAMESPACE'?"; then
        KV_RESULT=$(wrangler kv:namespace create "$KV_NAMESPACE" 2>&1)
        echo "$KV_RESULT"
        echo -e "${GREEN}Namespace KV criado${NC}"

        # Extrai o ID do KV
        KV_ID=$(echo "$KV_RESULT" | grep -oP 'id = "\K[^"]+' || echo "")
        if [ -n "$KV_ID" ]; then
            echo -e "${YELLOW}KV ID: $KV_ID${NC}"
            echo "Adicione ao wrangler.toml:"
            echo "[[kv_namespaces]]"
            echo "binding = \"CACHE\""
            echo "id = \"$KV_ID\""
        fi
    fi
fi

echo ""
echo "6. Configurando secrets..."
echo "--------------------------"

echo -e "${YELLOW}Voce precisara configurar os seguintes secrets:${NC}"
echo "  - OPENAI_API_KEY: Sua API key da OpenAI"
echo "  - GITHUB_WEBHOOK_SECRET: Secret para validar webhooks"
echo "  - CRM API keys por tenant (opcional)"
echo ""

if confirm "Configurar OPENAI_API_KEY agora?"; then
    echo "Digite sua OpenAI API Key:"
    wrangler secret put OPENAI_API_KEY
fi

if confirm "Configurar GITHUB_WEBHOOK_SECRET agora?"; then
    # Gera secret aleatorio se usuario quiser
    if confirm "Gerar secret aleatorio?"; then
        WEBHOOK_SECRET=$(openssl rand -hex 32)
        echo -e "${GREEN}Secret gerado: $WEBHOOK_SECRET${NC}"
        echo -e "${YELLOW}IMPORTANTE: Salve este secret para configurar no GitHub!${NC}"
        echo "$WEBHOOK_SECRET" | wrangler secret put GITHUB_WEBHOOK_SECRET
    else
        echo "Digite o secret do webhook:"
        wrangler secret put GITHUB_WEBHOOK_SECRET
    fi
fi

echo ""
echo "7. Gerando wrangler.toml..."
echo "---------------------------"

if [ -f "wrangler.toml" ]; then
    if confirm "wrangler.toml ja existe. Sobrescrever?"; then
        OVERWRITE=true
    else
        OVERWRITE=false
    fi
else
    OVERWRITE=true
fi

if [ "$OVERWRITE" = true ]; then
cat > wrangler.toml << 'EOF'
name = "playbook-saas"
main = "src/workers/main.js"
compatibility_date = "2024-01-01"

# Variaveis de ambiente
[vars]
DEFAULT_TENANT = "papervines"
ENVIRONMENT = "production"

# Vectorize binding
[[vectorize]]
binding = "VECTORIZE_INDEX"
index_name = "playbook-embeddings"

# KV para cache - ATUALIZE O ID!
# [[kv_namespaces]]
# binding = "CACHE"
# id = "SEU_KV_ID_AQUI"

# D1 Database (opcional) - ATUALIZE O ID!
# [[d1_databases]]
# binding = "DB"
# database_name = "playbook-db"
# database_id = "SEU_D1_ID_AQUI"

# Configuracao de build
[build]
command = "npm run build"

# Triggers (se necessario)
# [triggers]
# crons = ["0 */6 * * *"]  # A cada 6 horas
EOF

echo -e "${GREEN}wrangler.toml criado${NC}"
echo -e "${YELLOW}IMPORTANTE: Atualize os IDs do KV e D1 no arquivo!${NC}"
fi

echo ""
echo "8. Gerando package.json..."
echo "--------------------------"

if [ ! -f "package.json" ]; then
cat > package.json << 'EOF'
{
  "name": "playbook-saas",
  "version": "1.0.0",
  "description": "Playbook de Vendas Multi-tenant com RAG",
  "main": "src/workers/main.js",
  "type": "module",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "tail": "wrangler tail",
    "index": "node scripts/index-content.js",
    "test": "node scripts/test-rag.js"
  },
  "dependencies": {},
  "devDependencies": {
    "wrangler": "^3.0.0"
  },
  "keywords": ["cloudflare", "workers", "rag", "playbook", "vendas"],
  "author": "",
  "license": "MIT"
}
EOF
echo -e "${GREEN}package.json criado${NC}"
else
echo -e "${YELLOW}package.json ja existe${NC}"
fi

echo ""
echo "9. Instalando dependencias..."
echo "-----------------------------"

npm install

echo ""
echo "=========================================="
echo "  Setup Concluido!"
echo "=========================================="
echo ""
echo "Proximos passos:"
echo ""
echo "1. Atualize wrangler.toml com os IDs corretos"
echo ""
echo "2. Configure webhook no GitHub:"
echo "   - URL: https://playbook-saas.SEU_SUBDOMAIN.workers.dev/index/webhook"
echo "   - Content-type: application/json"
echo "   - Secret: Use o secret gerado/configurado"
echo ""
echo "3. Migre o conteudo para src/data/tenants/papervines/"
echo ""
echo "4. Faca o deploy:"
echo "   npm run deploy"
echo ""
echo "5. Execute indexacao inicial:"
echo "   curl -X POST https://SEU_WORKER/index/manual \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"tenant\": \"papervines\", \"fullReindex\": true}'"
echo ""
echo -e "${GREEN}Documentacao completa: docs/ARQUITETURA-AVANCADA.md${NC}"
