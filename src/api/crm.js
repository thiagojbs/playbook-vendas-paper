// API de integração com o CRM Paper Vines
// Documentação: https://flwchat.readme.io/reference

const CRM_BASE_URL = 'https://api.chat.papervines.digital';
const PANEL_ID = '5369fc64-cc15-41d3-a780-664878183b8b';

// Função helper para fazer requisições ao CRM
async function fetchCRM(endpoint, env, options = {}) {
  const apiKey = env.CRM_API_KEY || 'pn_hynXVnpyybGt1unkdPLhzYuyUJN7atcfvxCqs13E';

  const response = await fetch(`${CRM_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`CRM API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
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

// Buscar todos os steps (etapas) do painel
export async function getSteps(env) {
  const params = new URLSearchParams({
    PanelId: PANEL_ID,
    PageSize: '50'
  });

  return fetchCRM(`/crm/v1/panel/step?${params}`, env);
}

// Buscar detalhes do painel
export async function getPanel(env) {
  return fetchCRM(`/crm/v1/panel/${PANEL_ID}`, env);
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
