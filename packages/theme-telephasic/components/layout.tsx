/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
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
  const themeName = config?.theme?.name ?? "telephasic";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Telephasic";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const heroTitle = (themeConfig?.hero_title as string) ||
    `${site?.title ?? "Telephasic"} is a responsive site template by HTML5 UP`;
  const heroSubtitle = (themeConfig?.hero_subtitle as string) || site?.description ||
    "Adapted for Dune CMS — blog posts, search, archives, and inner pages.";
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
      <body class={isLanding ? "homepage is-preload" : "no-sidebar is-preload"}>
        <div id="page-wrapper">
          <div id="header-wrapper">
            <div id="header" class="container">
              <h1 id="logo"><a href="/">{site?.title ?? "Telephasic"}</a></h1>
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
            </div>

            {isLanding && (
              <section id="hero" class="container">
                <header>
                  <h2>{heroTitle}</h2>
                </header>
                <p>{heroSubtitle}</p>
                <ul class="actions">
                  <li><a href={blogRoute} class="button">Read the blog</a></li>
                </ul>
              </section>
            )}
          </div>

          {children}

          {showCredit && (
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
                        <li class="icon solid fa-search"><a href="/search">Search</a></li>
                        <li class="icon solid fa-archive"><a href="/archives">Archives</a></li>
                      </ul>
                    </section>
                    <section class="col-6 col-12-narrower">
                      <ul class="divided icons">
                        <li class="icon brands fa-github">
                          <a href="https://github.com/duneorg/dune-themes">duneorg/dune-themes</a>
                        </li>
                        <li class="icon solid fa-globe">
                          <a href="https://getdune.org">getdune.org</a>
                        </li>
                        <li class="icon brands fa-html5">
                          <a href="https://html5up.net/telephasic">HTML5 UP Telephasic</a>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              )}
              <div id="copyright" class="container">
                <ul class="menu">
                  <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
                  <li>Design: <a href="https://html5up.net/telephasic">HTML5 UP</a></li>
                </ul>
              </div>
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
