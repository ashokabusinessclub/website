import { mkdirSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "./env";
import { isSafeSlug } from "./fields/validation";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.resolve(dirname, "../../frontend/content");
const CMS_API_URL = (process.env.CMS_API_URL ?? "http://localhost:3000/api").replace(/\/$/, "");
const PAGE_SIZE = 100;
const MAX_DOCS = 5_000;

export const COLLECTIONS = {
  departments: "departments", events: "events", "abr-items": "abr",
  sponsors: "sponsors", "nibbl-menu": "nibbl-menu",
} as const;
type CollectionName = keyof typeof COLLECTIONS;
type Doc = Record<string, unknown>;

const FIELDS: Record<CollectionName, readonly string[]> = {
  departments: ["name", "description", "order", "icon", "responsibilities"],
  events: ["title", "date", "category", "cover", "location", "description", "featured", "applyUrl"],
  "abr-items": ["title", "date", "author", "type", "cover", "images", "tags", "excerpt"],
  sponsors: ["name", "logo", "logoDark", "description", "website", "year", "order"],
  "nibbl-menu": ["name", "category", "note", "price", "tag", "available", "order"],
};

function scalar(value: unknown): string {
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  const string = String(value);
  return /^[\w.@/-]+$/.test(string) && !/^(true|false|null|yes|no|on|off|~|\d)/i.test(string)
    ? string : JSON.stringify(string);
}

export function serializeFrontmatter(collection: CollectionName, data: Doc): string {
  const lines: string[] = [];
  for (const key of FIELDS[collection]) {
    const value = data[key];
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      if (!value.length) continue;
      lines.push(`${key}:`);
      for (const item of value) {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const entries = Object.entries(item as Doc).filter(([, nested]) => nested != null && nested !== "");
          entries.forEach(([nestedKey, nested], index) =>
            lines.push(`${index === 0 ? "  -" : "   "} ${nestedKey}: ${scalar(nested)}`));
        } else lines.push(`  - ${scalar(item)}`);
      }
    } else if (typeof value === "string" && value.includes("\n")) {
      lines.push(`${key}: |`, ...value.split("\n").map((line) => `  ${line}`));
    } else lines.push(`${key}: ${scalar(value)}`);
  }
  return lines.join("\n");
}

function mediaUrl(value: unknown, apiUrl: string): string | undefined {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const url = (value as Doc).url;
  if (typeof url !== "string") return undefined;
  try { return new URL(url, new URL(apiUrl).origin).toString(); } catch { return undefined; }
}

export function normalizeExportDocument(collection: CollectionName, raw: Doc, apiUrl = CMS_API_URL): Doc {
  const doc = { ...raw };
  if (collection === "events" || collection === "abr-items") {
    doc.cover = mediaUrl(raw.coverImage, apiUrl) ?? raw.cover;
    delete doc.coverImage;
  }
  if (collection === "sponsors") {
    doc.logo = mediaUrl(raw.logoImage, apiUrl) ?? raw.logo;
    doc.logoDark = mediaUrl(raw.logoDarkImage, apiUrl) ?? raw.logoDark;
    delete doc.logoImage; delete doc.logoDarkImage;
  }
  if (collection === "abr-items" && Array.isArray(raw.images)) {
    doc.images = raw.images.flatMap((value) => {
      if (!value || typeof value !== "object" || Array.isArray(value)) return [];
      const row = value as Doc; const src = mediaUrl(row.image, apiUrl);
      return src ? [{ url: src, caption: row.caption, alt: row.alt }] : [];
    });
  }
  return doc;
}

export function resolveInside(root: string, ...parts: string[]): string {
  const base = path.resolve(root); const result = path.resolve(base, ...parts);
  if (result !== base && !result.startsWith(`${base}${path.sep}`)) throw new Error("Path escapes export root");
  return result;
}

export function parsePayloadPage(collection: CollectionName, value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`${collection}: invalid response`);
  const result = value as Doc;
  if (!Array.isArray(result.docs) || !Number.isSafeInteger(result.page) || !Number.isSafeInteger(result.totalPages) || Number(result.page) < 1 || Number(result.totalPages) < 1)
    throw new Error(`${collection}: invalid paginated response`);
  const docs = result.docs.map((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item) || !isSafeSlug((item as Doc).slug))
      throw new Error(`${collection}: unsafe or missing slug`);
    return item as Doc;
  });
  return { docs, page: Number(result.page), totalPages: Number(result.totalPages) };
}

