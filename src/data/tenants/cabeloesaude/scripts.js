// Scripts Expandidos para Vendas - Clinica de Tricologia Cabelo & Saude
// Organizados por etapa do funil com variacoes e dicas

export const SCRIPTS_STATS = {
  total_scripts: '40+',
  categorias: '7',
  sequencias: '4',
  taxa_resposta: '72%',
  segmento: 'Saude Capilar'
};

export const ETAPAS_FUNIL = {
  captacao: {
    nome: 'Captacao',
    icone: 'bullhorn',
    cor: '#1a5f52',
    descricao: 'Primeiro contato com leads interessados em tratamento capilar',
    objetivo: 'Despertar interesse e agendar avaliacao',
    tempo_ideal: 'Responder em ate 5 minutos',
    scripts: [
      {
        id: 'capt-1',
        titulo: 'Resposta Inicial - Instagram/WhatsApp',
        tipo: 'principal',
        contexto: 'Lead entra em contato pela primeira vez',
        dica: 'Seja acolhedor - muitos pacientes sofrem emocionalmente com queda capilar',
        mensagem: `Ola! Tudo bem? 💚

Que bom que voce nos procurou!

Aqui na Cabelo & Saude, a Franciele - biomedica especialista em tricologia - trata a *causa* do problema capilar, nao apenas os sintomas.

Me conta um pouquinho: ha quanto tempo voce percebeu a queda ou afinamento dos fios?`,
        variacoes: [
          {
            nome: 'Versao Empatica',
            mensagem: `Ola! Tudo bem? 💚

Fico feliz que tenha nos procurado!

Sei que queda de cabelo pode ser angustiante, mas saiba que voce esta no lugar certo.

Aqui investigamos a CAUSA do problema - nao ficamos so passando Minoxidil como todo mundo.

Me conta: o que te trouxe ate aqui?`
          },
          {
            nome: 'Versao Direta',
            mensagem: `Ola! Sou da equipe da Cabelo & Saude 💚

Aqui a Franciele, biomedica tricologista, trata queda capilar de forma diferente - investigando a causa, nao so tratando sintoma.

Como posso te ajudar?`
          }
        ],
        gatilhos: ['Acolhimento', 'Diferenciacao', 'Pergunta aberta']
      },
      {
        id: 'capt-2',
        titulo: 'Resposta para Lead de Anuncio',
        tipo: 'principal',
        contexto: 'Lead veio de anuncio no Instagram/Facebook',
        dica: 'Reforce o que o anuncio prometeu e avance rapido',
        mensagem: `Ola! Que bom que voce se interessou! 💚

Vi que voce veio pelo nosso anuncio sobre [TEMA_ANUNCIO].

Aqui na Cabelo & Saude fazemos diferente:
❌ Nao dependemos so de Minoxidil e Finasterida
✅ Investigamos a raiz do problema
✅ Protocolo personalizado pro seu caso

Posso te fazer algumas perguntas para entender melhor sua situacao?`,
        variacoes: [],
        gatilhos: ['Continuidade do anuncio', 'Diferenciacao', 'Permissao para perguntar']
      },
      {
        id: 'capt-3',
        titulo: 'Resposta para Indicacao',
        tipo: 'variacao',
        contexto: 'Lead foi indicado por outro paciente',
        dica: 'Valorize a indicacao e crie conexao',
        mensagem: `Ola [Nome]! Que bom falar com voce! 💚

O(a) [NOME_INDICADOR] me disse que voce esta precisando de ajuda com [PROBLEMA].

Fico feliz que ele(a) tenha confiado em indicar a Cabelo & Saude!

Me conta: como esta a situacao hoje?`,
        variacoes: [],
        gatilhos: ['Prova social', 'Conexao', 'Confianca']
      }
    ]
  },

  qualificacao: {
    nome: 'Qualificacao',
    icone: 'filter',
    cor: '#2d8a7a',
    descricao: 'Entender o perfil e necessidades do paciente',
    objetivo: 'Coletar informacoes para personalizar abordagem',
    tempo_ideal: 'Durante primeira conversa',
    scripts: [
      {
        id: 'qual-1',
        titulo: 'Perguntas de Qualificacao Completas',
        tipo: 'principal',
        contexto: 'Apos primeiro contato, coletar informacoes',
        dica: 'Faca perguntas com empatia, nao como interrogatorio',
        mensagem: `Para eu entender melhor seu caso e te ajudar da melhor forma, me conta:

1️⃣ Ha quanto tempo voce percebeu a queda/afinamento?

2️⃣ Ja fez algum tratamento antes?
   (Minoxidil, Finasterida, vitaminas, shampoos...)

3️⃣ Ja consultou algum profissional sobre isso?
   (Dermatologista, tricologista...)

4️⃣ O que mais te incomoda hoje sobre seus cabelos?

Com essas informacoes, consigo te orientar melhor! 😊`,
        variacoes: [
          {
            nome: 'Versao Rapida',
            mensagem: `Me conta rapidinho:
- Ha quanto tempo percebeu a queda?
- Ja tentou algum tratamento?
- Qual sua maior preocupacao hoje?`
          }
        ],
        gatilhos: ['Estruturacao', 'Empatia', 'Personalizacao']
      },
      {
        id: 'qual-2',
        titulo: 'Aprofundamento - Tratamentos Anteriores',
        tipo: 'variacao',
        contexto: 'Quando paciente menciona que ja tentou tratamentos',
        dica: 'Entenda o que falhou para mostrar diferencial',
        mensagem: `Entendo que voce ja tentou [TRATAMENTO]...

Me conta mais:
- Por quanto tempo usou?
- Percebeu alguma melhora?
- Por que parou?

Pergunto porque muitos tratamentos tratam so o *sintoma* e nao a *causa*.
Por isso param de funcionar ou nao resolvem de verdade.

Aqui fazemos diferente - investigamos POR QUE voce esta perdendo cabelo.`,
        variacoes: [],
        gatilhos: ['Interesse genuino', 'Diferenciacao', 'Educacao']
      },
      {
        id: 'qual-3',
        titulo: 'Qualificacao Emocional',
        tipo: 'variacao',
        contexto: 'Quando paciente demonstra sofrimento emocional',
        dica: 'Acolha antes de falar de tratamento',
        mensagem: `[Nome], percebo que isso esta te afetando bastante...

Saiba que voce nao esta sozinho(a). Muitos pacientes chegam aqui sentindo a mesma coisa.

A queda de cabelo mexe com autoestima, confianca... e normal se sentir assim.

A boa noticia e que existe tratamento. E voce ja deu o primeiro passo ao nos procurar. 💚

Quer me contar mais sobre como isso tem te afetado?`,
        variacoes: [],
        gatilhos: ['Empatia', 'Validacao', 'Acolhimento']
      }
    ]
  },

  agendamento: {
    nome: 'Agendamento',
    icone: 'calendar',
    cor: '#4fb3a3',
    descricao: 'Converter lead em avaliacao agendada',
    objetivo: 'Agendar avaliacao tricologica',
    tempo_ideal: 'Agendar em ate 48h do primeiro contato',
    scripts: [
      {
        id: 'agend-1',
        titulo: 'Convite para Avaliacao Tricologica',
        tipo: 'principal',
        contexto: 'Apos qualificacao, convidar para avaliacao',
        dica: 'Mostre valor da avaliacao antes de falar de agenda',
        mensagem: `[Nome], pelo que voce me contou, seu caso merece uma investigacao mais profunda.

Aqui na Cabelo & Saude fazemos uma *Avaliacao Tricologica Completa* que inclui:

🔬 Exame com tricoscopio - voce VE seu couro cabeludo ampliado
📋 Anamnese detalhada do seu historico
🔍 Identificacao da causa real da queda
🧪 Indicacao de exames complementares se necessario
📝 Proposta de tratamento personalizado

*Duracao:* aproximadamente 40-60 minutos
*Investimento:* R$ [VALOR] (ou cortesia se mencionar)

Tenho horarios disponiveis [DATA]. Qual melhor pra voce:
- [OPCAO 1] as [HORA]
- [OPCAO 2] as [HORA]`,
        variacoes: [
          {
            nome: 'Versao Urgencia',
            mensagem: `[Nome], quanto antes investigarmos, melhores as chances de resultado.

Tenho uma vaga essa semana na [DIA] as [HORA].

Consegue?`
          }
        ],
        gatilhos: ['Valor da avaliacao', 'Opcoes de horario', 'Baixo atrito']
      },
      {
        id: 'agend-2',
        titulo: 'Confirmacao 24h Antes',
        tipo: 'principal',
        contexto: '24h antes da avaliacao agendada',
        dica: 'Sempre confirme para reduzir no-shows',
        mensagem: `Ola [Nome]! 💚

Passando para confirmar sua *Avaliacao Tricologica* amanha:

📅 Data: [DATA]
⏰ Horario: [HORA]
📍 Endereco: [ENDERECO]

*Algumas orientacoes importantes:*
✅ Nao lave o cabelo no dia (para avaliarmos oleosidade natural)
✅ Se tiver exames de sangue recentes, traga
✅ Chegue 10 min antes para preencher ficha
✅ Se usar algum medicamento/vitamina, traga a lista

Posso confirmar sua presenca? ✅`,
        variacoes: [
          {
            nome: 'Lembrete 2h antes',
            mensagem: `[Nome], daqui 2 horas temos sua avaliacao! 💚

📍 Endereco: [ENDERECO]

Te espero aqui! 😊`
          }
        ],
        gatilhos: ['Confirmacao explicita', 'Orientacoes claras', 'Profissionalismo']
      },
      {
        id: 'agend-3',
        titulo: 'Reagendamento - No-Show',
        tipo: 'variacao',
        contexto: 'Quando paciente falta sem avisar',
        dica: 'Seja compreensivo, nao confrontador',
        mensagem: `Oi [Nome], tudo bem? 💚

Sentimos sua falta na avaliacao de hoje!

Sei que imprevistos acontecem. Se quiser, posso verificar novos horarios disponiveis para remarcarmos.

Ou se preferir, me conta o que aconteceu - sem julgamentos!

Estou aqui pra ajudar quando voce puder. 😊`,
        variacoes: [],
        gatilhos: ['Empatia', 'Flexibilidade', 'Porta aberta']
      }
    ]
  },

  proposta: {
    nome: 'Proposta',
    icone: 'file-invoice-dollar',
    cor: '#1a5f52',
    descricao: 'Apresentar protocolo de tratamento e valores',
    objetivo: 'Converter avaliacao em tratamento',
    tempo_ideal: 'Idealmente no mesmo dia da avaliacao',
    scripts: [
      {
        id: 'prop-1',
        titulo: 'Envio Pos-Avaliacao (Mesmo Dia)',
        tipo: 'principal',
        contexto: 'Paciente saiu da avaliacao sem fechar',
        dica: 'Reforce diagnostico e mantenha conexao',
        mensagem: `[Nome], foi um prazer te conhecer hoje! 💚

Como conversamos, seu caso de *[DIAGNOSTICO]* tem solucao com o tratamento adequado.

*Resumo do seu protocolo:*
[LISTA_TRATAMENTOS]

*Investimento:*
- Tratamento completo: R$ [VALOR_TOTAL]
- Parcelado: ate [X]x de R$ [VALOR_PARCELA]
- Pix a vista: R$ [VALOR_PIX] (desconto de X%)

*Duracao estimada:* [X] meses

Lembre-se: quanto antes comecarmos, melhores os resultados!

Ficou alguma duvida sobre o que conversamos?`,
        variacoes: [
          {
            nome: 'Versao Resumida',
            mensagem: `[Nome], conforme conversamos na avaliacao:

Protocolo: [TRATAMENTO]
Investimento: R$ [VALOR] (ate [X]x)
Duracao: [X] meses

Quando podemos comecar? 😊`
          }
        ],
        gatilhos: ['Resumo claro', 'Opcoes de pagamento', 'Urgencia suave']
      },
      {
        id: 'prop-2',
        titulo: 'Follow-up Proposta - 3 dias',
        tipo: 'followup',
        contexto: '3 dias apos avaliacao sem decisao',
        dica: 'Agregue valor, nao apenas cobre resposta',
        mensagem: `Ola [Nome], tudo bem? 💚

Passando pra saber se conseguiu pensar sobre o tratamento.

Surgiu alguma duvida?
Ou tem algo que eu possa esclarecer melhor?

Lembro que seu protocolo para [DIAGNOSTICO] pode comecar a mostrar resultados visiveis em [X] semanas com acompanhamento adequado.

Estou aqui pra ajudar! 😊`,
        variacoes: [],
        gatilhos: ['Cuidado', 'Expectativa de resultado', 'Disponibilidade']
      },
      {
        id: 'prop-3',
        titulo: 'Follow-up Proposta - 7 dias',
        tipo: 'followup',
        contexto: '7 dias apos avaliacao, ultima tentativa suave',
        dica: 'Seja direto mas respeitoso',
        mensagem: `Oi [Nome]! 💚

Faz uma semana que fizemos sua avaliacao tricologica.

Entendo que e uma decisao importante. Se tiver alguma duvida ou preocupacao que eu possa ajudar a esclarecer, estou aqui!

Uma informacao importante: a queda capilar tende a progredir com o tempo. O que tratamos hoje em [X] meses pode precisar de mais tempo depois.

Nao e pra pressionar - e so uma informacao clinica que voce merece saber.

O que voce decidiu?`,
        variacoes: [],
        gatilhos: ['Respeito', 'Informacao clinica', 'Pergunta direta']
      }
    ]
  },

  negociacao: {
    nome: 'Negociacao',
    icone: 'handshake',
    cor: '#2d8a7a',
    descricao: 'Superar objecoes e facilitar decisao',
    objetivo: 'Converter proposta em fechamento',
    tempo_ideal: 'Responder objecoes imediatamente',
    scripts: [
      {
        id: 'neg-1',
        titulo: 'Tratamento de Objecao - Preco',
        tipo: 'objecao',
        contexto: 'Paciente acha o tratamento caro',
        dica: 'Foque no valor e custo acumulado de alternativas',
        mensagem: `Entendo sua preocupacao com o investimento, [Nome].

Mas deixa eu te fazer uma pergunta:

*Quanto voce ja gastou em tratamentos que nao resolveram?*
- Minoxidil: R$ 80-150/mes
- Shampoos antiqueda: R$ 50-100/mes
- Vitaminas: R$ 100-200/mes

Em 1-2 anos, muita gente gasta R$ 3.000-6.000... e continua perdendo cabelo.

*Nosso diferencial:*
- Tratamento com duracao definida (nao eterno)
- Trata a causa, nao apenas sintoma
- Resultados duradouros

Temos parcelamento em ate 12x. Quer que eu monte uma proposta que caiba no seu orcamento?`,
        variacoes: [],
        gatilhos: ['Custo acumulado', 'Diferenciacao', 'Flexibilidade']
      },
      {
        id: 'neg-2',
        titulo: 'Tratamento de Objecao - Tempo',
        tipo: 'objecao',
        contexto: 'Paciente quer esperar',
        dica: 'Informe sobre progressao sem pressionar',
        mensagem: `Entendo, [Nome]. Cada um tem seu tempo de decidir.

*Uma informacao clinica que voce merece saber:*

A queda capilar na maioria dos casos e progressiva.
Foliculos que hoje estao "adormecidos" podem se fechar definitivamente.

O que tratamos hoje em 6 meses, pode precisar de 1 ano daqui a 6 meses.

Nao estou te pressionando - e so ciencia.

*Opcao:* Se quiser, posso te passar alguns cuidados basicos para fazer em casa enquanto decide.

O que acha?`,
        variacoes: [],
        gatilhos: ['Informacao genuina', 'Respeito', 'Valor agregado']
      },
      {
        id: 'neg-3',
        titulo: 'Oferta de Parcelamento',
        tipo: 'variacao',
        contexto: 'Paciente tem interesse mas limite financeiro',
        dica: 'Facilite ao maximo',
        mensagem: `[Nome], entendo sua situacao.

*Opcoes de pagamento:*

1️⃣ *Pix a vista:* R$ [VALOR] com [X]% desconto

2️⃣ *Cartao de credito:* ate 12x de R$ [VALOR]

3️⃣ *Entrada + parcelas:* R$ [ENTRADA] + [X]x de R$ [VALOR]

4️⃣ *Tratamento inicial:* Comeca com protocolo basico (R$ [VALOR]) e evolui depois

Qual dessas opcoes se encaixa melhor pra voce?`,
        variacoes: [],
        gatilhos: ['Multiplas opcoes', 'Flexibilidade', 'Facilitar decisao']
      }
    ]
  },

  fechamento: {
    nome: 'Fechamento',
    icone: 'trophy',
    cor: '#4fb3a3',
    descricao: 'Finalizar contratacao e iniciar tratamento',
    objetivo: 'Garantir inicio positivo do tratamento',
    tempo_ideal: 'Agendar primeira sessao em ate 7 dias',
    scripts: [
      {
        id: 'fech-1',
        titulo: 'Coleta de Dados',
        tipo: 'principal',
        contexto: 'Paciente confirmou que quer comecar',
        dica: 'Seja objetivo e celebre a decisao',
        mensagem: `Que otimo, [Nome]! 🎉💚

Estou muito feliz que voce decidiu cuidar da saude dos seus cabelos!

Para dar inicio ao seu tratamento, preciso de alguns dados:

👤 Nome completo:
📅 Data de nascimento:
🆔 CPF:
📧 Email:
📱 Telefone:
🏠 Endereco completo:

*Forma de pagamento:* Pix ou cartao em [X]x?

*Primeira sessao disponivel:* [DATA] as [HORA]

Assim que confirmar os dados, ja agendo sua sessao!`,
        variacoes: [],
        gatilhos: ['Celebracao', 'Clareza', 'Agilidade']
      },
      {
        id: 'fech-2',
        titulo: 'Boas-vindas ao Tratamento',
        tipo: 'principal',
        contexto: 'Apos confirmar pagamento/dados',
        dica: 'Faca o paciente se sentir especial e bem cuidado',
        mensagem: `Seja muito bem-vindo(a) a Cabelo & Saude, [Nome]! 💚🌿

Estamos muito felizes em iniciar essa jornada com voce!

*Sua primeira sessao:*
📅 Data: [DATA]
⏰ Horario: [HORA]
📍 Local: [ENDERECO]

*Orientacoes para a sessao:*
[ORIENTACOES_ESPECIFICAS]

*O que esperar:*
- Duracao: [X] minutos
- Procedimento: [DESCRICAO]
- Cuidados pos-sessao: te explicaremos no dia

Qualquer duvida ate la, estou por aqui!

Vamos juntos recuperar a saude dos seus cabelos! 🌱`,
        variacoes: [],
        gatilhos: ['Acolhimento', 'Clareza de expectativas', 'Entusiasmo']
      },
      {
        id: 'fech-3',
        titulo: 'Confirmacao de Sessao',
        tipo: 'followup',
        contexto: '24h antes de cada sessao',
        dica: 'Manter contato constante aumenta aderencia',
        mensagem: `Ola [Nome]! 💚

Amanha temos sua sessao de tratamento!

📅 Data: [DATA]
⏰ Horario: [HORA]

*Lembretes:*
[ORIENTACOES_PRE_SESSAO]

Posso confirmar sua presenca? ✅`,
        variacoes: [],
        gatilhos: ['Cuidado', 'Organizacao', 'Aderencia']
      }
    ]
  },

  reengajamento: {
    nome: 'Reengajamento',
    icone: 'redo',
    cor: '#1a5f52',
    descricao: 'Retomar contato com leads que esfriaram',
    objetivo: 'Reativar interesse e retomar jornada',
    tempo_ideal: '14-30 dias apos ultimo contato',
    scripts: [
      {
        id: 'reeng-1',
        titulo: 'Reengajamento - 14 dias',
        tipo: 'principal',
        contexto: '14 dias sem resposta apos proposta',
        dica: 'Retome com valor, nao com cobranca',
        mensagem: `Ola [Nome], tudo bem? 💚

Faz um tempinho que conversamos sobre seu tratamento capilar.

Sei que tomar essa decisao nem sempre e facil. Por isso queria saber:

Tem alguma duvida que eu possa esclarecer?
Ou alguma preocupacao que te impediu de comecar?

Estou aqui pra ajudar, sem pressao. 😊

Se quiser, posso te enviar alguns conteudos sobre cuidados capilares que voce pode fazer em casa enquanto decide.`,
        variacoes: [],
        gatilhos: ['Empatia', 'Valor', 'Baixa pressao']
      },
      {
        id: 'reeng-2',
        titulo: 'Reengajamento - Conteudo',
        tipo: 'variacao',
        contexto: 'Retomar com valor educativo',
        dica: 'Agregue valor sem pedir nada',
        mensagem: `[Nome], lembrei de voce ao ver esse conteudo! 💚

[LINK_CONTEUDO]

E sobre [TEMA] - achei que poderia te interessar.

Se em algum momento quiser retomar nossa conversa sobre tratamento, estou por aqui!

Cuide-se! 🌿`,
        variacoes: [],
        gatilhos: ['Valor gratuito', 'Relacionamento', 'Porta aberta']
      },
      {
        id: 'reeng-3',
        titulo: 'Reengajamento - Direto',
        tipo: 'variacao',
        contexto: '30 dias sem contato, ultima tentativa',
        dica: 'Seja direto mas respeitoso',
        mensagem: `Oi [Nome], tudo bem?

Tentei contato algumas vezes mas nao consegui retorno.

Entendo se o momento nao e o ideal ou se voce decidiu nao prosseguir - cada um tem seu tempo!

Me conta: voce ainda tem interesse em tratar a queda capilar?

Se sim, podemos retomar de onde paramos.
Se nao, sem problemas! So me avisa pra eu nao ficar te incomodando. 😊

De qualquer forma, desejo o melhor pra voce! 💚`,
        variacoes: [],
        gatilhos: ['Respeito', 'Clareza', 'Dignidade']
      }
    ]
  }
};

