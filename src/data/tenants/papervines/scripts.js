// Scripts Expandidos para Vendas Paper Vines
// Organizados por etapa do funil com variações, dicas e sequências

export const SCRIPTS_STATS = {
  total_scripts: '45+',
  categorias: '7',
  sequencias: '5',
  taxa_resposta: '68%'
};

export const ETAPAS_FUNIL = {
  prospeccao: {
    nome: 'Prospeccao',
    icone: 'bullhorn',
    cor: '#8b5cf6',
    descricao: 'Primeiro contato com leads frios ou mornos',
    objetivo: 'Despertar interesse e agendar demonstracao',
    tempo_ideal: 'Enviar entre 9h-11h ou 14h-17h',
    scripts: [
      {
        id: 'prosp-1',
        titulo: 'Abordagem Direta - Horario Alternativo',
        tipo: 'principal',
        contexto: 'Lead frio que nunca teve contato com a empresa',
        dica: 'Use sempre 2 opcoes de horario para aumentar a chance de resposta',
        mensagem: `Ola! Tudo bem?

Reduza custos e venda mais com atendimento automatizado.
Receba uma demonstracao gratuita do especialista.

Consigo horario hoje as 16h ou amanha as 10h.
Qual voce prefere?`,
        variacoes: [
          {
            nome: 'Versao Curta',
            mensagem: `Oi! Posso te mostrar como automatizar seu atendimento e vender mais?
Tenho horario hoje as 16h ou amanha as 10h. Qual prefere?`
          },
          {
            nome: 'Versao Instagram',
            mensagem: `Vi que voce tem uma loja incrivel! 🔥
Ja pensou em automatizar o atendimento do Instagram?
Posso te mostrar como em 30min. Bora?`
          }
        ],
        gatilhos: ['Alternativa de horarios', 'Beneficio claro', 'CTA direto']
      },
      {
        id: 'prosp-2',
        titulo: 'Abordagem com Dor',
        tipo: 'principal',
        contexto: 'Lead que demonstrou interesse em automatizacao',
        dica: 'Personalize mencionando a dor especifica do segmento',
        mensagem: `Ola [Nome]! Tudo bem?

Percebi que voce trabalha com [segmento].
Muitas empresas desse segmento perdem vendas por:
❌ Demora no atendimento
❌ Falta de respostas fora do horario
❌ Leads nao qualificados

A Paper Vines resolve isso com IA que atende 24h.
Posso te mostrar como em uma demo de 30min?`,
        variacoes: [
          {
            nome: 'E-commerce',
            mensagem: `Ola! Vi que voce tem uma loja online 🛒
Quantas vendas voce perde por nao responder rapido no WhatsApp?
Com IA, respondemos em segundos, 24h por dia.
Quer ver funcionando?`
          },
          {
            nome: 'Clinicas/Saude',
            mensagem: `Ola! Vi que voce trabalha na area da saude 🏥
Agendamento automatico + confirmacao + lembretes.
Tudo isso sem precisar de uma pessoa 24h.
Posso te mostrar como funciona?`
          }
        ],
        gatilhos: ['Identificacao de dor', 'Prova de conhecimento', 'Solucao especifica']
      },
      {
        id: 'prosp-3',
        titulo: 'Abordagem Social Proof',
        tipo: 'variacao',
        contexto: 'Lead de segmento onde ja temos cases',
        dica: 'Mencione resultados reais de clientes similares',
        mensagem: `Ola [Nome]!

Um cliente do mesmo segmento que o seu aumentou 40% nas vendas depois de automatizar o atendimento com a Paper Vines.

A IA responde em segundos, qualifica leads e agenda reunioes sozinha.

Quer que eu te mostre como funciona na pratica?
Tenho 30min disponiveis essa semana.`,
        variacoes: [],
        gatilhos: ['Prova social', 'Resultado tangivel', 'Escassez de tempo']
      },
      {
        id: 'prosp-4',
        titulo: 'Abordagem Cold Outreach LinkedIn',
        tipo: 'variacao',
        contexto: 'Primeiro contato via LinkedIn',
        dica: 'Seja breve e profissional, evite parecer spam',
        mensagem: `Ola [Nome], tudo bem?

Vi que voce e [cargo] na [empresa].
Trabalhamos com empresas do seu segmento automatizando atendimento via WhatsApp e Instagram.

Um cliente similar reduziu 60% do tempo de atendimento.

Vale uma conversa de 15min?`,
        variacoes: [],
        gatilhos: ['Personalizacao', 'Resultado especifico', 'Baixo comprometimento']
      }
    ]
  },

  qualificacao: {
    nome: 'Qualificacao',
    icone: 'filter',
    cor: '#f97316',
    descricao: 'Entender se o lead tem perfil para a solucao',
    objetivo: 'Coletar informacoes para personalizar proposta',
    tempo_ideal: 'Durante ou apos primeira call',
    scripts: [
      {
        id: 'qual-1',
        titulo: 'Perguntas de Qualificacao',
        tipo: 'principal',
        contexto: 'Inicio da conversa de qualificacao',
        dica: 'Faca perguntas abertas para entender melhor o cenario',
        mensagem: `[Nome], para eu preparar a melhor solucao pra voce, preciso entender melhor seu cenario:

1️⃣ Quantas pessoas fazem atendimento hoje?
2️⃣ Qual o volume medio de mensagens por dia?
3️⃣ Quais canais voces usam? (WhatsApp, Instagram, etc)
4️⃣ Qual o maior desafio no atendimento hoje?

Com essas infos, consigo montar uma proposta personalizada!`,
        variacoes: [
          {
            nome: 'Versao Rapida',
            mensagem: `Para montar sua proposta, me conta:
- Quantas pessoas atendem hoje?
- Volume de mensagens/dia?
- Maior dor no atendimento?`
          }
        ],
        gatilhos: ['Perguntas estruturadas', 'Objetivo claro', 'Valor da resposta']
      },
      {
        id: 'qual-2',
        titulo: 'Checklist de Requisitos',
        tipo: 'informativo',
        contexto: 'Verificar se cliente tem os requisitos tecnicos',
        dica: 'Envie antes da demo para evitar surpresas',
        mensagem: `[Nome], para usar a API Oficial do WhatsApp (sem risco de bloqueio), voce precisa de:

✅ Numero WhatsApp Business
✅ Gerenciador de Negocios do Meta (BM)
✅ Cartao internacional para pagamentos do Meta
✅ Site com CNPJ no rodape

Voce ja tem tudo isso ou precisamos ajudar em algo?`,
        variacoes: [],
        gatilhos: ['Transparencia', 'Prevencao de objecoes', 'Oferta de ajuda']
      },
      {
        id: 'qual-3',
        titulo: 'Identificacao de Perfil',
        tipo: 'variacao',
        contexto: 'Entender faturamento e estrutura',
        dica: 'Use de forma sutil para nao parecer invasivo',
        mensagem: `[Nome], para te indicar o plano ideal:

A empresa fatura acima de R$ 50mil/mes?
Voces tem equipe de vendas ou e mais automatizado?

Pergunto porque temos planos diferentes dependendo do volume e estrutura! 😊`,
        variacoes: [],
        gatilhos: ['Justificativa para pergunta', 'Tom amigavel', 'Contexto claro']
      }
    ]
  },

  demonstracao: {
    nome: 'Demonstracao',
    icone: 'desktop',
    cor: '#10b981',
    descricao: 'Agendar e preparar a demonstracao da plataforma',
    objetivo: 'Mostrar valor e criar desejo de compra',
    tempo_ideal: 'Agendar em ate 48h do primeiro contato',
    scripts: [
      {
        id: 'demo-1',
        titulo: 'Confirmacao de Demo',
        tipo: 'principal',
        contexto: '24h antes da demonstracao agendada',
        dica: 'Sempre confirme para reduzir no-shows',
        mensagem: `Ola [Nome]! Tudo bem?

Confirmando nossa demonstracao amanha as [HORA].

📅 Data: [DATA]
⏰ Horario: [HORA]
📍 Link: [LINK_MEET]

Vou te mostrar na pratica como automatizar seu atendimento e escalar vendas.

Posso confirmar sua presenca? ✅`,
        variacoes: [
          {
            nome: 'Lembrete 1h antes',
            mensagem: `[Nome], daqui 1 hora temos nossa demonstracao! 🚀
Te espero no link: [LINK_MEET]
Ate ja!`
          }
        ],
        gatilhos: ['Confirmacao explicita', 'Detalhes claros', 'Antecipacao de valor']
      },
      {
        id: 'demo-2',
        titulo: 'Pos-Demo - Envio de Material',
        tipo: 'principal',
        contexto: 'Imediatamente apos a demonstracao',
        dica: 'Envie em ate 1h apos a call enquanto esta fresco',
        mensagem: `[Nome], foi otimo conversar com voce! 🙌

Como combinado, segue o material:

📊 Apresentacao: [LINK_APRESENTACAO]
🎥 Videos da plataforma: https://youtube.com/playlist?list=PLQnLWcfvhavZIp6EHujInobasehrz7DjH
🆓 Teste gratuito: https://chat.papervines.digital/trial/sign-up

Alguma duvida sobre o que conversamos?
Fico a disposicao! 😊`,
        variacoes: [],
        gatilhos: ['Agradecimento', 'Entrega de valor', 'Abertura para duvidas']
      },
      {
        id: 'demo-3',
        titulo: 'Reagendamento de Demo',
        tipo: 'variacao',
        contexto: 'Quando o cliente nao comparece',
        dica: 'Seja compreensivo, nao pressione',
        mensagem: `Oi [Nome], tudo bem?

Vi que nao conseguimos nos conectar hoje.
Sem problemas! Sei que a correria do dia a dia e grande.

Que tal remarcarmos para [DATA] as [HORA]?
Ou me passa um horario melhor pra voce!`,
        variacoes: [],
        gatilhos: ['Empatia', 'Flexibilidade', 'Nova oportunidade']
      }
    ]
  },

  proposta: {
    nome: 'Proposta',
    icone: 'file-invoice-dollar',
    cor: '#3b82f6',
    descricao: 'Envio e acompanhamento da proposta comercial',
    objetivo: 'Apresentar valor e iniciar negociacao',
    tempo_ideal: 'Enviar em ate 24h apos demo',
    scripts: [
      {
        id: 'prop-1',
        titulo: 'Envio de Proposta - Completo',
        tipo: 'principal',
        contexto: 'Primeiro envio da proposta formal',
        dica: 'Reforce o valor antes de falar de preco',
        mensagem: `[Nome], tudo bem?

Segue a *proposta da Paper Vines* para escalar o atendimento da [Empresa]! 🚀

📄 Proposta: [LINK_PROPOSTA]

O que esta incluso:
✅ Plataforma de atendimento omnichannel
✅ Chatbots com IA (98% de precisao)
✅ API Oficial do WhatsApp (sem bloqueio)
✅ Integracao WhatsApp + Instagram + Messenger
✅ Suporte dedicado via grupo WhatsApp
✅ Treinamento completo da equipe

A tecnologia e poderosa, mas quem ativa esse poder e o suporte certo.
Nossa equipe esta preparada para superar suas expectativas.

*Proposta valida por 7 dias.*

Quando podemos conversar sobre os proximos passos?`,
        variacoes: [
          {
            nome: 'Versao Curta',
            mensagem: `[Nome], segue a proposta da Paper Vines! 📄

[LINK_PROPOSTA]

Validade: 7 dias
Quando posso te ligar pra tirar duvidas?`
          }
        ],
        gatilhos: ['Lista de beneficios', 'Escassez temporal', 'CTA claro']
      },
      {
        id: 'prop-2',
        titulo: 'Follow-up Proposta - 2 dias',
        tipo: 'followup',
        contexto: '48h apos envio sem resposta',
        dica: 'Agregue valor, nao apenas cobre resposta',
        mensagem: `[Nome], tudo bem?

Passando pra saber se conseguiu analisar a proposta.
Surgiu alguma duvida?

Vi que empresas do seu segmento tem conseguido:
📈 Aumento de 40% nas conversoes
⏰ Reducao de 60% no tempo de resposta
💰 ROI positivo em 2-3 meses

Quer que eu faca uma simulacao do retorno pra [Empresa]?`,
        variacoes: [],
        gatilhos: ['Valor agregado', 'Dados concretos', 'Oferta de ajuda']
      },
      {
        id: 'prop-3',
        titulo: 'Follow-up Proposta - 5 dias',
        tipo: 'followup',
        contexto: '5 dias apos envio, urgencia',
        dica: 'Crie senso de urgencia sem pressionar',
        mensagem: `Oi [Nome]!

A proposta que enviei esta valida ate [DATA].
Depois disso, os valores podem mudar.

Se tiver alguma duvida ou precisar ajustar algo, me avisa!
Quero muito ajudar a [Empresa] a escalar o atendimento. 🚀`,
        variacoes: [],
        gatilhos: ['Escassez', 'Flexibilidade', 'Genuino interesse']
      }
    ]
  },

  negociacao: {
    nome: 'Negociacao',
    icone: 'handshake',
    cor: '#ec4899',
    descricao: 'Fase de negociacao e fechamento',
    objetivo: 'Superar barreiras e fechar a venda',
    tempo_ideal: 'Responder em ate 2h durante negociacao',
    scripts: [
      {
        id: 'neg-1',
        titulo: 'Coleta de Dados para Contrato',
        tipo: 'principal',
        contexto: 'Cliente confirmou interesse em fechar',
        dica: 'Seja objetivo e facilite o processo',
        mensagem: `Que otimo, [Nome]! 🎉
Vamos dar inicio ao processo!

Para preparar o contrato, preciso dos seguintes dados:

📋 CNPJ:
👤 Nome do Responsavel:
🆔 CPF do Responsavel:
📧 Email:
📅 Melhor data para vencimento:
💳 Implantacao: a vista ou parcelado?
🗓️ Data desejada para inicio:

Na sequencia te envio o contrato e links de pagamento!`,
        variacoes: [],
        gatilhos: ['Celebracao', 'Clareza', 'Proximos passos claros']
      },
      {
        id: 'neg-2',
        titulo: 'Envio de Contrato',
        tipo: 'principal',
        contexto: 'Apos receber dados, enviar contrato',
        dica: 'Liste todos os itens para facilitar acompanhamento',
        mensagem: `Bom dia, [Nome]! ☀️

Enviamos para o seu email:

1️⃣ *Contrato do servico* para assinatura
   (via assinatura@clicksign.com)

2️⃣ *Link de pagamento da mensalidade*
   (Via Asaas / vencimento [DATA])
   [LINK_MENSALIDADE]

3️⃣ *Link de pagamento da implantacao*
   (Via Asaas / vencimento [DATA])
   [LINK_IMPLANTACAO]

Assim que assinar e pagar, iniciamos a implantacao! 🚀
Qualquer duvida, estou aqui.`,
        variacoes: [],
        gatilhos: ['Organizacao', 'Clareza', 'Disponibilidade']
      },
      {
        id: 'neg-3',
        titulo: 'Quebra de Objecao - Preco',
        tipo: 'objecao',
        contexto: 'Cliente acha o preco alto',
        dica: 'Foque no ROI, nao no custo',
        mensagem: `[Nome], entendo sua preocupacao com o investimento.

Vamos fazer uma conta rapida:
📊 Quantas vendas voce perde por mes por demora no atendimento?
📊 Quanto custa 1 funcionario pra atender 24h?

Com a Paper Vines:
✅ 1 atendente gerencia 3x mais conversas
✅ IA responde em segundos, 24h
✅ Investimento se paga em 2-3 meses

Quer que eu faca o calculo do ROI pra sua empresa?`,
        variacoes: [],
        gatilhos: ['Logica financeira', 'Comparacao', 'Valor agregado']
      },
      {
        id: 'neg-4',
        titulo: 'Urgencia para Fechamento',
        tipo: 'variacao',
        contexto: 'Cliente indeciso, precisar criar urgencia',
        dica: 'Use urgencia real, nao artificial',
        mensagem: `[Nome], uma informacao importante:

Temos vagas limitadas para implantacao este mes.
Se fecharmos ate [DATA], conseguimos iniciar na proxima semana.

Depois disso, so conseguimos agendar para o proximo mes.

O que acha de garantir sua vaga?`,
        variacoes: [],
        gatilhos: ['Escassez real', 'Beneficio de agir rapido', 'CTA claro']
      }
    ]
  },

  fechamento: {
    nome: 'Fechamento',
    icone: 'trophy',
    cor: '#10b981',
    descricao: 'Pos-venda imediato e onboarding',
    objetivo: 'Garantir sucesso inicial do cliente',
    tempo_ideal: 'Enviar em ate 24h apos assinatura',
    scripts: [
      {
        id: 'fech-1',
        titulo: 'Boas-vindas Pos-Assinatura',
        tipo: 'principal',
        contexto: 'Imediatamente apos assinatura do contrato',
        dica: 'Celebre a decisao e alinhe expectativas',
        mensagem: `🎉 Parabens pela escolha, [Nome]!

Bem-vindo a Paper Vines! Estamos muito felizes em ter a [Empresa] como cliente.

*Proximos passos:*

1️⃣ *Acesso ao Gerenciador de Negocios*
   Conceda acesso de controle total para: thiago@papervines.digital
   Tutorial: https://www.youtube.com/watch?v=C15vD7rvE28

2️⃣ *Grupo de WhatsApp*
   Criaremos em ate 24h para suporte direto

3️⃣ *Reuniao de Kick-Off*
   Dia [DATA] as [HORA] (a confirmar)

Estamos ansiosos para comecar! 🚀`,
        variacoes: [],
        gatilhos: ['Celebracao', 'Clareza de proximos passos', 'Expectativa positiva']
      },
      {
        id: 'fech-2',
        titulo: 'Lembrete de Acesso BM',
        tipo: 'followup',
        contexto: '48h sem receber acesso a BM',
        dica: 'Seja prestativo, ofereça ajuda',
        mensagem: `Oi [Nome]! Tudo bem?

Pra gente iniciar a implantacao, precisamos do acesso ao Gerenciador de Negocios do Meta.

E bem rapidinho! Aqui esta o passo a passo:
🎥 https://www.youtube.com/watch?v=C15vD7rvE28

Se preferir, posso te ligar e fazer junto contigo pela tela compartilhada. O que acha?`,
        variacoes: [],
        gatilhos: ['Tutorial', 'Oferta de ajuda', 'Facilitacao']
      },
      {
        id: 'fech-3',
        titulo: 'Confirmacao de Kick-Off',
        tipo: 'principal',
        contexto: '24h antes da reuniao de kick-off',
        dica: 'Prepare o cliente para a reuniao',
        mensagem: `[Nome], amanha temos nossa reuniao de Kick-Off! 🚀

📅 Data: [DATA]
⏰ Horario: [HORA]
📍 Link: [LINK_MEET]

*Para a reuniao, seria ideal ter:*
✅ Acesso ao Gerenciador de Negocios liberado
✅ Lista de usuarios que vao usar a plataforma
✅ Duvidas anotadas

Ate amanha! 😊`,
        variacoes: [],
        gatilhos: ['Preparacao', 'Checklist claro', 'Expectativa positiva']
      }
    ]
  },

  reengajamento: {
    nome: 'Reengajamento',
    icone: 'redo',
    cor: '#f59e0b',
    descricao: 'Retomar contato com leads frios',
    objetivo: 'Reativar interesse e retomar negociacao',
    tempo_ideal: '7-30 dias apos ultimo contato',
    scripts: [
      {
        id: 'reeng-1',
        titulo: 'Reengajamento - 7 dias',
        tipo: 'principal',
        contexto: '7 dias sem resposta apos proposta',
        dica: 'Traga algo novo para justificar o contato',
        mensagem: `Oi [Nome], tudo bem?

Sei que a correria do dia a dia e grande!
Passando pra saber se ainda faz sentido conversarmos sobre automatizacao do atendimento.

A proposito, lancamos um case novo de uma empresa do seu segmento que triplicou as vendas.

Quer que eu te envie?`,
        variacoes: [],
        gatilhos: ['Empatia', 'Novidade', 'Baixo comprometimento']
      },
      {
        id: 'reeng-2',
        titulo: 'Reengajamento - 14 dias',
        tipo: 'followup',
        contexto: '14 dias sem resposta',
        dica: 'Seja direto sobre o interesse',
        mensagem: `[Nome], tudo bem?

Tentei contato algumas vezes mas nao consegui retorno.

Entendo se o momento nao e o ideal.
Me conta: voce ainda tem interesse em automatizar o atendimento da [Empresa]?

Se sim, podemos retomar. Se nao, sem problemas! So me avisa pra eu nao ficar te incomodando. 😊`,
        variacoes: [],
        gatilhos: ['Honestidade', 'Respeito ao tempo', 'Abertura']
      },
      {
        id: 'reeng-3',
        titulo: 'Reengajamento - Conteudo',
        tipo: 'variacao',
        contexto: 'Retomar com valor, sem pressionar',
        dica: 'Envie conteudo relevante sem cobrar nada',
        mensagem: `[Nome], vi esse conteudo e lembrei de voce!

https://www.instagram.com/reel/DSm7f3iDFtD/

Mostra como escolher a empresa certa pra sua IA funcionar bem.

Se em algum momento quiser retomar nossa conversa, estou por aqui! 🙌`,
        variacoes: [],
        gatilhos: ['Valor sem cobranca', 'Relacionamento', 'Porta aberta']
      },
      {
        id: 'reeng-4',
        titulo: 'Reengajamento - Promocao',
        tipo: 'variacao',
        contexto: 'Reativar com oferta especial',
        dica: 'Use apenas em campanhas reais',
        mensagem: `[Nome], tudo bem?

Estamos com uma condicao especial nessa semana:
🎁 [DESCRICAO_PROMOCAO]

Lembrei de voce porque sei que tinha interesse em automatizar o atendimento.

Valido ate [DATA]. Quer saber mais?`,
        variacoes: [],
        gatilhos: ['Oferta limitada', 'Personalizacao', 'Urgencia']
      }
    ]
  }
};

