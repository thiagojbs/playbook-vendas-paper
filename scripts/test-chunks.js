#!/usr/bin/env node

/**
 * Script de Teste de Chunks
 * Valida a estrutura dos chunks gerados antes do upload
 *
 * Uso:
 *   node scripts/test-chunks.js [tenant]
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'output');

// Cores para terminal
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const NC = '\x1b[0m';

function log(color, message) {
  console.log(`${color}${message}${NC}`);
}

/**
 * Valida estrutura de um chunk
 */
function validateChunk(chunk, index) {
  const errors = [];
  const warnings = [];

  // Campos obrigatorios
  if (!chunk.id) errors.push('Campo "id" ausente');
  if (!chunk.category) errors.push('Campo "category" ausente');
  if (!chunk.text) errors.push('Campo "text" ausente');
  if (!chunk.tenant) errors.push('Campo "tenant" ausente');

  // Validacoes de formato
  if (chunk.id && chunk.id.length > 100) {
    warnings.push(`ID muito longo: ${chunk.id.length} chars`);
  }

  if (chunk.text && chunk.text.length < 10) {
    warnings.push(`Texto muito curto: ${chunk.text.length} chars`);
  }

  if (chunk.text && chunk.text.length > 8000) {
    warnings.push(`Texto longo (pode precisar dividir): ${chunk.text.length} chars`);
  }

  // Categorias validas
  const validCategories = ['playbook', 'objecoes', 'scripts', 'precos', 'agentes', 'geral'];
  if (chunk.category && !validCategories.includes(chunk.category)) {
    warnings.push(`Categoria desconhecida: "${chunk.category}"`);
  }

  return { errors, warnings, index };
}

/**
 * Funcao principal
 */
function main() {
  console.log('');
  log(BLUE, '===========================================');
  log(BLUE, '  Teste de Validacao de Chunks');
  log(BLUE, '===========================================');
  console.log('');

  // Tenant a processar
  const tenant = process.argv[2] || 'papervines';
  const chunksFile = join(OUTPUT_DIR, `${tenant}-chunks.json`);
  const statsFile = join(OUTPUT_DIR, `${tenant}-stats.json`);

  // Verificar arquivo de chunks
  if (!existsSync(chunksFile)) {
    log(RED, `Erro: Arquivo de chunks nao encontrado: ${chunksFile}`);
    log(YELLOW, 'Execute primeiro: node scripts/generate-chunks.js');
    process.exit(1);
  }

  // Carregar chunks
  log(BLUE, `[1/3] Carregando chunks de ${chunksFile}...`);
  const chunks = JSON.parse(readFileSync(chunksFile, 'utf8'));
  console.log(`      ${chunks.length} chunks encontrados`);

  // Validar cada chunk
  console.log('');
  log(BLUE, '[2/3] Validando estrutura dos chunks...');

  let totalErrors = 0;
  let totalWarnings = 0;
  const errorDetails = [];
  const warningDetails = [];

  chunks.forEach((chunk, index) => {
    const { errors, warnings } = validateChunk(chunk, index);

    if (errors.length > 0) {
      totalErrors += errors.length;
      errorDetails.push({ index, id: chunk.id, errors });
    }

    if (warnings.length > 0) {
      totalWarnings += warnings.length;
      warningDetails.push({ index, id: chunk.id, warnings });
    }
  });

  // Mostrar erros
  if (errorDetails.length > 0) {
    console.log('');
    log(RED, `ERROS encontrados (${totalErrors}):`);
    errorDetails.forEach(({ index, id, errors }) => {
      console.log(`  [${index}] ${id || '(sem id)'}`);
      errors.forEach(err => console.log(`      - ${err}`));
    });
  }

  // Mostrar warnings
  if (warningDetails.length > 0) {
    console.log('');
    log(YELLOW, `AVISOS encontrados (${totalWarnings}):`);
    warningDetails.slice(0, 10).forEach(({ index, id, warnings }) => {
      console.log(`  [${index}] ${id || '(sem id)'}`);
      warnings.forEach(w => console.log(`      - ${w}`));
    });
    if (warningDetails.length > 10) {
      console.log(`      ... e mais ${warningDetails.length - 10} avisos`);
    }
  }

  // Estatisticas
  console.log('');
  log(BLUE, '[3/3] Estatisticas dos chunks...');

  // Por categoria
  const byCategory = {};
  chunks.forEach(c => {
    byCategory[c.category] = (byCategory[c.category] || 0) + 1;
  });

  console.log('');
  console.log('  Por categoria:');
  Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
    console.log(`    ${cat}: ${count} chunks`);
  });

  // Tamanhos
  const textLengths = chunks.map(c => c.text?.length || 0);
  const avgLength = Math.round(textLengths.reduce((a, b) => a + b, 0) / textLengths.length);
  const maxLength = Math.max(...textLengths);
  const minLength = Math.min(...textLengths);

  console.log('');
  console.log('  Tamanho de texto:');
  console.log(`    Minimo: ${minLength} chars`);
  console.log(`    Maximo: ${maxLength} chars`);
  console.log(`    Media: ${avgLength} chars`);

  // Carregar stats se disponivel
  if (existsSync(statsFile)) {
    const stats = JSON.parse(readFileSync(statsFile, 'utf8'));
    console.log('');
    console.log('  Estimativas:');
    console.log(`    Tokens: ${stats.totals.estimatedTokens.toLocaleString()}`);
    console.log(`    Custo OpenAI: $${stats.totals.estimatedCostUSD.toFixed(6)}`);
  }

  // Resumo final
  console.log('');
  log(BLUE, '===========================================');
  log(BLUE, '  RESULTADO DA VALIDACAO');
  log(BLUE, '===========================================');
  console.log('');

  if (totalErrors === 0) {
    log(GREEN, `  ✅ VALIDACAO OK - ${chunks.length} chunks validos`);
    console.log('');
    console.log('  Proximo passo:');
    console.log('    node scripts/upload-chunks.js');
  } else {
    log(RED, `  ❌ VALIDACAO FALHOU - ${totalErrors} erros encontrados`);
    console.log('');
    console.log('  Corrija os erros antes de fazer upload');
  }

  if (totalWarnings > 0) {
    log(YELLOW, `  ⚠️  ${totalWarnings} avisos (recomendado revisar)`);
  }

  console.log('');

  process.exit(totalErrors > 0 ? 1 : 0);
}

// Executar
main();
