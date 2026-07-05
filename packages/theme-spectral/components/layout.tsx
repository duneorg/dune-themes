/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  landing?: boolean;
}

const MENU_SCRIPT = `
window.addEventListener('load',function(){
  setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
});
document.querySelectorAll('a.menuToggle').forEach(function(a){
  a.addEventListener('click',function(e){ e.preventDefault(); document.body.classList.toggle('is-menu-visible'); });
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
`;

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
  const themeName = config?.theme?.name ?? "spectral";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Spectral";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const bodyClass = isLanding ? "landing is-preload" : "is-preload";

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
        <div id="page-wrapper">
          <header id="header" class={isLanding ? "alt" : undefined}>
            <h1><a href="/">{site?.title ?? "Spectral"}</a></h1>
            <nav id="nav">
              <ul>
                <li class="special">
                  <a href="#menu" class="menuToggle"><span>Menu</span></a>
                  <div id="menu">
                    <ul>
                      {navItems.map((item) => (
                        <li key={item.route}>
                          <a href={item.route} class={isActive(item.route) ? "active" : undefined}>
                            {item.navTitle ?? item.frontmatter?.title ?? item.route}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </nav>
          </header>

          {children}

          {showCredit && !isLanding && (
            <footer id="footer">
              <ul class="copyright">
                <li>&copy; {new Date().getFullYear()} {site?.title ?? "Spectral"}</li>
                <li>Design: <a href="https://html5up.net/spectral">HTML5 UP</a></li>
              </ul>
            </footer>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: MENU_SCRIPT }} />
      </body>
    </html>
  );
}
