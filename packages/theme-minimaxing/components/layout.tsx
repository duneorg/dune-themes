/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
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
  const themeName = config?.theme?.name ?? "minimaxing";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Minimaxing";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const bannerTitle = (themeConfig?.banner_title as string) || "Put something cool here!";
  const bannerSubtitle = (themeConfig?.tagline as string) || site?.description ||
    "And put something almost as cool here, but a bit longer …";
  const creditHref = safeHref("https://html5up.net/minimaxing") ??
    "https://html5up.net/minimaxing";

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
      <body class="theme-minimaxing archetype-landing">
        <div id="page-wrapper">
          <div id="header-wrapper">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <header id="header">
                    <h1><a href={homeHref} id="logo">{site?.title ?? "Minimaxing"}</a></h1>
                    <nav id="nav" aria-label={tr("nav.main", "Site")}>
                      {navItems.map((item) => (
                        <a
                          key={item.route}
                          href={item.route}
                          class={isActive(item.route) ? "current-page-item" : undefined}
                          aria-current={isActive(item.route) ? "page" : undefined}
                        >
                          {item.navTitle ?? item.title ?? item.route}
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

          <div id="footer-wrapper">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div id="copyright">
                    &copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.
                    {showCredit && (
                      <>
                        {" "}| {tr("credit.design", "Design")}:{" "}
                        <a href={creditHref} target="_blank" rel="noopener noreferrer">
                          HTML5 UP
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
