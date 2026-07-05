/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
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
  const themeName = config?.theme?.name ?? "verti";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Verti";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.tagline as string) || site?.description || "by HTML5 UP";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route ?? "/blog";

  const isActive = (route: string) =>
    currentPath === route || (route !== "/" && currentPath.startsWith(route + "/"));

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
      <body class={isLanding ? "is-preload homepage" : "is-preload no-sidebar"}>
        <div id="page-wrapper">
          <div id="header-wrapper">
            <header id="header" class="container">
              <div id="logo">
                <h1><a href="/">{site?.title ?? "Verti"}</a></h1>
                <span>{tagline}</span>
              </div>
              <nav id="nav">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                      <a href={item.route}>
                        {item.navTitle ?? item.frontmatter?.title ?? item.route}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </header>
          </div>

          {isLanding && (
            <div id="banner-wrapper">
              <div id="banner" class="box container">
                <div class="row">
                  <div class="col-7 col-12-medium">
                    <h2>Hi. This is {site?.title ?? "Verti"}.</h2>
                    <p>{site?.description ?? "A responsive site theme adapted from HTML5 UP for Dune CMS."}</p>
                  </div>
                  <div class="col-5 col-12-medium">
                    <ul>
                      <li><a href={blogRoute} class="button large icon solid fa-arrow-circle-right">Read the blog</a></li>
                      <li><a href="/about" class="button alt large icon solid fa-question-circle">About</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {children}

          {showCredit && (
            <div id="footer-wrapper">
              {isLanding && (
                <footer id="footer" class="container">
                  <div class="row">
                    <div class="col-4 col-12-medium">
                      <section class="widget links">
                        <h3>Explore</h3>
                        <ul class="style2">
                          <li><a href={blogRoute}>Blog</a></li>
                          <li><a href="/search">Search</a></li>
                          <li><a href="/archives">Archives</a></li>
                          <li><a href="/about">About</a></li>
                        </ul>
                      </section>
                    </div>
                    <div class="col-4 col-12-medium">
                      <section class="widget links">
                        <h3>Resources</h3>
                        <ul class="style2">
                          <li><a href="https://getdune.org">Dune CMS</a></li>
                          <li><a href="https://github.com/duneorg/dune-themes">Theme source</a></li>
                          <li><a href="https://html5up.net/verti">HTML5 UP Verti</a></li>
                        </ul>
                      </section>
                    </div>
                    <div class="col-4 col-12-medium">
                      <section class="widget contact last">
                        <h3>Connect</h3>
                        <ul>
                          <li><a href="https://github.com/duneorg/dune-themes" class="icon brands fa-github"><span class="label">GitHub</span></a></li>
                          <li><a href="https://getdune.org" class="icon solid fa-globe"><span class="label">Dune</span></a></li>
                        </ul>
                      </section>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div id="copyright">
                        <ul class="menu">
                          <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
                          <li>Design: <a href="https://html5up.net/verti">HTML5 UP</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </footer>
              )}
              {!isLanding && (
                <footer id="footer" class="container">
                  <div class="row">
                    <div class="col-12">
                      <div id="copyright">
                        <ul class="menu">
                          <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
                          <li>Design: <a href="https://html5up.net/verti">HTML5 UP</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </footer>
              )}
            </div>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
        ` }} />
      </body>
    </html>
  );
}
