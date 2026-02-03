// Tratamento de Objecoes - New Oeste Telecom
// Respostas prontas para as objecoes mais comuns em vendas de internet
// Metodologia: LAER (Listen, Acknowledge, Explore, Respond)
// Ultima atualizacao: 2026-02-03

// ========================================
// OBJECOES PRINCIPAIS
// ========================================

export const OBJECOES = {

  // OBJECAO 1: PRECO
  'preco-alto': {
    id: 'preco-alto',
    titulo: 'Esta muito caro / Nao cabe no orcamento',
    categoria: 'Preco',
    frequencia: 'Muito Alta',
    contexto: 'Cliente compara apenas o valor mensal sem considerar custo-beneficio',

    sinaisVerbais: [
      'Nossa, e caro...',
      'Nao tenho condicoes',
      'Meu orcamento nao permite',
      'A concorrencia e mais barata'
    ],

    causaReal: [
      'Nao viu valor suficiente',
      'Comparando apenas preco (nao custo-beneficio)',
      'Nao entendeu os diferenciais',
      'Realmente fora do orcamento'
    ],

    tecnicaLAER: {
      listen: 'Ouca ate o fim sem interromper. Deixe o cliente expressar a preocupacao completamente.',
      acknowledge: 'Entendo perfeitamente sua preocupacao com o investimento. Qualidade tem seu valor e e importante que faca sentido para voce.',
      explore: 'Posso entender melhor? Quando diz que esta caro, e em relacao a que? Voce ja comparou com o que paga hoje incluindo os problemas?',
      respond: 'Use uma das respostas abaixo conforme o contexto'
    },

    respostas: [
      {
        abordagem: 'Custo-Beneficio',
        script: 'Entendo sua preocupacao. Vamos analisar juntos: hoje voce paga [valor] na internet atual e tem [problemas: quedas, lentidao, suporte ruim]. Com a New Oeste, por [diferenca a mais], voce elimina todos esses problemas e ainda ganha velocidade real, suporte local rapido e estabilidade garantida. Na pratica, o custo extra e menos de R$ X por dia para ter tranquilidade e produtividade. Faz sentido?',
        quandoUsar: 'Cliente tem internet mas reclama de problemas'
      },
      {
        abordagem: 'Custo de Oportunidade',
        script: 'Entendo. Mas me deixa te perguntar: quanto voce perde quando a internet cai durante uma reuniao importante? Ou quando seus filhos nao conseguem assistir aula? O custo de nao ter uma internet confiavel pode ser muito maior que a diferenca no preco. Voce concorda?',
        quandoUsar: 'Cliente trabalha de casa ou tem necessidade critica'
      },
      {
        abordagem: 'Comparacao Justa',
        script: 'Entendo que parece mais caro. Mas vamos comparar o que esta incluido: nossa fibra optica chega ate dentro da sua casa (FTTH), a velocidade e simetrica (mesma velocidade de upload), temos suporte tecnico local e instalacao rapida. A maioria das operadoras oferece tecnologia inferior. Estamos comparando a mesma coisa?',
        quandoUsar: 'Cliente esta comparando com operadoras tradicionais'
      },
      {
        abordagem: 'Opcoes de Plano',
        script: 'Entendo sua preocupacao. Talvez o plano de [velocidade maior] esteja acima do seu orcamento agora. Temos o plano de [velocidade menor] por R$ [valor menor] que ja resolve [necessidade principal]. Podemos comecar com esse e, se precisar, fazer upgrade depois. O que acha?',
        quandoUsar: 'Preco realmente esta fora do orcamento'
      },
      {
        abordagem: 'Promocao/Desconto',
        script: 'Entendo. No momento temos uma condicao especial: [desconto ou beneficio, ex: 3 meses com desconto, isencao de instalacao]. Isso ajudaria a caber no seu orcamento?',
        quandoUsar: 'Quando houver promocao ativa'
      }
    ],

    perguntasExploratoria: [
      'Quanto voce paga hoje na sua internet?',
      'Alem do preco, o que mais e importante para voce?',
      'Se a diferenca for pequena e resolver todos os problemas, valeria a pena?',
      'Qual valor caberia no seu orcamento?'
    ],

    provasSociais: [
      'Mais de 90% dos nossos clientes vieram de operadoras mais baratas e nunca mais voltariam',
      'Nosso NPS mostra que o custo-beneficio e avaliado em [nota]',
      'Clientes economizam tempo e dinheiro evitando problemas'
    ],

    proximoPasso: 'Se ainda assim estiver acima do orcamento, oferecer plano menor ou condicoes facilitadas'
  },

  // OBJECAO 2: PENSAR / CONSULTAR
  'preciso-pensar': {
    id: 'preciso-pensar',
    titulo: 'Preciso pensar / Vou conversar com familia',
    categoria: 'Hesitacao',
    frequencia: 'Muito Alta',
    contexto: 'Cliente quer adiar a decisao ou nao esta convencido',

    sinaisVerbais: [
      'Deixa eu pensar...',
      'Preciso consultar meu marido/esposa',
      'Vou analisar com calma',
      'Me da um tempo'
    ],

    causaReal: [
      'Inseguranca na decisao',
      'Precisa de mais informacoes',
      'Nao viu urgencia',
      'Realmente precisa consultar alguem',
      'Forma educada de dizer nao'
    ],

    tecnicaLAER: {
      listen: 'Ouca e respeite a necessidade de pensar',
      acknowledge: 'Claro, e uma decisao importante e faz todo sentido querer pensar com calma.',
      explore: 'Para eu poder te ajudar melhor, posso saber o que especificamente voce gostaria de avaliar?',
      respond: 'Use resposta adequada apos entender a objecao real'
    },

    respostas: [
      {
        abordagem: 'Descobrir Objecao Real',
        script: 'Claro, entendo perfeitamente. Geralmente quando as pessoas dizem que precisam pensar, existe algo especifico que esta gerando duvida. Pode me dizer o que e? E sobre o preco, a tecnologia, ou talvez alguma experiencia ruim anterior?',
        quandoUsar: 'Quando "preciso pensar" e uma cortina de fumaca'
      },
      {
        abordagem: 'Facilitar Decisao',
        script: 'Entendo, e uma decisao importante. Para facilitar sua analise, posso resumir os pontos principais? [Resume: necessidades identificadas, solucao proposta, diferenciais, preco, prazo]. Com essas informacoes, o que mais voce precisaria saber para tomar a decisao?',
        quandoUsar: 'Cliente parece interessado mas inseguro'
      },
      {
        abordagem: 'Urgencia Verdadeira',
        script: 'Entendo que quer pensar. So um detalhe importante: [mencionar promocao com prazo, ou disponibilidade limitada, ou problema urgente que cliente tem]. Se decidir depois, ainda conseguiria [beneficio]?',
        quandoUsar: 'Quando ha urgencia real e legitima'
      },
      {
        abordagem: 'Consultar Familia',
        script: 'Otimo! E importante que todos estejam alinhados. Para facilitar a conversa, posso enviar um resumo da proposta por WhatsApp? Assim voce pode mostrar para [esposa/familia] e eu fico disponivel se surgir alguma duvida. Te ligo amanha no mesmo horario, pode ser?',
        quandoUsar: 'Quando realmente precisa consultar alguem'
      }
    ],

    perguntasExploratoria: [
      'O que especificamente voce gostaria de pensar?',
      'Existe algo que nao ficou claro?',
      'Tem alguma duvida que posso esclarecer agora?',
      'Alem de pensar, existe mais alguma coisa que te impede de decidir hoje?',
      'Em quanto tempo pretende tomar a decisao?'
    ],

    proximoPasso: 'Agendar follow-up especifico: "Te ligo [dia] as [hora] para ver o que voce decidiu, pode ser?"'
  },

  // OBJECAO 3: JA TEM INTERNET
  'ja-tenho-internet': {
    id: 'ja-tenho-internet',
    titulo: 'Ja tenho internet / Estou satisfeito',
    categoria: 'Status Quo',
    frequencia: 'Alta',
    contexto: 'Cliente acha que nao precisa trocar',

    sinaisVerbais: [
      'Ja tenho internet',
      'Estou satisfeito com que tenho',
      'Nao preciso trocar',
      'Minha internet atual atende'
    ],

    causaReal: [
      'Nao viu motivo para mudar',
      'Resistencia a mudanca',
      'Medo de arrependimento',
      'Nao conhece os beneficios da fibra'
    ],

    tecnicaLAER: {
      listen: 'Ouca sem julgar a satisfacao dele',
      acknowledge: 'Que bom que esta satisfeito! Isso e importante.',
      explore: 'Posso te fazer algumas perguntas rapidas sobre sua internet atual?',
      respond: 'Mostre os gaps entre o que tem e o que poderia ter'
    },

    respostas: [
      {
        abordagem: 'Descobrir Insatisfacoes Ocultas',
        script: 'Que bom que esta satisfeito! Me conta, sua internet e fibra optica? [Nao] Entao voce tem um potencial enorme de melhora! Mesmo satisfeito, imagina ter velocidade garantida, sem quedas, e suporte local em minutos? E quando voce compara, geralmente descobre que pode ter muito mais pelo mesmo preco.',
        quandoUsar: 'Cliente tem cabo ou radio'
      },
      {
        abordagem: 'Questionar Satisfacao',
        script: 'Otimo! Posso te fazer algumas perguntas? [1] Quantas vezes por mes sua internet cai? [2] Quando liga no suporte, quanto tempo demora para resolver? [3] A velocidade que voce paga e a que realmente chega? [4] Voce consegue fazer videochamada e assistir Netflix ao mesmo tempo? [Respostas revelam problemas]',
        quandoUsar: 'Cliente diz estar satisfeito mas provavelmente tem problemas'
      },
      {
        abordagem: 'Futuro e Necessidades',
        script: 'Que bom! Mas me deixa te perguntar: sua internet hoje atende, mas e amanha? Com mais dispositivos, trabalho remoto, aulas online, streaming 4K... A tecnologia evolui rapido. Fibra optica e investimento no futuro. Vale a pena pelo menos conhecer, nao acha?',
        quandoUsar: 'Cliente satisfeito mas pode se beneficiar de upgrade'
      },
      {
        abordagem: 'Teste Sem Compromisso',
        script: 'Entendo. Mas e se voce pudesse testar uma internet muito superior sem compromisso? Temos [condicao especial, ex: teste gratuito, garantia de satisfacao]. Se nao gostar, volta para a atual sem custo. Voce nao tem nada a perder e pode se surpreender.',
        quandoUsar: 'Quando houver condicao especial de teste'
      }
    ],

    perguntasExploratoria: [
      'Qual operadora voce usa hoje?',
      'E fibra optica ate sua casa?',
      'Qual velocidade contratada? E a real?',
      'Quantas vezes cai por mes?',
      'Ja tentou usar suporte tecnico?',
      'Como e a experiencia?'
    ],

    armadilhas: [
      'Nunca fale mal do concorrente diretamente',
      'Nunca force a mudanca',
      'Nao seja insistente'
    ],

    proximoPasso: 'Se realmente satisfeito, deixar porta aberta: "Entendo. Mas qualquer problema, pode me chamar!"'
  },

  // OBJECAO 4: NUNCA OUVI FALAR
  'nao-conheco-empresa': {
    id: 'nao-conheco-empresa',
    titulo: 'Nunca ouvi falar / Nao confio em empresa pequena',
    categoria: 'Confianca',
    frequencia: 'Media',
    contexto: 'Cliente tem receio por nao conhecer a empresa',

    sinaisVerbais: [
      'Nunca ouvi falar dessa empresa',
      'Prefiro uma empresa grande/conhecida',
      'E se voces fecharem?',
      'Nao confio em empresa pequena'
    ],

    causaReal: [
      'Medo de empresa nao durar',
      'Receio de qualidade inferior',
      'Preconceito com empresa local/pequena',
      'Falta de provas sociais'
    ],

    tecnicaLAER: {
      listen: 'Ouca a preocupacao sem se ofender',
      acknowledge: 'Entendo sua preocupacao. Confianca e fundamental.',
      explore: 'O que seria importante para voce se sentir seguro?',
      respond: 'Apresente provas de credibilidade'
    },

    respostas: [
      {
        abordagem: 'Vantagem de Ser Local',
        script: 'Entendo! Mas sabia que ser uma empresa local e justamente nosso grande diferencial? Enquanto as grandes operadoras te deixam horas esperando no 0800, nos temos equipe aqui em Foz do Iguacu. Problema? Resolvemos em minutos. Somos seus vizinhos, nao uma multinacional distante.',
        quandoUsar: 'Cliente valoriza atendimento e proximidade'
      },
      {
        abordagem: 'Numeros e Provas',
        script: 'Justo! Mas veja: ja somos mais de [X mil] clientes na regiao, estamos ha [X anos] no mercado, temos infraestrutura propria de fibra optica e nota [X] no Reclame Aqui. Nossa solidez e comprovada. Quer conversar com algum cliente nosso para ter certeza?',
        quandoUsar: 'Cliente quer provas de solidez'
      },
      {
        abordagem: 'Comparacao com Grandes',
        script: 'Entendo que grandes marcas passam mais confianca. Mas me deixa te perguntar: voce ja usou internet de grande operadora? Como foi o atendimento? [Provavelmente ruim] Pois e! Nos somos pequenos no tamanho mas gigantes no atendimento. Cada cliente e importante para nos.',
        quandoUsar: 'Cliente teve experiencia ruim com grande operadora'
      },
      {
        abordagem: 'Prova Social',
        script: 'Entendo! Mas sabia que a maioria dos nossos clientes vieram exatamente das grandes operadoras? [Nome do bairro] esta cheio de clientes nossos satisfeitos. Posso te passar contato de alguns para voce conversar?',
        quandoUsar: 'Quando ha concentracao de clientes no bairro'
      }
    ],

    provasSociais: [
      'X mil clientes ativos',
      'X anos no mercado',
      'Nota X no Reclame Aqui',
      'Infraestrutura propria',
      'Premiacoes ou certificacoes',
      'Depoimentos de clientes',
      'Cases de empresas atendidas'
    ],

    proximoPasso: 'Oferecer visita aos escritorio/infraestrutura ou contato com clientes satisfeitos'
  },

  // OBJECAO 5: CONTRATO COM OUTRO PROVEDOR
  'tenho-contrato': {
    id: 'tenho-contrato',
    titulo: 'Tenho contrato com outro provedor / Fidelidade',
    categoria: 'Contrato',
    frequencia: 'Media',
    contexto: 'Cliente esta em periodo de fidelidade',

    sinaisVerbais: [
      'Tenho contrato de X meses',
      'Ainda estou em fidelidade',
      'Vou ter que pagar multa',
      'So posso mudar daqui X meses'
    ],

    causaReal: [
      'Realmente tem fidelidade',
      'Nao quer pagar multa',
      'Desculpa para nao mudar agora'
    ],

    tecnicaLAER: {
      listen: 'Entenda o prazo e condicoes do contrato',
      acknowledge: 'Entendo, contratos de fidelidade sao uma situacao chata.',
      explore: 'Quanto tempo ainda falta? Qual o valor da multa?',
      respond: 'Calcule se vale a pena quebrar ou agende para depois'
    },

    respostas: [
      {
        abordagem: 'Calcular Multa vs Beneficio',
        script: 'Entendo. Quanto tempo ainda falta de contrato? [X meses] E quanto e a multa? [R$ Y] Vamos calcular: se voce ficar pagando R$ [valor atual] por internet ruim por [X meses], vai gastar R$ [total]. Nossa internet e R$ [valor] + R$ [multa] = [total menor]. Voce economiza e ainda tem qualidade. Vale a pena quebrar o contrato, nao acha?',
        quandoUsar: 'Quando a conta for favoravel'
      },
      {
        abordagem: 'Agendamento Futuro',
        script: 'Entendo! Entao vamos fazer assim: faltam [X meses] para terminar seu contrato. Vou anotar aqui para te ligar [1 mes antes] para agendarmos sua instalacao assim que terminar. Combinado? Assim voce nao perde a oportunidade e eu te ajudo a sair dessa internet ruim o quanto antes.',
        quandoUsar: 'Quando multa nao compensa'
      },
      {
        abordagem: 'Dupla Conexao Temporaria',
        script: 'Entendo sua situacao. Que tal isto: voce mantem a internet antiga ate terminar o contrato e instala a nossa agora para uso prioritario (trabalho, estudos). Quando terminar, cancela a antiga. Assim nao paga multa e ja aproveita qualidade superior onde importa.',
        quandoUsar: 'Cliente tem necessidade urgente e orcamento para duas conexoes temporariamente'
      }
    ],

    perguntasExploratoria: [
      'Quanto tempo ainda falta do contrato?',
      'Qual o valor da multa rescisoria?',
      'Vale a pena pagar para ter qualidade desde ja?',
      'Quao insatisfeito voce esta com internet atual?',
      'Tem algum projeto urgente que precisa de internet boa?'
    ],

    proximoPasso: 'Agendar follow-up proximo ao termino do contrato ou calcular viabilidade de quebra'
  },

  // OBJECAO 6: NAO QUERO FIDELIDADE
  'nao-quero-fidelidade': {
    id: 'nao-quero-fidelidade',
    titulo: 'Nao quero fidelidade / Nao quero me prender',
    categoria: 'Compromisso',
    frequencia: 'Media',
    contexto: 'Cliente tem receio de contratos longos',

    sinaisVerbais: [
      'Tem fidelidade?',
      'Nao quero ficar preso',
      'E se eu quiser cancelar?',
      'Nao gosto de contrato longo'
    ],

    causaReal: [
      'Trauma com fidelidade anterior',
      'Quer flexibilidade',
      'Inseguranca com a empresa',
      'Nao tem certeza se vai gostar'
    ],

    tecnicaLAER: {
      listen: 'Entenda o motivo do receio',
      acknowledge: 'Entendo, ninguem gosta de ficar preso a algo que nao esta bom.',
      explore: 'Voce ja teve alguma experiencia ruim com fidelidade?',
      respond: 'Explique a fidelidade de forma transparente ou ofereça opcao sem'
    },

    respostas: [
      {
        abordagem: 'Sem Fidelidade',
        script: 'Entendo sua preocupacao! A boa noticia e que [se aplicavel] nossos planos nao tem fidelidade. Voce pode cancelar quando quiser sem multa. Trabalhamos para que voce fique porque esta satisfeito, nao porque esta preso. Faz sentido?',
        quandoUsar: 'Quando planos nao tem fidelidade'
      },
      {
        abordagem: 'Fidelidade Justa',
        script: 'Entendo! Nossa fidelidade e de apenas [X meses] e existe so para cobrir o custo de instalacao, que e gratis para voce. Sao equipamentos caros (roteador, cabos, ONT) que instalamos sem cobrar nada. A fidelidade e justa, nao acha? Alem disso, confiamos tanto na qualidade que temos certeza que voce nao vai querer cancelar.',
        quandoUsar: 'Quando tem fidelidade mas ela e razoavel'
      },
      {
        abordagem: 'Garantia de Satisfacao',
        script: 'Entendo seu receio. Mas veja: temos garantia de satisfacao de [X dias]. Se nos primeiros [X dias] voce nao ficar completamente satisfeito, cancelamos sem custo algum. Voce nao tem nada a perder. E depois desse periodo, se quiser cancelar, a multa e proporcional ao tempo restante. E justo, nao?',
        quandoUsar: 'Quando ha periodo de teste'
      }
    ],

    perguntasExploratoria: [
      'Voce ja teve problema com fidelidade antes?',
      'O que especificamente te preocupa?',
      'Se a fidelidade for justa e voce tiver garantia, melhoraria?'
    ],

    proximoPasso: 'Sempre seja transparente sobre fidelidade. Esconder gera desconfianca.'
  },

  // OBJECAO 7: INSTALACAO DEMORA
  'instalacao-demora': {
    id: 'instalacao-demora',
    titulo: 'Instalacao demora muito / Preciso urgente',
    categoria: 'Prazo',
    frequencia: 'Media',
    contexto: 'Cliente precisa com urgencia ou acha que vai demorar',

    sinaisVerbais: [
      'Quanto tempo demora para instalar?',
      'Preciso urgente',
      'Quando consigo ter internet?',
      'Ouvi falar que demora meses'
    ],

    causaReal: [
      'Realmente tem urgencia',
      'Trauma com instalacao demorada',
      'Medo de ficar sem internet muito tempo'
    ],

    tecnicaLAER: {
      listen: 'Entenda a urgencia real',
      acknowledge: 'Entendo, quando precisamos de internet, e para ontem, ne?',
      explore: 'Qual sua urgencia? Tem algum prazo especifico?',
      respond: 'Mostre agilidade e prazo real'
    },

    respostas: [
      {
        abordagem: 'Instalacao Rapida',
        script: 'Otima noticia! Nossa instalacao e super rapida. Geralmente fazemos em ate 72 horas apos aprovacao. Em casos urgentes, dependendo da sua regiao, conseguimos fazer em ate 24-48h. Voce esta em [regiao]? [Verifica] Consigo agendar para [data proxima]. Resolve seu problema?',
        quandoUsar: 'Quando realmente e rapido'
      },
      {
        abordagem: 'Comparacao com Concorrentes',
        script: 'Entendo sua preocupacao. As grandes operadoras realmente demoram muito (30-60 dias). Mas nos somos locais e ageis! Nosso prazo e de ate [X dias] e conseguimos priorizar casos urgentes. Qual sua urgencia?',
        quandoUsar: 'Cliente compara com tempo de operadora grande'
      },
      {
        abordagem: 'Transparencia no Prazo',
        script: 'Entendo sua urgencia. Deixa eu ser transparente: o prazo padrao e [X dias] porque precisamos verificar viabilidade tecnica, agendar equipe e fazer instalacao com qualidade. Mas vale a pena esperar [X dias] para ter internet que funciona de verdade pelos proximos anos, nao acha?',
        quandoUsar: 'Quando o prazo e razoavel mas nao urgente'
      }
    ],

    perguntasExploratoria: [
      'Quando voce precisa da internet?',
      'Tem algum evento/projeto especifico?',
      'Esta sem internet no momento?',
      'Qual sua disponibilidade para instalacao?'
    ],

    proximoPasso: 'Agendar data especifica de instalacao. Compromisso firme gera confianca.'
  },

  // OBJECAO 8: VOA PESQUISAR OUTRAS OPCOES
  'vou-pesquisar': {
    id: 'vou-pesquisar',
    titulo: 'Vou pesquisar outras opcoes / Comparar precos',
    categoria: 'Comparacao',
    frequencia: 'Alta',
    contexto: 'Cliente quer avaliar concorrencia',

    sinaisVerbais: [
      'Vou pesquisar outras empresas',
      'Preciso comparar precos',
      'Quero ver outras opcoes',
      'Vou cotar em outros lugares'
    ],

    causaReal: [
      'Quer garantir que esta fazendo boa escolha',
      'Nao viu diferencial suficiente',
      'Habito de sempre pesquisar',
      'Forma educada de encerrar conversa'
    ],

    tecnicaLAER: {
      listen: 'Respeite o desejo de pesquisar',
      acknowledge: 'Otimo! Pesquisar e sempre bom.',
      explore: 'O que especificamente voce quer comparar?',
      respond: 'Facilite a comparacao e destaque diferenciais'
    },

    respostas: [
      {
        abordagem: 'Facilitar Comparacao',
        script: 'Perfeito! Pesquisar e fundamental. Deixa eu te ajudar: quando for comparar, nao olhe so o preco. Pergunte: [1] E fibra optica ate minha casa? [2] A velocidade e simetrica? [3] Tem suporte local? [4] Qual o prazo de instalacao? [5] Tem fidelidade? Ai voce compara de verdade. Pode anotar?',
        quandoUsar: 'Sempre que cliente quer pesquisar'
      },
      {
        abordagem: 'Enviar Material',
        script: 'Claro! Para facilitar sua pesquisa, vou te enviar por WhatsApp [1] nossa proposta detalhada, [2] comparativo com outras tecnologias, [3] depoimentos de clientes. Assim voce tem tudo em maos para comparar. Te ligo [quando] para saber o que achou. Pode ser?',
        quandoUsar: 'Cliente parece interessado mas quer tempo'
      },
      {
        abordagem: 'Urgencia Legitima',
        script: 'Claro, pesquisar e importante! So um detalhe: [promocao/vaga limitada] vale ate [prazo]. Se decidir depois, o valor seria [maior]. Mesmo assim quer pesquisar? Sem problema, so para voce saber.',
        quandoUsar: 'Quando ha urgencia real'
      }
    ],

    perguntasExploratoria: [
      'O que especificamente voce quer comparar?',
      'Alem do preco, o que mais e importante para voce?',
      'Ja tem outras empresas em mente?',
      'Em quanto tempo pretende decidir?'
    ],

    proximoPasso: 'Deixar contato, enviar material e agendar follow-up especifico'
  }
};

