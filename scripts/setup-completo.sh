#!/bin/bash
# ===========================================
# Script de Setup Completo - Cloudflare RAG
# Playbook de Vendas - Paper Vines
# ===========================================
#
# Este script configura todos os recursos necessarios:
# 1. Vectorize Index
# 2. KV Namespace
# 3. Secrets
# 4. Deploy do Worker
#
# Uso:
#   export CLOUDFLARE_API_TOKEN="seu_token"
#   export OPENAI_API_KEY="sua_chave_openai"
#   ./scripts/setup-completo.sh
#
# ===========================================

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}==========================================="
echo "  Setup Completo - Playbook RAG"
echo -e "===========================================${NC}"
echo ""

# Verificar token
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}Erro: CLOUDFLARE_API_TOKEN nao configurado${NC}"
    echo "Execute: export CLOUDFLARE_API_TOKEN=\"seu_token\""
    exit 1
fi

# Verificar OpenAI key
if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${YELLOW}Aviso: OPENAI_API_KEY nao configurado${NC}"
    echo "Sera necessario para o upload de chunks"
    echo ""
fi

echo -e "${GREEN}✓ Token Cloudflare configurado${NC}"

# ===========================================
# 1. VERIFICAR AUTENTICACAO
# ===========================================
echo ""
echo -e "${BLUE}[1/6] Verificando autenticacao...${NC}"

npx wrangler whoami
if [ $? -ne 0 ]; then
    echo -e "${RED}Erro na autenticacao. Verifique o token.${NC}"
    exit 1
fi

# ===========================================
# 2. CRIAR VECTORIZE INDEX
# ===========================================
echo ""
echo -e "${BLUE}[2/6] Criando indice Vectorize...${NC}"

# Verificar se ja existe
EXISTING=$(npx wrangler vectorize list 2>/dev/null | grep -c "playbook-embeddings" || echo "0")

if [ "$EXISTING" -gt "0" ]; then
    echo -e "${YELLOW}Indice 'playbook-embeddings' ja existe${NC}"
else
    npx wrangler vectorize create playbook-embeddings \
        --dimensions=1536 \
        --metric=cosine
    echo -e "${GREEN}✓ Indice Vectorize criado${NC}"
fi

# ===========================================
# 3. CRIAR KV NAMESPACE
# ===========================================
echo ""
echo -e "${BLUE}[3/6] Criando namespace KV...${NC}"

# Criar e capturar o ID
KV_OUTPUT=$(npx wrangler kv:namespace create PLAYBOOK_CACHE 2>&1 || true)

if echo "$KV_OUTPUT" | grep -q "already exists"; then
    echo -e "${YELLOW}Namespace 'PLAYBOOK_CACHE' ja existe${NC}"
    KV_ID=$(npx wrangler kv:namespace list 2>/dev/null | grep -A1 "playbook-vendas-paper-PLAYBOOK_CACHE" | grep "id" | awk -F'"' '{print $4}')
else
    KV_ID=$(echo "$KV_OUTPUT" | grep -oP 'id = "\K[^"]+' || echo "")
    echo -e "${GREEN}✓ Namespace KV criado${NC}"
fi

echo "  KV ID: $KV_ID"

# ===========================================
# 4. ATUALIZAR WRANGLER.TOML
# ===========================================
echo ""
echo -e "${BLUE}[4/6] Atualizando wrangler.toml...${NC}"

# Backup
cp wrangler.toml wrangler.toml.backup

# Verificar se ja tem configuracao
if grep -q "^\\[\\[vectorize\\]\\]" wrangler.toml; then
    echo -e "${YELLOW}Configuracao Vectorize ja existe no wrangler.toml${NC}"
else
    # Adicionar configuracao Vectorize
    cat >> wrangler.toml << 'EOF'

# Vectorize - Configurado automaticamente
[[vectorize]]
binding = "VECTORIZE_INDEX"
index_name = "playbook-embeddings"
EOF
    echo -e "${GREEN}✓ Vectorize adicionado ao wrangler.toml${NC}"
fi

if grep -q "^\\[\\[kv_namespaces\\]\\]" wrangler.toml; then
    echo -e "${YELLOW}Configuracao KV ja existe no wrangler.toml${NC}"
else
    # Adicionar configuracao KV
    cat >> wrangler.toml << EOF

# KV Namespace - Configurado automaticamente
[[kv_namespaces]]
binding = "CACHE"
id = "$KV_ID"
EOF
    echo -e "${GREEN}✓ KV Namespace adicionado ao wrangler.toml${NC}"
fi

# ===========================================
# 5. CONFIGURAR SECRETS
# ===========================================
echo ""
echo -e "${BLUE}[5/6] Configurando secrets...${NC}"

if [ -n "$OPENAI_API_KEY" ]; then
    echo "$OPENAI_API_KEY" | npx wrangler secret put OPENAI_API_KEY
    echo -e "${GREEN}✓ OPENAI_API_KEY configurado${NC}"
else
    echo -e "${YELLOW}Pule esta etapa (OPENAI_API_KEY nao fornecido)${NC}"
fi

# Gerar webhook secret
WEBHOOK_SECRET=$(openssl rand -hex 32)
echo "$WEBHOOK_SECRET" | npx wrangler secret put GITHUB_WEBHOOK_SECRET
echo -e "${GREEN}✓ GITHUB_WEBHOOK_SECRET configurado${NC}"
echo ""
echo -e "${YELLOW}IMPORTANTE: Guarde este secret para configurar no GitHub:${NC}"
echo "  $WEBHOOK_SECRET"
echo ""

# ===========================================
# 6. DEPLOY
# ===========================================
echo ""
echo -e "${BLUE}[6/6] Fazendo deploy do worker...${NC}"

npx wrangler deploy

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Deploy concluido com sucesso!${NC}"
else
    echo -e "${RED}Erro no deploy${NC}"
    exit 1
fi

# ===========================================
# RESUMO
# ===========================================
echo ""
echo -e "${BLUE}==========================================="
echo "  SETUP CONCLUIDO!"
echo -e "===========================================${NC}"
echo ""
echo "Recursos criados:"
echo "  ✓ Vectorize: playbook-embeddings"
echo "  ✓ KV: PLAYBOOK_CACHE"
echo "  ✓ Secrets configurados"
echo "  ✓ Worker deployado"
echo ""
echo -e "${YELLOW}Proximos passos:${NC}"
echo ""
echo "1. Upload dos chunks para Vectorize:"
echo "   export CLOUDFLARE_ACCOUNT_ID=\"seu_account_id\""
echo "   export CLOUDFLARE_API_TOKEN=\"seu_token\""
echo "   export OPENAI_API_KEY=\"sua_chave\""
echo "   node scripts/upload-chunks.js papervines"
echo ""
echo "2. Configurar webhook no GitHub:"
echo "   URL: https://vendas.papervines.digital/index/webhook"
echo "   Secret: $WEBHOOK_SECRET"
echo ""
echo "3. Testar:"
echo "   ./scripts/test-api.sh https://vendas.papervines.digital"
echo ""
