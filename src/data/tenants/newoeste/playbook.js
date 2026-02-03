// Playbook de Vendas - New Oeste Telecom
// Processo completo de vendas para internet fibra optica e 5G
// Ultima atualizacao: 2026-02-03

// ========================================
// PROCESSO DE VENDAS EM 6 ETAPAS
// ========================================

export const PROCESSO_VENDAS = {
  etapas: [
    {
      ordem: 1,
      nome: 'Prospeccao e Qualificacao',
      icone: '🎯',
      descricao: 'Identificar e qualificar potenciais clientes na area de cobertura',
      duracao: '5-10 minutos',
      objetivo: 'Encontrar leads qualificados que precisam de internet de qualidade',
      acoes: [
        'Verificar se o endereco esta na area de cobertura',
        'Identificar o tipo de cliente (residencial ou empresarial)',
        'Entender a necessidade atual (velocidade, estabilidade, suporte)',
        'Descobrir qual internet usa hoje e nivel de satisfacao',
        'Identificar dores (internet lenta, quedas frequentes, suporte ruim)',
        'Qualificar o momento de compra (urgencia)'
      ],
      perguntasChave: [
        'Qual sua regiao/bairro? (Para verificar cobertura)',
        'Voce usa internet para trabalho, estudos ou lazer?',
        'Quantas pessoas usam a internet simultaneamente?',
        'Qual sua internet atual? Esta satisfeito?',
        'Quais os principais problemas que enfrenta?',
        'Qual velocidade voce tem hoje?'
      ],
      criteriosQualificacao: [
        'Esta na area de cobertura da New Oeste',
        'Tem necessidade real (trabalho remoto, estudos, streaming, jogos)',
        'Insatisfeito com provedor atual ou sem internet',
        'Tem autonomia para decidir a contratacao',
        'Demonstra interesse genuino'
      ],
      ferramentas: [
        'Mapa de cobertura',
        'Formulario de pre-cadastro',
        'Script de qualificacao',
        'Calculadora de necessidade de velocidade'
      ]
    },

    {
      ordem: 2,
      nome: 'Apresentacao e Descoberta',
      icone: '🎤',
      descricao: 'Apresentar a New Oeste e aprofundar no entendimento das necessidades',
      duracao: '10-15 minutos',
      objetivo: 'Criar conexao, apresentar a empresa e entender profundamente as necessidades',
      acoes: [
        'Apresentar a New Oeste (empresa local, tecnologia, diferenciais)',
        'Contar cases de sucesso na regiao',
        'Aprofundar no diagnostico das necessidades',
        'Fazer perguntas SPIN (Situacao, Problema, Implicacao, Necessidade)',
        'Calcular velocidade ideal baseado no perfil de uso',
        'Criar senso de urgencia (promocoes, disponibilidade)'
      ],
      apresentacaoEmpresa: {
        elevator_pitch: 'A New Oeste e uma empresa local de telecomunicacoes que leva internet de ultra velocidade via fibra optica para residencias e empresas em Foz do Iguacu e regiao. Diferente das grandes operadoras, nos oferecemos atendimento personalizado, suporte tecnico local e instalacao rapida.',
        pontosChave: [
          'Empresa local que entende a regiao',
          'Fibra optica FTTH (ate sua casa)',
          'Velocidade simetrica real',
          'Suporte tecnico local e rapido',
          'Sem burocracia de grandes operadoras',
          'Tecnologia 5G em expansao'
        ],
        provas: [
          'Mais de X mil clientes satisfeitos na regiao',
          'Nota X.X no Reclame Aqui',
          'Infraestrutura propria de fibra optica',
          'Premiacao ou certificacao (se houver)'
        ]
      },
      perguntasSPIN: {
        situacao: [
          'Quantas pessoas moram na casa/trabalham na empresa?',
          'Quais dispositivos conectados simultaneamente?',
          'Qual o uso principal? (trabalho, estudos, streaming, jogos)',
          'Tem cameras de seguranca ou dispositivos IoT?'
        ],
        problema: [
          'Quais problemas enfrenta com a internet atual?',
          'Com que frequencia tem quedas de conexao?',
          'A velocidade atende suas necessidades?',
          'Como e o suporte do seu provedor atual?'
        ],
        implicacao: [
          'Como esses problemas afetam seu dia a dia?',
          'Ja perdeu reunioes importantes por queda de internet?',
          'Seus filhos tem dificuldade nas aulas online?',
          'Quanto tempo perde esperando download/upload?'
        ],
        necessidade: [
          'Como seria a internet ideal para voce?',
          'Qual velocidade seria confortavel?',
          'Quao importante e ter suporte rapido?',
          'Gostaria de estabilidade garantida?'
        ]
      }
    },

    {
      ordem: 3,
      nome: 'Proposta Personalizada',
      icone: '📊',
      descricao: 'Apresentar a solucao ideal com base nas necessidades identificadas',
      duracao: '10-15 minutos',
      objetivo: 'Propor o plano perfeito que resolve as dores do cliente',
      acoes: [
        'Recapitular as necessidades e dores identificadas',
        'Propor o plano ideal (com justificativa)',
        'Apresentar beneficios especificos para o perfil dele',
        'Mostrar comparativo com provedor atual',
        'Calcular ROI ou economia (se aplicavel)',
        'Apresentar diferenciais tecnicos (fibra, latencia, upload)',
        'Mostrar processo de instalacao e prazos',
        'Falar sobre garantias e SLA'
      ],
      estruturaProposta: {
        abertura: 'Com base no que conversamos, identifiquei que voce precisa de [necessidade]. O plano ideal para voce e o [plano] porque [justificativa].',
        componentesProposta: [
          'Plano recomendado com velocidade',
          'Preco com desconto (se houver)',
          'Equipamentos inclusos',
          'Prazo de instalacao',
          'Garantia de velocidade',
          'Suporte incluido',
          'Beneficios adicionais'
        ],
        fechamento: 'Este plano resolve [dor 1], [dor 2] e ainda oferece [beneficio adicional]. O que acha?'
      },
      materiaisApoio: [
        'Comparativo de planos',
        'Tabela de velocidades recomendadas',
        'Cases de clientes similares',
        'Infografico sobre fibra optica',
        'Mapa de cobertura 5G'
      ]
    },

    {
      ordem: 4,
      nome: 'Tratamento de Objecoes',
      icone: '💬',
      descricao: 'Superar objecoes e duvidas do cliente com empatia',
      duracao: '5-10 minutos',
      objetivo: 'Transformar objecoes em oportunidades de venda',
      acoes: [
        'Ouvir atentamente a objecao sem interromper',
        'Demonstrar empatia ("Entendo sua preocupacao...")',
        'Fazer perguntas para entender a objecao real',
        'Responder com fatos, dados e provas sociais',
        'Reforcar o valor e beneficios',
        'Confirmar se a objecao foi superada'
      ],
      metodologia: 'LAER - Listen (Ouvir), Acknowledge (Reconhecer), Explore (Explorar), Respond (Responder)',
      objecoesComuns: [
        'Preco muito alto',
        'Preciso pensar / consultar familia',
        'Ja tenho internet',
        'Minha internet atual esta boa',
        'Nao confio em empresa pequena',
        'Tenho contrato com outro provedor',
        'Nao quero fidelidade',
        'Instalacao demora muito'
      ],
      dica: 'Ver arquivo objecoes.js para respostas detalhadas de cada objecao'
    },

    {
      ordem: 5,
      nome: 'Fechamento e Contratacao',
      icone: '✅',
      descricao: 'Fechar a venda e iniciar o processo de contratacao',
      duracao: '10-15 minutos',
      objetivo: 'Garantir o compromisso do cliente e iniciar o onboarding',
      acoes: [
        'Identificar sinais de compra',
        'Fazer perguntas de fechamento',
        'Criar senso de urgencia (promocao, disponibilidade)',
        'Oferecer facilidades (parcelamento, desconto)',
        'Explicar proximo passo',
        'Preencher cadastro e documentacao',
        'Agendar instalacao',
        'Enviar contrato para assinatura digital',
        'Confirmar dados de pagamento'
      ],
      sinaisCompra: [
        'Faz perguntas sobre instalacao',
        'Pergunta sobre formas de pagamento',
        'Compara planos em detalhes',
        'Menciona quando quer comecar a usar',
        'Fala sobre cancelar provedor atual'
      ],
      perguntasFechamento: [
        'Quando gostaria que a instalacao fosse feita?',
        'Prefere pagar no boleto ou cartao?',
        'Posso ja agendar a visita tecnica?',
        'Qual dia da semana e melhor para instalacao?'
      ],
      documentosNecessarios: [
        'CPF e RG (ou CNH)',
        'Comprovante de residencia',
        'CNPJ (se empresarial)',
        'Contrato social (se empresarial)'
      ],
      processoPos: [
        'Envio de contrato para assinatura digital',
        'Agendamento de instalacao',
        'Envio de boleto ou processamento de cartao',
        'Confirmacao por WhatsApp',
        'Adicionar ao CRM'
      ]
    },

    {
      ordem: 6,
      nome: 'Pos-Venda e Fidelizacao',
      icone: '🎁',
      descricao: 'Garantir satisfacao e transformar cliente em promotor',
      duracao: 'Continuo',
      objetivo: 'Manter cliente satisfeito, reduzir churn e gerar indicacoes',
      acoes: [
        'Fazer follow-up pos-instalacao (24h depois)',
        'Verificar satisfacao com velocidade e estabilidade',
        'Enviar tutorial de uso e configuracao',
        'Apresentar portal do cliente',
        'Adicionar aos grupos de suporte',
        'Oferecer programa de indicacao',
        'Fazer pesquisa NPS apos 30 dias',
        'Monitorar sinais de insatisfacao',
        'Oferecer upgrade quando aplicavel',
        'Enviar lembretes de vencimento'
      ],
      momentosChave: {
        dia1: 'Follow-up pos-instalacao - tudo funcionando?',
        semana1: 'Dicas de uso e configuracao',
        mes1: 'Pesquisa de satisfacao NPS',
        mes3: 'Oferta de upgrade ou servicos adicionais',
        mes6: 'Renovacao e fidelizacao',
        anual: 'Reconhecimento e beneficios especiais'
      },
      programaIndicacao: {
        descricao: 'Incentive o cliente a indicar amigos e familiares',
        beneficios: 'Desconto na mensalidade para cada indicacao efetivada',
        material: 'Link personalizado e mensagem pronta para compartilhar'
      },
      prevencaoChurn: [
        'Monitorar tickets de suporte',
        'Identificar clientes com pagamentos atrasados',
        'Antecipar problemas tecnicos',
        'Fazer contato proativo em caso de insatisfacao',
        'Oferecer solucoes antes do cancelamento'
      ]
    }
  ]
};

