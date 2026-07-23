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
  const themeName = config?.theme?.name ?? "stellar";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Stellar";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = site?.description ||
    "Just another free, fully responsive site template built for Dune CMS.";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const logoSrc = safeHref(themeConfig?.logo_url) ||
    `/themes/${themeName}/static/html5up/images/logo.svg`;
  const creditHref = safeHref("https://html5up.net/stellar") ?? "https://html5up.net/stellar";

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
      <body class="is-preload theme-stellar archetype-landing">
        <div id="wrapper">
          {isLanding ? (
            <>
              <header id="header" class="alt">
                <span class="logo"><img src={logoSrc} alt="" /></span>
                <h1><a href={homeHref}>{site?.title ?? "Stellar"}</a></h1>
                <p>{tagline}</p>
              </header>
              <nav id="nav" aria-label={tr("nav.main", "Site")}>
                <ul>
                  {navItems.map((item) => (
                    <li key={item.route} class={isActive(item.route) ? "active" : undefined}>
                      <a href={item.route} aria-current={isActive(item.route) ? "page" : undefined}>
                        {item.navTitle ?? item.title ?? item.route}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          ) : (
            <header id="header">
              <h1>{pageTitle || page?.frontmatter?.title || site?.title}</h1>
              {description && <p>{String(description)}</p>}
            </header>
          )}

          {children}

          {!isLanding && (
            <footer id="footer">
              <p class="copyright">
                &copy; {new Date().getFullYear()} {copyrightName}
                {showCredit && (
                  <>
                    . {tr("credit.design", "Design")}:{" "}
                    <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
                  </>
                )}
                {!showCredit && "."}
              </p>
            </footer>
          )}
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
          document.querySelectorAll('a[href^="#"]').forEach(function(a){
            a.addEventListener('click',function(e){
              var id=a.getAttribute('href');
              if(!id||id==='#')return;
              var el=document.querySelector(id);
              if(!el)return;
              e.preventDefault();
              el.scrollIntoView({behavior:'smooth'});
            });
          });
        `,
          }}
        />
      </body>
    </html>
  );
}
