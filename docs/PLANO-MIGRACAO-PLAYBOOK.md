# 📋 PLANO DE MIGRAÇÃO - PLAYBOOK CABELO & SAÚDE 2025

## 📊 Análise do Documento Original

**Arquivo fonte**: `docs/playbook2025.md`
- **Tamanho**: 1.1MB, 2512 linhas
- **Estrutura**: 11 módulos (0-10)
- **Scripts**: 40+ roteiros completos
- **Objeções**: 15+ objeções mapeadas
- **Perfis**: 6 clínicos + 3 tipos de lead

---

## 🎯 OBJETIVOS DA MIGRAÇÃO

### Transformar o playbook de:
❌ **Venda B2B de Software** (Paper Vines)
- 6 etapas genéricas
- Scripts técnicos
- Objeções de tecnologia

✅ **Venda Consultiva de Saúde** (Cabelo & Saúde)
- 11 módulos especializados
- Abordagem empática e educativa
- Foco em transformação, não em produto

---

## 📁 ESTRUTURA ATUAL vs. NOVA

### Arquivos Existentes (a serem expandidos):
```
/tenants/cabeloesaude/
├── playbook.js          ✅ Existe (6 etapas) → Expandir para 11 módulos
├── scripts.js           ✅ Existe (básico) → Adicionar 40+ scripts
├── objecoes.js          ✅ Existe (6) → Expandir para 15+
└── precos.js            ✅ Existe (estrutura básica)
```

### Arquivos Novos (a serem criados):
```
/tenants/cabeloesaude/
├── perfis-clinicos.js   ❌ CRIAR - 6 perfis com respostas especializadas
├── perfis-lead.js       ❌ CRIAR - Visual, Emocional, Racional
├── indicadores.js       ❌ CRIAR - KPIs e metas
└── gatilhos.js          ❌ CRIAR - Escassez e urgência
```

---

## 🗺️ ESTRUTURA DOS 11 MÓDULOS

### **MÓDULO 0** - Fundamentos da Venda Consultiva
**Status**: ❌ Não existe
**Conteúdo**:
- O que realmente vendemos (transformação, não consulta)
- Papel do comercial (educação e conexão)
- Como pensam os leads (frustrados, inseguros, céticos)
- 3 tipos de perfil: Visual, Emocional, Racional
- WhatsApp como canal de diagnóstico inicial

**Ações**:
1. Criar seção "Fundamentos" no playbook.js
2. Criar arquivo `perfis-lead.js` com características e abordagens
3. Adicionar checklist de prontidão

---

### **MÓDULO 1** - Abertura de Atendimento
**Status**: ⚠️ Existe parcial (como "Prospecção")
**Conteúdo**:
- Qualificação inicial
- Perguntas de abertura
- Identificação rápida de perfil

**Ações**:
1. Renomear etapa "Prospecção" → "Abertura de Atendimento"
2. Adicionar scripts de qualificação inicial
3. Incluir técnicas de identificação de perfil

---

### **MÓDULO 2** - Mapeamento da Dor
**Status**: ⚠️ Existe parcial (como "Qualificação")
**Conteúdo**:
- **Bloco 1**: Como mapear dor e aumentar consciência
- **Bloco 2**: 6 perguntas de validação com respostas prontas:
  - Como era o seu cabelo antes?
  - Além da queda, o cabelo está mais fino?
  - Cai em algum lugar específico?
  - Sente irritação no couro cabeludo?
  - Os fios estão ralos a ponto de enxergar o couro cabeludo?
  - Está percebendo falhas nas laterais ou no meio?
- **Bloco 3**: Traduzir sintomas clínicos para linguagem simples
- **Bloco 4**: Técnica Espelho + Explicação Clínica
- **Bloco 5**: Perguntas abertas para conduzir o lead
- **Processo de Consulta Online**: Como apresentar, quebrar objeções sutis