export const SEQUENCIAS_COMPLETAS = [
  {
    nome: 'Sequencia de Prospeccao',
    descricao: 'Sequencia completa para leads frios',
    icone: 'route',
    etapas: [
      { dia: 1, acao: 'Primeiro contato', script_id: 'prosp-1' },
      { dia: 3, acao: 'Follow-up se nao respondeu', script_id: 'prosp-2' },
      { dia: 7, acao: 'Ultima tentativa', script_id: 'reeng-1' },
      { dia: 14, acao: 'Reengajamento com conteudo', script_id: 'reeng-3' }
    ]
  },
  {
    nome: 'Sequencia Pos-Demo',
    descricao: 'Acompanhamento apos demonstracao',
    icone: 'tasks',
    etapas: [
      { dia: 0, acao: 'Envio de material', script_id: 'demo-2' },
      { dia: 1, acao: 'Envio de proposta', script_id: 'prop-1' },
      { dia: 3, acao: 'Follow-up proposta', script_id: 'prop-2' },
      { dia: 5, acao: 'Urgencia', script_id: 'prop-3' }
    ]
  },
  {
    nome: 'Sequencia de Fechamento',
    descricao: 'Fluxo apos confirmacao de interesse',
    icone: 'flag-checkered',
    etapas: [
      { dia: 0, acao: 'Coleta de dados', script_id: 'neg-1' },
      { dia: 1, acao: 'Envio de contrato', script_id: 'neg-2' },
      { dia: 0, acao: 'Boas-vindas', script_id: 'fech-1' },
      { dia: 2, acao: 'Lembrete BM se necessario', script_id: 'fech-2' }
    ]
  }
];

