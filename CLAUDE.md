# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 1. Visão Geral e Contexto

**PRISM Conecta Hub** é um portal de evento de alta performance para o Conecta 2026 (Boa Vista, Roraima). O produto resolve a dispersão de informações e a latência de acesso em redes móveis restritas (Edge/3G), centralizando programação, notícias e localização do evento.

**Arquitetura core (Jamstack):** toda a computação ocorre no *build time*, não no runtime. O Jekyll compila arquivos Markdown (`_news/`, `_agenda/`) em HTML estático e gera `assets/data/agenda.json` — o contrato imutável consumido pelo motor de busca client-side em JavaScript puro. Não há banco de dados relacional nem servidor de aplicação dinâmico em produção.

**Três bounded contexts:**

| Contexto | Responsabilidade |
|---|---|
| **Compilation (Build Time)** | Jekyll lê coleções Markdown + `_config.yml` → gera `_site/` e `agenda.json` |
| **Client Runtime (Browser)** | `ThemeManager` (localStorage + `data-theme`), `SearchEngine` (filtro O(N) em memória) |
| **External** | Google Maps Embed (lazy iframe), plataforma de inscrição externa (link puro) |

**Invariante crítico (INV-001):** nenhuma alteração manual em runtime pode modificar a grade da agenda. Toda mudança exige commit no repositório.

---

## 2. Comandos Frequentes

### Desenvolvimento local

```bash
# Subir servidor Jekyll com live reload (porta 4000)
docker compose up

# Parar containers
docker compose down

# Limpeza de artefatos locais
rm -rf .jekyll-cache _site node_modules test-results playwright-report
```

### Build estático

```bash
# Gera _site/ (executa validate_agenda.rb antes do build)
npm run build:site
```

### Testes

```bash
# Suite completa (unit + integration + e2e + a11y)
npm test

# Apenas unitários (Vitest)
npm run test:unit

# Apenas integração (Vitest + healthcheck Playwright)
npm run test:integration

# Apenas E2E (Playwright — requer build e servidor na porta 4173)
npm run test:e2e

# Apenas acessibilidade (Playwright + axe-core)
npm run test:a11y

# Arquivo único de teste Vitest
npx vitest run tests/unit/<arquivo>.test.js
```

### Segurança

```bash
npm run security:secrets   # TruffleHog — varredura de segredos
npm run security:links     # Valida links externos nos Markdowns
npm run security:ci        # npm audit + validate_external_links (gate de PR)
npm run security:audit     # Auditoria completa
```

### Go-Live e UAT

```bash
npm run release:ready      # Unit + integration + E2E + a11y + security + validate_agenda + build
npm run uat:signoff:check  # Valida ops/UAT_SIGNOFF.md
npm run go-live:ready      # release:ready + signoff check (gate do deploy de produção)
```

---

## 3. Diretrizes de Desenvolvimento e Código

### Arquitetura e dados

- **Coleções Jekyll:** notícias em `_news/`, sessões em `_agenda/`. Ambas têm `output: false` — só existem como fonte de dados, não geram páginas.
- **Contrato de dados da agenda:** o script `scripts/validate_agenda.rb` roda antes de todo build e rejeita qualquer arquivo `_agenda/*.md` com campos ausentes ou tipos inválidos. Campos obrigatórios no front matter: `id`, `title`, `speaker`, `track`, `date` (DD/MM/AAAA), `startTime` (HH:MM), `endTime` (HH:MM), `room`. O campo `track` aceita apenas os valores: `Dev`, `Hardware`, `IoT`, `SocialGood`.
- **`agenda.json`:** gerado em `assets/data/agenda.json` pelo build. É o único ponto de acoplamento entre o Jekyll e o JavaScript client-side. Nunca edite manualmente.

### JavaScript client-side

