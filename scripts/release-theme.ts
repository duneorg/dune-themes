#!/usr/bin/env -S deno run -A
/**
 * Release one theme: pack ZIP → write sha256 into registry.json →
 * git tag {slug}-v{version} → GitHub release with the ZIP attached.
 *
 *   deno task release caravan
 *   deno task release caravan --dry-run   # print actions, change nothing remote
 *
 * Idempotent: if the release already exists it stops instead of clobbering.
 * The JSR publish workflow (.github/workflows/publish.yml) fires on the pushed v* tag.
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
const zipName = `${slug}-${version}.zip`;
const zipPath = join(ROOT, "dist", zipName);

console.log(`Releasing ${slug} ${version} (tag ${tag})${dryRun ? " [dry-run]" : ""}\n`);

// 1. Pack
console.log("1/4 Packing ZIP…");
if (dryRun) {
  console.log(`  would run: deno run -A scripts/pack-theme.ts ${slug} → dist/${zipName}`);
} else {
  const pack = await run(["deno", "run", "-A", "scripts/pack-theme.ts", slug]);
  if (!pack.ok) Deno.exit(1);
}

// 2. sha256 into registry.json
console.log("2/4 Writing sha256 into registry.json…");
if (dryRun) {
  console.log(`  would run: deno run -A scripts/update-registry-sha256.ts ${slug}`);
} else {
  const sha = await run(["deno", "run", "-A", "scripts/update-registry-sha256.ts", slug]);
  if (!sha.ok) Deno.exit(1);
}

// 3. Check gh auth + existing release
console.log("3/4 Checking GitHub state…");
const auth = await run(["gh", "auth", "status"], { capture: true });
if (!auth.ok) {
  console.error("  gh is not authenticated. Run these manually once authenticated:");
  console.error(`    git tag ${tag} && git push origin ${tag}`);
  console.error(`    gh release create ${tag} dist/${zipName} --title "${slug} ${version}" --notes "Theme ${slug} v${version} ZIP for marketplace installs."`);
  Deno.exit(1);
}

const existing = await run(["gh", "release", "view", tag], { capture: true });
if (existing.ok) {
  console.log(`  Release ${tag} already exists on GitHub — nothing to do. Bump the version in theme.yaml to re-release.`);
  Deno.exit(0);
}

const tagExists = (await run(["git", "rev-parse", "--verify", "--quiet", `refs/tags/${tag}`], { capture: true })).ok;

// 4. Tag + release
console.log("4/4 Tagging + creating GitHub release…");
if (dryRun) {
  if (tagExists) console.log(`  tag ${tag} already exists locally; would reuse it`);
  else console.log(`  would run: git tag ${tag} && git push origin ${tag}`);
  console.log(`  would run: gh release create ${tag} dist/${zipName} --title "${slug} ${version}" --notes …`);
  console.log("\nDry run complete. Registry/dist untouched, no tags pushed.");
  Deno.exit(0);
}

if (!tagExists) {
  if (!(await run(["git", "tag", tag])).ok) Deno.exit(1);
}
if (!(await run(["git", "push", "origin", tag])).ok) Deno.exit(1);
if (
  !(await run([
    "gh", "release", "create", tag, zipPath,
    "--title", `${slug} ${version}`,
    "--notes", `Theme ${slug} v${version} ZIP for marketplace installs. sha256 recorded in registry.json.`,
  ])).ok
) Deno.exit(1);

console.log(`\n✓ Released ${tag}. Remaining manual steps:`);
console.log("  - commit registry.json (sha256 update) and push");
console.log("  - deno task sync:admin-registry, then commit/publish plugin-admin");
console.log("  - deno task screenshot {slug} before releasing if the theme's look changed (ships in static/)");
