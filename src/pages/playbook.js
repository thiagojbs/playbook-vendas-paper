import { layout } from '../templates/layout.js';
// Imports padrao (Paper Vines) - fallback
import { PROCESSO_VENDAS as PV_PROCESSO, SCRIPTS as PV_SCRIPTS, OBJECOES as PV_OBJECOES, CHECKLIST_COMERCIAL as PV_CHECKLIST_COMERCIAL, CHECKLIST_CONTRATO as PV_CHECKLIST_CONTRATO, LINKS_UTEIS as PV_LINKS } from '../data/playbook.js';
import { PLANOS_CHATBOTS, PLANOS_TELECOM, PLANOS_IA } from '../data/precos.js';
import { OBJECOES_EXPANDIDAS as PV_OBJECOES_EXPANDIDAS, TECNICAS_GERAIS as PV_TECNICAS, GATILHOS_MENTAIS as PV_GATILHOS, DIFERENCIAIS as PV_DIFERENCIAIS, ESTATISTICAS_PAPERVINES } from '../data/objecoes.js';
import { ETAPAS_FUNIL as PV_ETAPAS, SCRIPTS_STATS as PV_SCRIPTS_STATS, SEQUENCIAS_COMPLETAS as PV_SEQUENCIAS, DICAS_COMUNICACAO as PV_DICAS, TEMPLATES_SEGMENTO as PV_TEMPLATES } from '../data/scripts.js';
import { POLITICAS_WHATSAPP, POLITICAS_META_ANUNCIOS, PRECOS_WHATSAPP, REQUISITOS_API_EXPANDIDOS, FLUXO_IMPLANTACAO, PERGUNTAS_FREQUENTES, DIFERENCIAIS_PAPERVINES, LINKS_IMPORTANTES } from '../data/playbook-expandido.js';
import { AGENTES_INFO, TIPOS_AGENTES, AGENTES_EXEMPLOS, VERTICAIS, METRICAS_GERAIS, COMPARATIVO_HUMANO, FERRAMENTAS_DISPONIVEIS } from '../data/agentes.js';

// Variaveis globais para o tenant atual
let PROCESSO_VENDAS, SCRIPTS, OBJECOES, CHECKLIST_COMERCIAL, CHECKLIST_CONTRATO, LINKS_UTEIS;
let OBJECOES_EXPANDIDAS, TECNICAS_GERAIS, GATILHOS_MENTAIS, DIFERENCIAIS;
let ETAPAS_FUNIL, SCRIPTS_STATS, SEQUENCIAS_COMPLETAS, DICAS_COMUNICACAO, TEMPLATES_SEGMENTO;
let tenantConfig = null;

