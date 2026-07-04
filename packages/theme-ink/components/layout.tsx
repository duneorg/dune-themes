/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
}

export default function Layout({ page, pageTitle, site, config, nav, pathname, dir, children, themeConfig }: LayoutProps) {
  const themeName = config?.theme?.name ?? "ink";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Ink";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const accent = (themeConfig?.accent_color as string) ?? "#c0392b";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const twitter = (themeConfig?.twitter_url as string) ?? "";
  const github = (themeConfig?.github_url as string) ?? "";

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
          (function(){var s=localStorage.getItem('theme-ink');
          if(s==='dark'||(s===null&&${defaultDark ? "true" : "false"})){document.documentElement.classList.add('dark')}
          else if(s==='light'){document.documentElement.classList.remove('dark')}})();
        ` }} />
      </head>
      <body class="theme-ink archetype-blog-minimal">
        <header class="site-header ink-header">
          <div class="ink-header-bar">
            <span aria-hidden="true" style="width:2.5rem" />
            <a class="site-logo ink-logo" href="/">{site?.title ?? "Ink"}</a>
            <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
          </div>
          <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
          <nav id="main-nav" class="site-nav ink-nav" aria-label="Main">
            {(nav ?? []).slice(0, 10).map((item) => (
              <a key={item.route} href={item.route} class={currentPath === item.route ? "active" : ""}>
                {item.navTitle ?? item.frontmatter?.title ?? item.route}
              </a>
            ))}
          </nav>
        </header>
        <main class="ink-main">{children}</main>
        <footer class="site-footer ink-footer">
          {(twitter || github) && (
            <div class="ink-social">
              {twitter && <a href={twitter} rel="noopener noreferrer" target="_blank">Twitter</a>}
              {github && <a href={github} rel="noopener noreferrer" target="_blank">GitHub</a>}
            </div>
          )}
          {footerText || <>© {new Date().getFullYear()} {site?.title ?? "Ink"} · Powered by <a href="https://getdune.org">Dune</a></>}
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
              localStorage.setItem('theme-ink',dark?'dark':'light');
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
