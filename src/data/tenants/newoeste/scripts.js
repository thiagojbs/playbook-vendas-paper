// Scripts de Vendas - New Oeste Telecom
// Roteiros prontos para cada etapa do processo de vendas
// Personalize conforme seu estilo, mas mantenha a estrutura
// Ultima atualizacao: 2026-02-03

// ========================================
// SCRIPTS DE PROSPECCAO E PRIMEIRO CONTATO
// ========================================

export const SCRIPTS = {

  // SCRIPT 1: COLD CALL (LIGACAO FRIA)
  'cold-call-residencial': {
    id: 'cold-call-residencial',
    nome: 'Ligacao Fria - Residencial',
    etapa: 'Prospeccao',
    duracao: '2-3 minutos',
    objetivo: 'Despertar interesse e qualificar o lead',
    cenario: 'Ligacao para residencia sem contato previo',

    script: `
[ABERTURA - 15 segundos]
Ola, bom dia/boa tarde! Me chamo [SEU NOME], sou consultor da New Oeste, provedor de internet de Foz do Iguacu. Estou ligando porque estamos levando fibra optica para sua regiao, no [BAIRRO]. O [NOME] esta em casa/disponivel?

[SE PERGUNTAR "COMO CONSEGUIU MEU NUMERO"]
Estamos fazendo um mapeamento das residencias na regiao que estao recebendo nossa fibra optica. Sao so 2 minutinhos, pode ser?

[QUALIFICACAO RAPIDA - 30 segundos]
[NOME], voce usa internet em casa atualmente?

[SE SIM] Qual operadora voce usa hoje?
[SE NAO] Entendo. Tem interesse em ter internet de alta velocidade?

[DESCOBERTA RAPIDA - 1 minuto]
E posso te fazer duas perguntas rapidas?
1. Qual o principal uso da internet ai? Trabalho, estudos, entretenimento?
2. Voce esta satisfeito com a velocidade e estabilidade?

[SE INSATISFEITO - CRIAR INTERESSE]
Entendo perfeitamente! Muitos vizinhos seus tinham o mesmo problema. Por isso estamos levando fibra optica, que e MUITO mais rapida e estavel. Teria interesse em conhecer?

[SE SATISFEITO - PLANTAR SEMENTE]
Que bom! Mas mesmo satisfeito, imagina ter velocidade garantida, sem quedas, e suporte local em minutos? Vale a pena conhecer. Posso te enviar informacoes pelo WhatsApp?

[FECHAMENTO - 20 segundos]
Otimo! Vou te enviar pelo WhatsApp [NUMERO] os detalhes da nossa internet e planos. Da uma olhada e qualquer duvida, e so chamar. Ja te adiciono aqui! Obrigado pela atencao, [NOME]. Tenha um otimo dia!
    `.trim(),

    dicas: [
      'Seja cordial mas objetivo. Tempo e precioso.',
      'Fale com energia e entusiasmo',
      'Se a pessoa estiver ocupada, pergunte melhor horario',
      'Sempre busque WhatsApp para follow-up',
      'Anote as dores mencionadas'
    ],

    variacoes: {
      manha: 'Bom dia! Espero nao estar atrapalhando...',
      tarde: 'Boa tarde! Tem um minutinho?',
      fimTarde: 'Boa tarde! Sei que e fim de tarde mas e rapidinho...'
    }
  },

  // SCRIPT 2: WHATSAPP - PRIMEIRO CONTATO
  'whatsapp-primeiro-contato': {
    id: 'whatsapp-primeiro-contato',
    nome: 'WhatsApp - Primeiro Contato',
    etapa: 'Prospeccao',
    objetivo: 'Iniciar conversa e despertar interesse',
    cenario: 'Mensagem inicial via WhatsApp',

    scriptTexto: `
Ola, [NOME]! 👋

Me chamo [SEU NOME], sou da *New Oeste* - provedor de internet de Foz do Iguacu.

Estamos levando *fibra optica* para o [BAIRRO] e vim te contar sobre isso! 🚀

Voce usa internet em casa atualmente?
    `.trim(),

    fluxoConversa: [
      {
        resposta: 'Sim, ja tenho internet',
        proximaMensagem: `
Entendo! Qual operadora voce usa hoje?

Pergunto porque nossa fibra optica e MUITO superior a cabo ou radio:
✅ Velocidade real (nada de "ate X megas")
✅ Zero quedas
✅ Suporte local rapido
✅ Instalacao em ate 72h

Vale a pena conhecer! Posso te passar os planos?
        `.trim()
      },
      {
        resposta: 'Nao tenho internet',
        proximaMensagem: `
Perfeito! Entao e a hora ideal para comecar com o melhor! 💪

Temos planos a partir de R$ [VALOR] com:
✅ Fibra optica ate sua casa
✅ Instalacao gratis
✅ Velocidade garantida
✅ Suporte 24/7

Quantas pessoas usam internet ai em casa?
        `.trim()
      },
      {
        resposta: 'Tenho interesse',
        proximaMensagem: `
Otimo! 🎉

Para te recomendar o melhor plano, me conta:
1. Quantas pessoas usam a internet?
2. Trabalha/estuda de casa?
3. Assiste muito streaming (Netflix, YouTube)?
4. Alguem joga online?

Assim consigo indicar a velocidade ideal para voce!
        `.trim()
      }
    ],

    materiaisEnviar: [
      'Tabela de planos (imagem)',
      'Video explicativo (se houver)',
      'Depoimento de cliente do bairro',
      'Link para site'
    ],

    dicas: [
      'Use emojis com moderacao (1-2 por mensagem)',
      'Seja pessoal mas profissional',
      'Responda rapidamente (maximo 5 minutos)',
      'Faca uma pergunta por mensagem',
      'Use * * para negrito em palavras-chave'
    ]
  },

  // SCRIPT 3: RETORNO DE LEAD INBOUND
  'retorno-lead-inbound': {
    id: 'retorno-lead-inbound',
    nome: 'Retorno de Lead Inbound',
    etapa: 'Qualificacao',
    objetivo: 'Retornar contato de quem demonstrou interesse',
    cenario: 'Cliente preencheu formulario ou pediu contato',

    scriptLigacao: `
[ABERTURA]
Ola, [NOME]! Bom dia/boa tarde!

Me chamo [SEU NOME], sou consultor da New Oeste. Voce preencheu um cadastro no nosso site pedindo informacoes sobre internet fibra optica. E um bom momento para conversarmos?

[SE SIM - CONTINUAR]
[SE NAO] Sem problema! Qual horario seria melhor para te ligar? [ANOTAR E REAGENDAR]

[CONFIRMAR DADOS]
Deixa eu so confirmar: seu endereco e [ENDERECO], correto?
Perfeito! Ja verifiquei aqui e temos cobertura na sua regiao! 🎉

[DESCOBERTA]
[NOME], me conta um pouco: o que te motivou a buscar uma nova internet?

[OUVIR ATENTAMENTE]

Entendo! E atualmente, qual internet voce usa?
Qual velocidade contratada?
Esta atendendo suas necessidades?

[APROFUNDAR NA DOR]
E esses [PROBLEMAS MENCIONADOS], com que frequencia acontecem?
Ja tentou resolver com o suporte deles?

[CRIAR DESEJO]
Entendo perfeitamente sua situacao. E exatamente por isso que tantas pessoas estao migrando para nossa fibra optica.

Deixa eu te explicar o que torna a gente diferente...

[APRESENTAR SOLUCAO]
[CONTINUAR COM SCRIPT DE APRESENTACAO]
    `.trim(),

    scriptWhatsApp: `
Ola, [NOME]! 👋

Vi que voce se cadastrou no nosso site interessado em fibra optica!

Ja verifiquei e temos cobertura no seu endereco! ✅

Para te passar a melhor proposta, posso te fazer umas perguntinhas rapidas?

📱 Ligacao agora OU
💬 Conversa aqui no WhatsApp?

Como prefere?
    `.trim(),

    dicas: [
      'Retorne em ate 5 minutos (lead quente!)',
      'Mencione que ele demonstrou interesse (nao e cold)',
      'Seja mais direto (ele ja te quer)',
      'Aproveite o momentum para fechar rapidamente'
    ]
  },

  // SCRIPT 4: APRESENTACAO COMERCIAL COMPLETA
  'apresentacao-completa': {
    id: 'apresentacao-completa',
    nome: 'Apresentacao Comercial Completa',
    etapa: 'Apresentacao',
    duracao: '10-15 minutos',
    objetivo: 'Apresentar a empresa e criar desejo',
    cenario: 'Cliente qualificado, pronto para ouvir proposta',

    estrutura: [
      {
        parte: '1. Apresentacao da Empresa (2 min)',
        script: `
[NOME], antes de falar dos planos, deixa eu te contar rapidinho sobre a New Oeste.

Somos uma empresa local, de Foz do Iguacu mesmo, especializada em levar internet de verdade para residencias e empresas da regiao.

Diferente das grandes operadoras que voce conhece, nos somos uma empresa que:
• Entende as necessidades locais
• Tem suporte tecnico aqui (nao e call center na India!)
• Responde em minutos, nao em dias
• Trata cada cliente como unico

Hoje ja somos mais de [X MIL] clientes satisfeitos em Foz e regiao!

Faz sentido?
        `.trim()
      },
      {
        parte: '2. Tecnologia Fibra Optica (3 min)',
        script: `
Agora, deixa eu te explicar por que fibra optica e TÃO superior:

[DESENHAR COMPARACAO]

🔴 CABO/RADIO (Maioria das operadoras)
• Sinal compartilhado = lentidao em horario de pico
• Sofre interferencia (chuva, calor)
• Velocidade "ate" X megas (nunca chega)
• Upload lento

🟢 FIBRA OPTICA (New Oeste)
• Sinal dedicado = velocidade constante
• Zero interferencia climatica
• Velocidade REAL garantida
• Upload = Download (simetrica)

E o mais importante: nossa fibra vai ATE DENTRO DA SUA CASA (FTTH)!

Nao e fibra ate o poste e depois cabo... E fibra 100%!

Voce sabia dessa diferenca?
        `.trim()
      },
      {
        parte: '3. Diferenciais Competitivos (3 min)',
        script: `
E por que escolher a New Oeste especificamente?

✅ VELOCIDADE REAL
Contratou 300 megas? Chega 300 megas. Sempre.

✅ SUPORTE LOCAL
Problema? Tecnico na sua casa em horas, nao dias.
WhatsApp direto com a equipe.

✅ INSTALACAO RAPIDA
Ate 72 horas. Nada de esperar 30-60 dias.

✅ SEM BUROCRACIA
Contratacao digital, rapida, sem filas.

✅ EMPRESA LOCAL
Seu dinheiro fica na regiao, nao vai pra Sao Paulo.

✅ [ADICIONAR OUTROS DIFERENCIAIS]

Algum desses pontos e especialmente importante para voce?
        `.trim()
      },
      {
        parte: '4. Proposta Personalizada (5 min)',
        script: `
Agora, baseado no que voce me falou, deixa eu te propor o plano ideal:

[RECAPITULAR NECESSIDADES]
• Voce mencionou que [usa para X]
• Sao [Y pessoas] usando simultaneamente
• Voce precisa de [estabilidade/velocidade/suporte]

[PROPOSTA]
O plano perfeito para voce e o *[NOME DO PLANO]*:

📊 [XXX] MBPS
• Download: [XXX] Mbps REAL
• Upload: [XXX] Mbps (mesma velocidade!)
• Ideal para [aplicacao especifica]

💰 INVESTIMENTO
• R$ [VALOR]/mes
• Instalacao GRATUITA
• Equipamentos INCLUSOS (Roteador Wi-Fi 6)
• [BENEFICIOS ADICIONAIS]

⚡ INICIO RAPIDO
• Instalacao em ate [X] dias
• Suporte imediato
• [SEM/COM] fidelidade de [X] meses

Isso resolve tudo que voce precisa, concorda?
        `.trim()
      }
    ],

    perguntasInteracao: [
      'Faz sentido ate aqui?',
      'Alguma duvida sobre isso?',
      'Conhecia essa diferenca?',
      'Concorda que faria diferenca para voce?'
    ],

    dicas: [
      'Pause frequentemente para interacao',
      'Use analogias simples',
      'Seja visual (se presencial, desenhe)',
      'Conecte cada ponto com a necessidade dele',
      'Confirme entendimento constantemente'
    ]
  },

  // SCRIPT 5: FECHAMENTO DE VENDA
  'fechamento-venda': {
    id: 'fechamento-venda',
    nome: 'Fechamento de Venda',
    etapa: 'Fechamento',
    objetivo: 'Obter compromisso e avançar para contratacao',
    cenario: 'Cliente demonstrou interesse, objecoes superadas',

    sinaisCompra: [
      'Faz perguntas sobre instalacao',
      'Pergunta sobre forma de pagamento',
      'Compara detalhes de planos',
      'Menciona cancelar provedor atual',
      'Pergunta quando pode comecar'
    ],

    tecnicasFechamento: [
      {
        nome: 'Fechamento Direto',
        quando: 'Cliente claramente interessado',
        script: `
[NOME], ficou claro que esse plano atende perfeitamente suas necessidades, certo?

[AGUARDAR CONFIRMACAO]

Otimo! Entao vamos fazer o seguinte: ja vou iniciar seu cadastro aqui e agendar a instalacao. Quando seria melhor para voce? Manha ou tarde?
        `.trim()
      },
      {
        nome: 'Fechamento por Escolha',
        quando: 'Cliente entre dois planos',
        script: `
Entao temos duas opcoes excelentes para voce:

Opcao 1: Plano [X] - R$ [VALOR] - [VELOCIDADE]
Opcao 2: Plano [Y] - R$ [VALOR] - [VELOCIDADE]

Qual faz mais sentido para sua realidade?

[ESCOLHER]

Perfeito! Vamos com o [PLANO ESCOLHIDO]. Pode ser boleto ou cartao?
        `.trim()
      },
      {
        nome: 'Fechamento com Urgencia',
        quando: 'Cliente hesitante mas interessado',
        script: `
[NOME], tudo que conversamos aqui mostra que esse plano resolve seus problemas, concorda?

[SIM]

So um detalhe importante: [PROMOCAO/DISPONIBILIDADE] vale ate [PRAZO]. Se quiser garantir, precisamos fechar hoje. Vamos agendar?
        `.trim()
      },
      {
        nome: 'Fechamento Experimental',
        quando: 'Cliente com receio de compromisso',
        script: `
[NOME], que tal fazermos assim: voce instala, testa por [X] dias, e se nao ficar 100% satisfeito, cancelamos sem custo. Voce nao tem nada a perder. Combinado?
        `.trim()
      }
    ],

    fluxoPosConfirmacao: `
[CLIENTE ACEITOU]

Perfeito! Vou precisar de alguns dados para iniciar:

DADOS PESSOAIS:
• Nome completo
• CPF
• RG
• Data de nascimento
• Email

ENDERECO:
• CEP
• Endereco completo
• Complemento (casa/apto)
• Ponto de referencia

CONTATO:
• Telefone celular
• Telefone alternativo (opcional)

PAGAMENTO:
• Forma: [Boleto / Cartao / Debito automatico]
• Melhor dia de vencimento

[COLETAR DADOS]

Otimo! Agora vou:
✅ Enviar contrato para seu email/WhatsApp para assinatura digital
✅ Agendar instalacao para [DATA]
✅ Enviar confirmacao com todos os detalhes

Alguma duvida?

[SE NAO]

Perfeito! Voce vai receber tudo por WhatsApp. Bem-vindo a familia New Oeste, [NOME]! 🎉
    `.trim(),

    documentosNecessarios: [
      'CPF e RG (foto)',
      'Comprovante de residencia (foto)',
      'Selfie segurando documento (para validacao)'
    ]
  },

  // SCRIPT 6: FOLLOW-UP POS-PROPOSTA
  'follow-up-pos-proposta': {
    id: 'follow-up-pos-proposta',
    nome: 'Follow-up Pos-Proposta',
    etapa: 'Follow-up',
    objetivo: 'Reengajar cliente que pediu tempo',
    cenario: 'Cliente recebeu proposta e disse que ia pensar',

    timing: [
      '24 horas apos proposta inicial',
      '3 dias se sem resposta',
      '7 dias para tentativa final'
    ],

    scriptLigacao24h: `
[ABERTURA]
Oi, [NOME]! Tudo bem? E o [SEU NOME] aqui, da New Oeste.

Lembra que conversamos ontem sobre internet fibra optica?

[AGUARDAR RESPOSTA]

Entao, estou ligando para ver se ficou alguma duvida ou se voce gostaria de mais informacoes sobre alguma coisa.

[OUVIR]

[SE TEM DUVIDA] - Responder e tentar fechar
[SE AINDA PENSANDO] - Criar urgencia
[SE PERDEU INTERESSE] - Entender porque

[CRIAR URGENCIA SE NECESSARIO]
Entendo. So para voce saber: aquela condicao que te passei vale ate [PRAZO]. Se decidir depois, o valor seria [MAIOR]. Nao quero que voce perca essa oportunidade!

Quando voce acha que vai decidir?

[SE DER PRAZO]
Perfeito! Te ligo [DIA] entao. Mas se decidir antes, e so chamar no WhatsApp!
    `.trim(),

    scriptWhatsApp24h: `
Oi, [NOME]! Tudo bem? 😊

Vi que ainda nao fechou a instalacao da internet.

Ficou alguma duvida?

Ou quer que eu reenvie a proposta?

Estou aqui para ajudar! 💪
    `.trim(),

    scriptLigacao7dias: `
[ULTIMA TENTATIVA]
Oi, [NOME]! Tudo bem?

E o [SEU NOME], da New Oeste. Faz uns dias que conversamos sobre internet.

Imagino que talvez o timing nao seja o melhor para voce agora, ne?

[OUVIR]

Sem problema! So queria deixar claro que se em algum momento precisar de internet de qualidade, e so me chamar. Vou deixar meu WhatsApp salvo aqui para voce.

Posso te ajudar com mais alguma coisa?

[SE NAO]
Certo! Qualquer coisa, estou a disposicao. Tenha um otimo dia!
    `.trim(),

    dicas: [
      'Nao seja insistente ou chato',
      'Ofereça ajuda genuina, nao pressao',
      'Se perdeu, aceite e deixe porta aberta',
      'Pergunte o que mudou desde a ultima conversa',
      'Mantenha relacionamento (pode comprar futuramente)'
    ]
  },

  // SCRIPT 7: VENDAS EMPRESARIAIS
  'vendas-empresariais': {
    id: 'vendas-empresariais',
    nome: 'Vendas Empresariais / B2B',
    etapa: 'Apresentacao',
    objetivo: 'Vender planos empresariais',
    cenario: 'Prospeccao ou atendimento a empresa',

    diferencasB2B: [
      'Ciclo de venda mais longo',
      'Decisao envolve multiplas pessoas',
      'Foco em ROI e produtividade',
      'SLA e uptime sao criticos',
      'Necessidade de nota fiscal',
      'Contrato formal obrigatorio'
    ],

    scriptInicial: `
[ABERTURA PROFISSIONAL]
Bom dia/boa tarde! Me chamo [SEU NOME], sou consultor de solucoes corporativas da New Oeste.

Gostaria de falar com o responsavel por TI / compras / administracao.

[SE FOR A PESSOA CERTA]
Perfeito! [NOME EMPRESA] usa internet para operacao, correto?

[DESCOBERTA EMPRESARIAL]
Para entender como posso ajudar, posso fazer algumas perguntas sobre a operacao de voces?

1. Quantos colaboradores/computadores conectados?
2. Quais sistemas criticos? (ERP, CRM, nuvem, VoIP)
3. Qual a internet atual? Qual velocidade?
4. Ja tiveram problemas de queda ou lentidao?
5. Esses problemas impactaram a operacao?
6. Como e o suporte da operadora atual?

[OUVIR ATENTAMENTE E ANOTAR DORES]

[APRESENTAR SOLUCAO CORPORATIVA]
Entendo perfeitamente. Olha, [NOME], internet para empresa NAO pode ser igual a residencial.

Voces precisam de:
✅ Velocidade garantida (SLA contratual)
✅ IP fixo para sistemas
✅ Upload rapido (backups, nuvem)
✅ Uptime de 99.9%
✅ Suporte prioritario
✅ Redundancia (backup de link)

E exatamente isso que oferecemos no nosso plano empresarial.

[DETALHAR PLANO]

Teria interesse em receber uma proposta formal?
    `.trim(),

    propostaEmpresarial: {
      elementos: [
        'Analise de necessidades',
        'Especificacoes tecnicas',
        'SLA definido',
        'Plano de instalacao',
        'Suporte incluido',
        'Preco com impostos',
        'Prazo de validade',
        'Termos contratuais'
      ],
      formato: 'PDF profissional com logo, graficos e referencias'
    },

    perguntasROI: [
      'Quanto custa 1 hora de operacao parada?',
      'Quantos clientes atendem por dia?',
      'Qual o ticket medio?',
      'Ja perderam vendas por queda de internet?',
      'Quanto investem em TI por mes?'
    ]
  },

  // SCRIPT 8: POS-VENDA E FIDELIZACAO
  'pos-venda-satisfacao': {
    id: 'pos-venda-satisfacao',
    nome: 'Pos-Venda e Pesquisa de Satisfacao',
    etapa: 'Pos-venda',
    objetivo: 'Garantir satisfacao e gerar indicacoes',
    cenario: '24-48h apos instalacao',

    script24h: `
[WHATSAPP OU LIGACAO]
Ola, [NOME]! Tudo bem? 😊

E o [SEU NOME], da New Oeste.

So passando para saber: instalacao ocorreu tudo certo ontem?

[AGUARDAR]

Que otimo! E a internet, esta funcionando perfeitamente?

[SE SIM]
Perfeito! Ja testou a velocidade? Esta chegando os [XXX] megas contratados?

Alguma duvida sobre configuracao, senha do Wi-Fi, essas coisas?

[RESOLVER DUVIDAS]

Otimo! So para voce saber: qualquer problema, pode me chamar DIRETO neste WhatsApp, ok? Ou ligar no suporte: [TELEFONE].

Ah, e temos um programa de indicacao! Para cada amigo que contratar por sua indicacao, voce ganha [BENEFICIO]. Vou te enviar o link para compartilhar!

Seja bem-vindo a familia New Oeste! 🎉

[SE PROBLEMA]
Entendo. Deixa eu ja resolver isso para voce agora mesmo...
    `.trim(),

    script30dias: `
[PESQUISA NPS]
Ola, [NOME]! 😊

Ja faz 1 mes que voce esta usando nossa internet!

Para melhorarmos sempre, gostaria de saber:

De 0 a 10, quanto voce recomendaria a New Oeste para um amigo?

[AGUARDAR NOTA]

[SE 9-10 - PROMOTOR]
Que otimo! Muito obrigado! 💚
Ficaria muito grato se pudesse deixar um depoimento para ajudar outros clientes.
E aproveitar nosso programa de indicacao! [LINK]

[SE 7-8 - NEUTRO]
Obrigado! O que poderiamos melhorar para ser nota 10?

[SE 0-6 - DETRATOR]
Sinto muito que nao esteja satisfeito. Pode me contar o que aconteceu?
[RESOLVER IMEDIATAMENTE]
    `.trim(),

    programaIndicacao: `
🎁 INDIQUE E GANHE!

Conhece alguem que precisa de internet de qualidade?

Indique e ganhe:
• [BENEFICIO] para cada indicacao efetivada
• Sem limite de indicacoes
• Seu amigo tambem ganha [DESCONTO/BENEFICIO]

Seu link personalizado:
[LINK]

So compartilhar! Simples assim. 😊
    `.trim()
  }
};

