// Playbook de Vendas 2025 - Cabelo & Saúde
// Versão Completa com 11 Módulos Especializados
// Baseado no Playbook Original 2025

// Importações dos arquivos especializados
import { perfisLead } from './perfis-lead.js';
import { perfisClinicos } from './perfis-clinicos.js';
import { indicadores } from './indicadores.js';
import { gatilhos } from './gatilhos.js';
import { MODULOS_PLAYBOOK, FRASES_IMPACTO } from './scripts.js';
import { objecoes } from './objecoes.js';

// ========================================
// ESTRUTURA PRINCIPAL DO PLAYBOOK
// ========================================
export const PLAYBOOK_2025 = {
  metadata: {
    versao: "2.0.0",
    dataAtualizacao: "2026-01-28",
    totalModulos: 11,
    descricao: "Playbook completo de vendas consultivas para tratamento capilar especializado"
  },

  // ========================================
  // MÓDULOS DO PLAYBOOK (0-10)
  // ========================================
  modulos: [
    {
      numero: 0,
      titulo: "Fundamentos do Comercial Consultivo",
      emoji: "🎯",
      descricao: "Mindset, princípios e abordagem consultiva para vendas em saúde capilar",

      principios: {
        titulo: "Os 3 Pilares do Comercial Consultivo",
        pilares: [
          {
            numero: 1,
            nome: "Você não vende tratamento, você RESOLVE PROBLEMAS",
            explicacao: "O paciente não quer comprar um protocolo capilar. Ele quer voltar a se sentir bem consigo mesmo, recuperar autoestima, parar de sofrer com a queda.",
            aplicacao: "Foque sempre na DOR e no DESEJO do paciente, não no produto/serviço."
          },
          {
            numero: 2,
            nome: "Você não convence, você EDUCA",
            explicacao: "Pacientes bem informados tomam decisões melhores e mais rápidas. Seu papel é ensinar, não pressionar.",
            aplicacao: "Use dados, lógica, ciência. Seja professoral, não vendedor."
          },
          {
            numero: 3,
            nome: "Você não agenda consulta, você OFERECE DIAGNÓSTICO",
            explicacao: "Consulta parece burocracia. Diagnóstico parece solução. Mude o frame mental.",
            aplicacao: "Sempre posicione a consulta como 'avaliação completa', 'investigação profunda', 'diagnóstico real'."
          }
        ]
      },

      mindsetVencedor: {
        titulo: "Mindset do Comercial Vencedor",
        crencas: [
          "Não tenho medo de perder lead — tenho medo de não ajudar quem precisa",
          "Objeção não é rejeição — é pedido de mais informação",
          "Follow-up não é perturbação — é persistência estratégica",
          "Preço alto não afasta cliente certo — afasta cliente errado",
          "Resultado do paciente é meu resultado — somos parceiros"
        ]
      },

      errosComuns: [
        "❌ Falar demais e ouvir de menos",
        "❌ Soltar preço antes de construir valor",
        "❌ Prometer resultado sem diagnóstico",
        "❌ Desistir após 1-2 follow-ups",
        "❌ Tratar lead frio igual lead quente",
        "❌ Não usar gatilhos mentais (escassez, urgência, autoridade)",
        "❌ Aceitar 'vou pensar' sem investigar a objeção real"
      ]
    },

    {
      numero: 1,
      titulo: "Abertura e Qualificação Inicial",
      emoji: "👋",
      descricao: "Primeiras mensagens, rapport inicial e identificação rápida do perfil do lead",
      tempoEstimado: "Primeiras 2-5 mensagens",

      objetivo: "Criar conexão humana, identificar perfil do lead (Visual/Emocional/Racional) e qualificar interesse real",

      scripts: MODULOS_PLAYBOOK.abertura.scripts,

      estruturaConversa: {
        passo1: {
          titulo: "ABERTURA HUMANIZADA",
          descricao: "Use áudio ou mensagem personalizada",
          exemplo: MODULOS_PLAYBOOK.abertura.scripts[0].mensagem,
          gatilhos: ["Humanização", "Curiosidade", "Pergunta aberta"]
        },

        passo2: {
          titulo: "IDENTIFICAÇÃO DE PERFIL",
          descricao: "Observe as primeiras respostas para identificar se é Visual, Emocional ou Racional",
          comoIdentificar: {
            visual: perfisLead.visual.sinaisIdentificacao,
            emocional: perfisLead.emocional.sinaisIdentificacao,
            racional: perfisLead.racional.sinaisIdentificacao
          }
        },

        passo3: {
          titulo: "QUALIFICAÇÃO RÁPIDA",
          descricao: "Faça 2-3 perguntas estratégicas para entender:",
          perguntas: [
            "Há quanto tempo você percebeu o problema?",
            "O que mais te incomoda hoje?",
            "Já tentou tratar antes?"
          ]
        }
      },

      dicasImportantes: [
        "SEMPRE use o nome do lead (cria conexão)",
        "Prefira áudio na primeira mensagem (humaniza)",
        "Não fale de preço nesta fase",
        "Não prometa resultado sem diagnóstico",
        "Identifique o perfil para adaptar linguagem depois"
      ]
    },

    {
      numero: 2,
      titulo: "Mapeamento da Dor e Criação de Vínculo",
      emoji: "🎯",
      descricao: "Aprofundamento da dor, criação de conexão emocional e posicionamento da clínica",
      tempoEstimado: "5-15 mensagens",

      objetivo: "Fazer o lead SENTIR a gravidade do problema e DESEJAR a solução. Criar urgência e autoridade.",

      estruturaCompleta: {
        bloco1: {
          titulo: "AS 5 PERGUNTAS DE OURO",
          perguntas: MODULOS_PLAYBOOK.mapeamentoDor.scripts.slice(0, 5),
          objetivo: "Fazer o lead reviver a dor e projetar o futuro desejado"
        },

        bloco2: {
          titulo: "RESPOSTAS QUE EDUCAM",
          descricao: "Após cada resposta do lead, eduque com autoridade",
          scripts: MODULOS_PLAYBOOK.mapeamentoDor.scripts.slice(5, 11),
          gatilhos: ["Educação", "Autoridade", "Urgência clínica"]
        },

        bloco3: {
          titulo: "BIBLIOTECA DE PERGUNTAS ABERTAS",
          descricao: "Use conforme o perfil identificado",
          perguntas: MODULOS_PLAYBOOK.mapeamentoDor.perguntasAbertas
        }
      },

      frasesImpacto: FRASES_IMPACTO,

      transicaoParaAgendamento: {
        titulo: "Como fazer a transição natural para agendamento",
        estrutura: `Após mapear a dor:

"[NOME], pelo que você me contou, seu caso realmente merece uma investigação profunda.

Não dá pra eu te dar um diagnóstico assim, só pela conversa — seria irresponsável da minha parte.

Aqui na clínica, a Dra. Franciele faz uma AVALIAÇÃO TRICOLÓGICA COMPLETA:
• Tricoscopia (análise microscópica do couro cabeludo)
• Coleta de amostras de fios
• Investigação de causas internas (hormonal, nutricional)
• Protocolo 100% personalizado

A avaliação dura até 1h30. Não é consulta rápida — é investigação de verdade.

Tenho [DIA] às [HORÁRIO] e [DIA] às [HORÁRIO]. Qual melhor pra você?"`,

        gatilhosUsados: [
          "Escassez (horários limitados)",
          "Autoridade (Dra. Franciele, equipamentos)",
          "Detalhamento (1h30, tricoscopia)",
          "Personalização (protocolo sob medida)",
          "Call to action direto"
        ]
      }
    },

    {
      numero: 3,
      titulo: "Agendamento e Confirmação",
      emoji: "📅",
      descricao: "Técnicas para agendar consulta, reduzir no-show e criar expectativa positiva",
      tempoEstimado: "2-5 mensagens + confirmação",

      objetivo: "Garantir agendamento, reduzir risco de no-show e criar vínculo emocional pré-consulta",

      fluxoAgendamento: {
        passo1: {
          titulo: "OFERECER HORÁRIOS ESPECÍFICOS",
          descricao: "Nunca pergunte 'quando você pode'. Ofereça 2-3 opções concretas.",
          exemplo: `"Tenho disponível:\n• Terça (12/03) às 14h30\n• Quinta (14/03) às 16h30\n• Sábado (16/03) às 10h\n\nQual melhor pra você?"`,
          gatilho: "Escassez + Facilitação de decisão"
        },

        passo2: {
          titulo: "CRIAR ESCASSEZ REAL",
          descricao: "Use os fatos reais sobre a agenda limitada",
          fatos: gatilhos.escassezConsulta.fatos,
          scripts: gatilhos.escassezConsulta.scripts
        },

        passo3: {
          titulo: "CONFIRMAR PRESENÇA",
          descricao: "Mensagem de confirmação estruturada",
          template: `"[NOME], sua consulta está confirmada! 💚

📅 Data: [DIA/MÊS] ([DIA DA SEMANA])
⏰ Horário: [HORÁRIO]
📍 Local: [ENDEREÇO COMPLETO]
👩‍⚕️ Com: Dra. Franciele

✅ *Orientações importantes:*
• Não lave o cabelo no dia da consulta (para análise da oleosidade natural)
• Traga exames de sangue recentes se tiver (hemograma, ferritina, vitaminas)
• Chegue 10 min antes para preencher ficha
• Separe suas dúvidas para tirar com a Dra.

Qualquer imprevisto, me avisa com antecedência que a gente reagenda sem problema!

Nos vemos em breve! 🌿"`
        },

        passo4: {
          titulo: "CONFIRMAÇÃO 24H ANTES",
          descricao: "Mensagem de lembrete e reforço de valor",
          template: `"Oi [NOME]! 💚

Amanhã é o grande dia da sua avaliação tricológica!

⏰ [HORÁRIO]
📍 [ENDEREÇO]

Lembra das orientações:
✅ Não lavar o cabelo hoje
✅ Trazer exames se tiver
✅ Chegar 10 min antes

Estou ansiosa pra te conhecer pessoalmente! Até amanhã! 🌿"`
        }
      },

      estrategiasReducaoNoShow: {
        titulo: "Como reduzir no-show de 40% para 20%",
        tecnicas: indicadores.metricasNoShow.taxaNoShow.dicasReducao
      }
    },

    {
      numero: 4,
      titulo: "Perfis Clínicos e Respostas Personalizadas",
      emoji: "🧬",
      descricao: "Identificação de perfis clínicos e scripts especializados por condição",
      tempoEstimado: "Contínuo (usar ao longo da conversa)",

      objetivo: "Adaptar linguagem, scripts e abordagem conforme o diagnóstico clínico do paciente",

      perfisDisponiveis: {
        alopeciaAndrogenetica: perfisClinicos.alopeciaAndrogenetica,
        efluvioTelogeno: perfisClinicos.efluvioTelogeno,
        foliculite: perfisClinicos.foliculite,
        psoriase: perfisClinicos.psoriase,
        dermatiteSeborreica: perfisClinicos.dermatiteSeborreica,
        quadroMisto: perfisClinicos.quadroMisto
      },

      comoUsar: {
        titulo: "Como identificar e usar os perfis clínicos",
        passos: [
          "1️⃣ Durante a conversa, identifique palavras-chave do lead (coceira, descamação, oleosidade, queda intensa, etc)",
          "2️⃣ Busque o perfil clínico correspondente",
          "3️⃣ Use o 'scriptCompleto' para educar o lead sobre a condição",
          "4️⃣ Adapte a linguagem: mais técnica para perfil Racional, mais emocional para perfil Emocional",
          "5️⃣ Reforce a necessidade de diagnóstico profissional (nunca diagnostique pelo WhatsApp)"
        ]
      },

      exemploUso: `// Lead diz: "Meu couro cabeludo coça muito e tem caspa"

// Você identifica: provável Dermatite Seborreica
// Busca: perfisClinicos.dermatiteSeborreica
// Usa o script educativo:

"[NOME], pelo que você descreveu (coceira + descamação), pode ser que você tenha dermatite seborreica — que é uma inflamação crônica do couro cabeludo.

Essa condição deixa o ambiente hostil pros fios crescerem. É como tentar plantar numa terra inflamada.

Aqui na clínica, a gente trata não só a dermatite, mas também fortalece os fios e previne miniaturização.

Quer que eu agende uma avaliação pra Dra. investigar seu caso?"`
    },

    {
      numero: 5,
      titulo: "Gatilhos Mentais e Escassez Estratégica",
      emoji: "⚡",
      descricao: "Uso ético de gatilhos para encurtar ciclo de decisão",
      tempoEstimado: "Aplicar ao longo de toda conversa",

      objetivo: "Acelerar decisão de leads que JÁ QUEREM, mas procrastinam por insegurança ou indecisão",

      gatilhosDisponiveis: gatilhos,

      principioEtico: gatilhos.conceito.principioEtico,

      gatilhosPorMomento: {
        duranteQualificacao: {
          usar: ["Escassez de consultas", "Tempo de sofrimento", "Progressão negativa"],
          exemplos: [
            gatilhos.gatilhosEmocionais.tempoSofrimento.exemplos[0],
            gatilhos.escassezConsulta.scripts[0].texto
          ]
        },

        posConsulta: {
          usar: ["Bônus exclusivo", "Escassez de terapias", "Janela de 48h"],
          exemplos: [
            gatilhos.bonusCondicoes.opcao1.scripts[0].texto,
            "Olha, [NOME], consegui aprovar um bônus especial pra você: uma sessão de terapia intensiva gratuita se fechar ainda hoje. É algo que a gente libera só pra quem já passou em consulta. Posso confirmar pra você?"
          ]
        },

        leadIndeciso: {
          usar: ["Reciprocidade", "Compromisso e coerência", "Autoridade"],
          exemplos: [
            gatilhos.gatilhosEmocionais.reciprocidade.exemplos[1],
            gatilhos.gatilhosEmocionais.compromissoCoerencia.exemplos[0]
          ]
        }
      },

      combinacoesPoderosas: gatilhos.combinacoes,

      quandoNaoUsar: gatilhos.quandoNaoUsar,

      checklistEtico: gatilhos.checklistEtico
    },

    {
      numero: 6,
      titulo: "Follow-Up Estratégico e Reengajamento",
      emoji: "🔄",
      descricao: "Sistema de follow-up persistente e variações de mensagens",
      tempoEstimado: "Contínuo (nunca desista antes de 5-7 tentativas)",

      objetivo: "Reengajar leads que esfriaram, manter relacionamento ativo e converter pelo cansaço da resistência",

      principioFundamental: {
        titulo: "A Lei das 7 Tentativas",
        descricao: "Estatisticamente, leads respondem entre a 3ª e 7ª tentativa. A maioria dos comerciais desiste na 2ª.",
        dados: indicadores.metricasFollowUp.numeroTentativasAteResposta
      },

      estruturaFollowUp: MODULOS_PLAYBOOK.followUp,

      variacoesDisponiveis: {
        total: 10,
        versoes: MODULOS_PLAYBOOK.followUp.variacoes,
        comoUsar: "Alterne entre tons: emocional → racional → urgência → social proof"
      },

      estrategiaAvancada: {
        titulo: "Estratégia de Follow-Up em 4 Ondas",

        onda1: {
          dias: "0-3 dias",
          tom: "Educacional e empático",
          usar: ["Follow-up 1.0", "Follow-up 1.1"],
          frequencia: "1 mensagem a cada 2 dias"
        },

        onda2: {
          dias: "4-7 dias",
          tom: "Urgência clínica",
          usar: ["Follow-up 1.2 (progressão)", "Follow-up 1.3 (gatilho tempo)"],
          frequencia: "1 mensagem a cada 3 dias"
        },

        onda3: {
          dias: "8-14 dias",
          tom: "Social proof + Escassez",
          usar: ["Follow-up 1.4 (outras pessoas)", "Follow-up 1.5 (agenda cheia)"],
          frequencia: "1 mensagem por semana"
        },

        onda4: {
          dias: "15-30 dias",
          tom: "Última tentativa + Oferta especial",
          usar: ["Follow-up 2.0 (mensagem final)"],
          frequencia: "Mensagem única de despedida"
        }
      },

      metricasSuccesso: indicadores.metricasFollowUp
    },

    {
      numero: 7,
      titulo: "Objeções e Contornos Avançados",
      emoji: "🛡️",
      descricao: "Sistema completo de tratamento de objeções em múltiplos blocos",
      tempoEstimado: "Conforme necessário durante conversa",

      objetivo: "Tratar TODAS as objeções com estrutura, lógica e empatia. Nunca aceitar objeção superficial.",

      estruturaGeral: objecoes.principiosGerais.estruturaPadrao,

      objecoesCompletas: {
        principais: [
          objecoes.valorConsulta,
          objecoes.vouPensar,
          objecoes.quemAtende,
          objecoes.examesLaboratoriais,
          objecoes.planoSaude,
          objecoes.jaPasseiMedicos,
          objecoes.jaUseiMedicamentos,
          objecoes.porqueConsulta,
          objecoes.soTonico,
          objecoes.retornoTempo,
          objecoes.soCasaPrimeiro
        ],

        casosEspeciais: [
          objecoes.casosEspeciais.consultaCara,
          objecoes.casosEspeciais.calvicieAvancada
        ]
      },

      principios: objecoes.principiosGerais.regrasOuro,

      gatilhosMaisEficazes: objecoes.principiosGerais.gatilhosMaisEficazes,

      exemploUsoCompleto: `// Lead diz: "Vou pensar"

// Você NÃO aceita e investiga:

BLOCO 1 - Validação + Investigação:
"Eu entendo perfeitamente, [NOME]. É uma decisão importante mesmo. Mas me deixa te perguntar: quando você diz que precisa pensar, é sobre o valor? Sobre a agenda? Ou você ainda tem alguma dúvida se o tratamento vai funcionar no seu caso?"

// Lead revela: "É que está caro mesmo"

BLOCO 2 - Tratamento da objeção real (preço):
"Entendo. Olha, o valor realmente é um investimento. Mas aqui a gente trabalha com parcelamento facilitado — você consegue dividir sem comprometer seu orçamento. E sinceramente? Quanto você já investiu tentando resolver isso sozinha? Eu aposto que se somar tudo, já deu mais do que a consulta. A diferença é que aqui você vai ter resultado de verdade."

BLOCO 3 - Call to action direto:
"Olha, [NOME], eu não quero pressionar você. Mas vou te falar com sinceridade: as pessoas que dizem 'vou pensar' geralmente ficam pensando por meses… e o cabelo continua caindo. Tenho um horário quinta às 16h30. Posso te colocar? Pelo menos você sai daqui sabendo o que fazer."`
    },

    {
      numero: 8,
      titulo: "No-Show: Recuperação Estratégica",
      emoji: "🎯",
      descricao: "Protocolo de 5 blocos para recuperar leads que faltaram na consulta",
      tempoEstimado: "Ação imediata no mesmo dia do furo",

      objetivo: "Recuperar 50%+ dos no-shows, transformando frustração em nova oportunidade",

      dadosImportantes: {
        taxaNoShowMercado: indicadores.metricasNoShow.taxaNoShow.benchmark.mercado,
        taxaNoShowMeta: indicadores.metricasNoShow.taxaNoShow.meta,
        taxaRecuperacaoMeta: indicadores.metricasNoShow.taxaRecuperacaoNoShow.meta
      },

      protocoloCompleto: {
        titulo: "Os 5 Blocos de Recuperação de No-Show",
        descricao: "Sistema sequencial de abordagem — use os 5 blocos em sequência",

        blocos: MODULOS_PLAYBOOK.noShow.scripts,

        estruturaUso: `// AÇÃO IMEDIATA (no mesmo dia do furo):

1️⃣ Enviar BLOCO 1 (Abertura com calor + presente)
2️⃣ Se responder: enviar BLOCO 2 (Validação do bônus)
3️⃣ Se responder positivo: enviar BLOCO 3 (Oferta nova data)
4️⃣ Se hesitar: enviar BLOCO 4 (Urgência clínica)
5️⃣ Se ainda resistir: enviar BLOCO 5 (Última chamada)

⚠️ IMPORTANTE: Não aceite desculpa sem reagendar. Insista gentilmente até ter nova data confirmada.`
      },

      dicasRecuperacao: indicadores.metricasNoShow.taxaRecuperacaoNoShow.dicasMelhoria,

      errosEvitar: [
        "❌ Julgar ou cobrar o paciente pelo furo",
        "❌ Aceitar desculpa sem reagendar",
        "❌ Enviar mensagem fria e burocrática",
        "❌ Desistir após 1 tentativa",
        "❌ Não oferecer bônus real de recuperação"
      ]
    },

    {
      numero: 9,
      titulo: "Comercial 2: Pós-Consulta (Janela de Ouro)",
      emoji: "💰",
      descricao: "Abordagem comercial nas primeiras 48h após consulta (momento crítico de conversão)",
      tempoEstimado: "Primeiras 48h pós-consulta",

      objetivo: "Converter 40%+ dos pacientes pós-consulta em tratamento fechado, atuando na janela de decisão",

      conceitoJanelaOuro: {
        titulo: "Por que as primeiras 48h são críticas?",
        explicacao: "Após a consulta, o paciente está com 3 estados mentais simultâneos:",
        estados: [
          "1️⃣ CONSCIÊNCIA AMPLIADA - Viu os fios no microscópio, entendeu a gravidade real",
          "2️⃣ ESPERANÇA ATIVADA - Conheceu a solução, sabe que tem tratamento",
          "3️⃣ DECISÃO PENDENTE - Ainda não processou financeiro, está em zona de indecisão"
        ],
        acao: "Atuar NESTA JANELA, com os gatilhos certos, aumenta conversão em 300%"
      },

      metricas: indicadores.metricasComercial2,

      protocoloCompleto: {
        titulo: "Protocolo de Abordagem Pós-Consulta",

        timing: {
          ideal: "0-6 horas após consulta",
          maximo: "48 horas após consulta",
          critico: "Após 72h, conversão cai 60%"
        },

        estrutura: MODULOS_PLAYBOOK.comercial2.scripts,

        sequenciaTentativas: MODULOS_PLAYBOOK.comercial2.sequenciaTentativas
      },

      gatilhosPoderosos: {
        titulo: "Gatilhos Específicos para Pós-Consulta",
        usar: [
          gatilhos.gatilhosEmocionais.provaFisica,
          gatilhos.gatilhosEmocionais.progressaoNegativa,
          gatilhos.bonusCondicoes.opcao2
        ]
      },

      scriptsCompletos: MODULOS_PLAYBOOK.comercial2.scripts,

      dicasAvancadas: [
        "Use o diagnóstico específico ('seu caso de alopecia androgenética grau 3...')",
        "Mencione algo pessoal da consulta para criar conexão",
        "Ofereça parcelamento facilitado aprovado pelo financeiro",
        "Crie escassez real: horários de terapia lotando, bônus exclusivo por 48h",
        "Não tenha medo de ser direto: 'Você está dentro ou quer pensar mais?'"
      ]
    },

    {
      numero: 10,
      titulo: "Indicadores e Metas de Performance",
      emoji: "📊",
      descricao: "KPIs, métricas e sistema de acompanhamento de resultados",
      tempoEstimado: "Acompanhamento diário/semanal/mensal",

      objetivo: "Medir performance, identificar gargalos no funil e otimizar continuamente os resultados",

      estruturaCompleta: indicadores,

      metricasPrincipais: {
        funil: indicadores.metricasFunil,
        comercial2: indicadores.metricasComercial2,
        noShow: indicadores.metricasNoShow,
        followUp: indicadores.metricasFollowUp
      },

      metasIndividuais: indicadores.metasIndividuais,

      checklistDiario: indicadores.checklistDiario,

      scoringLeads: indicadores.scoringLeads,

      analisePerformance: indicadores.analisePerformance,

      benchmarksMercado: indicadores.benchmarksMercado,

      comoUsarIndicadores: {
        titulo: "Como usar os indicadores no dia a dia",
        passos: [
          "1️⃣ MANHÃ: Revisar metas do dia e priorizar leads quentes",
          "2️⃣ TARDE: Registrar interações e calcular métricas parciais",
          "3️⃣ NOITE: Analisar performance do dia e planejar próximo dia",
          "4️⃣ SEXTA: Fazer análise semanal completa e ajustar estratégias",
          "5️⃣ TODO MÊS: Calcular métricas mensais, comparar com metas, celebrar conquistas"
        ]
      },

      ferramentasRecomendadas: {
        planilha: "Google Sheets com template de KPIs",
        crm: "CRM básico ou Notion para gestão de leads",
        automacao: "WhatsApp Business para métricas de resposta"
      }
    }
  ],

  // ========================================
  // RECURSOS AUXILIARES
  // ========================================
  perfisLead: perfisLead,
  perfisClinicos: perfisClinicos,
  gatilhos: gatilhos,
  indicadores: indicadores,
  objecoes: objecoes,
  scripts: MODULOS_PLAYBOOK,
  frasesImpacto: FRASES_IMPACTO
};

