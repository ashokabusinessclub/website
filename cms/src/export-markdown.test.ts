import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { applyExport, fetchCollection, normalizeExportDocument, parsePayloadPage, resolveInside, serializeFrontmatter } from "./export-markdown";

test("export rejects traversal and unsafe response slugs", () => {
  const root = path.join(tmpdir(), "export-root");
  assert.throws(() => resolveInside(root, "..", "escape.md"), /escapes/);
  assert.throws(() => parsePayloadPage("events", { docs: [{ slug: "../escape" }], page: 1, totalPages: 1 }), /unsafe/);
  assert.throws(() => parsePayloadPage("events", { docs: [] }), /paginated/);
});

test("export fetches bounded Payload pages", async () => {
  const pages: number[] = [];
  const fetcher: typeof fetch = async (input) => {
    const page = Number(new URL(String(input)).searchParams.get("page")); pages.push(page);
    return Response.json({ docs: [{ slug: `event-${page}` }], page, totalPages: 2 });
  };
  const docs = await fetchCollection("events", fetcher, "https://cms.example/api");
  assert.deepEqual(pages, [1, 2]); assert.equal(docs.length, 2);
});

test("export preserves uploaded media relationships", () => {
  const doc = normalizeExportDocument("abr-items", {
    slug: "article", coverImage: { url: "/api/media/file/cover.jpg" },
    images: [{ image: { url: "/api/media/file/chart.png" }, alt: "Chart" }],
  }, "https://cms.example/api");
  assert.equal(doc.cover, "https://cms.example/api/media/file/cover.jpg");
  assert.match(serializeFrontmatter("abr-items", doc), /images:\n  - url: "https:\/\/cms\.example\/api\/media\/file\/chart\.png"/);
});

test("empty responses never erase committed Markdown", () => {
  const root = mkdtempSync(path.join(tmpdir(), "abc-export-"));
  const events = path.join(root, "events"); mkdirSync(events);
  const existing = path.join(events, "existing.md"); writeFileSync(existing, "existing");
  applyExport(new Map([["events", []]]), root);
  assert.equal(readFileSync(existing, "utf8"), "existing");
});
