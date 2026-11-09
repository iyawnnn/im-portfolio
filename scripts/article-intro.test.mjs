import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { compileMDX } from "next-mdx-remote/rsc";

const source = readFileSync(new URL("../src/app/blog/[slug]/page.tsx", import.meta.url), "utf8");
const plugin = source.slice(source.indexOf("function remarkArticleIntro"), source.indexOf("export async function generateStaticParams"));
const context = {};
runInNewContext(ts.transpileModule(plugin, {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText, context);

async function render(source) {
  const { content } = await compileMDX({
    source,
    components: { ArticleIntro: ({ children }) => React.createElement("div", { "data-intro": "true" }, children) },
    options: { mdxOptions: { remarkPlugins: [context.remarkArticleIntro] } },
  });
  return renderToStaticMarkup(content);
}

test("only the opening logical group is wrapped; links, images and code keep their MDX rendering", async () => {
  const html = await render('Opening [reference][site].\n\n![Cover](/cover.webp)\n\n```ts\nconst text = "### not a heading";\n```\n\n### Next section\n\nLater content.\n\n[site]: https://example.com');
  assert.match(html, /<div data-intro="true">/);
  assert.match(html, /href="https:\/\/example.com"/);
  assert.match(html, /src="\/cover.webp"/);
  assert.match(html, /class="language-ts"/);
  assert.match(html, /<\/div>\s*<h3>Next section<\/h3>/);
  assert.match(html, /<p>Later content\.<\/p>/);
  assert.equal((html.match(/data-intro/g) || []).length, 1);
});

test("an article beginning with a heading keeps its original structure", async () => {
  const html = await render("### First section\n\nBody.");
  assert.doesNotMatch(html, /data-intro/);
  assert.match(html, /<h3>First section<\/h3>/);
});
