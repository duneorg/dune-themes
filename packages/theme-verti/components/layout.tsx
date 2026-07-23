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

function withBase(basePath: string, path: string): string {
  const joined = `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
  return joined.replace(/([^:]\/)\/+/g, "$1") || "/";
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
  const themeName = config?.theme?.name ?? "verti";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Verti";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.tagline as string) || site?.description || "by HTML5 UP";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route ??
    withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const creditHref = safeHref("https://html5up.net/verti") ?? "https://html5up.net/verti";
  const githubHref = safeHref("https://github.com/duneorg/dune-themes") ??
    "https://github.com/duneorg/dune-themes";
  const duneHref = safeHref("https://getdune.org") ?? "https://getdune.org";
  const bodyClass = [
    "is-preload",
    isLanding ? "homepage" : "no-sidebar",
    "theme-verti",
    "archetype-landing",
  ].join(" ");

  const isActive = (route: string) => {
    const itemPath = stripSlash(route);
    return normalizedPath === itemPath ||
      (itemPath !== "/" && normalizedPath.startsWith(itemPath + "/"));
  };

  const copyrightBlock = (
    <div id="copyright">
      <ul class="menu">
        <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
        {showCredit && (
          <li>
            {tr("credit.design", "Design")}:{" "}
            <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
          </li>
        )}
      </ul>
    </div>
  );

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
      <body class={bodyClass}>
        <div id="page-wrapper">
          <div id="header-wrapper">
            <header id="header" class="container">
              <div id="logo">
                <h1><a href={homeHref}>{site?.title ?? "Verti"}</a></h1>
                <span>{tagline}</span>
              </div>
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
          </div>

          {isLanding && (
            <div id="banner-wrapper">
              <div id="banner" class="box container">
                <div class="row">
                  <div class="col-7 col-12-medium">
                    <h2>Hi. This is {site?.title ?? "Verti"}.</h2>
                    <p>
                      {site?.description ??
                        "A responsive site theme adapted from HTML5 UP for Dune CMS."}
                    </p>
                  </div>
                  <div class="col-5 col-12-medium">
                    <ul>
                      <li>
                        <a href={blogRoute} class="button large icon solid fa-arrow-circle-right">
                          {tr("cta.read_blog", "Read the blog")}
                        </a>
                      </li>
                      <li>
                        <a href={aboutHref} class="button alt large icon solid fa-question-circle">
                          {tr("cta.about", "About")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {children}

          <div id="footer-wrapper">
            {isLanding
              ? (
                <footer id="footer" class="container">
                  <div class="row">
                    <div class="col-4 col-12-medium">
                      <section class="widget links">
                        <h3>{tr("nav.explore", "Explore")}</h3>
                        <ul class="style2">
                          <li><a href={blogRoute}>{tr("nav.blog", "Blog")}</a></li>
                          <li><a href={searchHref}>{tr("search.title", "Search")}</a></li>
                          <li><a href={archivesHref}>{tr("nav.archives", "Archives")}</a></li>
                          <li><a href={aboutHref}>{tr("cta.about", "About")}</a></li>
                        </ul>
                      </section>
                    </div>
                    <div class="col-4 col-12-medium">
                      <section class="widget links">
                        <h3>{tr("nav.resources", "Resources")}</h3>
                        <ul class="style2">
                          <li>
                            <a href={duneHref} target="_blank" rel="noopener noreferrer">
                              Dune CMS
                            </a>
                          </li>
                          <li>
                            <a href={githubHref} target="_blank" rel="noopener noreferrer">
                              Theme source
                            </a>
                          </li>
                          <li>
                            <a href={creditHref} target="_blank" rel="noopener noreferrer">
                              HTML5 UP Verti
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                    <div class="col-4 col-12-medium">
                      <section class="widget contact last">
                        <h3>{tr("nav.connect", "Connect")}</h3>
                        <ul>
                          <li>
                            <a
                              href={githubHref}
                              class="icon brands fa-github"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span class="label">GitHub</span>
                            </a>
                          </li>
                          <li>
                            <a
                              href={duneHref}
                              class="icon solid fa-globe"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span class="label">Dune</span>
                            </a>
                          </li>
                        </ul>
                      </section>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">{copyrightBlock}</div>
                  </div>
                </footer>
              )
              : (
                <footer id="footer" class="container">
                  <div class="row">
                    <div class="col-12">{copyrightBlock}</div>
                  </div>
                </footer>
              )}
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
