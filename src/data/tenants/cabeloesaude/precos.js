// Tabela de precos - Clinica de Tricologia Cabelo & Saude
// Baseado em pesquisa de mercado de tricologia 2025-2026
// NOTA: Valores sao referencias de mercado - ajustar conforme realidade da clinica

export const PRECOS = {
  // Consultas e Avaliacoes
  avaliacao_tricologica: {
    nome: 'Avaliacao Tricologica Completa',
    valor: 350,
    descricao: 'Anamnese + tricoscopia + diagnostico + indicacao de tratamento',
    duracao: '40-60 min',
    inclui: [
      'Anamnese detalhada',
      'Exame com tricoscopio',
      'Fotografias para acompanhamento',
      'Diagnostico explicado',
      'Proposta de tratamento',
      'Indicacao de exames (se necessario)'
    ]
  },

  retorno_avaliacao: {
    nome: 'Retorno de Avaliacao',
    valor: 150,
    descricao: 'Analise de exames + ajuste de protocolo',
    duracao: '30 min'
  },

  // Sessoes Individuais
  sessoes: {
    laserterapia: {
      nome: 'Laserterapia Capilar',
      valor_sessao: 180,
      duracao: '20-30 min',
      descricao: 'Estimulacao folicular com laser de baixa potencia',
      indicacoes: ['Queda capilar', 'Alopecia inicial', 'Fortalecimento']
    },
    microagulhamento: {
      nome: 'Microagulhamento Capilar',
      valor_sessao: 280,
      duracao: '30-40 min',
      descricao: 'Estimulacao com micro-agulhas para producao de colageno',
      indicacoes: ['Alopecia androgenica', 'Afinamento dos fios', 'Cicatrizes']
    },
    intradermoterapia: {
      nome: 'Intradermoterapia Capilar',
      valor_sessao: 350,
      duracao: '30-40 min',
      descricao: 'Aplicacao de ativos diretamente no couro cabeludo',
      indicacoes: ['Queda intensa', 'Nutricao profunda', 'Alopecia']
    },
    led: {
      nome: 'Terapia com LED',
      valor_sessao: 120,
      duracao: '15-20 min',
      descricao: 'Fototerapia para estimulacao e cicatrizacao',
      indicacoes: ['Pos-procedimento', 'Inflamacao', 'Manutencao']
    },
    limpeza_couro: {
      nome: 'Limpeza de Couro Cabeludo',
      valor_sessao: 150,
      duracao: '30 min',
      descricao: 'Esfoliacao e higienizacao profunda',
      indicacoes: ['Dermatite', 'Oleosidade', 'Caspa']
    },
    hidratacao_profunda: {
      nome: 'Hidratacao Profunda',
      valor_sessao: 180,
      duracao: '40 min',
      descricao: 'Tratamento intensivo para fios danificados',
      indicacoes: ['Ressecamento', 'Fios quebradicos', 'Pos-quimica']
    }
  },

  // Pacotes de Tratamento
  pacotes: {
    basico: {
      nome: 'Protocolo Basico',
      valor: 1800,
      parcelado: '6x R$ 300',
      desconto_pix: '10%',
      sessoes: 6,
      duracao_meses: 3,
      inclui: [
        'Avaliacao tricologica inicial',
        '6 sessoes de laserterapia',
        'Acompanhamento mensal',
        'Orientacoes de cuidados em casa'
      ],
      indicado_para: 'Queda leve a moderada, prevencao, fortalecimento'
    },
    intermediario: {
      nome: 'Protocolo Intermediario',
      valor: 3500,
      parcelado: '10x R$ 350',
      desconto_pix: '10%',
      sessoes: 12,
      duracao_meses: 6,
      inclui: [
        'Avaliacao tricologica completa',
        '6 sessoes de laserterapia',
        '6 sessoes de microagulhamento',
        'Acompanhamento quinzenal',
        'Protocolo home care incluso'
      ],
      indicado_para: 'Queda moderada, alopecia inicial, afinamento significativo'
    },
    avancado: {
      nome: 'Protocolo Avancado',
      valor: 5500,
      parcelado: '12x R$ 458',
      desconto_pix: '10%',
      sessoes: 18,
      duracao_meses: 9,
      inclui: [
        'Avaliacao tricologica completa',
        '6 sessoes de laserterapia',
        '6 sessoes de microagulhamento',
        '6 sessoes de intradermoterapia',
        'Acompanhamento semanal inicial',
        'Protocolo home care premium',
        'Exames de acompanhamento'
      ],
      indicado_para: 'Alopecia moderada a avancada, casos complexos'
    },
    premium: {
      nome: 'Protocolo Premium',
      valor: 8000,
      parcelado: '12x R$ 666',
      desconto_pix: '12%',
      sessoes: 24,
      duracao_meses: 12,
      inclui: [
        'Tudo do Avancado +',
        'Sessoes extras conforme necessidade',
        'Suplementacao capilar inclusa (6 meses)',
        'Acompanhamento nutricional',
        'Manutencao trimestral por 1 ano',
        'Prioridade no agendamento'
      ],
      indicado_para: 'Casos complexos, tratamento completo e manutencao'
    }
  },

  // Produtos e Home Care
  homecare: {
    shampoo_tratamento: {
      nome: 'Shampoo de Tratamento',
      valor: 89,
      descricao: 'Formulacao para uso durante o tratamento'
    },
    tonico_capilar: {
      nome: 'Tonico Capilar',
      valor: 120,
      descricao: 'Aplicacao diaria para estimulacao'
    },
    suplemento_capilar: {
      nome: 'Suplemento Capilar (30 dias)',
      valor: 150,
      descricao: 'Vitaminas e minerais para saude capilar'
    },
    kit_homecare_basico: {
      nome: 'Kit Home Care Basico',
      valor: 250,
      descricao: 'Shampoo + tonico para manutencao em casa',
      inclui: ['Shampoo tratamento', 'Tonico capilar']
    },
    kit_homecare_completo: {
      nome: 'Kit Home Care Completo',
      valor: 380,
      descricao: 'Kit completo de cuidados em casa',
      inclui: ['Shampoo tratamento', 'Tonico capilar', 'Suplemento (30 dias)']
    }
  },

  // Sessoes de Manutencao
  manutencao: {
    trimestral: {
      nome: 'Manutencao Trimestral',
      valor: 450,
      descricao: 'Sessao de manutencao + avaliacao de evolucao',
      inclui: ['Tricoscopia de acompanhamento', '2 sessoes de laserterapia', 'Ajuste de protocolo']
    },
    semestral: {
      nome: 'Manutencao Semestral',
      valor: 800,
      descricao: 'Pacote de manutencao para 6 meses',
      inclui: ['2 avaliacoes de acompanhamento', '4 sessoes de laser', 'Orientacoes atualizadas']
    }
  }
};

