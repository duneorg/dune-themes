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
  const themeName = config?.theme?.name ?? "highlights";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Highlights";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;

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
      <body class="is-preload">
        {isLanding ? children : (
          <>
            <section id="header">
              <header class="major">
                <h1><a href="/">{site?.title ?? "Highlights"}</a></h1>
                {site?.description && <p>{site.description}</p>}
              </header>
              {navItems.length > 0 && (
                <div class="container">
                  <ul class="actions special">
                    {navItems.map((item) => (
                      <li key={item.route}>
                        <a
                          href={item.route}
                          class={`button${isActive(item.route) ? " primary" : ""}`}
                        >
                          {item.navTitle ?? item.frontmatter?.title ?? item.route}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
            <section class="main special">
              <div class="container">
                <div class="content">{children}</div>
              </div>
            </section>
            {showCredit && (
              <section id="footer">
                <footer>
                  <ul class="copyright">
                    <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                    <li>Design: <a href="https://html5up.net/highlights">HTML5 UP</a></li>
                  </ul>
                </footer>
              </section>
            )}
          </>
        )}

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
