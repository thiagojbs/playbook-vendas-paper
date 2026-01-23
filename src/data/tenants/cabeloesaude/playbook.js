// Conteudo do Playbook de Vendas - Clinica de Tricologia Cabelo & Saude
// Processo de vendas adaptado para consultas e tratamentos capilares

export const PROCESSO_VENDAS = {
  etapas: [
    {
      numero: 1,
      titulo: 'Captacao',
      descricao: 'Atrair e captar leads interessados em tratamento capilar',
      acoes: [
        'Responder mensagens de Instagram/WhatsApp rapidamente',
        'Identificar a dor principal do paciente (queda, calvicie, alopecia)',
        'Usar perguntas de qualificacao inicial',
        'Oferecer avaliacao tricologica',
        'Agendar avaliacao presencial ou online'
      ],
      tempo_estimado: '1-2 dias',
      dicas: [
        'Responda em ate 5 minutos - leads quentes esfridam rapido',
        'Demonstre empatia - muitos pacientes sofrem emocionalmente',
        'Nao prometa resultados sem avaliacao'
      ]
    },
    {
      numero: 2,
      titulo: 'Qualificacao',
      descricao: 'Entender o perfil e necessidades do paciente',
      acoes: [
        'Perguntar ha quanto tempo tem o problema',
        'Identificar tratamentos ja realizados (Minoxidil, Finasterida, etc)',
        'Verificar se ja consultou dermatologista',
        'Entender expectativas do paciente',
        'Verificar disponibilidade e poder de investimento'
      ],
      tempo_estimado: '1 conversa',
      dicas: [
        'Pacientes frustrados com tratamentos anteriores sao otimos candidatos',
        'Pergunte sobre emocional - calvicie afeta autoestima',
        'Identifique se o decisor e o proprio paciente ou familiar'
      ]
    },
    {
      numero: 3,
      titulo: 'Avaliacao',
      descricao: 'Realizar avaliacao tricologica completa',
      acoes: [
        'Confirmar presenca 24h antes',
        'Realizar anamnese completa',
        'Fazer tricoscopia (exame do couro cabeludo)',
        'Explicar diagnostico de forma clara',
        'Apresentar opcoes de tratamento',
        'Solicitar exames complementares se necessario'
      ],
      tempo_estimado: '40-60 min',
      dicas: [
        'Use linguagem acessivel, evite termos tecnicos',
        'Mostre imagens do tricoscopio ao paciente',
        'Seja honesto sobre prognostico e expectativas'
      ]
    },
    {
      numero: 4,
      titulo: 'Proposta',
      descricao: 'Apresentar protocolo de tratamento e valores',
      acoes: [
        'Montar protocolo personalizado',
        'Explicar cada etapa do tratamento',
        'Apresentar cronograma de sessoes',
        'Mostrar cases de sucesso (com autorizacao)',
        'Apresentar valores e formas de pagamento',
        'Oferecer pacotes com desconto'
      ],
      tempo_estimado: 'Mesmo dia da avaliacao',
      dicas: [
        'Apresente o investimento como cuidado com saude, nao despesa',
        'Ofereça parcelamento para facilitar decisao',
        'Destaque que o tratamento e a causa, nao paliativo'
      ]
    },
    {
      numero: 5,
      titulo: 'Negociacao',
      descricao: 'Superar objecoes e fechar o tratamento',
      acoes: [
        'Ouvir preocupacoes do paciente',
        'Tratar objecoes de preco com ROI emocional',
        'Oferecer opcoes de parcelamento',
        'Criar urgencia (agenda limitada)',
        'Coletar dados para ficha do paciente'
      ],
      tempo_estimado: '1-7 dias',
      dicas: [
        'Nao pressione - paciente precisa se sentir confortavel',
        'Use depoimentos de outros pacientes',
        'Lembre da dor que ele quer resolver'
      ]
    },
    {
      numero: 6,
      titulo: 'Fechamento',
      descricao: 'Finalizar contratacao e iniciar tratamento',
      acoes: [
        'Confirmar forma de pagamento',
        'Coletar documentos necessarios',
        'Agendar primeira sessao do tratamento',
        'Enviar orientacoes pre-tratamento',
        'Adicionar no grupo de acompanhamento',
        'Configurar lembretes de sessoes'
      ],
      tempo_estimado: '1-2 dias',
      dicas: [
        'Faca o paciente se sentir especial - ele confiou em voce',
        'Envie mensagem de boas-vindas personalizada',
        'Reforce que estara acompanhando a evolucao'
      ]
    }
  ]
};

