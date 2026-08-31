import assert from "node:assert/strict";
import test from "node:test";
import { shouldPushSchema } from "./payload.config";

test("database schema push is disabled unless explicitly enabled outside production", () => {
  assert.equal(shouldPushSchema("production", "true"), false);
  assert.equal(shouldPushSchema("development", undefined), false);
  assert.equal(shouldPushSchema("development", "false"), false);
  assert.equal(shouldPushSchema("development", "true"), true);
});
