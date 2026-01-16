import { layout } from '../templates/layout.js';

export function renderCalculadora() {
  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-calculator"></i> Calculadora de Propostas</h1>
      <p class="page-subtitle">Monte propostas personalizadas baseadas na tabela oficial de precos</p>
    </div>

    <div class="grid grid-3">
      <div class="card" style="grid-column: span 2;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-sliders-h"></i> Configuracao da Proposta</h3>
        </div>

        <form id="calculadoraForm">
          <!-- PLANO BASE -->
          <div style="margin-bottom: 24px;">
            <h4 style="color: var(--primary); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-box"></i> Plano Base
            </h4>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
              <label class="plano-card" id="plano_essential">
                <input type="radio" name="plano" value="essential" onchange="calcularProposta()" checked>
                <div class="plano-content">
                  <div class="plano-nome">Essential</div>
                  <div class="plano-preco">R$ 487<span>/mes</span></div>
                  <div class="plano-info">3 usuarios | WhatsApp</div>
                </div>
              </label>
              <label class="plano-card" id="plano_pro">
                <input type="radio" name="plano" value="pro" onchange="calcularProposta()">
                <div class="plano-content">
                  <div class="plano-nome">Pro</div>
                  <div class="plano-preco">R$ 687<span>/mes</span></div>
                  <div class="plano-info">5 usuarios | Multi-canal</div>
                </div>
              </label>
              <label class="plano-card popular" id="plano_plus">
                <input type="radio" name="plano" value="plus" onchange="calcularProposta()">
                <div class="plano-content">
                  <span class="badge badge-success" style="position: absolute; top: -10px; right: 10px; font-size: 10px;">POPULAR</span>
                  <div class="plano-nome">Plus+</div>
                  <div class="plano-preco">R$ 987<span>/mes</span></div>
                  <div class="plano-info">10 usuarios | Multi-canal</div>
                </div>
              </label>
              <label class="plano-card" id="plano_advanced">
                <input type="radio" name="plano" value="advanced" onchange="calcularProposta()">
                <div class="plano-content">
                  <div class="plano-nome">Advanced</div>
                  <div class="plano-preco">R$ 1.487<span>/mes</span></div>
                  <div class="plano-info">20 usuarios | Multi-canal</div>
                </div>
              </label>
            </div>
          </div>

          <!-- USUARIOS E CANAIS -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="grid-column: span 2;">
              <h4 style="color: var(--accent); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-users"></i> Usuarios e Canais Adicionais
              </h4>
            </div>

            <div class="form-group">
              <label class="form-label">Usuarios Adicionais</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="number" class="form-input" id="usuarios_adicionais" value="0" min="0" max="200" onchange="calcularProposta()" style="width: 80px;">
                <span class="badge badge-info" id="preco_usuario">R$ 107/usuario</span>
              </div>
              <small style="color: var(--text-secondary); margin-top: 4px; display: block;">Usuarios alem dos inclusos no plano</small>
            </div>

            <div class="form-group">
              <label class="form-label">WhatsApp Adicional</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="number" class="form-input" id="whatsapp_adicional" value="0" min="0" max="20" onchange="calcularProposta()" style="width: 80px;">
                <span class="badge badge-success">R$ 89/canal</span>
              </div>
              <small style="color: var(--text-secondary); margin-top: 4px; display: block;">Numeros de WhatsApp extras</small>
            </div>

            <div class="form-group">
              <label class="form-label">Instagram Direct Adicional</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="number" class="form-input" id="instagram_adicional" value="0" min="0" max="10" onchange="calcularProposta()" style="width: 80px;">
                <span class="badge badge-purple">R$ 69/canal</span>
              </div>
              <small style="color: var(--text-secondary); margin-top: 4px; display: block;" id="instagram_info">Incluso no Pro, Plus+ e Advanced</small>
            </div>

            <div class="form-group">
              <label class="form-label">Messenger Adicional</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="number" class="form-input" id="messenger_adicional" value="0" min="0" max="10" onchange="calcularProposta()" style="width: 80px;">
                <span class="badge badge-info">R$ 69/canal</span>
              </div>
              <small style="color: var(--text-secondary); margin-top: 4px; display: block;" id="messenger_info">Incluso no Pro, Plus+ e Advanced</small>
            </div>
          </div>

          <!-- EXTRAS MENSAIS -->
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="grid-column: span 3;">
              <h4 style="color: var(--secondary); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-plus-circle"></i> Extras e Complementos (Mensal)
              </h4>
            </div>

            <label class="checkbox-card">
              <input type="checkbox" id="automacao_ilimitada" onchange="calcularProposta()">
              <div class="checkbox-content">
                <i class="fas fa-robot"></i>
                <div>
                  <div class="checkbox-title">Automacao Ilimitada</div>
                  <div class="checkbox-preco">+R$ 147/mes</div>
                </div>
              </div>
            </label>

            <label class="checkbox-card">
              <input type="checkbox" id="integracao_asaas" onchange="calcularProposta()">
              <div class="checkbox-content">
                <i class="fas fa-credit-card"></i>
                <div>
                  <div class="checkbox-title">Integracao ASAAS Bank</div>
                  <div class="checkbox-preco">+R$ 99/mes</div>
                </div>
              </div>
            </label>

            <label class="checkbox-card">
              <input type="checkbox" id="pagamentos" onchange="calcularProposta()">
              <div class="checkbox-content">
                <i class="fas fa-money-bill-wave"></i>
                <div>
                  <div class="checkbox-title">Modulo Pagamentos</div>
                  <div class="checkbox-preco">+R$ 99/mes</div>
                </div>
              </div>
            </label>

            <div class="form-group" style="grid-column: span 3;">
              <label class="form-label">IA Transcricao de Audio</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="number" class="form-input" id="transcricao_audio" value="0" min="0" max="100" onchange="calcularProposta()" style="width: 80px;">
                <span class="badge badge-warning">R$ 6,99/usuario</span>
                <span style="color: var(--text-secondary); font-size: 13px;">usuarios com transcricao</span>
              </div>
            </div>
          </div>

          <!-- IMPLANTACAO -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
            <div style="grid-column: span 2;">
              <h4 style="color: #f59e0b; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-cogs"></i> Taxa de Implantacao (Unica)
              </h4>
            </div>

            <div class="form-group">
              <label class="form-label">Taxa de Implantacao do Plano</label>
              <div class="valor-display" id="taxa_implantacao_plano" style="font-size: 20px;">R$ 1.090,00</div>
              <small style="color: var(--text-secondary);">Valor baseado no plano selecionado</small>
            </div>

            <div class="form-group">
              <label class="form-label">Parcelas da Implantacao</label>
              <select class="form-select" id="parcelas_implantacao" onchange="calcularProposta()">
                <option value="1">A vista</option>
                <option value="2">2x sem juros</option>
                <option value="3">3x sem juros</option>
                <option value="4">4x sem juros</option>
                <option value="6">6x sem juros</option>
              </select>
            </div>
          </div>

          <!-- SERVICOS ADICIONAIS (TAXA UNICA) -->
          <div style="margin-bottom: 24px;">
            <div style="grid-column: span 2;">
              <h4 style="color: var(--primary); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-plus-square"></i> Servicos Adicionais (Taxa Unica)
              </h4>
            </div>

            <!-- Verificacao BM Meta -->
            <label class="checkbox-card" style="margin-bottom: 16px;">
              <input type="checkbox" id="verificacao_bm" onchange="calcularProposta()">
              <div class="checkbox-content">
                <i class="fab fa-meta" style="color: #1877F2;"></i>
                <div style="flex: 1;">
                  <div class="checkbox-title">Verificacao Business Manager Meta</div>
                  <div style="font-size: 11px; color: var(--text-secondary);">Verificacao de conta comercial para uso de API oficial</div>
                </div>
                <div class="checkbox-preco" style="color: #1877F2;">R$ 250</div>
              </div>
            </label>

            <!-- Desenvolvimento de Website -->
            <div style="margin-bottom: 20px;">
              <label class="form-label" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <i class="fas fa-globe" style="color: #3b82f6;"></i> Desenvolvimento de Website
              </label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                <label class="servico-card" id="site_nenhum">
                  <input type="radio" name="website" value="nenhum" data-preco="0" onchange="calcularProposta()" checked>
                  <div class="servico-content">
                    <div class="servico-badge">-</div>
                    <div class="servico-nome">Nenhum</div>
                    <div class="servico-preco">R$ 0</div>
                  </div>
                </label>
                <label class="servico-card" id="site_starter">
                  <input type="radio" name="website" value="starter" data-preco="950" onchange="calcularProposta()">
                  <div class="servico-content">
                    <div class="servico-badge" style="background: #3b82f6;">P</div>
                    <div class="servico-nome">Starter</div>
                    <div class="servico-preco">R$ 950</div>
                    <div class="servico-desc">4 Blocos</div>
                    <div class="servico-itens">Menu + Header + Sobre + Rodape</div>
                  </div>
                </label>
                <label class="servico-card popular" id="site_business">
                  <input type="radio" name="website" value="business" data-preco="1300" onchange="calcularProposta()">
                  <div class="servico-content">
                    <span class="badge badge-success" style="position: absolute; top: -8px; right: 8px; font-size: 9px;">POPULAR</span>
                    <div class="servico-badge" style="background: #10b981;">M</div>
                    <div class="servico-nome">Business</div>
                    <div class="servico-preco">R$ 1.300</div>
                    <div class="servico-desc">6 Blocos</div>
                    <div class="servico-itens">+ Diferenciais + Precos</div>
                  </div>
                </label>
                <label class="servico-card" id="site_premium" style="grid-column: 2;">
                  <input type="radio" name="website" value="premium" data-preco="1500" onchange="calcularProposta()">
                  <div class="servico-content">
                    <div class="servico-badge" style="background: #8b5cf6;">G</div>
                    <div class="servico-nome">Premium</div>
                    <div class="servico-preco">R$ 1.500</div>
                    <div class="servico-desc">9 Blocos</div>
                    <div class="servico-itens">+ Depoimentos + CTA + WhatsApp + Form</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Implementacao Agentes IA -->
            <div>
              <label class="form-label" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <i class="fas fa-robot" style="color: #8b5cf6;"></i> Implementacao de Agentes de I.A.
              </label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                <label class="servico-card" id="ia_nenhum">
                  <input type="radio" name="agentes_ia" value="nenhum" data-preco="0" onchange="calcularProposta()" checked>
                  <div class="servico-content">
                    <div class="servico-badge">-</div>
                    <div class="servico-nome">Nenhum</div>
                    <div class="servico-preco">R$ 0</div>
                  </div>
                </label>
                <label class="servico-card" id="ia_starter">
                  <input type="radio" name="agentes_ia" value="starter" data-preco="2500" onchange="calcularProposta()">
                  <div class="servico-content">
                    <div class="servico-badge" style="background: #3b82f6;">P</div>
                    <div class="servico-nome">Starter</div>
                    <div class="servico-preco">R$ 2.500</div>
                    <div class="servico-desc">3 Agentes</div>
                    <div class="servico-itens">Supervisor + SDR + Tecnico</div>
                  </div>
                </label>
                <label class="servico-card popular" id="ia_business">
                  <input type="radio" name="agentes_ia" value="business" data-preco="3800" onchange="calcularProposta()">
                  <div class="servico-content">
                    <span class="badge badge-success" style="position: absolute; top: -8px; right: 8px; font-size: 9px;">POPULAR</span>
                    <div class="servico-badge" style="background: #10b981;">M</div>
                    <div class="servico-nome">Business</div>
                    <div class="servico-preco">R$ 3.800</div>
                    <div class="servico-desc">5 Agentes</div>
                    <div class="servico-itens">+ Cobranca + Agendamento</div>
                  </div>
                </label>
                <label class="servico-card" id="ia_enterprise" style="grid-column: 2;">
                  <input type="radio" name="agentes_ia" value="enterprise" data-preco="5300" onchange="calcularProposta()">
                  <div class="servico-content">
                    <div class="servico-badge" style="background: #8b5cf6;">G</div>
                    <div class="servico-nome">Enterprise</div>
                    <div class="servico-preco">R$ 5.300</div>
                    <div class="servico-desc">7 Agentes</div>
                    <div class="servico-itens">+ Resgate + Vendas</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- RESUMO -->
      <div class="card" style="position: sticky; top: 32px; height: fit-content;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-receipt"></i> Resumo da Proposta</h3>
        </div>

        <div id="resumoItens" style="margin-bottom: 16px; font-size: 13px;"></div>

        <div style="margin-bottom: 20px; padding: 16px; background: var(--bg-page); border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Plano Base:</span>
            <span id="resumoPlanoBase" style="font-weight: 600;">R$ 487,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Adicionais:</span>
            <span id="resumoAdicionais" style="font-weight: 600;">R$ 0,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px dashed var(--border);">
            <span style="font-weight: 600;">MENSALIDADE:</span>
            <span id="valorMensalidade" style="font-weight: 700; color: var(--primary); font-size: 18px;">R$ 487,00</span>
          </div>
        </div>

        <div style="margin-bottom: 20px; padding: 16px; background: rgba(245, 158, 11, 0.1); border-radius: 8px; border-left: 4px solid #f59e0b;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Implantacao Plano:</span>
            <span id="resumoImplantacaoPlano" style="font-weight: 600;">R$ 1.090,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Servicos Extras:</span>
            <span id="resumoServicosExtras" style="font-weight: 600;">R$ 0,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px dashed var(--border);">
            <span style="font-weight: 600;">IMPLANTACAO:</span>
            <span id="valorImplantacao" style="font-weight: 700; color: #f59e0b; font-size: 18px;">R$ 1.090,00</span>
          </div>
          <div id="parcelamentoInfo" style="font-size: 12px; color: var(--text-secondary); margin-top: 8px;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; background: linear-gradient(135deg, var(--primary), var(--accent)); border-radius: 12px; margin-bottom: 20px;">
          <div>
            <div style="font-size: 12px; color: rgba(255,255,255,0.8);">PRIMEIRO MES</div>
            <div style="font-size: 28px; font-weight: 700; color: white;" id="valorTotal">R$ 1.577,00</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="gerarProposta()">
            <i class="fas fa-file-export"></i> Gerar Proposta
          </button>

          <button class="btn btn-secondary" style="width: 100%; justify-content: center;" onclick="copiarResumo()">
            <i class="fas fa-copy"></i> Copiar Resumo
          </button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="propostaModal">
      <div class="modal" style="max-width: 700px;">
        <div class="modal-header">
          <h3 class="modal-title">Proposta Gerada</h3>
          <button class="modal-close" onclick="closeModal('propostaModal')">&times;</button>
        </div>
        <div class="modal-body">
          <div id="propostaContent" style="white-space: pre-wrap; font-family: monospace; background: var(--bg-dark); padding: 20px; border-radius: 8px; max-height: 400px; overflow-y: auto;"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="closeModal('propostaModal')">Fechar</button>
          <button class="btn btn-primary" onclick="copiarProposta()"><i class="fas fa-copy"></i> Copiar</button>
        </div>
      </div>
    </div>

    <style>
      .plano-card {
        display: block;
        padding: 16px;
        border: 2px solid var(--border);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
      }
      .plano-card:hover {
        border-color: var(--primary);
        transform: translateY(-2px);
      }
      .plano-card input {
        display: none;
      }
      .plano-card input:checked + .plano-content {
        color: var(--primary);
      }
      .plano-card:has(input:checked) {
        border-color: var(--primary);
        background: rgba(139, 92, 246, 0.05);
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
      }
      .plano-card.popular {
        border-color: var(--secondary);
      }
      .plano-card.popular:has(input:checked) {
        border-color: var(--secondary);
        background: rgba(16, 185, 129, 0.05);
      }
      .plano-nome {
        font-weight: 700;
        font-size: 16px;
        margin-bottom: 4px;
      }
      .plano-preco {
        font-size: 22px;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 4px;
      }
      .plano-preco span {
        font-size: 12px;
        font-weight: 400;
        color: var(--text-secondary);
      }
      .plano-info {
        font-size: 11px;
        color: var(--text-secondary);
      }

      .checkbox-card {
        display: flex;
        align-items: center;
        padding: 16px;
        border: 1px solid var(--border);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .checkbox-card:hover {
        border-color: var(--primary);
      }
      .checkbox-card input {
        display: none;
      }
      .checkbox-card:has(input:checked) {
        border-color: var(--secondary);
        background: rgba(16, 185, 129, 0.05);
      }
      .checkbox-card:has(input:checked) i {
        color: var(--secondary);
      }
      .checkbox-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .checkbox-content i {
        font-size: 20px;
        color: var(--text-secondary);
      }
      .checkbox-title {
        font-weight: 600;
        font-size: 13px;
      }
      .checkbox-preco {
        font-size: 12px;
        color: var(--secondary);
        font-weight: 600;
      }

      /* Cards de servico estilo McDonald's */
      .servico-card {
        display: block;
        padding: 16px;
        border: 2px solid var(--border);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
        text-align: center;
        background: white;
      }
      .servico-card:hover {
        border-color: var(--primary);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }
      .servico-card input { display: none; }
      .servico-card:has(input:checked) {
        border-color: var(--primary);
        background: rgba(139, 92, 246, 0.05);
        box-shadow: 0 4px 16px rgba(139, 92, 246, 0.2);
      }
      .servico-card.popular:has(input:checked) {
        border-color: var(--secondary);
        background: rgba(16, 185, 129, 0.05);
        box-shadow: 0 4px 16px rgba(16, 185, 129, 0.2);
      }
      .servico-badge {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--border);
        color: white;
        font-weight: 700;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 10px;
      }
      .servico-nome {
        font-weight: 700;
        font-size: 15px;
        margin-bottom: 4px;
      }
      .servico-preco {
        font-size: 20px;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 4px;
      }
      .servico-card:has(input:checked) .servico-preco { color: var(--primary); }
      .servico-card.popular:has(input:checked) .servico-preco { color: var(--secondary); }
      .servico-desc {
        font-size: 11px;
        color: var(--text-secondary);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }
      .servico-itens {
        font-size: 10px;
        color: var(--text-secondary);
        line-height: 1.4;
      }
    </style>

    <script>
      const PLANOS = {
        essential: { nome: 'Essential', valor: 487, usuarios: 3, implantacao: 1090, usuarioAdicional: 107, canais: ['whatsapp'] },
        pro: { nome: 'Pro', valor: 687, usuarios: 5, implantacao: 1490, usuarioAdicional: 87, canais: ['whatsapp', 'instagram', 'messenger'] },
        plus: { nome: 'Plus+', valor: 987, usuarios: 10, implantacao: 1990, usuarioAdicional: 57, canais: ['whatsapp', 'instagram', 'messenger'] },
        advanced: { nome: 'Advanced', valor: 1487, usuarios: 20, implantacao: 2499, usuarioAdicional: 47, canais: ['whatsapp', 'instagram', 'messenger'] }
      };

      function getPlanoSelecionado() {
        const radios = document.getElementsByName('plano');
        for (let radio of radios) {
          if (radio.checked) return radio.value;
        }
        return 'essential';
      }

      function calcularProposta() {
        const planoKey = getPlanoSelecionado();
        const plano = PLANOS[planoKey];

        // Atualizar preco do usuario adicional
        document.getElementById('preco_usuario').textContent = 'R$ ' + plano.usuarioAdicional + '/usuario';

        // Atualizar info de canais
        const temMulticanal = plano.canais.includes('instagram');
        document.getElementById('instagram_info').textContent = temMulticanal ? '1 canal ja incluso no plano' : 'Nao incluso no Essential';
        document.getElementById('messenger_info').textContent = temMulticanal ? '1 canal ja incluso no plano' : 'Nao incluso no Essential';

        // Calcular mensalidade
        let mensalidadeBase = plano.valor;
        let adicionais = 0;
        let itensResumo = [];

        // Usuarios adicionais
        const usuariosAdicionais = parseInt(document.getElementById('usuarios_adicionais').value) || 0;
        if (usuariosAdicionais > 0) {
          const custoUsuarios = usuariosAdicionais * plano.usuarioAdicional;
          adicionais += custoUsuarios;
          itensResumo.push('+ ' + usuariosAdicionais + ' usuarios: R$ ' + custoUsuarios.toFixed(2));
        }

        // WhatsApp adicional
        const whatsappAdicional = parseInt(document.getElementById('whatsapp_adicional').value) || 0;
        if (whatsappAdicional > 0) {
          const custoWhatsapp = whatsappAdicional * 89;
          adicionais += custoWhatsapp;
          itensResumo.push('+ ' + whatsappAdicional + ' WhatsApp: R$ ' + custoWhatsapp.toFixed(2));
        }

        // Instagram adicional
        const instagramAdicional = parseInt(document.getElementById('instagram_adicional').value) || 0;
        if (instagramAdicional > 0) {
          const custoInstagram = instagramAdicional * 69;
          adicionais += custoInstagram;
          itensResumo.push('+ ' + instagramAdicional + ' Instagram: R$ ' + custoInstagram.toFixed(2));
        }

        // Messenger adicional
        const messengerAdicional = parseInt(document.getElementById('messenger_adicional').value) || 0;
        if (messengerAdicional > 0) {
          const custoMessenger = messengerAdicional * 69;
          adicionais += custoMessenger;
          itensResumo.push('+ ' + messengerAdicional + ' Messenger: R$ ' + custoMessenger.toFixed(2));
        }

        // Extras mensais
        if (document.getElementById('automacao_ilimitada').checked) {
          adicionais += 147;
          itensResumo.push('Automacao Ilimitada: R$ 147,00');
        }
        if (document.getElementById('integracao_asaas').checked) {
          adicionais += 99;
          itensResumo.push('Integracao ASAAS: R$ 99,00');
        }
        if (document.getElementById('pagamentos').checked) {
          adicionais += 99;
          itensResumo.push('Modulo Pagamentos: R$ 99,00');
        }

        const transcricaoUsuarios = parseInt(document.getElementById('transcricao_audio').value) || 0;
        if (transcricaoUsuarios > 0) {
          const custoTranscricao = transcricaoUsuarios * 6.99;
          adicionais += custoTranscricao;
          itensResumo.push('Transcricao IA (' + transcricaoUsuarios + '): R$ ' + custoTranscricao.toFixed(2));
        }

        const mensalidadeTotal = mensalidadeBase + adicionais;

        // Calcular implantacao
        let implantacaoPlano = plano.implantacao;
        let servicosExtras = 0;

        // Verificacao BM Meta
        if (document.getElementById('verificacao_bm').checked) {
          servicosExtras += 250;
        }

        // Website
        const websiteRadios = document.getElementsByName('website');
        for (let radio of websiteRadios) {
          if (radio.checked) {
            servicosExtras += parseFloat(radio.dataset.preco);
            break;
          }
        }

        // Agentes IA
        const agentesRadios = document.getElementsByName('agentes_ia');
        for (let radio of agentesRadios) {
          if (radio.checked) {
            servicosExtras += parseFloat(radio.dataset.preco);
            break;
          }
        }

        const implantacaoTotal = implantacaoPlano + servicosExtras;

        // Parcelamento
        const parcelas = parseInt(document.getElementById('parcelas_implantacao').value);
        const valorParcela = implantacaoTotal / parcelas;

        // Atualizar UI
        document.getElementById('taxa_implantacao_plano').textContent = formatCurrency(implantacaoPlano);
        document.getElementById('resumoPlanoBase').textContent = formatCurrency(mensalidadeBase);
        document.getElementById('resumoAdicionais').textContent = formatCurrency(adicionais);
        document.getElementById('valorMensalidade').textContent = formatCurrency(mensalidadeTotal);
        document.getElementById('resumoImplantacaoPlano').textContent = formatCurrency(implantacaoPlano);
        document.getElementById('resumoServicosExtras').textContent = formatCurrency(servicosExtras);
        document.getElementById('valorImplantacao').textContent = formatCurrency(implantacaoTotal);
        document.getElementById('valorTotal').textContent = formatCurrency(mensalidadeTotal + implantacaoTotal);

        // Parcelamento info
        if (parcelas > 1) {
          document.getElementById('parcelamentoInfo').textContent = parcelas + 'x de ' + formatCurrency(valorParcela) + ' sem juros';
        } else {
          document.getElementById('parcelamentoInfo').textContent = '';
        }

        // Itens resumo
        document.getElementById('resumoItens').innerHTML = itensResumo.length > 0 ?
          '<div style="padding: 12px; background: var(--bg-page); border-radius: 8px; margin-bottom: 8px;">' +
          itensResumo.map(i => '<div style="padding: 4px 0; font-size: 12px; color: var(--text-secondary);">' + i + '</div>').join('') +
          '</div>' : '';
      }

      function gerarProposta() {
        const planoKey = getPlanoSelecionado();
        const plano = PLANOS[planoKey];
        const usuariosAdicionais = parseInt(document.getElementById('usuarios_adicionais').value) || 0;
        const totalUsuarios = plano.usuarios + usuariosAdicionais;
        const whatsappAdicional = parseInt(document.getElementById('whatsapp_adicional').value) || 0;
        const totalWhatsapp = 1 + whatsappAdicional;
        const mensalidade = document.getElementById('valorMensalidade').textContent;
        const implantacao = document.getElementById('valorImplantacao').textContent;
        const parcelas = parseInt(document.getElementById('parcelas_implantacao').value);
        const valorParcela = parseFloat(implantacao.replace(/[^0-9,]/g, '').replace(',', '.')) / parcelas;

        let proposta = '*PROPOSTA PAPER VINES*\\n\\n';
        proposta += '*Plano: ' + plano.nome + '*\\n';
        proposta += 'Usuarios: ate ' + totalUsuarios + '\\n';
        proposta += 'WhatsApp: ' + totalWhatsapp + ' canal(is)\\n';

        if (plano.canais.includes('instagram')) {
          proposta += 'Instagram Direct: incluso\\n';
          proposta += 'Messenger: incluso\\n';
        }

        proposta += '\\n*Mensalidade: ' + mensalidade + '*\\n\\n';
        proposta += '*Implantacao: ' + implantacao + '*\\n';
        if (parcelas > 1) {
          proposta += '(' + parcelas + 'x de R$ ' + valorParcela.toFixed(2).replace('.', ',') + ' sem juros)\\n';
        }

        proposta += '\\nA tecnologia e poderosa, mas quem ativa esse poder e o suporte certo.\\n';
        proposta += 'Nossa equipe esta preparada para superar suas expectativas.\\n\\n';
        proposta += '*Validade da proposta: 7 dias*';

        document.getElementById('propostaContent').textContent = proposta.replace(/\\\\n/g, '\\n');
        openModal('propostaModal');
      }

      function copiarProposta() {
        const proposta = document.getElementById('propostaContent').textContent;
        navigator.clipboard.writeText(proposta).then(() => { showToast('Proposta copiada!'); });
      }

      function copiarResumo() {
        const planoKey = getPlanoSelecionado();
        const plano = PLANOS[planoKey];
        const mensalidade = document.getElementById('valorMensalidade').textContent;
        const implantacao = document.getElementById('valorImplantacao').textContent;
        const total = document.getElementById('valorTotal').textContent;
        const resumo = 'Plano: ' + plano.nome + '\\nMensalidade: ' + mensalidade + '\\nImplantacao: ' + implantacao + '\\nTotal 1o mes: ' + total;
        navigator.clipboard.writeText(resumo).then(() => { showToast('Resumo copiado!'); });
      }

      // Inicializar
      calcularProposta();
    </script>
  `;

  return layout('Calculadora', content, 'calculadora');
}
