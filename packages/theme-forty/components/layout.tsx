/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  /** When true, show home banner and alt header. */
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
  const themeName = config?.theme?.name ?? "forty";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Forty";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Forty";
  const tagline = (themeConfig?.tagline as string) || "by HTML5 UP";
  const bannerTitle = (themeConfig?.banner_title as string) || `Hi, my name is ${siteTitle}`;
  const bannerSubtitle = site?.description || "A responsive site template for Dune CMS";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const showBanner = isLanding && themeConfig?.show_banner !== false;
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route;

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
        <noscript>
          <link rel="stylesheet" href={`/themes/${themeName}/static/html5up/css/noscript.css`} />
        </noscript>
      </head>
      <body class="is-preload">
        <div id="wrapper">
          <header id="header" class={isLanding ? "alt" : undefined}>
            <a href="/" class="logo"><strong>{siteTitle}</strong> <span>{tagline}</span></a>
            <nav>
              <a href="#menu">Menu</a>
            </nav>
          </header>

          <nav id="menu">
            <ul class="links">
              {navItems.map((item) => (
                <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                  <a href={item.route}>
                    {item.navTitle ?? item.frontmatter?.title ?? item.route}
                  </a>
                </li>
              ))}
            </ul>
            {blogRoute && (
              <ul class="actions stacked">
                <li><a href={blogRoute} class="button primary fit">Get Started</a></li>
              </ul>
            )}
          </nav>

          {showBanner && (
            <section id="banner" class="major">
              <div class="inner">
                <header class="major">
                  <h1>{bannerTitle}</h1>
                </header>
                <div class="content">
                  <p>{bannerSubtitle}</p>
                  {blogRoute && (
                    <ul class="actions">
                      <li><a href={blogRoute} class="button next scrolly">Get Started</a></li>
                    </ul>
                  )}
                </div>
              </div>
            </section>
          )}

          <div id="main" class={isLanding ? undefined : "alt"}>{children}</div>

          {showCredit && (
            <footer id="footer">
              <div class="inner">
                <ul class="copyright">
                  <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                  <li>Design: <a href="https://html5up.net/forty">HTML5 UP</a></li>
                </ul>
              </div>
            </footer>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
          document.querySelectorAll('a.scrolly[href^="#"]').forEach(function(a){
            a.addEventListener('click',function(e){
              var id=a.getAttribute('href');
              if(!id||id==='#')return;
              var el=document.querySelector(id);
              if(!el)return;
              e.preventDefault();
              el.scrollIntoView({behavior:'smooth'});
            });
          });
        ` }} />
      </body>
    </html>
  );
}
