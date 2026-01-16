// API de integração com o CRM Paper Vines
// Documentação: https://flwchat.readme.io/reference

const CRM_BASE_URL = 'https://api.wts.chat';
const PANEL_ID = '5369fc64-cc15-41d3-a780-664878183b8b';

// Função helper para fazer requisições ao CRM
async function fetchCRM(endpoint, env, options = {}) {
  const apiKey = env.CRM_API_KEY;
  if (!apiKey) {
    throw new Error('CRM_API_KEY não configurada. Configure nas variáveis de ambiente do Cloudflare Workers.');
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
export async function getCards(env, filters = {}) {
  const params = new URLSearchParams({
    PanelId: PANEL_ID,
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
export async function getPanel(env) {
  return fetchCRM(`/crm/v1/panel/${PANEL_ID}?IncludeDetails=steps,tags`, env);
}

// Buscar cards por etapa específica
export async function getCardsByStep(env, stepId) {
  const params = new URLSearchParams({
    PanelId: PANEL_ID,
    StepId: stepId,
    PageSize: '100',
    IncludeArchived: 'false'
  });

  return fetchCRM(`/crm/v1/panel/card?${params}`, env);
}

// Buscar cards criados em um período
export async function getCardsByPeriod(env, startDate, endDate) {
  const params = new URLSearchParams({
    PanelId: PANEL_ID,
    PageSize: '500',
    IncludeArchived: 'false',
    'CreatedAt.After': startDate,
    'CreatedAt.Before': endDate
  });

  return fetchCRM(`/crm/v1/panel/card?${params}`, env);
}

// Buscar todos os cards com todas as páginas
export async function getAllCards(env) {
  let allItems = [];
  let pageNumber = 1;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      PanelId: PANEL_ID,
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
        const contact = await fetchCRM(`/contact/v1/contact/${id}`, env);
        return { id, contact };
      } catch (error) {
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
  return fetchCRM(`/contact/v1/contact/${contactId}`, env);
}

// Buscar métricas de origem dos contatos
export async function getSourceMetrics(env) {
  try {
    // Buscar todos os cards
    const cardsResponse = await getAllCards(env);
    const cards = cardsResponse.items || [];

    // Coletar todos os contactIds únicos
    const allContactIds = new Set();
    cards.forEach(card => {
      if (card.contactIds && Array.isArray(card.contactIds)) {
        card.contactIds.forEach(id => allContactIds.add(id));
      }
    });

    // Buscar detalhes de todos os contatos
    const contactsMap = await getContactsById(env, Array.from(allContactIds));

    // Mapear origens
    const sourceStats = {};
    const channelStats = {};
    const campaignStats = {};
    const cardsBySource = [];

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

      // Extrair dados de origem do contato (baseado na documentação da API)
      const source = contact.origin || 'Desconhecido';
      const utm = contact.utm || {};
      const campaign = utm.campaign || null;
      const content = utm.content || null;
      const medium = utm.medium || null;
      const utmSource = utm.source || null;

      // Estatísticas por fonte/origem (Instagram, Facebook, WhatsApp, etc)
      if (!sourceStats[source]) {
        sourceStats[source] = { count: 0, cards: [], value: 0 };
      }
      sourceStats[source].count++;
      sourceStats[source].value += card.monetaryAmount || 0;
      sourceStats[source].cards.push({
        id: card.id,
        title: card.title,
        contactName: contact.name,
        phone: contact.phoneNumber,
        createdAt: card.createdAt
      });

      // Estatísticas por UTM source (canal de marketing)
      const channelName = utmSource || medium || 'Orgânico';
      if (!channelStats[channelName]) {
        channelStats[channelName] = { count: 0, value: 0 };
      }
      channelStats[channelName].count++;
      channelStats[channelName].value += card.monetaryAmount || 0;

      // Estatísticas por campanha (se houver)
      if (campaign) {
        if (!campaignStats[campaign]) {
          campaignStats[campaign] = {
            id: campaign,
            content: content,
            medium: medium,
            count: 0,
            value: 0,
            source: source
          };
        }
        campaignStats[campaign].count++;
        campaignStats[campaign].value += card.monetaryAmount || 0;
      }

      // Cards com info de origem
      cardsBySource.push({
        cardId: card.id,
        cardTitle: card.title,
        contactName: contact.name,
        phone: contact.phoneNumber,
        source: source,
        channel: channelName,
        campaign: campaign,
        content: content,
        medium: medium,
        createdAt: card.createdAt,
        stepId: card.stepId,
        value: card.monetaryAmount || 0
      });
    }

    // Ordenar por quantidade
    const sortedSources = Object.entries(sourceStats)
      .map(([name, data]) => ({ name, ...data, cards: undefined })) // Remover cards para resposta mais leve
      .sort((a, b) => b.count - a.count);

    const sortedChannels = Object.entries(channelStats)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);

    const sortedCampaigns = Object.values(campaignStats)
      .sort((a, b) => b.count - a.count)
      .slice(0, 20); // Top 20 campanhas

    // Ordenar cards por data de criação (mais recentes primeiro)
    cardsBySource.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      success: true,
      timestamp: new Date().toISOString(),
      summary: {
        totalCards: cards.length,
        totalWithSource: cardsBySource.filter(c => c.source !== 'Desconhecido').length,
        totalCampaigns: Object.keys(campaignStats).length,
        totalContacts: Object.keys(contactsMap).length
      },
      sources: sortedSources,
      channels: sortedChannels,
      campaigns: sortedCampaigns,
      recentCards: cardsBySource.slice(0, 50) // Últimos 50 cards com origem
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
export async function getFunnelMetrics(env) {
  try {
    // Buscar steps (etapas do funil)
    const stepsResponse = await getSteps(env);
    const steps = stepsResponse.items || [];

    // Buscar todos os cards
    const cardsResponse = await getAllCards(env);
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
        data = await getAllCards(env);
        break;

      case '/api/crm/steps':
        data = await getSteps(env);
        break;

      case '/api/crm/panel':
        data = await getPanel(env);
        break;

      case '/api/crm/metrics':
      case '/api/crm/funnel':
        data = await getFunnelMetrics(env);
        break;

      case '/api/crm/sources':
        data = await getSourceMetrics(env);
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
