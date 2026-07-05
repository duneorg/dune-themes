/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import { navIconClass } from "../utils/content.ts";

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
  const themeName = config?.theme?.name ?? "lens";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Lens";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Lens";
  const homeSubtitle = (themeConfig?.home_subtitle as string) || site?.description ||
    "A responsive gallery theme for Dune CMS";

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
      <body class="is-preload-0 is-preload-1 is-preload-2">
        <div id="main">
          <header id="header">
            <h1>{siteTitle}</h1>
            <p>{homeSubtitle}</p>
            {navItems.length > 0 && (
              <ul class="icons">
                {navItems.map((item) => (
                  <li key={item.route} class={isActive(item.route) ? "active" : undefined}>
                    <a href={item.route} class={navIconClass(item.route)}>
                      <span class="label">
                        {item.navTitle ?? item.frontmatter?.title ?? item.route}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </header>

          {children}

          {showCredit && (
            <footer id="footer">
              <ul class="copyright">
                <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                <li>Design: <a href="https://html5up.net/lens">HTML5 UP</a></li>
              </ul>
            </footer>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load',function(){
            var body=document.body;
            setTimeout(function(){
              body.classList.remove('is-preload-0','is-preload-1','is-preload-2');
            }, 100);
          });
        ` }} />
      </body>
    </html>
  );
}
