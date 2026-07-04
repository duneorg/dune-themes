/**
 * Full Dune baseline for scaffold-managed inspired themes.
 * Hand-maintained themes (Sirocco, Caravan, …) exceed this bar; scaffolds match it.
 */

import type { ThemeDef } from "./theme-defs.ts";

const BLOG_ARCHETYPES = new Set([
  "blog-minimal",
  "blog-hero",
  "blog-magazine",
  "blog-tech",
  "landing",
]);

const DOCS_ARCHETYPES = new Set(["docs-sidebar", "docs-modern"]);

export function baselineCssExtra(def: ThemeDef): string {
  return `
html.dark {
  --bg: var(--bg-dark, #0f1117);
  --bg-alt: var(--bg-alt-dark, #1a1d27);
  --text: var(--text-dark, #e6edf3);
  --muted: var(--muted-dark, #8b949e);
  --border: var(--border-dark, #30363d);
  --header-bg: var(--header-bg-dark, var(--bg-alt-dark, #1a1d27));
  --sidebar-bg: var(--sidebar-bg-dark, var(--bg-alt-dark, #1a1d27));
}
.theme-toggle {
  background: none; border: 1px solid var(--border); border-radius: var(--radius);
  padding: 0.35rem 0.5rem; cursor: pointer; color: var(--muted); margin-left: 0.5rem;
}
.theme-toggle:hover { color: var(--accent); border-color: var(--accent); }
.nav-toggle {
  display: none; background: none; border: 1px solid var(--border); border-radius: var(--radius);
  padding: 0.35rem 0.6rem; cursor: pointer; color: var(--text); margin-left: auto;
}
@media (max-width: 768px) {
  .nav-toggle { display: block; }
  .site-nav { display: none; width: 100%; flex-direction: column; gap: 0.25rem; padding: 0.75rem 0; }
  .site-nav.is-open { display: flex; }
  .site-header { flex-wrap: wrap; }
}
.search-results ol { list-style: none; padding: 0; }
.search-results li { padding: 0.75rem 0; border-bottom: 1px solid var(--border); }
.search-results li p { color: var(--muted); font-size: 0.875rem; margin-top: 0.25rem; }
.search-form { display: flex; gap: 0.5rem; margin: 1rem 0 1.5rem; flex-wrap: wrap; }
.search-form input[type="search"] {
  flex: 1; min-width: 200px; padding: 0.5rem 0.75rem;
  border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg); color: var(--text);
}
.search-form button {
  padding: 0.5rem 1rem; border: none; border-radius: var(--radius);
  background: var(--accent); color: #fff; cursor: pointer; font-weight: 600;
}
.entry-list { display: flex; flex-direction: column; gap: 2rem; margin-top: 1.5rem; }
.entry h2 { font-size: 1.25rem; margin-bottom: 0.35rem; }
.entry h2 a { color: var(--text); text-decoration: none; }
.entry h2 a:hover { color: var(--accent); }
.pagination { display: flex; gap: 1rem; margin-top: 2rem; font-size: 0.9rem; }
.pagination a { color: var(--accent); }
${def.archetype === "blog-magazine" ? "" : ""}
`;
}

export function layoutTsx(def: ThemeDef): string {
  const isDocs = DOCS_ARCHETYPES.has(def.archetype);

  const bodyContent = isDocs
    ? `
        <div class="docs-shell">
          <aside class="docs-sidebar" aria-label="Navigation">
            {(nav ?? []).slice(0, 48).map((item) => (
              <a key={item.route} href={item.route} class={currentPath === item.route || (item.route !== "/" && currentPath.startsWith(item.route + "/")) ? "active" : ""}>
                {item.navTitle ?? item.frontmatter?.title ?? item.route}
              </a>
            ))}
          </aside>
          <main class="docs-main">{children}</main>
        </div>`
    : `{children}`;

  let heroBlock = "";
  if (def.archetype === "landing") {
    heroBlock = `
        {currentPath === "/" && (
          <section class="hero">
            <h1>{site?.title ?? "${def.name}"}</h1>
            <p>{themeConfig?.home_subtitle || site?.description || "Built with Dune CMS"}</p>
            <a class="hero-cta" href="/blog">Get started</a>
          </section>
        )}`;
  } else if (def.archetype === "blog-hero") {
    heroBlock = `
        {currentPath === "/" && (
          <section class="hero">
            <h1>{site?.title ?? "${def.name}"}</h1>
            <p>{themeConfig?.home_subtitle || site?.description || "Stories and updates"}</p>
          </section>
        )}`;
  }

  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
}

