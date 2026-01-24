// API de integração com o CRM Paper Vines
// Documentação: https://flwchat.readme.io/reference

const CRM_BASE_URL = 'https://api.wts.chat';
const PANEL_ID_PAPERVINES = '5369fc64-cc15-41d3-a780-664878183b8b'; // Paper Vines (default)

// Função helper para obter Panel ID do tenant
function getPanelId(env, request = null) {
  // Prioridade:
  // 1. Query parameter ?panel_id=xxx (configurado pelo usuário na interface)
  // 2. Variável de ambiente CRM_PANEL_ID (Cloudflare)
  // 3. Default do Paper Vines

  if (request) {
    const url = new URL(request.url);
    const panelIdFromQuery = url.searchParams.get('panel_id');
    if (panelIdFromQuery) {
      return panelIdFromQuery;
    }
  }

  return env.CRM_PANEL_ID || PANEL_ID_PAPERVINES;
}

// Função helper para fazer requisições ao CRM
async function fetchCRM(endpoint, env, options = {}) {
  // Tentar usar chave específica do tenant primeiro, depois fallback para chave geral
  const apiKey = env.CRMCABELO_API_KEY || env.CRM_API_KEY;
  if (!apiKey) {
    throw new Error('CRM_API_KEY ou CRMCABELO_API_KEY não configurada. Configure nas variáveis de ambiente do Cloudflare Workers.');
  }
  const url = `${CRM_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`CRM API Error: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`CRM Request Failed: ${error.message} (URL: ${url})`);
  }
}

// Buscar todos os cards do painel (com paginação)
export async function getCards(env, filters = {}, request = null) {
  const params = new URLSearchParams({
    PanelId: getPanelId(env, request),
    PageSize: '100',
    IncludeArchived: 'false',
    ...filters
  });

  return fetchCRM(`/crm/v1/panel/card?${params}`, env);
}

// Buscar card por ID
export async function getCardById(env, cardId) {
  return fetchCRM(`/crm/v1/panel/card/${cardId}?IncludeDetails=contact,tags,annotations`, env);
}

// Buscar todos os steps (etapas) do painel - obtidos do próprio painel
export async function getSteps(env) {
  const panel = await getPanel(env);
  return { items: panel.steps || [], panel };
}

// Buscar detalhes do painel com steps incluídos
export async function getPanel(env, request = null) {
  return fetchCRM(`/crm/v1/panel/${getPanelId(env, request)}?IncludeDetails=steps,tags`, env);
}

// Listar todos os painéis disponíveis (útil para descobrir Panel ID)
export async function listPanels(env) {
  return fetchCRM('/crm/v1/panel', env);
}

// Buscar todos os steps (etapas) do painel - obtidos do próprio painel
export async function getSteps(env, request = null) {
  const panel = await getPanel(env, request);
  return { items: panel.steps || [], panel };
}

// Buscar cards por etapa específica
export async function getCardsByStep(env, stepId, request = null) {
  const params = new URLSearchParams({
    PanelId: getPanelId(env, request),
    StepId: stepId,
    PageSize: '100',
    IncludeArchived: 'false'
  });

  return fetchCRM(`/crm/v1/panel/card?${params}`, env);
}

// Buscar cards criados em um período
export async function getCardsByPeriod(env, startDate, endDate, request = null) {
  const params = new URLSearchParams({
    PanelId: getPanelId(env, request),
    PageSize: '500',
    IncludeArchived: 'false',
    'CreatedAt.After': startDate,
    'CreatedAt.Before': endDate
  });

  return fetchCRM(`/crm/v1/panel/card?${params}`, env);
}

// Buscar todos os cards com todas as páginas
export async function getAllCards(env, request = null) {
  let allItems = [];
  let pageNumber = 1;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      PanelId: getPanelId(env, request),
      PageSize: '100',
      PageNumber: pageNumber.toString(),
      IncludeArchived: 'false'
    });

    const response = await fetchCRM(`/crm/v1/panel/card?${params}`, env);

    if (response.items && response.items.length > 0) {
      allItems = allItems.concat(response.items);
      pageNumber++;

      // Verifica se há mais páginas
      if (response.items.length < 100) {
        hasMore = false;
      }
    } else {
      hasMore = false;
    }

    // Limite de segurança
    if (pageNumber > 50) {
      hasMore = false;
    }
  }

  return { items: allItems, total: allItems.length };
}

