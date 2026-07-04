/**
 * Gale — landing and blog theme inspired by AstroWind.
 * SaaS-style hero, feature grid, card blog index, CTA header.
 */

import type { ThemeDef } from "../theme-defs.ts";
import type { ThemeCustomization } from "./types.ts";

export const galeCustomization: ThemeCustomization = {
  cssExtra: () => `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

html.dark {
  --bg-dark: #0b1120;
  --bg-alt-dark: #111827;
  --text-dark: #f1f5f9;
  --muted-dark: #94a3b8;
  --border-dark: #1e293b;
}

body { font-family: 'Inter', system-ui, sans-serif; font-size: 1rem; line-height: 1.6; }

.site-header.gale-header {
  padding: 0 1.5rem; min-height: 64px; border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(8px);
}
.gale-header-inner {
  display: flex; align-items: center; gap: 1rem; max-width: 1120px; margin: 0 auto; width: 100%;
}
.site-logo.gale-logo { font-weight: 800; font-size: 1.15rem; letter-spacing: -0.03em; }
.site-nav.gale-nav { margin-left: auto; gap: 0.25rem; }
.site-nav.gale-nav a {
  padding: 0.4rem 0.75rem; border-radius: 999px; font-size: 0.875rem; font-weight: 500; color: var(--muted);
}
.site-nav.gale-nav a:hover, .site-nav.gale-nav a.active {
  color: var(--text); background: var(--bg-alt); text-decoration: none;
}
.gale-cta-header {
  display: inline-flex; align-items: center; padding: 0.45rem 1rem;
  background: var(--accent); color: #fff !important; border-radius: 999px;
  font-size: 0.875rem; font-weight: 600; text-decoration: none !important; margin-left: 0.5rem;
}
.gale-cta-header:hover { filter: brightness(1.08); text-decoration: none !important; }

.gale-hero {
  padding: 5rem 1.5rem 4rem; text-align: center;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in srgb, var(--accent) 18%, transparent), transparent),
    var(--bg);
}
.gale-hero-badge {
  display: inline-block; padding: 0.35rem 0.85rem; border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent); font-size: 0.8rem; font-weight: 600; margin-bottom: 1.25rem;
}
.gale-hero h1 {
  font-size: clamp(2.25rem, 5vw, 3.25rem); font-weight: 800; letter-spacing: -0.04em;
  line-height: 1.1; max-width: 820px; margin: 0 auto 1rem;
}
.gale-hero p {
  font-size: 1.125rem; color: var(--muted); max-width: 560px; margin: 0 auto 2rem; line-height: 1.7;
}
.gale-hero-actions { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
.gale-btn {
  display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; border-radius: 999px;
  font-weight: 600; font-size: 0.95rem; text-decoration: none !important;
}
.gale-btn-primary { background: var(--accent); color: #fff !important; }
.gale-btn-primary:hover { filter: brightness(1.08); }
.gale-btn-secondary {
  background: var(--bg-alt); color: var(--text) !important; border: 1px solid var(--border);
}
.gale-btn-secondary:hover { border-color: var(--accent); color: var(--accent) !important; }

.gale-features {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem; max-width: 1120px; margin: 0 auto; padding: 0 1.5rem 4rem;
}
.gale-feature {
  padding: 1.5rem; border: 1px solid var(--border); border-radius: 12px; background: var(--bg);
  transition: box-shadow 0.2s, border-color 0.2s;
}
.gale-feature:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.06); border-color: color-mix(in srgb, var(--accent) 35%, var(--border)); }
.gale-feature-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
.gale-feature h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
.gale-feature p { color: var(--muted); font-size: 0.925rem; line-height: 1.6; margin: 0; }

.gale-section-title {
  text-align: center; max-width: 640px; margin: 0 auto 2rem; padding: 0 1.5rem;
}
.gale-section-title h2 { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.5rem; }
.gale-section-title p { color: var(--muted); }

.gale-blog-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem; max-width: 1120px; margin: 0 auto; padding: 0 1.5rem 4rem;
}
.gale-post-card {
  border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: var(--bg);
  transition: box-shadow 0.2s, transform 0.2s; display: flex; flex-direction: column;
}
.gale-post-card:hover { box-shadow: 0 16px 40px rgba(0,0,0,0.08); transform: translateY(-2px); }
.gale-post-card img { width: 100%; height: 160px; object-fit: cover; }
.gale-post-card-body { padding: 1.25rem; flex: 1; display: flex; flex-direction: column; }
.gale-post-card h2 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.35; }
.gale-post-card h2 a { color: var(--text); text-decoration: none; }
.gale-post-card h2 a:hover { color: var(--accent); }
.gale-post-card p { color: var(--muted); font-size: 0.875rem; line-height: 1.6; flex: 1; margin-bottom: 0.75rem; }
.gale-post-card time { font-size: 0.75rem; color: var(--muted); font-weight: 500; }

.gale-page-hero {
  padding: 3rem 1.5rem 2rem; text-align: center; border-bottom: 1px solid var(--border);
  background: var(--bg-alt);
}
.gale-page-hero h1 { font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; }
.gale-page-content { max-width: 720px; margin: 0 auto; padding: 2.5rem 1.5rem; }
.gale-page-content h2 { font-size: 1.35rem; margin: 2rem 0 0.75rem; }

.site-footer.gale-footer {
  border-top: 1px solid var(--border); padding: 2.5rem 1.5rem; margin-top: 0;
  background: var(--bg-alt);
}
.gale-footer-inner { max-width: 1120px; margin: 0 auto; text-align: center; }
.gale-footer-brand { font-weight: 700; margin-bottom: 0.5rem; }
.gale-footer-links { display: flex; gap: 1.25rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem; }
.gale-footer-links a { color: var(--muted); font-size: 0.875rem; text-decoration: none; }
.gale-footer-links a:hover { color: var(--accent); }

@media (max-width: 768px) {
  .gale-cta-header { display: none; }
  .gale-hero { padding-top: 3.5rem; }
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
  const accent = (themeConfig?.accent_color as string) ?? "${def.cssVars["--accent"] ?? "#6366f1"}";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const ctaLabel = (themeConfig?.header_cta_label as string) || "Get started";
  const ctaUrl = (themeConfig?.header_cta_url as string) || "/blog";
  const isHome = currentPath === "/";

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
        <header class="site-header gale-header">
          <div class="gale-header-inner">
            <a class="site-logo gale-logo" href="/">{site?.title ?? "${def.name}"}</a>
            <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
            <nav id="main-nav" class="site-nav gale-nav" aria-label="Main">
              {(nav ?? []).slice(0, 8).map((item) => (
                <a key={item.route} href={item.route} class={currentPath === item.route ? "active" : ""}>
                  {item.navTitle ?? item.frontmatter?.title ?? item.route}
                </a>
              ))}
            </nav>
            <a class="gale-cta-header" href={ctaUrl}>{ctaLabel}</a>
            <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
          </div>
        </header>
        {isHome && (
          <section class="gale-hero">
            {(themeConfig?.hero_badge as string) && (
              <span class="gale-hero-badge">{themeConfig?.hero_badge as string}</span>
            )}
            <h1>{(themeConfig?.hero_title as string) || site?.title || "${def.name}"}</h1>
            <p>{(themeConfig?.hero_subtitle as string) || themeConfig?.home_subtitle as string || site?.description || "Build faster with a modern static site."}</p>
            <div class="gale-hero-actions">
              <a class="gale-btn gale-btn-primary" href={(themeConfig?.hero_primary_url as string) || "/blog"}>
                {(themeConfig?.hero_primary_label as string) || "Get started"}
              </a>
              <a class="gale-btn gale-btn-secondary" href={(themeConfig?.hero_secondary_url as string) || "/about"}>
                {(themeConfig?.hero_secondary_label as string) || "Learn more"}
              </a>
            </div>
          </section>
        )}
        {isHome && (
          <section class="gale-features" aria-label="Features">
            {[
              { icon: "⚡", title: (themeConfig?.feature_1_title as string) || "Fast", text: (themeConfig?.feature_1_text as string) || "Static-first pages that load instantly." },
              { icon: "🎨", title: (themeConfig?.feature_2_title as string) || "Flexible", text: (themeConfig?.feature_2_text as string) || "Customize colours and content from site admin." },
              { icon: "📱", title: (themeConfig?.feature_3_title as string) || "Responsive", text: (themeConfig?.feature_3_text as string) || "Looks great on every screen size." },
            ].map((f) => (
              <article class="gale-feature" key={f.title}>
                <div class="gale-feature-icon" aria-hidden="true">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </section>
        )}
        {children}
        <footer class="site-footer gale-footer">
          <div class="gale-footer-inner">
            <div class="gale-footer-brand">{site?.title ?? "${def.name}"}</div>
            <div class="gale-footer-links">
              {(nav ?? []).slice(0, 5).map((item) => (
                <a key={item.route} href={item.route}>{item.navTitle ?? item.frontmatter?.title ?? item.route}</a>
              ))}
            </div>
            {footerText || <>© {new Date().getFullYear()} {site?.title ?? "${def.name}"} · Powered by <a href="https://getdune.org">Dune</a></>}
          </div>
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

  defaultTemplate: () => `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  return (
    <LayoutComponent {...props}>
      <div class="gale-page-hero"><h1>{page.frontmatter.title}</h1></div>
      <article class="gale-page-content prose">
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
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
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;

  return (
    <LayoutComponent {...props}>
      <div class="gale-page-hero">
        <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
        {date && (
          <time datetime={new Date(date).toISOString()}>
            {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        )}
      </div>
      <article class="gale-page-content prose">
        {cover && <img class="post-cover" src={cover} alt="" style="border-radius:12px;margin-bottom:1.5rem" />}
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

  return (
    <LayoutComponent {...props}>
      <div class="gale-section-title" style="padding-top:3rem">
        <h2>{page.frontmatter.title || "Latest posts"}</h2>
        {(themeConfig?.home_subtitle as string) && <p>{themeConfig?.home_subtitle as string}</p>}
      </div>
      {children}
      <div class="gale-blog-grid">
        {(collection?.items ?? []).map((post) => {
          const date = post.frontmatter.date ? new Date(String(post.frontmatter.date)).getTime() : undefined;
          const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
          const summary = meta.description ??
            (post.excerpt ? truncate(post.excerpt.replace(/<[^>]+>/g, ""), 140) : "");
          const cover = typeof post.frontmatter.cover === "string" ? post.frontmatter.cover : undefined;
          return (
            <article class="gale-post-card" key={post.route}>
              {cover && <img src={cover} alt="" />}
              <div class="gale-post-card-body">
                <h2><a href={post.route}>{String(post.frontmatter.title ?? post.route)}</a></h2>
                {summary && <p>{String(summary)}</p>}
                {date && (
                  <time datetime={new Date(date).toISOString()}>
                    {formatDate(date, page.language ?? "en", { day: "numeric", month: "short", year: "numeric" })}
                  </time>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="pagination" aria-label="Pagination" style="justify-content:center;padding-bottom:3rem">
          {collection.hasPrev && <a href={\`\${page.route}/page:\${(collection.page ?? 2) - 1}\`}>← Newer</a>}
          {collection.hasNext && <a href={\`\${page.route}/page:\${(collection.page ?? 1) + 1}\`}>Older →</a>}
        </nav>
      )}
    </LayoutComponent>
  );
}
`,

  configSchemaYaml: (def: ThemeDef) => {
    const accent = def.cssVars["--accent"] ?? "#6366f1";
    return `config_schema:
  accent_color:
    type: color
    label: Accent colour
    default: "${accent}"
  default_dark:
    type: toggle
    label: Default to dark mode
    default: false
  hero_badge:
    type: text
    label: Hero badge text
    default: "New"
  hero_title:
    type: text
    label: Hero headline (empty = site title)
    default: ""
  hero_subtitle:
    type: text
    label: Hero subtitle
    default: ""
  hero_primary_label:
    type: text
    label: Primary CTA label
    default: "Get started"
  hero_primary_url:
    type: text
    label: Primary CTA URL
    default: "/blog"
  hero_secondary_label:
    type: text
    label: Secondary CTA label
    default: "Learn more"
  hero_secondary_url:
    type: text
    label: Secondary CTA URL
    default: "/about"
  header_cta_label:
    type: text
    label: Header CTA label
    default: "Get started"
  header_cta_url:
    type: text
    label: Header CTA URL
    default: "/blog"
  feature_1_title:
    type: text
    label: Feature 1 title
    default: "Fast"
  feature_1_text:
    type: text
    label: Feature 1 description
    default: "Static-first pages that load instantly."
  feature_2_title:
    type: text
    label: Feature 2 title
    default: "Flexible"
  feature_2_text:
    type: text
    label: Feature 2 description
    default: "Customize colours and content from site admin."
  feature_3_title:
    type: text
    label: Feature 3 title
    default: "Responsive"
  feature_3_text:
    type: text
    label: Feature 3 description
    default: "Looks great on every screen size."
  home_subtitle:
    type: text
    label: Blog section subtitle
    default: ""
  footer_text:
    type: text
    label: Footer text (leave empty for default)
    default: ""
`;
  },
};
