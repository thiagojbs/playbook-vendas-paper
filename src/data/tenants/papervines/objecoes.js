// Dados expandidos de Objecoes - Paper Vines
// Baseado em pesquisa do produto e melhores praticas de vendas

export const ESTATISTICAS_PAPERVINES = {
  precisao_ia: '98%',
  automacao_conversas: '80%',
  mensagens_dia: '2.847+',
  tempo_adaptacao: '1 semana',
  taxa_adaptacao: '95%',
  aumento_produtividade: '3x',
  roi_medio: '2-3 meses',
  suporte_24h: true,
  canais: ['WhatsApp', 'Instagram', 'Messenger', 'Facebook'],
  integracao_api_oficial: true
};

export const DIFERENCIAIS = [
  {
    titulo: 'API Oficial do Meta',
    descricao: 'Sem risco de bloqueio do numero. Conexao estavel e segura.',
    icone: 'shield-alt'
  },
  {
    titulo: 'IA com 98% de Precisao',
    descricao: 'Agentes inteligentes que entendem contexto e respondem naturalmente.',
    icone: 'brain'
  },
  {
    titulo: 'Atendimento 24/7',
    descricao: 'Chatbots e IA funcionando mesmo fora do horario comercial.',
    icone: 'clock'
  },
  {
    titulo: 'Omnichannel',
    descricao: 'WhatsApp, Instagram e Messenger em uma unica plataforma.',
    icone: 'layer-group'
  },
  {
    titulo: 'CRM Integrado',
    descricao: 'Gestao completa de leads e clientes sem sair da plataforma.',
    icone: 'users-cog'
  },
  {
    titulo: 'Automacao de 80%',
    descricao: 'Reduza drasticamente o trabalho manual da equipe.',
    icone: 'robot'
  }
];

