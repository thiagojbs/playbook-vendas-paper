# ⚠️ CONFIGURAR PANEL ID DO CRM

## 🔴 Erro Atual

```
CRM API Error: 500 - ENTITY_NOT_FOUND
"O painel informado não foi encontrado."
Panel ID usado: 5369fc64-cc15-41d3-a780-664878183b8b
```

**Causa:** O Panel ID configurado é do Paper Vines, não da Cabelo & Saúde.

---

## 🔍 Como Descobrir o Panel ID Correto

### Opção 1: Via Interface do CRM (WTS Chat)

1. Acesse o painel CRM da Cabelo & Saúde: https://app.wts.chat/
2. Faça login
3. Vá até o painel de vendas que você quer usar
4. Copie o Panel ID da URL do navegador:
   ```
   https://app.wts.chat/crm/panel/SEU-PANEL-ID-AQUI
                                  ^^^^^^^^^^^^^^^^^^
   ```

### Opção 2: Via API (se tiver acesso)

Use a chave `CRMCABELO_API_KEY` para listar painéis:

```bash
curl -X GET "https://api.wts.chat/crm/v1/panel" \
  -H "Authorization: Bearer SUA_CHAVE_API_AQUI" \
  -H "Accept: application/json"
```

Procure pelo painel da Cabelo & Saúde na resposta e copie o `id`.

### Opção 3: Perguntar ao Time WTS Chat

Entre em contato com o suporte do WTS Chat e peça o Panel ID do painel da Cabelo & Saúde.

---

## 🔧 Configurar o Panel ID

### 1. Via Variável de Ambiente Cloudflare (RECOMENDADO)

No Cloudflare Workers, adicione uma nova variável:

**Nome:** `CRM_PANEL_ID`
**Valor:** `SEU-PANEL-ID-AQUI`

Isso permitirá trocar o Panel ID sem fazer deploy de código.

### 2. Via Código (Alternativa)

Edite o arquivo: `src/data/tenants/cabeloesaude/config.js`

```javascript
integracoes: {
  crm: {
    panelId: 'SEU-PANEL-ID-AQUI', // ← Substituir
    apiKeyVar: 'CRMCABELO_API_KEY'
  }
}
```

Depois edite: `src/api/crm.js`

```javascript
function getPanelId(env) {
  // Se tiver CRM_PANEL_ID no env, usa ele
  // Senão usa o default do Paper Vines
  return env.CRM_PANEL_ID || PANEL_ID_PAPERVINES;
}
```

---

## ✅ Verificar Configuração

Após configurar, teste novamente:

```
https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude
```

**Deve carregar:**
- ✅ Pipeline de vendas
- ✅ Cards do CRM
- ✅ Etapas do funil
- ✅ Métricas automáticas

**Se continuar erro 500:**
- Verifique se o Panel ID está correto
- Verifique se a chave `CRMCABELO_API_KEY` tem permissão para acessar esse painel
- Verifique se o painel não está arquivado/deletado

---

## 📋 Checklist

- [ ] Descobrir Panel ID correto da Cabelo & Saúde
- [ ] Configurar `CRM_PANEL_ID` no Cloudflare Workers
- [ ] Testar CRM Live novamente
- [ ] Verificar se dados carregam corretamente

---

## 🆘 Se Não Souber o Panel ID

**Solução temporária:** Use a API para listar painéis disponíveis.

Vou criar um endpoint de debug para você:

```javascript
// Em src/api/crm.js, adicionar:
export async function listPanels(env) {
  return fetchCRM('/crm/v1/panel', env);
}
```

Depois acesse:
```
https://vendas.papervines.digital/api/crm/panels
```

Isso listará todos os painéis disponíveis para a chave API configurada.

---

💡 **Próximo passo:** Me informe o Panel ID correto e eu configuro para você!
