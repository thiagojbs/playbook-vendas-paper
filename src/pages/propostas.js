import { layout } from '../templates/layout.js';

export async function renderPropostas(env) {
  let propostas = [];
  try {
    const result = await env.DB.prepare('SELECT p.*, c.nome_empresa FROM propostas p LEFT JOIN clientes c ON p.cliente_id = c.id ORDER BY p.created_at DESC').all();
    propostas = result.results || [];
  } catch (e) { console.error('Erro:', e); }

  const total = propostas.length;
  const pendentes = propostas.filter(p => p.status === 'pendente').length;
  const aprovadas = propostas.filter(p => p.status === 'aprovada').length;

  let tableRows = '';
  if (propostas.length > 0) {
    tableRows = propostas.map(p => {
      const statusClass = p.status === 'aprovada' ? 'badge-success' : (p.status === 'rejeitada' ? 'badge-error' : 'badge-warning');
      const data = new Date(p.created_at).toLocaleDateString('pt-BR');
      return '<tr data-status="' + p.status + '"><td><span style="font-weight: 600; color: var(--primary);">#' + (p.numero_proposta || p.id) + '</span></td><td><div style="font-weight: 500;">' + (p.nome_empresa || 'Cliente nao vinculado') + '</div></td><td>R$ ' + (p.valor_mensalidade || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2}) + '</td><td>R$ ' + (p.valor_implantacao || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2}) + '</td><td style="font-weight: 600; color: var(--success);">R$ ' + (p.valor_total || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2}) + '</td><td>' + data + '</td><td><span class="badge ' + statusClass + '">' + p.status + '</span></td><td><div style="display: flex; gap: 8px;"><button class="btn btn-secondary btn-sm" onclick="showToast(\'Em desenvolvimento\')"><i class="fas fa-eye"></i></button></div></td></tr>';
    }).join('');
  } else {
    tableRows = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: var(--text-secondary);"><i class="fas fa-file-invoice" style="font-size: 48px; margin-bottom: 16px; display: block; opacity: 0.3;"></i>Nenhuma proposta criada.<br><a href="/calculadora" class="btn btn-primary" style="margin-top: 16px;"><i class="fas fa-plus"></i> Criar Primeira Proposta</a></td></tr>';
  }

  const content = '<div class="page-header" style="display: flex; justify-content: space-between; align-items: center;"><div><h1 class="page-title">Propostas</h1><p class="page-subtitle">Gerencie suas propostas comerciais</p></div><a href="/calculadora" class="btn btn-primary"><i class="fas fa-plus"></i> Nova Proposta</a></div><div class="grid grid-4"><div class="stat-card"><div class="stat-icon blue"><i class="fas fa-file-invoice"></i></div><div class="stat-value">' + total + '</div><div class="stat-label">Total</div></div><div class="stat-card"><div class="stat-icon yellow"><i class="fas fa-clock"></i></div><div class="stat-value">' + pendentes + '</div><div class="stat-label">Pendentes</div></div><div class="stat-card"><div class="stat-icon green"><i class="fas fa-check-circle"></i></div><div class="stat-value">' + aprovadas + '</div><div class="stat-label">Aprovadas</div></div><div class="stat-card"><div class="stat-icon red"><i class="fas fa-times-circle"></i></div><div class="stat-value">' + (total - pendentes - aprovadas) + '</div><div class="stat-label">Rejeitadas</div></div></div><div class="card"><div class="card-header"><h3 class="card-title"><i class="fas fa-file-invoice"></i> Lista de Propostas</h3></div><div class="table-container"><table><thead><tr><th>N Proposta</th><th>Cliente</th><th>Mensalidade</th><th>Implantacao</th><th>Total</th><th>Data</th><th>Status</th><th>Acoes</th></tr></thead><tbody>' + tableRows + '</tbody></table></div></div>';

  return layout('Propostas', content, 'propostas');
}
