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

export async function renderDesempenho(env, path, tenantData = {}) {
  const config = tenantData.config || {};
  const tenantId = config.id || 'papervines';

  // Se for newoeste, renderizar versao especifica
  if (tenantId === 'newoeste') {
    if (path === '/desempenho/planejamento') {
      return renderPlanejamentoNewOeste(env, tenantData);
    } else if (path === '/desempenho/acompanhamento') {
      return renderAcompanhamentoNewOeste(env, tenantData);
    } else if (path === '/desempenho/relatorio') {
      return renderRelatorioNewOeste(env, tenantData);
    }
    return renderDesempenhoHomeNewOeste(env, tenantData);
  }

  if (path === '/desempenho/planejamento') {
    return renderPlanejamento(env, tenantData);
  } else if (path === '/desempenho/acompanhamento') {
    return renderAcompanhamento(env, tenantData);
  } else if (path === '/desempenho/relatorio') {
    return renderRelatorio(env, tenantData);
  } else if (path === '/desempenho/crm') {
    return renderCRM(env, tenantData);
  }
  return renderDesempenhoHome(env, tenantData);
}

function renderDesempenhoHome(env, tenantData = {}) {
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

  return layout('Desempenho', content, 'desempenho', tenantData?.config);
}

function renderCRM(env, tenantData = {}) {
  const content = `
    <!-- Header Compacto com Status -->
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div id="statusIcon" style="width: 10px; height: 10px; background: #f59e0b; border-radius: 50%; animation: pulse 2s infinite;"></div>
          <span id="statusText" style="font-size: 13px; color: var(--text-secondary);">Conectando...</span>
        </div>
        <span class="badge badge-info" id="ultimaAtualizacao" style="font-size: 11px;">--:--</span>
        <span class="badge" id="panelIdBadge" style="font-size: 10px; background: rgba(139, 92, 246, 0.1); color: #8b5cf6; cursor: pointer;" onclick="abrirConfigCRM()" title="Clique para configurar">
          <i class="fas fa-database"></i> Panel ID
        </span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-sm tab-btn active" id="tabPipeline" onclick="showTab('pipeline')" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3);">
          <i class="fas fa-filter"></i> Pipeline
        </button>
        <button class="btn btn-sm tab-btn" id="tabOrigens" onclick="showTab('origens')" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">
          <i class="fas fa-bullseye"></i> Origens
        </button>
        <button class="btn btn-sm" onclick="carregarDadosCRM()" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.3);">
          <i class="fas fa-sync-alt"></i>
        </button>
        <button class="btn btn-sm" onclick="abrirConfigCRM()" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.3);" title="Configurar CRM">
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </div>

    <!-- Modal de Configuração CRM -->
    <div id="modalConfigCRM" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; align-items: center; justify-content: center;">
      <div style="background: white; border-radius: 16px; padding: 24px; max-width: 500px; width: 90%; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0; font-size: 18px; font-weight: 600;">
            <i class="fas fa-cog" style="color: #8b5cf6; margin-right: 8px;"></i>
            Configuração do CRM
          </h3>
          <button onclick="fecharConfigCRM()" style="background: none; border: none; font-size: 24px; color: var(--text-secondary); cursor: pointer; padding: 0; width: 32px; height: 32px;">&times;</button>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 8px;">
            Panel ID do CRM
          </label>
          <input type="text" id="inputPanelId" placeholder="Ex: 5369fc64-cc15-41d3-a780-664878183b8b"
            style="width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; font-size: 13px; font-family: 'Courier New', monospace;">
          <div style="font-size: 11px; color: var(--text-secondary); margin-top: 6px;">
            <i class="fas fa-info-circle"></i> Cole o Panel ID do painel WTS Chat que você deseja monitorar
          </div>
        </div>

        <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 600; color: #8b5cf6; margin-bottom: 6px;">
            <i class="fas fa-lightbulb"></i> Como descobrir o Panel ID?
          </div>
          <div style="font-size: 11px; color: var(--text-secondary); line-height: 1.6;">
            1. Acesse o WTS Chat: <a href="https://app.wts.chat/" target="_blank" style="color: #8b5cf6;">app.wts.chat</a><br>
            2. Abra o painel desejado<br>
            3. Copie o ID da URL: <code style="background: rgba(0,0,0,0.05); padding: 2px 6px; border-radius: 4px;">crm/panel/SEU-ID-AQUI</code>
          </div>
        </div>

        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button onclick="fecharConfigCRM()" class="btn btn-sm" style="background: var(--bg-page); color: var(--text-secondary);">
            Cancelar
          </button>
          <button onclick="salvarConfigCRM()" class="btn btn-sm" style="background: #8b5cf6; color: white;">
            <i class="fas fa-save"></i> Salvar e Recarregar
          </button>
        </div>
      </div>
    </div>

    <!-- ========== SECAO PIPELINE ========== -->
    <div id="pipelineSection">

    <!-- KPIs Compactos em Linha -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 20px;">
      <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05)); border-radius: 12px; padding: 16px; border: 1px solid rgba(139, 92, 246, 0.2);">
        <div style="font-size: 28px; font-weight: 700; color: #8b5cf6;" id="totalCards">-</div>
        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Total Cards</div>
      </div>
      <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); border-radius: 12px; padding: 16px; border: 1px solid rgba(16, 185, 129, 0.2);">
        <div style="font-size: 28px; font-weight: 700; color: #10b981;" id="cardsHoje">-</div>
        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Hoje</div>
      </div>
      <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05)); border-radius: 12px; padding: 16px; border: 1px solid rgba(59, 130, 246, 0.2);">
        <div style="font-size: 28px; font-weight: 700; color: #3b82f6;" id="cardsSemana">-</div>
        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Semana</div>
      </div>
      <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); border-radius: 12px; padding: 16px; border: 1px solid rgba(245, 158, 11, 0.2);">
        <div style="font-size: 28px; font-weight: 700; color: #f59e0b;" id="cardsMes">-</div>
        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Mês</div>
      </div>
    </div>

    <!-- Layout Principal: Funil + Sidebar -->
    <div style="display: grid; grid-template-columns: 1fr 320px; gap: 20px;">

      <!-- Coluna Principal: Funil Compacto -->
      <div class="card fade-in" style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin: 0;"><i class="fas fa-filter" style="margin-right: 8px; color: var(--primary);"></i>Pipeline de Vendas</h3>
          <span id="totalPipeline" style="font-size: 12px; color: var(--text-secondary);">-</span>
        </div>
        <div id="funilContainer">
          <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px; opacity: 0.5;"></i>
          </div>
        </div>
      </div>

      <!-- Sidebar: Métricas Rápidas -->
      <div style="display: flex; flex-direction: column; gap: 16px;">

        <!-- Distribuição Visual -->
        <div class="card fade-in" style="padding: 16px;">
          <h4 style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--text-secondary); margin: 0 0 12px 0; letter-spacing: 0.5px;">
            <i class="fas fa-chart-pie" style="margin-right: 6px;"></i>Distribuição
          </h4>
          <div id="distribuicaoFunil">
            <div style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i></div>
          </div>
        </div>

        <!-- Top 5 Conversões -->
        <div class="card fade-in" style="padding: 16px; flex: 1;">
          <h4 style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: var(--text-secondary); margin: 0 0 12px 0; letter-spacing: 0.5px;">
            <i class="fas fa-exchange-alt" style="margin-right: 6px;"></i>Conversões
          </h4>
          <div id="taxasConversaoCRM">
            <div style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin"></i></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela Compacta (Colapsável) -->
    <details class="card fade-in pipeline-section" style="margin-top: 20px; cursor: pointer;" open>
      <summary style="padding: 16px; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 8px; user-select: none;">
        <i class="fas fa-table" style="color: var(--primary);"></i>
        Detalhes por Etapa
        <i class="fas fa-chevron-down" style="margin-left: auto; font-size: 12px; transition: transform 0.3s;"></i>
      </summary>
      <div style="padding: 0 16px 16px;">
        <div style="overflow-x: auto;">
          <table style="font-size: 13px;">
            <thead>
              <tr>
                <th style="padding: 10px 12px;">#</th>
                <th style="padding: 10px 12px;">Etapa</th>
                <th style="padding: 10px 12px; text-align: center;">Qty</th>
                <th style="padding: 10px 12px; text-align: right;">Valor</th>
                <th style="padding: 10px 12px; width: 120px;">%</th>
              </tr>
            </thead>
            <tbody id="tabelaEtapas">
              <tr><td colspan="5" style="text-align: center; padding: 30px;"><i class="fas fa-spinner fa-spin"></i></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </details>
    </div>

    <!-- ========== SECAO ORIGENS (Oculta por padrao) ========== -->
    <div id="origensSection" style="display: none;">

    <!-- KPIs de Origem -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-bottom: 20px;">
      <div style="background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05)); border-radius: 12px; padding: 16px; border: 1px solid rgba(236, 72, 153, 0.2);">
        <div style="font-size: 28px; font-weight: 700; color: #ec4899;" id="totalOrigensIdentificadas">-</div>
        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Com Origem</div>
      </div>
      <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05)); border-radius: 12px; padding: 16px; border: 1px solid rgba(139, 92, 246, 0.2);">
        <div style="font-size: 28px; font-weight: 700; color: #8b5cf6;" id="totalCanais">-</div>
        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Canais</div>
      </div>
      <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); border-radius: 12px; padding: 16px; border: 1px solid rgba(245, 158, 11, 0.2);">
        <div style="font-size: 28px; font-weight: 700; color: #f59e0b;" id="totalCampanhas">-</div>
        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Campanhas</div>
      </div>
      <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); border-radius: 12px; padding: 16px; border: 1px solid rgba(16, 185, 129, 0.2);">
        <div style="font-size: 28px; font-weight: 700; color: #10b981;" id="melhorCanal">-</div>
        <div style="font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Melhor Canal</div>
      </div>
    </div>

    <!-- Layout Origens: Cards + Campanhas -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

      <!-- Origens/Fontes -->
      <div class="card fade-in" style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin: 0;">
            <i class="fas fa-bullseye" style="margin-right: 8px; color: #ec4899;"></i>Performance por Canal
          </h3>
        </div>
        <div id="origemContainer">
          <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px; opacity: 0.5;"></i>
          </div>
        </div>
      </div>

      <!-- Top Campanhas -->
      <div class="card fade-in" style="padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin: 0;">
            <i class="fas fa-ad" style="margin-right: 8px; color: #f59e0b;"></i>Top Campanhas
          </h3>
        </div>
        <div id="campanhasContainer">
          <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size: 24px; opacity: 0.5;"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela de Cards Recentes com Origem -->
    <details class="card fade-in" style="margin-top: 20px; cursor: pointer;">
      <summary style="padding: 16px; font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 8px; user-select: none;">
        <i class="fas fa-list" style="color: var(--secondary);"></i>
        Cards Recentes com Origem
        <span class="badge badge-info" id="qtdCardsOrigem" style="margin-left: 8px;">-</span>
        <i class="fas fa-chevron-down" style="margin-left: auto; font-size: 12px; transition: transform 0.3s;"></i>
      </summary>
      <div style="padding: 0 16px 16px;">
        <div style="overflow-x: auto;">
          <table style="font-size: 12px;">
            <thead>
              <tr>
                <th style="padding: 10px 8px;">Card</th>
                <th style="padding: 10px 8px;">Contato</th>
                <th style="padding: 10px 8px;">Canal</th>
                <th style="padding: 10px 8px;">Campanha</th>
                <th style="padding: 10px 8px;">Conteudo</th>
                <th style="padding: 10px 8px; text-align: right;">Data</th>
              </tr>
            </thead>
            <tbody id="tabelaCardsOrigem">
              <tr><td colspan="6" style="text-align: center; padding: 30px;"><i class="fas fa-spinner fa-spin"></i></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </details>
    </div>

    <style>
      @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes slideIn { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }

      .pipeline-row {
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
        border-bottom: 1px solid var(--border-color);
        animation: slideIn 0.3s ease forwards;
        opacity: 0;
      }
      .pipeline-row:last-child { border-bottom: none; }
      .pipeline-bar {
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        padding: 0 12px;
        color: white;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .pipeline-bar:hover { transform: scaleX(1.02); filter: brightness(1.1); }
      .pipeline-count {
        font-size: 18px;
        font-weight: 700;
        min-width: 45px;
        text-align: right;
      }
      .pipeline-conv {
        font-size: 11px;
        color: var(--text-secondary);
        min-width: 55px;
        text-align: right;
      }
      .conv-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
      }
      .conv-high { background: rgba(16, 185, 129, 0.15); color: #10b981; }
      .conv-mid { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
      .conv-low { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

      details summary::-webkit-details-marker { display: none; }
      details[open] summary .fa-chevron-down { transform: rotate(180deg); }

      @media (max-width: 900px) {
        .card { grid-template-columns: 1fr !important; }
        div[style*="grid-template-columns: 1fr 320px"] { grid-template-columns: 1fr !important; }
        div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
      }

      .tab-btn { transition: all 0.2s; }
      .tab-btn.active { font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }

      .source-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 8px;
        background: var(--bg-page);
        transition: all 0.2s;
      }
      .source-row:hover { transform: translateX(4px); }
      .source-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: white;
      }
      .campaign-row {
        padding: 10px 12px;
        border-left: 3px solid var(--primary);
        margin-bottom: 8px;
        background: var(--bg-page);
        border-radius: 0 8px 8px 0;
      }
    </style>

    <script>
      let dadosCRM = null;
      let dadosOrigens = null;
      let currentTab = 'pipeline';

      async function carregarDadosCRM() {
        const statusIcon = document.getElementById('statusIcon');
        const statusText = document.getElementById('statusText');
        statusIcon.style.background = '#f59e0b';
        statusIcon.style.animation = 'pulse 0.8s infinite';
        statusText.textContent = 'Sincronizando...';

        try {
          // Obter Panel ID do localStorage (se configurado)
          const panelId = localStorage.getItem('crm_panel_id');
          const url = panelId ? '/api/crm/metrics?panel_id=' + encodeURIComponent(panelId) : '/api/crm/metrics';

          const response = await fetch(url);
          const data = await response.json();

          if (data.success) {
            dadosCRM = data;
            statusIcon.style.background = '#10b981';
            statusIcon.style.animation = 'none';
            statusText.textContent = 'Conectado';
            atualizarInterface(data);
          } else {
            throw new Error(data.error || 'Erro');
          }
        } catch (error) {
          statusIcon.style.background = '#ef4444';
          statusIcon.style.animation = 'none';
          statusText.textContent = 'Erro: ' + error.message.substring(0, 30);
          document.getElementById('funilContainer').innerHTML = '<div style="text-align: center; padding: 40px; color: #ef4444;"><i class="fas fa-exclamation-triangle" style="font-size: 32px;"></i><p style="margin-top: 12px; font-size: 13px;">'+error.message+'</p><button class="btn btn-sm" onclick="carregarDadosCRM()" style="margin-top: 12px;"><i class="fas fa-redo"></i> Tentar</button></div>';
        }
      }

      function atualizarInterface(data) {
        document.getElementById('totalCards').textContent = data.summary.totalCards || 0;
        document.getElementById('cardsHoje').textContent = data.summary.cardsToday || 0;
        document.getElementById('cardsSemana').textContent = data.summary.cardsThisWeek || 0;
        document.getElementById('cardsMes').textContent = data.summary.cardsThisMonth || 0;

        const ts = new Date(data.timestamp);
        document.getElementById('ultimaAtualizacao').textContent = ts.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        document.getElementById('totalPipeline').textContent = data.summary.totalCards + ' cards no pipeline';

        renderizarFunil(data.steps, data.summary.totalCards);
        renderizarTabela(data.steps, data.summary.totalCards);
        renderizarConversoes(data.conversions);
        renderizarDistribuicao(data.steps, data.summary.totalCards);
      }

      function renderizarFunil(steps, total) {
        if (!steps || steps.length === 0) {
          document.getElementById('funilContainer').innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);"><i class="fas fa-inbox" style="font-size: 32px; opacity: 0.3;"></i><p>Nenhuma etapa</p></div>';
          return;
        }

        const maxCount = Math.max(...steps.map(s => s.count), 1);
        const colors = ['#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899', '#10b981', '#6366f1', '#ef4444', '#14b8a6', '#a855f7', '#0ea5e9', '#f97316', '#84cc16'];

        let html = '';
        steps.forEach((step, i) => {
          const width = Math.max((step.count / maxCount) * 100, 20);
          const color = colors[i % colors.length];
          const nextStep = steps[i + 1];
          const convRate = nextStep && step.count > 0 ? ((nextStep.count / step.count) * 100).toFixed(0) : null;

          html += '<div class="pipeline-row" style="animation-delay: ' + (i * 0.05) + 's;">';
          html += '<div class="pipeline-bar" style="width: ' + width + '%; background: linear-gradient(90deg, ' + color + ', ' + color + 'cc);">' + step.title + '</div>';
          html += '<div class="pipeline-count" style="color: ' + color + ';">' + step.count + '</div>';
          if (convRate !== null) {
            html += '<div class="pipeline-conv"><i class="fas fa-arrow-down" style="font-size: 9px;"></i> ' + convRate + '%</div>';
          } else {
            html += '<div class="pipeline-conv"></div>';
          }
          html += '</div>';
        });

        document.getElementById('funilContainer').innerHTML = html;
      }

      function renderizarTabela(steps, total) {
        if (!steps || steps.length === 0) {
          document.getElementById('tabelaEtapas').innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px;">Sem dados</td></tr>';
          return;
        }

        const colors = ['#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899', '#10b981', '#6366f1', '#ef4444', '#14b8a6', '#a855f7', '#0ea5e9', '#f97316', '#84cc16'];
        let html = '';
        steps.forEach((step, i) => {
          const pct = total > 0 ? ((step.count / total) * 100).toFixed(1) : 0;
          const color = colors[i % colors.length];
          html += '<tr>';
          html += '<td style="padding: 10px 12px; color: var(--text-secondary);">' + (i + 1) + '</td>';
          html += '<td style="padding: 10px 12px;"><span style="display: inline-block; width: 8px; height: 8px; background: ' + color + '; border-radius: 2px; margin-right: 8px;"></span>' + step.title + '</td>';
          html += '<td style="padding: 10px 12px; text-align: center; font-weight: 600;">' + step.count + '</td>';
          html += '<td style="padding: 10px 12px; text-align: right; font-size: 12px;">R$ ' + (step.totalValue || 0).toLocaleString('pt-BR') + '</td>';
          html += '<td style="padding: 10px 12px;"><div style="display: flex; align-items: center; gap: 6px;"><div style="flex: 1; height: 4px; background: var(--bg-page); border-radius: 2px;"><div style="width: ' + pct + '%; height: 100%; background: ' + color + '; border-radius: 2px;"></div></div><span style="font-size: 11px; min-width: 36px; text-align: right;">' + pct + '%</span></div></td>';
          html += '</tr>';
        });
        document.getElementById('tabelaEtapas').innerHTML = html;
      }

      function renderizarConversoes(conversions) {
        if (!conversions || conversions.length === 0) {
          document.getElementById('taxasConversaoCRM').innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-secondary); font-size: 12px;">Sem dados</div>';
          return;
        }

        const top5 = conversions.slice(0, 6);
        let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
        top5.forEach(conv => {
          const cls = conv.rate >= 50 ? 'conv-high' : conv.rate >= 20 ? 'conv-mid' : 'conv-low';
          html += '<div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid var(--border-color);">';
          html += '<span style="font-size: 11px; color: var(--text-secondary); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + conv.from + ' → ' + conv.to + '">' + conv.from.substring(0, 12) + ' → ' + conv.to.substring(0, 12) + '</span>';
          html += '<span class="conv-badge ' + cls + '">' + conv.rate + '%</span>';
          html += '</div>';
        });
        html += '</div>';
        document.getElementById('taxasConversaoCRM').innerHTML = html;
      }

      function renderizarDistribuicao(steps, total) {
        if (!steps || steps.length === 0 || total === 0) {
          document.getElementById('distribuicaoFunil').innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-secondary); font-size: 12px;">Sem dados</div>';
          return;
        }

        const colors = ['#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899', '#10b981', '#6366f1', '#ef4444', '#14b8a6', '#a855f7', '#0ea5e9', '#f97316', '#84cc16'];

        // Barra horizontal compacta
        let html = '<div style="display: flex; height: 20px; border-radius: 4px; overflow: hidden; margin-bottom: 12px;">';
        steps.forEach((step, i) => {
          const pct = (step.count / total) * 100;
          if (pct > 0) {
            html += '<div style="width: ' + pct + '%; background: ' + colors[i % colors.length] + ';" title="' + step.title + ': ' + step.count + '"></div>';
          }
        });
        html += '</div>';

        // Top 5 etapas
        const top5 = [...steps].sort((a, b) => b.count - a.count).slice(0, 5);
        html += '<div style="display: flex; flex-direction: column; gap: 6px;">';
        top5.forEach((step, i) => {
          const origIndex = steps.findIndex(s => s.id === step.id);
          const pct = ((step.count / total) * 100).toFixed(0);
          html += '<div style="display: flex; align-items: center; gap: 8px; font-size: 11px;">';
          html += '<div style="width: 8px; height: 8px; background: ' + colors[origIndex % colors.length] + '; border-radius: 2px; flex-shrink: 0;"></div>';
          html += '<span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + step.title + '</span>';
          html += '<span style="font-weight: 600;">' + pct + '%</span>';
          html += '</div>';
        });
        html += '</div>';

        document.getElementById('distribuicaoFunil').innerHTML = html;
      }

      // ========== FUNCOES DE ABAS ==========
      function showTab(tab) {
        currentTab = tab;
        document.getElementById('pipelineSection').style.display = tab === 'pipeline' ? 'block' : 'none';
        document.getElementById('origensSection').style.display = tab === 'origens' ? 'block' : 'none';

        document.getElementById('tabPipeline').classList.toggle('active', tab === 'pipeline');
        document.getElementById('tabOrigens').classList.toggle('active', tab === 'origens');

        // Carregar dados de origem se necessario
        if (tab === 'origens' && !dadosOrigens) {
          carregarDadosOrigens();
        }
      }

      // ========== FUNCOES DE ORIGEM ==========
      async function carregarDadosOrigens() {
        const statusIcon = document.getElementById('statusIcon');
        const statusText = document.getElementById('statusText');
        statusIcon.style.background = '#f59e0b';
        statusIcon.style.animation = 'pulse 0.8s infinite';
        statusText.textContent = 'Carregando origens...';

        try {
          // Obter Panel ID do localStorage (se configurado)
          const panelId = localStorage.getItem('crm_panel_id');
          const url = panelId ? '/api/crm/sources?panel_id=' + encodeURIComponent(panelId) : '/api/crm/sources';

          const response = await fetch(url);
          const data = await response.json();

          if (data.success) {
            dadosOrigens = data;
            statusIcon.style.background = '#10b981';
            statusIcon.style.animation = 'none';
            statusText.textContent = 'Conectado';
            atualizarInterfaceOrigens(data);
          } else {
            throw new Error(data.error || 'Erro ao carregar origens');
          }
        } catch (error) {
          statusIcon.style.background = '#ef4444';
          statusIcon.style.animation = 'none';
          statusText.textContent = 'Erro: ' + error.message.substring(0, 30);
          document.getElementById('origemContainer').innerHTML = '<div style="text-align: center; padding: 40px; color: #ef4444;"><i class="fas fa-exclamation-triangle" style="font-size: 32px;"></i><p style="margin-top: 12px; font-size: 13px;">'+error.message+'</p></div>';
        }
      }

      function atualizarInterfaceOrigens(data) {
        // KPIs
        document.getElementById('totalOrigensIdentificadas').textContent = data.summary.totalWithChannel || 0;
        document.getElementById('totalCanais').textContent = data.channels?.length || 0;
        document.getElementById('totalCampanhas').textContent = data.summary.totalCampaigns || 0;

        // Melhor canal
        if (data.channels && data.channels.length > 0) {
          document.getElementById('melhorCanal').textContent = data.channels[0].name.substring(0, 10);
        }

        document.getElementById('qtdCardsOrigem').textContent = data.recentCards?.length || 0;

        renderizarOrigens(data.channels);
        renderizarCampanhas(data.campaigns);
        renderizarTabelaOrigens(data.recentCards);
      }

      function getSourceIcon(source) {
        const s = (source || '').toLowerCase();
        if (s.includes('instagram')) return { icon: 'fab fa-instagram', color: '#E4405F' };
        if (s.includes('facebook')) return { icon: 'fab fa-facebook-f', color: '#1877F2' };
        if (s.includes('whatsapp')) return { icon: 'fab fa-whatsapp', color: '#25D366' };
        if (s.includes('google')) return { icon: 'fab fa-google', color: '#4285F4' };
        if (s.includes('linkedin')) return { icon: 'fab fa-linkedin-in', color: '#0A66C2' };
        if (s.includes('tiktok')) return { icon: 'fab fa-tiktok', color: '#000000' };
        if (s.includes('youtube')) return { icon: 'fab fa-youtube', color: '#FF0000' };
        if (s.includes('organic') || s.includes('organico')) return { icon: 'fas fa-leaf', color: '#10b981' };
        if (s.includes('referral') || s.includes('indicacao')) return { icon: 'fas fa-user-friends', color: '#8b5cf6' };
        if (s.includes('site') || s.includes('website')) return { icon: 'fas fa-globe', color: '#3b82f6' };
        return { icon: 'fas fa-bullseye', color: '#6b7280' };
      }

      function renderizarOrigens(sources) {
        if (!sources || sources.length === 0) {
          document.getElementById('origemContainer').innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);"><i class="fas fa-inbox" style="font-size: 32px; opacity: 0.3;"></i><p>Nenhuma origem identificada</p></div>';
          return;
        }

        const total = sources.reduce((sum, s) => sum + s.count, 0);
        let html = '';

        sources.slice(0, 8).forEach((source, i) => {
          const { icon, color } = getSourceIcon(source.name);
          const pct = total > 0 ? ((source.count / total) * 100).toFixed(1) : 0;

          html += '<div class="source-row">';
          html += '<div class="source-icon" style="background: ' + color + ';"><i class="' + icon + '"></i></div>';
          html += '<div style="flex: 1;">';
          html += '<div style="font-weight: 600; font-size: 13px;">' + source.name + '</div>';
          html += '<div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">';
          html += '<div style="flex: 1; height: 4px; background: var(--border); border-radius: 2px;"><div style="width: ' + pct + '%; height: 100%; background: ' + color + '; border-radius: 2px;"></div></div>';
          html += '<span style="font-size: 11px; color: var(--text-secondary);">' + pct + '%</span>';
          html += '</div>';
          html += '</div>';
          html += '<div style="text-align: right;">';
          html += '<div style="font-size: 20px; font-weight: 700; color: ' + color + ';">' + source.count + '</div>';
          html += '<div style="font-size: 10px; color: var(--text-secondary);">cards</div>';
          html += '</div>';
          html += '</div>';
        });

        document.getElementById('origemContainer').innerHTML = html;
      }

      function renderizarCampanhas(campaigns) {
        if (!campaigns || campaigns.length === 0) {
          document.getElementById('campanhasContainer').innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);"><i class="fas fa-ad" style="font-size: 32px; opacity: 0.3;"></i><p>Nenhuma campanha identificada</p></div>';
          return;
        }

        let html = '';
        campaigns.slice(0, 10).forEach((camp, i) => {
          const { icon, color } = getSourceIcon(camp.channel);
          const campId = camp.id || '';
          const campIdDisplay = campId.length > 18 ? campId.substring(0, 18) + '...' : campId;

          html += '<div class="campaign-row" style="border-left-color: ' + color + ';">';
          html += '<div style="display: flex; justify-content: space-between; align-items: center;">';
          html += '<div style="flex: 1; min-width: 0;">';
          html += '<div style="font-size: 11px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;"><i class="' + icon + '" style="color: ' + color + ';"></i> ' + (camp.channel || 'Ads') + '</div>';
          html += '<div style="font-size: 12px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="' + campId + '">Campanha: ' + campIdDisplay + '</div>';

          // Mostrar conteúdos da campanha
          if (camp.contents && camp.contents.length > 0) {
            html += '<div style="margin-top: 4px; padding-left: 8px; border-left: 2px solid var(--border);">';
            camp.contents.slice(0, 2).forEach(cont => {
              const contentDisplay = cont.content.length > 35 ? cont.content.substring(0, 35) + '...' : cont.content;
              html += '<div style="font-size: 10px; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px;" title="' + cont.content + '"><i class="fas fa-comment-dots" style="margin-right: 4px; opacity: 0.5;"></i>' + contentDisplay + ' <span style="color: ' + color + '; font-weight: 600;">(' + cont.count + ')</span></div>';
            });
            html += '</div>';
          }

          html += '</div>';
          html += '<div style="text-align: right; margin-left: 12px;">';
          html += '<div style="font-size: 20px; font-weight: 700; color: ' + color + ';">' + camp.count + '</div>';
          html += '<div style="font-size: 10px; color: var(--text-secondary);">leads</div>';
          html += '</div>';
          html += '</div>';
          html += '</div>';
        });

        document.getElementById('campanhasContainer').innerHTML = html;
      }

      function renderizarTabelaOrigens(cards) {
        if (!cards || cards.length === 0) {
          document.getElementById('tabelaCardsOrigem').innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px;">Sem dados de origem</td></tr>';
          return;
        }

        let html = '';
        cards.forEach(card => {
          const { icon, color } = getSourceIcon(card.channel);
          const data = card.createdAt ? new Date(card.createdAt).toLocaleDateString('pt-BR') : '-';
          const campaignDisplay = card.campaign ? (card.campaign.length > 15 ? card.campaign.substring(0, 15) + '...' : card.campaign) : '-';
          const contentDisplay = card.content ? (card.content.length > 30 ? card.content.substring(0, 30) + '...' : card.content) : '-';

          html += '<tr>';
          html += '<td style="padding: 8px;"><span style="font-weight: 600;">' + (card.cardTitle || '-') + '</span></td>';
          html += '<td style="padding: 8px;">' + (card.contactName || '-') + '</td>';
          html += '<td style="padding: 8px;"><span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; background: ' + color + '15; border-radius: 4px; font-size: 11px;"><i class="' + icon + '" style="color: ' + color + '; font-size: 12px;"></i>' + (card.channel || '-') + '</span></td>';
          html += '<td style="padding: 8px; font-size: 11px; max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + (card.campaign || '') + '">' + campaignDisplay + '</td>';
          html += '<td style="padding: 8px; font-size: 11px; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + (card.content || '') + '">' + contentDisplay + '</td>';
          html += '<td style="padding: 8px; text-align: right; font-size: 11px; color: var(--text-secondary);">' + data + '</td>';
          html += '</tr>';
        });

        document.getElementById('tabelaCardsOrigem').innerHTML = html;
      }

      // ========== CONFIGURAÇÃO DO CRM ==========

      function abrirConfigCRM() {
        const modal = document.getElementById('modalConfigCRM');
        const input = document.getElementById('inputPanelId');

        // Carregar Panel ID atual do localStorage
        const panelIdAtual = localStorage.getItem('crm_panel_id') || '';
        input.value = panelIdAtual;

        modal.style.display = 'flex';
      }

      function fecharConfigCRM() {
        const modal = document.getElementById('modalConfigCRM');
        modal.style.display = 'none';
      }

      function salvarConfigCRM() {
        const input = document.getElementById('inputPanelId');
        const panelId = input.value.trim();

        if (!panelId) {
          alert('Por favor, insira um Panel ID válido');
          return;
        }

        // Salvar no localStorage
        localStorage.setItem('crm_panel_id', panelId);

        // Fechar modal
        fecharConfigCRM();

        // Atualizar badge
        atualizarPanelIdBadge();

        // Recarregar dados do CRM
        carregarDadosCRM();
      }

      function atualizarPanelIdBadge() {
        const badge = document.getElementById('panelIdBadge');
        const panelId = localStorage.getItem('crm_panel_id');

        if (panelId) {
          const shortId = panelId.substring(0, 8) + '...';
          badge.innerHTML = '<i class="fas fa-database"></i> ' + shortId;
          badge.style.background = 'rgba(16, 185, 129, 0.1)';
          badge.style.color = '#10b981';
          badge.title = 'Panel ID: ' + panelId + ' (clique para editar)';
        } else {
          badge.innerHTML = '<i class="fas fa-database"></i> Panel ID';
          badge.style.background = 'rgba(245, 158, 11, 0.1)';
          badge.style.color = '#f59e0b';
          badge.title = 'Nenhum Panel ID configurado (clique para configurar)';
        }
      }

      // Fechar modal ao clicar fora
      document.getElementById('modalConfigCRM')?.addEventListener('click', function(e) {
        if (e.target === this) {
          fecharConfigCRM();
        }
      });

      document.addEventListener('DOMContentLoaded', () => {
        atualizarPanelIdBadge();
        carregarDadosCRM();
        setInterval(carregarDadosCRM, 3 * 60 * 1000); // Refresh a cada 3 min
      });
    </script>
  `;

  return layout('CRM Live', content, 'crm', tenantData?.config);
}

