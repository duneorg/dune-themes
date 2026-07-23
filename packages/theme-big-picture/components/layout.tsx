/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, render fullscreen landing shell (no inner content box). */
  landing?: boolean;
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
  landing,
}: LayoutProps) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "big-picture";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Big Picture";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Big Picture";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const showBanner = isLanding && themeConfig?.show_banner !== false;
  const bannerTitle = (themeConfig?.banner_title as string) || "Hey.";
  const tagline = (themeConfig?.tagline as string) || site?.description ||
    "A responsive site template for Dune CMS";
  const creditHref = safeHref("https://html5up.net/big-picture") ??
    "https://html5up.net/big-picture";

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
        <noscript>
          <link rel="stylesheet" href={`/themes/${themeName}/static/html5up/css/noscript.css`} />
        </noscript>
      </head>
      <body class="is-preload theme-big-picture archetype-landing">
        <header id="header">
          <h1><a href={homeHref}>{siteTitle}</a></h1>
          <nav aria-label={tr("nav.main", "Site")}>
            <ul>
              {navItems.map((item) => (
                <li key={item.route} class={isActive(item.route) ? "current" : undefined}>
                  <a href={item.route} aria-current={isActive(item.route) ? "page" : undefined}>
                    {item.navTitle ?? item.title ?? item.route}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {showBanner && (
          <section id="intro" class="main style1 dark fullscreen">
            <div class="content">
              <header>
                <h2>{bannerTitle}</h2>
              </header>
              <p>
                {tr("intro.welcome", "Welcome to")} <strong>{siteTitle}</strong>
                {tagline && <> — {tagline}</>}
              </p>
              <footer>
                <a href="#one" class="button style2 down">{tr("cta.more", "More")}</a>
              </footer>
            </div>
          </section>
        )}

        {isLanding ? children : (
          <section class="main style1">
            <div class="content box style2">{children}</div>
          </section>
        )}

        <footer id="footer">
          <ul class="menu">
            <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
            {showCredit && (
              <li>
                {tr("credit.design", "Design")}:{" "}
                <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
              </li>
            )}
          </ul>
        </footer>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
          document.querySelectorAll('a.down[href^="#"]').forEach(function(a){
            a.addEventListener('click',function(e){
              var id=a.getAttribute('href');
              if(!id||id==='#')return;
              var el=document.querySelector(id);
              if(!el)return;
              e.preventDefault();
              el.scrollIntoView({behavior:'smooth'});
            });
          });
        `,
          }}
        />
      </body>
    </html>
  );
}
