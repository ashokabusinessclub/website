import path from "node:path";
import { fileURLToPath } from "node:url";
import { withPayload } from "@payloadcms/next/withPayload";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default withPayload({
  output: "standalone",
  transpilePackages: ["@payloadcms/next"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@payload-config": path.resolve(dirname, "./src/payload.config.ts"),
    };
    return config;
  },
});