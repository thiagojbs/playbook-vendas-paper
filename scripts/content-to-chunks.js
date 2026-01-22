/**
 * Script para converter conteudo do playbook em chunks para indexacao RAG
 *
 * Uso: node scripts/content-to-chunks.js <tenant>
 * Exemplo: node scripts/content-to-chunks.js papervines
 *
 * Saida: Gera arquivo JSON com chunks prontos para indexacao
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuracoes de chunking
const CONFIG = {
  maxChunkSize: 1500,       // Caracteres max por chunk
  overlapSize: 200,          // Sobreposicao entre chunks
  minChunkSize: 100          // Tamanho minimo para criar chunk
};

/**
 * Funcao principal
 */
async function main() {
  const tenant = process.argv[2] || 'papervines';

  console.log(`\n=== Gerando chunks para tenant: ${tenant} ===\n`);

  const tenantPath = path.join(__dirname, '..', 'src', 'data', 'tenants', tenant);

  // Verifica se tenant existe (fallback para estrutura atual)
  let basePath = tenantPath;
  if (!fs.existsSync(tenantPath)) {
    basePath = path.join(__dirname, '..', 'src', 'data');
    console.log(`Usando estrutura atual em: ${basePath}`);
  }

  const allChunks = [];

  // Processa cada tipo de conteudo
  const contentTypes = [
    { file: 'playbook.js', processor: processPlaybook },
    { file: 'objecoes.js', processor: processObjecoes },
    { file: 'scripts.js', processor: processScripts },
    { file: 'precos.js', processor: processPrecos },
    { file: 'agentes.js', processor: processAgentes }
  ];

  for (const { file, processor } of contentTypes) {
    const filePath = path.join(basePath, file);

    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const chunks = processor(content, tenant);
        allChunks.push(...chunks);
        console.log(`${file}: ${chunks.length} chunks gerados`);
      } catch (error) {
        console.error(`Erro processando ${file}:`, error.message);
      }
    } else {
      console.log(`${file}: arquivo nao encontrado`);
    }
  }

  // Salva resultado
  const outputPath = path.join(__dirname, '..', 'output', `${tenant}-chunks.json`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(allChunks, null, 2));

  console.log(`\n=== Resumo ===`);
  console.log(`Total de chunks: ${allChunks.length}`);
  console.log(`Arquivo gerado: ${outputPath}`);

  // Estatisticas
  const byCategory = {};
  allChunks.forEach(c => {
    byCategory[c.category] = (byCategory[c.category] || 0) + 1;
  });
  console.log('\nChunks por categoria:');
  Object.entries(byCategory).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });

  // Estimativa de custo de embeddings
  const totalChars = allChunks.reduce((sum, c) => sum + c.text.length, 0);
  const estimatedTokens = Math.ceil(totalChars / 4);
  const estimatedCost = (estimatedTokens / 1000000) * 0.02; // $0.02 por 1M tokens
  console.log(`\nEstimativa de embeddings:`);
  console.log(`  Caracteres: ${totalChars.toLocaleString()}`);
  console.log(`  Tokens estimados: ${estimatedTokens.toLocaleString()}`);
  console.log(`  Custo estimado: $${estimatedCost.toFixed(4)}`);

  return allChunks;
}

/**
 * Processa arquivo de playbook
 */
function processPlaybook(content, tenant) {
  const chunks = [];

  // Extrai exports do arquivo JS
  const exports = extractJSExports(content);

  // PLAYBOOK_CONTENT
  if (exports.PLAYBOOK_CONTENT) {
    const playbook = exports.PLAYBOOK_CONTENT;

    // Processa cada secao
    if (playbook.etapasFunil) {
      playbook.etapasFunil.forEach((etapa, idx) => {
        chunks.push({
          id: `playbook-funil-${idx}`,
          category: 'playbook',
          title: `Funil: ${etapa.nome}`,
          text: formatEtapaFunil(etapa),
          tenant
        });
      });
    }

    if (playbook.perfisCliente) {
      playbook.perfisCliente.forEach((perfil, idx) => {
        chunks.push({
          id: `playbook-perfil-${idx}`,
          category: 'playbook',
          title: `Perfil Cliente: ${perfil.tipo}`,
          text: formatPerfilCliente(perfil),
          tenant
        });
      });
    }

    if (playbook.tecnicasFechamento) {
      playbook.tecnicasFechamento.forEach((tecnica, idx) => {
        chunks.push({
          id: `playbook-fechamento-${idx}`,
          category: 'playbook',
          title: `Tecnica: ${tecnica.nome}`,
          text: formatTecnicaFechamento(tecnica),
          tenant
        });
      });
    }
  }

  return chunks;
}

