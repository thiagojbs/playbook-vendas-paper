// Perfis Clínicos - Cabelo & Saúde
// Baseado no Módulo 3 do Playbook 2025

export const perfisClinicos = {
  metadata: {
    titulo: "Perfis Clínicos",
    descricao: "Respostas especializadas por tipo de condição capilar",
    versao: "1.0.0",
    dataAtualizacao: "2026-01-27"
  },

  // ========================================
  // TABELA RESUMO
  // ========================================
  tabelaResumo: [
    {
      perfil: "Alopecia Androgenética",
      sintomasPrincipais: "Afinamento no topo e entradas",
      causa: "Miniaturização",
      tratamento: "Mapeamento hormonal + antiandrogênicos"
    },
    {
      perfil: "Eflúvio Telógeno",
      sintomasPrincipais: "Queda intensa pós-estresse ou evento agudo",
      causa: "Desregulação do ciclo capilar",
      tratamento: "Investigação do gatilho + suporte nutricional"
    },
    {
      perfil: "Foliculite",
      sintomasPrincipais: "Coceira, bolinhas, dor ao pentear",
      causa: "Inflamação bacteriana/fúngica",
      tratamento: "Protocolo anti-inflamatório e antibacteriano"
    },
    {
      perfil: "Psoríase Capilar",
      sintomasPrincipais: "Placas espessas, coceira, sensibilidade",
      causa: "Doença autoimune",
      tratamento: "Avaliação sistêmica + suporte imunológico"
    },
    {
      perfil: "Dermatite Seborreica",
      sintomasPrincipais: "Caspa, oleosidade, coceira recorrente",
      causa: "Disbiose fúngica",
      tratamento: "Regulação da microbiota + controle da oleosidade"
    },
    {
      perfil: "Quadro Misto",
      sintomasPrincipais: "Sensibilidade + inflamação + descamação",
      causa: "Múltiplos fatores combinados",
      tratamento: "Protocolo personalizado integrativo"
    }
  ],

  // ========================================
  // PERFIL 1: ALOPECIA ANDROGENÉTICA
  // ========================================
  alopeciaAndrogenetica: {
    id: "alopecia_androgenetica",
    nome: "Alopecia Androgenética",
    subtitulo: "Afinamento no topo, entradas nas laterais e afinamento progressivo",
    emoji: "📉",

    sintomas: [
      "Afinamento no topo, das entradas ou linha frontal",
      "Fios ralos e afinamento progressivo",
      "Miniaturização dos fios",
      "Couro cabeludo começando a aparecer",
      "Entradas ficando mais pronunciadas",
      "Volume reduzido na região superior da cabeça"
    ],

    explicacaoClinica: "A alopecia androgenética é uma condição progressiva que causa a miniaturização dos fios, ou seja, os fios vão afinando e cada vez perde volume e fica mais ralo. Quanto mais o tempo passa, mais os folículos se atrofiam, dificultando a reversão. É diferente de uma queda comum: é um processo contínuo e silencioso.",

    explicacaoParaPaciente: "Quando o cabelo começa a afinar no topo ou nas entradas e não volta mais como antes, geralmente estamos diante da alopecia androgenética. Isso acontece de forma progressiva, silenciosa, e quanto mais tempo passa sem tratamento, mais os folículos se atrofiam. A boa notícia é que com a avaliação clínica e o protocolo certo, conseguimos estancar essa miniaturização e recuperar o volume.",

    roteiroFalaCurto: "Quando o cabelo começa a afinar no topo ou nas entradas e não volta mais como antes, geralmente estamos diante da alopecia androgenética. Isso acontece de forma progressiva, silenciosa, e quanto mais tempo passa sem tratamento, mais os folículos se atrofiam. A boa notícia é que com a avaliação clínica e o protocolo certo, conseguimos estancar essa miniaturização e recuperar o volume. A consulta com a Dra. Franciele é essencial para mapear isso de forma personalizada.",

    scriptCompleto: `Se você está percebendo seu cabelo afinando, ficando mais ralo no topo da cabeça, nas entradas ou na linha frontal… e isso está acontecendo de forma progressiva, quase silenciosa, é bem provável que estejamos falando de alopecia androgenética.

Essa condição é diferente de uma queda de cabelo momentânea como o eflúvio telógeno, (ou seja, quando o cabelo cai em quantidade). Aqui, o que acontece é uma miniaturização progressiva dos fios, ou seja, o fio vai afinando, encurtando, perdendo força — até que, em algumas regiões, ele simplesmente para de nascer.

E o ponto mais importante: isso é um processo contínuo, que não vai melhorar sozinho com o tempo. Ao contrário: quanto mais tempo passa sem tratamento adequado, mais os folículos vão se atrofiando — e chega um ponto onde a reversão se torna muito mais difícil ou até mesmo impossível.

O grande erro é achar que shampoo antiqueda vai resolver, ou esperar demais enquanto o couro cabeludo já está começando a aparecer.

E aí que observamos:
• A autoestima vai sendo corroída aos poucos
• Você para de usar o cabelo como quer
• Evita fotos, prende mais o cabelo, e sente que está perdendo o controle da sua imagem
• E pior: começa a gastar tempo e dinheiro com produtos e tratamentos que não atacam a causa real

Aqui na clínica, nós fazemos um mapeamento completo: avaliamos o couro cabeludo com tricoscopia, analisamos seus exames de sangue, investigamos possíveis alterações hormonais, nutricionais e inflamatórias — e com base nisso, montamos um plano de ação personalizado.

Porque cada paciente é único. E a sua alopecia tem uma causa por trás: pode ser uma sensibilidade genética ao hormônio DHT, pode ser um desequilíbrio androgênico, pode estar associada à resistência insulínica, ao estresse ou até mesmo à inflamação crônica.

O ponto é: quanto mais cedo você trata, mais fio você salva. Quanto mais espera, mais fio você perde.

Por isso, se você quer entender o que realmente está acontecendo com o seu cabelo — e não maquiar com fórmulas genéricas como minoxidil e finasterida — é preciso agendarmos a sua consulta. A hora de agir é agora, antes que essa perda se torne irreversível.`,

    fechamento: "Faz sentido? Fazendo sentido, vou te passar aqui os valores da consulta [nome do paciente].",

    palavrasChave: [
      "afinamento", "topo", "entradas", "laterais", "ralo",
      "miniaturização", "progressivo", "calvície",
      "couro cabeludo aparecendo", "linha frontal",
      "androgenética", "genético", "hereditário"
    ],

    objetivo: "Validar o problema capilar + Explicar o tratamento contínuo + Urgência para ação"
  },

  // ========================================
  // PERFIL 2: EFLÚVIO TELÓGENO
  // ========================================
  efluvioTelogeno: {
    id: "efluvio_telogeno",
    nome: "Eflúvio Telógeno",
    subtitulo: "Queda intensa, pós-cirurgia, pós-COVID, estresse",
    emoji: "💥",

    sintomas: [
      "Queda intensa e repentina",
      "Geralmente após estresse, cirurgia ou infecção",
      "Volume reduzido rapidamente",
      "Couro cabeludo mais exposto",
      "Queda durante banho, ao pentear ou ao acordar",
      "Muito cabelo no ralo ou travesseiro"
    ],

    explicacaoClinica: "É uma queda que ocorre quando o corpo antecipa a fase de queda do fio, como resposta a um gatilho de estresse físico ou emocional. O cabelo entra em 'modo de alerta', e fios que cairiam em 6 meses caem de uma vez agora.",

    explicacaoParaPaciente: "Essa queda mais intensa e repentina costuma acontecer após estresse, infecções, cirurgias ou desequilíbrios hormonais. É como se o corpo desligasse os fios antes da hora por entender que precisa economizar energia. A consulta serve justamente para descobrir qual foi esse gatilho e evitar que o problema se prolongue. Quando tratado cedo, o eflúvio (queda intensa) responde muito bem!",

    roteiroFalaAcolhimento: "Sim, muitas mulheres percebem a queda nas laterais e sentem o cabelo ficando mais ralo — especialmente nessa fase onde o corpo muda muito, seja por estresse, alterações hormonais ou mesmo alimentação. Mas isso tem solução sim, viu? A dra. Franciele é especialista em saúde capilar feminina e, na consulta, ela vai te ajudar a entender o porquê disso estar acontecendo e o que dá pra fazer pra fortalecer o fio e recuperar o volume.",

    roteiroFalaTecnico: "Essa região das laterais costuma ser muito sensível em mulheres, principalmente quando há afinamento e queda ao mesmo tempo. Isso pode estar relacionado a questões hormonais ou até inflamatórias no couro cabeludo — mas o bom é que, quando a gente identifica cedo, o tratamento responde muito melhor. A consulta com a Fran é justamente pra isso: investigar a fundo e montar um plano personalizado pra cuidar do couro cabeludo e recuperar o volume.",

    scriptCompleto: `Esse tipo de queda acontece quando o seu corpo antecipa o ciclo natural do cabelo. Explicando de forma simples: todo fio de cabelo nasce, cresce, e um dia ele vai cair — isso é natural. Mas quando existe um gatilho — seja emocional, metabólico, nutricional ou até mesmo hormonal — o corpo entende que precisa 'economizar energia'. E o cabelo é um dos primeiros a pagar essa conta.

O que isso significa? Que fios que cairiam naturalmente daqui a 6 meses estão caindo todos de uma vez agora. É como se o corpo estivesse em modo de alerta, priorizando órgãos vitais, e o cabelo — por não ser essencial à sobrevivência — entra em desligamento precoce.

O resultado? Volume reduzido, couro cabeludo mais exposto, queda intensa durante o banho, ao pentear ou até ao acordar. E isso abala a autoestima, a imagem no espelho, e começa a gerar medo não é mesmo?:

'Será que vou ficar careca?'
'Será que tem algo grave comigo?'
'Já tentei de tudo e nada resolve!'

Mas aqui está a boa notícia: o eflúvio telógeno tem solução. O que precisa ser feito é entender qual foi o gatilho que causou essa antecipação no ciclo dos fios. Isso pode ser:
• Deficiência de nutrientes (como ferro, zinco, vitaminas do complexo B)
• Pós-cirurgias ou infecções
• Estresse intenso ou traumas emocionais
• Dietas restritivas
• Alterações hormonais (como tireoide ou ovários policísticos)

E é exatamente isso que investigamos na consulta. Não olhamos só o couro cabeludo, mas todo o seu contexto: corpo, mente, exames de sangue e hábitos de vida. Nosso trabalho é mostrar pra você onde está a raiz do problema — e montar um plano de ação de verdade.

Porque tratar o cabelo sem tratar o corpo é só maquiar o problema.

Se você está pronta para entender o que está por trás dessa queda intensa e retomar o controle da sua saúde capilar, o primeiro passo é agendar sua consulta. E quanto antes começarmos, menor o impacto no volume e maior a chance de recuperação total dos fios.`,

    fechamento: "Faz sentido? Fazendo sentido, vou te passar aqui os valores da consulta [nome do paciente].",

    palavrasChave: [
      "queda intensa", "queda repentina", "pós covid",
      "pós cirurgia", "estresse", "eflúvio", "caindo muito",
      "banho", "travesseiro", "volume reduzido", "ralo",
      "pós parto", "após doença"
    ],

    dicasTom: [
      "Evite palavras como 'calvície' de cara → use 'afinamento' ou 'sensibilidade capilar'",
      "Sempre use exemplos de outras pacientes com bons resultados",
      "Fale com ela, não sobre ela: 'Você não está sozinha. A gente recebe muitas mulheres com esse mesmo padrão'"
    ],

    objetivo: "Acolher + Explicar o gatilho + Mostrar reversibilidade"
  },

  // ========================================
  // PERFIL 3: FOLICULITE
  // ========================================
  foliculite: {
    id: "foliculite",
    nome: "Foliculite / Couro cabeludo inflamado",
    subtitulo: "Bolinhas, coceira, oleosidade em excesso e dor ao toque",
    emoji: "🔴",

    sintomas: [
      "Bolinhas (espinhas) no couro cabeludo",
      "Coceira persistente",
      "Oleosidade em excesso",
      "Dor ao toque",
      "Sensação de peso nos fios",
      "Casquinhas que voltam sempre",
      "Vermelhidão localizada"
    ],

    explicacaoClinica: "A foliculite é uma inflamação nos folículos causada por oleosidade excessiva, proliferação fúngica ou bacteriana. Pode levar à queda, à dor e até à atrofia do folículo se não for tratada corretamente.",

    explicacaoParaPaciente: "Quando sentimos bolinhas, coceira ou oleosidade em excesso, geralmente há uma inflamação chamada foliculite. Se não tratada, essa inflamação danifica o folículo e dificulta o crescimento capilar. Na consulta, usamos lupa e exames para entender se o couro cabeludo está inflamado e iniciar um plano anti-inflamatório. Isso reduz a oleosidade, recupera o folículo e melhora o crescimento dos fios.",

    roteiroFalaCurto: "[Nome], quando aparecem essas inflamações ou bolinhas no couro cabeludo, isso pode ser um quadro de foliculite — algo que costuma piorar com o tempo se não for tratado com foco. Na consulta, a Dra. Fran vai examinar esses pontos com lupa clínica e vai investigar se há infecção, obstrução ou alteração inflamatória. A boa notícia é que, com o protocolo certo, a melhora costuma ser rápida e o couro cabeludo volta ao equilíbrio.",

    scriptCompleto: `Se você sente que seu couro cabeludo está sempre oleoso, com sensação de peso, coceira e até algumas 'espinhas' doloridas ou casquinhas que voltam sempre, isso não é normal.

Esses sintomas geralmente indicam uma inflamação nos folículos pilosos, o que chamamos de foliculite. A oleosidade em excesso favorece a proliferação de bactérias e fungos — como a Malassezia — e isso gera um ambiente propício para inflamações.

E sabe o que é pior? Esse processo inflamatório, se não tratado, danifica o folículo. E o resultado é: fios mais fracos, afinamento progressivo e, sim, queda capilar.

Além disso, a oleosidade excessiva pode ser reflexo de alterações hormonais, alimentação inflamatória, disbiose intestinal, ou até um desbalanço nos produtos que você usa.

Por isso, na consulta, vamos entender o que está por trás desse padrão. Usamos equipamentos para analisar o couro cabeludo em tempo real, e se for necessário, solicitamos exames de sangue para entender como está sua saúde por dentro.

Porque tratar só com shampoo é paliativo. O segredo está em entender e resolver a raiz da inflamação. Se você sente esses sintomas, o ideal é agir agora — antes que o dano nos folículos seja mais profundo e a recuperação dos fios se torne mais difícil.`,

    fechamento: "Faz sentido? Fazendo sentido, vou te passar aqui os valores da consulta [nome do paciente].",

    palavrasChave: [
      "bolinhas", "espinhas", "foliculite", "coceira",
      "oleoso", "oleosidade", "peso no cabelo",
      "dor ao toque", "inflamado", "casquinhas",
      "vermelho", "pus", "irritado"
    ],

    objetivo: "Gerar consciência do risco + Explicar o processo inflamatório + Apresentar solução"
  },

  // ========================================
  // PERFIL 4: PSORÍASE
  // ========================================
  psoriase: {
    id: "psoriase",
    nome: "Psoríase / Doença autoimune",
    subtitulo: "Placas espessas, coceira intensa, casquinhas, sensibilidade ou dor",
    emoji: "🔸",

    sintomas: [
      "Placas espessas no couro cabeludo",
      "Coceira intensa",
      "Casquinhas/descamações esbranquiçadas",
      "Sensibilidade ou dor no couro cabeludo",
      "Placas vermelhas",
      "Descamação em lâminas"
    ],

    explicacaoClinica: "A psoríase é uma doença autoimune que afeta a renovação da pele e pode causar descamação intensa e inflamação. Está associada a fatores internos como estresse, inflamação sistêmica, intestino e imunidade.",

    explicacaoParaPaciente: "Essas placas que coçam, descamam e incomodam podem ser psoríase – uma condição autoimune que acelera a renovação da pele. Muitas vezes ela está ligada a estresse, intestino, alimentação e inflamação sistêmica. A Dra. Fran investiga isso por dentro e por fora: desde o couro cabeludo até seus exames clínicos. E com o plano certo, conseguimos controlar as crises e reduzir os impactos emocionais e estéticos.",

    roteiroFalaCurto: "[Nome], sintomas como placas, coceira persistente e descamação podem indicar psoríase no couro cabeludo, que é uma alteração inflamatória crônica — mas que pode ser controlada com acompanhamento certo. A Dra. Fran já acompanha vários pacientes com esse quadro, e na consulta ela vai entender o estágio da inflamação e montar uma rotina de tratamento que combine cuidado local e suporte interno.",

    scriptCompleto: `Se você tem placas espessas, vermelhas, com descamações esbranquiçadas no couro cabeludo que coçam ou até machucam, isso pode ser um quadro de psoríase capilar.

A psoríase é uma condição autoimune que acelera a renovação da pele — como se o corpo estivesse em modo acelerado, formando 'casquinhas' muito rápido, antes que a pele consiga se renovar naturalmente.

Mas aqui vai o ponto que quase ninguém te conta: a psoríase é um reflexo de algo maior. Ela pode estar ligada ao intestino, ao sistema imunológico, ao estresse crônico, ao sono irregular, à dieta rica em ultraprocessados e, principalmente, à inflamação sistêmica.

Ou seja, usar pomadas ou shampoos por conta própria pode até aliviar momentaneamente, mas não vai resolver o processo inflamatório que vem de dentro pra fora.

Na nossa consulta, investigamos o couro cabeludo por meio de exames visuais detalhados e também avaliamos seu metabolismo, sua imunidade, seus níveis de vitaminas e minerais. Porque quando tratamos a origem da inflamação, a melhora da pele é consequência.

E quanto antes você age, mais controle a gente tem sobre as crises. A pior coisa é deixar evoluir ao ponto de afetar sua autoestima e até seus fios.`,

    fechamento: "Faz sentido? Fazendo sentido, vou te passar aqui os valores da consulta [nome do paciente].",

    palavrasChave: [
      "placas", "psoríase", "descamação", "casquinhas",
      "coceira intensa", "vermelha", "espessa",
      "autoimune", "machuca", "sangra", "crônica"
    ],

    objetivo: "Validar sofrimento + Mostrar que é reflexo interno + Propor solução integrativa"
  },

  // ========================================
  // PERFIL 5: DERMATITE SEBORREICA
  // ========================================
  dermatiteSeborreica: {
    id: "dermatite_seborreica",
    nome: "Dermatite Seborreica",
    subtitulo: "Caspa, coceira e oleosidade crônica",
    emoji: "❄️",

    sintomas: [
      "Caspa crônica",
      "Coceira persistente",
      "Oleosidade excessiva",
      "Couro cabeludo com odor",
      "Vermelhidão",
      "Sensação de peso nos fios",
      "Descamação intensa"
    ],

    explicacaoClinica: "A dermatite seborreica é uma inflamação associada ao excesso de oleosidade e à proliferação de fungos. Afeta a microbiota do couro cabeludo e compromete a saúde dos fios.",

    explicacaoParaPaciente: "Quando o couro cabeludo está sempre oleoso, com caspa intensa, coceira e aquela sensação de 'peso' nos fios, geralmente estamos diante da dermatite seborreica. Esse quadro inflamatório acontece quando há um desequilíbrio da flora do couro cabeludo, favorecendo a ação de fungos como a Malassezia. Isso não só gera descamação e desconforto, como também prejudica o ambiente ideal para os fios crescerem com força.",

    roteiroFalaCompleto: "Na consulta com a Dra. Franciele, usamos tricoscopia para avaliar o grau dessa inflamação e indicamos exames clínicos que podem identificar causas internas como disbiose intestinal, alterações hormonais ou dietas inflamatórias. O tratamento personalizado ajuda a regular a oleosidade, controlar a caspa e restaurar a saúde do couro cabeludo — criando um solo fértil para o cabelo voltar a crescer com qualidade.",

    roteiroFalaCurto: "[Nome do lead], essa combinação de caspa mais intensa, coceira e oleosidade é bem comum em casos de dermatite seborreica — que muita gente chama de 'caspa crônica'. O ideal é tratar isso com uma abordagem clínica, porque o uso de produtos errados ou só shampoos pode piorar. Na consulta, a Dra. Fran faz exames no couro cabeludo e monta um protocolo que trata a causa, não só os sintomas. É um cuidado que faz diferença no longo prazo.",

    scriptCompleto: `Sabe aquela caspa intensa, que descama e coça, às vezes deixando o couro cabeludo sensível ou vermelho? Isso não é só caspa comum — pode ser dermatite seborreica.

Essa condição está ligada a um desequilíbrio na microbiota do couro cabeludo, principalmente um aumento do fungo Malassezia, que se alimenta da oleosidade da pele e gera uma reação inflamatória.

Mas atenção: isso é um sintoma, não a causa. Por que esse fungo cresceu? O que está desregulando sua barreira de proteção? Pode ser desde desequilíbrios hormonais, alterações intestinais, estresse crônico ou carência de nutrientes essenciais como zinco, selênio e vitaminas do complexo B.

O que tratamos aqui vai além do que um shampoo anticaspa pode fazer. Na consulta, analisamos o couro cabeludo com tecnologia de imagem e, se necessário, avaliamos sua saúde de forma integrada: intestino, imunidade, estresse, alimentação e até o sono.

Porque uma pele que está inflamada e desequilibrada não consegue sustentar um cabelo forte e saudável. O resultado? Coceira, desconforto e queda capilar cada vez mais acentuada.

Se você quer parar de viver de shampoos temporários e realmente entender o que está acontecendo com seu couro cabeludo, essa consulta vai mudar a forma como você enxerga o seu cuidado capilar.`,

    fechamento: "Faz sentido? Fazendo sentido, vou te passar aqui os valores da consulta [nome do paciente].",

    palavrasChave: [
      "caspa", "dermatite", "seborreica", "oleoso",
      "coceira", "descamação", "odor", "vermelhidão",
      "peso", "malassezia", "crônica", "sempre volta"
    ],

    objetivo: "Aumentar consciência do quadro inflamatório + Mostrar impacto no crescimento capilar + Oferecer solução técnica e acessível"
  },

  // ========================================
  // PERFIL 6: QUADRO MISTO
  // ========================================
  quadroMisto: {
    id: "quadro_misto",
    nome: "Quadro Misto",
    subtitulo: "Couro cabeludo sensível e inflamado com descamação",
    emoji: "🔄",

    sintomas: [
      "Coceira",
      "Ardência",
      "Sensibilidade ao toque",
      "Caspa recorrente",
      "Bolinhas ou dor ao pentear",
      "Descamação visível",
      "Não tolera determinados produtos",
      "Múltiplos sintomas combinados"
    ],

    explicacaoClinica: "Quando há sensibilidade e inflamação ao mesmo tempo, o couro cabeludo está reagindo a algum fator interno ou externo. Pode ser microbiota alterada, uso de produtos inadequados, disbiose intestinal ou até inflamação sistêmica.",

    explicacaoParaPaciente: "Quando o couro cabeludo está sensível, com coceira, ardência, bolinhas ou até descamação visível, é sinal de que há um processo inflamatório ativo. Esse tipo de quadro pode ser causado por um acúmulo de oleosidade, por um desequilíbrio na flora do couro cabeludo ou até por um reflexo de desbalanços internos — como intestino desregulado, estresse crônico ou até alimentação inflamatória.",

    roteiroFalaCompleto: `Muitas vezes, o paciente sente dor ao pentear, não tolera determinados produtos, ou nota que a caspa volta mesmo após usar shampoos específicos. Isso mostra que o tratamento precisa ir além da superfície.

Na consulta com a Dra. Franciele, é feita uma tricoscopia detalhada para analisar o couro cabeludo em tempo real. Também avaliamos, se necessário, exames de sangue para entender se existe inflamação sistêmica, carência de nutrientes ou desequilíbrio hormonal por trás disso tudo.

Com um plano certo — que combina cuidado tópico, ajustes internos e acompanhamento clínico — conseguimos reduzir a inflamação, acalmar a pele e estimular o crescimento saudável dos fios. Seu couro cabeludo precisa voltar a ser um ambiente propício para o fio crescer forte e livre.`,

    roteiroFalaCurto: "[Nome], além disso, quando o couro cabeludo está sensível, com coceira, descamação ou ardência, pode ser um sinal de que há inflamação ativa — e isso impacta diretamente na saúde do fio e até na absorção de nutrientes. A Dra. Fran investiga esses sinais com uma avaliação clínica completa no consultório, com exames e análise dos seus sintomas.",

    scriptCompleto: `E o que muita gente não sabe é que essa inflamação não aparece do nada. Ela pode estar associada a:

• Um desequilíbrio na microbiota do couro cabeludo (e isso gera uma proliferação de fungos como Malassezia)
• Inflamações silenciosas causadas por alimentação, estresse ou disbiose intestinal
• Excesso de química, calor ou uso de produtos com pH inadequado
• Ou ainda doenças autoimunes, como a psoríase

Ou seja: o couro cabeludo está reagindo a algo que precisa ser investigado.

É por isso que aqui na clínica a gente não 'passa um shampoo' e manda embora. A gente realiza uma análise completa com tricoscopia digital, que amplia a imagem em até 50x e mostra com precisão o grau da inflamação, o tipo de descamação, se há presença de fungos, e como está o estado dos seus folículos capilares.

Além disso, avaliamos biomarcadores no sangue, como zinco, selênio, vitamina D, homocisteína e marcadores inflamatórios — porque a sensibilidade do couro cabeludo pode ser só a ponta do iceberg.

E o pior erro que a gente vê acontecer é: a pessoa passar anos tentando controlar essa inflamação com pomadas ou shampoos que apenas abafam os sintomas… enquanto a inflamação vai crescendo por dentro e o couro cabeludo vai ficando cada vez mais hostil ao crescimento capilar.

Por isso, [NOME], eu te pergunto: você quer só aliviar momentaneamente… ou entender a causa e resolver de verdade?

Se fizer sentido pra você, a consulta aqui inclui todos esses exames do couro cabeludo no dia, análise clínica completa, e ainda um plano de ação totalmente personalizado — com fórmulas manipuladas sob medida, ajustadas ao longo do tempo conforme seu resultado. É um tratamento inteligente, individual e com acompanhamento.

Faz sentido a gente investigar juntos o que está por trás dessa sensibilidade toda?`,

    fechamento: "Faz sentido? Fazendo sentido, vou te passar aqui os valores da consulta [nome do paciente].",

    palavrasChave: [
      "sensível", "ardência", "coceira", "dor ao pentear",
      "não tolera produtos", "descamação", "bolinhas",
      "inflamado", "misto", "volta sempre", "múltiplos sintomas"
    ],

    causasPossiveis: [
      "Desequilíbrio na microbiota do couro cabeludo",
      "Proliferação de fungos (Malassezia)",
      "Inflamações causadas por alimentação, estresse ou disbiose intestinal",
      "Excesso de química, calor ou produtos com pH inadequado",
      "Doenças autoimunes como psoríase"
    ],

    objetivo: "Reconhecer desconforto + Explicar inflamação ativa + Propor solução clínica completa"
  },

  // ========================================
  // SISTEMA DE BUSCA E FILTROS
  // ========================================
  buscarPorSintoma: function(sintoma) {
    const termo = sintoma.toLowerCase();
    const resultados = [];

    // Buscar em todos os perfis
    const perfis = [
      this.alopeciaAndrogenetica,
      this.efluvioTelogeno,
      this.foliculite,
      this.psoriase,
      this.dermatiteSeborreica,
      this.quadroMisto
    ];

    perfis.forEach(perfil => {
      // Buscar em sintomas
      const sintomasMatch = perfil.sintomas.some(s =>
        s.toLowerCase().includes(termo)
      );

      // Buscar em palavras-chave
      const palavrasMatch = perfil.palavrasChave.some(p =>
        p.toLowerCase().includes(termo)
      );

      if (sintomasMatch || palavrasMatch) {
        resultados.push({
          perfil: perfil.nome,
          id: perfil.id,
          relevancia: sintomasMatch ? 'alta' : 'média'
        });
      }
    });

    return resultados;
  },

  buscarPorPalavraChave: function(palavraChave) {
    return this.buscarPorSintoma(palavraChave);
  }
};

export default perfisClinicos;
