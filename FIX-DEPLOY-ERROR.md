# 🔧 Fix: Erro de Deploy - getSteps Duplicado

## ❌ Erro Encontrado

```
✘ [ERROR] Multiple exports with the same name "getSteps"

  src/api/crm.js:90:22:
    90 │ export async function getSteps(env, request = null) {

  The name "getSteps" was originally exported here:

  src/api/crm.js:74:22:
    74 │ export async function getSteps(env) {
```

**Causa:** A função `getSteps` foi definida duas vezes:
- Linha 74: Versão antiga `getSteps(env)`
- Linha 90: Versão nova `getSteps(env, request = null)`

## ✅ Solução

**Removida a duplicata** (linha 74-77):

```javascript
// ❌ REMOVIDO (duplicado):
export async function getSteps(env) {
  const panel = await getPanel(env);
  return { items: panel.steps || [], panel };
}
```

**Mantida a versão correta** (linha 90):

```javascript
// ✅ MANTIDO (versão atualizada):
export async function getSteps(env, request = null) {
  const panel = await getPanel(env, request);
  return { items: panel.steps || [], panel };
}
```

## 📝 Commit

```bash
cd ~/playbook-vendas-paper
git add .
git commit -m "fix: remover função getSteps duplicada

- Erro de build: Multiple exports with the same name
- Mantida versão com parâmetro request
- Removida versão antiga sem request"

git push origin main
```

## ✅ Após Fix

Deploy deve funcionar normalmente! 🎉
