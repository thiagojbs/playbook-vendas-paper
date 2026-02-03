// Configuracao do tenant New Oeste
// Provedor de internet de alta velocidade em Foz do Iguacu e regiao
// Ultima atualizacao: 2026-02-03

export const TENANT_CONFIG = {
  // Identificacao
  id: 'newoeste',
  nome: 'New Oeste',
  dominio: 'playbook.newoeste.com.br',

  // Aparencia e Branding
  tema: {
    corPrimaria: '#FF6B35',      // Laranja New Oeste (da logo)
    corSecundaria: '#FFD700',    // Amarelo New Oeste (da logo)
    corAcento: '#FF8C42',        // Laranja claro destaque
    corTexto: '#2C2C2C',         // Texto escuro
    corFundo: '#FFFFFF',         // Fundo branco
    corFundoSecundario: '#FFF8E7', // Fundo levemente amarelado
    gradiente: 'linear-gradient(135deg, #FF6B35 0%, #FFD700 100%)', // Gradiente laranja-amarelo
    logo: '/assets/newoeste/logo.png',
    logoUrl: 'https://raw.githubusercontent.com/thiagojbs/playbook-vendas-paper/main/src/assets/newoeste/logo.png',
    favicon: '/assets/newoeste/favicon.ico'
  },

  // Informacoes da Empresa
  empresa: {
    razaoSocial: 'New Oeste Telecomunicacoes LTDA',
    cnpj: '00.000.000/0001-00', // Atualizar com CNPJ real
    telefone: '(45) 3000-0000', // Atualizar com telefone real
    whatsapp: '+55 45 99999-9999', // Atualizar com WhatsApp real
    email: 'contato@newoeste.com.br',
    site: 'https://newoeste.com.br',

    // Localizacao e Cobertura
    localizacao: {
      cidade: 'Foz do Iguacu',
      estado: 'PR',
      regiaoAtendimento: ['Foz do Iguacu', 'Santa Terezinha de Itaipu'],
      endereco: 'Atualizar com endereco completo'
    },

    // Redes Sociais
    social: {
      facebook: 'https://facebook.com/newoeste',
      instagram: 'https://instagram.com/newoeste',
      linkedin: 'https://linkedin.com/company/newoeste'
    },

    // Suporte
    suporte: {
      email: 'suporte@newoeste.com.br',
      whatsapp: '+55 45 99999-9999', // Atualizar
      telefone: '(45) 3000-0000', // Atualizar
      horario: 'Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h',
      portal: 'https://newoeste.com.br/suporte/'
    }
  },

  // Integracao CRM (atualizar conforme CRM usado)
  crm: {
    provider: 'personalizado', // Atualizar: 'rdstation', 'pipedrive', 'hubspot', etc
    baseUrl: 'https://api.exemplo.com',
    // API key via environment variable: NEWOESTE_CRM_KEY
    endpoints: {
      leads: '/api/leads',
      contratos: '/api/contratos',
      clientes: '/api/clientes'
    }
  },

  // Configuracoes RAG
  rag: {
    indexName: 'newoeste-playbook',
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
    cobertura: true,      // Modulo especifico para consulta de cobertura
    speedtest: true,      // Modulo para teste de velocidade
    indicacao: true       // Programa indique e ganhe
  },

  // Links uteis
  links: {
    planos: 'https://newoeste.com.br/planos/',
    planosEmpresariais: 'https://newoeste.com.br/planos-empresariais/',
    sobre: 'https://newoeste.com.br/sobre/',
    suporte: 'https://newoeste.com.br/suporte/',
    contratos: 'https://newoeste.com.br/contrato/',
    indicacao: 'https://newoeste.com.br/indicacao/',
    whatsapp: 'https://wa.me/5545999999999', // Atualizar
    consultaCobertura: 'https://newoeste.com.br/cobertura/', // Se existir
    portalCliente: 'https://cliente.newoeste.com.br/', // Se existir
    segundaVia: 'https://newoeste.com.br/segunda-via/', // Se existir
  },

  // Informacoes Tecnicas
  tecnologia: {
    tipoRede: 'Fibra Optica (FTTH - Fiber to the Home)',
    tecnologias: ['Fibra Optica', '5G', 'Wireless'],
    velocidadesDisponiveis: ['100 Mbps', '200 Mbps', '300 Mbps', '500 Mbps', '1 Gbps'],
    ipv6: true,
    ipFixo: true // Disponivel para planos empresariais
  },

  // Diferenciais Competitivos
  diferenciais: {
    principal: 'Internet de alta velocidade com fibra optica na regiao de Foz do Iguacu',
    pontos: [
      'Fibra optica direto ate sua casa (FTTH)',
      'Velocidade simetrica (mesma velocidade download e upload)',
      'Suporte tecnico local e personalizado',
      'Instalacao rapida e gratuita',
      'Sem fidelidade em planos selecionados',
      'Programa de indicacao com bonificacoes',
      'Cobertura 5G em expansao',
      'Empresa local que conhece a regiao'
    ]
  },

  // Programa de Indicacao
  indicacao: {
    ativo: true,
    descricao: 'Indique amigos e ganhe descontos na mensalidade',
    premio: 'Desconto na mensalidade ou bonificacao', // Atualizar com valor real
    regras: [
      'Cliente indicado deve efetivar a instalacao',
      'Indicador recebe bonus apos primeiro pagamento do indicado',
      'Sem limite de indicacoes'
    ],
    link: 'https://newoeste.com.br/indicacao/'
  },

  // Metadados para SEO
  seo: {
    titulo: 'Playbook de Vendas - New Oeste Telecom',
    descricao: 'Sistema completo de vendas de internet fibra optica e 5G para Foz do Iguacu e regiao',
    keywords: ['internet', 'fibra optica', 'telecom', 'foz do iguacu', '5g', 'internet empresarial', 'isp']
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
