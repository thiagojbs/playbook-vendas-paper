#!/bin/bash
# Script para fazer commit e push das alterações
# New Oeste - Playbook de Vendas

echo "🚀 Iniciando commit e push..."
echo ""

# Remover locks do Git
echo "🔓 Removendo locks do Git..."
rm -f .git/index.lock
rm -f .git/HEAD.lock
echo "✅ Locks removidos"
echo ""

# Adicionar arquivos
echo "📦 Adicionando arquivos..."
git add src/data/tenants/newoeste/config.js
git add src/templates/layout.js
git add ALTERACOES-CORES-NEWOESTE.md
git add CORRECAO-LINKS-MENU.md
git add DEPLOY-STATUS-NEWOESTE.md
echo "✅ Arquivos adicionados"
echo ""

# Status
echo "📋 Status do Git:"
git status --short
echo ""

# Commit
echo "💾 Fazendo commit..."
git commit -m "feat: personalizar New Oeste + corrigir links do menu

🎨 Personalização New Oeste:
- Atualizar cores para laranja (#FF6B35) e amarelo (#FFD700)
- Criar logo SVG com círculos concêntricos
- Adicionar gradiente laranja-amarelo

🔧 Correção de links:
- Não adicionar ?tenant= quando tenant tem domínio próprio
- Links limpos para playbook.newoeste.com.br
- Melhora SEO e user experience

📚 Documentação:
- ALTERACOES-CORES-NEWOESTE.md
- CORRECAO-LINKS-MENU.md
- DEPLOY-STATUS-NEWOESTE.md

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

if [ $? -eq 0 ]; then
    echo "✅ Commit realizado com sucesso"
    echo ""

    # Push
    echo "⬆️  Fazendo push para GitHub..."
    git push origin main

    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 SUCESSO! Push realizado com sucesso!"
        echo ""
        echo "📊 Próximos passos:"
        echo "  1. Aguarde deploy do Cloudflare (~2 minutos)"
        echo "  2. Acesse: https://playbook.newoeste.com.br/"
        echo "  3. Verifique cores laranja/amarelo"
        echo "  4. Teste links do menu (devem estar limpos)"
        echo ""
    else
        echo ""
        echo "❌ Erro ao fazer push"
        echo "Verifique sua conexão e tente: git push origin main"
    fi
else
    echo ""
    echo "❌ Erro ao fazer commit"
    echo "Verifique os erros acima"
fi
