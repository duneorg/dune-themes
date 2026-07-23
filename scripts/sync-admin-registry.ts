#!/usr/bin/env -S deno run -A
/**
 * Copy registry.json into plugin-admin's bundled marketplace registry
 * (src/admin/registry/themes.json). plugin-admin's Marketplace island and
 * install endpoint consume a subset of the registry v2 fields, so this is a
 * verbatim copy.
 *
 *   deno task sync:admin-registry
 *
 * Does NOT commit the plugin-admin repo — commit/publish is left to the operator.
 */

import { join } from "@std/path";
import { ROOT } from "./demo-common.ts";

const PLUGIN_ADMIN_ROOT = Deno.env.get("PLUGIN_ADMIN_ROOT") ?? "/Users/xrs/claude/plugin-admin";
const dest = join(PLUGIN_ADMIN_ROOT, "src", "admin", "registry", "themes.json");

try {
  await Deno.stat(join(PLUGIN_ADMIN_ROOT, "src", "admin", "registry"));
} catch {
  console.error(`plugin-admin registry dir not found under ${PLUGIN_ADMIN_ROOT} (set PLUGIN_ADMIN_ROOT to override)`);
  Deno.exit(1);
}

const raw = await Deno.readTextFile(join(ROOT, "registry.json"));
const registry = JSON.parse(raw) as { version: number; themes: { slug: string }[] };
await Deno.writeTextFile(dest, raw.endsWith("\n") ? raw : raw + "\n");

console.log(`✓ Synced ${registry.themes.length} themes (registry v${registry.version}) → ${dest}`);
const missingSha = (registry.themes as { slug: string; sha256?: string }[])
  .filter((t) => !t.sha256).length;
if (missingSha > 0) {
  console.warn(`⚠ ${missingSha} entries have no sha256 (ZIP installs for them are unverified until released)`);
}
console.log(`Next: commit plugin-admin and publish it:\n  cd ${PLUGIN_ADMIN_ROOT} && git add src/admin/registry/themes.json && git commit -m "chore: sync marketplace theme registry"`);
