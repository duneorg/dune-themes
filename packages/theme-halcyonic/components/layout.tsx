/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, show home banner and landing shell. */
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
  const themeName = config?.theme?.name ?? "halcyonic";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Halcyonic";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const bannerText = (themeConfig?.banner_text as string) || site?.description ||
    "Learn all about it here …";
  const bannerImage = safeHref(themeConfig?.banner_image) ||
    `/themes/${themeName}/static/html5up/images/banner.jpg`;
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route ??
    `${basePath}/blog`.replace(/([^:]\/)\/+/g, "$1");
  const creditHref = safeHref("https://html5up.net/halcyonic") ?? "https://html5up.net/halcyonic";
  const bodyClass = [
    isLanding ? "is-preload" : "subpage is-preload",
    "theme-halcyonic",
    "archetype-landing",
  ].join(" ");

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
          <section id="header">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h1><a href={homeHref} id="logo">{site?.title ?? "Halcyonic"}</a></h1>
                  <nav id="nav" aria-label={tr("nav.main", "Site")}>
                    {navItems.map((item) => (
                      <a
                        key={item.route}
                        href={item.route}
                        class={isActive(item.route) ? "current" : undefined}
                        aria-current={isActive(item.route) ? "page" : undefined}
                      >
                        {item.navTitle ?? item.title ?? item.route}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
            {isLanding && (
              <div id="banner">
                <div class="container">
                  <div class="row">
                    <div class="col-6 col-12-medium">
                      <p>{bannerText}</p>
                      <a href={blogRoute} class="button-large">
                        {tr("cta.read_blog", "Read the blog")}
                      </a>
                    </div>
                    <div class="col-6 col-12-medium imp-medium">
                      <a href={blogRoute} class="bordered-feature-image">
                        <img src={bannerImage} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {isLanding ? children : (
            <section id="content">
              <div class="container">
                <div class="row">
                  <div class="col-12">{children}</div>
                </div>
              </div>
            </section>
          )}

          <div id="copyright">
            &copy; {new Date().getFullYear()} {copyrightName}
            {showCredit && (
              <>
                . {tr("credit.design", "Design")}:{" "}
                <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
              </>
            )}
            {!showCredit && "."}
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
