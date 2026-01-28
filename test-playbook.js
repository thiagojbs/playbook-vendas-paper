#!/usr/bin/env node
// Script de teste para validar estrutura do Playbook 2025 - Cabelo & Saúde

console.log('🔍 Iniciando testes de validação do Playbook 2025...\n');

let errors = [];
let warnings = [];
let totalTests = 0;
let passedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`✅ ${name}`);
  } catch (e) {
    errors.push(`❌ ${name}: ${e.message}`);
    console.log(`❌ ${name}: ${e.message}`);
  }
}

function warn(message) {
  warnings.push(`⚠️  ${message}`);
  console.log(`⚠️  ${message}`);
}

// ========================================
// TESTE 1: Imports dos arquivos
// ========================================
console.log('\n📦 TESTE 1: Verificando imports...\n');

let PLAYBOOK_2025, perfisLead, perfisClinicos, indicadores, gatilhos, MODULOS_PLAYBOOK, objecoes;

test('Import playbook.js', () => {
  const playbook = require('./src/data/tenants/cabeloesaude/playbook.js');
  PLAYBOOK_2025 = playbook.PLAYBOOK_2025 || playbook.default;
  if (!PLAYBOOK_2025) throw new Error('PLAYBOOK_2025 não encontrado');
});

test('Import perfis-lead.js', () => {
  const perfis = require('./src/data/tenants/cabeloesaude/perfis-lead.js');
  perfisLead = perfis.perfisLead;
  if (!perfisLead) throw new Error('perfisLead não encontrado');
});

test('Import perfis-clinicos.js', () => {
  const perfis = require('./src/data/tenants/cabeloesaude/perfis-clinicos.js');
  perfisClinicos = perfis.perfisClinicos;
  if (!perfisClinicos) throw new Error('perfisClinicos não encontrado');
});

test('Import indicadores.js', () => {
  const ind = require('./src/data/tenants/cabeloesaude/indicadores.js');
  indicadores = ind.indicadores;
  if (!indicadores) throw new Error('indicadores não encontrado');
});

test('Import gatilhos.js', () => {
  const gat = require('./src/data/tenants/cabeloesaude/gatilhos.js');
  gatilhos = gat.gatilhos;
  if (!gatilhos) throw new Error('gatilhos não encontrado');
});

test('Import scripts.js', () => {
  const scripts = require('./src/data/tenants/cabeloesaude/scripts.js');
  MODULOS_PLAYBOOK = scripts.MODULOS_PLAYBOOK;
  if (!MODULOS_PLAYBOOK) throw new Error('MODULOS_PLAYBOOK não encontrado');
});

test('Import objecoes.js', () => {
  const obj = require('./src/data/tenants/cabeloesaude/objecoes.js');
  objecoes = obj.objecoes;
  if (!objecoes) throw new Error('objecoes não encontrado');
});

// ========================================
// TESTE 2: Estrutura do PLAYBOOK_2025
// ========================================
console.log('\n📋 TESTE 2: Validando estrutura do PLAYBOOK_2025...\n');

test('PLAYBOOK_2025 tem metadata', () => {
  if (!PLAYBOOK_2025.metadata) throw new Error('metadata ausente');
  if (!PLAYBOOK_2025.metadata.versao) throw new Error('metadata.versao ausente');
  if (!PLAYBOOK_2025.metadata.totalModulos) throw new Error('metadata.totalModulos ausente');
});

test('PLAYBOOK_2025 tem 11 módulos', () => {
  if (!PLAYBOOK_2025.modulos) throw new Error('modulos ausente');
  if (PLAYBOOK_2025.modulos.length !== 11) {
    throw new Error(`Esperado 11 módulos, encontrado ${PLAYBOOK_2025.modulos.length}`);
  }
});

test('Módulos têm estrutura correta', () => {
  PLAYBOOK_2025.modulos.forEach((modulo, index) => {
    if (modulo.numero !== index) throw new Error(`Módulo ${index} tem numero errado: ${modulo.numero}`);
    if (!modulo.titulo) throw new Error(`Módulo ${index} sem titulo`);
    if (!modulo.emoji) throw new Error(`Módulo ${index} sem emoji`);
    if (!modulo.descricao) throw new Error(`Módulo ${index} sem descricao`);
  });
});

