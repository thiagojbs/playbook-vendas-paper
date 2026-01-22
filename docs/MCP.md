# MCP (Model Context Protocol) - Integracao

Guia para integrar o servidor MCP do Playbook de Vendas com assistentes de IA.

## O que e MCP?

MCP (Model Context Protocol) e um protocolo da Anthropic que permite que assistentes de IA acessem dados e ferramentas externas de forma padronizada.

Com MCP, um assistente pode:
- Buscar informacoes no playbook de vendas em tempo real
- Obter sugestoes para tratar objecoes de clientes
- Consultar precos e planos atualizados
- Acessar scripts de vendas contextualizados

## URL do Servidor

```
https://vendas.papervines.digital/mcp
```

## Configuracao no Claude Desktop

Edite o arquivo de configuracao do Claude Desktop:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "playbook-vendas": {
      "url": "https://vendas.papervines.digital/mcp",
      "headers": {
        "X-Tenant-ID": "papervines"
      }
    }
  }
}
```

Reinicie o Claude Desktop apos configurar.

## Ferramentas Disponiveis

### 1. search_playbook

Busca semantica no playbook de vendas.

**Input:**
```json
{
  "query": "vantagens do chatbot para empresas",
  "category": "playbook",
  "topK": 5
}
```

**Exemplo de uso no Claude:**
> "Busque no playbook informacoes sobre como funciona a IA da Paper Vines"

### 2. get_objection_response

Obtem sugestoes para tratar objecoes de clientes.

**Input:**
```json
{
  "objection": "o cliente disse que ja usa outra plataforma"
}
```

**Exemplo de uso no Claude:**
> "O cliente disse que o preco esta muito alto. Como devo responder?"

### 3. get_script

Busca scripts de vendas por situacao.

**Input:**
```json
{
  "situation": "primeiro contato com lead frio",
  "stage": "abertura"
}
```

**Exemplo de uso no Claude:**
> "Me de um script para iniciar conversa com um lead que veio do Instagram"

### 4. get_pricing

Retorna informacoes de precos e planos.

**Input:**
```json
{
  "planType": "chatbots"
}
```

**Exemplo de uso no Claude:**
> "Quais sao os planos de chatbot disponiveis e seus precos?"

### 5. list_topics

Lista categorias disponiveis no playbook.

**Input:**
```json
{}
```

**Exemplo de uso no Claude:**
> "Quais assuntos posso consultar no playbook?"

## Exemplo de Integracao Programatica

### Node.js

```javascript
import { Client } from '@anthropic/sdk';

const client = new Client({ apiKey: process.env.ANTHROPIC_API_KEY });

async function chatWithPlaybook(message) {
  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    tools: [
      {
        type: 'mcp',
        server: {
          url: 'https://vendas.papervines.digital/mcp',
          headers: {
            'X-Tenant-ID': 'papervines'
          }
        }
      }
    ],
    messages: [
      { role: 'user', content: message }
    ]
  });

  return response;
}

// Uso
const response = await chatWithPlaybook(
  'Como devo tratar quando o cliente diz que precisa pensar?'
);
console.log(response.content);
```

### Python

```python
import anthropic

client = anthropic.Client(api_key=os.environ["ANTHROPIC_API_KEY"])

def chat_with_playbook(message):
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        tools=[
            {
                "type": "mcp",
                "server": {
                    "url": "https://vendas.papervines.digital/mcp",
                    "headers": {
                        "X-Tenant-ID": "papervines"
                    }
                }
            }
        ],
        messages=[
            {"role": "user", "content": message}
        ]
    )
    return response

