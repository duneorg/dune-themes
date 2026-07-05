/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  /** When true, show the homepage banner shell only (no content panel). */
  landing?: boolean;
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
  landing,
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "zerofour";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "ZeroFour";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "ZeroFour";
  const tagline = (themeConfig?.tagline as string) || site?.description ||
    "A minimal page shell adapted from HTML5 UP for Dune.";
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const navItems = (nav ?? []).slice(0, 8);
  const isActive = (route: string) =>
    currentPath === route || (route !== "/" && currentPath.startsWith(route + "/"));
  const blogRoute = nav?.find((item) => item.route !== "/" && /blog/i.test(item.route))?.route;
  const bodyClass = ["is-preload", isLanding ? "homepage" : "no-sidebar"].join(" ");

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
                  <h1><a href="/" id="logo">{siteTitle}</a></h1>
                  {navItems.length > 0 && (
                    <nav id="nav">
                      <ul>
                        {navItems.map((item) => (
                          <li
                            key={item.route}
                            class={isActive(item.route) ? "current_page_item" : undefined}
                          >
                            <a href={item.route}>
                              {item.navTitle ?? item.frontmatter?.title ?? item.route}
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
                      Explore
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
                  {showCredit && (
                    <div id="copyright">
                      <ul class="menu">
                        <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
                        <li>
                          Design: <a href="https://html5up.net/zerofour">HTML5 UP</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </footer>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
(function(){
  window.addEventListener('load',function(){
    setTimeout(function(){ document.body.classList.remove('is-preload'); },100);
  });
})();
        ` }} />
      </body>
    </html>
  );
}
