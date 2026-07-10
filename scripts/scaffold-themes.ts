#!/usr/bin/env -S deno run -A
/**
 * Generate theme packages from THEME_DEFS and refresh registry.json.
 * All catalog themes are hand-maintained; add entries to theme-defs.ts for new scaffolds.
 */

import { join } from "@std/path";
import { buildRegistryJson } from "./catalog.ts";
import {
  baselineCssExtra,
  blogTemplate,
  configSchemaYaml,
  layoutTsx,
  localesEnJson,
  needsBlogTemplate,
  needsSectionTemplate,
  searchTemplate,
  sectionTemplate,
} from "./scaffold-baseline.ts";
import { THEME_DEFS, RETIRED_PACKAGE_SLUGS, type ThemeDef } from "./theme-defs.ts";

const ROOT = new URL("..", import.meta.url).pathname;

function cssBlock(def: ThemeDef): string {
  const v = def.cssVars;
  const vars = Object.entries(v).map(([k, val]) => `  ${k}: ${val};`).join("\n");

  const base = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
${vars}
  --radius: 8px;
  --header-h: 56px;
}
body {
  font-family: var(--font);
  color: var(--text);
  background: var(--bg);
  line-height: 1.65;
  font-size: 1rem;
}
a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }
img { max-width: 100%; height: auto; }
.site-header {
  display: flex; align-items: center; gap: 1.5rem;
  padding: 0 1.5rem; min-height: var(--header-h);
  border-bottom: 1px solid var(--border);
  background: var(--header-bg, var(--bg));
  position: sticky; top: 0; z-index: 40;
}
.site-logo { font-weight: 700; color: var(--text); text-decoration: none; font-size: 1.1rem; }
.site-logo:hover { text-decoration: none; color: var(--accent); }
.site-nav { display: flex; gap: 1rem; margin-left: auto; flex-wrap: wrap; }
.site-nav a { color: var(--muted); font-size: 0.9rem; text-decoration: none; }
.site-nav a:hover, .site-nav a.active { color: var(--accent); }
.site-footer {
  padding: 2rem 1.5rem; text-align: center;
  color: var(--muted); font-size: 0.85rem;
  border-top: 1px solid var(--border); margin-top: 3rem;
}
.prose { max-width: var(--max-width, 720px); margin: 0 auto; padding: 2rem 1.25rem; }
.prose h1 { font-size: 2rem; margin: 0 0 1rem; line-height: 1.2; }
.prose h2 { font-size: 1.4rem; margin: 2rem 0 0.75rem; }
.prose h3 { font-size: 1.15rem; margin: 1.5rem 0 0.5rem; }
.prose p, .prose ul, .prose ol { margin-bottom: 1rem; }
.prose pre { background: var(--bg-alt); padding: 1rem; overflow-x: auto; border-radius: var(--radius); font-family: var(--font-mono, monospace); font-size: 0.875rem; }
.prose code { font-family: var(--font-mono, monospace); font-size: 0.9em; background: var(--bg-alt); padding: 0.1em 0.35em; border-radius: 4px; }
.prose blockquote { border-left: 3px solid var(--accent); padding-left: 1rem; color: var(--muted); margin: 1rem 0; }
.post-meta { color: var(--muted); font-size: 0.875rem; margin-bottom: 1.5rem; }
.post-cover { width: 100%; max-height: 420px; object-fit: cover; border-radius: var(--radius); margin-bottom: 1.5rem; }
.error-page { text-align: center; padding: 4rem 1.5rem; }
.error-page h1 { font-size: 4rem; color: var(--accent); }
`;

  const archetypeExtra: Record<string, string> = {
    "blog-minimal": `
.site-header { background: var(--bg); }
.prose { font-family: var(--font-serif, var(--font)); }
`,
    "blog-hero": `