test('PLAYBOOK_2025 tem recursos auxiliares', () => {
  if (!PLAYBOOK_2025.perfisLead) throw new Error('perfisLead ausente');
  if (!PLAYBOOK_2025.perfisClinicos) throw new Error('perfisClinicos ausente');
  if (!PLAYBOOK_2025.gatilhos) throw new Error('gatilhos ausente');
  if (!PLAYBOOK_2025.indicadores) throw new Error('indicadores ausente');
  if (!PLAYBOOK_2025.objecoes) throw new Error('objecoes ausente');
  if (!PLAYBOOK_2025.scripts) throw new Error('scripts ausente');
});

// ========================================
// TESTE 3: Perfis de Lead
// ========================================
console.log('\n👥 TESTE 3: Validando perfis de lead...\n');

test('Perfis de Lead: 3 perfis existem', () => {
  if (!perfisLead.visual) throw new Error('Perfil visual ausente');
  if (!perfisLead.emocional) throw new Error('Perfil emocional ausente');
  if (!perfisLead.racional) throw new Error('Perfil racional ausente');
});

test('Perfis têm estrutura completa', () => {
  ['visual', 'emocional', 'racional'].forEach(tipo => {
    const perfil = perfisLead[tipo];
    if (!perfil.id) throw new Error(`${tipo}: id ausente`);
    if (!perfil.nome) throw new Error(`${tipo}: nome ausente`);
    if (!perfil.sinaisIdentificacao) throw new Error(`${tipo}: sinaisIdentificacao ausente`);
    if (!perfil.linguagem) throw new Error(`${tipo}: linguagem ausente`);
    if (!perfil.scripts) throw new Error(`${tipo}: scripts ausente`);
    if (!perfil.perguntas) throw new Error(`${tipo}: perguntas ausente`);
  });
});

// ========================================
// TESTE 4: Perfis Clínicos
// ========================================
console.log('\n🧬 TESTE 4: Validando perfis clínicos...\n');

test('Perfis Clínicos: 6 perfis existem', () => {
  if (!perfisClinicos.alopeciaAndrogenetica) throw new Error('alopeciaAndrogenetica ausente');
  if (!perfisClinicos.efluvioTelogeno) throw new Error('efluvioTelogeno ausente');
  if (!perfisClinicos.foliculite) throw new Error('foliculite ausente');
  if (!perfisClinicos.psoriase) throw new Error('psoriase ausente');
  if (!perfisClinicos.dermatiteSeborreica) throw new Error('dermatiteSeborreica ausente');
  if (!perfisClinicos.quadroMisto) throw new Error('quadroMisto ausente');
});

test('Perfis clínicos têm estrutura completa', () => {
  const perfis = ['alopeciaAndrogenetica', 'efluvioTelogeno', 'foliculite', 'psoriase', 'dermatiteSeborreica', 'quadroMisto'];
  perfis.forEach(tipo => {
    const perfil = perfisClinicos[tipo];
    if (!perfil.nome) throw new Error(`${tipo}: nome ausente`);
    if (!perfil.sintomas) throw new Error(`${tipo}: sintomas ausente`);
    if (!perfil.explicacaoClinica) throw new Error(`${tipo}: explicacaoClinica ausente`);
    if (!perfil.scriptCompleto) throw new Error(`${tipo}: scriptCompleto ausente`);
  });
});

// ========================================
// TESTE 5: Scripts
// ========================================
console.log('\n💬 TESTE 5: Validando scripts...\n');

test('Scripts: 6 módulos existem', () => {
  if (!MODULOS_PLAYBOOK.abertura) throw new Error('abertura ausente');
  if (!MODULOS_PLAYBOOK.mapeamentoDor) throw new Error('mapeamentoDor ausente');
  if (!MODULOS_PLAYBOOK.followUp) throw new Error('followUp ausente');
  if (!MODULOS_PLAYBOOK.noShow) throw new Error('noShow ausente');
  if (!MODULOS_PLAYBOOK.comercial2) throw new Error('comercial2 ausente');
  if (!MODULOS_PLAYBOOK.contornos) throw new Error('contornos ausente');
});

