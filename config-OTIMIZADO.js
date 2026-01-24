// Configuracao do tenant Cabelo e Saude - Clinica de Tricologia
// Este arquivo define as configuracoes especificas deste tenant
// Ultima atualizacao: 2026-01-23

export const TENANT_CONFIG = {
  // Identificacao
  id: 'cabeloesaude',
  nome: 'Cabelo & Saude',
  nomeCompleto: 'Clinica de Tricologia Cabelo & Saude',
  dominio: 'vendas.cabeloesaude.com.br',

  // Aparencia e Branding (baseado na logo verde/teal)
  tema: {
    corPrimaria: '#1a5f52',      // Verde escuro principal (do logo)
    corSecundaria: '#2d8a7a',    // Verde medio/teal
    corAcento: '#4fb3a3',        // Verde claro para destaques
    corTexto: '#1a3a35',         // Verde muito escuro para texto
    corFundo: '#f0f7f6',         // Verde muito claro para fundo
    gradiente: 'linear-gradient(135deg, #1a5f52 0%, #2d8a7a 100%)',
    logo: '/assets/cabeloesaude-logo.png',
    favicon: '/assets/cabeloesaude-favicon.ico'
  },

  // Informacoes da Empresa
  empresa: {
    razaoSocial: 'Clinica de Tricologia Cabelo e Saude',
    cnpj: '', // A ser preenchido
    fundadora: 'Dra. Franciele Madeira',
    cargo: 'Biomedica e Tricologista',
    anosExperiencia: '7+',
    pacientesAtendidos: '2.000+',
    metodo: 'Método Manifesto',
    reconhecimento: 'Clínica Mais Recomendada de São José e Florianópolis',
    endereco: {
      rua: 'Avenida Marechal Castelo Branco',
      numero: '65',
      complemento: 'Sala 109 - Bloco B',
      bairro: 'Campinas',
      cidade: 'São José',
      estado: 'SC',
      cep: '',
      completo: 'Av. Marechal Castelo Branco, 65 - Sala 109, Bloco B, Campinas, São José/SC'
    },
    site: 'https://www.cabeloesaude.com.br/',
    instagram: '@cabeloesaude',
    suporte: {
      email: 'contato@cabeloesaude.com.br',
      whatsapp: '+5548999548407', // Do site
      telefone: '(48) 99954-8407'
    }
  },

  // Segmento e Especializacao
  segmento: {
    area: 'Saude Capilar',
    especialidade: 'Tricologia',
    servicos: [
      'Avaliacao Tricologica',
      'Tratamento de Queda Capilar',
      'Tratamento de Alopecia',
      'Tratamento de Calvicie',
      'Terapia Capilar',
      'Microagulhamento Capilar',
      'Laserterapia Capilar',
      'Intradermoterapia',
      'Acompanhamento Nutricional Capilar'
    ],
    publicoAlvo: [
      'Homens com calvicie inicial/intermediaria',
      'Mulheres com queda capilar',
      'Pessoas com alopecia',
      'Pacientes pos-tratamentos medicos',
      'Pessoas insatisfeitas com tratamentos convencionais'
    ],
    diferenciais: [
      'Tratamos a RAIZ, não apenas os sintomas',
      'Método Manifesto - 2.000+ pacientes transformados',
      'Dra. Franciele Madeira - Biomédica Tricologista com 7+ anos',
      'Clínica Mais Recomendada de São José e Florianópolis',
      'Sem paliativos - investigação completa da causa',
      'Tricoscopia digital - você vê seus folículos',
      'Protocolos 100% personalizados',
      'É ciência aplicada. É saúde restaurada.',
      'Não vendemos esperança vazia - tratamos de verdade'
    ],
    manifesto: [
      'O seu cabelo não caiu porque "é normal"',
      'Pare de culpar a genética',
      'Vitaminas de farmácia, finasterida e minoxidil não resolvem a raiz do problema',
      'Chega de "pacotes de tratamentos" prontos de Instagram',
      'Nós não vendemos esperança vazia. Nós tratamos a raiz.'
    ],
    tagline: 'QUEM SENTE, ENTENDE. QUEM ENTENDE, AGE.',
    posicionamento: 'Somos o lado oposto da medicina rasa. Somos o Manifesto.'
  },

  // Integracao CRM
  crm: {
    provider: 'wtschat',
    baseUrl: 'https://api.v2.wtschat.com',
    // API key via environment variable: CABELOESAUDE_CRM_KEY
    endpoints: {
      contacts: '/crm/contacts',
      deals: '/crm/deals',
      funnels: '/crm/funnels'
    }
  },

  // Configuracoes RAG
  rag: {
    indexName: 'cabeloesaude-playbook',
    topK: 5,
    minScore: 0.7,
    maxChunkSize: 1500
  },

  // Modulos habilitados
  modulos: {
    home: true,
    playbook: true,
    calculadora: true,
    clientes: true,
    propostas: true,
    contratos: true,
    desempenho: false, // Desabilitado conforme solicitado
    objecoes: true,
    scripts: true,
    agentes: false // Nao aplicavel para clinica
  },

  // Links uteis
  links: {
    site: 'https://www.cabeloesaude.com.br/',
    instagram: 'https://www.instagram.com/cabeloesaude/',
    whatsapp: 'https://api.whatsapp.com/send?phone=5548999548407',
    agendamento: 'https://api.whatsapp.com/send?phone=5548999548407&text=Olá!%20Gostaria%20de%20agendar%20uma%20avaliação%20tricológica',
    avaliacaoOnline: '' // Link para avaliacao online se houver
  },

  // Metadados para SEO
  seo: {
    titulo: 'Playbook de Vendas - Cabelo & Saude',
    descricao: 'Plataforma de vendas para Clinica de Tricologia com playbook, calculadora e gestao de pacientes',
    keywords: ['tricologia', 'queda capilar', 'alopecia', 'calvicie', 'tratamento capilar', 'saude do cabelo']
  }
};

// Exporta funcao helper para obter configuracao
export function getConfig(key) {
  const keys = key.split('.');
  let value = TENANT_CONFIG;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }

  return value;
}

// Exporta tenant ID para uso rapido
export const TENANT_ID = TENANT_CONFIG.id;
