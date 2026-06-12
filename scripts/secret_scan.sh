#!/usr/bin/env bash
set -euo pipefail

# Prefer a local trufflehog installation; fallback to Docker image.
TRUFFLEHOG_ARGS="filesystem . --only-verified --exclude-paths .trufflehogignore"

if command -v trufflehog >/dev/null 2>&1; then
  echo "[secret-scan] running trufflehog (local)"
  trufflehog $TRUFFLEHOG_ARGS
  exit 0
fi

if command -v docker >/dev/null 2>&1; then
  echo "[secret-scan] running trufflehog (docker)"
  docker run --rm -v "$PWD:/work" -w /work trufflesecurity/trufflehog:latest $TRUFFLEHOG_ARGS
  exit 0
fi

echo "[secret-scan] erro: trufflehog e docker nao disponiveis" >&2
exit 1
