// Arquivo de indice para o tenant Cabelo & Saude
// Reexporta todos os modulos do tenant para facilitar imports

// Configuracao do tenant
export * from './config.js';
export { TENANT_CONFIG, getConfig, TENANT_ID } from './config.js';

// Conteudo do playbook
export * from './playbook.js';

// Objecoes expandidas
export * from './objecoes.js';

// Scripts de vendas
export * from './scripts.js';

// Tabela de precos
export * from './precos.js';
