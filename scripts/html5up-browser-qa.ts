#!/usr/bin/env -S deno run -A
/**
 * Light-only desktop+mobile click-through for HTML5 UP demos.
 *
 *   deno run -A scripts/html5up-browser-qa.ts
 *   deno run -A scripts/html5up-browser-qa.ts --base=https://themes.getdune.org
 *   deno run -A scripts/html5up-browser-qa.ts --slugs=striped,forty,photon
 *   deno run -A scripts/html5up-browser-qa.ts --screenshot
 *
 * Against --base, paths are /{slug}/… . Without --base, each demo is started
 * locally from demos/{slug} (slow). Failures exit non-zero.
 */

import { join } from "@std/path";
import { HTML5UP_TEMPLATES } from "./html5up-defs.ts";
import { demoDir, linkDemo, ROOT } from "./demo-common.ts";

const args = Deno.args;
const baseArg = args.find((a) => a.startsWith("--base="))?.slice("--base=".length);
const slugArg = args.find((a) => a.startsWith("--slugs="))?.slice("--slugs=".length);
const doScreenshot = args.includes("--screenshot");
const slugs = slugArg
  ? slugArg.split(",").map((s) => s.trim()).filter(Boolean)
  : HTML5UP_TEMPLATES.map((t) => t.slug);

const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
] as const;

type Result = { slug: string; ok: boolean; notes: string[] };

async function waitForServer(url: string, attempts = 60): Promise<void> {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404) return;
    } catch { /* retry */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Server did not respond at ${url}`);
}

async function withLocalDemo<T>(
  slug: string,
  fn: (origin: string) => Promise<T>,
): Promise<T> {
  await linkDemo(slug);
  const demoManifest = JSON.parse(
    await Deno.readTextFile(join(demoDir(slug), "deno.json")),
  );
  const portMatch = (demoManifest.tasks?.dev as string | undefined)?.match(
    /--port (\d+)/,
  );
  if (!portMatch) throw new Error(`No --port in demos/${slug}/deno.json`);
  const origin = `http://127.0.0.1:${portMatch[1]}`;
  const server = new Deno.Command("deno", {
    args: ["task", "dev"],
    cwd: demoDir(slug),
    stdout: "null",
    stderr: "piped",
  }).spawn();
  try {
    await waitForServer(origin);
    return await fn(origin);
  } finally {
    server.kill();
    await server.status.catch(() => undefined);
  }
}

async function clickThrough(
  page: import("npm:playwright@^1.45").Page,
  origin: string,
  slug: string,
  prefix: string,
  notes: string[],
): Promise<void> {
  const home = `${origin}${prefix}/`;
  const resHome = await page.goto(home, { waitUntil: "domcontentloaded", timeout: 30000 });
  if (!resHome || resHome.status() >= 500) {
    throw new Error(`home HTTP ${resHome?.status()}`);
  }
  notes.push(`home ${resHome.status()}`);

  // Prefer in-page blog link; fall back to /blog/
  const blogHref = await page.evaluate(() => {
    const a = [...document.querySelectorAll("a")].find((el) => {
      const h = el.getAttribute("href") ?? "";
      return /\/blog\/?$/.test(h) || h.endsWith("/blog");
    });
    return a?.getAttribute("href") ?? null;
  });
  const blogUrl = blogHref
    ? (blogHref.startsWith("http") ? blogHref : new URL(blogHref, origin).href)
    : `${origin}${prefix}/blog/`;
  const resBlog = await page.goto(blogUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  if (!resBlog || resBlog.status() >= 500) throw new Error(`blog HTTP ${resBlog?.status()}`);
  notes.push(`blog ${resBlog.status()}`);

  // Leaf post
  const postHref = await page.evaluate(() => {
    const a = [...document.querySelectorAll("a")].find((el) => {
      const h = el.getAttribute("href") ?? "";
      return /\/blog\/.+/.test(h) && !h.includes("#");
    });
    return a?.getAttribute("href") ?? null;
  });
  if (postHref) {
    const postUrl = postHref.startsWith("http")
      ? postHref
      : new URL(postHref, origin).href;
    const resPost = await page.goto(postUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    if (!resPost || resPost.status() >= 500) {
      throw new Error(`post HTTP ${resPost?.status()}`);
    }
    notes.push(`post ${resPost.status()}`);
  } else {
    notes.push("post skipped (no link)");
  }

  // Search with query
  const searchUrl = `${origin}${prefix}/search/?q=${encodeURIComponent(slug)}`;
  const resSearch = await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  if (!resSearch || resSearch.status() >= 500) {
    throw new Error(`search HTTP ${resSearch?.status()}`);
  }
  notes.push(`search ${resSearch.status()}`);

  // 404
  const res404 = await page.goto(`${origin}${prefix}/this-page-should-404-${slug}/`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  const code404 = res404?.status() ?? 0;
  if (code404 !== 404 && code404 !== 200) {
    // Some stacks render themed 404 with 200; accept themed body
    notes.push(`404 status ${code404}`);
  } else {
    notes.push(`404 ${code404}`);
  }

  // Menu / titleBar toggles when present
  await page.goto(home, { waitUntil: "domcontentloaded", timeout: 30000 });
  const toggled = await page.evaluate(() => {
    const candidates = [
      'a[href="#menu"]',
      "#titleBar a.Toggle",
      "#titleBar .toggle",
      "a.toggle",
      "#header nav > a",
    ];
    for (const sel of candidates) {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) {
        el.click();
        return sel;
      }
    }
    return null;
  });
  notes.push(toggled ? `toggle ${toggled}` : "toggle none");
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

async function runSlug(
  browser: import("npm:playwright@^1.45").Browser,
  slug: string,
): Promise<Result> {
  const notes: string[] = [];
  try {
    const run = async (origin: string, prefix: string) => {
      for (const vp of viewports) {
        const page = await browser.newPage({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: "light",
        });
        try {
          await clickThrough(page, origin, slug, prefix, notes);
          if (doScreenshot && vp.name === "desktop") {
            const out = join(
              ROOT,
              "packages",
              `theme-${slug}`,
              "static",
              "screenshot.png",
            );
            await Deno.mkdir(join(ROOT, "packages", `theme-${slug}`, "static"), {
              recursive: true,
            });
            await page.goto(`${origin}${prefix}/`, {
              waitUntil: "load",
              timeout: 45000,
            });
            await page.waitForTimeout(400);
            await page.screenshot({ path: out, fullPage: false });
            notes.push(`screenshot ${out}`);
          }
        } finally {
          await page.close();
        }
        notes.push(`${vp.name} ok`);
      }
    };

    if (baseArg) {
      const origin = baseArg.replace(/\/$/, "");
      await run(origin, `/${slug}`);
    } else {
      await withLocalDemo(slug, async (origin) => {
        await run(origin, "");
      });
    }
    return { slug, ok: true, notes };
  } catch (err) {
    notes.push(String(err));
    return { slug, ok: false, notes };
  }
}

const browser = await launchBrowser();
const results: Result[] = [];
const concurrency = Number(Deno.env.get("QA_CONCURRENCY") ?? (baseArg ? "3" : "1"));
try {
  for (let i = 0; i < slugs.length; i += concurrency) {
    const batch = slugs.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(async (slug) => {
      console.log(`→ ${slug}`);
      const r = await runSlug(browser, slug);
      console.log(`  ${r.ok ? "✓" : "✗"} ${r.notes.join("; ")}`);
      return r;
    }));
    results.push(...batchResults);
  }
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) {
  console.error("Failed:", failed.map((f) => f.slug).join(", "));
  Deno.exit(1);
}
