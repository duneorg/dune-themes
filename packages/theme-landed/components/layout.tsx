/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, landing body class; landing template owns the footer. */
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
  const themeName = config?.theme?.name ?? "landed";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Landed";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const bodyClass = isLanding
    ? "is-preload landing theme-landed archetype-landing"
    : "is-preload theme-landed archetype-landing";
  const creditHref = safeHref("https://html5up.net/landed") ?? "https://html5up.net/landed";

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
      <body class={bodyClass}>
        <div id="page-wrapper">
          <header id="header">
            <h1 id="logo"><a href={homeHref}>{site?.title ?? "Landed"}</a></h1>
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

          {children}

          {!isLanding && (
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
          )}
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            window.addEventListener('load',function(){
              setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
            });
            document.querySelectorAll('a.scrolly[href^="#"]').forEach(function(a){
              a.addEventListener('click',function(e){
                var id=a.getAttribute('href');
                if(!id||id==='#')return;
                var el=document.querySelector(id);
                if(!el)return;
                e.preventDefault();
                el.scrollIntoView({behavior:'smooth'});
              });
            });
          })();
        `,
          }}
        />
      </body>
    </html>
  );
}
