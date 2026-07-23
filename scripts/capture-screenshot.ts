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
 *
 * For README-as-home themes (caravan, book, starlight, lucid, manual) the
 * homepage embeds this same screenshot — a single capture would either show
 * a broken image or never bootstrap. Those themes get a two-pass capture:
 * hide the embed, write the file, then re-capture so the home image is real.
 */

import { join } from "@std/path";
import { demoDir, isDemoSlug, isReadmeAsHome, linkDemo, ROOT } from "./demo-common.ts";

const slug = Deno.args.find((a) => !a.startsWith("--"));
const urlArg = Deno.args.find((a) => a.startsWith("--url="))?.slice("--url=".length);

if (!slug || !isDemoSlug(slug)) {
  console.error("Usage: deno task screenshot <slug> [--url=https://…]");
  Deno.exit(1);
}

const outDir = join(ROOT, "packages", `theme-${slug}`, "static");
const outPath = join(outDir, "screenshot.png");
await Deno.mkdir(outDir, { recursive: true });

const twoPass = isReadmeAsHome(slug);

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
    await capture(baseUrl, outPath, { twoPass, slug });
  } finally {
    server.kill();
    await server.status.catch(() => undefined);
  }
} else {
  await capture(baseUrl, outPath, { twoPass, slug });
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

async function launchBrowser() {
  const { chromium } = await import("npm:playwright@^1.45");
  const candidates = [
    Deno.env.get("PW_EXE"),
    `${Deno.env.get("HOME")}/Library/Caches/ms-playwright/chromium-1232/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
    `${Deno.env.get("HOME")}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean) as string[];
  for (const executablePath of candidates) {
    try {
      await Deno.stat(executablePath);
      return await chromium.launch({ executablePath, headless: true });
    } catch {
      /* try next */
    }
  }
  return await chromium.launch({ headless: true });
}

async function capture(
  url: string,
  path: string,
  opts: { twoPass: boolean; slug: string },
): Promise<void> {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    // Not "networkidle": the dev server's live-reload connection
    // (/__dune_reload) never settles, so networkidle always times out.
    await page.goto(url, { waitUntil: "load" });
    await page.waitForTimeout(1500);

    if (opts.twoPass) {
      // Pass 1: hide the self-referential README screenshot so we don't
      // bake a broken/missing image (or an infinitely nested prior shot)
      // into the bootstrap file.
      await page.addStyleTag({
        content: `img[src*="screenshot.png"]{visibility:hidden!important}`,
      });
      await page.screenshot({ path, fullPage: false });
      console.log(`  · pass 1 (embed hidden) → ${path}`);

      // Pass 2: reload so the freshly written local asset paints in the
      // README hero image, then capture the real marketplace frame.
      await page.goto(url, { waitUntil: "load" });
      const localShot = `/themes/${opts.slug}/static/screenshot.png`;
      await page.waitForFunction(
        (src) => {
          const img = document.querySelector(`img[src*="screenshot.png"]`) as HTMLImageElement | null;
          return img && img.complete && img.naturalWidth > 0 && img.src.includes(src);
        },
        localShot,
        { timeout: 8000 },
      ).catch(() => {
        /* image may still be remote when --url points at production */
      });
      await page.waitForTimeout(500);
      await page.screenshot({ path, fullPage: false });
      console.log(`  · pass 2 (embed visible) → ${path}`);
      return;
    }

    await page.screenshot({ path, fullPage: false });
  } finally {
    await browser.close();
  }
}
