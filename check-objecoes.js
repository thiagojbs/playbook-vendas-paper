#!/usr/bin/env node
const objecoes = require('./src/data/tenants/cabeloesaude/objecoes.js').objecoes;

// Check all objections for missing texto properties
let errors = [];

Object.keys(objecoes).forEach(key => {
  if (key === 'metadata' || key === 'casosEspeciais' || key === 'principiosGerais') return;

  const obj = objecoes[key];
  if (obj.estruturaResposta) {
    Object.keys(obj.estruturaResposta).forEach(blocoKey => {
      const bloco = obj.estruturaResposta[blocoKey];

      // Conditional blocks don't need texto - they have opcoes instead
      if (bloco.condicional && bloco.opcoes) {
        console.log(`✅ ${key}.${blocoKey} é condicional (válido)`);
      } else if (!bloco.texto) {
        errors.push(`❌ ${key}.${blocoKey}.texto está undefined ou vazio`);
      }
    });
  }

  if (obj.versaoPocket === undefined) {
    errors.push(`⚠️  ${key}.versaoPocket está undefined`);
  }
});

// Check special cases
if (objecoes.casosEspeciais) {
  Object.keys(objecoes.casosEspeciais).forEach(key => {
    const obj = objecoes.casosEspeciais[key];

    // Skip non-objection keys like 'titulo'
    if (!obj || typeof obj !== 'object' || !obj.estruturaResposta) {
      console.log(`⚠️  Ignorando casosEspeciais.${key} (não é uma objeção)`);
      return;
    }

    if (obj.estruturaResposta) {
      Object.keys(obj.estruturaResposta).forEach(blocoKey => {
        const bloco = obj.estruturaResposta[blocoKey];

        // Conditional blocks don't need texto
        if (bloco.condicional && bloco.opcoes) {
          console.log(`✅ casosEspeciais.${key}.${blocoKey} é condicional (válido)`);
        } else if (!bloco.texto) {
          errors.push(`❌ casosEspeciais.${key}.${blocoKey}.texto está undefined ou vazio`);
        }
      });
    }

    if (obj.versaoPocket === undefined) {
      errors.push(`⚠️  casosEspeciais.${key}.versaoPocket está undefined`);
    }
  });
}

if (errors.length > 0) {
  console.log('\n🔍 PROBLEMAS ENCONTRADOS:\n');
  errors.forEach(e => console.log(e));
  process.exit(1);
} else {
  console.log('\n✅ Todos os blocos têm propriedade texto definida (ou são condicionais válidos)');
}