export async function fetchCollection(collection: CollectionName, fetcher: typeof fetch = fetch, apiUrl = CMS_API_URL): Promise<Doc[]> {
  const docs: Doc[] = []; let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    const url = new URL(`${apiUrl}/${collection}`);
    url.searchParams.set("limit", String(PAGE_SIZE)); url.searchParams.set("page", String(page)); url.searchParams.set("depth", "1");
    const response = await fetcher(url, { signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`${collection}: HTTP ${response.status}`);
    const parsed = parsePayloadPage(collection, await response.json());
    if (parsed.page !== page) throw new Error(`${collection}: unexpected page`);
    totalPages = parsed.totalPages;
    if (totalPages * PAGE_SIZE > MAX_DOCS) throw new Error(`${collection}: exceeds ${MAX_DOCS} document limit`);
    docs.push(...parsed.docs);
  }
  if (new Set(docs.map((doc) => doc.slug)).size !== docs.length) throw new Error(`${collection}: duplicate slugs`);
  return docs;
}

function render(collection: CollectionName, raw: Doc): string {
  const doc = normalizeExportDocument(collection, raw);
  for (const key of ["id", "slug", "createdAt", "updatedAt", "updatedAtLock"]) delete doc[key];
  if (typeof doc.date === "string") doc.date = doc.date.slice(0, 10);
  const body = typeof doc.content === "string" ? doc.content : ""; delete doc.content;
  return `---\n${serializeFrontmatter(collection, doc)}\n---\n\n${body.trim()}\n`;
}

export function applyExport(all: Map<CollectionName, Doc[]>, root = contentRoot): void {
  const id = `${process.pid}-${Date.now()}`;
  const stage = resolveInside(root, `.cms-stage-${id}`), backup = resolveInside(root, `.cms-backup-${id}`);
  const changed: Array<{ target: string; saved: string; existed: boolean }> = [];
  mkdirSync(stage, { recursive: true }); mkdirSync(backup, { recursive: true });
  try {
    for (const [collection, docs] of all) {
      if (!docs.length) continue;
      const staged = resolveInside(stage, COLLECTIONS[collection]); mkdirSync(staged, { recursive: true });
      for (const doc of docs) {
        const slug = String(doc.slug); if (!isSafeSlug(slug)) throw new Error("Unsafe export slug");
        writeFileSync(resolveInside(staged, `${slug}.md`), render(collection, doc), "utf8");
      }
    }
    for (const [collection, docs] of all) {
      if (!docs.length) continue;
      const dir = COLLECTIONS[collection], target = resolveInside(root, dir), saved = resolveInside(backup, dir);
      let existed = true;
      try { renameSync(target, saved); } catch (error) { if ((error as NodeJS.ErrnoException).code === "ENOENT") existed = false; else throw error; }
      changed.push({ target, saved, existed }); renameSync(resolveInside(stage, dir), target);
    }
  } catch (error) {
    for (const item of changed.reverse()) { rmSync(item.target, { recursive: true, force: true }); if (item.existed) renameSync(item.saved, item.target); }
    throw error;
  } finally { rmSync(stage, { recursive: true, force: true }); rmSync(backup, { recursive: true, force: true }); }
}

export async function main() {
  const all = new Map<CollectionName, Doc[]>();
  for (const collection of Object.keys(COLLECTIONS) as CollectionName[]) {
    const docs = await fetchCollection(collection);
    if (!docs.length) console.warn(`[export] ${collection} empty; preserving existing Markdown`);
    all.set(collection, docs);
  }
  applyExport(all);
  for (const [collection, docs] of all) if (docs.length) console.log(`[export] ${collection}: wrote ${docs.length}`);
}

const isMain = process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main().catch((error: unknown) => { console.error(`[export] failed: ${error instanceof Error ? error.message : "unknown error"}`); process.exitCode = 1; });
