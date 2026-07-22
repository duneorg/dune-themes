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
  const themeName = config?.theme?.name ?? "strongly-typed";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Strongly Typed";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.header_tagline as string) || site?.description ||
    "A responsive HTML5 site template for Dune CMS";
  // Fixture home is often /home/ — treat that like root for homepage chrome.
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const showBanner = isHome && themeConfig?.show_banner !== false;
  const bannerText = (themeConfig?.banner_text as string) ||
    "Use this space for profound thoughts — or an introduction to your site.";
  const creditHref = safeHref("https://html5up.net/strongly-typed") ??
    "https://html5up.net/strongly-typed";

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
      <body class={`${isHome ? "homepage" : "no-sidebar"} is-preload theme-strongly-typed archetype-blog`}>
        <div id="page-wrapper">
          <section id="header">
            <div class="container">
              <h1 id="logo"><a href={homeHref}>{site?.title ?? "Strongly Typed"}</a></h1>
              <p>{tagline}</p>
              <nav id="nav" aria-label={tr("nav.main", "Site")}>
                <ul>
                  {navItems.map((item) => (
                    <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                      <a href={item.route} aria-current={isActive(item.route) ? "page" : undefined}>
                        <span>{item.navTitle ?? item.title ?? item.route}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>

          {showBanner && (
            <section id="banner">
              <div class="container">
                <p>{bannerText}</p>
              </div>
            </section>
          )}

          <section id="main">
            <div class="container">{children}</div>
            <div id="copyright" class="container">
              <ul class="links">
                <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                {showCredit && (
                  <li>
                    {tr("credit.design", "Design")}:{" "}
                    <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                  </li>
                )}
              </ul>
            </div>
          </section>
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