export function renderPlaybook(path, tenantData = {}) {
  // Configurar dados do tenant
  tenantConfig = tenantData.config || {};

  // Usar dados do tenant se disponiveis, senao fallback para Paper Vines
  const playbook = tenantData.playbook || {};
  const objecoes = tenantData.objecoes || {};
  const scripts = tenantData.scripts || {};

  PROCESSO_VENDAS = playbook.PROCESSO_VENDAS || PV_PROCESSO;
  SCRIPTS = playbook.SCRIPTS || PV_SCRIPTS;
  OBJECOES = playbook.OBJECOES || PV_OBJECOES;
  CHECKLIST_COMERCIAL = playbook.CHECKLIST_COMERCIAL || PV_CHECKLIST_COMERCIAL;
  CHECKLIST_CONTRATO = playbook.CHECKLIST_CONTRATO || PV_CHECKLIST_CONTRATO;
  LINKS_UTEIS = playbook.LINKS_UTEIS || PV_LINKS;

  OBJECOES_EXPANDIDAS = objecoes.OBJECOES_EXPANDIDAS || PV_OBJECOES_EXPANDIDAS;
  TECNICAS_GERAIS = objecoes.TECNICAS_GERAIS || PV_TECNICAS;
  GATILHOS_MENTAIS = objecoes.GATILHOS_MENTAIS || PV_GATILHOS;
  DIFERENCIAIS = objecoes.DIFERENCIAIS || PV_DIFERENCIAIS;

  ETAPAS_FUNIL = scripts.ETAPAS_FUNIL || PV_ETAPAS;
  SCRIPTS_STATS = scripts.SCRIPTS_STATS || PV_SCRIPTS_STATS;
  SEQUENCIAS_COMPLETAS = scripts.SEQUENCIAS_COMPLETAS || PV_SEQUENCIAS;
  DICAS_COMUNICACAO = scripts.DICAS_COMUNICACAO || PV_DICAS;
  TEMPLATES_SEGMENTO = scripts.TEMPLATES_SEGMENTO || PV_TEMPLATES;

  let content = '';
  let activeMenu = 'playbook';
  const tenantId = tenantConfig.id || 'papervines';

  if (path.includes('/scripts')) {
    // Renderizar scripts especifico do tenant
    if (tenantId === 'cabeloesaude') {
      content = renderScriptsCabeloeSaude();
    } else {
      content = renderScripts();
    }
    activeMenu = 'scripts';
  }
  else if (path.includes('/objecoes')) { content = renderObjecoes(); activeMenu = 'objecoes'; }
  else if (path.includes('/agentes') || path.includes('/planos')) { content = renderAgentes(); activeMenu = 'planos'; }
  else if (path.includes('/api') || path.includes('/mcp')) { content = renderAPIDocumentacao(path); activeMenu = 'api'; }
  else {
    // Renderizar playbook especifico do tenant
    if (tenantId === 'cabeloesaude') {
      content = renderPlaybookCabeloeSaude();
    } else {
      content = renderPlaybookMain();
    }
  }
  return layout('Playbook', content, activeMenu, tenantConfig);
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

// ========================================
// PLAYBOOK - CABELO & SAUDE
// ========================================
function renderPlaybookCabeloeSaude() {
  const tenantQuery = '?tenant=cabeloesaude';

  // Diferenciais da Clinica
  const diferenciaisHtml = DIFERENCIAIS.map((d, index) => {
    const bgStyle = index === 0 ? 'linear-gradient(135deg, rgba(26, 95, 82, 0.1), rgba(45, 138, 122, 0.1))' : 'white';
    const borderStyle = index === 0 ? 'var(--primary)' : 'var(--border)';
    const shadowStyle = index === 0 ? 'box-shadow: 0 4px 12px rgba(26, 95, 82, 0.15);' : '';
    const iconBg = index === 0 ? 'var(--primary)' : 'var(--bg-page)';
    const iconColor = index === 0 ? 'white' : 'var(--primary)';
    return '<div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: ' + bgStyle + '; border: 1px solid ' + borderStyle + '; border-radius: 12px; ' + shadowStyle + '">' +
      '<div style="width: 44px; height: 44px; background: ' + iconBg + '; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">' +
        '<i class="fas fa-' + d.icone + '" style="color: ' + iconColor + '; font-size: 18px;"></i>' +
      '</div>' +
      '<div>' +
        '<div style="font-weight: 600; margin-bottom: 4px;">' + d.titulo + '</div>' +
        '<div style="font-size: 13px; color: var(--text-secondary);">' + d.descricao + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  // Tipos de Tratamento
  const tiposTratamento = [
    { nome: 'Queda Capilar', descricao: 'Tratamento para queda acentuada de cabelos', sinais: ['Cabelos no travesseiro', 'Cabelos no ralo', 'Volume reduzido'], cor: '#ef4444' },
    { nome: 'Alopecia Androgenica', descricao: 'Calvicie de padrao masculino ou feminino', sinais: ['Entradas aumentando', 'Coroa rareando', 'Fios afinando'], cor: '#f59e0b' },
    { nome: 'Alopecia Areata', descricao: 'Queda em areas circulares especificas', sinais: ['Falhas redondas', 'Queda subita', 'Areas sem cabelo'], cor: '#8b5cf6' },
    { nome: 'Efluvio Telogeno', descricao: 'Queda difusa pos-estresse ou doenca', sinais: ['Queda intensa', 'Pos-COVID/parto', 'Pos-cirurgia'], cor: '#3b82f6' },
    { nome: 'Dermatite Seborreica', descricao: 'Inflamacao do couro cabeludo', sinais: ['Coceira', 'Descamacao', 'Oleosidade'], cor: '#ec4899' }
  ];
  const tiposTratamentoHtml = tiposTratamento.map(function(tipo) {
    const sinaisHtml = tipo.sinais.map(function(s) {
      return '<span style="font-size: 11px; padding: 4px 8px; background: ' + tipo.cor + '15; color: ' + tipo.cor + '; border-radius: 4px;">' + s + '</span>';
    }).join('');
    return '<div style="background: white; border: 1px solid var(--border); border-radius: 12px; padding: 20px; border-top: 4px solid ' + tipo.cor + ';">' +
      '<div style="font-weight: 600; font-size: 16px; margin-bottom: 8px; color: ' + tipo.cor + ';">' + tipo.nome + '</div>' +
      '<div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">' + tipo.descricao + '</div>' +
      '<div style="font-size: 12px; font-weight: 500; margin-bottom: 8px;">Sinais:</div>' +
      '<div style="display: flex; flex-wrap: wrap; gap: 6px;">' + sinaisHtml + '</div>' +
    '</div>';
  }).join('');

  // Processo de Vendas
  const etapasVendaHtml = PROCESSO_VENDAS.etapas.map(function(etapa) {
    const acoesHtml = etapa.acoes.map(function(acao) {
      return '<li style="display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border);">' +
        '<i class="fas fa-check-circle" style="color: var(--primary);"></i>' + acao + '</li>';
    }).join('');
    const dicasHtml = (etapa.dicas || []).map(function(dica) {
      return '<div style="display: flex; align-items: flex-start; gap: 8px; padding: 8px; background: rgba(245, 158, 11, 0.08); border-radius: 6px; margin-bottom: 6px;">' +
        '<i class="fas fa-lightbulb" style="color: #f59e0b; margin-top: 2px;"></i>' +
        '<span style="font-size: 12px;">' + dica + '</span></div>';
    }).join('');
    const dicasSection = dicasHtml ? '<div style="font-weight: 500; margin-bottom: 8px;">Dicas:</div>' + dicasHtml : '';
    return '<div class="accordion">' +
      '<div class="accordion-header" style="border-left: 4px solid var(--primary);">' +
        '<div class="accordion-title">' +
          '<span style="width: 28px; height: 28px; background: var(--primary); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; margin-right: 8px; color: white;">' + etapa.numero + '</span>' +
          etapa.titulo +
          '<span class="badge badge-info" style="margin-left: 12px;">' + etapa.tempo_estimado + '</span>' +
        '</div>' +
        '<i class="fas fa-chevron-down"></i>' +
      '</div>' +
      '<div class="accordion-content">' +
        '<p style="margin-bottom: 16px; color: var(--text-secondary);">' + etapa.descricao + '</p>' +
        '<div style="font-weight: 500; margin-bottom: 8px;">Acoes:</div>' +
        '<ul style="list-style: none; padding: 0; margin-bottom: 16px;">' + acoesHtml + '</ul>' +
        dicasSection +
      '</div>' +
    '</div>';
  }).join('');

  // Objecoes
  const objecoesHtml = OBJECOES.slice(0, 6).map(function(obj) {
    return '<div class="accordion">' +
      '<div class="accordion-header" style="border-left: 4px solid #ef4444;">' +
        '<div class="accordion-title">' +
          '<i class="fas fa-comment-slash" style="color: #ef4444; margin-right: 8px;"></i>' +
          '"' + obj.objecao + '"' +
        '</div>' +
        '<i class="fas fa-chevron-down"></i>' +
      '</div>' +
      '<div class="accordion-content">' +
        '<div class="message-box" style="white-space: pre-wrap; font-size: 13px;">' +
          obj.resposta +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  // Checklist Comercial
  const checklistHtml = CHECKLIST_COMERCIAL.map(function(item) {
    return '<div style="display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border);">' +
      '<input type="checkbox" style="width: 18px; height: 18px; accent-color: var(--primary);">' +
      '<span style="font-size: 13px;">' + item.item + '</span>' +
    '</div>';
  }).join('');

  // Scripts Rapidos - com verificacao de seguranca
  const scriptsRapidosHtml = SCRIPTS && typeof SCRIPTS === 'object' ?
    Object.entries(SCRIPTS).slice(0, 4).map(function(entry) {
      const key = entry[0];
      const script = entry[1];
      if (Array.isArray(script) && script[0]) {
        const primeiro = script[0];
        const preview = primeiro && primeiro.mensagem ? primeiro.mensagem.substring(0, 200) + '...' : '';
        if (!preview) return '';
        return '<div style="background: white; border: 1px solid var(--border); border-radius: 12px; padding: 16px;">' +
          '<div style="font-weight: 600; font-size: 14px; margin-bottom: 8px; color: var(--primary);">' +
            '<i class="fas fa-comment-dots" style="margin-right: 6px;"></i>' + (primeiro.titulo || 'Script') +
          '</div>' +
          '<div class="message-box" style="font-size: 12px; white-space: pre-wrap; max-height: 120px; overflow: hidden;">' + preview + '</div>' +
          '<a href="/playbook/scripts' + tenantQuery + '" style="display: inline-flex; align-items: center; gap: 4px; margin-top: 8px; font-size: 12px; color: var(--primary); text-decoration: none;">' +
            'Ver script completo <i class="fas fa-arrow-right"></i>' +
          '</a>' +
        '</div>';
      } else if (script && script.mensagem) {
        const preview = script.mensagem.substring(0, 200) + '...';
        return '<div style="background: white; border: 1px solid var(--border); border-radius: 12px; padding: 16px;">' +
          '<div style="font-weight: 600; font-size: 14px; margin-bottom: 8px; color: var(--primary);">' +
            '<i class="fas fa-comment-dots" style="margin-right: 6px;"></i>' + (script.titulo || 'Script') +
          '</div>' +
          '<div class="message-box" style="font-size: 12px; white-space: pre-wrap; max-height: 120px; overflow: hidden;">' + preview + '</div>' +
          '<a href="/playbook/scripts' + tenantQuery + '" style="display: inline-flex; align-items: center; gap: 4px; margin-top: 8px; font-size: 12px; color: var(--primary); text-decoration: none;">' +
            'Ver script completo <i class="fas fa-arrow-right"></i>' +
          '</a>' +
        '</div>';
      }
      return '';
    }).filter(Boolean).join('') : '';

  // Links Uteis
  const siteUrl = LINKS_UTEIS.site || '#';
  const instaUrl = LINKS_UTEIS.instagram || '#';
  const linksHtml = '<div style="display: flex; flex-direction: column; gap: 8px;">' +
    '<a href="' + siteUrl + '" target="_blank" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: white; border: 1px solid var(--border); border-radius: 8px; text-decoration: none; color: inherit;">' +
      '<i class="fas fa-globe" style="color: var(--primary);"></i>' +
      '<div style="flex: 1;">' +
        '<div style="font-weight: 500; font-size: 14px;">Site Oficial</div>' +
        '<div style="font-size: 12px; color: var(--text-secondary);">cabeloesaude.com.br</div>' +
      '</div>' +
      '<i class="fas fa-external-link-alt" style="color: var(--text-secondary);"></i>' +
    '</a>' +
    '<a href="' + instaUrl + '" target="_blank" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: white; border: 1px solid var(--border); border-radius: 8px; text-decoration: none; color: inherit;">' +
      '<i class="fab fa-instagram" style="color: #E4405F;"></i>' +
      '<div style="flex: 1;">' +
        '<div style="font-weight: 500; font-size: 14px;">Instagram</div>' +
        '<div style="font-size: 12px; color: var(--text-secondary);">@cabeloesaude</div>' +
      '</div>' +
      '<i class="fas fa-external-link-alt" style="color: var(--text-secondary);"></i>' +
    '</a>' +
    '<a href="/calculadora' + tenantQuery + '" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: linear-gradient(135deg, rgba(26, 95, 82, 0.1), rgba(45, 138, 122, 0.1)); border: 1px solid var(--primary); border-radius: 8px; text-decoration: none; color: inherit;">' +
      '<i class="fas fa-calculator" style="color: var(--primary);"></i>' +
      '<div style="flex: 1;">' +
        '<div style="font-weight: 500; font-size: 14px;">Calculadora de Protocolos</div>' +
        '<div style="font-size: 12px; color: var(--text-secondary);">Montar proposta personalizada</div>' +
      '</div>' +
      '<i class="fas fa-arrow-right" style="color: var(--primary);"></i>' +
    '</a>' +
  '</div>';

  return '<div class="page-header">' +
    '<h1 class="page-title"><i class="fas fa-book-open"></i> Playbook de Vendas</h1>' +
    '<p class="page-subtitle">Guia completo do processo comercial Cabelo & Saude - Tricologia</p>' +
  '</div>' +

  '<!-- Diferenciais -->' +
  '<div class="card fade-in" style="margin-bottom: 24px; background: linear-gradient(135deg, #f0f7f6, white);">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-trophy" style="color: var(--primary);"></i> Por que Cabelo & Saude?</h3>' +
    '</div>' +
    '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">' + diferenciaisHtml + '</div>' +
  '</div>' +

  '<!-- Tipos de Tratamento -->' +
  '<div class="card fade-in" style="margin-bottom: 24px;">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-stethoscope" style="color: var(--primary);"></i> Tipos de Tratamento</h3>' +
      '<span class="badge badge-info">Conheca os casos que atendemos</span>' +
    '</div>' +
    '<div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;">' + tiposTratamentoHtml + '</div>' +
  '</div>' +

  '<!-- Scripts Rapidos -->' +
  '<div class="card fade-in" style="margin-bottom: 24px;">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-comment-dots" style="color: #25D366;"></i> Scripts de Atendimento</h3>' +
      '<a href="/playbook/scripts' + tenantQuery + '" class="badge badge-success" style="text-decoration: none;">' +
        '<i class="fas fa-list"></i> Ver todos os scripts</a>' +
    '</div>' +
    '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">' + scriptsRapidosHtml + '</div>' +
  '</div>' +

  '<!-- Processo de Vendas -->' +
  '<div class="card fade-in" style="margin-bottom: 24px;">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-route" style="color: var(--primary);"></i> Jornada do Paciente</h3>' +
      '<span class="badge badge-info">6 etapas do atendimento</span>' +
    '</div>' +
    etapasVendaHtml +
  '</div>' +

  '<div class="grid grid-2" style="margin-bottom: 24px;">' +
    '<!-- Objecoes -->' +
    '<div class="card fade-in">' +
      '<div class="card-header">' +
        '<h3 class="card-title"><i class="fas fa-shield-alt" style="color: #ef4444;"></i> Tratando Objecoes</h3>' +
        '<a href="/playbook/objecoes' + tenantQuery + '" class="badge badge-danger" style="text-decoration: none;">Ver todas</a>' +
      '</div>' +
      objecoesHtml +
    '</div>' +

    '<!-- Checklist e Links -->' +
    '<div style="display: flex; flex-direction: column; gap: 24px;">' +
      '<!-- Checklist -->' +
      '<div class="card fade-in">' +
        '<div class="card-header">' +
          '<h3 class="card-title"><i class="fas fa-clipboard-list"></i> Checklist do Atendimento</h3>' +
        '</div>' +
        '<div style="max-height: 300px; overflow-y: auto;">' + checklistHtml + '</div>' +
      '</div>' +

      '<!-- Links -->' +
      '<div class="card fade-in">' +
        '<div class="card-header">' +
          '<h3 class="card-title"><i class="fas fa-link"></i> Links Importantes</h3>' +
        '</div>' +
        linksHtml +
      '</div>' +
    '</div>' +
  '</div>' +

  '<!-- Dica Final -->' +
  '<div style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); border: 1px solid var(--secondary); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px;">' +
    '<div style="width: 48px; height: 48px; background: var(--secondary); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">' +
      '<i class="fas fa-heart" style="color: white; font-size: 22px;"></i>' +
    '</div>' +
    '<div>' +
      '<div style="font-weight: 600; margin-bottom: 4px; color: #065f46;">Lembre-se</div>' +
      '<div style="font-size: 14px; color: #047857;">Cada paciente que chega ate nos esta sofrendo com um problema que afeta sua autoestima. Trate com empatia, ouca de verdade, e mostre que aqui ele encontra solucao real - nao paliativo.</div>' +
    '</div>' +
  '</div>';
}

// ===== SCRIPTS CABELO E SAUDE =====
function renderScriptsCabeloeSaude() {
  var tenantQuery = '?tenant=cabeloesaude';

  // Stats da Clinica
  var statsHtml = '<div class="stats-grid" style="margin-bottom: 24px;">' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #1a5f52 0%, #2d8a7a 100%); color: white;">' +
      '<div class="stat-value">40+</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.9);">Scripts Prontos</div>' +
    '</div>' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #2d8a7a 0%, #4fb3a3 100%); color: white;">' +
      '<div class="stat-value">7</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.9);">Etapas do Funil</div>' +
    '</div>' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #4fb3a3 0%, #6dd5c7 100%); color: white;">' +
      '<div class="stat-value">4</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.9);">Sequencias Automaticas</div>' +
    '</div>' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #1a5f52 0%, #4fb3a3 100%); color: white;">' +
      '<div class="stat-value">72%</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.9);">Taxa Media de Resposta</div>' +
    '</div>' +
  '</div>';

  // Dicas de Comunicacao para Tricologia
  var dicasComunicacao = [
    {
      titulo: 'Empatia em Primeiro Lugar',
      icone: 'heart',
      dicas: [
        'Queda capilar afeta autoestima - acolha antes de vender',
        'Valide sentimentos do paciente',
        'Nao minimize o problema ("e so cabelo")',
        'Muitos pacientes sofrem em silencio - seja um espaco seguro'
      ]
    },
    {
      titulo: 'Linguagem de Saude',
      icone: 'comments',
      dicas: [
        'Use "paciente", nao "cliente"',
        'Fale em "tratamento", nao "servico"',
        'Use "investimento em saude", nao "preco"',
        'Evite promessas milagrosas - seja honesta'
      ]
    },
    {
      titulo: 'Tempo de Resposta',
      icone: 'clock',
      dicas: [
        'Responda em ate 5 minutos (leads esfriam rapido)',
        'Leads de saude sao urgentes - a pessoa esta preocupada',
        'Se nao puder responder completo, ao menos de sinal de vida',
        'Horario comercial: resposta imediata | Fora: ate 2h'
      ]
    },
    {
      titulo: 'O que Evitar',
      icone: 'ban',
      dicas: [
        'Prometer resultados sem avaliar',
        'Pressionar demais - saude nao se vende assim',
        'Desqualificar outros profissionais',
        'Usar medo excessivo como argumento'
      ]
    }
  ];

  var dicasHtml = dicasComunicacao.map(function(cat) {
    var dicasListHtml = cat.dicas.map(function(d) {
      return '<li style="padding: 4px 0; color: #4b5563;"><i class="fas fa-check" style="color: #10b981; margin-right: 8px;"></i>' + d + '</li>';
    }).join('');

    return '<div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">' +
      '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">' +
        '<div style="width: 32px; height: 32px; background: #1a5f52; border-radius: 6px; display: flex; align-items: center; justify-content: center;">' +
          '<i class="fas fa-' + cat.icone + '" style="color: white; font-size: 14px;"></i>' +
        '</div>' +
        '<span style="font-weight: 600;">' + cat.titulo + '</span>' +
      '</div>' +
      '<ul style="list-style: none; padding: 0; margin: 0; font-size: 13px;">' + dicasListHtml + '</ul>' +
    '</div>';
  }).join('');

  // Etapas do Funil com Scripts
  var etapasFunil = [
    {
      id: 'captacao',
      nome: 'Captacao',
      icone: 'bullhorn',
      cor: '#1a5f52',
      descricao: 'Primeiro contato com leads interessados em tratamento capilar',
      objetivo: 'Despertar interesse e agendar avaliacao',
      tempo_ideal: 'Responder em ate 5 minutos',
      scripts: [
        {
          id: 'capt-1',
          titulo: 'Resposta Inicial - Instagram/WhatsApp',
          tipo: 'principal',
          contexto: 'Lead entra em contato pela primeira vez',
          dica: 'Seja acolhedor - muitos pacientes sofrem emocionalmente com queda capilar',
          mensagem: 'Ola! Tudo bem? 💚\n\nQue bom que voce nos procurou!\n\nAqui na Cabelo & Saude, a Franciele - biomedica especialista em tricologia - trata a *causa* do problema capilar, nao apenas os sintomas.\n\nMe conta um pouquinho: ha quanto tempo voce percebeu a queda ou afinamento dos fios?',
          gatilhos: ['Acolhimento', 'Diferenciacao', 'Pergunta aberta'],
          variacoes: [
            {
              nome: 'Versao Empatica',
              mensagem: 'Ola! Tudo bem? 💚\n\nFico feliz que tenha nos procurado!\n\nSei que queda de cabelo pode ser angustiante, mas saiba que voce esta no lugar certo.\n\nAqui investigamos a CAUSA do problema - nao ficamos so passando Minoxidil como todo mundo.\n\nMe conta: o que te trouxe ate aqui?'
            },
            {
              nome: 'Versao Direta',
              mensagem: 'Ola! Sou da equipe da Cabelo & Saude 💚\n\nAqui a Franciele, biomedica tricologista, trata queda capilar de forma diferente - investigando a causa, nao so tratando sintoma.\n\nComo posso te ajudar?'
            }
          ]
        },
        {
          id: 'capt-2',
          titulo: 'Resposta para Lead de Anuncio',
          tipo: 'principal',
          contexto: 'Lead veio de anuncio no Instagram/Facebook',
          dica: 'Reforce o que o anuncio prometeu e avance rapido',
          mensagem: 'Ola! Que bom que voce se interessou! 💚\n\nVi que voce veio pelo nosso anuncio sobre [TEMA_ANUNCIO].\n\nAqui na Cabelo & Saude fazemos diferente:\n❌ Nao dependemos so de Minoxidil e Finasterida\n✅ Investigamos a raiz do problema\n✅ Protocolo personalizado pro seu caso\n\nPosso te fazer algumas perguntas para entender melhor sua situacao?',
          gatilhos: ['Continuidade do anuncio', 'Diferenciacao', 'Permissao para perguntar'],
          variacoes: []
        },
        {
          id: 'capt-3',
          titulo: 'Resposta para Indicacao',
          tipo: 'variacao',
          contexto: 'Lead foi indicado por outro paciente',
          dica: 'Valorize a indicacao e crie conexao',
          mensagem: 'Ola [Nome]! Que bom falar com voce! 💚\n\nO(a) [NOME_INDICADOR] me disse que voce esta precisando de ajuda com [PROBLEMA].\n\nFico feliz que ele(a) tenha confiado em indicar a Cabelo & Saude!\n\nMe conta: como esta a situacao hoje?',
          gatilhos: ['Prova social', 'Conexao', 'Confianca'],
          variacoes: []
        }
      ]
    },
    {
      id: 'qualificacao',
      nome: 'Qualificacao',
      icone: 'filter',
      cor: '#2d8a7a',
      descricao: 'Entender o perfil e necessidades do paciente',
      objetivo: 'Coletar informacoes para personalizar abordagem',
      tempo_ideal: 'Durante primeira conversa',
      scripts: [
        {
          id: 'qual-1',
          titulo: 'Perguntas de Qualificacao Completas',
          tipo: 'principal',
          contexto: 'Apos primeiro contato, coletar informacoes',
          dica: 'Faca perguntas com empatia, nao como interrogatorio',
          mensagem: 'Para eu entender melhor seu caso e te ajudar da melhor forma, me conta:\n\n1️⃣ Ha quanto tempo voce percebeu a queda/afinamento?\n\n2️⃣ Ja fez algum tratamento antes?\n   (Minoxidil, Finasterida, vitaminas, shampoos...)\n\n3️⃣ Ja consultou algum profissional sobre isso?\n   (Dermatologista, tricologista...)\n\n4️⃣ O que mais te incomoda hoje sobre seus cabelos?\n\nCom essas informacoes, consigo te orientar melhor! 😊',
          gatilhos: ['Estruturacao', 'Empatia', 'Personalizacao'],
          variacoes: [
            {
              nome: 'Versao Rapida',
              mensagem: 'Me conta rapidinho:\n- Ha quanto tempo percebeu a queda?\n- Ja tentou algum tratamento?\n- Qual sua maior preocupacao hoje?'
            }
          ]
        },
        {
          id: 'qual-2',
          titulo: 'Aprofundamento - Tratamentos Anteriores',
          tipo: 'variacao',
          contexto: 'Quando paciente menciona que ja tentou tratamentos',
          dica: 'Entenda o que falhou para mostrar diferencial',
          mensagem: 'Entendo que voce ja tentou [TRATAMENTO]...\n\nMe conta mais:\n- Por quanto tempo usou?\n- Percebeu alguma melhora?\n- Por que parou?\n\nPergunto porque muitos tratamentos tratam so o *sintoma* e nao a *causa*.\nPor isso param de funcionar ou nao resolvem de verdade.\n\nAqui fazemos diferente - investigamos POR QUE voce esta perdendo cabelo.',
          gatilhos: ['Interesse genuino', 'Diferenciacao', 'Educacao'],
          variacoes: []
        },
        {
          id: 'qual-3',
          titulo: 'Qualificacao Emocional',
          tipo: 'variacao',
          contexto: 'Quando paciente demonstra sofrimento emocional',
          dica: 'Acolha antes de falar de tratamento',
          mensagem: '[Nome], percebo que isso esta te afetando bastante...\n\nSaiba que voce nao esta sozinho(a). Muitos pacientes chegam aqui sentindo a mesma coisa.\n\nA queda de cabelo mexe com autoestima, confianca... e normal se sentir assim.\n\nA boa noticia e que existe tratamento. E voce ja deu o primeiro passo ao nos procurar. 💚\n\nQuer me contar mais sobre como isso tem te afetado?',
          gatilhos: ['Empatia', 'Validacao', 'Acolhimento'],
          variacoes: []
        }
      ]
    },
    {
      id: 'agendamento',
      nome: 'Agendamento',
      icone: 'calendar-check',
      cor: '#4fb3a3',
      descricao: 'Converter lead em avaliacao agendada',
      objetivo: 'Agendar avaliacao tricologica',
      tempo_ideal: 'Agendar em ate 48h do primeiro contato',
      scripts: [
        {
          id: 'agend-1',
          titulo: 'Convite para Avaliacao Tricologica',
          tipo: 'principal',
          contexto: 'Apos qualificacao, convidar para avaliacao',
          dica: 'Mostre valor da avaliacao antes de falar de agenda',
          mensagem: '[Nome], pelo que voce me contou, seu caso merece uma investigacao mais profunda.\n\nAqui na Cabelo & Saude fazemos uma *Avaliacao Tricologica Completa* que inclui:\n\n🔬 Exame com tricoscopio - voce VE seu couro cabeludo ampliado\n📋 Anamnese detalhada do seu historico\n🔍 Identificacao da causa real da queda\n🧪 Indicacao de exames complementares se necessario\n📝 Proposta de tratamento personalizado\n\n*Duracao:* aproximadamente 40-60 minutos\n\nTenho horarios disponiveis [DATA]. Qual melhor pra voce:\n- [OPCAO 1] as [HORA]\n- [OPCAO 2] as [HORA]',
          gatilhos: ['Valor da avaliacao', 'Opcoes de horario', 'Baixo atrito'],
          variacoes: [
            {
              nome: 'Versao Urgencia',
              mensagem: '[Nome], quanto antes investigarmos, melhores as chances de resultado.\n\nTenho uma vaga essa semana na [DIA] as [HORA].\n\nConsegue?'
            }
          ]
        },
        {
          id: 'agend-2',
          titulo: 'Confirmacao 24h Antes',
          tipo: 'principal',
          contexto: '24h antes da avaliacao agendada',
          dica: 'Sempre confirme para reduzir no-shows',
          mensagem: 'Ola [Nome]! 💚\n\nPassando para confirmar sua *Avaliacao Tricologica* amanha:\n\n📅 Data: [DATA]\n⏰ Horario: [HORA]\n📍 Endereco: [ENDERECO]\n\n*Algumas orientacoes importantes:*\n✅ Nao lave o cabelo no dia (para avaliarmos oleosidade natural)\n✅ Se tiver exames de sangue recentes, traga\n✅ Chegue 10 min antes para preencher ficha\n✅ Se usar algum medicamento/vitamina, traga a lista\n\nPosso confirmar sua presenca? ✅',
          gatilhos: ['Confirmacao explicita', 'Orientacoes claras', 'Profissionalismo'],
          variacoes: [
            {
              nome: 'Lembrete 2h antes',
              mensagem: '[Nome], daqui 2 horas temos sua avaliacao! 💚\n\n📍 Endereco: [ENDERECO]\n\nTe espero aqui! 😊'
            }
          ]
        },
        {
          id: 'agend-3',
          titulo: 'Reagendamento - No-Show',
          tipo: 'variacao',
          contexto: 'Quando paciente falta sem avisar',
          dica: 'Seja compreensivo, nao confrontador',
          mensagem: 'Oi [Nome], tudo bem? 💚\n\nSentimos sua falta na avaliacao de hoje!\n\nSei que imprevistos acontecem. Se quiser, posso verificar novos horarios disponiveis para remarcarmos.\n\nOu se preferir, me conta o que aconteceu - sem julgamentos!\n\nEstou aqui pra ajudar quando voce puder. 😊',
          gatilhos: ['Empatia', 'Flexibilidade', 'Porta aberta'],
          variacoes: []
        }
      ]
    },
    {
      id: 'proposta',
      nome: 'Proposta',
      icone: 'file-invoice-dollar',
      cor: '#1a5f52',
      descricao: 'Apresentar protocolo de tratamento e valores',
      objetivo: 'Converter avaliacao em tratamento',
      tempo_ideal: 'Idealmente no mesmo dia da avaliacao',
      scripts: [
        {
          id: 'prop-1',
          titulo: 'Envio Pos-Avaliacao (Mesmo Dia)',
          tipo: 'principal',
          contexto: 'Paciente saiu da avaliacao sem fechar',
          dica: 'Reforce diagnostico e mantenha conexao',
          mensagem: '[Nome], foi um prazer te conhecer hoje! 💚\n\nComo conversamos, seu caso de *[DIAGNOSTICO]* tem solucao com o tratamento adequado.\n\n*Resumo do seu protocolo:*\n[LISTA_TRATAMENTOS]\n\n*Investimento:*\n- Tratamento completo: R$ [VALOR_TOTAL]\n- Parcelado: ate [X]x de R$ [VALOR_PARCELA]\n- Pix a vista: R$ [VALOR_PIX] (desconto de X%)\n\n*Duracao estimada:* [X] meses\n\nLembre-se: quanto antes comecarmos, melhores os resultados!\n\nFicou alguma duvida sobre o que conversamos?',
          gatilhos: ['Resumo claro', 'Opcoes de pagamento', 'Urgencia suave'],
          variacoes: [
            {
              nome: 'Versao Resumida',
              mensagem: '[Nome], conforme conversamos na avaliacao:\n\nProtocolo: [TRATAMENTO]\nInvestimento: R$ [VALOR] (ate [X]x)\nDuracao: [X] meses\n\nQuando podemos comecar? 😊'
            }
          ]
        },
        {
          id: 'prop-2',
          titulo: 'Follow-up Proposta - 3 dias',
          tipo: 'followup',
          contexto: '3 dias apos avaliacao sem decisao',
          dica: 'Agregue valor, nao apenas cobre resposta',
          mensagem: 'Ola [Nome], tudo bem? 💚\n\nPassando pra saber se conseguiu pensar sobre o tratamento.\n\nSurgiu alguma duvida?\nOu tem algo que eu possa esclarecer melhor?\n\nLembro que seu protocolo para [DIAGNOSTICO] pode comecar a mostrar resultados visiveis em [X] semanas com acompanhamento adequado.\n\nEstou aqui pra ajudar! 😊',
          gatilhos: ['Cuidado', 'Expectativa de resultado', 'Disponibilidade'],
          variacoes: []
        },
        {
          id: 'prop-3',
          titulo: 'Follow-up Proposta - 7 dias',
          tipo: 'followup',
          contexto: '7 dias apos avaliacao, ultima tentativa suave',
          dica: 'Seja direto mas respeitoso',
          mensagem: 'Oi [Nome]! 💚\n\nFaz uma semana que fizemos sua avaliacao tricologica.\n\nEntendo que e uma decisao importante. Se tiver alguma duvida ou preocupacao que eu possa ajudar a esclarecer, estou aqui!\n\nUma informacao importante: a queda capilar tende a progredir com o tempo. O que tratamos hoje em [X] meses pode precisar de mais tempo depois.\n\nNao e pra pressionar - e so uma informacao clinica que voce merece saber.\n\nO que voce decidiu?',
          gatilhos: ['Respeito', 'Informacao clinica', 'Pergunta direta'],
          variacoes: []
        }
      ]
    },
    {
      id: 'negociacao',
      nome: 'Negociacao',
      icone: 'handshake',
      cor: '#2d8a7a',
      descricao: 'Superar objecoes e facilitar decisao',
      objetivo: 'Converter proposta em fechamento',
      tempo_ideal: 'Responder objecoes imediatamente',
      scripts: [
        {
          id: 'neg-1',
          titulo: 'Tratamento de Objecao - Preco',
          tipo: 'objecao',
          contexto: 'Paciente acha o tratamento caro',
          dica: 'Foque no valor e custo acumulado de alternativas',
          mensagem: 'Entendo sua preocupacao com o investimento, [Nome].\n\nMas deixa eu te fazer uma pergunta:\n\n*Quanto voce ja gastou em tratamentos que nao resolveram?*\n- Minoxidil: R$ 80-150/mes\n- Shampoos antiqueda: R$ 50-100/mes\n- Vitaminas: R$ 100-200/mes\n\nEm 1-2 anos, muita gente gasta R$ 3.000-6.000... e continua perdendo cabelo.\n\n*Nosso diferencial:*\n- Tratamento com duracao definida (nao eterno)\n- Trata a causa, nao apenas sintoma\n- Resultados duradouros\n\nTemos parcelamento em ate 12x. Quer que eu monte uma proposta que caiba no seu orcamento?',
          gatilhos: ['Custo acumulado', 'Diferenciacao', 'Flexibilidade'],
          variacoes: []
        },
        {
          id: 'neg-2',
          titulo: 'Tratamento de Objecao - Tempo',
          tipo: 'objecao',
          contexto: 'Paciente quer esperar',
          dica: 'Informe sobre progressao sem pressionar',
          mensagem: 'Entendo, [Nome]. Cada um tem seu tempo de decidir.\n\n*Uma informacao clinica que voce merece saber:*\n\nA queda capilar na maioria dos casos e progressiva.\nFoliculos que hoje estao "adormecidos" podem se fechar definitivamente.\n\nO que tratamos hoje em 6 meses, pode precisar de 1 ano daqui a 6 meses.\n\nNao estou te pressionando - e so ciencia.\n\n*Opcao:* Se quiser, posso te passar alguns cuidados basicos para fazer em casa enquanto decide.\n\nO que acha?',
          gatilhos: ['Informacao genuina', 'Respeito', 'Valor agregado'],
          variacoes: []
        },
        {
          id: 'neg-3',
          titulo: 'Oferta de Parcelamento',
          tipo: 'variacao',
          contexto: 'Paciente tem interesse mas limite financeiro',
          dica: 'Facilite ao maximo',
          mensagem: '[Nome], entendo sua situacao.\n\n*Opcoes de pagamento:*\n\n1️⃣ *Pix a vista:* R$ [VALOR] com [X]% desconto\n\n2️⃣ *Cartao de credito:* ate 12x de R$ [VALOR]\n\n3️⃣ *Entrada + parcelas:* R$ [ENTRADA] + [X]x de R$ [VALOR]\n\n4️⃣ *Tratamento inicial:* Comeca com protocolo basico (R$ [VALOR]) e evolui depois\n\nQual dessas opcoes se encaixa melhor pra voce?',
          gatilhos: ['Multiplas opcoes', 'Flexibilidade', 'Facilitar decisao'],
          variacoes: []
        }
      ]
    },
    {
      id: 'fechamento',
      nome: 'Fechamento',
      icone: 'trophy',
      cor: '#4fb3a3',
      descricao: 'Finalizar contratacao e iniciar tratamento',
      objetivo: 'Garantir inicio positivo do tratamento',
      tempo_ideal: 'Agendar primeira sessao em ate 7 dias',
      scripts: [
        {
          id: 'fech-1',
          titulo: 'Coleta de Dados',
          tipo: 'principal',
          contexto: 'Paciente confirmou que quer comecar',
          dica: 'Seja objetivo e celebre a decisao',
          mensagem: 'Que otimo, [Nome]! 🎉💚\n\nEstou muito feliz que voce decidiu cuidar da saude dos seus cabelos!\n\nPara dar inicio ao seu tratamento, preciso de alguns dados:\n\n👤 Nome completo:\n📅 Data de nascimento:\n🆔 CPF:\n📧 Email:\n📱 Telefone:\n🏠 Endereco completo:\n\n*Forma de pagamento:* Pix ou cartao em [X]x?\n\n*Primeira sessao disponivel:* [DATA] as [HORA]\n\nAssim que confirmar os dados, ja agendo sua sessao!',
          gatilhos: ['Celebracao', 'Clareza', 'Agilidade'],
          variacoes: []
        },
        {
          id: 'fech-2',
          titulo: 'Boas-vindas ao Tratamento',
          tipo: 'principal',
          contexto: 'Apos confirmar pagamento/dados',
          dica: 'Faca o paciente se sentir especial e bem cuidado',
          mensagem: 'Seja muito bem-vindo(a) a Cabelo & Saude, [Nome]! 💚🌿\n\nEstamos muito felizes em iniciar essa jornada com voce!\n\n*Sua primeira sessao:*\n📅 Data: [DATA]\n⏰ Horario: [HORA]\n📍 Local: [ENDERECO]\n\n*Orientacoes para a sessao:*\n[ORIENTACOES_ESPECIFICAS]\n\n*O que esperar:*\n- Duracao: [X] minutos\n- Procedimento: [DESCRICAO]\n- Cuidados pos-sessao: te explicaremos no dia\n\nQualquer duvida ate la, estou por aqui!\n\nVamos juntos recuperar a saude dos seus cabelos! 🌱',
          gatilhos: ['Acolhimento', 'Clareza de expectativas', 'Entusiasmo'],
          variacoes: []
        },
        {
          id: 'fech-3',
          titulo: 'Confirmacao de Sessao',
          tipo: 'followup',
          contexto: '24h antes de cada sessao',
          dica: 'Manter contato constante aumenta aderencia',
          mensagem: 'Ola [Nome]! 💚\n\nAmanha temos sua sessao de tratamento!\n\n📅 Data: [DATA]\n⏰ Horario: [HORA]\n\n*Lembretes:*\n[ORIENTACOES_PRE_SESSAO]\n\nPosso confirmar sua presenca? ✅',
          gatilhos: ['Cuidado', 'Organizacao', 'Aderencia'],
          variacoes: []
        }
      ]
    },
    {
      id: 'reengajamento',
      nome: 'Reengajamento',
      icone: 'redo',
      cor: '#1a5f52',
      descricao: 'Retomar contato com leads que esfriaram',
      objetivo: 'Reativar interesse e retomar jornada',
      tempo_ideal: '14-30 dias apos ultimo contato',
      scripts: [
        {
          id: 'reeng-1',
          titulo: 'Reengajamento - 14 dias',
          tipo: 'principal',
          contexto: '14 dias sem resposta apos proposta',
          dica: 'Retome com valor, nao com cobranca',
          mensagem: 'Ola [Nome], tudo bem? 💚\n\nFaz um tempinho que conversamos sobre seu tratamento capilar.\n\nSei que tomar essa decisao nem sempre e facil. Por isso queria saber:\n\nTem alguma duvida que eu possa esclarecer?\nOu alguma preocupacao que te impediu de comecar?\n\nEstou aqui pra ajudar, sem pressao. 😊\n\nSe quiser, posso te enviar alguns conteudos sobre cuidados capilares que voce pode fazer em casa enquanto decide.',
          gatilhos: ['Empatia', 'Valor', 'Baixa pressao'],
          variacoes: []
        },
        {
          id: 'reeng-2',
          titulo: 'Reengajamento - Conteudo',
          tipo: 'variacao',
          contexto: 'Retomar com valor educativo',
          dica: 'Agregue valor sem pedir nada',
          mensagem: '[Nome], lembrei de voce ao ver esse conteudo! 💚\n\n[LINK_CONTEUDO]\n\nE sobre [TEMA] - achei que poderia te interessar.\n\nSe em algum momento quiser retomar nossa conversa sobre tratamento, estou por aqui!\n\nCuide-se! 🌿',
          gatilhos: ['Valor gratuito', 'Relacionamento', 'Porta aberta'],
          variacoes: []
        },
        {
          id: 'reeng-3',
          titulo: 'Reengajamento - Direto',
          tipo: 'variacao',
          contexto: '30 dias sem contato, ultima tentativa',
          dica: 'Seja direto mas respeitoso',
          mensagem: 'Oi [Nome], tudo bem?\n\nTentei contato algumas vezes mas nao consegui retorno.\n\nEntendo se o momento nao e o ideal ou se voce decidiu nao prosseguir - cada um tem seu tempo!\n\nMe conta: voce ainda tem interesse em tratar a queda capilar?\n\nSe sim, podemos retomar de onde paramos.\nSe nao, sem problemas! So me avisa pra eu nao ficar te incomodando. 😊\n\nDe qualquer forma, desejo o melhor pra voce! 💚',
          gatilhos: ['Respeito', 'Clareza', 'Dignidade'],
          variacoes: []
        }
      ]
    }
  ];

  // Gerar tabs das etapas
  var tabsHtml = etapasFunil.map(function(etapa, index) {
    var activeClass = index === 0 ? 'active' : '';
    return '<div class="tab ' + activeClass + '" data-tab="' + etapa.id + '">' +
      '<i class="fas fa-' + etapa.icone + '" style="color: ' + etapa.cor + ';"></i> ' + etapa.nome +
    '</div>';
  }).join('');

  // Gerar conteudo de cada etapa
  var tabContentsHtml = etapasFunil.map(function(etapa, index) {
    var activeClass = index === 0 ? 'active' : '';

    var scriptsHtml = etapa.scripts.map(function(script) {
      var tipoBadge = script.tipo === 'principal' ? 'badge-success' :
                      script.tipo === 'followup' ? 'badge-warning' :
                      script.tipo === 'objecao' ? 'badge-danger' : 'badge-info';
      var tipoLabel = script.tipo === 'principal' ? 'PRINCIPAL' :
                      script.tipo === 'followup' ? 'FOLLOW-UP' :
                      script.tipo === 'objecao' ? 'OBJECAO' : 'VARIACAO';

      var gatilhosHtml = script.gatilhos.map(function(g) {
        return '<span class="badge badge-purple" style="font-size: 11px; margin-right: 4px;">' + g + '</span>';
      }).join('');

      var gatilhosListHtml = script.gatilhos.map(function(g) {
        return '<li style="padding: 4px 0;">• ' + g + '</li>';
      }).join('');

      var variacoesHtml = '';
      if (script.variacoes && script.variacoes.length > 0) {
        var variacoesItems = script.variacoes.map(function(v) {
          return '<div style="margin-bottom: 12px;">' +
            '<div style="font-size: 12px; font-weight: 500; color: #1a5f52; margin-bottom: 6px;">' + v.nome + '</div>' +
            '<div class="message-box" style="font-size: 12px; white-space: pre-wrap;">' + v.mensagem + '</div>' +
          '</div>';
        }).join('');

        variacoesHtml = '<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">' +
          '<div style="font-weight: 500; margin-bottom: 12px; font-size: 13px; color: #6b7280;">' +
            '<i class="fas fa-random"></i> Variacoes disponiveis:' +
          '</div>' +
          variacoesItems +
        '</div>';
      }

      return '<div class="accordion" style="margin-bottom: 16px;">' +
        '<div class="accordion-header" style="border-left: 4px solid ' + etapa.cor + ';">' +
          '<div class="accordion-title">' +
            '<span class="badge ' + tipoBadge + '" style="margin-right: 8px; font-size: 10px;">' + tipoLabel + '</span>' +
            script.titulo +
          '</div>' +
          '<i class="fas fa-chevron-down"></i>' +
        '</div>' +
        '<div class="accordion-content" style="padding: 0;">' +
          '<div style="padding: 16px; background: #f8f9fa; border-bottom: 1px solid #e5e7eb;">' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px;">' +
              '<div>' +
                '<i class="fas fa-info-circle" style="color: #1a5f52;"></i> ' +
                '<strong>Contexto:</strong> ' + script.contexto +
              '</div>' +
              '<div>' +
                '<i class="fas fa-lightbulb" style="color: #f59e0b;"></i> ' +
                '<strong>Dica:</strong> ' + script.dica +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 0;">' +
            '<div style="padding: 20px; border-right: 1px solid #e5e7eb;">' +
              '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">' +
                '<div style="width: 28px; height: 28px; background: #25D366; border-radius: 6px; display: flex; align-items: center; justify-content: center;">' +
                  '<i class="fab fa-whatsapp" style="color: white; font-size: 14px;"></i>' +
                '</div>' +
                '<span style="font-weight: 600; font-size: 14px;">Script Principal</span>' +
              '</div>' +
              '<div class="message-box" style="font-size: 13px; white-space: pre-wrap;">' + script.mensagem + '</div>' +
              variacoesHtml +
            '</div>' +
            '<div style="padding: 20px; background: #fafafa;">' +
              '<div style="font-weight: 500; margin-bottom: 12px; font-size: 13px;">' +
                '<i class="fas fa-brain" style="color: #1a5f52;"></i> Gatilhos Utilizados' +
              '</div>' +
              '<div style="margin-bottom: 20px;">' + gatilhosHtml + '</div>' +
              '<div style="font-weight: 500; margin-bottom: 8px; font-size: 13px;">' +
                '<i class="fas fa-check-circle" style="color: #10b981;"></i> Por que funciona' +
              '</div>' +
              '<ul style="list-style: none; padding: 0; font-size: 12px; color: #6b7280;">' + gatilhosListHtml + '</ul>' +
              '<div style="margin-top: 16px; padding: 12px; background: rgba(26, 95, 82, 0.1); border-radius: 8px;">' +
                '<div style="font-size: 11px; color: #1a5f52; font-weight: 500;">' +
                  '<i class="fas fa-hashtag"></i> ID: ' + script.id +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '<div id="' + etapa.id + '" class="tab-content ' + activeClass + '">' +
      '<div style="display: grid; grid-template-columns: 1fr auto; gap: 16px; margin-bottom: 20px; padding: 16px; background: rgba(26, 95, 82, 0.05); border-radius: 8px; border-left: 4px solid ' + etapa.cor + ';">' +
        '<div>' +
          '<div style="font-weight: 600; margin-bottom: 4px;">' + etapa.descricao + '</div>' +
          '<div style="font-size: 13px; color: #6b7280;">' +
            '<strong>Objetivo:</strong> ' + etapa.objetivo +
          '</div>' +
        '</div>' +
        '<div style="text-align: right;">' +
          '<span class="badge badge-info" style="font-size: 12px;">' +
            '<i class="fas fa-clock"></i> ' + etapa.tempo_ideal +
          '</span>' +
        '</div>' +
      '</div>' +
      scriptsHtml +
    '</div>';
  }).join('');

  // Sequencias de Follow-up
  var sequencias = [
    {
      nome: 'Sequencia de Captacao',
      descricao: 'Do primeiro contato ate avaliacao agendada',
      icone: 'route',
      etapas: [
        { dia: 0, acao: 'Resposta inicial' },
        { dia: 0, acao: 'Qualificacao' },
        { dia: 0, acao: 'Convite para avaliacao' },
        { dia: 1, acao: 'Confirmacao se agendou' }
      ]
    },
    {
      nome: 'Sequencia Pos-Avaliacao',
      descricao: 'Da avaliacao ate fechamento',
      icone: 'tasks',
      etapas: [
        { dia: 0, acao: 'Envio de proposta' },
        { dia: 3, acao: 'Follow-up proposta' },
        { dia: 7, acao: 'Follow-up final' },
        { dia: 14, acao: 'Reengajamento' }
      ]
    },
    {
      nome: 'Sequencia de Tratamento',
      descricao: 'Acompanhamento durante tratamento',
      icone: 'heartbeat',
      etapas: [
        { dia: 0, acao: 'Boas-vindas' },
        { dia: -1, acao: 'Confirmacao antes da sessao' },
        { dia: 1, acao: 'Pos-sessao - como foi' }
      ]
    }
  ];

  var sequenciasHtml = sequencias.map(function(seq) {
    var etapasSeqHtml = seq.etapas.map(function(etapa, i) {
      var borderStyle = i < seq.etapas.length - 1 ? 'border-left: 2px solid #1a5f52; margin-left: -11px; padding-left: 20px;' : 'margin-left: -11px; padding-left: 20px;';
      var bgColor = i === seq.etapas.length - 1 ? '#10b981' : '#1a5f52';

      return '<div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; ' + borderStyle + '">' +
        '<div style="width: 20px; height: 20px; background: ' + bgColor + '; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: -10px;">' +
          '<span style="color: white; font-size: 10px; font-weight: 600;">' + (i + 1) + '</span>' +
        '</div>' +
        '<div style="flex: 1;">' +
          '<div style="display: flex; justify-content: space-between; align-items: center;">' +
            '<span style="font-weight: 500; font-size: 13px;">' + etapa.acao + '</span>' +
            '<span class="badge badge-info" style="font-size: 10px;">Dia ' + etapa.dia + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="card" style="margin-bottom: 0;">' +
      '<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">' +
        '<div style="width: 40px; height: 40px; background: #1a5f52; border-radius: 8px; display: flex; align-items: center; justify-content: center;">' +
          '<i class="fas fa-' + seq.icone + '" style="color: white;"></i>' +
        '</div>' +
        '<div>' +
          '<div style="font-weight: 600;">' + seq.nome + '</div>' +
          '<div style="font-size: 12px; color: #6b7280;">' + seq.descricao + '</div>' +
        '</div>' +
      '</div>' +
      '<div style="position: relative; padding-left: 20px;">' + etapasSeqHtml + '</div>' +
    '</div>';
  }).join('');

  // Templates por Tipo de Paciente
  var templatesPaciente = [
    {
      nome: 'Queda Capilar Geral',
      icone: 'leaf',
      dores: ['Perda excessiva', 'Afinamento', 'Entradas'],
      script: 'Sabia que existem mais de 100 causas diferentes para queda de cabelo?\n\nPor isso que Minoxidil e Finasterida nao funcionam pra todo mundo - eles tratam causas especificas.\n\nAqui na Cabelo & Saude, investigamos QUAL e a sua causa antes de propor tratamento.\n\nQuer saber mais?'
    },
    {
      nome: 'Calvicie',
      icone: 'user',
      dores: ['Entradas avancadas', 'Coroa raleando', 'Genetica'],
      script: 'Calvicie nao e sentenca definitiva.\n\nDependendo do estagio e das causas associadas, podemos:\n✅ Retardar significativamente a progressao\n✅ Fortalecer os fios existentes\n✅ Reativar foliculos ainda viaveis\n\nO primeiro passo e investigar. Ja fez avaliacao tricologica?'
    },
    {
      nome: 'Tratamentos Naturais',
      icone: 'seedling',
      dores: ['Aversao a medicamentos', 'Busca por alternativas', 'Efeitos colaterais'],
      script: 'Busca tratamento natural para queda de cabelo?\n\nA boa noticia: existem protocolos que nao dependem apenas de medicamentos fortes.\n\nTrabalhamos com:\n- Nutricao capilar\n- Laserterapia\n- Protocolos topicos\n- Suplementacao personalizada\n\nQuer conhecer as opcoes?'
    }
  ];

  var templatesHtml = templatesPaciente.map(function(template) {
    var doresHtml = template.dores.map(function(d) {
      return '<span class="badge badge-warning" style="font-size: 11px;">' + d + '</span>';
    }).join(' ');

    return '<div class="accordion">' +
      '<div class="accordion-header">' +
        '<div class="accordion-title">' +
          '<i class="fas fa-' + template.icone + '" style="color: #1a5f52; margin-right: 8px;"></i>' +
          template.nome +
        '</div>' +
        '<i class="fas fa-chevron-down"></i>' +
      '</div>' +
      '<div class="accordion-content">' +
        '<div style="margin-bottom: 16px;">' +
          '<div style="font-size: 12px; font-weight: 500; color: #6b7280; margin-bottom: 8px;">Dores principais:</div>' +
          '<div style="display: flex; gap: 8px; flex-wrap: wrap;">' + doresHtml + '</div>' +
        '</div>' +
        '<div class="message-box" style="font-size: 13px; white-space: pre-wrap;">' + template.script + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  // Convite Avaliacao
  var conviteAvaliacaoHtml = '<div class="card" style="border-color: #10b981;">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-gift" style="color: #10b981;"></i> Convite para Avaliacao Tricologica</h3>' +
      '<span class="badge badge-success">ALTA CONVERSAO</span>' +
    '</div>' +
    '<p style="color: #6b7280; margin-bottom: 16px; font-size: 13px;">' +
      'Use este script para convidar leads qualificados a agendar sua avaliacao.' +
    '</p>' +
    '<div class="message-box" style="font-size: 13px; white-space: pre-wrap;">' +
      'Quer entender de verdade o que esta causando sua queda capilar?\n\n' +
      'A avaliacao tricologica inclui:\n' +
      '✅ Anamnese completa\n' +
      '✅ Tricoscopia digital (exame do couro cabeludo)\n' +
      '✅ Diagnostico personalizado\n' +
      '✅ Proposta de tratamento\n\n' +
      '💚 Agende sua avaliacao\n' +
      '📱 Responda essa mensagem ou clique no link:\n' +
      '[LINK_AGENDAMENTO]\n\n' +
      'Cabelo & Saude - Clinica de Tricologia\n' +
      'www.cabeloesaude.com.br' +
    '</div>' +
  '</div>';

  // Total de scripts
  var totalScripts = 0;
  etapasFunil.forEach(function(etapa) {
    totalScripts += etapa.scripts.length;
  });

  return '<div class="page-header">' +
    '<h1 class="page-title"><i class="fas fa-comment-dots"></i> Central de Scripts - Cabelo & Saude</h1>' +
    '<p class="page-subtitle">Mensagens prontas e otimizadas para cada etapa do funil de vendas da clinica de tricologia</p>' +
  '</div>' +

  statsHtml +

  '<div class="card fade-in" style="margin-bottom: 24px;">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-lightbulb"></i> Dicas de Comunicacao para Tricologia</h3>' +
    '</div>' +
    '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">' + dicasHtml + '</div>' +
  '</div>' +

  '<div class="card fade-in" style="margin-bottom: 24px;">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-layer-group"></i> Scripts por Etapa do Funil</h3>' +
      '<span class="badge badge-info">' + totalScripts + ' scripts</span>' +
    '</div>' +
    '<div class="tabs" style="margin-bottom: 20px; flex-wrap: wrap;">' + tabsHtml + '</div>' +
    '<div class="tab-contents">' + tabContentsHtml + '</div>' +
  '</div>' +

  '<div class="grid grid-2" style="margin-bottom: 24px;">' +
    '<div class="card fade-in">' +
      '<div class="card-header">' +
        '<h3 class="card-title"><i class="fas fa-route"></i> Sequencias de Follow-up</h3>' +
      '</div>' +
      '<p style="color: #6b7280; margin-bottom: 16px; font-size: 13px;">' +
        'Siga estas sequencias para maximizar suas taxas de resposta e conversao.' +
      '</p>' +
      '<div style="display: flex; flex-direction: column; gap: 16px;">' + sequenciasHtml + '</div>' +
    '</div>' +
    '<div class="card fade-in">' +
      '<div class="card-header">' +
        '<h3 class="card-title"><i class="fas fa-bullseye"></i> Templates por Tipo de Paciente</h3>' +
      '</div>' +
      '<p style="color: #6b7280; margin-bottom: 16px; font-size: 13px;">' +
        'Scripts personalizados para os principais perfis de pacientes.' +
      '</p>' +
      templatesHtml +
    '</div>' +
  '</div>' +

  conviteAvaliacaoHtml +

  '<div style="background: linear-gradient(135deg, #1a5f52 0%, #2d8a7a 100%); border-radius: 12px; padding: 24px; margin-top: 24px;">' +
    '<div style="display: flex; align-items: center; gap: 16px;">' +
      '<div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center;">' +
        '<i class="fas fa-heart" style="color: white; font-size: 20px;"></i>' +
      '</div>' +
      '<div style="flex: 1;">' +
        '<div style="font-weight: 600; margin-bottom: 4px; color: white;">Lembre-se</div>' +
        '<div style="font-size: 14px; color: rgba(255,255,255,0.9);">Cada paciente que chega ate nos esta sofrendo com um problema que afeta sua autoestima. Trate com empatia, ouca de verdade, e mostre que aqui ele encontra solucao real - nao paliativo.</div>' +
      '</div>' +
    '</div>' +
  '</div>';
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
    // Verificacao de seguranca para scripts
    if (!etapa.scripts || !Array.isArray(etapa.scripts)) {
      return `<div class="tab-content ${index === 0 ? 'active' : ''}" id="tab-${key}"><p>Sem scripts disponíveis</p></div>`;
    }

    const scriptsHtml = etapa.scripts.map(script => {
      // Verificacao de seguranca para propriedades obrigatorias
      const mensagem = script.mensagem || '';
      const variacoes = script.variacoes || [];
      const gatilhos = script.gatilhos || [];
      const contexto = script.contexto || '';
      const dica = script.dica || '';
      const tipo = script.tipo || 'variacao';
      const titulo = script.titulo || 'Script';

      const variacoesHtml = variacoes.length > 0 ? `
        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border);">
          <div style="font-weight: 500; margin-bottom: 12px; font-size: 13px; color: var(--text-secondary);">
            <i class="fas fa-random"></i> Variacoes disponiveis:
          </div>
          ${variacoes.filter(v => v && v.mensagem).map(v => `
            <div style="margin-bottom: 12px;">
              <div style="font-size: 12px; font-weight: 500; color: var(--primary); margin-bottom: 6px;">${v.nome || 'Variação'}</div>
              <div class="message-box" style="font-size: 12px;">
                <button class="copy-btn" onclick="copyToClipboard(\`${(v.mensagem || '').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)">
                  <i class="fas fa-copy"></i> Copiar
                </button>
                ${v.mensagem || ''}
              </div>
            </div>
          `).join('')}
        </div>
      ` : '';

      const gatilhosHtml = gatilhos.map(g => `<span class="badge badge-purple" style="font-size: 11px; margin-right: 4px;">${g}</span>`).join('');

      const tipoBadge = tipo === 'principal' ? 'badge-success' :
                        tipo === 'followup' ? 'badge-warning' :
                        tipo === 'objecao' ? 'badge-danger' : 'badge-info';
      const tipoLabel = tipo === 'principal' ? 'PRINCIPAL' :
                        tipo === 'followup' ? 'FOLLOW-UP' :
                        tipo === 'objecao' ? 'OBJECAO' :
                        tipo === 'informativo' ? 'INFO' : 'VARIACAO';

      return `
        <div class="accordion" style="margin-bottom: 16px;">
          <div class="accordion-header" style="border-left: 4px solid ${etapa.cor};">
            <div class="accordion-title">
              <span class="badge ${tipoBadge}" style="margin-right: 8px; font-size: 10px;">${tipoLabel}</span>
              ${titulo}
            </div>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content" style="padding: 0;">
            <div style="padding: 16px; background: #f8f9fa; border-bottom: 1px solid var(--border);">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px;">
                <div>
                  <i class="fas fa-info-circle" style="color: var(--primary);"></i>
                  <strong>Contexto:</strong> ${contexto}
                </div>
                <div>
                  <i class="fas fa-lightbulb" style="color: #f59e0b;"></i>
                  <strong>Dica:</strong> ${dica}
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
                  <button class="copy-btn" onclick="copyToClipboard(\`${mensagem.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`, this)">
                    <i class="fas fa-copy"></i> Copiar
                  </button>
                  ${mensagem}
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
                  ${gatilhos.map(g => `<li style="padding: 4px 0;">• ${g}</li>`).join('')}
                </ul>

                <div style="margin-top: 16px; padding: 12px; background: rgba(139, 92, 246, 0.1); border-radius: 8px;">
                  <div style="font-size: 11px; color: var(--primary); font-weight: 500;">
                    <i class="fas fa-hashtag"></i> ID: ${script.id || 'N/A'}
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

function renderAgentes() {
  // Cards de metricas gerais
  const metricasHtml = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 32px;">
      <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05)); border-radius: 16px; padding: 20px; text-align: center; border: 1px solid rgba(139, 92, 246, 0.2);">
        <div style="font-size: 32px; font-weight: 700; color: #8b5cf6;">${METRICAS_GERAIS.roi_medio}</div>
        <div style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase;">ROI Medio</div>
      </div>
      <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); border-radius: 16px; padding: 20px; text-align: center; border: 1px solid rgba(16, 185, 129, 0.2);">
        <div style="font-size: 32px; font-weight: 700; color: #10b981;">${METRICAS_GERAIS.reducao_custo_medio}</div>
        <div style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase;">Reducao Custo</div>
      </div>
      <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05)); border-radius: 16px; padding: 20px; text-align: center; border: 1px solid rgba(59, 130, 246, 0.2);">
        <div style="font-size: 32px; font-weight: 700; color: #3b82f6;">${METRICAS_GERAIS.disponibilidade}</div>
        <div style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase;">Disponibilidade</div>
      </div>
      <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); border-radius: 16px; padding: 20px; text-align: center; border: 1px solid rgba(245, 158, 11, 0.2);">
        <div style="font-size: 32px; font-weight: 700; color: #f59e0b;">${METRICAS_GERAIS.aumento_satisfacao}</div>
        <div style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase;">Satisfacao</div>
      </div>
    </div>
  `;

  // Tipos de agentes
  const tiposHtml = Object.entries(TIPOS_AGENTES).map(([key, tipo]) => `
    <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px; border-top: 4px solid ${tipo.cor};">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        <div style="width: 56px; height: 56px; background: ${tipo.cor}15; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-${tipo.icone}" style="font-size: 24px; color: ${tipo.cor};"></i>
        </div>
        <div>
          <h3 style="margin: 0; font-size: 18px;">${tipo.nome}</h3>
          <p style="margin: 4px 0 0; font-size: 13px; color: var(--text-secondary);">${tipo.descricao}</p>
        </div>
      </div>
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${tipo.caracteristicas.map(c => `
          <li style="display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border);">
            <i class="fas fa-check-circle" style="color: ${tipo.cor};"></i>
            <span style="font-size: 13px;">${c}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');

  // Cards de agentes
  const agentesHtml = AGENTES_EXEMPLOS.map(agente => `
    <div class="card fade-in" style="border-top: 4px solid ${agente.cor}; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 12px; right: 12px;">
        <span class="badge" style="background: ${agente.tipo === 'supervisor' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)'}; color: ${agente.tipo === 'supervisor' ? '#8b5cf6' : '#10b981'}; font-size: 10px;">
          <i class="fas fa-${agente.tipo === 'supervisor' ? 'crown' : 'robot'}"></i> ${agente.tipo === 'supervisor' ? 'Supervisor' : 'Executor'}
        </span>
      </div>

      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
        <div style="width: 52px; height: 52px; background: ${agente.cor}15; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <i class="fas fa-${agente.icone}" style="font-size: 22px; color: ${agente.cor};"></i>
        </div>
        <div>
          <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${agente.nome}</h3>
          <p style="margin: 4px 0 0; font-size: 12px; color: var(--text-secondary);">${agente.funcao}</p>
        </div>
      </div>

      <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.5;">${agente.descricao}</p>

      <!-- Metricas do Agente -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
        ${Object.entries(agente.metricas).map(([key, value]) => `
          <div style="background: var(--bg-page); border-radius: 8px; padding: 10px; text-align: center;">
            <div style="font-size: 16px; font-weight: 700; color: ${agente.cor};">${value}</div>
            <div style="font-size: 10px; color: var(--text-secondary); text-transform: uppercase;">${key.replace(/_/g, ' ')}</div>
          </div>
        `).join('')}
      </div>

      <!-- Ferramentas -->
      <div style="margin-bottom: 16px;">
        <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">
          <i class="fas fa-tools" style="margin-right: 4px;"></i> Ferramentas
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${agente.ferramentas.map(f => `
            <span style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; padding: 4px 10px; border-radius: 12px; font-size: 11px;">${f}</span>
          `).join('')}
        </div>
      </div>

      <!-- Casos de Uso -->
      <div style="margin-bottom: 16px;">
        <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px;">
          <i class="fas fa-lightbulb" style="margin-right: 4px;"></i> Ideal para
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${agente.casos_uso.map(c => `
            <span style="background: var(--bg-page); padding: 4px 10px; border-radius: 12px; font-size: 11px; color: var(--text-secondary);">${c}</span>
          `).join('')}
        </div>
      </div>

      <!-- Prompt Exemplo (Accordion) -->
      <details style="background: var(--bg-page); border-radius: 8px; overflow: hidden;">
        <summary style="padding: 12px; cursor: pointer; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-code" style="color: var(--primary);"></i>
          Ver exemplo de prompt
          <i class="fas fa-chevron-down" style="margin-left: auto; font-size: 10px; transition: transform 0.2s;"></i>
        </summary>
        <div style="padding: 12px; border-top: 1px solid var(--border); font-size: 12px; color: var(--text-secondary); font-family: monospace; line-height: 1.6; background: rgba(0,0,0,0.02);">
          ${agente.prompt_exemplo}
        </div>
      </details>
    </div>
  `).join('');

  // Verticais/Segmentos
  const verticaisHtml = VERTICAIS.map(v => `
    <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 20px; border-left: 4px solid ${v.cor};">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
        <div style="width: 44px; height: 44px; background: ${v.cor}15; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-${v.icone}" style="font-size: 18px; color: ${v.cor};"></i>
        </div>
        <div>
          <h4 style="margin: 0; font-size: 16px;">${v.segmento}</h4>
          <div style="font-size: 11px; color: var(--text-secondary);">${v.agentes_recomendados.length} agentes recomendados</div>
        </div>
      </div>

      <div style="margin-bottom: 16px;">
        <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">CASOS DE USO</div>
        ${v.casos.map(c => `
          <div style="display: flex; align-items: center; gap: 8px; padding: 6px 0; font-size: 12px;">
            <i class="fas fa-check" style="color: ${v.cor}; font-size: 10px;"></i> ${c}
          </div>
        `).join('')}
      </div>

      <div style="background: linear-gradient(135deg, ${v.cor}10, ${v.cor}05); border-radius: 10px; padding: 14px;">
        <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 10px;">ECONOMIA ESTIMADA</div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center;">
          <div>
            <div style="font-size: 18px; font-weight: 700; color: ${v.cor};">${v.economia.funcionarios}</div>
            <div style="font-size: 9px; color: var(--text-secondary);">FUNCIONARIOS</div>
          </div>
          <div>
            <div style="font-size: 18px; font-weight: 700; color: ${v.cor};">${v.economia.horas_mes}</div>
            <div style="font-size: 9px; color: var(--text-secondary);">HORAS/MES</div>
          </div>
          <div>
            <div style="font-size: 18px; font-weight: 700; color: ${v.cor};">${v.economia.reducao_custo}</div>
            <div style="font-size: 9px; color: var(--text-secondary);">REDUCAO</div>
          </div>
        </div>
      </div>

      <div style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 4px;">
        ${v.agentes_recomendados.map(a => {
          const agente = AGENTES_EXEMPLOS.find(ag => ag.id === a);
          return agente ? `<span style="background: ${agente.cor}15; color: ${agente.cor}; padding: 3px 8px; border-radius: 10px; font-size: 10px;"><i class="fas fa-${agente.icone}"></i> ${agente.nome.split(' ')[1] || agente.nome.split(' ')[0]}</span>` : '';
        }).join('')}
      </div>
    </div>
  `).join('');

  // Comparativo Humano vs IA
  const comparativoHtml = `
    <div class="card fade-in" style="margin-top: 32px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-balance-scale" style="color: var(--primary);"></i> ${COMPARATIVO_HUMANO.titulo}</h3>
      </div>
      <div style="overflow-x: auto;">
        <table style="width: 100%; font-size: 13px;">
          <thead>
            <tr style="background: var(--bg-page);">
              <th style="padding: 14px; text-align: left;">Metrica</th>
              <th style="padding: 14px; text-align: center;"><i class="fas fa-user" style="margin-right: 6px;"></i>Humano</th>
              <th style="padding: 14px; text-align: center;"><i class="fas fa-robot" style="margin-right: 6px; color: var(--primary);"></i>Agente IA</th>
              <th style="padding: 14px; text-align: center;">Vantagem</th>
            </tr>
          </thead>
          <tbody>
            ${COMPARATIVO_HUMANO.metricas.map((m, i) => `
              <tr style="border-bottom: 1px solid var(--border); ${i % 2 === 0 ? '' : 'background: rgba(139, 92, 246, 0.02);'}">
                <td style="padding: 14px; font-weight: 500;">${m.metrica}</td>
                <td style="padding: 14px; text-align: center; color: var(--text-secondary);">${m.humano}</td>
                <td style="padding: 14px; text-align: center; font-weight: 600; color: var(--primary);">${m.ia}</td>
                <td style="padding: 14px; text-align: center;">
                  <span style="background: rgba(16, 185, 129, 0.15); color: #10b981; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">${m.vantagem}</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Ferramentas disponiveis
  const ferramentasHtml = `
    <div class="card fade-in" style="margin-top: 24px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-plug" style="color: var(--secondary);"></i> Integracoes Disponiveis</h3>
        <span class="badge badge-info">${FERRAMENTAS_DISPONIVEIS.length}+ ferramentas</span>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        ${FERRAMENTAS_DISPONIVEIS.map(f => `
          <div style="display: flex; align-items: center; gap: 10px; background: var(--bg-page); padding: 10px 16px; border-radius: 10px;">
            <i class="${f.fab ? 'fab' : 'fas'} fa-${f.icone}" style="color: var(--primary);"></i>
            <span style="font-size: 13px;">${f.nome}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-robot"></i> ${AGENTES_INFO.titulo}</h1>
      <p class="page-subtitle">${AGENTES_INFO.subtitulo}</p>
    </div>

    <!-- Banner Principal -->
    <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1)); border-radius: 20px; padding: 32px; margin-bottom: 32px; border: 1px solid rgba(139, 92, 246, 0.2);">
      <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <h2 style="margin: 0 0 12px; font-size: 24px;">Transforme seu atendimento com IA</h2>
          <p style="margin: 0; color: var(--text-secondary); line-height: 1.6;">${AGENTES_INFO.descricao}</p>
          <a href="${AGENTES_INFO.doc_link}" target="_blank" class="btn btn-primary" style="margin-top: 20px; display: inline-flex; align-items: center; gap: 8px;">
            <i class="fas fa-book"></i> Ver Documentacao Completa
          </a>
        </div>
        <div style="display: flex; gap: 16px;">
          <div style="text-align: center; padding: 20px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="font-size: 36px; font-weight: 700; color: var(--primary);">${AGENTES_EXEMPLOS.length}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Modelos de Agentes</div>
          </div>
          <div style="text-align: center; padding: 20px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="font-size: 36px; font-weight: 700; color: var(--secondary);">${VERTICAIS.length}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">Verticais Atendidas</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Metricas Gerais -->
    ${metricasHtml}

    <!-- Tipos de Agentes -->
    <div class="card fade-in" style="margin-bottom: 32px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-sitemap" style="color: var(--primary);"></i> Arquitetura de Agentes</h3>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 20px;">A plataforma trabalha com dois tipos de agentes que se complementam:</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        ${tiposHtml}
      </div>
    </div>

    <!-- Catalogo de Agentes -->
    <div style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <h2 style="margin: 0; font-size: 20px;"><i class="fas fa-th-large" style="color: var(--primary); margin-right: 10px;"></i>Catalogo de Agentes</h2>
        <span class="badge badge-purple">${AGENTES_EXEMPLOS.length} modelos prontos</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 20px;">
        ${agentesHtml}
      </div>
    </div>

    <!-- Verticais/Segmentos -->
    <div class="card fade-in" style="margin-bottom: 32px;">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-industry" style="color: var(--secondary);"></i> Aplicacao por Segmento</h3>
        <span class="badge badge-success">Economia comprovada</span>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 20px;">Veja como os agentes podem ser aplicados em diferentes verticais de mercado:</p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
        ${verticaisHtml}
      </div>
    </div>

    <!-- Comparativo -->
    ${comparativoHtml}

    <!-- Ferramentas -->
    ${ferramentasHtml}

    <!-- CTA Final -->
    <div style="background: linear-gradient(135deg, var(--primary), #6366f1); border-radius: 20px; padding: 40px; margin-top: 32px; text-align: center; color: white;">
      <h2 style="margin: 0 0 12px; font-size: 28px;">Pronto para automatizar seu atendimento?</h2>
      <p style="margin: 0 0 24px; opacity: 0.9;">Implemente agentes inteligentes em ${METRICAS_GERAIS.tempo_implementacao} e reduza custos em ate ${METRICAS_GERAIS.reducao_custo_medio}</p>
      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <a href="https://chat.papervines.digital/trial/sign-up" target="_blank" class="btn" style="background: white; color: var(--primary); font-weight: 600;">
          <i class="fas fa-rocket"></i> Comecar Teste Gratuito
        </a>
        <a href="${AGENTES_INFO.doc_link}" target="_blank" class="btn" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3);">
          <i class="fas fa-book"></i> Ler Documentacao
        </a>
      </div>
    </div>

    <style>
      details[open] summary .fa-chevron-down { transform: rotate(180deg); }
      details summary::-webkit-details-marker { display: none; }
    </style>
  `;
}

function renderAPIDocumentacao(path) {
  // Sub-rotas da documentação
  if (path.includes('/playground')) {
    return renderAPIPlayground();
  } else if (path.includes('/scripts-exemplos')) {
    return renderAPIScriptsExemplos();
  } else if (path.includes('/webhooks')) {
    return renderAPIWebhooks();
  }
  return renderAPIMain();
}

function renderAPIMain() {
  return `
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
      <div style="margin-top: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
        <a href="/playbook/api/playground" class="btn btn-primary"><i class="fas fa-play"></i> Testar Agora</a>
        <a href="/playbook/api/scripts-exemplos" class="btn btn-secondary"><i class="fas fa-copy"></i> Ver Scripts Prontos</a>
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
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h4 style="margin: 0; color: var(--primary);"><i class="fas fa-search"></i> search_playbook</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Busca semantica no playbook completo</p>
          </div>
          <span class="badge badge-purple">Mais usado</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px; overflow-x: auto;">
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
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h4 style="margin: 0; color: var(--warning);"><i class="fas fa-comment-slash"></i> get_objection_response</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Retorna tratativas para objecoes de clientes</p>
          </div>
          <span class="badge badge-warning">Vendas</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px; overflow-x: auto;">
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
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h4 style="margin: 0; color: var(--secondary);"><i class="fas fa-comment-dots"></i> get_script</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Scripts de vendas por situacao</p>
          </div>
          <span class="badge badge-success">Mensagens</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px; overflow-x: auto;">
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
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h4 style="margin: 0; color: var(--accent);"><i class="fas fa-dollar-sign"></i> get_pricing</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Informacoes de precos e planos</p>
          </div>
          <span class="badge" style="background: var(--accent); color: white;">Precos</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px; overflow-x: auto;">
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
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h4 style="margin: 0; color: #6366f1;"><i class="fas fa-list"></i> list_topics</h4>
            <p style="margin: 4px 0 0; color: var(--text-secondary); font-size: 14px;">Lista categorias e topicos disponiveis</p>
          </div>
          <span class="badge" style="background: #6366f1; color: white;">Meta</span>
        </div>
        <div style="background: var(--bg-dark); color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 12px; overflow-x: auto;">
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
        <a href="/playbook/api/scripts-exemplos" class="btn btn-sm btn-primary"><i class="fas fa-external-link-alt"></i> Ver Mais</a>
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
                <button onclick="copyCodeBlock(this)" class="btn btn-sm" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.1);">
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
                <button onclick="copyCodeBlock(this)" class="btn btn-sm" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.1);">
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
                <button onclick="copyCodeBlock(this)" class="btn btn-sm" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.1);">
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
                <button onclick="copyCodeBlock(this)" class="btn btn-sm" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.1);">
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
        <a href="/playbook/api/playground" class="feature-item" style="border-left-color: var(--primary); text-decoration: none;">
          <div class="feature-icon"><i class="fas fa-play"></i></div>
          <div>
            <div class="feature-title">Playground</div>
            <div class="feature-desc">Teste as ferramentas ao vivo</div>
          </div>
        </a>
        <a href="/playbook/api/scripts-exemplos" class="feature-item" style="border-left-color: var(--accent); text-decoration: none;">
          <div class="feature-icon" style="background: var(--accent);"><i class="fas fa-copy"></i></div>
          <div>
            <div class="feature-title">Scripts Prontos</div>
            <div class="feature-desc">Copie e cole no seu projeto</div>
          </div>
        </a>
        <a href="/playbook/api/webhooks" class="feature-item" style="border-left-color: var(--secondary); text-decoration: none;">
          <div class="feature-icon" style="background: var(--secondary);"><i class="fas fa-sync"></i></div>
          <div>
            <div class="feature-title">Webhooks</div>
            <div class="feature-desc">Configurar reindexacao</div>
          </div>
        </a>
      </div>
    </div>

    <script>
      function copyCodeBlock(button) {
        const pre = button.parentElement.querySelector('pre');
        navigator.clipboard.writeText(pre.textContent);
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
      }
    </script>
  `;
}

function renderAPIPlayground() {
  return `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-play-circle"></i> Playground MCP</h1>
      <p class="page-subtitle">Teste as ferramentas do MCP diretamente no navegador</p>
      <a href="/playbook/api" class="btn btn-outline btn-sm" style="margin-top: 12px;"><i class="fas fa-arrow-left"></i> Voltar para Documentacao</a>
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
          <div style="display: flex; gap: 24px; font-size: 13px; flex-wrap: wrap;">
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
        const preview = 'curl -X POST https://vendas.papervines.digital/mcp/execute \\\\\\n  -H "Content-Type: application/json" \\\\\\n  -d \\'' + JSON.stringify(body, null, 2) + '\\'';
        document.getElementById('requestPreview').textContent = preview;
      }

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

      updateParams();
    </script>
  `;
}

function renderAPIScriptsExemplos() {
  return `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-copy"></i> Scripts Prontos</h1>
      <p class="page-subtitle">Copie e cole esses exemplos nos seus projetos</p>
      <a href="/playbook/api" class="btn btn-outline btn-sm" style="margin-top: 12px;"><i class="fas fa-arrow-left"></i> Voltar para Documentacao</a>
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

  async search(query, category = null) {
    return this.execute('search_playbook', { query, category });
  }

  async getObjection(objection) {
    return this.execute('get_objection_response', { objection });
  }

  async getScript(situation) {
    return this.execute('get_script', { situation });
  }

  async getPricing(product = 'all') {
    return this.execute('get_pricing', { product });
  }

  async listTopics() {
    return this.execute('list_topics', {});
  }
}

// Exemplo: const mcp = new PlaybookMCP();
// const result = await mcp.search('como fazer follow-up');
module.exports = { PlaybookMCP };</pre>
    </div>

    <!-- Python -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fab fa-python" style="color: #3776ab;"></i> Python</h3>
        <button onclick="copyScript('python-complete')" class="btn btn-sm btn-secondary"><i class="fas fa-copy"></i> Copiar</button>
      </div>
      <pre id="python-complete" style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0;">import requests
from typing import Optional, Dict, Any

class PlaybookMCP:
    def __init__(self, base_url: str = 'https://vendas.papervines.digital'):
        self.base_url = base_url
        self.tenant = 'papervines'

    def execute(self, tool: str, parameters: Dict[str, Any] = None) -> Dict:
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
        params = {'query': query}
        if category:
            params['category'] = category
        return self.execute('search_playbook', params)

    def get_objection(self, objection: str) -> Dict:
        return self.execute('get_objection_response', {'objection': objection})

    def get_script(self, situation: str) -> Dict:
        return self.execute('get_script', {'situation': situation})

    def get_pricing(self, product: str = 'all') -> Dict:
        return self.execute('get_pricing', {'product': product})

# Exemplo:
# mcp = PlaybookMCP()
# result = mcp.search('como qualificar um lead')</pre>
    </div>

    <!-- n8n Workflow -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-project-diagram" style="color: #ff6d5a;"></i> n8n - Configuracao do Node HTTP</h3>
      </div>
      <div class="table-container">
        <table style="font-size: 13px;">
          <tr><td style="width: 180px;"><strong>Method</strong></td><td>POST</td></tr>
          <tr><td><strong>URL</strong></td><td><code>https://vendas.papervines.digital/mcp/execute</code></td></tr>
          <tr><td><strong>Body Content Type</strong></td><td>JSON</td></tr>
          <tr><td><strong>Body</strong></td><td><code>{"tool":"search_playbook","parameters":{"query":"{{ $json.pergunta }}","tenant":"papervines"}}</code></td></tr>
          <tr><td><strong>Acessar Resposta</strong></td><td><code>{{ $json.result.answer }}</code></td></tr>
        </table>
      </div>
    </div>

    <!-- Integracao Claude -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-brain" style="color: #8b5cf6;"></i> Integracao com Claude (Anthropic)</h3>
        <button onclick="copyScript('claude-integration')" class="btn btn-sm btn-secondary"><i class="fas fa-copy"></i> Copiar</button>
      </div>
      <pre id="claude-integration" style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 12px; overflow-x: auto; margin: 0;">import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

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

async function respondWithPlaybook(userMessage) {
  const context = await getPlaybookContext(userMessage);

  const systemPrompt = \`Voce e um assistente de vendas da Paper Vines.
Use APENAS as informacoes do contexto abaixo para responder.

CONTEXTO DO PLAYBOOK:
\${context}\`;

  const message = await anthropic.messages.create({
    model: 'claude-3-sonnet-20240229',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }]
  });

  return message.content[0].text;
}</pre>
    </div>

    <script>
      function copyScript(id) {
        const pre = document.getElementById(id);
        navigator.clipboard.writeText(pre.textContent);
        showToast('Script copiado!', 'success');
      }
    </script>
  `;
}

function renderAPIWebhooks() {
  return `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-sync"></i> Configuracao de Webhooks</h1>
      <p class="page-subtitle">Mantenha o conteudo indexado sempre atualizado</p>
      <a href="/playbook/api" class="btn btn-outline btn-sm" style="margin-top: 12px;"><i class="fas fa-arrow-left"></i> Voltar para Documentacao</a>
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
    </div>

    <!-- Manual Reindex -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-redo"></i> Reindexacao Manual</h3>
      </div>

      <p style="color: var(--text-secondary); margin-bottom: 16px;">
        Use o endpoint abaixo para forcar uma reindexacao manual quando necessario.
      </p>

      <div style="background: var(--bg-dark); color: #e2e8f0; padding: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; margin-bottom: 16px; overflow-x: auto;">
        <div style="color: #94a3b8;"># Reindexar todos os arquivos do tenant</div>
        <div>curl -X POST https://vendas.papervines.digital/index/manual \\\\</div>
        <div style="padding-left: 20px;">-H "Content-Type: application/json" \\\\</div>
        <div style="padding-left: 20px;">-d '{"tenant": "papervines", "fullReindex": true}'</div>
      </div>

      <button onclick="triggerReindex()" class="btn btn-primary">
        <i class="fas fa-sync"></i> Disparar Reindexacao Agora
      </button>
      <div id="reindexResult" style="margin-top: 16px; display: none;"></div>
    </div>

    <!-- Arquivos Monitorados -->
    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-folder-open"></i> Arquivos Monitorados</h3>
      </div>

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
              <td><code>playbook.js</code></td>
              <td><span class="badge badge-purple">playbook</span></td>
              <td>Processo de vendas, etapas</td>
            </tr>
            <tr>
              <td><code>playbook-expandido.js</code></td>
              <td><span class="badge badge-info">playbook-expandido</span></td>
              <td>Politicas, requisitos API</td>
            </tr>
            <tr>
              <td><code>objecoes.js</code></td>
              <td><span class="badge badge-warning">objecoes</span></td>
              <td>Tratativas de objecoes</td>
            </tr>
            <tr>
              <td><code>scripts.js</code></td>
              <td><span class="badge badge-success">scripts</span></td>
              <td>Mensagens prontas</td>
            </tr>
            <tr>
              <td><code>precos.js</code></td>
              <td><span class="badge" style="background: var(--accent); color: white;">precos</span></td>
              <td>Planos e valores</td>
            </tr>
            <tr>
              <td><code>agentes.js</code></td>
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
            resultDiv.innerHTML = '<div style="background: rgba(34, 197, 94, 0.1); border: 1px solid var(--success); padding: 12px; border-radius: 8px;"><strong style="color: var(--success);"><i class="fas fa-check-circle"></i> Reindexacao concluida!</strong></div>';
          } else {
            throw new Error(data.error || 'Erro desconhecido');
          }
        } catch (error) {
          resultDiv.innerHTML = '<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid var(--error); padding: 12px; border-radius: 8px;"><strong style="color: var(--error);"><i class="fas fa-exclamation-circle"></i> Erro:</strong> ' + error.message + '</div>';
        }
      }
    </script>
  `;
}
