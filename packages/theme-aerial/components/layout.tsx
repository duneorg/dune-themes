/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { socialLinksFromNav } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, show the fullscreen landing shell only (no content panel). */
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
  const themeName = config?.theme?.name ?? "aerial";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Aerial";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Aerial";
  const tagline = (themeConfig?.tagline as string) || site?.description || "";
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const social = socialLinksFromNav(nav)
    .map((link) => ({ ...link, href: safeHref(link.href) ?? link.href }))
    .filter((link) => link.href);
  const bodyClass = [
    isLanding ? "is-preload" : "is-preload is-content",
    "theme-aerial",
    "archetype-landing",
  ].join(" ");
  const creditHref = safeHref("https://html5up.net/aerial") ?? "https://html5up.net/aerial";

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
        <div id="wrapper">
          <div id="bg"></div>
          <div id="overlay"></div>
          <div id="main">
            <header id="header">
              <h1><a href={homeHref}>{siteTitle}</a></h1>
              {tagline && <p>{tagline}</p>}
              {social.length > 0 && (
                <nav aria-label={tr("nav.main", "Site")}>
                  <ul>
                    {social.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} class={link.icon}>
                          <span class="label">{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </header>

            {!isLanding && children && (
              <div class="dune-content">{children}</div>
            )}

            <footer id="footer">
              <span class="copyright">
                &copy; {new Date().getFullYear()} {copyrightName}
                {showCredit && (
                  <>
                    . {tr("credit.design", "Design")}:{" "}
                    <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                  </>
                )}
                {!showCredit && "."}
              </span>
            </footer>
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.addEventListener('load',function(){
            document.body.classList.remove('is-preload');
          });
          window.ontouchmove=function(){return false;};
          window.onorientationchange=function(){document.body.scrollTop=0;};
        `,
          }}
        />
      </body>
    </html>
  );
}
