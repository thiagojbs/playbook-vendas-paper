import { layout } from '../templates/layout.js';
import { PROCESSO_VENDAS, SCRIPTS, OBJECOES, CHECKLIST_COMERCIAL, CHECKLIST_CONTRATO, LINKS_UTEIS } from '../data/playbook.js';
import { PLANOS_CHATBOTS, PLANOS_TELECOM, PLANOS_IA } from '../data/precos.js';
import { OBJECOES_EXPANDIDAS, TECNICAS_GERAIS, GATILHOS_MENTAIS, DIFERENCIAIS, ESTATISTICAS_PAPERVINES } from '../data/objecoes.js';
import { ETAPAS_FUNIL, SCRIPTS_STATS, SEQUENCIAS_COMPLETAS, DICAS_COMUNICACAO, TEMPLATES_SEGMENTO } from '../data/scripts.js';
import { POLITICAS_WHATSAPP, POLITICAS_META_ANUNCIOS, PRECOS_WHATSAPP, REQUISITOS_API_EXPANDIDOS, FLUXO_IMPLANTACAO, PERGUNTAS_FREQUENTES, DIFERENCIAIS_PAPERVINES, LINKS_IMPORTANTES } from '../data/playbook-expandido.js';

export function renderPlaybook(path) {
  let content = '';
  let activeMenu = 'playbook';
  if (path.includes('/scripts')) { content = renderScripts(); activeMenu = 'scripts'; }
  else if (path.includes('/objecoes')) { content = renderObjecoes(); activeMenu = 'objecoes'; }
  else if (path.includes('/planos')) { content = renderPlanos(); activeMenu = 'planos'; }
  else { content = renderPlaybookMain(); }
  return layout('Playbook', content, activeMenu);
}

