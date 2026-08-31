import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { Departments } from "./collections/Departments";
import { Events } from "./collections/Events";
import { AbrItems } from "./collections/AbrItems";
import { Sponsors } from "./collections/Sponsors";
import { NibblMenu } from "./collections/NibblMenu";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

function requiredProductionValue(
  name: "PAYLOAD_SECRET" | "DATABASE_URI",
  fallback: string,
) {
  const value = process.env[name];
  if (process.env.NODE_ENV === "production" && !value) {
    throw new Error(`${name} must be configured in production`);
  }
  return value ?? fallback;
}

export const config = buildConfig({
  secret: requiredProductionValue("PAYLOAD_SECRET", "dev-only-secret-change-me"),
  db: postgresAdapter({
    pool: {
      connectionString:
        requiredProductionValue(
          "DATABASE_URI",
          "postgres://localhost:5432/abc_cms",
        ),
    },
    push: process.env.DB_PUSH !== "false",
  }),
  collections: [Users, Media, Departments, Events, AbrItems, Sponsors, NibblMenu],
  graphQL: {
    disable: true,
  },
  cors: (() => {
    const origins = process.env.CORS_ORIGINS?.split(",")
      .map((o) => o.trim())
      .filter(Boolean);
    return origins && origins.length > 0
      ? origins
      : [
          "https://ashokabusinessclub.com",
          "https://www.ashokabusinessclub.com",
          "http://localhost:8080",
        ];
  })(),
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
