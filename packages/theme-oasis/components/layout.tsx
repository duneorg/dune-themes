/** @jsxImportSource preact */
import { h } from "preact";

export default function Layout(
  { children, site, config, nav, page, pageTitle, pathname, dir, themeConfig }: any,
) {
  const themeName = config?.theme?.name ?? "oasis";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const stripSlash = (p: string) => p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalizedPath = stripSlash(canonicalPath);
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const primary = themeConfig?.primary_color ?? "#2563eb";

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"}>
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
        <style dangerouslySetInnerHTML={{ __html: `:root{--primary:${primary}}` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var s=localStorage.getItem('blox-theme');
          if(s==='dark'||(s===null&&matchMedia('(prefers-color-scheme: dark)').matches)){
            document.documentElement.classList.add('dark')}})();
        ` }} />
      </head>
      <body>
        <header class="bx-navbar">
          <div class="bx-navbar-inner">
            <a href="/" class="bx-brand">{site?.title}</a>
            <nav class="bx-nav" aria-label="Site">
              {(nav ?? []).map((item: any) => {
                const active = normalizedPath === stripSlash(item.route) ||
                  (item.route !== "/" && canonicalPath.startsWith(item.route + "/"));
                return (
                  <a key={item.route} href={item.route} class={active ? "active" : ""}>
                    {item.navTitle ?? item.title}
                  </a>
                );
              })}
              <button id="bx-theme-toggle" aria-label="Toggle dark mode">
                <svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </nav>
          </div>
        </header>
        <main class="bx-main">
          {children}
        </main>
        <footer class="bx-footer">
          <p>
            &copy; {new Date().getFullYear()} {site?.title} · Published with{" "}
            <a href="https://getdune.org" target="_blank" rel="noopener">Dune</a> · Theme{" "}
            <a href="https://github.com/duneorg/themes" target="_blank" rel="noopener">Oasis</a>
          </p>
        </footer>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t=document.getElementById('bx-theme-toggle');
            if(t)t.addEventListener('click',function(){
              var d=document.documentElement.classList.toggle('dark');
              localStorage.setItem('blox-theme',d?'dark':'light');
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
