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

/**
 * Lightweight academic CV chrome: sticky navbar, mobile hamburger,
 * scheme switcher, data-theme dark mode (storage key theme-oasis).
 */
export default function Layout(
  { children, site, config, nav, page, pageTitle, pathname, dir, themeConfig, t }: any,
) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "oasis";
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
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const osDark = defaultDark
    ? "true"
    : "window.matchMedia('(prefers-color-scheme: dark)').matches";

  const navItems = (nav ?? []).map((item: any) => {
    const itemPath = stripSlash(item.route);
    const active = normalizedPath === itemPath ||
      (itemPath !== "/" && normalizedPath.startsWith(itemPath + "/"));
    return { ...item, active };
  });

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle ?? site?.title ?? "Oasis"}</title>
        {description && <meta name="description" content={String(description)} />}
        {siteUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={pageTitle ?? site?.title ?? "Oasis"} />
        {description && <meta property="og:description" content={String(description)} />}
        {siteUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <style dangerouslySetInnerHTML={{ __html: colorSchemeCss(colorScheme) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var s=localStorage.getItem('theme-oasis');
            var dark=s==='dark'||(s===null&&${osDark});
            document.documentElement.setAttribute('data-theme',dark?'dark':'light');
          })();
        `,
          }}
        />
      </head>
      <body class="theme-oasis archetype-portfolio">
        <input type="checkbox" id="bx-menu-toggle" class="bx-hidden" />
        <header class="bx-navbar">
          <div class="bx-navbar-inner">
            <a href={homeHref} class="bx-brand">{site?.title ?? "Oasis"}</a>
            <label for="bx-menu-toggle" class="bx-menu-btn" aria-label={tr("nav.menu", "Toggle menu")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </label>
            <nav class="bx-nav" aria-label={tr("nav.main", "Site")}>
              {navItems.map((item: any) => (
                <a
                  key={item.route}
                  href={item.route}
                  class={item.active ? "active" : ""}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.navTitle ?? item.title}
                </a>
              ))}
              <a href={searchHref}>{tr("search.title", "Search")}</a>
              <div class="bx-nav-controls">
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
                <button type="button" id="bx-theme-toggle" aria-label={tr("theme.toggle", "Toggle dark mode")}>
                  <svg class="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                  <svg class="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
        </header>
        <main class="bx-main">
          {children}
        </main>
        <footer class="bx-footer">
          {footerText || (
            <p>
              &copy; {new Date().getFullYear()} {site?.title ?? "Oasis"} ·{" "}
              {tr("footer.powered", "Published with")}{" "}
              <a href="https://getdune.org" target="_blank" rel="noopener noreferrer">Dune</a>
            </p>
          )}
        </footer>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var STORAGE_KEY='oasis-color-scheme';
            var schemes=${showSchemeSwitcher ? JSON.stringify(clientSchemeTable()) : "null"};
            function currentMode(){return document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';}
            function applyScheme(id){
              if(!schemes||!schemes[id])return;
              var v=schemes[id][currentMode()];
              document.documentElement.style.setProperty('--accent',v.accent);
              document.documentElement.style.setProperty('--primary',v.accent);
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
            var t=document.getElementById('bx-theme-toggle');
            if(t)t.addEventListener('click',function(){
              var next=currentMode()==='dark'?'light':'dark';
              document.documentElement.setAttribute('data-theme',next);
              localStorage.setItem('theme-oasis',next);
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