// ========================================
// DIFERENCIAIS COMPETITIVOS
// ========================================

export const DIFERENCIAIS = [
  {
    titulo: 'Fibra Optica Ate Sua Casa (FTTH)',
    descricao: 'Fibra optica chega direto ate dentro da sua casa, garantindo maxima velocidade e estabilidade',
    icone: '🔌',
    beneficios: [
      'Velocidade real sem variacao',
      'Menor latencia (melhor para jogos e videoconferencias)',
      'Resistente a interferencias climaticas',
      'Maior durabilidade e confiabilidade'
    ],
    comparacao: 'Diferente de cabo coaxial ou tecnologias wireless que sofrem degradacao de sinal'
  },
  {
    titulo: 'Velocidade Simetrica',
    descricao: 'Mesma velocidade para download e upload, essencial para trabalho remoto',
    icone: '⚡',
    beneficios: [
      'Videoconferencias em alta qualidade',
      'Upload rapido de arquivos e backup',
      'Streaming e transmissao ao vivo',
      'Melhor para trabalho na nuvem'
    ],
    comparacao: 'Operadoras convencionais oferecem upload ate 10x mais lento'
  },
  {
    titulo: 'Suporte Tecnico Local',
    descricao: 'Equipe tecnica local que conhece a regiao e resolve problemas rapidamente',
    icone: '🛠️',
    beneficios: [
      'Atendimento humanizado (sem robos)',
      'Tecnicos conhecem a infraestrutura local',
      'Resolucao rapida de problemas',
      'Disponibilidade para visita presencial'
    ],
    comparacao: 'Grandes operadoras tem atendimento centralizado e demorado'
  },
  {
    titulo: 'Instalacao Rapida',
    descricao: 'Instalacao em ate 72 horas apos aprovacao',
    icone: '🚀',
    beneficios: [
      'Comece a usar rapidamente',
      'Agendamento flexivel',
      'Instalacao profissional incluida',
      'Equipamentos modernos sem custo extra'
    ]
  },
  {
    titulo: 'Sem Burocracia',
    descricao: 'Processo simples e rapido, sem filas e complicacoes',
    icone: '✨',
    beneficios: [
      'Contratacao 100% digital',
      'Documentacao minima',
      'Sem analise de credito complicada',
      'Comunicacao direta via WhatsApp'
    ]
  },
  {
    titulo: 'Empresa Local',
    descricao: 'Empresa de Foz do Iguacu que investe na regiao',
    icone: '🏠',
    beneficios: [
      'Conhece as necessidades locais',
      'Investe na infraestrutura da cidade',
      'Gera empregos locais',
      'Atendimento personalizado'
    ]
  },
  {
    titulo: 'Tecnologia 5G',
    descricao: 'Cobertura 5G em expansao para mobilidade',
    icone: '📱',
    beneficios: [
      'Internet movel de alta velocidade',
      'Complemento para areas sem fibra',
      'Backup para conexao principal',
      'Futuro-prova (tecnologia de ponta)'
    ]
  },
  {
    titulo: 'Programa de Indicacao',
    descricao: 'Ganhe descontos indicando amigos e familiares',
    icone: '🎁',
    beneficios: [
      'Desconto na mensalidade',
      'Sem limite de indicacoes',
      'Beneficio recorrente',
      'Simples de participar'
    ]
  }
];

