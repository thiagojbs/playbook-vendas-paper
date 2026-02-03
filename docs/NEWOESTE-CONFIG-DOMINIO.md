# Configuração de Domínio Personalizado - New Oeste

## 🎯 Objetivo

Configurar `playbook.newoeste.com.br` para funcionar com o sistema multi-tenant.

---

## 📋 Arquivos a Editar

### 1️⃣ src/data/tenant-loader.js

**Adicionar imports do New Oeste** (após linha 20):

```javascript
// Cabelo e Saude
import { TENANT_CONFIG as CS_CONFIG } from './tenants/cabeloesaude/config.js';
import * as CS_PLAYBOOK from './tenants/cabeloesaude/playbook.js';
import * as CS_OBJECOES from './tenants/cabeloesaude/objecoes.js';
import * as CS_SCRIPTS from './tenants/cabeloesaude/scripts.js';
import * as CS_PRECOS from './tenants/cabeloesaude/precos.js';

// ↓↓↓ ADICIONAR AQUI ↓↓↓

// New Oeste
import { TENANT_CONFIG as NO_CONFIG } from './tenants/newoeste/config.js';
import * as NO_PLAYBOOK from './tenants/newoeste/playbook.js';
import * as NO_OBJECOES from './tenants/newoeste/objecoes.js';
import * as NO_SCRIPTS from './tenants/newoeste/scripts.js';
import * as NO_PRECOS from './tenants/newoeste/precos.js';
```

**Adicionar ao TENANTS_DATA** (após linha 43):

```javascript
const TENANTS_DATA = {
  papervines: {
    config: PV_CONFIG,
    playbook: PV_PLAYBOOK,
    objecoes: PV_OBJECOES,
    scripts: PV_SCRIPTS,
    precos: PV_PRECOS,
    agentes: PV_AGENTES
  },
  cabeloesaude: {
    config: CS_CONFIG,
    playbook: CS_PLAYBOOK,
    objecoes: CS_OBJECOES,
    scripts: CS_SCRIPTS,
    precos: CS_PRECOS,
    agentes: null
  },
  // ↓↓↓ ADICIONAR AQUI ↓↓↓
  newoeste: {
    config: NO_CONFIG,
    playbook: NO_PLAYBOOK,
    objecoes: NO_OBJECOES,
    scripts: NO_SCRIPTS,
    precos: NO_PRECOS,
    agentes: null
  }
};
```

**Adicionar ao TENANTS_REGISTRY** (após linha 61):

```javascript
const TENANTS_REGISTRY = {
  papervines: {
    id: 'papervines',
    nome: 'Paper Vines',
    status: 'ativo',
    path: './tenants/papervines'
  },
  cabeloesaude: {
    id: 'cabeloesaude',
    nome: 'Cabelo & Saude',
    nomeCompleto: 'Clinica de Tricologia Cabelo & Saude',
    status: 'ativo',
    path: './tenants/cabeloesaude',
    dominio: 'vendas.cabeloesaude.com.br'
  },
  // ↓↓↓ ADICIONAR AQUI ↓↓↓
  newoeste: {
    id: 'newoeste',
    nome: 'New Oeste',
    nomeCompleto: 'New Oeste Telecomunicações',
    status: 'ativo',
    path: './tenants/newoeste',
    dominio: 'playbook.newoeste.com.br'  // ← IMPORTANTE!
  }
};
```

**Adicionar lógica de domínio** na função `getTenantFromRequest` (após linha 95):

```javascript
  // Opcao 2: Subdominio (tenant.dominio.com)
  const hostParts = url.hostname.split('.');
  if (hostParts.length >= 3) {
    const subdomain = hostParts[0];
    // Mapear subdominios para tenants
    if (subdomain === 'vendas' && url.hostname.includes('papervines')) {
      // Continua para verificar query param
    }
    if (subdomain === 'vendas' && url.hostname.includes('cabeloesaude')) {
      return 'cabeloesaude';
    }
    // ↓↓↓ ADICIONAR AQUI ↓↓↓
    if (subdomain === 'playbook' && url.hostname.includes('newoeste')) {
      return 'newoeste';
    }
    // OU detectar domínio completo:
    if (url.hostname === 'playbook.newoeste.com.br') {
      return 'newoeste';
    }

    if (TENANTS_REGISTRY[subdomain]) {
      return subdomain;
    }
  }
```

---

### 2️⃣ wrangler.toml

**Adicionar rota customizada**:

```toml
name = "playbook-vendas-paper"
main = "src/index.js"
compatibility_date = "2024-01-01"

# Custom domains
routes = [
  { pattern = "vendas.papervines.digital", custom_domain = true },
  # ↓↓↓ ADICIONAR AQUI ↓↓↓
  { pattern = "playbook.newoeste.com.br", custom_domain = true }
]

# ... resto do arquivo
```

---

## ☁️ Configuração no Cloudflare

### Passo 1: DNS (Cloudflare Dashboard)

1. Acesse **Cloudflare Dashboard** → Domínio `newoeste.com.br`
2. Vá em **DNS** → **Records**
3. Adicione um registro:

```
Type: CNAME
Name: playbook
Target: playbook-vendas-paper.thiagojbs.workers.dev
Proxy status: ✅ Proxied (laranja)
TTL: Auto
```

**OU** se preferir apontar direto:

```
Type: CNAME
Name: playbook
Target: newoeste.com.br
Proxy status: ✅ Proxied
```

### Passo 2: Custom Domain no Workers

#### Opção A: Via Dashboard (Recomendado)

