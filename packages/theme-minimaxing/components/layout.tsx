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
  const themeName = config?.theme?.name ?? "minimaxing";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Minimaxing";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const bannerTitle = (themeConfig?.banner_title as string) || "Put something cool here!";
  const bannerSubtitle = (themeConfig?.tagline as string) || site?.description ||
    "And put something almost as cool here, but a bit longer …";

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
      <body>
        <div id="page-wrapper">
          <div id="header-wrapper">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <header id="header">
                    <h1><a href="/" id="logo">{site?.title ?? "Minimaxing"}</a></h1>
                    <nav id="nav">
                      {navItems.map((item) => (
                        <a
                          key={item.route}
                          href={item.route}
                          class={isActive(item.route) ? "current-page-item" : undefined}
                        >
                          {item.navTitle ?? item.frontmatter?.title ?? item.route}
                        </a>
                      ))}
                    </nav>
                  </header>
                </div>
              </div>
            </div>
          </div>

          {isLanding && (
            <div id="banner-wrapper">
              <div class="container">
                <div id="banner">
                  <h2>{bannerTitle}</h2>
                  <span>{bannerSubtitle}</span>
                </div>
              </div>
            </div>
          )}

          {children}

          {showCredit && (
            <div id="footer-wrapper">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <div id="copyright">
                      &copy; {new Date().getFullYear()} {copyrightName}. All rights reserved. |
                      Design: <a href="https://html5up.net/minimaxing">HTML5 UP</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
