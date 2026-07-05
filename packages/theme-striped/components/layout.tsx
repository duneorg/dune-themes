/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import { getSearchUrl } from "@dune/core/theme-helpers";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  recentPosts?: Array<{ route: string; title: string }>;
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
  const themeName = config?.theme?.name ?? "striped";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Striped";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const tagline = (themeConfig?.sidebar_tagline as string) || site?.description || "A Dune site";
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const searchAction = getSearchUrl("").split("?")[0];
  const navItems = (nav ?? []).slice(0, 12);
  const recent = (recentPosts ?? navItems.filter((n) => n.route.startsWith("/blog/"))).slice(0, 5);

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
      <body>
        <div id="content">
          <div class="inner">{children}</div>
        </div>

        <div id="sidebar">
          <h1 id="logo">
            <a href="/">{site?.title ?? "Striped"}</a>
          </h1>

          <nav id="nav">
            <ul>
              {navItems.map((item) => (
                <li
                  key={item.route}
                  class={currentPath === item.route || (item.route !== "/" && currentPath.startsWith(item.route + "/")) ? "current" : ""}
                >
                  <a href={item.route}>
                    {item.navTitle ?? item.frontmatter?.title ?? item.route}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section class="box search">
            <form method="get" action={searchAction} role="search">
              <input type="search" class="text" name="q" placeholder="Search" aria-label="Search" />
            </form>
          </section>

          <section class="box text-style1">
            <div class="inner">
              <p>
                <strong>{site?.title ?? "Striped"}:</strong> {tagline}. Design by{" "}
                <a href="https://html5up.net/striped">HTML5 UP</a>.
              </p>
            </div>
          </section>

          {recent.length > 0 && (
            <section class="box recent-posts">
              <header>
                <h2>Recent Posts</h2>
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

          {showCredit && (
            <ul id="copyright">
              <li>&copy; {new Date().getFullYear()} {copyrightName}.</li>
              <li>
                Design: <a href="https://html5up.net">HTML5 UP</a>
              </li>
            </ul>
          )}
        </div>

        <div id="titleBar">
          <a href="#sidebar" class="toggle" aria-label="Toggle sidebar"></a>
          <span class="title">{site?.title ?? "Striped"}</span>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
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
        ` }} />
      </body>
    </html>
  );
}
