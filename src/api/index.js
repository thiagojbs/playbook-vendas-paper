export async function handleAPI(request, env, path) {
  const method = request.method;

  if (path === '/api/clientes' && method === 'GET') {
    return await getClientes(env);
  }

  if (path === '/api/clientes' && method === 'POST') {
    const data = await request.json();
    return await createCliente(env, data);
  }

  if (path === '/api/propostas' && method === 'GET') {
    return await getPropostas(env);
  }

  if (path === '/api/propostas' && method === 'POST') {
    const data = await request.json();
    return await createProposta(env, data);
  }

  if (path === '/api/contratos' && method === 'GET') {
    return await getContratos(env);
  }

  if (path === '/api/contratos' && method === 'POST') {
    const data = await request.json();
    return await createContrato(env, data);
  }

  return { error: 'Endpoint nao encontrado', status: 404 };
}

async function getClientes(env) {
  try {
    const result = await env.DB.prepare('SELECT * FROM clientes ORDER BY created_at DESC').all();
    return { success: true, data: result.results };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function createCliente(env, data) {
  try {
    const result = await env.DB.prepare(
      'INSERT INTO clientes (nome_empresa, ramo_negocio, nome_responsavel, cargo, email, telefone, origem, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      data.nome_empresa || null,
      data.ramo_negocio || null,
      data.nome_responsavel || null,
      data.cargo || null,
      data.email || null,
      data.telefone || null,
      data.origem || null,
      data.status || 'lead'
    ).run();
    return { success: true, id: result.meta.last_row_id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getPropostas(env) {
  try {
    const result = await env.DB.prepare('SELECT p.*, c.nome_empresa FROM propostas p LEFT JOIN clientes c ON p.cliente_id = c.id ORDER BY p.created_at DESC').all();
    return { success: true, data: result.results };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function createProposta(env, data) {
  try {
    const count = await env.DB.prepare('SELECT COUNT(*) as count FROM propostas').first();
    const numeroProposta = 'PV' + new Date().getFullYear() + String(count.count + 1).padStart(4, '0');
    const result = await env.DB.prepare(
      'INSERT INTO propostas (cliente_id, numero_proposta, usuarios, whatsapp_canais, valor_mensalidade, valor_implantacao, valor_total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      data.cliente_id || null,
      numeroProposta,
      data.usuarios || 3,
      data.whatsapp_canais || 1,
      data.valor_mensalidade || 0,
      data.valor_implantacao || 0,
      data.valor_total || 0,
      'pendente'
    ).run();
    return { success: true, id: result.meta.last_row_id, numero: numeroProposta };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function getContratos(env) {
  try {
    const result = await env.DB.prepare('SELECT ct.*, c.nome_empresa FROM contratos ct LEFT JOIN clientes c ON ct.cliente_id = c.id ORDER BY ct.created_at DESC').all();
    return { success: true, data: result.results };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function createContrato(env, data) {
  try {
    const count = await env.DB.prepare('SELECT COUNT(*) as count FROM contratos').first();
    const numeroContrato = 'CT' + new Date().getFullYear() + String(count.count + 1).padStart(4, '0');
    const result = await env.DB.prepare(
      'INSERT INTO contratos (numero_contrato, cnpj, cpf_responsavel, email_responsavel, data_inicio, status) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(
      numeroContrato,
      data.cnpj || null,
      data.cpf_responsavel || null,
      data.email_responsavel || null,
      data.data_inicio || null,
      'pendente'
    ).run();
    return { success: true, id: result.meta.last_row_id, numero: numeroContrato };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
