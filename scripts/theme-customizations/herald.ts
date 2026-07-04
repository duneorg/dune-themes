/**
 * Herald — publication blog inspired by Ghost Casper.
 * Dark masthead, full-width hero, large covers, author bylines.
 */

import type { ThemeDef } from "../theme-defs.ts";
import type { ThemeCustomization } from "./types.ts";

export const heraldCustomization: ThemeCustomization = {
  cssExtra: () => `
html.dark {
  --bg-dark: #0a0c0d;
  --bg-alt-dark: #15171a;
  --text-dark: #eef2f4;
  --muted-dark: #8b9aab;
  --border-dark: #2a2f35;
  --header-bg-dark: #0a0c0d;
}

.site-header.herald-header {
  background: var(--header-bg, #15171a); border-bottom: none; padding: 0 1.5rem; min-height: 64px;
}
.herald-header-inner {
  display: flex; align-items: center; gap: 1rem; max-width: 1040px; margin: 0 auto; width: 100%;
}
.site-logo.herald-logo { color: #fff; font-weight: 700; font-size: 1.2rem; }
.site-logo.herald-logo:hover { color: #fff; opacity: 0.9; }
.site-nav.herald-nav a { color: rgba(255,255,255,0.72); font-size: 0.9rem; font-weight: 500; }
.site-nav.herald-nav a:hover, .site-nav.herald-nav a.active { color: #fff; text-decoration: none; }
.herald-header .theme-toggle { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.72); }
.herald-header .nav-toggle { border-color: rgba(255,255,255,0.25); color: #fff; }

.herald-hero {
  position: relative; min-height: 420px; display: flex; align-items: flex-end;
  color: #fff; background: var(--header-bg, #15171a); overflow: hidden;
}
.herald-hero-bg {
  position: absolute; inset: 0; background-size: cover; background-position: center;
}
.herald-hero-bg::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 100%);
}
.herald-hero-content {
  position: relative; z-index: 1; max-width: 1040px; margin: 0 auto; width: 100%;
  padding: 4rem 1.5rem 3rem;
}
.herald-hero-content h1 {
  font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; line-height: 1.1;
  letter-spacing: -0.03em; margin-bottom: 0.75rem; max-width: 720px;
}
.herald-hero-content p { font-size: 1.15rem; opacity: 0.88; max-width: 560px; line-height: 1.6; }

.herald-feed { max-width: 1040px; margin: 0 auto; padding: 2.5rem 1.5rem 3rem; }
.herald-feed-head { margin-bottom: 2rem; }
.herald-feed-head h2 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); font-weight: 700; }

.herald-card {
  display: grid; grid-template-columns: 1fr 280px; gap: 2rem;
  padding: 2rem 0; border-bottom: 1px solid var(--border); align-items: start;
}
.herald-card:last-child { border-bottom: none; }
.herald-card-text h3 { font-size: 1.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
.herald-card-text h3 a { color: var(--text); text-decoration: none; }
.herald-card-text h3 a:hover { color: var(--accent); }
.herald-card-text p { color: var(--muted); line-height: 1.65; margin-bottom: 1rem; }
.herald-card-meta { display: flex; align-items: center; gap: 0.65rem; font-size: 0.875rem; color: var(--muted); }
.herald-avatar {
  width: 32px; height: 32px; border-radius: 50%; object-fit: cover; background: var(--bg-alt);
}
.herald-card-cover img { width: 100%; height: 180px; object-fit: cover; border-radius: 8px; display: block; }

.herald-post-cover { width: 100%; max-height: 520px; object-fit: cover; display: block; }
.herald-post-wrap { max-width: 720px; margin: 0 auto; padding: 2.5rem 1.5rem 3rem; }
.herald-post-wrap h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 1rem; }
.herald-post-meta { display: flex; align-items: center; gap: 0.65rem; color: var(--muted); font-size: 0.9rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
.herald-post-content { line-height: 1.75; font-size: 1.0625rem; }
.herald-post-content h2 { font-size: 1.35rem; margin: 2rem 0 0.75rem; }

@media (max-width: 768px) {
  .herald-card { grid-template-columns: 1fr; }
  .herald-card-cover { order: -1; }
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
  const accent = (themeConfig?.accent_color as string) ?? "${def.cssVars["--accent"] ?? "#3eb0ef"}";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const isHome = currentPath === "/";
  const heroImage = (themeConfig?.hero_image as string) || "";

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
        <header class="site-header herald-header">
          <div class="herald-header-inner">
            <a class="site-logo herald-logo" href="/">{site?.title ?? "${def.name}"}</a>
            <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
            <nav id="main-nav" class="site-nav herald-nav" aria-label="Main">
              {(nav ?? []).slice(0, 8).map((item) => (
                <a key={item.route} href={item.route} class={currentPath === item.route ? "active" : ""}>
                  {item.navTitle ?? item.frontmatter?.title ?? item.route}
                </a>
              ))}
            </nav>
            <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
          </div>
        </header>
        {isHome && (
          <section class="herald-hero">
            {heroImage && <div class="herald-hero-bg" style={{ backgroundImage: \`url(\${heroImage})\` }} />}
            <div class="herald-hero-content">
              <h1>{(themeConfig?.hero_title as string) || site?.title || "${def.name}"}</h1>
              <p>{(themeConfig?.hero_subtitle as string) || site?.description || "Thoughts, stories and ideas."}</p>
            </div>
          </section>
        )}
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

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const author = typeof fm.author === "string" ? fm.author : (themeConfig?.default_author as string) ?? "";
  const avatar = typeof fm.avatar === "string" ? fm.avatar : (themeConfig?.default_avatar as string) ?? "";

  return (
    <LayoutComponent {...props}>
      {cover && <img class="herald-post-cover" src={cover} alt="" />}
      <article class="herald-post-wrap">
        <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
        <div class="herald-post-meta">
          {avatar && <img class="herald-avatar" src={avatar} alt="" />}
          {author && <span>{author}</span>}
          {date && (
            <>
              {author && <span>·</span>}
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            </>
          )}
        </div>
        <div class="herald-post-content prose">{children}</div>
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
  const defaultAuthor = (themeConfig?.default_author as string) ?? "";
  const defaultAvatar = (themeConfig?.default_avatar as string) ?? "";

  return (
    <LayoutComponent {...props}>
      <div class="herald-feed">
        <div class="herald-feed-head"><h2>{page.frontmatter.title || "Latest"}</h2></div>
        {children}
        {(collection?.items ?? []).map((post) => {
          const date = post.frontmatter.date ? new Date(String(post.frontmatter.date)).getTime() : undefined;
          const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
          const summary = meta.description ??
            (post.excerpt ? truncate(post.excerpt.replace(/<[^>]+>/g, ""), 200) : "");
          const author = typeof post.frontmatter.author === "string" ? post.frontmatter.author : defaultAuthor;
          const avatar = typeof post.frontmatter.avatar === "string" ? post.frontmatter.avatar : defaultAvatar;
          const cover = typeof post.frontmatter.cover === "string" ? post.frontmatter.cover : undefined;
          return (
            <article class="herald-card" key={post.route}>
              <div class="herald-card-text">
                <h3><a href={post.route}>{String(post.frontmatter.title)}</a></h3>
                {summary && <p>{String(summary)}</p>}
                <div class="herald-card-meta">
                  {avatar && <img class="herald-avatar" src={avatar} alt="" />}
                  {author && <span>{author}</span>}
                  {date && (
                    <>
                      <span>·</span>
                      <time datetime={new Date(date).toISOString()}>
                        {formatDate(date, page.language ?? "en", { month: "short", day: "numeric", year: "numeric" })}
                      </time>
                    </>
                  )}
                </div>
              </div>
              {cover && (
                <div class="herald-card-cover"><a href={post.route}><img src={cover} alt="" /></a></div>
              )}
            </article>
          );
        })}
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
    const accent = def.cssVars["--accent"] ?? "#3eb0ef";
    return `config_schema:
  accent_color:
    type: color
    label: Accent colour
    default: "${accent}"
  default_dark:
    type: toggle
    label: Default to dark mode
    default: false
  hero_title:
    type: text
    label: Home hero headline (empty = site title)
    default: ""
  hero_subtitle:
    type: text
    label: Home hero subtitle
    default: "Thoughts, stories and ideas."
  hero_image:
    type: text
    label: Home hero background image URL
    default: ""
  default_author:
    type: text
    label: Default author name
    default: ""
  default_avatar:
    type: text
    label: Default author avatar URL
    default: ""
  footer_text:
    type: text
    label: Footer text (leave empty for default)
    default: ""
`;
  },
};
