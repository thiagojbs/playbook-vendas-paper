// Dados dos Agentes Inteligentes Paper Vines
// Baseado na documentacao: https://doc.papervines.digital/documentacao/apps/ia-agentes-inteligentes.html

export const AGENTES_INFO = {
  titulo: 'Agentes Inteligentes',
  subtitulo: 'Automatize seu atendimento com IA de ultima geracao',
  descricao: 'A plataforma Paper Vines permite criar agentes de IA especializados que trabalham em conjunto para resolver demandas dos clientes de forma autonoma, reduzindo custos e aumentando a eficiencia.',
  doc_link: 'https://doc.papervines.digital/documentacao/apps/ia-agentes-inteligentes.html'
};

export const TIPOS_AGENTES = {
  supervisor: {
    nome: 'Agente Supervisor',
    descricao: 'Coordena e distribui atendimentos entre agentes especializados',
    icone: 'crown',
    cor: '#8b5cf6',
    caracteristicas: [
      'Analisa a demanda inicial do cliente',
      'Identifica o melhor agente para cada caso',
      'Redistribui conversas automaticamente',
      'Monitora qualidade dos atendimentos',
      'Escala para humanos quando necessario'
    ]
  },
  executor: {
    nome: 'Agente Executor',
    descricao: 'Executa tarefas especificas com alta precisao',
    icone: 'robot',
    cor: '#10b981',
    caracteristicas: [
      'Especializado em uma funcao especifica',
      'Acesso a ferramentas e APIs',
      'Consulta bases de conhecimento',
      'Executa acoes automatizadas',
      'Reporta resultados ao supervisor'
    ]
  }
};

