/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
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
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "parallelism";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Parallelism";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const navItems = (nav ?? []).slice(0, 8);
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const homeSubtitle = (themeConfig?.home_subtitle as string) || site?.description || "";

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
        <noscript>
          <link rel="stylesheet" href={`/themes/${themeName}/static/html5up/css/noscript.css`} />
        </noscript>
      </head>
      <body class="is-preload">
        <div id="wrapper">
          <section id="main">{children}</section>

          {showCredit && (
            <section id="footer">
              <section>
                <p>
                  This is <strong>{site?.title ?? "Parallelism"}</strong>
                  {homeSubtitle ? <> — {homeSubtitle}</> : null}, a responsive portfolio theme by{" "}
                  <a href="https://html5up.net">HTML5 UP</a> adapted for{" "}
                  <a href="https://getdune.org">Dune</a>.
                </p>
                {navItems.length > 0 && (
                  <nav aria-label="Site">
                    <ul class="icons">
                      {navItems.map((item) => (
                        <li key={item.route}>
                          <a
                            href={item.route}
                            class={isActive(item.route) ? "icon solid fa-link active" : "icon solid fa-link"}
                          >
                            <span class="label">
                              {item.navTitle ?? item.frontmatter?.title ?? item.route}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </section>
              <section>
                <ul class="copyright">
                  <li>&copy; {new Date().getFullYear()} {copyrightName}</li>
                  <li>Design: <a href="https://html5up.net/parallelism">HTML5 UP</a></li>
                </ul>
              </section>
            </section>
          )}
        </div>

        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            window.addEventListener('load',function(){
              setTimeout(function(){ document.body.classList.remove('is-preload'); }, 100);
            });
            var main=document.getElementById('main');
            var wrapper=document.getElementById('wrapper');
            if(!main||!wrapper)return;
            var mobile=window.matchMedia('(max-width: 736px)').matches;
            if(mobile){
              main.style.overflowX='auto';
              return;
            }
            document.addEventListener('keydown',function(e){
              if(e.target&&(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'))return;
              if(e.key==='ArrowLeft'){ main.scrollLeft-=50; e.preventDefault(); }
              if(e.key==='ArrowRight'){ main.scrollLeft+=50; e.preventDefault(); }
            });
            main.addEventListener('wheel',function(e){
              if(window.matchMedia('(max-width: 736px)').matches)return;
              e.preventDefault();
              var delta=Math.min(Math.abs(e.deltaX||e.deltaY),150);
              main.scrollLeft+=delta*(e.deltaX>0||(!e.deltaX&&e.deltaY>0)?1:-1);
            },{passive:false});
            function zone(dir){
              var el=document.createElement('div');
              el.className='scrollZone '+(dir<0?'left':'right');
              el.addEventListener('mouseenter',function(){
                var id=setInterval(function(){ main.scrollLeft+=15*dir; },25);
                el.addEventListener('mouseleave',function(){ clearInterval(id); },{once:true});
                el.addEventListener('mousedown',function(){ clearInterval(id); },{once:true});
              });
              wrapper.appendChild(el);
            }
            zone(-1); zone(1);
          })();
        ` }} />
      </body>
    </html>
  );
}
