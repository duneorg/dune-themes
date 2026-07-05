/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  /** When true, omit the home intro (e.g. blog index under /blog). */
  hideIntro?: boolean;
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
  hideIntro,
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "massively";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Massively";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const showIntro = isHome && !hideIntro && themeConfig?.show_intro !== false;
  const introTitle = (themeConfig?.intro_title as string) || site?.title || "Massively";
  const introSubtitle = (themeConfig?.intro_subtitle as string) || site?.description ||
    "A responsive blog theme for Dune CMS";
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const wrapperClass = showIntro ? "fade-in" : "";

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
        <div id="wrapper" class={wrapperClass || undefined}>
          {showIntro && (
            <div id="intro">
              <h1>{introTitle}</h1>
              <p>{introSubtitle}</p>
              <ul class="actions">
                <li>
                  <a href="#header" class="button icon solid solo fa-arrow-down scrolly">Continue</a>
                </li>
              </ul>
            </div>
          )}

          <header id="header">
            <a href="/" class="logo">{site?.title ?? "Massively"}</a>
          </header>

          <nav id="nav">
            <ul class="links">
              {navItems.map((item) => (
                <li key={item.route} class={isActive(item.route) ? "active" : undefined}>
                  <a href={item.route}>
                    {item.navTitle ?? item.frontmatter?.title ?? item.route}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div id="main">{children}</div>

          {showCredit && (
            <div id="copyright">
              <ul>
                <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                <li>
                  Design: <a href="https://html5up.net/massively">HTML5 UP</a>
                </li>
              </ul>
            </div>
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