function renderPlanejamento(env, tenantData = {}) {
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

  return layout('Planejamento de Metas', content, 'desempenho', tenantData?.config);
}

function renderAcompanhamento(env, tenantData = {}) {
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

  return layout('Acompanhamento Diário', content, 'desempenho', tenantData?.config);
}

function renderRelatorio(env, tenantData = {}) {
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

  return layout('Relatório de Desempenho', content, 'desempenho', tenantData?.config);
}

// ========================================
// FUNCOES NEW OESTE (ISP/TELECOM)
// ========================================

function renderDesempenhoHomeNewOeste(env, tenantData = {}) {
  const config = tenantData?.config || {};

  const content = `
    <div style="background: linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FF8C42 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px; color: white;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-chart-line" style="font-size: 22px;"></i>
        </div>
        <div>
          <h1 style="font-size: 24px; font-weight: 800; margin: 0;">Desempenho de Vendas</h1>
          <p style="font-size: 14px; margin: 0; opacity: 0.95;">Acompanhe metas, atividades e resultados de vendas</p>
        </div>
      </div>
    </div>

    <div class="stats-grid" style="margin-bottom: 32px;">
      <div class="stat-card" style="background: linear-gradient(135deg, #FF6B35, #FF8C42);">
        <div class="stat-value"><i class="fas fa-bullseye"></i></div>
        <div class="stat-label">Planejamento</div>
      </div>
      <div class="stat-card" style="background: linear-gradient(135deg, #FFD700, #FFA500);">
        <div class="stat-value"><i class="fas fa-calendar-check"></i></div>
        <div class="stat-label">Acompanhamento</div>
      </div>
      <div class="stat-card" style="background: linear-gradient(135deg, #10b981, #059669);">
        <div class="stat-value"><i class="fas fa-chart-bar"></i></div>
        <div class="stat-label">Relatório</div>
      </div>
    </div>

    <div class="grid grid-3">
      <a href="/desempenho/planejamento" class="card" style="text-decoration: none; color: inherit; cursor: pointer; transition: all 0.2s; border: 2px solid transparent;">
        <div class="card-header">
          <h3 class="card-title" style="color: #FF6B35;"><i class="fas fa-bullseye"></i> Planejamento de Metas</h3>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 13px;">
          Defina suas metas mensais de vendas: quantos contratos, qual ticket médio, e qual receita total você quer atingir.
        </p>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255, 107, 53, 0.05); border-radius: 8px; border-left: 3px solid #FF6B35;">
          <i class="fas fa-arrow-right" style="color: #FF6B35;"></i>
          <div>
            <div style="font-weight: 600; font-size: 13px;">Calcular Metas</div>
            <div style="font-size: 11px; color: var(--text-secondary);">Metas semanais e diárias</div>
          </div>
        </div>
      </a>

      <a href="/desempenho/acompanhamento" class="card" style="text-decoration: none; color: inherit; cursor: pointer; transition: all 0.2s; border: 2px solid transparent;">
        <div class="card-header">
          <h3 class="card-title" style="color: #FFD700;"><i class="fas fa-calendar-check"></i> Acompanhamento Diário</h3>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 13px;">
          Registre suas atividades diárias: ligações feitas, visitas técnicas, propostas enviadas e contratos fechados.
        </p>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255, 215, 0, 0.05); border-radius: 8px; border-left: 3px solid #FFD700;">
          <i class="fas fa-arrow-right" style="color: #FFD700;"></i>
          <div>
            <div style="font-weight: 600; font-size: 13px;">Registrar Atividades</div>
            <div style="font-size: 11px; color: var(--text-secondary);">Acompanhamento semanal</div>
          </div>
        </div>
      </a>

      <a href="/desempenho/relatorio" class="card" style="text-decoration: none; color: inherit; cursor: pointer; transition: all 0.2s; border: 2px solid transparent;">
        <div class="card-header">
          <h3 class="card-title" style="color: #10b981;"><i class="fas fa-chart-bar"></i> Relatório Mensal</h3>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 13px;">
          Visualize suas métricas de performance: taxa de conversão, ticket médio, receita gerada e comparativo com metas.
        </p>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(16, 185, 129, 0.05); border-radius: 8px; border-left: 3px solid #10b981;">
          <i class="fas fa-arrow-right" style="color: #10b981;"></i>
          <div>
            <div style="font-weight: 600; font-size: 13px;">Ver Relatório</div>
            <div style="font-size: 11px; color: var(--text-secondary);">Análise de resultados</div>
          </div>
        </div>
      </a>
    </div>

    <style>
      .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        border-color: #FF6B35 !important;
      }
    </style>
  `;

  return layout('Desempenho', content, 'desempenho', config);
}

