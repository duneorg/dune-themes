#!/usr/bin/env -S deno run -A
/**
 * Create symlinks for a demo site (theme package + shared content).
 *
 *   deno task demo:link papermod
 *   deno task demo:link --all
 */

import { DEMO_SLUGS, isDemoSlug, linkDemo } from "./demo-common.ts";

const args = Deno.args;
const slugs = args.includes("--all")
  ? [...DEMO_SLUGS]
  : args.length > 0
  ? args
  : [];

if (slugs.length === 0) {
  console.error("Usage: deno task demo:link <slug>…  |  deno task demo:link --all");
  Deno.exit(1);
}

for (const slug of slugs) {
  if (!isDemoSlug(slug)) {
    console.warn(`  skip ${slug} (no demo site defined yet)`);
    continue;
  }
  await linkDemo(slug);
  console.log(`  ✓ demos/${slug} linked`);
}