// ========================================
// EXPORTS LEGADOS (compatibilidade)
// ========================================

// Para compatibilidade com código antigo
export const PROCESSO_VENDAS = {
  etapas: PLAYBOOK_2025.modulos.slice(1, 7).map((modulo, index) => ({
    numero: index + 1,
    titulo: modulo.titulo,
    descricao: modulo.descricao,
    acoes: modulo.estruturaConversa?.passo1
      ? Object.values(modulo.estruturaConversa).map(p => p.titulo)
      : [],
    tempo_estimado: modulo.tempoEstimado || 'Variável',
    dicas: modulo.dicasImportantes || []
  }))
};

export const SCRIPTS = {
  primeiro_contato: MODULOS_PLAYBOOK.abertura.scripts,
  qualificacao: MODULOS_PLAYBOOK.mapeamentoDor.scripts[0],
  agendamento_avaliacao: MODULOS_PLAYBOOK.abertura.scripts[1],
  followup_proposta: MODULOS_PLAYBOOK.followUp.scripts[0],
  reengajamento: MODULOS_PLAYBOOK.followUp.variacoes[0]
};

export const OBJECOES = [
  objecoes.valorConsulta,
  objecoes.vouPensar,
  objecoes.jaPasseiMedicos,
  objecoes.planoSaude,
  objecoes.jaUseiMedicamentos,
  objecoes.porqueConsulta
].map(obj => ({
  objecao: obj.objecao,
  resposta: obj.versaoPocket
}));

