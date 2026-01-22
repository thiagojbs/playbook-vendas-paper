#!/bin/bash
# ===========================================
# Script de Testes da API RAG
# Playbook de Vendas - Multi-tenant
# ===========================================
#
# Uso:
#   chmod +x scripts/test-api.sh
#   ./scripts/test-api.sh [base_url]
#
# Exemplo:
#   ./scripts/test-api.sh https://vendas.papervines.digital
#   ./scripts/test-api.sh http://localhost:8787
#
# ===========================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URL base
BASE_URL="${1:-https://vendas.papervines.digital}"
TENANT="papervines"

echo ""
echo -e "${BLUE}==========================================="
echo "  Testes da API - Playbook de Vendas"
echo -e "===========================================${NC}"
echo ""
echo "Base URL: $BASE_URL"
echo "Tenant: $TENANT"
echo ""

# Contador de testes
PASSED=0
FAILED=0

# Funcao para testar endpoint
test_endpoint() {
    local name="$1"
    local method="$2"
    local endpoint="$3"
    local data="$4"
    local expected_status="$5"

    echo -n "[$method] $name... "

    if [ "$method" == "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$BASE_URL$endpoint" -H "X-Tenant-ID: $TENANT")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -H "X-Tenant-ID: $TENANT" \
            -d "$data")
    fi

    status_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    if [ "$status_code" == "$expected_status" ]; then
        echo -e "${GREEN}PASS${NC} (HTTP $status_code)"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}FAIL${NC} (Expected $expected_status, got $status_code)"
        echo "Response: $body"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

# ===========================================
# 1. HEALTH CHECK
# ===========================================
echo -e "${BLUE}[1/5] Health Check${NC}"
echo "-------------------------------------------"

test_endpoint "Health principal" "GET" "/health" "" "200"

# ===========================================
# 2. MCP ENDPOINTS
# ===========================================
echo ""
echo -e "${BLUE}[2/5] MCP Endpoints${NC}"
echo "-------------------------------------------"

test_endpoint "MCP Manifest" "GET" "/mcp/manifest" "" "200"
test_endpoint "MCP Tools" "GET" "/mcp/tools" "" "200"
test_endpoint "MCP Health" "GET" "/mcp/health" "" "200"

# Teste de execucao de tool
test_endpoint "MCP Execute - list_topics" "POST" "/mcp/execute" \
    '{"tool":"list_topics","input":{}}' "200"

# ===========================================
# 3. RAG SEARCH
# ===========================================
echo ""
echo -e "${BLUE}[3/5] RAG Search${NC}"
echo "-------------------------------------------"

test_endpoint "RAG Search basico" "POST" "/api/rag/search" \
    '{"query":"vantagens do chatbot"}' "200"

test_endpoint "RAG Search com categoria" "POST" "/api/rag/search" \
    '{"query":"preco","category":"precos","topK":3}' "200"

test_endpoint "RAG Search sem query" "POST" "/api/rag/search" \
    '{}' "400"

# ===========================================
# 4. RAG OBJECTION
# ===========================================
echo ""
echo -e "${BLUE}[4/5] RAG Objection${NC}"
echo "-------------------------------------------"

test_endpoint "Objection search" "POST" "/api/rag/objection" \
    '{"objection":"cliente disse que esta muito caro"}' "200"

test_endpoint "Objection sem parametro" "POST" "/api/rag/objection" \
    '{}' "400"

# ===========================================
# 5. INDEX STATUS
# ===========================================
echo ""
echo -e "${BLUE}[5/5] Index Status${NC}"
echo "-------------------------------------------"

test_endpoint "Index status" "GET" "/index/status" "" "200"

# ===========================================
# RESUMO
# ===========================================
echo ""
echo -e "${BLUE}==========================================="
echo "  RESUMO DOS TESTES"
echo -e "===========================================${NC}"
echo ""

TOTAL=$((PASSED + FAILED))
echo "Total: $TOTAL testes"
echo -e "Passou: ${GREEN}$PASSED${NC}"
echo -e "Falhou: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ TODOS OS TESTES PASSARAM${NC}"
    echo ""
    exit 0
else
    echo -e "${RED}❌ ALGUNS TESTES FALHARAM${NC}"
    echo ""
    echo "Verifique:"
    echo "  1. Se o worker esta deployado"
    echo "  2. Se os recursos Cloudflare estao configurados"
    echo "  3. Se os secrets estao configurados"
    echo "  4. Logs: wrangler tail"
    echo ""
    exit 1
fi
