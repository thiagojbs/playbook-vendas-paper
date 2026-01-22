import { layout } from '../templates/layout.js';

export function renderDocumentacao(path) {
  if (path === '/documentacao/playground') {
    return renderPlayground();
  } else if (path === '/documentacao/scripts') {
    return renderScriptsExemplos();
  } else if (path === '/documentacao/webhooks') {
    return renderWebhooks();
  }
  return renderDocumentacaoHome();
}

function renderDocumentacaoHome() {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-code"></i> Documentacao Tecnica - MCP & RAG</h1>
      <p class="page-subtitle">Guia completo para integracao de IAs com o Playbook de Vendas via MCP (Model Context Protocol)</p>
    </div>

    <!-- Quick Start Banner -->
    <div class="card fade-in" style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(249, 115, 22, 0.1)); border: 2px solid var(--primary); margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-rocket"></i> Quick Start - Comece em 2 minutos</h3>
        <span class="badge badge-success">PRONTO PARA USO</span>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 16px;">
        O sistema MCP ja esta configurado e funcionando. Use os endpoints abaixo para integrar qualquer IA com o playbook.
      </p>
      <div style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; overflow-x: auto;">
        <div style="color: #94a3b8; margin-bottom: 8px;"># Endpoint base</div>
        <div style="color: #22c55e;">https://vendas.papervines.digital/mcp</div>
        <div style="color: #94a3b8; margin-top: 16px; margin-bottom: 8px;"># Teste rapido - buscar no playbook</div>
        <div>curl -X POST https://vendas.papervines.digital/mcp/execute \\</div>
        <div style="padding-left: 20px;">-H "Content-Type: application/json" \\</div>
        <div style="padding-left: 20px;">-d '{"tool":"search_playbook","parameters":{"query":"como qualificar um lead"}}'</div>
      </div>
      <div style="margin-top: 16px; display: flex; gap: 12px;">
        <a href="/documentacao/playground" class="btn btn-primary"><i class="fas fa-play"></i> Testar Agora</a>
        <a href="/documentacao/scripts" class="btn btn-secondary"><i class="fas fa-copy"></i> Ver Scripts Prontos</a>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid" style="margin-bottom: 24px;">
      <div class="stat-card purple">
        <div class="stat-value">5</div>
        <div class="stat-label">Ferramentas MCP</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-value">36</div>
        <div class="stat-label">Chunks Indexados</div>
      </div>
      <div class="stat-card green">
        <div class="stat-value">6</div>
        <div class="stat-label">Categorias</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-value">1536</div>
        <div class="stat-label">Dimensoes Embedding</div>
      </div>
    </div>

    <!-- Navigation Cards -->
    <div class="grid grid-3" style="margin-bottom: 24px;">
      <a href="#arquitetura" class="card fade-in" style="text-decoration: none; color: inherit; cursor: pointer;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-sitemap"></i> Arquitetura</h3>
        </div>
        <p style="color: var(--text-secondary);">Entenda como o sistema RAG funciona</p>
      </a>
      <a href="#endpoints" class="card fade-in" style="text-decoration: none; color: inherit; cursor: pointer;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-plug"></i> Endpoints</h3>
        </div>
        <p style="color: var(--text-secondary);">Todos os endpoints disponiveis</p>
      </a>
      <a href="#ferramentas" class="card fade-in" style="text-decoration: none; color: inherit; cursor: pointer;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-tools"></i> Ferramentas MCP</h3>
        </div>
        <p style="color: var(--text-secondary);">5 ferramentas para IAs</p>
      </a>
    </div>

    <!-- Arquitetura Section -->
    <div id="arquitetura" class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-sitemap"></i> Arquitetura do Sistema</h3>
      </div>

      <div style="background: var(--border-light); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; align-items: center;">
          <div style="background: white; padding: 16px 24px; border-radius: 8px; text-align: center; border: 2px solid var(--primary);">
            <i class="fas fa-robot" style="font-size: 24px; color: var(--primary); display: block; margin-bottom: 8px;"></i>
            <strong>IA/Bot</strong>
            <div style="font-size: 12px; color: var(--text-secondary);">Claude, GPT, n8n</div>
          </div>
          <i class="fas fa-arrow-right" style="color: var(--text-muted);"></i>
          <div style="background: white; padding: 16px 24px; border-radius: 8px; text-align: center; border: 2px solid var(--accent);">
            <i class="fas fa-server" style="font-size: 24px; color: var(--accent); display: block; margin-bottom: 8px;"></i>
            <strong>MCP Server</strong>
            <div style="font-size: 12px; color: var(--text-secondary);">Cloudflare Workers</div>
          </div>
          <i class="fas fa-arrow-right" style="color: var(--text-muted);"></i>
          <div style="background: white; padding: 16px 24px; border-radius: 8px; text-align: center; border: 2px solid var(--secondary);">
            <i class="fas fa-database" style="font-size: 24px; color: var(--secondary); display: block; margin-bottom: 8px;"></i>
            <strong>Vectorize</strong>
            <div style="font-size: 12px; color: var(--text-secondary);">Busca Semantica</div>
          </div>
          <i class="fas fa-arrow-right" style="color: var(--text-muted);"></i>
          <div style="background: white; padding: 16px 24px; border-radius: 8px; text-align: center; border: 2px solid #6366f1;">
            <i class="fas fa-brain" style="font-size: 24px; color: #6366f1; display: block; margin-bottom: 8px;"></i>
            <strong>OpenAI</strong>
            <div style="font-size: 12px; color: var(--text-secondary);">Embeddings</div>
          </div>
        </div>
      </div>

      <div class="accordion-group">
        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-cogs"></i> Como funciona o RAG?</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <ol style="margin-left: 20px; line-height: 2;">
                <li><strong>Indexacao:</strong> Arquivos JS do playbook sao convertidos em chunks de texto</li>
                <li><strong>Embeddings:</strong> Cada chunk vira um vetor de 1536 dimensoes (OpenAI text-embedding-3-small)</li>
                <li><strong>Armazenamento:</strong> Vetores ficam no Cloudflare Vectorize</li>
                <li><strong>Busca:</strong> Query do usuario vira embedding e busca vetores similares</li>
                <li><strong>Resposta:</strong> Chunks mais relevantes sao retornados para a IA</li>
              </ol>
            </div>
          </div>
        </div>

        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-layer-group"></i> Categorias de Conteudo</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Categoria</th>
                      <th>Arquivo</th>
                      <th>Conteudo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span class="badge badge-purple">playbook</span></td>
                      <td><code>playbook.js</code></td>
                      <td>Processo de vendas, etapas, checklists</td>
                    </tr>
                    <tr>
                      <td><span class="badge badge-info">playbook-expandido</span></td>
                      <td><code>playbook-expandido.js</code></td>
                      <td>Politicas WhatsApp, Meta Ads, requisitos API</td>
                    </tr>
                    <tr>
                      <td><span class="badge badge-warning">objecoes</span></td>
                      <td><code>objecoes.js</code></td>
                      <td>Tratativas para objecoes de clientes</td>
                    </tr>
                    <tr>
                      <td><span class="badge badge-success">scripts</span></td>
                      <td><code>scripts.js</code></td>
                      <td>Mensagens prontas por etapa do funil</td>
                    </tr>
                    <tr>
                      <td><span class="badge" style="background: #f97316; color: white;">precos</span></td>
                      <td><code>precos.js</code></td>
                      <td>Planos, valores, configuracoes</td>
                    </tr>
                    <tr>
                      <td><span class="badge" style="background: #6366f1; color: white;">agentes</span></td>
                      <td><code>agentes.js</code></td>
                      <td>Informacoes sobre agentes de IA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-sync"></i> Reindexacao Automatica</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <p style="margin-bottom: 16px;">O sistema reindexa automaticamente quando arquivos sao modificados no GitHub:</p>
              <div style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px;">
                <div style="color: #94a3b8;"># Fluxo automatico</div>
                <div>1. Push no GitHub (branch main)</div>
                <div>2. Webhook dispara para /index/webhook</div>
                <div>3. Arquivos alterados sao reprocessados</div>
                <div>4. Novos embeddings sao gerados</div>
                <div>5. Vectorize e atualizado</div>
              </div>
              <p style="margin-top: 16px; color: var(--text-secondary);">
                <i class="fas fa-info-circle" style="color: var(--primary);"></i>
                Arquivos monitorados: <code>src/data/tenants/*/</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Endpoints Section -->
    <div id="endpoints" class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-plug"></i> Endpoints Disponiveis</h3>
        <span class="badge badge-info">REST API</span>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Metodo</th>
              <th>Endpoint</th>
              <th>Descricao</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: rgba(139, 92, 246, 0.05);">
              <td><span class="badge badge-purple">GET</span></td>
              <td><code>/mcp/manifest</code></td>
              <td>Manifesto MCP - capacidades do servidor</td>
            </tr>
            <tr style="background: rgba(139, 92, 246, 0.05);">
              <td><span class="badge badge-purple">GET</span></td>
              <td><code>/mcp/tools</code></td>
              <td>Lista todas as ferramentas disponiveis</td>
            </tr>
            <tr style="background: rgba(139, 92, 246, 0.05);">
              <td><span class="badge badge-warning">POST</span></td>
              <td><code>/mcp/execute</code></td>
              <td>Executa uma ferramenta MCP</td>
            </tr>
            <tr style="background: rgba(139, 92, 246, 0.05);">
              <td><span class="badge badge-purple">GET</span></td>
              <td><code>/mcp/health</code></td>
              <td>Health check do servico MCP</td>
            </tr>
            <tr>
              <td><span class="badge badge-warning">POST</span></td>
              <td><code>/api/rag/search</code></td>
              <td>Busca semantica direta no RAG</td>
            </tr>
            <tr>
              <td><span class="badge badge-warning">POST</span></td>
              <td><code>/api/rag/objection</code></td>
              <td>Busca especifica por objecoes</td>
            </tr>
            <tr>
              <td><span class="badge badge-warning">POST</span></td>
              <td><code>/index/manual</code></td>
              <td>Dispara reindexacao manual</td>
            </tr>
            <tr>
              <td><span class="badge badge-warning">POST</span></td>
              <td><code>/index/webhook</code></td>
              <td>Webhook do GitHub (automatico)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Ferramentas MCP Section -->
    <div id="ferramentas" class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-tools"></i> Ferramentas MCP</h3>
        <span class="badge badge-success">5 TOOLS</span>
      </div>

      <p style="color: var(--text-secondary); margin-bottom: 24px;">
        Cada ferramenta foi projetada para um caso de uso especifico. Use a mais adequada para obter melhores resultados.
      </p>

      <!-- Tool 1: search_playbook -->
      <div class="tool-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-bottom: 16px; border-left: 4px solid var(--primary);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
          <div>
            <h4 style="margin: 0; color: var(--primary);"><i class="fas fa-search"></i> search_playbook</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Busca semantica no playbook completo</p>
          </div>
          <span class="badge badge-purple">Mais usado</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px;">
          <div style="color: #94a3b8;">// Parametros</div>
          <div>{</div>
          <div style="padding-left: 16px;">"query": <span style="color: #22c55e;">"string"</span> <span style="color: #f97316;">// obrigatorio</span>,</div>
          <div style="padding-left: 16px;">"tenant": <span style="color: #22c55e;">"papervines"</span>,</div>
          <div style="padding-left: 16px;">"category": <span style="color: #22c55e;">"playbook|objecoes|scripts|precos|agentes"</span></div>
          <div>}</div>
        </div>
        <div style="font-size: 13px;">
          <strong>Quando usar:</strong> Perguntas abertas, buscas gerais, qualquer duvida sobre o negocio
        </div>
      </div>

      <!-- Tool 2: get_objection_response -->
      <div class="tool-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-bottom: 16px; border-left: 4px solid var(--warning);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
          <div>
            <h4 style="margin: 0; color: var(--warning);"><i class="fas fa-comment-slash"></i> get_objection_response</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Retorna tratativas para objecoes de clientes</p>
          </div>
          <span class="badge badge-warning">Vendas</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px;">
          <div>{</div>
          <div style="padding-left: 16px;">"objection": <span style="color: #22c55e;">"esta muito caro"</span> <span style="color: #f97316;">// obrigatorio</span>,</div>
          <div style="padding-left: 16px;">"tenant": <span style="color: #22c55e;">"papervines"</span></div>
          <div>}</div>
        </div>
        <div style="font-size: 13px;">
          <strong>Quando usar:</strong> Cliente diz "ta caro", "preciso pensar", "vou ver com meu socio", etc.
        </div>
      </div>

      <!-- Tool 3: get_script -->
      <div class="tool-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-bottom: 16px; border-left: 4px solid var(--secondary);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
          <div>
            <h4 style="margin: 0; color: var(--secondary);"><i class="fas fa-comment-dots"></i> get_script</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Scripts de vendas por situacao</p>
          </div>
          <span class="badge badge-success">Mensagens</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px;">
          <div>{</div>
          <div style="padding-left: 16px;">"situation": <span style="color: #22c55e;">"primeiro_contato|followup|fechamento|qualificacao"</span> <span style="color: #f97316;">// obrigatorio</span>,</div>
          <div style="padding-left: 16px;">"tenant": <span style="color: #22c55e;">"papervines"</span></div>
          <div>}</div>
        </div>
        <div style="font-size: 13px;">
          <strong>Quando usar:</strong> Precisa de mensagem pronta para enviar ao cliente
        </div>
      </div>

      <!-- Tool 4: get_pricing -->
      <div class="tool-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-bottom: 16px; border-left: 4px solid var(--accent);">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
          <div>
            <h4 style="margin: 0; color: var(--accent);"><i class="fas fa-dollar-sign"></i> get_pricing</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Informacoes de precos e planos</p>
          </div>
          <span class="badge" style="background: var(--accent); color: white;">Precos</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px;">
          <div>{</div>
          <div style="padding-left: 16px;">"product": <span style="color: #22c55e;">"essential|pro|plus|advanced|all"</span>,</div>
          <div style="padding-left: 16px;">"tenant": <span style="color: #22c55e;">"papervines"</span> <span style="color: #f97316;">// obrigatorio</span></div>
          <div>}</div>
        </div>
        <div style="font-size: 13px;">
          <strong>Quando usar:</strong> Cliente pergunta valores, precisa montar proposta
        </div>
      </div>

      <!-- Tool 5: list_topics -->
      <div class="tool-card" style="border: 1px solid var(--border); border-radius: 8px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #6366f1;">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
          <div>
            <h4 style="margin: 0; color: #6366f1;"><i class="fas fa-list"></i> list_topics</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Lista categorias e topicos disponiveis</p>
          </div>
          <span class="badge" style="background: #6366f1; color: white;">Meta</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px;">
          <div>{</div>
          <div style="padding-left: 16px;">"tenant": <span style="color: #22c55e;">"papervines"</span></div>
          <div>}</div>
        </div>
        <div style="font-size: 13px;">
          <strong>Quando usar:</strong> Descobrir o que esta disponivel no playbook
        </div>
      </div>
    </div>

    <!-- Exemplos de Uso Section -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-code"></i> Exemplos de Uso</h3>
        <a href="/documentacao/scripts" class="btn btn-sm btn-primary"><i class="fas fa-external-link-alt"></i> Ver Mais</a>
      </div>

      <div class="accordion-group">
        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-terminal"></i> cURL - Busca Simples</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <div class="code-block" style="position: relative;">
                <button onclick="copyCode(this)" class="btn btn-sm" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.1);">
                  <i class="fas fa-copy"></i>
                </button>
                <pre style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; overflow-x: auto; margin: 0;">curl -X POST https://vendas.papervines.digital/mcp/execute \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool": "search_playbook",
    "parameters": {
      "query": "como fazer follow-up com cliente",
      "tenant": "papervines"
    }
  }'</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-terminal"></i> cURL - Buscar Objecao</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <div class="code-block" style="position: relative;">
                <button onclick="copyCode(this)" class="btn btn-sm" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.1);">
                  <i class="fas fa-copy"></i>
                </button>
                <pre style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; overflow-x: auto; margin: 0;">curl -X POST https://vendas.papervines.digital/mcp/execute \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool": "get_objection_response",
    "parameters": {
      "objection": "preciso pensar antes de decidir"
    }
  }'</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fab fa-js-square"></i> JavaScript - Fetch API</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <div class="code-block" style="position: relative;">
                <button onclick="copyCode(this)" class="btn btn-sm" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.1);">
                  <i class="fas fa-copy"></i>
                </button>
                <pre style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; overflow-x: auto; margin: 0;">const response = await fetch('https://vendas.papervines.digital/mcp/execute', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    tool: 'search_playbook',
    parameters: {
      query: 'quais sao os planos disponiveis',
      category: 'precos'
    }
  })
});

const data = await response.json();
console.log(data.result.answer);</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fab fa-python"></i> Python - Requests</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <div class="code-block" style="position: relative;">
                <button onclick="copyCode(this)" class="btn btn-sm" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.1);">
                  <i class="fas fa-copy"></i>
                </button>
                <pre style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; overflow-x: auto; margin: 0;">import requests

response = requests.post(
    'https://vendas.papervines.digital/mcp/execute',
    json={
        'tool': 'get_script',
        'parameters': {
            'situation': 'primeiro_contato',
            'tenant': 'papervines'
        }
    }
)

data = response.json()
for script in data['result']['scripts']:
    print(f"- {script['title']}")</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-project-diagram"></i> n8n - HTTP Request Node</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <p style="margin-bottom: 12px;">Configure o node HTTP Request com:</p>
              <div class="table-container">
                <table style="font-size: 13px;">
                  <tr><td style="width: 150px;"><strong>Method</strong></td><td>POST</td></tr>
                  <tr><td><strong>URL</strong></td><td>https://vendas.papervines.digital/mcp/execute</td></tr>
                  <tr><td><strong>Body Content Type</strong></td><td>JSON</td></tr>
                  <tr><td><strong>Body</strong></td><td><code>{"tool":"search_playbook","parameters":{"query":"{{$json.pergunta}}"}}</code></td></tr>
                </table>
              </div>
              <p style="margin-top: 12px; color: var(--text-secondary); font-size: 13px;">
                <i class="fas fa-lightbulb" style="color: var(--warning);"></i>
                Use <code>$json.result.answer</code> para acessar a resposta
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Integracao com IAs Section -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-robot"></i> Integracao com IAs</h3>
      </div>

      <div class="grid grid-2">
        <div style="border: 1px solid var(--border); border-radius: 8px; padding: 20px;">
          <h4 style="margin: 0 0 12px;"><i class="fab fa-whatsapp" style="color: #25D366;"></i> WhatsApp Bot</h4>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">
            Configure seu bot para consultar o playbook antes de responder ao cliente.
          </p>
          <div style="background: var(--border-light); padding: 12px; border-radius: 6px; font-size: 13px;">
            <strong>Fluxo sugerido:</strong>
            <ol style="margin: 8px 0 0 20px; padding: 0;">
              <li>Recebe mensagem do cliente</li>
              <li>Chama <code>search_playbook</code> com a duvida</li>
              <li>Usa resposta como contexto para a IA</li>
              <li>Gera resposta personalizada</li>
            </ol>
          </div>
        </div>

        <div style="border: 1px solid var(--border); border-radius: 8px; padding: 20px;">
          <h4 style="margin: 0 0 12px;"><i class="fas fa-headset" style="color: var(--primary);"></i> Agente de Vendas</h4>
          <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 16px;">
            Crie um agente que conhece todo o playbook e pode auxiliar vendedores.
          </p>
          <div style="background: var(--border-light); padding: 12px; border-radius: 6px; font-size: 13px;">
            <strong>Ferramentas principais:</strong>
            <ul style="margin: 8px 0 0 20px; padding: 0;">
              <li><code>get_objection_response</code> - Objecoes</li>
              <li><code>get_script</code> - Mensagens prontas</li>
              <li><code>get_pricing</code> - Valores e planos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Troubleshooting Section -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-bug"></i> Troubleshooting</h3>
      </div>

      <div class="accordion-group">
        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-exclamation-circle" style="color: var(--error);"></i> Busca retorna vazio</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <p><strong>Possiveis causas:</strong></p>
              <ul style="margin-left: 20px; line-height: 1.8;">
                <li>Query muito especifica - tente termos mais genericos</li>
                <li>Categoria incorreta - remova o filtro de categoria</li>
                <li>Tenant incorreto - verifique se esta usando "papervines"</li>
                <li>Conteudo nao indexado - verifique se o arquivo existe em <code>src/data/tenants/</code></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-exclamation-circle" style="color: var(--error);"></i> Erro 500 no /mcp/execute</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <p><strong>Verifique:</strong></p>
              <ul style="margin-left: 20px; line-height: 1.8;">
                <li>Formato do JSON esta correto</li>
                <li>Campo "tool" esta presente</li>
                <li>Parametros obrigatorios estao preenchidos</li>
                <li>Teste o health check: <code>GET /mcp/health</code></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-exclamation-circle" style="color: var(--warning);"></i> Respostas com baixa relevancia</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <p><strong>Dicas para melhorar:</strong></p>
              <ul style="margin-left: 20px; line-height: 1.8;">
                <li>Use frases completas ao inves de palavras soltas</li>
                <li>Especifique a categoria quando souber: <code>"category": "objecoes"</code></li>
                <li>Para objecoes, use <code>get_objection_response</code> ao inves de <code>search_playbook</code></li>
                <li>Verifique o campo <code>confidence</code> na resposta (ideal > 0.5)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Links Uteis -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-link"></i> Links Uteis</h3>
      </div>

      <div class="grid grid-3">
        <a href="/documentacao/playground" class="feature-item" style="border-left-color: var(--primary); text-decoration: none;">
          <div class="feature-icon"><i class="fas fa-play"></i></div>
          <div>
            <div class="feature-title">Playground</div>
            <div class="feature-desc">Teste as ferramentas ao vivo</div>
          </div>
        </a>
        <a href="/documentacao/scripts" class="feature-item" style="border-left-color: var(--accent); text-decoration: none;">
          <div class="feature-icon" style="background: var(--accent);"><i class="fas fa-copy"></i></div>
          <div>
            <div class="feature-title">Scripts Prontos</div>
            <div class="feature-desc">Copie e cole no seu projeto</div>
          </div>
        </a>
        <a href="/documentacao/webhooks" class="feature-item" style="border-left-color: var(--secondary); text-decoration: none;">
          <div class="feature-icon" style="background: var(--secondary);"><i class="fas fa-sync"></i></div>
          <div>
            <div class="feature-title">Webhooks</div>
            <div class="feature-desc">Configurar reindexacao</div>
          </div>
        </a>
      </div>
    </div>

    <script>
      function copyCode(button) {
        const pre = button.parentElement.querySelector('pre');
        navigator.clipboard.writeText(pre.textContent);
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      }
    </script>
  `;

  return layout('Documentacao Tecnica', content, 'documentacao');
}

function renderPlayground() {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-play-circle"></i> Playground MCP</h1>
      <p class="page-subtitle">Teste as ferramentas do MCP diretamente no navegador</p>
    </div>

    <div class="grid grid-2" style="margin-bottom: 24px;">
      <!-- Input Panel -->
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-keyboard"></i> Configurar Request</h3>
        </div>

        <div class="form-group">
          <label class="form-label">Ferramenta</label>
          <select id="toolSelect" class="form-select" onchange="updateParams()">
            <option value="search_playbook">search_playbook - Busca geral</option>
            <option value="get_objection_response">get_objection_response - Objecoes</option>
            <option value="get_script">get_script - Scripts de vendas</option>
            <option value="get_pricing">get_pricing - Precos e planos</option>
            <option value="list_topics">list_topics - Listar topicos</option>
          </select>
        </div>

        <div id="queryGroup" class="form-group">
          <label class="form-label">Query / Pergunta</label>
          <input type="text" id="queryInput" class="form-input" placeholder="Ex: como qualificar um lead">
        </div>

        <div id="objectionGroup" class="form-group" style="display: none;">
          <label class="form-label">Objecao do Cliente</label>
          <input type="text" id="objectionInput" class="form-input" placeholder="Ex: esta muito caro">
        </div>

        <div id="situationGroup" class="form-group" style="display: none;">
          <label class="form-label">Situacao</label>
          <select id="situationSelect" class="form-select">
            <option value="primeiro_contato">Primeiro Contato</option>
            <option value="followup">Follow-up</option>
            <option value="qualificacao">Qualificacao</option>
            <option value="fechamento">Fechamento</option>
          </select>
        </div>

        <div id="categoryGroup" class="form-group">
          <label class="form-label">Categoria (opcional)</label>
          <select id="categorySelect" class="form-select">
            <option value="">Todas</option>
            <option value="playbook">Playbook</option>
            <option value="objecoes">Objecoes</option>
            <option value="scripts">Scripts</option>
            <option value="precos">Precos</option>
            <option value="agentes">Agentes</option>
          </select>
        </div>

        <button onclick="executeTest()" class="btn btn-primary" style="width: 100%; margin-top: 16px;">
          <i class="fas fa-play"></i> Executar
        </button>
      </div>

      <!-- Output Panel -->
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-terminal"></i> Resposta</h3>
          <span id="statusBadge" class="badge badge-secondary">Aguardando...</span>
        </div>

        <div id="loadingIndicator" style="display: none; text-align: center; padding: 40px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 32px; color: var(--primary);"></i>
          <p style="margin-top: 12px; color: var(--text-secondary);">Processando...</p>
        </div>

        <div id="responseOutput" style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; min-height: 200px; max-height: 400px; overflow: auto; white-space: pre-wrap;">
// A resposta aparecera aqui
        </div>

        <div id="statsPanel" style="display: none; margin-top: 16px; padding: 12px; background: var(--border-light); border-radius: 8px;">
          <div style="display: flex; gap: 24px; font-size: 13px;">
            <div><strong>Tempo:</strong> <span id="responseTime">-</span></div>
            <div><strong>Resultados:</strong> <span id="resultCount">-</span></div>
            <div><strong>Score:</strong> <span id="topScore">-</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Request Preview -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-code"></i> Request que sera enviado</h3>
        <button onclick="copyRequest()" class="btn btn-sm btn-secondary"><i class="fas fa-copy"></i> Copiar cURL</button>
      </div>
      <pre id="requestPreview" style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0;"></pre>
    </div>

    <!-- Exemplos Rapidos -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-bolt"></i> Exemplos Rapidos</h3>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <button onclick="loadExample('qualificacao')" class="btn btn-outline btn-sm">Como qualificar leads?</button>
        <button onclick="loadExample('preco')" class="btn btn-outline btn-sm">Cliente acha caro</button>
        <button onclick="loadExample('followup')" class="btn btn-outline btn-sm">Script de follow-up</button>
        <button onclick="loadExample('planos')" class="btn btn-outline btn-sm">Ver planos</button>
        <button onclick="loadExample('whatsapp')" class="btn btn-outline btn-sm">Politicas WhatsApp</button>
      </div>
    </div>

    <script>
      function updateParams() {
        const tool = document.getElementById('toolSelect').value;

        document.getElementById('queryGroup').style.display = 'none';
        document.getElementById('objectionGroup').style.display = 'none';
        document.getElementById('situationGroup').style.display = 'none';
        document.getElementById('categoryGroup').style.display = 'none';

        switch(tool) {
          case 'search_playbook':
            document.getElementById('queryGroup').style.display = 'block';
            document.getElementById('categoryGroup').style.display = 'block';
            break;
          case 'get_objection_response':
            document.getElementById('objectionGroup').style.display = 'block';
            break;
          case 'get_script':
            document.getElementById('situationGroup').style.display = 'block';
            break;
          case 'get_pricing':
            // sem parametros especificos
            break;
          case 'list_topics':
            // sem parametros
            break;
        }

        updateRequestPreview();
      }

      function getRequestBody() {
        const tool = document.getElementById('toolSelect').value;
        const body = { tool, parameters: { tenant: 'papervines' } };

        switch(tool) {
          case 'search_playbook':
            body.parameters.query = document.getElementById('queryInput').value || 'exemplo de busca';
            const category = document.getElementById('categorySelect').value;
            if (category) body.parameters.category = category;
            break;
          case 'get_objection_response':
            body.parameters.objection = document.getElementById('objectionInput').value || 'esta muito caro';
            break;
          case 'get_script':
            body.parameters.situation = document.getElementById('situationSelect').value;
            break;
        }

        return body;
      }

      function updateRequestPreview() {
        const body = getRequestBody();
        const preview = \`curl -X POST https://vendas.papervines.digital/mcp/execute \\\\
  -H "Content-Type: application/json" \\\\
  -d '\${JSON.stringify(body, null, 2)}'\`;
        document.getElementById('requestPreview').textContent = preview;
      }

      // Update preview on input
      document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', updateRequestPreview);
        el.addEventListener('change', updateRequestPreview);
      });

      async function executeTest() {
        const loadingEl = document.getElementById('loadingIndicator');
        const outputEl = document.getElementById('responseOutput');
        const statusEl = document.getElementById('statusBadge');
        const statsEl = document.getElementById('statsPanel');

        loadingEl.style.display = 'block';
        outputEl.style.display = 'none';
        statsEl.style.display = 'none';
        statusEl.className = 'badge badge-warning';
        statusEl.textContent = 'Executando...';

        const startTime = Date.now();

        try {
          const body = getRequestBody();

          const response = await fetch('/mcp/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });

          const data = await response.json();
          const elapsed = Date.now() - startTime;

          loadingEl.style.display = 'none';
          outputEl.style.display = 'block';
          outputEl.textContent = JSON.stringify(data, null, 2);

          if (data.success) {
            statusEl.className = 'badge badge-success';
            statusEl.textContent = 'Sucesso';

            statsEl.style.display = 'block';
            document.getElementById('responseTime').textContent = elapsed + 'ms';
            document.getElementById('resultCount').textContent = data.result?.sources?.length || data.result?.scripts?.length || '-';
            document.getElementById('topScore').textContent = data.result?.confidence?.toFixed(2) || data.result?.sources?.[0]?.score?.toFixed(2) || '-';
          } else {
            statusEl.className = 'badge badge-error';
            statusEl.textContent = 'Erro';
          }
        } catch (error) {
          loadingEl.style.display = 'none';
          outputEl.style.display = 'block';
          outputEl.textContent = 'Erro: ' + error.message;
          statusEl.className = 'badge badge-error';
          statusEl.textContent = 'Erro';
        }
      }

      function copyRequest() {
        const preview = document.getElementById('requestPreview').textContent;
        navigator.clipboard.writeText(preview);
        showToast('cURL copiado!', 'success');
      }

      function loadExample(type) {
        switch(type) {
          case 'qualificacao':
            document.getElementById('toolSelect').value = 'search_playbook';
            updateParams();
            document.getElementById('queryInput').value = 'como qualificar um lead corretamente';
            break;
          case 'preco':
            document.getElementById('toolSelect').value = 'get_objection_response';
            updateParams();
            document.getElementById('objectionInput').value = 'esta muito caro para mim';
            break;
          case 'followup':
            document.getElementById('toolSelect').value = 'get_script';
            updateParams();
            document.getElementById('situationSelect').value = 'followup';
            break;
          case 'planos':
            document.getElementById('toolSelect').value = 'get_pricing';
            updateParams();
            break;
          case 'whatsapp':
            document.getElementById('toolSelect').value = 'search_playbook';
            updateParams();
            document.getElementById('queryInput').value = 'politicas do whatsapp business api';
            break;
        }
        updateRequestPreview();
      }

      // Initialize
      updateParams();
    </script>
  `;

  return layout('Playground MCP', content, 'documentacao');
}

function renderScriptsExemplos() {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-copy"></i> Scripts Prontos</h1>
      <p class="page-subtitle">Copie e cole esses exemplos nos seus projetos</p>
    </div>

    <!-- JavaScript/Node.js -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fab fa-js-square" style="color: #f7df1e;"></i> JavaScript / Node.js</h3>
        <button onclick="copyScript('js-complete')" class="btn btn-sm btn-secondary"><i class="fas fa-copy"></i> Copiar</button>
      </div>
      <pre id="js-complete" style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0;">/**
 * Cliente MCP para Playbook Paper Vines
 * Uso: const mcp = new PlaybookMCP(); await mcp.search('sua pergunta');
 */