/**
 * Processa arquivo de objecoes
 */
function processObjecoes(content, tenant) {
  const chunks = [];
  const exports = extractJSExports(content);

  if (exports.OBJECOES) {
    exports.OBJECOES.forEach((objecao, idx) => {
      // Cada objecao vira um chunk separado para busca precisa
      chunks.push({
        id: `objecao-${idx}`,
        category: 'objecoes',
        title: objecao.objecao || objecao.tipo || `Objecao ${idx + 1}`,
        text: formatObjecao(objecao),
        tenant
      });
    });
  }

  return chunks;
}

/**
 * Processa arquivo de scripts
 */
function processScripts(content, tenant) {
  const chunks = [];
  const exports = extractJSExports(content);

  if (exports.SCRIPTS) {
    exports.SCRIPTS.forEach((script, idx) => {
      chunks.push({
        id: `script-${idx}`,
        category: 'scripts',
        title: script.situacao || script.nome || `Script ${idx + 1}`,
        text: formatScript(script),
        tenant
      });
    });
  }

  return chunks;
}

/**
 * Processa arquivo de precos
 */
function processPrecos(content, tenant) {
  const chunks = [];
  const exports = extractJSExports(content);

  // PRECOS
  if (exports.PRECOS) {
    // Chunk geral com valores base
    chunks.push({
      id: 'precos-base',
      category: 'precos',
      title: 'Precos Base e Mensalidade',
      text: formatPrecosBase(exports.PRECOS),
      tenant
    });

    // Chunk para usuarios
    if (exports.PRECOS.usuarios) {
      chunks.push({
        id: 'precos-usuarios',
        category: 'precos',
        title: 'Precos por Usuario Adicional',
        text: formatPrecosUsuarios(exports.PRECOS.usuarios),
        tenant
      });
    }

    // Chunk para integrações
    if (exports.PRECOS.integracoes) {
      chunks.push({
        id: 'precos-integracoes',
        category: 'precos',
        title: 'Precos de Integracoes',
        text: formatPrecosIntegracoes(exports.PRECOS.integracoes),
        tenant
      });
    }
  }

  // PLANOS_CHATBOTS
  if (exports.PLANOS_CHATBOTS) {
    Object.entries(exports.PLANOS_CHATBOTS).forEach(([key, plano]) => {
      chunks.push({
        id: `plano-chatbot-${key}`,
        category: 'precos',
        title: `Plano Chatbot: ${plano.nome}`,
        text: formatPlano(plano),
        tenant
      });
    });
  }

  // PLANOS_IA
  if (exports.PLANOS_IA) {
    Object.entries(exports.PLANOS_IA).forEach(([key, plano]) => {
      chunks.push({
        id: `plano-ia-${key}`,
        category: 'precos',
        title: `Plano IA: ${plano.nome}`,
        text: formatPlanoIA(plano),
        tenant
      });
    });
  }

  // PLANOS_TELECOM
  if (exports.PLANOS_TELECOM) {
    Object.entries(exports.PLANOS_TELECOM).forEach(([key, plano]) => {
      chunks.push({
        id: `plano-telecom-${key}`,
        category: 'precos',
        title: `Plano Telecom: ${plano.nome}`,
        text: formatPlanoTelecom(plano),
        tenant
      });
    });
  }

  return chunks;
}

/**
 * Processa arquivo de agentes
 */
function processAgentes(content, tenant) {
  const chunks = [];
  const exports = extractJSExports(content);

  if (exports.AGENTES) {
    exports.AGENTES.forEach((agente, idx) => {
      chunks.push({
        id: `agente-${idx}`,
        category: 'agentes',
        title: agente.nome || `Agente ${idx + 1}`,
        text: formatAgente(agente),
        tenant
      });
    });
  }

  return chunks;
}

