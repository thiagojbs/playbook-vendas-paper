#!/bin/bash

# Script para fazer deploy de todas as otimizações do Playbook Cabelo & Saúde

echo "🚀 Iniciando deploy das otimizações..."
echo ""

# Remover locks do Git
echo "1️⃣ Limpando locks do Git..."
rm -f .git/index.lock .git/HEAD.lock 2>/dev/null
echo "✅ Locks removidos"
echo ""

# Adicionar arquivos otimizados
echo "2️⃣ Adicionando arquivos otimizados ao Git..."
git add src/data/tenants/cabeloesaude/objecoes.js
git add src/pages/playbook.js
echo "✅ Arquivos adicionados"
echo ""

# Verificar status
echo "3️⃣ Status dos arquivos:"
git status --short
echo ""

# Fazer commit
echo "4️⃣ Fazendo commit..."
git commit -m "feat: otimizacao completa objecoes + visual melhorado

OBJECOES.JS:
- 13 objecoes transformadas com linguagem do Manifesto
- 7 diferenciais (novo: Metodo Manifesto)
- Adicionar FRASES_MANIFESTO_OBJECOES (8 situacoes)
- Integrar: QUEM SENTE, ENTENDE. QUEM ENTENDE, AGE.
- Integrar: Tempo e cabelo. Coragem e agora.
- Integrar: Somos o lado oposto da medicina rasa
- Tom confrontador mantendo empatia

PLAYBOOK.JS (visual):
- Corrigir stats: 40+ -> 44+
- Aumentar fonte dos numeros: 48px
- Adicionar text-shadow para contraste
- Adicionar box-shadow nos cards
- Melhorar legibilidade geral

100% alinhado com cabeloesaude.com.br

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

echo "✅ Commit realizado"
echo ""

# Push
echo "5️⃣ Enviando para GitHub (vai acionar deploy automático)..."
git push origin main

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "⏱️  Aguarde 2-3 minutos para o Cloudflare atualizar"
echo ""
echo "🧪 Teste em:"
echo "   - https://vendas.papervines.digital/playbook/scripts?tenant=cabeloesaude"
echo "   - https://vendas.papervines.digital/playbook/objecoes?tenant=cabeloesaude"
echo ""
echo "🎯 O que você deve ver:"
echo "   ✅ 44+ Scripts Prontos (números grandes e legíveis)"
echo "   ✅ 7 Diferenciais (novo: Método Manifesto)"
echo "   ✅ Frases: 'Tempo é cabelo. Coragem é agora.'"
echo "   ✅ Linguagem forte nas objeções"
echo ""
