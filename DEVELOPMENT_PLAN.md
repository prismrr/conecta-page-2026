# DEVELOPMENT_PLAN

Plano de desenvolvimento prático do MVP do PRISM Conecta Hub, derivado dos documentos em specs, com foco em execução semanal, controle técnico e aderência às invariantes do PRD.

## 1. Diretrizes Invioláveis (PRD)

1. **INV-001 - Consistência de agenda:** alterações de programação somente por Git + build, sem mutação em runtime.
2. **INV-002 - Inscrição externa declarativa:** links de inscrição sem dependência de sessão, cookies ou scripts de terceiros obrigatórios.
3. **INV-003 - Sustentabilidade operacional:** zero backend dinâmico e zero banco relacional em produção.

## 2. Escopo MVP (Fechado)

### In

1. Landing page responsiva (informações essenciais do evento)
2. Seção de notícias via Markdown/Jekyll Collections
3. Agenda estática com busca textual client-side
4. Seção de localização com fallback por link `geo:`
5. CTA para inscrição externa com atributos de segurança

### Out (Pós-MVP)

1. Backend dinâmico/API para agenda
2. Fluxo de inscrição interno
3. Integrações transacionais externas
4. Funcionalidades não essenciais de personalização avançada

## 3. Cronograma de Sprints Semanais

### Sprint 1 - Fundação Técnica

**Objetivo:** deixar o projeto executável e implantável como site estático.

**Entregas:**
1. Estrutura base Jekyll e configuração inicial
2. Docker Compose para ambiente local
3. Pipeline de build inicial (base para CI)
4. Layout base da landing e navegação por seções
5. Conteúdo inicial institucional mínimo

**Critérios de pronto (DoD):**
1. Projeto sobe com um comando
2. Build estático gera saída sem erro
3. Landing base acessível em mobile e desktop

### Sprint 2 - Conteúdo e Localização

**Objetivo:** completar fluxo de informação essencial do evento.

**Entregas:**
1. Coleção de notícias em Markdown
2. Seção de localização completa com fallback `geo:`
3. CTA de inscrição externa validado
4. Refino visual e semântico das seções principais

**DoD:**
1. Notícias renderizadas por coleção
2. Link de localização funcional em dispositivos móveis
3. Fluxo de navegação principal completo em até 3 cliques

### Sprint 3 - Agenda e Busca

**Objetivo:** habilitar acesso rápido à programação.

**Entregas:**
1. Coleção de agenda com metadados padronizados
2. Geração de dataset estático de agenda
3. Busca client-side em memória com normalização de acentos
4. Estados de erro e fallback para indisponibilidade de dados

**DoD:**
1. Agenda exibida e filtrável
2. Busca funcional para termos com/sem acento
3. Interface permanece utilizável em caso de falha no dataset

### Sprint 4 - Qualidade e Acessibilidade

**Objetivo:** proteger o MVP contra regressões funcionais e de UX.

**Entregas:**
1. Testes unitários para lógica crítica de tema/busca
2. Testes de integração para contrato de conteúdo
3. Testes E2E das jornadas principais
4. Checagem de acessibilidade WCAG 2.1 AA

**DoD:**
1. Pipeline de testes verde
2. Sem violações críticas de acessibilidade
3. Regressões críticas bloqueadas no merge

### Sprint 5 - Segurança e Hardening

**Objetivo:** baseline DevSecOps para release seguro.

**Entregas:**
1. Secret scanning no fluxo de contribuição
2. Auditoria de dependências no pipeline
3. Hardening de headers e políticas de conteúdo
4. Revisão de links externos e superfícies de risco

**DoD:**
1. Sem vazamento de segredos
2. Sem vulnerabilidade crítica aberta
3. Política de segurança aplicada no deploy

### Sprint 6 - UAT e Go-Live

**Objetivo:** homologação final e entrada em produção.

**Entregas:**
1. UAT com stakeholders do evento
2. Correções críticas de conteúdo/fluxo
3. Checklist de release + plano de rollback
4. Runbook de operação para dias de evento

**DoD:**
1. Aceite formal do MVP
2. Produção estável com monitoramento básico
3. Time preparado para atualizações rápidas de conteúdo

## 4. WBS Técnica (Work Breakdown Structure)

### 1.0 Plataforma

1.1 Estrutura Jekyll (layouts, includes, coleções)
1.2 Configuração de build e artefatos estáticos
1.3 Padronização de ambiente com Docker
1.4 Base de deploy estático e versionamento

### 2.0 Front-end e UX

2.1 Landing page e hierarquia de informação
2.2 Navegação por âncoras e CTA principais
2.3 Responsividade mobile-first
2.4 Localização e fallback resiliente

### 3.0 Agenda e Dados

3.1 Modelagem dos itens de agenda
3.2 Geração de dataset estático
3.3 Motor de busca client-side
3.4 Tratamento de exceções e fallback visual

### 4.0 Qualidade

4.1 Testes unitários (busca/tema)
4.2 Testes de integração (conteúdo/contrato)
4.3 Testes E2E (jornada crítica)
4.4 Acessibilidade e regressão visual

### 5.0 Segurança e Operação

5.1 Secret scanning
5.2 Auditoria de dependências
5.3 Hardening de segurança de entrega
5.4 Runbook, rollback e operação do evento

## 5. Dependências e Caminho Crítico

1. Caminho crítico: **1.0 -> 2.0 -> 3.0 -> 4.0 -> 5.0**
2. Paralelo possível: UI (2.0) e modelagem de agenda (3.1) após fundação pronta
3. Bloqueadores:
   - sem contrato de agenda validado, não inicia E2E de busca
   - sem baseline de segurança, não há go-live

## 6. Critérios de Aceitação do MVP

1. Fluxo principal completo: descobrir evento -> consultar agenda -> localizar evento -> acessar inscrição
2. Build e deploy estáticos reproduzíveis
3. Busca da agenda funcional e robusta a dados com acentuação
4. Semântica/acessibilidade mínima atendida
5. Conformidade com invariantes do PRD comprovada

## 7. Plano de Execução Imediata (Início da Implementação)

1. Criar base técnica da Sprint 1 (estrutura Jekyll + Docker)
2. Implementar landing inicial com seções do MVP
3. Adicionar coleções `news` e `agenda` com dados seed
4. Publicar primeiro build funcional local
5. Evoluir na sequência para a busca client-side da Sprint 3
