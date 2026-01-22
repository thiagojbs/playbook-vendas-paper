# Configuracao do GitHub Webhook

Guia para configurar o webhook que reindexa o conteudo automaticamente.

## Pre-requisitos

1. Worker deployado no Cloudflare
2. Secret `GITHUB_WEBHOOK_SECRET` configurado
3. Acesso de administrador ao repositorio GitHub

## Passo 1: Gerar Webhook Secret

Se ainda nao gerou o secret, execute:

```bash
# Gera secret aleatorio
openssl rand -hex 32

# Exemplo de output:
# a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
```

**IMPORTANTE:** Salve este secret! Voce precisara dele em dois lugares:
1. Cloudflare Worker (via wrangler secret)
2. GitHub Webhook settings

## Passo 2: Configurar Secret no Cloudflare

```bash
# Configure o secret no worker
wrangler secret put GITHUB_WEBHOOK_SECRET

# Cole o secret quando solicitado
```

## Passo 3: Configurar Webhook no GitHub

1. Acesse o repositorio no GitHub
2. Va para **Settings** > **Webhooks** > **Add webhook**

### Configuracoes do Webhook

| Campo | Valor |
|-------|-------|
| Payload URL | `https://vendas.papervines.digital/index/webhook` |
| Content type | `application/json` |
| Secret | (o secret gerado no Passo 1) |
| SSL verification | Enable SSL verification |
| Which events? | Just the push event |
| Active | ✅ (marcado) |

### Screenshot de Referencia

```
┌─────────────────────────────────────────────────────────────┐
│ Webhooks / Add webhook                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ Payload URL                                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ https://vendas.papervines.digital/index/webhook         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ Content type                                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ application/json                              ▼         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ Secret                                                       │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ••••••••••••••••••••••••••••••••                        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ Which events would you like to trigger this webhook?        │
│ ○ Just the push event                                       │
│ ○ Send me everything                                        │
│ ○ Let me select individual events                           │
│                                                              │
│ ☑ Active                                                    │
│                                                              │
│ [Add webhook]                                                │
└─────────────────────────────────────────────────────────────┘
```

## Passo 4: Testar o Webhook

### Via GitHub (Redeliver)

1. Apos criar o webhook, clique nele para ver detalhes
2. Va para a aba **Recent Deliveries**
3. Clique em **Redeliver** no ping inicial

### Via Push Real

```bash
# Faca uma alteracao em qualquer arquivo de conteudo
# Exemplo: edite src/data/tenants/papervines/objecoes.js

git add .
git commit -m "test: trigger webhook"
git push origin main
```

### Via cURL (Simular Webhook)

```bash
# Gera assinatura HMAC
BODY='{"ref":"refs/heads/main","commits":[{"added":[],"modified":["src/data/tenants/papervines/objecoes.js"],"removed":[]}],"pusher":{"name":"test"}}'
SECRET="seu_webhook_secret"
SIGNATURE="sha256=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')"

# Envia webhook simulado
curl -X POST https://vendas.papervines.digital/index/webhook \
  -H "Content-Type: application/json" \
  -H "X-Hub-Signature-256: $SIGNATURE" \
  -d "$BODY"
```

## Passo 5: Verificar Logs

### Via Wrangler Tail

```bash
# Acompanhe logs em tempo real
wrangler tail

# Voce vera algo como:
# [Indexer] Processando objecoes para tenant papervines
# [Indexer] objecoes: 11 chunks extraidos
# Manual index: success
```

### Via Dashboard Cloudflare

1. Acesse Workers & Pages no dashboard
2. Selecione o worker `playbook-vendas-paper`
3. Va para **Logs** > **Real-time Logs**

## Fluxo de Reindexacao

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│   GitHub    │────►│   Webhook   │────►│   Worker        │
│   Push      │     │   Event     │     │   /index/webhook│
└─────────────┘     └─────────────┘     └────────┬────────┘
                                                  │
                                                  ▼
                                        ┌─────────────────┐
                                        │ Verifica        │
                                        │ Assinatura      │
                                        └────────┬────────┘
                                                  │
                              ┌───────────────────┼───────────────────┐
                              │                   │                   │
                              ▼                   ▼                   ▼
                    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
                    │ Branch != main  │ │ Sem arquivos    │ │ Arquivos        │
                    │ Ignora          │ │ de conteudo     │ │ alterados       │
                    └─────────────────┘ │ Ignora          │ └────────┬────────┘
                                        └─────────────────┘          │
                                                                     ▼
                                                           ┌─────────────────┐
                                                           │ Carrega arquivo │
                                                           │ do GitHub       │
                                                           └────────┬────────┘
                                                                    │
                                                                    ▼
                                                           ┌─────────────────┐
                                                           │ Gera embeddings │
                                                           │ (OpenAI)        │
                                                           └────────┬────────┘
                                                                    │
                                                                    ▼
                                                           ┌─────────────────┐
                                                           │ Upsert no       │
                                                           │ Vectorize       │
                                                           └─────────────────┘
```

## Arquivos Monitorados

O webhook processa apenas alteracoes em:

```
src/data/tenants/{tenant}/
├── playbook.js
├── playbook-expandido.js
├── objecoes.js
├── scripts.js
├── precos.js
└── agentes.js
```

Alteracoes em outros arquivos sao ignoradas.

## Troubleshooting

### Webhook retorna 401 (Assinatura invalida)

- Verifique se o secret e identico no GitHub e no Cloudflare
- Certifique-se de que nao ha espacos extras no secret
- Re-configure o secret: `wrangler secret put GITHUB_WEBHOOK_SECRET`

### Webhook retorna 200 mas nao reindexa

- Verifique se o push foi para `main` ou `master`
- Verifique se arquivos alterados estao em `src/data/tenants/*/`
- Verifique logs com `wrangler tail`

### Embeddings falham

- Verifique se `OPENAI_API_KEY` esta configurado
- Verifique creditos disponiveis na conta OpenAI
- Verifique rate limits da API

### Vectorize falha

- Verifique se o indice existe
- Verifique binding no `wrangler.toml`
- Execute `wrangler vectorize list` para verificar

## Endpoints Relacionados

| Endpoint | Metodo | Descricao |
|----------|--------|-----------|
| `/index/webhook` | POST | Recebe eventos do GitHub |
| `/index/manual` | POST | Indexacao manual |
| `/index/status` | GET | Status do indice |

### Exemplo: Indexacao Manual

```bash
curl -X POST https://vendas.papervines.digital/index/manual \
  -H "Content-Type: application/json" \
  -d '{"tenant": "papervines", "fullReindex": true}'
```

### Exemplo: Status do Indice

```bash
curl https://vendas.papervines.digital/index/status
```

Resposta:

```json
{
  "status": "online",
  "index": {
    "available": true,
    "vectorCount": 59,
    "dimensions": 1536,
    "metric": "cosine"
  },
  "lastWebhooks": [
    {
      "timestamp": "2025-01-21T22:45:00.000Z",
      "files": ["src/data/tenants/papervines/objecoes.js"],
      "pusher": "usuario",
      "commits": 1
    }
  ]
}
```

---

*Documentacao criada em: 2025-01-21*