// ========================================
// TECNICAS DE TRATAMENTO
// ========================================

export const TECNICAS = [
  {
    nome: 'LAER',
    descricao: 'Metodologia completa para tratamento de objecoes',
    sigla: 'Listen, Acknowledge, Explore, Respond',
    passos: [
      {
        passo: 'Listen (Ouvir)',
        descricao: 'Ouca atentamente sem interromper. Deixe o cliente expressar completamente sua preocupacao.',
        dicas: [
          'Nao interrompa',
          'Faca contato visual (ou demonstre atencao)',
          'Use sinais de que esta ouvindo ("Entendo...", "Hmm...")',
          'Deixe pausas para o cliente completar'
        ]
      },
      {
        passo: 'Acknowledge (Reconhecer)',
        descricao: 'Valide a preocupacao do cliente demonstrando empatia',
        exemplos: [
          '"Entendo perfeitamente sua preocupacao..."',
          '"E uma questao importante mesmo..."',
          '"Varios clientes ja me fizeram essa pergunta..."',
          '"Faz todo sentido pensar nisso..."'
        ],
        oquenaoFazer: [
          'Minimizar a objecao ("Isso nao e importante")',
          'Discordar imediatamente',
          'Ignorar e partir para resposta'
        ]
      },
      {
        passo: 'Explore (Explorar)',
        descricao: 'Faca perguntas para entender a objecao real',
        perguntasPoderosass: [
          '"Posso entender melhor o que te preocupa?"',
          '"Quando diz [objecao], voce se refere a...?"',
          '"O que seria ideal para voce?"',
          '"Alem disso, existe mais alguma coisa?"'
        ],
        objetivo: 'Descobrir a objecao verdadeira por tras da objecao aparente'
      },
      {
        passo: 'Respond (Responder)',
        descricao: 'Responda com fatos, dados e beneficios',
        estrutura: [
          'Conecte com a necessidade do cliente',
          'Use dados e provas',
          'Mostre beneficios especificos',
          'Confirme se a objecao foi superada'
        ],
        fechamento: 'Sempre confirme: "Isso resolve sua preocupacao?" ou "Faz sentido?"'
      }
    ]
  },
  {
    nome: 'Feel-Felt-Found',
    descricao: 'Tecnica de empatia e prova social',
    estrutura: {
      feel: 'Entendo como voce se sente...',
      felt: 'Outros clientes tambem se sentiram assim...',
      found: 'Mas eles descobriram que...'
    },
    exemplo: 'Entendo como voce se sente em relacao ao preco. Varios clientes tambem se sentiram assim no inicio. Mas eles descobriram que, comparado aos problemas que tinham antes, o investimento valeu muito a pena.'
  },
  {
    nome: 'Boomerang',
    descricao: 'Transformar a objecao em razao para comprar',
    exemplos: [
      {
        objecao: 'E caro',
        boomerang: 'Justamente por isso vale a pena! Um investimento um pouco maior garante que voce nao vai ter dor de cabeca com quedas e suporte ruim que sairia muito mais caro.'
      },
      {
        objecao: 'Nao conheco a empresa',
        boomerang: 'Exatamente! E por isso que nos dedicamos tanto ao atendimento personalizado. Se fossemos uma grande operadora, voce seria so mais um numero.'
      }
    ]
  }
];

