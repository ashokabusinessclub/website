import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { config as loadEnvFile } from "dotenv";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(dirname, "..");
const vpsSharedEnv = "/opt/abc/cms/cms/.env";

// Match Next.js local env precedence for standalone Payload scripts.
loadEnvFile({ path: path.join(projectRoot, ".env.local") });
loadEnvFile({ path: path.join(projectRoot, ".env") });

if (existsSync(vpsSharedEnv)) {
  loadEnvFile({ path: vpsSharedEnv });
}