function renderPlaybookMain() {
  // Diferenciais Paper Vines
  const diferenciaisHtml = DIFERENCIAIS_PAPERVINES.map(d => `
    <div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: ${d.destaque ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1))' : 'white'}; border: 1px solid ${d.destaque ? 'var(--primary)' : 'var(--border)'}; border-radius: 12px; ${d.destaque ? 'box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);' : ''}">
      <div style="width: 44px; height: 44px; background: ${d.destaque ? 'var(--primary)' : 'var(--bg-page)'}; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i class="fas fa-${d.icone}" style="color: ${d.destaque ? 'white' : 'var(--primary)'}; font-size: 18px;"></i>
      </div>
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">${d.titulo}</div>
        <div style="font-size: 13px; color: var(--text-secondary);">${d.descricao}</div>
      </div>
    </div>
  `).join('');

  // Precos WhatsApp
  const precosHtml = PRECOS_WHATSAPP.categorias.map(cat => `
    <div style="background: white; border: 1px solid var(--border); border-radius: 12px; padding: 20px; text-align: center; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: ${cat.cor};"></div>
      <div style="width: 48px; height: 48px; background: ${cat.cor}15; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px;">
        <i class="fas fa-${cat.icone}" style="color: ${cat.cor}; font-size: 20px;"></i>
      </div>
      <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">${cat.nome}</div>
      <div style="font-size: 28px; font-weight: 700; color: ${cat.cor};">$${cat.valor.toFixed(4)}</div>
      <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">USD por conversa</div>
      <div style="font-size: 12px; color: var(--text-secondary); text-align: left; padding: 12px; background: var(--bg-page); border-radius: 8px;">
        ${cat.descricao}
      </div>
    </div>
  `).join('');

  const beneficiosHtml = PRECOS_WHATSAPP.beneficios.map(b => `
    <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: rgba(16, 185, 129, 0.08); border-radius: 8px;">
      <i class="fas fa-gift" style="color: var(--secondary); font-size: 16px; margin-top: 2px;"></i>
      <div>
        <div style="font-weight: 600; font-size: 14px;">${b.titulo}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">${b.descricao}</div>
      </div>
    </div>
  `).join('');

  // Politicas WhatsApp
  const politicasWhatsappHtml = POLITICAS_WHATSAPP.secoes.map(sec => `
    <div class="accordion">
      <div class="accordion-header">
        <div class="accordion-title">
          <i class="fas fa-${sec.icone}" style="color: var(--primary); margin-right: 8px;"></i>
          ${sec.titulo}
        </div>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="accordion-content">
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${sec.itens.map(item => `
            <li style="display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border);">
              <i class="fas fa-check-circle" style="color: var(--secondary); margin-top: 3px;"></i>
              <span style="font-size: 13px;">${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  const consequenciasHtml = POLITICAS_WHATSAPP.consequencias.map(c => `
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: rgba(239, 68, 68, 0.08); border-radius: 6px; font-size: 12px;">
      <i class="fas fa-exclamation-triangle" style="color: #ef4444;"></i>
      ${c}
    </div>
  `).join('');

  // Politicas Meta Anuncios
  const metaProibidoHtml = POLITICAS_META_ANUNCIOS.proibido.map(p => `
    <div style="display: flex; align-items: flex-start; gap: 10px; padding: 10px; border-bottom: 1px solid var(--border);">
      <i class="fas fa-times-circle" style="color: #ef4444; margin-top: 3px;"></i>
      <div>
        <div style="font-weight: 500; font-size: 13px;">${p.item}</div>
        <div style="font-size: 12px; color: var(--text-secondary);">${p.descricao}</div>
      </div>
    </div>
  `).join('');

  const metaRestritoHtml = POLITICAS_META_ANUNCIOS.restrito_18.map(r => `
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px 0; font-size: 13px;">
      <i class="fas fa-user-shield" style="color: #f59e0b;"></i>
      ${r}
    </div>
  `).join('');

  // Requisitos API
  const requisitosHtml = REQUISITOS_API_EXPANDIDOS.itens.map(req => `
    <div style="display: flex; align-items: flex-start; gap: 16px; padding: 16px; background: white; border: 1px solid var(--border); border-radius: 12px; ${req.obrigatorio ? 'border-left: 4px solid ' + req.cor : ''}">
      <div style="width: 44px; height: 44px; background: ${req.cor}15; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i class="fas fa-${req.icone}" style="color: ${req.cor}; font-size: 18px;"></i>
      </div>
      <div style="flex: 1;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-weight: 600;">${req.requisito}</span>
          ${req.obrigatorio ? '<span class="badge badge-danger" style="font-size: 10px;">OBRIGATORIO</span>' : '<span class="badge badge-info" style="font-size: 10px;">RECOMENDADO</span>'}
        </div>
        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">${req.descricao}</div>
        <div style="font-size: 12px; padding: 8px 12px; background: var(--bg-page); border-radius: 6px;">
          <i class="fas fa-lightbulb" style="color: #f59e0b; margin-right: 6px;"></i>
          <strong>Dica:</strong> ${req.dica}
        </div>
      </div>
    </div>
  `).join('');

  // Fluxo de Implantacao
  const fluxoHtml = FLUXO_IMPLANTACAO.etapas.map((etapa, index) => `
    <div style="display: flex; gap: 16px; position: relative;">
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="width: 40px; height: 40px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 16px; z-index: 1;">
          ${etapa.numero}
        </div>
        ${index < FLUXO_IMPLANTACAO.etapas.length - 1 ? '<div style="width: 2px; flex: 1; background: var(--primary); margin: 4px 0;"></div>' : ''}
      </div>
      <div style="flex: 1; padding-bottom: ${index < FLUXO_IMPLANTACAO.etapas.length - 1 ? '24px' : '0'};">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <span style="font-weight: 600; font-size: 16px;">${etapa.titulo}</span>
          <span class="badge badge-info">${etapa.tempo}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          ${etapa.acoes.map(acao => `
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 8px 12px; background: var(--bg-page); border-radius: 6px;">
              <i class="fas fa-check" style="color: var(--secondary);"></i>
              ${acao}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // Perguntas Frequentes
  const faqHtml = PERGUNTAS_FREQUENTES.map(faq => `
    <div class="accordion">
      <div class="accordion-header">
        <div class="accordion-title">
          <i class="fas fa-question-circle" style="color: var(--primary); margin-right: 8px;"></i>
          ${faq.pergunta}
        </div>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="accordion-content">
        <p style="margin: 0; font-size: 14px; line-height: 1.6;">${faq.resposta}</p>
      </div>
    </div>
  `).join('');

  // Links Importantes
  const linksHtml = Object.entries(LINKS_IMPORTANTES).map(([categoria, links]) => {
    const categoriaLabel = categoria === 'politicas' ? 'Politicas e Regras' :
                          categoria === 'ferramentas' ? 'Ferramentas de Trabalho' : 'Tutoriais e Recursos';
    const categoriaIcon = categoria === 'politicas' ? 'shield-alt' :
                         categoria === 'ferramentas' ? 'tools' : 'graduation-cap';
    return `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <i class="fas fa-${categoriaIcon}" style="color: var(--primary);"></i>
          <span style="font-weight: 600;">${categoriaLabel}</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${links.map(link => `
            <a href="${link.url}" target="_blank" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: white; border: 1px solid var(--border); border-radius: 8px; text-decoration: none; color: inherit; transition: all 0.2s;">
              <i class="fas fa-external-link-alt" style="color: var(--primary);"></i>
              <div style="flex: 1;">
                <div style="font-weight: 500; font-size: 14px;">${link.titulo}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">${link.descricao}</div>
              </div>
              <i class="fas fa-chevron-right" style="color: var(--text-secondary);"></i>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Processo de Vendas (do original)
  const etapasVendaHtml = PROCESSO_VENDAS.etapas.map(etapa => {
    const acoesHtml = etapa.acoes.map(acao => `
      <li style="display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border);">
        <i class="fas fa-check-circle" style="color: var(--primary);"></i>
        ${acao}
      </li>
    `).join('');
    return `
      <div class="accordion">
        <div class="accordion-header">
          <div class="accordion-title">
            <span style="width: 28px; height: 28px; background: var(--primary); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; margin-right: 8px; color: white;">${etapa.numero}</span>
            ${etapa.titulo}
            <span class="badge badge-info" style="margin-left: 12px;">${etapa.tempo_estimado}</span>
          </div>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div class="accordion-content">
          <p style="margin-bottom: 16px; color: var(--text-secondary);">${etapa.descricao}</p>
          <div style="font-weight: 500; margin-bottom: 8px;">Acoes:</div>
          <ul style="list-style: none; padding: 0;">${acoesHtml}</ul>
        </div>
      </div>
    `;
  }).join('');

  // Checklist
  const checklistHtml = CHECKLIST_COMERCIAL.map(item => `
    <div style="display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border);">
      <input type="checkbox" style="width: 18px; height: 18px; accent-color: var(--primary);">
      <span style="font-size: 13px;">${item.item}</span>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-book-open"></i> Playbook de Vendas</h1>
      <p class="page-subtitle">Guia completo do processo comercial Paper Vines - Politicas, Precos e Boas Praticas</p>
    </div>

    <!-- Diferenciais -->
    <div class="card fade-in" style="margin-bottom: 24px; background: linear-gradient(135deg, #f8f9fa, white);">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-trophy" style="color: #f59e0b;"></i> Por que Paper Vines?</h3>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        ${diferenciaisHtml}
      </div>
    </div>

    <!-- Precos WhatsApp -->
    <div class="card fade-in" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fab fa-whatsapp" style="color: #25D366;"></i> ${PRECOS_WHATSAPP.titulo}</h3>
        <a href="${PRECOS_WHATSAPP.link}" target="_blank" class="badge badge-info" style="text-decoration: none;">
          <i class="fas fa-external-link-alt"></i> Ver tabela completa
        </a>
      </div>
      <div style="margin-bottom: 16px; padding: 12px 16px; background: rgba(59, 130, 246, 0.08); border-radius: 8px; border-left: 4px solid #3b82f6;">
        <i class="fas fa-info-circle" style="color: #3b82f6; margin-right: 8px;"></i>
        <span style="font-size: 13px;"><strong>Atualizado:</strong> ${PRECOS_WHATSAPP.atualizacao} | ${PRECOS_WHATSAPP.info_importante}</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px;">
        ${precosHtml}
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
        ${beneficiosHtml}
      </div>
    </div>

    <!-- Politicas WhatsApp -->
    <div class="card fade-in" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-shield-alt" style="color: #25D366;"></i> ${POLITICAS_WHATSAPP.titulo}</h3>
        <a href="${POLITICAS_WHATSAPP.link}" target="_blank" class="badge badge-success" style="text-decoration: none;">
          <i class="fas fa-external-link-alt"></i> Enviar para cliente
        </a>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 14px;">${POLITICAS_WHATSAPP.resumo}</p>
      ${politicasWhatsappHtml}
      <div style="margin-top: 20px;">
        <div style="font-weight: 600; margin-bottom: 12px; color: #ef4444;">
          <i class="fas fa-exclamation-triangle"></i> Consequencias de Violacoes
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
          ${consequenciasHtml}
        </div>
      </div>
    </div>

    <!-- Politicas Meta Anuncios -->
    <div class="card fade-in" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fab fa-meta" style="color: #1877F2;"></i> ${POLITICAS_META_ANUNCIOS.titulo}</h3>
        <a href="${POLITICAS_META_ANUNCIOS.link}" target="_blank" class="badge badge-info" style="text-decoration: none;">
          <i class="fas fa-external-link-alt"></i> Ver politica completa
        </a>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 14px;">${POLITICAS_META_ANUNCIOS.resumo}</p>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <div style="font-weight: 600; margin-bottom: 12px; color: #ef4444;">
            <i class="fas fa-ban"></i> Conteudo Proibido
          </div>
          <div style="background: rgba(239, 68, 68, 0.05); border-radius: 8px; padding: 4px;">
            ${metaProibidoHtml}
          </div>
        </div>
        <div>
          <div style="font-weight: 600; margin-bottom: 12px; color: #f59e0b;">
            <i class="fas fa-user-shield"></i> Restrito a +18
          </div>
          <div style="background: rgba(245, 158, 11, 0.05); border-radius: 8px; padding: 12px;">
            ${metaRestritoHtml}
          </div>
        </div>
      </div>

      <div style="margin-top: 16px; padding: 16px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(59, 130, 246, 0.08)); border-radius: 8px; border-left: 4px solid var(--primary);">
        <div style="font-weight: 600; margin-bottom: 4px;">
          <i class="fas fa-lightbulb" style="color: var(--primary);"></i> Dica para o Vendedor
        </div>
        <p style="margin: 0; font-size: 13px; color: var(--text-secondary);">${POLITICAS_META_ANUNCIOS.dica_vendedor}</p>
      </div>
    </div>

    <!-- Requisitos API -->
    <div class="card fade-in" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-cogs" style="color: var(--primary);"></i> ${REQUISITOS_API_EXPANDIDOS.titulo}</h3>
      </div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        ${requisitosHtml}
      </div>
    </div>

    <!-- Fluxo de Implantacao -->
    <div class="card fade-in" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-project-diagram" style="color: var(--primary);"></i> ${FLUXO_IMPLANTACAO.titulo}</h3>
        <span class="badge badge-info">7-14 dias em media</span>
      </div>
      <div style="padding: 20px 0;">
        ${fluxoHtml}
      </div>
    </div>

    <div class="grid grid-2" style="margin-bottom: 24px;">
      <!-- Processo de Vendas -->
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-route"></i> Etapas do Processo de Vendas</h3>
        </div>
        ${etapasVendaHtml}
      </div>

      <!-- FAQ -->
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-question-circle"></i> Perguntas Frequentes</h3>
        </div>
        ${faqHtml}
      </div>
    </div>

    <div class="grid grid-2">
      <!-- Checklist -->
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-clipboard-list"></i> Checklist Comercial</h3>
        </div>
        ${checklistHtml}
      </div>

      <!-- Links Importantes -->
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-link"></i> Links Importantes</h3>
        </div>
        ${linksHtml}
      </div>
    </div>
  `;
}

function renderScripts() {
  // Stats
  const statsHtml = `
    <div class="stats-grid" style="margin-bottom: 24px;">
      <div class="stat-card purple">
        <div class="stat-value">${SCRIPTS_STATS.total_scripts}</div>
        <div class="stat-label">Scripts Prontos</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-value">${SCRIPTS_STATS.categorias}</div>
        <div class="stat-label">Etapas do Funil</div>
      </div>
      <div class="stat-card green">
        <div class="stat-value">${SCRIPTS_STATS.sequencias}</div>
        <div class="stat-label">Sequencias Automaticas</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-value">${SCRIPTS_STATS.taxa_resposta}</div>
        <div class="stat-label">Taxa Media de Resposta</div>
      </div>
    </div>
  `;

  // Dicas de Comunicacao
  const dicasHtml = DICAS_COMUNICACAO.map(cat => `
    <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <div style="width: 32px; height: 32px; background: var(--primary); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-${cat.icone}" style="color: white; font-size: 14px;"></i>
        </div>
        <span style="font-weight: 600;">${cat.titulo}</span>
      </div>
      <ul style="list-style: none; padding: 0; margin: 0; font-size: 13px;">
        ${cat.dicas.map(d => `<li style="padding: 4px 0; color: var(--text-secondary);"><i class="fas fa-check" style="color: var(--secondary); margin-right: 8px;"></i>${d}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Tabs de etapas do funil
  const etapas = Object.entries(ETAPAS_FUNIL);
  const tabsHtml = etapas.map(([key, etapa], index) => `
    <div class="tab ${index === 0 ? 'active' : ''}" data-tab="${key}">
      <i class="fas fa-${etapa.icone}" style="color: ${etapa.cor};"></i> ${etapa.nome}
    </div>
  `).join('');

  // Conteudo de cada etapa
  const tabContentsHtml = etapas.map(([key, etapa], index) => {
    const scriptsHtml = etapa.scripts.map(script => {
      const variacoesHtml = script.variacoes.length > 0 ? `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">
          <div style="font-weight: 500; margin-bottom: 12px; font-size: 13px; color: var(--text-secondary);">
            <i class="fas fa-random"></i> Variacoes disponiveis:
          </div>
          ${script.variacoes.map(v => `
            <div style="margin-bottom: 12px;">
              <div style="font-size: 12px; font-weight: 500; color: var(--primary); margin-bottom: 6px;">${v.nome}</div>
              <div class="message-box" style="font-size: 12px;">
                <button class="copy-btn" onclick="copyToClipboard(\`${v.mensagem.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)">
                  <i class="fas fa-copy"></i> Copiar
                </button>
                ${v.mensagem}
              </div>
            </div>
          `).join('')}
        </div>
      ` : '';

      const gatilhosHtml = script.gatilhos.map(g => `<span class="badge badge-purple" style="font-size: 11px; margin-right: 4px;">${g}</span>`).join('');

      const tipoBadge = script.tipo === 'principal' ? 'badge-success' :
                        script.tipo === 'followup' ? 'badge-warning' :
                        script.tipo === 'objecao' ? 'badge-danger' : 'badge-info';
      const tipoLabel = script.tipo === 'principal' ? 'PRINCIPAL' :
                        script.tipo === 'followup' ? 'FOLLOW-UP' :
                        script.tipo === 'objecao' ? 'OBJECAO' :
                        script.tipo === 'informativo' ? 'INFO' : 'VARIACAO';

      return `
        <div class="accordion" style="margin-bottom: 16px;">
          <div class="accordion-header" style="border-left: 4px solid ${etapa.cor};">
            <div class="accordion-title">
              <span class="badge ${tipoBadge}" style="margin-right: 8px; font-size: 10px;">${tipoLabel}</span>
              ${script.titulo}
            </div>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content" style="padding: 0;">
            <div style="padding: 16px; background: #f8f9fa; border-bottom: 1px solid var(--border);">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px;">
                <div>
                  <i class="fas fa-info-circle" style="color: var(--primary);"></i>
                  <strong>Contexto:</strong> ${script.contexto}
                </div>
                <div>
                  <i class="fas fa-lightbulb" style="color: #f59e0b;"></i>
                  <strong>Dica:</strong> ${script.dica}
                </div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 0;">
              <!-- Script Principal -->
              <div style="padding: 20px; border-right: 1px solid var(--border);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                  <div style="width: 28px; height: 28px; background: #25D366; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                    <i class="fab fa-whatsapp" style="color: white; font-size: 14px;"></i>
                  </div>
                  <span style="font-weight: 600; font-size: 14px;">Script Principal</span>
                </div>

                <div class="message-box" style="font-size: 13px; white-space: pre-wrap;">
                  <button class="copy-btn" onclick="copyToClipboard(\`${script.mensagem.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)">
                    <i class="fas fa-copy"></i> Copiar
                  </button>
                  ${script.mensagem}
                </div>

                ${variacoesHtml}
              </div>

              <!-- Gatilhos e Info -->
              <div style="padding: 20px; background: #fafafa;">
                <div style="font-weight: 500; margin-bottom: 12px; font-size: 13px;">
                  <i class="fas fa-brain" style="color: var(--primary);"></i> Gatilhos Utilizados
                </div>
                <div style="margin-bottom: 20px;">
                  ${gatilhosHtml}
                </div>

                <div style="font-weight: 500; margin-bottom: 8px; font-size: 13px;">
                  <i class="fas fa-check-circle" style="color: var(--secondary);"></i> Por que funciona
                </div>
                <ul style="list-style: none; padding: 0; font-size: 12px; color: var(--text-secondary);">
                  ${script.gatilhos.map(g => `<li style="padding: 4px 0;">• ${g}</li>`).join('')}
                </ul>

                <div style="margin-top: 16px; padding: 12px; background: rgba(139, 92, 246, 0.1); border-radius: 8px;">
                  <div style="font-size: 11px; color: var(--primary); font-weight: 500;">
                    <i class="fas fa-hashtag"></i> ID: ${script.id}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div id="${key}" class="tab-content ${index === 0 ? 'active' : ''}">
        <div style="display: grid; grid-template-columns: 1fr auto; gap: 16px; margin-bottom: 20px; padding: 16px; background: rgba(139, 92, 246, 0.05); border-radius: 8px; border-left: 4px solid ${etapa.cor};">
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">${etapa.descricao}</div>
            <div style="font-size: 13px; color: var(--text-secondary);">
              <strong>Objetivo:</strong> ${etapa.objetivo}
            </div>
          </div>
          <div style="text-align: right;">
            <span class="badge badge-info" style="font-size: 12px;">
              <i class="fas fa-clock"></i> ${etapa.tempo_ideal}
            </span>
          </div>
        </div>
        ${scriptsHtml}
      </div>
    `;
  }).join('');

  // Sequencias
  const sequenciasHtml = SEQUENCIAS_COMPLETAS.map(seq => `
    <div class="card" style="margin-bottom: 0;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
        <div style="width: 40px; height: 40px; background: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-${seq.icone}" style="color: white;"></i>
        </div>
        <div>
          <div style="font-weight: 600;">${seq.nome}</div>
          <div style="font-size: 12px; color: var(--text-secondary);">${seq.descricao}</div>
        </div>
      </div>
      <div style="position: relative; padding-left: 20px;">
        ${seq.etapas.map((etapa, i) => `
          <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; ${i < seq.etapas.length - 1 ? 'border-left: 2px solid var(--primary); margin-left: -11px; padding-left: 20px;' : 'margin-left: -11px; padding-left: 20px;'}">
            <div style="width: 20px; height: 20px; background: ${i === seq.etapas.length - 1 ? 'var(--secondary)' : 'var(--primary)'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: -10px;">
              <span style="color: white; font-size: 10px; font-weight: 600;">${i + 1}</span>
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 500; font-size: 13px;">${etapa.acao}</span>
                <span class="badge badge-info" style="font-size: 10px;">Dia ${etapa.dia}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Templates por Segmento
  const segmentosHtml = Object.entries(TEMPLATES_SEGMENTO).map(([key, seg]) => `
    <div class="accordion">
      <div class="accordion-header">
        <div class="accordion-title">
          <i class="fas fa-${seg.icone}" style="color: var(--primary); margin-right: 8px;"></i>
          ${seg.nome}
        </div>
        <i class="fas fa-chevron-down"></i>
      </div>
      <div class="accordion-content">
        <div style="margin-bottom: 16px;">
          <div style="font-size: 12px; font-weight: 500; color: var(--text-secondary); margin-bottom: 8px;">Dores principais:</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${seg.dores.map(d => `<span class="badge badge-warning" style="font-size: 11px;">${d}</span>`).join('')}
          </div>
        </div>
        <div class="message-box" style="font-size: 13px;">
          <button class="copy-btn" onclick="copyToClipboard(\`${seg.script_personalizado.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)">
            <i class="fas fa-copy"></i> Copiar
          </button>
          ${seg.script_personalizado}
        </div>
      </div>
    </div>
  `).join('');

  // Script Teste Gratuito (do arquivo original)
  const testeGratuitoHtml = `
    <div class="card" style="border-color: var(--secondary);">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-gift" style="color: var(--secondary);"></i> Convite para Teste Gratuito</h3>
        <span class="badge badge-success">ALTA CONVERSAO</span>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 13px;">
        Use este script para convidar leads qualificados a testar a plataforma gratuitamente por 14 dias.
      </p>
      <div class="message-box" style="font-size: 13px;">
        <button class="copy-btn" onclick="copyToClipboard(\`${SCRIPTS.teste_gratuito.mensagem.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)">
          <i class="fas fa-copy"></i> Copiar
        </button>
        ${SCRIPTS.teste_gratuito.mensagem}
      </div>
    </div>
  `;

  return `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-comment-dots"></i> Central de Scripts</h1>
      <p class="page-subtitle">Mensagens prontas e otimizadas para cada etapa do funil de vendas</p>
    </div>

    ${statsHtml}

    <div class="card fade-in" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-lightbulb"></i> Dicas de Comunicacao</h3>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        ${dicasHtml}
      </div>
    </div>

    <div class="card fade-in" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-layer-group"></i> Scripts por Etapa do Funil</h3>
        <span class="badge badge-info">${Object.values(ETAPAS_FUNIL).reduce((acc, e) => acc + e.scripts.length, 0)} scripts</span>
      </div>

      <div class="tabs" style="margin-bottom: 20px; flex-wrap: wrap;">
        ${tabsHtml}
      </div>

      <div class="tab-contents">
        ${tabContentsHtml}
      </div>
    </div>

    <div class="grid grid-2" style="margin-bottom: 24px;">
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-route"></i> Sequencias de Follow-up</h3>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 13px;">
          Siga estas sequencias para maximizar suas taxas de resposta e conversao.
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${sequenciasHtml}
        </div>
      </div>

      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-bullseye"></i> Templates por Segmento</h3>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 13px;">
          Scripts personalizados para as principais verticais de mercado.
        </p>
        ${segmentosHtml}
      </div>
    </div>

    ${testeGratuitoHtml}
  `;
}

function renderObjecoes() {
  // Stats cards
  const statsHtml = `
    <div class="stats-grid" style="margin-bottom: 24px;">
      <div class="stat-card purple">
        <div class="stat-value">${ESTATISTICAS_PAPERVINES.precisao_ia}</div>
        <div class="stat-label">Precisao da IA</div>
      </div>
      <div class="stat-card green">
        <div class="stat-value">${ESTATISTICAS_PAPERVINES.automacao_conversas}</div>
        <div class="stat-label">Conversas Automatizadas</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-value">${ESTATISTICAS_PAPERVINES.mensagens_dia}</div>
        <div class="stat-label">Mensagens/Dia</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-value">${ESTATISTICAS_PAPERVINES.taxa_adaptacao}</div>
        <div class="stat-label">Taxa de Adaptacao</div>
      </div>
    </div>
  `;

  // Diferenciais para argumentacao
  const diferenciaisHtml = DIFERENCIAIS.map(d => `
    <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: rgba(139, 92, 246, 0.05); border-radius: 8px;">
      <div style="width: 40px; height: 40px; background: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i class="fas fa-${d.icone}" style="color: white;"></i>
      </div>
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">${d.titulo}</div>
        <div style="font-size: 13px; color: var(--text-secondary);">${d.descricao}</div>
      </div>
    </div>
  `).join('');

  // Tabs de categorias
  const categorias = Object.entries(OBJECOES_EXPANDIDAS);
  const tabsHtml = categorias.map(([key, cat], index) => `
    <div class="tab ${index === 0 ? 'active' : ''}" data-tab="${key}">
      <i class="fas fa-${cat.icone}" style="color: ${cat.cor};"></i> ${cat.categoria.split(' ')[0]}
    </div>
  `).join('');

  // Conteudo de cada categoria
  const tabContentsHtml = categorias.map(([key, cat], index) => {
    const objecoesItems = cat.objecoes.map(obj => {
      const passosHtml = obj.tecnica_call.passos.map(p => `<li style="padding: 6px 0; border-bottom: 1px solid var(--border);">${p}</li>`).join('');
      const gatilhosHtml = obj.tecnica_call.gatilhos.map(g => `<span class="badge badge-purple" style="margin-right: 4px;">${g}</span>`).join('');
      const argumentosHtml = obj.argumentos.map(a => `<li style="display: flex; align-items: flex-start; gap: 8px; padding: 6px 0;"><i class="fas fa-check-circle" style="color: var(--secondary);"></i>${a}</li>`).join('');

      return `
        <div class="accordion" style="margin-bottom: 16px;">
          <div class="accordion-header" style="border-left: 4px solid ${cat.cor};">
            <div class="accordion-title">
              <span class="badge" style="background: ${cat.cor}20; color: ${cat.cor}; margin-right: 8px;">
                ${obj.nivel === 'muito_comum' ? 'MUITO COMUM' : obj.nivel === 'comum' ? 'COMUM' : 'RARO'}
              </span>
              "${obj.titulo}"
            </div>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content" style="padding: 0;">
            <div style="padding: 20px; background: #fafafa; border-bottom: 1px solid var(--border);">
              <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 8px;">
                <i class="fas fa-info-circle"></i> <strong>Contexto:</strong> ${obj.contexto}
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0;">
              <!-- Coluna Esquerda: Tecnica para Call -->
              <div style="padding: 20px; border-right: 1px solid var(--border);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                  <div style="width: 32px; height: 32px; background: var(--primary); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-phone-alt" style="color: white; font-size: 14px;"></i>
                  </div>
                  <div>
                    <div style="font-weight: 600; font-size: 14px;">Para Call ao Vivo</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">${obj.tecnica_call.nome}</div>
                  </div>
                </div>

                <div style="font-weight: 500; margin-bottom: 8px; font-size: 13px;">Passos:</div>
                <ol style="list-style: decimal; padding-left: 20px; margin-bottom: 16px; font-size: 13px;">
                  ${passosHtml}
                </ol>

                <div style="font-weight: 500; margin-bottom: 8px; font-size: 13px;">Gatilhos Mentais:</div>
                <div style="margin-bottom: 16px;">${gatilhosHtml}</div>

                <div style="font-weight: 500; margin-bottom: 8px; font-size: 13px;">Argumentos de Apoio:</div>
                <ul style="list-style: none; padding: 0; font-size: 13px;">
                  ${argumentosHtml}
                </ul>

                <div style="margin-top: 16px; padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; font-size: 12px;">
                  <i class="fas fa-chart-line" style="color: var(--secondary);"></i>
                  <strong>Dado de suporte:</strong> ${obj.dados_suporte}
                </div>
              </div>

              <!-- Coluna Direita: Script WhatsApp -->
              <div style="padding: 20px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                  <div style="width: 32px; height: 32px; background: #25D366; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                    <i class="fab fa-whatsapp" style="color: white; font-size: 16px;"></i>
                  </div>
                  <div>
                    <div style="font-weight: 600; font-size: 14px;">Para WhatsApp</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">Copie e envie</div>
                  </div>
                </div>

                <div class="message-box" style="font-size: 13px; white-space: pre-wrap; max-height: 400px; overflow-y: auto;">
                  <button class="copy-btn" onclick="copyToClipboard(\`${obj.script_whatsapp.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)">
                    <i class="fas fa-copy"></i> Copiar
                  </button>
                  ${obj.script_whatsapp}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div id="${key}" class="tab-content ${index === 0 ? 'active' : ''}">
        ${objecoesItems}
      </div>
    `;
  }).join('');

  // Tecnicas Gerais
  const tecnicasHtml = TECNICAS_GERAIS.map(t => {
    const passosHtml = t.passos.map(p => `<li style="padding: 8px 0; border-bottom: 1px solid var(--border);">${p}</li>`).join('');
    return `
      <div class="card" style="margin-bottom: 0;">
        <div style="font-weight: 600; margin-bottom: 4px;">${t.nome}</div>
        <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">${t.descricao}</div>
        <ul style="list-style: none; padding: 0; font-size: 13px;">
          ${passosHtml}
        </ul>
      </div>
    `;
  }).join('');

  // Gatilhos Mentais
  const gatilhosCards = GATILHOS_MENTAIS.map(g => `
    <div style="padding: 16px; background: white; border: 1px solid var(--border); border-radius: 8px;">
      <div style="font-weight: 600; color: var(--primary); margin-bottom: 4px;">${g.nome}</div>
      <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">${g.uso}</div>
      <div style="font-size: 13px; font-style: italic; padding: 8px; background: var(--bg-page); border-radius: 4px;">
        "${g.exemplo}"
      </div>
    </div>
  `).join('');

  return `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-shield-alt"></i> Arsenal de Vendas</h1>
      <p class="page-subtitle">Ferramentas completas para quebrar objecoes em calls e WhatsApp</p>
    </div>

    ${statsHtml}

    <div class="card fade-in" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-star"></i> Diferenciais Paper Vines (Use como Argumentos)</h3>
      </div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
        ${diferenciaisHtml}
      </div>
    </div>

    <div class="card fade-in" style="margin-bottom: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-exclamation-circle"></i> Tratativas de Objecoes por Categoria</h3>
        <span class="badge badge-info">${Object.values(OBJECOES_EXPANDIDAS).reduce((acc, cat) => acc + cat.objecoes.length, 0)} objecoes</span>
      </div>

      <div class="tabs" style="margin-bottom: 20px;">
        ${tabsHtml}
      </div>

      <div class="tab-contents">
        ${tabContentsHtml}
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-lightbulb"></i> Tecnicas de Negociacao</h3>
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${tecnicasHtml}
        </div>
      </div>

      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-brain"></i> Gatilhos Mentais</h3>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          ${gatilhosCards}
        </div>
      </div>
    </div>
  `;
}

function renderPlanos() {
  let chatbotsHtml = Object.entries(PLANOS_CHATBOTS).map(([key, plano]) => {
    let funcsHtml = plano.funcionalidades.map(f => '<li style="display: flex; align-items: flex-start; gap: 8px; padding: 8px 0;"><i class="fas fa-check" style="color: var(--primary);"></i><span>' + f + '</span></li>').join('');
    let popular = key === 'fusion' ? '<div style="background: var(--primary); color: white; text-align: center; padding: 6px; margin: -24px -24px 16px; border-radius: 12px 12px 0 0; font-size: 12px; font-weight: 600;">MAIS POPULAR</div>' : '';
    return '<div class="card" style="border-color: ' + (key === 'fusion' ? 'var(--primary)' : 'var(--border)') + ';">' + popular + '<h3 style="font-size: 18px; margin-bottom: 8px;">' + plano.nome + '</h3><div class="valor-display">R$ ' + plano.valor.toLocaleString('pt-BR') + '</div><div class="valor-label">taxa unica ou ' + plano.parcelado + '</div><hr style="border: none; border-top: 1px solid var(--border); margin: 20px 0;"><ul style="list-style: none; padding: 0;">' + funcsHtml + '</ul></div>';
  }).join('');

  let telecomHtml = Object.entries(PLANOS_TELECOM).map(([key, plano]) => {
    let funcsHtml = plano.funcionalidades.map(f => '<li style="display: flex; align-items: flex-start; gap: 8px; padding: 8px 0;"><i class="fas fa-check" style="color: var(--primary);"></i><span>' + f + '</span></li>').join('');
    return '<div class="card"><h3 style="font-size: 18px; margin-bottom: 8px;">' + plano.nome + '</h3><div class="valor-display">R$ ' + plano.valor.toLocaleString('pt-BR') + '</div><div class="valor-label">taxa unica</div><hr style="border: none; border-top: 1px solid var(--border); margin: 20px 0;"><ul style="list-style: none; padding: 0;">' + funcsHtml + '</ul></div>';
  }).join('');

  let iaHtml = Object.entries(PLANOS_IA).map(([key, plano]) => {
    let compsHtml = plano.componentes.map(c => '<li style="display: flex; align-items: flex-start; gap: 8px; padding: 8px 0;"><i class="fas fa-robot" style="color: var(--primary);"></i><span>' + c + '</span></li>').join('');
    return '<div class="card"><h3 style="font-size: 18px; margin-bottom: 8px;">' + plano.nome + '</h3><div class="valor-display">R$ ' + plano.valor.toLocaleString('pt-BR') + '</div><div class="valor-label">taxa unica</div><hr style="border: none; border-top: 1px solid var(--border); margin: 20px 0;"><ul style="list-style: none; padding: 0;">' + compsHtml + '</ul></div>';
  }).join('');

  return '<div class="page-header"><h1 class="page-title">Planos e Servicos</h1><p class="page-subtitle">Detalhes de todos os planos</p></div><div class="tabs"><div class="tab active" data-tab="chatbots">Chatbots</div><div class="tab" data-tab="telecom">Telecom</div><div class="tab" data-tab="ia">Agentes IA</div></div><div class="tab-contents"><div id="chatbots" class="tab-content active"><div class="grid grid-3">' + chatbotsHtml + '</div></div><div id="telecom" class="tab-content"><div class="grid grid-3">' + telecomHtml + '</div></div><div id="ia" class="tab-content"><div class="grid grid-3">' + iaHtml + '</div></div></div>';
}