export const SEQUENCIAS_COMPLETAS = [
  {
    nome: 'Sequencia de Captacao',
    descricao: 'Do primeiro contato ate avaliacao agendada',
    icone: 'route',
    etapas: [
      { dia: 0, acao: 'Resposta inicial', script_id: 'capt-1' },
      { dia: 0, acao: 'Qualificacao', script_id: 'qual-1' },
      { dia: 0, acao: 'Convite para avaliacao', script_id: 'agend-1' },
      { dia: 1, acao: 'Confirmacao se agendou', script_id: 'agend-2' }
    ]
  },
  {
    nome: 'Sequencia Pos-Avaliacao',
    descricao: 'Da avaliacao ate fechamento',
    icone: 'tasks',
    etapas: [
      { dia: 0, acao: 'Envio de proposta', script_id: 'prop-1' },
      { dia: 3, acao: 'Follow-up proposta', script_id: 'prop-2' },
      { dia: 7, acao: 'Follow-up final', script_id: 'prop-3' },
      { dia: 14, acao: 'Reengajamento', script_id: 'reeng-1' }
    ]
  },
  {
    nome: 'Sequencia de Tratamento',
    descricao: 'Acompanhamento durante tratamento',
    icone: 'heartbeat',
    etapas: [
      { dia: 0, acao: 'Boas-vindas', script_id: 'fech-2' },
      { dia: -1, acao: 'Confirmacao antes da sessao', script_id: 'fech-3' },
      { dia: 1, acao: 'Pos-sessao - como foi', script_id: 'acomp-1' }
    ]
  }
];

