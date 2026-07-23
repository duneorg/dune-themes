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

function withBase(basePath: string, path: string): string {
  const joined = `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
  return joined.replace(/([^:]\/)\/+/g, "$1") || "/";
}

export default function Layout({
  page,
  pageTitle,
  site,
  config,
  pathname,
  dir,
  children,
  themeConfig,
  t,
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "strata";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Strata";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.tagline as string) || site?.description ||
    "A responsive portfolio theme for Dune CMS";
  const avatarUrl = safeHref(themeConfig?.avatar) ||
    `/themes/${themeName}/static/html5up/images/avatar.jpg`;
  const siteTitle = site?.title ?? "Strata";
  const creditHref = safeHref("https://html5up.net/strata") ?? "https://html5up.net/strata";
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const aboutHref = withBase(basePath, "/about");
  const isHome = normalizedPath === "/" || normalizedPath === "/home";

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
      <body class="is-preload theme-strata archetype-portfolio">
        <header id="header">
          <div class="inner">
            <a href={homeHref} class="image avatar">
              <img src={avatarUrl} alt="" />
            </a>
            <h1>
              <strong><a href={homeHref}>{siteTitle}</a></strong>
              {tagline && (
                <>
                  , {tagline}
                </>
              )}
            </h1>
          </div>
        </header>

        <div id="main">{children}</div>

        <footer id="footer">
          <div class="inner">
            <ul class="icons">
              <li>
                <a href={isHome ? blogHref : homeHref} class="icon solid fa-home" aria-label={tr("nav.home", "Home")}>
                  <span class="label">{tr("nav.home", "Home")}</span>
                </a>
              </li>
              <li>
                <a href={blogHref} class="icon solid fa-folder" aria-label={tr("nav.blog", "Projects")}>
                  <span class="label">{tr("nav.blog", "Projects")}</span>
                </a>
              </li>
              <li>
                <a href={searchHref} class="icon solid fa-search" aria-label={tr("search.title", "Search")}>
                  <span class="label">{tr("search.title", "Search")}</span>
                </a>
              </li>
              <li>
                <a href={archivesHref} class="icon solid fa-archive" aria-label={tr("nav.archives", "Archives")}>
                  <span class="label">{tr("nav.archives", "Archives")}</span>
                </a>
              </li>
              <li>
                <a href={aboutHref} class="icon solid fa-envelope" aria-label={tr("nav.about", "About")}>
                  <span class="label">{tr("nav.about", "About")}</span>
                </a>
              </li>
            </ul>
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
        </footer>

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
