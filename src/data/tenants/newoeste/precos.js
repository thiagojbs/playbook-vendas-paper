// Precos e Planos - New Oeste Telecom
// Planos residenciais, empresariais e servicos adicionais
// IMPORTANTE: Atualizar com precos reais da New Oeste
// Ultima atualizacao: 2026-02-03

// ========================================
// PLANOS RESIDENCIAIS
// ========================================

export const PLANOS_RESIDENCIAIS = [
  {
    id: 'res-100',
    nome: 'Start 100',
    categoria: 'residencial',
    velocidade: 100,
    velocidadeDownload: 100,
    velocidadeUpload: 100,
    unidade: 'Mbps',
    preco: 79.90, // ATUALIZAR COM PRECO REAL
    precoPromocional: null, // Se houver promocao
    periodo: 'mensal',

    destaque: false,
    melhorCusto: false,
    maisVendido: false,

    descricaoBreve: 'Ideal para navegacao basica e streaming',
    descricaoCompleta: 'Plano perfeito para uso moderado de internet com ate 3 dispositivos simultaneos',

    idealPara: [
      '1-2 pessoas',
      'Navegacao web e redes sociais',
      'Video chamadas HD',
      'Streaming em HD',
      'Home office basico'
    ],

    incluso: [
      'Instalacao gratuita',
      'Roteador Wi-Fi 5 em comodato',
      'Suporte tecnico 24/7',
      'Velocidade simetrica',
      'IPv6 nativo',
      'Sem limite de dados'
    ],

    tecnologia: 'Fibra Optica FTTH',
    fidelidade: 12, // meses - ATUALIZAR CONFORME REAL
    instalacaoGratis: true,
    disponivel: true,

    upsell: {
      planoSuperior: 'res-200',
      diferenca: 30.00,
      argumentos: [
        'Por apenas R$ 30 a mais, dobra sua velocidade',
        'Melhor para familias com mais dispositivos',
        'Streaming 4K sem travamentos'
      ]
    }
  },

  {
    id: 'res-200',
    nome: 'Fast 200',
    categoria: 'residencial',
    velocidade: 200,
    velocidadeDownload: 200,
    velocidadeUpload: 200,
    unidade: 'Mbps',
    preco: 109.90, // ATUALIZAR COM PRECO REAL
    precoPromocional: null,
    periodo: 'mensal',

    destaque: false,
    melhorCusto: true,
    maisVendido: true,

    descricaoBreve: 'Melhor custo-beneficio para familias',
    descricaoCompleta: 'Plano mais vendido! Perfeito para familias que precisam de velocidade e estabilidade',

    idealPara: [
      '3-4 pessoas',
      'Multiplos dispositivos simultaneos',
      'Streaming 4K',
      'Home office profissional',
      'Jogos online',
      'Downloads frequentes'
    ],

    incluso: [
      'Instalacao gratuita',
      'Roteador Wi-Fi 6 em comodato',
      'Suporte tecnico prioritario',
      'Velocidade simetrica',
      'IPv6 nativo',
      'Sem limite de dados',
      '3 meses de HBO Max (PROMOCAO)' // ATUALIZAR SE HOUVER
    ],

    tecnologia: 'Fibra Optica FTTH',
    fidelidade: 12,
    instalacaoGratis: true,
    disponivel: true,

    badge: 'MAIS VENDIDO',

    upsell: {
      planoSuperior: 'res-300',
      diferenca: 40.00,
      argumentos: [
        'Velocidade premium por pouco mais',
        'Garante experiencia perfeita mesmo com uso intenso',
        'Futuro-prova: ja preparado para as tecnologias de amanha'
      ]
    }
  },

  {
    id: 'res-300',
    nome: 'Ultra 300',
    categoria: 'residencial',
    velocidade: 300,
    velocidadeDownload: 300,
    velocidadeUpload: 300,
    unidade: 'Mbps',
    preco: 149.90, // ATUALIZAR COM PRECO REAL
    precoPromocional: null,
    periodo: 'mensal',

    destaque: true,
    melhorCusto: false,
    maisVendido: false,

    descricaoBreve: 'Performance premium para uso intenso',
    descricaoCompleta: 'Maxima velocidade para quem nao abre mao de performance',

    idealPara: [
      '5+ pessoas',
      'Uso intenso simultaneo',
      'Streaming 4K em multiplos dispositivos',
      'Trabalho profissional com nuvem',
      'Gamers profissionais',
      'Upload de videos e backups pesados',
      'Smart home com varios dispositivos IoT'
    ],

    incluso: [
      'Instalacao gratuita',
      'Roteador Wi-Fi 6 de alta performance',
      'Suporte tecnico VIP',
      'Velocidade simetrica',
      'IPv6 nativo',
      'Sem limite de dados',
      'Extensor Wi-Fi gratuito',
      '6 meses de HBO Max (PROMOCAO)' // ATUALIZAR SE HOUVER
    ],

    tecnologia: 'Fibra Optica FTTH',
    fidelidade: 12,
    instalacaoGratis: true,
    disponivel: true,

    badge: 'RECOMENDADO',

    upsell: {
      planoSuperior: 'res-500',
      diferenca: 100.00,
      argumentos: [
        'Upgrade para nivel empresarial',
        'IP fixo incluido',
        'Perfeito se trabalha com servidores ou sistemas criticos'
      ]
    }
  },

  {
    id: 'res-500',
    nome: 'Giga 500',
    categoria: 'residencial',
    velocidade: 500,
    velocidadeDownload: 500,
    velocidadeUpload: 500,
    unidade: 'Mbps',
    preco: 249.90, // ATUALIZAR COM PRECO REAL
    precoPromocional: null,
    periodo: 'mensal',

    destaque: false,
    melhorCusto: false,
    maisVendido: false,

    descricaoBreve: 'Maxima performance residencial',
    descricaoCompleta: 'O mais rapido! Para quem precisa de velocidade extrema',

    idealPara: [
      'Familias grandes (6+ pessoas)',
      'Uso profissional avancado',
      'Streamers e criadores de conteudo',
      'Empresas pequenas em casa',
      'Multiplas cameras de seguranca 4K',
      'Servidores domesticos'
    ],

    incluso: [
      'Instalacao gratuita',
      'Roteador Wi-Fi 6 empresarial',
      'Suporte tecnico VIP prioritario',
      'Velocidade simetrica',
      'IP fixo incluido',
      'IPv6 nativo',
      'Sem limite de dados',
      'Kit Wi-Fi mesh (2 pontos)',
      'Monitoramento proativo'
    ],

    tecnologia: 'Fibra Optica FTTH',
    fidelidade: 12,
    instalacaoGratis: true,
    disponivel: true,

    badge: 'PREMIUM',

    upsell: null // Plano topo residencial
  },

  {
    id: 'res-1000',
    nome: 'Giga 1000',
    categoria: 'residencial',
    velocidade: 1000,
    velocidadeDownload: 1000,
    velocidadeUpload: 1000,
    unidade: 'Mbps',
    preco: 399.90, // ATUALIZAR COM PRECO REAL
    precoPromocional: null,
    periodo: 'mensal',

    destaque: true,
    melhorCusto: false,
    maisVendido: false,

    descricaoBreve: '1 GIGA de pura velocidade!',
    descricaoCompleta: 'Internet Gigabit para quem exige o maximo em performance',

    idealPara: [
      'Uso profissional intenso',
      'Pequenas empresas',
      'Criadores de conteudo profissionais',
      'Transmissoes ao vivo em 4K',
      'Multiplos usuarios intensos',
      'Ambientes de alta demanda'
    ],

    incluso: [
      'Instalacao gratuita prioritaria',
      'Roteador Wi-Fi 6E empresarial',
      'Suporte tecnico dedicado',
      'Velocidade simetrica',
      'IP fixo incluido',
      'IPv6 nativo',
      'Sem limite de dados',
      'Kit Wi-Fi mesh (3 pontos)',
      'Monitoramento 24/7',
      'SLA 99.9% uptime',
      'Tecnico prioritario'
    ],

    tecnologia: 'Fibra Optica FTTH',
    fidelidade: 24, // CONFIRMAR
    instalacaoGratis: true,
    disponivel: true,

    badge: 'TOP PERFORMANCE',

    upsell: null
  }
];

