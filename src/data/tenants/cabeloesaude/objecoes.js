// Dados expandidos de Objecoes - Clinica de Tricologia Cabelo & Saude
// Baseado em pesquisa do segmento e melhores praticas de vendas em saude

export const ESTATISTICAS_CLINICA = {
  anos_experiencia: '7+',
  taxa_satisfacao: '92%',
  pacientes_atendidos: '2.000+',
  especializacao: 'Tricologia',
  abordagem: 'Investigativa - trata a causa',
  diferenciais: ['Sem paliativos', 'Protocolo personalizado', 'Acompanhamento continuo']
};

export const DIFERENCIAIS = [
  {
    titulo: 'Tratamos a Causa',
    descricao: 'Investigamos por que voce esta perdendo cabelo, nao apenas tratamos o sintoma.',
    icone: 'search'
  },
  {
    titulo: 'Biomedica Especialista',
    descricao: 'Franciele e biomedica com especializacao em tricologia e 7 anos de experiencia.',
    icone: 'user-md'
  },
  {
    titulo: 'Sem Paliativos',
    descricao: 'Nao dependemos apenas de Minoxidil e Finasterida - vamos alem.',
    icone: 'ban'
  },
  {
    titulo: 'Diagnostico Preciso',
    descricao: 'Usamos tricoscopia e exames complementares para entender seu caso.',
    icone: 'microscope'
  },
  {
    titulo: 'Protocolo Personalizado',
    descricao: 'Cada paciente recebe tratamento especifico para sua condicao.',
    icone: 'clipboard-list'
  },
  {
    titulo: 'Resultados Reais',
    descricao: 'Mais de 2.000 pacientes tratados com 92% de satisfacao.',
    icone: 'chart-line'
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
        nivel: 'muito_comum',
        contexto: 'Paciente acha o valor do tratamento alto',
        tecnica_call: {
          nome: 'Tecnica do Custo Acumulado',
          passos: [
            'Valide: "Entendo sua preocupacao com o investimento..."',
            'Pergunte: "Quanto voce ja gastou em tratamentos que nao funcionaram?"',
            'Some: Minoxidil + shampoos + vitaminas + consultas = R$ X por ano',
            'Compare: Tratamento completo com resultados vs paliativos infinitos',
            'Mostre parcelamento e beneficios duradouros'
          ],
          gatilhos: ['Logica financeira', 'Custo de oportunidade', 'Resultados duradouros']
        },
        script_whatsapp: `Entendo sua preocupacao com o investimento, [Nome].

Mas me permite uma reflexao?

*Quanto voce ja gastou em tratamentos que nao resolveram?*
- Minoxidil: R$ 80-150/mes = R$ 1.000-1.800/ano
- Shampoos "antiqueda": R$ 50-100/mes = R$ 600-1.200/ano
- Vitaminas: R$ 100-200/mes = R$ 1.200-2.400/ano
- Consultas que so passaram remedios: R$ 200-500 cada

Em 2-3 anos, muitos pacientes ja gastaram R$ 5.000-10.000... e continuam perdendo cabelo.

*Nosso tratamento:*
- Investimento definido (nao eterno)
- Trata a causa, nao o sintoma
- Resultados duradouros

Temos parcelamento em ate 12x. Quer que eu monte uma proposta que caiba no seu orcamento?`,
        argumentos: [
          'Some quanto ja gastou em paliativos',
          'Tratamento tem duracao definida vs uso eterno',
          'Resultados duradouros vs temporarios',
          'Parcelamento disponivel'
        ],
        dados_suporte: 'Brasileiro gasta em media R$ 3.500/ano com produtos capilares que nao resolvem'
      },
      {
        titulo: 'Vou pesquisar precos em outros lugares',
        nivel: 'comum',
        contexto: 'Paciente quer comparar com outras clinicas',
        tecnica_call: {
          nome: 'Tecnica da Diferenciacao de Valor',
          passos: [
            'Encoraje a pesquisa - mostra confianca',
            'Destaque diferenciais unicos da clinica',
            'Alerte sobre "tratamentos baratos" que sao paliativos',
            'Pergunte o que ele vai comparar (preco ou resultado?)',
            'Ofereca material para ele levar e comparar'
          ],
          gatilhos: ['Confianca', 'Diferenciacao', 'Educacao']
        },
        script_whatsapp: `Claro, [Nome]! E importante pesquisar antes de decidir.

*Quando for comparar, observe:*

❓ A clinica investiga a CAUSA ou so trata sintoma?
❓ O tratamento e personalizado ou padrao pra todos?
❓ Usam apenas Minoxidil/Finasterida ou tem protocolo completo?
❓ Ha acompanhamento da evolucao ou so vende sessoes?
❓ A profissional e especialista em tricologia?

*Aqui na Cabelo & Saude:*
✅ Investigamos a causa com tricoscopia + exames
✅ Protocolo 100% personalizado
✅ Nao dependemos so de paliativos
✅ Acompanhamento continuo com ajustes
✅ Franciele e biomedica tricologista com 7 anos de experiencia

O mais barato nem sempre e o mais economico se nao resolver.

Quer levar o orcamento para comparar com calma?`,
        argumentos: [
          'Encoraje pesquisa - mostra confianca',
          'Liste criterios de comparacao',
          'Destaque diferenciais',
          'Alerte sobre paliativos disfarçados'
        ],
        dados_suporte: 'Tratamentos muito baratos geralmente sao apenas paliativos padronizados'
      },
      {
        titulo: 'Nao tenho dinheiro agora',
        nivel: 'comum',
        contexto: 'Restricao financeira momentanea',
        tecnica_call: {
          nome: 'Tecnica do Parcelamento + Urgencia Suave',
          passos: [
            'Demonstre empatia genuina',
            'Apresente opcoes de parcelamento',
            'Mostre opcao de tratamento minimo para comecar',
            'Alerte sobre progressao da queda (sem pressionar)',
            'Sugira data futura para retomar'
          ],
          gatilhos: ['Empatia', 'Flexibilidade', 'Urgencia natural']
        },
        script_whatsapp: `Entendo, [Nome]. Momento financeiro pesa na decisao mesmo.

*Algumas opcoes:*

1. *Parcelamento estendido:* Ate 12x no cartao
2. *Tratamento inicial:* Comecar com protocolo basico e evoluir
3. *Agenda futura:* Reservar para mes que vem com valores de hoje

*Uma informacao importante (sem pressao):*
A queda capilar tende a progredir. O que tratamos hoje em 6 meses pode precisar de 1 ano daqui a alguns meses.

Nao e para te pressionar - e apenas um fato clinico que voce merece saber.

Qual opcao faz mais sentido pra voce?`,
        argumentos: [
          'Parcelamento estendido',
          'Opcao de tratamento inicial',
          'Reserva de agenda futura',
          'Progressao natural da queda (sem pressao)'
        ],
        dados_suporte: 'Quanto mais cedo inicia tratamento, melhores e mais rapidos os resultados'
      }
    ]
  },
  confianca: {
    categoria: 'Confianca e Credibilidade',
    icone: 'shield-alt',
    cor: '#10b981',
    objecoes: [
      {
        titulo: 'Ja tentei tudo e nada funcionou',
        nivel: 'muito_comum',
        contexto: 'Paciente frustrado com tratamentos anteriores',
        tecnica_call: {
          nome: 'Tecnica da Validacao + Diferenciacao',
          passos: [
            'Valide a frustracao - e real e justa',
            'Pergunte especificamente o que ja tentou',
            'Explique por que nao funcionou (tratavam sintoma)',
            'Mostre a diferenca da abordagem investigativa',
            'Ofereca avaliacao para mostrar na pratica'
          ],
          gatilhos: ['Empatia', 'Educacao', 'Prova']
        },
        script_whatsapp: `[Nome], essa frustracao e completamente compreensivel.

Muitos dos nossos pacientes chegam assim - ja tentaram de tudo e estao desacreditados.

*Posso te contar o que provavelmente aconteceu?*

A maioria dos tratamentos disponiveis trata o *sintoma* (a queda), nao a *causa*.

- Minoxidil = vasodilata mas nao resolve a causa
- Finasterida = bloqueia DHT mas nao investiga por que
- Shampoos = cuidam do fio, nao do foliculo
- Vitaminas genericas = podem nao ser o que voce precisa

*Aqui fazemos diferente:*
Investigamos POR QUE voce esta perdendo cabelo.
- E hormonal? Nutricional? Inflamatorio? Estresse?
- Seus foliculos estao ativos ou ja fecharam?
- O que seus exames mostram?

So tratamos depois de entender.

Que tal fazer a avaliacao e ver no tricoscopio a situacao real do seu couro cabeludo?`,
        argumentos: [
          'Validar frustracao - e real',
          'Explicar por que outros falharam',
          'Mostrar diferenca da abordagem',
          'Convidar para ver na pratica'
        ],
        dados_suporte: '85% dos pacientes que chegam frustrados tiveram apenas tratamentos paliativos'
      },
      {
        titulo: 'Meu dermatologista disse que nao tem jeito',
        nivel: 'comum',
        contexto: 'Paciente recebeu prognostico negativo',
        tecnica_call: {
          nome: 'Tecnica da Segunda Opiniao Especializada',
          passos: [
            'Respeite o profissional anterior',
            'Explique que dermatologia e ampla, tricologia e especialidade',
            'Mostre que "nao ter jeito" depende de avaliacao especifica',
            'Convide para avaliacao tricologica detalhada',
            'Seja honesto - nem sempre tem solucao, mas merece investigar'
          ],
          gatilhos: ['Respeito', 'Especializacao', 'Honestidade']
        },
        script_whatsapp: `Entendo, [Nome]. Ouvir isso de um medico e muito dificil.

*Com todo respeito ao profissional:*

Dermatologia e uma area muito ampla - pele, unhas, cabelos, alergias...
Tricologia e a especialidade FOCADA em cabelos e couro cabeludo.

E como a diferenca entre clinico geral e cardiologista - ambos sao medicos, mas a especializacao importa.

*O que "nao ter jeito" significa?*
- Foliculos ja fecharam? (precisamos ver no tricoscopio)
- E genetico irreversivel? (existem niveis diferentes)
- Ou e que nao conhecem tratamentos alem de Minoxidil?

*Proposta honesta:*
Vamos fazer a avaliacao tricologica. Vou te mostrar exatamente a situacao dos seus foliculos.

Se realmente nao houver o que fazer, serei honesta contigo.
Mas na minha experiencia, muitos casos "sem jeito" tinham sim solucao - so precisavam de investigacao adequada.

O que acha?`,
        argumentos: [
          'Respeitar profissional anterior',
          'Diferenciar dermatologia de tricologia',
          'Questionar o que significa "sem jeito"',
          'Propor avaliacao com honestidade'
        ],
        dados_suporte: '7 em 10 pacientes com "prognostico negativo" tinham opcoes de tratamento'
      },
      {
        titulo: 'Como sei que vai funcionar pra mim?',
        nivel: 'comum',
        contexto: 'Duvida sobre eficacia no caso especifico',
        tecnica_call: {
          nome: 'Tecnica da Avaliacao Primeiro',
          passos: [
            'Valide - e uma pergunta inteligente',
            'Explique que so podemos prometer apos avaliar',
            'Mostre que a avaliacao revela o potencial',
            'Seja honesto - nem todos os casos tem mesma resposta',
            'Convide para avaliacao sem compromisso'
          ],
          gatilhos: ['Honestidade', 'Transparencia', 'Avaliacao']
        },
        script_whatsapp: `Excelente pergunta, [Nome]! E exatamente o que voce deveria perguntar.

*Vou ser honesta:*

Nao posso te prometer resultado sem te avaliar primeiro.
Quem promete resultado sem ver seu caso esta mentindo.

*O que posso te garantir:*
- Avaliacao tricologica completa (tricoscopia + anamnese)
- Diagnostico honesto do seu caso
- Explicacao clara do potencial de melhora
- Protocolo personalizado SE houver indicacao

*Na avaliacao voce vai saber:*
- Estado atual dos seus foliculos
- Se estao ativos ou inativos
- Quais sao as causas provaveis
- Qual o prognostico realista
- Quanto tempo de tratamento

Depois de ver tudo isso, VOCE decide se quer prosseguir.

Que tal agendar a avaliacao e ter clareza sobre seu caso?`,
        argumentos: [
          'Nao prometo sem avaliar',
          'Avaliacao revela potencial real',
          'Honestidade sobre resultados',
          'Decisao e do paciente'
        ],
        dados_suporte: '92% de satisfacao porque alinhamos expectativas na avaliacao'
      }
    ]
  },
  tempo: {
    categoria: 'Tempo e Comprometimento',
    icone: 'clock',
    cor: '#8b5cf6',
    objecoes: [
      {
        titulo: 'Nao tenho tempo para fazer tratamento',
        nivel: 'comum',
        contexto: 'Paciente com agenda apertada',
        tecnica_call: {
          nome: 'Tecnica da Frequencia Real',
          passos: [
            'Pergunte qual a percepcao de frequencia',
            'Explique a frequencia real das sessoes',
            'Mostre que e investimento de tempo pequeno',
            'Compare com tempo gasto com alternativas',
            'Ofereca horarios flexiveis'
          ],
          gatilhos: ['Clareza', 'Praticidade', 'Flexibilidade']
        },
        script_whatsapp: `Entendo a correria, [Nome]!

*Mas deixa eu te contar como funciona na pratica:*

As sessoes sao:
- Quinzenais ou mensais (dependendo do protocolo)
- Duram em media 30-60 minutos
- Total: 1-2 horas por mes

*Compare com o tempo que voce perde:*
- Pensando no problema
- Procurando solucoes na internet
- Indo em farmacias comprar produtos
- Frustrado porque nada funciona

*Nos temos:*
- Horarios flexiveis (manha, tarde, noite)
- Alguns dias de sabado
- Agendamento com antecedencia

Considerando que e um tratamento com fim definido (nao e eterno), vale o investimento de tempo?

Qual periodo do dia seria melhor pra voce?`,
        argumentos: [
          'Sessoes sao espacadas (quinzenais/mensais)',
          'Duracao curta (30-60 min)',
          'Horarios flexiveis',
          'Tratamento tem duracao definida'
        ],
        dados_suporte: 'Tempo medio por mes: 1-2 horas para resultados que duram'
      },
      {
        titulo: 'Vou esperar mais um pouco / Deixar pra depois',
        nivel: 'muito_comum',
        contexto: 'Procrastinacao da decisao',
        tecnica_call: {
          nome: 'Tecnica da Progressao Natural',
          passos: [
            'Nao pressione - respeite a decisao',
            'Eduque sobre a progressao da queda capilar',
            'Mostre diferenca entre tratar cedo vs tarde',
            'Deixe a porta aberta',
            'Ofereca manter contato'
          ],
          gatilhos: ['Educacao', 'Urgencia natural', 'Respeito']
        },
        script_whatsapp: `Entendo, [Nome]. E uma decisao importante mesmo.

*Posso te passar uma informacao clinica?*

A queda capilar nao e como gripe - nao passa sozinha.
E progressiva na maioria dos casos.

*O que isso significa:*
- Foliculos que hoje estao "adormecidos" podem se fechar
- O que tratamos hoje em 6 meses, pode precisar de 1 ano depois
- Quanto mais cedo = menos sessoes = menos investimento

Nao estou te pressionando - cada um tem seu tempo.

Mas como profissional, seria irresponsavel nao te contar isso.

*Proposta:*
Se quiser, posso te manter informado sobre cuidados preventivos que voce pode fazer em casa enquanto decide.

E quando estiver pronto, e so me chamar. Combinado?`,
        argumentos: [
          'Queda capilar e progressiva',
          'Foliculos podem se fechar',
          'Tratamento precoce = melhores resultados',
          'Respeitar tempo do paciente'
        ],
        dados_suporte: 'Foliculos inativos por mais de 3 anos tem chance reduzida de recuperacao'
      }
    ]
  },
  tratamento: {
    categoria: 'Duvidas sobre Tratamento',
    icone: 'question-circle',
    cor: '#3b82f6',
    objecoes: [
      {
        titulo: 'Minoxidil/Finasterida ja resolvem, nao preciso disso',
        nivel: 'comum',
        contexto: 'Paciente acredita que medicamentos bastam',
        tecnica_call: {
          nome: 'Tecnica da Complementaridade',
          passos: [
            'Nao desvalide os medicamentos',
            'Explique o papel deles (sintoma vs causa)',
            'Mostre que podem fazer parte do protocolo',
            'Questione resultados obtidos ate agora',
            'Proponha abordagem integrada'
          ],
          gatilhos: ['Educacao', 'Complementaridade', 'Resultados']
        },
        script_whatsapp: `Esses medicamentos tem sim seu papel, [Nome].

*Mas deixa eu te explicar uma coisa:*

Minoxidil = vasodilatador (aumenta fluxo sanguineo)
Finasterida = bloqueia DHT (hormonio que afina fios)

*O que eles NAO fazem:*
❌ Nao investigam por que voce esta perdendo cabelo
❌ Nao tratam deficiencias nutricionais
❌ Nao resolvem inflamacoes do couro cabeludo
❌ Nao reequilibram outros hormonios
❌ Nao estimulam foliculos de forma completa

*Pergunta honesta:*
Voce ja usa esses medicamentos? Ha quanto tempo?
Os resultados estao satisfatorios?

Se estivessem, voce provavelmente nao teria me procurado.

Aqui usamos esses medicamentos QUANDO indicados - como parte de um protocolo completo, nao como unica solucao.

Quer entender melhor na avaliacao?`,
        argumentos: [
          'Medicamentos tratam sintoma',
          'Nao investigam causa',
          'Podem fazer parte do protocolo',
          'Questionar resultados atuais'
        ],
        dados_suporte: '70% dos usuarios de Minoxidil/Finasterida nao tem resultados satisfatorios apos 2 anos'
      },
      {
        titulo: 'Tratamento capilar nao funciona, e genetico',
        nivel: 'comum',
        contexto: 'Paciente acredita que genetica e definitiva',
        tecnica_call: {
          nome: 'Tecnica da Nuance Genetica',
          passos: [
            'Valide - genetica e um fator importante',
            'Explique que genetica nao e destino absoluto',
            'Mostre que epigenetica pode ser modulada',
            'Diferencie "retardar" de "reverter"',
            'Ofereca avaliacao para ver potencial'
          ],
          gatilhos: ['Educacao', 'Esperanca realista', 'Ciencia']
        },
        script_whatsapp: `Voce tem razao que genetica e um fator importante, [Nome].

*Mas deixa eu te contar o outro lado:*

Genetica determina a TENDENCIA, nao o destino.

*O que podemos fazer mesmo em casos geneticos:*
✅ Retardar significativamente a progressao
✅ Fortalecer os fios existentes
✅ Reativar foliculos ainda viaveis
✅ Melhorar densidade nas areas afetadas
✅ Manter o que voce tem por muito mais tempo

*O que NAO podemos fazer:*
❌ Criar novos foliculos (ninguem pode)
❌ Reverter calvicie avancada 100%

*Por que voce deve investigar:*
Nem toda queda e genetica pura - muitas vezes tem fatores SOMADOS:
- Deficiencias nutricionais
- Desequilibrios hormonais
- Inflamacao do couro cabeludo
- Estresse

Tratando esses fatores, mesmo a genetica progride mais devagar.

Quer saber o que e possivel no SEU caso especificamente?`,
        argumentos: [
          'Genetica e tendencia, nao destino',
          'Podemos retardar e melhorar',
          'Muitas quedas tem fatores adicionais',
          'Avaliacao mostra o possivel'
        ],
        dados_suporte: 'Tratamento adequado pode retardar progressao genetica em 5-10 anos'
      },
      {
        titulo: 'E dolorido? Tenho medo de agulha/procedimento',
        nivel: 'comum',
        contexto: 'Medo de dor ou procedimentos invasivos',
        tecnica_call: {
          nome: 'Tecnica da Transparencia + Conforto',
          passos: [
            'Valide o medo - e normal',
            'Explique quais procedimentos sao usados',
            'Seja honesta sobre desconforto (se houver)',
            'Mostre opcoes nao-invasivas',
            'Ofereca conhecer o ambiente primeiro'
          ],
          gatilhos: ['Empatia', 'Transparencia', 'Opcoes']
        },
        script_whatsapp: `Entendo completamente, [Nome]! Medo de procedimentos e super normal.

*Deixa eu te explicar o que fazemos:*

*Procedimentos NAO-invasivos:*
- Laserterapia: luz, sem dor, sem agulhas
- LED: luz, relaxante, sem desconforto
- Protocolos topicos: aplicacao no couro cabeludo

*Procedimentos com agulhas (quando indicados):*
- Microagulhamento: agulhas micro, desconforto minimo
- Intradermoterapia: usamos anestesico topico antes

*Importante:*
Nenhum procedimento e obrigatorio.
Montamos o protocolo de acordo com sua tolerancia tambem!

Se voce tem muito medo, podemos comecar com tratamentos nao-invasivos e ver os resultados.

Quer conhecer a clinica antes para ficar mais tranquila?`,
        argumentos: [
          'Validar medo',
          'Opcoes nao-invasivas existem',
          'Usamos anestesico quando necessario',
          'Protocolo respeita tolerancia'
        ],
        dados_suporte: '90% dos pacientes relatam desconforto muito menor que o esperado'
      }
    ]
  },
  decisao: {
    categoria: 'Decisao e Autoridade',
    icone: 'user-tie',
    cor: '#ec4899',
    objecoes: [
      {
        titulo: 'Preciso falar com meu marido/esposa',
        nivel: 'comum',
        contexto: 'Paciente quer consultar parceiro(a)',
        tecnica_call: {
          nome: 'Tecnica da Inclusao',
          passos: [
            'Valide - decisao em casal e saudavel',
            'Ofereca material para compartilhar',
            'Pergunte principais preocupacoes do parceiro',
            'Sugira trazer na proxima conversa',
            'Agende retorno especifico'
          ],
          gatilhos: ['Respeito', 'Inclusao', 'Facilitacao']
        },
        script_whatsapp: `Claro, [Nome]! Dividir decisoes importantes com o parceiro(a) e muito saudavel.

*Posso te ajudar nessa conversa:*

1. Que tipo de informacao seu(sua) parceiro(a) gostaria de saber?
   - Valores e formas de pagamento?
   - Como funciona o tratamento?
   - Resultados esperados?

2. Posso enviar um resumo por escrito para voces lerem juntos

3. Se preferir, ele(a) pode vir junto na proxima conversa ou na avaliacao

*Pergunta importante:*
Qual e a principal preocupacao que voces provavelmente terao? Assim ja te preparo com as respostas.

Quando voces podem conversar? Posso te ligar depois para saber a decisao?`,
        argumentos: [
          'Validar decisao compartilhada',
          'Oferecer material de apoio',
          'Incluir parceiro na conversa',
          'Agendar follow-up especifico'
        ],
        dados_suporte: 'Decisoes compartilhadas tem maior aderencia ao tratamento'
      },
      {
        titulo: 'Vou pensar e te aviso',
        nivel: 'muito_comum',
        contexto: 'Paciente quer tempo para decidir',
        tecnica_call: {
          nome: 'Tecnica da Clarificacao',
          passos: [
            'Aceite - nao pressione',
            'Pergunte qual a principal duvida',
            'Ofereca esclarecer antes de sair',
            'Agende follow-up especifico',
            'Deixe porta aberta'
          ],
          gatilhos: ['Respeito', 'Clareza', 'Compromisso suave']
        },
        script_whatsapp: `Claro, [Nome]! E uma decisao importante e voce deve pensar com calma.

*Posso te ajudar a pensar melhor?*

Me conta: qual e a principal duvida ou preocupacao que voce quer avaliar?

- E sobre o investimento?
- Sobre o tempo de tratamento?
- Se vai funcionar?
- Outra coisa?

Se eu souber, posso te mandar informacoes especificas pra sua reflexao.

*Combinado?*
Posso te ligar na [quinta/sexta] para saber como esta sua reflexao? Sem pressao - so pra tirar duvidas que surgirem.

E se decidir que nao quer, sem problemas! Estarei aqui quando precisar.`,
        argumentos: [
          'Aceitar sem pressionar',
          'Descobrir duvida real',
          'Agendar follow-up',
          'Deixar porta aberta'
        ],
        dados_suporte: 'Descobrir objecao real aumenta conversao em 40%'
      }
    ]
  }
};

