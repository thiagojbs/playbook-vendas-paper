import { layout } from '../templates/layout.js';
// Imports padrao (Paper Vines) - fallback
import { PROCESSO_VENDAS as PV_PROCESSO, SCRIPTS as PV_SCRIPTS, OBJECOES as PV_OBJECOES, CHECKLIST_COMERCIAL as PV_CHECKLIST_COMERCIAL, CHECKLIST_CONTRATO as PV_CHECKLIST_CONTRATO, LINKS_UTEIS as PV_LINKS } from '../data/playbook.js';
import { PLANOS_CHATBOTS, PLANOS_TELECOM, PLANOS_IA } from '../data/precos.js';
import { OBJECOES_EXPANDIDAS as PV_OBJECOES_EXPANDIDAS, TECNICAS_GERAIS as PV_TECNICAS, GATILHOS_MENTAIS as PV_GATILHOS, DIFERENCIAIS as PV_DIFERENCIAIS, ESTATISTICAS_PAPERVINES } from '../data/objecoes.js';
import { ETAPAS_FUNIL as PV_ETAPAS, SCRIPTS_STATS as PV_SCRIPTS_STATS, SEQUENCIAS_COMPLETAS as PV_SEQUENCIAS, DICAS_COMUNICACAO as PV_DICAS, TEMPLATES_SEGMENTO as PV_TEMPLATES } from '../data/scripts.js';
import { POLITICAS_WHATSAPP, POLITICAS_META_ANUNCIOS, PRECOS_WHATSAPP, REQUISITOS_API_EXPANDIDOS, FLUXO_IMPLANTACAO, PERGUNTAS_FREQUENTES, DIFERENCIAIS_PAPERVINES, LINKS_IMPORTANTES } from '../data/playbook-expandido.js';
import { AGENTES_INFO, TIPOS_AGENTES, AGENTES_EXEMPLOS, VERTICAIS, METRICAS_GERAIS, COMPARATIVO_HUMANO, FERRAMENTAS_DISPONIVEIS } from '../data/agentes.js';
// Cabelo e Saude - Playbook 2025
import { PLAYBOOK_2025, PROCESSO_VENDAS as CS_PROCESSO, SCRIPTS as CS_SCRIPTS, OBJECOES as CS_OBJECOES, CHECKLIST_COMERCIAL as CS_CHECKLIST, DIFERENCIAIS as CS_DIFERENCIAIS, TIPOS_TRATAMENTO as CS_TIPOS_TRATAMENTO, LINKS_UTEIS as CS_LINKS } from '../data/tenants/cabeloesaude/playbook.js';
import { MODULOS_PLAYBOOK, FRASES_IMPACTO } from '../data/tenants/cabeloesaude/scripts.js';
import { objecoes } from '../data/tenants/cabeloesaude/objecoes.js';

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
  DIFERENCIAIS = playbook.DIFERENCIAIS || objecoes.DIFERENCIAIS || PV_DIFERENCIAIS;

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
  else if (path.includes('/objecoes')) {
    // Renderizar objecoes especifico do tenant
    if (tenantId === 'cabeloesaude') {
      content = renderObjecoesCabeloeSaude();
    } else {
      content = renderObjecoes();
    }
    activeMenu = 'objecoes';
  }
  else if (path.includes('/agentes') || path.includes('/planos')) { content = renderAgentes(); activeMenu = 'planos'; }
  else {
    // Renderizar playbook especifico do tenant
    if (tenantId === 'cabeloesaude') {
      content = renderPlaybookCabeloeSaude();
    } else if (tenantId === 'newoeste') {
      content = renderPlaybookNewOeste();
    } else {
      content = renderPlaybookMain();
    }
  }
  return layout('Playbook', content, activeMenu, tenantConfig);
}

