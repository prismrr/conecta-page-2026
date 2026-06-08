# Security Baseline - Sprint 5

Este documento descreve os controles de seguranca aplicados no MVP do PRISM Conecta Hub.

## Controles implementados

1. Secret scanning no CI:
- Workflow: .github/workflows/security.yml
- Ferramenta: TruffleHog

2. Auditoria de dependencias:
- Node: npm audit --audit-level=critical
- Ruby: bundler-audit (bundle audit check --update)

3. Hardening de seguranca em entrega estatica:
- Arquivo de headers: _headers
- Politicas: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP
- Meta policies defensivas no layout base: _layouts/default.html
- CSP com dominios de telemetria externa controlados para GA4 no `connect-src`

4. Validacao de links externos:
- Script: scripts/validate_external_links.rb
- Regras:
  - links externos devem usar target="_blank"
  - links externos devem conter rel com noopener noreferrer

5. Telemetria observavel com fallback:
- Coletor principal: Google Analytics 4 (GA4), quando `google_analytics_measurement_id` estiver configurado.
- Resiliencia: fallback para `/telemetry` no front-end para evitar perda total de sinal em caso de bloqueio externo.

## Como executar localmente

1. Validar links externos:

```bash
npm run security:links
```

2. Rodar checks de seguranca para CI local:

```bash
npm run security:ci
```

3. Rodar auditoria completa local (inclui bundle audit via docker):

```bash
npm run security:audit
```

## Notas

- Para evitar falso positivo de conteudo sensivel, nao versionar segredos no repositório.
- Politicas de seguranca podem ser refinadas no deploy final conforme provedor de hospedagem/CDN.