// ========================================
// TEMPLATES DE MENSAGENS
// ========================================

export const TEMPLATES = {
  // WhatsApp
  whatsapp: {
    boasVindas: 'Bem-vindo a New Oeste, [NOME]! 🎉\n\nSua internet foi instalada com sucesso!\n\nQualquer duvida, estou aqui. 😊',
    confirmacaoAgendamento: 'Agendamento confirmado! ✅\n\n📅 Data: [DATA]\n⏰ Horario: [PERIODO]\n📍 Endereco: [ENDERECO]\n\nNosso tecnico vai ligar antes de chegar!',
    lembreteVencimento: 'Oi, [NOME]! 😊\n\nSo um lembrete: sua fatura vence dia [DIA].\n\nJa esta no seu email!\n\nQualquer duvida, estou aqui.',
    promocaoUpgrade: 'Oi, [NOME]! 😊\n\nVi que voce tem o plano de [VELOCIDADE] megas.\n\nTemos uma promo especial: upgrade para [VELOCIDADE MAIOR] por apenas +R$ [DIFERENCA]!\n\nTeria interesse?'
  },

  // Email
  email: {
    boasVindas: {
      assunto: 'Bem-vindo a New Oeste! 🎉',
      corpo: 'HTML com informacoes de acesso, tutoriais, contatos'
    },
    contrato: {
      assunto: 'Contrato New Oeste - Assinatura Digital',
      corpo: 'Link para assinatura + instrucoes'
    }
  }
};

