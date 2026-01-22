// Conteudo do Playbook de Vendas Paper Vines

export const PROCESSO_VENDAS = {
  etapas: [
    {
      numero: 1,
      titulo: 'Prospeccao',
      descricao: 'Identificar e abordar potenciais clientes',
      acoes: [
        'Usar mensagens de prospeccao padronizadas',
        'Identificar dores do cliente (atendimento, escala, custos)',
        'Oferecer teste gratuito de 14 dias',
        'Agendar demonstracao com especialista'
      ],
      tempo_estimado: '1-3 dias'
    },
    {
      numero: 2,
      titulo: 'Qualificacao',
      descricao: 'Verificar se o cliente tem perfil para a solucao',
      acoes: [
        'Verificar faturamento minimo (ideal: R$ 70mil/mes)',
        'Identificar estrutura atual de atendimento',
        'Mapear canais utilizados (WhatsApp, Instagram, etc.)',
        'Entender ticket medio e volume de contatos'
      ],
      tempo_estimado: '1 reuniao'
    },
    {
      numero: 3,
      titulo: 'Demonstracao',
      descricao: 'Apresentar a plataforma e solucoes',
      acoes: [
        'Usar apresentacao oficial (Figma)',
        'Mostrar cases de sucesso',
        'Demonstrar funcionalidades principais',
        'Explicar diferenciais da API oficial do Meta'
      ],
      tempo_estimado: '30-60 min'
    },
    {
      numero: 4,
      titulo: 'Proposta',
      descricao: 'Enviar proposta personalizada',
      acoes: [
        'Montar proposta no Figma',
        'Definir plano de chatbots adequado',
        'Calcular valor de mensalidade + implantacao',
        'Definir prazo de validade (ate 7 dias)'
      ],
      tempo_estimado: '1 dia'
    },
    {
      numero: 5,
      titulo: 'Negociacao',
      descricao: 'Acompanhar e fechar a venda',
      acoes: [
        'Tratar objecoes com tecnicas especificas',
        'Criar urgencia e escassez',
        'Coletar dados para contrato',
        'Enviar contrato e links de pagamento'
      ],
      tempo_estimado: '1-7 dias'
    },
    {
      numero: 6,
      titulo: 'Fechamento',
      descricao: 'Finalizar contratacao',
      acoes: [
        'Verificar assinatura do contrato',
        'Confirmar pagamento',
        'Criar grupo de WhatsApp',
        'Agendar reuniao de Kick-Off'
      ],
      tempo_estimado: '1-2 dias'
    }
  ]
};