// ========================================
// PERGUNTAS QUALIFICADORAS
// ========================================

export const PERGUNTAS_QUALIFICADORAS = {
  cobertura: [
    'Qual seu endereco completo? (para verificar cobertura)',
    'Voce mora em casa ou apartamento?',
    'Qual o bairro?'
  ],
  necessidade: [
    'Quantas pessoas usam a internet simultaneamente?',
    'Qual o principal uso? (trabalho, estudos, entretenimento)',
    'Alguem trabalha home office?',
    'Tem criancas em aulas online?',
    'Usa muito streaming (Netflix, YouTube)?',
    'Alguem joga online?',
    'Quantos dispositivos conectados ao mesmo tempo?'
  ],
  dorAtual: [
    'Como esta sua internet hoje?',
    'Qual a operadora atual?',
    'Qual velocidade contratada?',
    'Esta satisfeito com a velocidade?',
    'Tem quedas frequentes?',
    'Ja tentou resolver com o suporte?',
    'Como foi a experiencia com suporte?'
  ],
  urgencia: [
    'Quando precisa de uma solucao?',
    'Tem algum prazo especifico?',
    'Esta sem internet no momento?',
    'Tem algum projeto/trabalho urgente?'
  ],
  decisao: [
    'Voce e quem decide sobre a internet?',
    'Precisa consultar alguem?',
    'Qual seu orcamento disponivel?',
    'Ja pesquisou outras opcoes?'
  ]
};

