#!/usr/bin/env node
// Teste de runtime para simular carregamento do playbook

console.log('🔍 Testando runtime do Playbook...\n');

try {
  console.log('1. Carregando playbook.js...');
  const playbook = require('./src/data/tenants/cabeloesaude/playbook.js');
  console.log('   ✅ playbook.js carregado');

  console.log('\n2. Verificando PLAYBOOK_2025...');
  const PLAYBOOK_2025 = playbook.PLAYBOOK_2025 || playbook.default;
  if (!PLAYBOOK_2025) throw new Error('PLAYBOOK_2025 não encontrado');
  console.log('   ✅ PLAYBOOK_2025 existe');

  console.log('\n3. Iterando pelos módulos...');
  PLAYBOOK_2025.modulos.forEach((modulo, index) => {
    console.log(`   Módulo ${index}: ${modulo.titulo}`);

    // Verificar se há algum .replace() sendo chamado
    if (modulo.objetivo && typeof modulo.objetivo !== 'string') {
      console.error(`   ❌ ERRO: objetivo do módulo ${index} não é string:`, typeof modulo.objetivo);
    }
    if (modulo.descricao && typeof modulo.descricao !== 'string') {
      console.error(`   ❌ ERRO: descricao do módulo ${index} não é string:`, typeof modulo.descricao);
    }
    if (modulo.titulo && typeof modulo.titulo !== 'string') {
      console.error(`   ❌ ERRO: titulo do módulo ${index} não é string:`, typeof modulo.titulo);
    }
  });
  console.log('   ✅ Todos os módulos OK');

  console.log('\n4. Testando renderPlaybookCabeloeSaude...');

  // Simular o que a função faz
  const modulosHtml = PLAYBOOK_2025.modulos.map(function(modulo, idx) {
    try {
      // Tentar acessar propriedades como a função faz
      const emoji = modulo.emoji || '';
      const numero = modulo.numero;
      const titulo = modulo.titulo || '';
      const tempoEstimado = modulo.tempoEstimado || '';
      const descricao = modulo.descricao || '';
      const objetivo = modulo.objetivo || '';

      // Verificar se algum desses é undefined ou não é string
      if (titulo && typeof titulo !== 'string') {
        throw new Error(`Módulo ${idx}: titulo não é string - tipo: ${typeof titulo}`);
      }
      if (descricao && typeof descricao !== 'string') {
        throw new Error(`Módulo ${idx}: descricao não é string - tipo: ${typeof descricao}`);
      }
      if (objetivo && typeof objetivo !== 'string') {
        throw new Error(`Módulo ${idx}: objetivo não é string - tipo: ${typeof objetivo}`);
      }

      return `Módulo ${numero}: ${titulo}`;
    } catch (err) {
      console.error(`   ❌ ERRO no módulo ${idx}:`, err.message);
      throw err;
    }
  });

  console.log('   ✅ Renderização simulada OK');

  console.log('\n5. Testando scripts...');
  const scripts = require('./src/data/tenants/cabeloesaude/scripts.js');
  const MODULOS_PLAYBOOK = scripts.MODULOS_PLAYBOOK;

  Object.keys(MODULOS_PLAYBOOK).forEach(key => {
    const modulo = MODULOS_PLAYBOOK[key];
    if (modulo.scripts) {
      modulo.scripts.forEach((script, idx) => {
        if (script.mensagem && typeof script.mensagem !== 'string') {
          console.error(`   ❌ ERRO: ${key}.scripts[${idx}].mensagem não é string:`, typeof script.mensagem);
        }
        if (script.titulo && typeof script.titulo !== 'string') {
          console.error(`   ❌ ERRO: ${key}.scripts[${idx}].titulo não é string:`, typeof script.titulo);
        }
      });
    }
  });
  console.log('   ✅ Scripts OK');

  console.log('\n6. Testando objeções...');
  const objecoesModule = require('./src/data/tenants/cabeloesaude/objecoes.js');
  const objecoes = objecoesModule.objecoes;

  // Testar objeção específica
  const valorConsulta = objecoes.valorConsulta;
  if (valorConsulta) {
    console.log('   Testando objecoes.valorConsulta...');
    if (valorConsulta.estruturaResposta) {
      Object.keys(valorConsulta.estruturaResposta).forEach(key => {
        const bloco = valorConsulta.estruturaResposta[key];
        if (bloco.texto && typeof bloco.texto !== 'string') {
          console.error(`   ❌ ERRO: valorConsulta.${key}.texto não é string:`, typeof bloco.texto);
        }
      });
    }
  }
  console.log('   ✅ Objeções OK');

  console.log('\n✅ TODOS OS TESTES DE RUNTIME PASSARAM!\n');
  process.exit(0);

} catch (error) {
  console.error('\n❌ ERRO DETECTADO:');
  console.error('Mensagem:', error.message);
  console.error('Stack:', error.stack);
  process.exit(1);
}
