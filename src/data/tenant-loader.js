// Sistema de carregamento de tenants
// Permite carregar dados de diferentes tenants de forma dinamica

// Cache de tenants carregados
const tenantCache = new Map();

// Lista de tenants disponiveis
const TENANTS_REGISTRY = {
  papervines: {
    id: 'papervines',
    nome: 'Paper Vines',
    status: 'ativo',
    path: './tenants/papervines'
  },
  cabeloesaude: {
    id: 'cabeloesaude',
    nome: 'Cabelo & Saude',
    nomeCompleto: 'Clinica de Tricologia Cabelo & Saude',
    status: 'ativo',
    path: './tenants/cabeloesaude',
    dominio: 'vendas.cabeloesaude.com.br'
  }
};

// Tenant padrao
const DEFAULT_TENANT = 'papervines';

/**
 * Extrai o tenant ID da URL ou headers
 * @param {Request} request - Request object
 * @returns {string} - Tenant ID
 */
export function getTenantFromRequest(request) {
  const url = new URL(request.url);

  // Opcao 1: Header customizado X-Tenant-ID
  const headerTenant = request.headers.get('X-Tenant-ID');
  if (headerTenant && TENANTS_REGISTRY[headerTenant]) {
    return headerTenant;
  }

  // Opcao 2: Subdominio (tenant.dominio.com)
  const hostParts = url.hostname.split('.');
  if (hostParts.length >= 3) {
    const subdomain = hostParts[0];
    // Mapear subdominios para tenants
    if (subdomain === 'vendas' && url.hostname.includes('papervines')) {
      return 'papervines';
    }
    if (subdomain === 'vendas' && url.hostname.includes('cabeloesaude')) {
      return 'cabeloesaude';
    }
    if (TENANTS_REGISTRY[subdomain]) {
      return subdomain;
    }
  }

  // Opcao 3: Path (/tenant/{id}/...)
  const pathMatch = url.pathname.match(/^\/tenant\/([^\/]+)/);
  if (pathMatch && TENANTS_REGISTRY[pathMatch[1]]) {
    return pathMatch[1];
  }

  // Opcao 4: Query parameter (?tenant=id)
  const queryTenant = url.searchParams.get('tenant');
  if (queryTenant && TENANTS_REGISTRY[queryTenant]) {
    return queryTenant;
  }

  // Fallback: tenant padrao
  return DEFAULT_TENANT;
}

/**
 * Carrega configuracao de um tenant
 * @param {string} tenantId - ID do tenant
 * @returns {Promise<Object|null>} - Configuracao do tenant
 */
export async function loadTenantConfig(tenantId) {
  const cacheKey = `config-${tenantId}`;

  // Verifica cache
  if (tenantCache.has(cacheKey)) {
    return tenantCache.get(cacheKey);
  }

  // Verifica se tenant existe
  if (!TENANTS_REGISTRY[tenantId]) {
    console.error(`Tenant nao encontrado: ${tenantId}`);
    return null;
  }

  try {
    // Import dinamico da configuracao
    const configModule = await import(`./tenants/${tenantId}/config.js`);
    const config = configModule.TENANT_CONFIG;

    // Valida configuracao minima
    if (!config || !config.id || !config.nome) {
      throw new Error(`Configuracao invalida para tenant: ${tenantId}`);
    }

    // Adiciona ao cache
    tenantCache.set(cacheKey, config);

    return config;
  } catch (error) {
    console.error(`Erro ao carregar config do tenant ${tenantId}:`, error);
    return null;
  }
}

/**
 * Carrega um modulo de dados especifico do tenant
 * @param {string} tenantId - ID do tenant
 * @param {string} moduleName - Nome do modulo (playbook, objecoes, etc)
 * @returns {Promise<Object|null>} - Modulo carregado
 */
export async function loadTenantModule(tenantId, moduleName) {
  const cacheKey = `${moduleName}-${tenantId}`;

  // Verifica cache
  if (tenantCache.has(cacheKey)) {
    return tenantCache.get(cacheKey);
  }

  // Verifica se tenant existe
  if (!TENANTS_REGISTRY[tenantId]) {
    console.error(`Tenant nao encontrado: ${tenantId}`);
    return null;
  }

  try {
    // Import dinamico do modulo
    const module = await import(`./tenants/${tenantId}/${moduleName}.js`);

    // Adiciona ao cache
    tenantCache.set(cacheKey, module);

    return module;
  } catch (error) {
    console.error(`Erro ao carregar ${moduleName} do tenant ${tenantId}:`, error);
    return null;
  }
}

/**
 * Carrega todos os modulos de um tenant
 * @param {string} tenantId - ID do tenant
 * @returns {Promise<Object>} - Objeto com todos os modulos
 */
export async function loadAllTenantModules(tenantId) {
  const modules = {
    config: await loadTenantConfig(tenantId),
    playbook: await loadTenantModule(tenantId, 'playbook'),
    objecoes: await loadTenantModule(tenantId, 'objecoes'),
    scripts: await loadTenantModule(tenantId, 'scripts'),
    precos: await loadTenantModule(tenantId, 'precos'),
    agentes: await loadTenantModule(tenantId, 'agentes')
  };

  return modules;
}

/**
 * Lista todos os tenants disponiveis
 * @returns {Array} - Lista de tenants
 */
export function listTenants() {
  return Object.values(TENANTS_REGISTRY);
}

/**
 * Verifica se um tenant existe
 * @param {string} tenantId - ID do tenant
 * @returns {boolean}
 */
export function tenantExists(tenantId) {
  return tenantId in TENANTS_REGISTRY;
}

/**
 * Limpa o cache de tenants
 */
export function clearTenantCache() {
  tenantCache.clear();
}

/**
 * Obtem informacoes basicas de um tenant
 * @param {string} tenantId - ID do tenant
 * @returns {Object|null}
 */
export function getTenantInfo(tenantId) {
  return TENANTS_REGISTRY[tenantId] || null;
}

// Exporta constantes uteis
export { DEFAULT_TENANT, TENANTS_REGISTRY };
