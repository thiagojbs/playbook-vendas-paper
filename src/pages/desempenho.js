import { layout } from '../templates/layout.js';

// Dados do funil de vendas padrão
const FUNIL_PADRAO = {
  etapas: [
    { id: 'smart_leads', nome: 'Smart Leads', conversao: null },
    { id: 'conectados', nome: 'Conectados', conversao: 0.30 },
    { id: 'mql', nome: 'MQL', conversao: 0.10 },
    { id: 'sql', nome: 'SQL', conversao: 0.60 },
    { id: 'acontecidas', nome: 'Reuniões Acontecidas', conversao: 0.85 },
    { id: 'vendas', nome: 'Vendas', conversao: 0.20 }
  ]
};

const DIAS_SEMANA = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export async function renderDesempenho(env, path) {
  if (path === '/desempenho/planejamento') {
    return renderPlanejamento(env);
  } else if (path === '/desempenho/acompanhamento') {
    return renderAcompanhamento(env);
  } else if (path === '/desempenho/relatorio') {
    return renderRelatorio(env);
  } else if (path === '/desempenho/crm') {
    return renderCRM(env);
  }
  return renderDesempenhoHome(env);
}

function renderDesempenhoHome(env) {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-chart-line"></i> Desempenho do Vendedor</h1>
      <p class="page-subtitle">Planejamento, acompanhamento diário e dados do CRM em tempo real</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card purple">
        <div class="stat-value"><i class="fas fa-bullseye"></i></div>
        <div class="stat-label">Planejamento de Metas</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-value"><i class="fas fa-calendar-check"></i></div>
        <div class="stat-label">Acompanhamento Diário</div>
      </div>
      <div class="stat-card green">
        <div class="stat-value"><i class="fas fa-chart-bar"></i></div>
        <div class="stat-label">Relatório Mensal</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-value"><i class="fas fa-database"></i></div>
        <div class="stat-label">CRM em Tempo Real</div>
      </div>
    </div>

    <div class="grid grid-2" style="margin-bottom: 24px;">
      <a href="/desempenho/planejamento" class="card fade-in" style="text-decoration: none; color: inherit; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-bullseye"></i> Planejamento</h3>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px;">
          Configure suas metas do funil de vendas. Defina quantos leads, conexões, MQLs, SQLs e vendas você precisa para atingir seus objetivos.
        </p>
        <div class="feature-item" style="border-left-color: var(--primary);">
          <div class="feature-icon"><i class="fas fa-arrow-right"></i></div>
          <div>
            <div class="feature-title">Calcular Metas</div>
            <div class="feature-desc">Semanal e mensal automaticamente</div>
          </div>
        </div>
      </a>

      <a href="/desempenho/acompanhamento" class="card fade-in" style="text-decoration: none; color: inherit; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-calendar-check"></i> Acompanhamento</h3>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px;">
          Registre suas atividades diárias: ligações, conexões, tempo em ligação, MQLs, no-shows e reuniões realizadas.
        </p>
        <div class="feature-item" style="border-left-color: var(--accent);">
          <div class="feature-icon" style="background: var(--accent);"><i class="fas fa-arrow-right"></i></div>
          <div>
            <div class="feature-title">Registrar Atividades</div>
            <div class="feature-desc">Acompanhamento semanal completo</div>
          </div>
        </div>
      </a>
    </div>

    <div class="grid grid-2">
      <a href="/desempenho/relatorio" class="card fade-in" style="text-decoration: none; color: inherit; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-chart-bar"></i> Relatório</h3>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px;">
          Visualize seu progresso mensal com métricas de conversão em cada etapa do funil e comparativo de desempenho.
        </p>
        <div class="feature-item" style="border-left-color: var(--secondary);">
          <div class="feature-icon" style="background: var(--secondary);"><i class="fas fa-arrow-right"></i></div>
          <div>
            <div class="feature-title">Ver Relatórios</div>
            <div class="feature-desc">Métricas e conversões detalhadas</div>
          </div>
        </div>
      </a>

      <a href="/desempenho/crm" class="card fade-in" style="text-decoration: none; color: inherit; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(16, 185, 129, 0.05)); border: 2px solid var(--primary);">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-database"></i> CRM em Tempo Real</h3>
          <span class="badge badge-success">NOVO</span>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px;">
          Acompanhe os dados do seu funil de vendas diretamente do CRM Paper Vines. Veja cards, etapas e conversões em tempo real.
        </p>
        <div class="feature-item" style="border-left-color: var(--primary);">
          <div class="feature-icon"><i class="fas fa-sync"></i></div>
          <div>
            <div class="feature-title">Dados Sincronizados</div>
            <div class="feature-desc">Integração direta com CRM</div>
          </div>
        </div>
      </a>
    </div>

    <div class="card fade-in" style="margin-top: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-info-circle"></i> Como funciona o Funil de Vendas</h3>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Etapa</th>
              <th>Descrição</th>
              <th>Taxa de Conversão Padrão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge badge-purple">Smart Leads</span></td>
              <td>Leads qualificados para prospecção</td>
              <td>-</td>
            </tr>
            <tr>
              <td><span class="badge badge-info">Conectados</span></td>
              <td>Leads que atenderam a ligação</td>
              <td>30%</td>
            </tr>
            <tr>
              <td><span class="badge badge-warning">MQL</span></td>
              <td>Marketing Qualified Lead - Demonstrou interesse</td>
              <td>10%</td>
            </tr>
            <tr>
              <td><span class="badge badge-success">SQL</span></td>
              <td>Sales Qualified Lead - Reunião agendada</td>
              <td>60%</td>
            </tr>
            <tr>
              <td><span class="badge badge-info">Acontecidas</span></td>
              <td>Reuniões que realmente aconteceram</td>
              <td>85%</td>
            </tr>
            <tr>
              <td><span class="badge badge-success">Vendas</span></td>
              <td>Contratos fechados</td>
              <td>20%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  return layout('Desempenho', content, 'desempenho');
}

