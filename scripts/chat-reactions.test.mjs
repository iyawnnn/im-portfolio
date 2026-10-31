import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../src/components/layout/chat-reactions.tsx", import.meta.url), "utf8");
const helpers = source.slice(source.indexOf("const REACTIONS"), source.indexOf("export function ChatReactions"));
const compiled = ts.transpileModule(helpers, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;

function read(value, blocked = false) {
  const context = { exports: {}, localStorage: {
    getItem() {
      if (blocked) throw new Error("Storage disabled");
      return value;
    },
  } };
  runInNewContext(compiled, context);
  return JSON.parse(JSON.stringify(context.exports.readReactions()));
}

test("only supported native reactions survive storage validation", () => {
  const valid = { a: "❤️", b: "👍", c: "👎", d: "😂", e: "‼️", f: "❓" };
  assert.deepEqual(read(JSON.stringify({ ...valid, bad: "🔥", invalid: {}, empty: null })), valid);
});

test("missing, malformed, and unavailable storage yield no reactions", () => {
  for (const value of [null, "null", "[]", "false", "42", '"hello"', "{broken"]) {
    assert.deepEqual(read(value), {});
  }
  assert.deepEqual(read(null, true), {});
});

const parsed = ts.createSourceFile("chat-reactions.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const component = parsed.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "ChatReactions");
const gestureEffect = component.body.statements.find((node) => ts.isExpressionStatement(node) &&
  ts.isCallExpression(node.expression) && node.expression.expression.getText(parsed) === "useEffect");
const installGesture = ts.transpileModule(`(${gestureEffect.expression.arguments[0].getText(parsed)})();`, {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;

function gesture() {
  class Target {
    listeners = new Map();
    interactive = false;
    closest() { return this.interactive ? this : null; }
    addEventListener(name, listener) { this.listeners.set(name, listener); }
    removeEventListener(name) { this.listeners.delete(name); }
    emit(name, event = {}) {
      this.listeners.get(name)?.({ target: this, pointerType: "touch", isPrimary: true,
        pointerId: 1, clientX: 20, clientY: 20, ...event });
    }
  }
  const bubble = new Target(), document = new Target(), timers = new Map();
  let now = 0, nextTimer = 0, opened = 0;
  const cleanup = runInNewContext(installGesture, {
    bubble, document, Element: Target, open: false, touchMode: false,
    window: { getSelection: () => ({ toString: () => "", removeAllRanges() {} }) },
    openFromHold() { opened++; },
    setTimeout(callback, delay) { timers.set(++nextTimer, { callback, at: now + delay }); return nextTimer; },
    clearTimeout(id) { timers.delete(id); },
  });
  return { bubble, document, Target, cleanup, opened: () => opened,
    advance(ms) {
      now += ms;
      for (const [id, timer] of timers) if (timer.at <= now) {
        timers.delete(id);
        timer.callback();
      }
    },
  };
}

test("touch hold opens at 425ms and allows small finger movement", () => {
  const g = gesture();
  g.bubble.emit("pointerdown");
  g.document.emit("pointermove", { clientX: 25, clientY: 25 });
  g.advance(424);
  assert.equal(g.opened(), 0);
  g.advance(1);
  assert.equal(g.opened(), 1);
  g.cleanup();
});

test("release, cancellation, scrolling, movement and unmount cancel pending holds", () => {
  for (const action of ["pointerup", "pointercancel", "scroll", "move", "unmount"]) {
    const g = gesture();
    g.bubble.emit("pointerdown");
    g.advance(100);
    if (action === "move") g.document.emit("pointermove", { clientX: 31 });
    else if (action === "unmount") g.cleanup();
    else g.document.emit(action);
    g.advance(500);
    assert.equal(g.opened(), 0, action);
    g.cleanup();
  }
});

test("mouse presses and interactive markdown descendants keep their native behavior", () => {
  const mouse = gesture();
  mouse.bubble.emit("pointerdown", { pointerType: "mouse" });
  mouse.advance(500);
  assert.equal(mouse.opened(), 0);
  const interactive = gesture(), link = new interactive.Target();
  link.interactive = true;
  interactive.bubble.emit("pointerdown", { target: link });
  interactive.advance(500);
  assert.equal(interactive.opened(), 0);
  mouse.cleanup();
  interactive.cleanup();
});
