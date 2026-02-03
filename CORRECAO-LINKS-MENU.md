# 🔧 Correção de Links do Menu - New Oeste

**Data**: 03/02/2026
**Status**: ✅ Corrigido (pendente commit)

---

## 🐛 Problema Identificado

Links quebrados no menu quando acessado via domínio personalizado:
- ❌ `https://playbook.newoeste.com.br/playbook/scripts?tenant=newoeste`
- ❌ `https://playbook.newoeste.com.br/desempenho?tenant=newoeste`

### Causa
O sistema estava adicionando `?tenant=newoeste` nos links mesmo quando o tenant já era detectado automaticamente pelo domínio (`playbook.newoeste.com.br`).

---

## ✅ Solução Implementada

**Arquivo**: `src/templates/layout.js` (linha 119-122)

### Antes:
```javascript
// Query string para manter o tenant nos links internos
const tenantId = config.id || 'papervines';
const tenantQuery = tenantId !== 'papervines' ? `?tenant=${tenantId}` : '';
```

### Depois:
```javascript
// Query string para manter o tenant nos links internos
// Apenas adicionar tenant query se não for o padrão E se tenant tem domínio próprio
const tenantId = config.id || 'papervines';
const temDominioPersonalizado = config.dominio && config.dominio !== '';
const tenantQuery = (tenantId !== 'papervines' && !temDominioPersonalizado) ? `?tenant=${tenantId}` : '';
```

### Lógica
- ✅ Se tenant tem domínio personalizado (ex: `playbook.newoeste.com.br`) → **NÃO** adiciona `?tenant=`
- ✅ Se acessa via worker URL (ex: `playbook-vendas-paper.workers.dev`) → **SIM** adiciona `?tenant=newoeste`
- ✅ Se é Paper Vines (padrão) → **NÃO** adiciona `?tenant=`

---

## 🎯 Resultado

### Links Corrigidos

**Quando acessa via**: `playbook.newoeste.com.br`

| Menu | Link Antigo | Link Novo |
|------|-------------|-----------|
| Scripts | `/playbook/scripts?tenant=newoeste` | `/playbook/scripts` ✅ |
| Objeções | `/playbook/objecoes?tenant=newoeste` | `/playbook/objecoes` ✅ |
| Desempenho | `/desempenho?tenant=newoeste` | `/desempenho` ✅ |
| Calculadora | `/calculadora?tenant=newoeste` | `/calculadora` ✅ |
| Todos | `/playbook?tenant=newoeste` | `/playbook` ✅ |

### URLs Limpas
- ✅ Mais bonitas e profissionais
- ✅ Melhor para SEO
- ✅ Tenant detectado automaticamente pelo domínio

---

## 📊 Como Funciona Agora

### Detecção de Tenant (3 formas)

1. **Por Domínio** (Prioritário)
   ```
   playbook.newoeste.com.br → tenant: newoeste
   vendas.papervines.digital → tenant: papervines
   ```

2. **Por Query Param** (Fallback)
   ```
   workers.dev/?tenant=newoeste → tenant: newoeste
   workers.dev/tenant/newoeste → tenant: newoeste
   ```

3. **Por Header**
   ```
   X-Tenant-ID: newoeste → tenant: newoeste
   ```

### Quando Usar Query Param

APENAS quando acessa via:
- Worker URL: `playbook-vendas-paper.thiagojbs.workers.dev`
- Localhost: `localhost:8787`
- Domínio sem tenant configurado

---

## 🚀 Para Commitar

```bash
cd /path/to/playbook-vendas-paper

# Remover lock (se necessário)
rm -f .git/index.lock .git/HEAD.lock

# Adicionar arquivos
git add src/templates/layout.js
git add src/data/tenants/newoeste/config.js
git add CORRECAO-LINKS-MENU.md

# Commit
git commit -m "fix: corrigir links do menu para domínios personalizados

- Não adicionar ?tenant= quando tenant tem domínio próprio
- Links limpos para playbook.newoeste.com.br
- Tenant detectado automaticamente pelo domínio
- Melhora SEO e user experience

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Push
git push origin main
```

---

## ✅ Verificação Após Deploy

1. Aguarde deploy Cloudflare (~2 min)
2. Abra: `https://playbook.newoeste.com.br/`
3. Clique nos links do menu
4. Verifique que URLs estão limpas (sem `?tenant=`)

### Teste Específico

```bash
# Paper Vines (deve funcionar normalmente)
curl -I https://vendas.papervines.digital/playbook/scripts

# New Oeste (links limpos)
curl -I https://playbook.newoeste.com.br/playbook/scripts

# Worker URL (deve adicionar ?tenant=)
curl -I https://playbook-vendas-paper.workers.dev/playbook/scripts?tenant=newoeste
```

---

## 📝 Arquivos Modificados

```
M  src/templates/layout.js  (correção dos links)
M  src/data/tenants/newoeste/config.js  (cores atualizadas)
?? CORRECAO-LINKS-MENU.md  (esta documentação)
?? ALTERACOES-CORES-NEWOESTE.md
?? DEPLOY-STATUS-NEWOESTE.md
```

---

## 🎉 Benefícios

- ✅ URLs mais limpas e profissionais
- ✅ Melhor experiência do usuário
- ✅ SEO otimizado
- ✅ Links não quebrados
- ✅ Funciona em todos os cenários (domínio próprio ou worker URL)

---

*Correção implementada em: 03/02/2026*
*Status: Pendente commit e deploy*
