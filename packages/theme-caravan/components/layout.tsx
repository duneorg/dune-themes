/** @jsxImportSource preact */
import { h } from "preact";

export default function Layout(
  { children, site, config, nav, page, pageTitle, pathname, dir, themeConfig, t }: any,
) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "caravan";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const stripSlash = (p: string) => p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalizedPath = stripSlash(canonicalPath);
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const accent = themeConfig?.accent_color ?? "#0055bb";
  const showSearch = themeConfig?.show_search !== false;
  const footerText = themeConfig?.footer_text ?? "";
  const searchLabel = tr("search", "Search");
  const noResultsLabel = tr("no_results", "No results");

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
        <style dangerouslySetInnerHTML={{ __html: `:root{--color-link:${accent}}` }} />
      </head>
      <body>
        <input type="checkbox" id="menu-control" class="hidden" />
        <div class="book-container">
          <aside class="book-menu">
            <nav>
              <h2 class="book-brand">
                <a href="/">{site?.title}</a>
              </h2>
              {showSearch && (
                <div class="book-search">
                  <input
                    id="book-search-input"
                    type="search"
                    placeholder={searchLabel}
                    aria-label={searchLabel}
                    autocomplete="off"
                  />
                  <ul id="book-search-results" class="book-search-results" hidden></ul>
                </div>
              )}
              <ul class="book-menu-list">
                {(nav ?? []).map((item: any) => {
                  const itemPath = stripSlash(item.route);
                  const active = normalizedPath === itemPath;
                  const inSection = itemPath !== "/" && !active && normalizedPath.startsWith(itemPath + "/");
                  return (
                    <li key={item.route}>
                      <a href={item.route} class={active ? "active" : inSection ? "in-section" : ""}>
                        {item.navTitle ?? item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div class="book-page">
            <header class="book-header">
              <label for="menu-control" aria-label={tr("toggle_menu", "Toggle menu")}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </label>
              <strong>{page?.frontmatter?.title ?? site?.title}</strong>
            </header>

            <article class="markdown">
              {children}
            </article>

            <footer class="book-footer">
              {footerText
                ? <span>{footerText}</span>
                : (
                  <span>
                    Built with <a href="https://getdune.org" target="_blank" rel="noopener">Dune</a> — theme{" "}
                    <a href="https://github.com/duneorg/themes" target="_blank" rel="noopener">Caravan</a>
                  </span>
                )}
            </footer>
          </div>
        </div>
        {showSearch && (
          <script dangerouslySetInnerHTML={{ __html: `
            (function(){
              var input=document.getElementById('book-search-input');
              var list=document.getElementById('book-search-results');
              if(!input||!list)return;
              var noResultsLabel=${JSON.stringify(noResultsLabel)};
              var timer;
              input.addEventListener('input',function(){
                clearTimeout(timer);
                var q=input.value.trim();
                if(!q){list.hidden=true;list.innerHTML='';return}
                timer=setTimeout(function(){
                  fetch('/api/search?q='+encodeURIComponent(q)+'&limit=10')
                    .then(function(r){return r.json()})
                    .then(function(data){
                      var hits=data.items||[];
                      list.innerHTML=hits.length
                        ? hits.map(function(h){
                            return '<li><a href="'+h.route+'">'+
                              h.title.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</a></li>';
                          }).join('')
                        : '<li class="empty">'+noResultsLabel+'</li>';
                      list.hidden=false;
                    })
                    .catch(function(){list.hidden=true});
                },200);
              });
            })();
          ` }} />
        )}
      </body>
    </html>
  );
}
