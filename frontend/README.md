# ABC Website — Vite + React + shadcn/ui

Static site for the Ashoka Business Club. Deployed to Vercel (Root Directory =
`frontend`). The repo root holds this folder plus the `cms/` backend — see the
[root README](../README.md) for the full picture.

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- react-router (SPA, rewrites handled by `vercel.json`)
- `content/**` markdown bundled at build time (`src/lib/content.ts`)

## Commands

```bash
npm install
npm run dev       # http://localhost:8080
npm run build     # outputs dist/
npm run lint
```

## CMS integration

- At runtime the site tries the CMS API configured by `VITE_CMS_URL`
  (see `.env.example`). If it's unreachable it falls back to the bundled
  `content/**` markdown — the backup data source.
- Sync scripts (they run the CMS in `../cms`):
  - `npm run cms:seed`   — import markdown → CMS
  - `npm run cms:export` — pull CMS → markdown
- When pushing to `main`, Vercel builds this folder. Pushes touching `cms/**`
  deploy the CMS to the VPS instead (see `../.github/workflows/`).