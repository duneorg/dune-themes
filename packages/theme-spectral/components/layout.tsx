/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, landing chrome (alt header); footer lives in the landing template. */
  landing?: boolean;
}

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

const MENU_SCRIPT = `
(function(){
  window.addEventListener('load',function(){
    setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
  });
  var body=document.body;
  document.querySelectorAll('a.menuToggle,a[href="#menu"]').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      body.classList.toggle('is-menu-visible');
    });
  });
  document.querySelectorAll('#menu .close').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      body.classList.remove('is-menu-visible');
    });
  });
  document.addEventListener('click',function(e){
    if(!body.classList.contains('is-menu-visible'))return;
    var menu=document.getElementById('menu');
    var header=document.getElementById('header');
    if(menu&&header&&!menu.contains(e.target)&&!header.contains(e.target)){
      body.classList.remove('is-menu-visible');
    }
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape') body.classList.remove('is-menu-visible');
  });
  document.querySelectorAll('a.scrolly[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=a.getAttribute('href');
      if(!id||id==='#')return;
      var el=document.querySelector(id);
      if(!el)return;
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth'});
    });
  });
})();
`;

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
  landing,
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "spectral";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Spectral";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const bodyClass = isLanding
    ? "landing is-preload theme-spectral archetype-landing"
    : "is-preload theme-spectral archetype-landing";
  const creditHref = safeHref("https://html5up.net/spectral") ?? "https://html5up.net/spectral";

  const isActive = (route: string) => {
    const itemPath = stripSlash(route);
    return normalizedPath === itemPath ||
      (itemPath !== "/" && normalizedPath.startsWith(itemPath + "/"));
  };

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <title>{title}</title>
        {description && <meta name="description" content={String(description)} />}
        {siteUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={String(description)} />}
        {siteUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <noscript>
          <link rel="stylesheet" href={`/themes/${themeName}/static/html5up/css/noscript.css`} />
        </noscript>
      </head>
      <body class={bodyClass}>
        <div id="page-wrapper">
          <header id="header" class={isLanding ? "alt" : undefined}>
            <h1><a href={homeHref}>{site?.title ?? "Spectral"}</a></h1>
            <nav id="nav">
              <ul>
                <li class="special">
                  <a href="#menu" class="menuToggle">
                    <span>{tr("nav.menu", "Menu")}</span>
                  </a>
                  <div id="menu">
                    <ul>
                      {navItems.map((item) => (
                        <li key={item.route}>
                          <a
                            href={item.route}
                            class={isActive(item.route) ? "active" : undefined}
                            aria-current={isActive(item.route) ? "page" : undefined}
                          >
                            {item.navTitle ?? item.title ?? item.route}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </header>

          {children}

          {!isLanding && (
            <footer id="footer">
              <ul class="copyright">
                <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                {showCredit && (
                  <li>
                    {tr("credit.design", "Design")}:{" "}
                    <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                  </li>
                )}
              </ul>
            </footer>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: MENU_SCRIPT }} />
      </body>
    </html>
  );
}
