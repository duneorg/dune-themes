/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  /** When true, show the hero header (#header). */
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
  const themeName = config?.theme?.name ?? "directive";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Directive";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Directive";
  const bannerTitle = (themeConfig?.banner_title as string) || `Hi. This is ${siteTitle}.`;
  const tagline = (themeConfig?.tagline as string) || site?.description ||
    "A responsive site template for Dune CMS";
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const showBanner = isLanding && themeConfig?.show_banner !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route;

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
        {showBanner && (
          <div id="header">
            <span class="logo icon fa-paper-plane"></span>
            <h1>{bannerTitle}</h1>
            <p>{tagline}</p>
            {blogRoute && (
              <ul class="actions special">
                <li><a href={blogRoute} class="button">Get Started</a></li>
              </ul>
            )}
          </div>
        )}

        <div id="main">
          {!isLanding && navItems.length > 0 && (
            <nav class="container medium">
              <ul class="actions special">
                {navItems.map((item) => (
                  <li key={item.route}>
                    <a href={item.route} class="button alt">
                      {item.navTitle ?? item.frontmatter?.title ?? item.route}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {children}
        </div>

        {showCredit && (
          <div id="footer">
            <div class="container medium">
              <ul class="copyright">
                <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
                <li>Design: <a href="https://html5up.net/directive">HTML5 UP</a></li>
              </ul>
            </div>
          </div>
        )}

        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
        ` }} />
      </body>
    </html>
  );
}
