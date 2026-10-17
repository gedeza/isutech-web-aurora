# Deploying the iSuTech website on Dube TradePort

Replaces the terminated Hetzner box (46.224.40.5). Full site: static frontend + Express/Prisma API + Postgres.
Dube: SSH `dube-tradeport` (port 33822, user `isutech-admin`, no passwordless sudo), apps in `/data/www/<app>`.

| Piece | Where |
|---|---|
| Frontend (`dist/`) | nginx, `isutech.co.za` + `www.isutech.co.za` |
| API | pm2 `isutech-web-api`, `127.0.0.1:4010`, nginx `api.isutech.co.za` |
| Database | local Postgres, db `isutech_web`, role `isutech_web` |

No database backup exists, so the DB starts empty (admin user re-seeded; products/services/leads are gone).
The frontend has fallback data for products/services.

## One-time setup (steps marked SUDO need a sudoer; production auth-file edits are done by Nhlanhla)

1. **Check the port is free** (`ss -tlnp | grep 4010`). If not, change it in `nginx-isutech-web.conf`, `backend/.env`, and `API_PORT` for the health check.
2. **Database (SUDO)**
   ```
   sudo -u postgres psql -c "CREATE ROLE isutech_web LOGIN PASSWORD '<generate>';"
   sudo -u postgres psql -c "CREATE DATABASE isutech_web OWNER isutech_web;"
   ```
3. **Deploy key**: on Dube generate `isutech_web_deploy` (ed25519), add the public half as a GitHub deploy key on
   `gedeza/isutech-web-aurora` (read-only is fine), add a `github.com-isutech-web` alias in `~/.ssh/config`, then:
   ```
   git clone git@github.com-isutech-web:gedeza/isutech-web-aurora.git /data/www/isutech-web
   ```
4. **Create `/data/www/isutech-web/backend/.env`** by hand (never commit; all values fresh, nothing reused from the old box):
   `PORT=4010`, `NODE_ENV=production`, `DATABASE_URL=postgresql://isutech_web:<pw>@localhost:5432/isutech_web?schema=public`,
   `JWT_SECRET=<openssl rand -hex 48>`, `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SENDGRID_API_KEY`/SMTP_*, `UPLOAD_DIR=uploads`,
   `CORS_ORIGINS=https://www.isutech.co.za,https://isutech.co.za`. `chmod 600` it.
5. **Create the schema (manual, once)**: `cd /data/www/isutech-web/backend && npm ci && npx prisma db push` against the new, empty
   `isutech_web` database. Then **first build and start**: `bash /data/www/isutech-web/scripts/deploy-remote.sh`, then
   `npm run seed:admin` and change the seeded admin password after first login.
6. **nginx (SUDO)**: copy `nginx-isutech-web.conf` to `/etc/nginx/sites-available/isutech-web`, symlink into `sites-enabled`, `nginx -t && systemctl reload nginx`.
7. **DNS** (at the DNS host, nameservers ns.dns1.co.za / ns.dns2.co.za / ns.otherdns.*): change the A records for
   `isutech.co.za`, `www`, `api` from `46.224.40.5` to `41.78.233.110`. Leave MX/SPF/TXT alone (Microsoft 365 mail).
   Optionally lower the TTL beforehand.
8. **TLS (SUDO)**, after DNS has propagated:
   `certbot --nginx -d isutech.co.za -d www.isutech.co.za` and `certbot --nginx -d api.isutech.co.za`.
9. **CI**: set repo secrets `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY` (a dedicated key, installed in `authorized_keys` by Nhlanhla;
   set multi-line keys with `gh secret set NAME < keyfile`). Run the workflow manually, then enable the `push` trigger.

## Verify
`curl https://api.isutech.co.za/health`, `curl https://api.isutech.co.za/api/products`, open `https://www.isutech.co.za`,
`/autoslip`, and log in at the admin portal.

## Notes
- `server/` (legacy onboarding API) and `server/deploy.sh` (old Hetzner script) are NOT used; the Prisma backend serves `/api/autoslip`.
- Frontend env (`VITE_*`, e.g. Google Maps) is read at build time on the box. Put them in a root `.env` on Dube before the first build.
- Post-incident rules apply: no secrets in git, dedicated deploy key, fresh credentials.

## Schema changes
The deploy script only runs `prisma generate`. The repo has no `prisma/migrations`, so schema changes are applied by a human
with `npx prisma db push` (it refuses destructive changes unless `--accept-data-loss` is passed, so never pass that without a
backup and sign-off). Follow-up: baseline Prisma Migrate so schema changes become reviewable, versioned files.

## Alignment with isutech-ai policy
- Classification: this repo is AMBER (`~/company/amber/`). `backend/.env` is SECRETS: hand-typed on the box, `chmod 600`, never
  committed, never pasted to an AI agent.
- Deploys use only this reviewed, scripted, retried-SSH path (production policy: no AI-generated ad hoc deploys). DNS changes,
  `authorized_keys` edits and sudo steps are done by Nhlanhla.
- Deploy key: one dedicated key for this repo. Optional hardening from DEV-WORKFLOW-001 §3.4: install its public half with a
  `command=` forced-command wrapper limited to this app's deploy.
- Backups (OPS-001): `backup-postgres.sh` enumerates databases dynamically, so `isutech_web` is picked up automatically once it
  exists in the shared instance. Verify with the first run after setup. Uploaded files in `backend/uploads` are NOT covered by it.
- Registration follow-ups, each needing approval: add the site to the Central Hub Dashboard app catalog, update `dube-box-map.md`,
  and log the change in `isutech-ai` (`tasks.md`/`timeline.md`).
- Known weaknesses carried over from the old code, not fixed here: `cors()` is open to all origins, and the API has no rate
  limiting (CrowdSec on the box helps but is not a substitute).
