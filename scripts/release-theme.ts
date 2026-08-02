#!/usr/bin/env -S deno run -A
/**
 * Release one theme: git tag {slug}-v{version} → push. That's it.
 *
 *   deno task release caravan
 *   deno task release caravan --dry-run   # print actions, change nothing remote
 *
 * Idempotent: if the tag already exists it stops instead of re-pushing.
 *
 * Deliberately does NOT pack a ZIP, write registry.json, or create the
 * GitHub release itself — pushing the tag fires
 * .github/workflows/release-zip.yml, which does all three. Previously this
 * script did its own local pack+release+registry-write *and* pushed the
 * tag (which triggers that same CI job) — two independent packers racing
 * for the same release, and since zip archives aren't byte-reproducible
 * across separate packing runs, the two could (and did) disagree on the
 * sha256, with whichever finished last silently overwriting the other's
 * release asset. Now there is exactly one packer: CI.
 *
 * This is step 1 of 2 — CI does not publish to JSR. After CI's run
 * completes, redeploy the demo, verify it live, then trigger step 2 by
 * hand: gh workflow run publish-jsr.yml -f tag={slug}-v{version}
 */

import { join } from "@std/path";
import { packageDir } from "./catalog.ts";
import { ROOT } from "./demo-common.ts";

const args = [...Deno.args];
const dryRun = args.includes("--dry-run");
const slug = args.filter((a) => !a.startsWith("--"))[0];
if (!slug) {
  console.error("Usage: deno task release <slug> [--dry-run]");
  Deno.exit(1);
}

async function run(cmd: string[], opts: { capture?: boolean } = {}): Promise<{ ok: boolean; out: string }> {
  const p = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    cwd: ROOT,
    stdout: opts.capture ? "piped" : "inherit",
    stderr: opts.capture ? "piped" : "inherit",
  });
  const res = await p.output();
  const out = opts.capture
    ? new TextDecoder().decode(res.stdout) + new TextDecoder().decode(res.stderr)
    : "";
  return { ok: res.success, out };
}

async function readThemeVersion(s: string): Promise<string> {
  const text = await Deno.readTextFile(join(ROOT, packageDir(s), "theme.yaml"));
  const m = text.match(/^version:\s*["']?([^"'\n]+)/m);
  return m?.[1]?.trim() ?? "1.0.0";
}

const version = await readThemeVersion(slug);
const tag = `${slug}-v${version}`;

console.log(`Releasing ${slug} ${version} (tag ${tag})${dryRun ? " [dry-run]" : ""}\n`);

// Check gh auth + existing release (idempotency: a re-run after CI already
// completed this tag's release should no-op, not push a duplicate tag).
console.log("1/2 Checking GitHub state…");
const auth = await run(["gh", "auth", "status"], { capture: true });
if (!auth.ok) {
  console.error("  gh is not authenticated. Run this manually once authenticated:");
  console.error(`    git tag ${tag} && git push origin ${tag}`);
  Deno.exit(1);
}

const existing = await run(["gh", "release", "view", tag], { capture: true });
if (existing.ok) {
  console.log(`  Release ${tag} already exists on GitHub — nothing to do. Bump the version in theme.yaml to re-release.`);
  Deno.exit(0);
}

const tagExists = (await run(["git", "rev-parse", "--verify", "--quiet", `refs/tags/${tag}`], { capture: true })).ok;

// Tag + push — this alone triggers release-zip.yml (pack, GitHub release,
// registry.json sha256), which is the only thing that packs a ZIP now.
console.log("2/2 Tagging…");
if (dryRun) {
  if (tagExists) console.log(`  tag ${tag} already exists locally; would push it`);
  else console.log(`  would run: git tag ${tag} && git push origin ${tag}`);
  console.log("\nDry run complete. No tags pushed.");
  Deno.exit(0);
}

if (!tagExists) {
  if (!(await run(["git", "tag", tag])).ok) Deno.exit(1);
}
if (!(await run(["git", "push", "origin", tag])).ok) Deno.exit(1);

console.log(`\n✓ Pushed ${tag}. Remaining steps:`);
console.log("  - wait for the 'Release ZIP' GitHub Action to finish (packs, creates the release, writes registry.json sha256)");
console.log("  - deno task screenshot {slug} before releasing if the theme's look changed (ships in static/)");
console.log("  - redeploy the demo and verify it live at themes.getdune.org/{slug}");
console.log(`  - only then: gh workflow run publish-jsr.yml -f tag=${tag}`);
