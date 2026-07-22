/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { getSearchUrl } from "@dune/core/theme-helpers";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  recentPosts?: Array<{ route: string; title: string; excerpt?: string; cover?: string }>;
  t?: (key: string) => string;
}

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
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
  t,
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "editorial";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Editorial";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const searchAction = getSearchUrl("").split("?")[0];
  const searchPlaceholder = tr("search.placeholder", "Search");
  const navItems = (nav ?? []).slice(0, 10);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const logoSuffix = (themeConfig?.logo_suffix as string) || "";
  const sidebarBlurb = (themeConfig?.sidebar_blurb as string) || site?.description || "";
  const recent = (recentPosts ?? []).slice(0, 3).map((p) => ({
    ...p,
    cover: safeHref(p.cover),
  }));
  const creditHref = safeHref("https://html5up.net/editorial") ?? "https://html5up.net/editorial";

  const isActive = (route: string) => {
    const itemPath = stripSlash(route);
    return normalizedPath === itemPath ||
      (itemPath !== "/" && normalizedPath.startsWith(itemPath + "/"));
  };

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
      <body class="is-preload theme-editorial archetype-blog">
        <div id="wrapper">
          <div id="main">
            <div class="inner">
              <header id="header">
                <a href={homeHref} class="logo">
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
                  <input
                    type="search"
                    name="q"
                    id="query"
                    placeholder={searchPlaceholder}
                    aria-label={searchPlaceholder}
                  />
                </form>
              </section>

              <nav id="menu" aria-label={tr("nav.main", "Site")}>
                <header class="major">
                  <h2>{tr("nav.menu", "Menu")}</h2>
                </header>
                <ul>
                  {navItems.map((item) => (
                    <li key={item.route} class={isActive(item.route) ? "active" : undefined}>
                      <a href={item.route} aria-current={isActive(item.route) ? "page" : undefined}>
                        {item.navTitle ?? item.title ?? item.route}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {recent.length > 0 && (
                <section>
                  <header class="major">
                    <h2>{tr("nav.recent", "Recent Posts")}</h2>
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
                    <h2>{tr("nav.about", "About")}</h2>
                  </header>
                  <p>{sidebarBlurb}</p>
                </section>
              )}

              <footer id="footer">
                <p class="copyright">
                  &copy; {new Date().getFullYear()} {copyrightName}.
                  {showCredit && (
                    <>
                      {" "}{tr("credit.design", "Design")}:{" "}
                      <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
                    </>
                  )}
                </p>
              </footer>
            </div>
          </div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
        `,
          }}
        />
      </body>
    </html>
  );
}
