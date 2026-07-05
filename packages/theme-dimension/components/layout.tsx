/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  /** When true, show landing header only (home). */
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
  const themeName = config?.theme?.name ?? "dimension";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Dimension";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 6);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const headerTitle = (themeConfig?.header_title as string) || site?.title || "Dimension";
  const headerSubtitle = (themeConfig?.header_subtitle as string) || site?.description ||
    "A fully responsive site template for Dune CMS";
  const logoIcon = (themeConfig?.logo_icon as string) || "fa-gem";
  const isLanding = landing ?? currentPath === "/";
  const bodyClass = isLanding ? "is-preload" : "is-preload is-article-visible";

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
      <body class={bodyClass}>
        <div id="wrapper">
          <header id="header">
            <div class="logo">
              <span class={`icon ${logoIcon}`}></span>
            </div>
            <div class="content">
              <div class="inner">
                <h1>{headerTitle}</h1>
                <p>{headerSubtitle}</p>
              </div>
            </div>
            <nav>
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
          </header>

          {!isLanding && (
            <div id="main">
              <article class="active">{children}</article>
            </div>
          )}

          {isLanding && children}

          {showCredit && (
            <footer id="footer">
              <p class="copyright">
                &copy; {new Date().getFullYear()} {copyrightName}. Design:{" "}
                <a href="https://html5up.net/dimension">HTML5 UP</a>.
              </p>
            </footer>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            window.addEventListener('load',function(){
              setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
              var nav=document.querySelector('#header nav');
              var items=nav?nav.querySelectorAll('li'):[];
              if(nav&&items.length%2===0){
                nav.classList.add('use-middle');
                items[Math.floor(items.length/2)]?.classList.add('is-middle');
              }
            });
            document.querySelector('#main article.active')?.insertAdjacentHTML('afterbegin',
              '<div class="close"><a href="/">Close</a></div>');
            document.body.addEventListener('click',function(e){
              if(!document.body.classList.contains('is-article-visible'))return;
              var main=document.getElementById('main');
              if(main&&!main.contains(e.target)) location.href='/';
            });
            document.addEventListener('keydown',function(e){
              if(e.key==='Escape'&&document.body.classList.contains('is-article-visible')){
                location.href='/';
              }
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