.site-header { background: var(--header-bg); }
.site-header .site-logo, .site-header .site-nav a { color: rgba(255,255,255,0.85); }
.site-header .site-nav a:hover, .site-header .site-nav a.active { color: #fff; }
.hero { background: var(--header-bg); color: #fff; padding: 4rem 1.5rem; text-align: center; }
.hero h1 { font-size: 2.5rem; max-width: 720px; margin: 0 auto 1rem; }
.hero p { color: rgba(255,255,255,0.75); max-width: 540px; margin: 0 auto; }
`,
    "blog-magazine": `
.post-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; padding: 2rem 1.25rem; max-width: 1100px; margin: 0 auto; }
.post-card { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: box-shadow 0.2s; }
.post-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.post-card img { width: 100%; height: 180px; object-fit: cover; }
.post-card-body { padding: 1.25rem; }
.post-card h2 { font-size: 1.1rem; margin-bottom: 0.5rem; }
.post-card p { color: var(--muted); font-size: 0.875rem; }
`,
    "blog-tech": `
.post-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
.tag { background: var(--bg-alt); color: var(--accent); padding: 0.15rem 0.6rem; border-radius: 999px; font-size: 0.75rem; }
`,
    "docs-sidebar": `
.docs-shell { display: flex; min-height: calc(100vh - var(--header-h)); }
.docs-sidebar {
  width: var(--sidebar-width); flex-shrink: 0;
  background: var(--sidebar-bg); border-right: 1px solid var(--border);
  padding: 1.25rem 1rem; position: sticky; top: var(--header-h);
  height: calc(100vh - var(--header-h)); overflow-y: auto;
}
.docs-sidebar a { display: block; padding: 0.35rem 0.5rem; color: var(--muted); font-size: 0.875rem; border-radius: 4px; text-decoration: none; }
.docs-sidebar a:hover, .docs-sidebar a.active { background: var(--bg-alt); color: var(--accent); }
.docs-main { flex: 1; min-width: 0; }
.docs-main .prose { max-width: 820px; margin: 0; padding: 2rem 2.5rem; }
@media (max-width: 768px) {
  .docs-shell { flex-direction: column; }
  .docs-sidebar { width: 100%; height: auto; position: static; border-right: none; border-bottom: 1px solid var(--border); }
}
`,
    "docs-modern": `
.docs-shell { display: flex; min-height: calc(100vh - var(--header-h)); }
.docs-sidebar {
  width: var(--sidebar-width); flex-shrink: 0;
  background: linear-gradient(180deg, var(--sidebar-bg) 0%, var(--bg) 100%);
  border-right: 1px solid var(--border); padding: 1.5rem 1rem;
}
.docs-sidebar a { display: block; padding: 0.4rem 0.75rem; color: var(--muted); font-size: 0.875rem; border-radius: var(--radius); text-decoration: none; margin-bottom: 0.15rem; }
.docs-sidebar a:hover, .docs-sidebar a.active { background: color-mix(in srgb, var(--accent) 12%, transparent); color: var(--accent); }
.docs-main { flex: 1; }
.docs-main .prose { max-width: 800px; padding: 2rem 2.5rem; }
`,
    landing: `
.hero {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-2, var(--accent)) 100%);
  color: #fff; padding: 5rem 1.5rem; text-align: center;
}
.hero h1 { font-size: clamp(2rem, 5vw, 3rem); margin-bottom: 1rem; }
.hero p { font-size: 1.15rem; opacity: 0.9; max-width: 560px; margin: 0 auto 2rem; }
.hero-cta { display: inline-block; background: #fff; color: var(--accent); padding: 0.75rem 1.75rem; border-radius: var(--radius); font-weight: 600; text-decoration: none; }
.features { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; padding: 3rem 1.5rem; max-width: 1000px; margin: 0 auto; }
.feature { padding: 1.5rem; border: 1px solid var(--border); border-radius: var(--radius); }
.feature h3 { margin-bottom: 0.5rem; color: var(--accent); }
`,
    portfolio: `
body { background: var(--bg); color: var(--text); }
.site-header { background: var(--bg-alt); border-color: var(--border); }
.site-header .site-logo { color: var(--text); }
.hero-portfolio { padding: 4rem 1.5rem 2rem; text-align: center; }
.hero-portfolio h1 { font-size: 2.25rem; margin-bottom: 0.5rem; }
.hero-portfolio p { color: var(--muted); }
.project-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; padding: 1rem 1.5rem 3rem; max-width: 1100px; margin: 0 auto; }
.project-card { background: var(--bg-alt); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.5rem; }
.project-card h3 { color: var(--accent); margin-bottom: 0.5rem; }
`,
  };

  return base + (archetypeExtra[def.archetype] ?? "") + baselineCssExtra(def);
}

function defaultTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  return (
    <LayoutComponent {...props}>
      <article class="prose">
        <h1>{page.frontmatter.title}</h1>
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
`;
}

function postTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function PostTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const tags = Array.isArray(fm.tags) ? fm.tags as string[] : [];
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;

  return (
    <LayoutComponent {...props}>
      <article class="prose">
        {cover && <img class="post-cover" src={cover} alt="" />}
        <h1>{page.frontmatter.title}</h1>
        <div class="post-meta">
          {date && <time>{date}</time>}
          {tags.length > 0 && (
            <div class="post-tags">
              {tags.map((t) => <span class="tag" key={t}>{t}</span>)}
            </div>
          )}
        </div>
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
`;
}

function errorTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function ErrorTemplate(props: TemplateProps & { Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const code = (props.page?.frontmatter as Record<string, unknown>)?.errorCode ?? 404;
  return (
    <LayoutComponent {...props}>
      <div class="error-page prose">
        <h1>{String(code)}</h1>
        <p>Page not found.</p>
        <p><a href="/">← Back home</a></p>
      </div>
    </LayoutComponent>
  );
}
`;
}

function themeYaml(def: ThemeDef): string {
  return `name: ${def.slug}
version: 1.0.0
description: "${def.description.replace(/"/g, '\\"')}"
author: Dune Themes
license: MIT
source: https://github.com/duneorg/dune-themes/tree/main/packages/theme-${def.slug}
attribution: "Design inspired by ${def.upstream} (${def.upstreamLicense}) — Dune-native theme, not a port"
${configSchemaYaml(def)}`;
}

import { THEME_PACKAGE_MOD_TS, themeDenoJson } from "./theme-package.ts";

async function writeTheme(def: ThemeDef): Promise<void> {
  const dir = join(ROOT, "packages", `theme-${def.slug}`);
  await Deno.mkdir(join(dir, "templates"), { recursive: true });
  await Deno.mkdir(join(dir, "components"), { recursive: true });
  await Deno.mkdir(join(dir, "static"), { recursive: true });
  await Deno.mkdir(join(dir, "locales"), { recursive: true });

  await Deno.writeTextFile(join(dir, "theme.yaml"), themeYaml(def));
  await Deno.writeTextFile(join(dir, "mod.ts"), THEME_PACKAGE_MOD_TS);
  await Deno.writeTextFile(join(dir, "deno.json"), themeDenoJson({ slug: def.slug }));
  await Deno.writeTextFile(join(dir, "components", "layout.tsx"), layoutTsx(def));
  await Deno.writeTextFile(join(dir, "templates", "default.tsx"), defaultTemplate());
  await Deno.writeTextFile(join(dir, "templates", "post.tsx"), postTemplate());
  await Deno.writeTextFile(join(dir, "templates", "error.tsx"), errorTemplate());
  await Deno.writeTextFile(join(dir, "templates", "search.tsx"), searchTemplate());
  if (needsBlogTemplate(def)) {
    await Deno.writeTextFile(join(dir, "templates", "blog.tsx"), blogTemplate());
  }
  if (needsSectionTemplate(def)) {
    await Deno.writeTextFile(join(dir, "templates", "section.tsx"), sectionTemplate());
  }
  await Deno.writeTextFile(join(dir, "locales", "en.json"), localesEnJson());
  await Deno.writeTextFile(join(dir, "static", "style.css"), cssBlock(def).trim() + "\n");

  console.log(`  ✓ packages/theme-${def.slug}`);
}

async function writeRegistry(): Promise<void> {
  const registry = buildRegistryJson();

  // Preserve per-release fields (sha256, downloads) that `deno task release`
  // writes per-slug — catalog.ts has no notion of them, so a fresh
  // buildRegistryJson() would otherwise wipe every theme's release metadata
  // back to blank each time scaffold runs.
  const registryPath = join(ROOT, "registry.json");
  try {
    const previous = JSON.parse(await Deno.readTextFile(registryPath)) as ReturnType<
      typeof buildRegistryJson
    >;
    const bySlug = new Map(previous.themes.map((t) => [t.slug, t]));
    for (const entry of registry.themes) {
      const prev = bySlug.get(entry.slug);
      if (prev) {
        entry.sha256 = prev.sha256;
        entry.downloads = prev.downloads;
      }
    }
  } catch {
    // No existing registry.json (first run) — nothing to preserve.
  }

  await Deno.writeTextFile(
    registryPath,
    JSON.stringify(registry, null, 2) + "\n",
  );
  console.log(`  ✓ registry.json (${registry.themes.length} themes)`);
}

console.log("Scaffolding theme packages…\n");
for (const slug of RETIRED_PACKAGE_SLUGS) {
  const retired = join(ROOT, "packages", `theme-${slug}`);
  try {
    await Deno.remove(retired, { recursive: true });
    console.log(`  − removed packages/theme-${slug} (retired slug)`);
  } catch {
    // already gone
  }
}
for (const def of THEME_DEFS) {
  await writeTheme(def);
}
await writeRegistry();
console.log("\nDone. Run deno task pack:all to build ZIPs.");
