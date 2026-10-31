import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/lib/keyboard-shortcuts.ts", import.meta.url), "utf8");
class Element {
  constructor(editable = false, parent = null) { this.editable = editable; this.parent = parent; }
  closest() { return this.editable ? this : this.parent?.closest() ?? null; }
}
const context = { exports: {}, Element };
runInNewContext(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, context);
const { ignoreSingleKey, searchShortcut } = context.exports;

test("search shortcut labels match the platform", () => {
  for (const platform of ["MacIntel", "Macintosh", "iPad"]) assert.equal(searchShortcut(platform), "⌘ K");
  for (const platform of ["Win32", "Linux x86_64", ""]) assert.equal(searchShortcut(platform), "Ctrl K");
});

test("single keys ignore modifiers, composition, repeats, and already handled events", () => {
  for (const property of ["ctrlKey", "metaKey", "altKey", "isComposing", "repeat", "defaultPrevented"]) {
    assert.equal(ignoreSingleKey({ [property]: true, target: new Element() }), true, property);
  }
  assert.equal(ignoreSingleKey({ target: new Element() }), false);
});

test("editable controls and their descendants suppress single-key actions", () => {
  assert.equal(ignoreSingleKey({ target: new Element(true) }), true);
  assert.equal(ignoreSingleKey({ target: new Element(false, new Element(true)) }), true);
});