export const SCRIPTS = {
  prospeccao: [
    {
      titulo: 'Abordagem Inicial - Horario',
      mensagem: `Reduza custos e venda mais.
Receba demonstracao do especialista.
Consigo horario hoje as 16h ou amanha as 10h.
Qual voce prefere?`
    },
    {
      titulo: 'Abordagem Inicial - Urgencia',
      mensagem: `Reduza custos e venda mais.
Agende demonstracao.
Consigo horario hoje as 16h ou amanha as 10h.
Qual voce prefere?`
    }
  ],

  teste_gratuito: {
    titulo: 'Convite para Teste Gratuito',
    mensagem: `Nova experiencia de atendimento
Muito facil de usar.
Mais fluida, segura e estavel.

Teste por 14 dias gratuitos.
Plataforma de Atendimento Paper Vines.
Acesse pelo Link abaixo para acessar.
https://chat.papervines.digital/trial/sign-up

Para testar uma conversa dentro da plataforma, acesse o link abaixo pelo mesmo numero que voce cadastrou na plataforma;
https://wa.me/15557907814?text=Ola%2c+Paper+Vines

O que e possivel testar:
- Iniciar atendimentos
- Cadastro e testes com Chatbots
- Criacao de Modelos de Mensagem
- Interacoes basicas dentro da plataforma

Estamos disponiveis para eventuais duvidas.
Aproveite!!`
  },

  envio_proposta: {
    titulo: 'Mensagem de Envio de Proposta',
    mensagem: `[Nome do cliente],

segue a *proposta da Paper Vines*, uma plataforma para escalar o seu atendimento com reducao de custos e aumento de faturamento.

A tecnologia e poderosa, mas quem ativa esse poder e o suporte certo.
Nossa equipe esta preparada para superar suas expectativas.

Assim que estiver preparado, *me mande um ok* para reservamos a data pro *START* da [Nome da empresa]`
  },

  coleta_dados: {
    titulo: 'Coleta de Dados para Contrato',
    mensagem: `[Nome do cliente],
Para darmos inicio, precisamos dos seguintes dados:
CNPJ:
Nome do Responsavel pela empresa:
CPF:
Email do responsavel:
Data para pagamento:
Forma de pagamento da implantacao: a vista ou parcelado?
Data que gostariam de iniciar: [DATA] (a confirmar)

Na sequencia te envio o contrato e link de pagamento, ok?`
  },

  contrato_enviado: {
    titulo: 'Aviso de Contrato e Pagamento',
    mensagem: `Bom dia, [Nome do Cliente]
Tudo bem?

Enviamos para o seu email:
1 - Contrato do servico para sua assinatura.
(via assinatura@clicksign.com)

2 - Link de pagamento da mensalidade
(Via plataforma Asas / vencimento [DATA])
[LINK_MENSALIDADE]

3 - Link de pagamento da taxa de Implantacao
(Via plataforma Asas / vencimento [DATA])
[LINK_IMPLANTACAO]`
  },

  pos_assinatura: {
    titulo: 'Apos Assinatura do Contrato',
    mensagem: `Parabens pela escolha, [Nome do Cliente]!!
Esperamos superar suas expectativas nos proximos dias!!

Proximos passos:
O quanto antes dar *acesso ao Gerenciador de Negocios* do Meta - Contratante deve conceder acesso de controle total ao e-mail thiago@papervines.digital
   Necessario para integrarmos o numero na API oficial do Meta.
   Passo a passo: https://www.youtube.com/watch?v=C15vD7rvE28

*Grupo de WhatsApp* para Suporte (criaremos ate 24h apos assinatura do contrato)

*Reuniao de Kick-Off* dia [DATA] as [HORA] (a confirmar)`
  },

  reengajamento: {
    titulo: 'Para Cliente que Demora a Assinar',
    mensagem: `Escolher a empresa certa faz toda a diferenca pra sua IA funcionar bem.
https://www.instagram.com/reel/DSm7f3iDFtD/?igsh=cHlybmN5Ynkwc3ds`
  }
};

export const OBJECOES = [
  {
    objecao: 'Esta muito caro',
    resposta: `Entendo sua preocupacao com o investimento. Vamos analisar o retorno:

1. Quanto voce gasta hoje com atendentes? Com nossa solucao, um atendente consegue gerenciar 3x mais conversas.

2. Quantas vendas voce perde por nao responder rapido? Com o chatbot 24h, voce nao perde mais leads.

3. O investimento se paga em media em 2-3 meses com o aumento de conversao.

Quer que eu faca um calculo personalizado do ROI para sua empresa?`
  },
  {
    objecao: 'Preciso pensar / Vou avaliar',
    resposta: `Claro, e importante analisar bem! Posso te ajudar nessa avaliacao:

- Qual e a principal duvida que voce gostaria de esclarecer?
- O que te faria decidir hoje?

Lembre-se: enquanto voce avalia, seus concorrentes ja estao automatizando o atendimento e capturando os leads que voce esta perdendo.

A proposta tem validade de 7 dias nas condicoes especiais.`
  },
  {
    objecao: 'Ja tenho um sistema',
    resposta: `Interessante! Qual sistema voce usa atualmente?

Muitos clientes migram para a Paper Vines porque:
- API Oficial do WhatsApp (sem risco de bloqueio)
- Integracao nativa com Instagram e Messenger
- Agentes de IA que respondem 24h
- Suporte especializado em automacao comercial

Posso mostrar em uma demo rapida as diferencas? Geralmente os clientes se surpreendem com as funcionalidades.`
  },
  {
    objecao: 'Nao tenho tempo agora',
    resposta: `Entendo perfeitamente! Justamente por isso nossa solucao e ideal:

- A implantacao e feita pela nossa equipe
- O chatbot funciona 24h sem voce precisar fazer nada
- Voce ganha tempo automatizando tarefas repetitivas

Uma demo leva apenas 30 minutos e pode te mostrar como ganhar horas por semana.
Que tal na proxima [segunda/terca]?`
  },
  {
    objecao: 'Minha equipe nao vai se adaptar',
    resposta: `Essa e uma preocupacao comum, mas nossa plataforma foi feita para ser simples:

- Interface intuitiva (treinamento de 1 hora)
- Suporte via grupo de WhatsApp
- Videos tutoriais disponiveis
- Equipe Paper Vines acompanha os primeiros dias

95% dos clientes relatam que a equipe se adapta na primeira semana!`
  },
  {
    objecao: 'Preciso falar com meu socio / diretor',
    resposta: `Perfeito! Inclusive, seria interessante ele participar da proxima conversa para tirar todas as duvidas.

Posso agendar uma demo com voces dois? Assim evitamos o telefone sem fio e ele pode ver na pratica como funciona.

Qual o melhor horario para voces?`
  }
];

