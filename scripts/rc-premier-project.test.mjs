import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

function load(relativePath) {
  const context = { exports: {} };
  const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
  runInNewContext(ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  }).outputText, context);
  return context.exports;
}

test("RC Premier is fourth, between UA LabSign and AC-CORE, with a valid cover", () => {
  const { PROJECTS, PROJECTS_PER_PAGE } = load("../src/data/projects.ts");
  assert.equal(PROJECTS[2].commandTitle, "UA LabSign");
  assert.equal(PROJECTS[3].title, "RC Premier Properties");
  assert.equal(PROJECTS[3].link, "/projects/rc-premier-properties");
  assert.equal(PROJECTS[4].commandTitle, "AC-CORE");
  assert.equal(Math.ceil(PROJECTS.length / PROJECTS_PER_PAGE), 2);
  const image = readFileSync(new URL(`../public${PROJECTS[3].image}`, import.meta.url));
  assert.equal(image.toString("ascii", 8, 12), "WEBP");
  const video = readFileSync(new URL(`../public${PROJECTS[3].video}`, import.meta.url));
  assert.equal(video.toString("ascii", 4, 8), "ftyp");
  assert.ok(video.length < 5_000_000, "Use the compressed preview, not the source recording");
});

test("RC Premier queries select its verified knowledge and live-only links", () => {
  const { buildDynamicPrompt } = load("../src/lib/ai-config.ts");
  for (const query of ["RC Premier", "rcpremier", "Tell me about Premier Properties"]) {
    const prompt = buildDynamicPrompt(query);
    assert.match(prompt, /RC Premier Properties is a real estate business/);
    assert.match(prompt, /Ian designed and developed both the frontend and backend/);
    assert.match(prompt, /Auth0 for staff sign-in/);
    assert.match(prompt, /requested viewing requires staff confirmation/);
    assert.match(prompt, /https:\/\/rcpremierph\.com\//);
    assert.doesNotMatch(prompt, /github\.com\/[^\s]*RC-Premier/i);
  }
});