// ========================================
// CALCULADORA DE VELOCIDADE IDEAL
// ========================================

export const GUIA_VELOCIDADES = {
  descricao: 'Ajude o cliente a escolher a velocidade ideal baseado no perfil de uso',
  calculos: [
    {
      perfil: 'Uso Basico',
      pessoas: '1-2 pessoas',
      usos: ['Navegacao', 'Email', 'Redes sociais', 'Video chamadas'],
      velocidadeMinima: '100 Mbps',
      velocidadeRecomendada: '200 Mbps',
      justificativa: 'Garante navegacao fluida e video chamadas sem travamentos'
    },
    {
      perfil: 'Uso Moderado',
      pessoas: '2-4 pessoas',
      usos: ['Streaming HD', 'Home office', 'Aulas online', 'Downloads'],
      velocidadeMinima: '200 Mbps',
      velocidadeRecomendada: '300 Mbps',
      justificativa: 'Permite multiplos dispositivos simultaneos sem perda de qualidade'
    },
    {
      perfil: 'Uso Intenso',
      pessoas: '4-6 pessoas',
      usos: ['Streaming 4K', 'Jogos online', 'Upload de videos', 'Multiplos dispositivos'],
      velocidadeMinima: '300 Mbps',
      velocidadeRecomendada: '500 Mbps',
      justificativa: 'Experiencia premium sem lag mesmo com uso intenso simultaneo'
    },
    {
      perfil: 'Uso Profissional/Empresarial',
      pessoas: '6+ pessoas ou empresa',
      usos: ['Servidores', 'Clouds', 'Backups', 'VoIP', 'Videoconferencias HD'],
      velocidadeMinima: '500 Mbps',
      velocidadeRecomendada: '1 Gbps',
      justificativa: 'Garante produtividade maxima e operacao ininterrupta'
    }
  ],
  regrasBasicas: [
    'Cada pessoa usando streaming 4K = ~25 Mbps',
    'Cada pessoa em videoconferencia HD = ~5-10 Mbps',
    'Download de jogos e atualizacoes = quanto maior melhor',
    'Trabalho com nuvem = upload rapido e essencial',
    'Smart TVs, cameras, IoT = +50 Mbps recomendado'
  ]
};