// Buscar múltiplos contatos por ID (em lotes para performance)
async function getContactsById(env, contactIds) {
  const contacts = {};

  // Buscar contatos em paralelo (máximo 10 por vez para não sobrecarregar)
  const batchSize = 10;
  for (let i = 0; i < contactIds.length; i += batchSize) {
    const batch = contactIds.slice(i, i + batchSize);
    const promises = batch.map(async (id) => {
      try {
        // Endpoint correto: /core/v1/contact/{id} conforme documentação
        const contact = await fetchCRM(`/core/v1/contact/${id}`, env);
        return { id, contact };
      } catch (error) {
        // Alguns contatos podem não existir mais - ignorar silenciosamente
        return { id, contact: null };
      }
    });

    const results = await Promise.all(promises);
    results.forEach(({ id, contact }) => {
      if (contact) {
        contacts[id] = contact;
      }
    });
  }

  return contacts;
}

// Buscar contato por ID
export async function getContactById(env, contactId) {
  return fetchCRM(`/core/v1/contact/${contactId}`, env);
}

// Normalizar nome do canal para exibição amigável
function normalizeChannelName(value) {
  if (!value) return 'Orgânico';

  const normalized = value.toLowerCase().trim();

  // Mapeamento de nomes técnicos para nomes legíveis
  const channelMap = {
    // Instagram
    'instagram': 'Instagram',
    'ig': 'Instagram',
    'insta': 'Instagram',
    'instagram_stories': 'Instagram',
    'instagram_feed': 'Instagram',
    'instagram_reels': 'Instagram',

    // Facebook
    'facebook': 'Facebook',
    'fb': 'Facebook',
    'facebook_feed': 'Facebook',
    'facebook_stories': 'Facebook',
    'meta': 'Facebook',

    // Google
    'google': 'Google Ads',
    'google_ads': 'Google Ads',
    'googleads': 'Google Ads',
    'gads': 'Google Ads',
    'adwords': 'Google Ads',
    'google_search': 'Google Ads',
    'google_display': 'Google Ads',
    'pmax': 'Google Ads',

    // WhatsApp
    'whatsapp': 'WhatsApp',
    'wpp': 'WhatsApp',
    'wts': 'WhatsApp',

    // Outros canais comuns
    'tiktok': 'TikTok',
    'youtube': 'YouTube',
    'linkedin': 'LinkedIn',
    'twitter': 'Twitter/X',
    'x': 'Twitter/X',
    'email': 'E-mail',
    'sms': 'SMS',
    'referral': 'Indicação',
    'organic': 'Orgânico',
    'direct': 'Direto',
    'site': 'Site',
    'website': 'Site',
    'landing': 'Landing Page',
    'lp': 'Landing Page'
  };

  // Verificar mapeamento direto
  if (channelMap[normalized]) {
    return channelMap[normalized];
  }

  // Verificar se contém palavras-chave
  if (normalized.includes('instagram') || normalized.includes('insta')) return 'Instagram';
  if (normalized.includes('facebook') || normalized.includes('fb_')) return 'Facebook';
  if (normalized.includes('google') || normalized.includes('gads')) return 'Google Ads';
  if (normalized.includes('whatsapp') || normalized.includes('wpp')) return 'WhatsApp';
  if (normalized.includes('tiktok')) return 'TikTok';
  if (normalized.includes('youtube')) return 'YouTube';

  // Retornar valor original capitalizado se não encontrar mapeamento
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

// Buscar métricas de origem dos contatos
export async function getSourceMetrics(env, request = null) {
  try {
    // Buscar todos os cards
    const cardsResponse = await getAllCards(env, request);
    const cards = cardsResponse.items || [];

    // Coletar todos os contactIds únicos
    const allContactIds = new Set();
    cards.forEach(card => {
      if (card.contactIds && Array.isArray(card.contactIds) && card.contactIds.length > 0) {
        card.contactIds.forEach(id => allContactIds.add(id));
      }
    });

    // Buscar detalhes de todos os contatos
    const contactsMap = await getContactsById(env, Array.from(allContactIds));

    // Mapear origens
    const channelStats = {};
    const campaignStats = {};
    const contentStats = {};
    const cardsBySource = [];

    // Debug: guardar dados brutos para análise
    const debugData = {
      sampleContacts: [],
      uniqueFields: new Set()
    };

    for (const card of cards) {
      // Pegar o primeiro contato associado ao card
      const contactId = card.contactIds && card.contactIds[0];
      const contact = contactId ? contactsMap[contactId] : null;

      if (!contact) {
        // Card sem contato - ainda incluímos com origem desconhecida
        cardsBySource.push({
          cardId: card.id,
          cardTitle: card.title,
          contactName: null,
          phone: null,
          source: 'Desconhecido',
          channel: 'Outros',
          campaign: null,
          content: null,
          medium: null,
          createdAt: card.createdAt,
          stepId: card.stepId,
          value: card.monetaryAmount || 0
        });
        continue;
      }

      // Debug: guardar amostra dos primeiros contatos para análise
      if (debugData.sampleContacts.length < 5) {
        debugData.sampleContacts.push({
          contactId: contact.id,
          name: contact.name,
          origin: contact.origin,
          utm: contact.utm,
          source: contact.source,
          channel: contact.channel,
          metadata: contact.metadata,
          customFields: contact.customFields,
          tags: contact.tags,
          allKeys: Object.keys(contact)
        });
      }

      // Extrair dados de origem - tentar múltiplos campos possíveis
      const utm = contact.utm || {};
      const metadata = contact.metadata || {};

      // UTM params (padrão)
      const utmSource = utm.source || metadata.utm_source || metadata.source || null;
      const utmMedium = utm.medium || metadata.utm_medium || metadata.medium || null;
      const utmCampaign = utm.campaign || metadata.utm_campaign || metadata.campaign || null;
      const utmContent = utm.content || metadata.utm_content || metadata.content || null;

      // Campos alternativos que podem conter origem
      const contactSource = contact.source || contact.channel || null;
      const contactOrigin = contact.origin || null;

      // Determinar o canal de marketing (prioridade: utm_source > contact.source > origin)
      let channel = 'Orgânico';
      if (utmSource) {
        channel = normalizeChannelName(utmSource);
      } else if (contactSource) {
        channel = normalizeChannelName(contactSource);
      } else if (utmMedium && utmMedium !== 'REFERRAL') {
        channel = normalizeChannelName(utmMedium);
      } else if (contactOrigin && contactOrigin !== 'CREATED_FROM_HUB' && contactOrigin !== 'CREATED_BY_USER') {
        channel = normalizeChannelName(contactOrigin);
      }

      // Estatísticas por canal de marketing (Instagram, Facebook, Google, etc)
      if (!channelStats[channel]) {
        channelStats[channel] = { count: 0, value: 0, cards: [] };
      }
      channelStats[channel].count++;
      channelStats[channel].value += card.monetaryAmount || 0;

      // Estatísticas por campanha (agrupado pelo ID da campanha)
      if (utmCampaign) {
        const campaignKey = utmCampaign;
        if (!campaignStats[campaignKey]) {
          campaignStats[campaignKey] = {
            id: utmCampaign,
            contents: {},  // Agrupar conteúdos dentro da campanha
            channel: channel,
            medium: utmMedium,
            count: 0,
            value: 0
          };
        }
        campaignStats[campaignKey].count++;
        campaignStats[campaignKey].value += card.monetaryAmount || 0;

        // Agrupar conteúdos dentro da campanha
        if (utmContent) {
          if (!campaignStats[campaignKey].contents[utmContent]) {
            campaignStats[campaignKey].contents[utmContent] = { count: 0, value: 0 };
          }
          campaignStats[campaignKey].contents[utmContent].count++;
          campaignStats[campaignKey].contents[utmContent].value += card.monetaryAmount || 0;
        }
      }

      // Estatísticas por conteúdo (separado)
      if (utmContent) {
        if (!contentStats[utmContent]) {
          contentStats[utmContent] = {
            content: utmContent,
            channel: channel,
            campaign: utmCampaign,
            count: 0,
            value: 0
          };
        }
        contentStats[utmContent].count++;
        contentStats[utmContent].value += card.monetaryAmount || 0;
      }

      // Cards com info de origem
      cardsBySource.push({
        cardId: card.id,
        cardTitle: card.title,
        contactName: contact.name,
        phone: contact.phoneNumber,
        channel: channel,
        campaign: utmCampaign,
        content: utmContent,
        medium: utmMedium,
        createdAt: card.createdAt,
        stepId: card.stepId,
        value: card.monetaryAmount || 0
      });
    }

    // Ordenar canais por quantidade
    const sortedChannels = Object.entries(channelStats)
      .map(([name, data]) => ({ name, count: data.count, value: data.value }))
      .sort((a, b) => b.count - a.count);

    // Ordenar campanhas por quantidade
    const sortedCampaigns = Object.values(campaignStats)
      .map(c => ({
        ...c,
        contents: Object.entries(c.contents).map(([content, data]) => ({
          content,
          count: data.count,
          value: data.value
        })).sort((a, b) => b.count - a.count)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 30); // Top 30 campanhas

    // Ordenar conteúdos por quantidade
    const sortedContents = Object.values(contentStats)
      .sort((a, b) => b.count - a.count)
      .slice(0, 30); // Top 30 conteúdos

    // Ordenar cards por data de criação (mais recentes primeiro)
    cardsBySource.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalCards: cards.length,
        totalWithChannel: cardsBySource.filter(c => c.channel !== 'Outros' && c.channel !== 'Orgânico').length,
        totalCampaigns: Object.keys(campaignStats).length,
        totalContents: Object.keys(contentStats).length,
        totalContacts: Object.keys(contactsMap).length
      },
      channels: sortedChannels,
      campaigns: sortedCampaigns,
      contents: sortedContents,
      recentCards: cardsBySource.slice(0, 50),
      debug: debugData // Temporário para análise
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Calcular métricas do funil
export async function getFunnelMetrics(env, request = null) {
  try {
    // Buscar steps (etapas do funil)
    const stepsResponse = await getSteps(env, request);
    const steps = stepsResponse.items || [];

    // Buscar todos os cards
    const cardsResponse = await getAllCards(env, request);
    const cards = cardsResponse.items || [];

    // Organizar cards por step
    const cardsByStep = {};
    steps.forEach(step => {
      cardsByStep[step.id] = {
        id: step.id,
        title: step.title,
        position: step.position,
        cards: [],
        count: 0,
        totalValue: 0
      };
    });

    // Contar cards por step
    cards.forEach(card => {
      if (card.stepId && cardsByStep[card.stepId]) {
        cardsByStep[card.stepId].cards.push(card);
        cardsByStep[card.stepId].count++;
        cardsByStep[card.stepId].totalValue += card.monetaryAmount || 0;
      }
    });

    // Ordenar por posição
    const orderedSteps = Object.values(cardsByStep).sort((a, b) => a.position - b.position);

    // Calcular conversões entre etapas
    const conversions = [];
    for (let i = 0; i < orderedSteps.length - 1; i++) {
      const current = orderedSteps[i];
      const next = orderedSteps[i + 1];
      const rate = current.count > 0 ? (next.count / current.count * 100).toFixed(1) : 0;
      conversions.push({
        from: current.title,
        to: next.title,
        rate: parseFloat(rate)
      });
    }

    // Calcular métricas gerais
    const totalCards = cards.length;
    const totalValue = cards.reduce((sum, card) => sum + (card.monetaryAmount || 0), 0);
    const avgValue = totalCards > 0 ? totalValue / totalCards : 0;

    // Cards criados hoje
    const today = new Date().toISOString().split('T')[0];
    const cardsToday = cards.filter(card => card.createdAt && card.createdAt.startsWith(today)).length;

    // Cards criados esta semana
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const cardsThisWeek = cards.filter(card => {
      if (!card.createdAt) return false;
      const cardDate = new Date(card.createdAt);
      return cardDate >= weekAgo;
    }).length;

    // Cards criados este mês
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const cardsThisMonth = cards.filter(card => {
      if (!card.createdAt) return false;
      const cardDate = new Date(card.createdAt);
      return cardDate >= monthStart;
    }).length;

    return {
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalCards,
        totalValue,
        avgValue,
        cardsToday,
        cardsThisWeek,
        cardsThisMonth
      },
      steps: orderedSteps.map(s => ({
        id: s.id,
        title: s.title,
        position: s.position,
        count: s.count,
        totalValue: s.totalValue
      })),
      conversions,
      rawSteps: steps
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Handler para rotas de API do CRM
export async function handleCRMAPI(request, env, path) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let data;

    switch (path) {
      case '/api/crm/cards':
        data = await getAllCards(env, request);
        break;

      case '/api/crm/steps':
        data = await getSteps(env, request);
        break;

      case '/api/crm/panel':
        data = await getPanel(env, request);
        break;

      case '/api/crm/metrics':
      case '/api/crm/funnel':
        data = await getFunnelMetrics(env, request);
        break;

      case '/api/crm/sources':
        data = await getSourceMetrics(env, request);
        break;

      case '/api/crm/panels':
      case '/api/crm/list-panels':
        data = await listPanels(env);
        break;

      default:
        // Rota não encontrada
        return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}
