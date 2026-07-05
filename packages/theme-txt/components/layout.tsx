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
  const themeName = config?.theme?.name ?? "txt";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "TXT";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.tagline as string) || site?.description ||
    "A responsive site template for Dune CMS";
  const isHome = currentPath === "/";
  const bannerTitle = site?.title ?? "TXT";
  const bannerText = tagline;

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
          <header id="header">
            <div class="logo container">
              <div>
                <h1><a href="/" id="logo">{site?.title ?? "TXT"}</a></h1>
                <p>{tagline}</p>
              </div>
            </div>
          </header>

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

          {isHome && (
            <section id="banner">
              <div class="content">
                <h2>Welcome to {bannerTitle}</h2>
                <p>{bannerText}</p>
                <a href="#main" class="button scrolly">Alright let's go</a>
              </div>
            </section>
          )}

          <section id="main">
            <div class="container">{children}</div>
          </section>

          {showCredit && (
            <footer id="footer">
              <div class="container">
                <div id="copyright">
                  <ul class="menu">
                    <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved</li>
                    <li>Design: <a href="https://html5up.net/txt">HTML5 UP</a></li>
                  </ul>
                </div>
              </div>
            </footer>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
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
          })();
        ` }} />
      </body>
    </html>
  );
}