**Ações**:
1. Expandir etapa "Qualificação" → "Mapeamento da Dor"
2. Adicionar 6 perguntas de validação em scripts.js
3. Criar glossário de termos técnicos traduzidos
4. Adicionar scripts de apresentação de consulta online

---

### **MÓDULO 3** - Respostas por Perfil Clínico
**Status**: ❌ Não existe
**Conteúdo**:
- 6 perfis clínicos detalhados:
  1. **Alopecia Androgenética** - Afinamento no topo, entradas laterais
  2. **Eflúvio Telógeno** - Queda intensa pós-trauma/estresse
  3. **Foliculite** - Couro cabeludo inflamado
  4. **Psoríase** - Doença autoimune
  5. **Dermatite Seborreica** - Caspa, coceira, oleosidade
  6. **Quadro Misto** - Múltiplas condições simultâneas

**Ações**:
1. ✅ Criar arquivo `perfis-clinicos.js` com:
   - Descrição de cada perfil
   - Sintomas característicos
   - Roteiro de fala sugerido
   - Explicação técnica simplificada
2. Integrar com sistema de busca/filtro
3. Adicionar casos de exemplo

---

### **MÓDULO 4** - Apresentação de Preço
**Status**: ⚠️ Existe parcial (como "Proposta")
**Conteúdo**:
- Valores de consulta e tratamentos
- Condições especiais
- Descrição completa dos procedimentos:
  - Eletroterapia
  - Vacuoterapia
  - Fotobiomodulação
  - Alta frequência
  - Microagulhamento
  - Intradermoterapia
  - Peeling
  - Laser

**Ações**:
1. Renomear "Proposta" → "Apresentação de Preço"
2. Atualizar precos.js com procedimentos detalhados
3. Adicionar scripts de apresentação de valor
4. Incluir combos e condições especiais

---

### **MÓDULO 5** - Objeções e Contornos
**Status**: ⚠️ Existe parcial (6 objeções básicas)
**Conteúdo**: 15+ objeções específicas

**A) Objeções de Preço**:
- "Qual o valor da consulta?"
- "Está muito caro"
- "Não tenho orçamento agora"

**B) Objeções de Confiança**:
- "Vou pensar"
- "Quem atende é médico?"
- "Vocês solicitam exames laboratoriais?"
- "Aceita plano de saúde?"
- "Já passei em médicos e não resolveu"
- "Já usei minoxidil e finasterida e não adiantou"

**C) Objeções de Processo**:
- "Por que preciso fazer consulta antes do tratamento?"
- "É só tônico e shampoo?"
- "Tem retorno? Quanto tempo dura o tratamento?"

**D) Objeções de Adiamento**:
- "Vou fazer só em casa primeiro"
- "Vou fazer em casa e esperar piorar"

**E) Gatilhos de Venda**:
- Escassez de horários
- Agenda limitada da Dra.
- Bônus e condições exclusivas
- Gatilhos emocionais

**Ações**:
1. Expandir objecoes.js de 6 → 15+ objeções
2. Adicionar categoria de objeções por tipo
3. Criar seção de gatilhos em `gatilhos.js`
4. Incluir contornos empáticos e técnicos

---

### **MÓDULO 6** - Pós-Consulta e Reengajamento
**Status**: ❌ Não existe
**Conteúdo**:

**A) Scripts de No-Show** (pacientes que não compareceram):
- Ação imediata (mesmo dia do furo)
- 5 blocos de abordagem:
  1. Abertura com calor + presente surpresa
  2. Validação e explicação do bônus
  3. Reforço da oferta
  4. Valor real × valor percebido
  5. Fechamento leve com urgência

**B) Sequência de Follow-Up**:
- Mensagem 1: Recuperação com contexto personalizado
- Mensagem 2: Estímulo de urgência + possibilidade exclusiva
- Mensagem 3: Recuperação objetiva

