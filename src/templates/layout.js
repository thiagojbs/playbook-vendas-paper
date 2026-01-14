// Template base para todas as páginas - Paper Vines Playbook
export function layout(title, content, activeMenu = '') {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Paper Vines Playbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --primary: #16a34a;
      --primary-dark: #15803d;
      --primary-light: #22c55e;
      --secondary: #1e293b;
      --accent: #f59e0b;
      --bg-dark: #0f172a;
      --bg-card: #1e293b;
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --border: #334155;
      --success: #22c55e;
      --warning: #f59e0b;
      --error: #ef4444;
    }

    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg-dark);
      color: var(--text-primary);
      min-height: 100vh;
    }

    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      width: 280px;
      height: 100vh;
      background: var(--bg-card);
      border-right: 1px solid var(--border);
      padding: 24px 0;
      z-index: 100;
      overflow-y: auto;
    }

    .logo {
      padding: 0 24px 32px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 24px;
    }

    .logo h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--primary);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo h1 i { font-size: 28px; }

    .logo span {
      font-size: 12px;
      color: var(--text-secondary);
      display: block;
      margin-top: 4px;
      font-weight: 400;
    }

    .nav-section {
      padding: 0 16px;
      margin-bottom: 24px;
    }

    .nav-section-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--text-secondary);
      padding: 0 8px;
      margin-bottom: 8px;
      letter-spacing: 0.5px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.2s;
      margin-bottom: 4px;
    }

    .nav-item:hover {
      background: rgba(22, 163, 74, 0.1);
      color: var(--text-primary);
    }

    .nav-item.active {
      background: var(--primary);
      color: white;
    }

    .nav-item i { width: 20px; text-align: center; }

    .main-content {
      margin-left: 280px;
      padding: 32px;
      min-height: 100vh;
    }

    .page-header { margin-bottom: 32px; }

    .page-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .page-subtitle {
      color: var(--text-secondary);
      font-size: 16px;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }

    .card-title {
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .card-title i { color: var(--primary); }

    .grid { display: grid; gap: 24px; }
    .grid-2 { grid-template-columns: repeat(2, 1fr); }
    .grid-3 { grid-template-columns: repeat(3, 1fr); }
    .grid-4 { grid-template-columns: repeat(4, 1fr); }

    @media (max-width: 1200px) {
      .grid-4 { grid-template-columns: repeat(2, 1fr); }
      .grid-3 { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .sidebar { transform: translateX(-100%); }
      .main-content { margin-left: 0; }
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      border: none;
      transition: all 0.2s;
      text-decoration: none;
    }

    .btn-primary { background: var(--primary); color: white; }
    .btn-primary:hover { background: var(--primary-dark); }
    .btn-secondary { background: transparent; border: 1px solid var(--border); color: var(--text-primary); }
    .btn-secondary:hover { background: var(--bg-card); }
    .btn-success { background: var(--success); color: white; }
    .btn-warning { background: var(--warning); color: var(--secondary); }
    .btn-danger { background: var(--error); color: white; }
    .btn-sm { padding: 6px 12px; font-size: 12px; }

    .form-group { margin-bottom: 20px; }

    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--text-secondary);
    }

    .form-input, .form-select, .form-textarea {
      width: 100%;
      padding: 12px 16px;
      background: var(--bg-dark);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-primary);
      font-size: 14px;
      transition: border-color 0.2s;
    }

    .form-input:focus, .form-select:focus, .form-textarea:focus {
      outline: none;
      border-color: var(--primary);
    }

    .form-textarea { resize: vertical; min-height: 100px; }

    .table-container { overflow-x: auto; }

    table { width: 100%; border-collapse: collapse; }

    th, td {
      padding: 14px 16px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }

    th {
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      color: var(--text-secondary);
      background: var(--bg-dark);
    }

    tr:hover td { background: rgba(22, 163, 74, 0.05); }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 20px;
    }

    .badge-success { background: rgba(34, 197, 94, 0.2); color: var(--success); }
    .badge-warning { background: rgba(245, 158, 11, 0.2); color: var(--warning); }
    .badge-error { background: rgba(239, 68, 68, 0.2); color: var(--error); }
    .badge-info { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }

    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 24px;
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .stat-icon.green { background: rgba(22, 163, 74, 0.2); color: var(--primary); }
    .stat-icon.yellow { background: rgba(245, 158, 11, 0.2); color: var(--accent); }
    .stat-icon.blue { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
    .stat-icon.red { background: rgba(239, 68, 68, 0.2); color: var(--error); }

    .stat-value { font-size: 32px; font-weight: 700; margin-bottom: 4px; }
    .stat-label { color: var(--text-secondary); font-size: 14px; }

    .accordion { margin-bottom: 12px; }

    .accordion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: var(--bg-dark);
      border: 1px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .accordion-header:hover { border-color: var(--primary); }
    .accordion-header.active { border-color: var(--primary); border-radius: 8px 8px 0 0; }

    .accordion-title {
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .accordion-content {
      display: none;
      padding: 20px;
      background: var(--bg-card);
      border: 1px solid var(--primary);
      border-top: none;
      border-radius: 0 0 8px 8px;
    }

    .accordion-content.active { display: block; }

    .copy-btn {
      background: var(--bg-dark);
      border: 1px solid var(--border);
      color: var(--text-secondary);
      padding: 8px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      transition: all 0.2s;
    }

    .copy-btn:hover { border-color: var(--primary); color: var(--primary); }
    .copy-btn.copied { background: var(--primary); color: white; border-color: var(--primary); }

    .message-box {
      background: var(--bg-dark);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      position: relative;
      white-space: pre-wrap;
      font-size: 14px;
      line-height: 1.6;
    }

    .message-box .copy-btn { position: absolute; top: 8px; right: 8px; }

    .tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 24px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0;
    }

    .tab {
      padding: 12px 20px;
      color: var(--text-secondary);
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: all 0.2s;
    }

    .tab:hover { color: var(--text-primary); }
    .tab.active { color: var(--primary); border-bottom-color: var(--primary); }

    .tab-content { display: none; }
    .tab-content.active { display: block; }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-overlay.active { display: flex; }

    .modal {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      width: 100%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title { font-size: 18px; font-weight: 600; }

    .modal-close {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-size: 20px;
      cursor: pointer;
    }

    .modal-body { padding: 24px; }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-in { animation: fadeIn 0.3s ease-out; }

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
      padding: 16px 20px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: fadeIn 0.3s ease-out;
    }

    .toast.success { border-color: var(--success); }
    .toast.error { border-color: var(--error); }

    .valor-display { font-size: 36px; font-weight: 700; color: var(--primary); }
    .valor-label { font-size: 14px; color: var(--text-secondary); margin-top: 4px; }
  </style>
</head>
<body>
  <nav class="sidebar">
    <div class="logo">
      <h1><i class="fas fa-leaf"></i> Paper Vines</h1>
      <span>Playbook de Vendas</span>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">Menu Principal</div>
      <a href="/" class="nav-item ${activeMenu === 'home' ? 'active' : ''}">
        <i class="fas fa-home"></i> Dashboard
      </a>
      <a href="/playbook" class="nav-item ${activeMenu === 'playbook' ? 'active' : ''}">
        <i class="fas fa-book"></i> Playbook
      </a>
      <a href="/calculadora" class="nav-item ${activeMenu === 'calculadora' ? 'active' : ''}">
        <i class="fas fa-calculator"></i> Calculadora
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">Gestao</div>
      <a href="/clientes" class="nav-item ${activeMenu === 'clientes' ? 'active' : ''}">
        <i class="fas fa-users"></i> Clientes
      </a>
      <a href="/propostas" class="nav-item ${activeMenu === 'propostas' ? 'active' : ''}">
        <i class="fas fa-file-invoice"></i> Propostas
      </a>
      <a href="/contratos" class="nav-item ${activeMenu === 'contratos' ? 'active' : ''}">
        <i class="fas fa-file-signature"></i> Contratos
      </a>
    </div>

    <div class="nav-section">
      <div class="nav-section-title">Recursos</div>
      <a href="/playbook/scripts" class="nav-item ${activeMenu === 'scripts' ? 'active' : ''}">
        <i class="fas fa-comment-dots"></i> Scripts
      </a>
      <a href="/playbook/objecoes" class="nav-item ${activeMenu === 'objecoes' ? 'active' : ''}">
        <i class="fas fa-shield-alt"></i> Objecoes
      </a>
      <a href="/playbook/planos" class="nav-item ${activeMenu === 'planos' ? 'active' : ''}">
        <i class="fas fa-tags"></i> Planos
      </a>
    </div>
  </nav>

  <main class="main-content">
    ${content}
  </main>

  <div class="toast-container" id="toastContainer"></div>

  <script>
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        header.classList.toggle('active');
        header.nextElementSibling?.classList.toggle('active');
      });
    });

    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabGroup = tab.closest('.tabs');
        const contentGroup = tabGroup.nextElementSibling;
        tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (contentGroup) {
          contentGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          const target = contentGroup.querySelector('#' + tab.dataset.tab);
          if (target) target.classList.add('active');
        }
      });
    });

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

    function showToast(message, type = 'success') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = 'toast ' + type;
      toast.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i>' + message;
      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    function openModal(id) { document.getElementById(id).classList.add('active'); }
    function closeModal(id) { document.getElementById(id).classList.remove('active'); }

    function formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
  </script>
</body>
</html>`;
}