function renderPlanejamentoNewOeste(env, tenantData = {}) {
  const config = tenantData?.config || {};

  const content = `
    <div style="background: linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FF8C42 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px; color: white;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <a href="/desempenho" style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.2s;">
          <i class="fas fa-arrow-left" style="font-size: 16px;"></i>
        </a>
        <div>
          <h1 style="font-size: 24px; font-weight: 800; margin: 0;">Planejamento de Metas</h1>
          <p style="font-size: 14px; margin: 0; opacity: 0.95;">Defina suas metas mensais e calcule metas diárias</p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-calculator"></i> Calcular Metas de Vendas</h3>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div class="form-group">
          <label class="form-label">Meta de Contratos no Mês</label>
          <input type="number" class="form-input" id="metaContratos" value="30" min="1" onchange="calcularMetas()">
          <small style="color: var(--text-secondary); margin-top: 4px; display: block;">Quantos contratos você quer fechar este mês?</small>
        </div>

        <div class="form-group">
          <label class="form-label">Ticket Médio Esperado</label>
          <input type="number" class="form-input" id="ticketMedio" value="120" min="1" onchange="calcularMetas()">
          <small style="color: var(--text-secondary); margin-top: 4px; display: block;">Valor médio dos planos (R$)</small>
        </div>

        <div class="form-group">
          <label class="form-label">Taxa de Conversão (%)</label>
          <input type="number" class="form-input" id="taxaConversao" value="20" min="1" max="100" onchange="calcularMetas()">
          <small style="color: var(--text-secondary); margin-top: 4px; display: block;">Quantos % dos leads viram clientes?</small>
        </div>

        <div class="form-group">
          <label class="form-label">Dias Úteis no Mês</label>
          <input type="number" class="form-input" id="diasUteis" value="22" min="1" onchange="calcularMetas()">
          <small style="color: var(--text-secondary); margin-top: 4px; display: block;">Quantos dias você vai trabalhar?</small>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 215, 0, 0.1)); padding: 24px; border-radius: 12px; border-left: 4px solid #FF6B35; margin-bottom: 24px;">
        <h4 style="color: #FF6B35; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-chart-line"></i> Suas Metas Calculadas
        </h4>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 16px;">
          <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 4px;">Contratos/Dia</div>
            <div style="font-size: 24px; font-weight: 700; color: #FF6B35;" id="metaDia">1.4</div>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 4px;">Contratos/Semana</div>
            <div style="font-size: 24px; font-weight: 700; color: #FFD700;" id="metaSemana">7</div>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 4px;">Leads Necessários</div>
            <div style="font-size: 24px; font-weight: 700; color: #10b981;" id="leadsNecessarios">150</div>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 4px;">Receita Esperada</div>
            <div style="font-size: 24px; font-weight: 700; color: #8b5cf6;" id="receitaEsperada">R$ 3.6k</div>
          </div>
        </div>

        <div style="background: rgba(255,255,255,0.5); padding: 16px; border-radius: 8px;">
          <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: #FF6B35;">💡 Recomendações:</div>
          <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: var(--text-secondary);">
            <li>Faça pelo menos <strong id="ligacoesDia">0</strong> ligações por dia</li>
            <li>Realize <strong id="visitasSemana">0</strong> visitas técnicas por semana</li>
            <li>Envie <strong id="propostasSemana">0</strong> propostas por semana</li>
          </ul>
        </div>
      </div>

      <div style="display: flex; gap: 12px;">
        <button class="btn btn-primary" onclick="salvarMetas()" style="background: linear-gradient(135deg, #FF6B35, #FF8C42); border: none;">
          <i class="fas fa-save"></i> Salvar Metas
        </button>
        <button class="btn btn-secondary" onclick="window.print()">
          <i class="fas fa-print"></i> Imprimir
        </button>
      </div>
    </div>

    <script>
      function calcularMetas() {
        const metaContratos = parseInt(document.getElementById('metaContratos').value) || 0;
        const ticketMedio = parseFloat(document.getElementById('ticketMedio').value) || 0;
        const taxaConversao = parseFloat(document.getElementById('taxaConversao').value) || 0;
        const diasUteis = parseInt(document.getElementById('diasUteis').value) || 0;

        // Calcular metas
        const metaDia = (metaContratos / diasUteis).toFixed(1);
        const metaSemana = Math.round(metaContratos / 4);
        const leadsNecessarios = Math.round(metaContratos / (taxaConversao / 100));
        const receitaEsperada = metaContratos * ticketMedio;

        // Recomendações
        const ligacoesDia = Math.round(leadsNecessarios / diasUteis * 2); // 2x leads
        const visitasSemana = Math.round(metaSemana * 1.5); // 1.5x contratos
        const propostasSemana = Math.round(metaSemana * 2); // 2x contratos

        // Atualizar UI
        document.getElementById('metaDia').textContent = metaDia;
        document.getElementById('metaSemana').textContent = metaSemana;
        document.getElementById('leadsNecessarios').textContent = leadsNecessarios;
        document.getElementById('receitaEsperada').textContent = 'R$ ' + (receitaEsperada / 1000).toFixed(1) + 'k';

        document.getElementById('ligacoesDia').textContent = ligacoesDia;
        document.getElementById('visitasSemana').textContent = visitasSemana;
        document.getElementById('propostasSemana').textContent = propostasSemana;
      }

      function salvarMetas() {
        const metas = {
          contratos: document.getElementById('metaContratos').value,
          ticket: document.getElementById('ticketMedio').value,
          conversao: document.getElementById('taxaConversao').value,
          dias: document.getElementById('diasUteis').value,
          data: new Date().toISOString()
        };
        localStorage.setItem('newoeste_metas', JSON.stringify(metas));
        showToast('Metas salvas com sucesso!');
      }

      // Carregar metas salvas
      const metasSalvas = localStorage.getItem('newoeste_metas');
      if (metasSalvas) {
        const metas = JSON.parse(metasSalvas);
        document.getElementById('metaContratos').value = metas.contratos || 30;
        document.getElementById('ticketMedio').value = metas.ticket || 120;
        document.getElementById('taxaConversao').value = metas.conversao || 20;
        document.getElementById('diasUteis').value = metas.dias || 22;
      }

      // Calcular ao carregar
      calcularMetas();
    </script>
  `;

  return layout('Planejamento', content, 'desempenho', config);
}

