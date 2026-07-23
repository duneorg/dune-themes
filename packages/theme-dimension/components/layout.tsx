/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, show landing header only (home). */
  landing?: boolean;
}

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
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
  landing,
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "dimension";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Dimension";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 6);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const headerTitle = (themeConfig?.header_title as string) || site?.title || "Dimension";
  const headerSubtitle = (themeConfig?.header_subtitle as string) || site?.description ||
    "A fully responsive site template for Dune CMS";
  const logoIcon = (themeConfig?.logo_icon as string) || "fa-gem";
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const bodyClass = [
    isLanding ? "is-preload" : "is-preload is-article-visible",
    "theme-dimension",
    "archetype-landing",
  ].join(" ");
  const creditHref = safeHref("https://html5up.net/dimension") ?? "https://html5up.net/dimension";
  const closeLabel = tr("cta.close", "Close");

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
        <div id="wrapper">
          <header id="header">
            <div class="logo">
              <span class={`icon ${logoIcon}`}></span>
            </div>
            <div class="content">
              <div class="inner">
                <h1>{headerTitle}</h1>
                <p>{headerSubtitle}</p>
              </div>
            </div>
            <nav aria-label={tr("nav.main", "Site")}>
              <ul>
                {navItems.map((item) => (
                  <li key={item.route} class={isActive(item.route) ? "active" : undefined}>
                    <a href={item.route} aria-current={isActive(item.route) ? "page" : undefined}>
                      {item.navTitle ?? item.title ?? item.route}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>

          {!isLanding && (
            <div id="main">
              <article class="active">{children}</article>
            </div>
          )}

          {isLanding && children}

          <footer id="footer">
            <p class="copyright">
              &copy; {new Date().getFullYear()} {copyrightName}
              {showCredit && (
                <>
                  . {tr("credit.design", "Design")}:{" "}
                  <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
                </>
              )}
              {!showCredit && "."}
            </p>
          </footer>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var homeHref=${JSON.stringify(homeHref)};
            var closeLabel=${JSON.stringify(closeLabel)};
            window.addEventListener('load',function(){
              setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
              var nav=document.querySelector('#header nav');
              var items=nav?nav.querySelectorAll('li'):[];
              if(nav&&items.length%2===0){
                nav.classList.add('use-middle');
                items[Math.floor(items.length/2)]?.classList.add('is-middle');
              }
            });
            document.querySelector('#main article.active')?.insertAdjacentHTML('afterbegin',
              '<div class="close"><a href="'+homeHref+'">'+closeLabel+'</a></div>');
            document.body.addEventListener('click',function(e){
              if(!document.body.classList.contains('is-article-visible'))return;
              var main=document.getElementById('main');
              if(main&&!main.contains(e.target)) location.href=homeHref;
            });
            document.addEventListener('keydown',function(e){
              if(e.key==='Escape'&&document.body.classList.contains('is-article-visible')){
                location.href=homeHref;
              }
            });
          })();
        `,
          }}
        />
      </body>
    </html>
  );
}