export const REQUISITOS_API = {
  titulo: 'Requisitos para API Oficial do Meta',
  itens: [
    {
      item: 'Numero WhatsApp Business',
      descricao: 'O numero que vai migrar para API Oficial deve ser Business se quiser usar no celular e na plataforma.'
    },
    {
      item: 'Gerenciador de Negocios (BM)',
      descricao: 'Dar acesso para thiago@papervines.digital com controle total.'
    },
    {
      item: 'Cartao Internacional',
      descricao: 'Para pagamentos da API do WhatsApp, preferencialmente fisico.'
    },
    {
      item: 'Site com dados do CNPJ',
      descricao: 'Site da empresa com dados do CNPJ no rodape para verificacao do Meta.'
    }
  ]
};

export const CHECKLIST_COMERCIAL = [
  { item: 'Verificar condicoes para usar a plataforma (BM, cartao, site, faturamento)' },
  { item: 'Explicar requisitos da API Oficial do Meta' },
  { item: 'Enviar teste gratuito de 14 dias' },
  { item: 'Apresentar a plataforma (slides Figma)' },
  { item: 'Montar e enviar proposta personalizada' },
  { item: 'Coletar dados para contrato' },
  { item: 'Passar informacoes para Fernanda (contrato)' },
  { item: 'Enviar contrato e links de pagamento' },
  { item: 'Acompanhar assinatura do contrato' },
  { item: 'Confirmar pagamento' },
  { item: 'Comunicar proximos passos ao cliente' },
  { item: 'Mover card para Venda Realizada no CRM' }
];

export const CHECKLIST_CONTRATO = [
  { item: 'Escolher modelo de contrato no Drive' },
  { item: 'Enviar contrato via ClickSign' },
  { item: 'Criar links de pagamento no Asaas' },
  { item: 'Enviar links para vendedor/cliente' },
  { item: 'Verificar pagamento e assinatura' },
  { item: 'Criar grupo de WhatsApp com cliente' },
  { item: 'Criar pasta no Drive do cliente' },
  { item: 'Solicitar acesso a BM do cliente' },
  { item: 'Verificar status da BM (verificada ou nao)' },
  { item: 'Verificar se WhatsApp esta na conta correta' },
  { item: 'Agendar reuniao de Kick-Off' },
  { item: 'Coletar dados de usuarios da plataforma' },
  { item: 'Reforcar preparativos para reuniao de migracao' }
];

export const LINKS_UTEIS = {
  apresentacao: 'https://www.figma.com/deck/fU8KjN7JpjpzhxNRZzfqlp/Apresentacao-1--Clientes',
  apresentacao_telecom: 'https://www.figma.com/deck/AGsSULAlU7Fj0GYCWsMDBv',
  propostas_figma: 'https://www.figma.com/files/team/1082649090502569616/project/412083277/Vendas',
  modelos_contrato: 'https://drive.google.com/drive/folders/1hTxC7rcN2MvAtusrG-gj6CxkT6FvhTe1',
  clicksign: 'https://app.clicksign.com/',
  asaas_clientes: 'https://www.asaas.com/customerAccount/list?caid=155676853',
  politicas_whatsapp: 'https://business.whatsapp.com/policy',
  politicas_meta_nudez: 'https://transparency.meta.com/policies/ad-standards/objectionable-content/adult-nudity-and-sexual-activity/',
  tutorial_acesso_bm: 'https://www.youtube.com/watch?v=C15vD7rvE28',
  videos_plataforma: 'https://youtube.com/playlist?list=PLQnLWcfvhavZIp6EHujInobasehrz7DjH',
  teste_gratuito: 'https://chat.papervines.digital/trial/sign-up',
  site: 'https://papervines.digital/'
};
