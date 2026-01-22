// Configuracao do tenant Paper Vines
// Este arquivo define as configuracoes especificas deste tenant
// Ultima atualizacao: 2026-01-22

export const TENANT_CONFIG = {
  // Identificacao
  id: 'papervines',
  nome: 'Paper Vines',
  dominio: 'vendas.papervines.digital',

  // Aparencia e Branding
  tema: {
    corPrimaria: '#667eea',
    corSecundaria: '#764ba2',
    corAcento: '#10b981',
    logo: '/assets/papervines-logo.png',
    favicon: '/assets/favicon.ico'
  },

  // Informacoes da Empresa
  empresa: {
    razaoSocial: 'Paper Vines Tecnologia',
    site: 'https://papervines.digital/',
    documentacao: 'https://doc.papervines.digital/',
    suporte: {
      email: 'suporte@papervines.digital',
      whatsapp: '+55 11 99999-9999'
    }
  },

  // Integracao CRM
  crm: {
    provider: 'wtschat',
    baseUrl: 'https://api.v2.wtschat.com',
    // API key via environment variable: PAPERVINES_CRM_KEY
    endpoints: {
      contacts: '/crm/contacts',
      deals: '/crm/deals',
      funnels: '/crm/funnels'
    }
  },

  // Configuracoes RAG
  rag: {
    indexName: 'papervines-playbook',
    topK: 5,           // Numero de resultados por busca
    minScore: 0.7,     // Score minimo de similaridade
    maxChunkSize: 1500 // Tamanho maximo de chunk em caracteres
  },

  // Modulos habilitados
  modulos: {
    home: true,
    playbook: true,
    calculadora: true,
    clientes: true,
    propostas: true,
    contratos: true,
    desempenho: true,
    objecoes: true,
    scripts: true,
    agentes: true
  },

  // Links uteis
  links: {
    apresentacao: 'https://www.figma.com/deck/fU8KjN7JpjpzhxNRZzfqlp/Apresentacao-1--Clientes',
    apresentacaoTelecom: 'https://www.figma.com/deck/AGsSULAlU7Fj0GYCWsMDBv',
    propostasFigma: 'https://www.figma.com/files/team/1082649090502569616/project/412083277/Vendas',
    modelosContrato: 'https://drive.google.com/drive/folders/1hTxC7rcN2MvAtusrG-gj6CxkT6FvhTe1',
    clicksign: 'https://app.clicksign.com/',
    asaasClientes: 'https://www.asaas.com/customerAccount/list?caid=155676853',
    testeGratuito: 'https://chat.papervines.digital/trial/sign-up',
    videos: 'https://youtube.com/playlist?list=PLQnLWcfvhavZIp6EHujInobasehrz7DjH',
    tutorialBM: 'https://www.youtube.com/watch?v=C15vD7rvE28'
  },

  // Metadados para SEO
  seo: {
    titulo: 'Playbook de Vendas - Paper Vines',
    descricao: 'Plataforma completa de vendas com playbook, calculadora e gestao de clientes',
    keywords: ['vendas', 'playbook', 'crm', 'whatsapp', 'automacao']
  }
};

// Exporta funcao helper para obter configuracao
export function getConfig(key) {
  const keys = key.split('.');
  let value = TENANT_CONFIG;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }

  return value;
}

// Exporta tenant ID para uso rapido
export const TENANT_ID = TENANT_CONFIG.id;