export const AGENTES_EXEMPLOS = [
  {
    id: 'supervisor',
    nome: 'Supervisor de Atendimento',
    tipo: 'supervisor',
    icone: 'crown',
    cor: '#8b5cf6',
    descricao: 'Agente central que analisa a demanda do cliente e direciona para o especialista correto.',
    funcao: 'Triagem e distribuicao inteligente de atendimentos',
    ferramentas: ['Analise de intencao', 'Roteamento inteligente', 'Historico do cliente'],
    prompt_exemplo: 'Voce e o supervisor de atendimento. Analise a mensagem do cliente, identifique sua necessidade principal e direcione para o agente especializado mais adequado. Priorize: urgencias, clientes VIP, e casos complexos.',
    casos_uso: [
      'Centrais de atendimento multicanal',
      'Empresas com multiplos departamentos',
      'Suporte tecnico em camadas'
    ],
    metricas: {
      reducao_tempo: '70%',
      precisao_roteamento: '95%',
      satisfacao: '+40%'
    }
  },
  {
    id: 'agendamento',
    nome: 'Agente de Agendamento',
    tipo: 'executor',
    icone: 'calendar-check',
    cor: '#3b82f6',
    descricao: 'Especialista em agendar, remarcar e cancelar compromissos no calendario.',
    funcao: 'Gestao completa de agenda e compromissos',
    ferramentas: ['Google Calendar API', 'Verificacao de disponibilidade', 'Envio de lembretes'],
    prompt_exemplo: 'Voce e o agente de agendamento. Sua funcao e ajudar clientes a marcar, remarcar ou cancelar consultas. Sempre verifique disponibilidade, confirme data/hora e envie confirmacao.',
    casos_uso: [
      'Clinicas medicas e odontologicas',
      'Saloes de beleza e estetica',
      'Consultorias e escritorios',
      'Academias e personal trainers'
    ],
    metricas: {
      reducao_tempo: '85%',
      agendamentos_hora: '50+',
      no_show_reduction: '-60%'
    }
  },
  {
    id: 'sdr',
    nome: 'Agente SDR (Pre-Vendas)',
    tipo: 'executor',
    icone: 'user-tie',
    cor: '#f59e0b',
    descricao: 'Qualifica leads, entende necessidades e prepara oportunidades para o time comercial.',
    funcao: 'Qualificacao de leads e discovery de necessidades',
    ferramentas: ['CRM Integration', 'Lead Scoring', 'Formularios dinamicos'],
    prompt_exemplo: 'Voce e um SDR virtual. Faca perguntas de qualificacao BANT (Budget, Authority, Need, Timeline). Identifique dores, necessidades e momento de compra. Agende reuniao com closer apenas para leads qualificados.',
    casos_uso: [
      'SaaS e empresas de tecnologia',
      'Consultorias B2B',
      'Imobiliarias e construtoras',
      'Servicos financeiros'
    ],
    metricas: {
      leads_qualificados: '+200%',
      tempo_qualificacao: '-75%',
      conversao_reuniao: '+45%'
    }
  },
  {
    id: 'tecnico',
    nome: 'Agente Tecnico',
    tipo: 'executor',
    icone: 'tools',
    cor: '#ef4444',
    descricao: 'Resolve problemas tecnicos consultando documentacao e bases de conhecimento.',
    funcao: 'Suporte tecnico de nivel 1 e 2 automatizado',
    ferramentas: ['Base de conhecimento', 'Diagnostico automatico', 'Execucao de scripts'],
    prompt_exemplo: 'Voce e o suporte tecnico especializado. Use a documentacao fornecida para resolver problemas. Faca perguntas de diagnostico, sugira solucoes passo-a-passo e escale para humano apenas casos complexos.',
    casos_uso: [
      'Empresas de software',
      'Provedores de internet',
      'E-commerces',
      'Fintechs e bancos digitais'
    ],
    metricas: {
      resolucao_primeiro_contato: '78%',
      tempo_medio_resolucao: '-65%',
      tickets_escalados: '-80%'
    }
  },
  {
    id: 'cobranca',
    nome: 'Agente de Cobranca',
    tipo: 'executor',
    icone: 'file-invoice-dollar',
    cor: '#10b981',
    descricao: 'Executa regua de cobranca automatizada com abordagem humanizada.',
    funcao: 'Cobranca inteligente e negociacao de dividas',
    ferramentas: ['ERP/Financeiro', 'Geracao de boletos', 'Acordos automaticos'],
    prompt_exemplo: 'Voce e o agente de cobranca. Siga a regua: D+3 lembrete amigavel, D+7 segunda via, D+15 negociacao, D+30 proposta de acordo. Seja empático, ofereca opcoes de parcelamento e sempre busque a melhor solucao.',
    casos_uso: [
      'Escolas e universidades',
      'Clinicas e hospitais',
      'Condominios',
      'Assinaturas e recorrencia'
    ],
    metricas: {
      taxa_recuperacao: '+45%',
      custo_cobranca: '-70%',
      tempo_medio_acordo: '-50%'
    }
  },
  {
    id: 'resgate',
    nome: 'Agente de Resgate',
    tipo: 'executor',
    icone: 'hand-holding-heart',
    cor: '#ec4899',
    descricao: 'Reativa clientes inativos e recupera oportunidades perdidas.',
    funcao: 'Reativacao de clientes e recuperacao de vendas',
    ferramentas: ['Historico de interacoes', 'Ofertas personalizadas', 'Analise de churn'],
    prompt_exemplo: 'Voce e o agente de resgate. Aborde clientes que demonstraram interesse mas nao finalizaram. Descubra o motivo, ofereca solucoes personalizadas, descontos exclusivos ou condicoes especiais para retomar a negociacao.',
    casos_uso: [
      'E-commerces (carrinho abandonado)',
      'Imobiliarias (visitas sem proposta)',
      'SaaS (trials expirados)',
      'Varejo (clientes inativos)'
    ],
    metricas: {
      taxa_reativacao: '35%',
      recuperacao_carrinho: '+60%',
      roi_campanha: '400%'
    }
  },
  {
    id: 'pesquisa',
    nome: 'Agente de Pesquisa',
    tipo: 'executor',
    icone: 'clipboard-list',
    cor: '#6366f1',
    descricao: 'Coleta feedback, realiza pesquisas de satisfacao e NPS.',
    funcao: 'Pesquisas automatizadas e coleta de feedback',
    ferramentas: ['Formularios dinamicos', 'Analise de sentimento', 'Dashboard de resultados'],
    prompt_exemplo: 'Voce realiza pesquisas de satisfacao. Faca perguntas de forma conversacional, colete NPS, identifique promotores e detratores. Para notas baixas, pergunte como melhorar. Agradeca sempre.',
    casos_uso: [
      'Pos-venda e pos-atendimento',
      'Pesquisa de mercado',
      'Avaliacao de produtos',
      'Feedback de eventos'
    ],
    metricas: {
      taxa_resposta: '+300%',
      custo_pesquisa: '-90%',
      insights_tempo_real: '100%'
    }
  },
  {
    id: 'onboarding',
    nome: 'Agente de Onboarding',
    tipo: 'executor',
    icone: 'graduation-cap',
    cor: '#14b8a6',
    descricao: 'Guia novos clientes no processo de ativacao e primeiros passos.',
    funcao: 'Onboarding automatizado e educacao do cliente',
    ferramentas: ['Tutoriais interativos', 'Checklist de ativacao', 'Videos e docs'],
    prompt_exemplo: 'Voce e o guia de onboarding. Ajude novos clientes a configurar a conta, conhecer funcionalidades principais e completar os primeiros passos. Seja didatico, use exemplos e celebre cada conquista.',
    casos_uso: [
      'SaaS e apps',
      'Bancos digitais',
      'Plataformas de ensino',
      'Marketplaces'
    ],
    metricas: {
      ativacao_completa: '+85%',
      tempo_onboarding: '-70%',
      churn_inicial: '-50%'
    }
  },
  {
    id: 'vendas',
    nome: 'Agente de Vendas',
    tipo: 'executor',
    icone: 'shopping-cart',
    cor: '#f97316',
    descricao: 'Apresenta produtos, tira duvidas e conduz o cliente ate a compra.',
    funcao: 'Vendas consultivas e fechamento automatizado',
    ferramentas: ['Catalogo de produtos', 'Calculadora de precos', 'Checkout integrado'],
    prompt_exemplo: 'Voce e um vendedor consultivo. Entenda a necessidade do cliente, apresente solucoes adequadas, tire duvidas sobre produtos, e conduza ate o fechamento. Use tecnicas de vendas e ofereca upsell quando apropriado.',
    casos_uso: [
      'E-commerces',
      'Lojas de varejo',
      'Concessionarias',
      'Turismo e viagens'
    ],
    metricas: {
      conversao: '+55%',
      ticket_medio: '+30%',
      atendimentos_dia: '500+'
    }
  },
  {
    id: 'faq',
    nome: 'Agente FAQ',
    tipo: 'executor',
    icone: 'question-circle',
    cor: '#0ea5e9',
    descricao: 'Responde perguntas frequentes de forma rapida e precisa.',
    funcao: 'Atendimento de duvidas comuns 24/7',
    ferramentas: ['Base de conhecimento', 'Busca semantica', 'Sugestoes relacionadas'],
    prompt_exemplo: 'Voce responde duvidas frequentes sobre nossos produtos e servicos. Use a base de conhecimento para fornecer respostas precisas. Se nao souber, admita e direcione para atendimento humano.',
    casos_uso: [
      'Qualquer empresa com volume de atendimento',
      'E-commerces',
      'Servicos publicos',
      'Instituicoes de ensino'
    ],
    metricas: {
      resolucao_instantanea: '85%',
      reducao_volume: '-60%',
      disponibilidade: '24/7'
    }
  }
];

