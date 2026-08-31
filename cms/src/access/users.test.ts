import assert from "node:assert/strict";
import test from "node:test";
import type { PayloadRequest } from "payload";
import { adminOnly, adminOnlyField, adminOrSelf } from "./users";

function req(user: unknown): PayloadRequest {
  return { user } as PayloadRequest;
}

test("anonymous users cannot access accounts", async () => {
  assert.equal(await adminOnly({ req: req(null) }), false);
  assert.equal(await adminOrSelf({ req: req(null) }), false);
  assert.equal(await adminOnlyField({ req: req(null) }), false);
});

test("editors are restricted to their own account", async () => {
  const editorRequest = req({ collection: "users", id: 42, role: "editor" });

  assert.deepEqual(await adminOrSelf({ req: editorRequest }), {
    id: { equals: 42 },
  });
  assert.equal(await adminOnly({ req: editorRequest }), false);
  assert.equal(await adminOnlyField({ req: editorRequest }), false);
});

test("administrators have full account and role access", async () => {
  const adminRequest = req({ collection: "users", id: 1, role: "admin" });

  assert.equal(await adminOrSelf({ req: adminRequest }), true);
  assert.equal(await adminOnly({ req: adminRequest }), true);
  assert.equal(await adminOnlyField({ req: adminRequest }), true);
});

test("unknown authenticated identities are denied by default", async () => {
  const unknownRequest = req({ collection: "other", id: 7, role: "admin" });

  assert.equal(await adminOrSelf({ req: unknownRequest }), false);
  assert.equal(await adminOnly({ req: unknownRequest }), false);
  assert.equal(await adminOnlyField({ req: unknownRequest }), false);
});