// ========================================
// FRASES DE EFEITO E POWER WORDS
// ========================================

export const POWER_PHRASES = {
  abertura: [
    'Tenho uma novidade otima para voce...',
    'Descobri algo que vai mudar sua internet...',
    'Voce sabia que pode ter muito mais?'
  ],
  transicao: [
    'Deixa eu te mostrar algo interessante...',
    'Olha so que incrivel...',
    'Voce vai gostar disso...'
  ],
  fechamento: [
    'Faz sentido para voce?',
    'Consegue ver o valor nisso?',
    'Concordamos que e a melhor opcao?'
  ],
  urgencia: [
    'So temos [X] vagas neste mes...',
    'Essa condicao vale ate [DATA]...',
    'Se deixar para depois, pode perder...'
  ],
  escassez: [
    'Ultimas vagas de instalacao este mes',
    'Promocao por tempo limitado',
    'Cobertura chegando agora no seu bairro'
  ]
};

// ========================================
// DICAS GERAIS DE COMUNICACAO
// ========================================

export const DICAS_COMUNICACAO = [
  'Use o nome do cliente frequentemente',
  'Fale com entusiasmo e energia',
  'Escute mais do que fala (regra 70/30)',
  'Faca perguntas abertas',
  'Confirme entendimento constantemente',
  'Use pausas estrategicas',
  'Espelhe a linguagem do cliente',
  'Seja sempre verdadeiro e transparente',
  'Nao prometa o que nao pode cumprir',
  'Trate cada cliente como unico'
];
