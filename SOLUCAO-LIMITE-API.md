# ✅ Solução: Erro 429 - Limite Excedido da API

## 🔴 Problema

```
CRM API Error: 429 - Limite excedido
```

A chave `CRMCABELO_API_KEY` atingiu o limite de requisições da API WTS Chat.

---

## ✅ Solução Implementada: Sistema de Cache

Implementei um **sistema de cache inteligente** que armazena as respostas da API e reduz drasticamente o número de chamadas.

### Cache TTL (Tempo de Vida)

| Tipo de Dado | TTL | Motivo |
|--------------|-----|--------|
| Panel (painel) | 1 hora | Dados mudam pouco |
| Steps (etapas) | 1 hora | Etapas mudam pouco |
| Cards (cards) | 3 minutos | Cards mudam frequentemente |
| Metrics (métricas) | 3 minutos | Tempo real |
| Sources (origens) | 5 minutos | Mudam moderadamente |

### Como Funciona

```
Usuário acessa CRM Live
        ↓
Existe no cache?
   ├─ SIM → Retorna do cache (RÁPIDO, SEM API)
   └─ NÃO → Busca da API → Salva no cache
```

**Resultado:**
- ✅ 1ª visita: Chama API + salva cache
- ✅ 2ª-Nª visitas (3 min): Usa cache (0 chamadas API)
- ✅ Auto-refresh (3 min): 1 chamada API a cada 3 min

---

## 📝 Arquivos Modificados

### 1. src/api/crm.js

**Adicionado:**
- Constantes `CACHE_TTL` com tempos de cache
- Função `getCacheKey()` - Gera chave única
- Função `fetchCRMWithCache()` - Busca com cache
- Cache no handler de `/api/crm/metrics`
- Cache no handler de `/api/crm/sources`
- `getPanel()` agora usa cache

**Código:**
```javascript
const CACHE_TTL = {
  panel: 3600,      // 1 hora
  steps: 3600,      // 1 hora
  cards: 180,       // 3 minutos
  metrics: 180,     // 3 minutos
  sources: 300      // 5 minutos
};

async function fetchCRMWithCache(endpoint, env, ttl = 300, request = null) {
  const panelId = getPanelId(env, request);
  const cacheKey = getCacheKey(endpoint, panelId);

  // Tenta cache primeiro
  if (env.CRM_CACHE) {
    const cached = await env.CRM_CACHE.get(cacheKey, { type: 'json' });
    if (cached) return cached;
  }

  // Se não, busca da API
  const data = await fetchCRM(endpoint, env);

  // Salva no cache
  if (env.CRM_CACHE && data) {
    await env.CRM_CACHE.put(cacheKey, JSON.stringify(data), {
      expirationTtl: ttl
    });
  }

  return data;
}
```

### 2. wrangler.toml

**Adicionado:**
```toml
[[kv_namespaces]]
binding = "CRM_CACHE"
id = "CRIAR_NOVO_KV"
```

---

## 🚀 Deploy e Configuração

### Passo 1: Criar KV Namespace

Execute no terminal:

```bash
cd ~/playbook-vendas-paper

# Criar KV namespace para cache do CRM
wrangler kv:namespace create "CRM_CACHE"
```

Você receberá um ID como:
```
✨ Success! Created KV namespace CRM_CACHE
📋 Add the following to your wrangler.toml:
{ binding = "CRM_CACHE", id = "abc123..." }
```

### Passo 2: Atualizar wrangler.toml

Copie o ID e atualize o arquivo `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "CRM_CACHE"
id = "COLE_O_ID_AQUI"  # ← Substitua pelo ID recebido
```

### Passo 3: Deploy

```bash
git add .
git commit -m "feat: sistema de cache para CRM (resolver erro 429)"
git push origin main
```

---

## 📊 Impacto da Solução

### ANTES (sem cache):
```
Página carrega → 5-10 chamadas à API
Auto-refresh (3 min) → 5-10 chamadas
10 usuários → 50-100 chamadas/3min
Limite excedido! ❌
```

### DEPOIS (com cache):
```
1º usuário → 5-10 chamadas (popula cache)
2º-10º usuários → 0 chamadas (usa cache)
Auto-refresh (3 min) → 1-2 chamadas (atualiza cache)
10 usuários → ~10 chamadas/3min
Dentro do limite! ✅
```

**Redução:** ~90% menos chamadas à API!

---

## 🧪 Teste

Após deploy:

1. Acesse CRM Live pela 1ª vez:
   ```
   https://vendas.papervines.digital/desempenho/crm?tenant=cabeloesaude
   ```
   **Resultado:** Dados carregam (API chamada)

2. Recarregue a página (F5):
   **Resultado:** Dados carregam INSTANTANEAMENTE (cache)

3. Aguarde 3 minutos e recarregue:
   **Resultado:** Dados atualizados (cache expirou, nova chamada API)

---

## 🔍 Verificar Cache Funcionando

No código, adicionei logs. Para ver se está funcionando:

1. Abra DevTools (F12)
2. Aba Console
3. Procure por:
   - `Cache HIT: crm-cache:...` ← **Usando cache (BOM!)**
   - `Cache MISS: crm-cache:...` ← **Buscando API**

---

## ⚠️ Se Erro 429 Persistir

Se mesmo com cache ainda der erro 429:

### Solução 1: Aumentar TTL (tempo de cache)

Edite `src/api/crm.js`:
```javascript
const CACHE_TTL = {
  panel: 7200,      // 2 horas (antes: 1 hora)
  steps: 7200,      // 2 horas
  cards: 600,       // 10 minutos (antes: 3 min)
  metrics: 600,     // 10 minutos
  sources: 900      // 15 minutos (antes: 5 min)
};
```

### Solução 2: Desabilitar Auto-refresh

Edite `src/pages/desempenho.js`:
```javascript
// Comentar ou remover:
// setInterval(carregarDadosCRM, 3 * 60 * 1000);

// Aumentar intervalo para 10 minutos:
setInterval(carregarDadosCRM, 10 * 60 * 1000);
```

### Solução 3: Upgrade de Plano WTS Chat

Entre em contato com WTS Chat para aumentar o limite da API.

---

## 💡 Benefícios Extras do Cache

Além de resolver o erro 429:

- ✅ **Performance:** Páginas carregam mais rápido
- ✅ **Custo:** Menos requisições = menos custo
- ✅ **Estabilidade:** Menos dependência da API externa
- ✅ **Experiência:** UX mais fluida

---

💚 **Sistema de cache implementado e pronto para deploy!**
