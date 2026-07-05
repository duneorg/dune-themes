/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  /** When true, show home banner and landing shell. */
  landing?: boolean;
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
  landing,
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "halcyonic";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Halcyonic";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const bannerText = (themeConfig?.banner_text as string) || site?.description ||
    "Learn all about it here …";
  const bannerImage = (themeConfig?.banner_image as string) ||
    `/themes/${themeName}/static/html5up/images/banner.jpg`;
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route ?? "/blog";

  const isActive = (route: string) =>
    currentPath === route || (route !== "/" && currentPath.startsWith(route + "/"));

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
      <body class={isLanding ? "is-preload" : "subpage is-preload"}>
        <div id="page-wrapper">
          <section id="header">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h1><a href="/" id="logo">{site?.title ?? "Halcyonic"}</a></h1>
                  <nav id="nav">
                    {navItems.map((item) => (
                      <a
                        key={item.route}
                        href={item.route}
                        class={isActive(item.route) ? "current" : undefined}
                      >
                        {item.navTitle ?? item.frontmatter?.title ?? item.route}
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
                      <a href={blogRoute} class="button-large">Read the blog</a>
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

          {showCredit && (
            <div id="copyright">
              &copy; {new Date().getFullYear()} {copyrightName}. Design:{" "}
              <a href="https://html5up.net/halcyonic">HTML5 UP</a>
            </div>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
        ` }} />
      </body>
    </html>
  );
}
