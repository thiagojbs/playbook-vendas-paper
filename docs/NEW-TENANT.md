# Guia para Adicionar Novo Tenant

Passo a passo para adicionar um novo cliente ao sistema multi-tenant.

## Visao Geral

O sistema suporta multiplos tenants (clientes), cada um com:
- Conteudo proprio (playbook, scripts, precos, etc.)
- Configuracoes personalizadas (cores, CRM, etc.)
- Dados isolados no Vectorize

## Estrutura de Arquivos

```
src/data/tenants/
├── papervines/          # Tenant existente
│   ├── config.js
│   ├── index.js
│   ├── playbook.js
│   ├── playbook-expandido.js
│   ├── objecoes.js
│   ├── scripts.js
│   ├── precos.js
│   └── agentes.js
│
└── novo-tenant/         # Novo tenant (a criar)
    ├── config.js        # Configuracao obrigatoria
    ├── index.js         # Re-exports
    └── ... (arquivos de conteudo)
```

## Passo 1: Criar Pasta do Tenant

```bash
# Criar estrutura de pastas
mkdir -p src/data/tenants/novo-tenant
```

## Passo 2: Criar config.js

Arquivo obrigatorio com configuracoes do tenant:

```javascript
// src/data/tenants/novo-tenant/config.js

export const TENANT_CONFIG = {
  // Identificacao
  id: 'novo-tenant',
  nome: 'Nome da Empresa',
  dominio: 'vendas.novaempresa.com.br',

  // Branding
  tema: {
    corPrimaria: '#3498db',
    corSecundaria: '#2ecc71',
    logo: '/assets/logo-nova.png'
  },

  // Informacoes da empresa
  empresa: {
    razaoSocial: 'Nova Empresa LTDA',
    cnpj: '00.000.000/0001-00',
    telefone: '(11) 99999-9999',
    email: 'contato@novaempresa.com.br',
    site: 'https://novaempresa.com.br'
  },

  // Integracao CRM
  crm: {
    provider: 'wtschat',
    baseUrl: 'https://api.v2.wtschat.com',
    apiVersion: 'v2'
  },

  // Configuracoes RAG
  rag: {
    indexName: 'novo-tenant-playbook',
    topK: 5,
    minScore: 0.7
  },

  // Modulos habilitados
  modulos: {
    calculadora: true,
    desempenho: true,
    objecoes: true,
    scripts: true,
    agentes: false  // Desabilitado neste tenant
  },

  // Links uteis
  links: {
    whatsapp: 'https://wa.me/5511999999999',
    suporte: 'https://suporte.novaempresa.com.br'
  }
};

export default TENANT_CONFIG;
```

## Passo 3: Criar index.js

Re-exporta todos os modulos do tenant:

```javascript
// src/data/tenants/novo-tenant/index.js

export * from './config.js';
export * from './playbook.js';
export * from './objecoes.js';
export * from './scripts.js';
export * from './precos.js';
// export * from './agentes.js'; // Se tiver
```

## Passo 4: Criar Arquivos de Conteudo

### playbook.js

```javascript
// src/data/tenants/novo-tenant/playbook.js

export const PROCESSO_VENDAS = {
  etapas: [
    {
      ordem: 1,
      nome: 'Prospeccao',
      descricao: 'Identificar leads qualificados',
      acoes: ['Pesquisar empresas', 'Qualificar leads']
    },
    // ... mais etapas
  ]
};

export const DIFERENCIAIS = [
  {
    titulo: 'Diferencial 1',
    descricao: 'Descricao do diferencial'
  }
  // ... mais diferenciais
];
```

### objecoes.js

```javascript
// src/data/tenants/novo-tenant/objecoes.js

export const OBJECOES = {
  'preco': {
    titulo: 'Esta muito caro',
    categoria: 'Preco',
    contexto: 'Cliente acha o valor alto',
    respostas: [
      'Entendo sua preocupacao...',
      'Vamos analisar o retorno...'
    ]
  }
  // ... mais objecoes
};

export const TECNICAS = [
  {
    nome: 'LAER',
    descricao: 'Listen, Acknowledge, Explore, Respond'
  }
  // ... mais tecnicas
];
```

### scripts.js

