import { renderHome } from './pages/home.js';
import { renderPlaybook } from './pages/playbook.js';
import { renderCalculadora } from './pages/calculadora.js';
import { renderClientes } from './pages/clientes.js';
import { renderPropostas } from './pages/propostas.js';
import { renderContratos } from './pages/contratos.js';
import { renderDesempenho } from './pages/desempenho.js';
import { handleAPI } from './api/index.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (path.startsWith('/api/')) {
        const response = await handleAPI(request, env, path);
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      let html;
      switch (true) {
        case path === '/' || path === '/home':
          html = renderHome();
          break;
        case path === '/playbook' || path.startsWith('/playbook/'):
          html = renderPlaybook(path);
          break;
        case path === '/calculadora':
          html = renderCalculadora();
          break;
        case path === '/clientes' || path.startsWith('/clientes/'):
          html = await renderClientes(env);
          break;
        case path === '/propostas' || path.startsWith('/propostas/'):
          html = await renderPropostas(env);
          break;
        case path === '/contratos' || path.startsWith('/contratos/'):
          html = await renderContratos(env);
          break;
        case path === '/desempenho' || path.startsWith('/desempenho/'):
          html = await renderDesempenho(env, path);
          break;
        default:
          html = renderHome();
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
