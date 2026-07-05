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
  const themeName = config?.theme?.name ?? "phantom";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Phantom";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 10);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const logoUrl = (themeConfig?.logo_url as string) ||
    `/themes/${themeName}/static/html5up/images/logo.svg`;

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
          <header id="header">
            <div class="inner">
              <a href="/" class="logo">
                <span class="symbol"><img src={logoUrl} alt="" /></span>
                <span class="title">{site?.title ?? "Phantom"}</span>
              </a>
              <nav>
                <ul>
                  <li><a href="#menu">Menu</a></li>
                </ul>
              </nav>
            </div>
          </header>

          <nav id="menu">
            <h2>Menu</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.route} class={isActive(item.route) ? "active" : undefined}>
                  <a href={item.route}>
                    {item.navTitle ?? item.frontmatter?.title ?? item.route}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div id="main">
            <div class="inner">{children}</div>
          </div>

          {showCredit && (
            <footer id="footer">
              <div class="inner">
                <ul class="copyright">
                  <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                  <li>Design: <a href="https://html5up.net/phantom">HTML5 UP</a></li>
                </ul>
              </div>
            </footer>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            window.addEventListener('load',function(){
              setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
            });
            var body=document.body;
            document.querySelectorAll('a[href="#menu"]').forEach(function(a){
              a.addEventListener('click',function(e){
                e.preventDefault();
                body.classList.toggle('is-menu-visible');
              });
            });
            document.addEventListener('click',function(e){
              if(!body.classList.contains('is-menu-visible'))return;
              var menu=document.getElementById('menu');
              var header=document.getElementById('header');
              if(menu&&header&&!menu.contains(e.target)&&!header.contains(e.target)){
                body.classList.remove('is-menu-visible');
              }
            });
            document.addEventListener('keydown',function(e){
              if(e.key==='Escape') body.classList.remove('is-menu-visible');
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
