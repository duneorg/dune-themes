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
  const themeName = config?.theme?.name ?? "dopetrope";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Dopetrope";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const isHome = currentPath === "/";
  const showBanner = isHome && themeConfig?.show_banner !== false;
  const bannerTitle = (themeConfig?.banner_title as string) || site?.title || "Dopetrope";
  const bannerSubtitle = (themeConfig?.banner_subtitle as string) || site?.description ||
    "A responsive template for Dune CMS";

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
      <body class={isHome ? "homepage is-preload" : "is-preload"}>
        <div id="page-wrapper">
          <section id="header">
            <h1><a href="/">{site?.title ?? "Dopetrope"}</a></h1>
            <nav id="nav">
              <ul>
                {navItems.map((item) => (
                  <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                    <a href={item.route}>
                      {item.navTitle ?? item.frontmatter?.title ?? item.route}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {showBanner && (
              <section id="banner">
                <header>
                  <h2>{bannerTitle}</h2>
                  <p>{bannerSubtitle}</p>
                </header>
              </section>
            )}
          </section>

          <section id="main">
            <div class="container">{children}</div>
          </section>

          <footer id="footer">
            {showCredit && (
              <ul id="copyright" class="copyright">
                <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                <li>Design: <a href="https://html5up.net/dopetrope">HTML5 UP</a></li>
              </ul>
            )}
          </footer>
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