// ========================================
// PLANOS EMPRESARIAIS
// ========================================

export const PLANOS_EMPRESARIAIS = [
  {
    id: 'emp-200',
    nome: 'Business 200',
    categoria: 'empresarial',
    velocidade: 200,
    velocidadeDownload: 200,
    velocidadeUpload: 200,
    unidade: 'Mbps',
    preco: 299.90, // ATUALIZAR COM PRECO REAL
    precoPromocional: null,
    periodo: 'mensal',

    descricaoBreve: 'Solucao empresarial para pequenos negocios',
    descricaoCompleta: 'Internet profissional com SLA e suporte dedicado para sua empresa',

    idealPara: [
      'Pequenas empresas (ate 10 funcionarios)',
      'Lojas e comercios',
      'Escritorios',
      'Consultorios',
      'Startups'
    ],

    incluso: [
      'Instalacao profissional',
      'IP fixo',
      'Roteador empresarial',
      'Suporte tecnico prioritario',
      'SLA 99.5% uptime',
      'Relatorio de disponibilidade',
      'Configuracao remota incluida',
      'Velocidade simetrica garantida',
      'Nota fiscal eletronica'
    ],

    sla: {
      uptime: 99.5,
      tempoResposta: '4 horas',
      tempoResolucao: '24 horas',
      janelManutencao: 'Agendada com 48h de antecedencia'
    },

    tecnologia: 'Fibra Optica FTTH Dedicada',
    fidelidade: 12,
    instalacaoGratis: false,
    custoInstalacao: 500.00, // ATUALIZAR
    disponivel: true,

    servicosOpcionais: [
      'IP fixo adicional',
      'Link backup',
      'Roteador redundante',
      'Gerenciamento de rede'
    ]
  },

  {
    id: 'emp-500',
    nome: 'Business 500',
    categoria: 'empresarial',
    velocidade: 500,
    velocidadeDownload: 500,
    velocidadeUpload: 500,
    unidade: 'Mbps',
    preco: 599.90, // ATUALIZAR COM PRECO REAL
    precoPromocional: null,
    periodo: 'mensal',

    descricaoBreve: 'Alta performance para empresas em crescimento',
    descricaoCompleta: 'Conexao robusta com SLA premium e suporte dedicado',

    idealPara: [
      'Empresas medias (10-30 funcionarios)',
      'Coworkings',
      'Agencias',
      'E-commerces',
      'Empresas com sistemas criticos'
    ],

    incluso: [
      'Instalacao profissional',
      'IP fixo (ate 2)',
      'Roteador empresarial de alta performance',
      'Suporte tecnico dedicado',
      'SLA 99.8% uptime',
      'Monitoramento proativo 24/7',
      'Relatorio mensal de performance',
      'Configuracao de VPN',
      'Velocidade simetrica garantida',
      'Nota fiscal eletronica',
      'Gerente de contas dedicado'
    ],

    sla: {
      uptime: 99.8,
      tempoResposta: '2 horas',
      tempoResolucao: '12 horas',
      janelManutencao: 'Agendada com 72h de antecedencia',
      compensacao: 'Credito proporcional em caso de descumprimento'
    },

    tecnologia: 'Fibra Optica FTTH Dedicada',
    fidelidade: 12,
    instalacaoGratis: false,
    custoInstalacao: 800.00, // ATUALIZAR
    disponivel: true,

    badge: 'MAIS VENDIDO',

    servicosOpcionais: [
      'IPs fixos adicionais',
      'Link backup 4G',
      'SD-WAN',
      'Firewall gerenciado',
      'Consultoria de rede'
    ]
  },

  {
    id: 'emp-1000',
    nome: 'Business 1000',
    categoria: 'empresarial',
    velocidade: 1000,
    velocidadeDownload: 1000,
    velocidadeUpload: 1000,
    unidade: 'Mbps',
    preco: 999.90, // ATUALIZAR COM PRECO REAL
    precoPromocional: null,
    periodo: 'mensal',

    descricaoBreve: 'Maxima performance empresarial',
    descricaoCompleta: 'Solucao enterprise com SLA premium e infraestrutura dedicada',

    idealPara: [
      'Grandes empresas',
      'Data centers',
      'Provedores',
      'Hospitais e clinicas',
      'Instituicoes de ensino',
      'Empresas com alta demanda critica'
    ],

    incluso: [
      'Instalacao enterprise',
      'IPs fixos (ate 4)',
      'Equipamentos enterprise',
      'Suporte tecnico 24/7 dedicado',
      'SLA 99.9% uptime',
      'Monitoramento NOC 24/7',
      'Relatorios customizados',
      'Redundancia de equipamentos',
      'Velocidade simetrica garantida',
      'Nota fiscal eletronica',
      'Gerente de contas senior',
      'Consultor tecnico dedicado'
    ],

    sla: {
      uptime: 99.9,
      tempoResposta: '1 hora',
      tempoResolucao: '6 horas',
      janelManutencao: 'Agendada com 1 semana de antecedencia',
      compensacao: 'Credito proporcional + bonus em caso de descumprimento',
      penalidades: 'Definidas em contrato'
    },

    tecnologia: 'Fibra Optica Dedicada Metro Ethernet',
    fidelidade: 24,
    instalacaoGratis: false,
    custoInstalacao: 1500.00, // ATUALIZAR
    disponivel: true,

    badge: 'ENTERPRISE',

    servicosOpcionais: [
      'IPs adicionais (/29, /28)',
      'Link backup dedicado',
      'SD-WAN gerenciado',
      'Firewall enterprise',
      'IDS/IPS',
      'Gerenciamento completo de rede',
      'Cloud connect'
    ]
  },

  {
    id: 'emp-custom',
    nome: 'Solucao Customizada',
    categoria: 'empresarial',
    velocidade: null, // Customizado
    descricaoBreve: 'Projeto sob medida para sua empresa',
    descricaoCompleta: 'Solucoes personalizadas para necessidades especificas',

    idealPara: [
      'Grandes corporacoes',
      'Multiplos sites',
      'Projetos especiais',
      'Necessidades customizadas'
    ],

    incluso: [
      'Analise de requisitos',
      'Projeto de rede customizado',
      'SLA negociado',
      'Suporte dedicado',
      'Infraestrutura sob medida'
    ],

    observacao: 'Entre em contato para orcamento personalizado',
    disponivel: true
  }
];

