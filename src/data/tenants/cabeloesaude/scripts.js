// Scripts Expandidos - Cabelo & Saúde
// Baseado no Playbook 2025 (2512 linhas)
// Organizados por módulo com 70+ scripts especializados

export const SCRIPTS_STATS = {
  total_scripts: '70+',
  modulos: '11',
  categorias: '8',
  taxa_conversao: '30%'
};

export const MODULOS_PLAYBOOK = {
  // ========================================
  // MÓDULO 1: ABERTURA E QUALIFICAÇÃO
  // ========================================
  abertura: {
    nome: 'Abertura e Qualificação',
    icone: 'user-plus',
    cor: '#10b981',
    descricao: 'Primeiro contato, qualificação inicial e identificação de perfil',
    objetivo: 'Criar rapport, identificar perfil (visual/emocional/racional) e mapear dor',
    tempo_ideal: 'Responder em < 2 horas',

    scripts: [
      {
        id: 'ab-1',
        titulo: 'Áudio Inicial de Abertura',
        tipo: 'principal',
        momento: 'Primeiro contato com lead novo',
        perfil: 'todos',
        formato: 'áudio',
        dica: 'Use tom acolhedor e enérgico. SEMPRE pergunte como o lead se sente',
        mensagem: `"Oi [NOME DO LEAD], meu nome é [SEU NOME], sou especialista aqui da Clínica Cabelo & Saúde, tudo bem com você? Antes de te passar o valor da consulta e como funcionam os nossos tratamentos, me conta: o que está acontecendo e como você se sente hoje com o seu cabelo?"`,
        encerramento: `"Pode ter certeza que a sua experiência aqui com a gente vai ser incrível."`,
        gatilhos: ['Humanização', 'Pergunta aberta', 'Foco na emoção'],
        resultadoEsperado: 'Lead compartilha sua dor e situação atual'
      },

      {
        id: 'ab-2',
        titulo: 'Perguntas de Qualificação Inicial',
        tipo: 'sequencia',
        momento: 'Logo após abertura',
        perfil: 'todos',
        dica: 'Use de 3-4 perguntas para entender o quadro. NÃO faça todas de uma vez',
        perguntas: [
          "Há quanto tempo você está com esse problema?",
          "Você percebe falhas nas laterais ou no meio do cabelo?",
          "Já tentou algum tipo de tratamento antes?",
          "Percebe se está piorando com o tempo?",
          "Tem alguma região do couro cabeludo que te incomoda mais?",
          "Como era seu cabelo antes de tudo isso?"
        ],
        objetivo: 'Mapear tipo de queda, tempo de evolução e tentativas anteriores',
        gatilhos: ['Sondagem', 'Histórico', 'Progressão']
      }
    ]
  },

  // ========================================
  // MÓDULO 2: MAPEAMENTO DA DOR
  // ========================================
  mapeamentoDor: {
    nome: 'Mapeamento da Dor',
    icone: 'heart-pulse',
    cor: '#f59e0b',
    descricao: '6 perguntas de validação + técnica espelho + apresentação de consulta',
    objetivo: 'Aumentar consciência do problema e mostrar que tem solução',
    tempo_ideal: 'Após qualificação inicial',

    scripts: [
      {
        id: 'md-1',
        titulo: 'Pergunta 1: Como era o seu cabelo antes?',
        tipo: 'validacao',
        momento: 'Durante mapeamento',
        perfil: 'todos',
        pergunta: "Como era o seu cabelo antes de acontecer esse problema?",
        resposta: `"Esse tipo de mudança que você está me relatando é um sinal importante de alerta. Muitas vezes, o fio começa a afinar e encurtar — o que a gente chama de miniaturização. Se isso não for tratado, o folículo pode perder a capacidade de produzir novos fios, o que pode tornar o processo irreversível. Por isso, quanto antes for investigado, maiores as chances de recuperar a força e a densidade natural do cabelo. E a boa notícia é que, com a avaliação clínica e o protocolo certo, é possível reverter isso."`,
        objetivo: 'Gerar urgência através da consciência de miniaturização',
        palavrasChave: ['miniaturização', 'irreversível', 'recuperar', 'protocolo certo'],
        gatilhos: ['Urgência', 'Educação', 'Esperança']
      },

      {
        id: 'md-2',
        titulo: 'Pergunta 2: Além da queda, o cabelo está mais fino?',
        tipo: 'validacao',
        momento: 'Durante mapeamento',
        perfil: 'todos',
        pergunta: "Além da queda de cabelo, você percebe que o seu cabelo está mais fino?",
        resposta: `"Se o seu cabelo está ficando mais fino ou 'ralo', isso pode ser um sinal de que o calibre dos fios está diminuindo por dentro — no próprio folículo. Com o tempo, se não for tratado, o couro cabeludo pode perder volume celular, dificultando a absorção dos nutrientes que fazem o fio crescer forte. É por isso que, na consulta, a Dra. Franciele avalia a saúde do couro cabeludo de forma clínica e, se necessário, com exames para entender a causa da miniaturização e também o motivo da queda (se houver)."`,
        objetivo: 'Explicar miniaturização e apresentar solução (consulta)',
        palavrasChave: ['calibre', 'folículo', 'volume celular', 'exames'],
        gatilhos: ['Explicação técnica', 'Autoridade', 'Personalização']
      },

      {
        id: 'md-3',
        titulo: 'Pergunta 3: Cai em algum lugar específico?',
        tipo: 'validacao',
        momento: 'Durante mapeamento',
        perfil: 'todos',
        pergunta: "Você nota que cai em algum lugar específico do couro cabeludo?",
        resposta: `"Se a queda é mais perceptível no banho ou ao pentear, isso pode indicar que os fios estão mais frágeis e soltos por conta de um desequilíbrio no ciclo capilar. A intensidade da queda também pode variar conforme a frequência da lavagem. Você pode observar na próxima lavagem, tirar uma foto da quantidade de fios que caiu no ralo e também na escova — isso ajuda bastante na análise. Se quiser, pode mandar aqui pra gente avaliar e mensurar."`,
        objetivo: 'Criar engajamento pedindo foto + validar fragilidade',
        palavrasChave: ['fragilidade', 'ciclo capilar', 'foto', 'avaliar'],
        gatilhos: ['Engajamento', 'Prova visual', 'Autoridade']
      },

      {
        id: 'md-4',
        titulo: 'Pergunta 4: Sente irritação no couro cabeludo?',
        tipo: 'validacao',
        momento: 'Durante mapeamento',
        perfil: 'todos',
        pergunta: "Você sente alguma irritação no couro cabeludo, como dor, ardência, coceira, caspa?",
        resposta: `"Esses sinais de desconforto no couro cabeludo — como ardência, coceira ou caspa — podem indicar que há uma inflamação ativa no folículo. Isso prejudica diretamente a qualidade do fio e o tempo que ele permanece na fase de crescimento (que chamamos de fase anágena). O nosso couro cabeludo funciona como um solo: se ele estiver inflamado, os fios crescem mais fracos, frágeis. Quando está saudável, ele 'ancora' melhor o fio e estimula o crescimento forte e duradouro."`,
        objetivo: 'Explicar inflamação usando metáfora de solo',
        palavrasChave: ['inflamação', 'fase anágena', 'solo', 'ancora'],
        gatilhos: ['Metáfora visual', 'Educação', 'Causa raiz']
      },

      {
        id: 'md-5',
        titulo: 'Pergunta 5: Os fios estão ralos a ponto de ver o couro cabeludo?',
        tipo: 'validacao',
        momento: 'Durante mapeamento',
        perfil: 'visual',
        pergunta: "Os fios estão ralos a ponto de enxergar com facilidade o couro cabeludo?",
        resposta: `"Se você está percebendo que o seu cabelo foi ficando mais ralo com o tempo, ao ponto de o couro cabeludo já estar mais visível, esse é um sinal claro de que houve progressão do afinamento dos fios — e isso não pode ser ignorado.

Com o passar do tempo, se não for feito um tratamento direcionado, o fio vai perdendo calibre, densidade e capacidade de se manter ancorado. Isso torna o resultado mais demorado e, em alguns casos, pode até afetar a recuperação do volume total.

Mas a boa notícia é que com a avaliação certa, isso pode ser revertido. A Dra. Franciele realiza um exame chamado tricoscopia durante a consulta, que permite analisar com precisão o couro cabeludo e os fios — mostrando detalhes invisíveis a olho nu. Com esse mapeamento, é possível montar um plano de tratamento muito mais eficaz e personalizado para o seu caso."`,
        adicional: `"Olha como tem características únicas da pele do couro cabeludo e fio do cabelo que aparece com detalhes nesse exame. Todas essas informações detalhadas do seu cabelo vão direcionar o tratamento que vamos dar andamento. Concorda que ter esse diagnóstico preciso e detalhado pode fazer total diferença no seu resultado do tratamento?"`,
        objetivo: 'Gerar urgência + apresentar tricoscopia como diferencial',
        palavrasChave: ['progressão', 'tricoscopia', 'precisão', 'personalizado'],
        gatilhos: ['Urgência', 'Tecnologia', 'Exclusividade']
      },

      {
        id: 'md-6',
        titulo: 'Pergunta 6: Percebe falhas nas laterais ou no meio?',
        tipo: 'validacao',
        momento: 'Durante mapeamento',
        perfil: 'todos',
        pergunta: "Você já está percebendo falhas nas laterais ou no meio do cabelo?",
        respostaVariacao1: `"Sim, esse padrão pode ser um dos mais difíceis de reverter se for ignorado, mas ao mesmo tempo é um dos que respondem melhor ao tratamento quando tem um diagnóstico bem feito. Por isso a consulta com a Dra. Franciele é tão importante — ela vai olhar seus exames, histórico e fazer o mapeamento clínico completo."`,
        respostaVariacao2: `"Certo, entendi. Olha [NOME DA PESSOA] muito possivelmente nós estamos falando de um problema capilar, mas que tem tratamento. Pelas informações que você está me contando, onde você tem cabelo é possível estimular, mesmo que ele já esteja mais fino ou ralo. E nós temos altos índices de resultados nesses casos!

O problema é que muitas vezes o tempo vai passando… e não tratar de forma correta ou querer tratar sozinho sem orientação de um tricologista, pode fazer o problema avançar. E nesses casos tempo realmente é cabelo!"`,
        objetivo: 'Validar gravidade + mostrar reversibilidade + urgência',
        palavrasChave: ['reverter', 'diagnóstico', 'tempo é cabelo'],
        gatilhos: ['Esperança', 'Urgência', 'Autoridade']
      },

      {
        id: 'md-7',
        titulo: 'Técnica Espelho + Explicação Clínica',
        tipo: 'tecnica',
        momento: 'Após lead relatar sintoma',
        perfil: 'todos',
        dica: 'Use essa estrutura: (1) Escute (2) Espelhe (3) Explique (4) Mostre solução',
        exemplo: {
          paciente: "Meu cabelo não cresce mais.",
          comercial: "É muito comum sentir isso quando o ciclo do fio está lento ou bloqueado. Por isso, nos nossos protocolos trabalhamos formas de reativar esse crescimento de forma segura e eficaz, respeitando o seu tipo de cabelo e de queda."
        },
        estrutura: [
          "Escute com atenção o que o paciente relatou",
          "Espelhe com uma frase de validação",
          "Explique brevemente o que está por trás daquele problema",
          "Mostre que a linha de tratamento da clínica é voltada exatamente para aquilo"
        ],
        gatilhos: ['Empatia', 'Validação', 'Autoridade']
      },

      {
        id: 'md-8',
        titulo: 'Roteiro Resumido dos Primeiros 3 Minutos',
        tipo: 'sequencia',
        momento: 'Estrutura completa de abertura',
        perfil: 'todos',
        dica: 'Siga essa ordem para maximizar conversão',
        estrutura: [
          {
            passo: 1,
            acao: "Perguntas de qualificação",
            objetivo: "Entender tipo de queda, há quanto tempo, se tem oleosidade, falhas, etc."
          },
          {
            passo: 2,
            acao: "Nomear o que está acontecendo de forma leiga",
            exemplo: "Isso que você está relatando é típico de quando o couro cabeludo está inflamado..."
          },
          {
            passo: 3,
            acao: "Explicar o que o protocolo da clínica busca resolver",
            nota: "Sem dizer os ativos que utilizamos, a não ser que o paciente pergunte"
          },
          {
            passo: 4,
            acao: "Fazer uma pergunta aberta para manter o engajamento",
            exemplos: [
              "E como isso tem te afetado no dia a dia?",
              "Você já tentou tratar isso de alguma forma antes?"
            ]
          }
        ],
        gatilhos: ['Estrutura', 'Fluxo natural', 'Engajamento']
      },

      {
        id: 'md-9',
        titulo: 'Apresentação da Consulta Online - Versão 1',
        tipo: 'principal',
        momento: 'Após mapeamento da dor',
        perfil: 'racional',
        dica: 'Use para leads mais céticos ou que perguntam "como funciona online?"',
        mensagem: `"Hoje, a maior parte dos nossos atendimentos é online, e os resultados são os mesmos dos presenciais. A consulta é feita com toda a profundidade clínica — com análise de exames, histórico de saúde, sintomas e fatores internos que afetam diretamente o cabelo."`,
        complemento: `"Aqui na clínica, mesmo à distância, a gente vai a fundo para entender o que está por trás da queda de cabelo ou da sensibilidade no couro cabeludo. A doutora Franciele analisa os exames com critério clínico, e entrega um protocolo com tudo detalhado: ativos manipulados, rotina, ajustes na alimentação, vitaminas e hábitos. Você não sai com um produto genérico — sai com um plano de ação de verdade."`,
        fechamento: `"Se você sentir que faz sentido, podemos já agendar sua consulta com a doutora Franciele. A agenda é super disputada, mas consigo ver os melhores horários disponíveis agora."`,
        gatilhos: ['Profundidade', 'Personalização', 'Escassez de agenda'],
        resultadoEsperado: 'Lead aceita agendar consulta online'
      },

      {
        id: 'md-10',
        titulo: 'Resposta para "Onde é a clínica?" - Versão Direta',
        tipo: 'contorno',
        momento: 'Quando lead pergunta localização',
        perfil: 'todos',
        dica: 'Responda diretamente mas direcione para online',
        mensagem: `"A clínica física fica em São José, Santa Catarina. Mas a maior parte dos atendimentos hoje são online — e os resultados são os mesmos. Isso porque a consulta não depende da presença física, e sim do método de diagnóstico, análise dos exames e construção do protocolo certo. Inclusive, atendemos pacientes de várias cidades e até de fora do país, com acompanhamento clínico completo."`,
        gatilhos: ['Transparência', 'Autoridade', 'Abrangência']
      },

      {
        id: 'md-11',
        titulo: 'Resposta para "Onde é a clínica?" - Versão Empática',
        tipo: 'contorno',
        momento: 'Quando lead pergunta localização',
        perfil: 'emocional',
        dica: 'Use tom mais acolhedor e mostre que outros pacientes confiam',
        mensagem: `"Somos de Santa Catarina, mas hoje atendemos o Brasil inteiro de forma online. Isso porque conseguimos, mesmo à distância, fazer uma análise completa dos seus exames, sintomas e histórico, e montar um protocolo super personalizado. A maioria dos nossos pacientes nem mora perto da clínica — e mesmo assim têm resultados incríveis."`,
        gatilhos: ['Pertencimento', 'Prova social', 'Resultados']
      }
    ],

    // PERGUNTAS ABERTAS PARA CONDUZIR O LEAD
    perguntasAbertas: {
      titulo: 'Biblioteca de Perguntas Abertas',
      categorias: {
        vincuoEmocional: {
          nome: 'Aprofundar o problema e criar vínculo',
          perguntas: [
            "Como você tem se sentido com tudo isso ultimamente?",
            "Isso começou a te incomodar há quanto tempo?",
            "Teve algum momento em que você sentiu que piorou mais?",
            "Isso está afetando mais a sua autoestima ou seu dia a dia mesmo?",
            "Como era seu cabelo antes disso tudo começar?",
            "O que mais te preocupa quando olha no espelho hoje?"
          ]
        },
        historicoAutoridade: {
          nome: 'Entender o histórico e gerar autoridade clínica',
          perguntas: [
            "Você já chegou a buscar algum tipo de tratamento antes?",
            "Tem feito alguma rotina de cuidados com o cabelo?",
            "Alguém na sua família também passou por algo parecido?",
            "Você sente que isso está mais ligado a estresse, hormônio ou já veio de antes?",
            "Já investigou com exames alguma possível causa?",
            "Alguém próximo a você percebeu que o seu cabelo está diferente?"
          ]
        },
        projecaoDesejo: {
          nome: 'Estimular projeção de resultado e desejo',
          perguntas: [
            "Se seu cabelo estivesse do jeito que você quer, o que mudaria na sua rotina?",
            "Se você pudesse mudar uma coisa no seu cabelo hoje, qual seria?",
            "Como você imagina seu cabelo ideal daqui a 6 meses?",
            "Qual seria o primeiro sinal que te faria sentir que está no caminho certo?",
            "Você já pensou em como seria se resolvesse isso de vez?"
          ]
        },
        sondarDecisao: {
          nome: 'Sondar o momento de decisão com leveza',
          perguntas: [
            "Você sente que esse é o momento de cuidar de você?",
            "Tem algo que ainda te impede de começar esse cuidado agora?",
            "Você prefere iniciar com algo mais leve ou já quer ir direto para um protocolo intensivo?",
            "Posso te mostrar como funcionam os primeiros passos?",
            "Você gostaria de entender como podemos personalizar o protocolo para o seu caso?"
          ]
        },
        retomarConversa: {
          nome: 'Retomar conversas que esfriaram (sem pressão)',
          perguntas: [
            "Só pra confirmar: você chegou a ver minha última mensagem?",
            "Quero te acompanhar da melhor forma — você ainda está pensando sobre isso?",
            "Como posso te ajudar a se sentir mais segura pra dar esse passo?",
            "O que seria mais importante pra você nesse momento: clareza ou segurança?",
            "Você quer seguir conversando por aqui ou prefere marcar uma conversa com a doutora primeiro?"
          ]
        }
      }
    },

    // FRASES-CHAVE PARA USAR NO DISCURSO
    frasesChave: [
      "O protocolo que utilizamos aqui é pensado exatamente para quadros como o seu.",
      "O tratamento que a gente faz é individualizado, justamente porque cada tipo de queda tem uma causa diferente.",
      "A gente trabalha para tratar a raiz do problema, não só os sintomas.",
      "Quando começamos o protocolo, a ideia é já nas primeiras semanas restaurar o equilíbrio do couro e estimular a resposta dos fios.",
      "Aqui na clínica, nosso foco é te ajudar a resgatar isso — com um protocolo pensado para cuidar de você de dentro pra fora.",
      "A Dra. Franciele acompanha pessoalmente os pacientes durante todo o tratamento."
    ]
  },

  // ========================================
  // MÓDULO 6: FOLLOW-UP E REENGAJAMENTO
  // ========================================
  followUp: {
    nome: 'Follow-Up e Reengajamento',
    icone: 'repeat',
    cor: '#3b82f6',
    descricao: 'Mensagens de follow-up, recuperação de leads frios e no-shows',
    objetivo: 'Reengajar leads que não responderam ou esfriaram',
    tempo_ideal: 'Variar entre 24h, 48h, 7 dias',

    scripts: [
      {
        id: 'fu-1',
        titulo: 'Mensagem 1: Recuperação com Contexto Personalizado',
        tipo: 'principal',
        momento: '24-48h após lead não responder',
        perfil: 'todos',
        dica: 'SEMPRE mencione o contexto específico da conversa anterior',
        mensagem: `"Oi [NOME], tudo bem? Vi que você estava interessada em entender mais sobre o nosso tratamento capilar, mas acabamos perdendo o contato. Queria saber: ainda faz sentido pra você cuidar da queda dos fios? Porque tivemos alguns horários extras essa semana e achei que poderia te ajudar a retomar de onde paramos."`,
        intencao: 'Abrir a conversa com contexto + possibilidade + tom consultivo',
        gatilhos: ['Contexto', 'Oportunidade', 'Sem pressão'],
        taxaResposta: '40-50%'
      },

      {
        id: 'fu-2',
        titulo: 'Mensagem 2: Estímulo de Urgência + Bônus',
        tipo: 'principal',
        momento: '3-5 dias após primeiro follow-up',
        perfil: 'todos',
        dica: 'Use bônus real, nunca invente',
        mensagem: `"[NOME], como você já tinha mostrado interesse, consegui segurar um bônus que estamos liberando pra quem agendar essa semana: Um kit de cuidados capilares para te ajudar a potencializar o seu tratamento de casa. Você quer se eu ainda consigo pra você?"`,
        intencao: 'Criar senso de exclusividade e urgência',
        gatilhos: ['Exclusividade', 'Bônus', 'Escassez temporal'],
        taxaResposta: '30-40%'
      },

      {
        id: 'fu-3',
        titulo: 'Mensagem 3: Recuperação Objetiva',
        tipo: 'principal',
        momento: '7-10 dias após segunda tentativa',
        perfil: 'todos',
        dica: 'Tom direto mas respeitoso. Dê saída honrosa',
        mensagem: `"Oi, consegui te ajudar com o que você estava buscando? Vi que você visualizou mas não respondeu – posso encerrar esse contato ou você ainda está pensando?"`,
        intencao: 'Confirmar se lead ainda tem interesse ou liberar',
        gatilhos: ['Honestidade', 'Respeito', 'Última chance'],
        taxaResposta: '20-30%'
      }
    ],

    // 10 SUGESTÕES DE VARIAÇÕES
    variacoes: [
      {
        id: 'fu-var-1',
        nome: 'Sugestão 1.0: Reforço da dor + preocupação empática',
        tipo: 'audio',
        momento: 'Lead que demonstrou dor intensa',
        perfil: 'emocional',
        mensagem: `"Oi [NOME]! Tudo bem? A gente ficou realmente preocupado com o que você nos contou sobre a queda e o afinamento do seu cabelo. Eu lembro que você já tinha tentado algumas alternativas antes, mas quando nos procurou, o problema tinha voltado. E, sinceramente… isso é um sinal de alerta. Quanto mais a gente adia o tratamento, menor é a chance de recuperação total. Você ainda quer resolver isso com a gente? Posso te ajudar a retomar!"`,
        gatilhos: ['Empatia', 'Urgência', 'Cuidado']
      },

      {
        id: 'fu-var-2',
        nome: 'Sugestão 1.2: Elevação de consciência com urgência',
        tipo: 'texto',
        momento: 'Lead com alopecia progressiva',
        perfil: 'racional',
        mensagem: `"Oi [NOME], tudo bem? Tem tipos de queda de cabelo em que o fio, depois que cai, não volta mais. E como você já tinha nos contado sobre o afinamento e a perda de densidade, a gente ficou bem atento ao seu caso… Tratar logo é essencial, porque nesse caso: tempo é cabelo. Você ainda tem interesse em tratar com a gente? Podemos retomar seu atendimento agora mesmo."`,
        gatilhos: ['Irreversibilidade', 'Urgência clínica', 'Tempo é cabelo']
      },

      {
        id: 'fu-var-3',
        nome: 'Sugestão 1.3: Reforço da solução e alívio',
        tipo: 'texto',
        momento: 'Lead que demonstrou sofrimento',
        perfil: 'emocional',
        mensagem: `"Oi [NOME]! Estamos preocupados com você e com o seu cabelo. Essa queda intensa que você nos relatou, esse cabelo mais ralo, que afeta tanto sua autoestima… Tudo isso pode sim ser tratado – mas quanto antes você começar, maiores são as chances de recuperação. Me fala, você ainda quer resolver isso com a gente?"`,
        gatilhos: ['Preocupação genuína', 'Esperança', 'Urgência']
      },

      {
        id: 'fu-var-4',
        nome: 'Sugestão 1.4: Tratamentos frustrados anteriores',
        tipo: 'texto',
        momento: 'Lead que já tentou outros tratamentos',
        perfil: 'racional',
        mensagem: `"Apesar de já ter tentado outras formas, [NOME], aqueles tratamentos que você comentou não chegaram na causa real do problema. E isso é frustrante, eu sei. Mas o pior é o tempo que a gente perde… e os fios também. Aqui, a gente personaliza o tratamento e muitos pacientes começam a ver diferença a partir do terceiro mês. Posso te ajudar com algo que realmente funciona. Vamos conversar?"`,
        gatilhos: ['Validação frustração', 'Diferencial', 'Resultados']
      },

      {
        id: 'fu-var-5',
        nome: 'Sugestão 1.5: Lead frio que estava quente',
        tipo: 'texto',
        momento: 'Lead que demonstrou interesse mas sumiu',
        perfil: 'todos',
        mensagem: `"Oi [NOME], tudo bem? Você chegou a comentar comigo sobre a queda e o afinamento, lembra? Tratar por conta própria ou deixar pra depois pode deixar o quadro ainda mais difícil de recuperar. Se ainda quiser resolver isso, estou aqui pra te ajudar. Posso ver os horários?"`,
        gatilhos: ['Memória', 'Alerta', 'Disponibilidade']
      },

      {
        id: 'fu-var-6',
        nome: 'Sugestão 1.6: Sondagem (sem acusar)',
        tipo: 'texto',
        momento: 'Lead que não tomou ação',
        perfil: 'todos',
        mensagem: `"Oi [NOME], tudo certo? Nós conversamos há alguns dias… E talvez você ainda não tenha feito nada pra resolver o problema da queda, né? Se for isso, só um alerta: esse tipo de quadro costuma se agravar com o tempo. Já começou algum tratamento?"`,
        gatilhos: ['Sondagem', 'Alerta suave', 'Abertura']
      },

      {
        id: 'fu-var-7',
        nome: 'Sugestão 1.7: Pessoa sumiu após prometer retorno',
        tipo: 'texto',
        momento: 'Lead que disse "vou pensar" e sumiu',
        perfil: 'todos',
        mensagem: `"Oi [NOME], tudo bem? Desde a nossa última conversa, fiquei pensando no seu caso. Lembro que você estava com queda e afinamento, e que isso já vinha te incomodando. Talvez agora não seja prioridade, mas te digo com sinceridade: cada dia que passa, o quadro se complica. A gente pode te ajudar. Quer retomar?"`,
        gatilhos: ['Cuidado', 'Sinceridade', 'Disponibilidade']
      },

      {
        id: 'fu-var-8',
        nome: 'Sugestão 1.8: Lead representa outra pessoa (familiar)',
        tipo: 'texto',
        momento: 'Filho/marido procurando tratamento para mãe/esposa',
        perfil: 'todos',
        mensagem: `"Oi [NOME], tudo bem? Você nos procurou sobre o tratamento capilar da [ESPOSA / MÃE / FILHA], e a gente ficou preocupado com o que você nos contou. Ficaram com alguma dúvida em relação ao tratamento dela? Posso te ajudar a esclarecer."`,
        gatilhos: ['Empatia familiar', 'Cuidado', 'Esclarecimento']
      },

      {
        id: 'fu-var-9',
        nome: 'Sugestão 1.9: Lead optou por outra clínica',
        tipo: 'texto',
        momento: 'Lead mencionou que foi em outro lugar',
        perfil: 'todos',
        mensagem: `"Oi [NOME], tudo bem? Você comentou que iniciou tratamento em outra clínica… está indo como você esperava? Tem algo que ainda esteja te incomodando com o seu cabelo?"`,
        gatilhos: ['Curiosidade', 'Porta aberta', 'Sem julgamento']
      },

      {
        id: 'fu-var-10',
        nome: 'Sugestão 2.0: Lead que sumiu sem fechar',
        tipo: 'texto',
        momento: 'Lead que estava próximo de agendar e sumiu',
        perfil: 'todos',
        mensagem: `"Oi [NOME], tudo bem? Você estava buscando formas de tratar a calvície e o afinamento capilar… E não conseguimos avançar quando nos procurou. Ainda faz sentido pra você recuperar o volume e a força do seu cabelo?"`,
        gatilhos: ['Lembrança objetivo', 'Reabertura', 'Sem pressão']
      }
    ]
  },

  // ========================================
  // MÓDULO 6B: NO-SHOW (PACIENTES QUE NÃO COMPARECERAM)
  // ========================================
  noShow: {
    nome: 'Recuperação de No-Show',
    icone: 'calendar-x',
    cor: '#ef4444',
    descricao: '5 blocos de abordagem para recuperar consultas não realizadas',
    objetivo: 'Reagendar e converter no-show em consulta realizada',
    tempo_ideal: 'Ação imediata no mesmo dia do furo',
    taxaRecuperacao: '50%',

    scripts: [
      {
        id: 'ns-1',
        titulo: 'BLOCO 1: Abertura com calor + presente surpresa',
        tipo: 'principal',
        momento: 'Imediatamente após no-show',
        perfil: 'todos',
        dica: 'Tom acolhedor, SEM julgamento. Ofereça bônus real',
        mensagem: `"Oi [NOME]! Tudo bem? Vi aqui que você tinha uma consulta com a Dra. Franciele hoje, e como sei que imprevistos acontecem, queria te mandar uma mensagem rápida pra não deixar passar a oportunidade. A gente separou um presente especial pra você caso queira reagendar sua consulta ainda hoje: uma sessão capilar intensiva com nossa terapeuta – totalmente gratuita. Posso te contar como funciona essa sessão?"`,
        gatilhos: ['Empatia', 'Bônus exclusivo', 'Urgência (ainda hoje)']
      },

      {
        id: 'ns-2',
        titulo: 'BLOCO 2: Validação e explicação do bônus',
        tipo: 'sequencia',
        momento: 'Após lead responder ao BLOCO 1',
        perfil: 'todos',
        dica: 'Detalhe o valor da sessão para aumentar percepção',
        mensagem: `"Essa sessão é super completa, feita pela nossa terapeuta capilar. Inclui fotobiomodulação com LED vermelho, que ativa o crescimento dos fios e reduz inflamação, e a eletroterapia, que melhora a absorção dos ativos na raiz do cabelo. É um tratamento seguro, indolor, e que já dá um super estímulo inicial logo no começo do protocolo. Vou te mandar um vídeo rapidinho mostrando como funciona 🧴💆"`,
        gatilhos: ['Prova de valor', 'Educação', 'Visual (vídeo)']
      },

      {
        id: 'ns-3',
        titulo: 'BLOCO 3: Reforço da oferta',
        tipo: 'sequencia',
        momento: 'Continuação',
        perfil: 'todos',
        mensagem: `"E só pra te lembrar: nosso tratamento capilar completo inclui:
🔬 Análise clínica detalhada com a Dra. Franciele
🧪 Exames completos do couro cabeludo
📈 Acompanhamento personalizado por 6 meses

É uma jornada de transformação, e a primeira etapa começa com a consulta e esse presente exclusivo."`,
        gatilhos: ['Valor percebido', 'Estrutura', 'Jornada']
      },

      {
        id: 'ns-4',
        titulo: 'BLOCO 4: Valor real x valor percebido',
        tipo: 'sequencia',
        momento: 'Continuação',
        perfil: 'todos',
        dica: 'Mencione o valor monetário do bônus',
        mensagem: `"Essa sessão intensiva normalmente custa R$ 500,00, e estamos liberando como bônus somente para reagendamentos feitos hoje, porque a gente sabe que quem procura a gente já tá cansado de tratamentos genéricos que não funcionam. Aqui é diferente – a gente te escuta, investiga e trata de forma séria e profunda. [NOME], quer que eu veja os horários disponíveis agora?"`,
        gatilhos: ['Valor monetário', 'Exclusividade', 'Diferencial']
      },

      {
        id: 'ns-5',
        titulo: 'BLOCO 5: Fechamento leve com urgência',
        tipo: 'fechamento',
        momento: 'Final da sequência',
        perfil: 'todos',
        dica: 'Dê liberdade de escolha entre opções',
        mensagem: `"Temos pouquíssimos horários pra essa semana, porque a agenda da Dra. está quase fechada. Mas se for importante pra você, posso tentar encaixar. Você prefere no início da tarde ou final do dia?"`,
        gatilhos: ['Escassez', 'Alternativa de escolha', 'Flexibilidade']
      }
    ]
  },

  // ========================================
  // MÓDULO 8: COMERCIAL 2 (PÓS-CONSULTA)
  // ========================================
  comercial2: {
    nome: 'Comercial 2 - Pós-Consulta',
    icone: 'check-circle',
    cor: '#10b981',
    descricao: 'Vendas pós-consulta (primeiras 48h) para fechar tratamento',
    objetivo: 'Converter consulta realizada em paciente de tratamento',
    tempo_ideal: 'Primeiras 48h após consulta',
    taxaConversao: '40%',

    scripts: [
      {
        id: 'c2-1',
        titulo: 'SCRIPT 1: Abertura após a consulta (até 48h)',
        tipo: 'principal',
        momento: 'Até 48h após consulta realizada',
        perfil: 'todos',
        dica: 'Velocidade é crítica - quanto antes, maior a conversão',
        mensagem: `"Oi [NOME]! Tudo bem? Aqui é da Clínica Cabelo e Saúde. A gente ficou muito feliz com a sua consulta com a Dra. Franciele, e como já conversamos sobre o seu caso capilar, conseguimos liberar uma condição especial pra você começar o protocolo agora. Você gostaria que eu te explicasse?"`,
        gatilhos: ['Velocidade', 'Condição especial', 'Exclusividade'],
        proximoPasso: 'Aguardar resposta e apresentar condições'
      },

      {
        id: 'c2-2',
        titulo: 'SCRIPT 2: Gatilho do desconto exclusivo',
        tipo: 'principal',
        momento: 'Após lead demonstrar interesse',
        perfil: 'todos',
        dica: 'Use desconto REAL pós-consulta',
        mensagem: `"Olha [NOME], como você já passou pela consulta e análise, conseguimos liberar um desconto exclusivo para quem inicia o protocolo em até 3 dias após a consulta. Isso inclui todo o planejamento individual + as sessões + brindes que falamos. Você gostaria que eu verifique agora os valores e a melhor condição pra você?"`,
        gatilhos: ['Desconto exclusivo', 'Prazo limitado (3 dias)', 'Benefícios'],
        proximoPasso: 'Apresentar valores e condições de pagamento'
      },

      {
        id: 'c2-3',
        titulo: 'SCRIPT 3: Gatilho de progressão clínica',
        tipo: 'urgencia',
        momento: 'Se lead hesitar',
        perfil: 'racional',
        dica: 'Use gatilho de continuidade do tratamento',
        mensagem: `"[NOME], seu tratamento já começou a partir do momento da consulta. Mas se você não inicia as sessões, os exames e a personalização do plano, a queda continua avançando. Eu posso te ajudar a concluir essa etapa agora mesmo. Posso te mandar a condição especial?"`,
        gatilhos: ['Continuidade', 'Progressão do problema', 'Urgência clínica'],
        proximoPasso: 'Enviar proposta com condições'
      },

      {
        id: 'c2-4',
        titulo: 'SCRIPT 4: Última chamada (antes do lead esfriar)',
        tipo: 'urgencia',
        momento: '48-72h após consulta (se ainda não fechou)',
        perfil: 'todos',
        dica: 'Último gatilho de escassez antes de perder a janela quente',
        mensagem: `"[NOME], essa condição especial que liberamos está válida até amanhã às 17h. Depois disso, o valor volta ao padrão e o bônus da sessão intensiva também sai. Quer que eu finalize a proposta com essa condição pra você?"`,
        gatilhos: ['Deadline', 'Perda de benefícios', 'Última chance'],
        proximoPasso: 'Se não responder, aguardar 7 dias para nova abordagem'
      }
    ],

    sequenciaTentativas: {
      titulo: 'Sequência de Tentativas Pós-Consulta',
      estrutura: [
        { hora: '0-6h', acao: 'Primeiro contato (Script 1)', canal: 'WhatsApp' },
        { hora: '12-24h', acao: 'Follow-up se não respondeu (Script 2)', canal: 'WhatsApp' },
        { hora: '24-48h', acao: 'Gatilho progressão clínica (Script 3)', canal: 'WhatsApp + Ligação' },
        { hora: '48-72h', acao: 'Última chamada (Script 4)', canal: 'WhatsApp' },
        { hora: '7 dias', acao: 'Reabordagem com nova estratégia', canal: 'WhatsApp' }
      ]
    }
  },

  // ========================================
  // MÓDULO 9: CONTORNOS E MACs
  // ========================================
  contornos: {
    nome: 'Contornos e MACs',
    icone: 'message-circle',
    cor: '#8b5cf6',
    descricao: 'Roteiros de contorno e mensagens de abertura de conversa',
    objetivo: 'Contornar objeções e reabrir conversas frias',

    scripts: [
      {
        id: 'ct-1',
        titulo: 'ROTEIRO 1: Validação + reflexão suave',
        tipo: 'contorno',
        momento: 'Objeção: "Vou fazer em casa e esperar piorar"',
        perfil: 'emocional',
        mensagem: `"Entendo você querer começar pelo que está ao seu alcance. Mas posso ser sincero? Aqui na clínica, a gente recebe muitas pessoas que fizeram isso — começaram em casa e esperaram piorar. E quando chegam pra fazer o tratamento intensivo, parte do dano já se tornou difícil de reverter. Por isso, mesmo que você ainda não queira iniciar agora, eu posso te mostrar uma forma de começar com mais leveza. Posso?"`,
        gatilhos: ['Empatia', 'Alerta sem pressão', 'Alternativa']
      },

      {
        id: 'ct-2',
        titulo: 'ROTEIRO 2: Comparativo com outros cuidados',
        tipo: 'contorno',
        momento: 'Objeção: "Ainda não está tão grave"',
        perfil: 'racional',
        mensagem: `"Deixar pra depois só porque 'ainda não está tão grave' é como só ir ao dentista quando já está doendo. O que você está fazendo em casa é importante — mas sozinho não resolve a causa da queda e do afinamento. E se a gente conseguisse criar um plano intensivo com sessões mais espaçadas, por exemplo? Algo que te ajude a tratar, mas que caiba melhor no seu momento atual. Te faria sentido?"`,
        gatilhos: ['Analogia', 'Causa raiz', 'Flexibilidade']
      },

      {
        id: 'ct-3',
        titulo: 'ROTEIRO 3: Reativação após 7 dias',
        tipo: 'contorno',
        momento: '7 dias após "vou fazer em casa primeiro"',
        perfil: 'todos',
        mensagem: `"[NOME], como está indo seu tratamento em casa? A gente acompanha muitos pacientes que começam assim, mas com o tempo percebem que sozinhos não conseguem controlar completamente a queda. Você gostaria de fazer uma sessão de reavaliação com a terapeuta capilar, sem compromisso, só pra ver se seu couro cabeludo tá respondendo bem?"`,
        gatilhos: ['Check-in', 'Sem compromisso', 'Oferta de avaliação']
      },

      {
        id: 'mac-1',
        titulo: 'MAC 1: Sondagem leve',
        tipo: 'abertura',
        momento: 'Reabrir conversa fria',
        perfil: 'todos',
        mensagem: `"Oi [NOME], tudo bem? Lembrei de você e queria saber como está indo o tratamento em casa. Você está conseguindo seguir direitinho o uso do tônico e das cápsulas?"`,
        gatilhos: ['Cuidado', 'Interesse genuíno', 'Abertura suave']
      },

      {
        id: 'mac-2',
        titulo: 'MAC 2: Dor invisível',
        tipo: 'abertura',
        momento: 'Tocar na dor de forma leve',
        perfil: 'emocional',
        mensagem: `"Oi [NOME], desde que a gente conversou, fiquei pensando: será que a queda deu uma trégua ou ainda tá incomodando?"`,
        gatilhos: ['Empatia', 'Reabertura da dor', 'Tom leve']
      },

      {
        id: 'mac-3',
        titulo: 'MAC 3: Comparativo com salão/barbearia',
        tipo: 'abertura',
        momento: 'Analogia para mostrar valor do profissional',
        perfil: 'visual',
        mensagem: `"Sabe quando a gente faz uma escova em casa, mas no salão ela dura bem mais? Com o tratamento capilar é parecido. O que você faz em casa ajuda — mas o protocolo completo potencializa tudo e dá resultado mais rápido e duradouro. Quer conversar sobre isso?"`,
        gatilhos: ['Analogia cotidiana', 'Comparação', 'Potencialização']
      }
    ]
  }
};

