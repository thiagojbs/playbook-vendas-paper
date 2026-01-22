// Servico de Embeddings via OpenAI
// Gera vetores de 1536 dimensoes para busca semantica

const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSIONS = 1536;

/**
 * Gera embedding para um texto
 * @param {string} text - Texto para gerar embedding
 * @param {object} env - Environment variables com OPENAI_API_KEY
 * @returns {Promise<number[]>} - Vetor de 1536 dimensoes
 */
export async function generateEmbedding(text, env) {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY nao configurada');
  }

  const preparedText = prepareText(text);

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OPENAI_EMBEDDING_MODEL,
      input: preparedText,
      dimensions: EMBEDDING_DIMENSIONS
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Gera embeddings em batch (mais eficiente para indexacao)
 * IMPORTANTE: Os textos devem ser pre-filtrados (sem vazios) antes de chamar esta funcao
 * @param {string[]} texts - Array de textos (ja preparados/limpos)
 * @param {object} env - Environment variables
 * @returns {Promise<number[][]>} - Array de vetores (mesmo tamanho que texts)
 */
export async function generateEmbeddingsBatch(texts, env) {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY nao configurada');
  }

  if (!texts || texts.length === 0) {
    console.warn('[Embeddings] Nenhum texto para processar');
    return [];
  }

  const batchSize = 100; // OpenAI permite ate 2048, mas usamos 100 para seguranca
  const allEmbeddings = [];

  console.log(`[Embeddings] Processando ${texts.length} textos em batches de ${batchSize}`);

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);

    // Valida que nenhum texto esta vazio
    const emptyIndex = batch.findIndex(t => !t || t.length === 0);
    if (emptyIndex >= 0) {
      console.error(`[Embeddings] Texto vazio encontrado no indice ${i + emptyIndex}`);
      throw new Error(`Texto vazio no batch - filtre antes de chamar generateEmbeddingsBatch`);
    }

    console.log(`[Embeddings] Batch ${Math.floor(i/batchSize) + 1}: ${batch.length} textos`);

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: OPENAI_EMBEDDING_MODEL,
        input: batch,
        dimensions: EMBEDDING_DIMENSIONS
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Embeddings] OpenAI batch error:`, errorText);
      console.error(`[Embeddings] Primeiro texto do batch:`, batch[0]?.substring(0, 200));
      throw new Error(`OpenAI batch error at index ${i}: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Verifica que recebemos o mesmo numero de embeddings
    if (data.data.length !== batch.length) {
      throw new Error(`OpenAI retornou ${data.data.length} embeddings para ${batch.length} textos`);
    }

    // Ordena por index para garantir ordem correta
    const sortedEmbeddings = data.data
      .sort((a, b) => a.index - b.index)
      .map(d => d.embedding);

    allEmbeddings.push(...sortedEmbeddings);

    // Rate limiting: pausa entre batches
    if (i + batchSize < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  console.log(`[Embeddings] Total: ${allEmbeddings.length} embeddings gerados`);
  return allEmbeddings;
}

/**
 * Prepara texto para embedding
 * - Remove espacos e quebras excessivas
 * - Limita tamanho para evitar truncamento
 * @param {string} text - Texto original
 * @param {number} maxChars - Limite de caracteres (padrao: 32000)
 * @returns {string} - Texto preparado
 */
export function prepareText(text, maxChars = 32000) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Remove espacos multiplos e quebras excessivas
  let cleaned = text
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Limita tamanho (OpenAI trunca em ~8k tokens, ~32k chars)
  if (cleaned.length > maxChars) {
    cleaned = cleaned.substring(0, maxChars);
    // Tenta cortar em um espaco para nao quebrar palavras
    const lastSpace = cleaned.lastIndexOf(' ');
    if (lastSpace > maxChars * 0.9) {
      cleaned = cleaned.substring(0, lastSpace);
    }
  }

  return cleaned;
}

/**
 * Estima numero de tokens em um texto
 * Regra aproximada: 1 token ~ 4 caracteres
 * @param {string} text - Texto para estimar
 * @returns {number} - Tokens estimados
 */
export function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Calcula custo estimado de embedding
 * Preco: $0.02 por 1M tokens (text-embedding-3-small)
 * @param {number} tokens - Numero de tokens
 * @returns {number} - Custo em USD
 */
export function estimateCost(tokens) {
  return (tokens / 1000000) * 0.02;
}

// Exporta constantes
export { OPENAI_EMBEDDING_MODEL, EMBEDDING_DIMENSIONS };
