import { layout } from '../templates/layout.js';

export function renderCalculadora(tenantData = {}) {
  const config = tenantData.config || {};
  const tenantId = config.id || 'papervines';

  // Se for cabeloesaude, renderizar calculadora especifica
  if (tenantId === 'cabeloesaude') {
    return renderCalculadoraCabeloeSaude(tenantData);
  }

  // Calculadora padrao (Paper Vines)
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
                  <div class="plano-canais">
                    <span><i class="fas fa-users"></i> 3 Usuarios</span>
                    <span><i class="fab fa-whatsapp"></i> 1 WhatsApp</span>
                  </div>
                </div>
              </label>
              <label class="plano-card" id="plano_pro">
                <input type="radio" name="plano" value="pro" onchange="calcularProposta()">
                <div class="plano-content">
                  <div class="plano-nome">Pro</div>
                  <div class="plano-preco">R$ 687<span>/mes</span></div>
                  <div class="plano-canais">
                    <span><i class="fas fa-users"></i> 5 Usuarios</span>
                    <span><i class="fab fa-whatsapp"></i> 1 WhatsApp</span>
                    <span><i class="fab fa-instagram"></i> Instagram</span>
                    <span><i class="fab fa-facebook-messenger"></i> Messenger</span>
                  </div>
                </div>
              </label>
              <label class="plano-card popular" id="plano_plus">
                <input type="radio" name="plano" value="plus" onchange="calcularProposta()">
                <div class="plano-content">
                  <span class="badge badge-success" style="position: absolute; top: -10px; right: 10px; font-size: 10px;">POPULAR</span>
                  <div class="plano-nome">Plus+</div>
                  <div class="plano-preco">R$ 987<span>/mes</span></div>
                  <div class="plano-canais">
                    <span><i class="fas fa-users"></i> 10 Usuarios</span>
                    <span><i class="fab fa-whatsapp"></i> 1 WhatsApp</span>
                    <span><i class="fab fa-instagram"></i> Instagram</span>
                    <span><i class="fab fa-facebook-messenger"></i> Messenger</span>
                  </div>
                </div>
              </label>
              <label class="plano-card" id="plano_advanced">
                <input type="radio" name="plano" value="advanced" onchange="calcularProposta()">
                <div class="plano-content">
                  <div class="plano-nome">Advanced</div>
                  <div class="plano-preco">R$ 1.487<span>/mes</span></div>
                  <div class="plano-canais">
                    <span><i class="fas fa-users"></i> 20 Usuarios</span>
                    <span><i class="fab fa-whatsapp"></i> 1 WhatsApp</span>
                    <span><i class="fab fa-instagram"></i> Instagram</span>
                    <span><i class="fab fa-facebook-messenger"></i> Messenger</span>
                  </div>
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

            <!-- CONSULTORIA - Card destacado -->
            <div style="grid-column: span 3; margin-top: 8px;">
              <label class="consultoria-card" id="consultoria_card">
                <input type="checkbox" id="consultoria" onchange="calcularProposta()">
                <div class="consultoria-content">
                  <div class="consultoria-left">
                    <div class="consultoria-icon">
                      <i class="fas fa-user-tie"></i>
                    </div>
                    <div>
                      <div class="consultoria-title">
                        <i class="fas fa-star" style="color: #f59e0b; font-size: 10px;"></i>
                        Consultoria Paper Vines
                      </div>
                      <div class="consultoria-desc">Acompanhamento, treinamento e implementacao de fluxos pro-ativa</div>
                    </div>
                  </div>
                  <div class="consultoria-right">
                    <div class="consultoria-preco" id="consultoria_preco">R$ 365/mes</div>
                    <div class="consultoria-desconto">
                      <i class="fas fa-gift"></i> Desconto na implantacao
                    </div>
                  </div>
                </div>
              </label>
            </div>

            <div class="form-group" style="grid-column: span 3;">
              <label class="form-label">IA Transcricao de Audio</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="number" class="form-input" id="transcricao_audio" value="0" min="0" max="100" onchange="calcularProposta()" style="width: 80px;">
                <span class="badge badge-warning">R$ 6,99/usuario</span>
                <span style="color: var(--text-secondary); font-size: 13px;">usuarios com transcricao</span>
              </div>
            </div>

            <!-- INFRAESTRUTURA DE NUVEM - Apenas Plus+ e Advanced -->
            <div id="infraestrutura_container" style="grid-column: span 3; display: none;">
              <div style="margin-top: 16px; padding: 16px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08)); border-radius: 12px; border: 1px solid rgba(59, 130, 246, 0.2);">
                <label class="form-label" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                  <i class="fas fa-cloud" style="color: #3b82f6;"></i>
                  Infraestrutura de Nuvem
                  <span class="badge badge-info" style="font-size: 9px;">PLUS+ E ADVANCED</span>
                </label>
                <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
                  Processamento de contatos unicos ativos no mes
                </div>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
                  <label class="infra-card">
                    <input type="radio" name="infraestrutura" value="ate_5000" data-preco="0" onchange="calcularProposta()" checked>
                    <div class="infra-content">
                      <span class="infra-limite">Ate 5.000</span>
                      <span class="infra-preco gratis">Gratis</span>
                    </div>
                  </label>
                  <label class="infra-card">
                    <input type="radio" name="infraestrutura" value="5001_10000" data-preco="900" onchange="calcularProposta()">
                    <div class="infra-content">
                      <span class="infra-limite">5.001 - 10.000</span>
                      <span class="infra-preco">R$ 900/mes</span>
                    </div>
                  </label>
                  <label class="infra-card">
                    <input type="radio" name="infraestrutura" value="10001_20000" data-preco="1500" onchange="calcularProposta()">
                    <div class="infra-content">
                      <span class="infra-limite">10.001 - 20.000</span>
                      <span class="infra-preco">R$ 1.500/mes</span>
                    </div>
                  </label>
                  <label class="infra-card">
                    <input type="radio" name="infraestrutura" value="20001_40000" data-preco="2800" onchange="calcularProposta()">
                    <div class="infra-content">
                      <span class="infra-limite">20.001 - 40.000</span>
                      <span class="infra-preco">R$ 2.800/mes</span>
                    </div>
                  </label>
                </div>
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
            <h4 style="color: var(--primary); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-plus-square"></i> Servicos Adicionais (Taxa Unica)
            </h4>

            <!-- Verificacao BM Meta - Linha propria -->
            <div style="margin-bottom: 16px;">
              <label class="checkbox-card-mini" style="display: inline-flex;">
                <input type="checkbox" id="verificacao_bm" onchange="calcularProposta()">
                <div class="checkbox-content-mini">
                  <i class="fab fa-meta" style="color: #1877F2; font-size: 18px;"></i>
                  <div>
                    <div style="font-weight: 600; font-size: 13px;">Verificacao Business Manager Meta</div>
                    <div style="font-size: 11px; color: var(--text-secondary);">Verificacao de conta comercial para API oficial</div>
                  </div>
                  <div style="font-size: 16px; font-weight: 700; color: #1877F2; margin-left: 12px;">R$ 250</div>
                </div>
              </label>
            </div>

            <!-- Website - 4 opcoes em linha -->
            <div style="margin-bottom: 16px;">
              <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <i class="fas fa-globe" style="color: #3b82f6;"></i> Desenvolvimento de Website
              </div>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
                <label class="servico-mini">
                  <input type="radio" name="website" value="nenhum" data-preco="0" onchange="calcularProposta()" checked>
                  <div class="servico-mini-content">
                    <span class="mini-nome">Nenhum</span>
                    <span class="mini-preco">-</span>
                  </div>
                </label>
                <label class="servico-mini">
                  <input type="radio" name="website" value="starter" data-preco="950" onchange="calcularProposta()">
                  <div class="servico-mini-content">
                    <span class="mini-badge" style="background: #3b82f6;">P</span>
                    <span class="mini-nome">Starter</span>
                    <span class="mini-preco">R$ 950</span>
                    <span class="mini-desc">4 blocos</span>
                  </div>
                </label>
                <label class="servico-mini popular">
                  <input type="radio" name="website" value="business" data-preco="1300" onchange="calcularProposta()">
                  <div class="servico-mini-content">
                    <span class="mini-badge" style="background: #10b981;">M</span>
                    <span class="mini-nome">Business</span>
                    <span class="mini-preco">R$ 1.300</span>
                    <span class="mini-desc">6 blocos</span>
                  </div>
                </label>
                <label class="servico-mini">
                  <input type="radio" name="website" value="premium" data-preco="1500" onchange="calcularProposta()">
                  <div class="servico-mini-content">
                    <span class="mini-badge" style="background: #8b5cf6;">G</span>
                    <span class="mini-nome">Premium</span>
                    <span class="mini-preco">R$ 1.500</span>
                    <span class="mini-desc">9 blocos</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Agentes IA - 4 opcoes em linha -->
            <div>
              <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <i class="fas fa-robot" style="color: #8b5cf6;"></i> Implementacao Agentes I.A.
              </div>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
                <label class="servico-mini">
                  <input type="radio" name="agentes_ia" value="nenhum" data-preco="0" onchange="calcularProposta()" checked>
                  <div class="servico-mini-content">
                    <span class="mini-nome">Nenhum</span>
                    <span class="mini-preco">-</span>
                  </div>
                </label>
                <label class="servico-mini">
                  <input type="radio" name="agentes_ia" value="starter" data-preco="2500" onchange="calcularProposta()">
                  <div class="servico-mini-content">
                    <span class="mini-badge" style="background: #3b82f6;">P</span>
                    <span class="mini-nome">Starter</span>
                    <span class="mini-preco">R$ 2.500</span>
                    <span class="mini-desc">3 agentes</span>
                  </div>
                </label>
                <label class="servico-mini popular">
                  <input type="radio" name="agentes_ia" value="business" data-preco="3800" onchange="calcularProposta()">
                  <div class="servico-mini-content">
                    <span class="mini-badge" style="background: #10b981;">M</span>
                    <span class="mini-nome">Business</span>
                    <span class="mini-preco">R$ 3.800</span>
                    <span class="mini-desc">5 agentes</span>
                  </div>
                </label>
                <label class="servico-mini">
                  <input type="radio" name="agentes_ia" value="enterprise" data-preco="5300" onchange="calcularProposta()">
                  <div class="servico-mini-content">
                    <span class="mini-badge" style="background: #8b5cf6;">G</span>
                    <span class="mini-nome">Enterprise</span>
                    <span class="mini-preco">R$ 5.300</span>
                    <span class="mini-desc">7 agentes</span>
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
          <div id="propostaContent" style="white-space: pre-wrap; font-family: 'Segoe UI', system-ui, sans-serif; background: linear-gradient(135deg, #1a1a2e, #16213e); color: #ffffff; padding: 24px; border-radius: 12px; max-height: 450px; overflow-y: auto; line-height: 1.6; font-size: 14px;"></div>
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
      .plano-canais {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        margin-top: 8px;
      }
      .plano-canais span {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 10px;
        color: var(--text-secondary);
        background: var(--bg-page);
        padding: 3px 6px;
        border-radius: 4px;
      }
      .plano-canais i {
        font-size: 10px;
      }
      .plano-canais .fa-whatsapp { color: #25D366; }
      .plano-canais .fa-instagram { color: #E4405F; }
      .plano-canais .fa-facebook-messenger { color: #0084FF; }
      .plano-canais .fa-users { color: var(--primary); }

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

      /* Checkbox mini para BM Meta */
      .checkbox-card-mini {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border: 2px solid var(--border);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s;
        background: white;
        min-width: 160px;
      }
      .checkbox-card-mini:hover { border-color: #1877F2; }
      .checkbox-card-mini input { display: none; }
      .checkbox-card-mini:has(input:checked) {
        border-color: #1877F2;
        background: rgba(24, 119, 242, 0.05);
      }
      .checkbox-content-mini {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      /* Cards de servico compactos */
      .servico-mini {
        display: block;
        padding: 10px 8px;
        border: 2px solid var(--border);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.15s;
        text-align: center;
        background: white;
      }
      .servico-mini:hover {
        border-color: var(--primary);
        transform: translateY(-1px);
      }
      .servico-mini input { display: none; }
      .servico-mini:has(input:checked) {
        border-color: var(--primary);
        background: rgba(139, 92, 246, 0.08);
      }
      .servico-mini.popular:has(input:checked) {
        border-color: var(--secondary);
        background: rgba(16, 185, 129, 0.08);
      }
      .servico-mini-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }
      .mini-badge {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: var(--border);
        color: white;
        font-weight: 700;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2px;
      }
      .mini-nome {
        font-weight: 600;
        font-size: 11px;
        color: var(--text-primary);
      }
      .mini-preco {
        font-size: 13px;
        font-weight: 700;
        color: var(--primary);
      }
      .servico-mini:has(input:checked) .mini-preco { color: var(--primary); }
      .servico-mini.popular:has(input:checked) .mini-preco { color: var(--secondary); }
      .mini-desc {
        font-size: 9px;
        color: var(--text-secondary);
      }

      /* Cards de infraestrutura */
      .infra-card {
        display: block;
        padding: 12px;
        border: 2px solid var(--border);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        text-align: center;
        background: white;
      }
      .infra-card:hover {
        border-color: #3b82f6;
        transform: translateY(-1px);
      }
      .infra-card input { display: none; }
      .infra-card:has(input:checked) {
        border-color: #3b82f6;
        background: rgba(59, 130, 246, 0.08);
      }
      .infra-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .infra-limite {
        font-size: 12px;
        font-weight: 600;
        color: var(--text-primary);
      }
      .infra-preco {
        font-size: 13px;
        font-weight: 700;
        color: #3b82f6;
      }
      .infra-preco.gratis {
        color: #10b981;
      }

      /* Card de Consultoria */
      .consultoria-card {
        display: block;
        padding: 16px 20px;
        border: 2px solid var(--border);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.03), rgba(139, 92, 246, 0.03));
      }
      .consultoria-card:hover {
        border-color: #f59e0b;
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
      }
      .consultoria-card input { display: none; }
      .consultoria-card:has(input:checked) {
        border-color: #f59e0b;
        background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(139, 92, 246, 0.05));
        box-shadow: 0 4px 16px rgba(245, 158, 11, 0.2);
      }
      .consultoria-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
      .consultoria-left {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .consultoria-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
      }
      .consultoria-title {
        font-weight: 700;
        font-size: 15px;
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 2px;
      }
      .consultoria-desc {
        font-size: 12px;
        color: var(--text-secondary);
      }
      .consultoria-right {
        text-align: right;
      }
      .consultoria-preco {
        font-size: 18px;
        font-weight: 700;
        color: #f59e0b;
      }
      .consultoria-desconto {
        font-size: 10px;
        color: #10b981;
        display: flex;
        align-items: center;
        gap: 4px;
        justify-content: flex-end;
        margin-top: 2px;
      }
    </style>

    <script>
      const PLANOS = {
        essential: { nome: 'Essential', valor: 487, usuarios: 3, implantacao: 1090, usuarioAdicional: 107, canais: ['whatsapp'], consultoria: 365 },
        pro: { nome: 'Pro', valor: 687, usuarios: 5, implantacao: 1490, usuarioAdicional: 87, canais: ['whatsapp', 'instagram', 'messenger'], consultoria: 495 },
        plus: { nome: 'Plus+', valor: 987, usuarios: 10, implantacao: 1990, usuarioAdicional: 57, canais: ['whatsapp', 'instagram', 'messenger'], consultoria: 665 },
        advanced: { nome: 'Advanced', valor: 1487, usuarios: 20, implantacao: 2499, usuarioAdicional: 47, canais: ['whatsapp', 'instagram', 'messenger'], consultoria: 900 }
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

        // Mostrar/ocultar infraestrutura (apenas Plus+ e Advanced)
        const infraContainer = document.getElementById('infraestrutura_container');
        const temInfraestrutura = planoKey === 'plus' || planoKey === 'advanced';
        infraContainer.style.display = temInfraestrutura ? 'block' : 'none';

        // Se nao tem infraestrutura, resetar para "ate_5000"
        if (!temInfraestrutura) {
          const infraRadios = document.getElementsByName('infraestrutura');
          infraRadios[0].checked = true;
        }

        // Atualizar preco da consultoria baseado no plano
        document.getElementById('consultoria_preco').textContent = 'R$ ' + plano.consultoria + '/mes';

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

        // Consultoria Paper Vines
        const temConsultoria = document.getElementById('consultoria').checked;
        if (temConsultoria) {
          adicionais += plano.consultoria;
          itensResumo.push('Consultoria Paper Vines: R$ ' + plano.consultoria.toFixed(2));
        }

        const transcricaoUsuarios = parseInt(document.getElementById('transcricao_audio').value) || 0;
        if (transcricaoUsuarios > 0) {
          const custoTranscricao = transcricaoUsuarios * 6.99;
          adicionais += custoTranscricao;
          itensResumo.push('Transcricao IA (' + transcricaoUsuarios + '): R$ ' + custoTranscricao.toFixed(2));
        }

        // Infraestrutura de Nuvem (apenas Plus+ e Advanced)
        if (temInfraestrutura) {
          const infraRadios = document.getElementsByName('infraestrutura');
          for (let radio of infraRadios) {
            if (radio.checked && parseFloat(radio.dataset.preco) > 0) {
              const custoInfra = parseFloat(radio.dataset.preco);
              adicionais += custoInfra;
              const labelMap = {
                '5001_10000': '5k-10k contatos',
                '10001_20000': '10k-20k contatos',
                '20001_40000': '20k-40k contatos'
              };
              itensResumo.push('Infraestrutura (' + labelMap[radio.value] + '): R$ ' + custoInfra.toFixed(2));
              break;
            }
          }
        }

        const mensalidadeTotal = mensalidadeBase + adicionais;

        // Calcular implantacao
        let implantacaoPlano = plano.implantacao;
        let servicosExtras = 0;
        let descontoConsultoria = 0;

        // Desconto da consultoria na implantacao
        if (temConsultoria) {
          descontoConsultoria = plano.consultoria;
        }

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

        // Implantacao com desconto da consultoria
        const implantacaoComDesconto = Math.max(0, implantacaoPlano - descontoConsultoria);
        const implantacaoTotal = implantacaoComDesconto + servicosExtras;

        // Parcelamento
        const parcelas = parseInt(document.getElementById('parcelas_implantacao').value);
        const valorParcela = implantacaoTotal / parcelas;

        // Atualizar UI
        if (temConsultoria) {
          document.getElementById('taxa_implantacao_plano').innerHTML =
            '<span style="text-decoration: line-through; color: var(--text-secondary); font-size: 14px;">R$ ' + plano.implantacao.toLocaleString('pt-BR', {minimumFractionDigits: 2}) + '</span> ' +
            '<span style="color: #10b981;">' + formatCurrency(implantacaoComDesconto) + '</span>' +
            '<span style="font-size: 10px; color: #10b981; display: block;">(-R$ ' + descontoConsultoria + ' consultoria)</span>';
        } else {
          document.getElementById('taxa_implantacao_plano').textContent = formatCurrency(implantacaoPlano);
        }
        document.getElementById('resumoPlanoBase').textContent = formatCurrency(mensalidadeBase);
        document.getElementById('resumoAdicionais').textContent = formatCurrency(adicionais);
        document.getElementById('valorMensalidade').textContent = formatCurrency(mensalidadeTotal);
        document.getElementById('resumoImplantacaoPlano').innerHTML = temConsultoria ?
          '<span style="text-decoration: line-through; color: var(--text-secondary); font-size: 11px;">R$ ' + plano.implantacao.toLocaleString('pt-BR', {minimumFractionDigits: 2}) + '</span> ' + formatCurrency(implantacaoComDesconto) :
          formatCurrency(implantacaoPlano);
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
        const instagramAdicional = parseInt(document.getElementById('instagram_adicional').value) || 0;
        const messengerAdicional = parseInt(document.getElementById('messenger_adicional').value) || 0;
        const mensalidade = document.getElementById('valorMensalidade').textContent;
        const implantacao = document.getElementById('valorImplantacao').textContent;
        const parcelas = parseInt(document.getElementById('parcelas_implantacao').value);
        const valorParcela = parseFloat(implantacao.replace(/[^0-9,]/g, '').replace(',', '.')) / parcelas;
        const temConsultoria = document.getElementById('consultoria').checked;
        const temInfraestrutura = (planoKey === 'plus' || planoKey === 'advanced');

        let proposta = '📋 *PROPOSTA COMERCIAL*\\n';
        proposta += '━━━━━━━━━━━━━━━━━━━━━━━\\n\\n';

        proposta += '🏢 *PAPER VINES*\\n';
        proposta += 'Solucoes em Automacao e CRM\\n\\n';

        proposta += '📦 *PLANO SELECIONADO*\\n';
        proposta += '▸ ' + plano.nome.toUpperCase() + '\\n\\n';

        proposta += '👥 *RECURSOS INCLUSOS*\\n';
        proposta += '▸ Usuarios: ' + totalUsuarios + ' licencas\\n';
        proposta += '▸ WhatsApp: ' + totalWhatsapp + ' canal(is)\\n';

        if (plano.canais.includes('instagram')) {
          const totalInstagram = 1 + instagramAdicional;
          const totalMessenger = 1 + messengerAdicional;
          proposta += '▸ Instagram: ' + totalInstagram + ' canal(is)\\n';
          proposta += '▸ Messenger: ' + totalMessenger + ' canal(is)\\n';
        } else if (instagramAdicional > 0 || messengerAdicional > 0) {
          if (instagramAdicional > 0) proposta += '▸ Instagram: ' + instagramAdicional + ' canal(is)\\n';
          if (messengerAdicional > 0) proposta += '▸ Messenger: ' + messengerAdicional + ' canal(is)\\n';
        }

        // Extras mensais
        let extras = [];
        if (document.getElementById('automacao_ilimitada').checked) extras.push('Automacao Ilimitada');
        if (document.getElementById('integracao_asaas').checked) extras.push('Integracao ASAAS Bank');
        if (document.getElementById('pagamentos').checked) extras.push('Modulo Pagamentos');
        if (temConsultoria) extras.push('Consultoria Paper Vines');

        const transcricaoUsuarios = parseInt(document.getElementById('transcricao_audio').value) || 0;
        if (transcricaoUsuarios > 0) extras.push('Transcricao IA (' + transcricaoUsuarios + ' usuarios)');

        // Infraestrutura
        if (temInfraestrutura) {
          const infraRadios = document.getElementsByName('infraestrutura');
          for (let radio of infraRadios) {
            if (radio.checked && radio.value !== 'ate_5000') {
              const labelMap = {
                '5001_10000': '5k-10k contatos',
                '10001_20000': '10k-20k contatos',
                '20001_40000': '20k-40k contatos'
              };
              extras.push('Infraestrutura Nuvem (' + labelMap[radio.value] + ')');
              break;
            }
          }
        }

        if (extras.length > 0) {
          proposta += '\\n✨ *EXTRAS INCLUSOS*\\n';
          extras.forEach(e => { proposta += '▸ ' + e + '\\n'; });
        }

        proposta += '\\n━━━━━━━━━━━━━━━━━━━━━━━\\n\\n';

        proposta += '💰 *INVESTIMENTO*\\n\\n';
        proposta += '📅 Mensalidade: *' + mensalidade + '*\\n\\n';
        proposta += '🚀 Implantacao: *' + implantacao + '*\\n';
        if (parcelas > 1) {
          proposta += '   (' + parcelas + 'x de R$ ' + valorParcela.toFixed(2).replace('.', ',') + ' sem juros)\\n';
        }
        if (temConsultoria) {
          proposta += '   🎁 Desconto consultoria aplicado!\\n';
        }

        // Servicos extras de implantacao
        let servicosUnica = [];
        if (document.getElementById('verificacao_bm').checked) servicosUnica.push('Verificacao Business Manager Meta');

        const websiteRadios = document.getElementsByName('website');
        for (let radio of websiteRadios) {
          if (radio.checked && radio.value !== 'nenhum') {
            const nomes = { starter: 'Website Starter', business: 'Website Business', premium: 'Website Premium' };
            servicosUnica.push(nomes[radio.value]);
            break;
          }
        }

        const agentesRadios = document.getElementsByName('agentes_ia');
        for (let radio of agentesRadios) {
          if (radio.checked && radio.value !== 'nenhum') {
            const nomes = { starter: 'Agentes IA Starter', business: 'Agentes IA Business', enterprise: 'Agentes IA Enterprise' };
            servicosUnica.push(nomes[radio.value]);
            break;
          }
        }

        if (servicosUnica.length > 0) {
          proposta += '\\n🔧 *SERVICOS ADICIONAIS*\\n';
          servicosUnica.forEach(s => { proposta += '▸ ' + s + '\\n'; });
        }

        proposta += '\\n━━━━━━━━━━━━━━━━━━━━━━━\\n\\n';

        proposta += '💡 A tecnologia e poderosa, mas quem\\n';
        proposta += '   ativa esse poder e o suporte certo.\\n\\n';

        proposta += '🤝 Nossa equipe esta preparada para\\n';
        proposta += '   superar suas expectativas!\\n\\n';

        proposta += '⏰ *Validade: 7 dias*\\n\\n';

        proposta += '━━━━━━━━━━━━━━━━━━━━━━━\\n';
        proposta += '🌿 Paper Vines | papervines.com.br';

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

  return layout('Calculadora', content, 'calculadora', config);
}

// Calculadora especifica para Cabelo & Saude (Clinica de Tricologia)
function renderCalculadoraCabeloeSaude(tenantData) {
  const config = tenantData.config || {};
  const precos = tenantData.precos || {};
  const PRECOS = precos.PRECOS || {};
  const FORMAS_PAGAMENTO = precos.FORMAS_PAGAMENTO || {};

  const content = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-calculator"></i> Calculadora de Propostas</h1>
      <p class="page-subtitle">Monte propostas personalizadas para tratamentos capilares</p>
    </div>

    <div class="grid grid-3">
      <div class="card" style="grid-column: span 2;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-sliders-h"></i> Configuracao do Tratamento</h3>
        </div>

        <form id="calculadoraForm">
          <!-- AVALIACAO INICIAL -->
          <div style="margin-bottom: 24px;">
            <h4 style="color: var(--primary); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-stethoscope"></i> Avaliacao Inicial
            </h4>
            <label class="checkbox-card" style="max-width: 400px;">
              <input type="checkbox" id="avaliacao" onchange="calcularProposta()" checked>
              <div class="checkbox-content">
                <i class="fas fa-microscope"></i>
                <div>
                  <div class="checkbox-title">Avaliacao Tricologica Completa</div>
                  <div class="checkbox-preco">R$ 350,00</div>
                  <div style="font-size: 11px; color: var(--text-secondary);">Anamnese + tricoscopia + diagnostico</div>
                </div>
              </div>
            </label>
          </div>

          <!-- PACOTE DE TRATAMENTO -->
          <div style="margin-bottom: 24px;">
            <h4 style="color: var(--secondary); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-box"></i> Protocolo de Tratamento
            </h4>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
              <label class="plano-card" id="pacote_basico">
                <input type="radio" name="pacote" value="basico" onchange="calcularProposta()">
                <div class="plano-content">
                  <div class="plano-nome">Basico</div>
                  <div class="plano-preco">R$ 1.800<span>/3 meses</span></div>
                  <div class="plano-canais">
                    <span><i class="fas fa-calendar"></i> 6 sessoes</span>
                    <span><i class="fas fa-bolt"></i> Laser</span>
                  </div>
                </div>
              </label>
              <label class="plano-card" id="pacote_intermediario">
                <input type="radio" name="pacote" value="intermediario" onchange="calcularProposta()" checked>
                <div class="plano-content">
                  <div class="plano-nome">Intermediario</div>
                  <div class="plano-preco">R$ 3.500<span>/6 meses</span></div>
                  <div class="plano-canais">
                    <span><i class="fas fa-calendar"></i> 12 sessoes</span>
                    <span><i class="fas fa-bolt"></i> Laser</span>
                    <span><i class="fas fa-syringe"></i> Micro</span>
                  </div>
                </div>
              </label>
              <label class="plano-card popular" id="pacote_avancado">
                <input type="radio" name="pacote" value="avancado" onchange="calcularProposta()">
                <div class="plano-content">
                  <span class="badge badge-success" style="position: absolute; top: -10px; right: 10px; font-size: 10px;">RECOMENDADO</span>
                  <div class="plano-nome">Avancado</div>
                  <div class="plano-preco">R$ 5.500<span>/9 meses</span></div>
                  <div class="plano-canais">
                    <span><i class="fas fa-calendar"></i> 18 sessoes</span>
                    <span><i class="fas fa-bolt"></i> Laser</span>
                    <span><i class="fas fa-syringe"></i> Micro</span>
                    <span><i class="fas fa-tint"></i> Intra</span>
                  </div>
                </div>
              </label>
              <label class="plano-card" id="pacote_premium">
                <input type="radio" name="pacote" value="premium" onchange="calcularProposta()">
                <div class="plano-content">
                  <div class="plano-nome">Premium</div>
                  <div class="plano-preco">R$ 8.000<span>/12 meses</span></div>
                  <div class="plano-canais">
                    <span><i class="fas fa-calendar"></i> 24 sessoes</span>
                    <span><i class="fas fa-star"></i> Completo</span>
                    <span><i class="fas fa-pills"></i> Suplementos</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- SESSOES EXTRAS -->
          <div style="margin-bottom: 24px;">
            <h4 style="color: var(--accent); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-plus-circle"></i> Sessoes Extras (opcional)
            </h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              <div class="form-group" style="margin: 0;">
                <label class="form-label" style="font-size: 12px;">Laserterapia (R$ 180/sessao)</label>
                <input type="number" class="form-input" id="extra_laser" value="0" min="0" max="10" onchange="calcularProposta()">
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label" style="font-size: 12px;">Microagulhamento (R$ 280/sessao)</label>
                <input type="number" class="form-input" id="extra_micro" value="0" min="0" max="10" onchange="calcularProposta()">
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label" style="font-size: 12px;">Intradermoterapia (R$ 350/sessao)</label>
                <input type="number" class="form-input" id="extra_intra" value="0" min="0" max="10" onchange="calcularProposta()">
              </div>
            </div>
          </div>

          <!-- HOME CARE -->
          <div style="margin-bottom: 24px;">
            <h4 style="color: #6366f1; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-home"></i> Kit Home Care
            </h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              <label class="checkbox-card">
                <input type="radio" name="homecare" value="nenhum" onchange="calcularProposta()" checked>
                <div class="checkbox-content">
                  <i class="fas fa-times-circle" style="color: var(--text-secondary);"></i>
                  <div>
                    <div class="checkbox-title">Sem kit</div>
                    <div class="checkbox-preco" style="color: var(--text-secondary);">R$ 0,00</div>
                  </div>
                </div>
              </label>
              <label class="checkbox-card">
                <input type="radio" name="homecare" value="basico" onchange="calcularProposta()">
                <div class="checkbox-content">
                  <i class="fas fa-box"></i>
                  <div>
                    <div class="checkbox-title">Kit Basico</div>
                    <div class="checkbox-preco">R$ 250,00</div>
                    <div style="font-size: 10px; color: var(--text-secondary);">Shampoo + Tonico</div>
                  </div>
                </div>
              </label>
              <label class="checkbox-card">
                <input type="radio" name="homecare" value="completo" onchange="calcularProposta()">
                <div class="checkbox-content">
                  <i class="fas fa-gift"></i>
                  <div>
                    <div class="checkbox-title">Kit Completo</div>
                    <div class="checkbox-preco">R$ 380,00</div>
                    <div style="font-size: 10px; color: var(--text-secondary);">Shampoo + Tonico + Suplemento</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- FORMA DE PAGAMENTO -->
          <div style="margin-bottom: 24px;">
            <h4 style="color: #10b981; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <i class="fas fa-credit-card"></i> Forma de Pagamento
            </h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              <label class="checkbox-card">
                <input type="radio" name="pagamento" value="pix" onchange="calcularProposta()">
                <div class="checkbox-content">
                  <i class="fas fa-qrcode" style="color: #10b981;"></i>
                  <div>
                    <div class="checkbox-title">Pix</div>
                    <div class="checkbox-preco" style="color: #10b981;">10% desconto</div>
                  </div>
                </div>
              </label>
              <label class="checkbox-card">
                <input type="radio" name="pagamento" value="debito" onchange="calcularProposta()">
                <div class="checkbox-content">
                  <i class="fas fa-credit-card" style="color: #3b82f6;"></i>
                  <div>
                    <div class="checkbox-title">Debito</div>
                    <div class="checkbox-preco" style="color: #3b82f6;">5% desconto</div>
                  </div>
                </div>
              </label>
              <label class="checkbox-card">
                <input type="radio" name="pagamento" value="parcelado" onchange="calcularProposta()" checked>
                <div class="checkbox-content">
                  <i class="fas fa-calendar-alt" style="color: var(--accent);"></i>
                  <div>
                    <div class="checkbox-title">Parcelado</div>
                    <div class="checkbox-preco" style="color: var(--accent);">ate 12x</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

        </form>
      </div>

      <!-- RESUMO -->
      <div class="card" style="position: sticky; top: 100px; height: fit-content;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-receipt"></i> Resumo</h3>
        </div>

        <div id="resumoItens"></div>

        <div style="margin-bottom: 16px; padding: 16px; background: rgba(26, 95, 82, 0.1); border-radius: 8px; border-left: 4px solid var(--primary);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Avaliacao:</span>
            <span id="resumoAvaliacao" style="font-weight: 600;">R$ 350,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Protocolo:</span>
            <span id="resumoProtocolo" style="font-weight: 600;">R$ 3.500,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Sessoes extras:</span>
            <span id="resumoExtras" style="font-weight: 600;">R$ 0,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Home Care:</span>
            <span id="resumoHomecare" style="font-weight: 600;">R$ 0,00</span>
          </div>
        </div>

        <div style="margin-bottom: 16px; padding: 16px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 4px solid #10b981;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Subtotal:</span>
            <span id="valorSubtotal" style="font-weight: 600;">R$ 3.850,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-secondary);">Desconto:</span>
            <span id="valorDesconto" style="font-weight: 600; color: #10b981;">- R$ 0,00</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px dashed var(--border);">
            <span style="font-weight: 600;">TOTAL:</span>
            <span id="valorTotal" style="font-weight: 700; color: var(--primary); font-size: 18px;">R$ 3.850,00</span>
          </div>
          <div id="parcelamentoInfo" style="font-size: 12px; color: var(--text-secondary); margin-top: 8px; text-align: center;"></div>
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
          <h3 class="modal-title">Proposta de Tratamento</h3>
          <button class="modal-close" onclick="closeModal('propostaModal')">&times;</button>
        </div>
        <div class="modal-body">
          <div id="propostaContent" style="white-space: pre-wrap; font-family: 'Segoe UI', system-ui, sans-serif; background: linear-gradient(135deg, #1a5f52, #2d8a7a); color: #ffffff; padding: 24px; border-radius: 12px; max-height: 450px; overflow-y: auto; line-height: 1.6; font-size: 14px;"></div>
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
      .plano-card input { display: none; }
      .plano-card input:checked + .plano-content { color: var(--primary); }
      .plano-card:has(input:checked) {
        border-color: var(--primary);
        background: rgba(26, 95, 82, 0.05);
        box-shadow: 0 4px 12px rgba(26, 95, 82, 0.15);
      }
      .plano-card.popular { border-color: var(--secondary); }
      .plano-card.popular:has(input:checked) {
        border-color: var(--secondary);
        background: rgba(45, 138, 122, 0.05);
      }
      .plano-nome { font-weight: 700; font-size: 16px; margin-bottom: 4px; }
      .plano-preco { font-size: 22px; font-weight: 700; color: var(--primary); margin-bottom: 4px; }
      .plano-preco span { font-size: 12px; font-weight: 400; color: var(--text-secondary); }
      .plano-canais { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }
      .plano-canais span {
        display: inline-flex; align-items: center; gap: 4px;
        font-size: 10px; color: var(--text-secondary);
        background: var(--bg-page); padding: 3px 6px; border-radius: 4px;
      }
      .checkbox-card {
        display: flex; align-items: center; padding: 16px;
        border: 1px solid var(--border); border-radius: 8px;
        cursor: pointer; transition: all 0.2s;
      }
      .checkbox-card:hover { border-color: var(--primary); }
      .checkbox-card input { display: none; }
      .checkbox-card:has(input:checked) {
        border-color: var(--secondary);
        background: rgba(45, 138, 122, 0.05);
      }
      .checkbox-content { display: flex; align-items: center; gap: 12px; }
      .checkbox-content i { font-size: 20px; color: var(--primary); }
      .checkbox-title { font-weight: 600; font-size: 13px; }
      .checkbox-preco { font-size: 12px; color: var(--secondary); font-weight: 600; }
    </style>

    <script>
      const PACOTES = {
        basico: { nome: 'Protocolo Basico', valor: 1800, duracao: '3 meses', sessoes: 6 },
        intermediario: { nome: 'Protocolo Intermediario', valor: 3500, duracao: '6 meses', sessoes: 12 },
        avancado: { nome: 'Protocolo Avancado', valor: 5500, duracao: '9 meses', sessoes: 18 },
        premium: { nome: 'Protocolo Premium', valor: 8000, duracao: '12 meses', sessoes: 24 }
      };

      const SESSOES = {
        laser: 180,
        micro: 280,
        intra: 350
      };

      const HOMECARE = {
        nenhum: 0,
        basico: 250,
        completo: 380
      };

      function getPacoteSelecionado() {
        const radios = document.getElementsByName('pacote');
        for (let radio of radios) {
          if (radio.checked) return radio.value;
        }
        return 'intermediario';
      }

      function getHomecareSelecionado() {
        const radios = document.getElementsByName('homecare');
        for (let radio of radios) {
          if (radio.checked) return radio.value;
        }
        return 'nenhum';
      }

      function getPagamentoSelecionado() {
        const radios = document.getElementsByName('pagamento');
        for (let radio of radios) {
          if (radio.checked) return radio.value;
        }
        return 'parcelado';
      }

      function calcularProposta() {
        const pacoteKey = getPacoteSelecionado();
        const pacote = PACOTES[pacoteKey];
        const homecareKey = getHomecareSelecionado();
        const pagamento = getPagamentoSelecionado();

        // Avaliacao
        const temAvaliacao = document.getElementById('avaliacao').checked;
        const valorAvaliacao = temAvaliacao ? 350 : 0;

        // Protocolo
        const valorProtocolo = pacote.valor;

        // Sessoes extras
        const extraLaser = parseInt(document.getElementById('extra_laser').value) || 0;
        const extraMicro = parseInt(document.getElementById('extra_micro').value) || 0;
        const extraIntra = parseInt(document.getElementById('extra_intra').value) || 0;
        const valorExtras = (extraLaser * SESSOES.laser) + (extraMicro * SESSOES.micro) + (extraIntra * SESSOES.intra);

        // Home care
        const valorHomecare = HOMECARE[homecareKey];

        // Subtotal
        const subtotal = valorAvaliacao + valorProtocolo + valorExtras + valorHomecare;

        // Desconto
        let desconto = 0;
        if (pagamento === 'pix') {
          desconto = subtotal * 0.10;
        } else if (pagamento === 'debito') {
          desconto = subtotal * 0.05;
        }

        const total = subtotal - desconto;

        // Atualizar UI
        document.getElementById('resumoAvaliacao').textContent = formatCurrency(valorAvaliacao);
        document.getElementById('resumoProtocolo').textContent = formatCurrency(valorProtocolo);
        document.getElementById('resumoExtras').textContent = formatCurrency(valorExtras);
        document.getElementById('resumoHomecare').textContent = formatCurrency(valorHomecare);
        document.getElementById('valorSubtotal').textContent = formatCurrency(subtotal);
        document.getElementById('valorDesconto').textContent = '- ' + formatCurrency(desconto);
        document.getElementById('valorTotal').textContent = formatCurrency(total);

        // Parcelamento
        if (pagamento === 'parcelado') {
          const parcela12x = total / 12;
          document.getElementById('parcelamentoInfo').textContent = 'ou 12x de ' + formatCurrency(parcela12x);
        } else {
          document.getElementById('parcelamentoInfo').textContent = pagamento === 'pix' ? '10% de desconto aplicado' : '5% de desconto aplicado';
        }

        // Itens resumo
        let itens = [];
        if (extraLaser > 0) itens.push(extraLaser + 'x Laserterapia: ' + formatCurrency(extraLaser * SESSOES.laser));
        if (extraMicro > 0) itens.push(extraMicro + 'x Microagulhamento: ' + formatCurrency(extraMicro * SESSOES.micro));
        if (extraIntra > 0) itens.push(extraIntra + 'x Intradermoterapia: ' + formatCurrency(extraIntra * SESSOES.intra));

        document.getElementById('resumoItens').innerHTML = itens.length > 0 ?
          '<div style="padding: 12px; background: var(--bg-page); border-radius: 8px; margin-bottom: 8px;">' +
          itens.map(i => '<div style="padding: 4px 0; font-size: 12px; color: var(--text-secondary);">' + i + '</div>').join('') +
          '</div>' : '';
      }

      function gerarProposta() {
        const pacoteKey = getPacoteSelecionado();
        const pacote = PACOTES[pacoteKey];
        const temAvaliacao = document.getElementById('avaliacao').checked;
        const homecareKey = getHomecareSelecionado();
        const pagamento = getPagamentoSelecionado();
        const total = document.getElementById('valorTotal').textContent;

        let proposta = '💆 *PROPOSTA DE TRATAMENTO CAPILAR*\\n';
        proposta += '━━━━━━━━━━━━━━━━━━━━━━━\\n\\n';

        proposta += '🏥 *CABELO & SAUDE*\\n';
        proposta += 'Clinica de Tricologia\\n\\n';

        if (temAvaliacao) {
          proposta += '🔬 *AVALIACAO TRICOLOGICA*\\n';
          proposta += '▸ Anamnese completa\\n';
          proposta += '▸ Tricoscopia digital\\n';
          proposta += '▸ Diagnostico e proposta\\n\\n';
        }

        proposta += '📦 *PROTOCOLO SELECIONADO*\\n';
        proposta += '▸ ' + pacote.nome.toUpperCase() + '\\n';
        proposta += '▸ Duracao: ' + pacote.duracao + '\\n';
        proposta += '▸ Total de sessoes: ' + pacote.sessoes + '\\n\\n';

        // Extras
        const extraLaser = parseInt(document.getElementById('extra_laser').value) || 0;
        const extraMicro = parseInt(document.getElementById('extra_micro').value) || 0;
        const extraIntra = parseInt(document.getElementById('extra_intra').value) || 0;

        if (extraLaser > 0 || extraMicro > 0 || extraIntra > 0) {
          proposta += '✨ *SESSOES ADICIONAIS*\\n';
          if (extraLaser > 0) proposta += '▸ ' + extraLaser + 'x Laserterapia\\n';
          if (extraMicro > 0) proposta += '▸ ' + extraMicro + 'x Microagulhamento\\n';
          if (extraIntra > 0) proposta += '▸ ' + extraIntra + 'x Intradermoterapia\\n';
          proposta += '\\n';
        }

        if (homecareKey !== 'nenhum') {
          proposta += '🏠 *KIT HOME CARE*\\n';
          proposta += '▸ Kit ' + (homecareKey === 'completo' ? 'Completo' : 'Basico') + ' incluso\\n\\n';
        }

        proposta += '━━━━━━━━━━━━━━━━━━━━━━━\\n\\n';

        proposta += '💰 *INVESTIMENTO*\\n\\n';
        proposta += '▸ Total: *' + total + '*\\n';

        if (pagamento === 'pix') {
          proposta += '▸ 🎁 10% desconto no Pix\\n';
        } else if (pagamento === 'debito') {
          proposta += '▸ 🎁 5% desconto no debito\\n';
        } else {
          const parcela = parseFloat(total.replace(/[^0-9,]/g, '').replace(',', '.')) / 12;
          proposta += '▸ ou 12x de R$ ' + parcela.toFixed(2).replace('.', ',') + '\\n';
        }

        proposta += '\\n━━━━━━━━━━━━━━━━━━━━━━━\\n\\n';

        proposta += '🌿 Cuidar dos seus cabelos e\\n';
        proposta += '   investir na sua autoestima!\\n\\n';

        proposta += '⏰ *Validade: 7 dias*\\n\\n';

        proposta += '━━━━━━━━━━━━━━━━━━━━━━━\\n';
        proposta += '💚 Cabelo & Saude | cabeloesaude.com.br';

        document.getElementById('propostaContent').textContent = proposta.replace(/\\\\n/g, '\\n');
        openModal('propostaModal');
      }

      function copiarProposta() {
        const proposta = document.getElementById('propostaContent').textContent;
        navigator.clipboard.writeText(proposta).then(() => { showToast('Proposta copiada!'); });
      }

      function copiarResumo() {
        const pacoteKey = getPacoteSelecionado();
        const pacote = PACOTES[pacoteKey];
        const total = document.getElementById('valorTotal').textContent;
        const resumo = 'Protocolo: ' + pacote.nome + '\\nTotal: ' + total;
        navigator.clipboard.writeText(resumo).then(() => { showToast('Resumo copiado!'); });
      }

      // Inicializar
      calcularProposta();
    </script>
  `;

  return layout('Calculadora', content, 'calculadora', config);
}
