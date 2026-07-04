/**
 * Ink — long-form writing theme inspired by Ghost Attila.
 * Centered serif typography, calm header, author box, reading time.
 */

import type { ThemeDef } from "../theme-defs.ts";
import type { ThemeCustomization } from "./types.ts";

export const inkCustomization: ThemeCustomization = {
  cssExtra: () => `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Lato:wght@400;700&display=swap');

html.dark {
  --bg-dark: #1a1814;
  --bg-alt-dark: #252219;
  --text-dark: #e8e4dc;
  --muted-dark: #a09888;
  --border-dark: #3d3830;
}

body { font-size: 1.125rem; line-height: 1.85; }
.site-header.ink-header {
  flex-direction: column; align-items: stretch; text-align: center;
  padding: 2rem 1.25rem 1rem; position: relative; border-bottom: none;
  background: transparent; min-height: auto;
}
.ink-header-bar {
  display: flex; width: 100%; max-width: var(--max-width); margin: 0 auto;
  justify-content: space-between; align-items: center;
}
.site-logo.ink-logo {
  font-family: var(--font-serif); font-size: 1.75rem; font-weight: 700;
  letter-spacing: -0.02em; margin: 0 auto;
}
.ink-header-bar .theme-toggle { margin-left: 0; }
.site-nav.ink-nav {
  margin: 1.25rem auto 0; justify-content: center; width: 100%; max-width: var(--max-width);
  font-family: 'Lato', system-ui, sans-serif; font-size: 0.75rem;
  text-transform: uppercase; letter-spacing: 0.1em;
}
.site-nav.ink-nav a { color: var(--muted); padding: 0.25rem 0.5rem; }
.site-nav.ink-nav a:hover, .site-nav.ink-nav a.active { color: var(--accent); text-decoration: none; }
.ink-main { min-height: 50vh; }

.post-single { max-width: var(--max-width); margin: 0 auto; padding: 0 1.25rem 3rem; }
.post-header {
  text-align: center; padding: 1.5rem 0 2.5rem;
  border-bottom: 1px solid var(--border); margin-bottom: 2.5rem;
}
.post-title {
  font-family: var(--font-serif); font-size: clamp(1.75rem, 4vw, 2.5rem);
  line-height: 1.25; margin-bottom: 0.75rem;
}
.post-description { color: var(--muted); font-size: 1.05rem; font-style: italic; margin-bottom: 1rem; }
.post-meta {
  font-family: 'Lato', system-ui, sans-serif; font-size: 0.75rem;
  text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted);
}
.post-content { font-family: var(--font-serif); font-size: 1.125rem; }
.post-content p { margin-bottom: 1.35rem; }
.post-content h2 { font-size: 1.35rem; margin: 2.5rem 0 1rem; line-height: 1.3; }
.post-content h3 { font-size: 1.15rem; margin: 2rem 0 0.75rem; }
.post-content blockquote {
  font-style: italic; margin: 1.5rem 0; padding-left: 1.25rem;
  border-left: 3px solid var(--accent); color: var(--muted);
}
.post-cover-full {
  width: calc(100% + 2.5rem); max-width: none; margin: 0 -1.25rem 2rem;
  border-radius: 0; max-height: 420px; object-fit: cover;
}
.post-footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); }
.post-tags {
  display: flex; flex-wrap: wrap; gap: 0.5rem; list-style: none;
  justify-content: center; padding: 0;
}
.post-tags a {
  font-family: 'Lato', system-ui, sans-serif; font-size: 0.7rem;
  text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted);
  border: 1px solid var(--border); padding: 0.25rem 0.65rem; border-radius: 999px;
  text-decoration: none;
}
.post-tags a:hover { color: var(--accent); border-color: var(--accent); }

.author-box {
  display: flex; gap: 1rem; align-items: flex-start; margin-top: 2.5rem;
  padding: 1.5rem; background: var(--bg-alt); border-radius: var(--radius);
  font-family: 'Lato', system-ui, sans-serif; font-size: 0.95rem; text-align: left;
}
.author-box img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.author-box h4 {
  font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--muted); margin-bottom: 0.35rem; font-weight: 700;
}
.author-box p { line-height: 1.65; color: var(--text); margin: 0; }

.ink-intro {
  max-width: var(--max-width); margin: 0 auto; padding: 2rem 1.25rem 0; text-align: center;
}
.ink-intro h1 { font-family: var(--font-serif); font-size: 2rem; margin-bottom: 0.5rem; }
.ink-intro p { color: var(--muted); font-style: italic; max-width: 36rem; margin: 0 auto; }
.post-entries { max-width: var(--max-width); margin: 0 auto; padding: 1rem 1.25rem 3rem; }
.post-entry { position: relative; padding: 2rem 0; border-bottom: 1px solid var(--border); }
.post-entry:last-child { border-bottom: none; }
.post-entry .entry-header h2 {
  font-family: var(--font-serif); font-size: 1.35rem; font-weight: 700; margin-bottom: 0.75rem;
}
.post-entry .entry-content p { color: var(--muted); font-size: 1rem; line-height: 1.7; margin-bottom: 0.75rem; }
.post-entry .entry-footer {
  font-family: 'Lato', system-ui, sans-serif; font-size: 0.7rem;
  text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted);
}
.post-entry .entry-link { position: absolute; inset: 0; z-index: 1; }
.post-entry:hover .entry-header h2 { color: var(--accent); }

.site-footer.ink-footer { font-family: 'Lato', system-ui, sans-serif; font-size: 0.8rem; padding: 2.5rem 1.25rem; }
.ink-social { display: flex; gap: 1.25rem; justify-content: center; margin-bottom: 0.85rem; flex-wrap: wrap; }
.ink-social a { color: var(--muted); text-decoration: none; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; }
.ink-social a:hover { color: var(--accent); }

@media (max-width: 768px) {
  .site-logo.ink-logo { font-size: 1.4rem; }
  .post-cover-full { width: 100%; margin-left: 0; margin-right: 0; }
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
  const accent = (themeConfig?.accent_color as string) ?? "${def.cssVars["--accent"] ?? "#c0392b"}";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const twitter = (themeConfig?.twitter_url as string) ?? "";
  const github = (themeConfig?.github_url as string) ?? "";

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
        <header class="site-header ink-header">
          <div class="ink-header-bar">
            <span aria-hidden="true" style="width:2.5rem" />
            <a class="site-logo ink-logo" href="/">{site?.title ?? "${def.name}"}</a>
            <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
          </div>
          <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
          <nav id="main-nav" class="site-nav ink-nav" aria-label="Main">
            {(nav ?? []).slice(0, 10).map((item) => (
              <a key={item.route} href={item.route} class={currentPath === item.route ? "active" : ""}>
                {item.navTitle ?? item.frontmatter?.title ?? item.route}
              </a>
            ))}
          </nav>
        </header>
        <main class="ink-main">{children}</main>
        <footer class="site-footer ink-footer">
          {(twitter || github) && (
            <div class="ink-social">
              {twitter && <a href={twitter} rel="noopener noreferrer" target="_blank">Twitter</a>}
              {github && <a href={github} rel="noopener noreferrer" target="_blank">GitHub</a>}
            </div>
          )}
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
  const tags: string[] = (fm.taxonomy as Record<string, string[]>)?.tag ??
    (fm.taxonomy as Record<string, string[]>)?.tags ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const author = typeof fm.author === "string" ? fm.author : (themeConfig?.author_name as string) ?? "";

  let readingTime = "";
  if (themeConfig?.show_reading_time !== false) {
    const text = (await page.html()).replace(/<[^>]+>/g, " ");
    const words = text.split(/\\s+/).filter(Boolean).length;
    readingTime = \`\${Math.max(1, Math.round(words / 200))} min read\`;
  }

  const authorBio = (themeConfig?.author_bio as string) ?? "";
  const authorAvatar = (themeConfig?.author_avatar as string) ?? "";

  return (
    <LayoutComponent {...props}>
      <article class="post-single">
        {cover && <img class="post-cover-full" src={cover} alt="" />}
        <header class="post-header">
          <h1 class="post-title">{String(fm.title ?? page.frontmatter.title)}</h1>
          {meta.description && <div class="post-description">{String(meta.description)}</div>}
          <div class="post-meta">
            {date && (
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            )}
            {readingTime && <span>&nbsp;·&nbsp;{readingTime}</span>}
            {author && <span>&nbsp;·&nbsp;{author}</span>}
          </div>
        </header>
        <div class="post-content">{children}</div>
        {tags.length > 0 && (
          <footer class="post-footer">
            <ul class="post-tags">
              {tags.map((t) => (
                <li key={t}><a href={\`/tag:\${encodeURIComponent(t)}\`}>{t}</a></li>
              ))}
            </ul>
          </footer>
        )}
        {(authorBio || author) && (
          <aside class="author-box">
            {authorAvatar && <img src={authorAvatar} alt={author || "Author"} />}
            <div>
              {author && <h4>{author}</h4>}
              {authorBio && <p>{authorBio}</p>}
            </div>
          </aside>
        )}
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
      {(page.frontmatter.title || subtitle) && (
        <div class="ink-intro">
          {page.frontmatter.title && <h1>{page.frontmatter.title}</h1>}
          {subtitle && <p>{String(subtitle)}</p>}
        </div>
      )}
      {children}
      <div class="post-entries">
        {(collection?.items ?? []).map((post) => {
          const date = post.frontmatter.date ? new Date(String(post.frontmatter.date)).getTime() : undefined;
          const meta = (post.frontmatter.metadata ?? {}) as Record<string, unknown>;
          const summary = meta.description ??
            (post.excerpt ? truncate(post.excerpt.replace(/<[^>]+>/g, ""), 200) : "");
          return (
            <article class="post-entry" key={post.route}>
              <header class="entry-header">
                <h2>{String(post.frontmatter.title ?? post.route)}</h2>
              </header>
              {summary && <div class="entry-content"><p>{String(summary)}</p></div>}
              <footer class="entry-footer">
                {date && (
                  <time datetime={new Date(date).toISOString()}>
                    {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                )}
                {post.frontmatter.author && <span>&nbsp;·&nbsp;{String(post.frontmatter.author)}</span>}
              </footer>
              <a class="entry-link" aria-label={\`Read \${post.frontmatter.title}\`} href={post.route} />
            </article>
          );
        })}
      </div>
      {(collection?.hasPrev || collection?.hasNext) && (
        <nav class="pagination" aria-label="Pagination">
          {collection.hasPrev && (
            <a href={\`\${page.route}/page:\${(collection.page ?? 2) - 1}\`}>← Newer</a>
          )}
          {collection.hasNext && (
            <a href={\`\${page.route}/page:\${(collection.page ?? 1) + 1}\`}>Older →</a>
          )}
        </nav>
      )}
    </LayoutComponent>
  );
}
`,

  configSchemaYaml: (def: ThemeDef) => {
    const accent = def.cssVars["--accent"] ?? "#c0392b";
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
    label: Home page subtitle
    default: ""
  author_name:
    type: text
    label: Default author name
    default: ""
  author_bio:
    type: textarea
    label: Author bio (shown at end of posts)
    default: ""
  author_avatar:
    type: text
    label: Author avatar URL
    default: ""
  twitter_url:
    type: text
    label: Twitter / X profile URL
    default: ""
  github_url:
    type: text
    label: GitHub profile URL
    default: ""
  footer_text:
    type: text
    label: Footer text (leave empty for default)
    default: ""
`;
  },

  localeStrings: {
    "post.reading_time": "min read",
    "blog.newer": "Newer",
    "blog.older": "Older",
  },
};
