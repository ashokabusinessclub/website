# Ashoka Business Club — Website + CMS

Monorepo with two deployable parts:

```
repo/
├── cms/       Payload 3 CMS backend (Postgres) — deployed to the VPS
├── frontend/   Vite + React static site — deployed to Vercel
└── .github/   CI: pushes touching cms/** auto-deploy to the VPS
```

## How deploys work

| Folder | Where it deploys | Trigger |
| --- | --- | --- |
| `frontend/**` | Vercel (Root Directory = `frontend`) | push to `main` |
| `cms/**` | Hetzner VPS (`/opt/abc/repo`, systemd `abc-cms`) | push to `main` → GitHub Action SSHs in, `git pull`, `npm ci`, `npm run build`, restart |

The site is a static build that bundles `frontend/content/*.md`. At runtime it
fetches the CMS API (`VITE_CMS_URL`); if the CMS is unreachable it renders the
bundled markdown — the backup data source.

## Local dev

```bash
# frontend (http://localhost:8080)
cd frontend
npm install
npm run dev

# CMS (admin at http://localhost:3000/admin)
cd cms
cp .env.example .env   # fill PAYLOAD_SECRET, DATABASE_URI, CMS_ADMIN_*
npm install
npm run dev
npm run seed           # once: import frontend/content into Postgres
```

## Content flow

- `frontend/content/**` is the backup data source, bundled into the site build.
- `cms` sync scripts (run from `frontend/`):
  - `npm run cms:seed`   — import markdown into the CMS (upsert by slug)
  - `npm run cms:export` — pull CMS state back into markdown files

See `cms/README.md` and `frontend/content/README.md` for details.

## VPS + Vercel setup

See `docs` below / `cms/README.md`. The VPS runs Postgres + the CMS behind
Caddy; Vercel hosts the static site and needs `VITE_CMS_URL` pointing at the
CMS (e.g. `https://cms.yourdomain.com`).