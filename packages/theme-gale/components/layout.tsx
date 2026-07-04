/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
}

export default function Layout({ page, pageTitle, site, config, nav, pathname, dir, children, themeConfig }: LayoutProps) {
  const themeName = config?.theme?.name ?? "gale";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Gale";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const accent = (themeConfig?.accent_color as string) ?? "#6366f1";
  const defaultDark = themeConfig?.default_dark === true;
  const footerText = (themeConfig?.footer_text as string) ?? "";
  const ctaLabel = (themeConfig?.header_cta_label as string) || "Get started";
  const ctaUrl = (themeConfig?.header_cta_url as string) || "/blog";
  const isHome = currentPath === "/";

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
          (function(){var s=localStorage.getItem('theme-gale');
          if(s==='dark'||(s===null&&${defaultDark ? "true" : "false"})){document.documentElement.classList.add('dark')}
          else if(s==='light'){document.documentElement.classList.remove('dark')}})();
        ` }} />
      </head>
      <body class="theme-gale archetype-landing">
        <header class="site-header gale-header">
          <div class="gale-header-inner">
            <a class="site-logo gale-logo" href="/">{site?.title ?? "Gale"}</a>
            <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="main-nav">Menu</button>
            <nav id="main-nav" class="site-nav gale-nav" aria-label="Main">
              {(nav ?? []).slice(0, 8).map((item) => (
                <a key={item.route} href={item.route} class={currentPath === item.route ? "active" : ""}>
                  {item.navTitle ?? item.frontmatter?.title ?? item.route}
                </a>
              ))}
            </nav>
            <a class="gale-cta-header" href={ctaUrl}>{ctaLabel}</a>
            <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">◐</button>
          </div>
        </header>
        {isHome && (
          <section class="gale-hero">
            {(themeConfig?.hero_badge as string) && (
              <span class="gale-hero-badge">{themeConfig?.hero_badge as string}</span>
            )}
            <h1>{(themeConfig?.hero_title as string) || site?.title || "Gale"}</h1>
            <p>{(themeConfig?.hero_subtitle as string) || themeConfig?.home_subtitle as string || site?.description || "Build faster with a modern static site."}</p>
            <div class="gale-hero-actions">
              <a class="gale-btn gale-btn-primary" href={(themeConfig?.hero_primary_url as string) || "/blog"}>
                {(themeConfig?.hero_primary_label as string) || "Get started"}
              </a>
              <a class="gale-btn gale-btn-secondary" href={(themeConfig?.hero_secondary_url as string) || "/about"}>
                {(themeConfig?.hero_secondary_label as string) || "Learn more"}
              </a>
            </div>
          </section>
        )}
        {isHome && (
          <section class="gale-features" aria-label="Features">
            {[
              { icon: "⚡", title: (themeConfig?.feature_1_title as string) || "Fast", text: (themeConfig?.feature_1_text as string) || "Static-first pages that load instantly." },
              { icon: "🎨", title: (themeConfig?.feature_2_title as string) || "Flexible", text: (themeConfig?.feature_2_text as string) || "Customize colours and content from site admin." },
              { icon: "📱", title: (themeConfig?.feature_3_title as string) || "Responsive", text: (themeConfig?.feature_3_text as string) || "Looks great on every screen size." },
            ].map((f) => (
              <article class="gale-feature" key={f.title}>
                <div class="gale-feature-icon" aria-hidden="true">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </section>
        )}
        {children}
        <footer class="site-footer gale-footer">
          <div class="gale-footer-inner">
            <div class="gale-footer-brand">{site?.title ?? "Gale"}</div>
            <div class="gale-footer-links">
              {(nav ?? []).slice(0, 5).map((item) => (
                <a key={item.route} href={item.route}>{item.navTitle ?? item.frontmatter?.title ?? item.route}</a>
              ))}
            </div>
            {footerText || <>© {new Date().getFullYear()} {site?.title ?? "Gale"} · Powered by <a href="https://getdune.org">Dune</a></>}
          </div>
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
              localStorage.setItem('theme-gale',dark?'dark':'light');
            });
          })();
        ` }} />
      </body>
    </html>
  );
}
