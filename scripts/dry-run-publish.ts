#!/usr/bin/env -S deno run -A
/**
 * Run `deno publish --dry-run` for theme packages.
 *
 *   deno task dry-run:all
 *   deno run -A scripts/dry-run-publish.ts papermod ink
 */

import { join } from "@std/path";
import { CATALOG } from "./catalog.ts";

const ROOT = new URL("..", import.meta.url).pathname;

async function dryRunSlug(slug: string): Promise<boolean> {
  const dir = join(ROOT, "packages", `theme-${slug}`);
  const cmd = new Deno.Command("deno", {
    args: ["publish", "--dry-run", "--allow-dirty"],
    cwd: dir,
    stdout: "inherit",
    stderr: "inherit",
  });
  const { success, code } = await cmd.output();
  if (!success) {
    console.error(`  ✗ ${slug} (exit ${code})`);
    return false;
  }
  console.log(`  ✓ ${slug}`);
  return true;
}

const args = Deno.args;
const slugs = args.includes("--all")
  ? CATALOG.map((e) => e.slug)
  : args.length > 0
  ? args
  : [];

if (slugs.length === 0) {
  console.error("Usage: deno task dry-run:all  |  deno run -A scripts/dry-run-publish.ts <slug>…");
  Deno.exit(1);
}

let failed = 0;
for (const slug of slugs) {
  console.log(`\nDry-run: theme-${slug}`);
  if (!(await dryRunSlug(slug))) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} package(s) failed dry-run.`);
  Deno.exit(1);
}
console.log(`\nAll ${slugs.length} package(s) passed dry-run.`);