**C) 10 Variações de Mensagem**:
1. Reforço da dor + preocupação empática
2. Elevação de consciência com urgência
3. Reforço da solução e alívio
4. Tratamentos frustrados anteriores
5. Lead frio que estava quente
6. Sondagem
7. Pessoa sumiu após prometer retorno
8. Lead representa outra pessoa
9. Lead optou por outra clínica
10. Lead que sumiu sem fechar

**D) Módulo Farmer** (aumento de follows)

**Ações**:
1. Criar nova etapa "Pós-Consulta" no playbook.js
2. Adicionar 18+ scripts de reengajamento
3. Criar categoria "No-Show" em scripts.js
4. Implementar sequências automáticas de follow-up

---

### **MÓDULO 7** - Tratamento Intensivo (1ª Compra)
**Status**: ❌ Não existe (mencionado apenas no sumário)
**Conteúdo**: Não detalhado no documento

**Ações**:
1. Aguardar conteúdo adicional do usuário
2. Placeholder no playbook.js

---

### **MÓDULO 8** - Vendas Diretas (Comercial 2)
**Status**: ❌ Não existe
**Conteúdo**:
- Objetivo: Converter 1ª compra → tratamento contínuo
- Ciclo: Primeiras 48h após consulta
- 4 Scripts principais:
  1. Abertura após consulta (até 48h)
  2. Gatilho do desconto exclusivo pós-consulta
  3. Gatilho de progressão clínica
  4. Última chamada (antes do lead esfriar)
- Sequência de tentativas pós-consulta
- Checklist diário do comercial

**Ações**:
1. Criar nova etapa "Comercial 2" no playbook.js
2. Adicionar 4 scripts de pós-consulta
3. Criar checklist operacional
4. Definir KPIs específicos (taxa de conversão 1ª compra)

---

### **MÓDULO 9** - Roteiros Prontos e Mensagens Modelo
**Status**: ⚠️ Existe parcial (scripts básicos)
**Conteúdo**:
- Objeção específica: "Vou fazer em casa e esperar piorar"
- 3 Roteiros de contorno:
  1. Validação + reflexão suave
  2. Comparativo com outros cuidados
  3. Reativação após 7 dias
- Sequência de acompanhamento sugerida
- Frases de impacto para áudio
- 3 MACs (Mensagens de Abertura de Conversa):
  1. Sondagem leve
  2. Dor invisível
  3. Comparativo com salão/barbearia

**Ações**:
1. Consolidar todos os roteiros em scripts.js
2. Organizar por categoria (abertura, follow-up, contorno)
3. Adicionar templates de áudio/voz
4. Criar biblioteca de frases de impacto

---

### **MÓDULO 10** - Indicadores e Metas
**Status**: ❌ Não existe
**Conteúdo**:
- Métricas de desempenho alvo
- Taxa de conversão consulta
- Taxa de no-show
- Taxa de conversão 1ª compra
- Tempo médio de resposta
- Planilha de indicadores

**Ações**:
1. ✅ Criar arquivo `indicadores.js` com:
   - KPIs principais
   - Metas de conversão
   - Benchmarks
2. Integrar com dashboard do CRM
3. Criar alertas de performance

---

## 📦 ESTRUTURA DE ARQUIVOS FINAL

```javascript
/tenants/cabeloesaude/
├── playbook.js              // 11 módulos (expandido de 6)
├── scripts.js               // 40+ scripts (expandido)
├── objecoes.js              // 15+ objeções (expandido)
├── precos.js                // Consultas + tratamentos (atualizado)
├── perfis-clinicos.js       // 6 perfis com respostas (NOVO)
├── perfis-lead.js           // Visual, Emocional, Racional (NOVO)
├── indicadores.js           // KPIs e metas (NOVO)
└── gatilhos.js              // Escassez e urgência (NOVO)
```

---

## 🎯 PLANO DE EXECUÇÃO

