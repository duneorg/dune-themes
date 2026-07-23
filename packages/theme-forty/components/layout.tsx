/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, show home banner and alt header. */
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
  const themeName = config?.theme?.name ?? "forty";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Forty";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Forty";
  const tagline = (themeConfig?.tagline as string) || "by HTML5 UP";
  const bannerTitle = (themeConfig?.banner_title as string) || `Hi, my name is ${siteTitle}`;
  const bannerSubtitle = site?.description || "A responsive site template for Dune CMS";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const showBanner = isLanding && themeConfig?.show_banner !== false;
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route ??
    `${basePath}/blog`.replace(/([^:]\/)\/+/g, "$1");
  const getStarted = tr("cta.get_started", "Get Started");
  const creditHref = safeHref("https://html5up.net/forty") ?? "https://html5up.net/forty";

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
      <body class="is-preload theme-forty archetype-landing">
        <div id="wrapper">
          <header id="header" class={isLanding ? "alt" : undefined}>
            <a href={homeHref} class="logo">
              <strong>{siteTitle}</strong> <span>{tagline}</span>
            </a>
            <nav>
              <a href="#menu">{tr("nav.menu", "Menu")}</a>
            </nav>
          </header>

          <nav id="menu" aria-label={tr("nav.main", "Site")}>
            <ul class="links">
              {navItems.map((item) => (
                <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                  <a href={item.route} aria-current={isActive(item.route) ? "page" : undefined}>
                    {item.navTitle ?? item.title ?? item.route}
                  </a>
                </li>
              ))}
            </ul>
            {blogRoute && (
              <ul class="actions stacked">
                <li>
                  <a href={blogRoute} class="button primary fit">{getStarted}</a>
                </li>
              </ul>
            )}
          </nav>

          {showBanner && (
            <section id="banner" class="major">
              <div class="inner">
                <header class="major">
                  <h1>{bannerTitle}</h1>
                </header>
                <div class="content">
                  <p>{bannerSubtitle}</p>
                  {blogRoute && (
                    <ul class="actions">
                      <li>
                        <a href={blogRoute} class="button next scrolly">{getStarted}</a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </section>
          )}

          <div id="main" class={isLanding ? undefined : "alt"}>{children}</div>

          <footer id="footer">
            <div class="inner">
              <ul class="copyright">
                <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                {showCredit && (
                  <li>
                    {tr("credit.design", "Design")}:{" "}
                    <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                  </li>
                )}
              </ul>
            </div>
          </footer>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            window.addEventListener('load',function(){
              setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
            });
            var body=document.body;
            document.querySelectorAll('a[href="#menu"]').forEach(function(a){
              a.addEventListener('click',function(e){
                e.preventDefault();
                body.classList.toggle('is-menu-visible');
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
        `,
          }}
        />
      </body>
    </html>
  );
}
