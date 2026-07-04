/** @jsxImportSource preact */
import { h } from "preact";

export default function Layout(
  { children, site, config, nav, page, pageTitle, pathname, dir, themeConfig }: any,
) {
  const themeName = config?.theme?.name ?? "fennec";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const stripSlash = (p: string) => p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalizedPath = stripSlash(canonicalPath);
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const primary = themeConfig?.primary_color ?? "#f97316";
  const avatar = themeConfig?.avatar_url ?? "";
  const defaultDark = themeConfig?.default_dark === true;

  const navLinks = (extraClass = "") =>
    (nav ?? []).map((item: any) => {
      const active = normalizedPath === stripSlash(item.route) ||
        (item.route !== "/" && canonicalPath.startsWith(item.route + "/"));
      return (
        <a key={item.route} href={item.route} class={`${active ? "active" : ""} ${extraClass}`.trim()}>
          {item.navTitle ?? item.title}
        </a>
      );
    });

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"} class={defaultDark ? "dark" : ""}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle ?? site?.title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle ?? site?.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <style dangerouslySetInnerHTML={{ __html: `:root{--af-primary:${primary}}` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var s=localStorage.getItem('af-theme');
          if(s==='dark'||(s===null&&${defaultDark ? "true" : "false"})){document.documentElement.classList.add('dark')}
          else if(s==='light'){document.documentElement.classList.remove('dark')}})();
        ` }} />
      </head>
      <body>
        <div class="af-shell">
          <aside class="af-sidebar">
            <div class="af-sidebar-inner">
              {avatar && (
                <a href="/" class="af-avatar-link">
                  <img class="af-avatar" src={avatar} alt={site?.title} width="90" height="90" />
                </a>
              )}
              <a href="/" class="af-site-name">{site?.title}</a>
              {site?.description && <p class="af-site-desc">{site.description}</p>}
              <nav class="af-sidebar-nav" aria-label="Site">
                {navLinks()}
              </nav>
              <button id="af-theme-toggle" class="af-theme-btn" aria-label="Toggle dark mode">
                <span class="light-label">🌙 Dark</span>
                <span class="dark-label">☀️ Light</span>
              </button>
            </div>
          </aside>

          <div class="af-content-col">
            <header class="af-mobile-header">
              <a href="/" class="af-site-name">{site?.title}</a>
              <nav aria-label="Site">
                {navLinks()}
              </nav>
            </header>
            <main class="af-main">
              {children}
            </main>
            <footer class="af-footer">
              <p>
                &copy; {new Date().getFullYear()} {site?.title} — built with{" "}
                <a href="https://getdune.org" target="_blank" rel="noopener">Dune</a>, theme{" "}
                <a href="https://github.com/duneorg/themes" target="_blank" rel="noopener">Fennec</a>
              </p>
            </footer>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t=document.getElementById('af-theme-toggle');
            if(t)t.addEventListener('click',function(){
              var d=document.documentElement.classList.toggle('dark');
              localStorage.setItem('af-theme',d?'dark':'light');
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
