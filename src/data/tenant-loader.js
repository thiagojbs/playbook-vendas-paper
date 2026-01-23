// Sistema de carregamento de tenants
// Usa imports estaticos pois Cloudflare Workers nao suporta import() dinamico

// ========================================
// IMPORTS ESTATICOS DE TODOS OS TENANTS
// ========================================

// Paper Vines (tenant padrao)
import { TENANT_CONFIG as PV_CONFIG } from './tenants/papervines/config.js';
import * as PV_PLAYBOOK from './tenants/papervines/playbook.js';
import * as PV_OBJECOES from './tenants/papervines/objecoes.js';
import * as PV_SCRIPTS from './tenants/papervines/scripts.js';
import * as PV_PRECOS from './tenants/papervines/precos.js';
import * as PV_AGENTES from './tenants/papervines/agentes.js';

// Cabelo e Saude
import { TENANT_CONFIG as CS_CONFIG } from './tenants/cabeloesaude/config.js';
import * as CS_PLAYBOOK from './tenants/cabeloesaude/playbook.js';
import * as CS_OBJECOES from './tenants/cabeloesaude/objecoes.js';
import * as CS_SCRIPTS from './tenants/cabeloesaude/scripts.js';
import * as CS_PRECOS from './tenants/cabeloesaude/precos.js';

// ========================================
// REGISTRO DE TENANTS
// ========================================

const TENANTS_DATA = {
  papervines: {
    config: PV_CONFIG,
    playbook: PV_PLAYBOOK,
    objecoes: PV_OBJECOES,
    scripts: PV_SCRIPTS,
    precos: PV_PRECOS,
    agentes: PV_AGENTES
  },
  cabeloesaude: {
    config: CS_CONFIG,
    playbook: CS_PLAYBOOK,
    objecoes: CS_OBJECOES,
    scripts: CS_SCRIPTS,
    precos: CS_PRECOS,
    agentes: null
  }
};

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
      // Continua para verificar query param
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
 * @returns {Object|null} - Configuracao do tenant
 */
export function loadTenantConfig(tenantId) {
  const tenant = TENANTS_DATA[tenantId];
  if (!tenant) {
    console.error(`Tenant nao encontrado: ${tenantId}`);
    return TENANTS_DATA[DEFAULT_TENANT].config;
  }
  return tenant.config;
}

/**
 * Carrega um modulo de dados especifico do tenant
 * @param {string} tenantId - ID do tenant
 * @param {string} moduleName - Nome do modulo (playbook, objecoes, etc)
 * @returns {Object|null} - Modulo carregado
 */
export function loadTenantModule(tenantId, moduleName) {
  const tenant = TENANTS_DATA[tenantId];
  if (!tenant) {
    console.error(`Tenant nao encontrado: ${tenantId}`);
    return TENANTS_DATA[DEFAULT_TENANT][moduleName] || null;
  }
  return tenant[moduleName] || TENANTS_DATA[DEFAULT_TENANT][moduleName] || null;
}

/**
 * Carrega todos os modulos de um tenant
 * @param {string} tenantId - ID do tenant
 * @returns {Object} - Objeto com todos os modulos
 */
export function loadAllTenantModules(tenantId) {
  const tenant = TENANTS_DATA[tenantId];

  if (!tenant) {
    console.error(`Tenant nao encontrado: ${tenantId}, usando padrao`);
    return TENANTS_DATA[DEFAULT_TENANT];
  }

  return {
    config: tenant.config,
    playbook: tenant.playbook,
    objecoes: tenant.objecoes,
    scripts: tenant.scripts,
    precos: tenant.precos,
    agentes: tenant.agentes
  };
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
 * Obtem informacoes basicas de um tenant
 * @param {string} tenantId - ID do tenant
 * @returns {Object|null}
 */
export function getTenantInfo(tenantId) {
  return TENANTS_REGISTRY[tenantId] || null;
}

// Exporta constantes uteis
export { DEFAULT_TENANT, TENANTS_REGISTRY };
