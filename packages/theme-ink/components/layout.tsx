/** @jsxImportSource preact */
import { safeHref } from "../utils/safe-url.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

export default function Layout(
  { page, pageTitle, site, config, nav, pathname, dir, children, themeConfig, t }: any,
) {
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const themeName = config?.theme?.name ?? "ink";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Ink";
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const accent = (themeConfig?.accent_color as string) ?? "#c0392b";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const twitter = safeHref(themeConfig?.twitter_url);
  const github = safeHref(themeConfig?.github_url);

  const osDark = defaultDark
    ? "true"
    : "window.matchMedia('(prefers-color-scheme: dark)').matches";

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function(){var s=localStorage.getItem('theme-ink');
          if(s==='dark'||(s===null&&${osDark})){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light')}
          else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light')}})();
        `,
          }}
        />
      </head>
      <body class="theme-ink archetype-blog-minimal">
        <header class="site-header ink-header">
          <div class="ink-header-bar">
            <span aria-hidden="true" style="width:2.5rem" />
            <a class="site-logo ink-logo" href={homeHref}>{site?.title ?? "Ink"}</a>
            <button
              type="button"
              class="theme-toggle"
              id="theme-toggle"
              aria-label={tr("theme.toggle", "Toggle dark mode")}
            >
              ◐
            </button>
          </div>
          <button
            type="button"
            class="nav-toggle"
            aria-expanded="false"
            aria-controls="main-nav"
          >
            {tr("nav.menu", "Menu")}
          </button>
          <nav id="main-nav" class="site-nav ink-nav" aria-label="Main">
            {(nav ?? []).slice(0, 10).map((item: any) => {
              const route = item.route as string;
              const active = normalizedPath === stripSlash(route) ||
                (route !== "/" && currentPath.startsWith(route));
              return (
                <a key={route} href={route} class={active ? "active" : ""}>
                  {item.navTitle ?? item.frontmatter?.title ?? route}
                </a>
              );
            })}
          </nav>
        </header>
        <main class="ink-main">{children}</main>
        <footer class="site-footer ink-footer">
          {(twitter || github) && (
            <div class="ink-social">
              {twitter && (
                <a href={twitter} rel="noopener noreferrer" target="_blank">
                  {tr("social.x", "X")}
                </a>
              )}
              {github && (
                <a href={github} rel="noopener noreferrer" target="_blank">
                  {tr("social.github", "GitHub")}
                </a>
              )}
            </div>
          )}
          {footerText || (
            <>
              © {new Date().getFullYear()} {site?.title ?? "Ink"} · Powered by{" "}
              <a href="https://getdune.org">Dune</a>
            </>
          )}
        </footer>
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
              document.documentElement.classList.toggle('light',!dark);
              localStorage.setItem('theme-ink',dark?'dark':'light');
            });
          })();
        `,
          }}
        />
      </body>
    </html>
  );
}
