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
// ========================================
// HOME PAGE - NEW OESTE TELECOM V2
// Versão compacta com quiz e planos empresariais
// ========================================
function renderHomeNewOeste(tenantData) {
  const config = tenantData.config || {};
  const temDominioPersonalizado = config.dominio && config.dominio !== '';
  const tenantQuery = temDominioPersonalizado ? '' : '?tenant=newoeste';

  const content = `
    <!-- Hero Section Compacto -->
    <div style="background: linear-gradient(135deg, #FF6B35 0%, #FFD700 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <i class="fas fa-wifi" style="font-size: 24px; color: white;"></i>
        <div>
          <h1 style="color: white; font-size: 24px; font-weight: 700; margin: 0;">Playbook de Vendas</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 14px;">New Oeste - Internet Fibra Óptica</p>
        </div>
      </div>
      <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin-bottom: 16px;">
        Scripts, calculadora e ferramentas para fechar mais vendas
      </p>
      <div style="display: flex; gap: 8px;">
        <a href="/playbook${tenantQuery}" style="padding: 10px 20px; background: white; color: #FF6B35; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 14px;">
          <i class="fas fa-book-open"></i> Ver Playbook
        </a>
        <a href="/playbook/scripts${tenantQuery}" style="padding: 10px 20px; background: rgba(255,255,255,0.2); color: white; border-radius: 8px; font-weight: 600; text-decoration: none; font-size: 14px; border: 1px solid rgba(255,255,255,0.3);">
          <i class="fas fa-comment-dots"></i> Scripts
        </a>
      </div>
    </div>

    <!-- Quiz Rápido - Plano Ideal -->
    <div style="background: linear-gradient(135deg, #EF4444 0%, #FF6B35 100%); border: 2px solid #FF8C42; border-radius: 16px; padding: 24px; margin-bottom: 24px; color: white;">
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
        <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-bullseye" style="font-size: 20px;"></i>
        </div>
        <div>
          <h2 style="font-size: 18px; font-weight: 700; margin: 0;">Descubra o Plano Ideal</h2>
          <p style="font-size: 13px; margin: 0; color: rgba(255,255,255,0.9);">Ferramenta para usar com o cliente (presencial ou WhatsApp)</p>
        </div>
      </div>

      <div id="quiz-plano" style="background: rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; backdrop-filter: blur(10px);">
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">1. Tipo de cliente:</label>
          <div style="display: flex; gap: 8px;">
            <button onclick="setTipo('residencial')" id="btn-residencial" style="flex: 1; padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">
              <i class="fas fa-home"></i> Residencial
            </button>
            <button onclick="setTipo('empresarial')" id="btn-empresarial" style="flex: 1; padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">
              <i class="fas fa-building"></i> Empresarial
            </button>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">2. Quantas pessoas usam?</label>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
            <button onclick="setPessoas(1)" id="btn-1" style="padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">1-2</button>
            <button onclick="setPessoas(3)" id="btn-3" style="padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">3-5</button>
            <button onclick="setPessoas(6)" id="btn-6" style="padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">6-10</button>
            <button onclick="setPessoas(11)" id="btn-11" style="padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">10+</button>
          </div>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px;">3. Uso principal:</label>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            <button onclick="setUso('trabalho')" id="btn-trabalho" style="padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">
              <i class="fas fa-briefcase"></i> Trabalho/Estudos
            </button>
            <button onclick="setUso('streaming')" id="btn-streaming" style="padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">
              <i class="fas fa-tv"></i> Streaming/Netflix
            </button>
            <button onclick="setUso('jogos')" id="btn-jogos" style="padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">
              <i class="fas fa-gamepad"></i> Jogos Online
            </button>
            <button onclick="setUso('misto')" id="btn-misto" style="padding: 10px; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 8px; color: white; font-weight: 600; cursor: pointer; font-size: 13px;">
              <i class="fas fa-th"></i> Tudo (Misto)
            </button>
          </div>
        </div>

        <button onclick="calcularPlano()" style="width: 100%; padding: 14px; background: white; color: #FF6B35; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; font-size: 15px; margin-bottom: 16px;">
          <i class="fas fa-bullseye"></i> Ver Plano Ideal
        </button>

        <div id="resultado-quiz" style="display: none; background: rgba(255,255,255,0.15); border-radius: 10px; padding: 16px; border: 2px solid rgba(255,255,255,0.3);">
          <div style="text-align: center; margin-bottom: 12px;">
            <div style="font-size: 14px; margin-bottom: 4px;"><i class="fas fa-check-circle"></i> Plano Recomendado:</div>
            <div id="plano-nome" style="font-size: 22px; font-weight: 800;"></div>
            <div id="plano-velocidade" style="font-size: 18px; margin-top: 4px;"></div>
            <div id="plano-preco" style="font-size: 16px; margin-top: 4px;"></div>
          </div>
          <div id="plano-beneficios" style="font-size: 13px; line-height: 1.6; margin-bottom: 12px;"></div>
          <button onclick="copiarResultado()" style="width: 100%; padding: 12px; background: #10B981; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 14px;">
            <i class="fas fa-copy"></i> Copiar para WhatsApp
          </button>
        </div>
      </div>
    </div>

    <!-- Planos Residenciais -->
    <div style="margin-bottom: 24px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-home" style="color: #FF6B35;"></i> Planos Residenciais
      </h2>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <!-- PRIME -->
        <div class="card" style="position: relative;">
          <div style="position: absolute; top: -10px; right: 16px; background: #EF4444; color: white; padding: 4px 12px; border-radius: 12px; font-size: 10px; font-weight: 700;">PROMOÇÃO</div>
          <div style="text-align: center; padding: 16px 16px 0 16px;">
            <div style="font-size: 12px; font-weight: 700; color: #FF6B35; text-transform: uppercase; margin-bottom: 4px;">Prime</div>
            <div style="font-size: 36px; font-weight: 800; color: #FF6B35; line-height: 1;">800</div>
            <div style="font-size: 13px; color: #666; margin-bottom: 12px;">MEGA</div>
            <div style="background: #FFF4E6; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
              <div style="text-decoration: line-through; font-size: 11px; color: #999;">R$ 119,90</div>
              <div style="font-size: 28px; font-weight: 800; color: #FF6B35;">R$ 69<span style="font-size: 18px;">,90</span></div>
              <div style="font-size: 10px; color: #666;">/mês (Fev-Mar)</div>
            </div>
          </div>
          <div style="padding: 0 16px 16px 16px; font-size: 12px;">
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Instalação grátis</div>
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Roteador WiFi+ incluso</div>
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Watch+ (30 canais)</div>
            <div style="margin-bottom: 12px;"><i class="fas fa-check" style="color: #10B981;"></i> App com descontos</div>
            <button onclick="copiarPlano('prime-res')" style="width: 100%; padding: 10px; background: #FF6B35; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">
              <i class="fas fa-copy"></i> Copiar para WhatsApp
            </button>
          </div>
        </div>

        <!-- MAX -->
        <div class="card" style="position: relative; border: 2px solid #6B46C1;">
          <div style="position: absolute; top: -10px; right: 16px; background: #6B46C1; color: white; padding: 4px 12px; border-radius: 12px; font-size: 10px; font-weight: 700;">+ VENDIDO</div>
          <div style="text-align: center; padding: 16px 16px 0 16px;">
            <div style="font-size: 12px; font-weight: 700; color: #6B46C1; text-transform: uppercase; margin-bottom: 4px;">Max</div>
            <div style="font-size: 36px; font-weight: 800; color: #6B46C1; line-height: 1;">850</div>
            <div style="font-size: 13px; color: #666; margin-bottom: 12px;">MEGA</div>
            <div style="background: #F3E8FF; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
              <div style="font-size: 28px; font-weight: 800; color: #6B46C1;">R$ 139<span style="font-size: 18px;">,90</span></div>
              <div style="font-size: 10px; color: #666;">/mês</div>
            </div>
            <div style="background: #6B46C1; color: white; padding: 8px; border-radius: 6px; font-size: 11px; font-weight: 700; margin-bottom: 12px;">
              <i class="fas fa-film"></i> HBO MAX INCLUSO
            </div>
          </div>
          <div style="padding: 0 16px 16px 16px; font-size: 12px;">
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Instalação grátis</div>
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Roteador WiFi+ incluso</div>
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Watch+ (30 canais)</div>
            <div style="margin-bottom: 12px;"><i class="fas fa-check" style="color: #10B981;"></i> Assistência Premium</div>
            <button onclick="copiarPlano('max-res')" style="width: 100%; padding: 10px; background: #6B46C1; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">
              <i class="fas fa-copy"></i> Copiar para WhatsApp
            </button>
          </div>
        </div>

        <!-- ELITE -->
        <div class="card" style="position: relative;">
          <div style="position: absolute; top: -10px; right: 16px; background: #FFD700; color: #1F2937; padding: 4px 12px; border-radius: 12px; font-size: 10px; font-weight: 700;">PREMIUM</div>
          <div style="text-align: center; padding: 16px 16px 0 16px;">
            <div style="font-size: 12px; font-weight: 700; color: #FFD700; text-transform: uppercase; margin-bottom: 4px;">Elite</div>
            <div style="font-size: 36px; font-weight: 800; color: #FFD700; line-height: 1;">950</div>
            <div style="font-size: 13px; color: #666; margin-bottom: 12px;">MEGA</div>
            <div style="background: #FFF9E6; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
              <div style="font-size: 28px; font-weight: 800; color: #FFD700;">R$ 159<span style="font-size: 18px;">,90</span></div>
              <div style="font-size: 10px; color: #666;">/mês</div>
            </div>
          </div>
          <div style="padding: 0 16px 16px 16px; font-size: 12px;">
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Instalação grátis</div>
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Roteador WiFi+ incluso</div>
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Watch+ (30 canais)</div>
            <div style="margin-bottom: 6px;"><i class="fas fa-check" style="color: #10B981;"></i> Assistência Prioritária</div>
            <div style="margin-bottom: 12px;"><i class="fas fa-check" style="color: #10B981;"></i> App Premium</div>
            <button onclick="copiarPlano('elite-res')" style="width: 100%; padding: 10px; background: #FFD700; color: #1F2937; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">
              <i class="fas fa-copy"></i> Copiar para WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Planos Empresariais -->
    <div style="margin-bottom: 24px;">
      <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-building" style="color: #FF6B35;"></i> Planos Empresariais
      </h2>

      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
        <!-- PRIME EMPRESARIAL -->
        <div class="card">
          <div style="text-align: center; padding: 16px 16px 0 16px;">
            <div style="font-size: 12px; font-weight: 700; color: #3B82F6; text-transform: uppercase; margin-bottom: 4px;">Prime</div>
            <div style="font-size: 32px; font-weight: 800; color: #3B82F6; line-height: 1;">800</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 10px;">MEGA</div>
            <div style="background: #EFF6FF; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
              <div style="font-size: 24px; font-weight: 800; color: #3B82F6;">R$ 119<span style="font-size: 16px;">,90</span></div>
              <div style="font-size: 10px; color: #666;">/mês</div>
            </div>
          </div>
          <div style="padding: 0 16px 16px 16px; font-size: 11px;">
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Instalação grátis</div>
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Roteador WiFi+</div>
            <div style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #10B981;"></i> Assistência Premium</div>
            <button onclick="copiarPlano('prime-emp')" style="width: 100%; padding: 8px; background: #3B82F6; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12px;">
              <i class="fas fa-copy"></i> Copiar
            </button>
          </div>
        </div>

        <!-- ELITE EMPRESARIAL -->
        <div class="card">
          <div style="text-align: center; padding: 16px 16px 0 16px;">
            <div style="font-size: 12px; font-weight: 700; color: #3B82F6; text-transform: uppercase; margin-bottom: 4px;">Elite</div>
            <div style="font-size: 32px; font-weight: 800; color: #3B82F6; line-height: 1;">950</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 10px;">MEGA</div>
            <div style="background: #EFF6FF; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
              <div style="font-size: 24px; font-weight: 800; color: #3B82F6;">R$ 159<span style="font-size: 16px;">,90</span></div>
              <div style="font-size: 10px; color: #666;">/mês</div>
            </div>
          </div>
          <div style="padding: 0 16px 16px 16px; font-size: 11px;">
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Instalação grátis</div>
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Roteador WiFi+</div>
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Assistência Prioritária</div>
            <div style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #10B981;"></i> Corporate</div>
            <button onclick="copiarPlano('elite-emp')" style="width: 100%; padding: 8px; background: #3B82F6; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12px;">
              <i class="fas fa-copy"></i> Copiar
            </button>
          </div>
        </div>

        <!-- BUSINESS STARTER -->
        <div class="card" style="border: 2px solid #10B981;">
          <div style="text-align: center; padding: 16px 16px 0 16px;">
            <div style="font-size: 11px; font-weight: 700; color: #10B981; text-transform: uppercase; margin-bottom: 4px;">Business Starter</div>
            <div style="font-size: 32px; font-weight: 800; color: #10B981; line-height: 1;">800</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 10px;">MEGA</div>
            <div style="background: #ECFDF5; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
              <div style="font-size: 24px; font-weight: 800; color: #10B981;">R$ 289<span style="font-size: 16px;">,90</span></div>
              <div style="font-size: 10px; color: #666;">/mês</div>
            </div>
          </div>
          <div style="padding: 0 16px 16px 16px; font-size: 11px;">
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> IPv4 FIXO</div>
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Instalação grátis</div>
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Roteador WiFi+</div>
            <div style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #10B981;"></i> Assistência Premium</div>
            <button onclick="copiarPlano('starter-emp')" style="width: 100%; padding: 8px; background: #10B981; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12px;">
              <i class="fas fa-copy"></i> Copiar
            </button>
          </div>
        </div>

        <!-- BUSINESS -->
        <div class="card" style="border: 2px solid #F59E0B;">
          <div style="text-align: center; padding: 16px 16px 0 16px;">
            <div style="font-size: 12px; font-weight: 700; color: #F59E0B; text-transform: uppercase; margin-bottom: 4px;">Business</div>
            <div style="font-size: 32px; font-weight: 800; color: #F59E0B; line-height: 1;">950</div>
            <div style="font-size: 12px; color: #666; margin-bottom: 10px;">MEGA</div>
            <div style="background: #FEF3C7; padding: 10px; border-radius: 8px; margin-bottom: 10px;">
              <div style="font-size: 24px; font-weight: 800; color: #F59E0B;">R$ 389<span style="font-size: 16px;">,90</span></div>
              <div style="font-size: 10px; color: #666;">/mês</div>
            </div>
          </div>
          <div style="padding: 0 16px 16px 16px; font-size: 11px;">
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> IPv4 FIXO</div>
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Instalação grátis</div>
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Roteador WiFi+</div>
            <div style="margin-bottom: 4px;"><i class="fas fa-check" style="color: #10B981;"></i> Assistência Prioritária</div>
            <div style="margin-bottom: 10px;"><i class="fas fa-check" style="color: #10B981;"></i> Corporate</div>
            <button onclick="copiarPlano('business-emp')" style="width: 100%; padding: 8px; background: #F59E0B; color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12px;">
              <i class="fas fa-copy"></i> Copiar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Ferramentas Compactas -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
      <a href="/playbook${tenantQuery}" class="card" style="text-decoration: none; color: inherit; text-align: center; padding: 16px;">
        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FF6B35, #FF8C42); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
          <i class="fas fa-book-open" style="font-size: 20px; color: white;"></i>
        </div>
        <div style="font-weight: 700; font-size: 13px;">Playbook</div>
        <div style="font-size: 11px; color: #666;">Processo completo</div>
      </a>

      <a href="/playbook/scripts${tenantQuery}" class="card" style="text-decoration: none; color: inherit; text-align: center; padding: 16px;">
        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #FFD700, #FDE047); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
          <i class="fas fa-comment-dots" style="font-size: 20px; color: #1F2937;"></i>
        </div>
        <div style="font-weight: 700; font-size: 13px;">Scripts</div>
        <div style="font-size: 11px; color: #666;">Mensagens prontas</div>
      </a>

      <a href="/playbook/objecoes${tenantQuery}" class="card" style="text-decoration: none; color: inherit; text-align: center; padding: 16px;">
        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #EF4444, #F87171); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
          <i class="fas fa-shield-alt" style="font-size: 20px; color: white;"></i>
        </div>
        <div style="font-weight: 700; font-size: 13px;">Objeções</div>
        <div style="font-size: 11px; color: #666;">Tratamento</div>
      </a>

      <a href="/clientes${tenantQuery}" class="card" style="text-decoration: none; color: inherit; text-align: center; padding: 16px;">
        <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #EF4444, #F87171); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px;">
          <i class="fas fa-users" style="font-size: 20px; color: white;"></i>
        </div>
        <div style="font-weight: 700; font-size: 13px;">Pipeline</div>
        <div style="font-size: 11px; color: #666;">Gestão de vendas</div>
      </a>
    </div>

    <!-- Diferenciais Compactos -->
    <div class="card" style="background: linear-gradient(135deg, #1F2937, #374151); color: white; padding: 20px; margin-bottom: 24px;">
      <h3 style="font-size: 16px; font-weight: 700; margin: 0 0 16px 0; text-align: center;"><i class="fas fa-bolt"></i> Diferenciais New Oeste</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; font-size: 12px;">
        <div><i class="fas fa-check-circle" style="color: #10B981;"></i> Fibra FTTH real</div>
        <div><i class="fas fa-check-circle" style="color: #10B981;"></i> Empresa local</div>
        <div><i class="fas fa-check-circle" style="color: #10B981;"></i> Instalação 72h</div>
        <div><i class="fas fa-check-circle" style="color: #10B981;"></i> Suporte 24/7</div>
        <div><i class="fas fa-check-circle" style="color: #10B981;"></i> Sem taxas extras</div>
        <div><i class="fas fa-check-circle" style="color: #10B981;"></i> Super App Connect</div>
      </div>
    </div>

    <script>
      // Estado do quiz
      let quizState = { tipo: null, pessoas: null, uso: null };

      // Textos para WhatsApp
      const planosWhatsApp = {
        'prime-res': \`*NEW OESTE - PLANO PRIME*

> 800 MEGA de velocidade
> R$ 69,90/mês (Fev e Mar)
> Depois R$ 119,90/mês

INCLUSO:
• Instalação GRÁTIS
• Roteador WiFi+ incluso
• Watch+ com 30 canais ao vivo
• App NEW OESTE CONNECT com descontos

Fibra óptica até sua casa!
Quer agendar a instalação?\`,
        'max-res': \`*NEW OESTE - PLANO MAX*

> 850 MEGA de velocidade
> R$ 139,90/mês

*HBO MAX INCLUSO!*
Plano Standard (2 dispositivos Full HD)

INCLUSO:
• Instalação GRÁTIS
• Roteador WiFi+ incluso
• Watch+ com 30 canais ao vivo
• Assistência Premium
• App com descontos

Nosso plano MAIS VENDIDO!
Vamos fechar?\`,
        'elite-res': \`*NEW OESTE - PLANO ELITE*

> 950 MEGA de velocidade
> R$ 159,90/mês

INCLUSO:
• Instalação GRÁTIS
• Roteador WiFi+ incluso
• Watch+ com 30 canais ao vivo
• Assistência PRIORITÁRIA
• App Premium com descontos VIP

O melhor plano residencial!
Garanta já o seu!\`,
        'prime-emp': \`*NEW OESTE EMPRESARIAL - PRIME*

> 800 MEGA de velocidade
> R$ 119,90/mês

INCLUSO:
• Instalação GRÁTIS
• Roteador WiFi+ incluso
• Assistência Premium

Ideal para pequenos negócios!
Posso agendar a visita técnica?\`,
        'elite-emp': \`*NEW OESTE EMPRESARIAL - ELITE*

> 950 MEGA de velocidade
> R$ 159,90/mês

INCLUSO:
• Instalação GRÁTIS
• Roteador WiFi+ incluso
• Assistência PRIORITÁRIA
• Acesso Corporate

Internet profissional!
Vamos agendar?\`,
        'starter-emp': \`*NEW OESTE - BUSINESS STARTER*

> 800 MEGA de velocidade
> R$ 289,90/mês

*IPv4 FIXO INCLUSO*

INCLUSO:
• Instalação GRÁTIS
• Roteador WiFi+ incluso
• Assistência Premium

Perfeito para empresas que precisam de IP fixo!
Quer mais detalhes?\`,
        'business-emp': \`*NEW OESTE - BUSINESS*

> 950 MEGA de velocidade
> R$ 389,90/mês

*IPv4 FIXO INCLUSO*

INCLUSO:
• Instalação GRÁTIS
• Roteador WiFi+ incluso
• Assistência PRIORITÁRIA
• Acesso Corporate

Nosso plano empresarial TOP!
Posso enviar a proposta formal?\`
      };

      function setTipo(tipo) {
        quizState.tipo = tipo;
        document.querySelectorAll('[id^="btn-residencial"], [id^="btn-empresarial"]').forEach(btn => {
          btn.style.background = 'rgba(255,255,255,0.2)';
          btn.style.borderColor = 'rgba(255,255,255,0.3)';
        });
        document.getElementById('btn-' + tipo).style.background = 'rgba(255,255,255,0.3)';
        document.getElementById('btn-' + tipo).style.borderColor = 'white';
      }

      function setPessoas(num) {
        quizState.pessoas = num;
        // Reset todos os botões de pessoas
        ['btn-1', 'btn-3', 'btn-6', 'btn-11'].forEach(id => {
          const btn = document.getElementById(id);
          if (btn) {
            btn.style.background = 'rgba(255,255,255,0.2)';
            btn.style.borderColor = 'rgba(255,255,255,0.3)';
          }
        });
        // Destacar o selecionado
        const selected = document.getElementById('btn-' + num);
        if (selected) {
          selected.style.background = 'rgba(255,255,255,0.3)';
          selected.style.borderColor = 'white';
        }
      }

      function setUso(uso) {
        quizState.uso = uso;
        document.querySelectorAll('[id^="btn-trabalho"], [id^="btn-streaming"], [id^="btn-jogos"], [id^="btn-misto"]').forEach(btn => {
          btn.style.background = 'rgba(255,255,255,0.2)';
          btn.style.borderColor = 'rgba(255,255,255,0.3)';
        });
        document.getElementById('btn-' + uso).style.background = 'rgba(255,255,255,0.3)';
        document.getElementById('btn-' + uso).style.borderColor = 'white';
      }

      function calcularPlano() {
        const { tipo, pessoas, uso } = quizState;

        if (!tipo || !pessoas || !uso) {
          alert('Por favor, responda todas as perguntas!');
          return;
        }

        let plano = {};

        if (tipo === 'residencial') {
          if (pessoas <= 2 && uso !== 'jogos') {
            plano = { nome: 'PRIME', velocidade: '800 MEGA', preco: 'R$ 69,90/mês', beneficios: '• Perfeito para 1-2 pessoas\\n• Streaming em HD\\n• Navegação rápida\\n• Instalação grátis + WiFi+' };
          } else if (pessoas <= 5 || uso === 'streaming') {
            plano = { nome: 'MAX', velocidade: '850 MEGA', preco: 'R$ 139,90/mês', beneficios: '• MAIS VENDIDO\\n• HBO MAX INCLUSO\\n• Perfeito para 3-5 pessoas\\n• Múltiplos streamings 4K\\n• Watch+ 30 canais' };
          } else {
            plano = { nome: 'ELITE', velocidade: '950 MEGA', preco: 'R$ 159,90/mês', beneficios: '• PREMIUM\\n• Ideal para 6+ pessoas\\n• Jogos online sem lag\\n• Home office profissional\\n• Assistência prioritária' };
          }
        } else {
          if (pessoas <= 5) {
            plano = { nome: 'PRIME EMPRESARIAL', velocidade: '800 MEGA', preco: 'R$ 119,90/mês', beneficios: '• Pequenos negócios\\n• Até 5 funcionários\\n• Assistência Premium\\n• Instalação grátis' };
          } else if (pessoas <= 10 && uso !== 'misto') {
            plano = { nome: 'ELITE EMPRESARIAL', velocidade: '950 MEGA', preco: 'R$ 159,90/mês', beneficios: '• Médias empresas\\n• Até 10 funcionários\\n• Assistência prioritária\\n• Acesso Corporate' };
          } else if (pessoas <= 10) {
            plano = { nome: 'BUSINESS STARTER', velocidade: '800 MEGA', preco: 'R$ 289,90/mês', beneficios: '• Com IPv4 FIXO\\n• Perfeito para servidores\\n• Acesso remoto\\n• Assistência Premium' };
          } else {
            plano = { nome: 'BUSINESS', velocidade: '950 MEGA', preco: 'R$ 389,90/mês', beneficios: '• Empresas grandes\\n• IPv4 FIXO\\n• 10+ funcionários\\n• Assistência prioritária\\n• Corporate' };
          }
        }

        document.getElementById('plano-nome').textContent = plano.nome;
        document.getElementById('plano-velocidade').textContent = plano.velocidade;
        document.getElementById('plano-preco').textContent = plano.preco;
        document.getElementById('plano-beneficios').innerHTML = plano.beneficios.replace(/\\n/g, '<br>');
        document.getElementById('resultado-quiz').style.display = 'block';

        window.planoRecomendado = \`*PLANO RECOMENDADO PARA VOCÊ*

*\${plano.nome}*
> \${plano.velocidade}
> \${plano.preco}

\${plano.beneficios.replace(/<br>/g, '\\n')}

*NEW OESTE TELECOM*
Fibra óptica de verdade!

Quer agendar a instalação?\`;
      }

      function copiarResultado() {
        if (window.planoRecomendado) {
          navigator.clipboard.writeText(window.planoRecomendado).then(() => {
            alert('Texto copiado! Cole no WhatsApp do cliente.');
          });
        }
      }

      function copiarPlano(planoId) {
        const texto = planosWhatsApp[planoId];
        navigator.clipboard.writeText(texto).then(() => {
          alert('✅ Texto copiado! Cole no WhatsApp do cliente.');
        });
      }
    </script>
  `;

  return layout('Visão Geral', content, 'home', config);
}

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