// ========================================
// SINAIS DE OBJECOES VERDADEIRAS VS FALSAS
// ========================================

export const SINAIS_OBJECOES = {
  verdadeira: {
    caracteristicas: [
      'Cliente faz perguntas especificas',
      'Linguagem corporal aberta',
      'Tom de voz engajado',
      'Busca entender melhor',
      'Fala sobre timing ou viabilidade'
    ],
    acao: 'Trabalhe a objecao com calma e profundidade'
  },
  falsa: {
    caracteristicas: [
      'Resposta rapida e generica',
      'Evita contato visual',
      'Corpo virado para saida',
      'Tom de voz desinteressado',
      'Nao faz perguntas de volta'
    ],
    acao: 'Pode ser que nao esteja qualificado ou o timing nao seja adequado'
  }
};

// ========================================
// ARMADILHAS A EVITAR
// ========================================

export const ARMADILHAS = [
  {
    armadilha: 'Argumentar com o cliente',
    porque: 'Cria confronto e distancia',
    emvezDisso: 'Use LAER e empatia'
  },
  {
    armadilha: 'Minimizar a objecao',
    porque: 'Cliente se sente invalidado',
    emvezDisso: 'Reconheca e valide a preocupacao'
  },
  {
    armadilha: 'Falar mal da concorrencia',
    porque: 'Parece desespero e falta de profissionalismo',
    emvezDisso: 'Destaque seus diferenciais positivamente'
  },
  {
    armadilha: 'Dar desconto muito rapido',
    porque: 'Mostra que o preco estava inflado',
    emvezDisso: 'Trabalhe valor antes de mexer em preco'
  },
  {
    armadilha: 'Insistir demais',
    porque: 'Cliente se sente pressionado',
    emvezDisso: 'Respeite o timing e deixe porta aberta'
  },
  {
    armadilha: 'Responder antes de explorar',
    porque: 'Pode resolver a objecao errada',
    emvezDisso: 'Sempre explore primeiro'
  }
];

// ========================================
// SCRIPTS RAPIDOS POR CATEGORIA
// ========================================

export const SCRIPTS_RAPIDOS = {
  preco: 'Entendo. Vamos analisar o custo-beneficio? Voce prefere pagar [pouco] e ter dor de cabeca, ou investir [um pouco mais] e ter tranquilidade?',
  tempo: 'Claro! O que especificamente voce gostaria de avaliar? Talvez eu possa esclarecer agora.',
  concorrencia: 'Otimo! So certifique-se de comparar tecnologia igual: fibra ate a casa, velocidade simetrica e suporte local.',
  confianca: 'Entendo! Somos [X mil] clientes satisfeitos. Quer conversar com algum vizinho seu que e nosso cliente?',
  urgencia: 'Sem problema! Posso agendar para [data]? Assim voce nao perde o timing.',
  fidelidade: 'Justo! [Se sem] Nao temos fidelidade. [Se com] Temos [X meses] apenas para cobrir a instalacao gratis.'
};