export const TECNICAS_GERAIS = [
  {
    nome: 'LAER - Ouvir, Reconhecer, Explorar, Responder',
    descricao: 'Framework classico para tratamento de objecoes',
    passos: [
      'Listen (Ouvir): Deixe o paciente falar sem interromper',
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
      'Felt: "Outros pacientes tambem sentiram isso..."',
      'Found: "O que eles descobriram foi que..."'
    ]
  },
  {
    nome: 'Validacao + Educacao',
    descricao: 'Especifica para saude - valida e ensina',
    passos: [
      'Valide a preocupacao do paciente',
      'Eduque com informacao clinica',
      'Mostre como isso se aplica ao caso dele',
      'Ofereca proximo passo claro'
    ]
  }
];

export const GATILHOS_MENTAIS = [
  {
    nome: 'Progressao Natural',
    uso: 'Queda capilar e progressiva - tratar cedo e melhor',
    exemplo: 'Foliculos que hoje estao adormecidos podem se fechar definitivamente.',
    cuidado: 'Use com cuidado - informar, nao pressionar'
  },
  {
    nome: 'Autoridade',
    uso: 'Biomedica especialista com 7 anos de experiencia',
    exemplo: 'Franciele ja tratou mais de 2.000 pacientes com 92% de satisfacao.',
    cuidado: 'Credencial importa em saude'
  },
  {
    nome: 'Prova Social',
    uso: 'Resultados de outros pacientes (com autorizacao)',
    exemplo: 'Posso te mostrar fotos de antes/depois de pacientes com caso similar.',
    cuidado: 'Sempre com autorizacao e expectativas realistas'
  },
  {
    nome: 'Diferenciacao',
    uso: 'Tratamos a causa, nao o sintoma',
    exemplo: 'Diferente de quem so passa Minoxidil, nos investigamos POR QUE voce esta perdendo cabelo.',
    cuidado: 'Nao desqualificar outros profissionais'
  },
  {
    nome: 'Honestidade',
    uso: 'Nem sempre prometemos resultados milagrosos',
    exemplo: 'Se apos a avaliacao eu ver que nao ha o que fazer, serei honesta contigo.',
    cuidado: 'Constroi confianca'
  },
  {
    nome: 'Reciprocidade',
    uso: 'Oferecer valor antes de pedir decisao',
    exemplo: 'Posso te enviar alguns conteudos sobre cuidados capilares enquanto decide.',
    cuidado: 'Valor genuino, nao manipulacao'
  }
];