export const DICAS_COMUNICACAO = [
  {
    titulo: 'Empatia em Primeiro Lugar',
    icone: 'heart',
    dicas: [
      'Queda capilar afeta autoestima - acolha antes de vender',
      'Valide sentimentos do paciente',
      'Nao minimize o problema ("e so cabelo")',
      'Muitos pacientes sofrem em silencio - seja um espaco seguro'
    ]
  },
  {
    titulo: 'Linguagem de Saude',
    icone: 'comments',
    dicas: [
      'Use "paciente", nao "cliente"',
      'Fale em "tratamento", nao "servico"',
      'Use "investimento em saude", nao "preco"',
      'Evite promessas milagrosas - seja honesta'
    ]
  },
  {
    titulo: 'Tempo de Resposta',
    icone: 'clock',
    dicas: [
      'Responda em ate 5 minutos (leads esfriam rapido)',
      'Leads de saude sao urgentes - a pessoa esta preocupada',
      'Se nao puder responder completo, ao menos de sinal de vida',
      'Horario comercial: resposta imediata | Fora: ate 2h'
    ]
  },
  {
    titulo: 'O que Evitar',
    icone: 'ban',
    dicas: [
      'Prometer resultados sem avaliar',
      'Pressionar demais - saude nao se vende assim',
      'Desqualificar outros profissionais',
      'Usar medo excessivo como argumento'
    ]
  }
];

