# 🚀 Deploy Final - CRM Live + Menu Limpo

## ⚠️ Problema Atual
O Git está com lock file. Precisa ser resolvido manualmente no Mac.

## 📋 Execute no Terminal do Mac

```bash
# 1. Ir para o diretório do projeto
cd ~/playbook-vendas-paper

# 2. Remover o lock do Git
rm -f .git/index.lock .git/HEAD.lock

# 3. Adicionar todas as mudanças
git add .

# 4. Fazer commit
git commit -m "feat: CRM Live + remover menu API/MCP

- Remove menu 'API & MCP' do navigation
- Configura CRM com CRMCABELO_API_KEY (fallback para CRM_API_KEY)
- Remove rotas /api e /mcp
- CRM Live pronto para Cabelo & Saúde

Arquivos modificados:
- src/templates/layout.js: menu limpo
- src/api/crm.js: chave CRMCABELO_API_KEY
- src/pages/playbook.js: rotas removidas"

# 5. Push para GitHub (vai acionar deploy automático)
git push origin main
```

## ⏱️ Aguardar Deploy
Após o push, aguarde **2-3 minutos** para o Cloudflare Workers atualizar.

## ✅ Testar CRM Live

Acesse: https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude

**Deve aparecer:**
- ✅ Menu "CRM Live" visível
- ❌ Menu "API & MCP" removido
- ✅ Pipeline carregando dados do CRM
- ✅ KPIs: Total Cards, Hoje, Semana, Mês
- ✅ Funil com etapas
- ✅ Origens (Instagram, Facebook, Google Ads)

## 🔍 Verificações

### 1. Menu
```
ANTES: Playbook | Scripts | Objeções | Agentes IA | API & MCP | Desempenho | CRM Live
DEPOIS: Playbook | Scripts | Objeções | Agentes IA | Desempenho | CRM Live
```

### 2. CRM API Key
A chave `CRMCABELO_API_KEY` no Cloudflare será usada automaticamente.

### 3. Endpoints CRM
- `/api/crm/metrics` - Métricas do funil ✅
- `/api/crm/sources` - Origens dos leads ✅
- `/api/crm/cards` - Todos os cards ✅
- `/api/crm/steps` - Etapas do funil ✅

## 🐛 Se Der Erro

### Erro: "CRM_API_KEY não configurada"
**Causa:** Chave não está no Cloudflare Workers
**Solução:** Verificar se `CRMCABELO_API_KEY` está nas variáveis de ambiente

### Erro: "Endpoint not found"
**Causa:** Deploy ainda não terminou
**Solução:** Aguardar mais 1-2 minutos

### Erro: "401 Unauthorized"
**Causa:** Chave API inválida
**Solução:** Verificar se a chave `CRMCABELO_API_KEY` está correta no Cloudflare

## 📊 Arquivos Prontos

✅ **Código:**
- src/templates/layout.js (menu limpo)
- src/api/crm.js (CRMCABELO_API_KEY configurada)
- src/pages/playbook.js (rotas removidas)
- src/pages/desempenho.js (CRM Live já implementado)

✅ **Documentação:**
- MUDANCAS-CRM.md (detalhes técnicos)
- deploy-crm.sh (script de referência)
- DEPLOY-FINAL.md (este arquivo)

## 🎯 Resultado Final

**Menu limpo, focado, sem APIs.**
**CRM Live funcionando com dados reais da Cabelo & Saúde.**

💚 Tempo é cabelo. Coragem é agora.
