import { Buffer } from "buffer";
import matter from "gray-matter";

// gray-matter expects a global Buffer; provide it before any parsing happens
(globalThis as unknown as { Buffer: typeof Buffer }).Buffer =
  (globalThis as unknown as { Buffer?: typeof Buffer }).Buffer ?? Buffer;

export type Frontmatter = Record<string, unknown>;

export interface ContentEntry<T extends Frontmatter = Frontmatter> {
  slug: string;
  data: T;
  body: string;
}

function parseCollection(
  modules: Record<string, string>,
): ContentEntry[] {
  return Object.entries(modules).map(([filepath, raw]) => {
    const { data, content } = matter(raw);
    const slug =
      (data.slug as string) ||
      filepath.split("/").pop()!.replace(/\.md$/, "");
    return { slug, data, body: content.trim() };
  });
}

/* ---------------- Departments ---------------- */

export interface Department extends Frontmatter {
  name: string;
  description: string;
  responsibilities?: string[];
  order?: number;
  icon?: string;
}

const departmentFiles = import.meta.glob("/content/departments/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const departments = parseCollection(departmentFiles)
  .map((e) => e as ContentEntry<Department>)
  .sort(
    (a, b) =>
      (a.data.order ?? 99) - (b.data.order ?? 99) ||
      a.data.name.localeCompare(b.data.name),
  );

export const getDepartment = (slug: string) =>
  departments.find((d) => d.slug === slug);

/* ---------------- ABR ---------------- */

export interface AbrItem extends Frontmatter {
  title: string;
  date: string;
  author?: string;
  type?: string; // Publication | Monocle | ...
  cover?: string;
  tags?: string[];
  excerpt?: string;
}

const abrFiles = import.meta.glob("/content/abr/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const abrItems = parseCollection(abrFiles)
  .map((e) => e as ContentEntry<AbrItem>)
  .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

export const abrTypes = Array.from(
  new Set(abrItems.map((i) => i.data.type ?? "Publication")),
);

export const getAbrItem = (slug: string) =>
  abrItems.find((i) => i.slug === slug);

/* ---------------- Events ---------------- */

export interface EventItem extends Frontmatter {
  title: string;
  date: string;
  category?: string;
  cover?: string;
  description?: string;
  location?: string;
  featured?: boolean;
  applyUrl?: string;
}

const eventFiles = import.meta.glob("/content/events/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const events = parseCollection(eventFiles)
  .map((e) => e as ContentEntry<EventItem>)
  .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

export const eventCategories = Array.from(
  new Set(events.map((e) => e.data.category).filter(Boolean) as string[]),
);

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

/* ---------------- Sponsors ---------------- */

export interface Sponsor extends Frontmatter {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  year?: string;
  order?: number;
}

const sponsorFiles = import.meta.glob("/content/sponsors/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

export const sponsors = parseCollection(sponsorFiles)
  .map((e) => e as ContentEntry<Sponsor>)
  .sort(
    (a, b) =>
      (a.data.order ?? 99) - (b.data.order ?? 99) ||
      a.data.name.localeCompare(b.data.name),
  );

/* ---------------- Helpers ---------------- */

export function formatDate(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
