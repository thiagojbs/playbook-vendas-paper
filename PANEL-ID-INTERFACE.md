# ✅ Panel ID Configurável via Interface

## 🎯 Implementado

### Interface de Configuração no CRM Live

Agora você pode configurar o Panel ID diretamente na interface, sem precisar ir no Cloudflare!

**Localização:** Página CRM Live (https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude)

**Componentes adicionados:**
1. **Badge "Panel ID"** - Mostra Panel ID atual (clicável)
2. **Botão de Configuração** (ícone de engrenagem)
3. **Modal de Configuração** - Interface para editar Panel ID

---

## 🎨 Interface

### Badge do Panel ID
```
┌─────────────────────────────────────────────┐
│ ● Conectando  | 00:00  | 🗄️ 5369fc64...    │
│                          ^^^^^^^^^^^^^^^^^   │
│                          Badge clicável      │
└─────────────────────────────────────────────┘
```

**Estados do Badge:**
- 🟠 **Laranja** - Nenhum Panel ID configurado
- 🟢 **Verde** - Panel ID configurado (mostra primeiros 8 caracteres)

### Modal de Configuração

```
╔═══════════════════════════════════════════╗
║  ⚙️  Configuração do CRM              ✕   ║
╠═══════════════════════════════════════════╣
║                                           ║
║  Panel ID do CRM                          ║
║  ┌─────────────────────────────────────┐  ║
║  │ 5369fc64-cc15-41d3-a780-664878183b8b│  ║
║  └─────────────────────────────────────┘  ║
║  ℹ️  Cole o Panel ID do painel WTS Chat   ║
║                                           ║
║  💡 Como descobrir o Panel ID?            ║
║  ┌─────────────────────────────────────┐  ║
║  │ 1. Acesse: app.wts.chat             │  ║
║  │ 2. Abra o painel desejado           │  ║
║  │ 3. Copie ID da URL: crm/panel/XXX   │  ║
║  └─────────────────────────────────────┘  ║
║                                           ║
║              [Cancelar] [Salvar e Recarregar] ║
╚═══════════════════════════════════════════╝
```

---

## 🔄 Fluxo de Funcionamento

### 1. Prioridade de Panel ID

```
CRM precisa de Panel ID
        ↓
1️⃣ Existe panel_id no query param? (localStorage → URL)
   ├─ SIM → Usa esse Panel ID
   └─ NÃO → Próximo passo
        ↓
2️⃣ Existe CRM_PANEL_ID no Cloudflare?
   ├─ SIM → Usa variável de ambiente
   └─ NÃO → Próximo passo
        ↓
3️⃣ Usa PANEL_ID_PAPERVINES (default)
```

### 2. Salvamento e Persistência

```
Usuário clica "Salvar"
        ↓
Panel ID salvo no localStorage
        ↓
Badge atualizado
        ↓
Página recarrega dados do CRM
        ↓
Frontend envia: /api/crm/metrics?panel_id=XXX
        ↓
Backend lê panel_id do query param
        ↓
Usa esse Panel ID nas chamadas à API WTS Chat
```

---

## 📝 Como Usar

### Passo 1: Acessar CRM Live

Acesse:
```
https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude
```

### Passo 2: Abrir Configuração

Clique em:
- Badge "Panel ID" (no topo)
- OU botão de engrenagem (⚙️)

### Passo 3: Colar Panel ID

1. Abra o WTS Chat: https://app.wts.chat/
2. Navegue até o painel desejado
3. Copie o ID da URL (formato: `crm/panel/SEU-ID-AQUI`)
4. Cole no campo "Panel ID do CRM"

### Passo 4: Salvar

Clique em **"Salvar e Recarregar"**

O CRM irá:
- ✅ Salvar Panel ID no navegador (localStorage)
- ✅ Atualizar badge para mostrar ID
- ✅ Recarregar dados do CRM automaticamente

---

## 🔧 Arquivos Modificados

### Frontend
**Arquivo:** `src/pages/desempenho.js`

**Adicionado:**
- Modal de configuração HTML
- Funções JavaScript:
  - `abrirConfigCRM()` - Abre modal
  - `fecharConfigCRM()` - Fecha modal
  - `salvarConfigCRM()` - Salva e recarrega
  - `atualizarPanelIdBadge()` - Atualiza visual do badge
- Badge clicável no header
- Botão de configuração (⚙️)
- Query param `?panel_id=XXX` nas chamadas fetch

### Backend
**Arquivo:** `src/api/crm.js`

**Modificado:**
- `getPanelId(env, request)` - Lê panel_id do query param
- Todas funções CRM agora aceitam `request` como parâmetro
- Handler passa `request` para todas funções

---

## 💾 Persistência

**Armazenamento:** localStorage do navegador

**Chave:** `crm_panel_id`

**Valor:** String (UUID do Panel ID)

**Exemplo:**
```javascript
localStorage.getItem('crm_panel_id')
// → "abc-123-def-456-ghi-789"
```

**Importante:**
- Dados ficam salvos no navegador
- Cada navegador/computador tem sua configuração
- Limpar dados do navegador apaga a configuração

---

## ✅ Vantagens

| Antes | Depois |
|-------|--------|
| Precisa ir no Cloudflare | Configura na interface |
| Precisa fazer deploy | Mudança instantânea |
| Técnico (variável de ambiente) | Visual (modal amigável) |
| Um Panel ID para todos | Cada usuário pode ter seu Panel ID |
| Difícil de trocar | Fácil de trocar |

---

## 🧪 Teste

### 1. Configurar Panel ID
```
1. Acesse CRM Live
2. Clique no badge "Panel ID"
3. Cole um Panel ID válido
4. Clique "Salvar e Recarregar"
```

### 2. Verificar Funcionamento
```
✅ Badge muda de laranja para verde
✅ Mostra primeiros 8 caracteres do ID
✅ Dados do CRM carregam automaticamente
✅ Pipeline mostra etapas corretas
✅ KPIs mostram números corretos
```

### 3. Trocar Panel ID
```
1. Clique novamente no badge
2. Cole outro Panel ID
3. Salve
4. Dados recarregam com novo painel
```

---

## 🔍 Debug

### Ver Panel ID Atual
```javascript
// No console do navegador:
localStorage.getItem('crm_panel_id')
```

### Limpar Panel ID
```javascript
// No console do navegador:
localStorage.removeItem('crm_panel_id')
```

### Ver URL da Requisição
Abra DevTools → Network → Filtrar "crm" → Ver URL:
```
/api/crm/metrics?panel_id=abc-123-def-456
                 ^^^^^^^^^^^^^^^^^^^^^^^^^^
                 Panel ID enviado
```

---

## 📊 Resumo Técnico

**Tecnologias:**
- localStorage API (HTML5)
- URL Search Params (fetch com query string)
- Modal com CSS puro
- Sem bibliotecas externas

**Compatibilidade:**
- ✅ Chrome/Edge (modern)
- ✅ Firefox
- ✅ Safari
- ❌ IE11 (não suportado)

---

💚 **Agora você pode trocar de Panel ID facilmente, sem precisar mexer no Cloudflare!**
