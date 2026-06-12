# PRISM Conecta Hub

Portal de evento de alta performance para o **Conecta 2026** (Boa Vista, Roraima). Centraliza programação, notícias e localização do evento em uma experiência de página única, projetada para operar com confiabilidade em redes móveis restritas (Edge/3G).

A arquitetura é **Jamstack**: toda a computação ocorre em build time. O Jekyll compila coleções Markdown em HTML estático e gera `assets/data/agenda.json`, consumido por um motor de busca client-side em JavaScript puro. Não há banco de dados nem servidor de aplicação dinâmico em produção.

Alvos de qualidade: Lighthouse mobile ≥ 90, LCP ≤ 2,0 s, acessibilidade WCAG 2.1 AA.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Geração de páginas | Jekyll 4.2.2 |
| Linguagem de scripts | Ruby 3.2 |
| Runtime JavaScript | Node.js 20+ |
| Ambiente de desenvolvimento | Docker + Docker Compose |
| Estilização | Tailwind CSS (via CDN) |
| Testes unitários / integração | Vitest |
| Testes E2E / acessibilidade | Playwright + axe-core |
| Hospedagem | GitHub Pages |
| CI/CD | GitHub Actions |

---

## ⚙️ Configuração Local

**Pré-requisitos:**

- Docker e Docker Compose
- Node.js 20+ e npm

**Passos:**

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd conecta-page-2026

# 2. Instalar dependências Node (Playwright, Vitest)
npm install

# 3. Subir o servidor Jekyll com live reload
docker compose up
```

Acesse a aplicação em `http://localhost:4000`.

**Parar os containers:**

```bash
docker compose down
```

**Limpeza opcional de artefatos locais:**

```bash
rm -rf .jekyll-cache _site node_modules test-results playwright-report
```

---

## 🚀 Build

```bash
npm run build:site
```

O comando executa os seguintes passos via Docker:

1. `bundle install` — instala as gems Ruby declaradas no `Gemfile`
2. `ruby scripts/validate_agenda.rb` — valida o contrato dos arquivos `_agenda/*.md` e rejeita front matters inválidos
3. `bundle exec jekyll build` — gera o site estático

O artefato final é gerado em `_site/`.

**Campos obrigatórios no front matter de cada arquivo `_agenda/*.md`:**

| Campo | Formato |
|---|---|
| `id` | string única |
| `title` | string |
| `speaker` | string |
| `track` | `Dev`, `Hardware`, `IoT` ou `SocialGood` |
| `date` | `DD/MM/AAAA` |
| `startTime` | `HH:MM` |
| `endTime` | `HH:MM` |
| `room` | string |

O build falha imediatamente se qualquer campo estiver ausente ou com tipo inválido.

---

## 🌐 Deploy (GitHub Pages)

### Configuração inicial (uma vez)

Em *Settings > Pages* do repositório, defina **Source** como **GitHub Actions**.

### Fluxo automático

Push ou merge em `main` aciona `.github/workflows/deploy-production.yml`, que executa:

1. `npm run go-live:ready` — gate técnico completo + validação de aceite formal de UAT
2. Upload do artefato `_site/` via `actions/upload-pages-artifact`
3. Publicação no GitHub Pages via `actions/deploy-pages`

O deploy **não ocorre** se o gate falhar. Não há rollback automático — consulte `ops/ROLLBACK_PLAN.md` para o procedimento manual.

### Pré-requisito humano obrigatório

Antes do merge em `main`, o arquivo `ops/UAT_SIGNOFF.md` deve conter a aprovação formal. Valide localmente:

```bash
npm run uat:signoff:check
```

### Acionamento manual

Disponível via `workflow_dispatch` na aba **Actions** do repositório (workflow `Deploy Production`).

### Pós-deploy

Valide em produção:

- Home carregando sem erros
- `/healthz` retornando `ok`
- Agenda, localização e CTA de inscrição funcionando