test('Scripts de abertura (mínimo 2)', () => {
  if (!MODULOS_PLAYBOOK.abertura.scripts) throw new Error('abertura.scripts ausente');
  if (MODULOS_PLAYBOOK.abertura.scripts.length < 2) {
    throw new Error(`Esperado 2+ scripts, encontrado ${MODULOS_PLAYBOOK.abertura.scripts.length}`);
  }
});

test('Scripts de mapeamentoDor (mínimo 10)', () => {
  if (!MODULOS_PLAYBOOK.mapeamentoDor.scripts) throw new Error('mapeamentoDor.scripts ausente');
  if (MODULOS_PLAYBOOK.mapeamentoDor.scripts.length < 10) {
    throw new Error(`Esperado 10+ scripts, encontrado ${MODULOS_PLAYBOOK.mapeamentoDor.scripts.length}`);
  }
});

test('Follow-up tem variações', () => {
  if (!MODULOS_PLAYBOOK.followUp.variacoes) throw new Error('followUp.variacoes ausente');
  if (MODULOS_PLAYBOOK.followUp.variacoes.length < 10) {
    warn(`Follow-up: esperado 10 variações, encontrado ${MODULOS_PLAYBOOK.followUp.variacoes.length}`);
  }
});

// ========================================
// TESTE 6: Objeções
// ========================================
console.log('\n🛡️ TESTE 6: Validando objeções...\n');

test('Objeções: 11 principais existem', () => {
  const objecoesEsperadas = [
    'valorConsulta', 'vouPensar', 'quemAtende', 'examesLaboratoriais', 'planoSaude',
    'jaPasseiMedicos', 'jaUseiMedicamentos', 'porqueConsulta', 'soTonico',
    'retornoTempo', 'soCasaPrimeiro'
  ];

  objecoesEsperadas.forEach(obj => {
    if (!objecoes[obj]) throw new Error(`Objeção ${obj} ausente`);
  });
});

test('Objeções têm múltiplos blocos', () => {
  const obj = objecoes.valorConsulta;
  if (!obj.estruturaResposta) throw new Error('estruturaResposta ausente');
  if (!obj.estruturaResposta.bloco1) throw new Error('bloco1 ausente');
  if (!obj.estruturaResposta.bloco2) throw new Error('bloco2 ausente');
});

test('Objeções têm versão pocket', () => {
  const obj = objecoes.valorConsulta;
  if (!obj.versaoPocket) throw new Error('versaoPocket ausente');
});

test('Casos especiais existem', () => {
  if (!objecoes.casosEspeciais) throw new Error('casosEspeciais ausente');
  if (!objecoes.casosEspeciais.consultaCara) throw new Error('consultaCara ausente');
  if (!objecoes.casosEspeciais.calvicieAvancada) throw new Error('calvicieAvancada ausente');
});

test('Princípios gerais existem', () => {
  if (!objecoes.principiosGerais) throw new Error('principiosGerais ausente');
  if (!objecoes.principiosGerais.regrasOuro) throw new Error('regrasOuro ausente');
  if (!objecoes.principiosGerais.estruturaPadrao) throw new Error('estruturaPadrao ausente');
});

// ========================================
// TESTE 7: Indicadores
// ========================================
console.log('\n📊 TESTE 7: Validando indicadores...\n');

test('Indicadores: métricas principais existem', () => {
  if (!indicadores.metricasFunil) throw new Error('metricasFunil ausente');
  if (!indicadores.metricasComercial2) throw new Error('metricasComercial2 ausente');
  if (!indicadores.metricasNoShow) throw new Error('metricasNoShow ausente');
  if (!indicadores.metricasFollowUp) throw new Error('metricasFollowUp ausente');
});

test('Indicadores: checklist diário existe', () => {
  if (!indicadores.checklistDiario) throw new Error('checklistDiario ausente');
  if (!indicadores.checklistDiario.manha) throw new Error('manha ausente');
  if (!indicadores.checklistDiario.tarde) throw new Error('tarde ausente');
  if (!indicadores.checklistDiario.noite) throw new Error('noite ausente');
});

