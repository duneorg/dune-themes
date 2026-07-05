/**
 * Download HTML5 UP template ZIPs and vendor CSS/fonts/images into theme packages.
 */

import { join } from "@std/path";
import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader } from "@zip-js/zip-js";

const ROOT = new URL("../..", import.meta.url).pathname;
const CACHE_DIR = join(ROOT, ".cache", "html5up-zips");
const USER_AGENT = "Mozilla/5.0 (compatible; DuneThemesGraduate/1.0; +https://getdune.org)";
const DOWNLOAD_DELAY_MS = 2500;

export interface VendoredAssets {
  main: boolean;
  noscript: boolean;
  fontawesome: boolean;
  images: boolean;
}

async function sleep(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms));
}

async function downloadZip(slug: string): Promise<Uint8Array> {
  await Deno.mkdir(CACHE_DIR, { recursive: true });
  const cachePath = join(CACHE_DIR, `${slug}.zip`);

  try {
    const cached = await Deno.readFile(cachePath);
    if (cached.length >= 4 && cached[0] === 0x50 && cached[1] === 0x4b) return cached;
  } catch {
    // fetch fresh
  }

  await sleep(DOWNLOAD_DELAY_MS);
  const res = await fetch(`https://html5up.net/${slug}/download`, {
    headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
  });
  if (!res.ok) throw new Error(`Download failed for ${slug}: HTTP ${res.status}`);
  const buf = new Uint8Array(await res.arrayBuffer());
  if (buf.length < 4 || buf[0] !== 0x50 || buf[1] !== 0x4b) {
    throw new Error(`Download for ${slug} is not a ZIP (${buf.length} bytes)`);
  }
  await Deno.writeFile(cachePath, buf);
  return buf;
}

function zipRootPrefix(names: string[]): string {
  if (names.some((n) => n.startsWith("assets/"))) return "";
  const first = names.find((n) => n.includes("/"));
  return first ? first.split("/")[0] + "/" : "";
}

async function copyZipEntries(
  slug: string,
  destDir: string,
  filter: (path: string) => boolean,
): Promise<string[]> {
  const zipBytes = await downloadZip(slug);
  const reader = new ZipReader(new Uint8ArrayReader(zipBytes));
  const entries = await reader.getEntries();
  const names = entries.map((e) => e.filename);
  const prefix = zipRootPrefix(names);
  const copied: string[] = [];

  await Deno.mkdir(destDir, { recursive: true });

  for (const entry of entries) {
    if (entry.directory) continue;
    const rel = entry.filename.startsWith(prefix)
      ? entry.filename.slice(prefix.length)
      : entry.filename;
    if (!filter(rel)) continue;
    const outPath = join(destDir, rel);
    await Deno.mkdir(join(outPath, ".."), { recursive: true });
    const data = await entry.getData(new Uint8ArrayWriter());
    await Deno.writeFile(outPath, data);
    copied.push(rel);
  }

  await reader.close();
  return copied;
}

/** Vendor assets/css, assets/webfonts, and images into static/html5up/. */
export async function vendorHtml5UpAssets(slug: string): Promise<VendoredAssets> {
  const dest = join(ROOT, "packages", `theme-${slug}`, "static", "html5up");
  const copied = await copyZipEntries(slug, dest, (rel) => {
    if (rel.startsWith("assets/css/")) return true;
    if (rel.startsWith("assets/webfonts/")) return true;
    if (rel.startsWith("images/")) return true;
    return false;
  });

  // Flatten assets/css → css/ and webfonts → webfonts/ for stable @import paths
  const cssDir = join(dest, "css");
  await Deno.mkdir(cssDir, { recursive: true });
  for (const name of ["main.css", "noscript.css", "fontawesome-all.min.css"] as const) {
    const nested = join(dest, "assets", "css", name);
    const flat = join(cssDir, name);
    try {
      await Deno.stat(nested);
      await Deno.copyFile(nested, flat);
    } catch {
      // optional file
    }
  }
  const webfontsSrc = join(dest, "assets", "webfonts");
  const webfontsDest = join(dest, "webfonts");
  try {
    await Deno.stat(webfontsSrc);
    await Deno.mkdir(webfontsDest, { recursive: true });
    for await (const entry of Deno.readDir(webfontsSrc)) {
      if (entry.isFile) {
        await Deno.copyFile(join(webfontsSrc, entry.name), join(webfontsDest, entry.name));
      }
    }
  } catch {
    // optional
  }

  return {
    main: copied.some((p) => p.endsWith("assets/css/main.css") || p === "assets/css/main.css"),
    noscript: copied.some((p) => p.endsWith("noscript.css")),
    fontawesome: copied.some((p) => p.endsWith("fontawesome-all.min.css")),
    images: copied.some((p) => p.startsWith("images/")),
  };
}
