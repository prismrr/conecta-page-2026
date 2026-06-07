#!/usr/bin/env bash
set -euo pipefail

echo "[release] Iniciando release readiness"

echo "[release] 1/7 - Testes unitarios"
npm run test:unit

echo "[release] 2/7 - Testes de integracao"
npm run test:integration

echo "[release] 3/7 - E2E jornada principal"
npm run test:e2e

echo "[release] 4/7 - Acessibilidade WCAG"
npm run test:a11y

echo "[release] 5/7 - Seguranca completa (secret scan + npm + ruby + links)"
npm run security:release

echo "[release] 6/7 - Validacao de contrato da agenda"
ruby scripts/validate_agenda.rb

echo "[release] 7/7 - Build estatico de producao"
npm run build:site

echo "[release] OK - pronto para UAT final e go-live"
