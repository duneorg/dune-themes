/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
}

export default function Layout({ page, pageTitle, site, config, nav, pathname, dir, children, themeConfig }: LayoutProps) {
  const themeName = config?.theme?.name ?? "helios";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Helios";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const accent = (themeConfig?.accent_color as string) ?? "#e89980";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"} class={defaultDark ? "dark" : ""}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        {description && <meta name="description" content={String(description)} />}
        {siteUrl && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={String(description)} />}
        {siteUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href={`/themes/${themeName}/static/style.css`} />
        <style dangerouslySetInnerHTML={{ __html: `:root{--accent:${accent}}` }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){var s=localStorage.getItem('theme-helios');
          if(s==='dark'||(s===null&&${defaultDark ? "true" : "false"})){document.documentElement.classList.add('dark')}
          else if(s==='light'){document.documentElement.classList.remove('dark')}})();
        ` }} />
      </head>
      <body class="theme-helios archetype-landing">
        <header class="site-header">
          <a class="site-logo" href="/">{site?.title ?? "Helios"}</a>
          <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
          <nav id="main-nav" class="site-nav" aria-label="Main">
            {(nav ?? []).slice(0, 10).map((item) => (
              <a key={item.route} href={item.route} class={currentPath === item.route ? "active" : ""}>
                {item.navTitle ?? item.frontmatter?.title ?? item.route}
              </a>
            ))}
          </nav>
          <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
        </header>
        {currentPath === "/" && (
          <section class="hero">
            <h1>{site?.title ?? "Helios"}</h1>
            <p>{themeConfig?.home_subtitle || site?.description || "Built with Dune CMS"}</p>
            <a class="hero-cta" href="/blog">Get started</a>
          </section>
        )}
        {children}
        <footer class="site-footer">
          {footerText || (
            <>
              © {new Date().getFullYear()} {site?.title ?? "Helios"} ·{" "}
              {(themeConfig?.show_html5up_credit !== false) && (
                <>
                  <a href="https://html5up.net/helios">Helios by HTML5 UP</a> ·{" "}
                </>
              )}
              Powered by <a href="https://getdune.org">Dune</a>
            </>
          )}
        </footer>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var navBtn=document.querySelector('.nav-toggle');
            var nav=document.getElementById('main-nav');
            if(navBtn&&nav){navBtn.addEventListener('click',function(){
              var open=nav.classList.toggle('is-open');
              navBtn.setAttribute('aria-expanded',open?'true':'false');
            });}
            var btn=document.getElementById('theme-toggle');
            if(!btn)return;
            btn.addEventListener('click',function(){
              var dark=document.documentElement.classList.toggle('dark');
              localStorage.setItem('theme-helios',dark?'dark':'light');
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