export const SCRIPTS = {
  primeiro_contato: [
    {
      titulo: 'Resposta Inicial - Instagram/WhatsApp',
      mensagem: `Ola! Tudo bem? 💚

Vi sua mensagem e fico feliz que tenha nos procurado!

Aqui na Cabelo & Saude, tratamos a *causa* do problema capilar, nao apenas os sintomas.

Me conta um pouquinho: ha quanto tempo voce percebeu a queda/afinamento dos fios?`
    },
    {
      titulo: 'Resposta para Lead de Anuncio',
      mensagem: `Ola! Que bom que voce se interessou! 💚

Sou da equipe da Franciele, biomedica especialista em tricologia.

Aqui na Cabelo & Saude, investigamos a *raiz* do problema capilar - sem paliativos, sem Minoxidil como unica solucao.

Posso te fazer algumas perguntas para entender melhor seu caso?`
    }
  ],

  qualificacao: {
    titulo: 'Perguntas de Qualificacao',
    mensagem: `Para entender melhor seu caso, me conta:

1️⃣ Ha quanto tempo voce percebeu a queda/afinamento?
2️⃣ Ja fez algum tratamento antes? (Minoxidil, Finasterida, vitaminas?)
3️⃣ Ja consultou dermatologista sobre isso?
4️⃣ O que mais te incomoda hoje sobre seus cabelos?

Com essas informacoes, consigo te orientar melhor! 😊`
  },

  agendamento_avaliacao: {
    titulo: 'Convite para Avaliacao',
    mensagem: `[Nome], pelo que voce me contou, seu caso merece uma investigacao mais profunda.

Aqui na Cabelo & Saude fazemos uma *Avaliacao Tricologica Completa* que inclui:

✅ Anamnese detalhada do seu historico
✅ Exame com tricoscopio (vemos seu couro cabeludo ampliado)
✅ Identificacao da causa real da queda
✅ Indicacao de exames complementares se necessario
✅ Proposta de tratamento personalizado

A avaliacao dura cerca de 40-60 minutos.

Tenho horarios disponiveis [DATA]. Qual melhor pra voce?`
  },

  confirmacao_avaliacao: {
    titulo: 'Confirmacao 24h Antes',
    mensagem: `Ola [Nome]! 💚

Passando para confirmar sua *Avaliacao Tricologica* amanha:

📅 Data: [DATA]
⏰ Horario: [HORA]
📍 Endereco: [ENDERECO]

*Algumas orientacoes:*
- Nao lave o cabelo no dia (para avaliarmos oleosidade natural)
- Traga exames de sangue recentes se tiver
- Chegue 10 min antes para preencher ficha

Posso confirmar sua presenca? ✅`
  },

  pos_avaliacao: {
    titulo: 'Mensagem Pos-Avaliacao',
    mensagem: `[Nome], foi um prazer te conhecer hoje! 💚

Como conversamos, seu caso de [DIAGNOSTICO] tem solucao com o tratamento adequado.

*Seu protocolo inclui:*
[LISTA_TRATAMENTOS]

*Investimento:*
[VALORES]

*Formas de pagamento:*
- Pix com desconto
- Cartao em ate [X]x

Lembre-se: quanto antes comecarmos, melhores os resultados!

Ficou alguma duvida?`
  },

  followup_proposta: {
    titulo: 'Follow-up 3 dias',
    mensagem: `Ola [Nome], tudo bem? 💚

Passando para saber se conseguiu pensar sobre o tratamento.

Sei que e uma decisao importante, mas lembre-se:
- Quanto mais cedo iniciarmos, melhores os resultados
- A queda capilar tende a progredir sem tratamento adequado
- Trabalhamos a causa, nao apenas os sintomas

Posso te ajudar com alguma duvida? Ou prefere que eu explique novamente alguma parte do protocolo?`
  },

  coleta_dados: {
    titulo: 'Coleta para Ficha do Paciente',
    mensagem: `Que otimo, [Nome]! 🎉

Para dar inicio ao seu tratamento, preciso de alguns dados:

👤 Nome completo:
📅 Data de nascimento:
🆔 CPF:
📧 Email:
📱 Telefone:
🏠 Endereco completo:

📅 Primeira sessao disponivel: [DATA]

Assim que confirmar os dados, agendo sua sessao!`
  },

  boas_vindas: {
    titulo: 'Boas-vindas ao Tratamento',
    mensagem: `Seja muito bem-vindo(a) a Cabelo & Saude, [Nome]! 💚

Estamos muito felizes em iniciar essa jornada com voce!

*Sua primeira sessao:*
📅 Data: [DATA]
⏰ Horario: [HORA]

*Orientacoes para a sessao:*
[ORIENTACOES]

Qualquer duvida, estou por aqui!
Vamos juntos recuperar a saude dos seus cabelos! 🌿`
  },

  reengajamento: {
    titulo: 'Para Lead que Sumiu',
    mensagem: `Ola [Nome], tudo bem? 💚

Faz um tempinho que conversamos sobre seu tratamento capilar.

Sei que tomar essa decisao nem sempre e facil, mas quero te lembrar:
- A queda capilar tende a progredir com o tempo
- Quanto antes tratar, melhores os resultados
- Aqui tratamos a causa, nao fazemos paliativos

Se quiser retomar nossa conversa, estou aqui!
E se preferir, posso te enviar alguns conteudos sobre tratamento capilar. 😊`
  }
};