```javascript
// src/data/tenants/novo-tenant/scripts.js

export const SCRIPTS = {
  abertura: {
    titulo: 'Script de Abertura',
    etapa: 'Primeiro contato',
    texto: 'Ola! Tudo bem? Me chamo...'
  },
  fechamento: {
    titulo: 'Script de Fechamento',
    etapa: 'Negociacao final',
    texto: 'Entao, para fecharmos...'
  }
  // ... mais scripts
};
```

### precos.js

```javascript
// src/data/tenants/novo-tenant/precos.js

export const PLANOS = [
  {
    id: 'basico',
    nome: 'Plano Basico',
    preco: 99.90,
    periodo: 'mensal',
    features: ['Feature 1', 'Feature 2']
  },
  {
    id: 'pro',
    nome: 'Plano Pro',
    preco: 199.90,
    periodo: 'mensal',
    features: ['Tudo do Basico', 'Feature 3']
  }
  // ... mais planos
];
```

## Passo 5: Registrar no Tenant Loader

O tenant-loader detecta tenants automaticamente pela estrutura de pastas. Nao precisa registrar manualmente.

Para verificar se o tenant foi detectado:

```javascript
import { listTenants, tenantExists } from '../tenant-loader.js';

console.log(listTenants()); // ['papervines', 'novo-tenant']
console.log(tenantExists('novo-tenant')); // true
```

## Passo 6: Gerar Chunks

Execute o script de geracao de chunks para o novo tenant:

```bash
node scripts/generate-chunks.js novo-tenant
```

Saida esperada:
```
Processando tenant: novo-tenant
...
Total de chunks: XX
Tokens estimados: XXXX
```

## Passo 7: Validar Chunks

```bash
node scripts/test-chunks.js novo-tenant
```

Saida esperada:
```
✅ VALIDACAO OK - XX chunks validos
```

## Passo 8: Upload para Vectorize

```bash
# Configure variaveis de ambiente
export CLOUDFLARE_ACCOUNT_ID="..."
export CLOUDFLARE_API_TOKEN="..."
export OPENAI_API_KEY="..."

# Upload
node scripts/upload-chunks.js novo-tenant
```

## Passo 9: Configurar Dominio (Opcional)

Se o tenant tiver dominio proprio, adicione ao wrangler.toml:

```toml
[[routes]]
pattern = "vendas.novaempresa.com.br"
custom_domain = true
```

E no Cloudflare Dashboard:
1. Workers & Pages > playbook-vendas-paper
2. Settings > Domains & Routes
3. Add Custom Domain

## Passo 10: Testar

### Via cURL

```bash
# Health check
curl https://vendas.novaempresa.com.br/health

# Busca RAG
curl -X POST https://vendas.novaempresa.com.br/api/rag/search \
  -H "Content-Type: application/json" \
  -H "X-Tenant-ID: novo-tenant" \
  -d '{"query": "diferenciais"}'
```

### Via Script de Teste

```bash
./scripts/test-api.sh https://vendas.novaempresa.com.br
```

## Checklist de Novo Tenant

- [ ] Pasta criada: `src/data/tenants/novo-tenant/`
- [ ] config.js com todas configuracoes
- [ ] index.js com re-exports
- [ ] Arquivos de conteudo criados
- [ ] Chunks gerados e validados
- [ ] Upload para Vectorize feito
- [ ] Dominio configurado (se aplicavel)
- [ ] Testes passando

## Troubleshooting

### Tenant nao encontrado

1. Verifique se config.js existe
2. Verifique se id no config.js bate com nome da pasta
3. Reinicie o worker apos alteracoes

### Busca retorna vazio

1. Verifique se chunks foram gerados
2. Verifique se upload foi feito
3. Verifique index status: `curl .../index/status`

### Erro de permissao

1. Verifique se OPENAI_API_KEY esta configurada
2. Verifique se Vectorize index existe
3. Verifique logs: `wrangler tail`

## Estrutura Minima

Se quiser criar um tenant rapidamente com conteudo minimo:

```
novo-tenant/
├── config.js    # Obrigatorio
├── index.js     # Obrigatorio
└── playbook.js  # Pelo menos 1 arquivo de conteudo
```

O sistema funciona mesmo com poucos arquivos de conteudo.

---

*Documentacao criada em: 2025-01-21*
