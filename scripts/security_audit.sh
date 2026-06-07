#!/usr/bin/env bash
set -euo pipefail

echo "[security] secret scan"
bash scripts/secret_scan.sh

echo "[security] npm audit (critical)"
npm audit --audit-level=critical

echo "[security] ruby bundle audit"
docker compose run --rm web sh -c '
	bundle install &&
	gem install bundler-audit &&
	BDIR=$(ruby -e "print Gem.bindir") &&
	AUDIT_BIN="$BDIR/bundle-audit" &&
	if [ ! -x "$AUDIT_BIN" ]; then AUDIT_BIN="$BDIR/bundler-audit"; fi &&
	"$AUDIT_BIN" check --update
'

echo "[security] external links policy"
ruby scripts/validate_external_links.rb
