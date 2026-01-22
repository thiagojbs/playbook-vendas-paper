// Sistema de Busca RAG (Retrieval Augmented Generation)
// Busca semantica no indice Vectorize

import { generateEmbedding, prepareText } from './embeddings.js';

/**
 * Busca documentos similares no Vectorize
 * @param {string} query - Pergunta ou termo de busca
 * @param {string} tenantId - ID do tenant
 * @param {object} env - Environment com VECTORIZE_INDEX
 * @param {object} options - Opcoes de busca
 * @returns {Promise<Array>} - Resultados ordenados por similaridade
 */
export async function searchSimilar(query, tenantId, env, options = {}) {
  const {
    topK = 5,
    minScore = 0.3, // Reduzido para capturar resultados com score baixo
    category = null
  } = options;

  // Verifica se Vectorize esta disponivel
  if (!env.VECTORIZE_INDEX) {
    console.warn('VECTORIZE_INDEX nao configurado');
    return [];
  }

  // Gera embedding da query
  const queryEmbedding = await generateEmbedding(
    prepareText(query),
    env
  );

  if (!queryEmbedding || queryEmbedding.length === 0) {
    console.error('[RAG] Falha ao gerar embedding para query:', query);
    return [];
  }

  console.log(`[RAG] Buscando: "${query}" (embedding size: ${queryEmbedding.length})`);

  // Busca no Vectorize sem filtros (mais compativel)
  const results = await env.VECTORIZE_INDEX.query(queryEmbedding, {
    topK: topK * 2, // Busca mais para filtrar depois
    returnMetadata: 'all'
  });

  console.log(`[RAG] Resultados brutos: ${results.matches?.length || 0}`);

  if (!results.matches || results.matches.length === 0) {
    return [];
  }

  // Debug: mostrar primeiro resultado para entender estrutura
  if (results.matches[0]) {
    console.log(`[RAG] Primeiro resultado - ID: ${results.matches[0].id}, Score: ${results.matches[0].score}`);
    console.log(`[RAG] Metadata:`, JSON.stringify(results.matches[0].metadata || {}));
  }

  // Filtra por tenant e categoria manualmente
  let filtered = results.matches;

  // Filtra por tenant
  if (tenantId) {
    const beforeFilter = filtered.length;
    filtered = filtered.filter(m =>
      m.metadata?.tenant === tenantId ||
      m.id?.startsWith(tenantId + '-')
    );
    console.log(`[RAG] Filtro tenant "${tenantId}": ${beforeFilter} -> ${filtered.length}`);
  }

  // Filtra por categoria se especificado
  if (category) {
    filtered = filtered.filter(m => m.metadata?.category === category);
  }

  // Filtra por score minimo e limita resultados
  return filtered
    .filter(match => match.score >= minScore)
    .slice(0, topK)
    .map(match => ({
      id: match.id,
      score: match.score,
      content: match.metadata?.content || '',
      source: match.metadata?.source || '',
      category: match.metadata?.category || '',
      title: match.metadata?.title || ''
    }));
}

/**
 * Busca e formata contexto para a IA
 * Retorna texto formatado com fontes para uso em prompts
 * @param {string} query - Pergunta do usuario
 * @param {string} tenantId - ID do tenant
 * @param {object} env - Environment
 * @param {object} options - Opcoes
 * @returns {Promise<object>} - Contexto formatado
 */
export async function getRAGContext(query, tenantId, env, options = {}) {
  const results = await searchSimilar(query, tenantId, env, options);

  if (results.length === 0) {
    return {
      found: false,
      context: 'Nenhuma informacao relevante encontrada no playbook.',
      sources: [],
      resultsCount: 0
    };
  }

  // Formata contexto para a IA
  const contextParts = results.map((r, i) => {
    const header = r.title
      ? `[Fonte ${i + 1}: ${r.title}]`
      : `[Fonte ${i + 1}: ${r.category}]`;
    return `${header}\n${r.content}`;
  });

  return {
    found: true,
    context: contextParts.join('\n\n---\n\n'),
    sources: results.map(r => ({
      source: r.source,
      title: r.title,
      category: r.category,
      score: r.score
    })),
    resultsCount: results.length,
    topScore: results[0].score
  };
}

/**
 * Busca especifica por objecoes
 * Otimizada para encontrar tratativas de objecoes de clientes
 * @param {string} objection - Objecao do cliente
 * @param {string} tenantId - ID do tenant
 * @param {object} env - Environment
 * @returns {Promise<object>} - Sugestoes de resposta
 */
export async function searchObjection(objection, tenantId, env) {
  // Prefixo para melhorar a busca
  const enrichedQuery = `objecao do cliente: "${objection}" tratativa resposta`;

  const results = await searchSimilar(enrichedQuery, tenantId, env, {
    topK: 3,
    minScore: 0.65,
    category: 'objecoes'
  });

  if (results.length === 0) {
    // Tenta busca mais ampla
    const fallbackResults = await searchSimilar(objection, tenantId, env, {
      topK: 3,
      minScore: 0.6
    });

    if (fallbackResults.length === 0) {
      return {
        found: false,
        suggestions: [],
        tip: 'Tente reformular a objecao ou buscar por palavras-chave'
      };
    }

    return {
      found: true,
      suggestions: fallbackResults.map(r => ({
        content: r.content,
        category: r.category,
        confidence: r.score
      })),
      note: 'Resultado de busca ampla'
    };
  }

  return {
    found: true,
    suggestions: results.map(r => ({
      content: r.content,
      title: r.title,
      confidence: r.score
    }))
  };
}

/**
 * Busca por scripts de vendas
 * @param {string} situation - Situacao ou etapa do funil
 * @param {string} tenantId - ID do tenant
 * @param {object} env - Environment
 * @returns {Promise<object>} - Scripts encontrados
 */
export async function searchScripts(situation, tenantId, env) {
  const enrichedQuery = `script mensagem ${situation}`;

  const results = await searchSimilar(enrichedQuery, tenantId, env, {
    topK: 5,
    minScore: 0.6,
    category: 'scripts'
  });

  return {
    found: results.length > 0,
    scripts: results.map(r => ({
      title: r.title,
      content: r.content,
      relevance: r.score
    }))
  };
}

/**
 * Handler HTTP para endpoint de busca RAG
 * @param {Request} request - HTTP request
 * @param {object} env - Environment
 * @returns {Promise<Response>} - HTTP response
 */
export async function handleRAGSearch(request, env) {
  try {
    const { query, tenantId, options = {} } = await request.json();

    if (!query) {
      return new Response(JSON.stringify({
        error: 'Query obrigatoria'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tenant = tenantId || 'papervines';
    const result = await getRAGContext(query, tenant, env, options);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('RAG search error:', error);
    return new Response(JSON.stringify({
      error: 'Erro na busca',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/**
 * Handler HTTP para busca de objecoes
 * @param {Request} request - HTTP request
 * @param {object} env - Environment
 * @returns {Promise<Response>} - HTTP response
 */
export async function handleObjectionSearch(request, env) {
  try {
    const { objection, tenantId } = await request.json();

    if (!objection) {
      return new Response(JSON.stringify({
        error: 'Objecao obrigatoria'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tenant = tenantId || 'papervines';
    const result = await searchObjection(objection, tenant, env);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Objection search error:', error);
    return new Response(JSON.stringify({
      error: 'Erro na busca de objecao',
      message: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
