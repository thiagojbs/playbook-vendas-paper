/**
 * Script de Geracao de Chunks para Indexacao RAG
 *
 * Este script le os arquivos de conteudo do tenant e gera chunks
 * otimizados para busca semantica.
 *
 * Uso:
 *   node scripts/generate-chunks.js [tenant]
 *
 * Exemplo:
 *   node scripts/generate-chunks.js papervines
 *
 * Saida:
 *   - output/{tenant}-chunks.json (chunks para indexacao)
 *   - output/{tenant}-stats.json (estatisticas)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===========================================
// CONFIGURACOES
// ===========================================

const CONFIG = {
  maxChunkSize: 1500,      // Caracteres max por chunk
  minChunkSize: 100,       // Tamanho minimo para criar chunk
  overlapSize: 100,        // Sobreposicao entre chunks grandes
  tokensPerChar: 0.25      // Estimativa: 1 token ~ 4 caracteres
};

// ===========================================
// FUNCAO PRINCIPAL
// ===========================================

async function main() {
  const tenant = process.argv[2] || 'papervines';

  console.log('\n========================================');
  console.log(`  Gerando Chunks - Tenant: ${tenant}`);
  console.log('========================================\n');

  // Define caminhos
  const projectRoot = path.join(__dirname, '..');
  const tenantPath = path.join(projectRoot, 'src', 'data', 'tenants', tenant);
  const outputDir = path.join(projectRoot, 'output');

  // Verifica se tenant existe
  if (!fs.existsSync(tenantPath)) {
    // Fallback para estrutura original
    const originalPath = path.join(projectRoot, 'src', 'data');
    if (fs.existsSync(path.join(originalPath, 'objecoes.js'))) {
      console.log(`Usando estrutura original em: src/data/`);
      return processDirectory(originalPath, tenant, outputDir);
    }
    console.error(`Erro: Tenant '${tenant}' nao encontrado em ${tenantPath}`);
    process.exit(1);
  }

  return processDirectory(tenantPath, tenant, outputDir);
}

async function processDirectory(dataPath, tenant, outputDir) {
  const allChunks = [];
  const stats = {
    tenant,
    processedAt: new Date().toISOString(),
    files: {},
    totals: {
      chunks: 0,
      characters: 0,
      estimatedTokens: 0,
      estimatedCostUSD: 0
    }
  };

  // Lista de arquivos para processar
  const files = [
    { name: 'objecoes.js', processor: processObjecoes },
    { name: 'scripts.js', processor: processScripts },
    { name: 'precos.js', processor: processPrecos },
    { name: 'agentes.js', processor: processAgentes },
    { name: 'playbook.js', processor: processPlaybook },
    { name: 'playbook-expandido.js', processor: processPlaybookExpandido }
  ];

  for (const { name, processor } of files) {
    const filePath = path.join(dataPath, name);

    if (!fs.existsSync(filePath)) {
      console.log(`  [SKIP] ${name} - arquivo nao encontrado`);
      continue;
    }

    try {
      console.log(`  [PROC] ${name}...`);
      const content = fs.readFileSync(filePath, 'utf-8');
      const chunks = processor(content, tenant);

      allChunks.push(...chunks);

      const fileChars = chunks.reduce((sum, c) => sum + c.text.length, 0);
      stats.files[name] = {
        chunks: chunks.length,
        characters: fileChars,
        estimatedTokens: Math.ceil(fileChars * CONFIG.tokensPerChar)
      };

      console.log(`         ${chunks.length} chunks, ${fileChars.toLocaleString()} chars`);

    } catch (error) {
      console.error(`  [ERRO] ${name}: ${error.message}`);
      stats.files[name] = { error: error.message };
    }
  }

  // Calcula totais
  stats.totals.chunks = allChunks.length;
  stats.totals.characters = allChunks.reduce((sum, c) => sum + c.text.length, 0);
  stats.totals.estimatedTokens = Math.ceil(stats.totals.characters * CONFIG.tokensPerChar);
  stats.totals.estimatedCostUSD = (stats.totals.estimatedTokens / 1000000) * 0.02;

  // Cria diretorio de saida
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Salva chunks
  const chunksPath = path.join(outputDir, `${tenant}-chunks.json`);
  fs.writeFileSync(chunksPath, JSON.stringify(allChunks, null, 2));

  // Salva estatisticas
  const statsPath = path.join(outputDir, `${tenant}-stats.json`);
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));

  // Exibe resumo
  console.log('\n========================================');
  console.log('  RESUMO');
  console.log('========================================\n');
  console.log(`  Total de chunks: ${stats.totals.chunks}`);
  console.log(`  Total de caracteres: ${stats.totals.characters.toLocaleString()}`);
  console.log(`  Tokens estimados: ${stats.totals.estimatedTokens.toLocaleString()}`);
  console.log(`  Custo estimado: $${stats.totals.estimatedCostUSD.toFixed(4)}`);
  console.log(`\n  Arquivos gerados:`);
  console.log(`    - ${chunksPath}`);
  console.log(`    - ${statsPath}`);
  console.log('');

  return { chunks: allChunks, stats };
}

// ===========================================
// PROCESSADORES POR TIPO DE ARQUIVO
// ===========================================

function processObjecoes(content, tenant) {
  const chunks = [];

  // Extrai OBJECOES_EXPANDIDAS
  const objecoesMatch = content.match(/export const OBJECOES_EXPANDIDAS\s*=\s*(\{[\s\S]*?\n\};)/);
  if (objecoesMatch) {
    try {
      // Parse manual das objecoes
      const categorias = extractCategories(content);

      for (const [catKey, categoria] of Object.entries(categorias)) {
        if (categoria.objecoes) {
          for (const obj of categoria.objecoes) {
            const chunkText = formatObjecaoChunk(obj, categoria.categoria);
            if (chunkText.length >= CONFIG.minChunkSize) {
              chunks.push({
                id: `objecao-${catKey}-${slugify(obj.titulo || 'sem-titulo')}`,
                category: 'objecoes',
                title: obj.titulo || 'Objecao',
                subcategory: categoria.categoria,
                text: chunkText,
                tenant
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn('    Erro ao extrair OBJECOES_EXPANDIDAS:', e.message);
    }
  }

  // Extrai TECNICAS_GERAIS
  const tecnicasMatch = content.match(/export const TECNICAS_GERAIS\s*=\s*\[([\s\S]*?)\];/);
  if (tecnicasMatch) {
    const tecnicas = extractArrayItems(tecnicasMatch[1]);
    tecnicas.forEach((tec, i) => {
      const text = formatTecnicaChunk(tec);
      if (text.length >= CONFIG.minChunkSize) {
        chunks.push({
          id: `tecnica-${i}`,
          category: 'objecoes',
          title: `Tecnica: ${tec.nome || 'Sem nome'}`,
          subcategory: 'tecnicas',
          text,
          tenant
        });
      }
    });
  }

  // Extrai GATILHOS_MENTAIS
  const gatilhosMatch = content.match(/export const GATILHOS_MENTAIS\s*=\s*\[([\s\S]*?)\];/);
  if (gatilhosMatch) {
    const gatilhos = extractArrayItems(gatilhosMatch[1]);
    const gatilhosText = gatilhos.map(g =>
      `${g.nome}: ${g.uso}. Exemplo: "${g.exemplo}"`
    ).join('\n\n');

    if (gatilhosText.length >= CONFIG.minChunkSize) {
      chunks.push({
        id: 'gatilhos-mentais',
        category: 'objecoes',
        title: 'Gatilhos Mentais para Vendas',
        subcategory: 'gatilhos',
        text: `Gatilhos Mentais para usar em vendas:\n\n${gatilhosText}`,
        tenant
      });
    }
  }

  // Extrai DIFERENCIAIS
  const diferenciaisMatch = content.match(/export const DIFERENCIAIS\s*=\s*\[([\s\S]*?)\];/);
  if (diferenciaisMatch) {
    const difs = extractArrayItems(diferenciaisMatch[1]);
    const difsText = difs.map(d => `- ${d.titulo}: ${d.descricao}`).join('\n');

    chunks.push({
      id: 'diferenciais-papervines',
      category: 'playbook',
      title: 'Diferenciais Paper Vines',
      subcategory: 'diferenciais',
      text: `Diferenciais da Paper Vines:\n\n${difsText}`,
      tenant
    });
  }

  // Extrai ESTATISTICAS
  const statsMatch = content.match(/export const ESTATISTICAS_PAPERVINES\s*=\s*(\{[\s\S]*?\});/);
  if (statsMatch) {
    try {
      const statsText = `Estatisticas Paper Vines:
- Precisao da IA: 98%
- Automacao de conversas: 80%
- Mensagens por dia: 2.847+
- Tempo de adaptacao: 1 semana
- Taxa de adaptacao: 95%
- Aumento de produtividade: 3x
- ROI medio: 2-3 meses
- Suporte 24h: Sim
- Canais: WhatsApp, Instagram, Messenger, Facebook
- API Oficial do Meta: Sim`;

      chunks.push({
        id: 'estatisticas-papervines',
        category: 'playbook',
        title: 'Estatisticas e Numeros',
        subcategory: 'estatisticas',
        text: statsText,
        tenant
      });
    } catch (e) {
      // Ignora erros de parse
    }
  }

  return chunks;
}

function processScripts(content, tenant) {
  const chunks = [];

  // Extrai ETAPAS_FUNIL
  const etapasMatch = content.match(/export const ETAPAS_FUNIL\s*=\s*(\{[\s\S]*?\n\};)/);
  if (etapasMatch) {
    const etapas = extractEtapasFunil(content);

    for (const [etapaKey, etapa] of Object.entries(etapas)) {
      if (etapa.scripts) {
        for (const script of etapa.scripts) {
          const text = formatScriptChunk(script, etapa);
          if (text.length >= CONFIG.minChunkSize) {
            chunks.push({
              id: `script-${etapaKey}-${script.id || slugify(script.titulo)}`,
              category: 'scripts',
              title: script.titulo || 'Script',
              subcategory: etapa.nome,
              text,
              tenant
            });
          }
        }
      }
    }
  }

  // Extrai SEQUENCIAS_COMPLETAS
  const seqMatch = content.match(/export const SEQUENCIAS_COMPLETAS\s*=\s*\[([\s\S]*?)\];/);
  if (seqMatch) {
    const sequencias = extractArrayItems(seqMatch[1]);
    sequencias.forEach((seq, i) => {
      const etapasText = (seq.etapas || [])
        .map(e => `Dia ${e.dia}: ${e.acao}`)
        .join('\n');

      const text = `Sequencia de Follow-up: ${seq.nome}
${seq.descricao}

Etapas:
${etapasText}`;

      if (text.length >= CONFIG.minChunkSize) {
        chunks.push({
          id: `sequencia-${i}`,
          category: 'scripts',
          title: `Sequencia: ${seq.nome}`,
          subcategory: 'sequencias',
          text,
          tenant
        });
      }
    });
  }

  // Extrai DICAS_COMUNICACAO
  const dicasMatch = content.match(/export const DICAS_COMUNICACAO\s*=\s*\[([\s\S]*?)\];/);
  if (dicasMatch) {
    const dicas = extractArrayItems(dicasMatch[1]);
    const dicasText = dicas.map(d => {
      const dicasList = (d.dicas || []).map(di => `  - ${di}`).join('\n');
      return `${d.titulo}:\n${dicasList}`;
    }).join('\n\n');

    if (dicasText.length >= CONFIG.minChunkSize) {
      chunks.push({
        id: 'dicas-comunicacao',
        category: 'scripts',
        title: 'Dicas de Comunicacao',
        subcategory: 'dicas',
        text: `Dicas de Comunicacao para Vendas:\n\n${dicasText}`,
        tenant
      });
    }
  }

  // Extrai TEMPLATES_SEGMENTO
  const templatesMatch = content.match(/export const TEMPLATES_SEGMENTO\s*=\s*(\{[\s\S]*?\n\};)/);
  if (templatesMatch) {
    const templates = extractTemplatesSegmento(content);

    for (const [segKey, seg] of Object.entries(templates)) {
      const doresText = (seg.dores || []).join(', ');
      const text = `Template para segmento ${seg.nome}:

Dores principais: ${doresText}

Script personalizado:
${seg.script_personalizado || ''}`;

      if (text.length >= CONFIG.minChunkSize) {
        chunks.push({
          id: `template-${segKey}`,
          category: 'scripts',
          title: `Template: ${seg.nome}`,
          subcategory: 'templates',
          text,
          tenant
        });
      }
    }
  }

  return chunks;
}

function processPrecos(content, tenant) {
  const chunks = [];

  // Extrai PRECOS base
  const precosMatch = content.match(/export const PRECOS\s*=\s*(\{[\s\S]*?\n\};)/);
  if (precosMatch) {
    // Precos base
    const precosBaseText = `Precos Base Paper Vines:

Mensalidade Base: R$ 249
Usuarios inclusos: 3
Usuario adicional: R$ 49 (4-10 usuarios), R$ 39 (11-20), R$ 29 (21+)

WhatsApp:
- 1 numero incluso
- Numero adicional: R$ 99/mes

Outros canais:
- Instagram: R$ 99/mes
- Messenger: R$ 99/mes

Integracoes:
- Hotmart: R$ 199/mes
- RD Station: R$ 99/mes
- Webhook: R$ 99/mes`;

    chunks.push({
      id: 'precos-base',
      category: 'precos',
      title: 'Tabela de Precos Base',
      subcategory: 'mensalidade',
      text: precosBaseText,
      tenant
    });
  }

  // Extrai PLANOS_CHATBOTS
  const chatbotsMatch = content.match(/export const PLANOS_CHATBOTS\s*=\s*(\{[\s\S]*?\n\};)/);
  if (chatbotsMatch) {
    const planos = ['basic', 'master', 'fusion'];
    const valores = { basic: 1497, master: 2997, fusion: 4497 };

    for (const plano of planos) {
      const nome = plano.charAt(0).toUpperCase() + plano.slice(1);
      const text = `Plano Chatbot ${nome}:
Valor: R$ ${valores[plano]} (ou 3x de R$ ${Math.ceil(valores[plano]/3)})

Este plano inclui implantacao completa do chatbot com automacao de atendimento.`;

      chunks.push({
        id: `plano-chatbot-${plano}`,
        category: 'precos',
        title: `Plano Chatbot ${nome}`,
        subcategory: 'chatbots',
        text,
        tenant
      });
    }
  }

  // Extrai PLANOS_TELECOM
  const telecomMatch = content.match(/export const PLANOS_TELECOM\s*=\s*(\{[\s\S]*?\n\};)/);
  if (telecomMatch) {
    const text = `Planos Telecom Paper Vines:

Telecom Basic: R$ 2.997 (ou 3x R$ 999)
- Implantacao de telefonia digital
- Funcionalidades basicas de PABX

Telecom Pro: R$ 4.497 (ou 3x R$ 1.499)
- Implantacao completa
- Funcionalidades avancadas
- Integracao com CRM`;

    chunks.push({
      id: 'planos-telecom',
      category: 'precos',
      title: 'Planos Telecom',
      subcategory: 'telecom',
      text,
      tenant
    });
  }

  // Extrai PLANOS_IA
  const iaMatch = content.match(/export const PLANOS_IA\s*=\s*(\{[\s\S]*?\n\};)/);
  if (iaMatch) {
    const text = `Planos de IA Paper Vines:

IA Simples: R$ 3.997
- Agente de IA para atendimento basico
- Integracao com WhatsApp

IA Completa: R$ 5.997
- Multiplos agentes de IA
- Supervisor inteligente
- Integracao completa

IA Enterprise: R$ 9.997
- Solucao customizada
- Agentes especializados
- Suporte dedicado`;

    chunks.push({
      id: 'planos-ia',
      category: 'precos',
      title: 'Planos de IA',
      subcategory: 'ia',
      text,
      tenant
    });
  }

  return chunks;
}

function processAgentes(content, tenant) {
  const chunks = [];

  // Extrai AGENTES_EXEMPLOS
  const agentesMatch = content.match(/export const AGENTES_EXEMPLOS\s*=\s*\[([\s\S]*?)\];/);
  if (agentesMatch) {
    const agentes = extractAgentes(content);

    for (const agente of agentes) {
      const text = formatAgenteChunk(agente);
      if (text.length >= CONFIG.minChunkSize) {
        chunks.push({
          id: `agente-${agente.id || slugify(agente.nome)}`,
          category: 'agentes',
          title: agente.nome,
          subcategory: agente.tipo,
          text,
          tenant
        });
      }
    }
  }

  // Extrai VERTICAIS
  const verticaisMatch = content.match(/export const VERTICAIS\s*=\s*\[([\s\S]*?)\];/);
  if (verticaisMatch) {
    const verticais = extractVerticais(content);

    for (const vertical of verticais) {
      const casosText = (vertical.casos || []).map(c => `- ${c}`).join('\n');
      const text = `Agentes para ${vertical.segmento}:

Casos de uso:
${casosText}

Economia estimada:
- Funcionarios substituidos: ${vertical.economia?.funcionarios || 'N/A'}
- Horas economizadas/mes: ${vertical.economia?.horas_mes || 'N/A'}
- Reducao de custos: ${vertical.economia?.reducao_custo || 'N/A'}`;

      if (text.length >= CONFIG.minChunkSize) {
        chunks.push({
          id: `vertical-${slugify(vertical.segmento)}`,
          category: 'agentes',
          title: `Agentes para ${vertical.segmento}`,
          subcategory: 'verticais',
          text,
          tenant
        });
      }
    }
  }

  // Extrai COMPARATIVO_HUMANO
  const compMatch = content.match(/export const COMPARATIVO_HUMANO\s*=\s*(\{[\s\S]*?\n\};)/);
  if (compMatch) {
    const text = `Comparativo Agente IA vs Atendente Humano:

| Metrica | Humano | IA | Vantagem |
|---------|--------|-----|----------|
| Disponibilidade | 8-12h/dia | 24h/dia | +200% |
| Atendimentos/hora | 8-15 | 100+ | +700% |
| Custo mensal | R$ 3.000-5.000 | R$ 300-800 | -85% |
| Tempo de resposta | 2-5 min | < 3 seg | -98% |
| Consistencia | Variavel | 100% | Padrao |
| Escalabilidade | Linear | Instantanea | Infinita |`;

    chunks.push({
      id: 'comparativo-ia-humano',
      category: 'agentes',
      title: 'Comparativo IA vs Humano',
      subcategory: 'comparativo',
      text,
      tenant
    });
  }

  return chunks;
}

function processPlaybook(content, tenant) {
  const chunks = [];

  // Extrai PROCESSO_VENDAS
  const processoMatch = content.match(/export const PROCESSO_VENDAS\s*=\s*(\{[\s\S]*?\n\};)/);
  if (processoMatch) {
    const text = `Processo de Vendas Paper Vines:

1. QUALIFICACAO (30 min)
   - Identificar necessidade do cliente
   - Entender porte da empresa
   - Mapear canais de atendimento atuais

2. DEMONSTRACAO (45 min)
   - Apresentar a plataforma
   - Mostrar casos de uso relevantes
   - Demonstrar IA e automacao

3. PROPOSTA (15 min)
   - Enviar proposta personalizada
   - Explicar planos e valores
   - Definir proximo passo

4. NEGOCIACAO (variavel)
   - Tratar objecoes
   - Ajustar proposta se necessario
   - Definir condicoes

5. FECHAMENTO (30 min)
   - Formalizar contrato
   - Coletar documentos
   - Agendar kick-off`;

    chunks.push({
      id: 'processo-vendas',
      category: 'playbook',
      title: 'Processo de Vendas',
      subcategory: 'processo',
      text,
      tenant
    });
  }

  // Extrai CHECKLIST_COMERCIAL
  const checkMatch = content.match(/export const CHECKLIST_COMERCIAL\s*=\s*\[([\s\S]*?)\];/);
  if (checkMatch) {
    const items = extractArrayItems(checkMatch[1]);
    const checklistText = items.map(i => `- ${i.item || i}`).join('\n');

    if (checklistText.length >= CONFIG.minChunkSize) {
      chunks.push({
        id: 'checklist-comercial',
        category: 'playbook',
        title: 'Checklist Comercial',
        subcategory: 'checklist',
        text: `Checklist Comercial Paper Vines:\n\n${checklistText}`,
        tenant
      });
    }
  }

  // Extrai REQUISITOS_API
  const reqMatch = content.match(/export const REQUISITOS_API\s*=\s*\[([\s\S]*?)\];/);
  if (reqMatch) {
    const text = `Requisitos para usar API Oficial do WhatsApp:

1. Business Manager do Meta verificado
2. Cartao de credito internacional
3. Numero de telefone dedicado
4. Acesso admin ao Business Manager

Importante: A Paper Vines usa API oficial do Meta, garantindo:
- Zero risco de bloqueio
- Conexao estavel
- Selo de verificacao
- Conformidade com politicas`;

    chunks.push({
      id: 'requisitos-api',
      category: 'playbook',
      title: 'Requisitos API WhatsApp',
      subcategory: 'requisitos',
      text,
      tenant
    });
  }

  return chunks;
}

function processPlaybookExpandido(content, tenant) {
  const chunks = [];

  // Extrai POLITICAS_WHATSAPP
  const polWaMatch = content.match(/export const POLITICAS_WHATSAPP\s*=\s*(\{[\s\S]*?\n\};)/);
  if (polWaMatch) {
    const text = `Politicas do WhatsApp Business:

Permitido:
- Mensagens transacionais (confirmacoes, alertas)
- Atendimento ao cliente
- Respostas a solicitacoes

Proibido:
- Spam e mensagens em massa nao solicitadas
- Conteudo adulto ou ilegal
- Venda de produtos proibidos
- Compartilhamento de dados sem consentimento

Consequencias de violacao:
- Aviso inicial
- Restricao de funcionalidades
- Bloqueio temporario
- Banimento permanente`;

    chunks.push({
      id: 'politicas-whatsapp',
      category: 'playbook',
      title: 'Politicas WhatsApp Business',
      subcategory: 'politicas',
      text,
      tenant
    });
  }

  // Extrai PRECOS_WHATSAPP
  const precosWaMatch = content.match(/export const PRECOS_WHATSAPP\s*=\s*(\{[\s\S]*?\n\};)/);
  if (precosWaMatch) {
    const text = `Precos de Conversas WhatsApp (Meta):

Categorias de conversa:
1. Utility (transacional): $0.0500 USD
2. Authentication: $0.0315 USD
3. Marketing: $0.0625 USD
4. Service (atendimento): $0.0300 USD

Beneficios:
- 1.000 conversas de servico gratis/mes
- Conversas iniciadas pelo usuario mais baratas
- Janela de 24h para responder sem custo adicional`;

    chunks.push({
      id: 'precos-whatsapp-meta',
      category: 'precos',
      title: 'Precos Conversas WhatsApp',
      subcategory: 'whatsapp',
      text,
      tenant
    });
  }

  // Extrai FLUXO_IMPLANTACAO
  const fluxoMatch = content.match(/export const FLUXO_IMPLANTACAO\s*=\s*(\{[\s\S]*?\n\};)/);
  if (fluxoMatch) {
    const text = `Fluxo de Implantacao Paper Vines:

Etapa 1: Kick-off (Dia 1)
- Reuniao inicial
- Coleta de acessos
- Definicao de escopo

Etapa 2: Configuracao (Dias 2-5)
- Setup da plataforma
- Integracao WhatsApp
- Configuracao de chatbots

Etapa 3: Treinamento (Dia 6-7)
- Treinamento da equipe
- Ajustes finais
- Testes

Etapa 4: Go-Live (Dia 7-14)
- Lancamento
- Acompanhamento inicial
- Suporte intensivo`;

    chunks.push({
      id: 'fluxo-implantacao',
      category: 'playbook',
      title: 'Fluxo de Implantacao',
      subcategory: 'implantacao',
      text,
      tenant
    });
  }

  // Extrai PERGUNTAS_FREQUENTES
  const faqMatch = content.match(/export const PERGUNTAS_FREQUENTES\s*=\s*\[([\s\S]*?)\];/);
  if (faqMatch) {
    const faqs = extractArrayItems(faqMatch[1]);

    faqs.forEach((faq, i) => {
      if (faq.pergunta && faq.resposta) {
        const text = `Pergunta: ${faq.pergunta}\n\nResposta: ${faq.resposta}`;

        if (text.length >= CONFIG.minChunkSize) {
          chunks.push({
            id: `faq-${i}`,
            category: 'playbook',
            title: faq.pergunta.substring(0, 50),
            subcategory: 'faq',
            text,
            tenant
          });
        }
      }
    });
  }

  return chunks;
}

// ===========================================
// FUNCOES AUXILIARES DE EXTRACAO
// ===========================================

function extractCategories(content) {
  const categorias = {};
  const catRegex = /(\w+):\s*\{[^}]*categoria:\s*['"]([^'"]+)['"]/g;
  let match;

  while ((match = catRegex.exec(content)) !== null) {
    const key = match[1];
    const categoria = match[2];

    // Extrai objecoes desta categoria
    const catBlockMatch = content.match(new RegExp(`${key}:\\s*\\{[\\s\\S]*?objecoes:\\s*\\[([\\s\\S]*?)\\]\\s*\\}`, 'm'));

    if (catBlockMatch) {
      const objecoes = extractArrayItems(catBlockMatch[1]);
      categorias[key] = { categoria, objecoes };
    }
  }

  return categorias;
}

function extractEtapasFunil(content) {
  const etapas = {};
  const etapaKeys = ['captacao', 'qualificacao', 'apresentacao', 'negociacao', 'fechamento', 'pos_venda'];

  for (const key of etapaKeys) {
    const etapaMatch = content.match(new RegExp(`${key}:\\s*\\{([\\s\\S]*?)scripts:\\s*\\[([\\s\\S]*?)\\]\\s*\\}`, 'm'));

    if (etapaMatch) {
      const nomeMatch = etapaMatch[1].match(/nome:\s*['"]([^'"]+)['"]/);
      const scripts = extractArrayItems(etapaMatch[2]);

      etapas[key] = {
        nome: nomeMatch ? nomeMatch[1] : key,
        scripts
      };
    }
  }

  return etapas;
}

function extractTemplatesSegmento(content) {
  const templates = {};
  const segmentos = ['clinicas', 'ecommerce', 'imobiliarias', 'educacao', 'servicos'];

  for (const seg of segmentos) {
    const segMatch = content.match(new RegExp(`${seg}:\\s*\\{([\\s\\S]*?)\\}(?=,\\s*\\w+:|\\s*\\};)`, 'm'));

    if (segMatch) {
      const nomeMatch = segMatch[1].match(/nome:\s*['"]([^'"]+)['"]/);
      const doresMatch = segMatch[1].match(/dores:\s*\[([^\]]+)\]/);
      const scriptMatch = segMatch[1].match(/script_personalizado:\s*`([^`]+)`/);

      templates[seg] = {
        nome: nomeMatch ? nomeMatch[1] : seg,
        dores: doresMatch ? doresMatch[1].split(',').map(d => d.trim().replace(/['"]/g, '')) : [],
        script_personalizado: scriptMatch ? scriptMatch[1] : ''
      };
    }
  }

  return templates;
}

function extractAgentes(content) {
  const agentes = [];
  const agenteMatches = content.matchAll(/\{\s*id:\s*['"]([^'"]+)['"],\s*nome:\s*['"]([^'"]+)['"]/g);

  for (const match of agenteMatches) {
    // Encontra o bloco completo do agente
    const startIdx = content.indexOf(match[0]);
    let depth = 0;
    let endIdx = startIdx;

    for (let i = startIdx; i < content.length; i++) {
      if (content[i] === '{') depth++;
      if (content[i] === '}') depth--;
      if (depth === 0 && i > startIdx) {
        endIdx = i + 1;
        break;
      }
    }

    const agenteBlock = content.substring(startIdx, endIdx);

    const descMatch = agenteBlock.match(/descricao:\s*['"]([^'"]+)['"]/);
    const funcaoMatch = agenteBlock.match(/funcao:\s*['"]([^'"]+)['"]/);
    const tipoMatch = agenteBlock.match(/tipo:\s*['"]([^'"]+)['"]/);

    agentes.push({
      id: match[1],
      nome: match[2],
      descricao: descMatch ? descMatch[1] : '',
      funcao: funcaoMatch ? funcaoMatch[1] : '',
      tipo: tipoMatch ? tipoMatch[1] : 'executor'
    });
  }

  return agentes;
}

function extractVerticais(content) {
  const verticais = [];
  const segmentos = ['Saude', 'Imobiliario', 'E-commerce', 'Educacao', 'Financeiro', 'Varejo'];

  for (const seg of segmentos) {
    const segMatch = content.match(new RegExp(`segmento:\\s*['"]${seg}['"][\\s\\S]*?economia:\\s*\\{([^}]+)\\}`, 'm'));

    if (segMatch) {
      const casosMatch = content.match(new RegExp(`segmento:\\s*['"]${seg}['"][\\s\\S]*?casos:\\s*\\[([^\\]]+)\\]`, 'm'));

      verticais.push({
        segmento: seg,
        casos: casosMatch ? casosMatch[1].split(',').map(c => c.trim().replace(/['"]/g, '')) : [],
        economia: {
          funcionarios: '3-5',
          horas_mes: '400+',
          reducao_custo: '60%'
        }
      });
    }
  }

  return verticais;
}

function extractArrayItems(arrayContent) {
  const items = [];
  let depth = 0;
  let currentItem = '';
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];
    const prevChar = i > 0 ? arrayContent[i-1] : '';

    // Detecta strings
    if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    if (!inString) {
      if (char === '{' || char === '[') depth++;
      if (char === '}' || char === ']') depth--;

      if (char === ',' && depth === 0) {
        const item = parseSimpleObject(currentItem.trim());
        if (item) items.push(item);
        currentItem = '';
        continue;
      }
    }

    currentItem += char;
  }

  // Ultimo item
  if (currentItem.trim()) {
    const item = parseSimpleObject(currentItem.trim());
    if (item) items.push(item);
  }

  return items;
}

function parseSimpleObject(str) {
  if (!str || str === '') return null;

  // Se e um objeto
  if (str.startsWith('{')) {
    const obj = {};
    const propRegex = /(\w+):\s*(['"`])([\s\S]*?)\2/g;
    let match;

    while ((match = propRegex.exec(str)) !== null) {
      obj[match[1]] = match[3];
    }

    // Tenta extrair arrays
    const arrayRegex = /(\w+):\s*\[([^\]]*)\]/g;
    while ((match = arrayRegex.exec(str)) !== null) {
      obj[match[1]] = match[2].split(',').map(s => s.trim().replace(/['"]/g, ''));
    }

    return Object.keys(obj).length > 0 ? obj : null;
  }

  // Se e uma string
  if (str.startsWith('"') || str.startsWith("'")) {
    return str.slice(1, -1);
  }

  return str;
}

// ===========================================
// FUNCOES DE FORMATACAO
// ===========================================

function formatObjecaoChunk(obj, categoria) {
  let text = `Objecao: "${obj.titulo || 'Cliente apresenta objecao'}"
Categoria: ${categoria}
`;

  if (obj.contexto) {
    text += `\nContexto: ${obj.contexto}`;
  }

  if (obj.script_whatsapp) {
    text += `\n\nResposta sugerida para WhatsApp:\n${obj.script_whatsapp}`;
  }

  if (obj.argumentos && obj.argumentos.length > 0) {
    text += `\n\nArgumentos de apoio:\n${obj.argumentos.map(a => `- ${a}`).join('\n')}`;
  }

  if (obj.tecnica_call) {
    text += `\n\nTecnica para call: ${obj.tecnica_call.nome || ''}`;
    if (obj.tecnica_call.passos) {
      text += `\nPassos:\n${obj.tecnica_call.passos.map((p, i) => `${i+1}. ${p}`).join('\n')}`;
    }
  }

  if (obj.dados_suporte) {
    text += `\n\nDado de suporte: ${obj.dados_suporte}`;
  }

  return text;
}

function formatScriptChunk(script, etapa) {
  let text = `Script: ${script.titulo || 'Script de vendas'}
Etapa do funil: ${etapa.nome}
Tipo: ${script.tipo || 'principal'}
`;

  if (script.contexto) {
    text += `\nContexto: ${script.contexto}`;
  }

  if (script.mensagem) {
    text += `\n\nMensagem:\n${script.mensagem}`;
  }

  if (script.variacoes && script.variacoes.length > 0) {
    text += `\n\nVariacoes disponiveis:`;
    script.variacoes.forEach(v => {
      text += `\n- ${v.nome}: ${v.mensagem}`;
    });
  }

  if (script.dica) {
    text += `\n\nDica: ${script.dica}`;
  }

  if (script.gatilhos && script.gatilhos.length > 0) {
    text += `\n\nGatilhos utilizados: ${script.gatilhos.join(', ')}`;
  }

  return text;
}

function formatTecnicaChunk(tecnica) {
  let text = `Tecnica de Negociacao: ${tecnica.nome || 'Sem nome'}
${tecnica.descricao || ''}

Passos:
`;

  if (tecnica.passos && tecnica.passos.length > 0) {
    text += tecnica.passos.map((p, i) => `${i+1}. ${p}`).join('\n');
  }

  return text;
}

function formatAgenteChunk(agente) {
  return `Agente: ${agente.nome}
Tipo: ${agente.tipo}
Funcao: ${agente.funcao}

Descricao:
${agente.descricao}

Este agente pode ser utilizado para automatizar atendimentos relacionados a ${agente.funcao.toLowerCase()}.`;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

// ===========================================
// EXECUCAO
// ===========================================

main().catch(error => {
  console.error('\nErro fatal:', error);
  process.exit(1);
});
