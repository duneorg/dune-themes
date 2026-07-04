#!/usr/bin/env -S deno run -A
/**
 * Write mod.ts + deno.json to every theme package in the catalog.
 *
 *   deno task sync:manifests
 */

import { join } from "@std/path";
import { CATALOG } from "./catalog.ts";
import { THEME_PACKAGE_MOD_TS, themeDenoJson } from "./theme-package.ts";

const ROOT = new URL("..", import.meta.url).pathname;

let updated = 0;
for (const entry of CATALOG) {
  const dir = join(ROOT, "packages", `theme-${entry.slug}`);
  try {
    await Deno.stat(dir);
  } catch {
    console.warn(`  skip ${entry.slug} (no package directory)`);
    continue;
  }

  await Deno.writeTextFile(join(dir, "mod.ts"), THEME_PACKAGE_MOD_TS);
  await Deno.writeTextFile(
    join(dir, "deno.json"),
    themeDenoJson({ slug: entry.slug, version: entry.version }),
  );
  console.log(`  ✓ packages/theme-${entry.slug}`);
  updated++;
}

console.log(`\nSynced ${updated} theme package manifest(s).`);
