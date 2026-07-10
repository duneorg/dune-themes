#!/usr/bin/env -S deno run -A
/**
 * Capture a marketplace screenshot for a theme demo.
 *
 * Requires Playwright: deno run -A npm:playwright install chromium
 *
 *   deno task screenshot papermod
 *   deno task screenshot papermod --url https://themes.getdune.org/papermod
 *
 * Output: packages/theme-{slug}/static/screenshot.png — ships inside the theme
 * package and is served by any site running the theme at
 * /themes/{slug}/static/screenshot.png (e.g. the demo sites on themes.getdune.org).
 */

import { join } from "@std/path";
import { demoDir, isDemoSlug, linkDemo, ROOT } from "./demo-common.ts";

const slug = Deno.args.find((a) => !a.startsWith("--"));
const urlArg = Deno.args.find((a) => a.startsWith("--url="))?.slice("--url=".length);

if (!slug || !isDemoSlug(slug)) {
  console.error("Usage: deno task screenshot <slug> [--url=https://…]");
  Deno.exit(1);
}

const outDir = join(ROOT, "packages", `theme-${slug}`, "static");
const outPath = join(outDir, "screenshot.png");
await Deno.mkdir(outDir, { recursive: true });

let baseUrl = urlArg;
if (!baseUrl) {
  await linkDemo(slug);
  // Each demo's `dev` task hardcodes its own --port in demos/{slug}/deno.json;
  // read it from there rather than assuming a shared port.
  const demoManifest = JSON.parse(await Deno.readTextFile(join(demoDir(slug), "deno.json")));
  const portMatch = (demoManifest.tasks?.dev as string | undefined)?.match(/--port (\d+)/);
  if (!portMatch) {
    console.error(`Could not find --port in demos/${slug}/deno.json dev task`);
    Deno.exit(1);
  }
  baseUrl = `http://127.0.0.1:${portMatch[1]}`;
  console.log(`Starting demo server for ${slug}…`);
  const server = new Deno.Command("deno", {
    args: ["task", "dev"],
    cwd: demoDir(slug),
    stdout: "null",
    stderr: "piped",
  }).spawn();

  try {
    await waitForServer(baseUrl);
    await capture(baseUrl, outPath);
  } finally {
    server.kill();
    await server.status.catch(() => undefined);
  }
} else {
  await capture(baseUrl, outPath);
}

console.log(`  ✓ ${outPath}`);

async function waitForServer(url: string, attempts = 40): Promise<void> {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Demo server did not respond at ${url}`);
}

async function capture(url: string, path: string): Promise<void> {
  const { chromium } = await import("npm:playwright@^1.45");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    // Not "networkidle": the dev server's live-reload connection
    // (/__dune_reload) never settles, so networkidle always times out.
    await page.goto(url, { waitUntil: "load" });
    await page.waitForTimeout(1500);
    await page.screenshot({ path, fullPage: false });
  } finally {
    await browser.close();
  }
}