export const OBJECOES = [
  {
    objecao: 'Esta muito caro / Nao tenho dinheiro',
    resposta: `Entendo sua preocupacao com o investimento, [Nome].

Mas pense comigo: quanto voce ja gastou em Minoxidil, vitaminas, shampoos "milagrosos" que nao resolveram?

Aqui tratamos a *causa* do problema. O investimento se paga porque:
- Voce para de gastar com produtos que nao funcionam
- O tratamento tem duracao definida
- Os resultados sao duradouros

Temos opcoes de parcelamento em ate [X]x no cartao.

Quer que eu monte um plano que caiba no seu orcamento?`
  },
  {
    objecao: 'Preciso pensar / Vou avaliar',
    resposta: `Claro, e importante pensar bem!

Mas posso te fazer uma pergunta sincera?

O que mais te preocupa: o investimento, o tempo de tratamento, ou se realmente vai funcionar?

Entendendo sua principal duvida, posso te ajudar a tomar a melhor decisao.

Lembre-se: a queda capilar tende a progredir. Quanto antes comecar, melhores os resultados.`
  },
  {
    objecao: 'Ja tentei varios tratamentos e nada funcionou',
    resposta: `Isso e mais comum do que voce imagina, [Nome]!

A maioria dos tratamentos la fora trata apenas o *sintoma* (a queda), nao a *causa*.

Aqui na Cabelo & Saude fazemos diferente:
- Investigamos por que voce esta perdendo cabelo
- Identificamos deficiencias, inflamacoes, problemas hormonais
- Criamos um protocolo especifico pro seu caso

Nao usamos Minoxidil e Finasterida como unica solucao - isso e paliativo.

Voce merece um tratamento que va na raiz do problema!`
  },
  {
    objecao: 'Vou esperar mais um pouco',
    resposta: `Entendo, [Nome]. Mas preciso te contar uma verdade importante:

A queda capilar nao espera.

Cada foliculo que se "fecha" e mais dificil de recuperar.
O que tratamos hoje em 6 meses, pode levar 1 ano daqui a 6 meses.

Nao estou te pressionando - e que vi muitos pacientes que se arrependeram de esperar.

Que tal comecarmos com o tratamento minimo? Assim voce ja freia a queda enquanto decide pelo protocolo completo?`
  },
  {
    objecao: 'Meu dermatologista ja me passou Minoxidil/Finasterida',
    resposta: `Esses medicamentos tem seu lugar, [Nome]. Mas preciso te explicar algo:

Minoxidil e Finasterida tratam o *sintoma*, nao a *causa*.

Por isso muitas pessoas usam por anos e, quando param, a queda volta.

Aqui na Cabelo & Saude fazemos diferente:
- Investigamos POR QUE voce esta perdendo cabelo
- Tratamos a causa (hormonal, nutricional, inflamatoria)
- Usamos medicamentos como parte de um protocolo, nao como unica solucao

Voce ja fez exames para investigar a causa?`
  },
  {
    objecao: 'Nao acredito que funcione pra mim',
    resposta: `Entendo seu ceticismo, [Nome]. Depois de tantas tentativas frustradas, e normal duvidar.

Por isso que aqui fazemos a Avaliacao Tricologica primeiro - para te mostrar exatamente o que esta acontecendo no seu couro cabeludo.

Voce vai VER no tricoscopio a situacao dos seus foliculos.
E vou te explicar, com honestidade, o que podemos e o que nao podemos fazer no seu caso.

Se apos a avaliacao voce achar que nao vale a pena, voce decide. Sem pressao.

O que acha de conhecer pelo menos?`
  }
];

