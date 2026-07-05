#!/usr/bin/env -S deno run -A
/**
 * Scaffold HTML5 UP theme packages from HTML5UP_THEME_DEFS.
 * Graduated themes (hand-maintained under packages/) are excluded in html5up-defs.ts.
 */

import { join } from "@std/path";
import { HTML5UP_THEME_DEFS } from "./html5up-defs.ts";
import {
  html5UpReadme,
  html5UpThemeYamlAttribution,
  html5UpConfigSchemaExtra,
} from "./html5up-common.ts";
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
import type { ThemeDef } from "./theme-defs.ts";
import { THEME_PACKAGE_MOD_TS, themeDenoJson } from "./theme-package.ts";

const ROOT = new URL("..", import.meta.url).pathname;

function html5UpLayoutTsx(def: ThemeDef): string {
  const base = layoutTsx(def);
  const footerPatch = `{footerText || (
            <>
              © {new Date().getFullYear()} {site?.title ?? "${def.name}"} ·{" "}
              {(themeConfig?.show_html5up_credit !== false) && (
                <>
                  <a href="https://html5up.net/${def.slug}">${def.name} by HTML5 UP</a> ·{" "}
                </>
              )}
              Powered by <a href="https://getdune.org">Dune</a>
            </>
          )}`;
  return base.replace(
    `{footerText || <>© {new Date().getFullYear()} {site?.title ?? "${def.name}"} · Powered by <a href="https://getdune.org">Dune</a></>}`,
    footerPatch,
  );
}

function html5UpThemeYaml(def: ThemeDef): string {
  const baseSchema = configSchemaYaml(def).trimEnd();
  const withCredit = baseSchema.replace(
    /footer_text:[\s\S]*?default: ""\n/,
    `$&${html5UpConfigSchemaExtra()}`,
  );
  return `name: ${def.slug}
version: 1.0.0
description: "${def.description.replace(/"/g, '\\"')}"
author: Dune Themes
license: MIT
source: https://github.com/duneorg/dune-themes/tree/main/packages/theme-${def.slug}
${html5UpThemeYamlAttribution(def)}
${withCredit}
`;
}

function cssBlock(def: ThemeDef): string {
  const v = def.cssVars;
  const vars = Object.entries(v).map(([k, val]) => `  ${k}: ${val};`).join("\n");
  return `
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
.html5up-attribution { font-size: 0.85rem; color: var(--muted); }
${baselineCssExtra(def)}
`.trim() + "\n";
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

  return (
    <LayoutComponent {...props}>
      <article class="prose">
        <h1>{page.frontmatter.title}</h1>
        {date && <div class="post-meta"><time>{date}</time></div>}
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

async function writeTheme(def: ThemeDef): Promise<void> {
  const dir = join(ROOT, "packages", `theme-${def.slug}`);
  await Deno.mkdir(join(dir, "templates"), { recursive: true });
  await Deno.mkdir(join(dir, "components"), { recursive: true });
  await Deno.mkdir(join(dir, "static"), { recursive: true });
  await Deno.mkdir(join(dir, "locales"), { recursive: true });

  await Deno.writeTextFile(join(dir, "theme.yaml"), html5UpThemeYaml(def));
  await Deno.writeTextFile(join(dir, "README.md"), html5UpReadme(def));
  await Deno.writeTextFile(join(dir, "mod.ts"), THEME_PACKAGE_MOD_TS);
  await Deno.writeTextFile(join(dir, "deno.json"), themeDenoJson({ slug: def.slug }));
  await Deno.writeTextFile(join(dir, "components", "layout.tsx"), html5UpLayoutTsx(def));
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
  await Deno.writeTextFile(join(dir, "static", "style.css"), cssBlock(def));

  console.log(`  ✓ packages/theme-${def.slug}`);
}

console.log(`Scaffolding ${HTML5UP_THEME_DEFS.length} HTML5 UP theme packages…\n`);
for (const def of HTML5UP_THEME_DEFS) {
  await writeTheme(def);
}
console.log("\nDone. Customize CSS/layout per theme, then graduate to catalog.ts.");
