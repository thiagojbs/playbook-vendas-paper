import { layout } from '../templates/layout.js';

export function renderHome(tenantData = {}) {
  // Extrair config do tenant
  const config = tenantData.config || {};
  const tenantId = config.id || 'papervines';

  // Renderizar home especifica do tenant
  if (tenantId === 'cabeloesaude') {
    return renderHomeCabeloeSaude(tenantData);
  }

  if (tenantId === 'newoeste') {
    return renderHomeNewOeste(tenantData);
  }

  // Default: Paper Vines
  return renderHomePaperVines(tenantData);
}

// ========================================
// HOME PAGE - CABELO & SAUDE
// ========================================
function renderHomeCabeloeSaude(tenantData) {
  const config = tenantData.config || {};
  const empresaNome = config.nome || 'Cabelo & Saude';
  const modulos = config.modulos || {};
  const tenantQuery = '?tenant=cabeloesaude';

  const content = `
    <!-- Hero Section -->
    <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%); border-radius: 20px; padding: 40px; margin-bottom: 32px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
      <div style="position: absolute; bottom: -30px; left: 30%; width: 100px; height: 100px; background: rgba(255,255,255,0.08); border-radius: 50%;"></div>
      <div style="position: relative; z-index: 1;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="width: 56px; height: 56px; background: rgba(255,255,255,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-leaf" style="font-size: 28px; color: white;"></i>
          </div>
          <div>
            <h1 style="color: white; font-size: 32px; font-weight: 700; margin: 0;">Playbook de Vendas</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0 0; font-size: 16px;">${empresaNome} - Sistema de Atendimento Comercial</p>
          </div>
        </div>
        <p style="color: rgba(255,255,255,0.9); font-size: 15px; max-width: 600px; line-height: 1.6; margin-bottom: 24px;">
          Tudo que voce precisa para converter pacientes: scripts de abordagem, calculadora de protocolos, tratativas de objecoes e gestao completa do funil de vendas.
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="/calculadora${tenantQuery}" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: white; color: var(--primary); border-radius: 12px; font-weight: 600; text-decoration: none; transition: transform 0.2s;">
            <i class="fas fa-calculator"></i> Montar Protocolo
          </a>
          <a href="/playbook${tenantQuery}" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(255,255,255,0.2); color: white; border-radius: 12px; font-weight: 600; text-decoration: none; border: 1px solid rgba(255,255,255,0.3);">
            <i class="fas fa-book-open"></i> Ver Playbook
          </a>
        </div>
      </div>
    </div>

    <!-- Ferramentas Principais -->
    <div style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
        <i class="fas fa-toolbox" style="color: var(--primary); font-size: 20px;"></i>
        <h2 style="font-size: 20px; font-weight: 600; margin: 0;">Ferramentas do Consultor</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">

        <a href="/calculadora${tenantQuery}" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid var(--border); border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--primary)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(26, 95, 82, 0.15)';" onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #1a5f52, #2d8a7a); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <i class="fas fa-calculator" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">Calculadora</div>
            <div style="font-size: 13px; color: var(--text-secondary);">Montar protocolos e valores</div>
          </div>
        </a>

        <a href="/playbook/scripts${tenantQuery}" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid var(--border); border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--accent)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(79, 179, 163, 0.15)';" onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #4fb3a3, #6ecfc2); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <i class="fas fa-comment-dots" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">Scripts</div>
            <div style="font-size: 13px; color: var(--text-secondary);">Mensagens para WhatsApp</div>
          </div>
        </a>

        <a href="/playbook/objecoes${tenantQuery}" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid var(--border); border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--secondary)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(45, 138, 122, 0.15)';" onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #2d8a7a, #4fb3a3); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <i class="fas fa-shield-alt" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">Objecoes</div>
            <div style="font-size: 13px; color: var(--text-secondary);">Respostas para contornar</div>
          </div>
        </a>

        <a href="/clientes${tenantQuery}" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid var(--border); border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(59, 130, 246, 0.15)';" onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6, #60a5fa); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <i class="fas fa-users" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">Pacientes</div>
            <div style="font-size: 13px; color: var(--text-secondary);">Gerenciar pipeline</div>
          </div>
        </a>

      </div>
    </div>

    <!-- Grid de Conteudo -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;">

      <!-- Jornada do Paciente -->
      <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-route" style="color: var(--primary); font-size: 18px;"></i>
            <h3 style="font-size: 18px; font-weight: 600; margin: 0;">Jornada do Paciente</h3>
          </div>
          <a href="/playbook${tenantQuery}" style="font-size: 13px; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 4px;">
            Ver completo <i class="fas fa-arrow-right"></i>
          </a>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; overflow-x: auto; padding-bottom: 8px;">
          <div style="flex: 1; min-width: 110px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(26, 95, 82, 0.1), rgba(26, 95, 82, 0.05)); border-radius: 12px; border: 1px solid rgba(26, 95, 82, 0.2);">
            <div style="width: 36px; height: 36px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">1</div>
            <div style="font-weight: 600; font-size: 12px;">Captacao</div>
            <div style="font-size: 10px; color: var(--text-secondary); margin-top: 4px;">Lead entra</div>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-secondary); flex-shrink: 0;"></i>
          <div style="flex: 1; min-width: 110px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(45, 138, 122, 0.1), rgba(45, 138, 122, 0.05)); border-radius: 12px; border: 1px solid rgba(45, 138, 122, 0.2);">
            <div style="width: 36px; height: 36px; background: var(--secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">2</div>
            <div style="font-weight: 600; font-size: 12px;">Qualificacao</div>
            <div style="font-size: 10px; color: var(--text-secondary); margin-top: 4px;">Entender queixa</div>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-secondary); flex-shrink: 0;"></i>
          <div style="flex: 1; min-width: 110px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(79, 179, 163, 0.1), rgba(79, 179, 163, 0.05)); border-radius: 12px; border: 1px solid rgba(79, 179, 163, 0.2);">
            <div style="width: 36px; height: 36px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">3</div>
            <div style="font-weight: 600; font-size: 12px;">Avaliacao</div>
            <div style="font-size: 10px; color: var(--text-secondary); margin-top: 4px;">Agendar consulta</div>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-secondary); flex-shrink: 0;"></i>
          <div style="flex: 1; min-width: 110px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05)); border-radius: 12px; border: 1px solid rgba(236, 72, 153, 0.2);">
            <div style="width: 36px; height: 36px; background: #ec4899; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">4</div>
            <div style="font-weight: 600; font-size: 12px;">Protocolo</div>
            <div style="font-size: 10px; color: var(--text-secondary); margin-top: 4px;">Apresentar plano</div>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-secondary); flex-shrink: 0;"></i>
          <div style="flex: 1; min-width: 110px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.2);">
            <div style="width: 36px; height: 36px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">5</div>
            <div style="font-weight: 600; font-size: 12px;">Fechamento</div>
            <div style="font-size: 10px; color: var(--text-secondary); margin-top: 4px;">Iniciar tratamento</div>
          </div>
        </div>
      </div>

      <!-- Especialidades -->
      <div style="background: linear-gradient(135deg, rgba(26, 95, 82, 0.08), rgba(45, 138, 122, 0.08)); border: 1px solid var(--primary); border-radius: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
          <div style="width: 40px; height: 40px; background: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-microscope" style="color: white; font-size: 18px;"></i>
          </div>
          <div>
            <h3 style="font-size: 16px; font-weight: 600; margin: 0;">Nossos Tratamentos</h3>
            <p style="font-size: 12px; color: var(--text-secondary); margin: 0;">Especialidades oferecidas</p>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: white; border-radius: 10px;">
            <i class="fas fa-search-plus" style="color: var(--primary); font-size: 14px;"></i>
            <span style="font-size: 13px;">Avaliacao Tricologica</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: white; border-radius: 10px;">
            <i class="fas fa-bolt" style="color: var(--accent); font-size: 14px;"></i>
            <span style="font-size: 13px;">Laserterapia Capilar</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: white; border-radius: 10px;">
            <i class="fas fa-syringe" style="color: var(--secondary); font-size: 14px;"></i>
            <span style="font-size: 13px;">Intradermoterapia</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: white; border-radius: 10px;">
            <i class="fas fa-crosshairs" style="color: #ec4899; font-size: 14px;"></i>
            <span style="font-size: 13px;">Microagulhamento</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Segunda linha: Diferenciais e Pacotes -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">

      <!-- Diferenciais da Clinica -->
      <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
          <i class="fas fa-star" style="color: var(--primary); font-size: 18px;"></i>
          <h3 style="font-size: 18px; font-weight: 600; margin: 0;">Por que a Cabelo & Saude?</h3>
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: var(--bg-page); border-radius: 10px;">
            <div style="width: 36px; height: 36px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i class="fas fa-search" style="color: white; font-size: 14px;"></i>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Abordagem Investigativa</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Tratamos a causa, nao o sintoma</div>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: var(--bg-page); border-radius: 10px;">
            <div style="width: 36px; height: 36px; background: linear-gradient(135deg, var(--secondary), var(--accent)); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i class="fas fa-user-md" style="color: white; font-size: 14px;"></i>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Biomedica Especialista</div>
              <div style="font-size: 11px; color: var(--text-secondary);">7 anos de experiencia em tricologia</div>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: var(--bg-page); border-radius: 10px;">
            <div style="width: 36px; height: 36px; background: linear-gradient(135deg, var(--accent), #10b981); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i class="fas fa-ban" style="color: white; font-size: 14px;"></i>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Sem Paliativos</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Nao dependemos apenas de Minoxidil/Finasterida</div>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: var(--bg-page); border-radius: 10px;">
            <div style="width: 36px; height: 36px; background: linear-gradient(135deg, #ec4899, #f472b6); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <i class="fas fa-fingerprint" style="color: white; font-size: 14px;"></i>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Protocolo Personalizado</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Cada paciente e unico</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Principais Queixas -->
      <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
          <i class="fas fa-user-injured" style="color: #ef4444; font-size: 18px;"></i>
          <h3 style="font-size: 18px; font-weight: 600; margin: 0;">Principais Queixas dos Pacientes</h3>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(239, 68, 68, 0.08); border-radius: 8px; border-left: 3px solid #ef4444;">
            <span style="font-size: 13px;">Queda excessiva</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(245, 158, 11, 0.08); border-radius: 8px; border-left: 3px solid #f59e0b;">
            <span style="font-size: 13px;">Fios ralos/finos</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(139, 92, 246, 0.08); border-radius: 8px; border-left: 3px solid #8b5cf6;">
            <span style="font-size: 13px;">Calvicie</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(59, 130, 246, 0.08); border-radius: 8px; border-left: 3px solid #3b82f6;">
            <span style="font-size: 13px;">Alopecia</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(236, 72, 153, 0.08); border-radius: 8px; border-left: 3px solid #ec4899;">
            <span style="font-size: 13px;">Couro sensivel</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; padding: 12px; background: rgba(16, 185, 129, 0.08); border-radius: 8px; border-left: 3px solid #10b981;">
            <span style="font-size: 13px;">Oleosidade/caspa</span>
          </div>
        </div>
        <div style="margin-top: 16px; padding: 12px; background: linear-gradient(135deg, rgba(26, 95, 82, 0.1), rgba(45, 138, 122, 0.1)); border-radius: 10px;">
          <div style="font-size: 12px; color: var(--primary); text-align: center;">
            <i class="fas fa-lightbulb"></i> Use essas queixas para conectar com a dor do paciente na abordagem inicial
          </div>
        </div>
      </div>

    </div>

    <!-- Protocolos de Tratamento -->
    <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-clipboard-list" style="color: var(--primary); font-size: 18px;"></i>
          <h3 style="font-size: 18px; font-weight: 600; margin: 0;">Protocolos de Tratamento</h3>
        </div>
        <a href="/calculadora${tenantQuery}" style="font-size: 13px; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 4px;">
          Montar proposta <i class="fas fa-arrow-right"></i>
        </a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <div style="text-align: center; padding: 20px; background: var(--bg-page); border-radius: 12px; border: 1px solid var(--border);">
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">BASICO</div>
          <div style="font-size: 28px; font-weight: 700; color: var(--primary);">R$ 1.800</div>
          <div style="font-size: 12px; color: var(--text-secondary);">6 sessoes | 3 meses</div>
          <div style="font-size: 11px; color: var(--accent); margin-top: 8px;">Queda leve</div>
        </div>
        <div style="text-align: center; padding: 20px; background: var(--bg-page); border-radius: 12px; border: 1px solid var(--border);">
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">INTERMEDIARIO</div>
          <div style="font-size: 28px; font-weight: 700; color: var(--secondary);">R$ 3.500</div>
          <div style="font-size: 12px; color: var(--text-secondary);">12 sessoes | 6 meses</div>
          <div style="font-size: 11px; color: var(--accent); margin-top: 8px;">Queda moderada</div>
        </div>
        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, rgba(26, 95, 82, 0.1), rgba(45, 138, 122, 0.1)); border-radius: 12px; border: 2px solid var(--primary); position: relative;">
          <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--primary); color: white; font-size: 10px; font-weight: 600; padding: 2px 10px; border-radius: 10px;">POPULAR</div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">AVANCADO</div>
          <div style="font-size: 28px; font-weight: 700; color: var(--primary);">R$ 5.500</div>
          <div style="font-size: 12px; color: var(--text-secondary);">18 sessoes | 9 meses</div>
          <div style="font-size: 11px; color: var(--accent); margin-top: 8px;">Alopecia</div>
        </div>
        <div style="text-align: center; padding: 20px; background: var(--bg-page); border-radius: 12px; border: 1px solid var(--border);">
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">PREMIUM</div>
          <div style="font-size: 28px; font-weight: 700; color: #ec4899;">R$ 8.000</div>
          <div style="font-size: 12px; color: var(--text-secondary);">24 sessoes | 12 meses</div>
          <div style="font-size: 11px; color: var(--accent); margin-top: 8px;">Tratamento completo</div>
        </div>
      </div>
    </div>

    <!-- Dica do Dia -->
    <div style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); border: 1px solid var(--secondary); border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px;">
      <div style="width: 48px; height: 48px; background: var(--secondary); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i class="fas fa-lightbulb" style="color: white; font-size: 22px;"></i>
      </div>
      <div>
        <div style="font-weight: 600; margin-bottom: 4px; color: #065f46;">Dica de Abordagem</div>
        <div style="font-size: 14px; color: #047857;">Sempre ofereça a <strong>avaliacao tricologica</strong> primeiro (R$ 350). E a porta de entrada para entender o caso e apresentar o protocolo ideal. O paciente precisa ver o diagnostico antes de decidir!</div>
      </div>
    </div>
  `;
  return layout('Visao Geral', content, 'home', config);
}

