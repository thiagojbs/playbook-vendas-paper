import { layout } from '../templates/layout.js';
import { PROCESSO_VENDAS, SCRIPTS, OBJECOES, CHECKLIST_COMERCIAL, CHECKLIST_CONTRATO, LINKS_UTEIS } from '../data/playbook.js';
import { PLANOS_CHATBOTS, PLANOS_TELECOM, PLANOS_IA } from '../data/precos.js';

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
  let objecoesHtml = OBJECOES.map(obj => '<div class="accordion"><div class="accordion-header"><div class="accordion-title"><i class="fas fa-exclamation-triangle" style="color: var(--warning);"></i>"' + obj.objecao + '"</div><i class="fas fa-chevron-down"></i></div><div class="accordion-content"><div class="message-box"><button class="copy-btn" onclick="copyToClipboard(`' + obj.resposta.replace(/`/g, '\\`') + '`, this)"><i class="fas fa-copy"></i> Copiar</button>' + obj.resposta + '</div></div></div>').join('');
  
  return '<div class="page-header"><h1 class="page-title">Tratativas de Objecoes</h1><p class="page-subtitle">Respostas prontas para objecoes comuns</p></div><div class="card">' + objecoesHtml + '</div>';
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
