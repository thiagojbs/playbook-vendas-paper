// Perfis de Lead - Cabelo & Saúde
// Baseado no Módulo Zero do Playbook 2025

export const perfisLead = {
  metadata: {
    titulo: "Perfis de Lead",
    descricao: "Identificação e abordagem por tipo de perfil comportamental",
    versao: "1.0.0",
    dataAtualizacao: "2026-01-27"
  },

  // ========================================
  // CONCEITO GERAL
  // ========================================
  conceito: {
    titulo: "Como Identificar o Perfil do Lead",
    descricao: "Os leads se comunicam de formas diferentes. Identificar o perfil nas primeiras mensagens permite adaptar a abordagem para gerar mais conexão e conversão.",

    dicasRapidas: [
      "Observe as primeiras 2-3 frases do lead",
      "Identifique palavras-chave específicas de cada perfil",
      "Adapte sua linguagem ao perfil identificado",
      "Use perguntas estratégicas para confirmar o perfil",
      "Combine abordagens quando necessário (perfil misto)"
    ],

    perguntaInicial: {
      texto: "O que mais te incomoda hoje com seu cabelo?",
      objetivo: "Revelar o perfil pela forma como o lead responde"
    }
  },

  // ========================================
  // PERFIL 1: LEAD VISUAL
  // ========================================
  visual: {
    id: "visual",
    nome: "Lead Visual / Estético",
    emoji: "👁️",

    caracteristicas: {
      descricao: "Decide por impacto visual, quer ver resultados estéticos claros",
      comoPensa: "Pensa em imagens, fala sobre aparência",
      focoDecisao: "Resultados visíveis e transformação estética"
    },

    sinaisIdentificacao: {
      frasesComuns: [
        "Meu cabelo está horrível",
        "Me olho no espelho e me assusto",
        "Me olho no espelho e não me reconheço",
        "Está feio, está ralo, está sem vida",
        "Quero ele como era antes",
        "Meus fios estão sem vida",
        "Quero ver brilho e volume de novo"
      ],

      palavrasChave: [
        "ver", "olhar", "percebo", "parece", "visual",
        "transparente", "visivelmente", "antes e depois",
        "brilho", "volume", "aparência", "feio", "bonito"
      ]
    },

    objetivo: "Mostrar que o protocolo entrega resultados visíveis e que há melhora estética como consequência do equilíbrio interno",

    linguagem: {
      oQueFalar: [
        "Use analogias visuais e metáforas imagéticas",
        "Mostre antes e depois (quando possível)",
        "Fale sobre brilho, densidade, movimento natural",
        "Mencione que pessoas notarão a diferença",
        "Use termos como 'imagina ver...', 'notar a diferença', 'visivelmente melhor'"
      ],

      oQueEvitar: [
        "Discurso frio e técnico demais (distancia o lead visual)",
        "Termos técnicos sem apelo imagético",
        "Foco excessivo em processos internos sem conexão com resultado estético"
      ],

      frasesModelo: [
        "Imagina ver seu cabelo voltando a preencher as entradas que hoje te incomodam? É isso que começamos a construir na consulta.",
        "Nosso protocolo tem foco em recuperar o brilho, a densidade e o movimento natural dos fios.",
        "Já nas primeiras semanas a gente começa a notar melhora na textura e vitalidade do cabelo.",
        "Muitas pacientes voltam aqui dizendo que as pessoas começaram a notar a diferença visual no cabelo delas.",
        "Imagina olhar no espelho e ver os fios mais encorpados, com movimento, brilho e vida de novo."
      ]
    },

    scripts: [
      {
        momento: "Abertura humanizada (depois da qualificação)",
        texto: "Entendo totalmente o que você está sentindo, e pode acreditar: muitas mulheres chegam até nós exatamente assim. 😔 O cabelo mexe com a nossa imagem, sim, mas principalmente com a nossa confiança, né?"
      },
      {
        momento: "Validação + Posicionamento",
        texto: "Aqui na clínica, nosso foco é te ajudar a resgatar isso — com um protocolo pensado para cuidar de você de dentro pra fora, respeitando seu momento e seu tipo de queda."
      },
      {
        momento: "Segunda Interação",
        texto: "Muita gente chega até a clínica se sentindo apagada por conta do cabelo — e quando começamos o protocolo, nas primeiras semanas já dá pra notar o brilho e a textura melhorando. Isso devolve a autoestima de um jeito incrível."
      },
      {
        momento: "Terceira Interação",
        texto: "Imagina olhar no espelho e ver os fios mais encorpados, com movimento, brilho e vida de novo. É isso que buscamos com o tratamento: te devolver essa imagem que você sente falta."
      },
      {
        momento: "Quarta Interação (direcionamento)",
        texto: "Acredite, essa transformação que você quer é possível sim — só precisa dar o primeiro passo. Você quer que eu te mostre como funciona o início do protocolo? Posso te explicar direitinho."
      }
    ],

    perguntas: [
      {
        pergunta: "Quando você percebe no espelho que os fios estão mais finos ou rareando, qual é a parte que mais te incomoda visualmente?",
        gatilho: "Foca na estética, na imagem"
      },
      {
        pergunta: "Você tem alguma referência de como gostaria que seu cabelo estivesse hoje? Pode ser uma foto antiga sua ou um estilo que te inspira.",
        gatilho: "Cria visualização de futuro"
      },
      {
        pergunta: "Você chegou a tentar algum produto ou técnica caseira por conta própria? Teve algum resultado visível?",
        gatilho: "Valida tentativas frustradas"
      },
      {
        pergunta: "Se em poucos meses você conseguisse ver uma diferença nítida na frente do espelho… como você se sentiria?",
        gatilho: "Cria cenário de transformação clara"
      },
      {
        pergunta: "Quer que eu te mostre o passo a passo que criamos pra fazer isso acontecer — e como monitoramos cada resultado com você?",
        gatilho: "Entrega segurança + estética + processo visual"
      }
    ]
  },

  // ========================================
  // PERFIL 2: LEAD EMOCIONAL
  // ========================================
  emocional: {
    id: "emocional",
    nome: "Lead Emocional / Auditivo",
    emoji: "💚",

    caracteristicas: {
      descricao: "Decide pelo sentimento, quer ser acolhido, precisa confiar",
      comoPensa: "Fala sobre autoestima, insegurança, emoções",
      focoDecisao: "Acolhimento, pertencimento e segurança emocional"
    },

    sinaisIdentificacao: {
      frasesComuns: [
        "Me sinto feia",
        "Estou desesperada",
        "Me sinto triste com meu cabelo",
        "Minha autoestima está lá embaixo",
        "Não tenho mais confiança",
        "Isso está me afetando muito",
        "Me sinto constrangida"
      ],

      palavrasChave: [
        "me sinto", "emocionalmente", "desânimo", "segurança",
        "constrangida", "baixa autoestima", "tristeza", "medo",
        "vergonha", "angústia", "sozinha", "desesperada"
      ]
    },

    objetivo: "Gerar acolhimento + pertencimento. Mostrar que você entende o que a paciente está sentindo e que há uma solução segura e acolhedora",

    linguagem: {
      oQueFalar: [
        "Você não está sozinha nessa, viu?",
        "A gente vê muito isso aqui na clínica, e sei o quanto isso pode mexer com a autoestima",
        "Eu imagino o quanto deve estar sendo difícil lidar com isso",
        "Nosso protocolo é pensado para devolver o seu bem-estar, de dentro pra fora",
        "Não é vaidade, é autocuidado"
      ],

      oQueEvitar: [
        "Explicações muito técnicas antes de criar empatia",
        "Foco direto no tratamento antes da validação emocional",
        "Frieza ou objetividade excessiva"
      ],

      frasesModelo: [
        "Estive pensando no que você me contou… Sei que não é fácil lidar com tudo isso, mas quero que saiba que existe sim um caminho possível pra você voltar a se sentir bem com seu cabelo.",
        "Posso te perguntar uma coisa? Em que momento você percebeu que seu cabelo começou a te incomodar de verdade? Às vezes esse momento é o que dá o clique pra virar a chave do cuidado.",
        "Quero muito que você saiba: não é vaidade, é autocuidado. A gente ajuda muitas mulheres que estavam se sentindo exatamente como você.",
        "Você merece se sentir bem consigo mesma. Vamos dar esse passo juntas?"
      ]
    },

    scripts: [
      {
        momento: "Abertura estética (depois da qualificação)",
        texto: "Sabe aquele brilho, aquele volume que parece que sumiu? Ele pode sim voltar — desde que a gente cuide do couro cabeludo e da saúde dos fios do jeito certo. ✨"
      },
      {
        momento: "Validação + Posicionamento",
        texto: "O nosso protocolo tem justamente esse objetivo: recuperar a vitalidade dos fios, estimular o crescimento e devolver ao seu cabelo aquele aspecto bonito, cheio de vida."
      },
      {
        momento: "Segunda Interação",
        texto: "Estive pensando no que você me contou… Sei que não é fácil lidar com tudo isso, mas quero que saiba que existe sim um caminho possível pra você voltar a se sentir bem com seu cabelo. E a gente pode te acompanhar nisso, de forma leve e respeitosa."
      },
      {
        momento: "Terceira Interação",
        texto: "Posso te perguntar uma coisa? Em que momento você percebeu que seu cabelo começou a te incomodar de verdade? Às vezes esse momento é o que dá o clique pra virar a chave do cuidado."
      },
      {
        momento: "Quarta Interação (direcionamento)",
        texto: "Quero muito que você saiba: não é vaidade, é autocuidado. A gente ajuda muitas mulheres que estavam se sentindo exatamente como você. E depois do início do protocolo, a sensação de alívio e confiança volta, sabe? Você merece isso também. Vamos dar esse passo juntas?"
      }
    ],

    perguntas: [
      {
        pergunta: "Desde quando você sente que algo está diferente no seu cabelo… e como isso tem te afetado de verdade?",
        gatilho: "Acessa o impacto emocional"
      },
      {
        pergunta: "Tem algo que você sente quando se olha no espelho hoje… que gostaria de mudar ou esconder?",
        gatilho: "Ativa vulnerabilidade com segurança"
      },
      {
        pergunta: "Teve alguma situação recente em que você evitou sair ou se sentiu insegura por conta do cabelo?",
        gatilho: "Traz dor para a superfície de forma acolhedora"
      },
      {
        pergunta: "Se o seu cabelo voltasse a ser como era, ou até melhor, como você acha que se sentiria?",
        gatilho: "Projeta a transformação emocional"
      },
      {
        pergunta: "Eu quero te ajudar a reconstruir não só o seu cabelo, mas também a sua confiança. Posso te mostrar como a gente faz isso por dentro, com cuidado e resultado de verdade?",
        gatilho: "Oferece solução com acolhimento e autoridade"
      }
    ]
  },

  // ========================================
  // PERFIL 3: LEAD RACIONAL
  // ========================================
  racional: {
    id: "racional",
    nome: "Lead Racional / Lógico",
    emoji: "🧠",

    caracteristicas: {
      descricao: "Quer entender o processo, fala de custo-benefício e tempo de resultado",
      comoPensa: "Faz perguntas objetivas, busca lógica e estrutura",
      focoDecisao: "Método comprovado, evidências e processo claro"
    },

    sinaisIdentificacao: {
      frasesComuns: [
        "Quero saber como funciona",
        "Isso realmente funciona?",
        "Qual a diferença do seu para outro?",
        "Já sei o que eu tenho, é alopecia androgenética",
        "Quanto tempo leva para ter resultado?",
        "Qual é o custo-benefício?",
        "Vocês têm dados de resultado?"
      ],

      palavrasChave: [
        "causa", "dados", "investigar", "ciência", "protocolo",
        "diagnóstico", "funciona?", "evidência", "método",
        "estrutura", "processo", "comprovado", "resultados"
      ]
    },

    objetivo: "Mostrar que existe estrutura, lógica e experiência real por trás do protocolo",

    linguagem: {
      oQueFalar: [
        "Nossa metodologia foi desenvolvida com base nos tipos de queda mais comuns que atendemos",
        "O protocolo tem uma sequência de etapas que atuam na raiz do problema",
        "O foco é resultado mensurável, de forma gradual e segura",
        "Não existe milagre quando se trata de cabelo, mas existe método",
        "Cada plano é personalizado conforme diagnóstico clínico"
      ],

      oQueEvitar: [
        "Falar só de emoção ou estética (quebra a credibilidade)",
        "Ficar vaga ou genérica (ex: 'é bom', 'vai funcionar sim')",
        "Linguagem excessivamente subjetiva ou emocional"
      ],

      frasesModelo: [
        "Sim, esse tipo de queda tem causa definida. A Dra. faz tricoscopia e exames clínicos para montar um plano específico dentro de 6 meses, com altos índices de resultados — nada genérico.",
        "Seu caso tem sim solução — e quanto mais cedo você agir, melhor a resposta do seu couro cabeludo.",
        "A gente não trabalha com fórmulas prontas: cada plano é personalizado conforme o diagnóstico.",
        "Aqui a gente foca em resultado real, baseado em diagnóstico e não em modismos."
      ]
    },

    scripts: [
      {
        momento: "Abertura objetiva (depois da qualificação)",
        texto: "Seu caso tem sim solução — e quanto mais cedo você agir, melhor a resposta do seu couro cabeludo. Por isso, nosso protocolo segue uma linha estruturada, com etapas que respeitam o tipo de queda e o tempo de evolução."
      },
      {
        momento: "Validação + Posicionamento",
        texto: "A gente não trabalha com fórmulas prontas: cada plano é personalizado conforme o diagnóstico. E o mais importante: focado em resultado real, com acompanhamento clínico."
      },
      {
        momento: "Segunda Interação",
        texto: "Caso você ainda esteja avaliando, posso te explicar como funciona a linha de raciocínio do nosso protocolo. A gente primeiro identifica o tipo de queda, depois direciona etapas específicas para isso. É um plano com começo, meio e fim — sem achismos."
      },
      {
        momento: "Terceira Interação",
        texto: "Você chegou a comparar com outros tipos de tratamento antes de falar comigo? É comum as pessoas pensarem que queda é só por estresse, mas na verdade ela tem várias causas diferentes que precisam ser ajustadas no tempo certo."
      },
      {
        momento: "Quarta Interação (direcionamento)",
        texto: "Aqui a gente foca em resultado real, baseado em diagnóstico e não em modismos. Por isso, nosso tratamento não é algo genérico — ele é feito pra você. Se quiser, posso te mostrar os próximos passos pra gente iniciar esse processo com acompanhamento."
      }
    ],

    perguntas: [
      {
        pergunta: "Você já chegou a buscar outras alternativas antes ou essa é sua primeira vez tratando com acompanhamento?",
        gatilho: "Identifica histórico e validação de escolhas anteriores"
      },
      {
        pergunta: "Você chegou a fazer algum tipo de exame antes (hemograma, vitaminas, hormônios)? Ou isso ainda não foi investigado?",
        gatilho: "Valida processo investigativo e mostra seriedade"
      },
      {
        pergunta: "Se eu te explicar como funciona a nossa linha de tratamento e você entender que faz sentido pro seu caso, você se sente pronta pra agendar logo ou ainda quer avaliar outras opções?",
        gatilho: "Qualifica intenção de compra com respeito"
      },
      {
        pergunta: "Você prefere começar com uma consulta de avaliação ou já quer entender o protocolo completo de cara?",
        gatilho: "Entrega controle e organização ao lead"
      },
      {
        pergunta: "Posso te explicar de forma objetiva como funcionam as etapas do nosso protocolo e o que você pode esperar em termos de resultado e tempo?",
        gatilho: "Oferece clareza e processo estruturado"
      }
    ]
  },

  // ========================================
  // GUIA DE IDENTIFICAÇÃO RÁPIDA
  // ========================================
  guiaIdentificacao: {
    titulo: "Como Identificar o Perfil em 3 Passos",

    passo1: {
      titulo: "Faça a pergunta inicial",
      texto: "O que mais te incomoda hoje com seu cabelo?",
      objetivo: "Observe a forma como o lead responde"
    },

    passo2: {
      titulo: "Identifique palavras-chave",
      comparacao: {
        visual: ["ver", "olhar", "espelho", "feio", "bonito", "brilho"],
        emocional: ["sinto", "triste", "desesperada", "autoestima", "constrangida"],
        racional: ["funciona", "como funciona", "diagnóstico", "método", "custo"]
      }
    },

    passo3: {
      titulo: "Adapte sua abordagem",
      visual: "Use metáforas visuais e fale de resultados estéticos",
      emocional: "Acolha primeiro, valide sentimentos, gere pertencimento",
      racional: "Explique o processo, mostre estrutura e evidências"
    },

    dicaImportante: "Um lead pode ter características mistas. Observe a predominância e adapte conforme a conversa evolui."
  },

  // ========================================
  // CHECKLIST DE PRONTIDÃO
  // ========================================
  checklist: {
    titulo: "Checklist - Você está pronto se:",
    itens: [
      "Consegue reconhecer um lead racional, emocional ou visual em 2 frases",
      "Sabe diferenciar quando acolher e quando direcionar",
      "Entende que está vendendo clareza, não 'uma consulta'",
      "Consegue adaptar scripts conforme o perfil identificado",
      "Sabe usar perguntas estratégicas para confirmar o perfil"
    ]
  }
};

export default perfisLead;
