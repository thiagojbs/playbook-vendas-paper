# 🛠️ Guia de Manutenção - Playbook Vendas Paper

## 📋 Índice
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Sistema de Cache CRM](#sistema-de-cache-crm)
- [Adicionar Novo Tenant](#adicionar-novo-tenant)
- [Deploy e CI/CD](#deploy-e-cicd)
- [Troubleshooting](#troubleshooting)

---

## ⚙️ Configuração do Ambiente

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar localmente
./EXECUTAR-LOCAL.sh

# Ou manualmente:
wrangler dev
```

### Secrets Necessários

```bash
# Configurar secrets do Cloudflare
wrangler secret put OPENAI_API_KEY
wrangler secret put GITHUB_WEBHOOK_SECRET
wrangler secret put WTS_API_KEY
```

---

## 💾 Sistema de Cache CRM

**Problema Resolvido**: Erro 429 "Limite excedido" da API WTS Chat

### Como Funciona

O sistema usa **Cloudflare KV** para cachear respostas da API:

```javascript
// Cache TTL (Tempo de Vida)
const CACHE_TTL = {
  panel: 3600,      // 1 hora - dados do painel
  steps: 3600,      // 1 hora - etapas do funil
  cards: 180,       // 3 minutos - cards (mudam frequente)
  metrics: 180,     // 3 minutos - métricas em tempo real
  sources: 300      // 5 minutos - fontes de tráfego
};
```

### Benefícios

- ✅ **~90% menos chamadas** à API WTS Chat
- ✅ **Performance melhor** - Dados em cache = instantâneo
- ✅ **Custos reduzidos** - Menos requisições = menos custo
- ✅ **Sem erro 429** - Rate limit resolvido

### Configuração KV

O KV namespace já está configurado em `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "CRM_CACHE"
id = "d3be52d459074cc987160708935be2a9"
```

### Logs de Debug

Para ver o cache funcionando, acesse **Cloudflare Dashboard → Workers → Logs**:

```
Cache HIT: crm-cache:PANEL_ID:metrics  ← Leu do cache (rápido!)
Cache MISS: crm-cache:PANEL_ID:cards   ← Buscou da API
Cache SAVED: crm-cache:PANEL_ID:cards (TTL: 180s)
```

### Limpar Cache Manualmente

Se precisar forçar atualização dos dados:

```bash
# Via Wrangler CLI
wrangler kv:key delete --binding=CRM_CACHE "crm-cache:PANEL_ID:metrics"

# Ou via Dashboard do Cloudflare
# Workers → KV → CRM_CACHE → Delete keys
```

---

## 🏢 Adicionar Novo Tenant

Veja documentação completa em: **[docs/NEW-TENANT.md](./NEW-TENANT.md)**

Resumo rápido:

1. Adicionar configuração em `src/config.js`
2. Criar diretório `tenants/{nome}/`
3. Adicionar scripts, objeções e assets
4. Deploy automático via GitHub

---

## 🚀 Deploy e CI/CD

### Deploy Automático

O projeto usa **GitHub Actions** para deploy automático:

```
git push origin main
→ GitHub Actions detecta push
→ Executa wrangler deploy
→ Deploy no Cloudflare Workers
→ Site atualizado em ~2 minutos
```

### Deploy Manual

Se necessário, você pode fazer deploy manual:

```bash
wrangler deploy
```

### Verificar Deploy

```bash
# Ver deployments recentes
wrangler deployments list

# Ver logs em tempo real
wrangler tail
```

---

## 🔧 Troubleshooting

### Erro: "ENTITY_NOT_FOUND" no CRM

**Causa**: Panel ID incorreto ou não configurado

**Solução**:
1. Acesse a página CRM Live
2. Clique no badge "Panel ID" no topo
3. Cole o Panel ID correto do WTS Chat
4. Recarregue a página

### Erro 429: "Limite excedido"

**Causa**: Rate limit da API WTS Chat

**Solução**: O cache deve resolver isso. Se persistir:
1. Verifique se o KV namespace está configurado
2. Veja os logs para confirmar se o cache está funcionando
3. Considere aumentar os TTLs em `src/api/crm.js`

### Logo/Cores Erradas no CRM

**Causa**: Tenant não identificado corretamente

**Solução**: Verifique se:
1. O domínio está configurado em `src/config.js`
2. A função `getTenantByDomain()` está retornando o tenant correto
3. Os assets do tenant existem em `tenants/{nome}/assets/`

### Scripts/Objeções não Aparecem

**Causa**: Arquivos não encontrados ou tenant incorreto

**Solução**:
1. Verifique estrutura: `tenants/{nome}/scripts.json`
2. Confirme que o tenant está configurado corretamente
3. Veja logs do Worker para erros

### Webhook RAG não Funciona

**Causa**: Secret ou configuração do GitHub incorreta

**Solução**: Veja **[docs/WEBHOOK-SETUP.md](./WEBHOOK-SETUP.md)**

---

## 📊 Monitoramento

### Métricas Importantes

- **Taxa de Cache Hit**: Deve ser ~90% após warmup
- **Latência API**: <500ms para cache hits, <2s para misses
- **Erro 429**: Deve ser 0 após implementação do cache

### Logs do Cloudflare

Acesse: **Dashboard → Workers → playbook-vendas-paper → Logs**

Filtros úteis:
```
"Cache HIT"     → Ver acertos de cache
"Cache MISS"    → Ver chamadas à API
"CRM API Error" → Ver erros da API
"ERROR"         → Ver erros gerais
```

---

## 📚 Documentação Adicional

- **[API.md](./API.md)** - Documentação completa da API
- **[NEW-TENANT.md](./NEW-TENANT.md)** - Como adicionar novos tenants
- **[WEBHOOK-SETUP.md](./WEBHOOK-SETUP.md)** - Configurar webhook do GitHub

---

## 🆘 Suporte

**Problemas não resolvidos aqui?**

1. Veja logs detalhados: `wrangler tail`
2. Verifique configuração: `wrangler.toml`
3. Teste localmente: `wrangler dev`
4. Revise commits recentes para mudanças

**Versões:**
- Wrangler: 4.32.0+
- Node.js: 18+
- Cloudflare Workers: Runtime atual
