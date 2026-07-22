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
  recentPosts,
  t,
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "striped";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Striped";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const tagline = (themeConfig?.sidebar_tagline as string) || site?.description || "A Dune site";
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const searchAction = getSearchUrl("").split("?")[0];
  const searchPlaceholder = tr("search.placeholder", "Search");
  const creditHref = safeHref("https://html5up.net/striped") ?? "https://html5up.net/striped";
  const creditHomeHref = safeHref("https://html5up.net") ?? "https://html5up.net";
  const navItems = (nav ?? []).slice(0, 12);
  const recent = (recentPosts ?? navItems
    .filter((n) => stripSlash(n.route).startsWith("/blog"))
    .map((n) => ({
      route: n.route,
      title: String(n.navTitle ?? n.title ?? n.route),
    }))
  ).slice(0, 5);

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
      <body class="theme-striped archetype-blog">
        <div id="content">
          <div class="inner">{children}</div>
        </div>

        <div id="sidebar">
          <h1 id="logo">
            <a href={homeHref}>{site?.title ?? "Striped"}</a>
          </h1>

          <nav id="nav" aria-label={tr("nav.main", "Site")}>
            <ul>
              {navItems.map((item) => {
                const itemPath = stripSlash(item.route);
                const active = normalizedPath === itemPath ||
                  (itemPath !== "/" && normalizedPath.startsWith(itemPath + "/"));
                return (
                  <li key={item.route} class={active ? "current" : ""}>
                    <a href={item.route} aria-current={active ? "page" : undefined}>
                      {item.navTitle ?? item.title ?? item.route}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <section class="box search">
            <form method="get" action={searchAction} role="search">
              <input
                type="search"
                class="text"
                name="q"
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
            </form>
          </section>

          <section class="box text-style1">
            <div class="inner">
              <p>
                <strong>{site?.title ?? "Striped"}:</strong> {tagline}
                {showCredit && (
                  <>
                    . {tr("credit.design_by", "Design by")}{" "}
                    <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>.
                  </>
                )}
                {!showCredit && "."}
              </p>
            </div>
          </section>

          {recent.length > 0 && (
            <section class="box recent-posts">
              <header>
                <h2>{tr("nav.recent", "Recent Posts")}</h2>
              </header>
              <ul>
                {recent.map((item) => (
                  <li key={item.route}>
                    <a href={item.route}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <ul id="copyright">
            <li>&copy; {new Date().getFullYear()} {copyrightName}.</li>
            {showCredit && (
              <li>
                {tr("credit.design", "Design")}:{" "}
                <a href={creditHomeHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
              </li>
            )}
          </ul>
        </div>

        <div id="titleBar">
          <a href="#sidebar" class="toggle" aria-label={tr("nav.menu", "Toggle sidebar")}></a>
          <span class="title">{site?.title ?? "Striped"}</span>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){
            var body=document.body;
            window.addEventListener('load',function(){
              setTimeout(function(){ body.classList.remove('is-preload'); }, 100);
            });
            var toggle=document.querySelector('#titleBar .toggle');
            if(toggle){
              toggle.addEventListener('click',function(e){
                e.preventDefault();
                body.classList.toggle('sidebar-visible');
              });
            }
            document.addEventListener('click',function(e){
              if(!body.classList.contains('sidebar-visible')) return;
              var sidebar=document.getElementById('sidebar');
              var titleBar=document.getElementById('titleBar');
              if(sidebar&&titleBar&&!sidebar.contains(e.target)&&!titleBar.contains(e.target)){
                body.classList.remove('sidebar-visible');
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
