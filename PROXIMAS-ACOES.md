# 🎯 Próximas Ações - Playbook Cabelo & Saúde

**Última atualização:** 23 de Janeiro de 2026

---

## ✅ Status Atual

### Concluído Hoje
- ✅ Identificado e corrigido erro na página de scripts
- ✅ Implementadas validações de segurança no código
- ✅ Commit realizado com correções
- ✅ Documentação criada (RELATORIO-CORRECAO-SCRIPTS.md)
- ✅ Arquivo corrigido disponível (playbook-CORRIGIDO.js)

### Tenant Cabelo & Saúde - Situação
**Dados criados:** ✅
- config.js (configurações do tenant)
- playbook.js (processo de vendas - 2 etapas)
- objecoes.js (10 objeções tratadas)
- scripts.js (40+ scripts em 7 etapas do funil)
- precos.js (tabela de serviços)

**Chunks gerados:** ✅ 21 chunks
**Indexado no RAG:** ❓ (precisa verificar)
**Páginas testadas:** ⚠️ Parcialmente

---

## 🚀 Ações Imediatas (Fazer Primeiro)

### 1. Deploy da Correção
**Prioridade:** 🔴 ALTA
**Tempo estimado:** 5 minutos

```bash
# Opção A: Via GitHub (recomendado)
cd /caminho/do/projeto
git add src/pages/playbook.js
git commit -m "fix: corrigir erro de scripts no playbook Cabelo e Saúde"
git push origin main

# Opção B: Via Wrangler (manual)
npx wrangler deploy
```

**Resultado esperado:**
- Página `https://vendas.papervines.digital/playbook?tenant=cabeloesaude` funciona
- Página `https://vendas.papervines.digital/playbook/scripts?tenant=cabeloesaude` funciona

---

### 2. Testar Todas as Páginas
**Prioridade:** 🟡 MÉDIA
**Tempo estimado:** 10 minutos

Após o deploy, testar:

| URL | Status | Ação |
|-----|--------|------|
| `/playbook?tenant=cabeloesaude` | ❓ | Verificar página principal |
| `/playbook/scripts?tenant=cabeloesaude` | ❓ | Verificar scripts |
| `/playbook/objecoes?tenant=cabeloesaude` | ❓ | Verificar objeções |
| `/calculadora?tenant=cabeloesaude` | ❓ | Verificar se é necessário |
| `/clientes?tenant=cabeloesaude` | ❓ | Verificar CRM |

**Como testar:**
1. Abrir cada URL no navegador
2. Verificar se carrega sem erros
3. Clicar em accordions e abas
4. Testar funcionalidades (copiar scripts, etc.)

---

### 3. Indexar Conteúdo no RAG
**Prioridade:** 🟡 MÉDIA
**Tempo estimado:** 15 minutos

O conteúdo do Cabelo & Saúde precisa estar indexado no Vectorize para funcionar com busca RAG e MCP.

```bash
# 1. Verificar se chunks estão corretos
cat output/cabeloesaude-chunks.json | head -20

# 2. Fazer upload dos chunks para Vectorize
node scripts/upload-chunks.js cabeloesaude

# 3. Verificar status do índice
curl https://vendas.papervines.digital/index/status?tenant=cabeloesaude
```

**Resultado esperado:**
```json
{
  "status": "ok",
  "tenant": "cabeloesaude",
  "totalVectors": 21,
  "categories": {
    "playbook": 2,
    "objecoes": 10,
    "scripts": 8,
    "precos": 1
  }
}
```

---

### 4. Testar Busca RAG
**Prioridade:** 🟢 BAIXA
**Tempo estimado:** 10 minutos

Após indexação, testar se a busca funciona:

```bash
# Testar busca de objeção
curl -X POST https://vendas.papervines.digital/api/rag/search \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: cabeloesaude" \
  -d '{"query": "paciente acha tratamento caro", "category": "objecoes", "topK": 3}'

# Testar busca de script
curl -X POST https://vendas.papervines.digital/api/rag/search \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: cabeloesaude" \
  -d '{"query": "primeiro contato com paciente", "category": "scripts", "topK": 3}'
```

**Resultado esperado:**
- Retorna resultados relevantes
- Score > 0.7 para boas correspondências
- Conteúdo é do tenant correto

---

## 📋 Tarefas Complementares

### 5. Revisar Conteúdo
**Prioridade:** 🟢 BAIXA
**Tempo estimado:** 30 minutos

Revisar se o conteúdo criado está adequado:

**Playbook (playbook.js):**
- ✅ 2 etapas criadas (Avaliação Inicial, Diagnóstico e Proposta)
- ⚠️ Considerar adicionar mais etapas? (Fechamento, Follow-up, etc.)

**Objeções (objecoes.js):**
- ✅ 10 objeções principais criadas
- ⚠️ Revisar se cobrem os casos mais comuns
- ⚠️ Adicionar técnicas específicas de tricologia?

**Scripts (scripts.js):**
- ✅ 40+ scripts em 7 etapas
- ✅ Dicas de comunicação específicas para saúde
- ✅ Sequências de follow-up
- ⚠️ Revisar linguagem (paciente vs cliente)

**Preços (precos.js):**
- ✅ Lista de serviços criada
- ⚠️ Verificar se valores estão corretos
- ⚠️ Adicionar pacotes/combos se necessário

---

### 6. Personalizar Visual
**Prioridade:** 🟢 BAIXA
**Tempo estimado:** 20 minutos

As cores do tema já estão definidas em config.js:
```javascript
tema: {
  corPrimaria: '#1a5f52',      // Verde escuro principal
  corSecundaria: '#2d8a7a',    // Verde médio/teal
  corAcento: '#4fb3a3',        // Verde claro
  // ...
}
```

Próximos passos visuais:
- [ ] Adicionar logo da clínica (se houver)
- [ ] Verificar se cores funcionam bem em todas as páginas
- [ ] Considerar adicionar imagens/ícones específicos de tricologia

---

### 7. Configurar Integrações
**Prioridade:** 🟢 BAIXA (se necessário)

**CRM WTSChat:**
```javascript
crm: {
  provider: 'wtschat',
  baseUrl: 'https://api.v2.wtschat.com',
  // API key via environment variable: CABELOESAUDE_CRM_KEY
}
```

**Passos:**
1. Obter API key do WTSChat
2. Configurar secret no Cloudflare Workers:
   ```bash
   npx wrangler secret put CABELOESAUDE_CRM_KEY
   ```
3. Testar integração com endpoints de CRM

---

## 📊 Checklist de Finalização

### Técnico
- [ ] Deploy da correção realizado
- [ ] Todas as páginas testadas e funcionando
- [ ] Conteúdo indexado no Vectorize
- [ ] Busca RAG funcionando
- [ ] MCP retornando resultados corretos

### Conteúdo
- [ ] Processo de vendas revisado
- [ ] Objeções revisadas e testadas
- [ ] Scripts revisados
- [ ] Preços conferidos
- [ ] Linguagem adequada (paciente, tratamento, etc.)

### Visual
- [ ] Cores do tema aplicadas corretamente
- [ ] Logo adicionado (se disponível)
- [ ] Layout responsivo testado
- [ ] Ícones e badges funcionando

### Integrações
- [ ] CRM configurado (se necessário)
- [ ] Webhooks funcionando (se aplicável)
- [ ] Analytics configurado (se necessário)

---

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
# Rodar localmente
npx wrangler dev

# Ver logs em tempo real
npx wrangler tail

# Testar localmente
curl http://localhost:8787/playbook?tenant=cabeloesaude
```

### Deploy
```bash
# Deploy via Wrangler
npx wrangler deploy

# Verificar se deploy funcionou
curl https://vendas.papervines.digital/health
```

### Dados
```bash
# Gerar chunks novamente (se necessário)
node scripts/generate-chunks.js cabeloesaude

# Testar chunks gerados
node scripts/test-chunks.js cabeloesaude

# Fazer upload
node scripts/upload-chunks.js cabeloesaude
```

### Database
```bash
# Criar tabelas se necessário
npx wrangler d1 execute papervines-playbook --file=./migrations/001_create_tables.sql

# Query manual
npx wrangler d1 execute papervines-playbook --command="SELECT * FROM clientes WHERE tenant_id='cabeloesaude'"
```

---

## 📞 Suporte

Se encontrar problemas:

1. **Verificar logs:**
   ```bash
   npx wrangler tail
   ```

2. **Verificar console do navegador:**
   - Abrir DevTools (F12)
   - Aba Console
   - Verificar erros em vermelho

3. **Testar endpoints manualmente:**
   ```bash
   curl -v https://vendas.papervines.digital/playbook?tenant=cabeloesaude
   ```

4. **Consultar documentação:**
   - `/docs/API.md`
   - `/docs/MCP.md`
   - `/docs/NEW-TENANT.md`
   - `RELATORIO-CORRECAO-SCRIPTS.md`

---

**Boa sorte com a finalização! 🚀**
