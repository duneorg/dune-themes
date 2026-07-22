/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";
import {
  clientSchemeTable,
  colorSchemeCss,
  COLOR_SCHEMES,
  DEFAULT_COLOR_SCHEME,
  resolveColorScheme,
} from "../utils/color-schemes.ts";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
}

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

function isHomePath(path: string) {
  const n = stripSlash(path);
  return n === "/" || n === "/home" || n === "";
}

export default function Layout({
  page,
  pageTitle,
  site,
  config,
  nav,
  pathname,
  dir,
  children,
  themeConfig,
  t,
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "gale";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = (site as { basePath?: string } | undefined)?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Gale";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const colorSchemeId = typeof themeConfig?.color_scheme === "string"
    ? themeConfig.color_scheme
    : DEFAULT_COLOR_SCHEME;
  const colorScheme = resolveColorScheme(colorSchemeId);
  const showSchemeSwitcher = themeConfig?.scheme_switcher === true;
  const schemeSwitcherLabel = tr("scheme_switcher", "Color scheme");
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const ctaLabel = (themeConfig?.header_cta_label as string) ||
    tr("cta.get_started", "Get started");
  const ctaUrl = safeHref(themeConfig?.header_cta_url) || "/blog/";
  const showHero = isHomePath(currentPath);
  const osDark = defaultDark
    ? "true"
    : "window.matchMedia('(prefers-color-scheme: dark)').matches";

  const features = [
    {
      title: (themeConfig?.feature_1_title as string) || "Fast",
      text: (themeConfig?.feature_1_text as string) ||
        "Static-first pages that load instantly.",
    },
    {
      title: (themeConfig?.feature_2_title as string) || "Flexible",
      text: (themeConfig?.feature_2_text as string) ||
        "Customize colours and content from site admin.",
    },
    {
      title: (themeConfig?.feature_3_title as string) || "Responsive",
      text: (themeConfig?.feature_3_text as string) ||
        "Looks great on every screen size.",
    },
  ];

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
            var s=localStorage.getItem('theme-gale');
            var dark=s==='dark'||(s===null&&${osDark});
            document.documentElement.setAttribute('data-theme',dark?'dark':'light');
          })();
        `,
          }}
        />
      </head>
      <body class="theme-gale archetype-landing">
        <header class="site-header gale-header">
          <div class="gale-header-inner">
            <a class="site-logo gale-logo" href={homeHref}>{site?.title ?? "Gale"}</a>
            <button
              type="button"
              class="nav-toggle"
              aria-expanded="false"
              aria-controls="main-nav"
            >
              {tr("nav.menu", "Menu")}
            </button>
            <nav id="main-nav" class="site-nav gale-nav" aria-label={tr("nav.main", "Main")}>
              {(nav ?? []).slice(0, 8).map((item) => {
                const route = item.route as string;
                const itemNorm = stripSlash(route);
                const active = normalizedPath === itemNorm ||
                  (itemNorm !== "/" && normalizedPath.startsWith(itemNorm + "/"));
                return (
                  <a
                    key={route}
                    href={route}
                    class={active ? "active" : undefined}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.navTitle ?? item.title ?? item.route}
                  </a>
                );
              })}
            </nav>
            <a class="gale-cta-header" href={ctaUrl}>{ctaLabel}</a>
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
        </header>
        {showHero && (
          <section class="gale-hero">
            {(themeConfig?.hero_badge as string) && (
              <span class="gale-hero-badge">{themeConfig?.hero_badge as string}</span>
            )}
            <h1>
              {(themeConfig?.hero_title as string) || site?.title || "Gale"}
            </h1>
            <p>
              {(themeConfig?.hero_subtitle as string) ||
                (themeConfig?.home_subtitle as string) ||
                site?.description ||
                tr("hero.fallback", "Build faster with a modern static site.")}
            </p>
            <div class="gale-hero-actions">
              <a
                class="gale-btn gale-btn-primary"
                href={safeHref(themeConfig?.hero_primary_url) || "/blog/"}
              >
                {(themeConfig?.hero_primary_label as string) ||
                  tr("cta.get_started", "Get started")}
              </a>
              <a
                class="gale-btn gale-btn-secondary"
                href={safeHref(themeConfig?.hero_secondary_url) || "/about-theme/"}
              >
                {(themeConfig?.hero_secondary_label as string) ||
                  tr("cta.learn_more", "Learn more")}
              </a>
            </div>
          </section>
        )}
        {showHero && (
          <section class="gale-features" aria-label={tr("features.label", "Features")}>
            {features.map((f, i) => (
              <article class="gale-feature" key={f.title}>
                <div class="gale-feature-mark" aria-hidden="true">{i + 1}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </section>
        )}
        {children}
        <footer class="site-footer gale-footer">
          <div class="gale-footer-inner">
            <div class="gale-footer-brand">{site?.title ?? "Gale"}</div>
            <div class="gale-footer-links">
              {(nav ?? []).slice(0, 5).map((item) => (
                <a key={item.route} href={item.route}>
                  {item.navTitle ?? item.title ?? item.route}
                </a>
              ))}
            </div>
            {footerText || (
              <>
                © {new Date().getFullYear()} {site?.title ?? "Gale"} ·{" "}
                {tr("footer.powered", "Powered by")}{" "}
                <a href="https://getdune.org">Dune</a>
              </>
            )}
          </div>
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
            var STORAGE_KEY='gale-color-scheme';
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
              localStorage.setItem('theme-gale',next);
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
