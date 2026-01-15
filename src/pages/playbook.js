import { layout } from '../templates/layout.js';
import { PROCESSO_VENDAS, SCRIPTS, OBJECOES, CHECKLIST_COMERCIAL, CHECKLIST_CONTRATO, LINKS_UTEIS } from '../data/playbook.js';
import { PLANOS_CHATBOTS, PLANOS_TELECOM, PLANOS_IA } from '../data/precos.js';
import { OBJECOES_EXPANDIDAS, TECNICAS_GERAIS, GATILHOS_MENTAIS, DIFERENCIAIS, ESTATISTICAS_PAPERVINES } from '../data/objecoes.js';

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
  let etapasHtml = PROCESSO_VENDAS.etapas.map(etapa => {
    let acoesHtml = etapa.acoes.map(acao => '<li style="display: flex; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid var(--border);"><i class="fas fa-check-circle" style="color: var(--primary);"></i>' + acao + '</li>').join('');
    return '<div class="accordion"><div class="accordion-header"><div class="accordion-title"><span style="width: 28px; height: 28px; background: var(--primary); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 600; font-size: 14px; margin-right: 8px;">' + etapa.numero + '</span>' + etapa.titulo + '<span class="badge badge-info" style="margin-left: 12px;">' + etapa.tempo_estimado + '</span></div><i class="fas fa-chevron-down"></i></div><div class="accordion-content"><p style="margin-bottom: 16px; color: var(--text-secondary);">' + etapa.descricao + '</p><div style="font-weight: 500; margin-bottom: 8px;">Acoes:</div><ul style="list-style: none; padding: 0;">' + acoesHtml + '</ul></div></div>';
  }).join('');
  
  let checklistHtml = CHECKLIST_COMERCIAL.slice(0, 6).map(item => '<div style="display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border);"><input type="checkbox" style="width: 20px; height: 20px; accent-color: var(--primary);"><span>' + item.item + '</span></div>').join('');

  return '<div class="page-header"><h1 class="page-title">Playbook de Vendas</h1><p class="page-subtitle">Guia completo do processo comercial Paper Vines</p></div><div class="card fade-in"><div class="card-header"><h3 class="card-title"><i class="fas fa-route"></i> Etapas do Processo de Vendas</h3></div>' + etapasHtml + '</div><div class="grid grid-2"><div class="card fade-in"><div class="card-header"><h3 class="card-title"><i class="fas fa-clipboard-list"></i> Checklist Comercial</h3></div>' + checklistHtml + '</div><div class="card fade-in"><div class="card-header"><h3 class="card-title"><i class="fas fa-link"></i> Links Uteis</h3></div><div style="display: flex; flex-direction: column; gap: 8px;"><a href="' + LINKS_UTEIS.apresentacao + '" target="_blank" class="nav-item"><i class="fas fa-presentation"></i> Apresentacao</a><a href="' + LINKS_UTEIS.propostas_figma + '" target="_blank" class="nav-item"><i class="fas fa-file-invoice"></i> Propostas (Figma)</a><a href="' + LINKS_UTEIS.modelos_contrato + '" target="_blank" class="nav-item"><i class="fas fa-file-contract"></i> Modelos de Contrato</a><a href="' + LINKS_UTEIS.clicksign + '" target="_blank" class="nav-item"><i class="fas fa-signature"></i> ClickSign</a><a href="' + LINKS_UTEIS.asaas_clientes + '" target="_blank" class="nav-item"><i class="fas fa-money-bill"></i> Asaas</a></div></div></div>';
}

function renderScripts() {
  let prospeccaoHtml = SCRIPTS.prospeccao.map(script => '<div style="margin-bottom: 20px;"><div style="font-weight: 500; margin-bottom: 8px;">' + script.titulo + '</div><div class="message-box"><button class="copy-btn" onclick="copyToClipboard(`' + script.mensagem.replace(/`/g, '\\`') + '`, this)"><i class="fas fa-copy"></i> Copiar</button>' + script.mensagem + '</div></div>').join('');
  
  return '<div class="page-header"><h1 class="page-title">Scripts de Vendas</h1><p class="page-subtitle">Mensagens prontas para cada etapa</p></div><div class="tabs"><div class="tab active" data-tab="prospeccao">Prospeccao</div><div class="tab" data-tab="teste">Teste Gratuito</div><div class="tab" data-tab="proposta">Proposta</div></div><div class="tab-contents"><div id="prospeccao" class="tab-content active"><div class="card"><div class="card-header"><h3 class="card-title"><i class="fas fa-bullhorn"></i> Mensagens de Prospeccao</h3></div>' + prospeccaoHtml + '</div></div><div id="teste" class="tab-content"><div class="card"><div class="card-header"><h3 class="card-title"><i class="fas fa-vial"></i> ' + SCRIPTS.teste_gratuito.titulo + '</h3></div><div class="message-box"><button class="copy-btn" onclick="copyToClipboard(`' + SCRIPTS.teste_gratuito.mensagem.replace(/`/g, '\\`') + '`, this)"><i class="fas fa-copy"></i> Copiar</button>' + SCRIPTS.teste_gratuito.mensagem + '</div></div></div><div id="proposta" class="tab-content"><div class="card"><div class="card-header"><h3 class="card-title"><i class="fas fa-file-invoice"></i> ' + SCRIPTS.envio_proposta.titulo + '</h3></div><div class="message-box"><button class="copy-btn" onclick="copyToClipboard(`' + SCRIPTS.envio_proposta.mensagem.replace(/`/g, '\\`') + '`, this)"><i class="fas fa-copy"></i> Copiar</button>' + SCRIPTS.envio_proposta.mensagem + '</div></div></div></div>';
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
