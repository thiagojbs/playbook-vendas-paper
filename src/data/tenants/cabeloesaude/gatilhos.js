// Gatilhos de Venda e Estratégias de Escassez - Cabelo & Saúde
// Baseado no Módulo 5 do Playbook 2025

export const gatilhos = {
  metadata: {
    titulo: "Gatilhos de Venda e Estratégias de Escassez",
    descricao: "Técnicas éticas para encurtar o ciclo de decisão e aumentar conversão",
    versao: "1.0.0",
    dataAtualizacao: "2026-01-27"
  },

  // ========================================
  // CONCEITO DE ESCASSEZ
  // ========================================
  conceito: {
    titulo: "O que é escassez e por que ela funciona",
    descricao: "A escassez é um dos gatilhos mentais mais poderosos em vendas. Ela se baseia no princípio psicológico de que as pessoas valorizam mais aquilo que está em falta ou prestes a acabar. Quando usamos esse gatilho de forma ética e verdadeira, encurtamos o ciclo de decisão do paciente, principalmente daqueles que já estão propensos a comprar, mas adiam por insegurança ou indecisão.",

    fontesDepoder: [
      {
        titulo: "Percepção de valor",
        descricao: "Aquilo que é mais difícil de conseguir é percebido como mais valioso. Se há poucos horários, poucas vagas ou um bônus limitado, o valor percebido da oportunidade aumenta."
      },
      {
        titulo: "Medo de perder (FOMO)",
        descricao: "Quando uma oportunidade está prestes a acabar, as pessoas sentem que estão perdendo liberdade de escolha. Essa dor da perda é mais intensa do que o prazer do ganho."
      }
    ],

    principioEtico: "IMPORTANTE: Use escassez real, nunca artificial. Mentir sobre disponibilidade quebra confiança e prejudica a marca."
  },

  // ========================================
  // ESCASSEZ - CONSULTAS
  // ========================================
  escassezConsulta: {
    categoria: "Consultas",
    emoji: "📅",

    fatos: [
      "Cada consulta tem duração média de 1h a 1h30",
      "Abordagem clínica individualizada, baseada em exames",
      "Dra. Franciele acompanha pessoalmente os pacientes durante todo o tratamento",
      "Isso limita a capacidade de novos atendimentos",
      "Apenas 5 consultas por dia",
      "Horários fixos: 09:00, 10h30, 14:30, 16h30 e 18h30",
      "Agendas preenchidas com semanas de antecedência",
      "Horários de fim de tarde são os mais disputados"
    ],

    scripts: [
      {
        situacao: "Lead interessado, mas hesitante",
        texto: "A Dra. Franciele só realiza 5 consultas por dia porque cada caso exige um diagnóstico detalhado e acompanhamento personalizado. Hoje, só temos uma vaga no horário das 16h30 — quer que eu reserve pra você agora antes que feche?"
      },
      {
        situacao: "Lead pergunta sobre disponibilidade",
        texto: "Para essa semana, já temos apenas 2 horários disponíveis. A agenda da Dra. costuma fechar com 2 semanas de antecedência, principalmente os horários mais pedidos."
      },
      {
        situacao: "Lead quer agendar para daqui 1 mês",
        texto: "Posso te colocar na lista de espera, mas a agenda de [mês] já está praticamente cheia. Se abrir algum cancelamento, eu te aviso. Mas sinceramente, se você já está decidida, seria melhor garantir um horário ainda essa semana — porque quanto mais tempo passa, mais os folículos podem se atrofiar."
      }
    ],

    dicasDeUso: [
      "Sempre mencione o número real de vagas disponíveis",
      "Use urgência relacionada à saúde capilar, não só à agenda",
      "Ofereça horários alternativos se o preferido estiver cheio",
      "Reforce que a Dra. prioriza qualidade sobre quantidade"
    ]
  },

  // ========================================
  // ESCASSEZ - TERAPIAS CAPILARES
  // ========================================
  escassezTerapias: {
    categoria: "Terapias Capilares",
    emoji: "💆",

    fatos: [
      "Agenda de terapias quase sempre lotada",
      "Máximo de 10 atendimentos por dia",
      "Horários de fim de tarde geralmente indisponíveis",
      "Pacientes que postergam podem esperar semanas para começar"
    ],

    scripts: [
      {
        situacao: "Paciente quer começar terapias",
        texto: "Os horários mais disputados já estão bloqueados e os pacientes que esperam muito acabam tendo que adiar o início do tratamento. Se quiser, consigo te encaixar ainda essa semana no meio da tarde, mas preciso confirmar agora."
      },
      {
        situacao: "Paciente hesita em iniciar",
        texto: "Olha, vou ser sincera: nossa agenda de terapias está bem cheia. Se você deixar para decidir depois, pode ser que precise esperar 2-3 semanas para conseguir horário. E nesse tempo, seu couro cabeludo continua sem o estímulo necessário."
      }
    ]
  },

  // ========================================
  // ESCASSEZ - BÔNUS E CONDIÇÕES ESPECIAIS
  // ========================================
  bonusCondicoes: {
    categoria: "Bônus e Condições Especiais",
    emoji: "🎁",

    opcao1: {
      nome: "Bônus para Agendamento Imediato (Primeira Oferta)",
      bonus: "Sessão de terapia capilar intensiva gratuita",
      regras: "Válido apenas para agendamentos feitos no mesmo dia da conversa",
      quando: "Leads que estão na zona de indecisão",

      scripts: [
        {
          situacao: "Lead está decidindo",
          texto: "Agendando a consulta hoje, você ganha uma sessão de terapia capilar intensiva gratuita — um presente nosso para quem decide cuidar do cabelo com a gente ainda esse mês. Pode te incluir nessa condição?"
        },
        {
          situacao: "Lead quer pensar mais",
          texto: "Entendo que você quer avaliar. Só te aviso que esse bônus da terapia gratuita vale só pra quem agenda ainda hoje. Amanhã eu não consigo mais garantir, tá?"
        }
      ]
    },

    opcao2: {
      nome: "Condição de Parcelamento Especial (Segunda Oferta)",
      condicao: "Parcelamento via carnê, Pix parcelado ou recorrência mensal",
      regras: "Só após aprovação interna (gatilho de autoridade + escassez)",
      quando: "Pacientes que já passaram pela consulta mas não fecharam o tratamento",

      scripts: [
        {
          situacao: "Pós-consulta, paciente não fechou",
          texto: "Olha, o financeiro liberou uma condição especial só para quem já passou em consulta: parcelar diretamente com a clínica sem precisar usar o cartão. É algo que liberamos pontualmente para quem está realmente decidido. Quer que eu veja se consigo manter essa condição pra você até amanhã?"
        },
        {
          situacao: "Objeção de preço após consulta",
          texto: "Deixa eu verificar aqui... consegui uma aprovação especial do financeiro pra você. Posso dividir em até 6x sem juros, direto com a gente. Mas preciso da sua confirmação hoje, porque amanhã a condição pode mudar. Consegue fechar hoje?"
        }
      ]
    }
  },

  // ========================================
  // GATILHOS EMOCIONAIS
  // ========================================
  gatilhosEmocionais: {
    titulo: "Gatilhos emocionais para usar na conversa",

    tempoSofrimento: {
      nome: "Gatilho do tempo de sofrimento",
      emoji: "⏳",
      quando: "Lead menciona que está com o problema há muito tempo",
      exemplos: [
        "Você comentou que está há 3 anos com queda… já imaginou como estaria seu cabelo hoje se tivesse começado a tratar lá atrás?",
        "Quantos anos mais você quer esperar antes de fazer algo de verdade pelo seu cabelo?",
        "Cada dia que passa sem tratamento é um dia a menos de resultado. Você já esperou demais, não acha?"
      ]
    },

    progressaoNegativa: {
      nome: "Gatilho da progressão negativa",
      emoji: "📉",
      quando: "Lead está procrastinando a decisão",
      exemplos: [
        "A cada mês sem iniciar o tratamento, a densidade dos fios tende a reduzir ainda mais. Em muitos casos, isso pode se tornar irreversível.",
        "O que hoje é reversível pode não ser daqui a 6 meses. A alopecia androgenética é progressiva.",
        "Quanto mais você espera, mais folículos entram em atrofia. E folículo atrofiado não volta mais."
      ]
    },

    memoriaVisual: {
      nome: "Gatilho da memória visual (autoimagem)",
      emoji: "🪞",
      quando: "Lead menciona como o cabelo era antes",
      exemplos: [
        "Lembra de como era seu cabelo antes da queda? Tem alguma foto que represente esse momento? Vamos trabalhar pra te aproximar disso novamente.",
        "Você se olha no espelho e se reconhece? Ou sente que algo da sua essência se perdeu junto com o cabelo?",
        "Imagina você daqui a 6 meses se olhando no espelho e vendo um cabelo mais cheio, mais forte, mais parecido com o que você lembra. Como você se sentiria?"
      ]
    },

    provaFisica: {
      nome: "Gatilho da prova física",
      emoji: "🧪",
      quando: "Durante ou após a consulta",
      exemplos: [
        "A entrega da coleta de fios é um divisor de águas. Quando você ver a quantidade real de fios perdidos, vai entender por que adiar pode sair caro para sua autoestima e saúde capilar.",
        "Vamos fazer uma tricoscopia e você vai ver com os próprios olhos o estado dos seus folículos. Às vezes a gente não percebe a gravidade até ver de perto.",
        "Os exames não mentem. Se tem miniaturização, o tempo está contra você."
      ]
    },

    estatisticoAutoridade: {
      nome: "Gatilho estatístico / autoridade",
      emoji: "📊",
      quando: "Para validar a decisão de tratamento",
      exemplos: [
        "Hoje, mais de 80% dos nossos pacientes iniciam o tratamento após a primeira consulta porque entendem que não é só estética, é saúde.",
        "Pacientes que começam o tratamento nos primeiros 3 meses de queda têm 90% mais chance de recuperação total.",
        "A Dra. Franciele já atendeu mais de 2.000 casos de queda capilar. Ela sabe exatamente o que funciona e o que não funciona."
      ]
    },

    socialProof: {
      nome: "Gatilho de prova social",
      emoji: "👥",
      quando: "Lead está inseguro sobre resultados",
      exemplos: [
        "Recebemos pacientes todos os dias com o mesmo quadro que o seu. E a maioria começa a ver melhora já nos primeiros 3 meses.",
        "Temos várias pacientes que chegaram aqui se sentindo exatamente como você — e hoje voltaram a ter autoestima e confiança.",
        "A nossa sala de espera está sempre cheia. Isso não é por acaso. As pessoas voltam porque funciona."
      ]
    },

    reciprocidade: {
      nome: "Gatilho de reciprocidade",
      emoji: "🤝",
      quando: "Após dar muito valor na conversa",
      exemplos: [
        "Olha, eu já te passei bastante informação aqui. Agora preciso saber: você está realmente pronta pra começar ou ainda tem alguma dúvida?",
        "Dei o meu melhor pra te explicar tudo com clareza. Agora é com você: quer que eu reserve uma vaga ou prefere esperar mais um pouco?",
        "Estou aqui desde [horário] te ajudando a entender seu caso. Agora me diz: o que te impede de dar esse passo hoje?"
      ]
    },

    compromissoCoerencia: {
      nome: "Gatilho de compromisso e coerência",
      emoji: "✅",
      quando: "Lead já afirmou que quer tratar",
      exemplos: [
        "Você mesma disse que quer recuperar seu cabelo, certo? Então vamos fazer isso acontecer agora.",
        "Se você já sabe que precisa tratar, por que continuar adiando?",
        "Você me disse que isso está te incomodando muito. Se incomoda tanto assim, por que não começar agora?"
      ]
    }
  },

  // ========================================
  // COMBINAÇÕES PODEROSAS
  // ========================================
  combinacoes: {
    titulo: "Combinações Poderosas de Gatilhos",

    exemplo1: {
      nome: "Escassez + Tempo de Sofrimento + Progressão Negativa",
      script: "Você me disse que está há 2 anos com queda e que já tentou várias coisas sem sucesso. Aqui na clínica, a gente trata isso de forma séria e personalizada. Mas te adianto: só temos 1 vaga disponível essa semana. E a cada semana que passa sem tratamento, mais folículos entram em atrofia. Você quer continuar esperando ou quer garantir essa vaga agora?"
    },

    exemplo2: {
      nome: "Bônus + Prova Social + Autoridade",
      script: "Olha, vou te fazer uma proposta: se você agendar ainda hoje, eu consigo liberar uma sessão de terapia capilar gratuita pra você — isso é um bônus que a gente dá pra quem decide começar logo. E posso te garantir: 80% das nossas pacientes começam o tratamento na primeira consulta porque entendem que não dá pra esperar. A Dra. Franciele vai te mostrar exatamente o que está acontecendo com seu cabelo. Posso te colocar na agenda?"
    },

    exemplo3: {
      nome: "Memória Visual + Compromisso + Escassez",
      script: "Você me mostrou aquela foto de como era seu cabelo antes. Imagina voltar a ter aquele volume, aquele brilho. É possível sim, mas precisa começar agora. Tenho uma vaga amanhã às 14h30 — é uma das últimas da semana. Depois disso, só semana que vem. Você quer esperar ou quer dar esse passo amanhã mesmo?"
    }
  },

  // ========================================
  // QUANDO NÃO USAR ESCASSEZ
  // ========================================
  quandoNaoUsar: {
    titulo: "Quando NÃO usar escassez",
    situacoes: [
      "Lead claramente não tem condição financeira (respeite o momento)",
      "Lead acabou de sofrer luto ou trauma recente",
      "Lead está em tratamento psicológico intenso",
      "Lead já disse explicitamente que não pode agora",
      "Você não tem certeza da disponibilidade real (nunca minta)"
    ],
    principio: "Escassez é para acelerar decisão de quem JÁ QUER, não para pressionar quem NÃO PODE."
  },

  // ========================================
  // CHECKLIST DE USO ÉTICO
  // ========================================
  checklistEtico: {
    titulo: "Checklist de Uso Ético de Gatilhos",
    itens: [
      "✅ A escassez mencionada é real?",
      "✅ O bônus oferecido está aprovado?",
      "✅ Estou usando gatilhos para ajudar, não para manipular?",
      "✅ O paciente realmente se beneficia do tratamento?",
      "✅ Estou respeitando o momento emocional do lead?",
      "✅ Minhas afirmações são verdadeiras e verificáveis?",
      "✅ Não estou criando pressão excessiva ou desconfortável?"
    ]
  }
};

export default gatilhos;
