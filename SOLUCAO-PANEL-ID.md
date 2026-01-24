# ✅ Solução: Panel ID Configurável

## 🔧 Mudanças Implementadas

### 1. Panel ID Dinâmico
**Arquivo:** `src/api/crm.js`

Agora o Panel ID pode ser configurado via variável de ambiente:

```javascript
function getPanelId(env) {
  // Prioridade:
  // 1. CRM_PANEL_ID do Cloudflare (se configurado)
  // 2. PANEL_ID_PAPERVINES (default: Paper Vines)
  return env.CRM_PANEL_ID || PANEL_ID_PAPERVINES;
}
```

Todas as funções foram atualizadas:
- ✅ `getCards()` - usa `getPanelId(env)`
- ✅ `getPanel()` - usa `getPanelId(env)`
- ✅ `getCardsByStep()` - usa `getPanelId(env)`
- ✅ `getCardsByPeriod()` - usa `getPanelId(env)`
- ✅ `getAllCards()` - usa `getPanelId(env)`

### 2. Endpoint de Debug
**Nova rota:** `/api/crm/panels`

Lista todos os painéis disponíveis para a chave API configurada.

---

## 🎯 Como Usar

### Passo 1: Descobrir Panel ID

Acesse (após fazer deploy):
```
https://vendas.papervines.digital/api/crm/panels
```

Você verá algo como:
```json
{
  "items": [
    {
      "id": "abc-123-def-456",
      "name": "Cabelo & Saúde - Vendas",
      "steps": [...],
      ...
    },
    {
      "id": "xyz-789-uvw-012",
      "name": "Outro Painel",
      ...
    }
  ]
}
```

Copie o `id` do painel correto.

### Passo 2: Configurar no Cloudflare

No Cloudflare Workers, adicione a variável:

**Nome:** `CRM_PANEL_ID`
**Valor:** `SEU-PANEL-ID-AQUI` (copie do passo 1)

**Importante:** Não precisa fazer deploy de código novamente! A variável é lida em runtime.

### Passo 3: Testar CRM Live

Acesse:
```
https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude
```

Deve carregar os dados corretamente! ✅

---

## 📋 Variáveis de Ambiente Cloudflare

Você precisa ter configuradas:

| Variável | Valor | Status |
|----------|-------|--------|
| `CRMCABELO_API_KEY` | Bearer token do WTS Chat | ✅ Criada |
| `CRM_PANEL_ID` | Panel ID da Cabelo & Saúde | ⏳ Pendente |

---

## 🔄 Fluxo de Fallback

```
CRM pede Panel ID
    ↓
Existe CRM_PANEL_ID no env?
    ├─ SIM → Usa esse Panel ID (Cabelo & Saúde)
    └─ NÃO → Usa PANEL_ID_PAPERVINES (Paper Vines default)
```

Isso permite que:
- Paper Vines funcione sem configuração extra (usa o default)
- Cabelo & Saúde use seu próprio painel (configurando `CRM_PANEL_ID`)

---

## 🚀 Deploy

Execute:

```bash
cd ~/playbook-vendas-paper
rm -f .git/index.lock .git/HEAD.lock
git add .
git commit -m "feat: CRM com Panel ID configurável

- Panel ID agora via env.CRM_PANEL_ID
- Fallback para PANEL_ID_PAPERVINES
- Novo endpoint /api/crm/panels para debug
- Todas funções atualizadas para getPanelId(env)"

git push origin main
```

Aguarde 2-3 minutos para deploy.

---

## ✅ Após Deploy

1. **Descubra Panel ID:**
   - Acesse: `https://vendas.papervines.digital/api/crm/panels`
   - Copie o `id` do painel da Cabelo & Saúde

2. **Configure no Cloudflare:**
   - Vá em: Workers & Pages → playbook-vendas-paper → Settings → Variables
   - Adicione: `CRM_PANEL_ID` = `o-id-que-voce-copiou`
   - Salve (deploy automático)

3. **Teste CRM Live:**
   - `https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude`
   - Deve funcionar! 🎉

---

## 🆘 Troubleshooting

### Erro 500: "ENTITY_NOT_FOUND"
- Panel ID está errado
- Configure `CRM_PANEL_ID` no Cloudflare

### Erro 401: "Unauthorized"
- Chave `CRMCABELO_API_KEY` está errada
- Verifique no Cloudflare Workers

### Erro 403: "Forbidden"
- A chave API não tem permissão para acessar esse painel
- Verifique permissões no WTS Chat

### Endpoint /api/crm/panels retorna vazio
- Chave API não tem acesso a nenhum painel
- Verifique se a chave está correta

---

💡 **Próximo passo:** Fazer deploy e descobrir o Panel ID correto via `/api/crm/panels`
