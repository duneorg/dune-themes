#!/usr/bin/env -S deno run -A
/**
 * Pack a theme directory into {slug}-{version}.zip for legacy marketplace installs.
 *
 *   deno task pack ink
 *   deno task pack:all
 */

import { join, relative } from "@std/path";
import { CATALOG, packageDir } from "./catalog.ts";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");

async function sha256Hex(bytes: Uint8Array<ArrayBuffer>): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function readThemeVersion(slug: string): Promise<string> {
  const yamlPath = join(ROOT, packageDir(slug), "theme.yaml");
  const text = await Deno.readTextFile(yamlPath);
  const m = text.match(/^version:\s*["']?([^"'\n]+)/m);
  return m?.[1]?.trim() ?? "1.0.0";
}

async function collectFiles(dir: string, base = dir): Promise<{ path: string; bytes: Uint8Array }[]> {
  const out: { path: string; bytes: Uint8Array }[] = [];
  for await (const entry of Deno.readDir(dir)) {
    const abs = join(dir, entry.name);
    if (entry.name.startsWith(".")) continue;
    if (entry.isDirectory) {
      out.push(...await collectFiles(abs, base));
    } else if (entry.isFile) {
      const rel = relative(base, abs);
      if (rel === "deno.json" || rel === "mod.ts") continue; // JSR-only; not needed in ZIP extract target
      out.push({ path: rel, bytes: await Deno.readFile(abs) });
    }
  }
  return out;
}

async function packSlug(slug: string): Promise<void> {
  const themeDir = join(ROOT, packageDir(slug));
  try {
    await Deno.stat(themeDir);
  } catch {
    console.error(`Theme not found: ${packageDir(slug)}`);
    Deno.exit(1);
  }

  const version = await readThemeVersion(slug);
  const files = await collectFiles(themeDir);
  const { ZipWriter, Uint8ArrayWriter, Uint8ArrayReader } = await import("@zip-js/zip-js");
  const writer = new Uint8ArrayWriter();
  const zip = new ZipWriter(writer);

  for (const f of files) {
    await zip.add(f.path, new Uint8ArrayReader(f.bytes));
  }
  await zip.close();
  const zipBytes = await writer.getData();

  await Deno.mkdir(DIST, { recursive: true });
  const outPath = join(DIST, `${slug}-${version}.zip`);
  await Deno.writeFile(outPath, zipBytes);
  const hash = await sha256Hex(zipBytes);
  console.log(`  ✓ ${outPath}  (${files.length} files, sha256=${hash.slice(0, 16)}…)`);
}

const packable = CATALOG.filter((e) => e.tier !== "base");

const args = Deno.args;
if (args.includes("--all")) {
  console.log("Packing all catalog themes…\n");
  for (const entry of packable) {
    const themeDir = join(ROOT, packageDir(entry.slug));
    try {
      await Deno.stat(themeDir);
    } catch {
      console.warn(`  skip ${entry.slug} (no package at ${packageDir(entry.slug)})`);
      continue;
    }
    await packSlug(entry.slug);
  }
} else if (args[0]) {
  await packSlug(args[0]);
} else {
  console.error("Usage: deno task pack <slug>  |  deno task pack:all");
  Deno.exit(1);
}
