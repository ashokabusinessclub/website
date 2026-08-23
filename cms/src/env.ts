import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnvFile } from "dotenv";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(dirname, "..");

// Match Next.js local env precedence for standalone Payload scripts.
loadEnvFile({ path: path.join(projectRoot, ".env.local") });
loadEnvFile({ path: path.join(projectRoot, ".env") });
