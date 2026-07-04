/** @jsxImportSource preact */
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
  const themeName = config?.theme?.name ?? "lucid";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Lucid";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const accent = (themeConfig?.accent_color as string) ?? "#7c3aed";
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
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <style dangerouslySetInnerHTML={{ __html: `:root{--accent:${accent}}` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var s=localStorage.getItem('theme-lucid');
          if(s==='dark'||(s===null&&${defaultDark ? "true" : "false"})){document.documentElement.classList.add('dark')}
          else if(s==='light'){document.documentElement.classList.remove('dark')}})();
        ` }} />
      </head>
      <body class="theme-lucid archetype-docs-modern">
        <header class="site-header lucid-header">
          <div class="lucid-header-inner">
            <a class="site-logo lucid-logo" href="/">{site?.title ?? "Lucid"}</a>
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
          {footerText || <>© {new Date().getFullYear()} {site?.title ?? "Lucid"} · Powered by <a href="https://getdune.org">Dune</a></>}
        </footer>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var btn=document.getElementById('theme-toggle');
            if(!btn)return;
            btn.addEventListener('click',function(){
              var dark=document.documentElement.classList.toggle('dark');
              localStorage.setItem('theme-lucid',dark?'dark':'light');
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
