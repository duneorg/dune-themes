/**
 * Manual — product docs inspired by Just the Docs.
 * Left sidebar with search, nested nav styling, label badges.
 */

import type { ThemeDef } from "../theme-defs.ts";
import type { ThemeCustomization } from "./types.ts";

export const manualCustomization: ThemeCustomization = {
  cssExtra: () => `
html.dark {
  --bg-dark: #1c1d1f;
  --bg-alt-dark: #27282a;
  --sidebar-bg-dark: #222326;
  --text-dark: #ececf1;
  --muted-dark: #9da0a6;
  --border-dark: #3a3b3e;
}

.site-header.manual-topbar {
  display: none;
}

.manual-shell { display: flex; min-height: 100vh; }
.manual-sidebar {
  width: var(--sidebar-width, 264px); flex-shrink: 0;
  background: var(--sidebar-bg); border-right: 1px solid var(--border);
  display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh;
}
.manual-brand {
  padding: 1rem 1rem 0.75rem; border-bottom: 1px solid var(--border);
  font-weight: 700; font-size: 1rem; line-height: 1.3;
}
.manual-brand a { color: var(--text); text-decoration: none; }
.manual-brand small { display: block; font-weight: 400; font-size: 0.75rem; color: var(--muted); margin-top: 0.25rem; }

.manual-search {
  padding: 0.75rem 1rem; border-bottom: 1px solid var(--border);
}
.manual-search a {
  display: block; padding: 0.45rem 0.65rem; border: 1px solid var(--border);
  border-radius: 6px; font-size: 0.8125rem; color: var(--muted); text-decoration: none;
  background: var(--bg);
}
.manual-search a:hover { border-color: var(--accent); color: var(--accent); }

.manual-nav { flex: 1; overflow-y: auto; padding: 0.75rem 0.5rem 1.5rem; }
.manual-nav a {
  display: block; padding: 0.35rem 0.65rem; border-radius: 4px;
  color: var(--text); font-size: 0.875rem; text-decoration: none; line-height: 1.4;
  border-left: 3px solid transparent; margin-bottom: 0.05rem;
}
.manual-nav a:hover { background: var(--bg-alt); text-decoration: none; }
.manual-nav a.active {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border-left-color: var(--accent); font-weight: 600; color: var(--accent);
}
.manual-nav a.in-section { font-weight: 500; }

.manual-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.manual-toolbar {
  display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem;
  padding: 0.65rem 1.5rem; border-bottom: 1px solid var(--border); background: var(--bg);
  position: sticky; top: 0; z-index: 10;
}
.manual-content { max-width: 800px; padding: 2rem 2.5rem 3rem; }
.manual-content h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; }
.manual-content .manual-lead { color: var(--muted); font-size: 1.05rem; margin-bottom: 1.5rem; line-height: 1.6; }
.manual-content h2 { font-size: 1.2rem; margin: 2rem 0 0.65rem; padding-top: 1rem; border-top: 1px solid var(--border); }
.manual-content h2:first-of-type { border-top: none; padding-top: 0; }
.manual-label {
  display: inline-block; font-size: 0.65rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.06em; padding: 0.15rem 0.45rem; border-radius: 4px; margin-left: 0.5rem;
  vertical-align: middle;
}
.manual-label-new { background: #e3f2fd; color: #1565c0; }
.manual-label-beta { background: #fff3e0; color: #e65100; }
html.dark .manual-label-new { background: #1e3a5f; color: #90caf9; }
html.dark .manual-label-beta { background: #4a3000; color: #ffb74d; }

.manual-footer-bar {
  margin-top: auto; padding: 1rem 1.5rem; border-top: 1px solid var(--border);
  font-size: 0.8rem; color: var(--muted); text-align: center;
}

@media (max-width: 768px) {
  .manual-shell { flex-direction: column; }
  .manual-sidebar { width: 100%; height: auto; position: static; max-height: 280px; }
  .manual-content { padding: 1.5rem 1.25rem 2.5rem; }
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
  const accent = (themeConfig?.accent_color as string) ?? "${def.cssVars["--accent"] ?? "#7253ed"}";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const tagline = (themeConfig?.site_tagline as string) ?? "";
  const stripSlash = (p: string) => p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalizedPath = stripSlash(currentPath);

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
        <header class="site-header manual-topbar" aria-hidden="true" />
        <div class="manual-shell">
          <aside class="manual-sidebar" aria-label="Documentation">
            <div class="manual-brand">
              <a href="/">{site?.title ?? "${def.name}"}</a>
              {tagline && <small>{tagline}</small>}
            </div>
            <div class="manual-search">
              <a href="/search">🔍 Search documentation</a>
            </div>
            <nav class="manual-nav" aria-label="Main">
              {(nav ?? []).slice(0, 64).map((item) => {
                const active = normalizedPath === stripSlash(item.route);
                const inSection = item.route !== "/" && currentPath.startsWith(item.route + "/");
                return (
                  <a key={item.route} href={item.route} class={active ? "active" : inSection ? "in-section" : ""}>
                    {item.navTitle ?? item.frontmatter?.title ?? item.route}
                  </a>
                );
              })}
            </nav>
          </aside>
          <div class="manual-main">
            <div class="manual-toolbar">
              <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐ Theme</button>
            </div>
            {children}
            <footer class="manual-footer-bar">
              {footerText || <>© {new Date().getFullYear()} {site?.title ?? "${def.name}"} · Powered by <a href="https://getdune.org">Dune</a></>}
            </footer>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: \`
          (function(){
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

function pageLabel(fm: Record<string, unknown>): string | null {
  const label = fm.label ?? fm.status;
  return typeof label === "string" ? label : null;
}

export default function DefaultTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const label = pageLabel(fm);

  return (
    <LayoutComponent {...props}>
      <article class="manual-content prose">
        <h1>
          {String(fm.title ?? page.frontmatter.title)}
          {label && <span class={\`manual-label manual-label-\${label.toLowerCase()}\`}>{label}</span>}
        </h1>
        {meta.description && <p class="manual-lead">{String(meta.description)}</p>}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
`,

  sectionTemplate: () => `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function SectionTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const meta = (page.frontmatter.metadata ?? {}) as Record<string, unknown>;
  return (
    <LayoutComponent {...props}>
      <article class="manual-content prose">
        <h1>{page.frontmatter.title}</h1>
        {meta.description && <p class="manual-lead">{String(meta.description)}</p>}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
`,

  configSchemaYaml: (def: ThemeDef) => {
    const accent = def.cssVars["--accent"] ?? "#7253ed";
    return `config_schema:
  accent_color:
    type: color
    label: Accent colour
    default: "${accent}"
  default_dark:
    type: toggle
    label: Default to dark mode
    default: false
  site_tagline:
    type: text
    label: Sidebar tagline under site title
    default: "Product documentation"
  footer_text:
    type: text
    label: Footer text (leave empty for default)
    default: ""
`;
  },
};
