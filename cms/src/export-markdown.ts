/**
 * Export: pull CMS content back out to markdown files.
 *
 *   npm run export
 *
 * This keeps website/content/*.md in git as the backup data source: the website
 * builds from markdown, so the committed markdown is what ships if the CMS
 * is ever unreachable. Run this before shipping a content update so the
 * markdown tracks the latest CMS state.
 *
 * Uses the public REST API, so it can point at a deployed CMS:
 *   CMS_API_URL=https://cms.example.com npm run export
 *
 * Exits 0 with a warning if the CMS is unreachable, so builds still proceed
 * with the last committed markdown.
 */

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.resolve(__dirname, "../../website/content");

const CMS_API_URL = (process.env.CMS_API_URL ?? "http://localhost:3000/api").replace(
  /\/$/,
  "",
);

const COLLECTIONS = {
  departments: "departments",
  events: "events",
  "abr-items": "abr",
  sponsors: "sponsors",
} as const;

/** Order of keys written in each frontmatter block. */
const FIELD_ORDER = {
  departments: ["name", "description", "order", "icon", "responsibilities"],
  events: [
    "title",
    "date",
    "category",
    "cover",
    "location",
    "description",
    "featured",
    "applyUrl",
  ],
  "abr-items": ["title", "date", "author", "type", "cover", "tags", "excerpt"],
  sponsors: ["name", "logo", "description", "website", "year", "order"],
} as const;

function yamlString(value: string): string {
  if (
    /^[\w.@/-]+$/.test(value) &&
    !/^(true|false|null|yes|no|on|off|~)$/i.test(value) &&
    !/^\d/.test(value) &&
    value !== ""
  ) {
    return value;
  }
  return JSON.stringify(value);
}

function serializeFrontmatter(
  collection: keyof typeof FIELD_ORDER,
  data: Record<string, unknown>,
) {
  const keys = FIELD_ORDER[collection] as readonly string[];
  const lines: string[] = [];

  for (const key of keys) {
    const value = data[key];
    if (value === undefined || value === null || value === "") continue;

    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      lines.push(`${key}:`);
      for (const item of value) lines.push(`  - ${yamlString(String(item))}`);
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === "number") {
      lines.push(`${key}: ${value}`);
    } else {
      const raw = String(value);
      if (raw.includes("\n")) {
        lines.push(`${key}: |`);
        for (const line of raw.split("\n")) lines.push(`  ${line}`);
      } else {
        lines.push(`${key}: ${yamlString(raw)}`);
      }
    }
  }
  return lines.join("\n");
}

function writeCollection(
  collection: keyof typeof COLLECTIONS,
  dir: string,
  docs: Record<string, unknown>[],
) {
  const fullDir = path.join(contentRoot, dir);
  mkdirSync(fullDir, { recursive: true });

  const existing = readdirSync(fullDir).filter((f) => f.endsWith(".md"));
  const liveSlugs = new Set(docs.map((d) => String(d.slug ?? d.id ?? "untitled")));

  for (const doc of docs) {
    const slug = String(doc.slug ?? doc.id ?? "untitled");
    const data = { ...doc };
    delete data.id;
    delete data.slug;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.updatedAtLock;

    if (typeof data.date === "string") {
      data.date = data.date.slice(0, 10);
    }

    const body = (data.content as string) ?? "";
    delete data.content;

    const frontmatter = serializeFrontmatter(collection, data);
    const file = path.join(fullDir, `${slug}.md`);
    const output = `---\n${frontmatter}\n---\n\n${body.trim()}\n`;
    writeFileSync(file, output, "utf8");
  }

  for (const file of existing) {
    const slug = file.replace(/\.md$/, "");
    if (!liveSlugs.has(slug)) {
      rmSync(path.join(fullDir, file));
      console.log(`[export] removed stale file: ${dir}/${file}`);
    }
  }

  console.log(`[export] ${collection}: wrote ${docs.length} files → website/content/${dir}/`);
}

async function main() {
  console.log(`[export] pulling from ${CMS_API_URL}`);

  for (const [collection, dir] of Object.entries(COLLECTIONS)) {
    try {
      const res = await fetch(
        `${CMS_API_URL}/${collection}?limit=0&depth=0&sort=order`,
        { signal: AbortSignal.timeout(15_000) },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { docs?: Record<string, unknown>[] };
      writeCollection(collection as keyof typeof COLLECTIONS, dir, json.docs ?? []);
    } catch (err) {
      console.warn(
        `[export] CMS unreachable for "${collection}" (${(err as Error).message}) – ` +
          `keeping committed markdown as-is`,
      );
    }
  }

  console.log("[export] done");
}

main().catch((err) => {
  console.warn("[export] failed:", err.message);
  process.exit(0);
});