// ============================================
// FUNCOES DE FORMATACAO
// ============================================

function formatEtapaFunil(etapa) {
  let text = `Etapa do Funil: ${etapa.nome}\n`;
  if (etapa.descricao) text += `Descricao: ${etapa.descricao}\n`;
  if (etapa.objetivo) text += `Objetivo: ${etapa.objetivo}\n`;
  if (etapa.acoes) text += `Acoes: ${etapa.acoes.join(', ')}\n`;
  if (etapa.metricas) text += `Metricas: ${etapa.metricas.join(', ')}\n`;
  return text.trim();
}

function formatPerfilCliente(perfil) {
  let text = `Perfil de Cliente: ${perfil.tipo}\n`;
  if (perfil.caracteristicas) text += `Caracteristicas: ${perfil.caracteristicas.join(', ')}\n`;
  if (perfil.comoAbordar) text += `Como Abordar: ${perfil.comoAbordar}\n`;
  if (perfil.cuidados) text += `Cuidados: ${perfil.cuidados}\n`;
  return text.trim();
}

function formatTecnicaFechamento(tecnica) {
  let text = `Tecnica de Fechamento: ${tecnica.nome}\n`;
  if (tecnica.descricao) text += `Descricao: ${tecnica.descricao}\n`;
  if (tecnica.quando) text += `Quando Usar: ${tecnica.quando}\n`;
  if (tecnica.exemplo) text += `Exemplo: ${tecnica.exemplo}\n`;
  return text.trim();
}

function formatObjecao(objecao) {
  let text = '';

  if (objecao.objecao) {
    text += `Objecao do Cliente: "${objecao.objecao}"\n\n`;
  }

  if (objecao.contexto) {
    text += `Contexto: ${objecao.contexto}\n\n`;
  }

  if (objecao.resposta) {
    text += `Resposta Sugerida: ${objecao.resposta}\n\n`;
  }

  if (objecao.argumentos) {
    text += `Argumentos:\n`;
    objecao.argumentos.forEach(arg => {
      text += `- ${arg}\n`;
    });
    text += '\n';
  }

  if (objecao.tecnicas) {
    text += `Tecnicas a Usar: ${objecao.tecnicas.join(', ')}\n`;
  }

  return text.trim();
}

function formatScript(script) {
  let text = `Script: ${script.situacao || script.nome}\n\n`;

  if (script.objetivo) {
    text += `Objetivo: ${script.objetivo}\n\n`;
  }

  if (script.mensagem) {
    text += `Mensagem:\n${script.mensagem}\n\n`;
  }

  if (script.passos) {
    text += `Passos:\n`;
    script.passos.forEach((passo, i) => {
      text += `${i + 1}. ${passo}\n`;
    });
  }

  if (script.variacoes) {
    text += `\nVariacoes:\n`;
    script.variacoes.forEach(v => {
      text += `- ${v}\n`;
    });
  }

  return text.trim();
}

function formatPrecosBase(precos) {
  let text = 'Precos Base Paper Vines:\n\n';
  text += `Mensalidade Base: R$ ${precos.mensalidade_base}\n`;
  text += `Usuarios Inclusos: ${precos.usuarios?.inclusos || 3}\n`;
  text += `WhatsApp Inclusos: ${precos.whatsapp?.inclusos || 1}\n`;
  text += `WhatsApp Extra: R$ ${precos.whatsapp?.extra}/numero\n`;
  text += `Instagram: R$ ${precos.instagram}\n`;
  text += `Messenger: R$ ${precos.messenger}\n`;
  return text.trim();
}

function formatPrecosUsuarios(usuarios) {
  let text = 'Precos por Usuario Adicional:\n\n';
  text += `Usuarios inclusos no plano: ${usuarios.inclusos}\n\n`;
  text += 'Faixas de preco:\n';

  usuarios.faixas.forEach(faixa => {
    text += `- De ${faixa.min} a ${faixa.max} usuarios: R$ ${faixa.valor}/usuario\n`;
  });

  return text.trim();
}

function formatPrecosIntegracoes(integracoes) {
  let text = 'Precos de Integracoes e Addons:\n\n';

  Object.entries(integracoes).forEach(([key, valor]) => {
    const nome = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    text += `- ${nome}: R$ ${valor}\n`;
  });

  return text.trim();
}

