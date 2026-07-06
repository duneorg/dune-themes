/** @jsxImportSource preact */
import { h } from "preact";
import { COLOR_SCHEMES, colorSchemeCss, resolveColorScheme } from "../utils/color-schemes.ts";

export default function Layout(
  { children, site, config, nav, page, pageTitle, pathname, dir, themeConfig, t }: any,
) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "caravan";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const stripSlash = (p: string) => p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  // Nav matching uses the page's own route, not the request path: the
  // homepage is reachable at both "/" and its directory route (e.g.
  // "/home/"), so matching on `pathname` alone means the sidebar's home
  // link never highlights when visiting bare "/".
  const normalizedPath = stripSlash(page?.route ?? canonicalPath);
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const colorSchemeId = typeof themeConfig?.color_scheme === "string" ? themeConfig.color_scheme : "blue";
  const colorScheme = resolveColorScheme(colorSchemeId);
  const showSearch = themeConfig?.show_search !== false;
  const showSchemeSwitcher = themeConfig?.scheme_switcher === true;
  const footerText = themeConfig?.footer_text ?? "";
  const searchLabel = tr("search", "Search");
  const noResultsLabel = tr("no_results", "No results");
  const toggleThemeLabel = tr("toggle_theme", "Toggle light/dark mode");
  const schemeSwitcherLabel = tr("scheme_switcher", "Color scheme");

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
        <style dangerouslySetInnerHTML={{ __html: colorSchemeCss(colorScheme) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var t=localStorage.getItem("caravan-theme");
              if(t)document.documentElement.dataset.theme=t;
              ${
              showSchemeSwitcher
                ? `
              var schemes=${JSON.stringify(COLOR_SCHEMES)};
              var id=localStorage.getItem("caravan-color-scheme");
              if(id&&schemes[id]){
                var mode=document.documentElement.dataset.theme
                  ||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
                var v=schemes[id][mode];
                document.documentElement.style.setProperty('--color-link',v.accent);
                document.documentElement.style.setProperty('--menu-background',v.menuBackground);
              }`
                : ""
            }
            })();`,
          }}
        />
      </head>
      <body>
        <input type="checkbox" id="menu-control" class="hidden" />
        <div class="book-container">
          <aside class="book-menu">
            <nav>
              <h2 class="book-brand">
                <a href="/">{site?.title}</a>
                <button
                  id="theme-toggle"
                  class="theme-toggle"
                  type="button"
                  aria-label={toggleThemeLabel}
                  title={toggleThemeLabel}
                >
                  <svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </button>
              </h2>
              {showSchemeSwitcher && (
                <select
                  id="scheme-switcher"
                  class="scheme-switcher"
                  aria-label={schemeSwitcherLabel}
                  title={schemeSwitcherLabel}
                >
                  {Object.entries(COLOR_SCHEMES).map(([id, scheme]) => (
                    <option value={id} selected={id === colorSchemeId}>{scheme.label}</option>
                  ))}
                </select>
              )}
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
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var STORAGE_KEY='caravan-color-scheme';
            var schemes=${showSchemeSwitcher ? JSON.stringify(COLOR_SCHEMES) : "null"};
            function currentMode(){
              var t=document.documentElement.dataset.theme;
              return t||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
            }
            function applyScheme(id){
              if(!schemes||!schemes[id])return;
              var v=schemes[id][currentMode()];
              document.documentElement.style.setProperty('--color-link',v.accent);
              document.documentElement.style.setProperty('--menu-background',v.menuBackground);
            }
            var select=document.getElementById('scheme-switcher');
            if(select){
              var stored=localStorage.getItem(STORAGE_KEY);
              if(stored&&schemes&&schemes[stored])select.value=stored;
              select.addEventListener('change',function(){
                localStorage.setItem(STORAGE_KEY,select.value);
                applyScheme(select.value);
              });
            }
            var btn=document.getElementById('theme-toggle');
            if(!btn)return;
            btn.addEventListener('click',function(){
              var current=document.documentElement.dataset.theme;
              var isDark=current
                ? current==='dark'
                : window.matchMedia('(prefers-color-scheme: dark)').matches;
              var next=isDark?'light':'dark';
              document.documentElement.dataset.theme=next;
              localStorage.setItem('caravan-theme',next);
              var storedScheme=localStorage.getItem(STORAGE_KEY);
              if(storedScheme)applyScheme(storedScheme);
            });
          })();
        ` }} />
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
