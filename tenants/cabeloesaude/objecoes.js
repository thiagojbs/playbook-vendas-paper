// Objeções e Contornos - Cabelo & Saúde
// Baseado no Módulo 5 do Playbook 2025
// Expandido de 6 para 15+ objeções especializadas

export const objecoes = {
  metadata: {
    titulo: "Objeções e Contornos Especializados",
    descricao: "Respostas estruturadas para as principais objeções no processo comercial",
    versao: "2.0.0",
    dataAtualizacao: "2026-01-28",
    totalObjecoes: 15
  },

  // ========================================
  // OBJEÇÃO 1: QUAL O VALOR DA CONSULTA?
  // ========================================
  valorConsulta: {
    id: "obj-01",
    objecao: "Qual o valor da consulta?",
    momento: "Início do funil - Lead qualificando viabilidade",
    perfilComum: ["racional", "visual"],
    frequencia: "Alta (70% dos leads perguntam)",

    estruturaResposta: {
      bloco1: {
        titulo: "Validação + Curiosidade",
        texto: `Claro, [NOME], eu já te passo o valor. Mas antes, me deixa te perguntar uma coisa: há quanto tempo você está com esse problema no cabelo? E o que te motivou a buscar ajuda agora?`,
        objetivo: "Entender contexto antes de soltar preço",
        gatilhos: ["Curiosidade", "Validação", "Controle da conversa"]
      },

      bloco2: {
        titulo: "Educação sobre o valor",
        texto: `Olha, a consulta é R$ [VALOR]. Eu sei que parece alto à primeira vista, mas vou te explicar o porquê:

A Dra. Franciele passa até 1h30 com você na consulta. Não é só uma conversa rápida. Ela vai:
• Fazer tricoscopia completa do seu couro cabeludo
• Analisar a saúde dos seus fios com equipamentos específicos
• Coletar amostras para análise laboratorial
• Montar um protocolo 100% personalizado pro seu caso

Não é uma consulta genérica. É um diagnóstico completo, individualizado, que vai te mostrar exatamente o que está acontecendo e qual o melhor caminho.`,
        objetivo: "Justificar investimento com entregáveis concretos",
        gatilhos: ["Autoridade", "Detalhamento", "Personalização"]
      },

      bloco3: {
        titulo: "Validação emocional + próximo passo",
        texto: `Eu entendo que você pode achar um valor alto, [NOME]. Mas pensa comigo: quanto você já gastou tentando resolver isso por conta própria? Com produtos que não funcionaram?

Aqui você vai ter um diagnóstico real, feito por quem entende de verdade. E isso muda completamente o jogo.

Quer que eu reserve um horário pra você essa semana? Tenho [DIA] às [HORÁRIO] e [DIA] às [HORÁRIO].`,
        objetivo: "Recontextualizar valor + escassez + call to action",
        gatilhos: ["Contraste", "Escassez", "Validação emocional"]
      }
    },

    versaoPocket: `"A consulta é R$ [VALOR]. Sei que parece alto, mas é uma avaliação completa de até 1h30 com tricoscopia, coleta de amostras e protocolo personalizado. Não é genérico — é feito 100% pro seu caso. Quer que eu reserve um horário essa semana?"`,

    dicasUso: [
      "NUNCA solte o preço logo de cara sem contexto",
      "Sempre pergunte sobre o problema ANTES de falar de preço",
      "Use números e detalhes concretos (1h30, tricoscopia, coleta)",
      "Recontextualize o investimento (quanto já gastou sem resultado?)",
      "Finalize SEMPRE com call to action (agendar horário)"
    ]
  },

  // ========================================
  // OBJEÇÃO 2: VOU PENSAR
  // ========================================
  vouPensar: {
    id: "obj-02",
    objecao: "Vou pensar / Preciso pensar",
    momento: "Durante qualificação ou após apresentação de preço",
    perfilComum: ["emocional", "racional"],
    frequencia: "Muito alta (85% dos leads)",

    estruturaResposta: {
      bloco1: {
        titulo: "Validação + Investigação",
        texto: `Eu entendo perfeitamente, [NOME]. É uma decisão importante mesmo.

Mas me deixa te perguntar: quando você diz que precisa pensar, é sobre o valor? Sobre a agenda? Ou você ainda tem alguma dúvida se o tratamento vai funcionar no seu caso?`,
        objetivo: "Descobrir a objeção real por trás do 'vou pensar'",
        gatilhos: ["Validação", "Investigação", "Abertura"]
      },

      bloco2: {
        titulo: "Quebra de objeção específica",
        condicional: true,
        opcoes: {
          seForValor: `Entendo. Olha, o valor realmente é um investimento. Mas aqui a gente trabalha com parcelamento facilitado — você consegue dividir sem comprometer seu orçamento. E sinceramente? Quanto você já investiu tentando resolver isso sozinha? Eu aposto que se somar tudo, já deu mais do que a consulta. A diferença é que aqui você vai ter resultado de verdade.`,

          seForDuvida: `Olha, [NOME], eu entendo sua insegurança. Mas deixa eu te falar uma coisa: a Dra. Franciele já atendeu mais de 2.000 casos de queda capilar. E a imensa maioria dos pacientes começa a ver melhora nos primeiros 3 meses. O que você tem a perder em fazer uma consulta e ter um diagnóstico real? Pelo menos você vai saber exatamente o que está acontecendo.`,

          seForTempo: `Eu te entendo. Mas vou ser sincera com você: quanto mais tempo você espera, mais folículos podem entrar em atrofia. E folículo atrofiado, [NOME], não volta mais. Cada semana que passa pode significar uma perda irreversível. Você tem certeza que quer esperar?`
        },
        objetivo: "Tratar a objeção real identificada",
        gatilhos: ["Urgência", "Autoridade", "Contraste", "Medo da perda"]
      },

      bloco3: {
        titulo: "Call to action direto",
        texto: `Olha, [NOME], eu não quero pressionar você. Mas vou te falar com sinceridade: as pessoas que dizem "vou pensar" geralmente ficam pensando por meses… e o cabelo continua caindo.

Tenho um horário [DIA] às [HORÁRIO]. Posso te colocar? Pelo menos você sai daqui sabendo o que fazer. Melhor do que ficar na dúvida, não é?`,
        objetivo: "Criar urgência e facilitar decisão",
        gatilhos: ["Sinceridade", "Escassez", "Facilitação"]
      }
    },

    versaoPocket: `"Entendo que quer pensar, [NOME]. Mas me diz: é sobre o valor, sobre dúvida do resultado ou sobre a agenda? Porque se for [X], a gente resolve agora. E sinceramente, quanto mais espera, mais folículos podem atrofiar. Tenho [DIA] às [HORÁRIO] — posso te colocar?"`,

    dicasUso: [
      "NUNCA aceite 'vou pensar' sem investigar a objeção real",
      "Use perguntas abertas para descobrir o motivo verdadeiro",
      "Trate a objeção específica (valor, dúvida ou tempo)",
      "Use urgência clínica (atrofia folicular) como gatilho ético",
      "Sempre finalize com horário específico para facilitar decisão"
    ]
  },

  // ========================================
  // OBJEÇÃO 3: QUEM ATENDE É MÉDICO?
  // ========================================
  quemAtende: {
    id: "obj-03",
    objecao: "Quem atende é médico(a)?",
    momento: "Início do funil - Validação de autoridade",
    perfilComum: ["racional"],
    frequencia: "Média-alta (50% dos leads)",

    estruturaResposta: {
      bloco1: {
        titulo: "Resposta direta + Validação da pergunta",
        texto: `Ótima pergunta, [NOME]! Mostra que você está buscando alguém que realmente entende do assunto.

Quem atende é a Dra. Franciele, que é tricologista funcional. Ela é formada em [FORMAÇÃO], com especialização em tricologia e saúde capilar.`,
        objetivo: "Validar preocupação e apresentar credenciais",
        gatilhos: ["Validação", "Autoridade"]
      },

      bloco2: {
        titulo: "Diferencial da Tricologia",
        texto: `E olha, [NOME], vou te explicar uma coisa importante: tricologia é a especialidade médica que estuda EXCLUSIVAMENTE cabelo, couro cabeludo e folículos capilares.

Enquanto um dermatologista genérico trata de tudo (pele, unha, manchas, acne, etc.), a tricologista é especializada APENAS em cabelo. É como comparar um clínico geral com um cardiologista quando você tem problema no coração.

A Dra. Franciele já atendeu mais de 2.000 casos de queda capilar. Ela vive e respira tricologia todos os dias. É outro nível de profundidade.`,
        objetivo: "Educar sobre especialização e criar diferenciação",
        gatilhos: ["Educação", "Analogia", "Autoridade", "Estatística"]
      },

      bloco3: {
        titulo: "Social proof + Próximo passo",
        texto: `E posso te garantir: os pacientes que chegam aqui vindo de dermatologistas genéricos sempre falam a mesma coisa: "Nossa, nunca ninguém olhou tão a fundo pro meu caso."

Quer agendar uma avaliação com ela? Aí você tira todas as suas dúvidas pessoalmente e vê o nível de profundidade da consulta.`,
        objetivo: "Reforçar credibilidade e conduzir para agendamento",
        gatilhos: ["Prova social", "Curiosidade", "Call to action"]
      }
    },

    versaoPocket: `"Sim! Quem atende é a Dra. Franciele, tricologista funcional. Tricologia é a especialidade que estuda EXCLUSIVAMENTE cabelo e couro cabeludo — é como um cardiologista pro coração. Ela já atendeu +2.000 casos. Quer agendar pra conhecer?"`,

    dicasUso: [
      "Valide a pergunta antes de responder (mostra que é inteligente perguntar)",
      "Explique o que é tricologia e por que é superior à dermatologia genérica",
      "Use analogias médicas (cardiologista vs clínico geral)",
      "Reforce números (2.000+ casos atendidos)",
      "Use social proof de pacientes anteriores"
    ]
  },

  // ========================================
  // OBJEÇÃO 4: EXAMES LABORATORIAIS
  // ========================================
  examesLaboratoriais: {
    id: "obj-04",
    objecao: "Vocês solicitam exames laboratoriais?",
    momento: "Durante qualificação - Lead mais racional",
    perfilComum: ["racional"],
    frequencia: "Média (30% dos leads)",

    estruturaResposta: {
      bloco1: {
        titulo: "Resposta direta + Validação",
        texto: `Sim, [NOME]! E que bom que você perguntou isso. Mostra que você entende que tratamento capilar sério exige investigação profunda.

A Dra. Franciele sempre solicita exames laboratoriais quando necessário, porque queda capilar muitas vezes tem raiz em desequilíbrios internos: hormônios, deficiências nutricionais, problemas de tireoide, anemia…`,
        objetivo: "Validar preocupação e mostrar abordagem integrativa",
        gatilhos: ["Validação", "Educação"]
      },

      bloco2: {
        titulo: "Detalhamento da abordagem",
        texto: `Na primeira consulta, ela faz uma avaliação completa: tricoscopia, análise de fios, investigação do seu histórico. E a partir daí, se ela identificar necessidade, solicita exames como:

• Hemograma completo
• Ferritina e ferro sérico
• Vitamina D, B12
• Hormônios tireoidianos (TSH, T4)
• Perfil hormonal (quando indicado)

Depois, com os exames em mãos, ela monta o protocolo personalizado — tratando tanto o externo (couro cabeludo e fios) quanto o interno (reposições, ajustes hormonais, etc.).

É uma abordagem funcional, [NOME]. A gente não trata só o sintoma. A gente vai na raiz do problema.`,
        objetivo: "Mostrar profundidade e diferenciação técnica",
        gatilhos: ["Detalhamento", "Educação", "Autoridade"]
      },

      bloco3: {
        titulo: "Call to action",
        texto: `Então sim, pode ficar tranquila. Aqui você vai ter uma investigação completa e profissional. Quer que eu agende uma consulta pra você ver isso de perto?`,
        objetivo: "Reforçar confiança e conduzir para agendamento",
        gatilhos: ["Tranquilização", "Call to action"]
      }
    },

    versaoPocket: `"Sim! A Dra. sempre solicita exames quando necessário: hemograma, ferritina, vitaminas, hormônios. Aqui a gente investiga a raiz do problema — trata interno e externo. Abordagem funcional completa. Quer agendar?"`,

    dicasUso: [
      "Mostre que a clínica tem abordagem integrativa (não só tópica)",
      "Liste tipos de exames específicos para dar credibilidade",
      "Use termo 'abordagem funcional' para diferenciar",
      "Reforce que não tratam apenas sintoma, mas causa raiz"
    ]
  },

  // ========================================
  // OBJEÇÃO 5: ACEITA PLANO DE SAÚDE?
  // ========================================
  planoSaude: {
    id: "obj-05",
    objecao: "Aceita plano de saúde?",
    momento: "Início do funil - Qualificação financeira",
    perfilComum: ["racional", "emocional"],
    frequencia: "Média (40% dos leads)",

    estruturaResposta: {
      bloco1: {
        titulo: "Resposta direta + Explicação",
        texto: `Não, [NOME]. Aqui a gente não trabalha com convênio. E vou te explicar o porquê.

Quando a clínica aceita plano de saúde, ela fica refém dos valores e protocolos impostos pelo convênio. Isso limita o tempo de consulta, a qualidade dos materiais usados e a personalização do tratamento.`,
        objetivo: "Ser transparente e justificar o modelo de negócio",
        gatilhos: ["Transparência", "Educação"]
      },

      bloco2: {
        titulo: "Recontextualização do valor",
        texto: `Aqui, a Dra. Franciele passa até 1h30 com cada paciente. Ela usa equipamentos de ponta, solicita exames específicos, monta protocolos 100% personalizados.

Se dependesse de convênio, a consulta seria de 15 minutos, o tratamento seria genérico e os resultados seriam medianos.

Então sim, é particular. Mas é um investimento em resultado real, [NOME]. Não é uma consulta de convênio onde você sai sem resposta concreta.`,
        objetivo: "Mostrar valor agregado e diferenciação",
        gatilhos: ["Contraste", "Autoridade", "Personalização"]
      },

      bloco3: {
        titulo: "Facilitação de pagamento",
        texto: `E olha, a gente facilita o pagamento: tem parcelamento no cartão, PIX parcelado e até condições especiais para quem fecha tratamento completo. Você não fica presa no orçamento.

Quer que eu te passe mais detalhes e reserve um horário?`,
        objetivo: "Remover objeção financeira e conduzir para agendamento",
        gatilhos: ["Facilitação", "Call to action"]
      }
    },

    versaoPocket: `"Não trabalhamos com convênio, [NOME]. Aqui a Dra. passa 1h30 com você, usa equipamentos de ponta e personaliza 100%. Convênio limita tempo e resultado. Mas facilitamos pagamento: parcelamento, PIX, condições especiais. Quer saber mais?"`,

    dicasUso: [
      "Seja direto: não aceita plano",
      "SEMPRE justifique o porquê (qualidade vs limitação de convênio)",
      "Use contraste: consulta particular (1h30) vs convênio (15min)",
      "Ofereça soluções de pagamento para contornar objeção",
      "Reforce que é investimento em resultado, não gasto"
    ]
  },

  // ========================================
  // OBJEÇÃO 6: JÁ PASSEI EM MÉDICOS
  // ========================================
  jaPasseiMedicos: {
    id: "obj-06",
    objecao: "Já passei em médicos e não resolveu",
    momento: "Durante qualificação - Lead frustrado",
    perfilComum: ["emocional", "racional"],
    frequencia: "Alta (60% dos leads)",

    estruturaResposta: {
      bloco1: {
        titulo: "Validação emocional profunda",
        texto: `[NOME], eu imagino a sua frustração. Passar por vários médicos, gastar dinheiro, ter esperança… e nada funcionar. Isso é muito desgastante emocionalmente, né?

E olha, eu vou ser bem sincera com você: a maioria dos médicos que você passou provavelmente eram dermatologistas gerais, certo? Que tratam de tudo — pele, unha, acne, manchas, cabelo…`,
        objetivo: "Acolher frustração e começar a diferenciar",
        gatilhos: ["Empatia profunda", "Validação", "Investigação"]
      },

      bloco2: {
        titulo: "Diferenciação técnica",
        texto: `O problema, [NOME], é que cabelo exige especialização. Um dermatologista geral vê queda capilar de forma superficial: geralmente receita minoxidil, às vezes finasterida, e pronto. Não investiga a fundo.

Aqui é diferente. A Dra. Franciele é tricologista — ela estuda APENAS cabelo e couro cabeludo. É a diferença entre um clínico geral e um cardiologista quando você tem problema no coração.

Ela vai fazer:
• Tricoscopia completa (análise microscópica do couro cabeludo)
• Coleta e avaliação de fios
• Investigação hormonal e nutricional (exames quando necessário)
• Protocolo 100% personalizado pro SEU caso

Não é receita de bula. É tratamento individualizado.`,
        objetivo: "Educar sobre especialização e mostrar profundidade",
        gatilhos: ["Educação", "Contraste", "Detalhamento técnico", "Personalização"]
      },

      bloco3: {
        titulo: "Social proof + Esperança",
        texto: `E olha, [NOME], a maioria dos nossos pacientes chegou aqui exatamente como você: frustrados, desacreditados, achando que nada ia funcionar. E sabe o que eles falam depois da consulta? "Nossa, nunca ninguém olhou tão a fundo pro meu caso."

Você não tem nada a perder em fazer uma avaliação. Pelo menos você vai saber com clareza o que está acontecendo e se o seu caso tem solução real.

Posso te colocar na agenda?`,
        objetivo: "Resgatar esperança e conduzir para ação",
        gatilhos: ["Prova social", "Esperança", "Redução de risco", "Call to action"]
      }
    },

    versaoPocket: `"Imagino sua frustração, [NOME]. Mas dermatologistas gerais tratam superficialmente. Aqui a Dra. é tricologista — só cabelo. Tricoscopia, exames, protocolo 100% personalizado. Nossos pacientes chegam frustrados e saem dizendo 'nunca olharam tão fundo'. Quer tentar?"`,

    dicasUso: [
      "SEMPRE valide a frustração antes de argumentar",
      "Use empatia profunda (imagino como foi difícil)",
      "Diferencie claramente: dermatologista geral vs tricologista especializado",
      "Use social proof de pacientes na mesma situação",
      "Termine com 'não tem nada a perder' para reduzir risco percebido"
    ]
  },

  // ========================================
  // OBJEÇÃO 7: JÁ USEI MINOXIDIL/FINASTERIDA
  // ========================================
  jaUseiMedicamentos: {
    id: "obj-07",
    objecao: "Já usei minoxidil e finasterida e não funcionou",
    momento: "Durante qualificação - Lead técnico",
    perfilComum: ["racional"],
    frequencia: "Média-alta (45% dos leads)",

    estruturaResposta: {
      bloco1: {
        titulo: "Validação + Investigação",
        texto: `Entendo, [NOME]. E me conta: você usou por quanto tempo? Foi acompanhada por algum médico durante o uso? Fez exames antes de começar?`,
        objetivo: "Investigar contexto de uso (auto-medicação vs acompanhado)",
        gatilhos: ["Validação", "Investigação"]
      },

      bloco2: {
        titulo: "Educação sobre o erro comum",
        texto: `Olha, [NOME], minoxidil e finasterida são medicamentos sérios e que funcionam SIM — mas apenas quando usados da forma correta e no contexto certo.

O problema é que a maioria das pessoas:
1️⃣ Usa sem diagnóstico correto (não sabe se o tipo de queda responde a esses medicamentos)
2️⃣ Usa dose errada ou formulação inadequada pro caso
3️⃣ Não trata as causas subjacentes (deficiências, inflamação, hormônios desregulados)
4️⃣ Abandona antes do tempo necessário (mínimo 6 meses)

É como tomar antibiótico sem saber qual bactéria você tem. Pode até funcionar, mas as chances são baixas.`,
        objetivo: "Educar sobre uso inadequado e criar abertura para abordagem correta",
        gatilhos: ["Educação", "Analogia médica", "Contraste"]
      },

      bloco3: {
        titulo: "Diferencial da abordagem integrativa",
        texto: `Aqui, a Dra. Franciele não vai simplesmente te receitar minoxidil ou fina de novo. Ela vai:

1️⃣ Investigar SE o seu tipo de queda responde a esses medicamentos
2️⃣ Identificar causas subjacentes (hormônios, deficiências, inflamação crônica)
3️⃣ Montar um protocolo COMPLETO — que pode incluir medicamentos, mas também nutracêuticos, terapias capilares, ajustes de estilo de vida
4️⃣ Acompanhar sua evolução mês a mês

Não é receita pronta, [NOME]. É tratamento sob medida. E isso faz TODA a diferença.

Quer agendar uma avaliação pra gente investigar o seu caso de verdade?`,
        objetivo: "Mostrar abordagem integrativa e conduzir para agendamento",
        gatilhos: ["Diferenciação", "Detalhamento", "Personalização", "Call to action"]
      }
    },

    versaoPocket: `"Minoxidil e fina funcionam SIM — mas só quando usados certos. A maioria usa sem diagnóstico, dose errada, sem tratar causas. Aqui a Dra. investiga SE seu caso responde, trata as causas e monta protocolo completo. Não é receita pronta. Quer investigar?"`,

    dicasUso: [
      "Nunca invalide a experiência do lead (minoxidil funciona sim)",
      "Investigue: foi acompanhado ou auto-medicação?",
      "Eduque sobre os erros comuns (sem diagnóstico, dose errada, falta de acompanhamento)",
      "Mostre abordagem integrativa (não é só prescrever de novo)",
      "Use termo 'protocolo completo' para diferenciar"
    ]
  },

  // ========================================
  // OBJEÇÃO 8: POR QUE PRECISO FAZER CONSULTA?
  // ========================================
  porqueConsulta: {
    id: "obj-08",
    objecao: "Por que preciso fazer consulta antes de iniciar o tratamento?",
    momento: "Durante qualificação - Lead quer atalho",
    perfilComum: ["racional", "visual"],
    frequencia: "Média (35% dos leads)",

    estruturaResposta: {
      bloco1: {
        titulo: "Analogia médica forte",
        texto: `[NOME], imagina que você tem uma dor no peito e vai na farmácia pedir um remédio pra dor. O farmacêutico te dá um analgésico. Aí você toma, a dor passa… mas era um infarto. E você não sabia.

Cabelo é a mesma coisa. Queda capilar pode ter DEZENAS de causas diferentes:
• Alopecia androgenética (genética + hormonal)
• Eflúvio telógeno (estresse, pós-parto, deficiências)
• Foliculite (infecção no couro cabeludo)
• Psoríase, dermatite seborreica
• Doenças autoimunes

Cada uma exige um tratamento completamente diferente. Se você começar o tratamento errado, vai jogar dinheiro fora — e pior, pode agravar o problema.`,
        objetivo: "Criar consciência sobre risco de tratamento sem diagnóstico",
        gatilhos: ["Analogia impactante", "Educação", "Medo da perda"]
      },

      bloco2: {
        titulo: "Explicação do que acontece na consulta",
        texto: `A consulta existe justamente pra isso: identificar com precisão o que está causando a sua queda. A Dra. Franciele vai:

1️⃣ Fazer tricoscopia (análise microscópica do couro cabeludo)
2️⃣ Avaliar densidade, miniaturização, inflamação
3️⃣ Coletar amostras de fios pra análise
4️⃣ Investigar seu histórico (hormonal, nutricional, emocional)
5️⃣ Solicitar exames se necessário

E só depois disso ela monta o protocolo. Porque aí ela sabe EXATAMENTE o que você precisa. Não é chute. É ciência.`,
        objetivo: "Mostrar valor e profundidade da consulta",
        gatilhos: ["Detalhamento", "Autoridade", "Ciência"]
      },

      bloco3: {
        titulo: "Reforço final + Call to action",
        texto: `Então sim, [NOME], a consulta é obrigatória. Não por burocracia, mas por responsabilidade. Aqui a gente não faz tratamento genérico. A gente faz tratamento que FUNCIONA.

Posso te colocar na agenda?`,
        objetivo: "Reforçar necessidade e conduzir para agendamento",
        gatilhos: ["Firmeza", "Responsabilidade", "Call to action"]
      }
    },

    versaoPocket: `"Porque queda capilar tem dezenas de causas diferentes — cada uma exige tratamento específico. Sem diagnóstico correto, você joga dinheiro fora e pode agravar. A consulta identifica a causa real com tricoscopia, análise e exames. Não é chute, é ciência. Posso agendar?"`,

    dicasUso: [
      "Use analogia médica forte (dor no peito = infarto)",
      "Liste causas diferentes de queda para mostrar complexidade",
      "Detalhe o que acontece na consulta (valor tangível)",
      "Seja firme: consulta é obrigatória por responsabilidade",
      "Não ceda à pressão de 'vender tratamento direto'"
    ]
  },

  // ========================================
  // OBJEÇÃO 9: É SÓ TÔNICO E SHAMPOO?
  // ========================================
  soTonico: {
    id: "obj-09",
    objecao: "O tratamento é só tônico e shampoo? Isso eu já tentei...",
    momento: "Após consulta ou durante apresentação de tratamento",
    perfilComum: ["racional", "emocional"],
    frequencia: "Média (30% dos leads)",

    estruturaResposta: {
      bloco1: {
        titulo: "Validação + Diferenciação imediata",
        texto: `Eu entendo sua desconfiança, [NOME]. Você provavelmente já comprou mil shampoos e tônicos de farmácia que prometiam crescimento e não funcionaram, né?

Mas aqui é completamente diferente. Vou te explicar o porquê.`,
        objetivo: "Validar frustração e criar abertura para explicação",
        gatilhos: ["Validação", "Empatia", "Curiosidade"]
      },

      bloco2: {
        titulo: "Explicação técnica da diferenciação",
        texto: `Os produtos que você compra na farmácia são GENÉRICOS. Eles servem pra todo mundo e, por isso mesmo, não servem pra ninguém de verdade.

Aqui, o tônico e o shampoo são MANIPULADOS — feitos sob medida pro SEU caso, com base no seu diagnóstico. A Dra. Franciele escolhe:
• Quais ativos vão entrar na fórmula (minoxidil, peptídeos, fatores de crescimento, anti-inflamatórios)
• Qual a concentração de cada ativo
• Qual o veículo (loção, espuma, gel)
• Qual a frequência de uso

Além disso, o tratamento não é só tópico. Dependendo do seu caso, inclui:
• Nutracêuticos (suplementação oral específica)
• Terapias capilares em clínica (laser, microagulhamento, drug delivery)
• Ajustes hormonais (quando necessário)
• Acompanhamento mensal pra ajustar o protocolo

Não é tônico de farmácia, [NOME]. É um protocolo médico completo, personalizado e acompanhado.`,
        objetivo: "Educar sobre personalização e mostrar profundidade do tratamento",
        gatilhos: ["Educação", "Contraste", "Personalização", "Detalhamento técnico"]
      },

      bloco3: {
        titulo: "Social proof + Call to action",
        texto: `E olha, todos os nossos pacientes que chegaram com essa mesma desconfiança voltam depois de 3 meses dizendo: "Nunca imaginei que ia funcionar desse jeito."

Porque funciona. Não é mágica, é ciência aplicada. Você está dentro?`,
        objetivo: "Reforçar credibilidade e conduzir para fechamento",
        gatilhos: ["Prova social", "Ciência", "Fechamento"]
      }
    },

    versaoPocket: `"Entendo a desconfiança, [NOME]. Mas não é tônico de farmácia genérico. É manipulado sob medida pro SEU caso — ativos, concentrações e frequência personalizados. Além disso, inclui nutracêuticos, terapias e acompanhamento mensal. Não é produto, é protocolo médico. Funciona. Tá dentro?"`,

    dicasUso: [
      "Valide a frustração com produtos de farmácia",
      "Use contraste forte: genérico vs personalizado",
      "Detalhe os componentes do tratamento completo (não é só tópico)",
      "Use termos técnicos: manipulado, nutracêuticos, drug delivery",
      "Social proof é essencial aqui (outros também duvidaram e funcionou)"
    ]
  },

  // ========================================
  // OBJEÇÃO 10: TEM RETORNO? QUANTO TEMPO DURA?
  // ========================================
  retornoTempo: {
    id: "obj-10",
    objecao: "Tem retorno? Quanto tempo dura o tratamento?",
    momento: "Após consulta - Paciente avaliando investimento total",
    perfilComum: ["racional"],
    frequencia: "Média-alta (50% dos leads pós-consulta)",

    estruturaResposta: {
      bloco1: {
        título: "Resposta direta sobre retornos",
        texto: `Sim, [NOME]! O tratamento inclui retornos mensais com a Dra. Franciele durante os primeiros 6 meses. Depois disso, a gente recomenda retornos a cada 2-3 meses para manutenção.

Por quê? Porque cabelo não responde do dia pra noite. O ciclo capilar leva tempo — e a Dra. precisa acompanhar sua evolução, ajustar o protocolo se necessário e garantir que você está no caminho certo.`,
        objetivo: "Informar estrutura de acompanhamento e justificar necessidade",
        gatilhos: ["Transparência", "Educação"]
      },

      bloco2: {
        titulo: "Educação sobre tempo de tratamento",
        texto: `Sobre a duração: tratamento capilar NÃO é rápido. A linha do tempo costuma ser:

📅 Primeiros 3 meses: Estabilização da queda (para de cair)
📅 3-6 meses: Início do crescimento de fios novos (ainda finos)
📅 6-12 meses: Fortalecimento e densidade dos fios
📅 Após 12 meses: Manutenção (continua usando protocolo, mas reduz frequência)

Então o tratamento intensivo dura entre 6-12 meses. Depois você entra em manutenção — que é mais leve, mais barata e mais simples.

Mas olha, [NOME]: você não precisa decidir os 12 meses agora. A gente começa com o primeiro protocolo de 3-6 meses e você vai vendo os resultados mês a mês. Se funcionar (e vai funcionar), você continua. Se não funcionar, você para.`,
        objetivo: "Educar sobre expectativa realista e reduzir pressão de compromisso longo",
        gatilhos: ["Educação", "Expectativa realista", "Redução de risco"]
      },

      bloco3: {
        titulo: "Reforço de valor + Call to action",
        texto: `O importante é: você não vai estar sozinha. A Dra. acompanha você mês a mês, ajusta o que for necessário e garante que você tenha resultado.

Então sim, tem retorno. E isso é um PONTO POSITIVO, não negativo. Porque significa que você está sendo acompanhada de verdade.

Vamos começar?`,
        objetivo: "Recontextualizar retornos como benefício e conduzir para fechamento",
        gatilhos: ["Recontextualização", "Acompanhamento", "Call to action"]
      }
    },

    versaoPocket: `"Sim! Retornos mensais nos primeiros 6 meses, depois a cada 2-3 meses. Tratamento intensivo dura 6-12 meses, depois entra em manutenção. Mas começa com 3-6 meses — você vai vendo resultado e decide continuar. Dra. acompanha mês a mês. Vamos começar?"`,

    dicasUso: [
      "Seja transparente sobre retornos e duração",
      "Eduque sobre linha do tempo realista (3-6-12 meses)",
      "Reduza pressão: não precisa decidir 12 meses agora",
      "Recontextualize retornos como benefício (acompanhamento)",
      "Use estrutura gradual: começa pequeno, vai vendo resultado"
    ]
  },

  // ========================================
  // OBJEÇÃO 11: VOU FAZER SÓ EM CASA PRIMEIRO
  // ========================================
  soCasaPrimeiro: {
    id: "obj-11",
    objecao: "Vou fazer só o tratamento caseiro primeiro, se não funcionar eu volto",
    momento: "Após consulta - Paciente tentando economizar",
    perfilComum: ["racional", "emocional"],
    frequencia: "Alta (55% dos leads pós-consulta)",

    estruturaResposta: {
      bloco1: {
        titulo: "Validação + Questionamento estratégico",
        texto: `Eu entendo, [NOME]. Parece mais barato começar só com o caseiro, né?

Mas me deixa te fazer uma pergunta: por que você acha que o tratamento foi dividido em caseiro + clínica? Você acha que a Dra. colocou a parte clínica só pra vender mais, ou tem uma razão técnica pra isso?`,
        objetivo: "Fazer o lead pensar na lógica do tratamento completo",
        gatilhos: ["Validação", "Questionamento socrático", "Curiosidade"]
      },

      bloco2: {
        titulo: "Educação sobre sinergia do tratamento",
        texto: `Vou te explicar, [NOME]: tratamento capilar funciona por SINERGIA. O caseiro (tônico, shampoo, nutracêuticos) trata a parte diária — mantém o couro cabeludo saudável, estimula crescimento, reduz inflamação.

Mas sozinho, ele é LENTO. Porque os ativos demoram pra penetrar, as concentrações são limitadas (senão irrita) e o estímulo é superficial.

As terapias clínicas (microagulhamento, laser, drug delivery) fazem duas coisas:
1️⃣ ACELERAM a absorção e eficácia dos ativos caseiros (potencializam resultado)
2️⃣ ESTIMULAM os folículos de forma muito mais intensa (não dá pra fazer em casa)

É como treinar pra emagrecer. Você pode só fazer dieta? Pode. Vai funcionar? Vai… devagar. Mas se você faz dieta + treino, o resultado vem 3x mais rápido e 10x melhor.

Então, [NOME], você PODE fazer só o caseiro. Mas vai demorar MUITO mais pra ver resultado — se é que vai ver. E cada mês que passa sem o estímulo completo é um mês perdido.`,
        objetivo: "Educar sobre sinergia e mostrar custo-benefício real",
        gatilhos: ["Educação", "Analogia", "Lógica", "Medo da perda (tempo)"]
      },

      bloco3: {
        titulo: "Recontextualização financeira",
        texto: `E olha, vou ser sincera: se você fizer só o caseiro por 6 meses e não tiver resultado, vai voltar aqui e começar do zero. Vai gastar 6 meses + o dinheiro do caseiro + o investimento do tratamento completo depois.

Não seria mais inteligente fazer certo desde o início e ter resultado em 3-4 meses? Você economiza TEMPO (que é o recurso mais valioso) e economiza DINHEIRO (porque não joga 6 meses fora).

Pensa comigo: você já esperou quanto tempo pra tratar? Vale a pena esperar mais 6 meses apostando num tratamento pela metade?`,
        objetivo: "Mostrar que economia aparente é desperdício real",
        gatilhos: ["Lógica financeira", "Tempo como recurso escasso", "Questionamento reflexivo"]
      },

      bloco4: {
        titulo: "Oferta de parcelamento + Call to action",
        texto: `E se a questão é o valor, [NOME], a gente pode facilitar. Consigo parcelar pra você de um jeito que caiba no seu orçamento. O importante é você fazer o tratamento COMPLETO e ter resultado de verdade.

Quer que eu veja uma condição especial pra você?`,
        objetivo: "Remover objeção financeira e conduzir para fechamento",
        gatilhos: ["Facilitação", "Personalização", "Call to action"]
      }
    },

    versaoPocket: `"Entendo, [NOME]. Mas tratamento funciona por SINERGIA: caseiro mantém saúde diária, clínica acelera 3x o resultado. Fazer só caseiro é lento e pode não funcionar. Aí você perde 6 meses + dinheiro + volta do zero. Não é economia, é desperdício. Posso facilitar o parcelamento?"`,

    dicasUso: [
      "NUNCA menospreze o tratamento caseiro (ele é parte essencial)",
      "Use analogia forte (dieta vs dieta + treino)",
      "Eduque sobre sinergia (1 + 1 = 5, não 2)",
      "Mostre custo real da economia aparente (tempo perdido + reinvestimento)",
      "Sempre ofereça parcelamento ao final para remover objeção financeira"
    ]
  },

  // ========================================
  // CASOS ESPECIAIS
  // ========================================
  casosEspeciais: {
    titulo: "Casos Especiais - Objeções Complexas",

    consultaCara: {
      id: "obj-especial-01",
      objecao: "A CONSULTA ESTÁ CARA",
      momento: "Objeção de preço direta e agressiva",
      gravidade: "Alta - Risco de perder lead",

      estruturaResposta: {
        bloco1: {
          titulo: "NÃO SE JUSTIFICAR - Validar e investigar",
          texto: `Eu entendo que você ache caro, [NOME]. E te falar, você não é a primeira pessoa que fala isso.

Mas me deixa te perguntar uma coisa: caro em relação a quê? Você já consultou em outros lugares? Ou você está achando caro porque nunca investiu nisso antes?`,
          objetivo: "Investigar se a objeção é real (pesquisou mercado) ou emocional (nunca pagou consulta)",
          gatilhos: ["Validação", "Investigação", "Controle da conversa"]
        },

        bloco2: {
          titulo: "Recontextualização de valor (se for objeção emocional)",
          texto: `Olha, [NOME], vou te dar um dado: consulta com tricologista especializado no mercado varia de R$ 400 a R$ 800. Nossa consulta está dentro da média — e olha que aqui você tem até 1h30 com a Dra., tricoscopia completa, coleta de amostras e protocolo personalizado.

Agora, se você está achando caro porque nunca investiu em tratamento capilar, eu entendo. Mas me responde uma coisa: quanto você já gastou tentando resolver sozinha? Somando shampoo, tônico, vitamina que não funcionou… já não deu isso ou mais?

A diferença é que aqui você está pagando por RESULTADO, não por tentativa.`,
          objetivo: "Contextualizar preço no mercado e fazer o lead calcular investimento já feito",
          gatilhos: ["Contexto de mercado", "Contraste", "Lógica financeira"]
        },

        bloco3: {
          titulo: "Alternativa de parcelamento",
          texto: `E olha, se o valor da consulta está pesando pra você agora, a gente consegue parcelar no cartão. Assim você não sente o impacto de uma vez e já sai com o diagnóstico que você precisa.

O que você acha? Prefere parcelar ou prefere continuar tentando sozinha e gastar mais com coisas que não vão funcionar?`,
          objetivo: "Oferecer solução prática e forçar decisão",
          gatilhos: ["Facilitação", "Contraste", "Call to action direto"]
        }
      },

      versaoPocket: `"Entendo que ache caro, [NOME]. Mas caro em relação a quê? Consulta com tricologista varia de R$ 400-800. Aqui você tem 1h30, tricoscopia, análise e protocolo. Quanto você já gastou tentando sozinha? Aqui é investimento em RESULTADO. Posso parcelar. Quer agendar?"`,

      dicasUso: [
        "NUNCA se justifique ou pareça inseguro com o preço",
        "Investigue: objeção real (pesquisou mercado) ou emocional?",
        "Use dados de mercado para contextualizar",
        "Faça o lead calcular quanto já gastou sem resultado",
        "Sempre ofereça parcelamento como solução",
        "Termine com call to action direto e binário"
      ]
    },

    calvicieAvancada: {
      id: "obj-especial-02",
      objecao: "MINHA CALVÍCIE ESTÁ MUITO AVANÇADA / JÁ PENSEI EM IMPLANTE",
      momento: "Lead com calvície grau 4+ ou interessado em implante",
      gravidade: "Crítica - Lead pode estar fora do público-alvo",

      estruturaResposta: {
        bloco1: {
          titulo: "Validação + Investigação de expectativa",
          texto: `Entendo, [NOME]. Calvície avançada realmente pode ser frustrante. Me conta uma coisa: você já foi avaliada por algum médico pra saber se o seu caso tem chance de resposta com tratamento clínico, ou você já decidiu que só implante resolve?`,
          objetivo: "Entender se o lead está decidido ou aberto a tratamento clínico",
          gatilhos: ["Validação", "Investigação", "Abertura"]
        },

        bloco2: {
          titulo: "Educação sobre implante vs tratamento clínico",
          texto: `Vou te falar uma coisa importante, [NOME]: implante capilar NÃO é tratamento. Implante é REALOCAÇÃO de fios. Pega fio de uma área e coloca em outra.

Mas se você tem alopecia ativa (queda progressiva), os fios implantados VÃO CAIR também. Porque o problema continua lá, atacando os folículos.

Por isso, MESMO quem faz implante precisa fazer tratamento clínico antes e depois — pra estabilizar a queda e proteger os fios implantados.

Então, ou você faz tratamento clínico sozinho e melhora (se o seu caso responder), ou você faz tratamento clínico + implante depois (se precisar). Mas pular direto pro implante sem estabilizar a queda é jogar dinheiro fora.`,
          objetivo: "Educar sobre limitações do implante e necessidade de tratamento clínico",
          gatilhos: ["Educação", "Lógica", "Prevenção de erro"]
        },

        bloco3: {
          titulo: "Oferta de avaliação diagnóstica",
          texto: `Olha, [NOME], eu não posso te dizer agora se o seu caso responde ou não a tratamento clínico. Isso só uma avaliação presencial com tricoscopia vai mostrar.

Mas posso te garantir: se tiver chance de melhorar sem implante, a Dra. vai te dizer. E se realmente só implante resolver, ela vai te dizer também — e até pode te indicar pra bons cirurgiões.

A consulta serve justamente pra você não tomar decisão errada. Vale a pena fazer antes de investir 20, 30 mil num implante, não acha?`,
          objetivo: "Posicionar consulta como diagnóstico essencial antes de decisão de implante",
          gatilhos: ["Honestidade", "Lógica financeira", "Redução de risco"]
        },

        bloco4: {
          titulo: "Definição de expectativa realista",
          texto: `Só pra deixar claro, [NOME]: tratamento clínico NÃO faz milagre. Se você tem áreas completamente calvas há anos, dificilmente vai nascer cabelo denso ali.

Mas o que a gente consegue fazer é:
✅ Estabilizar a queda nas áreas que ainda têm fio
✅ Fortalecer e engrossar os fios miniaturizados
✅ Preparar o couro cabeludo pra um implante (se você decidir fazer)

Então não é "ou implante ou tratamento". É "tratamento E implante" (se necessário).

Faz sentido pra você? Quer agendar essa avaliação?`,
          objetivo: "Deixar expectativa realista e conduzir para agendamento",
          gatilhos: ["Expectativa realista", "Honestidade", "Lógica", "Call to action"]
        }
      },

      versaoPocket: `"Calvície avançada é frustrante, [NOME]. Mas implante não é tratamento — é realocação. Se tem queda ativa, os fios implantados caem também. MESMO quem implanta precisa de tratamento antes e depois. A consulta vai mostrar se seu caso responde ou se realmente precisa implante. Vale avaliar antes de gastar 20-30k. Faz sentido?"`,

      dicasUso: [
        "Nunca prometa crescimento em áreas completamente calvas",
        "Eduque sobre limitação do implante (não é tratamento, é realocação)",
        "Posicione tratamento clínico como ESSENCIAL mesmo pra quem vai implantar",
        "Seja honesto: consulta pode dizer 'só implante resolve'",
        "Use lógica financeira: melhor gastar R$ 500 em diagnóstico do que R$ 30k em implante errado"
      ]
    }
  },

  // ========================================
  // PRINCÍPIOS GERAIS DE CONTORNO
  // ========================================
  principiosGerais: {
    titulo: "Princípios Gerais para Contornar Objeções",

    regrasOuro: [
      "1️⃣ SEMPRE valide a objeção antes de argumentar (nunca invalide o sentimento do lead)",
      "2️⃣ Investigue a RAIZ da objeção ('vou pensar' não é objeção real)",
      "3️⃣ Use EDUCAÇÃO, não pressão (ensine, não force)",
      "4️⃣ Seja HONESTO — nunca prometa o que não pode cumprir",
      "5️⃣ Termine SEMPRE com call to action claro (agendar, confirmar, decidir)",
      "6️⃣ Use GATILHOS MENTAIS de forma ética (escassez real, autoridade, prova social)",
      "7️⃣ Nunca menospreze tratamentos anteriores do lead (valide frustração)",
      "8️⃣ Diferencie CLARAMENTE a abordagem da clínica vs mercado genérico"
    ],

    estruturaPadrao: {
      passo1: "🤝 VALIDAÇÃO — Mostre que você entende e respeita a objeção",
      passo2: "🔍 INVESTIGAÇÃO — Descubra a objeção real por trás da fala",
      passo3: "📚 EDUCAÇÃO — Ensine o contexto que o lead não sabe",
      passo4: "💡 DIFERENCIAÇÃO — Mostre por que aqui é diferente",
      passo5: "📞 CALL TO ACTION — Conduza para próximo passo concreto"
    },

    gatilhosMaisEficazes: {
      escassez: "Horários limitados, agendas cheias, vagas escassas (sempre real)",
      urgencia: "Progressão da queda, atrofia folicular, janela de reversibilidade",
      autoridade: "Especialização tricológica, +2.000 casos, diagnóstico profundo",
      provaSocial: "Pacientes com mesmo perfil que tiveram resultado",
      contraste: "Genérico vs personalizado, superficial vs profundo, tentativa vs resultado",
      educacao: "Explicar o porquê técnico, mostrar lógica, ensinar o processo"
    }
  }
};

export default objecoes;
