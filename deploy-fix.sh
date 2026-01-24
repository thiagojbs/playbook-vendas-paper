#!/bin/bash

echo "🔧 Removendo locks do Git..."
rm -f .git/index.lock .git/HEAD.lock
rm -f .git/objects/*/tmp_obj_*

echo "✅ Locks removidos"
echo ""

echo "📦 Adicionando arquivos..."
git add .

echo "✅ Arquivos adicionados"
echo ""

echo "💾 Criando commit..."
git commit -m "fix: remover getSteps duplicado + Panel ID interface

- Remove função getSteps duplicada (erro de build)
- Modal de configuração Panel ID no CRM Live
- Badge clicável mostrando Panel ID
- localStorage para salvar configuração
- Query param ?panel_id=XXX
- Prioridade: interface > cloudflare > default
- Remove menu API & MCP
- Remove rotas /api e /mcp"

echo ""
echo "🚀 Fazendo push..."
git push origin main

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "Aguarde 2-3 minutos e teste em:"
echo "https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude"
