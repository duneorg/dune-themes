/**
 * Syntax — technical blog inspired by Jekyll Chirpy.
 * GitHub-adjacent palette, tag chips, post meta rail, compact index.
 */

import type { ThemeDef } from "../theme-defs.ts";
import type { ThemeCustomization } from "./types.ts";

export const syntaxCustomization: ThemeCustomization = {
  cssExtra: () => `
html.dark {
  --bg-dark: #0d1117;
  --bg-alt-dark: #161b22;
  --text-dark: #e6edf3;
  --muted-dark: #8b949e;
  --border-dark: #30363d;
}

.site-header.syntax-header {
  padding: 0 1.25rem; min-height: 56px; border-bottom: 1px solid var(--border);
  background: var(--bg-alt);
}
.syntax-header-inner {
  display: flex; align-items: center; gap: 1rem; max-width: 960px; margin: 0 auto; width: 100%;
}
.site-logo.syntax-logo { font-weight: 700; font-size: 1rem; font-family: var(--font-mono, monospace); }
.site-nav.syntax-nav { margin-left: auto; }
.site-nav.syntax-nav a { font-size: 0.875rem; font-weight: 500; color: var(--muted); }
.syntax-search-link {
  font-size: 0.875rem; color: var(--muted); margin-left: 0.5rem; text-decoration: none;
}
.syntax-search-link:hover { color: var(--accent); }

.syntax-post-wrap { max-width: 960px; margin: 0 auto; padding: 2rem 1.25rem 3rem; }
.syntax-post-header { margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border); }
.syntax-post-header h1 { font-size: 1.75rem; line-height: 1.25; margin-bottom: 0.75rem; }
.syntax-post-desc { color: var(--muted); margin-bottom: 0.75rem; line-height: 1.6; }
.syntax-post-meta {
  display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;
  font-size: 0.8125rem; color: var(--muted);
}
.syntax-post-meta time { font-family: var(--font-mono, monospace); }
.syntax-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.syntax-tag {
  display: inline-block; padding: 0.15rem 0.55rem; border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent); font-size: 0.75rem; font-weight: 600; text-decoration: none;
}
.syntax-tag:hover { background: color-mix(in srgb, var(--accent) 22%, transparent); text-decoration: none; }
.syntax-pin {
  display: inline-flex; align-items: center; gap: 0.25rem;
  color: var(--accent); font-weight: 600; font-size: 0.75rem;
}

.syntax-content { max-width: var(--max-width, 760px); line-height: 1.7; }
.syntax-content pre {
  border: 1px solid var(--border); border-radius: 6px; font-size: 0.8125rem;
}
.syntax-content code { font-size: 0.875em; }
.syntax-content h2 { font-size: 1.25rem; margin-top: 2rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border); }
.syntax-content h3 { font-size: 1.05rem; margin-top: 1.5rem; }

.syntax-index { max-width: 960px; margin: 0 auto; padding: 2rem 1.25rem 3rem; }
.syntax-index-head { margin-bottom: 1.5rem; }
.syntax-index-head h1 { font-size: 1.5rem; margin-bottom: 0.35rem; }
.syntax-index-head p { color: var(--muted); }
.syntax-list { list-style: none; padding: 0; }
.syntax-list li {
  padding: 1rem 0; border-bottom: 1px solid var(--border);
  display: grid; grid-template-columns: 7rem 1fr; gap: 1rem; align-items: start;
}
.syntax-list li:last-child { border-bottom: none; }
.syntax-list-date {
  font-family: var(--font-mono, monospace); font-size: 0.75rem; color: var(--muted);
  padding-top: 0.15rem;
}
.syntax-list-body h2 { font-size: 1.05rem; font-weight: 600; margin-bottom: 0.35rem; line-height: 1.35; }
.syntax-list-body h2 a { color: var(--text); text-decoration: none; }
.syntax-list-body h2 a:hover { color: var(--accent); }
.syntax-list-body p { color: var(--muted); font-size: 0.875rem; line-height: 1.55; margin-bottom: 0.5rem; }

@media (max-width: 640px) {
  .syntax-list li { grid-template-columns: 1fr; gap: 0.35rem; }
}
`,

  layoutTsx: (def: ThemeDef) => `/** @jsxImportSource preact */
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
  const accent = (themeConfig?.accent_color as string) ?? "${def.cssVars["--accent"] ?? "#0969da"}";
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
        <header class="site-header syntax-header">
          <div class="syntax-header-inner">
            <a class="site-logo syntax-logo" href="/">{site?.title ?? "${def.name}"}</a>
            <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
            <nav id="main-nav" class="site-nav syntax-nav" aria-label="Main">
              {(nav ?? []).slice(0, 8).map((item) => (
                <a key={item.route} href={item.route} class={currentPath === item.route ? "active" : ""}>
                  {item.navTitle ?? item.frontmatter?.title ?? item.route}
                </a>
              ))}
            </nav>
            <a class="syntax-search-link" href="/search">Search</a>
            <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
          </div>
        </header>
        {children}
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
`,

  postTemplate: () => `/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

function tags(fm: Record<string, unknown>): string[] {
  return (fm.taxonomy as Record<string, string[]>)?.tag ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
}

export default async function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const tagList = tags(fm);
  const pinned = fm.pinned === true;

  let readingTime = "";
  if (themeConfig?.show_reading_time !== false) {
    const text = (await page.html()).replace(/<[^>]+>/g, " ");
    const words = text.split(/\\s+/).filter(Boolean).length;
    readingTime = \`\${Math.max(1, Math.round(words / 200))} min\`;
  }

  return (
    <LayoutComponent {...props}>
      <article class="syntax-post-wrap">
        <header class="syntax-post-header">
          {pinned && <span class="syntax-pin">📌 Pinned</span>}
          <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
          {meta.description && <p class="syntax-post-desc">{String(meta.description)}</p>}
          <div class="syntax-post-meta">
            {date && (
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", { day: "numeric", month: "short", year: "numeric" })}
              </time>
            )}
            {readingTime && <span>{readingTime}</span>}
            {fm.author && <span>{String(fm.author)}</span>}
            {tagList.length > 0 && (
              <div class="syntax-tags">
                {tagList.map((t) => (
                  <a class="syntax-tag" key={t} href={\`/tag:\${encodeURIComponent(t)}\`}>{t}</a>
                ))}
              </div>
            )}
          </div>
        </header>
        <div class="syntax-content prose">{children}</div>
      </article>
    </LayoutComponent>
  );
}
`,

  blogTemplate: () => `/** @jsxImportSource preact */
import { formatDate, truncate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
  collection?: {
    items?: Array<{ route: string; frontmatter: Record<string, unknown>; excerpt?: string }>;
    hasPrev?: boolean;
    hasNext?: boolean;
    page?: number;
  };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, themeConfig } = props;
  const subtitle = (themeConfig?.home_subtitle as string) ||
    (page.frontmatter.metadata as Record<string, unknown>)?.description;

  return (
    <LayoutComponent {...props}>
      <div class="syntax-index">
        <div class="syntax-index-head">
          <h1>{page.frontmatter.title || "Posts"}</h1>
          {subtitle && <p>{String(subtitle)}</p>}
        </div>
        {children}
        <ul class="syntax-list">
          {(collection?.items ?? []).map((post) => {
            const date = post.frontmatter.date ? new Date(String(post.frontmatter.date)).getTime() : undefined;
            const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
            const summary = meta.description ??
              (post.excerpt ? truncate(post.excerpt.replace(/<[^>]+>/g, ""), 160) : "");
            const tags = (post.frontmatter.taxonomy as Record<string, string[]>)?.tag ??
              (Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags as string[] : []);
            return (
              <li key={post.route}>
                <div class="syntax-list-date">
                  {date && formatDate(date, page.language ?? "en", { month: "short", day: "numeric", year: "numeric" })}
                </div>
                <div class="syntax-list-body">
                  <h2>
                    {post.frontmatter.pinned === true && <span class="syntax-pin">📌 </span>}
                    <a href={post.route}>{String(post.frontmatter.title)}</a>
                  </h2>
                  {summary && <p>{String(summary)}</p>}
                  {tags.length > 0 && (
                    <div class="syntax-tags">
                      {tags.slice(0, 4).map((t) => (
                        <a class="syntax-tag" key={t} href={\`/tag:\${encodeURIComponent(t)}\`}>{t}</a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {(collection?.hasPrev || collection?.hasNext) && (
          <nav class="pagination" aria-label="Pagination">
            {collection?.hasPrev && <a href={\`\${page.route}/page:\${(collection.page ?? 2) - 1}\`}>← Newer</a>}
            {collection?.hasNext && <a href={\`\${page.route}/page:\${(collection.page ?? 1) + 1}\`}>Older →</a>}
          </nav>
        )}
      </div>
    </LayoutComponent>
  );
}
`,

  configSchemaYaml: (def: ThemeDef) => {
    const accent = def.cssVars["--accent"] ?? "#0969da";
    return `config_schema:
  accent_color:
    type: color
    label: Accent colour
    default: "${accent}"
  default_dark:
    type: toggle
    label: Default to dark mode
    default: false
  show_reading_time:
    type: toggle
    label: Show reading time on posts
    default: true
  home_subtitle:
    type: text
    label: Blog subtitle
    default: "Technical notes and tutorials"
  footer_text:
    type: text
    label: Footer text (leave empty for default)
    default: ""
`;
  },
};
