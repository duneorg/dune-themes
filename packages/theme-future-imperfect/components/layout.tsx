/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { getSearchUrl } from "@dune/core/theme-helpers";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  recentPosts?: Array<{ route: string; title: string }>;
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
  t,
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "future-imperfect";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Future Imperfect";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const searchAction = getSearchUrl("").split("?")[0];
  const searchPlaceholder = tr("search.placeholder", "Search");
  const navItems = (nav ?? []).slice(0, 6);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const creditHref = safeHref("https://html5up.net/future-imperfect") ??
    "https://html5up.net/future-imperfect";

  const isActive = (route: string) => {
    const itemPath = stripSlash(route);
    return normalizedPath === itemPath ||
      (itemPath !== "/" && normalizedPath.startsWith(itemPath + "/"));
  };

  const navLabel = (item: { route: string; navTitle?: string; title?: string }) =>
    item.navTitle ?? item.title ?? item.route;

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
      <body class="is-preload theme-future-imperfect archetype-blog">
        <div id="wrapper">
          <header id="header">
            <h1><a href={homeHref}>{site?.title ?? "Future Imperfect"}</a></h1>
            <nav class="links" aria-label={tr("nav.main", "Site")}>
              <ul>
                {navItems.map((item) => (
                  <li key={item.route} class={isActive(item.route) ? "active" : undefined}>
                    <a href={item.route} aria-current={isActive(item.route) ? "page" : undefined}>
                      {navLabel(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav class="main">
              <ul>
                <li class="search">
                  <a class="fa-search" href="#search">{tr("search.title", "Search")}</a>
                  <form id="search" method="get" action={searchAction} role="search">
                    <input
                      type="search"
                      name="q"
                      placeholder={searchPlaceholder}
                      aria-label={searchPlaceholder}
                    />
                  </form>
                </li>
                <li class="menu">
                  <a class="fa-bars" href="#menu">{tr("nav.menu", "Menu")}</a>
                </li>
              </ul>
            </nav>
          </header>

          <section id="menu">
            <section>
              <form class="search" method="get" action={searchAction} role="search">
                <input
                  type="search"
                  name="q"
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                />
              </form>
            </section>
            <section>
              <ul class="links">
                {navItems.map((item) => (
                  <li key={item.route}>
                    <a href={item.route}>
                      <h3>{navLabel(item)}</h3>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <section id="footer">
              <p class="copyright">
                &copy; {new Date().getFullYear()} {copyrightName}.
                {showCredit && (
                  <>
                    {" "}{tr("credit.design", "Design")}:{" "}
                    <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
                  </>
                )}
              </p>
            </section>
          </section>

          <div id="main">{children}</div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            window.addEventListener('load',function(){
              setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
            });
            var body=document.body;
            document.querySelector('a.fa-bars')?.addEventListener('click',function(e){
              e.preventDefault();
              body.classList.toggle('is-menu-visible');
            });
            document.querySelector('a.fa-search')?.addEventListener('click',function(e){
              e.preventDefault();
              var form=document.getElementById('search');
              if(!form)return;
              form.classList.add('visible');
              form.querySelector('input')?.focus();
            });
            document.getElementById('search')?.querySelector('input')?.addEventListener('blur',function(){
              setTimeout(function(){
                document.getElementById('search')?.classList.remove('visible');
              },150);
            });
            body.addEventListener('click',function(e){
              if(!body.classList.contains('is-menu-visible'))return;
              var menu=document.getElementById('menu');
              var header=document.getElementById('header');
              if(menu&&header&&!menu.contains(e.target)&&!header.contains(e.target)){
                body.classList.remove('is-menu-visible');
              }
            });
          })();
        `,
          }}
        />
      </body>
    </html>
  );
}
