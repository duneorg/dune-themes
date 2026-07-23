/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
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
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "alpha";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Alpha";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const showBanner = isHome && themeConfig?.show_banner !== false;
  const bannerTitle = (themeConfig?.banner_title as string) || site?.title || "Alpha";
  const bannerSubtitle = (themeConfig?.tagline as string) || site?.description ||
    "A responsive site template for Dune CMS";
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route ??
    `${basePath}/blog`.replace(/([^:]\/)\/+/g, "$1");
  const creditHref = safeHref("https://html5up.net/alpha") ?? "https://html5up.net/alpha";

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
      <body class={isHome ? "landing is-preload theme-alpha archetype-landing" : "is-preload theme-alpha archetype-landing"}>
        <div id="page-wrapper">
          <header id="header" class={isHome ? "alt" : undefined}>
            <h1><a href={homeHref}>{site?.title ?? "Alpha"}</a></h1>
            <nav id="nav" aria-label={tr("nav.main", "Site")}>
              <ul>
                {navItems.map((item) => (
                  <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                    <a href={item.route} aria-current={isActive(item.route) ? "page" : undefined}>
                      {item.navTitle ?? item.title ?? item.route}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>

          {showBanner && (
            <section id="banner">
              <h2>{bannerTitle}</h2>
              <p>{bannerSubtitle}</p>
              {blogRoute && (
                <ul class="actions special">
                  <li>
                    <a href={blogRoute} class="button primary">
                      {tr("cta.read_blog", "Read the Blog")}
                    </a>
                  </li>
                  <li>
                    <a href={blogRoute} class="button">
                      {tr("cta.learn_more", "Learn More")}
                    </a>
                  </li>
                </ul>
              )}
            </section>
          )}

          <section id="main" class="container">
            {children}
          </section>

          <footer id="footer">
            <ul class="copyright">
              <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
              {showCredit && (
                <li>
                  {tr("credit.design", "Design")}:{" "}
                  <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                </li>
              )}
            </ul>
          </footer>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
        `,
          }}
        />
      </body>
    </html>
  );
}