function renderCRM(env) {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-database"></i> CRM em Tempo Real</h1>
      <p class="page-subtitle">Dados sincronizados diretamente do CRM Paper Vines</p>
    </div>

    <!-- Status de Conexão -->
    <div class="card fade-in" style="margin-bottom: 24px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(16, 185, 129, 0.08)); border-left: 4px solid var(--primary);">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div id="statusIcon" style="width: 12px; height: 12px; background: #f59e0b; border-radius: 50%; animation: pulse 2s infinite;"></div>
          <span id="statusText" style="font-weight: 500;">Conectando ao CRM...</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="carregarDadosCRM()">
          <i class="fas fa-sync-alt"></i> Atualizar
        </button>
      </div>
    </div>

    <!-- Cards de Resumo -->
    <div class="stats-grid" id="resumoCRM">
      <div class="stat-card purple">
        <div class="stat-value" id="totalCards">-</div>
        <div class="stat-label">Total de Cards</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-value" id="cardsHoje">-</div>
        <div class="stat-label">Novos Hoje</div>
      </div>
      <div class="stat-card green">
        <div class="stat-value" id="cardsSemana">-</div>
        <div class="stat-label">Esta Semana</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-value" id="cardsMes">-</div>
        <div class="stat-label">Este Mês</div>
      </div>
    </div>

    <!-- Funil Visual -->
    <div class="card fade-in" style="margin-top: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-filter"></i> Funil de Vendas</h3>
        <span class="badge badge-info" id="ultimaAtualizacao">-</span>
      </div>
      <div id="funilContainer" style="padding: 20px 0;">
        <div style="text-align: center; padding: 60px; color: var(--text-secondary);">
          <i class="fas fa-spinner fa-spin" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
          <p>Carregando dados do funil...</p>
        </div>
      </div>
    </div>

    <!-- Tabela de Etapas -->
    <div class="card fade-in" style="margin-top: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-list"></i> Etapas do Funil</h3>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Etapa</th>
              <th>Cards</th>
              <th>Valor Total</th>
              <th>% do Funil</th>
            </tr>
          </thead>
          <tbody id="tabelaEtapas">
            <tr>
              <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fas fa-spinner fa-spin"></i> Carregando...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Taxas de Conversão -->
    <div class="grid grid-2" style="margin-top: 24px;">
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-percentage"></i> Taxas de Conversão</h3>
        </div>
        <div id="taxasConversaoCRM">
          <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px;"></i>
            <p>Calculando...</p>
          </div>
        </div>
      </div>

      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-chart-pie"></i> Distribuição do Funil</h3>
        </div>
        <div id="distribuicaoFunil">
          <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px;"></i>
            <p>Calculando...</p>
          </div>
        </div>
      </div>
    </div>

    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .funil-step {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      .funil-bar {
        height: 48px;
        background: linear-gradient(135deg, var(--primary), #6366f1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        color: white;
        font-weight: 500;
        transition: all 0.3s;
        min-width: 120px;
      }
      .funil-bar:hover {
        transform: translateX(8px);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
      }
      .conversion-arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 0;
        color: var(--text-secondary);
        font-size: 13px;
      }
      .progress-bar {
        height: 8px;
        background: var(--bg-page);
        border-radius: 4px;
        overflow: hidden;
      }
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        border-radius: 4px;
        transition: width 0.5s ease;
      }
    </style>

    <script>
      let dadosCRM = null;

      async function carregarDadosCRM() {
        const statusIcon = document.getElementById('statusIcon');
        const statusText = document.getElementById('statusText');

        statusIcon.style.background = '#f59e0b';
        statusIcon.style.animation = 'pulse 1s infinite';
        statusText.textContent = 'Sincronizando com CRM...';

        try {
          const response = await fetch('/api/crm/metrics');
          const data = await response.json();

          if (data.success) {
            dadosCRM = data;
            statusIcon.style.background = '#10b981';
            statusIcon.style.animation = 'none';
            statusText.textContent = 'Conectado ao CRM Paper Vines';

            atualizarInterface(data);
          } else {
            throw new Error(data.error || 'Erro ao carregar dados');
          }
        } catch (error) {
          console.error('Erro:', error);
          statusIcon.style.background = '#ef4444';
          statusIcon.style.animation = 'none';
          statusText.textContent = 'Erro ao conectar: ' + error.message;

          // Mostrar erro na interface
          document.getElementById('funilContainer').innerHTML = \`
            <div style="text-align: center; padding: 40px; color: #ef4444;">
              <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px;"></i>
              <p>Não foi possível carregar os dados do CRM.</p>
              <p style="font-size: 13px; color: var(--text-secondary);">\${error.message}</p>
              <button class="btn btn-primary" onclick="carregarDadosCRM()" style="margin-top: 16px;">
                <i class="fas fa-redo"></i> Tentar Novamente
              </button>
            </div>
          \`;
        }
      }

      function atualizarInterface(data) {
        // Atualizar resumo
        document.getElementById('totalCards').textContent = data.summary.totalCards || 0;
        document.getElementById('cardsHoje').textContent = data.summary.cardsToday || 0;
        document.getElementById('cardsSemana').textContent = data.summary.cardsThisWeek || 0;
        document.getElementById('cardsMes').textContent = data.summary.cardsThisMonth || 0;

        // Atualizar timestamp
        const timestamp = new Date(data.timestamp);
        document.getElementById('ultimaAtualizacao').textContent = 'Atualizado: ' + timestamp.toLocaleTimeString('pt-BR');

        // Renderizar funil
        renderizarFunil(data.steps, data.summary.totalCards);

        // Renderizar tabela
        renderizarTabela(data.steps, data.summary.totalCards);

        // Renderizar conversões
        renderizarConversoes(data.conversions);

        // Renderizar distribuição
        renderizarDistribuicao(data.steps, data.summary.totalCards);
      }

      function renderizarFunil(steps, total) {
        if (!steps || steps.length === 0) {
          document.getElementById('funilContainer').innerHTML = \`
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
              <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
              <p>Nenhuma etapa encontrada no funil.</p>
            </div>
          \`;
          return;
        }

        const maxCount = Math.max(...steps.map(s => s.count), 1);
        const colors = ['#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899', '#10b981', '#6366f1', '#ef4444', '#14b8a6'];

        let html = '';
        steps.forEach((step, index) => {
          const width = Math.max((step.count / maxCount) * 100, 15);
          const color = colors[index % colors.length];

          html += \`
            <div class="funil-step">
              <div class="funil-bar" style="width: \${width}%; background: linear-gradient(135deg, \${color}, \${color}cc);">
                <span>\${step.title}</span>
                <span style="font-size: 20px; font-weight: 700;">\${step.count}</span>
              </div>
            </div>
          \`;

          // Adicionar seta de conversão
          if (index < steps.length - 1) {
            const nextStep = steps[index + 1];
            const convRate = step.count > 0 ? ((nextStep.count / step.count) * 100).toFixed(1) : 0;
            html += \`
              <div class="conversion-arrow">
                <i class="fas fa-arrow-down" style="margin-right: 8px;"></i>
                \${convRate}% conversão
              </div>
            \`;
          }
        });

        document.getElementById('funilContainer').innerHTML = html;
      }

      function renderizarTabela(steps, total) {
        if (!steps || steps.length === 0) {
          document.getElementById('tabelaEtapas').innerHTML = \`
            <tr>
              <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                Nenhuma etapa encontrada
              </td>
            </tr>
          \`;
          return;
        }

        const badges = ['badge-purple', 'badge-warning', 'badge-info', 'badge-success', 'badge-purple', 'badge-orange', 'badge-danger', 'badge-info'];

        let html = '';
        steps.forEach((step, index) => {
          const percent = total > 0 ? ((step.count / total) * 100).toFixed(1) : 0;
          const badge = badges[index % badges.length];

          html += \`
            <tr>
              <td>\${index + 1}</td>
              <td><span class="badge \${badge}">\${step.title}</span></td>
              <td><strong>\${step.count}</strong></td>
              <td>R$ \${(step.totalValue || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <div class="progress-bar" style="flex: 1;">
                    <div class="progress-fill" style="width: \${percent}%;"></div>
                  </div>
                  <span>\${percent}%</span>
                </div>
              </td>
            </tr>
          \`;
        });

        document.getElementById('tabelaEtapas').innerHTML = html;
      }

      function renderizarConversoes(conversions) {
        if (!conversions || conversions.length === 0) {
          document.getElementById('taxasConversaoCRM').innerHTML = \`
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
              Dados insuficientes para calcular conversões
            </div>
          \`;
          return;
        }

        const colors = ['purple', 'orange', 'green', 'blue', 'pink'];

        let html = '<div style="display: flex; flex-direction: column; gap: 12px;">';
        conversions.forEach((conv, index) => {
          const color = colors[index % colors.length];
          const rateClass = conv.rate >= 50 ? 'badge-success' : conv.rate >= 20 ? 'badge-warning' : 'badge-danger';

          html += \`
            <div class="req-item" style="padding: 12px;">
              <div class="req-icon \${color}"><i class="fas fa-arrow-right"></i></div>
              <div style="flex: 1;">
                <div style="font-weight: 500; font-size: 13px;">\${conv.from} → \${conv.to}</div>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                  <div class="progress-bar" style="flex: 1; height: 6px;">
                    <div class="progress-fill" style="width: \${Math.min(conv.rate, 100)}%;"></div>
                  </div>
                  <span class="badge \${rateClass}">\${conv.rate}%</span>
                </div>
              </div>
            </div>
          \`;
        });
        html += '</div>';

        document.getElementById('taxasConversaoCRM').innerHTML = html;
      }

      function renderizarDistribuicao(steps, total) {
        if (!steps || steps.length === 0 || total === 0) {
          document.getElementById('distribuicaoFunil').innerHTML = \`
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
              Dados insuficientes
            </div>
          \`;
          return;
        }

        const colors = ['#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899', '#10b981', '#6366f1'];

        let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
        steps.forEach((step, index) => {
          const percent = ((step.count / total) * 100).toFixed(1);
          const color = colors[index % colors.length];

          html += \`
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 12px; height: 12px; background: \${color}; border-radius: 3px;"></div>
              <div style="flex: 1; font-size: 13px;">\${step.title}</div>
              <div style="font-weight: 600;">\${step.count}</div>
              <div style="font-size: 12px; color: var(--text-secondary); width: 50px; text-align: right;">\${percent}%</div>
            </div>
          \`;
        });
        html += '</div>';

        // Adicionar barra visual
        html += '<div style="margin-top: 16px; display: flex; height: 24px; border-radius: 6px; overflow: hidden;">';
        steps.forEach((step, index) => {
          const percent = (step.count / total) * 100;
          const color = colors[index % colors.length];
          if (percent > 0) {
            html += \`<div style="width: \${percent}%; background: \${color};" title="\${step.title}: \${step.count}"></div>\`;
          }
        });
        html += '</div>';

        document.getElementById('distribuicaoFunil').innerHTML = html;
      }

      // Carregar dados ao iniciar
      document.addEventListener('DOMContentLoaded', () => {
        carregarDadosCRM();

        // Auto-refresh a cada 5 minutos
        setInterval(carregarDadosCRM, 5 * 60 * 1000);
      });
    </script>
  `;

  return layout('CRM em Tempo Real', content, 'desempenho');
}

function renderPlanejamento(env) {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-bullseye"></i> Planejamento de Metas</h1>
      <p class="page-subtitle">Configure suas metas do funil de vendas para calcular os números necessários</p>
    </div>

    <div class="grid grid-2">
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-cog"></i> Configurar Meta</h3>
        </div>

        <div class="form-group">
          <label class="form-label">Meta de Vendas (mensal)</label>
          <input type="number" class="form-input" id="metaVendas" value="1" min="1" placeholder="Quantas vendas você quer fazer?">
        </div>

        <div class="form-group">
          <label class="form-label">Ticket Médio (R$)</label>
          <input type="number" class="form-input" id="ticketMedio" value="487" placeholder="Valor médio por venda">
        </div>

        <p style="color: var(--text-secondary); font-size: 13px; margin-top: 16px; margin-bottom: 16px;">
          <i class="fas fa-info-circle"></i> Ajuste as taxas de conversão conforme seu histórico
        </p>

        <div class="form-group">
          <label class="form-label">Taxa: Smart Leads → Conectados</label>
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="range" id="txConectados" min="5" max="80" value="30" style="flex: 1;" oninput="document.getElementById('txConectadosVal').textContent = this.value + '%'">
            <span id="txConectadosVal" style="min-width: 45px; font-weight: 600;">30%</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Taxa: Conectados → MQL</label>
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="range" id="txMQL" min="5" max="50" value="10" style="flex: 1;" oninput="document.getElementById('txMQLVal').textContent = this.value + '%'">
            <span id="txMQLVal" style="min-width: 45px; font-weight: 600;">10%</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Taxa: MQL → SQL</label>
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="range" id="txSQL" min="20" max="90" value="60" style="flex: 1;" oninput="document.getElementById('txSQLVal').textContent = this.value + '%'">
            <span id="txSQLVal" style="min-width: 45px; font-weight: 600;">60%</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Taxa: SQL → Acontecidas</label>
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="range" id="txAcontecidas" min="50" max="100" value="85" style="flex: 1;" oninput="document.getElementById('txAcontecidasVal').textContent = this.value + '%'">
            <span id="txAcontecidasVal" style="min-width: 45px; font-weight: 600;">85%</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Taxa: Acontecidas → Vendas</label>
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="range" id="txVendas" min="5" max="60" value="20" style="flex: 1;" oninput="document.getElementById('txVendasVal').textContent = this.value + '%'">
            <span id="txVendasVal" style="min-width: 45px; font-weight: 600;">20%</span>
          </div>
        </div>

        <button class="btn btn-primary" onclick="calcularMetas()" style="width: 100%; margin-top: 16px;">
          <i class="fas fa-calculator"></i> Calcular Metas
        </button>
      </div>

      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-chart-pie"></i> Metas Calculadas</h3>
        </div>

        <div id="resultadoMetas">
          <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <i class="fas fa-arrow-left" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
            <p>Configure seus parâmetros e clique em "Calcular Metas"</p>
          </div>
        </div>
      </div>
    </div>

    <script>
      function calcularMetas() {
        const metaVendas = parseInt(document.getElementById('metaVendas').value) || 1;
        const ticketMedio = parseFloat(document.getElementById('ticketMedio').value) || 487;
        const txConectados = parseInt(document.getElementById('txConectados').value) / 100;
        const txMQL = parseInt(document.getElementById('txMQL').value) / 100;
        const txSQL = parseInt(document.getElementById('txSQL').value) / 100;
        const txAcontecidas = parseInt(document.getElementById('txAcontecidas').value) / 100;
        const txVendas = parseInt(document.getElementById('txVendas').value) / 100;

        // Calcular de trás para frente
        const acontecidas = Math.ceil(metaVendas / txVendas);
        const sql = Math.ceil(acontecidas / txAcontecidas);
        const mql = Math.ceil(sql / txSQL);
        const conectados = Math.ceil(mql / txMQL);
        const smartLeads = Math.ceil(conectados / txConectados);

        // Metas semanais (4 semanas)
        const semana = {
          smartLeads: Math.ceil(smartLeads / 4),
          conectados: Math.ceil(conectados / 4),
          mql: Math.ceil(mql / 4),
          sql: Math.ceil(sql / 4),
          acontecidas: Math.ceil(acontecidas / 4),
          vendas: Math.ceil(metaVendas / 4)
        };

        const mrrProjetado = metaVendas * ticketMedio;

        document.getElementById('resultadoMetas').innerHTML = \`
          <div style="text-align: center; margin-bottom: 24px;">
            <div class="valor-display">R$ \${mrrProjetado.toLocaleString('pt-BR')}</div>
            <div class="valor-label">MRR Projetado</div>
          </div>

          <div class="table-container" style="margin-bottom: 24px;">
            <table>
              <thead>
                <tr>
                  <th>Etapa</th>
                  <th>Semanal</th>
                  <th>Mensal</th>
                  <th>Conversão</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="badge badge-purple">Smart Leads</span></td>
                  <td>\${semana.smartLeads}</td>
                  <td><strong>\${smartLeads}</strong></td>
                  <td>-</td>
                </tr>
                <tr>
                  <td><span class="badge badge-info">Conectados</span></td>
                  <td>\${semana.conectados}</td>
                  <td><strong>\${conectados}</strong></td>
                  <td>\${(txConectados * 100).toFixed(0)}%</td>
                </tr>
                <tr>
                  <td><span class="badge badge-warning">MQL</span></td>
                  <td>\${semana.mql}</td>
                  <td><strong>\${mql}</strong></td>
                  <td>\${(txMQL * 100).toFixed(0)}%</td>
                </tr>
                <tr>
                  <td><span class="badge badge-success">SQL</span></td>
                  <td>\${semana.sql}</td>
                  <td><strong>\${sql}</strong></td>
                  <td>\${(txSQL * 100).toFixed(0)}%</td>
                </tr>
                <tr>
                  <td><span class="badge badge-info">Acontecidas</span></td>
                  <td>\${semana.acontecidas}</td>
                  <td><strong>\${acontecidas}</strong></td>
                  <td>\${(txAcontecidas * 100).toFixed(0)}%</td>
                </tr>
                <tr style="background: rgba(139, 92, 246, 0.05);">
                  <td><span class="badge badge-purple">Vendas</span></td>
                  <td><strong>\${semana.vendas}</strong></td>
                  <td><strong>\${metaVendas}</strong></td>
                  <td>\${(txVendas * 100).toFixed(0)}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="req-grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="req-item">
              <div class="req-icon purple"><i class="fas fa-phone"></i></div>
              <div>
                <div class="req-title">\${semana.smartLeads} ligações/semana</div>
                <div class="req-desc">\${Math.ceil(semana.smartLeads / 6)} por dia útil</div>
              </div>
            </div>
            <div class="req-item">
              <div class="req-icon green"><i class="fas fa-handshake"></i></div>
              <div>
                <div class="req-title">\${semana.acontecidas} reuniões/semana</div>
                <div class="req-desc">\${Math.ceil(semana.acontecidas / 5)} por dia útil</div>
              </div>
            </div>
          </div>

          <button class="btn btn-secondary" onclick="salvarMetas()" style="width: 100%; margin-top: 20px;">
            <i class="fas fa-save"></i> Salvar Metas no Navegador
          </button>
        \`;
      }

      function salvarMetas() {
        const metas = {
          metaVendas: document.getElementById('metaVendas').value,
          ticketMedio: document.getElementById('ticketMedio').value,
          txConectados: document.getElementById('txConectados').value,
          txMQL: document.getElementById('txMQL').value,
          txSQL: document.getElementById('txSQL').value,
          txAcontecidas: document.getElementById('txAcontecidas').value,
          txVendas: document.getElementById('txVendas').value,
          dataAtualizacao: new Date().toISOString()
        };
        localStorage.setItem('planejamentoMetas', JSON.stringify(metas));
        showToast('Metas salvas com sucesso!', 'success');
      }

      // Carregar metas salvas
      document.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem('planejamentoMetas');
        if (saved) {
          const metas = JSON.parse(saved);
          document.getElementById('metaVendas').value = metas.metaVendas || 1;
          document.getElementById('ticketMedio').value = metas.ticketMedio || 487;
          document.getElementById('txConectados').value = metas.txConectados || 30;
          document.getElementById('txMQL').value = metas.txMQL || 10;
          document.getElementById('txSQL').value = metas.txSQL || 60;
          document.getElementById('txAcontecidas').value = metas.txAcontecidas || 85;
          document.getElementById('txVendas').value = metas.txVendas || 20;

          // Atualizar labels
          document.getElementById('txConectadosVal').textContent = metas.txConectados + '%';
          document.getElementById('txMQLVal').textContent = metas.txMQL + '%';
          document.getElementById('txSQLVal').textContent = metas.txSQL + '%';
          document.getElementById('txAcontecidasVal').textContent = metas.txAcontecidas + '%';
          document.getElementById('txVendasVal').textContent = metas.txVendas + '%';

          calcularMetas();
        }
      });
    </script>
  `;

  return layout('Planejamento de Metas', content, 'desempenho');
}

function renderAcompanhamento(env) {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-calendar-check"></i> Acompanhamento Diário</h1>
      <p class="page-subtitle">Registre suas atividades diárias para acompanhar o progresso</p>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-user"></i> Informações do Vendedor</h3>
        <select class="form-select" id="mesAcompanhamento" style="width: auto;" onchange="carregarDados()">
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12" selected>Dezembro</option>
        </select>
      </div>

      <div class="grid grid-2" style="margin-bottom: 20px;">
        <div class="form-group">
          <label class="form-label">Nome do Vendedor</label>
          <input type="text" class="form-input" id="nomeVendedor" placeholder="Seu nome">
        </div>
        <div class="form-group">
          <label class="form-label">Ano</label>
          <input type="number" class="form-input" id="anoAcompanhamento" value="2025">
        </div>
      </div>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-chart-bar"></i> Resumo do Mês</h3>
      </div>
      <div class="stats-grid" id="resumoMes">
        <div class="stat-card purple">
          <div class="stat-value" id="totalLigacoes">0</div>
          <div class="stat-label">Ligações</div>
        </div>
        <div class="stat-card orange">
          <div class="stat-value" id="totalConectados">0</div>
          <div class="stat-label">Conectados</div>
        </div>
        <div class="stat-card green">
          <div class="stat-value" id="totalMQLs">0</div>
          <div class="stat-label">MQL's</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-value" id="totalShows">0</div>
          <div class="stat-label">Reuniões</div>
        </div>
      </div>
    </div>

    <div id="semanasContainer"></div>

    <div class="card fade-in" style="margin-top: 24px;">
      <button class="btn btn-primary" onclick="salvarAcompanhamento()" style="width: 100%;">
        <i class="fas fa-save"></i> Salvar Acompanhamento
      </button>
    </div>

    <script>
      const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const CAMPOS = [
        { id: 'ligacoes', label: 'Ligações', icon: 'fa-phone' },
        { id: 'conectados', label: 'Conectados', icon: 'fa-plug' },
        { id: 'tempo', label: 'Tempo (min)', icon: 'fa-clock' },
        { id: 'mqls', label: 'MQLs', icon: 'fa-user-check' },
        { id: 'noshow', label: 'No-Show', icon: 'fa-user-times' },
        { id: 'show', label: 'Show', icon: 'fa-handshake' }
      ];

      function gerarSemanas() {
        let html = '';
        for (let semana = 1; semana <= 5; semana++) {
          html += \`
            <div class="card fade-in" style="margin-top: 24px;">
              <div class="card-header">
                <h3 class="card-title"><i class="fas fa-calendar-week"></i> Semana \${semana}</h3>
                <span class="badge badge-purple" id="totalSemana\${semana}">0 ligações</span>
              </div>
              <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Dia</th>
                      \${CAMPOS.map(c => \`<th><i class="fas \${c.icon}"></i> \${c.label}</th>\`).join('')}
                    </tr>
                  </thead>
                  <tbody>
                    \${DIAS.map(dia => \`
                      <tr>
                        <td><strong>\${dia}</strong></td>
                        \${CAMPOS.map(c => \`
                          <td>
                            <input type="number"
                              class="form-input acomp-input"
                              id="s\${semana}_\${dia.toLowerCase()}_\${c.id}"
                              data-semana="\${semana}"
                              data-campo="\${c.id}"
                              min="0"
                              value=""
                              style="width: 80px; padding: 8px;"
                              onchange="atualizarTotais()">
                          </td>
                        \`).join('')}
                      </tr>
                    \`).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          \`;
        }
        document.getElementById('semanasContainer').innerHTML = html;
      }

      function atualizarTotais() {
        let totalLigacoes = 0, totalConectados = 0, totalMQLs = 0, totalShows = 0;

        for (let semana = 1; semana <= 5; semana++) {
          let semanaLigacoes = 0;
          DIAS.forEach(dia => {
            const lig = parseInt(document.getElementById(\`s\${semana}_\${dia.toLowerCase()}_ligacoes\`)?.value) || 0;
            const con = parseInt(document.getElementById(\`s\${semana}_\${dia.toLowerCase()}_conectados\`)?.value) || 0;
            const mql = parseInt(document.getElementById(\`s\${semana}_\${dia.toLowerCase()}_mqls\`)?.value) || 0;
            const show = parseInt(document.getElementById(\`s\${semana}_\${dia.toLowerCase()}_show\`)?.value) || 0;

            semanaLigacoes += lig;
            totalLigacoes += lig;
            totalConectados += con;
            totalMQLs += mql;
            totalShows += show;
          });

          const badge = document.getElementById(\`totalSemana\${semana}\`);
          if (badge) badge.textContent = \`\${semanaLigacoes} ligações\`;
        }

        document.getElementById('totalLigacoes').textContent = totalLigacoes;
        document.getElementById('totalConectados').textContent = totalConectados;
        document.getElementById('totalMQLs').textContent = totalMQLs;
        document.getElementById('totalShows').textContent = totalShows;
      }

      function salvarAcompanhamento() {
        const mes = document.getElementById('mesAcompanhamento').value;
        const ano = document.getElementById('anoAcompanhamento').value;
        const nome = document.getElementById('nomeVendedor').value;

        const dados = { mes, ano, nome, semanas: {} };

        for (let semana = 1; semana <= 5; semana++) {
          dados.semanas[semana] = {};
          DIAS.forEach(dia => {
            dados.semanas[semana][dia] = {};
            CAMPOS.forEach(campo => {
              const valor = document.getElementById(\`s\${semana}_\${dia.toLowerCase()}_\${campo.id}\`)?.value || '';
              dados.semanas[semana][dia][campo.id] = valor;
            });
          });
        }

        const chave = \`acompanhamento_\${ano}_\${mes}\`;
        localStorage.setItem(chave, JSON.stringify(dados));
        localStorage.setItem('nomeVendedor', nome);
        showToast('Acompanhamento salvo com sucesso!', 'success');
      }

      function carregarDados() {
        const mes = document.getElementById('mesAcompanhamento').value;
        const ano = document.getElementById('anoAcompanhamento').value;
        const chave = \`acompanhamento_\${ano}_\${mes}\`;

        const saved = localStorage.getItem(chave);
        const nome = localStorage.getItem('nomeVendedor');

        if (nome) document.getElementById('nomeVendedor').value = nome;

        // Limpar campos
        document.querySelectorAll('.acomp-input').forEach(input => input.value = '');

        if (saved) {
          const dados = JSON.parse(saved);
          if (dados.nome) document.getElementById('nomeVendedor').value = dados.nome;

          for (let semana = 1; semana <= 5; semana++) {
            if (dados.semanas && dados.semanas[semana]) {
              DIAS.forEach(dia => {
                if (dados.semanas[semana][dia]) {
                  CAMPOS.forEach(campo => {
                    const input = document.getElementById(\`s\${semana}_\${dia.toLowerCase()}_\${campo.id}\`);
                    if (input && dados.semanas[semana][dia][campo.id]) {
                      input.value = dados.semanas[semana][dia][campo.id];
                    }
                  });
                }
              });
            }
          }
        }

        atualizarTotais();
      }

      // Inicializar
      document.addEventListener('DOMContentLoaded', () => {
        // Definir mês atual
        const mesAtual = new Date().getMonth() + 1;
        document.getElementById('mesAcompanhamento').value = mesAtual.toString().padStart(2, '0');
        document.getElementById('anoAcompanhamento').value = new Date().getFullYear();

        gerarSemanas();
        carregarDados();
      });
    </script>
  `;

  return layout('Acompanhamento Diário', content, 'desempenho');
}

function renderRelatorio(env) {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-chart-bar"></i> Relatório de Desempenho</h1>
      <p class="page-subtitle">Visualize seu progresso mensal e taxas de conversão</p>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-user"></i> Vendedor</h3>
        <select class="form-select" id="anoRelatorio" style="width: auto;" onchange="carregarRelatorio()">
          <option value="2024">2024</option>
          <option value="2025" selected>2025</option>
          <option value="2026">2026</option>
        </select>
      </div>
      <div id="nomeVendedorDisplay" style="font-size: 18px; font-weight: 600; color: var(--primary); margin-top: 10px;">
        -
      </div>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-table"></i> Progresso Individual</h3>
      </div>
      <div class="table-container">
        <table id="tabelaRelatorio">
          <thead>
            <tr>
              <th>Métrica</th>
              <th>Jan</th>
              <th>Fev</th>
              <th>Mar</th>
              <th>Abr</th>
              <th>Mai</th>
              <th>Jun</th>
              <th>Jul</th>
              <th>Ago</th>
              <th>Set</th>
              <th>Out</th>
              <th>Nov</th>
              <th>Dez</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody id="relatorioBody">
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-percentage"></i> Taxas de Conversão</h3>
        </div>
        <div id="taxasConversao">
          <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px;"></i>
            <p>Carregando dados...</p>
          </div>
        </div>
      </div>

      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-trophy"></i> Resumo Anual</h3>
        </div>
        <div id="resumoAnual">
          <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px;"></i>
            <p>Carregando dados...</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card fade-in" style="margin-top: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-download"></i> Exportar Dados</h3>
      </div>
      <div class="grid grid-2">
        <button class="btn btn-primary" onclick="exportarCSV()">
          <i class="fas fa-file-csv"></i> Exportar CSV
        </button>
        <button class="btn btn-secondary" onclick="imprimirRelatorio()">
          <i class="fas fa-print"></i> Imprimir Relatório
        </button>
      </div>
    </div>

    <script>
      const MESES = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      const MESES_LABELS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

      function carregarRelatorio() {
        const ano = document.getElementById('anoRelatorio').value;
        const nome = localStorage.getItem('nomeVendedor') || '-';
        document.getElementById('nomeVendedorDisplay').textContent = nome;

        // Carregar dados de todos os meses
        const dadosMensais = {};
        MESES.forEach((mes, idx) => {
          const chave = \`acompanhamento_\${ano}_\${mes}\`;
          const saved = localStorage.getItem(chave);

          dadosMensais[mes] = {
            ligacoes: 0,
            conectados: 0,
            tempo: 0,
            mqls: 0,
            noshow: 0,
            show: 0
          };

          if (saved) {
            const dados = JSON.parse(saved);
            for (let semana = 1; semana <= 5; semana++) {
              if (dados.semanas && dados.semanas[semana]) {
                ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].forEach(dia => {
                  if (dados.semanas[semana][dia]) {
                    dadosMensais[mes].ligacoes += parseInt(dados.semanas[semana][dia].ligacoes) || 0;
                    dadosMensais[mes].conectados += parseInt(dados.semanas[semana][dia].conectados) || 0;
                    dadosMensais[mes].tempo += parseInt(dados.semanas[semana][dia].tempo) || 0;
                    dadosMensais[mes].mqls += parseInt(dados.semanas[semana][dia].mqls) || 0;
                    dadosMensais[mes].noshow += parseInt(dados.semanas[semana][dia].noshow) || 0;
                    dadosMensais[mes].show += parseInt(dados.semanas[semana][dia].show) || 0;
                  }
                });
              }
            }
          }
        });

        // Calcular totais
        const totais = {
          ligacoes: 0, conectados: 0, tempo: 0, mqls: 0, noshow: 0, show: 0
        };

        MESES.forEach(mes => {
          Object.keys(totais).forEach(key => {
            totais[key] += dadosMensais[mes][key];
          });
        });

        // Gerar tabela
        const metricas = [
          { key: 'ligacoes', label: 'Número de Ligações', badge: 'badge-purple' },
          { key: 'tempo', label: 'Tempo de Ligação (min)', badge: 'badge-info' },
          { key: 'conectados', label: 'Conectados', badge: 'badge-warning' },
          { key: 'mqls', label: "MQL's", badge: 'badge-success' },
          { key: 'show', label: 'Acontecidas', badge: 'badge-info' },
          { key: 'noshow', label: 'No-Show', badge: 'badge-error' }
        ];

        let html = '';
        metricas.forEach(m => {
          html += '<tr>';
          html += \`<td><span class="badge \${m.badge}">\${m.label}</span></td>\`;
          MESES.forEach(mes => {
            const valor = dadosMensais[mes][m.key];
            html += \`<td>\${valor || '-'}</td>\`;
          });
          html += \`<td><strong>\${totais[m.key]}</strong></td>\`;
          html += '</tr>';
        });

        // Adicionar linhas de conversão
        const conversoes = [
          { label: 'Conv: Lig→Con', calc: (d) => d.conectados && d.ligacoes ? ((d.conectados / d.ligacoes) * 100).toFixed(1) + '%' : '-' },
          { label: 'Conv: Con→MQL', calc: (d) => d.mqls && d.conectados ? ((d.mqls / d.conectados) * 100).toFixed(1) + '%' : '-' },
          { label: 'Conv: MQL→Show', calc: (d) => d.show && d.mqls ? ((d.show / d.mqls) * 100).toFixed(1) + '%' : '-' }
        ];

        conversoes.forEach(conv => {
          html += '<tr style="background: rgba(139, 92, 246, 0.05);">';
          html += \`<td><em>\${conv.label}</em></td>\`;
          MESES.forEach(mes => {
            html += \`<td>\${conv.calc(dadosMensais[mes])}</td>\`;
          });
          html += \`<td><strong>\${conv.calc(totais)}</strong></td>\`;
          html += '</tr>';
        });

        document.getElementById('relatorioBody').innerHTML = html;

        // Taxas de conversão
        const convLigCon = totais.ligacoes ? ((totais.conectados / totais.ligacoes) * 100).toFixed(1) : 0;
        const convConMQL = totais.conectados ? ((totais.mqls / totais.conectados) * 100).toFixed(1) : 0;
        const convMQLShow = totais.mqls ? ((totais.show / totais.mqls) * 100).toFixed(1) : 0;

        document.getElementById('taxasConversao').innerHTML = \`
          <div class="req-grid" style="grid-template-columns: 1fr;">
            <div class="req-item">
              <div class="req-icon purple"><i class="fas fa-phone"></i></div>
              <div style="flex: 1;">
                <div class="req-title">Ligações → Conectados</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="req-desc">\${totais.ligacoes} → \${totais.conectados}</div>
                  <span class="badge badge-purple">\${convLigCon}%</span>
                </div>
              </div>
            </div>
            <div class="req-item">
              <div class="req-icon orange"><i class="fas fa-plug"></i></div>
              <div style="flex: 1;">
                <div class="req-title">Conectados → MQL</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="req-desc">\${totais.conectados} → \${totais.mqls}</div>
                  <span class="badge badge-warning">\${convConMQL}%</span>
                </div>
              </div>
            </div>
            <div class="req-item">
              <div class="req-icon green"><i class="fas fa-handshake"></i></div>
              <div style="flex: 1;">
                <div class="req-title">MQL → Reunião</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="req-desc">\${totais.mqls} → \${totais.show}</div>
                  <span class="badge badge-success">\${convMQLShow}%</span>
                </div>
              </div>
            </div>
          </div>
        \`;

        // Resumo anual
        const tempoHoras = Math.floor(totais.tempo / 60);
        const tempoMin = totais.tempo % 60;

        document.getElementById('resumoAnual').innerHTML = \`
          <div class="stats-grid" style="grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <div style="text-align: center; padding: 16px; background: var(--border-light); border-radius: 8px;">
              <div style="font-size: 28px; font-weight: 700; color: var(--primary);">\${totais.ligacoes}</div>
              <div style="font-size: 13px; color: var(--text-secondary);">Total Ligações</div>
            </div>
            <div style="text-align: center; padding: 16px; background: var(--border-light); border-radius: 8px;">
              <div style="font-size: 28px; font-weight: 700; color: var(--accent);">\${totais.conectados}</div>
              <div style="font-size: 13px; color: var(--text-secondary);">Conectados</div>
            </div>
            <div style="text-align: center; padding: 16px; background: var(--border-light); border-radius: 8px;">
              <div style="font-size: 28px; font-weight: 700; color: var(--secondary);">\${totais.show}</div>
              <div style="font-size: 13px; color: var(--text-secondary);">Reuniões</div>
            </div>
            <div style="text-align: center; padding: 16px; background: var(--border-light); border-radius: 8px;">
              <div style="font-size: 28px; font-weight: 700; color: var(--primary);">\${tempoHoras}h\${tempoMin}m</div>
              <div style="font-size: 13px; color: var(--text-secondary);">Tempo em Ligação</div>
            </div>
          </div>
        \`;
      }

      function exportarCSV() {
        const table = document.getElementById('tabelaRelatorio');
        let csv = [];

        for (let row of table.rows) {
          let rowData = [];
          for (let cell of row.cells) {
            rowData.push('"' + cell.innerText.replace(/"/g, '""') + '"');
          }
          csv.push(rowData.join(','));
        }

        const csvContent = csv.join('\\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'relatorio_desempenho_' + document.getElementById('anoRelatorio').value + '.csv';
        link.click();
        showToast('CSV exportado com sucesso!', 'success');
      }

      function imprimirRelatorio() {
        window.print();
      }

      // Inicializar
      document.addEventListener('DOMContentLoaded', () => {
        carregarRelatorio();
      });
    </script>

    <style>
      @media print {
        .header, .nav-tabs, .footer, button, select { display: none !important; }
        .card { box-shadow: none !important; border: 1px solid #ccc !important; }
      }
    </style>
  `;

  return layout('Relatório de Desempenho', content, 'desempenho');
}