export const VERTICAIS = [
  {
    segmento: 'Saude',
    icone: 'heartbeat',
    cor: '#ef4444',
    agentes_recomendados: ['supervisor', 'agendamento', 'faq', 'cobranca'],
    casos: [
      'Agendamento de consultas e exames',
      'Confirmacao e lembretes automaticos',
      'Cobranca de mensalidades',
      'Duvidas sobre convenios'
    ],
    economia: {
      funcionarios: '3-5',
      horas_mes: '400+',
      reducao_custo: '60-70%'
    }
  },
  {
    segmento: 'Imobiliario',
    icone: 'building',
    cor: '#f59e0b',
    agentes_recomendados: ['supervisor', 'sdr', 'agendamento', 'resgate'],
    casos: [
      'Qualificacao de leads interessados',
      'Agendamento de visitas',
      'Follow-up de propostas',
      'Resgate de leads frios'
    ],
    economia: {
      funcionarios: '2-4',
      horas_mes: '300+',
      reducao_custo: '50-60%'
    }
  },
  {
    segmento: 'E-commerce',
    icone: 'shopping-bag',
    cor: '#10b981',
    agentes_recomendados: ['faq', 'vendas', 'resgate', 'pesquisa'],
    casos: [
      'Duvidas sobre produtos e entregas',
      'Recuperacao de carrinho abandonado',
      'Pos-venda e tracking',
      'Pesquisa de satisfacao'
    ],
    economia: {
      funcionarios: '4-8',
      horas_mes: '600+',
      reducao_custo: '65-75%'
    }
  },
  {
    segmento: 'Educacao',
    icone: 'graduation-cap',
    cor: '#3b82f6',
    agentes_recomendados: ['sdr', 'onboarding', 'cobranca', 'faq'],
    casos: [
      'Captacao de novos alunos',
      'Onboarding de matriculados',
      'Cobranca de mensalidades',
      'Suporte academico'
    ],
    economia: {
      funcionarios: '3-6',
      horas_mes: '450+',
      reducao_custo: '55-65%'
    }
  },
  {
    segmento: 'Financeiro',
    icone: 'university',
    cor: '#8b5cf6',
    agentes_recomendados: ['supervisor', 'tecnico', 'cobranca', 'onboarding'],
    casos: [
      'Suporte a transacoes',
      'Onboarding de contas',
      'Renegociacao de dividas',
      'Duvidas sobre produtos'
    ],
    economia: {
      funcionarios: '5-10',
      horas_mes: '800+',
      reducao_custo: '60-70%'
    }
  },
  {
    segmento: 'Varejo',
    icone: 'store',
    cor: '#ec4899',
    agentes_recomendados: ['vendas', 'faq', 'resgate', 'pesquisa'],
    casos: [
      'Atendimento pre-venda',
      'Duvidas sobre produtos',
      'Programa de fidelidade',
      'Pos-venda e trocas'
    ],
    economia: {
      funcionarios: '3-5',
      horas_mes: '350+',
      reducao_custo: '50-60%'
    }
  }
];

