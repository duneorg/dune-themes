/** @jsxImportSource preact */
import { h } from "preact";
import { clientSchemeTable, colorSchemeCss, COLOR_SCHEMES, resolveColorScheme } from "../utils/color-schemes.ts";

export default function Layout(
  { children, site, config, nav, page, pageTitle, pathname, dir, themeConfig, t }: any,
) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "sirocco";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const stripSlash = (p: string) => p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalizedPath = stripSlash(canonicalPath);
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const colorSchemeId = typeof themeConfig?.color_scheme === "string" ? themeConfig.color_scheme : "blue";
  const colorScheme = resolveColorScheme(colorSchemeId);
  const showSchemeSwitcher = themeConfig?.scheme_switcher === true;
  const schemeSwitcherLabel = tr("scheme_switcher", "Color scheme");
  const defaultDark = themeConfig?.default_dark === true;

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
        <style dangerouslySetInnerHTML={{ __html: colorSchemeCss(colorScheme) }} />
        {/* Apply saved theme before first paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var s=localStorage.getItem('pm-theme');
          var isDark=s==='dark'||(s===null&&${
      defaultDark ? "true" : "window.matchMedia('(prefers-color-scheme: dark)').matches"
    });
          document.documentElement.setAttribute('data-theme',isDark?'dark':'light');})();
        ` }} />
      </head>
      <body>
        <header class="header">
          <nav class="nav">
            <div class="logo">
              <a href="/" accesskey="h" title={site?.title}>{site?.title}</a>
              <button
                id="theme-toggle"
                accesskey="t"
                title={tr("theme_toggle_title", "Toggle theme (t)")}
                aria-label={tr("theme_toggle_aria", "Toggle theme")}
              >
                <svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
                <svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </button>
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
                      <li key={id} role="option" tabindex={0} data-scheme-id={id} aria-selected={id === colorSchemeId}>
                        <span class="scheme-swatch" style={`background:${scheme.light.accent}`} />
                        <span class="scheme-swatch" style={`background:${scheme.dark.accent}`} />
                        <span class="scheme-picker-label">{scheme.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <ul class="menu">
              {(nav ?? []).map((item: any) => (
                <li key={item.route}>
                  <a
                    href={item.route}
                    class={normalizedPath === stripSlash(item.route) ||
                        (item.route !== "/" && canonicalPath.startsWith(item.route))
                      ? "active"
                      : ""}
                  >
                    {item.navTitle ?? item.title}
                  </a>
                </li>
              ))}
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
            <a href="https://getdune.org" target="_blank" rel="noopener">Dune</a> ·{" "}
            {tr("footer_theme", "Theme")}{" "}
            <a href="https://github.com/duneorg/themes" target="_blank" rel="noopener">Sirocco</a>
          </span>
        </footer>
        <button id="top-link" title={tr("top_link", "Go to top")} aria-label={tr("top_link", "Go to top")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var STORAGE_KEY='sirocco-color-scheme';
            var schemes=${showSchemeSwitcher ? JSON.stringify(clientSchemeTable()) : "null"};
            function currentMode(){return document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';}
            function applyScheme(id){
              if(!schemes||!schemes[id])return;
              var v=schemes[id][currentMode()];
              document.documentElement.style.setProperty('--accent',v.accent);
              document.documentElement.style.setProperty('--entry',v.entry);
              document.documentElement.style.setProperty('--theme',v.theme);
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
            var t=document.getElementById('theme-toggle');
            if(t)t.addEventListener('click',function(){
              var d=currentMode()!=='dark';
              document.documentElement.setAttribute('data-theme',d?'dark':'light');
              localStorage.setItem('pm-theme',d?'dark':'light');
              var storedScheme=localStorage.getItem(STORAGE_KEY);
              if(storedScheme)applyScheme(storedScheme);
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
