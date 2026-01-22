#!/bin/bash
# ===========================================
# Script de Configuracao Cloudflare
# Playbook de Vendas - RAG Multi-tenant
# ===========================================
#
# Execute este script apos instalar o wrangler:
#   npm install -g wrangler
#   wrangler login
#   chmod +x scripts/configure-cloudflare.sh
#   ./scripts/configure-cloudflare.sh
#
# ===========================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}=========================================="
echo "  Configuracao Cloudflare - Playbook RAG"
echo -e "==========================================${NC}"
echo ""

# Verifica se wrangler esta instalado
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}Erro: wrangler nao encontrado${NC}"
    echo "Instale com: npm install -g wrangler"
    exit 1
fi

# Verifica autenticacao
echo -e "${YELLOW}Verificando autenticacao...${NC}"
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}Voce precisa fazer login no Cloudflare${NC}"
    wrangler login
fi

ACCOUNT_INFO=$(wrangler whoami 2>&1 | head -5)
echo -e "${GREEN}Autenticado:${NC}"
echo "$ACCOUNT_INFO"
echo ""

# ===========================================
# 1. CRIAR INDICE VECTORIZE
# ===========================================
echo -e "${BLUE}[1/4] Criando indice Vectorize...${NC}"

INDEX_NAME="playbook-embeddings"
EXISTING_INDEXES=$(wrangler vectorize list 2>&1 || echo "")

if echo "$EXISTING_INDEXES" | grep -q "$INDEX_NAME"; then
    echo -e "${YELLOW}Indice '$INDEX_NAME' ja existe${NC}"
else
    echo "Criando indice '$INDEX_NAME'..."
    wrangler vectorize create "$INDEX_NAME" \
        --dimensions=1536 \
        --metric=cosine
    echo -e "${GREEN}Indice criado com sucesso!${NC}"
fi

# ===========================================
# 2. CRIAR NAMESPACE KV
# ===========================================
echo ""
echo -e "${BLUE}[2/4] Criando namespace KV...${NC}"

KV_TITLE="PLAYBOOK_CACHE"
KV_RESULT=$(wrangler kv:namespace create "$KV_TITLE" 2>&1 || echo "already exists")

if echo "$KV_RESULT" | grep -q "already exists"; then
    echo -e "${YELLOW}Namespace KV ja existe. Listando namespaces...${NC}"
    wrangler kv:namespace list
else
    echo "$KV_RESULT"

    # Extrai o ID do KV
    KV_ID=$(echo "$KV_RESULT" | grep -oP 'id = "\K[^"]+' || echo "")

    if [ -n "$KV_ID" ]; then
        echo ""
        echo -e "${GREEN}KV criado com sucesso!${NC}"
        echo -e "${YELLOW}ID do KV: $KV_ID${NC}"
        echo ""
        echo "Adicione ao wrangler.toml:"
        echo "[[kv_namespaces]]"
        echo "binding = \"CACHE\""
        echo "id = \"$KV_ID\""
    fi
fi

# ===========================================
# 3. CONFIGURAR SECRETS
# ===========================================
echo ""
echo -e "${BLUE}[3/4] Configurando secrets...${NC}"

# OpenAI API Key
echo ""
read -p "Deseja configurar OPENAI_API_KEY agora? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Digite sua OpenAI API Key (sk-...):"
    wrangler secret put OPENAI_API_KEY
    echo -e "${GREEN}OPENAI_API_KEY configurado!${NC}"
else
    echo -e "${YELLOW}Pule esta etapa. Configure depois com: wrangler secret put OPENAI_API_KEY${NC}"
fi

# GitHub Webhook Secret
echo ""
read -p "Deseja configurar GITHUB_WEBHOOK_SECRET agora? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Gera secret aleatorio
    WEBHOOK_SECRET=$(openssl rand -hex 32 2>/dev/null || cat /dev/urandom | tr -dc 'a-f0-9' | fold -w 64 | head -n 1)

    echo ""
    echo -e "${GREEN}Secret gerado:${NC}"
    echo -e "${YELLOW}$WEBHOOK_SECRET${NC}"
    echo ""
    echo -e "${RED}IMPORTANTE: Salve este secret! Voce precisara dele para configurar o webhook no GitHub.${NC}"
    echo ""

    read -p "Pressione ENTER apos salvar o secret..."

    echo "$WEBHOOK_SECRET" | wrangler secret put GITHUB_WEBHOOK_SECRET
    echo -e "${GREEN}GITHUB_WEBHOOK_SECRET configurado!${NC}"
else
    echo -e "${YELLOW}Configure depois com: wrangler secret put GITHUB_WEBHOOK_SECRET${NC}"
fi

# ===========================================
# 4. ATUALIZAR WRANGLER.TOML
# ===========================================
echo ""
echo -e "${BLUE}[4/4] Verificando wrangler.toml...${NC}"

WRANGLER_FILE="wrangler.toml"

if [ -f "$WRANGLER_FILE" ]; then
    echo "Arquivo encontrado. Verifique se as configuracoes estao corretas:"
    echo ""
    grep -A 2 "vectorize" "$WRANGLER_FILE" 2>/dev/null || echo "(Vectorize nao configurado)"
    echo ""
    grep -A 2 "kv_namespaces" "$WRANGLER_FILE" 2>/dev/null || echo "(KV nao configurado)"
else
    echo -e "${RED}wrangler.toml nao encontrado!${NC}"
fi

# ===========================================
# RESUMO FINAL
# ===========================================
echo ""
echo -e "${BLUE}=========================================="
echo "  RESUMO DA CONFIGURACAO"
echo -e "==========================================${NC}"
echo ""
echo -e "${GREEN}✅ Recursos criados:${NC}"
echo "   - Vectorize: $INDEX_NAME"
echo "   - KV Namespace: $KV_TITLE"
echo ""
echo -e "${YELLOW}📋 Proximos passos:${NC}"
echo "   1. Atualize wrangler.toml com os IDs gerados"
echo "   2. Execute: wrangler deploy"
echo "   3. Configure webhook no GitHub com o secret gerado"
echo "   4. Execute indexacao inicial"
echo ""
echo -e "${BLUE}Comandos uteis:${NC}"
echo "   wrangler deploy              # Deploy do worker"
echo "   wrangler tail                # Ver logs em tempo real"
echo "   wrangler vectorize list      # Listar indices"
echo "   wrangler kv:namespace list   # Listar namespaces KV"
echo ""
