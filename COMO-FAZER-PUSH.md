# 🚀 Como Fazer Push Manual - New Oeste

## ⚠️ Problema
Há um lock do Git (`.git/index.lock`) que está impedindo operações automáticas.

---

## ✅ Solução: Fazer do Seu Computador

### Opção 1: Via Terminal/CMD (Recomendado)

```bash
# 1. Abrir terminal na pasta do projeto
cd /caminho/para/playbook-vendas-paper

# 2. Remover locks (se necessário)
rm -f .git/index.lock
rm -f .git/HEAD.lock

# Windows (CMD)
del .git\index.lock
del .git\HEAD.lock

# 3. Verificar status
git status

# 4. Adicionar arquivos
git add -A

# 5. Commit
git commit -m "feat: personalizar New Oeste + corrigir links

- Cores laranja (#FF6B35) e amarelo (#FFD700)
- Logo SVG com círculos concêntricos
- Links limpos sem query params
- Documentação completa"

# 6. Push
git push origin main
```

### Opção 2: Via VS Code / IDE

1. Abra a pasta do projeto no VS Code
2. Na barra lateral Git (Ctrl+Shift+G):
   - Veja os arquivos modificados
   - Clique em "+" para stage all
   - Digite mensagem de commit
   - Clique em "✓ Commit"
   - Clique em "⬆️ Push"

### Opção 3: Via GitHub Desktop

1. Abra GitHub Desktop
2. Selecione o repositório `playbook-vendas-paper`
3. Veja as alterações
4. Digite mensagem de commit
5. Clique em "Commit to main"
6. Clique em "Push origin"

---

## 📋 Arquivos que Serão Commitados

```
M  src/data/tenants/newoeste/config.js         (cores)
M  src/templates/layout.js                     (links + logo)
?? ALTERACOES-CORES-NEWOESTE.md               (doc)
?? CORRECAO-LINKS-MENU.md                     (doc)
?? DEPLOY-STATUS-NEWOESTE.md                  (doc)
?? fazer-push.sh                              (script)
```

---

## ✅ Após o Push

### 1. Deploy Automático
- Cloudflare detecta o push
- Inicia build automaticamente
- Deploy em ~2 minutos

### 2. Verificar

Abra no navegador:
```
https://playbook.newoeste.com.br/
```

### 3. Testar

- ✅ Logo com círculos laranja/amarelo no topo?
- ✅ Cores laranja e amarelo por todo site?
- ✅ Links do menu funcionando?
- ✅ URLs limpas (sem ?tenant=)?

Exemplos de URLs que devem funcionar:
- `playbook.newoeste.com.br/playbook/scripts` ✅
- `playbook.newoeste.com.br/playbook/objecoes` ✅
- `playbook.newoeste.com.br/desempenho` ✅
- `playbook.newoeste.com.br/calculadora` ✅

---

## 🎨 O Que Foi Alterado

### 1. Cores Personalizadas
- Laranja `#FF6B35` (primária)
- Amarelo `#FFD700` (secundária)
- Gradiente laranja-amarelo

### 2. Logo SVG
- Círculos concêntricos (estilo New Oeste)
- Aparece SOMENTE para tenant newoeste
- Cores da marca

### 3. Links Corrigidos
- Removido `?tenant=newoeste` dos links
- URLs limpas e profissionais
- Melhor para SEO

---

## 📞 Se Ainda Não Funcionar

### Verificar Locks Manualmente

```bash
# Listar processos Git
ps aux | grep git

# Matar processo (se encontrar)
kill -9 [PID]

# Remover locks
rm -f .git/*.lock
rm -f .git/refs/heads/*.lock
```

### Ou Simplesmente...

Reinicie seu computador e tente novamente! 😊

---

## 🎯 Resumo Rápido

```bash
cd playbook-vendas-paper
rm -f .git/*.lock
git add -A
git commit -m "feat: personalizar New Oeste"
git push origin main
```

Aguarde 2 min → Abra `playbook.newoeste.com.br` → Pronto! 🎉

---

*Documentação criada em: 03/02/2026*
