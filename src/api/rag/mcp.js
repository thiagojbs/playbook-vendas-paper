// Endpoint MCP (Model Context Protocol)
// Permite que IAs (Claude, GPT, etc) consultem o playbook

import { getRAGContext, searchObjection, searchScripts } from './search.js';
import { getTenantFromRequest, loadTenantConfig } from '../../data/tenant-loader.js';

/**
 * Handler principal MCP
 * Roteia para os diferentes endpoints MCP
 * @param {Request} request - HTTP request
 * @param {object} env - Environment
 * @param {string} path - Path da requisicao
 * @returns {Promise<Response>} - HTTP response
 */
export async function handleMCP(request, env, path) {
  const mcpPath = path.replace('/mcp', '').replace('/api/mcp', '');

  switch (mcpPath) {
    case '':
    case '/':
    case '/manifest':
      return getMCPManifest();

    case '/tools':
      return getMCPTools();

    case '/execute':
      if (request.method === 'POST') {
        return executeMCPTool(request, env);
      }
      return new Response('Method not allowed', { status: 405 });

    case '/health':
      return new Response(JSON.stringify({
        status: 'ok',
        service: 'playbook-mcp',
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    default:
      return new Response(JSON.stringify({
        error: 'Endpoint MCP nao encontrado',
        availableEndpoints: ['/manifest', '/tools', '/execute', '/health']
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}

/**
 * Manifesto MCP
 * Descreve capacidades do servidor para clientes MCP
 */
function getMCPManifest() {
  const manifest = {
    name: 'playbook-vendas',
    version: '1.0.0',
    description: 'Playbook de vendas com RAG para consultas semanticas. Permite buscar informacoes sobre processos de venda, tratativas de objecoes, scripts de atendimento e precos.',

    capabilities: {
      tools: true,
      resources: true,
      prompts: false
    },

    metadata: {
      provider: 'Paper Vines',
      documentation: 'https://doc.papervines.digital/',
      supportedTenants: ['papervines']
    },

    endpoints: {
      manifest: '/mcp/manifest',
      tools: '/mcp/tools',
      execute: '/mcp/execute',
      health: '/mcp/health'
    }
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * Lista de ferramentas MCP disponiveis
 * Cada ferramenta tem nome, descricao e parametros
 */
function getMCPTools() {
  const tools = {
    tools: [
      {
        name: 'search_playbook',
        description: 'Busca semantica no playbook de vendas. Use para perguntas abertas sobre processos, tecnicas, produtos ou informacoes gerais do negocio.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Pergunta ou termo de busca em linguagem natural'
            },
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente (padrao: papervines)',
              default: 'papervines'
            },
            category: {
              type: 'string',
              description: 'Categoria para filtrar (playbook, objecoes, scripts, precos, agentes)',
              enum: ['playbook', 'objecoes', 'scripts', 'precos', 'agentes']
            }
          },
          required: ['query']
        }
      },
      {
        name: 'get_objection_response',
        description: 'Retorna sugestoes de resposta para uma objecao especifica do cliente. Ideal para quando o cliente diz "esta caro", "preciso pensar", etc.',
        inputSchema: {
          type: 'object',
          properties: {
            objection: {
              type: 'string',
              description: 'A objecao do cliente exatamente como foi dita'
            },
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente',
              default: 'papervines'
            }
          },
          required: ['objection']
        }
      },
      {
        name: 'get_script',
        description: 'Retorna scripts de vendas para uma situacao ou etapa especifica do funil',
        inputSchema: {
          type: 'object',
          properties: {
            situation: {
              type: 'string',
              description: 'Situacao ou etapa (ex: primeiro_contato, followup, fechamento, qualificacao)'
            },
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente',
              default: 'papervines'
            }
          },
          required: ['situation']
        }
      },
      {
        name: 'get_pricing',
        description: 'Retorna informacoes de precos, planos e valores',
        inputSchema: {
          type: 'object',
          properties: {
            product: {
              type: 'string',
              description: 'Nome do produto/plano ou "all" para tabela completa'
            },
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente',
              default: 'papervines'
            }
          },
          required: ['tenant']
        }
      },
      {
        name: 'list_topics',
        description: 'Lista todos os topicos e categorias disponiveis no playbook',
        inputSchema: {
          type: 'object',
          properties: {
            tenant: {
              type: 'string',
              description: 'ID do tenant/cliente',
              default: 'papervines'
            }
          }
        }
      }
    ]
  };

  return new Response(JSON.stringify(tools, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * Executa uma ferramenta MCP
 * @param {Request} request - HTTP request com tool e parameters
 * @param {object} env - Environment
 */
async function executeMCPTool(request, env) {
  try {
    const { tool, parameters = {} } = await request.json();

    if (!tool) {
      return new Response(JSON.stringify({
        error: 'Tool name required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tenant = parameters.tenant || 'papervines';
    let result;

    switch (tool) {
      case 'search_playbook':
        if (!parameters.query) {
          return errorResponse('Query required for search_playbook');
        }
        result = await executeSearchPlaybook(parameters, tenant, env);
        break;

      case 'get_objection_response':
        if (!parameters.objection) {
          return errorResponse('Objection required for get_objection_response');
        }
        result = await executeGetObjection(parameters, tenant, env);
        break;

      case 'get_script':
        if (!parameters.situation) {
          return errorResponse('Situation required for get_script');
        }
        result = await executeGetScript(parameters, tenant, env);
        break;

      case 'get_pricing':
        result = await executeGetPricing(parameters, tenant, env);
        break;

      case 'list_topics':
        result = await executeListTopics(tenant, env);
        break;

      default:
        return new Response(JSON.stringify({
          error: `Unknown tool: ${tool}`,
          availableTools: ['search_playbook', 'get_objection_response', 'get_script', 'get_pricing', 'list_topics']
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({
      success: true,
      tool,
      tenant,
      result
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('MCP execute error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Funcoes de execucao para cada ferramenta

async function executeSearchPlaybook(params, tenant, env) {
  const options = {};
  if (params.category) {
    options.category = params.category;
  }

  const ragResult = await getRAGContext(params.query, tenant, env, options);

  return {
    found: ragResult.found,
    answer: ragResult.context,
    sources: ragResult.sources,
    confidence: ragResult.topScore || 0
  };
}

async function executeGetObjection(params, tenant, env) {
  const objResult = await searchObjection(params.objection, tenant, env);

  return {
    found: objResult.found,
    suggestions: objResult.suggestions || [],
    tip: objResult.tip || objResult.note
  };
}

async function executeGetScript(params, tenant, env) {
  const scriptResult = await searchScripts(params.situation, tenant, env);

  return {
    found: scriptResult.found,
    scripts: scriptResult.scripts
  };
}

async function executeGetPricing(params, tenant, env) {
  // Busca no RAG com categoria precos
  const ragResult = await getRAGContext(
    params.product ? `preco ${params.product}` : 'tabela de precos planos valores',
    tenant,
    env,
    { category: 'precos', topK: 10 }
  );

  return {
    found: ragResult.found,
    pricing: ragResult.context,
    sources: ragResult.sources
  };
}

async function executeListTopics(tenant, env) {
  const config = await loadTenantConfig(tenant);

  return {
    tenant: config ? config.nome : tenant,
    categories: [
      { id: 'playbook', name: 'Processo de Vendas', description: 'Etapas, checklists e boas praticas' },
      { id: 'objecoes', name: 'Tratamento de Objecoes', description: 'Respostas para objecoes comuns' },
      { id: 'scripts', name: 'Scripts de Vendas', description: 'Mensagens prontas por etapa do funil' },
      { id: 'precos', name: 'Tabela de Precos', description: 'Planos, valores e configuracoes' },
      { id: 'agentes', name: 'Agentes Inteligentes', description: 'Automacao com IA' }
    ],
    modules: config?.modulos || {}
  };
}

function errorResponse(message) {
  return new Response(JSON.stringify({
    success: false,
    error: message
  }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
}
