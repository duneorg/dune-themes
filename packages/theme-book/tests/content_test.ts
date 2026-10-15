import { assertEquals } from "jsr:@std/assert@^1";
import { buildToc, extractHeadings, headingText } from "../utils/content.ts";

Deno.test("headingText: strips ordinary inline tags", () => {
  assertEquals(headingText("Hello <em>big</em> <code>world</code>"), "Hello big world");
});

Deno.test("headingText: an unclosed '<' is escaped, not left as a live tag opener", () => {
  assertEquals(
    headingText("x <img src=x onerror=alert(1);//"),
    "x &lt;img src=x onerror=alert(1);//",
  );
  assertEquals(headingText("a > b"), "a &gt; b");
});

Deno.test("headingText: keeps existing entities untouched (no double-encoding)", () => {
  assertEquals(headingText("Tom &amp; Jerry &lt;3"), "Tom &amp; Jerry &lt;3");
});

Deno.test("headingText: nested-looking input stays inert", () => {
  assertEquals(/<[a-z\/]/i.test(headingText("<<b>script>alert(1)<<b>/script>")), false);
});

Deno.test("buildToc: a heading with an unclosed '<' yields no live markup in the TOC html", () => {
  const html = '<h2 id="x">x <img src=x onerror=alert(1);//</h2><h3 id="y">Plain</h3>';
  const toc = buildToc(extractHeadings(html));
  assertEquals(toc.includes("<img"), false);
  assertEquals(toc.includes('<a href="#y">Plain</a>'), true);
});