// ========================================
// HOME PAGE - NEW OESTE TELECOM
// ========================================
function renderHomeNewOeste(tenantData) {
  const config = tenantData.config || {};
  const temDominioPersonalizado = config.dominio && config.dominio !== '';
  const tenantQuery = temDominioPersonalizado ? '' : '?tenant=newoeste';

  const content = `
    <!-- Hero Section -->
    <div style="background: linear-gradient(135deg, #FF6B35 0%, #FFD700 100%); border-radius: 20px; padding: 48px; margin-bottom: 32px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -50px; right: -50px; width: 250px; height: 250px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
      <div style="position: absolute; bottom: -80px; left: -80px; width: 200px; height: 200px; background: rgba(255,255,255,0.08); border-radius: 50%;"></div>

      <div style="position: relative; z-index: 1;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <div style="width: 64px; height: 64px; background: rgba(255,255,255,0.25); border-radius: 18px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
            <i class="fas fa-wifi" style="font-size: 32px; color: white;"></i>
          </div>
          <div>
            <h1 style="color: white; font-size: 36px; font-weight: 800; margin: 0; text-shadow: 0 2px 10px rgba(0,0,0,0.1);">Playbook de Vendas</h1>
            <p style="color: rgba(255,255,255,0.95); margin: 4px 0 0 0; font-size: 18px; font-weight: 500;">New Oeste Telecom - Internet Fibra Óptica</p>
          </div>
        </div>

        <p style="color: rgba(255,255,255,0.95); font-size: 16px; max-width: 700px; line-height: 1.7; margin-bottom: 28px; font-weight: 500;">
          Sistema completo de vendas para internet de ultra velocidade. Scripts prontos, tratamento de objeções, calculadora de planos e gestão do pipeline comercial.
        </p>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="/playbook${tenantQuery}" style="display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: white; color: #FF6B35; border-radius: 12px; font-weight: 700; text-decoration: none; transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <i class="fas fa-book-open"></i> Ver Playbook Completo
          </a>
          <a href="/calculadora${tenantQuery}" style="display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: rgba(255,255,255,0.2); color: white; border-radius: 12px; font-weight: 700; text-decoration: none; border: 2px solid rgba(255,255,255,0.4); backdrop-filter: blur(10px);">
            <i class="fas fa-calculator"></i> Calcular Plano Ideal
          </a>
        </div>
      </div>
    </div>

    <!-- Stats Rápidas -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px;">
      <div style="background: white; border: 2px solid #FFE5D9; border-radius: 16px; padding: 24px; text-align: center;">
        <div style="font-size: 32px; font-weight: 800; color: #FF6B35; margin-bottom: 8px;">3</div>
        <div style="font-size: 13px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Planos Residenciais</div>
        <div style="margin-top: 8px; font-size: 12px; color: #999;">De 800 a 950 Mega</div>
      </div>

      <div style="background: white; border: 2px solid #FFF4E6; border-radius: 16px; padding: 24px; text-align: center;">
        <div style="font-size: 32px; font-weight: 800; color: #FFD700; margin-bottom: 8px;">4</div>
        <div style="font-size: 13px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Planos Empresariais</div>
        <div style="margin-top: 8px; font-size: 12px; color: #999;">Com SLA e IP fixo</div>
      </div>

      <div style="background: white; border: 2px solid #FFE5D9; border-radius: 16px; padding: 24px; text-align: center;">
        <div style="font-size: 32px; font-weight: 800; color: #FF6B35; margin-bottom: 8px;">72h</div>
        <div style="font-size: 13px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Instalação Rápida</div>
        <div style="margin-top: 8px; font-size: 12px; color: #999;">Até 3 dias úteis</div>
      </div>

      <div style="background: white; border: 2px solid #FFF4E6; border-radius: 16px; padding: 24px; text-align: center;">
        <div style="font-size: 32px; font-weight: 800; color: #FFD700; margin-bottom: 8px;">24/7</div>
        <div style="font-size: 13px; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Suporte Local</div>
        <div style="margin-top: 8px; font-size: 12px; color: #999;">Atendimento rápido</div>
      </div>
    </div>

    <!-- Planos em Destaque -->
    <div style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-star" style="color: #FF6B35; font-size: 22px;"></i>
          <h2 style="font-size: 22px; font-weight: 700; margin: 0;">Planos Mais Vendidos</h2>
        </div>
        <a href="/playbook/precos${tenantQuery}" style="color: #FF6B35; font-weight: 600; text-decoration: none; font-size: 14px;">
          Ver todos os planos <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        <!-- Plano PRIME -->
        <div style="background: white; border: 3px solid #FF6B35; border-radius: 16px; padding: 28px; position: relative; box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);">
          <div style="position: absolute; top: -12px; right: 20px; background: #FF6B35; color: white; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">PROMOÇÃO</div>

          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 700; color: #FF6B35; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Plano Prime</div>
            <div style="font-size: 48px; font-weight: 800; color: #FF6B35; line-height: 1;">800</div>
            <div style="font-size: 16px; font-weight: 600; color: #666; margin-bottom: 16px;">MEGA</div>

            <div style="background: #FFF4E6; padding: 16px; border-radius: 12px;">
              <div style="text-decoration: line-through; color: #999; font-size: 13px; margin-bottom: 4px;">De R$ 119,90</div>
              <div style="font-size: 14px; color: #666; font-weight: 600;">POR</div>
              <div style="font-size: 36px; font-weight: 800; color: #FF6B35;">
                R$ <span style="font-size: 48px;">69</span>,90
              </div>
              <div style="font-size: 12px; color: #666; margin-top: 4px;">/mês em Fev e Mar 2026</div>
              <div style="font-size: 11px; color: #999; margin-top: 4px;">depois R$ 119,90/mês</div>
            </div>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #FFE5D9;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="color: #10B981; font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Instalação GRÁTIS</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="color: #10B981; font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Roteador WiFi+ incluso</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="color: #10B981; font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Watch+ (30 canais)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-check-circle" style="color: #10B981; font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">App com descontos</span>
            </div>
          </div>
        </div>

        <!-- Plano MAX -->
        <div style="background: linear-gradient(135deg, #6B46C1 0%, #9333EA 100%); border-radius: 16px; padding: 28px; position: relative; color: white; box-shadow: 0 8px 24px rgba(107, 70, 193, 0.3); transform: scale(1.05);">
          <div style="position: absolute; top: -12px; right: 20px; background: #FFD700; color: #6B46C1; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">MAIS VENDIDO</div>

          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; color: rgba(255,255,255,0.9);">Plano Max</div>
            <div style="font-size: 48px; font-weight: 800; line-height: 1;">850</div>
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: rgba(255,255,255,0.9);">MEGA</div>

            <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 12px; backdrop-filter: blur(10px);">
              <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">POR APENAS</div>
              <div style="font-size: 36px; font-weight: 800;">
                R$ <span style="font-size: 48px;">139</span>,90
              </div>
              <div style="font-size: 12px; margin-top: 4px; color: rgba(255,255,255,0.9);">/mês</div>
            </div>
          </div>

          <div style="margin-top: 20px; padding: 16px; background: rgba(255,255,255,0.1); border-radius: 12px; text-align: center; margin-bottom: 20px;">
            <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">🎬 HBO MAX INCLUSO</div>
            <div style="font-size: 12px; color: rgba(255,255,255,0.8);">Plano Standard (2 dispositivos Full HD)</div>
          </div>

          <div style="padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Instalação GRÁTIS</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Roteador WiFi+ incluso</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Watch+ (30 canais)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-check-circle" style="font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Assistência Premium</span>
            </div>
          </div>
        </div>

        <!-- Plano ELITE -->
        <div style="background: white; border: 3px solid #FFD700; border-radius: 16px; padding: 28px; position: relative; box-shadow: 0 4px 12px rgba(255, 215, 0, 0.15);">
          <div style="position: absolute; top: -12px; right: 20px; background: #FFD700; color: #1F2937; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">PREMIUM</div>

          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 14px; font-weight: 700; color: #FFD700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Plano Elite</div>
            <div style="font-size: 48px; font-weight: 800; color: #FFD700; line-height: 1;">950</div>
            <div style="font-size: 16px; font-weight: 600; color: #666; margin-bottom: 16px;">MEGA</div>

            <div style="background: #FFF9E6; padding: 16px; border-radius: 12px;">
              <div style="font-size: 14px; color: #666; font-weight: 600; margin-bottom: 4px;">POR APENAS</div>
              <div style="font-size: 36px; font-weight: 800; color: #FFD700;">
                R$ <span style="font-size: 48px;">159</span>,90
              </div>
              <div style="font-size: 12px; color: #666; margin-top: 4px;">/mês</div>
            </div>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #FFF4E6;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="color: #10B981; font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Instalação GRÁTIS</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="color: #10B981; font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Roteador WiFi+ incluso</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="color: #10B981; font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Watch+ (30 canais)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <i class="fas fa-check-circle" style="color: #10B981; font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">Assistência Prioritária</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-check-circle" style="color: #10B981; font-size: 16px;"></i>
              <span style="font-size: 13px; font-weight: 500;">App Premium + descontos</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ferramentas do Vendedor -->
    <div style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
        <i class="fas fa-toolbox" style="color: #FF6B35; font-size: 22px;"></i>
        <h2 style="font-size: 22px; font-weight: 700; margin: 0;">Ferramentas do Consultor</h2>
      </div>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <a href="/playbook${tenantQuery}" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid #FFE5D9; border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='#FF6B35'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(255, 107, 53, 0.2)';" onmouseout="this.style.borderColor='#FFE5D9'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #FF6B35, #FF8C42); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);">
              <i class="fas fa-book-open" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">Playbook</div>
            <div style="font-size: 13px; color: #6B7280;">Processo de vendas completo</div>
          </div>
        </a>

        <a href="/playbook/scripts${tenantQuery}" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid #FFF4E6; border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='#FFD700'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(255, 215, 0, 0.2)';" onmouseout="this.style.borderColor='#FFF4E6'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #FFD700, #FDE047); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);">
              <i class="fas fa-comment-dots" style="font-size: 28px; color: #1F2937;"></i>
            </div>
            <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">Scripts</div>
            <div style="font-size: 13px; color: #6B7280;">Mensagens prontas por etapa</div>
          </div>
        </a>

        <a href="/playbook/objecoes${tenantQuery}" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid #FFE5D9; border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='#FF6B35'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(255, 107, 53, 0.2)';" onmouseout="this.style.borderColor='#FFE5D9'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #EF4444, #F87171); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">
              <i class="fas fa-shield-alt" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">Objeções</div>
            <div style="font-size: 13px; color: #6B7280;">Tratamento de resistências</div>
          </div>
        </a>

        <a href="/calculadora${tenantQuery}" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid #E0E7FF; border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='#6366F1'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(99, 102, 241, 0.2)';" onmouseout="this.style.borderColor='#E0E7FF'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #6366F1, #818CF8); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);">
              <i class="fas fa-calculator" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px; color: #1F2937;">Calculadora</div>
            <div style="font-size: 13px; color: #6B7280;">Plano ideal por perfil</div>
          </div>
        </a>
      </div>
    </div>

    <!-- Diferenciais New Oeste -->
    <div style="background: linear-gradient(135deg, #1F2937 0%, #374151 100%); border-radius: 20px; padding: 40px; margin-bottom: 32px; color: white;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h2 style="font-size: 28px; font-weight: 800; margin: 0 0 12px 0;">Por que New Oeste?</h2>
        <p style="font-size: 16px; color: rgba(255,255,255,0.8); margin: 0;">Diferenciais que você deve destacar na venda</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        <div style="background: rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35, #FFD700); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="fas fa-bolt" style="font-size: 24px; color: white;"></i>
          </div>
          <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">Fibra FTTH Real</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6;">Fibra óptica até dentro de casa. Velocidade simétrica (download = upload) garantida.</div>
        </div>

        <div style="background: rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35, #FFD700); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="fas fa-map-marker-alt" style="font-size: 24px; color: white;"></i>
          </div>
          <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">Empresa Local</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6;">Atendimento em Foz do Iguaçu. Suporte técnico que conhece a região e chega rápido.</div>
        </div>

        <div style="background: rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35, #FFD700); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="fas fa-clock" style="font-size: 24px; color: white;"></i>
          </div>
          <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">Instalação Rápida</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6;">Instalação em até 72h. Sem espera de semanas como nas grandes operadoras.</div>
        </div>

        <div style="background: rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35, #FFD700); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="fas fa-headset" style="font-size: 24px; color: white;"></i>
          </div>
          <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">Suporte 24/7</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6;">Atendimento prioritário para clientes. Fale com gente de verdade, não robôs.</div>
        </div>

        <div style="background: rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35, #FFD700); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="fas fa-gift" style="font-size: 24px; color: white;"></i>
          </div>
          <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">Sem Taxas Extras</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6;">Instalação grátis. Roteador WiFi+ incluso. Sem custos escondidos.</div>
        </div>

        <div style="background: rgba(255,255,255,0.1); border-radius: 16px; padding: 24px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35, #FFD700); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="fas fa-mobile-alt" style="font-size: 24px; color: white;"></i>
          </div>
          <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">Super App Connect</div>
          <div style="font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.6;">App exclusivo com descontos em parceiros (cinema, lojas, serviços) e revistas digitais.</div>
        </div>
      </div>
    </div>

    <!-- CTA Final -->
    <div style="background: linear-gradient(135deg, #FF6B35 0%, #FFD700 100%); border-radius: 20px; padding: 40px; text-align: center;">
      <h3 style="color: white; font-size: 24px; font-weight: 800; margin: 0 0 12px 0;">Pronto para vender mais?</h3>
      <p style="color: rgba(255,255,255,0.95); font-size: 16px; margin: 0 0 24px 0;">Acesse o playbook completo e domine o processo de vendas da New Oeste</p>
      <a href="/playbook${tenantQuery}" style="display: inline-flex; align-items: center; gap: 10px; padding: 16px 32px; background: white; color: #FF6B35; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <i class="fas fa-rocket"></i> Acessar Playbook Completo
      </a>
    </div>
  `;

  return layout('Visão Geral', content, 'home', config);
}