export const CHECKLIST_COMERCIAL = indicadores.checklistDiario.manha
  .concat(indicadores.checklistDiario.tarde)
  .concat(indicadores.checklistDiario.noite)
  .map(item => ({ item }));

export const DIFERENCIAIS = [
  {
    titulo: 'Tratamos a Causa, Não o Sintoma',
    descricao: 'Investigamos por que você está perdendo cabelo, não apenas tratamos superficialmente',
    icone: 'search'
  },
  {
    titulo: 'Especialização Tricológica',
    descricao: 'Dra. Franciele é especialista EXCLUSIVAMENTE em cabelo e couro cabeludo',
    icone: 'user-md'
  },
  {
    titulo: 'Diagnóstico Profundo',
    descricao: 'Tricoscopia completa + exames laboratoriais + avaliação hormonal e nutricional',
    icone: 'microscope'
  },
  {
    titulo: 'Protocolo 100% Personalizado',
    descricao: 'Cada paciente recebe tratamento específico baseado em seu diagnóstico único',
    icone: 'clipboard-list'
  },
  {
    titulo: 'Acompanhamento Mensal',
    descricao: 'Retornos regulares para ajustar protocolo e garantir evolução constante',
    icone: 'chart-line'
  },
  {
    titulo: 'Abordagem Integrativa',
    descricao: 'Tratamento externo (tópico) + interno (nutracêuticos, hormonal) + terapias em clínica',
    icone: 'heart'
  }
];

