/**
 * Salon — magazine-style blog inspired by Ghost Liebling.
 * Featured lead post, card grid, bold covers, tag chips.
 */

import type { ThemeDef } from "../theme-defs.ts";
import type { ThemeCustomization } from "./types.ts";

export const salonCustomization: ThemeCustomization = {
  cssExtra: () => `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Source+Sans+3:wght@400;600;700&display=swap');

html.dark {
  --bg-dark: #121212;
  --bg-alt-dark: #1c1c1c;
  --text-dark: #f5f5f5;
  --muted-dark: #a3a3a3;
  --border-dark: #2e2e2e;
}

body { font-family: 'Source Sans 3', system-ui, sans-serif; }
.site-header.salon-header {
  padding: 1rem 1.5rem; border-bottom: 1px solid var(--border); background: var(--bg);
}
.salon-header-inner {
  display: flex; align-items: center; gap: 1rem; max-width: 1140px; margin: 0 auto; width: 100%;
}
.site-logo.salon-logo {
  font-family: 'Playfair Display', Georgia, serif; font-weight: 800; font-size: 1.5rem;
}
.site-nav.salon-nav { margin-left: auto; }
.site-nav.salon-nav a { font-weight: 600; font-size: 0.9rem; text-transform: capitalize; }

.salon-masthead {
  text-align: center; padding: 2.5rem 1.5rem 1.5rem; max-width: 720px; margin: 0 auto;
}
.salon-masthead h1 {
  font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800; margin-bottom: 0.5rem;
}
.salon-masthead p { color: var(--muted); font-size: 1.05rem; }

.salon-featured {
  max-width: 1140px; margin: 0 auto 2.5rem; padding: 0 1.5rem;
}
.salon-featured-link {
  display: block; position: relative; border-radius: 12px; overflow: hidden;
  color: #fff; text-decoration: none !important; min-height: 420px;
}
.salon-featured-link img {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
}
.salon-featured-link::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%);
}
.salon-featured-body {
  position: absolute; left: 0; right: 0; bottom: 0; padding: 2rem; z-index: 1;
}
.salon-featured-body .tag { display: inline-block; margin-bottom: 0.75rem; }
.salon-featured-body h2 {
  font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800; line-height: 1.15; margin-bottom: 0.75rem;
}
.salon-featured-body p { opacity: 0.9; max-width: 640px; line-height: 1.6; }
.salon-featured-meta { font-size: 0.85rem; opacity: 0.85; margin-top: 0.75rem; }

.salon-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem; max-width: 1140px; margin: 0 auto; padding: 0 1.5rem 3rem;
}
.salon-card {
  border-radius: 12px; overflow: hidden; background: var(--bg);
  border: 1px solid var(--border); transition: transform 0.2s, box-shadow 0.2s;
}
.salon-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); }
.salon-card img { width: 100%; height: 200px; object-fit: cover; display: block; }
.salon-card-body { padding: 1.25rem; }
.salon-card h3 {
  font-family: 'Playfair Display', Georgia, serif; font-size: 1.2rem; font-weight: 700;
  line-height: 1.3; margin-bottom: 0.5rem;
}
.salon-card h3 a { color: var(--text); text-decoration: none; }
.salon-card h3 a:hover { color: var(--accent); }
.salon-card p { color: var(--muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.75rem; }
.salon-card-meta { font-size: 0.8rem; color: var(--muted); font-weight: 600; }

.tag {
  display: inline-block; background: var(--accent); color: #fff;
  padding: 0.2rem 0.65rem; border-radius: 999px; font-size: 0.7rem;
  font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; text-decoration: none;
}
.salon-card .tag { background: color-mix(in srgb, var(--accent) 15%, transparent); color: var(--accent); }

.salon-post-header {
  max-width: 760px; margin: 0 auto; padding: 2.5rem 1.5rem 0; text-align: center;
}
.salon-post-header h1 {
  font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800; line-height: 1.15; margin: 0.75rem 0 1rem;
}
.salon-post-meta { color: var(--muted); font-weight: 600; font-size: 0.9rem; }
.salon-post-cover {
  max-width: 960px; margin: 2rem auto; padding: 0 1.5rem;
}
.salon-post-cover img { width: 100%; border-radius: 12px; max-height: 480px; object-fit: cover; }
.salon-post-content {
  max-width: 680px; margin: 0 auto; padding: 0 1.5rem 3rem;
  font-size: 1.0625rem; line-height: 1.75;
}
.salon-post-content h2 { font-family: 'Playfair Display', Georgia, serif; margin: 2rem 0 0.75rem; }
.salon-post-tags { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; margin-top: 1rem; }

.site-footer.salon-footer { border-top: 1px solid var(--border); padding: 2rem 1.5rem; text-align: center; }
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
  const accent = (themeConfig?.accent_color as string) ?? "${def.cssVars["--accent"] ?? "#ff5722"}";
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
        <header class="site-header salon-header">
          <div class="salon-header-inner">
            <a class="site-logo salon-logo" href="/">{site?.title ?? "${def.name}"}</a>
            <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
            <nav id="main-nav" class="site-nav salon-nav" aria-label="Main">
              {(nav ?? []).slice(0, 8).map((item) => (
                <a key={item.route} href={item.route} class={currentPath === item.route ? "active" : ""}>
                  {item.navTitle ?? item.frontmatter?.title ?? item.route}
                </a>
              ))}
            </nav>
            <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
          </div>
        </header>
        {children}
        <footer class="site-footer salon-footer">
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

export default function PostTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const tags: string[] = (fm.taxonomy as Record<string, string[]>)?.tag ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const primaryTag = tags[0];

  return (
    <LayoutComponent {...props}>
      <header class="salon-post-header">
        {primaryTag && <a class="tag" href={\`/tag:\${encodeURIComponent(primaryTag)}\`}>{primaryTag}</a>}
        <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
        <div class="salon-post-meta">
          {date && (
            <time datetime={new Date(date).toISOString()}>
              {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
            </time>
          )}
          {fm.author && <span>&nbsp;·&nbsp;{String(fm.author)}</span>}
        </div>
        {tags.length > 1 && (
          <div class="salon-post-tags">
            {tags.slice(1).map((t) => (
              <a class="tag" key={t} href={\`/tag:\${encodeURIComponent(t)}\`} style="background:color-mix(in srgb, var(--accent) 15%, transparent);color:var(--accent)">{t}</a>
            ))}
          </div>
        )}
      </header>
      {cover && (
        <div class="salon-post-cover"><img src={cover} alt="" /></div>
      )}
      <article class="salon-post-content prose">
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
`,

  blogTemplate: () => `/** @jsxImportSource preact */
import { formatDate, truncate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

function postTags(fm: Record<string, unknown>): string[] {
  return (fm.taxonomy as Record<string, string[]>)?.tag ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
}

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
  const items = collection?.items ?? [];
  const [featured, ...rest] = items;
  const subtitle = (themeConfig?.home_subtitle as string) ||
    (page.frontmatter.metadata as Record<string, unknown>)?.description;

  return (
    <LayoutComponent {...props}>
      <div class="salon-masthead">
        {page.frontmatter.title && <h1>{page.frontmatter.title}</h1>}
        {subtitle && <p>{String(subtitle)}</p>}
      </div>
      {children}
      {featured && (
        <section class="salon-featured">
          <a class="salon-featured-link" href={featured.route}>
            {typeof featured.frontmatter.cover === "string" && (
              <img src={featured.frontmatter.cover as string} alt="" />
            )}
            <div class="salon-featured-body">
              {postTags(featured.frontmatter)[0] && (
                <span class="tag">{postTags(featured.frontmatter)[0]}</span>
              )}
              <h2>{String(featured.frontmatter.title)}</h2>
              {(featured.frontmatter.metadata as Record<string, unknown>)?.description && (
                <p>{String((featured.frontmatter.metadata as Record<string, unknown>).description)}</p>
              )}
              <div class="salon-featured-meta">
                {featured.frontmatter.date && formatDate(new Date(String(featured.frontmatter.date)).getTime(), page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>
          </a>
        </section>
      )}
      <div class="salon-grid">
        {rest.map((post) => {
          const date = post.frontmatter.date ? new Date(String(post.frontmatter.date)).getTime() : undefined;
          const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
          const summary = meta.description ??
            (post.excerpt ? truncate(post.excerpt.replace(/<[^>]+>/g, ""), 120) : "");
          const tags = postTags(post.frontmatter);
          const cover = typeof post.frontmatter.cover === "string" ? post.frontmatter.cover : undefined;
          return (
            <article class="salon-card" key={post.route}>
              {cover && <a href={post.route}><img src={cover} alt="" /></a>}
              <div class="salon-card-body">
                {tags[0] && <a class="tag" href={\`/tag:\${encodeURIComponent(tags[0])}\`}>{tags[0]}</a>}
                <h3><a href={post.route}>{String(post.frontmatter.title)}</a></h3>
                {summary && <p>{String(summary)}</p>}
                <div class="salon-card-meta">
                  {date && formatDate(date, page.language ?? "en", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="pagination" aria-label="Pagination" style="justify-content:center;padding-bottom:2rem">
          {collection?.hasPrev && <a href={\`\${page.route}/page:\${(collection.page ?? 2) - 1}\`}>← Newer</a>}
          {collection?.hasNext && <a href={\`\${page.route}/page:\${(collection.page ?? 1) + 1}\`}>Older →</a>}
        </nav>
      )}
    </LayoutComponent>
  );
}
`,

  configSchemaYaml: (def: ThemeDef) => {
    const accent = def.cssVars["--accent"] ?? "#ff5722";
    return `config_schema:
  accent_color:
    type: color
    label: Accent colour
    default: "${accent}"
  default_dark:
    type: toggle
    label: Default to dark mode
    default: false
  home_subtitle:
    type: text
    label: Magazine tagline
    default: "Stories worth reading"
  footer_text:
    type: text
    label: Footer text (leave empty for default)
    default: ""
`;
  },
};