// ========================================
// NEW OESTE - Playbook Telecom/ISP
// ========================================
function renderPlaybookNewOeste() {
  const empresaNome = tenantConfig.nome || 'New Oeste';
  const tenantQuery = tenantConfig.id ? `?tenant=${tenantConfig.id}` : '';

  return `
    <!-- Hero Section -->
    <div style="background: linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FF8C42 100%); border-radius: 16px; padding: 32px; margin-bottom: 24px; color: white;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-book-open" style="font-size: 22px;"></i>
        </div>
        <div>
          <h1 style="font-size: 24px; font-weight: 800; margin: 0;">Playbook de Vendas</h1>
          <p style="font-size: 14px; margin: 0; opacity: 0.95;">Processo completo para fechar mais contratos</p>
        </div>
      </div>
    </div>

    <!-- Indice Rapido -->
    <div class="card" style="margin-bottom: 24px; padding: 20px;">
      <h2 style="font-size: 16px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-list" style="color: #FF6B35;"></i> Índice Rápido
      </h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
        <a href="#processo" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #FFF4E6; border-radius: 8px; text-decoration: none; color: #FF6B35; font-size: 13px; font-weight: 600;">
          <i class="fas fa-route"></i> Processo de Vendas
        </a>
        <a href="#diferenciais" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #FFF9E6; border-radius: 8px; text-decoration: none; color: #FFD700; font-size: 13px; font-weight: 600;">
          <i class="fas fa-star"></i> Diferenciais
        </a>
        <a href="#scripts" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #FFF4E6; border-radius: 8px; text-decoration: none; color: #F59E0B; font-size: 13px; font-weight: 600;">
          <i class="fas fa-comment-dots"></i> Scripts
        </a>
        <a href="#objecoes" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #FEE2E2; border-radius: 8px; text-decoration: none; color: #EF4444; font-size: 13px; font-weight: 600;">
          <i class="fas fa-shield-alt"></i> Objeções
        </a>
        <a href="#tecnicas" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #DBEAFE; border-radius: 8px; text-decoration: none; color: #3B82F6; font-size: 13px; font-weight: 600;">
          <i class="fas fa-brain"></i> Técnicas
        </a>
        <a href="#checklist" style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: #D1FAE5; border-radius: 8px; text-decoration: none; color: #10B981; font-size: 13px; font-weight: 600;">
          <i class="fas fa-check-square"></i> Checklist
        </a>
      </div>
    </div>

    <!-- Processo de Vendas -->
    <div id="processo" class="card" style="margin-bottom: 24px; padding: 24px;">
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-route" style="color: #FF6B35;"></i> Processo de Vendas - 5 Etapas
      </h2>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Etapa 1: Prospecção -->
        <div style="border-left: 4px solid #FF6B35; padding-left: 16px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 32px; height: 32px; background: #FF6B35; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px;">1</div>
            <h3 style="font-size: 16px; font-weight: 700; margin: 0;">Prospecção e Qualificação</h3>
          </div>
          <div style="font-size: 13px; color: #666; margin-bottom: 12px;">Identificar leads qualificados e entender necessidades do cliente</div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            <div style="padding: 10px; background: #FFF4E6; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #FF6B35;"></i> Verificar cobertura no endereço
            </div>
            <div style="padding: 10px; background: #FFF4E6; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #FF6B35;"></i> Identificar concorrente atual
            </div>
            <div style="padding: 10px; background: #FFF4E6; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #FF6B35;"></i> Entender uso principal (trabalho/streaming/jogos)
            </div>
            <div style="padding: 10px; background: #FFF4E6; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #FF6B35;"></i> Mapear número de usuários/dispositivos
            </div>
          </div>
        </div>

        <!-- Etapa 2: Apresentação -->
        <div style="border-left: 4px solid #FFD700; padding-left: 16px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 32px; height: 32px; background: #FFD700; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1F2937; font-weight: 700; font-size: 14px;">2</div>
            <h3 style="font-size: 16px; font-weight: 700; margin: 0;">Apresentação da Solução</h3>
          </div>
          <div style="font-size: 13px; color: #666; margin-bottom: 12px;">Mostrar como New Oeste resolve as dores do cliente</div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            <div style="padding: 10px; background: #FFF9E6; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #FFD700;"></i> Apresentar plano ideal (usar quiz)
            </div>
            <div style="padding: 10px; background: #FFF9E6; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #FFD700;"></i> Enfatizar fibra FTTH real
            </div>
            <div style="padding: 10px; background: #FFF9E6; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #FFD700;"></i> Destacar empresa local de Foz
            </div>
            <div style="padding: 10px; background: #FFF9E6; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #FFD700;"></i> Mencionar bônus (Watch+, WiFi+, App)
            </div>
          </div>
        </div>

        <!-- Etapa 3: Demonstração Técnica -->
        <div style="border-left: 4px solid #F59E0B; padding-left: 16px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 32px; height: 32px; background: #F59E0B; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px;">3</div>
            <h3 style="font-size: 16px; font-weight: 700; margin: 0;">Demonstração Técnica</h3>
          </div>
          <div style="font-size: 13px; color: #666; margin-bottom: 12px;">Explicar aspectos técnicos que diferenciam New Oeste</div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            <div style="padding: 10px; background: #FFF7ED; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #F59E0B;"></i> Explicar fibra vs cabo/rádio
            </div>
            <div style="padding: 10px; background: #FFF7ED; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #F59E0B;"></i> Mostrar velocidade simétrica
            </div>
            <div style="padding: 10px; background: #FFF7ED; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #F59E0B;"></i> Demonstrar app New Oeste Connect
            </div>
            <div style="padding: 10px; background: #FFF7ED; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #F59E0B;"></i> Explicar suporte 24/7
            </div>
          </div>
        </div>

        <!-- Etapa 4: Fechamento -->
        <div style="border-left: 4px solid #EF4444; padding-left: 16px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 32px; height: 32px; background: #EF4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px;">4</div>
            <h3 style="font-size: 16px; font-weight: 700; margin: 0;">Fechamento</h3>
          </div>
          <div style="font-size: 13px; color: #666; margin-bottom: 12px;">Superar objeções e fechar o contrato</div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            <div style="padding: 10px; background: #FEE2E2; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #EF4444;"></i> Tratar objeções de preço
            </div>
            <div style="padding: 10px; background: #FEE2E2; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #EF4444;"></i> Oferecer teste de velocidade
            </div>
            <div style="padding: 10px; background: #FEE2E2; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #EF4444;"></i> Criar senso de urgência (promoção)
            </div>
            <div style="padding: 10px; background: #FEE2E2; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #EF4444;"></i> Fechar data de instalação
            </div>
          </div>
        </div>

        <!-- Etapa 5: Pós-Venda -->
        <div style="border-left: 4px solid #10B981; padding-left: 16px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 32px; height: 32px; background: #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px;">5</div>
            <h3 style="font-size: 16px; font-weight: 700; margin: 0;">Pós-Venda e Follow-up</h3>
          </div>
          <div style="font-size: 13px; color: #666; margin-bottom: 12px;">Garantir instalação e satisfação do cliente</div>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
            <div style="padding: 10px; background: #D1FAE5; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #10B981;"></i> Confirmar dados e agendamento
            </div>
            <div style="padding: 10px; background: #D1FAE5; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #10B981;"></i> Acompanhar instalação técnica
            </div>
            <div style="padding: 10px; background: #D1FAE5; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #10B981;"></i> Ligar 24h pós-instalação
            </div>
            <div style="padding: 10px; background: #D1FAE5; border-radius: 6px; font-size: 12px;">
              <i class="fas fa-check" style="color: #10B981;"></i> Pedir indicações e avaliação
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Diferenciais New Oeste -->
    <div id="diferenciais" class="card" style="margin-bottom: 24px; padding: 24px;">
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-star" style="color: #FFD700;"></i> Diferenciais Competitivos
      </h2>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div style="padding: 16px; background: linear-gradient(135deg, rgba(255,107,53,0.1), rgba(255,215,0,0.1)); border: 1px solid #FF6B35; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 40px; height: 40px; background: #FF6B35; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-network-wired" style="color: white; font-size: 18px;"></i>
            </div>
            <h3 style="font-size: 15px; font-weight: 700; margin: 0;">Fibra FTTH Real</h3>
          </div>
          <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Fibra óptica até dentro da casa do cliente. Não é cabo coaxial nem rádio. Velocidade real e estável 24/7.</p>
        </div>

        <div style="padding: 16px; background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(245,158,11,0.1)); border: 1px solid #FFD700; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 40px; height: 40px; background: #FFD700; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-map-marker-alt" style="color: #1F2937; font-size: 18px;"></i>
            </div>
            <h3 style="font-size: 15px; font-weight: 700; margin: 0;">Empresa Local</h3>
          </div>
          <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Nascemos em Foz do Iguaçu. Conhecemos a cidade e atendemos nossos vizinhos. Suporte rápido e próximo.</p>
        </div>

        <div style="padding: 16px; background: linear-gradient(135deg, rgba(239,68,68,0.1), rgba(248,113,113,0.1)); border: 1px solid #EF4444; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 40px; height: 40px; background: #EF4444; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-clock" style="color: white; font-size: 18px;"></i>
            </div>
            <h3 style="font-size: 15px; font-weight: 700; margin: 0;">Instalação em 72h</h3>
          </div>
          <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Cliente não espera semanas. Instalação agendada e realizada em até 3 dias úteis após aprovação.</p>
        </div>

        <div style="padding: 16px; background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(52,211,153,0.1)); border: 1px solid #10B981; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 40px; height: 40px; background: #10B981; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-headset" style="color: white; font-size: 18px;"></i>
            </div>
            <h3 style="font-size: 15px; font-weight: 700; margin: 0;">Suporte 24/7</h3>
          </div>
          <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Equipe técnica disponível todos os dias, 24 horas. Problema resolvido rápido, sem espera.</p>
        </div>

        <div style="padding: 16px; background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(129,140,248,0.1)); border: 1px solid #6366F1; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 40px; height: 40px; background: #6366F1; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-mobile-alt" style="color: white; font-size: 18px;"></i>
            </div>
            <h3 style="font-size: 15px; font-weight: 700; margin: 0;">App New Oeste Connect</h3>
          </div>
          <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.5;">App exclusivo com descontos em parceiros, teste de velocidade e gestão de conta na palma da mão.</p>
        </div>

        <div style="padding: 16px; background: linear-gradient(135deg, rgba(168,85,247,0.1), rgba(192,132,252,0.1)); border: 1px solid #A855F7; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 40px; height: 40px; background: #A855F7; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-dollar-sign" style="color: white; font-size: 18px;"></i>
            </div>
            <h3 style="font-size: 15px; font-weight: 700; margin: 0;">Sem Taxas Ocultas</h3>
          </div>
          <p style="font-size: 13px; color: #666; margin: 0; line-height: 1.5;">Preço transparente. Instalação grátis, WiFi+ incluso, sem cobrança de visita técnica.</p>
        </div>
      </div>
    </div>

    <!-- Scripts Principais -->
    <div id="scripts" class="card" style="margin-bottom: 24px; padding: 24px;">
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-comment-dots" style="color: #FF6B35;"></i> Scripts Principais
      </h2>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Script: Abordagem Inicial -->
        <div class="accordion">
          <div class="accordion-header">
            <div class="accordion-title">
              <i class="fas fa-phone" style="color: #FF6B35; margin-right: 8px;"></i>
              Abordagem Inicial - Primeiro Contato
            </div>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="background: #FFF4E6; padding: 16px; border-radius: 8px; border-left: 4px solid #FF6B35;">
              <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.6;">
                "Olá [Nome], tudo bem? Aqui é [Seu Nome] da <strong>New Oeste Telecom</strong>, empresa de internet fibra óptica de Foz do Iguaçu.<br><br>
                Vi que você está na [Bairro/Região] e tenho uma ótima notícia: acabamos de habilitar fibra FTTH na sua rua!<br><br>
                Posso te fazer 3 perguntinhas rápidas para ver se vale a pena você conhecer nossas condições?"
              </p>
              <div style="background: white; padding: 12px; border-radius: 6px; margin-top: 12px;">
                <strong style="font-size: 12px; color: #FF6B35;">OBJETIVO:</strong>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Criar curiosidade e qualificar rapidamente sem ser invasivo</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Script: Qualificação -->
        <div class="accordion">
          <div class="accordion-header">
            <div class="accordion-title">
              <i class="fas fa-clipboard-check" style="color: #FFD700; margin-right: 8px;"></i>
              Qualificação - 3 Perguntas Chave
            </div>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="background: #FFF9E6; padding: 16px; border-radius: 8px; border-left: 4px solid #FFD700;">
              <div style="margin-bottom: 16px;">
                <strong style="font-size: 13px;">1. Qual internet você usa hoje?</strong>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">→ Identificar concorrente e possíveis insatisfações</p>
              </div>
              <div style="margin-bottom: 16px;">
                <strong style="font-size: 13px;">2. Quantas pessoas usam a internet em casa/empresa?</strong>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">→ Dimensionar plano ideal</p>
              </div>
              <div style="margin-bottom: 16px;">
                <strong style="font-size: 13px;">3. Vocês usam mais para trabalho, streaming ou jogos?</strong>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">→ Personalizar argumentação</p>
              </div>
              <div style="background: white; padding: 12px; border-radius: 6px; margin-top: 12px;">
                <strong style="font-size: 12px; color: #FFD700;">DICA:</strong>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Use o quiz da Visão Geral para facilitar essa conversa!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Script: Apresentação do Plano -->
        <div class="accordion">
          <div class="accordion-header">
            <div class="accordion-title">
              <i class="fas fa-presentation" style="color: #F59E0B; margin-right: 8px;"></i>
              Apresentação do Plano
            </div>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="background: #FFF7ED; padding: 16px; border-radius: 8px; border-left: 4px solid #F59E0B;">
              <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.6;">
                "Perfeito! Pelo que você me contou, o plano ideal para você é o <strong>[NOME DO PLANO]</strong> de <strong>[VELOCIDADE]</strong>.<br><br>
                Olha só o que está incluso:<br>
                • Fibra óptica FTTH direto na sua casa<br>
                • Velocidade real de [X] MEGA (não é até, é garantido!)<br>
                • Roteador WiFi+ incluso<br>
                • Instalação completamente GRÁTIS<br>
                • Suporte 24/7 com equipe local<br>
                • App New Oeste Connect com descontos<br><br>
                E o melhor: <strong>R$ [PREÇO]/mês</strong>. [Se tiver promoção: "E neste mês ainda temos uma condição especial!"]<br><br>
                A instalação sai em até 72 horas. Posso agendar para você?"
              </p>
              <div style="background: white; padding: 12px; border-radius: 6px; margin-top: 12px;">
                <strong style="font-size: 12px; color: #F59E0B;">IMPORTANTE:</strong>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Sempre mencionar que é fibra FTTH real, não cabo ou rádio</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Script: Fechamento -->
        <div class="accordion">
          <div class="accordion-header">
            <div class="accordion-title">
              <i class="fas fa-check-circle" style="color: #10B981; margin-right: 8px;"></i>
              Fechamento - Assumir a Venda
            </div>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <div style="background: #D1FAE5; padding: 16px; border-radius: 8px; border-left: 4px solid #10B981;">
              <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 1.6;">
                <strong>Técnica do fechamento assumido:</strong><br><br>
                "Ótimo! Então vou te colocar aqui para instalação na [Terça/Quinta/etc]. Você prefere período da manhã ou tarde?"<br><br>
                <strong>OU:</strong><br><br>
                "Perfeito! Vou precisar de alguns dados para agilizar sua instalação: CPF, RG e um comprovante de endereço. Pode ser conta de luz ou água. Você tem aí?"<br><br>
                <strong>Frase de urgência:</strong><br>
                "Ah, e só lembrando: essa promoção de [BENEFÍCIO] é válida só até [DATA]. Por isso é bom a gente agendar logo para você não perder!"
              </p>
              <div style="background: white; padding: 12px; border-radius: 6px; margin-top: 12px;">
                <strong style="font-size: 12px; color: #10B981;">MINDSET:</strong>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Não pergunte "quer fechar?". Assuma que o cliente já decidiu e parta para os próximos passos!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Objeções Mais Comuns -->
    <div id="objecoes" class="card" style="margin-bottom: 24px; padding: 24px;">
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-shield-alt" style="color: #EF4444;"></i> Objeções Mais Comuns
      </h2>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <!-- Objeção 1: Preço -->
        <div style="border: 1px solid #FEE2E2; border-radius: 10px; overflow: hidden;">
          <div style="background: #FEE2E2; padding: 12px; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-dollar-sign" style="color: #EF4444;"></i>
            <strong style="font-size: 14px;">"Está muito caro"</strong>
          </div>
          <div style="padding: 16px; background: white;">
            <p style="margin: 0 0 10px 0; font-size: 13px; color: #666; line-height: 1.5;">
              <strong style="color: #EF4444;">Resposta:</strong><br>
              "Entendo! E eu concordo que tem opções mais baratas no mercado. Mas deixa eu te explicar uma coisa importante: essas empresas mais baratas geralmente são rádio ou cabo coaxial. A internet cai quando chove, a velocidade não é real.<br><br>
              A New Oeste é <strong>fibra FTTH</strong> - a fibra vai até dentro da sua casa. É a mesma tecnologia que grandes empresas usam. Velocidade estável 24/7, não importa se está chovendo ou se o vizinho está usando.<br><br>
              Pensa comigo: você vai economizar R$ 20-30 reais por mês mas vai ficar nervoso toda vez que cair ou travar? Vale a pena? Além disso, a instalação é grátis e o roteador WiFi+ já está incluso."
            </p>
            <div style="background: #FFF4E6; padding: 10px; border-radius: 6px; font-size: 12px; margin-top: 12px;">
              <strong>TÉCNICA:</strong> Educar sobre diferença técnica + mostrar custo-benefício
            </div>
          </div>
        </div>

        <!-- Objeção 2: Já tenho internet -->
        <div style="border: 1px solid #FEE2E2; border-radius: 10px; overflow: hidden;">
          <div style="background: #FEE2E2; padding: 12px; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-wifi" style="color: #EF4444;"></i>
            <strong style="font-size: 14px;">"Já tenho internet e estou satisfeito"</strong>
          </div>
          <div style="padding: 16px; background: white;">
            <p style="margin: 0 0 10px 0; font-size: 13px; color: #666; line-height: 1.5;">
              <strong style="color: #EF4444;">Resposta:</strong><br>
              "Que ótimo que você está satisfeito! Posso te fazer uma pergunta? Você já testou a velocidade real da sua internet? Muitas vezes contratamos 200 mega mas na prática chega só 80-100.<br><br>
              A New Oeste tem uma diferença: nossa velocidade é <strong>garantida</strong>. Se você contratar 800 mega, você vai ter 800 mega reais. E como somos de Foz, qualquer problema é resolvido rápido - não precisa esperar técnico de Curitiba ou São Paulo.<br><br>
              Sem compromisso: que tal eu agendar uma instalação? Você usa por 7 dias e compara com a sua internet atual. Se não gostar, pode cancelar sem custo. O que acha?"
            </p>
            <div style="background: #FFF4E6; padding: 10px; border-radius: 6px; font-size: 12px; margin-top: 12px;">
              <strong>TÉCNICA:</strong> Criar dúvida sobre qualidade atual + oferecer teste sem risco
            </div>
          </div>
        </div>

        <!-- Objeção 3: Fidelização -->
        <div style="border: 1px solid #FEE2E2; border-radius: 10px; overflow: hidden;">
          <div style="background: #FEE2E2; padding: 12px; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-lock" style="color: #EF4444;"></i>
            <strong style="font-size: 14px;">"Não quero ficar preso em contrato de fidelidade"</strong>
          </div>
          <div style="padding: 16px; background: white;">
            <p style="margin: 0 0 10px 0; font-size: 13px; color: #666; line-height: 1.5;">
              <strong style="color: #EF4444;">Resposta:</strong><br>
              "Perfeito, eu te entendo completamente! A boa notícia: a New Oeste trabalha com fidelidade de apenas <strong>12 meses</strong>, que é o padrão do mercado para amortizar a instalação gratuita.<br><br>
              Mas olha só: se você se fidelizou com outra empresa, é porque eles te ofereceram algum benefício, certo? Aqui é a mesma coisa - você ganha instalação grátis, WiFi+ incluso e preço promocional.<br><br>
              E pensa: se a internet é boa mesmo, você não vai querer trocar. Nossos clientes ficam em média 3-4 anos conosco, não por contrato, mas porque a qualidade é diferenciada. O contrato é só uma formalidade."
            </p>
            <div style="background: #FFF4E6; padding: 10px; border-radius: 6px; font-size: 12px; margin-top: 12px;">
              <strong>TÉCNICA:</strong> Minimizar importância da fidelidade + justificar com benefícios recebidos
            </div>
          </div>
        </div>

        <!-- Objeção 4: Vou pensar -->
        <div style="border: 1px solid #FEE2E2; border-radius: 10px; overflow: hidden;">
          <div style="background: #FEE2E2; padding: 12px; display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-clock" style="color: #EF4444;"></i>
            <strong style="font-size: 14px;">"Vou pensar e te dou um retorno"</strong>
          </div>
          <div style="padding: 16px; background: white;">
            <p style="margin: 0 0 10px 0; font-size: 13px; color: #666; line-height: 1.5;">
              <strong style="color: #EF4444;">Resposta:</strong><br>
              "Claro, super tranquilo! Só para eu te ajudar melhor: tem alguma dúvida específica que ficou? Ou você quer comparar com outra empresa?<br><br>
              [Se disser que vai comparar]<br>
              'Perfeito! Deixa eu te dar uma dica: quando for comparar, pergunta se é fibra FTTH real ou se é cabo/rádio. E pergunta também se a velocidade é garantida ou se é 'até'. Faz muita diferença!<br><br>
              Ah, e só um aviso: essa promoção de [BENEFÍCIO] vale só até [DATA]. Se você decidir depois, pode ser que não tenha mais essa condição. Por isso é bom garantir a sua vaga agora e depois você decide se fica ou não. O que acha?'"
            </p>
            <div style="background: #FFF4E6; padding: 10px; border-radius: 6px; font-size: 12px; margin-top: 12px;">
              <strong>TÉCNICA:</strong> Descobrir objeção real + criar senso de urgência
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Técnicas de Vendas -->
    <div id="tecnicas" class="card" style="margin-bottom: 24px; padding: 24px;">
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-brain" style="color: #3B82F6;"></i> Técnicas e Gatilhos Mentais
      </h2>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div style="padding: 16px; border: 2px solid #DBEAFE; border-radius: 10px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 36px; height: 36px; background: #3B82F6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-bolt" style="color: white; font-size: 16px;"></i>
            </div>
            <strong style="font-size: 14px;">Escassez</strong>
          </div>
          <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">Criar senso de urgência sobre disponibilidade ou promoção</p>
          <div style="background: #EFF6FF; padding: 10px; border-radius: 6px; font-size: 11px; font-style: italic;">
            "Temos só 5 vagas para instalação esta semana no seu bairro..."
          </div>
        </div>

        <div style="padding: 16px; border: 2px solid #DBEAFE; border-radius: 10px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 36px; height: 36px; background: #3B82F6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-users" style="color: white; font-size: 16px;"></i>
            </div>
            <strong style="font-size: 14px;">Prova Social</strong>
          </div>
          <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">Mostrar que outros clientes já confiam</p>
          <div style="background: #EFF6FF; padding: 10px; border-radius: 6px; font-size: 11px; font-style: italic;">
            "Mais de 3.000 famílias em Foz já usam New Oeste..."
          </div>
        </div>

        <div style="padding: 16px; border: 2px solid #DBEAFE; border-radius: 10px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 36px; height: 36px; background: #3B82F6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-gift" style="color: white; font-size: 16px;"></i>
            </div>
            <strong style="font-size: 14px;">Bônus</strong>
          </div>
          <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">Destacar o que vem incluso sem custo adicional</p>
          <div style="background: #EFF6FF; padding: 10px; border-radius: 6px; font-size: 11px; font-style: italic;">
            "Instalação grátis + WiFi+ incluso + Watch+ com 30 canais..."
          </div>
        </div>

        <div style="padding: 16px; border: 2px solid #DBEAFE; border-radius: 10px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 36px; height: 36px; background: #3B82F6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-map-marker-alt" style="color: white; font-size: 16px;"></i>
            </div>
            <strong style="font-size: 14px;">Proximidade</strong>
          </div>
          <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">Reforçar que somos empresa local de Foz</p>
          <div style="background: #EFF6FF; padding: 10px; border-radius: 6px; font-size: 11px; font-style: italic;">
            "Somos daqui de Foz. Se der problema, resolvemos rápido..."
          </div>
        </div>

        <div style="padding: 16px; border: 2px solid #DBEAFE; border-radius: 10px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 36px; height: 36px; background: #3B82F6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-chart-line" style="color: white; font-size: 16px;"></i>
            </div>
            <strong style="font-size: 14px;">Comparação</strong>
          </div>
          <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">Mostrar diferença técnica vs concorrentes</p>
          <div style="background: #EFF6FF; padding: 10px; border-radius: 6px; font-size: 11px; font-style: italic;">
            "Fibra FTTH vs cabo coaxial: velocidade real vs 'até'..."
          </div>
        </div>

        <div style="padding: 16px; border: 2px solid #DBEAFE; border-radius: 10px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            <div style="width: 36px; height: 36px; background: #3B82F6; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-shield-alt" style="color: white; font-size: 16px;"></i>
            </div>
            <strong style="font-size: 14px;">Garantia</strong>
          </div>
          <p style="font-size: 12px; color: #666; margin: 0 0 8px 0;">Reduzir risco percebido pelo cliente</p>
          <div style="background: #EFF6FF; padding: 10px; border-radius: 6px; font-size: 11px; font-style: italic;">
            "Se não gostar em 7 dias, cancelamos sem custo..."
          </div>
        </div>
      </div>
    </div>

    <!-- Checklist de Vendas -->
    <div id="checklist" class="card" style="margin-bottom: 24px; padding: 24px;">
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-check-square" style="color: #10B981;"></i> Checklist de Vendas
      </h2>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- Checklist Pré-Venda -->
        <div>
          <h3 style="font-size: 15px; font-weight: 700; margin: 0 0 12px 0; color: #FF6B35;">
            <i class="fas fa-clipboard-list"></i> Pré-Venda
          </h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Verificar cobertura no endereço
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Identificar concorrente atual
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Fazer 3 perguntas de qualificação
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Usar quiz para recomendar plano
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Explicar fibra FTTH vs cabo/rádio
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Destacar empresa local de Foz
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Mencionar bônus (WiFi+, Watch+, App)
            </label>
          </div>
        </div>

        <!-- Checklist Fechamento -->
        <div>
          <h3 style="font-size: 15px; font-weight: 700; margin: 0 0 12px 0; color: #10B981;">
            <i class="fas fa-handshake"></i> Fechamento
          </h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Tratar todas objeções
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Criar senso de urgência
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Confirmar CPF e RG do titular
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Solicitar comprovante de endereço
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Agendar data e período instalação
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Confirmar telefone para contato
            </label>
            <label style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #F9FAFB; border-radius: 6px; cursor: pointer; font-size: 13px;">
              <input type="checkbox" style="width: 18px; height: 18px;">
              Cadastrar no sistema/CRM
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Links Úteis -->
    <div class="card" style="padding: 24px;">
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
        <i class="fas fa-link" style="color: #6366F1;"></i> Links Úteis
      </h2>

      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <a href="/playbook/scripts${tenantQuery}" style="display: flex; align-items: center; gap: 12px; padding: 14px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; text-decoration: none; color: inherit;">
          <i class="fas fa-comment-dots" style="color: #FF6B35; font-size: 18px;"></i>
          <div>
            <div style="font-weight: 600; font-size: 13px;">Scripts Completos</div>
            <div style="font-size: 11px; color: #666;">Todas as mensagens prontas</div>
          </div>
        </a>

        <a href="/playbook/objecoes${tenantQuery}" style="display: flex; align-items: center; gap: 12px; padding: 14px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; text-decoration: none; color: inherit;">
          <i class="fas fa-shield-alt" style="color: #EF4444; font-size: 18px;"></i>
          <div>
            <div style="font-weight: 600; font-size: 13px;">Tratamento de Objeções</div>
            <div style="font-size: 11px; color: #666;">Como responder dúvidas</div>
          </div>
        </a>

        <a href="/clientes${tenantQuery}" style="display: flex; align-items: center; gap: 12px; padding: 14px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; text-decoration: none; color: inherit;">
          <i class="fas fa-users" style="color: #10B981; font-size: 18px;"></i>
          <div>
            <div style="font-weight: 600; font-size: 13px;">Pipeline de Vendas</div>
            <div style="font-size: 11px; color: #666;">Gerencie seus clientes</div>
          </div>
        </a>

        <a href="/${tenantQuery}" style="display: flex; align-items: center; gap: 12px; padding: 14px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; text-decoration: none; color: inherit;">
          <i class="fas fa-home" style="color: #FFD700; font-size: 18px;"></i>
          <div>
            <div style="font-weight: 600; font-size: 13px;">Visão Geral</div>
            <div style="font-size: 11px; color: #666;">Voltar ao início</div>
          </div>
        </a>
      </div>
    </div>

    <script>
      // Accordion functionality - usar classes CSS em vez de maxHeight
      document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
          const accordion = header.parentElement;
          const content = accordion.querySelector('.accordion-content');
          const icon = header.querySelector('.fa-chevron-down');

          const isOpen = content.classList.contains('active');

          // Close all accordions
          document.querySelectorAll('.accordion-content').forEach(c => {
            c.classList.remove('active');
          });
          document.querySelectorAll('.accordion-header').forEach(h => {
            h.classList.remove('active');
          });
          document.querySelectorAll('.accordion-header .fa-chevron-down').forEach(i => {
            i.style.transform = 'rotate(0deg)';
          });

          // Open clicked accordion if it was closed
          if (!isOpen) {
            content.classList.add('active');
            header.classList.add('active');
            icon.style.transform = 'rotate(180deg)';
          }
        });
      });

      // Smooth scroll for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    </script>
  `;
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

  // Playbook 2025 - 11 Modulos
  const modulosHtml = PLAYBOOK_2025.modulos.map(function(modulo) {
    // Construir preview do conteudo chave de cada modulo
    let conteudoPreview = '';

    if (modulo.numero === 0) {
      // Modulo 0: Fundamentos - mostrar os 3 pilares
      const pilaresHtml = modulo.principios.pilares.map(function(pilar) {
        return '<div style="padding: 12px; background: rgba(26, 95, 82, 0.05); border-radius: 8px; margin-bottom: 8px;">' +
          '<strong>' + pilar.numero + '. ' + pilar.nome + '</strong>' +
          '<div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">' + pilar.explicacao + '</div>' +
        '</div>';
      }).join('');
      conteudoPreview = '<div style="margin-top: 12px;"><strong>Os 3 Pilares:</strong></div>' + pilaresHtml;
    } else if (modulo.scripts) {
      // Modulos com scripts - mostrar preview de 2 scripts
      const scriptsArray = Array.isArray(modulo.scripts) ? modulo.scripts : [];
      const scriptsPreview = scriptsArray.slice(0, 2).map(function(script) {
        const mensagem = script.mensagem || script.texto || '';
        const preview = mensagem.length > 150 ? mensagem.substring(0, 150) + '...' : mensagem;
        return '<div class="message-box" style="font-size: 12px; margin-bottom: 8px; white-space: pre-wrap;">' + preview + '</div>';
      }).join('');
      if (scriptsPreview) {
        conteudoPreview = '<div style="margin-top: 12px;"><strong>Scripts de exemplo:</strong></div>' + scriptsPreview;
      }
    } else if (modulo.numero === 4) {
      // Modulo 4: Perfis Clinicos - listar perfis disponiveis
      const perfis = Object.keys(modulo.perfisDisponiveis || {}).slice(0, 4);
      const perfisHtml = perfis.map(function(key) {
        const perfil = modulo.perfisDisponiveis[key];
        return '<span style="display: inline-block; padding: 6px 12px; background: rgba(26, 95, 82, 0.08); border-radius: 6px; margin: 4px; font-size: 12px;">' +
          perfil.nome + '</span>';
      }).join('');
      conteudoPreview = '<div style="margin-top: 12px;"><strong>Perfis clínicos:</strong><div style="margin-top: 8px;">' + perfisHtml + '</div></div>';
    } else if (modulo.numero === 5) {
      // Modulo 5: Gatilhos - mostrar gatilhos disponiveis
      conteudoPreview = '<div style="margin-top: 12px;"><strong>Gatilhos disponíveis:</strong>' +
        '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">' +
        '<span class="badge badge-info">Escassez</span>' +
        '<span class="badge badge-info">Autoridade</span>' +
        '<span class="badge badge-info">Urgência</span>' +
        '<span class="badge badge-info">Social Proof</span>' +
        '<span class="badge badge-info">Reciprocidade</span>' +
        '</div></div>';
    } else if (modulo.numero === 7) {
      // Modulo 7: Objecoes - mostrar principais objecoes
      const objecoesPreview = modulo.objecoesCompletas?.principais?.slice(0, 3).map(function(obj) {
        return '<span style="display: inline-block; padding: 6px 12px; background: rgba(239, 68, 68, 0.08); border-radius: 6px; margin: 4px; font-size: 12px;">' +
          obj.objecao + '</span>';
      }).join('') || '';
      conteudoPreview = '<div style="margin-top: 12px;"><strong>Objeções principais:</strong><div style="margin-top: 8px;">' + objecoesPreview + '</div></div>';
    } else if (modulo.numero === 10) {
      // Modulo 10: Indicadores - mostrar metricas principais
      conteudoPreview = '<div style="margin-top: 12px;"><strong>Áreas de acompanhamento:</strong>' +
        '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">' +
        '<span class="badge badge-success">Funil de Vendas</span>' +
        '<span class="badge badge-success">Follow-up</span>' +
        '<span class="badge badge-success">No-Show</span>' +
        '<span class="badge badge-success">Comercial 2</span>' +
        '</div></div>';
    }

    return '<div class="accordion">' +
      '<div class="accordion-header" style="border-left: 4px solid var(--primary);">' +
        '<div class="accordion-title">' +
          '<span style="font-size: 20px; margin-right: 8px;">' + modulo.emoji + '</span>' +
          '<span style="font-weight: 600;">Módulo ' + modulo.numero + ': ' + modulo.titulo + '</span>' +
          (modulo.tempoEstimado ? '<span class="badge badge-info" style="margin-left: 12px;">' + modulo.tempoEstimado + '</span>' : '') +
        '</div>' +
        '<i class="fas fa-chevron-down"></i>' +
      '</div>' +
      '<div class="accordion-content">' +
        '<p style="margin-bottom: 16px; color: var(--text-secondary);">' + modulo.descricao + '</p>' +
        (modulo.objetivo ? '<div style="padding: 12px; background: rgba(26, 95, 82, 0.08); border-radius: 8px; margin-bottom: 12px;"><strong>Objetivo:</strong> ' + modulo.objetivo + '</div>' : '') +
        conteudoPreview +
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

  '<!-- Playbook 2025 - 11 Modulos -->' +
  '<div class="card fade-in" style="margin-bottom: 24px;">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-book-open" style="color: var(--primary);"></i> Playbook 2025</h3>' +
      '<span class="badge badge-info">11 módulos especializados</span>' +
    '</div>' +
    modulosHtml +
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

  // Contar total de scripts de MODULOS_PLAYBOOK
  var totalScripts = 0;
  Object.keys(MODULOS_PLAYBOOK).forEach(function(key) {
    var modulo = MODULOS_PLAYBOOK[key];
    if (modulo.scripts) totalScripts += modulo.scripts.length;
    if (modulo.variacoes) totalScripts += modulo.variacoes.length;
  });

  // Stats da Clinica - atualizados com novos dados
  var statsHtml = '<div class="stats-grid" style="margin-bottom: 24px;">' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #1a5f52 0%, #2d8a7a 100%); color: white; box-shadow: 0 4px 6px rgba(26, 95, 82, 0.3);">' +
      '<div class="stat-value" style="font-size: 48px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">' + totalScripts + '+</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.95); font-weight: 500; font-size: 15px; letter-spacing: 0.3px;">Scripts Prontos</div>' +
    '</div>' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #2d8a7a 0%, #4fb3a3 100%); color: white; box-shadow: 0 4px 6px rgba(45, 138, 122, 0.3);">' +
      '<div class="stat-value" style="font-size: 48px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">6</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.95); font-weight: 500; font-size: 15px; letter-spacing: 0.3px;">Modulos do Playbook</div>' +
    '</div>' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #4fb3a3 0%, #6dd5c7 100%); color: white; box-shadow: 0 4px 6px rgba(79, 179, 163, 0.3);">' +
      '<div class="stat-value" style="font-size: 48px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">11</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.95); font-weight: 500; font-size: 15px; letter-spacing: 0.3px;">Categorias Especializadas</div>' +
    '</div>' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #1a5f52 0%, #4fb3a3 100%); color: white; box-shadow: 0 4px 6px rgba(26, 95, 82, 0.3);">' +
      '<div class="stat-value" style="font-size: 48px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">70%</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.95); font-weight: 500; font-size: 15px; letter-spacing: 0.3px;">Taxa Media de Resposta</div>' +
    '</div>' +
  '</div>';

  // Dicas de Comunicacao para Tricologia (mantido do original)
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

  // Frases de Impacto section
  var frasesImpactoHtml = '';
  if (FRASES_IMPACTO && FRASES_IMPACTO.categorias) {
    var categoriasImpacto = Object.keys(FRASES_IMPACTO.categorias).map(function(catKey) {
      var frases = FRASES_IMPACTO.categorias[catKey];
      var frasesListHtml = frases.map(function(frase) {
        return '<div style="padding: 8px 12px; background: rgba(26, 95, 82, 0.05); border-left: 3px solid #1a5f52; margin-bottom: 8px; border-radius: 4px; font-size: 13px;">"' + frase + '"</div>';
      }).join('');

      var icones = {
        urgencia: 'clock',
        empatia: 'heart',
        autoridade: 'shield-alt',
        esperanca: 'lightbulb'
      };

      return '<div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">' +
        '<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">' +
          '<div style="width: 32px; height: 32px; background: #1a5f52; border-radius: 6px; display: flex; align-items: center; justify-content: center;">' +
            '<i class="fas fa-' + (icones[catKey] || 'comment') + '" style="color: white; font-size: 14px;"></i>' +
          '</div>' +
          '<span style="font-weight: 600; text-transform: capitalize;">' + catKey + '</span>' +
        '</div>' +
        frasesListHtml +
      '</div>';
    }).join('');

    frasesImpactoHtml = '<div class="card fade-in" style="margin-bottom: 24px;">' +
      '<div class="card-header">' +
        '<h3 class="card-title"><i class="fas fa-bullhorn"></i> Frases de Impacto para Audio</h3>' +
        '<span class="badge badge-info">4 categorias</span>' +
      '</div>' +
      '<p style="color: #6b7280; margin-bottom: 16px; font-size: 13px;">' + (FRASES_IMPACTO.descricao || 'Use essas frases em audios para criar conexao emocional') + '</p>' +
      '<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">' + categoriasImpacto + '</div>' +
    '</div>';
  }

  // Modulos do Playbook - usar MODULOS_PLAYBOOK dinamicamente
  var modulosScripts = [
    { key: 'abertura', nome: 'Abertura e Qualificacao', icone: 'user-plus', cor: '#10b981' },
    { key: 'mapeamentoDor', nome: 'Mapeamento da Dor', icone: 'heart-pulse', cor: '#f59e0b' },
    { key: 'followUp', nome: 'Follow-Up Estrategico', icone: 'repeat', cor: '#3b82f6' },
    { key: 'noShow', nome: 'Recuperacao de No-Show', icone: 'calendar-x', cor: '#ef4444' },
    { key: 'comercial2', nome: 'Comercial 2 (Pos-Consulta)', icone: 'check-circle', cor: '#10b981' },
    { key: 'contornos', nome: 'Contornos e MACs', icone: 'message-circle', cor: '#8b5cf6' }
  ];

  // Transformar MODULOS_PLAYBOOK em estrutura compativel com o rendering existente
  var etapasFunil = modulosScripts.map(function(moduloConfig) {
    var modulo = MODULOS_PLAYBOOK[moduloConfig.key];
    if (!modulo) return null;

    var allScripts = (modulo.scripts || []).concat(modulo.variacoes || []);

    // Transformar scripts para formato esperado
    var scriptsFormatados = allScripts.map(function(script) {
      return {
        id: script.id,
        titulo: script.titulo || script.nome || 'Script',
        tipo: script.tipo || 'principal',
        contexto: script.momento || script.contexto || 'Usar conforme necessario',
        dica: script.dica || 'Use este script no contexto apropriado',
        mensagem: script.mensagem || script.pergunta || '',
        gatilhos: script.gatilhos || [],
        variacoes: []
      };
    });

    return {
      id: moduloConfig.key,
      nome: moduloConfig.nome,
      icone: moduloConfig.icone || modulo.icone,
      cor: moduloConfig.cor || modulo.cor,
      descricao: modulo.descricao || '',
      objetivo: modulo.objetivo || '',
      tempo_ideal: modulo.tempo_ideal || '',
      scripts: scriptsFormatados
    };
  }).filter(function(etapa) { return etapa !== null; });

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
                      script.tipo === 'objecao' ? 'badge-danger' :
                      script.tipo === 'contorno' ? 'badge-purple' :
                      script.tipo === 'urgencia' ? 'badge-danger' : 'badge-info';
      var tipoLabel = script.tipo === 'principal' ? 'PRINCIPAL' :
                      script.tipo === 'followup' ? 'FOLLOW-UP' :
                      script.tipo === 'objecao' ? 'OBJECAO' :
                      script.tipo === 'contorno' ? 'CONTORNO' :
                      script.tipo === 'urgencia' ? 'URGENCIA' : 'VARIACAO';

      var gatilhosHtml = script.gatilhos.map(function(g) {
        return '<span class="badge badge-purple" style="font-size: 11px; margin-right: 4px;">' + g + '</span>';
      }).join('');

      var gatilhosListHtml = script.gatilhos.map(function(g) {
        return '<li style="padding: 4px 0;">• ' + g + '</li>';
      }).join('');

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

  frasesImpactoHtml +

  '<div class="card fade-in" style="margin-bottom: 24px;">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-layer-group"></i> Scripts por Modulo do Playbook</h3>' +
      '<span class="badge badge-info">' + totalScripts + '+ scripts</span>' +
    '</div>' +
    '<div class="tabs" style="margin-bottom: 20px; flex-wrap: wrap;">' + tabsHtml + '</div>' +
    '<div class="tab-contents">' + tabContentsHtml + '</div>' +
  '</div>' +

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
function renderObjecoesCabeloeSaude() {
  // Stats cards - Updated to reflect 15+ objections
  var statsHtml = '<div class="stats-grid" style="margin-bottom: 24px;">' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #1a5f52 0%, #2d8a7a 100%); color: white; box-shadow: 0 4px 6px rgba(26, 95, 82, 0.3);">' +
      '<div class="stat-value" style="font-size: 48px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">7+</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.95); font-weight: 500; font-size: 15px;">Anos de Experiência</div>' +
    '</div>' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #2d8a7a 0%, #4fb3a3 100%); color: white; box-shadow: 0 4px 6px rgba(45, 138, 122, 0.3);">' +
      '<div class="stat-value" style="font-size: 48px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">2.000+</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.95); font-weight: 500; font-size: 15px;">Pacientes Atendidos</div>' +
    '</div>' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #4fb3a3 0%, #6dd5c7 100%); color: white; box-shadow: 0 4px 6px rgba(79, 179, 163, 0.3);">' +
      '<div class="stat-value" style="font-size: 48px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">15+</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.95); font-weight: 500; font-size: 15px;">Objeções Especializadas</div>' +
    '</div>' +
    '<div class="stat-card" style="background: linear-gradient(135deg, #1a5f52 0%, #4fb3a3 100%); color: white; box-shadow: 0 4px 6px rgba(26, 95, 82, 0.3);">' +
      '<div class="stat-value" style="font-size: 48px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">92%</div>' +
      '<div class="stat-label" style="color: rgba(255,255,255,0.95); font-weight: 500; font-size: 15px;">Taxa de Conversão</div>' +
    '</div>' +
  '</div>';

  // Principios Gerais - Golden Rules Card
  var principiosHtml = '<div class="card fade-in" style="margin-bottom: 24px; border-left: 4px solid #f59e0b;">' +
    '<div class="card-header" style="background: rgba(245, 158, 11, 0.05);">' +
      '<h3 class="card-title"><i class="fas fa-lightbulb"></i> Princípios de Ouro para Contornar Objeções</h3>' +
      '<p style="margin: 8px 0 0 0; font-size: 13px; color: var(--text-secondary);">Fundamentos que todo vendedor deve dominar</p>' +
    '</div>' +
    '<div style="padding: 20px;">' +
      '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px;">' +
        objecoes.principiosGerais.regrasOuro.map(function(regra) {
          return '<div style="display: flex; gap: 12px; padding: 12px; background: #fef3c7; border-radius: 8px;">' +
            '<div style="flex-shrink: 0; color: #f59e0b; font-size: 20px;">⚡</div>' +
            '<div style="font-size: 13px; line-height: 1.6;">' + regra + '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">' +
        '<div style="padding: 16px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px;">' +
          '<div style="font-weight: 600; color: var(--secondary); margin-bottom: 8px;">🤝 Validação</div>' +
          '<div style="font-size: 12px; color: var(--text-secondary);">' + objecoes.principiosGerais.estruturaPadrao.passo1 + '</div>' +
        '</div>' +
        '<div style="padding: 16px; background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 8px;">' +
          '<div style="font-weight: 600; color: var(--primary); margin-bottom: 8px;">🔍 Investigação</div>' +
          '<div style="font-size: 12px; color: var(--text-secondary);">' + objecoes.principiosGerais.estruturaPadrao.passo2 + '</div>' +
        '</div>' +
        '<div style="padding: 16px; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px;">' +
          '<div style="font-weight: 600; color: #3b82f6; margin-bottom: 8px;">📚 Educação</div>' +
          '<div style="font-size: 12px; color: var(--text-secondary);">' + objecoes.principiosGerais.estruturaPadrao.passo3 + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  // Main Objections Array (11 main objections)
  var objecoesArray = [
    objecoes.valorConsulta,
    objecoes.vouPensar,
    objecoes.quemAtende,
    objecoes.examesLaboratoriais,
    objecoes.planoSaude,
    objecoes.jaPasseiMedicos,
    objecoes.jaUseiMedicamentos,
    objecoes.porqueConsulta,
    objecoes.soTonico,
    objecoes.retornoTempo,
    objecoes.soCasaPrimeiro
  ];

  // Render main objections with multiple blocks
  var objecoesHtml = objecoesArray.map(function(obj) {
    // Get frequency badge color
    var frequenciaBadge = obj.frequencia.includes('Alta') || obj.frequencia.includes('Muito alta')
      ? 'badge-danger'
      : obj.frequencia.includes('Média')
        ? 'badge-warning'
        : 'badge-info';

    // Build profile badges
    var perfilBadges = obj.perfilComum.map(function(perfil) {
      return '<span class="badge badge-secondary" style="font-size: 11px; margin-right: 4px;">' + perfil + '</span>';
    }).join('');

    // Build multiple response blocks
    var blocosHtml = Object.keys(obj.estruturaResposta)
      .filter(function(key) { return key.startsWith('bloco'); })
      .map(function(key) {
        var bloco = obj.estruturaResposta[key];

        // Handle conditional blocks (e.g., vouPensar.bloco2)
        if (bloco.condicional && bloco.opcoes) {
          var opcoesHtml = Object.keys(bloco.opcoes).map(function(opcaoKey) {
            var opcaoTexto = bloco.opcoes[opcaoKey];
            return '<div style="margin-bottom: 12px; padding: 12px; background: var(--card-bg); border-left: 3px solid var(--secondary); border-radius: 4px;">' +
              '<div style="font-size: 12px; font-weight: 600; color: var(--secondary); margin-bottom: 6px; text-transform: uppercase;">' + opcaoKey.replace(/([A-Z])/g, ' $1').trim() + '</div>' +
              '<div class="message-box" style="white-space: pre-wrap;">' +
                '<button class="copy-btn" onclick="copyToClipboard(`' + opcaoTexto.replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`, this)">' +
                  '<i class="fas fa-copy"></i> Copiar' +
                '</button>' +
                opcaoTexto +
              '</div>' +
            '</div>';
          }).join('');

          return '<div style="margin-bottom: 16px;">' +
            '<div style="font-weight: 600; color: var(--primary); margin-bottom: 8px; font-size: 14px;">' +
              '<i class="fas fa-comment-dots"></i> ' + bloco.titulo +
              ' <span class="badge badge-warning" style="font-size: 10px; margin-left: 8px;">Condicional</span>' +
            '</div>' +
            opcoesHtml +
            (bloco.objetivo ? '<div style="font-size: 12px; color: var(--text-secondary); font-style: italic; margin-top: 8px;"><strong>Objetivo:</strong> ' + bloco.objetivo + '</div>' : '') +
            (bloco.gatilhos && bloco.gatilhos.length > 0 ? '<div style="margin-top: 6px;">' + bloco.gatilhos.map(function(g) {
              return '<span class="badge badge-purple" style="font-size: 10px; margin-right: 4px;">' + g + '</span>';
            }).join('') + '</div>' : '') +
          '</div>';
        }

        // Handle normal blocks with texto property
        return '<div style="margin-bottom: 16px;">' +
          '<div style="font-weight: 600; color: var(--primary); margin-bottom: 8px; font-size: 14px;">' +
            '<i class="fas fa-comment-dots"></i> ' + bloco.titulo +
          '</div>' +
          '<div class="message-box" style="white-space: pre-wrap; margin-bottom: 8px;">' +
            '<button class="copy-btn" onclick="copyToClipboard(`' + (bloco.texto || '').replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`, this)">' +
              '<i class="fas fa-copy"></i> Copiar' +
            '</button>' +
            (bloco.texto || '') +
          '</div>' +
          (bloco.objetivo ? '<div style="font-size: 12px; color: var(--text-secondary); font-style: italic;"><strong>Objetivo:</strong> ' + bloco.objetivo + '</div>' : '') +
          (bloco.gatilhos && bloco.gatilhos.length > 0 ? '<div style="margin-top: 6px;">' + bloco.gatilhos.map(function(g) {
            return '<span class="badge badge-purple" style="font-size: 10px; margin-right: 4px;">' + g + '</span>';
          }).join('') + '</div>' : '') +
        '</div>';
      }).join('');

    // Build usage tips
    var dicasHtml = obj.dicasUso.map(function(dica) {
      return '<li style="padding: 4px 0; font-size: 12px; color: var(--text-secondary);"><i class="fas fa-check" style="color: var(--secondary); margin-right: 6px;"></i>' + dica + '</li>';
    }).join('');

    return '<div class="accordion" style="margin-bottom: 16px;">' +
      '<div class="accordion-header" style="border-left: 4px solid var(--primary);">' +
        '<div class="accordion-title">' +
          '<span class="badge ' + frequenciaBadge + '" style="margin-right: 8px; font-size: 10px;">' + obj.frequencia + '</span>' +
          '<span style="font-weight: 600;">"' + obj.objecao + '"</span>' +
        '</div>' +
        '<i class="fas fa-chevron-down"></i>' +
      '</div>' +
      '<div class="accordion-content" style="padding: 0;">' +
        '<div style="padding: 16px; background: #fafafa; border-bottom: 1px solid var(--border);">' +
          '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; margin-bottom: 12px;">' +
            '<div><i class="fas fa-clock"></i> <strong>Momento:</strong> ' + obj.momento + '</div>' +
            '<div><i class="fas fa-user"></i> <strong>Perfil Comum:</strong> ' + perfilBadges + '</div>' +
          '</div>' +
        '</div>' +
        '<div style="padding: 20px;">' +
          '<div style="margin-bottom: 24px;">' +
            '<h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--primary);">📋 Estrutura de Resposta</h4>' +
            blocosHtml +
          '</div>' +
          '<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; padding-top: 20px; border-top: 1px solid var(--border);">' +
            '<div>' +
              '<h4 style="font-size: 13px; font-weight: 600; margin-bottom: 8px;"><i class="fab fa-whatsapp" style="color: #25D366;"></i> Versão Pocket (WhatsApp)</h4>' +
              '<div class="message-box" style="font-size: 12px; background: #f0fdf4;">' +
                '<button class="copy-btn" onclick="copyToClipboard(`' + obj.versaoPocket.replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`, this)">' +
                  '<i class="fas fa-copy"></i> Copiar' +
                '</button>' +
                obj.versaoPocket +
              '</div>' +
            '</div>' +
            '<div>' +
              '<h4 style="font-size: 13px; font-weight: 600; margin-bottom: 8px;"><i class="fas fa-lightbulb"></i> Dicas de Uso</h4>' +
              '<ul style="list-style: none; padding: 0; margin: 0;">' + dicasHtml + '</ul>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  // Special Cases Section
  var casosEspeciaisHtml = '<div class="card fade-in" style="margin-bottom: 24px; border-left: 4px solid #ef4444;">' +
    '<div class="card-header" style="background: rgba(239, 68, 68, 0.05);">' +
      '<h3 class="card-title"><i class="fas fa-exclamation-triangle"></i> Casos Especiais - Objeções Complexas</h3>' +
      '<span class="badge badge-danger">Alta Gravidade</span>' +
    '</div>' +
    '<div style="padding: 20px;">' +
      // Consulta Cara
      '<div class="accordion" style="margin-bottom: 16px;">' +
        '<div class="accordion-header" style="border-left: 4px solid #ef4444; background: #fef2f2;">' +
          '<div class="accordion-title">' +
            '<span class="badge badge-danger" style="margin-right: 8px;">CRÍTICO</span>' +
            '<span style="font-weight: 600;">"' + objecoes.casosEspeciais.consultaCara.objecao + '"</span>' +
          '</div>' +
          '<i class="fas fa-chevron-down"></i>' +
        '</div>' +
        '<div class="accordion-content" style="padding: 20px;">' +
          '<div style="background: #fef2f2; padding: 12px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #fecaca;">' +
            '<div style="font-size: 12px; color: #991b1b;"><strong>⚠️ Gravidade:</strong> ' + objecoes.casosEspeciais.consultaCara.gravidade + '</div>' +
            '<div style="font-size: 12px; color: #991b1b; margin-top: 4px;"><strong>Momento:</strong> ' + objecoes.casosEspeciais.consultaCara.momento + '</div>' +
          '</div>' +
          Object.keys(objecoes.casosEspeciais.consultaCara.estruturaResposta)
            .filter(function(key) { return key.startsWith('bloco'); })
            .map(function(key) {
              var bloco = objecoes.casosEspeciais.consultaCara.estruturaResposta[key];
              return '<div style="margin-bottom: 16px;">' +
                '<div style="font-weight: 600; color: #dc2626; margin-bottom: 8px; font-size: 14px;">' +
                  '<i class="fas fa-shield-alt"></i> ' + bloco.titulo +
                '</div>' +
                '<div class="message-box" style="white-space: pre-wrap;">' +
                  '<button class="copy-btn" onclick="copyToClipboard(`' + (bloco.texto || '').replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`, this)">' +
                    '<i class="fas fa-copy"></i> Copiar' +
                  '</button>' +
                  (bloco.texto || '') +
                '</div>' +
              '</div>';
            }).join('') +
          '<div style="margin-top: 16px; padding: 12px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">' +
            '<h5 style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--secondary);">✅ Dicas Essenciais:</h5>' +
            '<ul style="list-style: none; padding: 0; margin: 0;">' +
              objecoes.casosEspeciais.consultaCara.dicasUso.map(function(dica) {
                return '<li style="padding: 4px 0; font-size: 11px; color: #166534;">' + dica + '</li>';
              }).join('') +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>' +
      // Calvicie Avancada
      '<div class="accordion">' +
        '<div class="accordion-header" style="border-left: 4px solid #ef4444; background: #fef2f2;">' +
          '<div class="accordion-title">' +
            '<span class="badge badge-danger" style="margin-right: 8px;">CRÍTICO</span>' +
            '<span style="font-weight: 600;">"' + objecoes.casosEspeciais.calvicieAvancada.objecao + '"</span>' +
          '</div>' +
          '<i class="fas fa-chevron-down"></i>' +
        '</div>' +
        '<div class="accordion-content" style="padding: 20px;">' +
          '<div style="background: #fef2f2; padding: 12px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #fecaca;">' +
            '<div style="font-size: 12px; color: #991b1b;"><strong>⚠️ Gravidade:</strong> ' + objecoes.casosEspeciais.calvicieAvancada.gravidade + '</div>' +
            '<div style="font-size: 12px; color: #991b1b; margin-top: 4px;"><strong>Momento:</strong> ' + objecoes.casosEspeciais.calvicieAvancada.momento + '</div>' +
          '</div>' +
          Object.keys(objecoes.casosEspeciais.calvicieAvancada.estruturaResposta)
            .filter(function(key) { return key.startsWith('bloco'); })
            .map(function(key) {
              var bloco = objecoes.casosEspeciais.calvicieAvancada.estruturaResposta[key];
              return '<div style="margin-bottom: 16px;">' +
                '<div style="font-weight: 600; color: #dc2626; margin-bottom: 8px; font-size: 14px;">' +
                  '<i class="fas fa-shield-alt"></i> ' + bloco.titulo +
                '</div>' +
                '<div class="message-box" style="white-space: pre-wrap;">' +
                  '<button class="copy-btn" onclick="copyToClipboard(`' + (bloco.texto || '').replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`, this)">' +
                    '<i class="fas fa-copy"></i> Copiar' +
                  '</button>' +
                  (bloco.texto || '') +
                '</div>' +
              '</div>';
            }).join('') +
          '<div style="margin-top: 16px; padding: 12px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">' +
            '<h5 style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--secondary);">✅ Dicas Essenciais:</h5>' +
            '<ul style="list-style: none; padding: 0; margin: 0;">' +
              objecoes.casosEspeciais.calvicieAvancada.dicasUso.map(function(dica) {
                return '<li style="padding: 4px 0; font-size: 11px; color: #166534;">' + dica + '</li>';
              }).join('') +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  // Mental Triggers Reference
  var gatilhosReferenceHtml = '<div class="card fade-in">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-brain"></i> Gatilhos Mentais Mais Eficazes</h3>' +
    '</div>' +
    '<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 20px;">' +
      Object.keys(objecoes.principiosGerais.gatilhosMaisEficazes).map(function(key) {
        var gatilho = objecoes.principiosGerais.gatilhosMaisEficazes[key];
        var gatilhoNome = key.charAt(0).toUpperCase() + key.slice(1);
        return '<div style="padding: 16px; background: white; border: 1px solid var(--border); border-radius: 8px;">' +
          '<div style="font-weight: 600; color: var(--primary); margin-bottom: 4px; font-size: 13px;">' + gatilhoNome + '</div>' +
          '<div style="font-size: 12px; color: var(--text-secondary); line-height: 1.5;">' + gatilho + '</div>' +
        '</div>';
      }).join('') +
    '</div>' +
  '</div>';

  return '<div class="page-header">' +
    '<h1 class="page-title"><i class="fas fa-shield-alt"></i> Objeções & Contornos Especializados</h1>' +
    '<p class="page-subtitle">Sistema completo de contorno para vendas de tricologia - ' + objecoes.metadata.versao + '</p>' +
  '</div>' +
  statsHtml +
  principiosHtml +
  '<div class="card fade-in" style="margin-bottom: 24px;">' +
    '<div class="card-header">' +
      '<h3 class="card-title"><i class="fas fa-comments"></i> Objeções Principais</h3>' +
      '<span class="badge badge-info">11 objeções mapeadas</span>' +
    '</div>' +
    '<div style="padding: 20px;">' +
      objecoesHtml +
    '</div>' +
  '</div>' +
  casosEspeciaisHtml +
  gatilhosReferenceHtml;
}

function renderScripts() {
  try {
    // Validacao defensiva
    if (!SCRIPTS_STATS || !ETAPAS_FUNIL || !DICAS_COMUNICACAO) {
      return layout('Scripts', `
        <div class="page-header">
          <h1 class="page-title">Scripts de Vendas</h1>
          <p class="page-subtitle" style="color: #ef4444;">
            Erro ao carregar scripts. Por favor, tente novamente ou entre em contato com o suporte.
          </p>
        </div>
        <div class="card">
          <p><strong>Debug Info:</strong></p>
          <ul>
            <li>SCRIPTS_STATS: ${SCRIPTS_STATS ? 'OK' : 'UNDEFINED'}</li>
            <li>ETAPAS_FUNIL: ${ETAPAS_FUNIL ? 'OK' : 'UNDEFINED'}</li>
            <li>DICAS_COMUNICACAO: ${DICAS_COMUNICACAO ? 'OK' : 'UNDEFINED'}</li>
          </ul>
        </div>
      `, 'scripts', tenantConfig);
    }

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

  // Dicas de Comunicacao - com validacao defensiva
  const dicasHtml = DICAS_COMUNICACAO
    .filter(cat => cat && cat.dicas && Array.isArray(cat.dicas))
    .map(cat => `
    <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 16px;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <div style="width: 32px; height: 32px; background: var(--primary); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-${cat.icone || 'info'}" style="color: white; font-size: 14px;"></i>
        </div>
        <span style="font-weight: 600;">${cat.titulo || 'Dica'}</span>
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
  } catch (error) {
    return layout('Scripts - Erro', `
      <div class="page-header">
        <h1 class="page-title" style="color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Erro ao Carregar Scripts</h1>
      </div>
      <div class="card">
        <h3>Detalhes do Erro:</h3>
        <pre style="background: #f3f4f6; padding: 16px; border-radius: 8px; overflow: auto; font-size: 12px;">${error.message}\n\nStack:\n${error.stack || 'No stack trace'}</pre>

        <h3 style="margin-top: 24px;">Debug Info:</h3>
        <ul>
          <li>SCRIPTS_STATS exists: ${typeof SCRIPTS_STATS !== 'undefined'}</li>
          <li>ETAPAS_FUNIL exists: ${typeof ETAPAS_FUNIL !== 'undefined'}</li>
          <li>DICAS_COMUNICACAO exists: ${typeof DICAS_COMUNICACAO !== 'undefined'}</li>
          <li>DICAS_COMUNICACAO type: ${typeof DICAS_COMUNICACAO}</li>
          <li>DICAS_COMUNICACAO isArray: ${Array.isArray(DICAS_COMUNICACAO)}</li>
        </ul>

        <a href="/" class="btn btn-primary" style="margin-top: 16px;">Voltar para Home</a>
      </div>
    `, 'scripts', tenantConfig);
  }
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