export default function Layout({ page, pageTitle, site, config, nav, pathname, dir, children, themeConfig }: LayoutProps) {
  const themeName = config?.theme?.name ?? "${def.slug}";
  const siteUrl = (site?.url ?? "").replace(/\\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? \`\${siteUrl}\${currentPath}\` : currentPath;
  const title = pageTitle || site?.title || "${def.name}";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const accent = (themeConfig?.accent_color as string) ?? "${def.cssVars["--accent"] ?? "#6366f1"}";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"} class={defaultDark ? "dark" : ""}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        {description && <meta name="description" content={String(description)} />}
        {siteUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={String(description)} />}
        {siteUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href={\`/themes/\${themeName}/static/style.css\`} />
        <style dangerouslySetInnerHTML={{ __html: \`:root{--accent:\${accent}}\` }} />
        <script dangerouslySetInnerHTML={{ __html: \`
          (function(){var s=localStorage.getItem('theme-${def.slug}');
          if(s==='dark'||(s===null&&\${defaultDark ? "true" : "false"})){document.documentElement.classList.add('dark')}
          else if(s==='light'){document.documentElement.classList.remove('dark')}})();
        \` }} />
      </head>
      <body class="theme-${def.slug} archetype-${def.archetype}">
        <header class="site-header">
          <a class="site-logo" href="/">{site?.title ?? "${def.name}"}</a>
          <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
          <nav id="main-nav" class="site-nav" aria-label="Main">
            {(nav ?? []).slice(0, 10).map((item) => (
              <a key={item.route} href={item.route} class={currentPath === item.route ? "active" : ""}>
                {item.navTitle ?? item.frontmatter?.title ?? item.route}
              </a>
            ))}
          </nav>
          <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
        </header>${heroBlock}
        ${bodyContent}
        <footer class="site-footer">
          {footerText || <>© {new Date().getFullYear()} {site?.title ?? "${def.name}"} · Powered by <a href="https://getdune.org">Dune</a></>}
        </footer>
        <script dangerouslySetInnerHTML={{ __html: \`
          (function(){
            var navBtn=document.querySelector('.nav-toggle');
            var nav=document.getElementById('main-nav');
            if(navBtn&&nav){navBtn.addEventListener('click',function(){
              var open=nav.classList.toggle('is-open');
              navBtn.setAttribute('aria-expanded',open?'true':'false');
            });}
            var btn=document.getElementById('theme-toggle');
            if(!btn)return;
            btn.addEventListener('click',function(){
              var dark=document.documentElement.classList.toggle('dark');
              localStorage.setItem('theme-${def.slug}',dark?'dark':'light');
            });
          })();
        \` }} />
      </body>
    </html>
  );
}
`;
}

export function searchTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { getSearchUrl } from "@dune/core/theme-helpers";

export default function SearchTemplate(props: TemplateProps & {
  Layout?: typeof StaticLayout;
  searchQuery?: string;
  searchResults?: { route: string; title: string; excerpt?: string }[];
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { searchQuery, searchResults, t } = props;
  const tr = t ?? ((k: string) => k);
  const action = getSearchUrl("").split("?")[0];

  return (
    <LayoutComponent {...props}>
      <article class="prose">
        <h1>{tr("search.title")}</h1>
        <form class="search-form" action={action} method="get" role="search">
          <input
            type="search"
            name="q"
            value={searchQuery ?? ""}
            placeholder={tr("search.placeholder")}
            aria-label={tr("search.placeholder")}
          />
          <button type="submit">{tr("search.submit")}</button>
        </form>
        {searchQuery && (
          <section class="search-results" aria-live="polite">
            {(searchResults ?? []).length === 0
              ? <p>{tr("search.empty")}</p>
              : (
                <ol>
                  {searchResults!.map((r) => (
                    <li key={r.route}>
                      <a href={r.route}>{r.title}</a>
                      {r.excerpt && <p>{r.excerpt}</p>}
                    </li>
                  ))}
                </ol>
              )}
          </section>
        )}
      </article>
    </LayoutComponent>
  );
}
`;
}

export function blogTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination } = props;
  const items = collection?.items ?? [];

  return (
    <LayoutComponent {...props}>
      <article class="prose">
        <h1>{page.frontmatter.title}</h1>
        {children}
        <div class="entry-list">
          {items.map((post) => (
            <article class="entry" key={post.route}>
              <h2><a href={post.route}>{String(post.frontmatter.title ?? post.route)}</a></h2>
              {post.frontmatter.date && (
                <div class="post-meta"><time>{String(post.frontmatter.date)}</time></div>
              )}
              {post.frontmatter.metadata?.description && (
                <p>{String((post.frontmatter.metadata as Record<string, unknown>).description)}</p>
              )}
            </article>
          ))}
        </div>
        {(pagination?.newer || pagination?.older) && (
          <nav class="pagination" aria-label="Pagination">
            {pagination.newer && <a href={pagination.newer}>← Newer</a>}
            {pagination.older && <a href={pagination.older}>Older →</a>}
          </nav>
        )}
      </article>
    </LayoutComponent>
  );
}
`;
}

export function sectionTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function SectionTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  return (
    <LayoutComponent {...props}>
      <article class="prose">
        <h1>{page.frontmatter.title}</h1>
        {children}
      </article>
    </LayoutComponent>
  );
}
`;
}

export function localesEnJson(): string {
  return JSON.stringify({
    "theme.toggle": "Toggle dark mode",
    "search.title": "Search",
    "search.placeholder": "Search…",
    "search.submit": "Search",
    "search.empty": "No results found.",
    "error.notfound": "This page could not be found.",
    "error.home": "Back to home",
  }, null, 2) + "\n";
}

export function configSchemaYaml(def: ThemeDef): string {
  const accentDefault = def.cssVars["--accent"] ?? "#6366f1";
  return `config_schema:
  accent_color:
    type: color
    label: Accent colour
    default: "${accentDefault}"
  default_dark:
    type: toggle
    label: Default to dark mode
    default: false
  footer_text:
    type: text
    label: Footer text (leave empty for default)
    default: ""
  home_subtitle:
    type: text
    label: Home page subtitle
    default: ""
`;
}

export function needsBlogTemplate(def: ThemeDef): boolean {
  return BLOG_ARCHETYPES.has(def.archetype);
}

export function needsSectionTemplate(def: ThemeDef): boolean {
  return DOCS_ARCHETYPES.has(def.archetype);
}
