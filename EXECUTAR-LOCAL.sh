#!/bin/bash
# ===========================================
# EXECUTE ESTE SCRIPT NA SUA MÁQUINA LOCAL
# ===========================================
#
# Copie e cole no terminal do seu computador
# onde você tem acesso ao Cloudflare
#
# ===========================================

# Suas credenciais
export CLOUDFLARE_API_TOKEN="PM2t0eqjZ4YSSj_XmI0zXEqOCcU2uD0Bk4c2-hcn"
export CLOUDFLARE_ACCOUNT_ID="c0028a1bd4ef3a2e91c15b2091fd07a1"

echo "=== 1. Verificando autenticação ==="
npx wrangler whoami

echo ""
echo "=== 2. Listando secrets existentes ==="
npx wrangler secret list

echo ""
echo "=== 3. Criando índice Vectorize ==="
npx wrangler vectorize create playbook-embeddings --dimensions=1536 --metric=cosine 2>&1 || echo "Já existe ou erro"

echo ""
echo "=== 4. Listando índices Vectorize ==="
npx wrangler vectorize list

echo ""
echo "=== 5. Criando KV Namespace ==="
npx wrangler kv:namespace create PLAYBOOK_CACHE 2>&1 || echo "Já existe ou erro"

echo ""
echo "=== 6. Listando KV Namespaces ==="
npx wrangler kv:namespace list

echo ""
echo "=== PRONTO! Copie o output e me mostre ==="
