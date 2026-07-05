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
  const themeName = config?.theme?.name ?? "stellar";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Stellar";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const tagline = site?.description ||
    "Just another free, fully responsive site template built for Dune CMS.";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const img = (file: string) => `/themes/${themeName}/static/html5up/images/${file}`;

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
          {isLanding ? (
            <>
              <header id="header" class="alt">
                <span class="logo"><img src={img("logo.svg")} alt="" /></span>
                <h1>{site?.title ?? "Stellar"}</h1>
                <p>{tagline}</p>
              </header>
              <nav id="nav">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.route}>
                      <a href={item.route}>
                        {item.navTitle ?? item.frontmatter?.title ?? item.route}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          ) : (
            <header id="header">
              <h1>{pageTitle || page?.frontmatter?.title || site?.title}</h1>
              {description && <p>{String(description)}</p>}
            </header>
          )}

          {children}

          {showCredit && !isLanding && (
            <footer id="footer">
              <p class="copyright">
                &copy; {new Date().getFullYear()} {site?.title ?? "Stellar"}. Design:{" "}
                <a href="https://html5up.net/stellar">HTML5 UP</a>.
              </p>
            </footer>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
          document.querySelectorAll('a[href^="#"]').forEach(function(a){
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