export const CHECKLIST_COMERCIAL = [
  { item: 'Responder lead em ate 5 minutos' },
  { item: 'Fazer perguntas de qualificacao' },
  { item: 'Identificar tratamentos ja tentados' },
  { item: 'Agendar avaliacao tricologica' },
  { item: 'Enviar confirmacao 24h antes' },
  { item: 'Realizar avaliacao completa' },
  { item: 'Apresentar diagnostico e protocolo' },
  { item: 'Explicar valores e parcelamento' },
  { item: 'Tratar objecoes com empatia' },
  { item: 'Coletar dados do paciente' },
  { item: 'Agendar primeira sessao' },
  { item: 'Enviar boas-vindas ao tratamento' }
];

export const CHECKLIST_AVALIACAO = [
  { item: 'Paciente preencheu ficha de anamnese' },
  { item: 'Verificar historico de tratamentos anteriores' },
  { item: 'Realizar tricoscopia completa' },
  { item: 'Fotografar areas afetadas (com autorizacao)' },
  { item: 'Explicar diagnostico em linguagem acessivel' },
  { item: 'Mostrar imagens do tricoscopio ao paciente' },
  { item: 'Apresentar opcoes de tratamento' },
  { item: 'Solicitar exames complementares se necessario' },
  { item: 'Entregar orcamento por escrito' },
  { item: 'Agendar retorno se paciente quiser pensar' }
];

export const DIFERENCIAIS = [
  {
    titulo: 'Tratamos a Causa, Nao o Sintoma',
    descricao: 'Investigamos por que voce esta perdendo cabelo, nao apenas "tampamos o sol com a peneira".',
    icone: 'search'
  },
  {
    titulo: 'Sem Paliativos',
    descricao: 'Nao usamos Minoxidil e Finasterida como unica solucao - isso e tratamento de sintoma.',
    icone: 'ban'
  },
  {
    titulo: 'Biomedica Especialista',
    descricao: 'Franciele e biomedica com especializacao em tricologia e 7 anos de experiencia.',
    icone: 'user-md'
  },
  {
    titulo: 'Tecnologia de Diagnostico',
    descricao: 'Usamos tricoscopia e exames complementares para diagnostico preciso.',
    icone: 'microscope'
  },
  {
    titulo: 'Protocolo Personalizado',
    descricao: 'Cada paciente recebe um tratamento especifico para seu caso.',
    icone: 'clipboard-list'
  },
  {
    titulo: 'Acompanhamento Continuo',
    descricao: 'Monitoramos a evolucao e ajustamos o tratamento conforme necessario.',
    icone: 'chart-line'
  }
];

export const TIPOS_TRATAMENTO = [
  {
    nome: 'Queda Capilar',
    descricao: 'Tratamento para queda acentuada de cabelos',
    sinais: ['Cabelos no travesseiro', 'Cabelos no ralo do banho', 'Reducao do volume'],
    abordagem: 'Investigacao de causas (hormonais, nutricionais, estresse) + protocolo especifico'
  },
  {
    nome: 'Alopecia Androgenica',
    descricao: 'Calvicie de padrao masculino ou feminino',
    sinais: ['Entradas aumentando', 'Coroa rareando', 'Fios afinando'],
    abordagem: 'Controle hormonal local + estimulacao folicular + nutricao capilar'
  },
  {
    nome: 'Alopecia Areata',
    descricao: 'Queda em areas circulares especificas',
    sinais: ['Falhas redondas', 'Queda subita', 'Areas sem cabelo'],
    abordagem: 'Investigacao imunologica + tratamento localizado + acompanhamento'
  },
  {
    nome: 'Efluvio Telogeno',
    descricao: 'Queda difusa pos-estresse ou doenca',
    sinais: ['Queda intensa e difusa', 'Pos-COVID', 'Pos-parto', 'Pos-cirurgia'],
    abordagem: 'Suporte nutricional + estimulacao + tratamento da causa base'
  },
  {
    nome: 'Dermatite Seborreica',
    descricao: 'Inflamacao do couro cabeludo',
    sinais: ['Coceira', 'Descamacao', 'Oleosidade excessiva', 'Caspa'],
    abordagem: 'Controle da oleosidade + anti-inflamatorio + manutencao'
  }
];

export const LINKS_UTEIS = {
  site: 'https://www.cabeloesaude.com.br/',
  instagram: 'https://www.instagram.com/cabeloesaude/',
  agendamento: '', // A ser preenchido
  depoimentos: '' // Link para depoimentos se houver
};
