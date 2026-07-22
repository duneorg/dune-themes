/** @jsxImportSource preact */
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
  { page, pageTitle, site, config, nav, pathname, dir, children, themeConfig, t }: any,
) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "salon";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Salon";
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

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        {description && <meta name="description" content={String(description)} />}
        {siteUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={String(description)} />}
        {siteUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <style dangerouslySetInnerHTML={{ __html: colorSchemeCss(colorScheme) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var s=localStorage.getItem('theme-salon');
            var dark=s==='dark'||(s===null&&${osDark});
            document.documentElement.setAttribute('data-theme',dark?'dark':'light');
          })();
        `,
          }}
        />
      </head>
      <body class="theme-salon archetype-blog-magazine">
        <header class="site-header salon-header">
          <div class="salon-header-inner">
            <a class="site-logo salon-logo" href={homeHref}>{site?.title ?? "Salon"}</a>
            <button
              type="button"
              class="nav-toggle"
              aria-expanded="false"
              aria-controls="main-nav"
            >
              {tr("nav.menu", "Menu")}
            </button>
            <nav id="main-nav" class="site-nav salon-nav" aria-label="Main">
              {(nav ?? []).slice(0, 8).map((item: any) => {
                const route = item.route as string;
                const active = normalizedPath === stripSlash(route) ||
                  (route !== "/" && currentPath.startsWith(route));
                return (
                  <a
                    key={route}
                    href={route}
                    class={active ? "active" : ""}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.navTitle ?? item.title ?? route}
                  </a>
                );
              })}
            </nav>
            <div class="salon-header-controls">
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
                class="theme-toggle"
                id="theme-toggle"
                aria-label={tr("theme.toggle", "Toggle dark mode")}
              >
                ◐
              </button>
            </div>
          </div>
        </header>
        {children}
        <footer class="site-footer salon-footer">
          {footerText || (
            <>
              © {new Date().getFullYear()} {site?.title ?? "Salon"} · Powered by{" "}
              <a href="https://getdune.org">Dune</a>
            </>
          )}
        </footer>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var navBtn=document.querySelector('.nav-toggle');
            var nav=document.getElementById('main-nav');
            if(navBtn&&nav){navBtn.addEventListener('click',function(){
              var open=nav.classList.toggle('is-open');
              navBtn.setAttribute('aria-expanded',open?'true':'false');
            });}
            var STORAGE_KEY='salon-color-scheme';
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
            var btn=document.getElementById('theme-toggle');
            if(btn)btn.addEventListener('click',function(){
              var next=currentMode()==='dark'?'light':'dark';
              document.documentElement.setAttribute('data-theme',next);
              localStorage.setItem('theme-salon',next);
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