# Uso
response = chat_with_playbook(
    "Qual script usar para follow-up apos demonstracao?"
)
print(response.content)
```

## Fluxo de uma Chamada MCP

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│   Claude    │────►│   MCP       │────►│   Worker        │
│   (Usuario) │     │   Protocol  │     │   /mcp/execute  │
└─────────────┘     └─────────────┘     └────────┬────────┘
                                                  │
                                                  ▼
                                        ┌─────────────────┐
                                        │ Identifica      │
                                        │ Ferramenta      │
                                        └────────┬────────┘
                                                  │
                    ┌─────────────────────────────┼─────────────────────────────┐
                    │                             │                             │
                    ▼                             ▼                             ▼
          ┌─────────────────┐           ┌─────────────────┐           ┌─────────────────┐
          │ search_playbook │           │ get_objection   │           │ get_pricing     │
          │ Busca Vectorize │           │ Busca + Format  │           │ Retorna Planos  │
          └────────┬────────┘           └────────┬────────┘           └────────┬────────┘
                   │                             │                             │
                   └─────────────────────────────┼─────────────────────────────┘
                                                 │
                                                 ▼
                                        ┌─────────────────┐
                                        │ Formata         │
                                        │ Resposta MCP    │
                                        └────────┬────────┘
                                                 │
                                                 ▼
                                        ┌─────────────────┐
                                        │ Retorna ao      │
                                        │ Claude          │
                                        └─────────────────┘
```

## Categorias de Conteudo

| Categoria | Descricao | Chunks |
|-----------|-----------|--------|
| `playbook` | Processo de vendas, diferenciais, estatisticas | 14 |
| `objecoes` | Tratativas para objecoes, tecnicas de negociacao | 11 |
| `scripts` | Scripts por etapa do funil, templates | 10 |
| `precos` | Tabelas de precos, planos, promocoes | 7 |
| `agentes` | Tipos de agentes IA, capacidades, exemplos | 17 |

## Exemplos de Perguntas para o Claude

### Vendas
- "Como devo apresentar os diferenciais da Paper Vines?"
- "Qual o processo de vendas recomendado?"
- "Me de estatisticas para usar em apresentacoes"

### Objecoes
- "O cliente disse que ja usa outro sistema. O que responder?"
- "Como tratar a objecao de preco?"
- "Quais tecnicas usar quando pedem desconto?"

### Scripts
- "Me de um script de abertura para WhatsApp"
- "Como fazer follow-up apos proposta enviada?"
- "Qual script usar para fechar a venda?"

### Precos
- "Quanto custa o plano de chatbot basico?"
- "Quais sao os planos de IA disponiveis?"
- "Tem desconto para pagamento anual?"

### Agentes IA
- "Quais tipos de agentes IA voces oferecem?"
- "Me explique a diferenca entre Executor e Supervisor"
- "Quais metricas os agentes conseguem atingir?"

## Multi-tenant

O servidor MCP suporta multiplos tenants. Cada tenant tem seu proprio conteudo isolado.

Para especificar o tenant, use o header `X-Tenant-ID`:

```json
{
  "headers": {
    "X-Tenant-ID": "outro-tenant"
  }
}
```

Ou no input da ferramenta:

```json
{
  "tool": "search_playbook",
  "input": {
    "query": "...",
    "tenant": "outro-tenant"
  }
}
```

## Troubleshooting

### Claude nao encontra as ferramentas

1. Verifique se a URL esta correta
2. Verifique se o worker esta rodando: `curl https://vendas.papervines.digital/mcp/health`
3. Reinicie o Claude Desktop

### Respostas vazias

1. Verifique se o indice Vectorize tem dados: `curl https://vendas.papervines.digital/index/status`
2. Tente uma busca mais generica
3. Verifique os logs: `wrangler tail`

### Timeout nas chamadas

1. Aumente o timeout no cliente
2. Verifique rate limits da OpenAI
3. Considere reduzir `topK` para buscas menores

## Custos

O uso do MCP envolve:

1. **OpenAI Embeddings:** ~$0.00002 por 1000 tokens
2. **Cloudflare Workers:** Incluso no plano gratuito (ate 100k requests/dia)
3. **Vectorize:** Incluso no plano gratuito (ate 30M queries/mes)

**Estimativa:** ~$0.001 por 10 perguntas ao playbook

---

*Documentacao criada em: 2025-01-21*