// ========================================
// CHECKLIST PRE-VENDA
// ========================================

export const CHECKLIST_PREVENDA = [
  {
    categoria: 'Qualificacao',
    itens: [
      'Verificou cobertura no endereco',
      'Identificou numero de usuarios',
      'Entendeu perfil de uso',
      'Identificou dores com provedor atual',
      'Confirmou autoridade para decidir'
    ]
  },
  {
    categoria: 'Apresentacao',
    itens: [
      'Apresentou a New Oeste',
      'Destacou diferenciais relevantes',
      'Mostrou cases de sucesso',
      'Fez perguntas SPIN',
      'Calculou velocidade ideal'
    ]
  },
  {
    categoria: 'Proposta',
    itens: [
      'Recomendou plano adequado',
      'Justificou a escolha',
      'Apresentou preco claramente',
      'Explicou beneficios inclusos',
      'Mostrou comparativo com concorrentes'
    ]
  }
];

// ========================================
// CHECKLIST POS-VENDA
// ========================================

export const CHECKLIST_POSVENDA = [
  {
    categoria: 'Imediato',
    itens: [
      'Confirmar dados cadastrais',
      'Enviar contrato para assinatura',
      'Agendar instalacao',
      'Enviar confirmacao por WhatsApp',
      'Registrar no CRM'
    ]
  },
  {
    categoria: '24h Pos-Instalacao',
    itens: [
      'Ligar para verificar satisfacao',
      'Confirmar que tudo esta funcionando',
      'Tirar duvidas sobre uso',
      'Enviar tutorial de configuracao',
      'Apresentar portal do cliente'
    ]
  },
  {
    categoria: '7 Dias',
    itens: [
      'Verificar se tem alguma duvida',
      'Confirmar satisfacao com velocidade',
      'Oferecer dicas de otimizacao'
    ]
  },
  {
    categoria: '30 Dias',
    itens: [
      'Enviar pesquisa NPS',
      'Verificar nivel de satisfacao',
      'Apresentar programa de indicacao',
      'Oferecer upgrade se aplicavel'
    ]
  }
];

// ========================================
// MATERIAIS DE APOIO
// ========================================

export const MATERIAIS_APOIO = {
  documentos: [
    'Apresentacao comercial em PDF',
    'Comparativo de tecnologias (Fibra vs Cabo vs Radio)',
    'Tabela de velocidades recomendadas',
    'Mapa de cobertura',
    'Modelos de contrato',
    'FAQ - Perguntas Frequentes'
  ],
  ferramentas: [
    'Calculadora de velocidade ideal',
    'Simulador de proposta',
    'Verificador de cobertura',
    'Agenda de instalacao',
    'CRM para gestao de leads'
  ],
  treinamentos: [
    'Curso de tecnicas de vendas',
    'Treinamento sobre tecnologia fibra optica',
    'Workshop de tratamento de objecoes',
    'Role play de situacoes reais'
  ]
};
