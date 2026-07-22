/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
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
  const themeName = config?.theme?.name ?? "read-only";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Read Only";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.sidebar_tagline as string) || site?.description || "";
  const avatarUrl = safeHref(themeConfig?.avatar_url) ||
    `/themes/${themeName}/static/html5up/images/avatar.jpg`;
  const creditHref = safeHref("https://html5up.net/read-only") ?? "https://html5up.net/read-only";

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
      <body class="is-preload theme-read-only archetype-blog">
        <section id="header">
          <header>
            <span class="image avatar">
              <img src={avatarUrl} alt="" />
            </span>
            <h1 id="logo">
              <a href={homeHref}>{site?.title ?? "Read Only"}</a>
            </h1>
            {tagline && <p>{tagline}</p>}
          </header>
          <nav id="nav" aria-label={tr("nav.main", "Site")}>
            <ul>
              {navItems.map((item) => (
                <li key={item.route}>
                  <a
                    href={item.route}
                    class={isActive(item.route) ? "active" : undefined}
                    aria-current={isActive(item.route) ? "page" : undefined}
                  >
                    {item.navTitle ?? item.title ?? item.route}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <footer>
            <p class="copyright">
              &copy; {new Date().getFullYear()} {copyrightName}.
              {showCredit && (
                <>
                  {" "}{tr("credit.design", "Design")}:{" "}
                  <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                </>
              )}
            </p>
          </footer>
        </section>

        <div id="wrapper">
          <div id="main">{children}</div>
        </div>

        <div id="titleBar">
          <a href="#header" class="toggle" aria-label={tr("nav.menu", "Toggle sidebar")}></a>
          <span class="title">{site?.title ?? "Read Only"}</span>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
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
        `,
          }}
        />
      </body>
    </html>
  );
}
