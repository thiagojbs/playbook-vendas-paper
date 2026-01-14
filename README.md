# Paper Vines - Playbook de Vendas

Sistema completo de Playbook de Vendas para a Paper Vines, substituindo a planilha Excel por uma aplicacao web moderna.

## Funcionalidades

### Playbook
- Processo de vendas em 6 etapas
- Scripts prontos para cada fase (prospeccao, proposta, contrato, pos-venda)
- Tratativas de objecoes com respostas prontas
- Checklists comercial e de contrato
- Links uteis integrados

### Calculadora de Propostas
- Configuracao interativa de planos
- Calculo automatico de mensalidade e implantacao
- Geracao de proposta formatada para WhatsApp
- Todos os precos da tabela Paper Vines

### Gestao de Clientes (CRUD)
- Cadastro completo de clientes
- Filtros por status e busca
- Integracao com banco D1

### Propostas e Contratos
- Criacao automatica com numeracao
- Status de acompanhamento
- Links para ClickSign e Asaas

## Tecnologias

- **Cloudflare Workers** - Serverless functions
- **Cloudflare D1** - Banco de dados SQLite
- **JavaScript ES6+** - Frontend e Backend

## Deploy

### 1. Configurar Wrangler
```bash
npm install -g wrangler
wrangler login
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Deploy
```bash
npm run deploy
# ou
wrangler deploy
```

## URLs

- **Producao**: https://playbook-vendas-paper.thiagojbs.workers.dev

## Estrutura do Projeto

```
playbook-vendas-paper/
├── wrangler.toml
├── package.json
└── src/
    ├── index.js (roteador principal)
    ├── templates/
    │   └── layout.js (template base)
    ├── data/
    │   ├── precos.js (tabela de precos)
    │   └── playbook.js (conteudo do playbook)
    ├── pages/
    │   ├── home.js (dashboard)
    │   ├── playbook.js (playbook/scripts/objecoes/planos)
    │   ├── calculadora.js (calculadora de propostas)
    │   ├── clientes.js (gestao de clientes)
    │   ├── propostas.js (propostas comerciais)
    │   └── contratos.js (gestao de contratos)
    └── api/
        └── index.js (endpoints REST)
```

## Banco de Dados (D1)

O sistema usa Cloudflare D1 com as seguintes tabelas:
- **clientes**: Dados de clientes e leads
- **propostas**: Propostas comerciais
- **contratos**: Contratos e documentacao

## Licenca

Propriedade de Paper Vines Digital.
# Deploy trigger: Wed Jan 14 23:49:14 UTC 2026