// ========================================
// FRASES DE IMPACTO PARA ÁUDIO
// ========================================
export const FRASES_IMPACTO = {
  titulo: 'Frases de Impacto para Áudio',
  descricao: 'Use essas frases em áudios para criar conexão emocional',

  categorias: {
    urgencia: [
      "Quanto mais tempo passa sem tratamento, mais difícil fica a recuperação.",
      "Nesse caso, tempo realmente é cabelo.",
      "Cada dia que passa, o folículo pode estar se atrofiando mais.",
      "Chega um ponto em que o dano se torna irreversível."
    ],

    empatia: [
      "Você não está sozinha nessa.",
      "A gente vê muito isso aqui na clínica.",
      "Eu imagino o quanto deve estar sendo difícil lidar com isso.",
      "Você merece se sentir bem consigo mesma."
    ],

    autoridade: [
      "A Dra. Franciele já atendeu mais de 2.000 casos de queda capilar.",
      "Aqui a gente foca em resultado real, baseado em diagnóstico.",
      "Nosso protocolo foi desenvolvido com base em anos de experiência clínica.",
      "Mais de 80% dos nossos pacientes iniciam o tratamento após a primeira consulta."
    ],

    esperanca: [
      "Isso tem solução sim, viu?",
      "Com o protocolo certo, conseguimos estancar a miniaturização.",
      "Muitas pacientes voltam dizendo que as pessoas começaram a notar a diferença.",
      "É possível recuperar o volume e a força dos fios."
    ]
  }
};

// ========================================
// ESTATÍSTICAS E METAS
// ========================================
export const METRICAS_ESPERADAS = {
  taxaResposta: '70%',
  taxaLevantadaDeMao: '60%',
  taxaAtendimentos: '80%',
  taxaConversao: '30%',
  prazoMedioVenda: '≤ 10 dias',
  taxaRecuperacaoNoShow: '50%'
};

export default MODULOS_PLAYBOOK;
