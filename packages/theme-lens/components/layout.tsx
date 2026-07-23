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
  const themeName = config?.theme?.name ?? "lens";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Lens";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Lens";
  const homeSubtitle = (themeConfig?.home_subtitle as string) || site?.description ||
    "A responsive gallery theme for Dune CMS";
  const navItems = (nav ?? []).slice(0, 8);
  const creditHref = safeHref("https://html5up.net/lens") ?? "https://html5up.net/lens";

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
        <noscript>
          <link rel="stylesheet" href={`/themes/${themeName}/static/html5up/css/noscript.css`} />
        </noscript>
      </head>
      <body class="is-preload-0 is-preload-1 is-preload-2 theme-lens archetype-portfolio">
        <div id="main">
          <header id="header">
            <h1>
              <a href={homeHref}>{siteTitle}</a>
            </h1>
            <p>{homeSubtitle}</p>
            {navItems.length > 0 && (
              <ul class="icons" aria-label={tr("nav.main", "Site")}>
                {navItems.map((item) => (
                  <li key={item.route} class={isActive(item.route) ? "active" : undefined}>
                    <a
                      href={item.route}
                      class={navIconClass(item.route)}
                      aria-current={isActive(item.route) ? "page" : undefined}
                    >
                      <span class="label">
                        {item.navTitle ?? item.title ?? item.route}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </header>

          {children}

          <footer id="footer">
            <ul class="copyright">
              <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
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
            var body=document.body;
            setTimeout(function(){ body.classList.remove('is-preload-0'); }, 100);
            setTimeout(function(){ body.classList.remove('is-preload-1'); }, 500);
            setTimeout(function(){ body.classList.remove('is-preload-2'); }, 875);
          });
        `,
          }}
        />
      </body>
    </html>
  );
}