// ========================================
// SERVICOS ADICIONAIS
// ========================================

export const SERVICOS_ADICIONAIS = [
  {
    id: 'ip-fixo-adicional',
    nome: 'IP Fixo Adicional',
    categoria: 'adicional',
    preco: 30.00, // ATUALIZAR
    periodo: 'mensal',
    descricao: 'IP fixo adicional para servidores, cameras, etc',
    disponivelPara: ['empresarial', 'residencial']
  },
  {
    id: 'link-backup-4g',
    nome: 'Link Backup 4G',
    categoria: 'adicional',
    preco: 150.00, // ATUALIZAR
    periodo: 'mensal',
    descricao: 'Conexao 4G automatica em caso de queda do link principal',
    disponivelPara: ['empresarial'],
    incluso: ['Roteador 4G', 'Chip com 50GB/mes', 'Failover automatico']
  },
  {
    id: 'wi-fi-mesh',
    nome: 'Kit Wi-Fi Mesh',
    categoria: 'adicional',
    preco: 200.00, // Unica vez - ATUALIZAR
    periodo: 'unico',
    descricao: '2 pontos adicionais para cobertura total',
    disponivelPara: ['residencial', 'empresarial']
  },
  {
    id: 'instalacao-express',
    nome: 'Instalacao Express 24h',
    categoria: 'adicional',
    preco: 150.00, // ATUALIZAR
    periodo: 'unico',
    descricao: 'Instalacao em ate 24h (sujeito a disponibilidade)',
    disponivelPara: ['residencial', 'empresarial']
  },
  {
    id: 'visita-tecnica',
    nome: 'Visita Tecnica Extra',
    categoria: 'adicional',
    preco: 80.00, // ATUALIZAR
    periodo: 'unico',
    descricao: 'Visita tecnica para configuracao ou suporte presencial',
    disponivelPara: ['residencial', 'empresarial'],
    observacao: 'Gratuito para problemas de responsabilidade da operadora'
  }
];

