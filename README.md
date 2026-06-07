# conecta-page-2026

Portal web do evento PRISM Conecta 2026, com foco em alta performance, acessibilidade e operação confiável em redes móveis limitadas.

## Quick Deploy

1. Atualize `ops/UAT_SIGNOFF.md` com `APROVADO PARA GO-LIVE` e assinaturas.
2. Rode o gate final local:

```bash
npm run go-live:ready
```

3. Faça merge/push em `main` (ou dispare manualmente `Deploy Production`).
4. Aguarde o workflow `.github/workflows/deploy-production.yml` concluir.
5. Valide em produção:
- Home carregando
- `/healthz` retornando `ok`
- Agenda, localização e CTA funcionando

## Build da Aplicação

### Pré-requisitos

- Docker
- Docker Compose
- Node.js 20+
- npm

### Executar em desenvolvimento (com live reload)

1. Subir o servidor local:

```bash
docker compose up
```

2. Acessar a aplicação:

```text
http://localhost:4000
```

### Gerar build estático de produção

```bash
npm run build:site
```

Esse comando executa a validacao de contrato da agenda (`scripts/validate_agenda.rb`) antes do build do Jekyll.

Saída gerada em:

```text
_site/
```

### Parar os containers

```bash
docker compose down
```

### Limpeza opcional de artefatos locais

```bash
rm -rf .jekyll-cache _site node_modules test-results playwright-report
```

## UAT e Go-Live

### Executar readiness de release (gate unico)

```bash
npm run release:ready
```

Esse comando executa:

1. testes unitarios
2. testes de integracao
3. testes E2E
4. testes de acessibilidade
5. checks de seguranca (secret scan + npm audit + bundle-audit + links externos)
6. validacao de contrato da agenda
7. build estatico final

### Executar gate final de Go-Live (inclui aceite formal UAT)

```bash
npm run go-live:ready
```

Esse comando exige signoff formal aprovado em `ops/UAT_SIGNOFF.md`.

### Aceite formal de UAT (passo humano obrigatorio)

Antes do `npm run go-live:ready`, atualize `ops/UAT_SIGNOFF.md` com:

1. Decisao: `APROVADO PARA GO-LIVE`
2. Assinatura de Produto/Coordenacao sem status pendente
3. Assinatura de Engenharia sem status pendente

Validar manualmente o signoff:

```bash
npm run uat:signoff:check
```

### Executar apenas UAT automatizado

```bash
npm run uat
```

### Executar baseline de segurança

```bash
npm run security:ci
```

### Executar auditoria completa de segurança

```bash
npm run security:audit
```

### Artefatos operacionais

- UAT checklist: ops/UAT_CHECKLIST.md
- UAT signoff: ops/UAT_SIGNOFF_TEMPLATE.md
- UAT signoff materializado: ops/UAT_SIGNOFF.md
- Go-live checklist: ops/GO_LIVE_CHECKLIST.md
- Rollback plan: ops/ROLLBACK_PLAN.md
- Event runbook: ops/EVENT_RUNBOOK.md

## Monitoramento Basico em Producao

Implementacao tecnica aplicada no front-end:

- Telemetria client-side em `assets/js/monitoring.js`
- Captura de erros globais (`error` e `unhandledrejection`)
- Captura de Web Vitals basicos (LCP, FCP, CLS)
- Eventos de jornada (tema e agenda)
- Endpoint estatico de healthcheck em `/healthz`

Validacao automatizada de disponibilidade:

```bash
npm run test:integration
```

Esse fluxo inclui smoke test do endpoint `/healthz`.

### Workflows de CI/CD

- Security and Hardening: `.github/workflows/security.yml`
- Release Readiness: `.github/workflows/release-readiness.yml`
- Go-Live Gate: `.github/workflows/go-live-gate.yml`
- Deploy Production (GitHub Pages): `.github/workflows/deploy-production.yml`

## Deploy em Producao (GitHub Pages)

### Configuracao inicial (uma vez)

1. Em Settings > Pages do repositório, configurar Source como GitHub Actions.
2. Garantir que a branch `main` esteja protegida conforme politica do time.
3. Garantir que o arquivo de aceite formal (`ops/UAT_SIGNOFF.md`) esteja aprovado para go-live.

