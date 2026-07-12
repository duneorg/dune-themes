/** @jsxImportSource preact */
import { h } from "preact";

export default function Layout(
  { children, site, config, nav, page, pageTitle, pathname, dir, themeConfig, t }: any,
) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "sirocco";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const stripSlash = (p: string) => p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  // Match on the page route (not bare pathname) so home highlights at both
  // "/" and its directory route. Strip trailing slashes before prefix checks —
  // Dune nav routes already carry a trailing slash, so `item.route + "/"`
  // would produce a double slash that never matches.
  const normalizedPath = stripSlash(page?.route ?? canonicalPath);
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const accent = themeConfig?.accent_color ?? "#1e88e5";
  const defaultDark = themeConfig?.default_dark === true;
  const toggleThemeLabel = tr("toggle_theme", "Toggle theme");
  const toggleThemeTitle = tr("toggle_theme_title", "Toggle theme (t)");
  const goToTopLabel = tr("go_to_top", "Go to top");

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
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <style dangerouslySetInnerHTML={{ __html: `:root{--accent:${accent}}` }} />
        {/* Apply saved theme before first paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var s=localStorage.getItem('pm-theme');
          if(s==='dark'||(s===null&&${defaultDark ? "true" : "false"})){document.documentElement.classList.add('dark')}
          else if(s==='light'){document.documentElement.classList.remove('dark')}})();
        ` }} />
      </head>
      <body>
        <header class="header">
          <nav class="nav">
            <div class="logo">
              <a href="/" accesskey="h" title={site?.title}>{site?.title}</a>
              <button id="theme-toggle" accesskey="t" title={toggleThemeTitle} aria-label={toggleThemeLabel}>
                <svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </div>
            <ul class="menu">
              {(nav ?? []).map((item: any) => {
                const itemPath = stripSlash(item.route);
                const active = normalizedPath === itemPath ||
                  (itemPath !== "/" && normalizedPath.startsWith(itemPath + "/"));
                return (
                  <li key={item.route}>
                    <a href={item.route} class={active ? "active" : ""}>
                      {item.navTitle ?? item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
        <main class="main">
          {children}
        </main>
        <footer class="footer">
          <span>&copy; {new Date().getFullYear()} {site?.title}</span>
          <span>·</span>
          <span>
            {tr("footer_powered_by", "Powered by")}{" "}
            <a href="https://getdune.org" target="_blank" rel="noopener">Dune</a>
            {" · "}
            {tr("footer_theme", "Theme")}{" "}
            <a href="https://github.com/duneorg/themes" target="_blank" rel="noopener">Sirocco</a>
          </span>
        </footer>
        <button id="top-link" title={goToTopLabel} aria-label={goToTopLabel}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t=document.getElementById('theme-toggle');
            if(t)t.addEventListener('click',function(){
              var d=document.documentElement.classList.toggle('dark');
              localStorage.setItem('pm-theme',d?'dark':'light');
            });
            var top=document.getElementById('top-link');
            if(top){
              window.addEventListener('scroll',function(){
                top.style.visibility=window.scrollY>400?'visible':'hidden';
              },{passive:true});
              top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
            }
          })();
        ` }} />
      </body>
    </html>
  );
}
