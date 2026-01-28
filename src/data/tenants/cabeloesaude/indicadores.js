// Indicadores e Metas - Cabelo & Saúde
// Baseado no Módulo 10 do Playbook 2025

export const indicadores = {
  metadata: {
    titulo: "Indicadores e Metas de Performance",
    descricao: "KPIs, métricas e benchmarks para o comercial",
    versao: "1.0.0",
    dataAtualizacao: "2026-01-27"
  },

  // ========================================
  // MÉTRICAS PRINCIPAIS - FUNIL DE VENDAS
  // ========================================
  metricasFunil: {
    titulo: "Métricas do Funil de Vendas",

    taxaResposta: {
      nome: "Taxa de Respostas",
      descricao: "% de leads que respondem ao primeiro contato",
      meta: "70%",
      calculo: "(Leads que responderam / Total de leads contatados) × 100",
      benchmark: {
        minimo: "50%",
        bom: "60%",
        excelente: "70%+"
      },
      dicasMelhoria: [
        "Personalize a primeira mensagem com nome e contexto",
        "Evite mensagens genéricas tipo 'Oi, tudo bem?'",
        "Mencione como o lead chegou até você",
        "Use perguntas abertas que geram curiosidade"
      ]
    },

    taxaLevantadaDeMao: {
      nome: "Taxa de Levantada de Mão",
      descricao: "% de leads que demonstram interesse real em consulta",
      meta: "60%",
      calculo: "(Leads que demonstraram interesse / Leads que responderam) × 100",
      benchmark: {
        minimo: "40%",
        bom: "50%",
        excelente: "60%+"
      },
      dicasMelhoria: [
        "Identifique o perfil do lead (visual, emocional, racional)",
        "Use scripts adequados ao perfil identificado",
        "Mostre casos de sucesso similares",
        "Crie senso de urgência com escassez real"
      ]
    },

    taxaAtendimentos: {
      nome: "Taxa de Atendimentos",
      descricao: "% de consultas agendadas que realmente acontecem (não no-show)",
      meta: "80%",
      calculo: "(Consultas realizadas / Consultas agendadas) × 100",
      benchmark: {
        minimo: "60%",
        bom: "70%",
        excelente: "80%+"
      },
      dicasMelhoria: [
        "Envie confirmação 24h antes da consulta",
        "Ligue para confirmar em horários críticos",
        "Reforce o valor da consulta na confirmação",
        "Use WhatsApp para lembrar 2h antes",
        "Ofereça facilidades (reagendamento fácil)"
      ]
    },

    taxaConversao: {
      nome: "Taxa de Conversão (Consulta → Tratamento)",
      descricao: "% de pacientes que iniciam tratamento após consulta",
      meta: "30%",
      calculo: "(Pacientes que fecharam tratamento / Total de consultas realizadas) × 100",
      benchmark: {
        minimo: "20%",
        bom: "25%",
        excelente: "30%+"
      },
      dicasMelhoria: [
        "Atue nas primeiras 48h após consulta (script Comercial 2)",
        "Ofereça condições especiais pós-consulta",
        "Use gatilho de progressão clínica",
        "Mostre urgência com dados do diagnóstico",
        "Facilite parcelamento direto com a clínica"
      ]
    },

    prazoMedioVenda: {
      nome: "PMV - Prazo Médio de Venda",
      descricao: "Tempo médio entre primeiro contato e fechamento",
      meta: "≤ 10 dias",
      calculo: "Soma(data fechamento - data primeiro contato) / Total de vendas",
      benchmark: {
        minimo: "≤ 20 dias",
        bom: "≤ 15 dias",
        excelente: "≤ 10 dias"
      },
      dicasMelhoria: [
        "Agende consulta o quanto antes",
        "Use scripts de follow-up persistentes",
        "Crie urgência com escassez de horários",
        "Não deixe lead esfriar (máximo 48h sem contato)",
        "Ofereça facilidades para agilizar decisão"
      ]
    }
  },

  // ========================================
  // MÉTRICAS COMERCIAL 2 (PÓS-CONSULTA)
  // ========================================
  metricasComercial2: {
    titulo: "Métricas do Comercial 2 (Pós-Consulta)",

    taxaContatoPos48h: {
      nome: "Taxa de Contato em 48h",
      descricao: "% de pacientes pós-consulta contatados nas primeiras 48h",
      meta: "100%",
      calculo: "(Pacientes contatados em 48h / Total de consultas realizadas) × 100",
      benchmark: {
        minimo: "80%",
        bom: "90%",
        excelente: "100%"
      },
      importancia: "CRÍTICO - A janela de 48h é quando o paciente está mais quente e decidido"
    },

    taxaConversaoPos: {
      nome: "Taxa de Conversão Pós-Consulta",
      descricao: "% de pacientes que fecham tratamento após abordagem comercial 2",
      meta: "40%",
      calculo: "(Fechamentos pós-consulta / Total abordagens comercial 2) × 100",
      benchmark: {
        minimo: "25%",
        bom: "30%",
        excelente: "40%+"
      }
    },

    tempoRespostaPos: {
      nome: "Tempo de Resposta Pós-Consulta",
      descricao: "Tempo médio até primeiro contato após consulta",
      meta: "≤ 6 horas",
      calculo: "Soma(hora primeiro contato - hora fim consulta) / Total de consultas",
      benchmark: {
        minimo: "≤ 24h",
        bom: "≤ 12h",
        excelente: "≤ 6h"
      },
      importancia: "Quanto mais rápido o contato, maior a taxa de conversão"
    }
  },

  // ========================================
  // MÉTRICAS DE NO-SHOW E RECUPERAÇÃO
  // ========================================
  metricasNoShow: {
    titulo: "Métricas de No-Show e Recuperação",

    taxaNoShow: {
      nome: "Taxa de No-Show",
      descricao: "% de consultas agendadas que não aconteceram (paciente faltou)",
      meta: "≤ 20%",
      calculo: "(Consultas não realizadas / Total de consultas agendadas) × 100",
      benchmark: {
        minimo: "≤ 30%",
        bom: "≤ 25%",
        excelente: "≤ 20%"
      },
      dicasReducao: [
        "Confirmação via WhatsApp 24h antes",
        "Ligação de confirmação para primeira consulta",
        "Lembrete 2h antes via WhatsApp",
        "Facilitar reagendamento sem burocracia",
        "Criar vínculo emocional antes da consulta"
      ]
    },

    taxaRecuperacaoNoShow: {
      nome: "Taxa de Recuperação de No-Show",
      descricao: "% de no-shows que reagendaram e compareceram",
      meta: "50%",
      calculo: "(No-shows que compareceram depois / Total de no-shows) × 100",
      benchmark: {
        minimo: "30%",
        bom: "40%",
        excelente: "50%+"
      },
      dicasMelhoria: [
        "Ação imediata no mesmo dia do furo",
        "Use os 5 blocos de abordagem do script de no-show",
        "Ofereça bônus exclusivo para reagendamento",
        "Mostre que você se importa com o caso dela",
        "Não julgue, apenas acolha e reengaje"
      ]
    },

    tempoRecuperacaoNoShow: {
      nome: "Tempo de Recuperação de No-Show",
      descricao: "Tempo médio até conseguir reagendar um no-show",
      meta: "≤ 3 dias",
      calculo: "Soma(data reagendamento - data no-show) / Total recuperados",
      benchmark: {
        minimo: "≤ 7 dias",
        bom: "≤ 5 dias",
        excelente: "≤ 3 dias"
      }
    }
  },

  // ========================================
  // MÉTRICAS DE FOLLOW-UP
  // ========================================
  metricasFollowUp: {
    titulo: "Métricas de Follow-Up e Reengajamento",

    taxaResposta1Follow: {
      nome: "Taxa de Resposta ao 1º Follow-Up",
      descricao: "% de leads que respondem à primeira mensagem de follow-up",
      meta: "40%",
      calculo: "(Leads que responderam ao 1º follow-up / Total de follow-ups enviados) × 100",
      benchmark: {
        minimo: "25%",
        bom: "30%",
        excelente: "40%+"
      }
    },

    taxaReengajamento: {
      nome: "Taxa de Reengajamento",
      descricao: "% de leads frios que voltaram a demonstrar interesse",
      meta: "20%",
      calculo: "(Leads reengajados / Total de leads frios contatados) × 100",
      benchmark: {
        minimo: "10%",
        bom: "15%",
        excelente: "20%+"
      },
      dicasMelhoria: [
        "Use as 10 variações de follow-up do Módulo 6",
        "Personalize com contexto específico do lead",
        "Varie tom: emocional, racional, urgência",
        "Não desista após 1-2 tentativas",
        "Use áudios para criar conexão mais humana"
      ]
    },

    numeroTentativasAteResposta: {
      nome: "Número de Tentativas até Resposta",
      descricao: "Quantas tentativas em média até o lead responder",
      meta: "3-5 tentativas",
      analise: "Leads que respondem geralmente o fazem entre a 3ª e 5ª tentativa",
      importancia: "Persistência estratégica é fundamental - não desista cedo demais"
    }
  },

  // ========================================
  // METAS INDIVIDUAIS E DE EQUIPE
  // ========================================
  metasIndividuais: {
    titulo: "Metas Individuais do Comercial",

    diarias: {
      nome: "Meta Diária",
      consultasAgendadas: "2-3 consultas/dia",
      leadsContatados: "15-20 leads/dia",
      followUpsEnviados: "10-15 follow-ups/dia",
      tempoResposta: "< 2 horas para qualquer lead novo"
    },

    semanais: {
      nome: "Meta Semanal",
      consultasAgendadas: "10-15 consultas/semana",
      consultasRealizadas: "8-12 consultas realizadas/semana",
      fechamentos: "3-4 tratamentos fechados/semana",
      ticketMedio: "R$ 3.000 - R$ 5.000"
    },

    mensais: {
      nome: "Meta Mensal",
      consultasAgendadas: "40-60 consultas/mês",
      consultasRealizadas: "32-48 consultas realizadas/mês",
      fechamentos: "12-18 tratamentos fechados/mês",
      faturamento: "R$ 36.000 - R$ 90.000"
    }
  },

  // ========================================
  // CHECKLIST DIÁRIO DO COMERCIAL
  // ========================================
  checklistDiario: {
    titulo: "Checklist Diário do Comercial",

    manha: [
      "✅ Revisar agenda do dia",
      "✅ Confirmar consultas do dia via WhatsApp",
      "✅ Responder leads novos (< 2h)",
      "✅ Enviar follow-ups agendados",
      "✅ Contatar no-shows do dia anterior"
    ],

    tarde: [
      "✅ Follow-up de consultas realizadas pela manhã",
      "✅ Abordagem Comercial 2 para pós-consulta (primeiras 48h)",
      "✅ Responder leads que retornaram",
      "✅ Confirmar consultas do dia seguinte",
      "✅ Atualizar CRM com status de cada lead"
    ],

    noite: [
      "✅ Revisar metas do dia (agendamentos, fechamentos)",
      "✅ Planejar follow-ups do dia seguinte",
      "✅ Identificar leads que precisam de atenção urgente",
      "✅ Registrar aprendizados e objeções comuns do dia"
    ]
  },

  // ========================================
  // SISTEMA DE SCORING DE LEADS
  // ========================================
  scoringLeads: {
    titulo: "Sistema de Scoring de Leads",

    leadQuente: {
      nome: "Lead Quente (80-100 pontos)",
      caracteristicas: [
        "Respondeu em menos de 2h",
        "Fez perguntas sobre preço ou agendamento",
        "Mencionou urgência ou sofrimento atual",
        "Já tentou outros tratamentos",
        "Tem condição financeira aparente"
      ],
      acao: "PRIORIDADE MÁXIMA - Agendar consulta imediatamente",
      tempoResposta: "< 1 hora"
    },

    leadMorno: {
      nome: "Lead Morno (50-79 pontos)",
      caracteristicas: [
        "Respondeu, mas está avaliando",
        "Fez perguntas sobre o processo",
        "Demonstrou interesse moderado",
        "Não mencionou urgência clara",
        "Pode ter objeções de preço"
      ],
      acao: "ALTA PRIORIDADE - Educar, criar urgência, usar gatilhos",
      tempoResposta: "< 2 horas"
    },

    leadFrio: {
      nome: "Lead Frio (0-49 pontos)",
      caracteristicas: [
        "Não respondeu ou respondeu tarde",
        "Respostas curtas e vagas",
        "Sem demonstração clara de interesse",
        "Pode estar 'só pesquisando'",
        "Não tem urgência aparente"
      ],
      acao: "MÉDIA PRIORIDADE - Follow-up estratégico e persistente",
      tempoResposta: "< 4 horas"
    }
  },

  // ========================================
  // ANÁLISE DE PERFORMANCE
  // ========================================
  analisePerformance: {
    titulo: "Como Analisar sua Performance",

    semanalmente: [
      "Compare suas métricas com as metas estabelecidas",
      "Identifique onde está sua maior perda no funil",
      "Analise quais scripts/abordagens estão funcionando melhor",
      "Revise objeções mais comuns e refine respostas",
      "Ajuste estratégia de follow-up conforme resultados"
    ],

    mensalmente: [
      "Calcule seu ticket médio e compare com meta",
      "Analise taxa de conversão geral e por perfil clínico",
      "Identifique padrões de leads que mais convertem",
      "Revise tempo médio de venda e busque otimizar",
      "Celebre conquistas e defina metas para próximo mês"
    ],

    principaisGargalos: {
      taxaRespostaBaixa: "Problema: Primeira mensagem não chama atenção → Solução: Personalize mais, use contexto",
      taxaAgendamentoBaixa: "Problema: Lead interessado mas não agenda → Solução: Use escassez, facilite processo",
      taxaNoShowAlta: "Problema: Lead agenda mas não comparece → Solução: Confirme mais, crie vínculo antes",
      taxaConversaoBaixa: "Problema: Consulta realizada mas não fecha → Solução: Atue rápido (48h), use Comercial 2"
    }
  },

  // ========================================
  // BENCHMARKS DO MERCADO
  // ========================================
  benchmarksMercado: {
    titulo: "Benchmarks do Mercado de Saúde e Estética",

    taxaConversaoConsulta: {
      mercado: "15-25%",
      cabeloeSaude: "30%+",
      analise: "Nossa meta está acima da média do mercado, refletindo a qualidade da abordagem consultiva"
    },

    taxaNoShow: {
      mercado: "30-40%",
      cabeloeSaude: "≤20%",
      analise: "No-show é comum em clínicas, mas com processos adequados conseguimos reduzir significativamente"
    },

    ticketMedio: {
      mercado: "R$ 2.000 - R$ 4.000",
      cabeloeSaude: "R$ 3.000 - R$ 5.000",
      analise: "Ticket médio reflete tratamentos personalizados e acompanhamento contínuo"
    },

    prazoMedioVenda: {
      mercado: "20-30 dias",
      cabeloeSaude: "≤10 dias",
      analise: "Ciclo de venda curto devido à abordagem ágil e gatilhos de urgência bem aplicados"
    }
  }
};

export default indicadores;