// Resumo para calculadora
export const RESUMO_PRECOS = {
  avaliacao: {
    min: 150,
    max: 350,
    media: 250
  },
  sessao_individual: {
    min: 120,
    max: 350,
    media: 220
  },
  pacote_tratamento: {
    min: 1800,
    max: 8000,
    media: 4200
  }
};

// Formas de pagamento
export const FORMAS_PAGAMENTO = {
  pix: {
    desconto: '10%',
    descricao: 'Pagamento a vista via Pix com desconto'
  },
  cartao_credito: {
    parcelas_sem_juros: 6,
    parcelas_com_juros: 12,
    descricao: 'Parcelamento em ate 12x no cartao'
  },
  cartao_debito: {
    desconto: '5%',
    descricao: 'Pagamento no debito com desconto'
  }
};

// Exames complementares (referencia - realizados externamente)
export const EXAMES_REFERENCIA = [
  {
    nome: 'Hemograma completo',
    valor_aprox: '30-80',
    descricao: 'Avaliacao geral do sangue'
  },
  {
    nome: 'Ferritina',
    valor_aprox: '30-60',
    descricao: 'Estoque de ferro (relacionado a queda)'
  },
  {
    nome: 'TSH e T4 livre',
    valor_aprox: '50-100',
    descricao: 'Funcao da tireoide'
  },
  {
    nome: 'Vitamina D',
    valor_aprox: '60-120',
    descricao: 'Niveis de vitamina D'
  },
  {
    nome: 'Zinco',
    valor_aprox: '40-80',
    descricao: 'Mineral importante para cabelos'
  },
  {
    nome: 'Perfil hormonal feminino',
    valor_aprox: '150-300',
    descricao: 'FSH, LH, estradiol, progesterona, testosterona'
  },
  {
    nome: 'DHT (di-hidrotestosterona)',
    valor_aprox: '80-150',
    descricao: 'Hormonio relacionado a calvicie'
  }
];