### **FASE 1** - Estrutura Base (Prioridade ALTA)
**Objetivo**: Criar arquivos novos e expandir estrutura do playbook

**Tarefas**:
1. ✅ Criar `perfis-lead.js` (Visual, Emocional, Racional)
2. ✅ Criar `perfis-clinicos.js` (6 perfis + respostas)
3. ✅ Criar `indicadores.js` (KPIs e metas)
4. ✅ Criar `gatilhos.js` (Escassez e urgência)
5. ✅ Expandir `playbook.js` de 6 → 11 módulos

**Estimativa**: 2-3 horas de trabalho
**Impacto**: 🔴 Crítico - Base para todo o resto

---

### **FASE 2** - Scripts e Roteiros (Prioridade ALTA)
**Objetivo**: Adicionar 40+ scripts ao sistema

**Tarefas**:
1. ✅ Scripts de Abertura (Módulo 1)
2. ✅ Scripts de Mapeamento da Dor (Módulo 2)
   - 6 perguntas de validação
   - Apresentação de consulta online
3. ✅ Scripts por Perfil Clínico (Módulo 3)
   - 6 roteiros especializados
4. ✅ Scripts de No-Show (Módulo 6)
   - 5 blocos de abordagem
5. ✅ Scripts de Follow-Up (Módulo 6)
   - 10 variações
6. ✅ Scripts de Comercial 2 (Módulo 8)
   - 4 scripts pós-consulta
7. ✅ Scripts de Contorno (Módulo 9)
   - 3 roteiros + 3 MACs

**Estimativa**: 4-5 horas de trabalho
**Impacto**: 🔴 Crítico - Conteúdo principal

---

### **FASE 3** - Objeções e Contornos (Prioridade ALTA)
**Objetivo**: Expandir de 6 → 15+ objeções

**Tarefas**:
1. ✅ Objeções de Preço (3)
2. ✅ Objeções de Confiança (6)
3. ✅ Objeções de Processo (3)
4. ✅ Objeções de Adiamento (2)
5. ✅ Adicionar contornos empáticos e técnicos
6. ✅ Integrar gatilhos de venda

**Estimativa**: 2-3 horas de trabalho
**Impacto**: 🔴 Crítico - Conversão

---

### **FASE 4** - Módulos Avançados (Prioridade MÉDIA)
**Objetivo**: Implementar funcionalidades especializadas

**Tarefas**:
1. ✅ Módulo Pós-Consulta (Módulo 6)
   - Sistema de no-show
   - Sequências de follow-up
2. ✅ Módulo Comercial 2 (Módulo 8)
   - Checklist diário
   - Sequência 48h
3. ✅ Roteiros e Templates (Módulo 9)
   - Biblioteca de frases
   - Templates de áudio

**Estimativa**: 3-4 horas de trabalho
**Impacto**: 🟡 Importante - Retenção e conversão

---

### **FASE 5** - Interface e Integração (Prioridade MÉDIA)
**Objetivo**: Atualizar UI para refletir nova estrutura

**Tarefas**:
1. ✅ Atualizar navegação (6 → 11 módulos)
2. ✅ Criar filtros por perfil clínico
3. ✅ Criar filtros por perfil de lead
4. ✅ Integrar indicadores no dashboard
5. ✅ Sistema de busca por sintomas
6. ✅ Sistema de sugestão de script por contexto

**Estimativa**: 3-4 horas de trabalho
**Impacto**: 🟡 Importante - UX

---

### **FASE 6** - Testes e Validação (Prioridade BAIXA)
**Objetivo**: Garantir qualidade e consistência

**Tarefas**:
1. ✅ Revisar todos os módulos
2. ✅ Testar navegação
3. ✅ Validar scripts com usuário
4. ✅ Ajustar linguagem/tom
5. ✅ Verificar links e referências
6. ✅ Deploy final

**Estimativa**: 2-3 horas de trabalho
**Impacto**: 🟢 Qualidade

---

