/** @jsxImportSource preact */
import { safeHref } from "../utils/safe-url.ts";
import { buildNavTree, navLabel, type NavNode } from "../utils/nav.ts";
import {
  clientSchemeTable,
  colorSchemeCss,
  COLOR_SCHEMES,
  DEFAULT_COLOR_SCHEME,
  resolveColorScheme,
} from "../utils/color-schemes.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

/**
 * Starlight-inspired shell: fixed header, nested sidebar from navAll,
 * live search, optional scheme switcher. Splash pages pass hideSidebar.
 */
export default function Layout(
  { children, site, config, nav, navAll, page, pageTitle, pathname, dir, themeConfig, hideSidebar, t }: any,
) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "nightfall";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const searchApi = `${basePath}/api/search`.replace(/([^:]\/)\/+/g, "$1");
  const searchPageHref = `${basePath}/search`.replace(/([^:]\/)\/+/g, "$1");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${canonicalPath}` : canonicalPath;
  const normalizedPath = stripSlash(page?.route ?? canonicalPath);
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const colorSchemeId = typeof themeConfig?.color_scheme === "string"
    ? themeConfig.color_scheme
    : DEFAULT_COLOR_SCHEME;
  const colorScheme = resolveColorScheme(colorSchemeId);
  const showSchemeSwitcher = themeConfig?.scheme_switcher === true;
  const schemeSwitcherLabel = tr("scheme_switcher", "Color scheme");
  const defaultDark = themeConfig?.default_dark !== false;
  const githubUrl = safeHref(themeConfig?.github_url) ?? "";
  const navTree = buildNavTree((navAll ?? nav ?? []) as NavNode[]);
  const searchPlaceholder = tr("search.placeholder", "Search");
  const noResultsLabel = tr("search.empty", "No results found.");
  const osDark = defaultDark
    ? "true"
    : "window.matchMedia('(prefers-color-scheme: dark)').matches";

  function renderNavNode(node: NavNode) {
    const itemPath = stripSlash(node.route);
    const active = normalizedPath === itemPath;
    const inSection = itemPath !== "/" && !active &&
      normalizedPath.startsWith(itemPath + "/");
    const hasChildren = node.children.length > 0;
    return (
      <li key={node.route} class={hasChildren ? "has-children" : undefined}>
        <a
          href={node.route}
          class={active ? "active" : inSection ? "in-section" : ""}
          aria-current={active ? "page" : undefined}
        >
          {navLabel(node)}
        </a>
        {hasChildren && (
          <ul class="nf-nav-nested">
            {node.children.map(renderNavNode)}
          </ul>
        )}
      </li>
    );
  }

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle ?? site?.title ?? "Nightfall"}</title>
        {description && <meta name="description" content={String(description)} />}
        {siteUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={pageTitle ?? site?.title ?? "Nightfall"} />
        {description && <meta property="og:description" content={String(description)} />}
        {siteUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <style dangerouslySetInnerHTML={{ __html: colorSchemeCss(colorScheme) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var s=localStorage.getItem('theme-nightfall');
            var dark=s==='dark'||(s===null&&${osDark});
            document.documentElement.setAttribute('data-theme',dark?'dark':'light');
          })();
        `,
          }}
        />
      </head>
      <body class={`theme-nightfall archetype-docs${hideSidebar ? " no-sidebar" : ""}`}>
        <header class="nf-header">
          <label for="nf-menu-toggle" class="nf-menu-btn" aria-label={tr("nav.menu", "Toggle menu")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </label>
          <a href={homeHref} class="nf-site-title">{site?.title ?? "Nightfall"}</a>
          <div class="nf-search">
            <input
              id="nf-search-input"
              type="search"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              autocomplete="off"
            />
            <div id="nf-search-results" class="nf-search-results" hidden></div>
          </div>
          <div class="nf-header-right">
            <div class="nf-header-controls">
              {showSchemeSwitcher && (
                <div class="scheme-picker" id="scheme-picker">
                  <button
                    type="button"
                    id="scheme-picker-toggle"
                    class="scheme-picker-toggle"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    aria-label={schemeSwitcherLabel}
                    title={schemeSwitcherLabel}
                  >
                    <span class="scheme-swatch" style={`background:${colorScheme.light.accent}`} />
                    <span class="scheme-swatch" style={`background:${colorScheme.dark.accent}`} />
                    <svg class="scheme-picker-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <ul class="scheme-picker-list" id="scheme-picker-list" role="listbox" hidden>
                    {Object.entries(COLOR_SCHEMES).map(([id, scheme]) => (
                      <li
                        key={id}
                        role="option"
                        tabindex={0}
                        data-scheme-id={id}
                        aria-selected={id === colorSchemeId}
                      >
                        <span class="scheme-swatch" style={`background:${scheme.light.accent}`} />
                        <span class="scheme-swatch" style={`background:${scheme.dark.accent}`} />
                        <span class="scheme-picker-label">{scheme.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="nf-social">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              )}
              <button type="button" id="nf-theme-toggle" aria-label={tr("theme.toggle", "Toggle theme")}>
                <svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <input type="checkbox" id="nf-menu-toggle" class="nf-hidden" />
        <div class="nf-frame">
          {!hideSidebar && (
            <nav class="nf-sidebar" aria-label={tr("nav.main", "Main")}>
              <ul class="nf-nav-list">
                {navTree.slice(0, 64).map(renderNavNode)}
              </ul>
              <p class="nf-sidebar-search-link">
                <a href={searchPageHref}>{tr("search.full", "Full search page")}</a>
              </p>
            </nav>
          )}
          <div class="nf-main">
            {children}
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var STORAGE_KEY='nightfall-color-scheme';
            var schemes=${showSchemeSwitcher ? JSON.stringify(clientSchemeTable()) : "null"};
            function currentMode(){return document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';}
            function applyScheme(id){
              if(!schemes||!schemes[id])return;
              var v=schemes[id][currentMode()];
              document.documentElement.style.setProperty('--accent',v.accent);
              document.documentElement.style.setProperty('--bg',v.bg);
              document.documentElement.style.setProperty('--bg-alt',v.bgAlt);
              document.documentElement.style.setProperty('--code-bg',v.codeBg);
              document.documentElement.style.setProperty('--sidebar-bg',v.sidebarBg);
            }
            var picker=document.getElementById('scheme-picker');
            var toggleBtn=document.getElementById('scheme-picker-toggle');
            var list=document.getElementById('scheme-picker-list');
            if(picker&&toggleBtn&&list){
              function closeList(){list.hidden=true;toggleBtn.setAttribute('aria-expanded','false');}
              function openList(){list.hidden=false;toggleBtn.setAttribute('aria-expanded','true');}
              function syncToggle(li){
                var liSwatches=li.querySelectorAll('.scheme-swatch');
                var toggleSwatches=toggleBtn.querySelectorAll('.scheme-swatch');
                for(var i=0;i<toggleSwatches.length;i++)toggleSwatches[i].style.background=liSwatches[i].style.background;
                var items=list.querySelectorAll('li');
                for(var j=0;j<items.length;j++)items[j].setAttribute('aria-selected',items[j]===li?'true':'false');
              }
              function selectLi(li){
                syncToggle(li);
                var id=li.getAttribute('data-scheme-id');
                localStorage.setItem(STORAGE_KEY,id);
                applyScheme(id);
                closeList();
              }
              toggleBtn.addEventListener('click',function(e){
                e.stopPropagation();
                if(list.hidden)openList();else closeList();
              });
              var options=list.querySelectorAll('li');
              for(var k=0;k<options.length;k++){
                (function(li){
                  li.addEventListener('click',function(){selectLi(li);});
                  li.addEventListener('keydown',function(e){
                    if(e.key==='Enter'||e.key===' '){e.preventDefault();selectLi(li);}
                  });
                })(options[k]);
              }
              document.addEventListener('click',function(e){
                if(!picker.contains(e.target))closeList();
              });
              document.addEventListener('keydown',function(e){
                if(e.key==='Escape')closeList();
              });
              var stored=localStorage.getItem(STORAGE_KEY);
              if(stored){
                var storedLi=list.querySelector('li[data-scheme-id="'+stored+'"]');
                if(storedLi)syncToggle(storedLi);
                applyScheme(stored);
              }
            }
            var t=document.getElementById('nf-theme-toggle');
            if(t)t.addEventListener('click',function(){
              var next=currentMode()==='dark'?'light':'dark';
              document.documentElement.setAttribute('data-theme',next);
              localStorage.setItem('theme-nightfall',next);
              var storedScheme=localStorage.getItem(STORAGE_KEY);
              if(storedScheme)applyScheme(storedScheme);
            });
            var input=document.getElementById('nf-search-input');
            var results=document.getElementById('nf-search-results');
            var searchApi=${JSON.stringify(searchApi)};
            var noResultsLabel=${JSON.stringify(noResultsLabel)};
            if(input&&results){
              var timer;
              function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
              input.addEventListener('input',function(){
                clearTimeout(timer);
                var q=input.value.trim();
                if(!q){results.hidden=true;results.innerHTML='';return}
                timer=setTimeout(function(){
                  fetch(searchApi+'?q='+encodeURIComponent(q)+'&limit=8')
                    .then(function(r){return r.json()})
                    .then(function(data){
                      var hits=data.items||[];
                      results.innerHTML=hits.length
                        ? hits.map(function(h){
                            return '<a href="'+esc(h.route)+'"><strong>'+esc(h.title)+'</strong>'+
                              (h.excerpt?'<span>'+esc(h.excerpt)+'</span>':'')+'</a>';
                          }).join('')
                        : '<div class="empty">'+noResultsLabel+'</div>';
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
        `,
          }}
        />
      </body>
    </html>
  );
}