function formatPlano(plano) {
  let text = `Plano: ${plano.nome}\n`;
  text += `Valor: R$ ${plano.valor}\n`;

  if (plano.parcelado) {
    text += `Parcelado: ${plano.parcelado}\n`;
  }

  if (plano.funcionalidades) {
    text += `\nFuncionalidades incluidas:\n`;
    plano.funcionalidades.forEach(f => {
      text += `- ${f}\n`;
    });
  }

  return text.trim();
}

function formatPlanoIA(plano) {
  let text = `Plano de IA: ${plano.nome}\n`;
  text += `Valor de Implantacao: R$ ${plano.valor}\n`;

  if (plano.componentes) {
    text += `\nComponentes incluidos:\n`;
    plano.componentes.forEach(c => {
      text += `- ${c}\n`;
    });
  }

  return text.trim();
}

function formatPlanoTelecom(plano) {
  let text = `Plano Telecom: ${plano.nome}\n`;
  text += `Valor: R$ ${plano.valor}\n`;

  if (plano.parcelado) {
    text += `Parcelado: ${plano.parcelado}\n`;
  }

  if (plano.funcionalidades) {
    text += `\nFuncionalidades:\n`;
    plano.funcionalidades.forEach(f => {
      text += `- ${f}\n`;
    });
  }

  return text.trim();
}

function formatAgente(agente) {
  let text = `Agente: ${agente.nome}\n`;

  if (agente.funcao) text += `Funcao: ${agente.funcao}\n`;
  if (agente.descricao) text += `Descricao: ${agente.descricao}\n`;
  if (agente.habilidades) {
    text += `Habilidades: ${agente.habilidades.join(', ')}\n`;
  }

  return text.trim();
}

// ============================================
// FUNCOES AUXILIARES
// ============================================

/**
 * Extrai exports de um arquivo JS
 * Usa avaliacao simples - em producao usar parser AST
 */
function extractJSExports(content) {
  const exports = {};

  // Remove comentarios
  let cleanContent = content
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');

  // Encontra exports
  const exportRegex = /export\s+const\s+(\w+)\s*=\s*/g;
  let match;

  while ((match = exportRegex.exec(cleanContent)) !== null) {
    const varName = match[1];
    const startIdx = match.index + match[0].length;

    try {
      // Extrai o valor (array ou objeto)
      const value = extractValue(cleanContent.substring(startIdx));
      if (value) {
        exports[varName] = value;
      }
    } catch (e) {
      console.warn(`Erro extraindo ${varName}:`, e.message);
    }
  }

  return exports;
}

/**
 * Extrai valor JS (objeto ou array)
 */
function extractValue(str) {
  str = str.trim();

  if (str.startsWith('{')) {
    return extractObject(str);
  }

  if (str.startsWith('[')) {
    return extractArray(str);
  }

  return null;
}

/**
 * Extrai objeto JS
 */
function extractObject(str) {
  let depth = 0;
  let end = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === '{') depth++;
    else if (char === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }

  if (end > 0) {
    try {
      // Converte para JSON valido
      let jsonStr = str.substring(0, end)
        .replace(/(\w+):/g, '"$1":')           // Chaves sem aspas
        .replace(/'/g, '"')                     // Aspas simples para duplas
        .replace(/,\s*([}\]])/g, '$1')          // Remove virgulas finais
        .replace(/\n/g, ' ');                   // Remove quebras

      return JSON.parse(jsonStr);
    } catch (e) {
      return null;
    }
  }

  return null;
}

/**
 * Extrai array JS
 */
function extractArray(str) {
  let depth = 0;
  let end = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === '[' || char === '{') depth++;
    else if (char === ']' || char === '}') {
      depth--;
      if (depth === 0 && char === ']') {
        end = i + 1;
        break;
      }
    }
  }

  if (end > 0) {
    try {
      let jsonStr = str.substring(0, end)
        .replace(/(\w+):/g, '"$1":')
        .replace(/'/g, '"')
        .replace(/,\s*([}\]])/g, '$1')
        .replace(/\n/g, ' ');

      return JSON.parse(jsonStr);
    } catch (e) {
      return null;
    }
  }

  return null;
}

// Executa
main().catch(console.error);
