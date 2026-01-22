// Modulo RAG (Retrieval Augmented Generation)
// Exporta todos os componentes do sistema RAG

// Servico de Embeddings
export {
  generateEmbedding,
  generateEmbeddingsBatch,
  prepareText,
  estimateTokens,
  estimateCost,
  OPENAI_EMBEDDING_MODEL,
  EMBEDDING_DIMENSIONS
} from './embeddings.js';

// Busca Semantica
export {
  searchSimilar,
  getRAGContext,
  searchObjection,
  searchScripts,
  handleRAGSearch,
  handleObjectionSearch
} from './search.js';

// Endpoint MCP
export {
  handleMCP
} from './mcp.js';

// Indexacao
export {
  handleGitHubWebhook,
  handleManualIndex,
  handleIndexStatus,
  estimateIndexingCost
} from './indexer.js';

/**
 * Router para todas as rotas RAG
 * Integra com o worker principal
 * @param {Request} request - HTTP request
 * @param {object} env - Environment
 * @param {string} path - Path da requisicao
 * @returns {Promise<Response|null>} - Response ou null se nao for rota RAG
 */
export async function handleRAGRoutes(request, env, path) {
  // Rotas de busca RAG
  if (path === '/api/rag/search' && request.method === 'POST') {
    const { handleRAGSearch } = await import('./search.js');
    return handleRAGSearch(request, env);
  }

  if (path === '/api/rag/objection' && request.method === 'POST') {
    const { handleObjectionSearch } = await import('./search.js');
    return handleObjectionSearch(request, env);
  }

  // Rotas de indexacao
  if (path === '/index/webhook' && request.method === 'POST') {
    const { handleGitHubWebhook } = await import('./indexer.js');
    return handleGitHubWebhook(request, env);
  }

  if (path === '/index/manual' && request.method === 'POST') {
    const { handleManualIndex } = await import('./indexer.js');
    return handleManualIndex(request, env);
  }

  if (path === '/index/status') {
    const { handleIndexStatus } = await import('./indexer.js');
    return handleIndexStatus(env);
  }

  // Rotas MCP
  if (path.startsWith('/mcp') || path.startsWith('/api/mcp')) {
    const { handleMCP } = await import('./mcp.js');
    return handleMCP(request, env, path);
  }

  // Nao e uma rota RAG
  return null;
}