// ========================================
// HOME PAGE - PAPER VINES (DEFAULT)
// ========================================
function renderHomePaperVines(tenantData) {
  const config = tenantData.config || {};
  const empresaNome = config.nome || 'Paper Vines';
  const empresaNomeCompleto = config.nomeCompleto || config.nome || 'Paper Vines Digital';
  const links = config.links || {};
  const modulos = config.modulos || {};

  const content = `
    <!-- Hero Section -->
    <div style="background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%); border-radius: 20px; padding: 40px; margin-bottom: 32px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
      <div style="position: absolute; bottom: -30px; left: 30%; width: 100px; height: 100px; background: rgba(255,255,255,0.08); border-radius: 50%;"></div>
      <div style="position: relative; z-index: 1;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
          <div style="width: 56px; height: 56px; background: rgba(255,255,255,0.2); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-rocket" style="font-size: 28px; color: white;"></i>
          </div>
          <div>
            <h1 style="color: white; font-size: 32px; font-weight: 700; margin: 0;">Playbook de Vendas</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0 0; font-size: 16px;">${empresaNome} - Sistema Comercial Completo</p>
          </div>
        </div>
        <p style="color: rgba(255,255,255,0.9); font-size: 15px; max-width: 600px; line-height: 1.6; margin-bottom: 24px;">
          Tudo que voce precisa para vender: scripts prontos, calculadora de propostas, tratativas de objecoes e gestao completa do funil de vendas.
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="/calculadora" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: white; color: var(--primary); border-radius: 12px; font-weight: 600; text-decoration: none; transition: transform 0.2s;">
            <i class="fas fa-calculator"></i> Criar Proposta
          </a>
          <a href="/playbook" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(255,255,255,0.2); color: white; border-radius: 12px; font-weight: 600; text-decoration: none; border: 1px solid rgba(255,255,255,0.3);">
            <i class="fas fa-book-open"></i> Ver Playbook
          </a>
        </div>
      </div>
    </div>

    <!-- Ferramentas Principais -->
    <div style="margin-bottom: 32px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
        <i class="fas fa-toolbox" style="color: var(--primary); font-size: 20px;"></i>
        <h2 style="font-size: 20px; font-weight: 600; margin: 0;">Ferramentas do Consultor</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">

        <a href="/calculadora" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid var(--border); border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--primary)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(139, 92, 246, 0.15)';" onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #8b5cf6, #a78bfa); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <i class="fas fa-calculator" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">Calculadora</div>
            <div style="font-size: 13px; color: var(--text-secondary);">Gerar propostas personalizadas</div>
          </div>
        </a>

        <a href="/playbook/scripts" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid var(--border); border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--accent)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(245, 158, 11, 0.15)';" onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #f59e0b, #fbbf24); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <i class="fas fa-comment-dots" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">Scripts</div>
            <div style="font-size: 13px; color: var(--text-secondary);">Mensagens prontas para copiar</div>
          </div>
        </a>

        <a href="/playbook/objecoes" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid var(--border); border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='var(--secondary)'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(16, 185, 129, 0.15)';" onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #10b981, #34d399); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <i class="fas fa-shield-alt" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">Objecoes</div>
            <div style="font-size: 13px; color: var(--text-secondary);">Respostas para contornar</div>
          </div>
        </a>

        <a href="/clientes" style="text-decoration: none; color: inherit;">
          <div style="background: white; border: 2px solid var(--border); border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; cursor: pointer;" onmouseover="this.style.borderColor='#3b82f6'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(59, 130, 246, 0.15)';" onmouseout="this.style.borderColor='var(--border)'; this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6, #60a5fa); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <i class="fas fa-users" style="font-size: 28px; color: white;"></i>
            </div>
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">Clientes</div>
            <div style="font-size: 13px; color: var(--text-secondary);">Gerenciar pipeline</div>
          </div>
        </a>

      </div>
    </div>

    <!-- Grid de Conteudo -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 32px;">

      <!-- Fluxo de Vendas Simplificado -->
      <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-route" style="color: var(--primary); font-size: 18px;"></i>
            <h3 style="font-size: 18px; font-weight: 600; margin: 0;">Fluxo de Vendas</h3>
          </div>
          <a href="/playbook" style="font-size: 13px; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 4px;">
            Ver completo <i class="fas fa-arrow-right"></i>
          </a>
        </div>

        <div style="display: flex; align-items: center; gap: 8px; overflow-x: auto; padding-bottom: 8px;">
          <div style="flex: 1; min-width: 120px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05)); border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.2);">
            <div style="width: 36px; height: 36px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">1</div>
            <div style="font-weight: 600; font-size: 13px;">Prospeccao</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Identificar leads</div>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-secondary); flex-shrink: 0;"></i>
          <div style="flex: 1; min-width: 120px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05)); border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.2);">
            <div style="width: 36px; height: 36px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">2</div>
            <div style="font-weight: 600; font-size: 13px;">Qualificacao</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Verificar perfil</div>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-secondary); flex-shrink: 0;"></i>
          <div style="flex: 1; min-width: 120px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05)); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.2);">
            <div style="width: 36px; height: 36px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">3</div>
            <div style="font-weight: 600; font-size: 13px;">Demo</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Apresentar solucao</div>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-secondary); flex-shrink: 0;"></i>
          <div style="flex: 1; min-width: 120px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(236, 72, 153, 0.05)); border-radius: 12px; border: 1px solid rgba(236, 72, 153, 0.2);">
            <div style="width: 36px; height: 36px; background: #ec4899; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">4</div>
            <div style="font-weight: 600; font-size: 13px;">Proposta</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Enviar valores</div>
          </div>
          <i class="fas fa-chevron-right" style="color: var(--text-secondary); flex-shrink: 0;"></i>
          <div style="flex: 1; min-width: 120px; text-align: center; padding: 16px 12px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.2);">
            <div style="width: 36px; height: 36px; background: var(--secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; color: white; font-weight: 700;">5</div>
            <div style="font-weight: 600; font-size: 13px;">Fechamento</div>
            <div style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">Contrato assinado</div>
          </div>
        </div>
      </div>

      <!-- Desempenho Card -->
      <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(16, 185, 129, 0.08)); border: 1px solid var(--primary); border-radius: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
          <div style="width: 40px; height: 40px; background: var(--primary); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-chart-line" style="color: white; font-size: 18px;"></i>
          </div>
          <div>
            <h3 style="font-size: 16px; font-weight: 600; margin: 0;">Seu Desempenho</h3>
            <p style="font-size: 12px; color: var(--text-secondary); margin: 0;">Acompanhe suas metas</p>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="/desempenho/planejamento" style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 10px; text-decoration: none; color: inherit; transition: transform 0.2s;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
            <i class="fas fa-bullseye" style="color: var(--primary); font-size: 16px;"></i>
            <div style="flex: 1;">
              <div style="font-weight: 500; font-size: 14px;">Planejamento</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Definir metas do mes</div>
            </div>
            <i class="fas fa-chevron-right" style="color: var(--text-secondary); font-size: 12px;"></i>
          </a>
          <a href="/desempenho/acompanhamento" style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 10px; text-decoration: none; color: inherit; transition: transform 0.2s;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
            <i class="fas fa-calendar-check" style="color: var(--accent); font-size: 16px;"></i>
            <div style="flex: 1;">
              <div style="font-weight: 500; font-size: 14px;">Acompanhamento</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Registrar atividades</div>
            </div>
            <i class="fas fa-chevron-right" style="color: var(--text-secondary); font-size: 12px;"></i>
          </a>
          <a href="/desempenho/relatorio" style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 10px; text-decoration: none; color: inherit; transition: transform 0.2s;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='translateX(0)'">
            <i class="fas fa-chart-bar" style="color: var(--secondary); font-size: 16px;"></i>
            <div style="flex: 1;">
              <div style="font-weight: 500; font-size: 14px;">Relatorio</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Analisar resultados</div>
            </div>
            <i class="fas fa-chevron-right" style="color: var(--text-secondary); font-size: 12px;"></i>
          </a>
        </div>
      </div>

    </div>

    <!-- Segunda linha: Links e Requisitos -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px;">

      <!-- Links Rapidos -->
      <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
          <i class="fas fa-external-link-alt" style="color: var(--primary); font-size: 18px;"></i>
          <h3 style="font-size: 18px; font-weight: 600; margin: 0;">Links Rapidos</h3>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <a href="https://www.figma.com/deck/fU8KjN7JpjpzhxNRZzfqlp" target="_blank" style="display: flex; align-items: center; gap: 12px; padding: 14px; background: var(--bg-page); border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s;" onmouseover="this.style.background='rgba(139, 92, 246, 0.1)'" onmouseout="this.style.background='var(--bg-page)'">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #f24e1e, #ff7262); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fab fa-figma" style="color: white; font-size: 18px;"></i>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Apresentacao</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Slides para clientes</div>
            </div>
          </a>
          <a href="https://www.figma.com/files/team/1082649090502569616/project/412083277/Vendas" target="_blank" style="display: flex; align-items: center; gap: 12px; padding: 14px; background: var(--bg-page); border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s;" onmouseover="this.style.background='rgba(139, 92, 246, 0.1)'" onmouseout="this.style.background='var(--bg-page)'">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #a259ff, #c084fc); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-file-invoice" style="color: white; font-size: 18px;"></i>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Propostas</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Modelos no Figma</div>
            </div>
          </a>
          <a href="https://drive.google.com/drive/folders/1hTxC7rcN2MvAtusrG-gj6CxkT6FvhTe1" target="_blank" style="display: flex; align-items: center; gap: 12px; padding: 14px; background: var(--bg-page); border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s;" onmouseover="this.style.background='rgba(139, 92, 246, 0.1)'" onmouseout="this.style.background='var(--bg-page)'">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #4285f4, #60a5fa); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fab fa-google-drive" style="color: white; font-size: 18px;"></i>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Contratos</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Modelos no Drive</div>
            </div>
          </a>
          <a href="https://chat.papervines.digital/trial/sign-up" target="_blank" style="display: flex; align-items: center; gap: 12px; padding: 14px; background: var(--bg-page); border-radius: 10px; text-decoration: none; color: inherit; transition: all 0.2s;" onmouseover="this.style.background='rgba(139, 92, 246, 0.1)'" onmouseout="this.style.background='var(--bg-page)'">
            <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #10b981, #34d399); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-vial" style="color: white; font-size: 18px;"></i>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Teste Gratuito</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Link para cliente</div>
            </div>
          </a>
        </div>
      </div>

      <!-- Requisitos API -->
      <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
          <i class="fab fa-whatsapp" style="color: #25D366; font-size: 20px;"></i>
          <h3 style="font-size: 18px; font-weight: 600; margin: 0;">Requisitos API Meta</h3>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: rgba(37, 211, 102, 0.08); border-radius: 10px; border-left: 3px solid #25D366;">
            <i class="fab fa-whatsapp" style="color: #25D366; font-size: 18px;"></i>
            <div>
              <div style="font-weight: 500; font-size: 13px;">WhatsApp Business</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Numero deve ser Business</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: rgba(24, 119, 242, 0.08); border-radius: 10px; border-left: 3px solid #1877F2;">
            <i class="fab fa-meta" style="color: #1877F2; font-size: 18px;"></i>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Business Manager</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Acesso para thiago@papervines.digital</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: rgba(245, 158, 11, 0.08); border-radius: 10px; border-left: 3px solid #f59e0b;">
            <i class="fas fa-credit-card" style="color: #f59e0b; font-size: 18px;"></i>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Cartao Internacional</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Preferencialmente fisico</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: rgba(139, 92, 246, 0.08); border-radius: 10px; border-left: 3px solid var(--primary);">
            <i class="fas fa-globe" style="color: var(--primary); font-size: 18px;"></i>
            <div>
              <div style="font-weight: 500; font-size: 13px;">Site com CNPJ</div>
              <div style="font-size: 11px; color: var(--text-secondary);">Dados da empresa no rodape</div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Planos Resumo -->
    <div style="background: white; border: 1px solid var(--border); border-radius: 16px; padding: 24px; margin-bottom: 32px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-tags" style="color: var(--primary); font-size: 18px;"></i>
          <h3 style="font-size: 18px; font-weight: 600; margin: 0;">Planos Paper Vines</h3>
        </div>
        <a href="/playbook/planos" style="font-size: 13px; color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 4px;">
          Ver detalhes <i class="fas fa-arrow-right"></i>
        </a>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <div style="text-align: center; padding: 20px; background: var(--bg-page); border-radius: 12px; border: 1px solid var(--border);">
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">ESSENTIAL</div>
          <div style="font-size: 28px; font-weight: 700; color: var(--primary);">R$ 487</div>
          <div style="font-size: 12px; color: var(--text-secondary);">3 usuarios</div>
        </div>
        <div style="text-align: center; padding: 20px; background: var(--bg-page); border-radius: 12px; border: 1px solid var(--border);">
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">PRO</div>
          <div style="font-size: 28px; font-weight: 700; color: var(--accent);">R$ 687</div>
          <div style="font-size: 12px; color: var(--text-secondary);">5 usuarios</div>
        </div>
        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(16, 185, 129, 0.1)); border-radius: 12px; border: 2px solid var(--primary); position: relative;">
          <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--primary); color: white; font-size: 10px; font-weight: 600; padding: 2px 10px; border-radius: 10px;">POPULAR</div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">PLUS+</div>
          <div style="font-size: 28px; font-weight: 700; color: var(--primary);">R$ 987</div>
          <div style="font-size: 12px; color: var(--text-secondary);">10 usuarios</div>
        </div>
        <div style="text-align: center; padding: 20px; background: var(--bg-page); border-radius: 12px; border: 1px solid var(--border);">
          <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">ADVANCED</div>
          <div style="font-size: 28px; font-weight: 700; color: var(--secondary);">R$ 1.487</div>
          <div style="font-size: 12px; color: var(--text-secondary);">20 usuarios</div>
        </div>
      </div>
    </div>

    <!-- Dica do Dia -->
    <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); border: 1px solid #f59e0b; border-radius: 16px; padding: 20px; display: flex; align-items: center; gap: 16px;">
      <div style="width: 48px; height: 48px; background: #f59e0b; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <i class="fas fa-lightbulb" style="color: white; font-size: 22px;"></i>
      </div>
      <div>
        <div style="font-weight: 600; margin-bottom: 4px; color: #92400e;">Dica de Vendas</div>
        <div style="font-size: 14px; color: #78350f;">Sempre ofereça o <strong>teste gratuito de 14 dias</strong> antes de falar de preço. Deixe o cliente experimentar o valor da plataforma primeiro!</div>
      </div>
    </div>
  `;
  return layout('Visao Geral', content, 'home', config);
}
