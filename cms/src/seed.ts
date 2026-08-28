/**
 * Seed: import the markdown content files into the CMS.
 *
 *   npm run seed
 *
 * Reads ../frontend/content/{departments,events,abr,sponsors}/*.md and upserts each
 * entry into Payload by slug (existing entries are updated, new ones created).
 * This is how the CMS gets bootstrapped from the existing content, and how a
 * markdown-first workflow (write md → run seed → CMS stays in sync) works.
 */

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "./env";
import matter from "gray-matter";
import { getPayload } from "payload";
import { config } from "./payload.config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.resolve(__dirname, "../../frontend/content");

const COLLECTIONS = {
  departments: { slugField: "slug", sort: "order" },
  events: { slugField: "slug", sort: "-date" },
  abr: { slugField: "slug", sort: "-date" },
  sponsors: { slugField: "slug", sort: "order" },
  "nibbl-menu": { slugField: "slug", sort: "order" },
} as const;

type CollectionName = keyof typeof COLLECTIONS;

interface SeedDoc {
  slug: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

function loadMarkdown(dir: string): SeedDoc[] {
  const fullDir = path.join(contentRoot, dir);
  let files: string[];
  try {
    files = readdirSync(fullDir).filter((f) => f.endsWith(".md"));
  } catch {
    console.warn(`[seed] missing content directory: ${fullDir}`);
    return [];
  }

  return files.map((file) => {
    const raw = readFileSync(path.join(fullDir, file), "utf8");
    const { data, content } = matter(raw);
    const slug =
      (data.slug as string) ||
      file.replace(/\.md$/, "") ||
      "untitled";
    return { slug, frontmatter: data, body: content.trim() };
  });
}

/** Map a markdown doc to the Payload field shape for a collection. */
function toPayloadDoc(collection: CollectionName, doc: SeedDoc) {
  const base: Record<string, unknown> = { ...doc.frontmatter, slug: doc.slug };
  const body = doc.body;

  switch (collection) {
    case "departments":
      return {
        name: base.name as string,
        slug: doc.slug,
        description: (base.description as string) ?? "",
        order: (base.order as number) ?? 99,
        icon: (base.icon as string) ?? undefined,
        responsibilities: Array.isArray(base.responsibilities)
          ? base.responsibilities
          : undefined,
        content: body || undefined,
      };
    case "events":
      return {
        title: base.title as string,
        slug: doc.slug,
        date: (base.date as string) ?? new Date().toISOString(),
        category: (base.category as string) ?? undefined,
        cover: (base.cover as string) ?? undefined,
        location: (base.location as string) ?? undefined,
        description: (base.description as string) ?? undefined,
        featured: Boolean(base.featured),
        applyUrl: (base.applyUrl as string) ?? undefined,
        content: body || undefined,
      };
    case "abr":
      return {
        title: base.title as string,
        slug: doc.slug,
        date: (base.date as string) ?? new Date().toISOString(),
        author: (base.author as string) ?? undefined,
        type: (base.type as string) ?? "Publication",
        cover: (base.cover as string) ?? undefined,
        tags: Array.isArray(base.tags) ? base.tags : undefined,
        excerpt: (base.excerpt as string) ?? undefined,
        content: body || undefined,
      };
    case "sponsors":
      return {
        name: base.name as string,
        slug: doc.slug,
        logo: (base.logo as string) ?? undefined,
        logoDark: (base.logoDark as string) ?? undefined,
        description: (base.description as string) ?? undefined,
        website: (base.website as string) ?? undefined,
        year: (base.year as string) ?? undefined,
        order: (base.order as number) ?? 99,
        content: body || undefined,
      };
    case "nibbl-menu":
      return {
        name: base.name as string,
        slug: doc.slug,
        category: (base.category as string) ?? "Nostalgic Classics",
        note: (base.note as string) ?? undefined,
        price: (base.price as string) ?? undefined,
        tag: (base.tag as string) ?? undefined,
        available: base.available !== false,
        order: (base.order as number) ?? 99,
        content: body || undefined,
      };
  }
}

type PayloadCollection =
  | "departments"
  | "events"
  | "abr-items"
  | "sponsors"
  | "nibbl-menu";

async function upsertCollection(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collectionName: PayloadCollection,
  collectionDir: string,
) {
  const docs = loadMarkdown(collectionDir);
  let created = 0;
  let updated = 0;

  for (const doc of docs) {
    const data = toPayloadDoc(
      collectionDir as CollectionName,
      doc,
    ) as Record<string, unknown>;

    const existing = await payload.find({
      collection: collectionName,
      where: { slug: { equals: doc.slug } },
      limit: 1,
      depth: 0,
    });

    if (existing.docs.length > 0) {
      await payload.update({
        collection: collectionName,
        id: existing.docs[0].id,
        data: data as never,
      });
      updated++;
    } else {
      await payload.create({ collection: collectionName, data: data as never });
      created++;
    }
  }

  console.log(
    `[seed] ${collectionDir}: ${created} created, ${updated} updated (${docs.length} files)`,
  );
}

async function main() {
  const adminEmail = process.env.CMS_ADMIN_EMAIL;
  const adminPassword = process.env.CMS_ADMIN_PASSWORD;

  const payload = await getPayload({ config });

  if (adminEmail && adminPassword) {
    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: adminEmail } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: { email: adminEmail, password: adminPassword, role: "admin" },
      });
      console.log(`[seed] created admin user ${adminEmail}`);
    }
  } else {
    console.warn("[seed] CMS_ADMIN_EMAIL/PASSWORD not set – skipping admin user");
  }

  await upsertCollection(payload, "departments", "departments");
  await upsertCollection(payload, "events", "events");
  await upsertCollection(payload, "abr-items", "abr");
  await upsertCollection(payload, "sponsors", "sponsors");
  await upsertCollection(payload, "nibbl-menu", "nibbl-menu");

  console.log("[seed] done");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("[seed] failed:", err);
    process.exit(1);
  });
