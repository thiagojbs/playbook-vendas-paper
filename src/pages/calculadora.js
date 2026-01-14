import { layout } from '../templates/layout.js';

export function renderCalculadora() {
  const content = `
    <div class="page-header">
      <h1 class="page-title">Calculadora de Propostas</h1>
      <p class="page-subtitle">Monte propostas personalizadas para seus clientes</p>
    </div>

    <div class="grid grid-3">
      <div class="card" style="grid-column: span 2;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-sliders-h"></i> Configuracao da Proposta</h3>
        </div>

        <form id="calculadoraForm">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="grid-column: span 2;"><h4 style="color: var(--primary); margin-bottom: 16px;"><i class="fas fa-desktop"></i> Licenca Plataforma Paper Vines</h4></div>

            <div class="form-group">
              <label class="form-label">Usuarios Totais</label>
              <select class="form-select" id="usuarios" onchange="calcularProposta()">
                <option value="3" data-preco="0">3 usuarios (incluso)</option>
                <option value="4" data-preco="39">4 usuarios (+R$ 39)</option>
                <option value="5" data-preco="78">5 usuarios (+R$ 78)</option>
                <option value="10" data-preco="273">10 usuarios (+R$ 273)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Canais de WhatsApp</label>
              <select class="form-select" id="whatsapp" onchange="calcularProposta()">
                <option value="1" data-preco="0">1 canal (incluso)</option>
                <option value="2" data-preco="89">2 canais (+R$ 89)</option>
                <option value="3" data-preco="178">3 canais (+R$ 178)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Instagram (Direct)</label>
              <select class="form-select" id="instagram" onchange="calcularProposta()">
                <option value="0" data-preco="0">Nao</option>
                <option value="1" data-preco="69">Sim (+R$ 69)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Facebook (Messenger)</label>
              <select class="form-select" id="messenger" onchange="calcularProposta()">
                <option value="0" data-preco="0">Nao</option>
                <option value="1" data-preco="69">Sim (+R$ 69)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Infraestrutura de Nuvem</label>
              <select class="form-select" id="infraestrutura" onchange="calcularProposta()">
                <option value="ate_5000" data-preco="0" data-suporte="230">Ate 5.000 contatos (incluso)</option>
                <option value="5001_10000" data-preco="900" data-suporte="630">5.001 ate 10.000 (+R$ 900)</option>
                <option value="10001_20000" data-preco="1800" data-suporte="630">10.001 ate 20.000 (+R$ 1.800)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Transcricao de Audio com IA</label>
              <select class="form-select" id="transcricao" onchange="calcularProposta()">
                <option value="0" data-preco="0">Nao</option>
                <option value="1" data-preco="6.99">1 usuario (+R$ 6,99)</option>
                <option value="3" data-preco="20.97">3 usuarios (+R$ 20,97)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Integracao Asas</label>
              <select class="form-select" id="asas" onchange="calcularProposta()">
                <option value="0" data-preco="0">Nao</option>
                <option value="1" data-preco="99">Sim (+R$ 99)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Agentes Inteligentes (mensal)</label>
              <select class="form-select" id="agentes_mensal" onchange="calcularProposta()">
                <option value="0" data-preco="0">Nao</option>
                <option value="1" data-preco="150">Sim (+R$ 150/mes)</option>
              </select>
            </div>

            <div style="grid-column: span 2; margin-top: 24px;"><h4 style="color: var(--accent); margin-bottom: 16px;"><i class="fas fa-cogs"></i> Implantacoes (Taxa Unica)</h4></div>

            <div class="form-group">
              <label class="form-label">Plano de Chatbots</label>
              <select class="form-select" id="chatbot" onchange="calcularProposta()">
                <option value="nenhum" data-preco="0">Nenhum</option>
                <option value="basic" data-preco="1500">Basic (R$ 1.500)</option>
                <option value="master" data-preco="2600">Master (R$ 2.600)</option>
                <option value="fusion" data-preco="3600">Fusion (R$ 3.600)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Plano de Agentes IA</label>
              <select class="form-select" id="ia" onchange="calcularProposta()">
                <option value="nenhum" data-preco="0">Nenhum</option>
                <option value="basic" data-preco="2500">Basic - 3 agentes (R$ 2.500)</option>
                <option value="master" data-preco="3800">Master - 5 agentes (R$ 3.800)</option>
                <option value="fusion" data-preco="5300">Fusion - 7 agentes (R$ 5.300)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Solucao Telecom</label>
              <select class="form-select" id="telecom" onchange="calcularProposta()">
                <option value="nenhum" data-preco="0">Nenhum</option>
                <option value="basic" data-preco="990">Basic (R$ 990)</option>
                <option value="master" data-preco="2600">Master (R$ 2.600)</option>
                <option value="fusion" data-preco="3600">Fusion (R$ 3.600)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Verificacao BM do Meta</label>
              <select class="form-select" id="verificacao_bm" onchange="calcularProposta()">
                <option value="0" data-preco="0">Nao</option>
                <option value="1" data-preco="250">Sim (+R$ 250)</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div class="card" style="position: sticky; top: 32px; height: fit-content;">
        <div class="card-header">
          <h3 class="card-title"><i class="fas fa-receipt"></i> Resumo</h3>
        </div>

        <div style="margin-bottom: 24px;">
          <div style="color: var(--text-secondary); font-size: 14px; margin-bottom: 4px;">Mensalidade</div>
          <div class="valor-display" id="valorMensalidade">R$ 717,00</div>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border); margin: 20px 0;">

        <div style="margin-bottom: 24px;">
          <div style="color: var(--text-secondary); font-size: 14px; margin-bottom: 4px;">Implantacao (taxa unica)</div>
          <div class="valor-display" id="valorImplantacao" style="color: var(--accent);">R$ 0,00</div>
        </div>

        <hr style="border: none; border-top: 1px solid var(--border); margin: 20px 0;">

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: var(--bg-dark); border-radius: 8px; margin-bottom: 20px;">
          <div>
            <div style="font-size: 12px; color: var(--text-secondary);">PRIMEIRO MES</div>
            <div style="font-size: 24px; font-weight: 700; color: var(--success);" id="valorTotal">R$ 717,00</div>
          </div>
        </div>

        <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="gerarProposta()">
          <i class="fas fa-file-export"></i> Gerar Proposta
        </button>

        <button class="btn btn-secondary" style="width: 100%; justify-content: center; margin-top: 8px;" onclick="copiarResumo()">
          <i class="fas fa-copy"></i> Copiar Resumo
        </button>
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

    <script>
      const MENSALIDADE_BASE = 487;
      const SUPORTE_BASE = 230;

      function calcularProposta() {
        let mensalidade = MENSALIDADE_BASE;
        const usuarios = document.getElementById('usuarios');
        mensalidade += parseFloat(usuarios.options[usuarios.selectedIndex].dataset.preco);
        const whatsapp = document.getElementById('whatsapp');
        mensalidade += parseFloat(whatsapp.options[whatsapp.selectedIndex].dataset.preco);
        const instagram = document.getElementById('instagram');
        mensalidade += parseFloat(instagram.options[instagram.selectedIndex].dataset.preco);
        const messenger = document.getElementById('messenger');
        mensalidade += parseFloat(messenger.options[messenger.selectedIndex].dataset.preco);
        const infra = document.getElementById('infraestrutura');
        mensalidade += parseFloat(infra.options[infra.selectedIndex].dataset.preco);
        const suportePreco = parseFloat(infra.options[infra.selectedIndex].dataset.suporte);
        mensalidade += suportePreco;
        const transcricao = document.getElementById('transcricao');
        mensalidade += parseFloat(transcricao.options[transcricao.selectedIndex].dataset.preco);
        const asas = document.getElementById('asas');
        mensalidade += parseFloat(asas.options[asas.selectedIndex].dataset.preco);
        const agentesMensal = document.getElementById('agentes_mensal');
        mensalidade += parseFloat(agentesMensal.options[agentesMensal.selectedIndex].dataset.preco);

        let implantacao = 0;
        const chatbot = document.getElementById('chatbot');
        implantacao += parseFloat(chatbot.options[chatbot.selectedIndex].dataset.preco);
        const ia = document.getElementById('ia');
        implantacao += parseFloat(ia.options[ia.selectedIndex].dataset.preco);
        const telecom = document.getElementById('telecom');
        implantacao += parseFloat(telecom.options[telecom.selectedIndex].dataset.preco);
        const verificacaoBm = document.getElementById('verificacao_bm');
        implantacao += parseFloat(verificacaoBm.options[verificacaoBm.selectedIndex].dataset.preco);

        document.getElementById('valorMensalidade').textContent = formatCurrency(mensalidade);
        document.getElementById('valorImplantacao').textContent = formatCurrency(implantacao);
        document.getElementById('valorTotal').textContent = formatCurrency(mensalidade + implantacao);
      }

      function gerarProposta() {
        const usuarios = document.getElementById('usuarios').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const instagram = document.getElementById('instagram').value;
        const messenger = document.getElementById('messenger').value;
        const mensalidade = document.getElementById('valorMensalidade').textContent;
        const implantacao = document.getElementById('valorImplantacao').textContent;

        let proposta = '*Licenca Plataforma Paper Vines*\\nUsuarios: ate ' + usuarios + '\\nWhatsApp: ' + whatsapp;
        if (instagram === '1') proposta += '\\nInstagram: 1';
        if (messenger === '1') proposta += '\\nMessenger: 1';
        proposta += '\\nSuporte para duvidas de usabilidade.\\n\\n*Mensalidade: ' + mensalidade + '*\\n\\nA tecnologia e poderosa, mas quem ativa esse poder e o suporte certo.\\nNossa equipe esta preparada para superar suas expectativas.\\n\\n*Validade da proposta: 7 dias*';

        document.getElementById('propostaContent').textContent = proposta.replace(/\\\\n/g, '\\n');
        openModal('propostaModal');
      }

      function copiarProposta() {
        const proposta = document.getElementById('propostaContent').textContent;
        navigator.clipboard.writeText(proposta).then(() => { showToast('Proposta copiada!'); });
      }

      function copiarResumo() {
        const mensalidade = document.getElementById('valorMensalidade').textContent;
        const implantacao = document.getElementById('valorImplantacao').textContent;
        const total = document.getElementById('valorTotal').textContent;
        const resumo = 'Mensalidade: ' + mensalidade + '\\nImplantacao: ' + implantacao + '\\nTotal 1o mes: ' + total;
        navigator.clipboard.writeText(resumo).then(() => { showToast('Resumo copiado!'); });
      }

      calcularProposta();
    </script>
  `;

  return layout('Calculadora', content, 'calculadora');
}
