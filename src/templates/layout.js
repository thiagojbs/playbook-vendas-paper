// Template base para todas as páginas - Paper Vines Playbook
// Design baseado no SGP MCP Server

export function layout(title, content, activeMenu = '') {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Playbook de Vendas</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --primary: #8b5cf6;
      --primary-dark: #7c3aed;
      --primary-light: #a78bfa;
      --secondary: #10b981;
      --accent: #f97316;
      --bg-page: #f8fafc;
      --bg-card: #ffffff;
      --bg-dark: #1e293b;
      --text-primary: #1e293b;
      --text-secondary: #64748b;
      --text-muted: #94a3b8;
      --border: #e2e8f0;
      --border-light: #f1f5f9;
      --success: #22c55e;
      --warning: #f59e0b;
      --error: #ef4444;
      --shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg-page);
      color: var(--text-primary);
      min-height: 100vh;
      line-height: 1.5;
    }

    /* Header */
    .header {
      background: var(--bg-card);
      border-bottom: 1px solid var(--border);
      padding: 16px 32px;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
    }

    .logo-link {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      text-decoration: none;
      gap: 2px;
    }

    .logo-img {
      height: 32px;
      width: auto;
    }

    .logo-subtitle {
      font-size: 13px;
      color: var(--primary);
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .header-status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--primary);
      font-weight: 500;
    }

    .header-status::before {
      content: '';
      width: 8px;
      height: 8px;
      background: var(--primary);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Navigation Tabs */
    .nav-tabs {
      background: var(--bg-card);
      border-bottom: 1px solid var(--border);
      padding: 0 32px;
    }

    .nav-tabs-content {
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      gap: 4px;
      overflow-x: auto;
    }

    .nav-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 18px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .nav-tab:hover {
      color: var(--text-primary);
      background: var(--border-light);
    }

    .nav-tab.active {
      color: var(--primary);
      border-bottom-color: var(--primary);
      background: rgba(139, 92, 246, 0.05);
    }

    .nav-tab i {
      font-size: 14px;
    }

    /* Main Content */
    .main-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 32px;
    }

    /* Page Header */
    .page-header {
      margin-bottom: 24px;
    }

    .page-title {
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .page-title i {
      color: var(--primary);
    }

    .page-subtitle {
      color: var(--text-secondary);
      font-size: 15px;
    }

    /* Cards */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: var(--shadow);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-light);
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .card-title i {
      color: var(--secondary);
      font-size: 16px;
    }

    /* Stat Cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      box-shadow: var(--shadow);
      border-left: 4px solid var(--primary);
    }

    .stat-card.purple { border-left-color: var(--primary); }
    .stat-card.orange { border-left-color: var(--accent); }
    .stat-card.green { border-left-color: var(--secondary); }

    .stat-value {
      font-size: 36px;
      font-weight: 700;
      color: var(--primary);
      margin-bottom: 4px;
    }

    .stat-card.purple .stat-value { color: var(--primary); }
    .stat-card.orange .stat-value { color: var(--accent); }
    .stat-card.green .stat-value { color: var(--secondary); }

    .stat-label {
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 500;
    }

    /* Grid System */
    .grid { display: grid; gap: 24px; }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-4 { grid-template-columns: repeat(4, 1fr); }

    @media (max-width: 1024px) {
      .grid-4 { grid-template-columns: repeat(2, 1fr); }
      .grid-3 { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
      .main-content { padding: 16px; }
      .header { padding: 12px 16px; }
      .nav-tabs { padding: 0 16px; }
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
      text-decoration: none;
    }

    .btn-primary {
      background: var(--primary);
      color: white;
    }

    .btn-primary:hover {
      background: var(--primary-dark);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: var(--secondary);
      color: white;
    }

    .btn-secondary:hover {
      background: #059669;
    }

    .btn-outline {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-primary);
    }

    .btn-outline:hover {
      background: var(--border-light);
      border-color: var(--text-secondary);
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 13px;
    }

    /* Form Elements */
    .form-group {
      margin-bottom: 20px;
    }

    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    .form-input, .form-select, .form-textarea {
      width: 100%;
      padding: 12px 16px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-primary);
      font-size: 14px;
      transition: all 0.2s;
    }

    .form-input:focus, .form-select:focus, .form-textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }

    .form-input::placeholder {
      color: var(--text-muted);
    }

    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }

    /* Tables */
    .table-container {
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid var(--border);
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 14px 16px;
      text-align: left;
    }

    th {
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      background: var(--border-light);
      border-bottom: 1px solid var(--border);
    }

    td {
      border-bottom: 1px solid var(--border-light);
      font-size: 14px;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: var(--border-light);
    }

    /* Badges */
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 20px;
    }

    .badge-success { background: rgba(34, 197, 94, 0.15); color: #15803d; }
    .badge-warning { background: rgba(245, 158, 11, 0.15); color: #b45309; }
    .badge-error { background: rgba(239, 68, 68, 0.15); color: #b91c1c; }
    .badge-info { background: rgba(59, 130, 246, 0.15); color: #1d4ed8; }
    .badge-purple { background: rgba(139, 92, 246, 0.15); color: #6d28d9; }

    /* Feature List */
    .feature-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      background: var(--border-light);
      border-radius: 8px;
      border-left: 3px solid var(--primary);
    }

    .feature-icon {
      width: 24px;
      height: 24px;
      background: var(--primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .feature-icon i {
      color: white;
      font-size: 10px;
    }

    .feature-title {
      font-weight: 600;
      font-size: 14px;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .feature-desc {
      font-size: 13px;
      color: var(--text-secondary);
    }

    /* List Items */
    .list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      margin-bottom: 12px;
      transition: all 0.2s;
      text-decoration: none;
      color: inherit;
      border-left: 3px solid transparent;
    }

    .list-item:hover {
      border-left-color: var(--primary);
      box-shadow: var(--shadow-md);
    }

    .list-item-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .list-item-icon {
      width: 36px;
      height: 36px;
      background: rgba(139, 92, 246, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary);
    }

    .list-item-title {
      font-weight: 500;
      font-size: 15px;
    }

    .list-item-badge {
      background: var(--bg-dark);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    /* Accordion */
    .accordion {
      margin-bottom: 12px;
    }

    .accordion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .accordion-header:hover {
      border-color: var(--primary);
    }

    .accordion-header.active {
      border-color: var(--primary);
      border-radius: 8px 8px 0 0;
      background: rgba(139, 92, 246, 0.05);
    }

    .accordion-title {
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .accordion-title i {
      color: var(--secondary);
    }

    .accordion-content {
      display: none;
      padding: 20px;
      background: var(--bg-card);
      border: 1px solid var(--primary);
      border-top: none;
      border-radius: 0 0 8px 8px;
    }

    .accordion-content.active {
      display: block;
    }

    /* Message Box / Code Block */
    .message-box {
      background: var(--bg-dark);
      border-radius: 8px;
      padding: 16px;
      position: relative;
      white-space: pre-wrap;
      font-size: 14px;
      line-height: 1.6;
      color: #e2e8f0;
      font-family: 'Monaco', 'Menlo', monospace;
    }

    .message-box .copy-btn {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .copy-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }

    .copy-btn:hover {
      background: rgba(255,255,255,0.2);
    }

    .copy-btn.copied {
      background: var(--primary);
      border-color: var(--primary);
    }

    /* Footer */
    .footer {
      text-align: center;
      padding: 32px;
      color: var(--text-secondary);
      font-size: 13px;
      border-top: 1px solid var(--border);
      margin-top: 48px;
      background: var(--bg-card);
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-top: 12px;
    }

    .footer-links a {
      color: var(--text-secondary);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s;
    }

    .footer-links a:hover {
      color: var(--primary);
    }

    /* Quick Access Buttons */
    .quick-buttons {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .quick-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 20px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      transition: all 0.2s;
    }

    .quick-btn:hover {
      border-color: var(--primary);
      background: rgba(139, 92, 246, 0.05);
      color: var(--primary);
    }

    .quick-btn.primary {
      background: var(--primary);
      border-color: var(--primary);
      color: white;
    }

    .quick-btn.primary:hover {
      background: var(--primary-dark);
    }

    /* Requirements Grid */
    .req-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }

    .req-item {
      display: flex;
      gap: 14px;
      padding: 18px;
      background: var(--border-light);
      border-radius: 8px;
    }

    .req-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .req-icon.green { background: rgba(16, 185, 129, 0.15); color: var(--secondary); }
    .req-icon.blue { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
    .req-icon.orange { background: rgba(249, 115, 22, 0.15); color: var(--accent); }
    .req-icon.purple { background: rgba(139, 92, 246, 0.15); color: var(--primary); }

    .req-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .req-desc {
      font-size: 13px;
      color: var(--text-secondary);
    }

    /* Links */
    .link-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .link-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: var(--border-light);
      border-radius: 8px;
      color: var(--text-primary);
      text-decoration: none;
      font-size: 14px;
      transition: all 0.2s;
    }

    .link-item:hover {
      background: var(--border);
      color: var(--primary);
    }

    .link-item i {
      color: var(--secondary);
      width: 16px;
    }

    /* Modal */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal {
      background: var(--bg-card);
      border-radius: 12px;
      width: 100%;
      max-width: 560px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow-md);
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      font-size: 18px;
      font-weight: 600;
    }

    .modal-close {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 20px;
      cursor: pointer;
      padding: 4px;
    }

    .modal-close:hover {
      color: var(--text-primary);
    }

    .modal-body {
      padding: 24px;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-in {
      animation: fadeIn 0.3s ease-out;
    }

    /* Toast */
    .toast-container {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 2000;
    }

    .toast {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: var(--shadow-md);
      animation: fadeIn 0.3s ease-out;
    }

    .toast.success { border-left: 4px solid var(--success); }
    .toast.error { border-left: 4px solid var(--error); }

    /* Value Display */
    .valor-display {
      font-size: 42px;
      font-weight: 700;
      color: var(--primary);
    }

    .valor-label {
      font-size: 14px;
      color: var(--text-secondary);
      margin-top: 4px;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <a href="/" class="logo-link">
          <img src="https://doc.papervines.digital/images/logo-paper.png" alt="Paper Vines" class="logo-img">
          <div class="logo-subtitle">Playbook de Vendas</div>
        </a>
      </div>
      <div class="header-status">Online - Multi-User</div>
    </div>
  </header>

  <nav class="nav-tabs">
    <div class="nav-tabs-content">
      <a href="/" class="nav-tab ${activeMenu === 'home' ? 'active' : ''}">
        <i class="fas fa-chart-bar"></i> Visao Geral
      </a>
      <a href="/playbook" class="nav-tab ${activeMenu === 'playbook' ? 'active' : ''}">
        <i class="fas fa-book"></i> Playbook
      </a>
      <a href="/playbook/scripts" class="nav-tab ${activeMenu === 'scripts' ? 'active' : ''}">
        <i class="fas fa-comment-dots"></i> Scripts
      </a>
      <a href="/playbook/objecoes" class="nav-tab ${activeMenu === 'objecoes' ? 'active' : ''}">
        <i class="fas fa-shield-alt"></i> Objecoes
      </a>
      <a href="/calculadora" class="nav-tab ${activeMenu === 'calculadora' ? 'active' : ''}">
        <i class="fas fa-calculator"></i> Calculadora
      </a>
      <a href="/playbook/planos" class="nav-tab ${activeMenu === 'planos' ? 'active' : ''}">
        <i class="fas fa-tags"></i> Planos
      </a>
      <a href="/clientes" class="nav-tab ${activeMenu === 'clientes' ? 'active' : ''}">
        <i class="fas fa-users"></i> Clientes
      </a>
      <a href="/desempenho" class="nav-tab ${activeMenu === 'desempenho' ? 'active' : ''}">
        <i class="fas fa-chart-line"></i> Desempenho
      </a>
    </div>
  </nav>

  <main class="main-content">
    ${content}
  </main>

  <footer class="footer">
    <div>Playbook de Vendas v1.0.0 | Desenvolvido para Paper Vines Digital</div>
    <div>Powered by <a href="https://papervines.digital" target="_blank" style="color: var(--primary); text-decoration: none;">Paper Vines Digital</a></div>
    <div class="footer-links">
      <a href="https://papervines.digital" target="_blank"><i class="fas fa-globe"></i> Site</a>
      <a href="https://chat.papervines.digital/trial/sign-up" target="_blank"><i class="fas fa-vial"></i> Teste Gratuito</a>
      <a href="https://www.figma.com/files/team/1082649090502569616/project/412083277/Vendas" target="_blank"><i class="fas fa-file-invoice"></i> Propostas</a>
    </div>
  </footer>

  <div class="toast-container" id="toastContainer"></div>

  <script>
    // Accordion functionality
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        if (content) content.classList.toggle('active');
      });
    });

    // Copy to clipboard
    function copyToClipboard(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
        }, 2000);
      });
    }

    // Toast notifications
    function showToast(message, type = 'success') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = 'toast ' + type;
      toast.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '" style="color: var(--' + type + ')"></i>' + message;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }

    // Modal functions
    function openModal(id) {
      document.getElementById(id).classList.add('active');
    }

    function closeModal(id) {
      document.getElementById(id).classList.remove('active');
    }

    // Format currency
    function formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
  </script>
</body>
</html>`;
}