class PlaybookMCP {
  constructor(baseUrl = 'https://vendas.papervines.digital') {
    this.baseUrl = baseUrl;
    this.tenant = 'papervines';
  }

  async execute(tool, parameters = {}) {
    const response = await fetch(\`\${this.baseUrl}/mcp/execute\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tool,
        parameters: { tenant: this.tenant, ...parameters }
      })
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.result;
  }

  // Busca geral no playbook
  async search(query, category = null) {
    return this.execute('search_playbook', { query, category });
  }

  // Tratativa para objecao
  async getObjection(objection) {
    return this.execute('get_objection_response', { objection });
  }

  // Scripts de vendas
  async getScript(situation) {
    return this.execute('get_script', { situation });
  }

  // Informacoes de precos
  async getPricing(product = 'all') {
    return this.execute('get_pricing', { product });
  }

  // Listar topicos disponiveis
  async listTopics() {
    return this.execute('list_topics', {});
  }
}

// Exemplo de uso:
// const mcp = new PlaybookMCP();
// const result = await mcp.search('como fazer follow-up');
// console.log(result.answer);

module.exports = { PlaybookMCP };</pre>
    </div>

    <!-- Python -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fab fa-python" style="color: #3776ab;"></i> Python</h3>
        <button onclick="copyScript('python-complete')" class="btn btn-sm btn-secondary"><i class="fas fa-copy"></i> Copiar</button>
      </div>
      <pre id="python-complete" style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0;">"""
Cliente MCP para Playbook Paper Vines
Uso: mcp = PlaybookMCP(); result = mcp.search('sua pergunta')
"""
import requests
from typing import Optional, Dict, Any

class PlaybookMCP:
    def __init__(self, base_url: str = 'https://vendas.papervines.digital'):
        self.base_url = base_url
        self.tenant = 'papervines'

    def execute(self, tool: str, parameters: Dict[str, Any] = None) -> Dict:
        """Executa uma ferramenta MCP"""
        if parameters is None:
            parameters = {}

        parameters['tenant'] = self.tenant

        response = requests.post(
            f'{self.base_url}/mcp/execute',
            json={'tool': tool, 'parameters': parameters}
        )

        data = response.json()
        if not data.get('success'):
            raise Exception(data.get('error', 'Unknown error'))

        return data['result']

    def search(self, query: str, category: Optional[str] = None) -> Dict:
        """Busca geral no playbook"""
        params = {'query': query}
        if category:
            params['category'] = category
        return self.execute('search_playbook', params)

    def get_objection(self, objection: str) -> Dict:
        """Tratativa para objecao de cliente"""
        return self.execute('get_objection_response', {'objection': objection})

    def get_script(self, situation: str) -> Dict:
        """Scripts de vendas por situacao"""
        return self.execute('get_script', {'situation': situation})

    def get_pricing(self, product: str = 'all') -> Dict:
        """Informacoes de precos"""
        return self.execute('get_pricing', {'product': product})

    def list_topics(self) -> Dict:
        """Lista topicos disponiveis"""
        return self.execute('list_topics')


# Exemplo de uso:
if __name__ == '__main__':
    mcp = PlaybookMCP()

    # Buscar informacao
    result = mcp.search('como qualificar um lead')
    print(f"Encontrado: {result['found']}")
    print(f"Resposta: {result['answer'][:200]}...")

    # Tratar objecao
    objection = mcp.get_objection('esta muito caro')
    for suggestion in objection.get('suggestions', []):
        print(f"- {suggestion['content'][:100]}...")</pre>
    </div>

    <!-- n8n Workflow -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-project-diagram" style="color: #ff6d5a;"></i> n8n - Workflow Completo</h3>
        <button onclick="copyScript('n8n-workflow')" class="btn btn-sm btn-secondary"><i class="fas fa-copy"></i> Copiar JSON</button>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 16px;">
        Importe este JSON no n8n para ter um workflow pronto para consultar o playbook.
      </p>
      <pre id="n8n-workflow" style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0; max-height: 300px;">{
  "name": "Playbook MCP - Consulta",
  "nodes": [
    {
      "parameters": {
        "method": "POST",
        "url": "https://vendas.papervines.digital/mcp/execute",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={{ JSON.stringify({ tool: 'search_playbook', parameters: { query: $json.pergunta, tenant: 'papervines' }}) }}"
      },
      "name": "Consultar Playbook",
      "type": "n8n-nodes-base.httpRequest",
      "position": [450, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "resposta",
              "value": "={{ $json.result.answer }}"
            },
            {
              "name": "encontrado",
              "value": "={{ $json.result.found }}"
            },
            {
              "name": "confianca",
              "value": "={{ $json.result.confidence }}"
            }
          ]
        }
      },
      "name": "Formatar Resposta",
      "type": "n8n-nodes-base.set",
      "position": [650, 300]
    }
  ],
  "connections": {
    "Consultar Playbook": {
      "main": [[{ "node": "Formatar Resposta", "type": "main", "index": 0 }]]
    }
  }
}</pre>
    </div>

    <!-- Integracao Claude -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-brain" style="color: #8b5cf6;"></i> Integracao com Claude (Anthropic)</h3>
        <button onclick="copyScript('claude-integration')" class="btn btn-sm btn-secondary"><i class="fas fa-copy"></i> Copiar</button>
      </div>
      <pre id="claude-integration" style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0;">import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

// Funcao para buscar contexto no playbook
async function getPlaybookContext(query) {
  const response = await fetch('https://vendas.papervines.digital/mcp/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tool: 'search_playbook',
      parameters: { query, tenant: 'papervines' }
    })
  });

  const data = await response.json();
  return data.result?.answer || 'Nenhuma informacao encontrada.';
}

// Funcao principal - responde usando contexto do playbook
async function respondWithPlaybook(userMessage) {
  // 1. Busca contexto relevante
  const context = await getPlaybookContext(userMessage);

  // 2. Monta prompt com contexto
  const systemPrompt = \`Voce e um assistente de vendas da Paper Vines.
Use APENAS as informacoes do contexto abaixo para responder.
Se a informacao nao estiver no contexto, diga que nao tem essa informacao.

CONTEXTO DO PLAYBOOK:
\${context}\`;

  // 3. Chama Claude
  const message = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }]
  });

  return message.content[0].text;
}

// Exemplo:
// const resposta = await respondWithPlaybook('Como devo responder quando o cliente diz que esta caro?');
// console.log(resposta);</pre>
    </div>

    <!-- Webhook Handler -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-bolt" style="color: #f59e0b;"></i> Handler para Webhook (Express)</h3>
        <button onclick="copyScript('webhook-handler')" class="btn btn-sm btn-secondary"><i class="fas fa-copy"></i> Copiar</button>
      </div>
      <pre id="webhook-handler" style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0;">const express = require('express');
const { PlaybookMCP } = require('./playbook-mcp'); // Usando a classe anterior

const app = express();
app.use(express.json());

const mcp = new PlaybookMCP();

// Endpoint para receber mensagens (ex: de um chatbot)
app.post('/webhook/message', async (req, res) => {
  try {
    const { message, type } = req.body;

    let result;

    // Detecta tipo de consulta
    if (type === 'objection' || message.toLowerCase().includes('caro') || message.toLowerCase().includes('pensar')) {
      // Tratativa de objecao
      result = await mcp.getObjection(message);
    } else if (type === 'script') {
      // Busca script especifico
      result = await mcp.getScript(message);
    } else {
      // Busca geral
      result = await mcp.search(message);
    }

    res.json({
      success: true,
      found: result.found,
      response: result.answer || result.suggestions?.[0]?.content || 'Sem resposta',
      confidence: result.confidence || result.suggestions?.[0]?.confidence
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Webhook handler rodando na porta 3000'));</pre>
    </div>

    <script>
      function copyScript(id) {
        const pre = document.getElementById(id);
        navigator.clipboard.writeText(pre.textContent);
        showToast('Script copiado!', 'success');
      }
    </script>
  `;

  return layout('Scripts Prontos', content, 'documentacao');
}

function renderWebhooks() {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-sync"></i> Configuracao de Webhooks</h1>
      <p class="page-subtitle">Mantenha o conteudo indexado sempre atualizado</p>
    </div>

    <!-- GitHub Webhook -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fab fa-github"></i> Webhook do GitHub</h3>
        <span class="badge badge-success">CONFIGURADO</span>
      </div>

      <p style="color: var(--text-secondary); margin-bottom: 16px;">
        O sistema esta configurado para reindexar automaticamente quando arquivos sao modificados no repositorio.
      </p>

      <div class="table-container" style="margin-bottom: 24px;">
        <table>
          <tr>
            <td style="width: 200px;"><strong>URL do Webhook</strong></td>
            <td><code>https://vendas.papervines.digital/index/webhook</code></td>
          </tr>
          <tr>
            <td><strong>Content Type</strong></td>
            <td><code>application/json</code></td>
          </tr>
          <tr>
            <td><strong>Eventos</strong></td>
            <td>Push events</td>
          </tr>
          <tr>
            <td><strong>Branch</strong></td>
            <td>main</td>
          </tr>
          <tr>
            <td><strong>Arquivos Monitorados</strong></td>
            <td><code>src/data/tenants/*/</code></td>
          </tr>
        </table>
      </div>

      <div class="accordion-group">
        <div class="accordion">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span><i class="fas fa-cogs"></i> Como configurar no GitHub</span>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="padding: 16px 0;">
              <ol style="margin-left: 20px; line-height: 2;">
                <li>Acesse o repositorio no GitHub</li>
                <li>Va em <strong>Settings</strong> > <strong>Webhooks</strong></li>
                <li>Clique em <strong>Add webhook</strong></li>
                <li>Preencha os campos:
                  <ul style="margin: 8px 0 8px 20px;">
                    <li>Payload URL: <code>https://vendas.papervines.digital/index/webhook</code></li>
                    <li>Content type: <code>application/json</code></li>
                    <li>Secret: (configurado no Cloudflare)</li>
                    <li>Events: Just the push event</li>
                  </ul>
                </li>
                <li>Clique em <strong>Add webhook</strong></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Manual Reindex -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-redo"></i> Reindexacao Manual</h3>
      </div>

      <p style="color: var(--text-secondary); margin-bottom: 16px;">
        Use o endpoint abaixo para forcar uma reindexacao manual quando necessario.
      </p>

      <div style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; margin-bottom: 16px;">
        <div style="color: #94a3b8;"># Reindexar todos os arquivos do tenant</div>
        <div>curl -X POST https://vendas.papervines.digital/index/manual \\</div>
        <div style="padding-left: 20px;">-H "Content-Type: application/json" \\</div>
        <div style="padding-left: 20px;">-d '{"tenant": "papervines", "fullReindex": true}'</div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Parametro</th>
              <th>Tipo</th>
              <th>Descricao</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>tenant</code></td>
              <td>string</td>
              <td>ID do tenant (padrao: papervines)</td>
            </tr>
            <tr>
              <td><code>fullReindex</code></td>
              <td>boolean</td>
              <td>Se true, reindexa todos os arquivos</td>
            </tr>
            <tr>
              <td><code>files</code></td>
              <td>array</td>
              <td>Lista de arquivos especificos para reindexar</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button onclick="triggerReindex()" class="btn btn-primary" style="margin-top: 16px;">
        <i class="fas fa-sync"></i> Disparar Reindexacao Agora
      </button>
      <div id="reindexResult" style="margin-top: 16px; display: none;"></div>
    </div>

    <!-- Arquivos Monitorados -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-folder-open"></i> Arquivos Monitorados</h3>
      </div>

      <p style="color: var(--text-secondary); margin-bottom: 16px;">
        Qualquer modificacao nesses arquivos dispara a reindexacao automatica:
      </p>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Arquivo</th>
              <th>Categoria</th>
              <th>Conteudo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>src/data/tenants/papervines/playbook.js</code></td>
              <td><span class="badge badge-purple">playbook</span></td>
              <td>Processo de vendas, etapas</td>
            </tr>
            <tr>
              <td><code>src/data/tenants/papervines/playbook-expandido.js</code></td>
              <td><span class="badge badge-info">playbook-expandido</span></td>
              <td>Politicas, requisitos API</td>
            </tr>
            <tr>
              <td><code>src/data/tenants/papervines/objecoes.js</code></td>
              <td><span class="badge badge-warning">objecoes</span></td>
              <td>Tratativas de objecoes</td>
            </tr>
            <tr>
              <td><code>src/data/tenants/papervines/scripts.js</code></td>
              <td><span class="badge badge-success">scripts</span></td>
              <td>Mensagens prontas</td>
            </tr>
            <tr>
              <td><code>src/data/tenants/papervines/precos.js</code></td>
              <td><span class="badge" style="background: var(--accent); color: white;">precos</span></td>
              <td>Planos e valores</td>
            </tr>
            <tr>
              <td><code>src/data/tenants/papervines/agentes.js</code></td>
              <td><span class="badge" style="background: #6366f1; color: white;">agentes</span></td>
              <td>Informacoes de agentes IA</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <script>
      async function triggerReindex() {
        const resultDiv = document.getElementById('reindexResult');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<div style="color: var(--primary);"><i class="fas fa-spinner fa-spin"></i> Reindexando...</div>';

        try {
          const response = await fetch('/index/manual', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tenant: 'papervines', fullReindex: true })
          });

          const data = await response.json();

          if (data.success) {
            resultDiv.innerHTML = \`
              <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid var(--success); padding: 12px; border-radius: 8px;">
                <strong style="color: var(--success);"><i class="fas fa-check-circle"></i> Reindexacao concluida!</strong>
                <div style="margin-top: 8px; font-size: 13px;">
                  Arquivos processados: \${data.results?.length || 0}
                </div>
              </div>
            \`;
          } else {
            throw new Error(data.error || 'Erro desconhecido');
          }
        } catch (error) {
          resultDiv.innerHTML = \`
            <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid var(--error); padding: 12px; border-radius: 8px;">
              <strong style="color: var(--error);"><i class="fas fa-exclamation-circle"></i> Erro na reindexacao</strong>
              <div style="margin-top: 8px; font-size: 13px;">\${error.message}</div>
            </div>
          \`;
        }
      }
    </script>
  `;

  return layout('Configuracao de Webhooks', content, 'documentacao');
}
