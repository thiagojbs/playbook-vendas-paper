// Dados Expandidos do Playbook de Vendas Paper Vines
// Inclui politicas do Meta, precos de mensagens e guias de educacao do cliente

export const POLITICAS_WHATSAPP = {
  titulo: 'Politicas do WhatsApp Business',
  link: 'https://business.whatsapp.com/policy',
  resumo: 'Regras essenciais para uso da API Oficial do WhatsApp',
  secoes: [
    {
      titulo: 'Experiencia de Qualidade',
      icone: 'star',
      itens: [
        'Mantenha perfil comercial atualizado com dados de contato',
        'Nao se passe por outra empresa ou engane clientes',
        'So contate pessoas que deram consentimento explicito',
        'Respeite solicitacoes de bloqueio e descontinuacao'
      ]
    },
    {
      titulo: 'Modelos de Mensagem',
      icone: 'comment-alt',
      itens: [
        'Inicie conversas apenas com modelos aprovados',
        'Responda em ate 24h sem modelo (janela de atendimento)',
        'Fora da janela de 24h, use modelos aprovados',
        'Ofereca opcoes de encaminhamento para humano'
      ]
    },
    {
      titulo: 'Protecao de Dados',
      icone: 'shield-alt',
      itens: [
        'Mantenha politica de privacidade publicada',
        'Nao solicite dados sensiveis (cartao, documentos)',
        'Nao compartilhe dados de conversas com terceiros',
        'Cumpra todas as leis de protecao de dados'
      ]
    },
    {
      titulo: 'Conteudo Proibido',
      icone: 'ban',
      itens: [
        'Armas de fogo, drogas, alcool (exceto paises permitidos)',
        'Jogos de azar (exceto com autorizacao especifica)',
        'Produtos adultos e servicos de encontros',
        'Conteudo discriminatorio ou ofensivo'
      ]
    }
  ],
  consequencias: [
    'Conta suspensa ou encerrada por violacoes',
    'Limitacao do numero de mensagens enviadas',
    'Proibicao permanente de usar servicos WhatsApp',
    'Analise humana e automatica de denuncias'
  ]
};

export const POLITICAS_META_ANUNCIOS = {
  titulo: 'Politicas de Anuncios do Meta',
  link: 'https://transparency.meta.com/policies/ad-standards/objectionable-content/adult-nudity-and-sexual-activity/',
  resumo: 'Regras para conteudo em anuncios no Facebook e Instagram',
  proibido: [
    {
      item: 'Nudez ou quase nudez',
      descricao: 'Mesmo coberta por sobreposicao digital'
    },
    {
      item: 'Atividades sexuais',
      descricao: 'Simuladas, sugestivas ou explicitas'
    },
    {
      item: 'Gestos sugestivos',
      descricao: 'Simbolizando genitalia, masturbacao ou sexo'
    },
    {
      item: 'Conteudo pornografico',
      descricao: 'Logos, screenshots ou clips de sites adultos'
    },
    {
      item: 'Audio sexual',
      descricao: 'Sons de atividade sexual no anuncio'
    }
  ],
  restrito_18: [
    'Mamilos femininos em contexto medico/amamentacao',
    'Imagens focadas em virilha, nadegas ou seios',
    'Poses sugestivas ou roupas reveladoras',
    'Pessoas tocando partes do corpo sexualizadas'
  ],
  dica_vendedor: 'Oriente o cliente que anuncios com conteudo sensual serao reprovados pelo Meta. Isso afeta clinicas de estetica, moda intima e segmentos similares.'
};

export const PRECOS_WHATSAPP = {
  titulo: 'Precos das Mensagens WhatsApp',
  link: 'https://business.whatsapp.com/products/platform-pricing',
  moeda: 'USD',
  pais: 'Brasil',
  atualizacao: 'Janeiro 2025',
  info_importante: 'A partir de 1 de julho de 2025, havera novos precos por mensagem e limites para utilidade e autenticacao.',
  categorias: [
    {
      nome: 'Marketing',
      valor: 0.0625,
      cor: '#8b5cf6',
      icone: 'bullhorn',
      descricao: 'Promocoes, ofertas, atualizacoes de produtos',
      exemplos: ['Cupons de desconto', 'Lancamentos', 'Campanhas promocionais']
    },
    {
      nome: 'Utilidade',
      valor: 0.0068,
      cor: '#10b981',
      icone: 'bell',
      descricao: 'Atualizacoes de pedidos, alertas, lembretes',
      exemplos: ['Confirmacao de pedido', 'Rastreamento', 'Agendamento']
    },
    {
      nome: 'Autenticacao',
      valor: 0.0068,
      cor: '#3b82f6',
      icone: 'key',
      descricao: 'Codigos de verificacao e seguranca',
      exemplos: ['Codigo OTP', 'Verificacao de conta', 'Login seguro']
    },
    {
      nome: 'Servico',
      valor: 0.0068,
      cor: '#f97316',
      icone: 'headset',
      descricao: 'Atendimento iniciado pelo cliente',
      exemplos: ['Suporte', 'Duvidas', 'Resolucao de problemas']
    }
  ],
  beneficios: [
    {
      titulo: '1.000 conversas gratis/mes',
      descricao: 'Cada conta recebe mil conversas de servico gratuitas mensalmente'
    },
    {
      titulo: 'Pontos de entrada gratuitos',
      descricao: 'Conversas iniciadas via anuncio Click-to-WhatsApp sao gratuitas por 72h'
    },
    {
      titulo: 'Cobranca por conversa',
      descricao: 'Uma conversa = 24h de mensagens ilimitadas naquela categoria'
    }
  ]
};

