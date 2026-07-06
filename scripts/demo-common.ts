/**
 * Demo site helpers.
 */

import { join } from "@std/path";
import { CATALOG } from "./catalog.ts";

export const ROOT = new URL("..", import.meta.url).pathname;

/** Slugs with a demo site under demos/{slug}/ */
export const DEMO_SLUGS = [
  "papermod",
  "striped",
  "massively",
  "editorial",
  "future-imperfect",
  "dimension",
  "dopetrope",
  "phantom",
  "hyperspace",
  "read-only",
  "strongly-typed",
  "strata",
  "photon",
  "txt",
  "parallelism",
  "astral",
  "fractal",
  "lens",
  "miniport",
  "aerial",
  "alpha",
  "arcana",
  "halcyonic",
  "escape-velocity",
  "eventually",
  "zerofour",
  "big-picture",
  "directive",
  "ethereal",
  "forty",
  "helios",
  "prologue",
  "solid-state",
  "spectral",
  "stellar",
  "story",
  "highlights",
  "landed",
  "minimaxing",
  "multiverse",
  "paradigm-shift",
  "telephasic",
  "tessellate",
  "twenty",
  "verti",
  "caravan",
] as const;

export type DemoSlug = (typeof DEMO_SLUGS)[number];

/**
 * Shared content fixture each demo symlinks `content` to (under
 * `demos/_shared/`). Defaults to "blog" — docs-family themes (caravan, and
 * later book/lucid/manual) use "docs" instead; landing/portfolio themes
 * should get their own fixture here once those are built (see
 * notes/RELEASE-PLAN.md).
 */
const DEMO_CONTENT_FIXTURE: Partial<Record<DemoSlug, string>> = {
  caravan: "docs",
};

function contentFixtureFor(slug: string): string {
  return DEMO_CONTENT_FIXTURE[slug as DemoSlug] ?? "blog";
}

export function demoDir(slug: string): string {
  return join(ROOT, "demos", slug);
}

export function isDemoSlug(slug: string): slug is DemoSlug {
  return (DEMO_SLUGS as readonly string[]).includes(slug);
}

export function catalogHasSlug(slug: string): boolean {
  return CATALOG.some((e) => e.slug === slug);
}

/**
 * Directory name for the generated "About this theme" page (see
 * `generateReadmePage`). Numbered to sort last regardless of which shared
 * fixture is in use; gitignored and regenerated on every `demo:link` so it
 * never drifts from the theme's actual README.
 */
const ABOUT_DIR_NAME = "99.about-theme";

/** Ensure themes/{slug} and content symlinks exist for a demo site. */
export async function linkDemo(slug: string): Promise<void> {
  const dir = demoDir(slug);
  const themesDir = join(dir, "themes");
  const themeLink = join(themesDir, slug);
  const packageDir = join(ROOT, "packages", `theme-${slug}`);
  const contentDir = join(dir, "content");
  const fixture = contentFixtureFor(slug);
  const fixtureDir = join(ROOT, "demos", "_shared", fixture);

  await Deno.mkdir(themesDir, { recursive: true });

  try {
    await Deno.lstat(packageDir);
  } catch {
    throw new Error(`Theme package not found: packages/theme-${slug}`);
  }

  await ensureSymlink(themeLink, join("..", "..", "..", "packages", `theme-${slug}`));

  // content/ is a real (copied, not symlinked) directory: Dune's directory
  // lister only follows a symlink when it *is* the path being opened (as
  // the old single `content -> ../_shared/{fixture}` symlink was); a
  // symlink discovered as a readDir() *entry* comes back `isSymlink: true`
  // with `isDirectory: false`, so the recursive content walk silently
  // never descends into it. A real directory sidesteps that, and lets us
  // add the generated About page alongside the fixture content. Re-run
  // `deno task demo:link {slug}` after editing shared fixture content —
  // it's copied, not live-linked.
  await Deno.remove(contentDir, { recursive: true }).catch(() => {});
  await copyDirRecursive(fixtureDir, contentDir);
  await generateReadmePage(slug, packageDir, contentDir);
}

async function copyDirRecursive(src: string, dest: string): Promise<void> {
  await Deno.mkdir(dest, { recursive: true });
  for await (const entry of Deno.readDir(src)) {
    const from = join(src, entry.name);
    const to = join(dest, entry.name);
    if (entry.isDirectory) {
      await copyDirRecursive(from, to);
    } else if (entry.isFile) {
      await Deno.copyFile(from, to);
    }
  }
}

/**
 * Render the theme package's README.md as a demo content page, so the demo
 * site shows the same "what is this theme" copy that JSR/GitHub visitors
 * see — regenerated on every link, so it can't go stale.
 */
async function generateReadmePage(slug: string, packageDir: string, contentDir: string): Promise<void> {
  const aboutDir = join(contentDir, ABOUT_DIR_NAME);
  const targetFile = join(aboutDir, "default.md");

  let raw: string;
  try {
    raw = await Deno.readTextFile(join(packageDir, "README.md"));
  } catch {
    await Deno.remove(aboutDir, { recursive: true }).catch(() => {});
    return;
  }

  const lines = raw.split("\n");
  // The template already renders `<h1>{frontmatter.title}</h1>` — drop a
  // leading "# Title" line (plus the blank line after it) to avoid a
  // duplicate heading.
  let title = slug;
  if (lines[0]?.startsWith("# ")) {
    title = lines[0].slice(2).trim();
    lines.shift();
    if (lines[0] === "") lines.shift();
  }

  // Repo-relative links (sibling theme packages, LICENSE, etc.) don't
  // resolve on a deployed demo — keep the label, drop the dead link.
  const body = lines.join("\n").replace(
    /\[([^\]]+)\]\((?!https?:\/\/|#)[^)]+\)/g,
    "$1",
  );

  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    "template: default",
    "nav_title: About",
    "published: true",
    "---",
    "",
  ].join("\n");

  await Deno.mkdir(aboutDir, { recursive: true });
  await Deno.writeTextFile(targetFile, frontmatter + body);
}

async function ensureSymlink(linkPath: string, target: string): Promise<void> {
  try {
    const stat = await Deno.lstat(linkPath);
    if (stat.isSymlink) {
      const current = await Deno.readLink(linkPath);
      if (current === target) return;
      await Deno.remove(linkPath);
    } else {
      throw new Error(`${linkPath} exists and is not a symlink`);
    }
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) throw err;
  }
  await Deno.symlink(target, linkPath);
}

/** Parse `papermod-v1.0.0` → { slug: papermod, version: 1.0.0 } */
export function parseReleaseTag(tag: string): { slug: string; version: string } | null {
  const m = tag.match(/^(.+)-v(\d+\.\d+\.\d+(?:[-+][\w.-]+)?)$/);
  if (!m) return null;
  return { slug: m[1]!, version: m[2]! };
}