test('Indicadores: metas individuais existem', () => {
  if (!indicadores.metasIndividuais) throw new Error('metasIndividuais ausente');
  if (!indicadores.metasIndividuais.diarias) throw new Error('metas diarias ausente');
  if (!indicadores.metasIndividuais.semanais) throw new Error('metas semanais ausente');
  if (!indicadores.metasIndividuais.mensais) throw new Error('metas mensais ausente');
});

// ========================================
// TESTE 8: Gatilhos Mentais
// ========================================
console.log('\n⚡ TESTE 8: Validando gatilhos mentais...\n');

test('Gatilhos: escassez existe', () => {
  if (!gatilhos.escassezConsulta) throw new Error('escassezConsulta ausente');
  if (!gatilhos.escassezConsulta.fatos) throw new Error('fatos ausente');
  if (!gatilhos.escassezConsulta.scripts) throw new Error('scripts ausente');
});

test('Gatilhos: bônus existem', () => {
  if (!gatilhos.bonusCondicoes) throw new Error('bonusCondicoes ausente');
});

test('Gatilhos emocionais existem', () => {
  if (!gatilhos.gatilhosEmocionais) throw new Error('gatilhosEmocionais ausente');
});

// ========================================
// TESTE 9: Exports Legados
// ========================================
console.log('\n🔄 TESTE 9: Validando exports legados (compatibilidade)...\n');

test('Exports legados do playbook', () => {
  const playbook = require('./src/data/tenants/cabeloesaude/playbook.js');
  if (!playbook.PROCESSO_VENDAS) throw new Error('PROCESSO_VENDAS ausente');
  if (!playbook.SCRIPTS) throw new Error('SCRIPTS ausente');
  if (!playbook.OBJECOES) throw new Error('OBJECOES ausente');
  if (!playbook.CHECKLIST_COMERCIAL) throw new Error('CHECKLIST_COMERCIAL ausente');
  if (!playbook.DIFERENCIAIS) throw new Error('DIFERENCIAIS ausente');
});

// ========================================
// TESTE 10: Contagem de Conteúdo
// ========================================
console.log('\n🔢 TESTE 10: Contagem de conteúdo...\n');

let totalScripts = 0;
Object.keys(MODULOS_PLAYBOOK).forEach(modulo => {
  const mod = MODULOS_PLAYBOOK[modulo];
  if (mod.scripts) totalScripts += mod.scripts.length;
  if (mod.variacoes) totalScripts += mod.variacoes.length;
});

console.log(`   📝 Total de scripts: ${totalScripts}`);
if (totalScripts < 40) warn(`Esperado 40+ scripts, encontrado ${totalScripts}`);

const totalObjecoes = Object.keys(objecoes).filter(k =>
  k !== 'metadata' && k !== 'casosEspeciais' && k !== 'principiosGerais'
).length;

console.log(`   🛡️  Total de objeções principais: ${totalObjecoes}`);
if (totalObjecoes < 11) warn(`Esperado 11+ objeções, encontrado ${totalObjecoes}`);

console.log(`   👥 Total de perfis de lead: 3`);
console.log(`   🧬 Total de perfis clínicos: 6`);
console.log(`   📊 Total de categorias de KPIs: 4`);

// ========================================
// RESUMO FINAL
// ========================================
console.log('\n' + '='.repeat(60));
console.log('📊 RESUMO DOS TESTES');
console.log('='.repeat(60));
console.log(`Total de testes: ${totalTests}`);
console.log(`✅ Passou: ${passedTests}`);
console.log(`❌ Falhou: ${errors.length}`);
console.log(`⚠️  Avisos: ${warnings.length}`);
console.log('='.repeat(60));

if (errors.length > 0) {
  console.log('\n❌ ERROS ENCONTRADOS:\n');
  errors.forEach(e => console.log(e));
}

if (warnings.length > 0) {
  console.log('\n⚠️  AVISOS:\n');
  warnings.forEach(w => console.log(w));
}

if (errors.length === 0) {
  console.log('\n✅ TODOS OS TESTES PASSARAM! Playbook validado com sucesso.\n');
  process.exit(0);
} else {
  console.log('\n❌ ALGUNS TESTES FALHARAM. Revise os erros acima.\n');
  process.exit(1);
}