export const REQUISITOS_API_EXPANDIDOS = {
  titulo: 'Requisitos para API Oficial do Meta',
  itens: [
    {
      requisito: 'Numero WhatsApp Business',
      icone: 'phone',
      cor: '#25D366',
      descricao: 'Numero deve ser Business para usar no celular e plataforma simultaneamente.',
      dica: 'Se o cliente usar numero pessoal, perdera acesso no celular.',
      obrigatorio: true
    },
    {
      requisito: 'Gerenciador de Negocios (BM)',
      icone: 'briefcase',
      cor: '#1877F2',
      descricao: 'Cliente deve dar acesso de controle total para thiago@papervines.digital',
      dica: 'Envie o tutorial: https://www.youtube.com/watch?v=C15vD7rvE28',
      obrigatorio: true
    },
    {
      requisito: 'Cartao Internacional',
      icone: 'credit-card',
      cor: '#f97316',
      descricao: 'Para pagamentos da API do WhatsApp ao Meta. Preferencialmente fisico.',
      dica: 'Cartao virtual pode ser bloqueado. Recomende Nubank ou Itau fisico.',
      obrigatorio: true
    },
    {
      requisito: 'Site com CNPJ',
      icone: 'globe',
      cor: '#8b5cf6',
      descricao: 'Site da empresa com dados do CNPJ no rodape para verificacao do Meta.',
      dica: 'Sem site com CNPJ, a verificacao pode ser negada.',
      obrigatorio: true
    },
    {
      requisito: 'BM Verificada',
      icone: 'check-circle',
      cor: '#10b981',
      descricao: 'Para enviar mais de 250 mensagens/dia, BM precisa ser verificada.',
      dica: 'Verificacao leva 2-5 dias. Inicie o processo no inicio da implantacao.',
      obrigatorio: false
    }
  ]
};

export const FLUXO_IMPLANTACAO = {
  titulo: 'Fluxo de Implantacao',
  etapas: [
    {
      numero: 1,
      titulo: 'Kick-Off',
      tempo: '1 reuniao',
      acoes: [
        'Apresentar equipe Paper Vines',
        'Alinhar expectativas e cronograma',
        'Coletar acessos necessarios (BM, numero)',
        'Definir usuarios da plataforma'
      ]
    },
    {
      numero: 2,
      titulo: 'Configuracao',
      tempo: '2-3 dias',
      acoes: [
        'Integrar numero na API Oficial',
        'Configurar plataforma de atendimento',
        'Criar usuarios e permissoes',
        'Importar contatos (se houver)'
      ]
    },
    {
      numero: 3,
      titulo: 'Chatbots',
      tempo: '3-5 dias',
      acoes: [
        'Criar fluxos de chatbot conforme plano',
        'Configurar IA de atendimento',
        'Testar todos os fluxos',
        'Ajustar conforme feedback'
      ]
    },
    {
      numero: 4,
      titulo: 'Treinamento',
      tempo: '1-2 reunioes',
      acoes: [
        'Treinar equipe na plataforma',
        'Ensinar gestao de conversas',
        'Explicar relatorios e metricas',
        'Entregar materiais de apoio'
      ]
    },
    {
      numero: 5,
      titulo: 'Go-Live',
      tempo: '1 dia',
      acoes: [
        'Ativar atendimento em producao',
        'Monitorar primeiras conversas',
        'Ajustes finais em tempo real',
        'Suporte intensivo nas primeiras 48h'
      ]
    }
  ]
};

