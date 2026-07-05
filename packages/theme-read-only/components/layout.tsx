/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

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
  const themeName = config?.theme?.name ?? "read-only";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Read Only";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.sidebar_tagline as string) || site?.description || "";
  const avatarUrl = (themeConfig?.avatar_url as string) ||
    `/themes/${themeName}/static/html5up/images/avatar.jpg`;

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
        <section id="header">
          <header>
            <span class="image avatar">
              <img src={avatarUrl} alt="" />
            </span>
            <h1 id="logo">
              <a href="/">{site?.title ?? "Read Only"}</a>
            </h1>
            {tagline && <p>{tagline}</p>}
          </header>
          <nav id="nav">
            <ul>
              {navItems.map((item) => (
                <li key={item.route}>
                  <a href={item.route} class={isActive(item.route) ? "active" : undefined}>
                    {item.navTitle ?? item.frontmatter?.title ?? item.route}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {showCredit && (
            <footer>
              <p class="copyright">
                &copy; {new Date().getFullYear()} {copyrightName}. Design:{" "}
                <a href="https://html5up.net/read-only">HTML5 UP</a>
              </p>
            </footer>
          )}
        </section>

        <div id="wrapper">
          <div id="main">{children}</div>
        </div>

        <div id="titleBar">
          <a href="#header" class="toggle" aria-label="Toggle sidebar"></a>
          <span class="title">{site?.title ?? "Read Only"}</span>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            window.addEventListener('load',function(){
              setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
            });
            var toggle=document.querySelector('#titleBar .toggle');
            if(toggle){
              toggle.addEventListener('click',function(e){
                e.preventDefault();
                document.body.classList.toggle('header-visible');
              });
            }
            document.addEventListener('click',function(e){
              if(!document.body.classList.contains('header-visible'))return;
              var header=document.getElementById('header');
              var titleBar=document.getElementById('titleBar');
              if(header&&titleBar&&!header.contains(e.target)&&!titleBar.contains(e.target)){
                document.body.classList.remove('header-visible');
              }
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
