import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = join(root, "content");
const errors = [];
const requirements = {
  departments: ["name", "description"],
  events: ["title", "date"],
  abr: ["title", "date"],
  sponsors: ["name"],
  "nibbl-menu": ["name", "category"],
};

function fields(raw) {
  const end = raw.indexOf("\n---", 4);
  if (!raw.startsWith("---\n") || end < 0) return null;
  return Object.fromEntries(
    raw.slice(4, end).split("\n").flatMap((line) => {
      const match = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
      return match ? [[match[1], match[2].replace(/^['"]|['"]$/g, "")]] : [];
    }),
  );
}

for (const [collection, required] of Object.entries(requirements)) {
  const directory = join(contentRoot, collection);
  const slugs = new Set();
  for (const filename of readdirSync(directory).filter((name) => name.endsWith(".md"))) {
    const path = join(directory, filename);
    const data = fields(readFileSync(path, "utf8"));
    if (!data) {
      errors.push(`${collection}/${filename}: missing or malformed frontmatter`);
      continue;
    }
    for (const key of required) {
      if (!data[key]) errors.push(`${collection}/${filename}: missing ${key}`);
    }
    const slug = data.slug || basename(filename, ".md");
    if (slugs.has(slug)) errors.push(`${collection}/${filename}: duplicate slug ${slug}`);
    slugs.add(slug);
    if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) errors.push(`${collection}/${filename}: invalid date`);
    for (const key of ["website", "applyUrl"]) {
      if (data[key] && !/^https?:\/\//.test(data[key])) errors.push(`${collection}/${filename}: ${key} must use HTTP(S)`);
    }
    for (const key of ["logo", "logoDark", "cover"]) {
      if (data[key]?.startsWith("/") && !existsSync(join(root, "public", data[key]))) {
        errors.push(`${collection}/${filename}: missing local asset ${data[key]}`);
      }
    }
  }
}

if (["index.html", "config.yml"].some((file) => existsSync(join(root, "public", "admin", file)))) {
  errors.push("obsolete public admin files still exist");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Content integrity checks passed.");
}