export const PERGUNTAS_FREQUENTES = [
  {
    pergunta: 'O numero vai parar de funcionar no celular?',
    resposta: 'Nao necessariamente. Se for WhatsApp Business, funciona nos dois. Se for pessoal, perdera acesso no celular.',
    categoria: 'tecnico'
  },
  {
    pergunta: 'Quantas mensagens posso enviar por dia?',
    resposta: 'Depende do nivel da BM. Comeca com 250/dia e pode chegar a ilimitado apos verificacao e bom historico.',
    categoria: 'tecnico'
  },
  {
    pergunta: 'Posso enviar mensagens em massa?',
    resposta: 'Sim, mas apenas para contatos que deram consentimento. Spam resulta em bloqueio da conta.',
    categoria: 'politica'
  },
  {
    pergunta: 'Quanto custa cada mensagem?',
    resposta: 'Marketing: ~$0,06 | Utilidade/Servico/Auth: ~$0,007. Conversas de servico tem 1000 gratis/mes.',
    categoria: 'precos'
  },
  {
    pergunta: 'O que acontece se minha conta for bloqueada?',
    resposta: 'Voce pode recorrer pelo processo da Meta. Paper Vines auxilia no recurso, mas a decisao e do Meta.',
    categoria: 'politica'
  },
  {
    pergunta: 'Posso usar a IA para tudo?',
    resposta: 'A IA resolve 80% das conversas, mas casos complexos precisam de humano. Sempre tenha equipe de backup.',
    categoria: 'produto'
  },
  {
    pergunta: 'Quanto tempo leva a implantacao?',
    resposta: 'Em media 7-14 dias, dependendo da complexidade dos chatbots e disponibilidade do cliente.',
    categoria: 'processo'
  },
  {
    pergunta: 'Preciso de site para usar?',
    resposta: 'Sim, o Meta exige site com CNPJ para verificar a empresa. Pode ser um site simples.',
    categoria: 'requisitos'
  }
];

export const DIFERENCIAIS_PAPERVINES = [
  {
    titulo: 'API Oficial do Meta',
    icone: 'check-shield',
    descricao: 'Sem risco de bloqueio, diferente de APIs nao oficiais',
    destaque: true
  },
  {
    titulo: 'IA com 98% de Precisao',
    icone: 'robot',
    descricao: 'Resolve 80% das conversas sem intervencao humana',
    destaque: true
  },
  {
    titulo: 'Omnichannel',
    icone: 'layer-group',
    descricao: 'WhatsApp + Instagram + Messenger em uma tela',
    destaque: false
  },
  {
    titulo: 'Suporte Dedicado',
    icone: 'headset',
    descricao: 'Grupo de WhatsApp exclusivo para suporte rapido',
    destaque: false
  },
  {
    titulo: 'Implantacao Assistida',
    icone: 'hands-helping',
    descricao: 'Equipe Paper Vines configura tudo para o cliente',
    destaque: false
  },
  {
    titulo: 'Treinamento Incluso',
    icone: 'graduation-cap',
    descricao: 'Videos tutoriais e treinamento ao vivo da equipe',
    destaque: false
  }
];

export const LINKS_IMPORTANTES = {
  politicas: [
    {
      titulo: 'Politica de Mensagens WhatsApp',
      url: 'https://business.whatsapp.com/policy',
      descricao: 'Regras de uso da API Oficial'
    },
    {
      titulo: 'Precos das Mensagens',
      url: 'https://business.whatsapp.com/products/platform-pricing',
      descricao: 'Tabela de precos por categoria'
    },
    {
      titulo: 'Politica de Anuncios Meta',
      url: 'https://transparency.meta.com/policies/ad-standards/objectionable-content/adult-nudity-and-sexual-activity/',
      descricao: 'Regras para conteudo em anuncios'
    }
  ],
  ferramentas: [
    {
      titulo: 'Apresentacao Clientes',
      url: 'https://www.figma.com/deck/fU8KjN7JpjpzhxNRZzfqlp',
      descricao: 'Slides oficiais para demonstracao'
    },
    {
      titulo: 'Modelos de Proposta',
      url: 'https://www.figma.com/files/team/1082649090502569616/project/412083277/Vendas',
      descricao: 'Templates no Figma'
    },
    {
      titulo: 'Modelos de Contrato',
      url: 'https://drive.google.com/drive/folders/1hTxC7rcN2MvAtusrG-gj6CxkT6FvhTe1',
      descricao: 'Contratos padrao no Drive'
    },
    {
      titulo: 'ClickSign',
      url: 'https://app.clicksign.com/',
      descricao: 'Assinatura digital de contratos'
    },
    {
      titulo: 'Asaas',
      url: 'https://www.asaas.com/customerAccount/list?caid=155676853',
      descricao: 'Gestao de pagamentos'
    }
  ],
  tutoriais: [
    {
      titulo: 'Como dar acesso a BM',
      url: 'https://www.youtube.com/watch?v=C15vD7rvE28',
      descricao: 'Tutorial passo a passo'
    },
    {
      titulo: 'Videos da Plataforma',
      url: 'https://youtube.com/playlist?list=PLQnLWcfvhavZIp6EHujInobasehrz7DjH',
      descricao: 'Playlist completa de tutoriais'
    },
    {
      titulo: 'Teste Gratuito',
      url: 'https://chat.papervines.digital/trial/sign-up',
      descricao: '14 dias gratis para testar'
    }
  ]
};
