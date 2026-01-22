// Re-exporta dados do tenant padrao (papervines) para manter compatibilidade
// com imports existentes nas paginas
//
// Uso nas paginas (compatibilidade mantida):
//   import { PROCESSO_VENDAS } from '../data/playbook.js';
//
// Uso no sistema RAG (multi-tenant):
//   import { loadTenantModule } from '../data/tenant-loader.js';
//   const playbook = await loadTenantModule('papervines', 'playbook');

// Nota: Os arquivos em src/data/*.js continuam existindo para compatibilidade
// Os mesmos arquivos existem em src/data/tenants/papervines/ para o sistema RAG

export const DEFAULT_TENANT = 'papervines';

// Helper para carregar tenant
export { getTenantFromRequest, loadTenantConfig, loadTenantModule } from './tenant-loader.js';
