#!/usr/bin/env -S deno run -A
/**
 * Capture a marketplace screenshot for a theme demo.
 *
 * Requires Playwright: deno run -A npm:playwright install chromium
 *
 *   deno task screenshot papermod
 *   deno task screenshot papermod --url https://papermod-demo.getdune.org
 *
 * Output: packages/theme-{slug}/screenshots/screenshot.png (local reference;
 * upload to cdn.getdune.org/themes/{slug}/screenshot.png separately).
 */

import { join } from "@std/path";
import { demoDir, isDemoSlug, linkDemo, ROOT } from "./demo-common.ts";

const slug = Deno.args.find((a) => !a.startsWith("--"));
const urlArg = Deno.args.find((a) => a.startsWith("--url="))?.slice("--url=".length);

if (!slug || !isDemoSlug(slug)) {
  console.error("Usage: deno task screenshot <slug> [--url=https://…]");
  Deno.exit(1);
}

const outDir = join(ROOT, "packages", `theme-${slug}`, "screenshots");
const outPath = join(outDir, "screenshot.png");
await Deno.mkdir(outDir, { recursive: true });

let baseUrl = urlArg;
if (!baseUrl) {
  await linkDemo(slug);
  baseUrl = "http://127.0.0.1:8765";
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
    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({ path, fullPage: false });
  } finally {
    await browser.close();
  }
}
