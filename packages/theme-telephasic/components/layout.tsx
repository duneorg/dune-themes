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
  const themeName = config?.theme?.name ?? "telephasic";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Telephasic";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const heroTitle = (themeConfig?.hero_title as string) ||
    `${site?.title ?? "Telephasic"} is a responsive site template by HTML5 UP`;
  const heroSubtitle = (themeConfig?.hero_subtitle as string) || site?.description ||
    "Adapted for Dune CMS — blog posts, search, archives, and inner pages.";
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route ??
    withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const getStarted = tr("cta.get_started", "Get Started");
  const creditHref = safeHref("https://html5up.net/telephasic") ??
    "https://html5up.net/telephasic";
  const githubHref = safeHref("https://github.com/duneorg/dune-themes") ??
    "https://github.com/duneorg/dune-themes";
  const duneHref = safeHref("https://getdune.org") ?? "https://getdune.org";
  const bodyClass = isLanding
    ? "homepage is-preload theme-telephasic archetype-landing"
    : "no-sidebar is-preload theme-telephasic archetype-landing";

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
      <body class={bodyClass}>
        <div id="page-wrapper">
          <div id="header-wrapper">
            <div id="header" class="container">
              <h1 id="logo"><a href={homeHref}>{site?.title ?? "Telephasic"}</a></h1>
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
            </div>

            {isLanding && (
              <section id="hero" class="container">
                <header>
                  <h2>{heroTitle}</h2>
                </header>
                <p>{heroSubtitle}</p>
                <ul class="actions">
                  <li><a href={blogRoute} class="button">{getStarted}</a></li>
                </ul>
              </section>
            )}
          </div>

          {children}

          <div id="footer-wrapper">
            {isLanding && (
              <div id="footer" class="container">
                <header class="major">
                  <h2>Get in touch</h2>
                  <p>
                    Explore the demo blog, search, and archives — or browse the about page
                    for more on this theme.
                  </p>
                </header>
                <div class="row">
                  <section class="col-6 col-12-narrower">
                    <ul class="divided icons">
                      <li class="icon solid fa-book"><a href={blogRoute}>Blog</a></li>
                      <li class="icon solid fa-search"><a href={searchHref}>Search</a></li>
                      <li class="icon solid fa-archive"><a href={archivesHref}>Archives</a></li>
                    </ul>
                  </section>
                  <section class="col-6 col-12-narrower">
                    <ul class="divided icons">
                      <li class="icon brands fa-github">
                        <a href={githubHref}>duneorg/dune-themes</a>
                      </li>
                      <li class="icon solid fa-globe">
                        <a href={duneHref}>getdune.org</a>
                      </li>
                      <li class="icon brands fa-html5">
                        <a href={creditHref}>HTML5 UP Telephasic</a>
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            )}
            <div id="copyright" class="container">
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
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            window.addEventListener('load',function(){
              setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
            });
          })();
        `,
          }}
        />
      </body>
    </html>
  );
}
