/**
 * Lucid — modern docs inspired by Hugo Hextra.
 * Gradient sidebar, breadcrumb bar, spacious prose.
 */

import type { ThemeDef } from "../theme-defs.ts";
import type { ThemeCustomization } from "./types.ts";

export const lucidCustomization: ThemeCustomization = {
  cssExtra: () => `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

html.dark {
  --bg-dark: #0f172a;
  --bg-alt-dark: #1e293b;
  --sidebar-bg-dark: #111827;
  --text-dark: #f1f5f9;
  --muted-dark: #94a3b8;
  --border-dark: #334155;
}

body { font-family: 'Inter', system-ui, sans-serif; }

.site-header.lucid-header {
  padding: 0 1.25rem; min-height: 56px; border-bottom: 1px solid var(--border);
  background: var(--bg); position: sticky; top: 0; z-index: 50;
}
.lucid-header-inner {
  display: flex; align-items: center; gap: 1rem; max-width: 100%; margin: 0 auto;
}
.site-logo.lucid-logo { font-weight: 700; font-size: 1rem; letter-spacing: -0.02em; }
.lucid-search-link { margin-left: auto; font-size: 0.875rem; color: var(--muted); text-decoration: none; }
.lucid-search-link:hover { color: var(--accent); }

.lucid-shell { display: flex; min-height: calc(100vh - 56px); }
.lucid-sidebar {
  width: var(--sidebar-width, 260px); flex-shrink: 0;
  background: linear-gradient(180deg, var(--sidebar-bg) 0%, color-mix(in srgb, var(--sidebar-bg) 70%, var(--bg)) 100%);
  border-right: 1px solid var(--border); padding: 1.25rem 0.75rem;
  position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto;
}
.lucid-sidebar-label {
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--muted); padding: 0 0.75rem 0.5rem;
}
.lucid-sidebar a {
  display: block; padding: 0.45rem 0.75rem; border-radius: 8px;
  color: var(--muted); font-size: 0.875rem; font-weight: 500; text-decoration: none;
  margin-bottom: 0.1rem;
}
.lucid-sidebar a:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); color: var(--text); }
.lucid-sidebar a.active {
  background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); font-weight: 600;
}

.lucid-main { flex: 1; min-width: 0; }
.lucid-breadcrumb {
  padding: 0.85rem 2rem; border-bottom: 1px solid var(--border);
  font-size: 0.8125rem; color: var(--muted); background: var(--bg-alt);
}
.lucid-breadcrumb a { color: var(--muted); text-decoration: none; }
.lucid-breadcrumb a:hover { color: var(--accent); }
.lucid-breadcrumb span { margin: 0 0.35rem; }

.lucid-content { max-width: 820px; padding: 2rem 2rem 3rem; }
.lucid-content h1 { font-size: 2rem; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
.lucid-content h2 { font-size: 1.35rem; margin: 2rem 0 0.75rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border); }
.lucid-content p, .lucid-content li { line-height: 1.7; color: color-mix(in srgb, var(--text) 92%, transparent); }
.lucid-content pre { border-radius: 8px; border: 1px solid var(--border); }

.lucid-edit {
  margin-top: 2.5rem; padding-top: 1.25rem; border-top: 1px solid var(--border);
  font-size: 0.875rem;
}
.lucid-edit a { font-weight: 600; }

@media (max-width: 768px) {
  .lucid-shell { flex-direction: column; }
  .lucid-sidebar {
    width: 100%; height: auto; position: static; border-right: none;
    border-bottom: 1px solid var(--border); max-height: 240px;
  }
  .lucid-content { padding: 1.5rem 1.25rem 2.5rem; }
}
`,

  layoutTsx: (def: ThemeDef) => `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
}

function breadcrumbParts(pathname: string, title?: string): { label: string; href?: string }[] {
  if (pathname === "/") return [{ label: "Home" }];
  const segments = pathname.split("/").filter(Boolean);
  const parts: { label: string; href?: string }[] = [{ label: "Home", href: "/" }];
  let acc = "";
  segments.forEach((seg, i) => {
    acc += "/" + seg;
    const isLast = i === segments.length - 1;
    parts.push({ label: isLast && title ? title : seg.replace(/-/g, " "), href: isLast ? undefined : acc });
  });
  return parts;
}

export default function Layout({ page, pageTitle, site, config, nav, pathname, dir, children, themeConfig }: LayoutProps) {
  const themeName = config?.theme?.name ?? "${def.slug}";
  const siteUrl = (site?.url ?? "").replace(/\\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? \`\${siteUrl}\${currentPath}\` : currentPath;
  const title = pageTitle || site?.title || "${def.name}";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const accent = (themeConfig?.accent_color as string) ?? "${def.cssVars["--accent"] ?? "#7c3aed"}";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const crumbs = breadcrumbParts(currentPath, page?.frontmatter?.title as string);
  const sidebarLabel = (themeConfig?.sidebar_label as string) || "Documentation";

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
        <header class="site-header lucid-header">
          <div class="lucid-header-inner">
            <a class="site-logo lucid-logo" href="/">{site?.title ?? "${def.name}"}</a>
            <a class="lucid-search-link" href="/search">Search</a>
            <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
          </div>
        </header>
        <div class="lucid-shell">
          <aside class="lucid-sidebar" aria-label="Documentation">
            <div class="lucid-sidebar-label">{sidebarLabel}</div>
            {(nav ?? []).slice(0, 48).map((item) => (
              <a key={item.route} href={item.route} class={
                currentPath === item.route || (item.route !== "/" && currentPath.startsWith(item.route + "/"))
                  ? "active" : ""
              }>
                {item.navTitle ?? item.frontmatter?.title ?? item.route}
              </a>
            ))}
          </aside>
          <div class="lucid-main">
            {currentPath !== "/" && (
              <nav class="lucid-breadcrumb" aria-label="Breadcrumb">
                {crumbs.map((c, i) => (
                  <span key={i}>
                    {i > 0 && <span>/</span>}
                    {c.href ? <a href={c.href}>{c.label}</a> : <span>{c.label}</span>}
                  </span>
                ))}
              </nav>
            )}
            {children}
          </div>
        </div>
        <footer class="site-footer">
          {footerText || <>© {new Date().getFullYear()} {site?.title ?? "${def.name}"} · Powered by <a href="https://getdune.org">Dune</a></>}
        </footer>
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

export default function DefaultTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout; themeConfig?: Record<string, unknown> }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig } = props;
  const editUrl = (themeConfig?.edit_url as string) ?? "";
  return (
    <LayoutComponent {...props}>
      <article class="lucid-content prose">
        <h1>{page.frontmatter.title}</h1>
        <div data-dune-body>{children}</div>
        {editUrl && (
          <p class="lucid-edit">
            <a href={\`\${editUrl.replace(/\\/$/, "")}\${page.route}.md\`} target="_blank" rel="noopener">Edit this page</a>
          </p>
        )}
      </article>
    </LayoutComponent>
  );
}
`,

  sectionTemplate: () => `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function SectionTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout; themeConfig?: Record<string, unknown> }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig } = props;
  const editUrl = (themeConfig?.edit_url as string) ?? "";
  const desc = (page.frontmatter.metadata as Record<string, unknown>)?.description;
  return (
    <LayoutComponent {...props}>
      <article class="lucid-content prose">
        <h1>{page.frontmatter.title}</h1>
        {desc && <p style="color:var(--muted);margin-bottom:1.5rem">{String(desc)}</p>}
        <div data-dune-body>{children}</div>
        {editUrl && (
          <p class="lucid-edit">
            <a href={\`\${editUrl.replace(/\\/$/, "")}\${page.route}.md\`} target="_blank" rel="noopener">Edit this page</a>
          </p>
        )}
      </article>
    </LayoutComponent>
  );
}
`,

  configSchemaYaml: (def: ThemeDef) => {
    const accent = def.cssVars["--accent"] ?? "#7c3aed";
    return `config_schema:
  accent_color:
    type: color
    label: Accent colour
    default: "${accent}"
  default_dark:
    type: toggle
    label: Default to dark mode
    default: false
  sidebar_label:
    type: text
    label: Sidebar section label
    default: "Documentation"
  edit_url:
    type: text
    label: "Edit on GitHub" base URL (e.g. https://github.com/org/repo/edit/main/content)"
    default: ""
  footer_text:
    type: text
    label: Footer text (leave empty for default)
    default: ""
`;
  },
};
