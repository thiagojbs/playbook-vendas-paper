# Mudanças: CRM Live + Remoção Menu API/MCP

## ✅ Implementado

### 1. Menu Simplificado
**Arquivo:** `src/templates/layout.js`
- ❌ **Removido:** Menu "API & MCP" (não será usado no playbook)
- ✅ **Mantido:** Todos os outros menus funcionais

### 2. CRM Live Configurado
**Arquivo:** `src/api/crm.js`
- 🔧 **Atualizado:** Função `fetchCRM()` agora usa `CRMCABELO_API_KEY` primeiro
- 🔄 **Fallback:** Se não encontrar `CRMCABELO_API_KEY`, usa `CRM_API_KEY`
- 🔐 **Chave no Cloudflare:** `CRMCABELO_API_KEY` já criada

**Código atualizado:**
```javascript
// Antes
const apiKey = env.CRM_API_KEY;

// Depois
const apiKey = env.CRMCABELO_API_KEY || env.CRM_API_KEY;
```

### 3. Rotas Limpas
**Arquivo:** `src/pages/playbook.js`
- ❌ **Removido:** Rotas `/api` e `/mcp` do playbook
- ✅ **Mantido:** Rota `/desempenho/crm` funcionando

---

## 🎯 Como Usar o CRM Live

### URL de Acesso
```
https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude
```

### Funcionalidades Disponíveis
1. **Pipeline em Tempo Real** - Visualização do funil de vendas
2. **Métricas de Origem** - De onde vêm os leads (Instagram, Facebook, Google Ads)
3. **KPIs Automáticos:**
   - Total de Cards
   - Cards Hoje
   - Cards Semana
   - Cards Mês
4. **Conversões por Etapa** - Taxa de conversão entre cada fase
5. **Auto-refresh** - Atualiza a cada 3 minutos automaticamente

### Integrações
- **API:** `https://api.wts.chat` (FlwChat CRM)
- **Panel ID:** `5369fc64-cc15-41d3-a780-664878183b8b`
- **Autenticação:** Bearer Token via `CRMCABELO_API_KEY`

---

## 📦 Deploy

Execute os comandos:
```bash
cd /Users/thiagobarroncas/Downloads/projetos-claude/playbook-vendas-paper
git add .
git commit -m "feat: remover menu API & MCP + CRM com CRMCABELO_API_KEY"
git push origin main
```

Aguarde 2-3 minutos para o deploy no Cloudflare Workers.

---

## 🔍 Verificação

Após deploy, teste:

1. ✅ Menu "API & MCP" não deve aparecer mais
2. ✅ Menu "CRM Live" deve estar visível
3. ✅ Ao clicar em "CRM Live", deve carregar dados do CRM
4. ✅ Se houver erro de API Key, verifique se `CRMCABELO_API_KEY` está configurada no Cloudflare

---

## 📊 Estrutura de Dados do CRM

### Endpoints Disponíveis
- `/api/crm/metrics` - Métricas do funil (usado pela página)
- `/api/crm/sources` - Origens dos leads (Instagram, Facebook, etc)
- `/api/crm/cards` - Todos os cards
- `/api/crm/steps` - Etapas do funil
- `/api/crm/panel` - Detalhes do painel

### Exemplo de Resposta
```json
{
  "success": true,
  "timestamp": "2025-01-24T...",
  "summary": {
    "totalCards": 150,
    "cardsToday": 5,
    "cardsThisWeek": 32,
    "cardsThisMonth": 89
  },
  "steps": [
    {
      "id": "...",
      "title": "Novo Lead",
      "count": 45,
      "totalValue": 12000
    }
  ],
  "conversions": [
    {
      "from": "Novo Lead",
      "to": "Em Contato",
      "rate": 68.5
    }
  ]
}
```

---

## 💡 Próximos Passos

1. Testar CRM Live em produção
2. Verificar se dados aparecem corretamente
3. Ajustar nomes de etapas se necessário (configurado no FlwChat)
4. Validar origens UTM (Instagram, Facebook, Google Ads)

---

**Desenvolvido para Cabelo & Saúde** 💚
