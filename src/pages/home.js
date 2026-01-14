import { layout } from '../templates/layout.js';

export function renderHome() {
  const content = `
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Bem-vindo ao Playbook de Vendas Paper Vines</p>
    </div>

    <div class="grid grid-4">
      <div class="stat-card fade-in">
        <div class="stat-icon green"><i class="fas fa-book"></i></div>
        <div class="stat-value">6</div>
        <div class="stat-label">Etapas do Processo</div>
      </div>
      <div class="stat-card fade-in">
        <div class="stat-icon yellow"><i class="fas fa-comment-dots"></i></div>
        <div class="stat-value">8</div>
        <div class="stat-label">Scripts Prontos</div>
      </div>
      <div class="stat-card fade-in">
        <div class="stat-icon blue"><i class="fas fa-shield-alt"></i></div>
        <div class="stat-value">6</div>
        <div class="stat-label">Tratativas de Objecoes</div>
      </div>
      <div class="stat-card fade-in">
        <div class="stat-icon red"><i class="fas fa-tags"></i></div>
        <div class="stat-value">9</div>
        <div class="stat-label">Planos Disponiveis</div>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-rocket"></i> Acesso Rapido</h3>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <a href="/calculadora" class="btn btn-primary" style="justify-content: center;"><i class="fas fa-calculator"></i> Calculadora</a>
          <a href="/playbook/scripts" class="btn btn-secondary" style="justify-content: center;"><i class="fas fa-comment-dots"></i> Scripts</a>
          <a href="/clientes" class="btn btn-secondary" style="justify-content: center;"><i class="fas fa-user-plus"></i> Novo Cliente</a>
          <a href="/playbook/objecoes" class="btn btn-secondary" style="justify-content: center;"><i class="fas fa-shield-alt"></i> Objecoes</a>
        </div>
      </div>

      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-link"></i> Links Uteis</h3>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="https://www.figma.com/deck/fU8KjN7JpjpzhxNRZzfqlp" target="_blank" class="nav-item" style="padding: 10px 12px;"><i class="fas fa-presentation"></i> Apresentacao Clientes</a>
          <a href="https://www.figma.com/files/team/1082649090502569616/project/412083277/Vendas" target="_blank" class="nav-item" style="padding: 10px 12px;"><i class="fas fa-file-invoice"></i> Modelos de Proposta</a>
          <a href="https://drive.google.com/drive/folders/1hTxC7rcN2MvAtusrG-gj6CxkT6FvhTe1" target="_blank" class="nav-item" style="padding: 10px 12px;"><i class="fas fa-file-contract"></i> Modelos de Contrato</a>
          <a href="https://chat.papervines.digital/trial/sign-up" target="_blank" class="nav-item" style="padding: 10px 12px;"><i class="fas fa-vial"></i> Link Teste Gratuito</a>
        </div>
      </div>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-info-circle"></i> Requisitos para API Oficial do Meta</h3>
      </div>
      <div class="grid grid-2" style="gap: 16px;">
        <div style="display: flex; gap: 12px; align-items: flex-start; padding: 16px; background: var(--bg-dark); border-radius: 8px;">
          <div style="width: 36px; height: 36px; background: rgba(22, 163, 74, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><i class="fab fa-whatsapp" style="color: var(--primary);"></i></div>
          <div><div style="font-weight: 500; margin-bottom: 4px;">Numero WhatsApp Business</div><div style="font-size: 13px; color: var(--text-secondary);">Deve ser Business se quiser usar no celular e na plataforma.</div></div>
        </div>
        <div style="display: flex; gap: 12px; align-items: flex-start; padding: 16px; background: var(--bg-dark); border-radius: 8px;">
          <div style="width: 36px; height: 36px; background: rgba(59, 130, 246, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><i class="fab fa-meta" style="color: #3b82f6;"></i></div>
          <div><div style="font-weight: 500; margin-bottom: 4px;">Gerenciador de Negocios (BM)</div><div style="font-size: 13px; color: var(--text-secondary);">Dar acesso para thiago@papervines.digital</div></div>
        </div>
        <div style="display: flex; gap: 12px; align-items: flex-start; padding: 16px; background: var(--bg-dark); border-radius: 8px;">
          <div style="width: 36px; height: 36px; background: rgba(245, 158, 11, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><i class="fas fa-credit-card" style="color: var(--accent);"></i></div>
          <div><div style="font-weight: 500; margin-bottom: 4px;">Cartao Internacional</div><div style="font-size: 13px; color: var(--text-secondary);">Preferencialmente fisico, para pagamentos do WhatsApp.</div></div>
        </div>
        <div style="display: flex; gap: 12px; align-items: flex-start; padding: 16px; background: var(--bg-dark); border-radius: 8px;">
          <div style="width: 36px; height: 36px; background: rgba(139, 92, 246, 0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"><i class="fas fa-globe" style="color: #8b5cf6;"></i></div>
          <div><div style="font-weight: 500; margin-bottom: 4px;">Site com CNPJ</div><div style="font-size: 13px; color: var(--text-secondary);">Site da empresa com dados do CNPJ no rodape.</div></div>
        </div>
      </div>
    </div>
  `;
  return layout('Dashboard', content, 'home');
}
