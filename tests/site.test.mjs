import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);
const pages = ["", "design-review/", "concepts/editorial-concierge/", "concepts/doorstep-journey/", "concepts/modern-heritage/"];

for (const page of pages) {
  test(`exported page /${page} has local assets and working destinations`, async () => {
    const html = await readFile(new URL(page + "index.html", output), "utf8");
    assert.match(html, /Seren/);
    for (const match of html.matchAll(/<img[^>]+\bsrc="([^"]+)"/g)) {
      assert.ok(match[1].startsWith("/assets/"));
      await access(new URL(match[1].slice(1), output));
    }
    for (const match of html.matchAll(/<a\b[^>]*\bhref="(#[a-z][a-z-]*)"/g)) {
      assert.ok(html.includes(`id="${match[1].slice(1)}"`), match[1]);
    }
    if (page === "design-review/") {
      for (const route of pages.slice(2)) assert.ok(html.includes(route.replace(/\/$/, "")));
      assert.match(html, /11<\/strong><span>review assets/);
    } else {
      assert.match(html, /Choose your service/);
      assert.match(html, /Illustrative service menu/);
      assert.ok(html.includes("/design-review/"));
    }
  });
}
