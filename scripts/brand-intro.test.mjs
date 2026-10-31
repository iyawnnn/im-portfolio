import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";

const layout = readFileSync(new URL("../src/app/layout.tsx", import.meta.url), "utf8");
const script = layout.match(/const brandIntroScript = `([\s\S]*?)`;/)[1];

function enter(pathname, { seen = false, reduced = false, storageBlocked = false, development = false, search = "" } = {}) {
  let active = false;
  let complete;
  runInNewContext(script.replace('${process.env.NODE_ENV === "development"}', String(development)), {
    location: { pathname, search },
    URLSearchParams,
    sessionStorage: {
      getItem() { if (storageBlocked) throw new Error("Storage disabled"); return seen ? "1" : null; },
      setItem() { seen = true; },
    },
    matchMedia: () => ({ matches: reduced }),
    document: { documentElement: {
      setAttribute() { active = true; },
      removeAttribute() { active = false; },
    }, addEventListener() {}, dispatchEvent() {} },
    Event: class {},
    clearTimeout() {},
    setTimeout(callback, delay) { assert.equal(delay, 2300); complete = callback; },
  });
  return { active: () => active, seen: () => seen, complete: () => complete?.() };
}

test("fresh homepage entry plays, completes, and skips on the next entry", () => {
  const first = enter("/");
  assert.equal(first.active(), true);
  assert.equal(first.seen(), false);
  first.complete();
  assert.equal(first.active(), false);
  assert.equal(enter("/", { seen: first.seen() }).active(), false);
});

test("direct non-home entry also suppresses a later homepage entry", () => {
  for (const path of ["/projects", "/resume", "/about", "/stack", "/blog", "/contact"]) {
    const first = enter(path);
    assert.equal(first.active(), false);
    assert.equal(enter("/", { seen: first.seen() }).active(), false);
  }
});

test("reduced motion and unavailable storage leave the page visible", () => {
  assert.equal(enter("/", { reduced: true }).active(), false);
  assert.equal(enter("/", { storageBlocked: true }).active(), false);
});

test("replay is restricted to development homepage entries and respects reduced motion", () => {
  const replay = { seen: true, search: "?intro=1" };
  assert.equal(enter("/", replay).active(), false);
  assert.equal(enter("/", { ...replay, development: true }).active(), true);
  assert.equal(enter("/projects", { ...replay, development: true }).active(), false);
  assert.equal(enter("/", { ...replay, development: true, reduced: true }).active(), false);
});
