# ABC CMS — Payload 3 backend

Payload CMS for the Ashoka Business Club website. Serves:

- **Admin UI** (edit content in a browser): `http://localhost:3000/admin`
- **REST API** for the site: `http://localhost:3000/api/{collection}`
- **Health check**: `http://localhost:3000/api/health` (200 = API + DB ok, 503 = degraded)

## Architecture

```
markdown (frontend/content/ in git)  ──seed──▶  Payload CMS (Postgres)
      ▲                                  │
      └────────export───────────prebuild│ (cms → markdown before site build)
                                        │
                    website build ──────┘ (static site always reads markdown)
                    + runtime fetch of CMS API with markdown fallback
```

- **Markdown is the backup data source.** The site is a static build that bundles
  `../frontend/content/*.md`. A `prebuild` export pulls the latest CMS state into markdown,
  so the committed markdown always tracks the CMS — and if the CMS is ever
  unreachable during a build, the last committed markdown ships anyway.
- **Seed** (`npm run seed`) imports markdown into the CMS (upsert by slug).

## Collections

`departments`, `events`, `abr-items`, `sponsors` mirror the frontmatter of the
markdown files in `../frontend/content/`. Plus `users` for admin login.

## Local setup

### One-command start (recommended)

```bash
# 1. Start Postgres in Docker
docker run -d --name abc-cms-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=abc_cms \
  -p 5432:5432 postgres:16

# 2. Create local env file
cat > .env.local <<'EOF'
NODE_ENV=development
PORT=3000
PAYLOAD_SECRET=local-dev-secret-change-me
DATABASE_URI=postgres://postgres:postgres@localhost:5432/abc_cms
CORS_ORIGINS=http://localhost:8080
CMS_ADMIN_EMAIL=admin@example.com
CMS_ADMIN_PASSWORD=dev-password
CMS_API_URL=http://localhost:3000/api
CMS_HEALTH_URL=http://localhost:3000/api/health
WEBSITE_URL=http://localhost:8080
EOF

# 3. Install deps (once)
npm install

# 4. Start dev server (auto-seeds on first run in dev mode)
npm run dev
```

Then open **http://localhost:3000/admin** — login with:
- **Email**: `admin@example.com`
- **Password**: `dev-password`

### Manual setup (if you prefer .env)

```bash
# 1. Postgres
docker run -d --name abc-cms-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=abc_cms -p 5432:5432 postgres:16

# 2. Env
cp .env.example .env
# edit .env: set PAYLOAD_SECRET, DATABASE_URI, CMS_ADMIN_EMAIL, CMS_ADMIN_PASSWORD

# 3. Install + run
npm install
npm run dev             # http://localhost:3000

# 4. Bootstrap (only needed if auto-seed didn't run)
npm run seed
```

### Stop everything

```bash
# Stop dev server: Ctrl+C
docker stop abc-cms-db
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next dev server |
| `npm run build` / `npm start` | Production build / serve (standalone output) |
| `npm run seed` | Import `../frontend/content/*.md` into the CMS (upsert by slug); creates the admin user from `CMS_ADMIN_EMAIL`/`CMS_ADMIN_PASSWORD` |
| `npm run export` | Pull CMS REST API → write `../frontend/content/*.md` (the backup). Uses `CMS_API_URL` env (defaults to localhost:3000/api). Exits 0 if CMS is unreachable so builds never break |
| `npm run monitor` | UptimeRobot heartbeat cron (see below) |
| `npm run generate:types` | Regenerate Payload TS types |
| `npm run migrate` | Run Payload migrations |

## UptimeRobot heartbeat monitoring

UptimeRobot "Heartbeat" monitors track cron pings: you ping a heartbeat URL
periodically; if pings stop, the monitor goes down and you get alerted.

1. In UptimeRobot create **two Heartbeat monitors** (Add New Monitor → Heartbeat),
   one for the website, one for the CMS API. Copy the two heartbeat URLs.
2. On the CMS host set:
   ```
   WEBSITE_URL=https://your-website.example
   CMS_HEALTH_URL=https://cms.example.com/api/health
   UPTIMEROBOT_HEARTBEAT_WEBSITE=https://heartbeat.uptimerobot.com/xxxx
   UPTIMEROBOT_HEARTBEAT_CMS=https://heartbeat.uptimerobot.com/yyyy
   HEARTBEAT_INTERVAL_MINUTES=5
   ```
3. Run `npm run monitor` (add it to your process manager / Procfile as a
   second process, e.g. `monitor: npm run monitor`).

Behavior every interval:
- **Website:** only pings the website heartbeat if `WEBSITE_URL` actually
  returns 200 — so the monitor reflects the real site, not just the server.
- **CMS:** only pings the CMS heartbeat if `/api/health` returns 200 (validates
  the API and the database).

If the CMS host itself is down, no pings go out and both monitors flip down —
which is the desired alert.

Set the monitor's alert/grace settings so downtime is reported after ~2 missed
pings.

## Deploying

Build produces `output: 'standalone'` — deploy the `cms/.next/standalone` +
`cms/.next/static` pair to any Node host (Render, Railway, Fly.io, a VM with
pm2). Use a managed Postgres. Always set `NODE_ENV=production`, `PAYLOAD_SECRET`,
`DATABASE_URI`; run `npm run seed` once after first deploy to load content.

The website's live-fetch needs CORS: set `CORS_ORIGINS` to the website origin
(comma-separated). Unset = allow all.

