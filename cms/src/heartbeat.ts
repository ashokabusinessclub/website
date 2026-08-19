import "dotenv/config";
import cron from "node-cron";

/**
 * UptimeRobot "Heartbeat" monitors work on cron pings: you configure a
 * heartbeat URL on UptimeRobot and ping it periodically from your server.
 * If the ping stops arriving (server down, website down), UptimeRobot flags
 * the monitor down and alerts you.
 *
 * Run standalone with:
 *   npm run monitor
 *
 * It pings two heartbeats on a schedule:
 *   1. WEBSITE    – only when the live site actually responds (200), so the
 *                   monitor reflects the real website, not just our server.
 *   2. CMS API    – only when the CMS /api/health passes (API + DB reachable).
 */

const CMS_HEALTH_URL = (
  process.env.CMS_HEALTH_URL ?? "http://127.0.0.1:3000/api/health"
).replace(/\/$/, "");

async function ping(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(15_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

const log = (msg: string) =>
  console.log(`[heartbeat ${new Date().toISOString()}] ${msg}`);

export function startHeartbeat() {
  const heartbeatWebsite = process.env.UPTIMEROBOT_HEARTBEAT_WEBSITE;
  const heartbeatCms = process.env.UPTIMEROBOT_HEARTBEAT_CMS;
  const websiteUrl = process.env.WEBSITE_URL;
  const intervalMinutes = Number(process.env.HEARTBEAT_INTERVAL_MINUTES ?? 5);

  if (!heartbeatWebsite && !heartbeatCms) {
    log("no heartbeat URLs configured – monitoring disabled");
    return;
  }

  const schedule = `*/${Math.max(1, Math.min(59, intervalMinutes))} * * * *`;
  log(`scheduled every ${intervalMinutes} minute(s)`);

  cron.schedule(schedule, async () => {
    // 1. Website – only ping its heartbeat when the site really is up.
    if (websiteUrl && heartbeatWebsite) {
      const siteUp = await ping(websiteUrl);
      if (siteUp) {
        const sent = await ping(heartbeatWebsite);
        log(
          sent
            ? `website OK → heartbeat pinged`
            : `website OK but heartbeat ping FAILED`,
        );
      } else {
        log(`website DOWN → heartbeat skipped (monitor will flip to down)`);
      }
    }

    // 2. CMS API – self-check /api/health (validates API + DB) before pinging.
    if (heartbeatCms) {
      const healthUp = await ping(CMS_HEALTH_URL);
      if (healthUp) {
        const sent = await ping(heartbeatCms);
        log(
          sent
            ? `cms OK → heartbeat pinged`
            : `cms OK but heartbeat ping FAILED`,
        );
      } else {
        log(`cms health check FAILED → heartbeat skipped (monitor will flip to down)`);
      }
    }
  });
}

startHeartbeat();

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));