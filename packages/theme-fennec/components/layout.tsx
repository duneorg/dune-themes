/** @jsxImportSource preact */
import { safeHref } from "../utils/safe-url.ts";
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

export default function Layout(
  { children, site, config, nav, page, pageTitle, pathname, dir, themeConfig, t }: any,
) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "fennec";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const searchHref = `${basePath}/search`.replace(/([^:]\/)\/+/g, "$1");
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
  const avatar = safeHref(themeConfig?.avatar_url) ?? "";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const osDark = defaultDark
    ? "true"
    : "window.matchMedia('(prefers-color-scheme: dark)').matches";

  const navLinks = (extraClass = "") =>
    (nav ?? []).map((item: any) => {
      const itemPath = stripSlash(item.route);
      const active = normalizedPath === itemPath ||
        (itemPath !== "/" && normalizedPath.startsWith(itemPath + "/"));
      return (
        <a
          key={item.route}
          href={item.route}
          class={`${active ? "active" : ""} ${extraClass}`.trim()}
          aria-current={active ? "page" : undefined}
        >
          {item.navTitle ?? item.title}
        </a>
      );
    });

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle ?? site?.title ?? "Fennec"}</title>
        {description && <meta name="description" content={String(description)} />}
        {siteUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={pageTitle ?? site?.title ?? "Fennec"} />
        {description && <meta property="og:description" content={String(description)} />}
        {siteUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <style dangerouslySetInnerHTML={{ __html: colorSchemeCss(colorScheme) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var s=localStorage.getItem('theme-fennec');
            var dark=s==='dark'||(s===null&&${osDark});
            document.documentElement.setAttribute('data-theme',dark?'dark':'light');
          })();
        `,
          }}
        />
      </head>
      <body class="theme-fennec archetype-portfolio">
        <div class="af-shell">
          <aside class="af-sidebar">
            <div class="af-sidebar-inner">
              {avatar && (
                <a href={homeHref} class="af-avatar-link">
                  <img class="af-avatar" src={avatar} alt="" width="90" height="90" />
                </a>
              )}
              <a href={homeHref} class="af-site-name">{site?.title ?? "Fennec"}</a>
              {site?.description && <p class="af-site-desc">{site.description}</p>}
              <nav class="af-sidebar-nav" aria-label={tr("nav.main", "Site")}>
                {navLinks()}
                <a href={searchHref}>{tr("search.title", "Search")}</a>
              </nav>
              <div class="af-sidebar-controls">
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
                <button
                  type="button"
                  id="af-theme-toggle"
                  class="af-theme-btn"
                  aria-label={tr("theme.toggle", "Toggle dark mode")}
                >
                  <span class="light-label">{tr("theme.dark", "Dark")}</span>
                  <span class="dark-label">{tr("theme.light", "Light")}</span>
                </button>
              </div>
            </div>
          </aside>

          <div class="af-content-col">
            <header class="af-mobile-header">
              <a href={homeHref} class="af-site-name">{site?.title ?? "Fennec"}</a>
              <nav aria-label={tr("nav.main", "Site")}>
                {navLinks()}
                <a href={searchHref}>{tr("search.title", "Search")}</a>
              </nav>
            </header>
            <main class="af-main">
              {children}
            </main>
            <footer class="af-footer">
              {footerText || (
                <p>
                  &copy; {new Date().getFullYear()} {site?.title ?? "Fennec"} —{" "}
                  {tr("footer.powered", "built with")}{" "}
                  <a href="https://getdune.org" target="_blank" rel="noopener noreferrer">Dune</a>
                </p>
              )}
            </footer>
          </div>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var STORAGE_KEY='fennec-color-scheme';
            var schemes=${showSchemeSwitcher ? JSON.stringify(clientSchemeTable()) : "null"};
            function currentMode(){return document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';}
            function applyScheme(id){
              if(!schemes||!schemes[id])return;
              var v=schemes[id][currentMode()];
              document.documentElement.style.setProperty('--accent',v.accent);
              document.documentElement.style.setProperty('--bg',v.bg);
              document.documentElement.style.setProperty('--bg-alt',v.bgAlt);
              document.documentElement.style.setProperty('--code-bg',v.codeBg);
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
            var btn=document.getElementById('af-theme-toggle');
            if(btn)btn.addEventListener('click',function(){
              var next=currentMode()==='dark'?'light':'dark';
              document.documentElement.setAttribute('data-theme',next);
              localStorage.setItem('theme-fennec',next);
              var storedScheme=localStorage.getItem(STORAGE_KEY);
              if(storedScheme)applyScheme(storedScheme);
            });
          })();
        `,
          }}
        />
      </body>
    </html>
  );
}
