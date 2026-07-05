/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import { themeImage } from "../utils/content.ts";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  landing?: boolean;
}

function navIcon(route: string): string {
  if (route === "/") return "fa-home";
  if (route.includes("blog")) return "fa-th";
  if (route.includes("about")) return "fa-user";
  if (route.includes("search")) return "fa-search";
  if (route.includes("archives")) return "fa-archive";
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
  landing,
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "prologue";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Prologue";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const tagline = (themeConfig?.home_subtitle as string) || site?.description ||
    "A responsive site template for Dune CMS";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const avatar = themeImage(themeName, "avatar.jpg");

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
        <div id="header">
          <div class="top">
            <div id="logo">
              <span class="image avatar48"><img src={avatar} alt="" /></span>
              <h1 id="title"><a href="/">{site?.title ?? "Prologue"}</a></h1>
              <p>{tagline}</p>
            </div>
            <nav id="nav">
              <ul>
                {navItems.map((item) => (
                  <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                    <a href={item.route}>
                      <span class={`icon solid ${navIcon(item.route)}`}>
                        {item.navTitle ?? item.frontmatter?.title ?? item.route}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div class="bottom">
            <ul class="icons">
              <li><a href="/blog" class="icon solid fa-th"><span class="label">Blog</span></a></li>
              <li><a href="/search" class="icon solid fa-search"><span class="label">Search</span></a></li>
              <li><a href="/archives" class="icon solid fa-archive"><span class="label">Archives</span></a></li>
            </ul>
          </div>
        </div>

        <div id="main">{children}</div>

        {showCredit && (
          <div id="footer">
            <ul class="copyright">
              <li>&copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.</li>
              <li>Design: <a href="https://html5up.net/prologue">HTML5 UP</a></li>
            </ul>
          </div>
        )}

        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
          ${isLanding ? `document.querySelectorAll('a.scrolly[href^="#"],a[href^="#"]').forEach(function(a){
            a.addEventListener('click',function(e){
              var id=a.getAttribute('href');
              if(!id||id==='#')return;
              var el=document.querySelector(id);
              if(!el)return;
              e.preventDefault();
              el.scrollIntoView({behavior:'smooth'});
            });
          });` : ""}
        ` }} />
      </body>
    </html>
  );
}