export const OBJECOES_EXPANDIDAS = {
  preco: {
    categoria: 'Preco e Investimento',
    icone: 'dollar-sign',
    cor: '#f97316',
    objecoes: [
      {
        titulo: 'Esta muito caro',
        nivel: 'comum',
        contexto: 'Cliente acha o valor alto sem entender o retorno',
        tecnica_call: {
          nome: 'Tecnica do Custo vs Investimento',
          passos: [
            'Valide a preocupacao: "Entendo sua preocupacao com o investimento..."',
            'Faca perguntas de descoberta: "Quanto voce gasta hoje com atendentes?"',
            'Apresente o calculo de ROI personalizado',
            'Mostre casos de clientes similares',
            'Oferte o teste gratuito de 14 dias para provar valor'
          ],
          gatilhos: ['Prova social', 'Reciprocidade', 'Logica financeira']
        },
        script_whatsapp: `Entendo sua preocupacao com o investimento! Vamos fazer uma analise rapida:

*Quanto custa NAO ter a Paper Vines?*

1. Quantos leads voce perde por nao responder rapido? (Chatbot 24h resolve)
2. Quanto paga em salarios de atendentes? (1 pessoa gerencia 3x mais)
3. Quantas vendas escapam fora do horario comercial?

Na media, nossos clientes recuperam o investimento em *2-3 meses* com:
- Aumento de conversao
- Reducao de custos operacionais
- Atendimento 24/7 sem hora extra

Posso fazer um calculo personalizado pro seu caso?`,
        argumentos: [
          'Um atendente gerencia 3x mais conversas com a plataforma',
          'ROI medio de 2-3 meses',
          'Chatbot funciona 24h sem custo adicional',
          '80% das conversas automatizadas'
        ],
        dados_suporte: 'Clientes relatam economia de ate 60% em custos de atendimento'
      },
      {
        titulo: 'O concorrente e mais barato',
        nivel: 'comum',
        contexto: 'Cliente comparando precos sem considerar qualidade',
        tecnica_call: {
          nome: 'Tecnica da Comparacao de Valor',
          passos: [
            'Pergunte qual concorrente e quais funcionalidades oferece',
            'Destaque diferenciais exclusivos da Paper Vines',
            'Foque na API Oficial (seguranca do numero)',
            'Mencione o suporte especializado incluso',
            'Calcule o custo real (funcionalidades + riscos)'
          ],
          gatilhos: ['Autoridade', 'Seguranca', 'Exclusividade']
        },
        script_whatsapp: `Boa pergunta! Qual plataforma voce esta comparando?

A Paper Vines tem diferenciais que impactam diretamente seu bolso:

*API Oficial do Meta* - Seu numero NUNCA sera bloqueado. Plataformas nao-oficiais usam metodos que podem bloquear seu WhatsApp a qualquer momento.

*IA com 98% de precisao* - Nao e chatbot simples. Sao agentes inteligentes que entendem contexto.

*Omnichannel real* - WhatsApp + Instagram + Messenger numa so tela.

*Suporte via grupo de WhatsApp* - Time dedicado, nao ticket.

O "barato" pode sair caro se seu numero for bloqueado ou se a IA nao funcionar direito.

Quer ver uma demo comparativa?`,
        argumentos: [
          'API Oficial = zero risco de bloqueio',
          'Suporte dedicado via WhatsApp (nao ticket)',
          'IA avancada vs chatbot simples',
          'Plataforma brasileira com suporte local'
        ],
        dados_suporte: 'Empresas que usam APIs nao-oficiais tem 40% de chance de bloqueio'
      },
      {
        titulo: 'Nao tenho orcamento agora',
        nivel: 'comum',
        contexto: 'Restricao financeira momentanea',
        tecnica_call: {
          nome: 'Tecnica do Parcelamento + Urgencia',
          passos: [
            'Entenda o cenario financeiro atual',
            'Apresente opcoes de parcelamento',
            'Mostre o custo de esperar (leads perdidos)',
            'Oferte condicoes especiais com prazo',
            'Sugira comecar com plano menor'
          ],
          gatilhos: ['Escassez', 'Urgencia', 'Flexibilidade']
        },
        script_whatsapp: `Entendo! Mas deixa eu te mostrar algo importante:

*Quanto voce esta PERDENDO por mes sem automacao?*

Se voce deixa de responder 10 leads fora do horario comercial, e cada lead vale R$ 500...
Sao R$ 5.000/mes escapando!

*Opcoes flexiveis:*
- Implantacao parcelada em ate 3x
- Comece com plano Basic e evolua
- Proposta especial valida por 7 dias

Enquanto voce avalia, seus concorrentes ja estao automatizando...

Qual seria um valor confortavel pra comecar?`,
        argumentos: [
          'Parcelamento da implantacao',
          'Planos escalaveis (comece pequeno)',
          'Custo de oportunidade de esperar',
          'Proposta com validade limitada'
        ],
        dados_suporte: 'Cada mes sem automacao representa em media 30% de leads perdidos'
      }
    ]
  },
  tempo: {
    categoria: 'Tempo e Prioridade',
    icone: 'clock',
    cor: '#8b5cf6',
    objecoes: [
      {
        titulo: 'Nao tenho tempo agora',
        nivel: 'muito_comum',
        contexto: 'Cliente sobrecarregado com outras prioridades',
        tecnica_call: {
          nome: 'Tecnica do Tempo Investido vs Tempo Economizado',
          passos: [
            'Valide: "Voce deve estar com muita demanda mesmo..."',
            'Inverta a logica: tempo gasto AGORA = tempo ganho DEPOIS',
            'Destaque que a implantacao e feita pela Paper Vines',
            'Proponha micro-compromisso: "30 min de demo"',
            'Agende para momento especifico'
          ],
          gatilhos: ['Reciprocidade', 'Compromisso', 'Consistencia']
        },
        script_whatsapp: `Justamente por voce nao ter tempo que a Paper Vines e ideal!

*Nossa solucao CRIA tempo pra voce:*

- Chatbot responde perguntas frequentes automaticamente
- IA qualifica leads enquanto voce foca em vendas
- Implantacao feita pela NOSSA equipe (voce nao precisa fazer nada)
- Treinamento de apenas 1 hora

*Uma demo de 30 minutos pode te mostrar como ganhar HORAS por semana.*

Qual melhor dia: terca ou quarta?`,
        argumentos: [
          'Implantacao 100% feita pela Paper Vines',
          'Treinamento de apenas 1 hora',
          'Automacao de 80% das conversas',
          'Demo de apenas 30 minutos'
        ],
        dados_suporte: 'Clientes economizam em media 15 horas/semana com automacao'
      },
      {
        titulo: 'Vou deixar pra depois / proximo mes',
        nivel: 'comum',
        contexto: 'Procrastinacao ou falta de urgencia',
        tecnica_call: {
          nome: 'Tecnica do Custo da Inacao',
          passos: [
            'Calcule quantos leads ele perde por dia/semana',
            'Mostre o que concorrentes estao fazendo',
            'Crie urgencia com condicoes especiais',
            'Pergunte o que precisa acontecer pra ser prioridade',
            'Oferte comecar a implantacao mesmo sem pressa'
          ],
          gatilhos: ['Escassez', 'Prova social', 'Medo de perder']
        },
        script_whatsapp: `Entendo! Mas posso te fazer uma pergunta?

*Quantos leads voce perde POR DIA sem resposta rapida?*

Se sao 5 leads/dia x 30 dias = 150 leads/mes
Se 10% virariam clientes = 15 vendas perdidas

Enquanto voce espera o "momento certo", seus concorrentes ja estao:
- Respondendo em segundos com chatbot
- Atendendo fora do horario comercial
- Qualificando leads automaticamente

*Condicao especial:* Proposta travada por 7 dias nesse valor.

Posso reservar a agenda de implantacao pro inicio do proximo mes?`,
        argumentos: [
          'Cada dia sem automacao = leads perdidos',
          'Concorrentes ja estao automatizando',
          'Condicoes especiais com prazo',
          'Pode reservar agenda sem compromisso'
        ],
        dados_suporte: 'Tempo medio de resposta impacta 78% na decisao de compra'
      }
    ]
  },
  confianca: {
    categoria: 'Confianca e Credibilidade',
    icone: 'shield-alt',
    cor: '#10b981',
    objecoes: [
      {
        titulo: 'Ja tenho um sistema / Uso outra plataforma',
        nivel: 'comum',
        contexto: 'Cliente ja usa concorrente ou solucao propria',
        tecnica_call: {
          nome: 'Tecnica da Migracao Sem Dor',
          passos: [
            'Pergunte qual sistema usa e ha quanto tempo',
            'Identifique dores e limitacoes do sistema atual',
            'Destaque diferenciais exclusivos da Paper Vines',
            'Oferte migracao assistida',
            'Proponha teste paralelo sem cancelar o atual'
          ],
          gatilhos: ['Curiosidade', 'Melhoria continua', 'Seguranca']
        },
        script_whatsapp: `Interessante! Qual plataforma voce usa hoje?

Muitos clientes migram pra Paper Vines por motivos como:

*Se usa API nao-oficial:*
- Risco de bloqueio do numero
- Instabilidade na conexao
- Sem selo de verificacao

*Se usa chatbot simples:*
- Nossa IA tem 98% de precisao
- Agentes entendem contexto, nao so palavras-chave
- Transcreve audios automaticamente

*Se usa sistema separado:*
- Omnichannel real (WhatsApp + Instagram + Messenger)
- CRM integrado na mesma plataforma

Posso fazer uma demo comparativa? Voce ve as diferencas na pratica!`,
        argumentos: [
          'API Oficial vs nao-oficial (risco de bloqueio)',
          'IA avancada vs chatbot simples',
          'Omnichannel integrado',
          'Migracao assistida pela equipe'
        ],
        dados_suporte: 'IA Paper Vines tem 98% de precisao vs 60% de chatbots tradicionais'
      },
      {
        titulo: 'Preciso ver funcionando antes',
        nivel: 'comum',
        contexto: 'Cliente precisa de prova concreta',
        tecnica_call: {
          nome: 'Tecnica da Experiencia Imediata',
          passos: [
            'Valide a necessidade de ver na pratica',
            'Oferte o teste gratuito de 14 dias',
            'Sugira demo ao vivo personalizada',
            'Mostre videos de clientes usando',
            'Agende demonstracao imediata'
          ],
          gatilhos: ['Reciprocidade', 'Prova', 'Experiencia']
        },
        script_whatsapp: `Perfeito! Concordo que ver funcionando e o melhor caminho!

*Tenho 3 opcoes pra voce:*

1. *Teste Gratuito de 14 dias*
   Voce usa a plataforma real, sem compromisso
   Link: https://chat.papervines.digital/trial/sign-up

2. *Demo ao vivo personalizada*
   Nosso especialista mostra usando exemplos do SEU negocio
   30 minutos apenas

3. *Videos de clientes usando*
   Playlist completa: https://youtube.com/playlist?list=PLQnLWcfvhavZIp6EHujInobasehrz7DjH

Qual prefere?`,
        argumentos: [
          'Teste gratuito de 14 dias sem compromisso',
          'Demo personalizada para o segmento',
          'Videos tutoriais disponiveis',
          'Cases de clientes do mesmo setor'
        ],
        dados_suporte: '95% dos clientes que testam acabam contratando'
      },
      {
        titulo: 'Como sei que vai funcionar pro meu negocio?',
        nivel: 'comum',
        contexto: 'Duvida sobre adequacao ao segmento',
        tecnica_call: {
          nome: 'Tecnica do Case Similar',
          passos: [
            'Pergunte sobre o segmento e modelo de negocio',
            'Cite cliente similar que usa a plataforma',
            'Explique como foi a implantacao dele',
            'Mostre resultados especificos',
            'Oferte contato com cliente referencia'
          ],
          gatilhos: ['Prova social', 'Especificidade', 'Autoridade']
        },
        script_whatsapp: `Otima pergunta! Qual e seu segmento?

A Paper Vines atende diversos setores:

*Clinicas e Saude:* Agendamento automatico, confirmacao, lembretes
*E-commerce:* Status de pedido, rastreio, SAC automatizado
*Servicos:* Qualificacao de leads, agendamento, follow-up
*Telecom:* Regua de cobranca, suporte tecnico, vendas

Temos clientes desde 2020, processando *2.847+ mensagens/dia* com 98% de precisao.

Posso mostrar um case especifico do seu setor?`,
        argumentos: [
          'Clientes de diversos segmentos',
          'Casos de sucesso documentados',
          'Plataforma flexivel e customizavel',
          'Equipe especializada em cada setor'
        ],
        dados_suporte: 'Paper Vines atende +50 segmentos diferentes desde 2020'
      }
    ]
  },
  tecnica: {
    categoria: 'Tecnica e Implementacao',
    icone: 'cogs',
    cor: '#3b82f6',
    objecoes: [
      {
        titulo: 'Minha equipe nao vai se adaptar',
        nivel: 'comum',
        contexto: 'Medo de resistencia da equipe ou complexidade',
        tecnica_call: {
          nome: 'Tecnica da Simplicidade Comprovada',
          passos: [
            'Valide a preocupacao com a equipe',
            'Mostre a interface intuitiva',
            'Destaque o treinamento incluso',
            'Mencione estatistica de adaptacao (95%)',
            'Oferte suporte continuo via WhatsApp'
          ],
          gatilhos: ['Prova social', 'Simplicidade', 'Suporte']
        },
        script_whatsapp: `Essa e uma preocupacao muito comum! Mas deixa eu te tranquilizar:

*Por que 95% das equipes se adaptam na primeira semana:*

1. *Interface intuitiva* - Se sua equipe usa WhatsApp, ja sabe usar
2. *Treinamento de 1 hora* - Nao precisa de curso ou certificacao
3. *Suporte via grupo de WhatsApp* - Duvida? Pergunta no grupo e responde rapido
4. *Videos tutoriais* - Biblioteca completa de como fazer tudo
5. *Acompanhamento inicial* - Nossa equipe fica junto nos primeiros dias

Na pratica, quem mais resiste no inicio vira o maior fa depois!

Quer que eu mostre a interface na demo?`,
        argumentos: [
          '95% de adaptacao na primeira semana',
          'Treinamento de apenas 1 hora',
          'Suporte via grupo de WhatsApp',
          'Interface similar ao WhatsApp'
        ],
        dados_suporte: 'Interface com curva de aprendizado de 1h baseada no WhatsApp'
      },
      {
        titulo: 'E muito complicado configurar / Nao tenho equipe tecnica',
        nivel: 'comum',
        contexto: 'Medo de complexidade tecnica',
        tecnica_call: {
          nome: 'Tecnica do Servico Completo',
          passos: [
            'Explique que a implantacao e feita pela Paper Vines',
            'Detalhe o que esta incluso na implantacao',
            'Mostre que nao precisa de conhecimento tecnico',
            'Destaque o suporte continuo',
            'Oferte comecar com configuracao basica'
          ],
          gatilhos: ['Conforto', 'Delegacao', 'Especialidade']
        },
        script_whatsapp: `Voce NAO precisa de equipe tecnica!

*O que a Paper Vines faz por voce:*

- Configura toda a plataforma
- Cria os chatbots do zero
- Integra com seu WhatsApp
- Conecta Instagram e Messenger
- Treina sua equipe
- Suporte continuo via grupo

Voce so precisa:
1. Dar acesso ao Gerenciador de Negocios do Meta
2. Ter um cartao internacional
3. Participar da reuniao de Kick-Off

*Zero conhecimento tecnico necessario!*

Ficou mais tranquilo?`,
        argumentos: [
          'Implantacao 100% feita pela Paper Vines',
          'Zero conhecimento tecnico necessario',
          'Suporte continuo incluso',
          'Treinamento da equipe incluso'
        ],
        dados_suporte: 'Implantacao media de 5 dias uteis com zero esforco do cliente'
      },
      {
        titulo: 'E se der problema? E se cair?',
        nivel: 'comum',
        contexto: 'Medo de instabilidade ou falta de suporte',
        tecnica_call: {
          nome: 'Tecnica da Seguranca Total',
          passos: [
            'Explique a estabilidade da API Oficial do Meta',
            'Mostre os canais de suporte disponiveis',
            'Destaque o grupo de WhatsApp dedicado',
            'Mencione o uptime da plataforma',
            'Oferte SLA de resposta'
          ],
          gatilhos: ['Seguranca', 'Garantia', 'Confianca']
        },
        script_whatsapp: `Excelente preocupacao! Vou te mostrar por que pode ficar tranquilo:

*API Oficial do Meta:*
- Conexao direta com servidores do WhatsApp
- Mesma infraestrutura usada por grandes empresas
- Zero risco de bloqueio por "uso nao autorizado"

*Suporte Paper Vines:*
- Grupo de WhatsApp dedicado (resposta rapida)
- Equipe tecnica monitorando 24h
- Chamados resolvidos em horas, nao dias

*Desde 2020:*
- Processamos 2.847+ mensagens/dia
- Uptime de 99.9%
- Milhares de clientes satisfeitos

Se der qualquer problema, voce manda no grupo e resolvemos!`,
        argumentos: [
          'API Oficial = estabilidade garantida',
          'Suporte via WhatsApp (nao ticket)',
          'Uptime de 99.9%',
          'Monitoramento 24h'
        ],
        dados_suporte: 'Uptime de 99.9% desde 2020 com API Oficial do Meta'
      }
    ]
  },
  decisao: {
    categoria: 'Decisao e Autoridade',
    icone: 'user-tie',
    cor: '#ec4899',
    objecoes: [
      {
        titulo: 'Preciso falar com meu socio / diretor / chefe',
        nivel: 'muito_comum',
        contexto: 'Cliente nao tem autoridade final de decisao',
        tecnica_call: {
          nome: 'Tecnica da Reuniao Conjunta',
          passos: [
            'Valide a necessidade de consultar o decisor',
            'Oferte fazer apresentacao para ambos',
            'Pergunte quais sao as principais preocupacoes do decisor',
            'Prepare argumentos especificos para ele',
            'Agende reuniao com prazo definido'
          ],
          gatilhos: ['Facilitacao', 'Autoridade', 'Conveniencia']
        },
        script_whatsapp: `Perfeito! Faz total sentido envolver [socio/diretor] na decisao.

*Tenho uma sugestao:*

Posso agendar uma demo para voces dois? Assim:
- Ele tira todas as duvidas diretamente
- Evita o "telefone sem fio"
- Ve na pratica como funciona
- Consegue avaliar junto com voce

*Pergunta importante:*
Quais sao as principais preocupacoes que ele costuma ter? (preco, tempo, tecnologia?)

Assim preparo a apresentacao focada no que importa pra ele!

Qual o melhor dia/horario para voces?`,
        argumentos: [
          'Demo conjunta evita telefone sem fio',
          'Apresentacao personalizada para decisor',
          'Todas as duvidas resolvidas na hora',
          'Decisao mais rapida e assertiva'
        ],
        dados_suporte: 'Demos conjuntas tem 3x mais taxa de fechamento'
      },
      {
        titulo: 'Vou avaliar / Preciso pensar',
        nivel: 'muito_comum',
        contexto: 'Cliente quer tempo para decidir',
        tecnica_call: {
          nome: 'Tecnica da Clarificacao + Urgencia',
          passos: [
            'Valide a necessidade de avaliar',
            'Pergunte qual a principal duvida',
            'Esclareca pontos pendentes imediatamente',
            'Crie urgencia com prazo da proposta',
            'Oferte proximo passo concreto'
          ],
          gatilhos: ['Escassez', 'Clareza', 'Compromisso']
        },
        script_whatsapp: `Claro! E importante avaliar bem antes de decidir.

*Posso te ajudar nessa avaliacao?*

Me conta: Qual e a PRINCIPAL duvida ou preocupacao que voce tem?

- Preco / Investimento?
- Funcionamento / Tecnologia?
- Tempo de implantacao?
- Adaptacao da equipe?
- Outra?

Assim posso te dar informacoes especificas pra sua analise.

*Importante:* A proposta com condicoes especiais tem validade de 7 dias.

Enquanto voce avalia, posso reservar uma data de implantacao sem compromisso?`,
        argumentos: [
          'Identificar objecao real por tras',
          'Esclarecer duvidas imediatamente',
          'Proposta com prazo de validade',
          'Reserva de agenda sem compromisso'
        ],
        dados_suporte: 'Descobrir a duvida real aumenta conversao em 40%'
      },
      {
        titulo: 'Me manda material / proposta por email',
        nivel: 'comum',
        contexto: 'Cliente quer encerrar conversa ou avaliar sozinho',
        tecnica_call: {
          nome: 'Tecnica do Compromisso de Retorno',
          passos: [
            'Concorde em enviar o material',
            'Pergunte o que especificamente quer ver',
            'Agende follow-up para discutir o material',
            'Envie material personalizado',
            'Faca follow-up no prazo combinado'
          ],
          gatilhos: ['Compromisso', 'Reciprocidade', 'Consistencia']
        },
        script_whatsapp: `Claro! Vou enviar sim!

*Pra eu montar um material relevante pra voce:*

O que e mais importante voce ver?
- Funcionalidades da plataforma?
- Tabela de precos detalhada?
- Cases de clientes do seu setor?
- Comparativo com concorrentes?

*Combinado:* Envio hoje ate [HORARIO] e na [quinta/sexta] te ligo pra tirar duvidas sobre o material.

Pode ser?`,
        argumentos: [
          'Material personalizado e mais efetivo',
          'Follow-up agendado garante continuidade',
          'Compromisso de retorno do cliente',
          'Material especifico para suas duvidas'
        ],
        dados_suporte: 'Follow-up agendado tem 5x mais chance de conversao'
      }
    ]
  },
  especificas: {
    categoria: 'Objecoes Especificas',
    icone: 'question-circle',
    cor: '#6366f1',
    objecoes: [
      {
        titulo: 'Ja tentei chatbot antes e nao funcionou',
        nivel: 'comum',
        contexto: 'Experiencia negativa anterior com automacao',
        tecnica_call: {
          nome: 'Tecnica da Diferenciacao',
          passos: [
            'Valide a experiencia negativa',
            'Pergunte o que deu errado especificamente',
            'Explique a diferenca da IA Paper Vines',
            'Mostre a precisao de 98%',
            'Oferte teste para comparar'
          ],
          gatilhos: ['Empatia', 'Diferenciacao', 'Prova']
        },
        script_whatsapp: `Entendo! Muita gente teve experiencias ruins com chatbots antigos.

*O que provavelmente aconteceu:*
- Chatbot baseado em "palavras-chave" (muito limitado)
- Respostas roboticas e confusas
- Nao entendia contexto
- Frustrava mais que ajudava

*A Paper Vines e diferente:*
- IA com 98% de precisao (nao e chatbot simples)
- Agentes inteligentes que ENTENDEM contexto
- Transcreve audios automaticamente
- Aprende com cada conversa

*Proposta:* Teste 14 dias gratis. Se nao gostar, nao paga nada.

O que acha de comparar na pratica?`,
        argumentos: [
          'IA avancada vs chatbot tradicional',
          '98% de precisao comprovada',
          'Entende contexto, nao so palavras-chave',
          'Teste gratuito sem compromisso'
        ],
        dados_suporte: 'IA Paper Vines tem 98% de precisao vs 40-60% de chatbots tradicionais'
      },
      {
        titulo: 'Meu atendimento precisa ser humanizado',
        nivel: 'comum',
        contexto: 'Medo de perder toque humano',
        tecnica_call: {
          nome: 'Tecnica do Hibrido Inteligente',
          passos: [
            'Valide a importancia do atendimento humanizado',
            'Explique o modelo hibrido (IA + humano)',
            'Mostre que IA libera humanos para casos complexos',
            'Destaque transferencia automatica para atendente',
            'Demonstre na pratica'
          ],
          gatilhos: ['Validacao', 'Complementaridade', 'Melhoria']
        },
        script_whatsapp: `Concordo 100%! Atendimento humanizado e essencial.

*E exatamente por isso que a Paper Vines ajuda:*

A IA cuida do que e repetitivo:
- Perguntas frequentes
- Informacoes basicas
- Qualificacao inicial
- Agendamentos

*Seus atendentes humanos ficam livres para:*
- Casos complexos que precisam de empatia
- Negociacoes delicadas
- Relacionamento com clientes VIP
- Vendas consultivas

E quando a IA detecta que precisa de humano, transfere automaticamente!

*Resultado:* Mais tempo pro que importa, sem perder o toque humano.

Quer ver como funciona essa integracao?`,
        argumentos: [
          'Modelo hibrido IA + humano',
          'IA libera humanos para casos importantes',
          'Transferencia automatica inteligente',
          'Mais qualidade, nao menos'
        ],
        dados_suporte: 'Atendimento hibrido tem satisfacao 30% maior que 100% humano'
      },
      {
        titulo: 'Nao quero depender de tecnologia',
        nivel: 'raro',
        contexto: 'Resistencia a digitalizacao',
        tecnica_call: {
          nome: 'Tecnica da Evolucao Necessaria',
          passos: [
            'Entenda o medo por tras da objecao',
            'Mostre o mercado atual (clientes digitais)',
            'Explique que concorrentes ja usam',
            'Destaque a simplicidade da plataforma',
            'Oferte implantacao gradual'
          ],
          gatilhos: ['Realidade do mercado', 'Competitividade', 'Gradualismo']
        },
        script_whatsapp: `Entendo sua preocupacao! Mas deixa eu compartilhar algo importante:

*A realidade do mercado hoje:*
- 99% dos brasileiros usam WhatsApp
- Clientes esperam resposta em MINUTOS
- Concorrentes ja estao automatizando
- Quem nao se adapta, perde mercado

*A boa noticia:*
- A Paper Vines e simples como usar WhatsApp
- Voce NAO vira refem da tecnologia
- Seus dados sao SEUS (pode exportar quando quiser)
- Suporte humano via grupo de WhatsApp

*Proposta:* Comece pequeno, so com chatbot de entrada. Veja os resultados e evolua no seu ritmo.

O que acha?`,
        argumentos: [
          'Mercado exige presenca digital',
          'Plataforma simples e intuitiva',
          'Implantacao gradual possivel',
          'Dados sempre pertencem ao cliente'
        ],
        dados_suporte: '78% dos consumidores preferem empresas que respondem rapido via WhatsApp'
      }
    ]
  }
};