// ========================================
// PROMOCOES ATIVAS
// ========================================

export const PROMOCOES = [
  {
    id: 'promo-verao-2026',
    nome: 'Promocao Verao 2026',
    descricao: '3 meses com 50% de desconto',
    validade: {
      inicio: '2026-01-01',
      fim: '2026-03-31'
    },
    aplicavelEm: ['res-200', 'res-300'],
    desconto: {
      tipo: 'percentual',
      valor: 50,
      duracao: 3 // meses
    },
    condicoes: [
      'Valido apenas para novos clientes',
      'Apos periodo promocional, valor integral'
    ],
    ativa: false // ATUALIZAR QUANDO HOUVER PROMOCAO
  },
  {
    id: 'isencao-instalacao',
    nome: 'Instalacao Gratis',
    descricao: 'Sem custo de instalacao',
    validade: {
      inicio: '2026-01-01',
      fim: '2026-12-31'
    },
    aplicavelEm: ['res-100', 'res-200', 'res-300', 'res-500', 'res-1000'],
    desconto: {
      tipo: 'isencao',
      item: 'instalacao'
    },
    condicoes: [
      'Com fidelidade de 12 meses'
    ],
    ativa: true
  }
];

// ========================================
// CALCULADORA DE PROPOSTA
// ========================================

