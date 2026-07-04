/** @jsxImportSource preact */
import { h } from "preact";

/**
 * Starlight-style shell: fixed header (title, search, socials, theme toggle),
 * left sidebar from `nav`, main pane. The right-hand "On this page" TOC is
 * rendered by the docs template.
 */
export default function Layout(
  { children, site, config, nav, page, pageTitle, pathname, dir, themeConfig, hideSidebar }: any,
) {
  const themeName = config?.theme?.name ?? "nightfall";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const stripSlash = (p: string) => p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalizedPath = stripSlash(canonicalPath);
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const accent = themeConfig?.accent_color ?? "#3b82f6";
  const defaultDark = themeConfig?.default_dark !== false;
  const githubUrl = themeConfig?.github_url ?? "";

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"} data-theme={defaultDark ? "dark" : "light"}>
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
        <style dangerouslySetInnerHTML={{ __html: `:root{--sl-color-accent:${accent}}` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var s=localStorage.getItem('sl-theme');
          if(s)document.documentElement.setAttribute('data-theme',s)})();
        ` }} />
      </head>
      <body class={hideSidebar ? "no-sidebar" : ""}>
        <header class="sl-header">
          <label for="sl-menu-toggle" class="sl-menu-btn" aria-label="Toggle menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </label>
          <a href="/" class="sl-site-title">{site?.title}</a>
          <div class="sl-search">
            <input
              id="sl-search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
              autocomplete="off"
            />
            <div id="sl-search-results" class="sl-search-results" hidden></div>
          </div>
          <div class="sl-header-right">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener" aria-label="GitHub" class="sl-social">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            )}
            <button id="sl-theme-toggle" aria-label="Toggle theme">
              <svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>
        </header>

        <input type="checkbox" id="sl-menu-toggle" class="sl-hidden" />
        <div class="sl-frame">
          {!hideSidebar && (
            <nav class="sl-sidebar" aria-label="Main">
              <ul>
                {(nav ?? []).map((item: any) => {
                  const active = normalizedPath === stripSlash(item.route) ||
                    (item.route !== "/" && canonicalPath.startsWith(item.route + "/"));
                  return (
                    <li key={item.route}>
                      <a href={item.route} class={active ? "active" : ""} aria-current={active ? "page" : undefined}>
                        {item.navTitle ?? item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
          <div class="sl-main">
            {children}
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t=document.getElementById('sl-theme-toggle');
            if(t)t.addEventListener('click',function(){
              var el=document.documentElement;
              var next=el.getAttribute('data-theme')==='dark'?'light':'dark';
              el.setAttribute('data-theme',next);
              localStorage.setItem('sl-theme',next);
            });
            var input=document.getElementById('sl-search-input');
            var results=document.getElementById('sl-search-results');
            if(input&&results){
              var timer;
              function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
              input.addEventListener('input',function(){
                clearTimeout(timer);
                var q=input.value.trim();
                if(!q){results.hidden=true;results.innerHTML='';return}
                timer=setTimeout(function(){
                  fetch('/api/search?q='+encodeURIComponent(q)+'&limit=8')
                    .then(function(r){return r.json()})
                    .then(function(data){
                      var hits=data.items||[];
                      results.innerHTML=hits.length
                        ? hits.map(function(h){
                            return '<a href="'+h.route+'"><strong>'+esc(h.title)+'</strong>'+
                              (h.excerpt?'<span>'+esc(h.excerpt)+'</span>':'')+'</a>';
                          }).join('')
                        : '<div class="empty">No results for “'+esc(q)+'”</div>';
                      results.hidden=false;
                    })
                    .catch(function(){results.hidden=true});
                },200);
              });
              document.addEventListener('click',function(e){
                if(!input.contains(e.target)&&!results.contains(e.target))results.hidden=true;
              });
            }
          })();
        ` }} />
      </body>
    </html>
  );
}
