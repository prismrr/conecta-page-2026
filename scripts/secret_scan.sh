#!/usr/bin/env bash
set -euo pipefail

# Prefer a local trufflehog installation; fallback to Docker image.
if command -v trufflehog >/dev/null 2>&1; then
  echo "[secret-scan] running trufflehog (local)"
  trufflehog filesystem . --fail
  exit 0
fi

if command -v docker >/dev/null 2>&1; then
  echo "[secret-scan] running trufflehog (docker)"
  docker run --rm -v "$PWD:/work" -w /work trufflesecurity/trufflehog:latest filesystem . --fail
  exit 0
fi

echo "[secret-scan] erro: trufflehog e docker nao disponiveis" >&2
exit 1