export const DICAS_COMUNICACAO = [
  {
    titulo: 'Melhores Horarios',
    icone: 'clock',
    dicas: [
      'Segunda a sexta: 9h-11h e 14h-17h',
      'Evite segunda de manha e sexta a tarde',
      'Responda em ate 2h durante negociacao',
      'Sabados: apenas emergencias'
    ]
  },
  {
    titulo: 'Tom de Voz',
    icone: 'comments',
    dicas: [
      'Seja profissional mas amigavel',
      'Use emojis com moderacao (1-2 por mensagem)',
      'Evite gírias excessivas',
      'Personalize sempre que possível'
    ]
  },
  {
    titulo: 'Formatacao WhatsApp',
    icone: 'bold',
    dicas: [
      '*texto* = negrito',
      '_texto_ = italico',
      '~texto~ = riscado',
      'Use bullet points para listas'
    ]
  },
  {
    titulo: 'O que Evitar',
    icone: 'ban',
    dicas: [
      'Mensagens muito longas (max 4 paragrafos)',
      'Audios longos sem permissao',
      'Pressao excessiva',
      'Promessas que nao pode cumprir'
    ]
  }
];

export const TEMPLATES_SEGMENTO = {
  ecommerce: {
    nome: 'E-commerce',
    icone: 'shopping-cart',
    dores: ['Carrinho abandonado', 'Demora no atendimento', 'Falta de rastreio'],
    script_personalizado: `Oi [Nome]! Vi que voce tem uma loja online.

Os e-commerces que usam Paper Vines conseguem:
🛒 Recuperar carrinhos abandonados automaticamente
📦 Enviar rastreio por WhatsApp
💬 Atender clientes 24h

Quer ver como funciona pra lojas como a sua?`
  },
  saude: {
    nome: 'Clinicas e Saude',
    icone: 'heartbeat',
    dores: ['Agendamento manual', 'No-shows', 'Confirmacao de consultas'],
    script_personalizado: `Oi [Nome]! Vi que voce trabalha na area da saude.

Clinicas que usam Paper Vines conseguem:
📅 Agendamento automatico 24h
✅ Confirmacao + lembretes automaticos
📋 Coleta de dados pre-consulta

Quer ver como funciona pra clinicas?`
  },
  imobiliario: {
    nome: 'Imobiliarias',
    icone: 'home',
    dores: ['Leads nao qualificados', 'Perda de oportunidades', 'Atendimento lento'],
    script_personalizado: `Oi [Nome]! Vi que voce trabalha com imoveis.

Imobiliarias que usam Paper Vines conseguem:
🏠 Qualificar leads automaticamente
📍 Enviar opcoes de imoveis por perfil
📞 Agendar visitas sem intervencao humana

Quer ver como funciona pra imobiliarias?`
  },
  educacao: {
    nome: 'Escolas e Cursos',
    icone: 'graduation-cap',
    dores: ['Captacao de alunos', 'Matriculas manuais', 'Comunicacao com pais'],
    script_personalizado: `Oi [Nome]! Vi que voce trabalha com educacao.

Escolas que usam Paper Vines conseguem:
📚 Captacao automatica de leads
✍️ Processo de matricula simplificado
👨‍👩‍👧 Comunicacao automatica com pais

Quer ver como funciona pra instituicoes de ensino?`
  },
  servicos: {
    nome: 'Prestadores de Servicos',
    icone: 'tools',
    dores: ['Orcamentos manuais', 'Agendamento de servicos', 'Follow-up'],
    script_personalizado: `Oi [Nome]! Vi que voce presta servicos.

Empresas de servicos que usam Paper Vines conseguem:
💰 Orcamentos automaticos
📅 Agendamento de servicos 24h
⭐ Coleta de avaliacoes pos-servico

Quer ver como funciona pro seu segmento?`
  }
};
