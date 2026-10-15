#!/usr/bin/env bash
# Deploys the web app to Cloudflare Pages from an allowlisted staging folder.
# Never deploy the repo root: private/ holds credentials and Pages serves every file.
#
# Usage: scripts/deploy-web.sh [main|preview]
set -euo pipefail

BRANCH="${1:-preview}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ALLOW=(index.html admin.html js data exams assets branding public functions)

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

for entry in "${ALLOW[@]}"; do
  [ -e "$ROOT/$entry" ] && cp -r "$ROOT/$entry" "$STAGE/"
done

if grep -rlE 'service_role|BEGIN (EC |RSA )?PRIVATE KEY|sk_live_' "$STAGE" >/dev/null; then
  echo "Abbruch: Staging enthält mögliche Secrets:" >&2
  grep -rlE 'service_role|BEGIN (EC |RSA )?PRIVATE KEY|sk_live_' "$STAGE" >&2
  exit 1
fi

set -a; . /home/claude/.keys/tokens.env; set +a
cd "$STAGE"
npx wrangler pages deploy . --project-name k-learning --branch "$BRANCH" --commit-dirty=true
