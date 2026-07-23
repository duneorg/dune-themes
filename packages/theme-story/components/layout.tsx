/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";

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
  pathname,
  dir,
  children,
  t,
}: LayoutProps) {
  // Story chrome lives in templates; layout still normalizes paths / i18n for parity.
  const _tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "story";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Story";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  void homeHref;
  void isHome;
  void _tr;

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
      <body class="is-preload theme-story archetype-landing">
        <div id="wrapper" class="divided">{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          window.addEventListener('load',function(){
            setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
          });
          document.querySelectorAll('a.smooth-scroll-middle[href^="#"],a[href^="#first"]').forEach(function(a){
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