function renderAcompanhamentoNewOeste(env, tenantData = {}) {
  const config = tenantData?.config || {};

  const content = `
    <div style="background: linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FF8C42 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px; color: white;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <a href="/desempenho" style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.2s;">
          <i class="fas fa-arrow-left" style="font-size: 16px;"></i>
        </a>
        <div>
          <h1 style="font-size: 24px; font-weight: 800; margin: 0;">Acompanhamento Diário</h1>
          <p style="font-size: 14px; margin: 0; opacity: 0.95;">Registre suas atividades e acompanhe o progresso</p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-calendar-week"></i> Semana Atual</h3>
      </div>

      <div style="margin-bottom: 24px;">
        <label class="form-label">Selecione o Dia</label>
        <select class="form-select" id="diaSelecionado" onchange="carregarDia()">
          <option value="seg">Segunda-feira</option>
          <option value="ter">Terça-feira</option>
          <option value="qua">Quarta-feira</option>
          <option value="qui">Quinta-feira</option>
          <option value="sex">Sexta-feira</option>
          <option value="sab">Sábado</option>
        </select>
      </div>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-phone" style="color: #FF6B35;"></i> Ligações Realizadas
          </label>
          <input type="number" class="form-input" id="ligacoes" value="0" min="0" onchange="salvarDia()">
        </div>

        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-user-check" style="color: #10b981;"></i> Contatos Qualificados
          </label>
          <input type="number" class="form-input" id="qualificados" value="0" min="0" onchange="salvarDia()">
        </div>

        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-home" style="color: #3b82f6;"></i> Visitas Técnicas
          </label>
          <input type="number" class="form-input" id="visitas" value="0" min="0" onchange="salvarDia()">
        </div>

        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-file-invoice" style="color: #FFD700;"></i> Propostas Enviadas
          </label>
          <input type="number" class="form-input" id="propostas" value="0" min="0" onchange="salvarDia()">
        </div>

        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-check-circle" style="color: #10b981;"></i> Contratos Fechados
          </label>
          <input type="number" class="form-input" id="contratos" value="0" min="0" onchange="salvarDia()">
        </div>

        <div class="form-group">
          <label class="form-label">
            <i class="fas fa-dollar-sign" style="color: #8b5cf6;"></i> Receita Gerada (R$)
          </label>
          <input type="number" class="form-input" id="receita" value="0" min="0" onchange="salvarDia()">
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(255, 215, 0, 0.1)); padding: 20px; border-radius: 12px; border-left: 4px solid #FF6B35; margin-bottom: 20px;">
        <h4 style="color: #FF6B35; margin-bottom: 16px;">📊 Resumo da Semana</h4>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary);">Total Ligações</div>
            <div style="font-size: 20px; font-weight: 700; color: #FF6B35;" id="totalLigacoes">0</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary);">Total Visitas</div>
            <div style="font-size: 20px; font-weight: 700; color: #3b82f6;" id="totalVisitas">0</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary);">Total Contratos</div>
            <div style="font-size: 20px; font-weight: 700; color: #10b981;" id="totalContratos">0</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary);">Taxa Conversão</div>
            <div style="font-size: 20px; font-weight: 700; color: #FFD700;" id="taxaConversao">0%</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary);">Receita Semana</div>
            <div style="font-size: 20px; font-weight: 700; color: #8b5cf6;" id="receitaSemana">R$ 0</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 8px; text-align: center;">
            <div style="font-size: 11px; color: var(--text-secondary);">Ticket Médio</div>
            <div style="font-size: 20px; font-weight: 700; color: #ef4444;" id="ticketMedio">R$ 0</div>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 12px;">
        <button class="btn btn-primary" onclick="limparSemana()" style="background: linear-gradient(135deg, #FF6B35, #FF8C42); border: none;">
          <i class="fas fa-sync"></i> Nova Semana
        </button>
        <button class="btn btn-secondary" onclick="exportarDados()">
          <i class="fas fa-download"></i> Exportar Dados
        </button>
      </div>
    </div>

    <script>
      const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

      function carregarDia() {
        const dia = document.getElementById('diaSelecionado').value;
        const dados = JSON.parse(localStorage.getItem('newoeste_atividades_' + dia) || '{}');

        document.getElementById('ligacoes').value = dados.ligacoes || 0;
        document.getElementById('qualificados').value = dados.qualificados || 0;
        document.getElementById('visitas').value = dados.visitas || 0;
        document.getElementById('propostas').value = dados.propostas || 0;
        document.getElementById('contratos').value = dados.contratos || 0;
        document.getElementById('receita').value = dados.receita || 0;

        atualizarResumo();
      }

      function salvarDia() {
        const dia = document.getElementById('diaSelecionado').value;
        const dados = {
          ligacoes: parseInt(document.getElementById('ligacoes').value) || 0,
          qualificados: parseInt(document.getElementById('qualificados').value) || 0,
          visitas: parseInt(document.getElementById('visitas').value) || 0,
          propostas: parseInt(document.getElementById('propostas').value) || 0,
          contratos: parseInt(document.getElementById('contratos').value) || 0,
          receita: parseFloat(document.getElementById('receita').value) || 0
        };

        localStorage.setItem('newoeste_atividades_' + dia, JSON.stringify(dados));
        atualizarResumo();
      }

      function atualizarResumo() {
        let totalLigacoes = 0, totalVisitas = 0, totalContratos = 0, totalQualificados = 0, receitaTotal = 0;

        DIAS.forEach(dia => {
          const dados = JSON.parse(localStorage.getItem('newoeste_atividades_' + dia) || '{}');
          totalLigacoes += dados.ligacoes || 0;
          totalVisitas += dados.visitas || 0;
          totalContratos += dados.contratos || 0;
          totalQualificados += dados.qualificados || 0;
          receitaTotal += dados.receita || 0;
        });

        const taxa = totalQualificados > 0 ? ((totalContratos / totalQualificados) * 100).toFixed(1) : 0;
        const ticket = totalContratos > 0 ? (receitaTotal / totalContratos).toFixed(0) : 0;

        document.getElementById('totalLigacoes').textContent = totalLigacoes;
        document.getElementById('totalVisitas').textContent = totalVisitas;
        document.getElementById('totalContratos').textContent = totalContratos;
        document.getElementById('taxaConversao').textContent = taxa + '%';
        document.getElementById('receitaSemana').textContent = 'R$ ' + receitaTotal.toFixed(0);
        document.getElementById('ticketMedio').textContent = 'R$ ' + ticket;
      }

      function limparSemana() {
        if (confirm('Deseja limpar todos os dados da semana e começar uma nova?')) {
          DIAS.forEach(dia => {
            localStorage.removeItem('newoeste_atividades_' + dia);
          });
          carregarDia();
          showToast('Semana limpa! Comece um novo registro.');
        }
      }

      function exportarDados() {
        let csv = 'Dia,Ligações,Qualificados,Visitas,Propostas,Contratos,Receita\\n';
        const nomesDias = {'seg': 'Segunda', 'ter': 'Terça', 'qua': 'Quarta', 'qui': 'Quinta', 'sex': 'Sexta', 'sab': 'Sábado'};

        DIAS.forEach(dia => {
          const dados = JSON.parse(localStorage.getItem('newoeste_atividades_' + dia) || '{}');
          csv += nomesDias[dia] + ',' + (dados.ligacoes || 0) + ',' + (dados.qualificados || 0) + ',' +
                 (dados.visitas || 0) + ',' + (dados.propostas || 0) + ',' + (dados.contratos || 0) + ',' +
                 (dados.receita || 0) + '\\n';
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'atividades_newoeste.csv';
        a.click();
      }

      // Selecionar dia atual
      const hoje = new Date().getDay();
      const diasMap = {0: 'seg', 1: 'seg', 2: 'ter', 3: 'qua', 4: 'qui', 5: 'sex', 6: 'sab'};
      document.getElementById('diaSelecionado').value = diasMap[hoje];

      // Carregar dia atual
      carregarDia();
    </script>
  `;

  return layout('Acompanhamento', content, 'desempenho', config);
}

