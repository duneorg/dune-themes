/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
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
  const themeName = config?.theme?.name ?? "paradigm-shift";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Paradigm Shift";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const navItems = (nav ?? []).slice(0, 8);
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const creditHref = safeHref("https://html5up.net/paradigm-shift") ??
    "https://html5up.net/paradigm-shift";

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
      <body class="is-preload theme-paradigm-shift archetype-landing">
        <div id="wrapper">
          {!isLanding && navItems.length > 0 && (
            <nav class="dune-nav" aria-label={tr("nav.main", "Site")}>
              <ul class="actions">
                <li><a href={homeHref} class="button">{tr("nav.home", "Home")}</a></li>
                {navItems.filter((i) => stripSlash(i.route) !== "/").map((item) => (
                  <li key={item.route}>
                    <a href={item.route} class="button">
                      {item.navTitle ?? item.title ?? item.route}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {isLanding ? children : (
            <section>
              <header>
                <h2>{pageTitle || page?.frontmatter?.title || title}</h2>
              </header>
              <div class="content">{children}</div>
            </section>
          )}

          {!isLanding && (
            <section class="dune-credit">
              <div class="content">
                <p>
                  &copy; {new Date().getFullYear()} {copyrightName}.
                  {showCredit && (
                    <>
                      {" "}{tr("credit.design", "Design")}:{" "}
                      <a href={creditHref} target="_blank" rel="noopener noreferrer">HTML5 UP</a>
                    </>
                  )}
                </p>
              </div>
            </section>
          )}
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
          document.querySelectorAll('a.scrolly[href^="#"], a.arrow.scrolly[href^="#"]').forEach(function(a){
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
