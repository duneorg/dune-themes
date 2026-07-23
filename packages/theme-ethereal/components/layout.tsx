/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, render panel-based landing shell. */
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
  const themeName = config?.theme?.name ?? "ethereal";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Ethereal";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Ethereal";
  const bannerTitle = (themeConfig?.banner_title as string) || siteTitle;
  const tagline = (themeConfig?.tagline as string) || site?.description ||
    "A responsive site template for Dune CMS";
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const showBanner = isLanding && themeConfig?.show_banner !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route ??
    `${basePath}/blog`.replace(/([^:]\/)\/+/g, "$1");
  const creditHref = safeHref("https://html5up.net/ethereal") ?? "https://html5up.net/ethereal";
  const bannerImg = `/themes/${themeName}/static/html5up/images/pic01.jpg`;

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
      <body class="is-preload theme-ethereal archetype-landing">
        <div id="page-wrapper">
          <div id="wrapper">
            {showBanner && (
              <section class="panel banner right">
                <div class="content color0 span-3-75">
                  <h1 class="major">
                    {tr("banner.hello", "Hello, my name")}<br />
                    {tr("banner.is", "is")} {bannerTitle}
                  </h1>
                  <p>{tagline}</p>
                  {blogRoute && (
                    <ul class="actions">
                      <li>
                        <a
                          href={blogRoute}
                          class="button primary color1 circle icon solid fa-angle-right"
                        >
                          {tr("cta.next", "Next")}
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
                <div class="image filtered span-1-75" data-position="25% 25%">
                  <img src={bannerImg} alt="" />
                </div>
              </section>
            )}

            {!isLanding && navItems.length > 0 && (
              <section class="panel color1">
                <div class="intro joined">
                  <nav aria-label={tr("nav.main", "Site")}>
                    <ul class="actions">
                      <li>
                        <a href={homeHref} class="button primary">
                          {tr("nav.home", "Home")}
                        </a>
                      </li>
                      {navItems.map((item) => (
                        <li key={item.route}>
                          <a href={item.route} class="button primary">
                            {item.navTitle ?? item.title ?? item.route}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </section>
            )}

            {isLanding ? children : (
              <section class="panel">
                <div class="inner">{children}</div>
              </section>
            )}

            <div class="copyright">
              &copy; {new Date().getFullYear()} {copyrightName}.
              {showCredit && (
                <>
                  {" "}{tr("credit.design", "Design")}:{" "}
                  <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
                </>
              )}
            </div>
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
