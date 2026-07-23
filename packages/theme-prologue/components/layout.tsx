/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { themeImage } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  landing?: boolean;
}

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

function withBase(basePath: string, path: string): string {
  const joined = `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
  return joined.replace(/([^:]\/)\/+/g, "$1") || "/";
}

function navIcon(route: string): string {
  const r = stripSlash(route);
  if (r === "/" || r === "/home") return "fa-home";
  if (r.includes("blog")) return "fa-th";
  if (r.includes("about")) return "fa-user";
  if (r.includes("search")) return "fa-search";
  if (r.includes("archives")) return "fa-archive";
  return "fa-file";
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
  landing,
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "prologue";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Prologue";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.home_subtitle as string) || site?.description ||
    "A responsive site template for Dune CMS";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const avatar = safeHref(themeConfig?.avatar_url) || themeImage(themeName, "avatar.jpg");
  const creditHref = safeHref("https://html5up.net/prologue") ?? "https://html5up.net/prologue";
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");

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
      <body class="is-preload theme-prologue archetype-landing">
        <div id="header">
          <div class="top">
            <div id="logo">
              <span class="image avatar48"><img src={avatar} alt="" /></span>
              <h1 id="title"><a href={homeHref}>{site?.title ?? "Prologue"}</a></h1>
              <p>{tagline}</p>
            </div>
            <nav id="nav" aria-label={tr("nav.main", "Site")}>
              <ul>
                {navItems.map((item) => (
                  <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                    <a href={item.route} aria-current={isActive(item.route) ? "page" : undefined}>
                      <span class={`icon solid ${navIcon(item.route)}`}>
                        {item.navTitle ?? item.title ?? item.route}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div class="bottom">
            <ul class="icons">
              <li>
                <a href={blogHref} class="icon solid fa-th">
                  <span class="label">{tr("nav.blog", "Blog")}</span>
                </a>
              </li>
              <li>
                <a href={searchHref} class="icon solid fa-search">
                  <span class="label">{tr("search.title", "Search")}</span>
                </a>
              </li>
              <li>
                <a href={archivesHref} class="icon solid fa-archive">
                  <span class="label">{tr("nav.archives", "Archives")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div id="main">{children}</div>

        <div id="footer">
          <ul class="copyright">
            <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
            {showCredit && (
              <li>
                {tr("credit.design", "Design")}:{" "}
                <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
              </li>
            )}
          </ul>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
          ${isLanding
              ? `document.querySelectorAll('a.scrolly[href^="#"],a[href^="#"]').forEach(function(a){
            a.addEventListener('click',function(e){
              var id=a.getAttribute('href');
              if(!id||id==='#')return;
              var el=document.querySelector(id);
              if(!el)return;
              e.preventDefault();
              el.scrollIntoView({behavior:'smooth'});
            });
          });`
              : ""}
        `,
          }}
        />
      </body>
    </html>
  );
}
