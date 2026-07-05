/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import { getSearchUrl } from "@dune/core/theme-helpers";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  recentPosts?: Array<{ route: string; title: string; excerpt?: string; cover?: string }>;
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
  recentPosts,
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "editorial";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Editorial";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const searchAction = getSearchUrl("").split("?")[0];
  const navItems = (nav ?? []).slice(0, 10);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const logoSuffix = (themeConfig?.logo_suffix as string) || "";
  const sidebarBlurb = (themeConfig?.sidebar_blurb as string) || site?.description || "";
  const recent = (recentPosts ?? []).slice(0, 3);

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
        <div id="wrapper">
          <div id="main">
            <div class="inner">
              <header id="header">
                <a href="/" class="logo">
                  <strong>{site?.title ?? "Editorial"}</strong>
                  {logoSuffix && <> {logoSuffix}</>}
                </a>
              </header>
              {children}
            </div>
          </div>

          <div id="sidebar">
            <div class="inner">
              <section id="search" class="alt">
                <form method="get" action={searchAction} role="search">
                  <input type="search" name="q" id="query" placeholder="Search" aria-label="Search" />
                </form>
              </section>

              <nav id="menu">
                <header class="major">
                  <h2>Menu</h2>
                </header>
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

              {recent.length > 0 && (
                <section>
                  <header class="major">
                    <h2>Recent Posts</h2>
                  </header>
                  <div class="mini-posts">
                    {recent.map((post) => (
                      <article key={post.route}>
                        {post.cover && (
                          <a href={post.route} class="image">
                            <img src={post.cover} alt="" />
                          </a>
                        )}
                        <p>
                          <a href={post.route}>{post.title}</a>
                          {post.excerpt && <> — {post.excerpt}</>}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {sidebarBlurb && (
                <section>
                  <header class="major">
                    <h2>About</h2>
                  </header>
                  <p>{sidebarBlurb}</p>
                </section>
              )}

              {showCredit && (
                <footer id="footer">
                  <p class="copyright">
                    &copy; {new Date().getFullYear()} {copyrightName}. Design:{" "}
                    <a href="https://html5up.net/editorial">HTML5 UP</a>.
                  </p>
                </footer>
              )}
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
        ` }} />
      </body>
    </html>
  );
}