export const TEMPLATES_CONTEUDO = {
  queda_capilar: {
    nome: 'Queda Capilar',
    mensagem: `Sabia que existem mais de 100 causas diferentes para queda de cabelo?

Por isso que Minoxidil e Finasterida nao funcionam pra todo mundo - eles tratam causas especificas.

Aqui na Cabelo & Saude, investigamos QUAL e a sua causa antes de propor tratamento.

Quer saber mais?`
  },
  calvicie: {
    nome: 'Calvicie',
    mensagem: `Calvicie nao e sentenca definitiva.

Dependendo do estagio e das causas associadas, podemos:
✅ Retardar significativamente a progressao
✅ Fortalecer os fios existentes
✅ Reativar foliculos ainda viaveis

O primeiro passo e investigar. Ja fez avaliacao tricologica?`
  },
  tratamentos_naturais: {
    nome: 'Tratamentos Naturais',
    mensagem: `Busca tratamento natural para queda de cabelo?

A boa noticia: existem protocolos que nao dependem apenas de medicamentos fortes.

Trabalhamos com:
- Nutricao capilar
- Laserterapia
- Protocolos topicos
- Suplementacao personalizada

Quer conhecer as opcoes?`
  }
};

// ========================================
// SCRIPTS - Formato compativel com Paper Vines
// Para compatibilidade com a pagina de scripts
// ========================================

