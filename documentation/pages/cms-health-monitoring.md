# CMS Health Monitoring (UptimeRobot)

The monitoring setup reports uptime for **both** the website and the CMS API
using UptimeRobot **Heartbeat monitors** driven by cron pings from the CMS host.

## How it works

UptimeRobot Heartbeat monitors don't probe anything themselves — they wait for
incoming pings. Your server pings a heartbeat URL on a schedule; when pings stop
arriving (site down, CMS down, server down), the monitor flips to DOWN and
alerts you.

```
CMS host (npm run monitor)                     UptimeRobot
┌────────────────────────────────────┐
│ every N minutes:                   │
│  GET website URL ──200?──▶ ping ───┼──▶ Heartbeat monitor "Website"
│  GET /api/health  ──200?──▶ ping ───┼──▶ Heartbeat monitor "CMS API"
└────────────────────────────────────┘
```

Because the website check only pings when the site really returns 200, the
website monitor reflects true website availability (not just "the CMS server
is alive"). The CMS monitor verifies the API **and the database** before pinging.

## Setup steps

1. **Create the monitors** — uptimerobot.com → **+ Add New Monitor** →
   Monitor Type: **Heartbeat**.
   - Monitor 1: "ABC Website"
   - Monitor 2: "ABC CMS API"
   Each gets a unique heartbeat URL like
   `https://heartbeat.uptimerobot.com/m78xxxxx-aaaaaaaaaaaaaaaa`.

2. **Set the alert contact** on both monitors (or globally in
   My Settings → Alert Contacts): email/Slack/Telegram, so you actually hear
   about downtime.

3. **Configure the CMS host** (`cms/.env` — see `cms/.env.example`):
   ```
   WEBSITE_URL=https://your-website.example
   CMS_HEALTH_URL=https://cms.example.com/api/health
   UPTIMEROBOT_HEARTBEAT_WEBSITE=https://heartbeat.uptimerobot.com/<website-url>
   UPTIMEROBOT_HEARTBEAT_CMS=https://heartbeat.uptimerobot.com/<cms-url>
   HEARTBEAT_INTERVAL_MINUTES=5
   ```

4. **Run the pinger** as its own process next to the CMS:
   ```
   npm run monitor   # cms/
   ```
   On Render/Railway add a second process: `monitor: npm run monitor`.
   On a VM use pm2: `pm2 start --name abc-heartbeat "npm run monitor"`.

5. **Tune alert thresholds** — Heartbeat monitors trigger DOWN after a grace
   period; set it to ~2× the interval (10 min for a 5 min interval) so one
   missed ping doesn't page you.

## What each monitor means

| Monitor | Down means |
| --- | --- |
| ABC Website | The site URL did not respond 200 for the grace period, **or** the CMS host (which sends the pings) is down |
| ABC CMS API | `/api/health` failed (API crashed, DB unreachable), **or** the CMS host is down |

## Verification

- `curl https://cms.example.com/api/health` → `{"status":"ok",...}`
- Watch `npm run monitor` logs:
  - `website OK → heartbeat pinged`
  - `website DOWN → heartbeat skipped (monitor will flip to down)`
  - `cms health check FAILED → heartbeat skipped`
- UptimeRobot dashboard shows both monitors UP within one interval.

## Notes & alternatives

- **HTTP monitors:** you can also add plain HTTP monitors for public URLs
  (they probe from UptimeRobot's network) — useful as a second opinion, since
  heartbeat monitors inherit the ping sender's network path.
- **Status page:** UptimeRobot Public Status Pages are free — publish both
  monitors so members can check site status.
- **Extra heartbeat** (optional): UptimeRobot lets you add multiple heartbeat
  URLs per monitor (e.g. one from a second host) — the monitor stays UP if any
  URL is pinged.