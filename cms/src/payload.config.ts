import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { Departments } from "./collections/Departments";
import { Events } from "./collections/Events";
import { AbrItems } from "./collections/AbrItems";
import { Sponsors } from "./collections/Sponsors";
import { Users } from "./collections/Users";

export const config = buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? "dev-only-secret-change-me",
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ?? "postgres://localhost:5432/abc_cms",
    },
    push: process.env.NODE_ENV !== "production",
  }),
  collections: [Users, Departments, Events, AbrItems, Sponsors],
  graphQL: {
    disable: true,
  },
  cors:
    process.env.CORS_ORIGINS?.split(",")
      .map((o) => o.trim())
      .filter(Boolean) ?? "*",
  csrf:
    process.env.CSRF_ORIGINS?.split(",")
      .map((o) => o.trim())
      .filter(Boolean) ?? [],
  admin: {
    meta: {
      titleSuffix: " · ABC CMS",
    },
  },
  endpoints: [
    {
      path: "/health",
      method: "get",
      handler: async (req) => {
        try {
          await req.payload.find({
            collection: "events",
            limit: 1,
            depth: 0,
            where: {},
          });
          return Response.json(
            {
              status: "ok",
              service: "abc-cms",
              timestamp: new Date().toISOString(),
            },
            { status: 200 },
          );
        } catch {
          return Response.json(
            {
              status: "degraded",
              service: "abc-cms",
              timestamp: new Date().toISOString(),
            },
            { status: 503 },
          );
        }
      },
    },
  ],
});

export default config;