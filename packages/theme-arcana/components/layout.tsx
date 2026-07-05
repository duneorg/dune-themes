/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
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
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "arcana";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Arcana";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const isHome = currentPath === "/";
  const showBanner = isHome && themeConfig?.show_banner !== false;
  const bannerTitle = (themeConfig?.banner_title as string) || site?.title || "Arcana";
  const tagline = (themeConfig?.tagline as string) || site?.description ||
    "A responsive site template for Dune CMS";
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route;

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
      <body class="is-preload">
        <div id="page-wrapper">
          <div id="header">
            <h1>
              <a href="/" id="logo">{site?.title ?? "Arcana"}</a>
            </h1>
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
          </div>

          {showBanner && (
            <section id="banner">
              <header>
                <h2>
                  {bannerTitle}
                  {tagline && <>: <em>{tagline}</em></>}
                </h2>
                {blogRoute && <a href={blogRoute} class="button">Learn More</a>}
              </header>
            </section>
          )}

          {children}

          <div id="footer">
            {showCredit && (
              <div class="copyright">
                <ul class="menu">
                  <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
                  <li>Design: <a href="https://html5up.net/arcana">HTML5 UP</a></li>
                </ul>
              </div>
            )}
          </div>
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
