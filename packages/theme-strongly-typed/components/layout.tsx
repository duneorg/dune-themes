/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
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
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "strongly-typed";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Strongly Typed";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.header_tagline as string) || site?.description ||
    "A responsive HTML5 site template for Dune CMS";
  const isHome = currentPath === "/";
  const showBanner = isHome && themeConfig?.show_banner !== false;
  const bannerText = (themeConfig?.banner_text as string) ||
    "Use this space for profound thoughts — or an introduction to your site.";

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
      <body class={isHome ? "homepage is-preload" : "no-sidebar is-preload"}>
        <div id="page-wrapper">
          <section id="header">
            <div class="container">
              <h1 id="logo"><a href="/">{site?.title ?? "Strongly Typed"}</a></h1>
              <p>{tagline}</p>
              <nav id="nav">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                      <a href={item.route}>
                        <span>{item.navTitle ?? item.frontmatter?.title ?? item.route}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>

          {showBanner && (
            <section id="banner">
              <div class="container">
                <p>{bannerText}</p>
              </div>
            </section>
          )}

          <section id="main">
            <div class="container">{children}</div>
            {showCredit && (
              <div id="copyright" class="container">
                <ul class="links">
                  <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                  <li>Design: <a href="https://html5up.net/strongly-typed">HTML5 UP</a></li>
                </ul>
              </div>
            )}
          </section>
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
