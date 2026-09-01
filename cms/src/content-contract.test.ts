import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import test from "node:test";
import { NIBBL_MENU_CATEGORY_OPTIONS } from "./collections/NibblMenu";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.resolve(dirname, "../../frontend/content");

test("nibbl markdown categories are accepted by the CMS schema", () => {
  const allowedCategories = new Set(
    NIBBL_MENU_CATEGORY_OPTIONS.map((option) => option.value),
  );
  const nibblDir = path.join(contentRoot, "nibbl-menu");
  const files = readdirSync(nibblDir).filter((file) => file.endsWith(".md"));

  for (const file of files) {
    const raw = readFileSync(path.join(nibblDir, file), "utf8");
    const { data } = matter(raw);
    assert.equal(
      allowedCategories.has(String(data.category)),
      true,
      `${file} uses unsupported category ${String(data.category)}`,
    );
  }
});