### Publicacao

1. Via merge/push em `main`:
- O workflow `Deploy Production` e acionado automaticamente.

2. Via execucao manual:
- Acionar `workflow_dispatch` do workflow `Deploy Production`.

### O que o deploy executa

1. `npm run go-live:ready` (inclui readiness tecnico + validacao de aceite formal de UAT)
2. Upload do artefato estatico `_site`
3. Publicacao em GitHub Pages

### Pos-deploy

1. Validar disponibilidade da home
2. Validar healthcheck em `/healthz`
3. Validar agenda, localizacao e CTA de inscricao

## Visão do Projeto

O Conecta Hub centraliza as informações do evento em uma experiência de página única, priorizando:

- acesso rápido à programação
- avisos e notícias em tempo real
- localização do evento com fallback resiliente
- conversão para inscrição externa com baixa fricção

Diretriz principal: oferecer informação crítica em até 3 cliques, mesmo em cenários de conectividade restrita.

## Objetivos de Produto

- Reduzir dispersão de informações do evento
- Melhorar engajamento antes e durante o Conecta
- Garantir experiência responsiva em mobile
- Manter baixo custo operacional com arquitetura estática

## Escopo Funcional (MVP)

1. Landing page responsiva com conteúdo essencial do evento
2. Seção de notícias baseada em conteúdo estático
3. Agenda estática com busca textual client-side
4. Seção de localização com mapa e fallback por link geo
5. CTA de inscrição apontando para plataforma externa

## Arquitetura e Princípios Técnicos

- Arquitetura Jamstack (build time > runtime)
- Geração de conteúdo estático com Jekyll
- Front-end com HTML, CSS e JavaScript
- Sem dependência de banco de dados em produção
- Deploy em CDN estática para baixa latência e resiliência

Princípios adotados:

- Imutabilidade em produção (alterações por commit/versionamento)
- Segurança por padrão (links externos seguros e hardening de headers)
- Degradação suave em caso de falha de dependências externas
- Acessibilidade alinhada à WCAG 2.1 nível AA

## Requisitos Não Funcionais (Alvos)

- Lighthouse mobile >= 90
- LCP <= 2,0s em cenário móvel restrito
- TTFB <= 150ms quando servido por CDN
- Busca da agenda com resposta fluida para interação em tempo real

## Fluxos Críticos

- Inicialização de tema visual com persistência local
- Busca na agenda em memória no navegador
- Carregamento de mapa com lazy loading e fallback geo
- Redirecionamento seguro para inscrição externa

## Qualidade, Testes e Segurança

Estratégia de testes:

- Unitários: motor de busca e lógica de tema
- Integração: validação de contrato e estrutura dos dados compilados
- E2E: jornadas principais (tema, agenda, localização, CTA)
- Acessibilidade: validações automatizadas (Axe)
- Regressão visual: snapshots para mobile e desktop

Controles de segurança previstos:

- varredura de segredos no pipeline
- análise estática e de dependências
- CSP e headers de segurança em produção
- política de links externos com noopener noreferrer

## Organização do Repositório

- specs/design.md: diretrizes de front-end e UI/UX
- specs/idea.md: conceito, proposta de valor e milestones
- specs/prd.md: requisitos de produto e arquitetura
- specs/sys_flow.md: modelagem técnica e fluxos de execução
- specs/test_plan.md: estratégia de qualidade, testes e DevSecOps

## Roadmap (Resumo)

1. PoC: validação de build, dados e performance base
2. Alpha/Beta: funcionalidades críticas + automação de qualidade
3. GA: segurança de produção, observabilidade e otimizações

## Status

MVP implementado ate Sprint 6 com:

- Estrutura Jekyll e Docker Compose
- Landing page com seções de notícias, agenda, localização e inscrição
- Busca client-side da agenda com fallback
- Conteúdo editorial inicial em coleções
- Suite de qualidade (unit, integração, E2E e acessibilidade)
- Baseline de segurança (secret scan, auditoria de dependências, hardening de headers)
- Artefatos operacionais de UAT e Go-Live (checklists, rollback e runbook)