## 📊 RESUMO DO ESFORÇO

| Fase | Prioridade | Estimativa | Status |
|------|-----------|------------|--------|
| **Fase 1** - Estrutura Base | 🔴 Alta | 2-3h | ⏳ Pendente |
| **Fase 2** - Scripts e Roteiros | 🔴 Alta | 4-5h | ⏳ Pendente |
| **Fase 3** - Objeções e Contornos | 🔴 Alta | 2-3h | ⏳ Pendente |
| **Fase 4** - Módulos Avançados | 🟡 Média | 3-4h | ⏳ Pendente |
| **Fase 5** - Interface e Integração | 🟡 Média | 3-4h | ⏳ Pendente |
| **Fase 6** - Testes e Validação | 🟢 Baixa | 2-3h | ⏳ Pendente |
| **TOTAL** | - | **16-22h** | - |

---

## ✅ CRITÉRIOS DE SUCESSO

### Ao final da migração, o sistema deve ter:

1. ✅ **11 módulos completos** (vs. 6 atuais)
2. ✅ **40+ scripts especializados** (vs. ~10 genéricos)
3. ✅ **15+ objeções específicas** (vs. 6 genéricas)
4. ✅ **6 perfis clínicos** com respostas detalhadas
5. ✅ **3 perfis de lead** com abordagens diferenciadas
6. ✅ **Sistema de no-show** com 5 blocos de recuperação
7. ✅ **10 variações de follow-up** para diferentes contextos
8. ✅ **Módulo Comercial 2** para pós-consulta
9. ✅ **KPIs e indicadores** específicos de clínica
10. ✅ **Gatilhos de escassez** e urgência clínica

---

## 🚀 PRÓXIMOS PASSOS IMEDIATOS

### Para iniciar a migração agora:

**Opção A - Começar pela Fase 1** (recomendado)
```bash
# Criar arquivos base novos
- perfis-lead.js
- perfis-clinicos.js
- indicadores.js
- gatilhos.js
```

**Opção B - Começar pela Fase 2** (conteúdo prioritário)
```bash
# Expandir scripts.js com roteiros do playbook2025.md
- Extrair e formatar 40+ scripts
- Organizar por módulo
```

**Opção C - Migração Incremental** (menos arriscado)
```bash
# Migrar módulo por módulo
1. Módulo 0 (Fundamentos)
2. Módulo 1 (Abertura)
3. Módulo 2 (Mapeamento)
... etc
```

---

## ❓ QUESTÕES PARA O USUÁRIO

Antes de iniciar, preciso saber:

1. **Qual fase você quer começar?** (1, 2, 3, ou outra?)
2. **Há alguma prioridade específica?** (Ex: "preciso urgente dos scripts de no-show")
3. **Módulo 7 (Tratamento Intensivo)** não está detalhado no playbook2025.md - você tem conteúdo adicional?
4. **Prefere migração completa** (16-22h) ou **MVP incremental** (começar com módulos críticos)?
5. **Quer manter compatibilidade** com Paper Vines ou focar 100% em Cabelo & Saúde?

---

## 📝 OBSERVAÇÕES IMPORTANTES

### Diferenças Culturais:
- **Paper Vines**: B2B, técnico, ROI, features
- **Cabelo & Saúde**: B2C, empático, transformação, saúde

### Mudança de Tom:
- ❌ "Vamos agendar uma demo?"
- ✅ "Você não está sozinha(o), muitas pessoas se sentem assim"

### Foco em Educação:
- Não vender consulta, vender clareza e diagnóstico
- Lead precisa entender que está comprando um plano de transformação

### Perfis como Core:
- Sistema inteiro gira em torno de identificar perfil (lead + clínico)
- Interface precisa facilitar essa identificação rápida

---

**Documento criado**: 2026-01-27
**Baseado em**: playbook2025.md (2512 linhas, 1.1MB)
**Próxima atualização**: Após aprovação do plano
