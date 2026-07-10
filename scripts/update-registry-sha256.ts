#!/usr/bin/env -S deno run -A
/**
 * Pack one theme and write sha256 into registry.json for that slug.
 *
 *   deno run -A scripts/update-registry-sha256.ts papermod
 */

import { join } from "@std/path";
import { buildRegistryJson } from "./catalog.ts";
import { ROOT } from "./demo-common.ts";

async function sha256Hex(bytes: Uint8Array<ArrayBuffer>): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function readThemeVersion(slug: string): Promise<string> {
  const yamlPath = join(ROOT, "packages", `theme-${slug}`, "theme.yaml");
  const text = await Deno.readTextFile(yamlPath);
  const m = text.match(/^version:\s*["']?([^"'\n]+)/m);
  return m?.[1]?.trim() ?? "1.0.0";
}

const slug = Deno.args[0];
if (!slug) {
  console.error("Usage: deno run -A scripts/update-registry-sha256.ts <slug>");
  Deno.exit(1);
}

const version = await readThemeVersion(slug);
const zipPath = join(ROOT, "dist", `${slug}-${version}.zip`);
let zipBytes: Uint8Array<ArrayBuffer>;
try {
  zipBytes = await Deno.readFile(zipPath);
} catch {
  console.error(`ZIP not found: ${zipPath} — run deno task pack ${slug} first`);
  Deno.exit(1);
}

const hash = await sha256Hex(zipBytes);
const registryPath = join(ROOT, "registry.json");
const registry = JSON.parse(await Deno.readTextFile(registryPath)) as ReturnType<
  typeof buildRegistryJson
>;

const entry = registry.themes.find((t: { slug: string }) => t.slug === slug);
if (!entry) {
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