export const SCRIPTS = {
  prospeccao: [
    {
      titulo: 'Resposta Inicial - Instagram/WhatsApp',
      mensagem: `Ola! Tudo bem? 💚

Que bom que voce nos procurou!

Aqui na Cabelo & Saude, a Franciele - biomedica especialista em tricologia - trata a *causa* do problema capilar, nao apenas os sintomas.

Me conta um pouquinho: ha quanto tempo voce percebeu a queda ou afinamento dos fios?`
    },
    {
      titulo: 'Resposta para Lead de Anuncio',
      mensagem: `Ola! Que bom que voce se interessou! 💚

Aqui na Cabelo & Saude fazemos diferente:
❌ Nao dependemos so de Minoxidil e Finasterida
✅ Investigamos a raiz do problema
✅ Protocolo personalizado pro seu caso

Posso te fazer algumas perguntas para entender melhor sua situacao?`
    },
    {
      titulo: 'Resposta para Indicacao',
      mensagem: `Ola [Nome]! Que bom falar com voce! 💚

Fico feliz que alguem de confianca tenha indicado a Cabelo & Saude!

Me conta: como esta a situacao hoje com seus cabelos?`
    }
  ],

  teste_gratuito: {
    titulo: 'Convite para Avaliacao',
    mensagem: `Quer entender de verdade o que esta causando sua queda capilar?

A avaliacao tricologica inclui:
✅ Anamnese completa
✅ Tricoscopia digital (exame do couro cabeludo)
✅ Diagnostico personalizado
✅ Proposta de tratamento

💚 Agende sua avaliacao
📱 Responda essa mensagem ou clique no link:
[LINK_AGENDAMENTO]

Cabelo & Saude - Clinica de Tricologia
www.cabeloesaude.com.br`
  },

  followup: [
    {
      titulo: 'Follow-up 24h',
      mensagem: `Ola [Nome]! Tudo bem? 💚

Conversamos ontem sobre sua situacao capilar.

Conseguiu pensar sobre a avaliacao tricologica?

Lembre-se: quanto antes investigarmos, mais opcoes de tratamento teremos.

Posso agendar um horario pra voce?`
    },
    {
      titulo: 'Follow-up 3 dias',
      mensagem: `Oi [Nome], tudo bem?

Queria saber como voce esta.

Sei que decidir sobre tratamento capilar nao e facil. Se tiver alguma duvida, pode me perguntar!

Estou aqui pra ajudar 💚`
    },
    {
      titulo: 'Follow-up 7 dias',
      mensagem: `[Nome], como vai? 💚

Faz uma semana que conversamos. Queria saber se posso ajudar com mais alguma informacao.

Se o momento nao for agora, tudo bem! Mas saiba que estamos aqui quando precisar.

Cuide-se! 🌿`
    }
  ],

  demonstracao: [
    {
      titulo: 'Apresentacao dos Tratamentos',
      mensagem: `[Nome], baseado na sua avaliacao, vou explicar as opcoes de tratamento:

📋 *Seu diagnostico:*
[DIAGNOSTICO]

💊 *Protocolo recomendado:*
[PROTOCOLO]

📅 *Frequencia:*
[FREQUENCIA]

💰 *Investimento:*
[VALOR]

Posso explicar cada etapa em detalhes?`
    }
  ],

  objecao_preco: [
    {
      titulo: 'Contornar - Parcelamento',
      mensagem: `Entendo sua preocupacao com o investimento, [Nome].

Pensando nisso, oferecemos:
💳 Parcelamento em ate 12x no cartao
💵 Desconto de 10% no Pix a vista
📦 Pacotes com valores reduzidos

O importante e comecar o quanto antes - os foliculos tem prazo de validade.

Qual opcao se encaixa melhor pra voce?`
    },
    {
      titulo: 'Contornar - Valor vs Custo',
      mensagem: `[Nome], entendo que e um investimento.

Mas me deixa fazer uma reflexao:

Quanto voce ja gastou com:
❌ Shampoos "milagrosos"
❌ Vitaminas que nao funcionaram
❌ Remedios sem acompanhamento

Aqui voce investe uma vez, com protocolo PERSONALIZADO pra sua causa especifica.

Faz sentido pra voce?`
    }
  ],

  fechamento: [
    {
      titulo: 'Confirmacao de Inicio',
      mensagem: `Que otimo, [Nome]! 🎉💚

Estou muito feliz que voce decidiu cuidar da saude dos seus cabelos!

Para agendar sua primeira sessao, preciso confirmar:

📅 Melhor dia: [OPCOES]
⏰ Melhor horario: [OPCOES]
💳 Forma de pagamento: Pix ou cartao?

Assim que confirmar, ja reservo sua agenda!`
    },
    {
      titulo: 'Boas-vindas',
      mensagem: `Seja muito bem-vindo(a) a Cabelo & Saude, [Nome]! 💚🌿

Sua primeira sessao esta confirmada:
📅 Data: [DATA]
⏰ Horario: [HORA]
📍 Local: [ENDERECO]

*Orientacoes:*
[ORIENTACOES]

Qualquer duvida, estou por aqui!

Vamos juntos recuperar a saude dos seus cabelos! 🌱`
    }
  ]
};
