/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import { getSearchUrl } from "@dune/core/theme-helpers";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  recentPosts?: Array<{ route: string; title: string }>;
}

export default function Layout({
  page, pageTitle, site, config, nav, pathname, dir, children, themeConfig, recentPosts,
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "massively";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Massively";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const searchAction = getSearchUrl("").split("?")[0];
  const navItems = (nav ?? []).slice(0, 12);
  const isActive = (route: string) =>
    currentPath === route || (route !== "/" && currentPath.startsWith(route + "/"));
  const isHome = currentPath === "/";

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"} class="is-preload">
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
        <div id="wrapper" class="fade-in">
          {isHome && (
            <div id="intro">
              <h1>{site?.title ?? "Massively"}</h1>
              <p>{site?.description ?? "Built with Dune CMS"}</p>
            </div>
          )}
          <header id="header">
            <a href="/" class="logo">{site?.title ?? "Massively"}</a>
          </header>
          <nav id="nav">
            <ul class="links">{navItems.map((item) => (
              <li key={item.route} class={isActive(item.route) ? "current" : ""}>
                <a href={item.route}>{item.navTitle ?? item.frontmatter?.title ?? item.route}</a>
              </li>
            ))}</ul>
          </nav>
          <div id="main">{children}</div>
          <footer id="footer">
            {showCredit && (
          <ul class="copyright" id="copyright">
            <li>&copy; {new Date().getFullYear()} {site?.title ?? "Massively"}.</li>
            <li>Design: <a href="https://html5up.net/massively">Massively by HTML5 UP</a></li>
          </ul>
        )}
          </footer>
        </div>
            <script dangerouslySetInnerHTML={{ __html: `(function(){
  window.addEventListener('load',function(){
    setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
  });
})();` }} />
      </body>
    </html>
  );