export const CALCULADORA = {
  // Funcao para calcular proposta personalizada
  calcularProposta: (planoId, mesesPromocao = 0, servicosAdicionais = []) => {
    // Implementar logica de calculo
    // Retornar objeto com valores detalhados
  },

  // Comparacao entre planos
  compararPlanos: (planoId1, planoId2) => {
    // Implementar comparacao lado a lado
  }
};

// ========================================
// ARGUMENTOS DE VALOR POR PLANO
// ========================================

export const ARGUMENTOS_VENDA = {
  'res-100': {
    principal: 'Entrada perfeita no mundo da fibra optica com excelente custo-beneficio',
    secundarios: [
      'Melhor que qualquer conexao via cabo ou radio',
      'Suficiente para uso diario e home office basico',
      'Upgrade facil quando precisar'
    ],
    objecaoPreco: 'Por menos de R$ 3 por dia, voce tem internet que funciona de verdade'
  },
  'res-200': {
    principal: 'O melhor custo-beneficio! Plano mais vendido porque atende a maioria das familias',
    secundarios: [
      'Velocidade que realmente faz diferenca no dia a dia',
      'Confortavel ate para 4 pessoas simultaneas',
      'Streaming 4K sem preocupacao'
    ],
    objecaoPreco: 'Investimento de R$ 110 garante zero dor de cabeca e toda familia satisfeita'
  },
  'res-300': {
    principal: 'Performance premium para quem nao aceita travamentos',
    secundarios: [
      'Uso intenso simultaneo sem impacto',
      'Perfeito para gamers e criadores de conteudo',
      'Investimento em tranquilidade'
    ],
    objecaoPreco: 'Diferenca de R$ 40 para plano inferior, mas experiencia muito superior'
  }
};

// ========================================
// COMPARATIVOS COM CONCORRENCIA
// ========================================

export const COMPARATIVOS = {
  vsCabo: {
    titulo: 'Fibra Optica vs Cabo Coaxial',
    pontos: [
      { aspecto: 'Velocidade real', fibra: 'Garantida', cabo: 'Varia' },
      { aspecto: 'Estabilidade', fibra: 'Alta', cabo: 'Media' },
      { aspecto: 'Interferencia climatica', fibra: 'Nenhuma', cabo: 'Alta' },
      { aspecto: 'Upload', fibra: 'Simetrico', cabo: 'Lento' },
      { aspecto: 'Latencia', fibra: 'Baixissima', cabo: 'Alta' }
    ]
  },
  vsRadio: {
    titulo: 'Fibra Optica vs Radio/Wireless',
    pontos: [
      { aspecto: 'Velocidade', fibra: 'Ate 1 Gbps', radio: 'Limitada' },
      { aspecto: 'Clima', fibra: 'Nao afeta', radio: 'Afeta muito' },
      { aspecto: 'Estabilidade', fibra: 'Excelente', radio: 'Ruim' },
      { aspecto: 'Latencia', fibra: 'Minima', radio: 'Alta' }
    ]
  }
};
