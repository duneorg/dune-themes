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
  const themeName = config?.theme?.name ?? "multiverse";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Multiverse";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const siteTitle = site?.title ?? "Multiverse";
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
        <noscript>
          <link rel="stylesheet" href={`/themes/${themeName}/static/html5up/css/noscript.css`} />
        </noscript>
      </head>
      <body class="is-preload">
        <div id="wrapper">
          <header id="header">
            <h1><a href="/"><strong>{siteTitle}</strong> for Dune</a></h1>
            <nav>
              <ul>
                {navItems.map((item) => (
                  <li key={item.route} class={isActive(item.route) ? "active" : undefined}>
                    <a href={item.route}>
                      {item.navTitle ?? item.frontmatter?.title ?? item.route}
                    </a>
                  </li>
                ))}
                {!navItems.some((i) => i.route === blogRoute) && (
                  <li><a href={blogRoute} class="icon solid fa-info-circle">Blog</a></li>
                )}
              </ul>
            </nav>
          </header>

          {isLanding ? children : (
            <div id="main" class="dune-inner">
              <article class="thumb">{children}</article>
            </div>
          )}

          {showCredit && !isLanding && (
            <footer id="footer" class="panel dune-footer-compact">
              <p class="copyright">
                &copy; {new Date().getFullYear()} {copyrightName}. Design:{" "}
                <a href="https://html5up.net/multiverse">HTML5 UP</a>
              </p>
            </footer>
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