export const TECNICAS_GERAIS = [
  {
    nome: 'LAER - Ouvir, Reconhecer, Explorar, Responder',
    descricao: 'Framework classico para tratamento de objecoes',
    passos: [
      'Listen (Ouvir): Deixe o cliente falar sem interromper',
      'Acknowledge (Reconhecer): Valide a preocupacao dele',
      'Explore (Explorar): Faca perguntas para entender a raiz',
      'Respond (Responder): Ofereca solucao especifica'
    ]
  },
  {
    nome: 'Feel, Felt, Found',
    descricao: 'Tecnica de empatia e prova social',
    passos: [
      'Feel: "Entendo como voce se sente..."',
      'Felt: "Outros clientes tambem sentiram isso..."',
      'Found: "O que eles descobriram foi que..."'
    ]
  },
  {
    nome: 'Boomerang',
    descricao: 'Transformar objecao em motivo para comprar',
    passos: [
      'Pegue a objecao do cliente',
      'Transforme em beneficio',
      'Exemplo: "Justamente por nao ter tempo que voce precisa de automacao"'
    ]
  },
  {
    nome: 'Isolamento',
    descricao: 'Descobrir se e a unica objecao',
    passos: [
      'Pergunte: "Alem disso, tem mais alguma preocupacao?"',
      'Isole a objecao principal',
      'Resolva e feche'
    ]
  }
];

export const GATILHOS_MENTAIS = [
  {
    nome: 'Escassez',
    uso: 'Proposta valida por 7 dias / Agenda limitada',
    exemplo: 'Essa condicao especial e valida ate sexta-feira.'
  },
  {
    nome: 'Urgencia',
    uso: 'Custo de esperar / Concorrentes',
    exemplo: 'Enquanto voce avalia, seus concorrentes ja estao automatizando.'
  },
  {
    nome: 'Prova Social',
    uso: 'Cases, numeros, depoimentos',
    exemplo: '95% dos clientes se adaptam na primeira semana.'
  },
  {
    nome: 'Autoridade',
    uso: 'API Oficial, parceria Meta, desde 2020',
    exemplo: 'Somos parceiros oficiais do Meta com API certificada.'
  },
  {
    nome: 'Reciprocidade',
    uso: 'Teste gratuito, demo, material',
    exemplo: 'Teste 14 dias gratis, sem compromisso.'
  },
  {
    nome: 'Compromisso',
    uso: 'Micro-compromissos, agendamentos',
    exemplo: 'Posso agendar a demo para terca ou quarta?'
  }
];
