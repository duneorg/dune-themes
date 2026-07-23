/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { navIconClass } from "../utils/content.ts";
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
  const themeName = config?.theme?.name ?? "astral";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Astral";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const creditHref = safeHref("https://html5up.net/astral") ?? "https://html5up.net/astral";

  const isActive = (route: string) => {
    const itemPath = stripSlash(route);
    return normalizedPath === itemPath ||
      (itemPath !== "/" && normalizedPath.startsWith(itemPath + "/"));
  };

  // Ensure home is reachable even if nav omits it
  const hasHome = navItems.some((item) => {
    const p = stripSlash(item.route);
    return p === "/" || p === "/home" || p === stripSlash(homeHref);
  });

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
      <body class="is-preload theme-astral archetype-portfolio">
        <div id="wrapper">
          <nav id="nav" aria-label={tr("nav.main", "Site")}>
            {!hasHome && (
              <a
                href={homeHref}
                class={`${navIconClass("/")} ${
                  normalizedPath === "/" || normalizedPath === "/home" ? "active" : ""
                }`}
              >
                <span>{tr("nav.home", "Home")}</span>
              </a>
            )}
            {navItems.map((item) => (
              <a
                key={item.route}
                href={item.route}
                class={`${navIconClass(item.route)}${isActive(item.route) ? " active" : ""}`}
                aria-current={isActive(item.route) ? "page" : undefined}
              >
                <span>{item.navTitle ?? item.title ?? item.route}</span>
              </a>
            ))}
          </nav>

          <div id="main">{children}</div>

          <div id="footer">
            <ul class="copyright">
              <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
              {showCredit && (
                <li>
                  {tr("credit.design", "Design")}:{" "}
                  <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                </li>
              )}
            </ul>
          </div>
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
