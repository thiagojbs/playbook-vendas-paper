#!/bin/bash

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "   🚀 DEPLOY: CRM com Panel ID Configurável"
echo "═══════════════════════════════════════════════════════════"
echo ""

echo "📋 Mudanças que serão commitadas:"
echo ""
echo "  ✅ src/api/crm.js"
echo "     - Panel ID agora via env.CRM_PANEL_ID"
echo "     - Fallback para Paper Vines se não configurado"
echo "     - Endpoint /api/crm/panels para debug"
echo ""
echo "  ✅ src/templates/layout.js"
echo "     - Menu 'API & MCP' removido"
echo ""
echo "  ✅ src/pages/playbook.js"
echo "     - Rotas /api e /mcp removidas"
echo ""
echo "  ✅ src/data/tenants/cabeloesaude/config.js"
echo "     - Estrutura para integracoes.crm.panelId"
echo ""
echo "  📄 Documentação:"
echo "     - CONFIGURAR-CRM-PANEL-ID.md"
echo "     - SOLUCAO-PANEL-ID.md"
echo "     - MUDANCAS-CRM.md"
echo ""

echo "═══════════════════════════════════════════════════════════"
echo "   ⚡ EXECUTAR DEPLOY"
echo "═══════════════════════════════════════════════════════════"
echo ""

echo "Execute os comandos abaixo no seu terminal:"
echo ""
echo "cd ~/playbook-vendas-paper"
echo "rm -f .git/index.lock .git/HEAD.lock"
echo "git add ."
echo 'git commit -m "feat: CRM com Panel ID configurável + endpoint debug

- Panel ID via env.CRM_PANEL_ID (fallback para Paper Vines)
- Novo endpoint /api/crm/panels para descobrir Panel IDs
- Remove menu API & MCP
- Remove rotas /api e /mcp
- Todas funções CRM atualizadas para getPanelId(env)
- Suporte multi-tenant para CRM"'
echo "git push origin main"
echo ""

echo "═══════════════════════════════════════════════════════════"
echo "   📍 APÓS DEPLOY (2-3 minutos)"
echo "═══════════════════════════════════════════════════════════"
echo ""

echo "1️⃣  Descobrir Panel ID correto:"
echo "   https://vendas.papervines.digital/api/crm/panels"
echo ""

echo "2️⃣  Configurar no Cloudflare Workers:"
echo "   Nome:  CRM_PANEL_ID"
echo "   Valor: [copie o ID do painel Cabelo & Saúde]"
echo ""

echo "3️⃣  Testar CRM Live:"
echo "   https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude"
echo ""

echo "═══════════════════════════════════════════════════════════"
echo ""