1. Acesse **Cloudflare Dashboard**
2. **Workers & Pages** → `playbook-vendas-paper`
3. **Settings** → **Domains & Routes**
4. **Add Custom Domain**
5. Digite: `playbook.newoeste.com.br`
6. Clique em **Add Domain**

Cloudflare vai:
- ✅ Criar certificado SSL automaticamente
- ✅ Configurar DNS se necessário
- ✅ Ativar o domínio em ~5 minutos

#### Opção B: Via CLI (Wrangler)

```bash
# Adicionar domínio customizado
wrangler domains add playbook.newoeste.com.br

# Verificar domínios ativos
wrangler domains list
```

---

## 🔧 Deploy e Teste

### 1. Commitar Alterações

```bash
cd /path/to/playbook-vendas-paper

git add src/data/tenant-loader.js wrangler.toml
git commit -m "feat: adicionar tenant newoeste com domínio personalizado"
```

### 2. Deploy

```bash
wrangler deploy
```

Saída esperada:
```
✨ Built successfully, built project size is 150 KiB.
✅ Successfully published your script to
   https://playbook-vendas-paper.thiagojbs.workers.dev
   https://vendas.papervines.digital
   https://playbook.newoeste.com.br  ← NOVO!
```

### 3. Testar

#### Teste 1: Health Check

```bash
curl https://playbook.newoeste.com.br/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "tenant": "newoeste",
  "timestamp": "2026-02-03T..."
}
```

#### Teste 2: Busca RAG

```bash
curl -X POST https://playbook.newoeste.com.br/api/rag/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "como tratar objecao de preco"
  }'
```

#### Teste 3: Verificar Tenant

```bash
curl https://playbook.newoeste.com.br/ | grep -i "new oeste"
```

#### Teste 4: Configuração

```bash
curl https://playbook.newoeste.com.br/api/config
```

Deve retornar as configurações do tenant newoeste.

---

## 🔍 Formas de Acessar (Todas Funcionam)

Após configuração, o tenant `newoeste` pode ser acessado de **4 formas**:

### 1. Domínio Personalizado (Recomendado)
```
https://playbook.newoeste.com.br/
```

### 2. Via Header
```bash
curl https://playbook-vendas-paper.thiagojbs.workers.dev/ \
  -H "X-Tenant-ID: newoeste"
```

### 3. Via Query Param
```
https://playbook-vendas-paper.thiagojbs.workers.dev/?tenant=newoeste
```

### 4. Via Path
```
https://playbook-vendas-paper.thiagojbs.workers.dev/tenant/newoeste
```

---

## 🚨 Troubleshooting

### Problema: "Tenant não encontrado"

**Causa**: tenant-loader.js não foi atualizado

**Solução**:
1. Verifique se os imports foram adicionados
2. Verifique TENANTS_DATA e TENANTS_REGISTRY
3. Faça deploy novamente

### Problema: DNS não resolve

**Causa**: DNS ainda não propagou

**Solução**:
1. Aguarde 5-15 minutos
2. Limpe cache DNS: `ipconfig /flushdns` (Windows) ou `sudo dscacheutil -flushcache` (Mac)
3. Teste com: `nslookup playbook.newoeste.com.br`

### Problema: SSL/HTTPS não funciona

**Causa**: Certificado ainda não gerado

**Solução**:
1. Cloudflare gera automaticamente em ~5-10 min
2. Verifique em Dashboard → SSL/TLS → Edge Certificates
3. Certifique-se que proxy está ativo (laranja)

### Problema: Retorna tenant padrão (papervines)

**Causa**: Lógica de detecção de domínio não está funcionando

**Solução**:
1. Verifique se adicionou a lógica no `getTenantFromRequest()`
2. Verifique se o domínio está correto em TENANTS_REGISTRY
3. Adicione log temporário:
```javascript
export function getTenantFromRequest(request) {
  const url = new URL(request.url);
  console.log('Hostname:', url.hostname); // Debug
  // ... resto do código
}
```

---

## 📊 Verificação Final

Execute todos os testes:

```bash
# 1. Health check
curl https://playbook.newoeste.com.br/health

# 2. Tenant correto
curl https://playbook.newoeste.com.br/api/config | grep newoeste

# 3. Conteúdo específico
curl https://playbook.newoeste.com.br/ | grep -i "fibra optica"

# 4. RAG funcionando
curl -X POST https://playbook.newoeste.com.br/api/rag/search \
  -H "Content-Type: application/json" \
  -d '{"query": "diferenciais"}'
```

Se todos retornarem sucesso: ✅ **Configuração completa!**

---

## 🎯 Resumo de Comandos

```bash
# 1. Editar arquivos
code src/data/tenant-loader.js
code wrangler.toml

# 2. Commit
git add -A
git commit -m "feat: adicionar tenant newoeste com domínio personalizado"

# 3. Deploy
wrangler deploy

# 4. Adicionar domínio (se ainda não fez via dashboard)
wrangler domains add playbook.newoeste.com.br

# 5. Testar
curl https://playbook.newoeste.com.br/health
```

---

## ✅ Checklist

- [ ] tenant-loader.js: Imports adicionados
- [ ] tenant-loader.js: TENANTS_DATA atualizado
- [ ] tenant-loader.js: TENANTS_REGISTRY atualizado
- [ ] tenant-loader.js: Lógica de detecção de domínio
- [ ] wrangler.toml: Rota customizada adicionada
- [ ] DNS: CNAME configurado
- [ ] Deploy realizado
- [ ] Testes passando
- [ ] SSL/HTTPS funcionando

---

*Documentação criada em: 03/02/2026*
*Versão: 1.0.0*
