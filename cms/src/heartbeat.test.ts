import assert from "node:assert/strict";
import test from "node:test";
import { parseHeartbeatInterval } from "./heartbeat";

test("heartbeat interval uses a safe default and accepts valid integers", () => {
  assert.equal(parseHeartbeatInterval(undefined), 5);
  assert.equal(parseHeartbeatInterval("1"), 1);
  assert.equal(parseHeartbeatInterval("59"), 59);
});

test("heartbeat interval rejects invalid values instead of creating bad cron schedules", () => {
  for (const value of ["0", "60", "NaN", "1.5", "-2", " 5 "]) {
    assert.throws(() => parseHeartbeatInterval(value), /integer from 1 to 59/);
  }
});
