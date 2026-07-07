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

/**
 * Demos where the theme's README *is* the homepage, replacing the shared
 * fixture's generic `01.home` page, instead of living at a separate
 * `/about-theme/` page. Makes sense for docs themes, where a visitor
 * should see "what is this theme" immediately — wrong for archetypes
 * (blog, portfolio, landing) where the homepage's job is to demonstrate
 * the theme's actual design, and README prose would bury that.
 */
const DEMO_README_AS_HOME = new Set<DemoSlug>(["caravan"]);

/** Directory name of the fixture's homepage, by convention across all shared fixtures. */
const HOME_DIR_NAME = "01.home";

/**
 * Target directory for a theme's own `docs/` folder (see below) — sorted
 * right after the homepage, ahead of the shared fixture's generic
 * platform-docs sections (which start at 03 to leave this slot free).
 */
const THEME_DOCS_DIR_NAME = "02.theme-docs";

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

  // A theme's own docs/ (real, theme-specific documentation — config
  // reference, customization guide, template walkthrough — content that
  // can't be shared across themes the way _shared/{fixture} is) folds in
  // alongside the generic fixture content, if the theme package has one.
  const themeDocsDir = join(packageDir, "docs");
  try {
    await Deno.stat(themeDocsDir);
    await copyDirRecursive(themeDocsDir, join(contentDir, THEME_DOCS_DIR_NAME));
  } catch {
    // theme has no docs/ folder — fine, not every theme needs one
  }

  const readme = await readReadmeMarkdown(packageDir);
  if (readme && DEMO_README_AS_HOME.has(slug as DemoSlug)) {
    await writeReadmeHome(contentDir, readme);
  } else if (readme) {
    await writeReadmeAboutPage(contentDir, readme);
  }
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

interface ReadmeContent {
  title: string;
  body: string;
}

/**
 * Read and transform a theme package's README.md for reuse as demo content:
 * drop the leading "# Title" (the template already renders
 * `<h1>{frontmatter.title}</h1>`, so keeping it would duplicate the
 * heading) and strip repo-relative links (sibling theme packages, LICENSE,
 * etc.) that would 404 on a deployed demo, keeping the label text and
 * real http(s) links intact. Returns undefined if the package has no
 * README.
 */
async function readReadmeMarkdown(packageDir: string): Promise<ReadmeContent | undefined> {
  let raw: string;
  try {
    raw = await Deno.readTextFile(join(packageDir, "README.md"));
  } catch {
    return undefined;
  }

  const lines = raw.split("\n");
  let title = "";
  if (lines[0]?.startsWith("# ")) {
    title = lines[0].slice(2).trim();
    lines.shift();
    if (lines[0] === "") lines.shift();
  }

  const body = lines.join("\n").replace(
    /\[([^\]]+)\]\((?!https?:\/\/|#)[^)]+\)/g,
    "$1",
  );

  return { title, body };
}

/** Write the README as a standalone "About this theme" page, sorted last in the nav. */
async function writeReadmeAboutPage(contentDir: string, readme: ReadmeContent): Promise<void> {
  const aboutDir = join(contentDir, ABOUT_DIR_NAME);
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(readme.title)}`,
    "template: default",
    "nav_title: About",
    "published: true",
    "---",
    "",
  ].join("\n");
  await Deno.mkdir(aboutDir, { recursive: true });
  await Deno.writeTextFile(join(aboutDir, "default.md"), frontmatter + readme.body);
}

/** Replace the fixture's generic homepage with the theme's README (see DEMO_README_AS_HOME). */
async function writeReadmeHome(contentDir: string, readme: ReadmeContent): Promise<void> {
  const homeDir = join(contentDir, HOME_DIR_NAME);
  try {
    await Deno.stat(homeDir);
  } catch {
    throw new Error(`Expected a ${HOME_DIR_NAME} directory in the fixture content to override — none found`);
  }
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(readme.title)}`,
    "template: default",
    "published: true",
    "---",
    "",
  ].join("\n");
  await Deno.writeTextFile(join(homeDir, "default.md"), frontmatter + readme.body);
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
