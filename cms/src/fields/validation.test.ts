import assert from "node:assert/strict";
import test from "node:test";
import {
  isSafeSlug,
  validateHttpsUrl,
  validateImageReference,
  validateSlug,
} from "./validation";

test("slug validation accepts only canonical kebab-case slugs", () => {
  assert.equal(isSafeSlug("annual-summit-2026"), true);
  for (const value of ["../escape", "Uppercase", "two--hyphens", "has space", ""]) {
    assert.equal(isSafeSlug(value), false);
    assert.equal(typeof validateSlug(value), "string");
  }
});

test("URL validation rejects executable and insecure schemes", () => {
  assert.equal(validateHttpsUrl("https://example.com/apply"), true);
  assert.equal(typeof validateHttpsUrl("http://example.com"), "string");
  assert.equal(typeof validateHttpsUrl("javascript:alert(1)"), "string");
  assert.equal(validateImageReference("/uploads/logo.svg"), true);
  assert.equal(validateImageReference("https://cdn.example.com/logo.svg"), true);
  assert.equal(typeof validateImageReference("//evil.example/logo.svg"), "string");
});
