/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  /** When true, show the home hero (#header). */
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
  const themeName = config?.theme?.name ?? "photon";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Photon";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.tagline as string) || site?.description ||
    "A responsive portfolio theme for Dune CMS";
  const siteTitle = site?.title ?? "Photon";
  const isLanding = landing ?? currentPath === "/";
  const blogRoute = nav?.find((item) => item.route !== "/" && item.route.endsWith("/blog"))?.route ??
    nav?.find((item) => item.route.includes("blog"))?.route;

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
        {isLanding && (
          <section id="header">
            <div class="inner">
              <span class="icon solid major fa-cloud"></span>
              <h1>
                Hi, I'm <strong>{siteTitle}</strong>
                {tagline && (
                  <>
                    , {tagline}
                  </>
                )}
              </h1>
              {site?.description && <p>{site.description}</p>}
              {blogRoute && (
                <ul class="actions special">
                  <li><a href={blogRoute} class="button scrolly">Discover</a></li>
                </ul>
              )}
            </div>
          </section>
        )}

        {isLanding ? children : (
          <section class="main style1">
            <div class="container">{children}</div>
          </section>
        )}

        {showCredit && (
          <section id="footer">
            <ul class="copyright">
              <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
              <li>Design: <a href="https://html5up.net/photon">HTML5 UP</a></li>
            </ul>
          </section>
        )}

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
