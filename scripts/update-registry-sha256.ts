#!/usr/bin/env -S deno run -A
/**
 * Write sha256 into registry.json for one theme slug.
 *
 *   deno run -A scripts/update-registry-sha256.ts papermod <sha256>
 *
 * The hash must be passed in, not computed locally — zip archives embed
 * timestamps, so two independent packing runs of identical source (a local
 * `deno task pack` vs. release-zip.yml's own re-pack, or two concurrent CI
 * runs) produce different bytes and different hashes even though the theme
 * content is identical. The only value that can't disagree with what a user
 * actually downloads is the digest GitHub itself computed for the asset
 * attached to the release — pull that with:
 *   gh release view {slug}-v{version} --json assets --jq '.assets[0].digest'
 * (strip the "sha256:" prefix) and pass it as the second argument. See
 * release-zip.yml for the full sequence — it uploads the release first, then
 * calls this script with the digest read back from that upload.
 */

import { join } from "@std/path";
import { buildRegistryJson, CATALOG } from "./catalog.ts";
import { ROOT } from "./demo-common.ts";

const slug = Deno.args[0];
const hash = Deno.args[1];
if (!slug || !hash) {
  console.error("Usage: deno run -A scripts/update-registry-sha256.ts <slug> <sha256>");
  console.error("  <sha256> — read from the uploaded release asset's digest, not computed locally.");
  Deno.exit(1);
}
if (!/^[0-9a-f]{64}$/i.test(hash)) {
  console.error(`<sha256> doesn't look like a hex sha256 digest: "${hash}"`);
  Deno.exit(1);
}
const registryPath = join(ROOT, "registry.json");
const registry = JSON.parse(await Deno.readTextFile(registryPath)) as ReturnType<
  typeof buildRegistryJson
>;

const entry = registry.themes.find((t: { slug: string }) => t.slug === slug);
if (!entry) {
  // Themes marked unlisted are deliberately excluded from the marketplace
  // registry (buildRegistryJson filters on this flag), so having no entry
  // here isn't an error — tier alone (e.g. "base") no longer implies that.
  const catalogEntry = CATALOG.find((e) => e.slug === slug);
  if (catalogEntry?.unlisted) {
    console.log(`  ⏭  "${slug}" is unlisted — skipping registry.json`);
    Deno.exit(0);
  }
  console.error(`Slug "${slug}" not in registry.json`);
  Deno.exit(1);
}

// Refresh the whole entry from catalog.ts (not just sha256) so fields like
// compatibleWith/tags/description don't drift stale between releases —
// only the per-release fields (sha256, downloads) survive the refresh.
const fresh = buildRegistryJson().themes.find((t) => t.slug === slug);
if (!fresh) {
  console.error(`Slug "${slug}" not in catalog.ts`);
  Deno.exit(1);
}
const downloads = entry.downloads;
Object.assign(entry, fresh, { sha256: hash, downloads });
registry.updatedAt = new Date().toISOString().slice(0, 10);
await Deno.writeTextFile(registryPath, JSON.stringify(registry, null, 2) + "\n");
console.log(`  ✓ registry.json sha256 for ${slug}: ${hash.slice(0, 16)}…`);