// Calculadora de proposta
export function calcularProposta(opcoes) {
  const {
    avaliacao = true,
    pacote = null,
    sessoes_extras = [],
    homecare = null,
    manutencao = null,
    pagamento = 'parcelado'
  } = opcoes;

  let total = 0;
  const itens = [];

  // Avaliacao
  if (avaliacao) {
    total += PRECOS.avaliacao_tricologica.valor;
    itens.push({
      item: PRECOS.avaliacao_tricologica.nome,
      valor: PRECOS.avaliacao_tricologica.valor
    });
  }

  // Pacote
  if (pacote && PRECOS.pacotes[pacote]) {
    total += PRECOS.pacotes[pacote].valor;
    itens.push({
      item: PRECOS.pacotes[pacote].nome,
      valor: PRECOS.pacotes[pacote].valor
    });
  }

  // Sessoes extras
  sessoes_extras.forEach(sessao => {
    if (PRECOS.sessoes[sessao]) {
      total += PRECOS.sessoes[sessao].valor_sessao;
      itens.push({
        item: PRECOS.sessoes[sessao].nome,
        valor: PRECOS.sessoes[sessao].valor_sessao
      });
    }
  });

  // Home care
  if (homecare && PRECOS.homecare[homecare]) {
    total += PRECOS.homecare[homecare].valor;
    itens.push({
      item: PRECOS.homecare[homecare].nome,
      valor: PRECOS.homecare[homecare].valor
    });
  }

  // Manutencao
  if (manutencao && PRECOS.manutencao[manutencao]) {
    total += PRECOS.manutencao[manutencao].valor;
    itens.push({
      item: PRECOS.manutencao[manutencao].nome,
      valor: PRECOS.manutencao[manutencao].valor
    });
  }

  // Aplicar desconto se pagamento for pix
  const desconto = pagamento === 'pix' ? 0.10 : 0;
  const valorDesconto = total * desconto;
  const totalFinal = total - valorDesconto;

  return {
    itens,
    subtotal: total,
    desconto: valorDesconto,
    total: totalFinal,
    formaPagamento: pagamento,
    parcelamento: pagamento === 'parcelado' ? `12x R$ ${(totalFinal / 12).toFixed(2)}` : null
  };
}

// Tabela comparativa de pacotes
export const COMPARATIVO_PACOTES = {
  headers: ['Recurso', 'Basico', 'Intermediario', 'Avancado', 'Premium'],
  rows: [
    ['Avaliacao inicial', '✅', '✅', '✅', '✅'],
    ['Sessoes de laser', '6', '6', '6', '6+'],
    ['Microagulhamento', '❌', '6', '6', '6+'],
    ['Intradermoterapia', '❌', '❌', '6', '6+'],
    ['Acompanhamento', 'Mensal', 'Quinzenal', 'Semanal', 'Personalizado'],
    ['Home care incluso', '❌', 'Basico', 'Premium', 'Premium'],
    ['Suplementacao', '❌', '❌', '❌', '6 meses'],
    ['Manutencao', '❌', '❌', '❌', '1 ano'],
    ['Duracao', '3 meses', '6 meses', '9 meses', '12 meses'],
    ['Investimento', 'R$ 1.800', 'R$ 3.500', 'R$ 5.500', 'R$ 8.000']
  ]
};
