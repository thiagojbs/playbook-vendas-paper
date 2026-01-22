// Tabela de precos extraida da planilha
export const PRECOS = {
  mensalidade_base: 487,

  usuarios: {
    inclusos: 3,
    faixas: [
      { min: 4, max: 20, valor: 39 },
      { min: 21, max: 100, valor: 29 },
      { min: 101, max: 9999, valor: 19.9 }
    ]
  },

  whatsapp: {
    inclusos: 1,
    extra: 89
  },

  instagram: 69,
  messenger: 69,

  infraestrutura: {
    faixas: [
      { nome: 'ate_5000', label: 'Ate 5.000 contatos', valor: 0 },
      { nome: '5001_10000', label: '5.001 ate 10.000', valor: 900 },
      { nome: '10001_20000', label: '10.001 ate 20.000', valor: 1800 },
      { nome: '20001_40000', label: '20.001 ate 40.000', valor: 3600 }
    ]
  },

  integracoes: {
    asas: 99,
    transcricao_audio: 6.99,
    agentes_ia: 150,
    suporte_papervines: 230,
    solucao_telecom: 230,
    verificacao_bm: 250,
    integracao_agendamento: 1500
  },

  implantacoes: {
    chatbots: {
      basic: { valor: 1500, parcelado: '2x R$ 973,00', avista: 1500 },
      master: { valor: 2600, parcelado: '3x R$ 953,00', avista: 2600 },
      fusion: { valor: 3600, parcelado: '3x R$ 1.320,00', avista: 3600 }
    },
    ia: {
      basic: { valor: 2500, agentes: 2, supervisor: 1 },
      master: { valor: 3800, agentes: 4, supervisor: 1 },
      fusion: { valor: 5300, agentes: 6, supervisor: 1 }
    },
    telecom: {
      basic: { valor: 990, avista: 990 },
      master: { valor: 2600, parcelado: '3x R$ 973,00', avista: 2600 },
      fusion: { valor: 3600, parcelado: '3x R$ 1.320,00', avista: 3600 }
    }
  },

  suporte_por_infraestrutura: {
    ate_5000: 230,
    ate_20000: 630,
    ate_40000: 890
  }
};

// Planos de Chatbots
export const PLANOS_CHATBOTS = {
  basic: {
    nome: 'CHATBOTS BASIC',
    valor: 1500,
    parcelado: '2x R$ 973,00',
    funcionalidades: [
      'Entrada (saudacao)',
      'Ausencia',
      'FollowUp (Ctt 1, Ctt 2)',
      'Agendamento Procedimento',
      'Dados de Agendamento',
      'Confirmacao de Agendamento',
      'Orientacao para procedimento'
    ]
  },
  master: {
    nome: 'CHATBOTS MASTER',
    valor: 2600,
    parcelado: '3x R$ 953,00',
    funcionalidades: [
      'Entrada (saudacao)',
      'Ausencia',
      'FollowUp (Ctt 1, 2, 3, 4)',
      'Agendamento Avaliacao',
      'Agendamento Procedimento',
      'Resgate Qualificacao',
      'Resgate Desmarcados',
      'Resgate Procedimento',
      'Resgate Orcamento em maos'
    ]
  },
  fusion: {
    nome: 'CHATBOTS FUSION',
    valor: 3600,
    parcelado: '3x R$ 1.320,00',
    funcionalidades: [
      'Tudo do Master +',
      'Pos Venda NPS',
      'Convite para Avaliar no Google',
      'Sistema de Indicacao',
      'LTV Procedimento 1, 2, 3'
    ]
  }
};

// Planos de Solucoes Telecom
export const PLANOS_TELECOM = {
  basic: {
    nome: 'TELECOM BASIC',
    valor: 990,
    funcionalidades: [
      'Bot de Entrada/Ausencia',
      'Coleta de dados para contrato',
      'Aviso de confirmacao de instalacao',
      'Envio de mensagens com base na data',
      'Feedback pos atendimento'
    ]
  },
  master: {
    nome: 'TELECOM MASTER',
    valor: 2600,
    parcelado: '3x R$ 973,00',
    funcionalidades: [
      'Tudo do Basic +',
      'Aviso de chegada do tecnico',
      'Regua de Cobranca (D-1, D+3, D+7)',
      'Consulta e envio de 2a Via de boleto',
      'Criacao automatica de Card no CRM',
      'Verificacao de viabilidade via CEP',
      'Status do contrato',
      'Status da internet',
      'Arquivar card automaticamente'
    ]
  },
  fusion: {
    nome: 'TELECOM FUSION',
    valor: 3600,
    parcelado: '3x R$ 1.320,00',
    funcionalidades: [
      'Tudo do Master +',
      'Regua de Cobranca Extendida',
      'Envio de contrato com assinatura eletronica',
      'Listar ordem de servico no CRM',
      'Abertura e Fechamento de Ocorrencia',
      'Envio de mensagem ao movimentar card',
      'Deteccao e aviso de queda massiva',
      'Envio automatico de contrato apos aceite'
    ]
  }
};

// Planos de Agentes IA
export const PLANOS_IA = {
  basic: {
    nome: 'IA BASIC',
    valor: 2500,
    componentes: [
      '1 Supervisor',
      '1o Agente',
      '2o Agente'
    ]
  },
  master: {
    nome: 'IA MASTER',
    valor: 3800,
    componentes: [
      '1 Supervisor',
      '1o Agente',
      '2o Agente',
      '3o Agente',
      '4o Agente'
    ]
  },
  fusion: {
    nome: 'IA FUSION',
    valor: 5300,
    componentes: [
      '1 Supervisor',
      '1o ao 6o Agente'
    ]
  }
};