export const METRICAS_GERAIS = {
  tempo_implementacao: '1-2 semanas',
  roi_medio: '300-500%',
  reducao_custo_medio: '60%',
  aumento_satisfacao: '+40%',
  disponibilidade: '24/7/365',
  escalabilidade: 'Ilimitada',
  integracao: '50+ plataformas'
};

export const FERRAMENTAS_DISPONIVEIS = [
  { nome: 'Google Calendar', icone: 'calendar', categoria: 'Agenda' },
  { nome: 'CRM Integracao', icone: 'database', categoria: 'Vendas' },
  { nome: 'WhatsApp API', icone: 'whatsapp', categoria: 'Comunicacao', fab: true },
  { nome: 'Email SMTP', icone: 'envelope', categoria: 'Comunicacao' },
  { nome: 'Webhook Custom', icone: 'code', categoria: 'Integracao' },
  { nome: 'Base de Conhecimento', icone: 'book', categoria: 'Suporte' },
  { nome: 'Geracao de PDF', icone: 'file-pdf', categoria: 'Documentos' },
  { nome: 'Pagamentos', icone: 'credit-card', categoria: 'Financeiro' }
];

export const COMPARATIVO_HUMANO = {
  titulo: 'Agente IA vs Atendente Humano',
  metricas: [
    {
      metrica: 'Disponibilidade',
      humano: '8-12h/dia',
      ia: '24h/dia',
      vantagem: '+200%'
    },
    {
      metrica: 'Atendimentos/hora',
      humano: '8-15',
      ia: '100+',
      vantagem: '+700%'
    },
    {
      metrica: 'Custo mensal',
      humano: 'R$ 3.000-5.000',
      ia: 'R$ 300-800',
      vantagem: '-85%'
    },
    {
      metrica: 'Tempo de resposta',
      humano: '2-5 min',
      ia: '< 3 seg',
      vantagem: '-98%'
    },
    {
      metrica: 'Consistencia',
      humano: 'Variavel',
      ia: '100%',
      vantagem: 'Padrao'
    },
    {
      metrica: 'Escalabilidade',
      humano: 'Linear (contratacao)',
      ia: 'Instantanea',
      vantagem: 'Infinita'
    }
  ]
};
