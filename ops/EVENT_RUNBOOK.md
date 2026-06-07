# EVENT RUNBOOK - Operacao durante o evento

Objetivo: orientar atualizacoes rapidas de conteudo durante os dias do evento.

## Rotina operacional

1. Monitorar painel de problemas e disponibilidade
2. Receber solicitacoes de mudanca da coordenacao
3. Atualizar arquivos em _news e _agenda
4. Executar validacoes antes de publicar

## Monitoramento tecnico basico (producao)

1. Telemetria client-side ativa em `assets/js/monitoring.js`
2. Eventos de monitoramento:
	- `app_boot`
	- `js_error`
	- `promise_rejection`
	- `web_vitals` (LCP/FCP/CLS)
	- `theme_init` e `theme_toggle`
	- `agenda_loaded`, `agenda_search` e `agenda_fallback`
3. Endpoint de healthcheck estatico: `/healthz`
4. Smoke de disponibilidade: validar HTTP 200 em `/healthz` no pos-deploy

## Comandos operacionais

1. Validar agenda e links externos:

```bash
ruby scripts/validate_agenda.rb
ruby scripts/validate_external_links.rb
```

2. Build local de verificacao:

```bash
npm run build:site
```

3. Readiness completo (pre-publicacao critica):

```bash
bash scripts/release_readiness.sh
```

4. Verificacao de healthcheck em ambiente publicado:

```bash
curl -fsSL https://SEU_DOMINIO/healthz
```

## SLA operacional recomendado

- Noticias urgentes: publicacao em ate 10 minutos
- Correcao de agenda: publicacao em ate 15 minutos

## Padrao para comunicados urgentes

- Titulo curto e direto
- Data e horario da atualizacao
- Acao clara para o participante

## Escalonamento

1. Incidente de conteudo: responsavel editorial
2. Incidente tecnico: responsavel tecnico
3. Incidente de plataforma externa (inscricao): coordenacao
