// Configuracao do tenant Cabelo e Saude - Clinica de Tricologia
// Este arquivo define as configuracoes especificas deste tenant
// Ultima atualizacao: 2026-01-23

export const TENANT_CONFIG = {
  // Identificacao
  id: 'cabeloesaude',
  nome: 'Cabelo & Saude',
  nomeCompleto: 'Clinica de Tricologia Cabelo & Saude',
  dominio: 'vendas.cabeloesaude.com.br',

  // Aparencia e Branding (baseado na logo verde/teal)
  tema: {
    corPrimaria: '#1a5f52',      // Verde escuro principal (do logo)
    corSecundaria: '#2d8a7a',    // Verde medio/teal
    corAcento: '#4fb3a3',        // Verde claro para destaques
    corTexto: '#1a3a35',         // Verde muito escuro para texto
    corFundo: '#f0f7f6',         // Verde muito claro para fundo
    gradiente: 'linear-gradient(135deg, #1a5f52 0%, #2d8a7a 100%)',
    logo: '/assets/cabeloesaude-logo.png',
    favicon: '/assets/cabeloesaude-favicon.ico'
  },

  // Informacoes da Empresa
  empresa: {
    razaoSocial: 'Clinica de Tricologia Cabelo e Saude',
    cnpj: '', // A ser preenchido
    fundadora: 'Franciele',
    cargo: 'Biomedica e Tricologista',
    site: 'https://www.cabeloesaude.com.br/',
    instagram: '@cabeloesaude',
    suporte: {
      email: 'contato@cabeloesaude.com.br',
      whatsapp: '' // A ser preenchido
    }
  },

  // Segmento e Especializacao
  segmento: {
    area: 'Saude Capilar',
    especialidade: 'Tricologia',
    servicos: [
      'Avaliacao Tricologica',
      'Tratamento de Queda Capilar',
      'Tratamento de Alopecia',
      'Tratamento de Calvicie',
      'Terapia Capilar',
      'Microagulhamento Capilar',
      'Laserterapia Capilar',
      'Intradermoterapia',
      'Acompanhamento Nutricional Capilar'
    ],
    publicoAlvo: [
      'Homens com calvicie inicial/intermediaria',
      'Mulheres com queda capilar',
      'Pessoas com alopecia',
      'Pacientes pos-tratamentos medicos',
      'Pessoas insatisfeitas com tratamentos convencionais'
    ],
    diferenciais: [
      'Abordagem investigativa - trata a causa, nao o sintoma',
      'Biomedica especialista em tricologia',
      '7 anos de experiencia',
      'Sem paliativos - sem Minoxidil/Finasterida como unica solucao',
      'Tecnologia avancada para diagnostico',
      'Protocolos personalizados'
    ]
  },

  // Integracao CRM
  crm: {
    provider: 'wtschat',
    baseUrl: 'https://api.v2.wtschat.com',
    // API key via environment variable: CABELOESAUDE_CRM_KEY
    endpoints: {
      contacts: '/crm/contacts',
      deals: '/crm/deals',
      funnels: '/crm/funnels'
    }
  },

  // Configuracoes RAG
  rag: {
    indexName: 'cabeloesaude-playbook',
    topK: 5,
    minScore: 0.7,
    maxChunkSize: 1500
  },

  // Modulos habilitados
  modulos: {
    home: true,
    playbook: true,
    calculadora: true,
    clientes: true,
    propostas: true,
    contratos: true,
    desempenho: false, // Desabilitado conforme solicitado
    objecoes: true,
    scripts: true,
    agentes: false // Nao aplicavel para clinica
  },

  // Links uteis
  links: {
    site: 'https://www.cabeloesaude.com.br/',
    instagram: 'https://www.instagram.com/cabeloesaude/',
    agendamento: '', // Link para agendamento online
    avaliacaoOnline: '' // Link para avaliacao online se houver
  },

  // Metadados para SEO
  seo: {
    titulo: 'Playbook de Vendas - Cabelo & Saude',
    descricao: 'Plataforma de vendas para Clinica de Tricologia com playbook, calculadora e gestao de pacientes',
    keywords: ['tricologia', 'queda capilar', 'alopecia', 'calvicie', 'tratamento capilar', 'saude do cabelo']
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
