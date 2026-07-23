/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, show the homepage banner shell only (no content panel). */
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
  const themeName = config?.theme?.name ?? "zerofour";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "ZeroFour";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "ZeroFour";
  const tagline = (themeConfig?.tagline as string) || site?.description ||
    "A minimal page shell adapted from HTML5 UP for Dune.";
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const navItems = (nav ?? []).slice(0, 8);
  const blogRoute = nav?.find((item) => item.route !== "/" && /blog/i.test(item.route))?.route ??
    `${basePath}/blog`.replace(/([^:]\/)\/+/g, "$1");
  const bodyClass = [
    "is-preload",
    isLanding ? "homepage" : "no-sidebar",
    "theme-zerofour",
    "archetype-landing",
  ].join(" ");
  const creditHref = safeHref("https://html5up.net/zerofour") ?? "https://html5up.net/zerofour";

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
      </head>
      <body class={bodyClass}>
        <div id="page-wrapper">
          <div id="header-wrapper">
            <div class="container">
              <header id="header">
                <div class="inner">
                  <h1><a href={homeHref} id="logo">{siteTitle}</a></h1>
                  {navItems.length > 0 && (
                    <nav id="nav" aria-label={tr("nav.main", "Site")}>
                      <ul>
                        {navItems.map((item) => (
                          <li
                            key={item.route}
                            class={isActive(item.route) ? "current_page_item" : undefined}
                          >
                            <a
                              href={item.route}
                              aria-current={isActive(item.route) ? "page" : undefined}
                            >
                              {item.navTitle ?? item.title ?? item.route}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  )}
                </div>
              </header>

              {isLanding && (
                <div id="banner">
                  <h2>
                    <strong>{siteTitle}:</strong> {tagline}
                  </h2>
                  {blogRoute && (
                    <a href={blogRoute} class="button large icon solid fa-check-circle">
                      {tr("cta.explore", "Explore")}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {!isLanding && children && (
            <div id="main-wrapper">
              <div class="wrapper style2">
                <div class="inner">
                  <div class="container">
                    <div id="content">{children}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div id="footer-wrapper">
            <footer id="footer" class="container">
              <div class="row">
                <div class="col-12">
                  <div id="copyright">
                    <ul class="menu">
                      <li>
                        &copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.
                      </li>
                      {showCredit && (
                        <li>
                          {tr("credit.design", "Design")}:{" "}
                          <a href={creditHref} target="_blank" rel="noopener noreferrer">
                            HTML5 UP
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  window.addEventListener('load',function(){
    setTimeout(function(){ document.body.classList.remove('is-preload'); },100);
  });
})();
        `,
          }}
        />
      </body>
    </html>
  );
}
