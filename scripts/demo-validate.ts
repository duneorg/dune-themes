#!/usr/bin/env -S deno run -A
/**
 * Validate demo sites with `dune validate`.
 *
 *   deno task demo:validate papermod
 *   deno task demo:validate --all
 */

import { demoDir, DEMO_SLUGS, isDemoSlug, linkDemo } from "./demo-common.ts";

const args = Deno.args;
const slugs = args.includes("--all")
  ? [...DEMO_SLUGS]
  : args.length > 0
  ? args
  : [];

if (slugs.length === 0) {
  console.error("Usage: deno task demo:validate <slug>…  |  deno task demo:validate --all");
  Deno.exit(1);
}

let failed = 0;
for (const slug of slugs) {
  if (!isDemoSlug(slug)) {
    console.warn(`  skip ${slug} (no demo site defined yet)`);
    continue;
  }
  const dir = demoDir(slug);
  await linkDemo(slug);
  console.log(`\nValidating demos/${slug}…`);
  const cmd = new Deno.Command("deno", {
    args: ["task", "validate"],
    cwd: dir,
    stdout: "inherit",
    stderr: "inherit",
  });
  const { success, code } = await cmd.output();
  if (!success) {
    console.error(`  ✗ ${slug} (exit ${code})`);
    failed++;
  } else {
    console.log(`  ✓ ${slug}`);
  }
}

if (failed > 0) Deno.exit(1);
