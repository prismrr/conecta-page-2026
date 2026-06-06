# conecta-page-2026

Portal web do evento PRISM Conecta 2026, com foco em alta performance, acessibilidade e operação confiável em redes móveis limitadas.

## Build da Aplicação

### Pré-requisitos

- Docker
- Docker Compose

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
docker compose run --rm web sh -c 'bundle install && bundle exec jekyll build'
```

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
rm -rf .jekyll-cache _site
```

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

Base funcional do MVP já iniciada com:

- Estrutura Jekyll e Docker Compose
- Landing page com seções de notícias, agenda, localização e inscrição
- Busca client-side da agenda com fallback
- Conteúdo editorial inicial em coleções
