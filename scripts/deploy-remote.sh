#!/usr/bin/env bash
# Runs ON Dube TradePort (piped over SSH by .github/workflows/deploy.yml, or by hand).
# Order follows isutech-ai docs/dev-workflow-001-design.md §3.3: lock, pull, build, restart, health check.
# Database schema changes are deliberately NOT applied here (production policy: no destructive DB
# operations without a controlled workflow). See deploy/README.md "Schema changes".
set -euo pipefail

APP_DIR=/data/www/isutech-web
PM2_NAME=isutech-web-api
HEALTH_URL="http://127.0.0.1:${API_PORT:-4010}/health"

# 1. Lock: serialise bursts of deploys
exec 9>/tmp/isutech-web-deploy.lock
flock -n 9 || { echo "Another deploy is running"; exit 1; }

# 2. Pull
cd "$APP_DIR"
git fetch origin main
git reset --hard origin/main

# 3. Build
echo "== frontend"
npm ci
npm run build                     # -> dist/ (served directly by nginx)

echo "== backend"
cd backend
npm ci
npx prisma generate
# Generate the client only. The schema itself is applied by a human (see deploy/README.md).
npm run build                     # tsc -> backend/dist
mkdir -p uploads/services uploads/resumes

# 4. Restart
if pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 restart "$PM2_NAME" --update-env
else
  pm2 start "$APP_DIR/deploy/ecosystem.config.cjs"
fi
pm2 save

# 5. Health check (~20s), loud failure with logs
for i in $(seq 1 10); do
  if curl -fsS "$HEALTH_URL" >/dev/null; then
    echo "Healthy: $HEALTH_URL"
    exit 0
  fi
  sleep 2
done
echo "Health check FAILED: $HEALTH_URL" >&2
pm2 logs "$PM2_NAME" --lines 40 --nostream >&2 || true
exit 1
