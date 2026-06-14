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
| Hospedagem | Vercel |
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

## 🌐 Deploy (Vercel)

### Configuração inicial (uma vez)

**1. Linkar o repositório ao projeto Vercel:**

```bash
npm install -g vercel
vercel login
vercel link   # escolha "Create a new project" e siga os prompts
cat .vercel/project.json   # copie orgId e projectId
```

**2. Gerar um token de API** em *vercel.com/account/tokens* → nome sugerido: `github-actions-deploy`.

**3. Adicionar três secrets no repositório GitHub** (*Settings → Secrets and variables → Actions*):

| Secret | Valor |
|---|---|
| `VERCEL_TOKEN` | Token gerado no passo 2 |
| `VERCEL_ORG_ID` | `orgId` de `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` de `.vercel/project.json` |

**4. Evitar double-deploy:** o GitHub Actions já controla quando o deploy ocorre (após o gate passar). Para impedir que a Vercel dispare um segundo deploy automático ao detectar o push no `main`, adicione o campo `github` ao `vercel.json`:

```json
"github": { "enabled": false }
```

Isso desativa a integração via GitHub App da Vercel, mantendo os deploys via CLI com token (`vercel --prod --token`) funcionando normalmente.

### Fluxo automático

Push ou merge em `main` aciona `.github/workflows/deploy-production.yml`, que executa:

1. `npm run go-live:ready` — gate técnico completo + validação de aceite formal de UAT
2. `npx vercel --prod` — aciona o build e deploy na Vercel (só ocorre se o gate passar)

A Vercel executa o build com `ruby scripts/validate_agenda.rb && bundle exec jekyll build` (configurado em `vercel.json`) e serve o conteúdo de `_site/` com os headers de segurança definidos no mesmo arquivo.

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
- Headers de segurança ativos: `curl -sI https://SEU-PROJETO.vercel.app/ | grep -i "x-frame\|content-security"`

---

## 📊 Telemetria (Google Analytics 4)

A telemetria é ativada via `google_analytics_measurement_id` em `_config.yml`. Quando o campo está preenchido, o Jekyll injeta automaticamente a meta tag e o script assíncrono do GA4 no HTML gerado.

### Conformidade LGPD — Consent Mode v2

O script `assets/js/consent-init.js` é carregado de forma **síncrona e bloqueante** no `<head>` antes do GA4, definindo o estado de consentimento padrão como negado:

```js
gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
```

O consentimento só é atualizado para `'granted'` quando o usuário aceita a coleta de dados no modal de privacidade (`_includes/cookie-consent.html`), via `gtag('consent', 'update', ...)` em `assets/js/cookie-manager.js`.

### Eventos rastreados

| Evento | Fonte | Dados |
|---|---|---|
| `app_boot` | `monitoring.js` | `status: "ok"` |
| `nav_timing` | `monitoring.js` | `ttfb`, `domContentLoaded` |
| `web_vitals` | `monitoring.js` | `metric` (LCP / CLS / FCP), `value` |
| `js_error` | `monitoring.js` | `message`, `source`, `line`, `column` |
| `promise_rejection` | `monitoring.js` | `reason` |

### Alterar o Measurement ID

Edite `_config.yml`:

```yaml
google_analytics_measurement_id: "G-XXXXXXXXXX"
```

### Validar em produção

Acesse o site com `?debug_mode=1` na URL e vá em **Google Analytics → Administrador → DebugView** para confirmar os eventos chegando em tempo real.

---

## 🏷️ Releases

O projeto usa [`release-please`](https://github.com/googleapis/release-please) para versionamento semântico automático a partir de [Conventional Commits](https://www.conventionalcommits.org/).

### Como funciona

A cada push em `main`, o workflow `.github/workflows/release.yml` analisa os commits acumulados desde o último release e abre (ou atualiza) automaticamente um **Release PR** com:

- `CHANGELOG.md` gerado
- Título no formato `chore: release vX.Y.Z`

**Para publicar um release, basta mergear o Release PR.** O workflow então:

1. Cria a tag git `vX.Y.Z`
2. Publica o GitHub Release com o changelog
3. Compila o site e anexa `site-vX.Y.Z.zip` como asset do release

### Versionamento semântico automático

| Tipo de commit | Efeito na versão |
|---|---|
| `fix:` / `fix(scope):` | patch — `v1.0.0` → `v1.0.1` |
| `feat:` / `feat(scope):` | minor — `v1.0.0` → `v1.1.0` |
| `BREAKING CHANGE:` no rodapé | major — `v1.0.0` → `v2.0.0` |
| `docs:`, `test:`, `chore:`, `refactor:` | sem bump de versão (aparecem no CHANGELOG) |

### Arquivos de configuração

| Arquivo | Função |
|---|---|
| `.release-please-config.json` | Tipo de release e caminho do CHANGELOG |
| `.release-please-manifest.json` | Versão atual usada como baseline |
