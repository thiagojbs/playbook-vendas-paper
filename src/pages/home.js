import { layout } from '../templates/layout.js';

export function renderHome() {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-chart-bar"></i> Visao Geral</h1>
      <p class="page-subtitle">Bem-vindo ao Playbook de Vendas Paper Vines - Sistema completo para consultores comerciais</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card purple">
        <div class="stat-value">6</div>
        <div class="stat-label">Etapas do Processo</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-value">8</div>
        <div class="stat-label">Scripts Prontos</div>
      </div>
      <div class="stat-card green">
        <div class="stat-value">6</div>
        <div class="stat-label">Tratativas de Objecoes</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-value">9</div>
        <div class="stat-label">Planos Disponiveis</div>
      </div>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-info-circle"></i> O que e o Playbook de Vendas?</h3>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 20px;">
        Um sistema completo que permite que consultores comerciais tenham acesso a todo o material necessario para vender a plataforma Paper Vines. Inclui scripts, tratativas de objecoes, calculadora de propostas e gestao de clientes.
      </p>
      <div class="feature-list">
        <div class="feature-item">
          <div class="feature-icon"><i class="fas fa-check"></i></div>
          <div>
            <div class="feature-title">Processo de Vendas</div>
            <div class="feature-desc">6 etapas detalhadas do processo comercial</div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><i class="fas fa-check"></i></div>
          <div>
            <div class="feature-title">Scripts Prontos</div>
            <div class="feature-desc">Mensagens para cada etapa da venda</div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><i class="fas fa-check"></i></div>
          <div>
            <div class="feature-title">Calculadora</div>
            <div class="feature-desc">Calculo automatico de propostas</div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><i class="fas fa-check"></i></div>
          <div>
            <div class="feature-title">Objecoes</div>
            <div class="feature-desc">Respostas prontas para objecoes comuns</div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><i class="fas fa-check"></i></div>
          <div>
            <div class="feature-title">Gestao de Clientes</div>
            <div class="feature-desc">CRUD completo para acompanhamento</div>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><i class="fas fa-check"></i></div>
          <div>
            <div class="feature-title">Planos e Precos</div>
            <div class="feature-desc">Tabela completa de todos os planos</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-2">
      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-rocket"></i> Acesso Rapido</h3>
        </div>
        <div class="quick-buttons">
          <a href="/calculadora" class="quick-btn primary"><i class="fas fa-calculator"></i> Calculadora</a>
          <a href="/playbook/scripts" class="quick-btn"><i class="fas fa-comment-dots"></i> Scripts</a>
          <a href="/clientes" class="quick-btn"><i class="fas fa-user-plus"></i> Novo Cliente</a>
          <a href="/playbook/objecoes" class="quick-btn"><i class="fas fa-shield-alt"></i> Objecoes</a>
        </div>
      </div>

      <div class="card fade-in">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-link"></i> Links Uteis</h3>
        </div>
        <div class="link-list">
          <a href="https://www.figma.com/deck/fU8KjN7JpjpzhxNRZzfqlp" target="_blank" class="link-item">
            <i class="fas fa-presentation"></i> Apresentacao Clientes
          </a>
          <a href="https://www.figma.com/files/team/1082649090502569616/project/412083277/Vendas" target="_blank" class="link-item">
            <i class="fas fa-file-invoice"></i> Modelos de Proposta
          </a>
          <a href="https://drive.google.com/drive/folders/1hTxC7rcN2MvAtusrG-gj6CxkT6FvhTe1" target="_blank" class="link-item">
            <i class="fas fa-file-contract"></i> Modelos de Contrato
          </a>
          <a href="https://chat.papervines.digital/trial/sign-up" target="_blank" class="link-item">
            <i class="fas fa-vial"></i> Link Teste Gratuito
          </a>
        </div>
      </div>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-exclamation-triangle"></i> Requisitos para API Oficial do Meta</h3>
      </div>
      <div class="req-grid">
        <div class="req-item">
          <div class="req-icon green"><i class="fab fa-whatsapp"></i></div>
          <div>
            <div class="req-title">Numero WhatsApp Business</div>
            <div class="req-desc">Deve ser Business se quiser usar no celular e na plataforma.</div>
          </div>
        </div>
        <div class="req-item">
          <div class="req-icon blue"><i class="fab fa-meta"></i></div>
          <div>
            <div class="req-title">Gerenciador de Negocios (BM)</div>
            <div class="req-desc">Dar acesso para thiago@papervines.digital</div>
          </div>
        </div>
        <div class="req-item">
          <div class="req-icon orange"><i class="fas fa-credit-card"></i></div>
          <div>
            <div class="req-title">Cartao Internacional</div>
            <div class="req-desc">Preferencialmente fisico, para pagamentos do WhatsApp.</div>
          </div>
        </div>
        <div class="req-item">
          <div class="req-icon purple"><i class="fas fa-globe"></i></div>
          <div>
            <div class="req-title">Site com CNPJ</div>
            <div class="req-desc">Site da empresa com dados do CNPJ no rodape.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card fade-in">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-table"></i> Endpoints Disponiveis</h3>
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
            <tr>
              <td><span class="badge badge-success">GET</span></td>
              <td><code>/</code></td>
              <td>Esta pagina de visao geral</td>
            </tr>
            <tr>
              <td><span class="badge badge-success">GET</span></td>
              <td><code>/playbook</code></td>
              <td>Processo de vendas completo</td>
            </tr>
            <tr>
              <td><span class="badge badge-success">GET</span></td>
              <td><code>/playbook/scripts</code></td>
              <td>Scripts de mensagens</td>
            </tr>
            <tr>
              <td><span class="badge badge-success">GET</span></td>
              <td><code>/calculadora</code></td>
              <td>Calculadora de propostas</td>
            </tr>
            <tr>
              <td><span class="badge badge-success">GET</span></td>
              <td><code>/clientes</code></td>
              <td>Gestao de clientes</td>
            </tr>
            <tr>
              <td><span class="badge badge-purple">POST</span></td>
              <td><code>/api/clientes</code></td>
              <td>API CRUD de clientes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
  return layout('Visao Geral', content, 'home');
}
