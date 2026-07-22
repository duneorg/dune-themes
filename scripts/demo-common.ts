/**
 * Demo site helpers.
 */

import { join } from "@std/path";
import { parse as parseYaml } from "@std/yaml";
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
  "sirocco",
  "book",
  "starlight",
  "blox",
  "ink",
  "gale",
  "salon",
  "syntax",
  "herald",
  "lucid",
  "manual",
  "fennec",
  "nightfall",
  "oasis",
] as const;

export type DemoSlug = (typeof DEMO_SLUGS)[number];

/**
 * Shared content fixture each demo symlinks `content` to (under
 * `demos/_shared/`). Defaults to "blog" — docs-family themes (caravan, book,
 * starlight, and later lucid/manual) use "docs"; portfolio/academic themes
 * (blox, fennec, later oasis) use "portfolio". Landing-only fixtures may land
 * later (see notes/RELEASE-PLAN.md).
 */
const DEMO_CONTENT_FIXTURE: Partial<Record<DemoSlug, string>> = {
  caravan: "docs",
  book: "docs",
  starlight: "docs",
  blox: "portfolio",
  fennec: "portfolio",
  oasis: "portfolio",
  lucid: "docs",
  manual: "docs",
  nightfall: "docs",
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
const DEMO_README_AS_HOME = new Set<DemoSlug>(["caravan", "book", "starlight", "lucid", "manual", "nightfall"]);

/** True when the theme README replaces the demo homepage (see DEMO_README_AS_HOME). */
export function isReadmeAsHome(slug: string): boolean {
  return DEMO_README_AS_HOME.has(slug as DemoSlug);
}

/**
 * Top-level fixture directories a theme's demo skips folding in — for
 * content a theme's own `demo-posts/`/`docs/` covers better than the
 * generic shared version. Sirocco's own "Installing Sirocco" post replaces
 * the generic `03.about` (real slug/version instead of a `<slug>`
 * placeholder), so it doesn't need the generic page too. Same reasoning
 * for papermod, whose own `04.installing-papermod` demo post covers it.
 */
const DEMO_FIXTURE_EXCLUDE: Partial<Record<DemoSlug, string[]>> = {
  sirocco: ["03.about"],
  papermod: ["03.about"],
  ink: ["03.about"],
  gale: ["03.about"],
  salon: ["03.about"],
  syntax: ["03.about"],
  herald: ["03.about"],
};

/** Directory name of the fixture's homepage, by convention across all shared fixtures. */
const HOME_DIR_NAME = "01.home";

/**
 * Target directory for a theme's own `docs/` folder (see below) — sorted
 * right after the homepage, ahead of the shared fixture's generic
 * platform-docs sections (which start at 03 to leave this slot free).
 */
const THEME_DOCS_DIR_NAME = "02.theme-docs";

/**
 * Target directory for a theme's own `style-guide/` folder (see below) —
 * sorted after the shared fixture's own sections, ahead of the generated
 * About page, so it reads as "one more top-level page" rather than being
 * nested inside theme-docs (a style guide is a reference artifact, not
 * documentation prose).
 */
const STYLE_GUIDE_DIR_NAME = "06.style-guide";

/**
 * Folder name of the "blog" fixture's own posts collection — the merge
 * target for a theme's own `demo-posts/` (see below). Only meaningful when
 * `contentFixtureFor(slug) === "blog"`; blog-archetype themes have no
 * sidebar/section concept to fold theme-specific content into the way
 * `THEME_DOCS_DIR_NAME`/`STYLE_GUIDE_DIR_NAME` do, so the idiomatic
 * equivalent is real posts mixed into the same collection, not a
 * separate top-level page.
 */
const BLOG_POSTS_DIR_NAME = "02.blog";

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

  // A theme can declare `parent: {name}` in theme.yaml to inherit templates/
  // locales it doesn't define itself (see src/themes/loader.ts's theme
  // chain resolution in @dune/core). The engine looks for each ancestor
  // under this demo's own themes/{parentName}/, so it needs its own
  // symlink here too, walking the full chain in case of multi-level
  // inheritance.
  let currentPackageDir = packageDir;
  const seenParents = new Set<string>();
  for (;;) {
    const manifest = parseYaml(
      await Deno.readTextFile(join(currentPackageDir, "theme.yaml")),
    ) as { parent?: string };
    const parentName = manifest.parent;
    if (!parentName || seenParents.has(parentName)) break;
    seenParents.add(parentName);
    const parentPackageDir = join(ROOT, "packages", `theme-${parentName}`);
    await ensureSymlink(
      join(themesDir, parentName),
      join("..", "..", "..", "packages", `theme-${parentName}`),
    );
    currentPackageDir = parentPackageDir;
  }

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

  for (const excluded of DEMO_FIXTURE_EXCLUDE[slug as DemoSlug] ?? []) {
    await Deno.remove(join(contentDir, excluded), { recursive: true }).catch(() => {});
  }

  // A theme's own demo-home/ overrides specific fields on the shared
  // fixture's home page (e.g. a generic "Blog Demo" title reading as the
  // theme's actual name instead) without replacing the whole page the way
  // DEMO_README_AS_HOME does — copied on top of the already-copied fixture
  // home page, so it only needs to contain what it's overriding.
  const demoHomeDir = join(packageDir, "demo-home");
  try {
    await Deno.stat(demoHomeDir);
    await copyDirRecursive(demoHomeDir, join(contentDir, HOME_DIR_NAME));
  } catch {
    // theme has no demo-home/ folder — fine, not every theme needs one
  }

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

  // A theme's own style-guide/ (hand-authored template exercising every
  // component the theme's stylesheet supports) folds in as its own
  // top-level page, if the theme package has one.
  const styleGuideDir = join(packageDir, "style-guide");
  try {
    await Deno.stat(styleGuideDir);
    await copyDirRecursive(styleGuideDir, join(contentDir, STYLE_GUIDE_DIR_NAME));
  } catch {
    // theme has no style-guide/ folder — fine, not every theme needs one
  }

  // A blog-archetype theme's own demo-posts/ (real, dated posts that
  // dogfood its config options and typography while also being ordinary
  // readable content) merge directly into the blog fixture's own posts
  // collection, so they appear inline in the listing next to the generic
  // fixture posts — not as a separate top-level page the way
  // docs/style-guide are for docs-archetype themes, since a blog theme has
  // no sidebar/section concept to hang a separate page off of.
  if (fixture === "blog") {
    const demoPostsDir = join(packageDir, "demo-posts");
    try {
      await Deno.stat(demoPostsDir);
      await copyDirRecursive(demoPostsDir, join(contentDir, BLOG_POSTS_DIR_NAME));
    } catch {
      // theme has no demo-posts/ folder — fine, not every theme needs one
    }
  }

  const readme = await readReadmeMarkdown(packageDir);
  if (readme && DEMO_README_AS_HOME.has(slug as DemoSlug)) {
    await writeReadmeHome(contentDir, readme, slug);
  } else if (readme) {
    await writeReadmeAboutPage(contentDir, readme, slug);
  }

  // Dune indexes taxonomy values but does not auto-route `/tag:{name}`.
  // Term HTML pages need authored content with `termPageFor` + a
  // `@taxonomy.tag` collection. Generate one per distinct tag so demo
  // themes that link to `/tags/{tag}/` resolve instead of 404ing.
  await generateTagTermPages(contentDir, packageDir);

  // A theme's own demo-config.json (committed, unlike demos/{slug}/data/
  // which is gitignored runtime state) seeds this demo's theme_config —
  // e.g. turning on scheme_switcher, a demo-only preview feature real
  // sites leave off by default. Previously this only ever existed as a
  // hand-created local file, so it never actually reached a fresh deploy —
  // caravan's scheme switcher shipped live without it, present in every
  // dev sandbox but absent from themes.getdune.org. Overwrites on every
  // relink, same as content/ — a demo represents fixed, intentional
  // settings, not something to hand-configure via the admin panel and
  // expect to persist.
  const demoConfigFile = join(packageDir, "demo-config.json");
  try {
    const demoConfig = await Deno.readTextFile(demoConfigFile);
    const dataDir = join(dir, "data");
    await Deno.mkdir(dataDir, { recursive: true });
    await Deno.writeTextFile(join(dataDir, "theme-config.json"), demoConfig);
  } catch {
    // theme has no demo-config.json — fine, not every theme needs one
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

/** True when `tag` is safe as a URL path segment and folder name. */
function isSafeTagSegment(tag: string): boolean {
  return /^[a-zA-Z0-9._-]+$/.test(tag);
}

/**
 * Walk generated demo content and collect distinct `taxonomy.tag` /
 * `taxonomy.tags` / legacy `tags` values.
 */
async function collectTaxonomyTags(contentDir: string): Promise<Set<string>> {
  const tags = new Set<string>();

  async function walk(dir: string): Promise<void> {
    for await (const entry of Deno.readDir(dir)) {
      const path = join(dir, entry.name);
      if (entry.isDirectory) {
        await walk(path);
        continue;
      }
      if (!entry.isFile || !/\.(md|mdx)$/i.test(entry.name)) continue;
      const text = await Deno.readTextFile(path);
      if (!text.startsWith("---")) continue;
      const end = text.indexOf("\n---", 3);
      if (end < 0) continue;
      try {
        const fm = parseYaml(text.slice(3, end)) as Record<string, unknown>;
        const tax = fm.taxonomy as Record<string, unknown> | undefined;
        const list = tax?.tag ?? tax?.tags ?? fm.tags;
        if (!Array.isArray(list)) continue;
        for (const value of list) {
          if (typeof value === "string" && value.trim()) {
            tags.add(value.trim());
          }
        }
      } catch {
        // Ignore unparseable frontmatter — same as a missing taxonomy block.
      }
    }
  }

  await walk(contentDir);
  return tags;
}

async function themeHasBlogTemplate(packageDir: string): Promise<boolean> {
  for (const name of ["blog.tsx", "blog.ts", "blog.jsx", "blog.js"]) {
    try {
      await Deno.stat(join(packageDir, "templates", name));
      return true;
    } catch {
      // try next
    }
  }
  // Walk parent chain (theme.yaml `parent:`) — e.g. a thin child may inherit
  // blog from dune-minimal.
  const seen = new Set<string>();
  let current = packageDir;
  for (;;) {
    let parentName: string | undefined;
    try {
      const manifest = parseYaml(
        await Deno.readTextFile(join(current, "theme.yaml")),
      ) as { parent?: string };
      parentName = manifest.parent;
    } catch {
      break;
    }
    if (!parentName || seen.has(parentName)) break;
    seen.add(parentName);
    current = join(ROOT, "packages", `theme-${parentName}`);
    for (const name of ["blog.tsx", "blog.ts", "blog.jsx", "blog.js"]) {
      try {
        await Deno.stat(join(current, "templates", name));
        return true;
      } catch {
        // try next
      }
    }
  }
  return false;
}

/**
 * Create `content/tags/{tag}/default.md` term pages for every distinct tag
 * in the demo, using the theme's `blog` listing template. Skipped when the
 * theme (or its parent chain) has no blog template, or when there are no tags.
 */
async function generateTagTermPages(
  contentDir: string,
  packageDir: string,
): Promise<void> {
  if (!(await themeHasBlogTemplate(packageDir))) return;

  const tags = await collectTaxonomyTags(contentDir);
  if (tags.size === 0) return;

  for (const tag of [...tags].sort()) {
    if (!isSafeTagSegment(tag)) {
      console.warn(
        `demo:link: skipping tag term page for unsafe segment "${tag}"`,
      );
      continue;
    }
    const dir = join(contentDir, "tags", tag);
    await Deno.mkdir(dir, { recursive: true });
    await Deno.writeTextFile(
      join(dir, "default.md"),
      `---
title: ${JSON.stringify(tag)}
template: blog
published: true
visible: false
termPageFor: ${tag}
collection:
  items:
    "@taxonomy.tag": ${tag}
  order:
    by: date
    dir: desc
  filter:
    template: post
---

Posts tagged **${tag}**.
`,
    );
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
    // Drop repo-relative links (LICENSE, sibling paths) that 404 on a
    // deployed demo. Keep http(s), fragments, and site-root paths
    // (`/themes/.../screenshot.png`) so README images and in-site links
    // survive when the README is reused as demo content.
    /\[([^\]]+)\]\((?!https?:\/\/|#|\/)[^)]+\)/g,
    "$1",
  );

  return { title, body };
}

/**
 * Point README screenshot embeds at the local theme static file so demos
 * and `deno task screenshot` don't depend on themes.getdune.org already
 * hosting the asset (chicken-and-egg for unpublished themes).
 */
function localizeScreenshotUrls(body: string, slug: string): string {
  const remote =
    `https://themes.getdune.org/${slug}/themes/${slug}/static/screenshot.png`;
  const local = `/themes/${slug}/static/screenshot.png`;
  return body.split(remote).join(local);
}

/** Write the README as a standalone "About this theme" page, sorted last in the nav. */
async function writeReadmeAboutPage(
  contentDir: string,
  readme: ReadmeContent,
  slug: string,
): Promise<void> {
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
  await Deno.writeTextFile(
    join(aboutDir, "default.md"),
    frontmatter + localizeScreenshotUrls(readme.body, slug),
  );
}

/** Replace the fixture's generic homepage with the theme's README (see DEMO_README_AS_HOME). */
async function writeReadmeHome(
  contentDir: string,
  readme: ReadmeContent,
  slug: string,
): Promise<void> {
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
  await Deno.writeTextFile(
    join(homeDir, "default.md"),
    frontmatter + localizeScreenshotUrls(readme.body, slug),
  );
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
