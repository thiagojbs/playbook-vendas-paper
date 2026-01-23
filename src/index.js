import { renderHome } from './pages/home.js';
import { renderPlaybook } from './pages/playbook.js';
import { renderCalculadora } from './pages/calculadora.js';
import { renderClientes } from './pages/clientes.js';
import { renderPropostas } from './pages/propostas.js';
import { renderContratos } from './pages/contratos.js';
import { renderDesempenho } from './pages/desempenho.js';
import { handleAPI } from './api/index.js';
import { handleRAGRoutes } from './api/rag/index.js';
import { getTenantFromRequest, loadTenantConfig, loadAllTenantModules } from './data/tenant-loader.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Detectar tenant da request
    const tenantId = getTenantFromRequest(request);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Tenant-ID',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Carregar dados do tenant
      const tenantData = await loadAllTenantModules(tenantId);
      const tenantConfig = tenantData.config;
      // Rotas RAG e MCP (nova funcionalidade)
      if (path.startsWith('/api/rag/') || path.startsWith('/mcp') || path.startsWith('/index/')) {
        const ragResponse = await handleRAGRoutes(request, env, path);
        if (ragResponse) {
          // Adiciona CORS headers
          const newResponse = new Response(ragResponse.body, ragResponse);
          Object.entries(corsHeaders).forEach(([key, value]) => {
            newResponse.headers.set(key, value);
          });
          return newResponse;
        }
      }

      // Health check
      if (path === '/health') {
        return new Response(JSON.stringify({
          status: 'ok',
          service: 'playbook-vendas',
          timestamp: new Date().toISOString(),
          features: {
            rag: !!env.VECTORIZE_INDEX,
            crm: !!env.WTS_API_KEY
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (path.startsWith('/api/')) {
        const response = await handleAPI(request, env, path);
        // Se já for uma Response (do CRM), retorna diretamente
        if (response instanceof Response) {
          return response;
        }
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      let html;
      switch (true) {
        case path === '/' || path === '/home':
          html = renderHome(tenantData);
          break;
        case path === '/playbook' || path.startsWith('/playbook/'):
          html = renderPlaybook(path, tenantData);
          break;
        case path === '/calculadora':
          html = renderCalculadora(tenantData);
          break;
        case path === '/clientes' || path.startsWith('/clientes/'):
          html = await renderClientes(env, tenantData);
          break;
        case path === '/propostas' || path.startsWith('/propostas/'):
          html = await renderPropostas(env, tenantData);
          break;
        case path === '/contratos' || path.startsWith('/contratos/'):
          html = await renderContratos(env, tenantData);
          break;
        case path === '/desempenho' || path.startsWith('/desempenho/'):
          html = await renderDesempenho(env, path, tenantData);
          break;
        default:
          html = renderHome(tenantData);
      }

      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    } catch (error) {
      console.error('Error:', error);
      return new Response('<h1>Erro</h1><p>' + error.message + '</p><a href="/">Voltar</a>', {
        status: 500,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  },
};