export const TIPOS_TRATAMENTO = [
  {
    nome: perfisClinicos.alopeciaAndrogenetica.nome,
    descricao: perfisClinicos.alopeciaAndrogenetica.explicacaoParaPaciente.split('\n')[0],
    sinais: perfisClinicos.alopeciaAndrogenetica.sintomas.slice(0, 3),
    abordagem: perfisClinicos.alopeciaAndrogenetica.objetivo
  },
  {
    nome: perfisClinicos.efluvioTelogeno.nome,
    descricao: perfisClinicos.efluvioTelogeno.explicacaoParaPaciente.split('\n')[0],
    sinais: perfisClinicos.efluvioTelogeno.sintomas.slice(0, 3),
    abordagem: perfisClinicos.efluvioTelogeno.objetivo
  },
  {
    nome: perfisClinicos.foliculite.nome,
    descricao: perfisClinicos.foliculite.explicacaoParaPaciente.split('\n')[0],
    sinais: perfisClinicos.foliculite.sintomas.slice(0, 3),
    abordagem: perfisClinicos.foliculite.objetivo
  },
  {
    nome: perfisClinicos.dermatiteSeborreica.nome,
    descricao: perfisClinicos.dermatiteSeborreica.explicacaoParaPaciente.split('\n')[0],
    sinais: perfisClinicos.dermatiteSeborreica.sintomas.slice(0, 3),
    abordagem: perfisClinicos.dermatiteSeborreica.objetivo
  }
];

export const LINKS_UTEIS = {
  site: 'https://www.cabeloesaude.com.br/',
  instagram: 'https://www.instagram.com/cabeloesaude/',
  agendamento: '',
  depoimentos: ''
};

// Export principal
export default PLAYBOOK_2025;
