# CMS production audit — 2026-08-31

## Confirmed production state

- `https://www.ashokabusinessclub.com` returns HTTP 200.
- `https://cms.ashokabusinessclub.com/api/health` returns HTTP 503 with
  `status: degraded`. The health handler only returns this state when its
  database query fails.
- A public collection request returns HTTP 500.
- A request from the production `www` origin receives no
  `Access-Control-Allow-Origin` header in the current deployment.
- Both CMS and frontend production builds pass locally.

This isolates the active outage to the deployed CMS database/runtime path. The
browser CORS policy is also wrong for the site's actual `www` origin.

## Root causes fixed in the repository

1. The frontend used `CMS_URL`, which Vite does not expose to browser code.
   It now uses `VITE_CMS_URL`.
2. Open tabs fetched CMS data only once and explicitly disabled focus refresh.
   CMS queries now bypass HTTP cache, refresh on focus, and poll every 30 seconds.
3. Every CMS deploy ran `npm run seed`, overwriting admin edits with committed
   markdown. Seeding is now an explicit one-time/manual operation.
4. Missing production database/secret configuration silently fell back to local
   development values. Production now fails fast with the missing key name.
5. Default CORS allowed the apex domain but omitted the real `www` site origin.
6. Deployment health verification could be skipped when its domain secret was
   absent. The workflow now fails instead.

## Remaining operational risks

- The production database connection/service still needs repair on the VPS;
  repository changes cannot repair an unavailable database remotely.
- Schema updates currently use Payload's automatic `push` behavior by default.
  Before setting `DB_PUSH=false`, generate and commit a baseline migration, then
  run `npm run migrate` during deployment.
- Uploaded media is stored on the VPS filesystem. It needs off-host backups or
  object storage to survive host replacement.
- `npm run export` is manual and does not preserve all upload relationship data,
  so it is not a complete media backup.

## VPS verification after deployment

Run these on the VPS without printing environment values:

```bash
sudo systemctl is-active abc-cms
sudo journalctl -u abc-cms -n 100 --no-pager
curl -fsS http://127.0.0.1:3000/api/health
curl -fsS https://cms.ashokabusinessclub.com/api/health
```

The final command must return HTTP 200 before the frontend can show CMS changes.