function renderRelatorioNewOeste(env, tenantData = {}) {
  const config = tenantData?.config || {};

  const content = `
    <div style="background: linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FF8C42 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px; color: white;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <a href="/desempenho" style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; text-decoration: none; transition: all 0.2s;">
          <i class="fas fa-arrow-left" style="font-size: 16px;"></i>
        </a>
        <div>
          <h1 style="font-size: 24px; font-weight: 800; margin: 0;">Relatório de Performance</h1>
          <p style="font-size: 14px; margin: 0; opacity: 0.95;">Análise completa dos seus resultados</p>
        </div>
      </div>
    </div>

    <div class="card" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-chart-pie"></i> Resumo do Mês</h3>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
        <div style="background: linear-gradient(135deg, #FF6B35, #FF8C42); padding: 20px; border-radius: 12px; color: white; text-align: center;">
          <div style="font-size: 12px; opacity: 0.9; margin-bottom: 8px;">Total de Ligações</div>
          <div style="font-size: 32px; font-weight: 700;" id="relTotalLigacoes">0</div>
        </div>
        <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); padding: 20px; border-radius: 12px; color: white; text-align: center;">
          <div style="font-size: 12px; opacity: 0.9; margin-bottom: 8px;">Visitas Realizadas</div>
          <div style="font-size: 32px; font-weight: 700;" id="relTotalVisitas">0</div>
        </div>
        <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 20px; border-radius: 12px; color: white; text-align: center;">
          <div style="font-size: 12px; opacity: 0.9; margin-bottom: 8px;">Contratos Fechados</div>
          <div style="font-size: 32px; font-weight: 700;" id="relTotalContratos">0</div>
        </div>
        <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); padding: 20px; border-radius: 12px; color: white; text-align: center;">
          <div style="font-size: 12px; opacity: 0.9; margin-bottom: 8px;">Receita Total</div>
          <div style="font-size: 32px; font-weight: 700;" id="relReceitaTotal">R$ 0</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <div style="background: var(--bg-page); padding: 16px; border-radius: 8px; border-left: 3px solid #FFD700;">
          <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 4px;">Taxa de Conversão</div>
          <div style="font-size: 24px; font-weight: 700; color: #FFD700;" id="relTaxaConversao">0%</div>
        </div>
        <div style="background: var(--bg-page); padding: 16px; border-radius: 8px; border-left: 3px solid #ef4444;">
          <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 4px;">Ticket Médio</div>
          <div style="font-size: 24px; font-weight: 700; color: #ef4444;" id="relTicketMedio">R$ 0</div>
        </div>
        <div style="background: var(--bg-page); padding: 16px; border-radius: 8px; border-left: 3px solid #10b981;">
          <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 4px;">Atingimento de Meta</div>
          <div style="font-size: 24px; font-weight: 700; color: #10b981;" id="relAtingimento">0%</div>
        </div>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-calendar-week"></i> Performance Semanal</h3>
        </div>

        <table style="width: 100%; font-size: 13px;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border);">
              <th style="text-align: left; padding: 8px; color: var(--text-secondary);">Semana</th>
              <th style="text-align: center; padding: 8px; color: var(--text-secondary);">Ligações</th>
              <th style="text-align: center; padding: 8px; color: var(--text-secondary);">Contratos</th>
              <th style="text-align: center; padding: 8px; color: var(--text-secondary);">Receita</th>
            </tr>
          </thead>
          <tbody id="tabelaSemanal">
            <tr>
              <td colspan="4" style="text-align: center; padding: 24px; color: var(--text-secondary);">
                Registre suas atividades para ver o relatório
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-trophy"></i> Conquistas do Mês</h3>
        </div>

        <div id="conquistas" style="display: flex; flex-direction: column; gap: 12px;">
          <div style="padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 3px solid #10b981; display: flex; align-items: center; gap: 12px;">
            <i class="fas fa-check-circle" style="font-size: 24px; color: #10b981;"></i>
            <div>
              <div style="font-weight: 600; font-size: 13px;">Meta Atingida</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Você bateu sua meta de contratos!</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

      function gerarRelatorio() {
        let totalLigacoes = 0, totalVisitas = 0, totalContratos = 0, totalQualificados = 0, receitaTotal = 0;

        // Calcular totais
        DIAS.forEach(dia => {
          const dados = JSON.parse(localStorage.getItem('newoeste_atividades_' + dia) || '{}');
          totalLigacoes += dados.ligacoes || 0;
          totalVisitas += dados.visitas || 0;
          totalContratos += dados.contratos || 0;
          totalQualificados += dados.qualificados || 0;
          receitaTotal += dados.receita || 0;
        });

        // Calcular métricas
        const taxaConversao = totalQualificados > 0 ? ((totalContratos / totalQualificados) * 100).toFixed(1) : 0;
        const ticketMedio = totalContratos > 0 ? (receitaTotal / totalContratos).toFixed(0) : 0;

        // Carregar meta
        const metasSalvas = localStorage.getItem('newoeste_metas');
        let metaContratos = 30;
        if (metasSalvas) {
          const metas = JSON.parse(metasSalvas);
          metaContratos = parseInt(metas.contratos) || 30;
        }

        const atingimento = ((totalContratos / metaContratos) * 100).toFixed(0);

        // Atualizar UI
        document.getElementById('relTotalLigacoes').textContent = totalLigacoes;
        document.getElementById('relTotalVisitas').textContent = totalVisitas;
        document.getElementById('relTotalContratos').textContent = totalContratos;
        document.getElementById('relReceitaTotal').textContent = 'R$ ' + receitaTotal.toLocaleString('pt-BR');
        document.getElementById('relTaxaConversao').textContent = taxaConversao + '%';
        document.getElementById('relTicketMedio').textContent = 'R$ ' + ticketMedio;
        document.getElementById('relAtingimento').textContent = atingimento + '%';

        // Gerar tabela semanal (simplificado - apenas semana atual)
        const tbody = document.getElementById('tabelaSemanal');
        tbody.innerHTML = \`
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 12px;">Semana Atual</td>
            <td style="text-align: center; padding: 12px;">\${totalLigacoes}</td>
            <td style="text-align: center; padding: 12px; font-weight: 600; color: #10b981;">\${totalContratos}</td>
            <td style="text-align: center; padding: 12px; font-weight: 600;">R$ \${receitaTotal.toFixed(0)}</td>
          </tr>
        \`;

        // Atualizar conquistas
        const conquistas = document.getElementById('conquistas');
        let conquistasHTML = '';

        if (atingimento >= 100) {
          conquistasHTML += \`
            <div style="padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 3px solid #10b981; display: flex; align-items: center; gap: 12px;">
              <i class="fas fa-trophy" style="font-size: 24px; color: #FFD700;"></i>
              <div>
                <div style="font-weight: 600; font-size: 13px;">🎉 Meta Atingida!</div>
                <div style="font-size: 11px; color: var(--text-secondary);">Você alcançou \${atingimento}% da sua meta</div>
              </div>
            </div>
          \`;
        }

        if (totalContratos >= 10) {
          conquistasHTML += \`
            <div style="padding: 12px; background: rgba(255, 107, 53, 0.1); border-radius: 8px; border-left: 3px solid #FF6B35; display: flex; align-items: center; gap: 12px;">
              <i class="fas fa-fire" style="font-size: 24px; color: #FF6B35;"></i>
              <div>
                <div style="font-weight: 600; font-size: 13px;">Vendedor Destaque</div>
                <div style="font-size: 11px; color: var(--text-secondary);">\${totalContratos} contratos fechados</div>
              </div>
            </div>
          \`;
        }

        if (taxaConversao >= 20) {
          conquistasHTML += \`
            <div style="padding: 12px; background: rgba(59, 130, 246, 0.1); border-radius: 8px; border-left: 3px solid #3b82f6; display: flex; align-items: center; gap: 12px;">
              <i class="fas fa-chart-line" style="font-size: 24px; color: #3b82f6;"></i>
              <div>
                <div style="font-weight: 600; font-size: 13px;">Alta Conversão</div>
                <div style="font-size: 11px; color: var(--text-secondary);">\${taxaConversao}% de taxa de conversão</div>
              </div>
            </div>
          \`;
        }

        if (!conquistasHTML) {
          conquistasHTML = \`
            <div style="padding: 24px; text-align: center; color: var(--text-secondary);">
              Continue registrando suas atividades para desbloquear conquistas!
            </div>
          \`;
        }

        conquistas.innerHTML = conquistasHTML;
      }

      // Gerar relatório ao carregar
      gerarRelatorio();
    </script>
  `;

  return layout('Relatório', content, 'desempenho', config);
}
