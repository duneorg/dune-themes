/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
}

export default function Layout({ page, pageTitle, site, config, nav, pathname, dir, children, themeConfig }: LayoutProps) {
  const themeName = config?.theme?.name ?? "manual";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Manual";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const accent = (themeConfig?.accent_color as string) ?? "#7253ed";
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
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <style dangerouslySetInnerHTML={{ __html: `:root{--accent:${accent}}` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var s=localStorage.getItem('theme-manual');
          if(s==='dark'||(s===null&&${defaultDark ? "true" : "false"})){document.documentElement.classList.add('dark')}
          else if(s==='light'){document.documentElement.classList.remove('dark')}})();
        ` }} />
      </head>
      <body class="theme-manual archetype-docs-sidebar">
        <header class="site-header manual-topbar" aria-hidden="true" />
        <div class="manual-shell">
          <aside class="manual-sidebar" aria-label="Documentation">
            <div class="manual-brand">
              <a href="/">{site?.title ?? "Manual"}</a>
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
              {footerText || <>© {new Date().getFullYear()} {site?.title ?? "Manual"} · Powered by <a href="https://getdune.org">Dune</a></>}
            </footer>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var btn=document.getElementById('theme-toggle');
            if(!btn)return;
            btn.addEventListener('click',function(){
              var dark=document.documentElement.classList.toggle('dark');
              localStorage.setItem('theme-manual',dark?'dark':'light');
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