- **ThemeManager:** deve ler/escrever em `localStorage` com a chave `color-theme` e mutar a classe `dark` no `document.documentElement`. O script de inicialização **deve ser síncrono e inline no `<head>`** para prevenir FOUC.
- **SearchEngine:** filtro O(N) em memória sobre o array do `agenda.json`. Usa `String.prototype.normalize("NFD")` para remover diacríticos antes da comparação — obrigatório para suporte ao português. Não use `innerHTML` nem `eval()` (bloqueado pelo Semgrep no CI).
- **Mapa:** o `<iframe>` do Google Maps usa `loading="lazy"` e deve ter `aspect-ratio: 16/9` (mobile: `4/3`). O link `geo:` de fallback deve estar sempre visível como camada inferior.
- **Links externos:** sempre com `rel="noopener noreferrer"` e `target="_blank"`.

### UI/UX — Tailwind CSS

O Tailwind é carregado via CDN (`https://cdn.tailwindcss.com`) com configuração inline. Não há etapa de purge/build CSS separada.

**Paleta de cores obrigatória:**

| Token | Valor | Uso |
|---|---|---|
| `brand-cyan` | `#23BCC7` | Hover primário, seleção de texto, links |
| `brand-green` | `#00A181` | Categoria Inscrições/SocialGood |
| `brand-blue` | `#356AC3` | CTAs principais, Trilha Dev |
| `brand-orange` | `#F98503` | Alertas/urgentes, Trilha Hardware |
| `dark-bg` | `#0F172A` | Fundo modo escuro |
| `dark-surface` | `#1E293B` | Cards/superfícies modo escuro |
| `light-bg` | `#F8FAFC` | Fundo modo claro |

**Regras visuais:**
- Bordas arredondadas com `rounded-2xl` em cards e `rounded-xl` em inputs/botões.
- Transições globais com classe `.smooth-transition` (`all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`).
- Nav fixa com `backdrop-blur-md` e `bg-*/80` (transparência).
- Contraste mínimo WCAG 2.1 AA (4.5:1). Todo elemento interativo precisa de `aria-label`.
- Informação crítica acessível em no máximo 3 cliques a partir da hero section.

---

## 4. Estratégia de Testes e Qualidade (DoD)

### Definição de "Pronto"

Uma tarefa só está completa quando todos os itens abaixo passam:

1. `npm run test:unit` — testes unitários das funções JavaScript (`tests/unit/`)
2. `npm run test:integration` — validação de contrato do `agenda.json` e smoke test do `/healthz`
3. `npm run test:e2e` — jornadas críticas no browser via Playwright
4. `npm run test:a11y` — zero violações WCAG 2.1 AA via axe-core
5. `npm run security:ci` — sem dependências críticas vulneráveis, sem links externos inválidos
6. `npm run build:site` — build Jekyll bem-sucedido com `validate_agenda.rb` passando

### Padrões de teste

- **Testes E2E:** seguir o padrão **Page Object Model (POM)** em `tests/e2e/`. Seletores ficam nas classes POM em `tests/page-objects/`; asserções ficam nos spec files.
- **TDD obrigatório** para qualquer alteração no `SearchEngine` ou `ThemeManager`: ciclo Red → Green → Refactor.
- **Fixtures de teste:** injetar arquivos Markdown sintéticos em `_agenda/` antes da suite e deletar no `afterAll` (evitar *test pollution*).
- **Regressão visual:** snapshots Playwright em `360x740` (mobile) e `1920x1080` (desktop) para Dark e Light mode. Tolerância máxima de 0,5% de diferença de pixel.

### Pipeline CI/CD

Push para `main` aciona `.github/workflows/deploy-production.yml`, que executa `npm run go-live:ready` antes do upload para GitHub Pages. O deploy **não ocorre** sem o signoff formal em `ops/UAT_SIGNOFF.md`.

**Artefatos operacionais relevantes:** `ops/UAT_SIGNOFF.md`, `ops/ROLLBACK_PLAN.md`, `ops/EVENT_RUNBOOK.md`.
