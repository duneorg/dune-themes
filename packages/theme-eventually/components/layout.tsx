/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import { socialLinksFromNav } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

interface LayoutProps extends TemplateProps {
  children?: ComponentChildren;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  /** When true, show the coming-soon landing shell only (no content panel). */
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
  const themeName = config?.theme?.name ?? "eventually";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const basePath = site?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";
  const currentPath = pathname ?? page?.route ?? "/";
  const normalizedPath = stripSlash(page?.route ?? currentPath);
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Eventually";
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const description = meta.description ?? fm.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Eventually";
  const tagline = (themeConfig?.tagline as string) || site?.description || "";
  const isHome = normalizedPath === "/" || normalizedPath === "/home";
  const isLanding = landing ?? isHome;
  const social = socialLinksFromNav(nav)
    .map((link) => ({ ...link, href: safeHref(link.href) ?? link.href }))
    .filter((link) => link.href);
  const bodyClass = [
    isLanding ? "is-preload" : "is-preload is-content",
    "theme-eventually",
    "archetype-landing",
  ].join(" ");
  const bgBase = `/themes/${themeName}/static/html5up/images`;
  const creditHref = safeHref("https://html5up.net/eventually") ?? "https://html5up.net/eventually";

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
      <body class={bodyClass}>
        <header id="header">
          <h1><a href={homeHref}>{siteTitle}</a></h1>
          {tagline && <p>{tagline}</p>}
        </header>

        {isLanding && (
          <form id="signup-form" method="post" action="#">
            <input
              type="email"
              name="email"
              id="email"
              placeholder={tr("cta.email_placeholder", "Email Address")}
            />
            <input type="submit" value={tr("cta.sign_up", "Sign Up")} />
          </form>
        )}

        {!isLanding && children && (
          <div class="dune-content">{children}</div>
        )}

        <footer id="footer">
          {social.length > 0 && (
            <ul class="icons">
              {social.map((link) => (
                <li key={link.href}>
                  <a href={link.href} class={link.icon}>
                    <span class="label">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <ul class="copyright">
            <li>&copy; {new Date().getFullYear()} {copyrightName}.</li>
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
(function(){
  var bgBase=${JSON.stringify(bgBase)};
  window.addEventListener('load',function(){
    setTimeout(function(){ document.body.classList.remove('is-preload'); },100);
  });
  (function(){
    var body=document.body,images={'bg01.jpg':'center','bg02.jpg':'center','bg03.jpg':'center'},delay=6000;
    var wrapper=document.createElement('div');wrapper.id='bg';body.insertBefore(wrapper,body.firstChild);
    var bgs=[],pos=0;
    for(var k in images){
      var bg=document.createElement('div');
      bg.style.backgroundImage='url("'+bgBase+'/'+k+'")';
      bg.style.backgroundPosition=images[k];
      wrapper.appendChild(bg);bgs.push(bg);
    }
    if(!bgs.length)return;
    bgs[0].classList.add('visible','top');
    if(bgs.length<2)return;
    setInterval(function(){
      var last=pos;pos=(pos+1)%bgs.length;
      bgs[last].classList.remove('top');
      bgs[pos].classList.add('visible','top');
      setTimeout(function(){ bgs[last].classList.remove('visible'); },delay/2);
    },delay);
  })();
  var form=document.getElementById('signup-form');
  if(!form||!('addEventListener' in form))return;
  var submit=form.querySelector('input[type="submit"]');
  var msg=document.createElement('span');msg.className='message';form.appendChild(msg);
  function hideMsg(){ msg.classList.remove('visible','success','failure'); }
  function showMsg(type,text){
    msg.textContent=text;msg.classList.add(type,'visible');
    setTimeout(hideMsg,3000);
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();hideMsg();
    if(submit)submit.disabled=true;
    setTimeout(function(){
      form.reset();if(submit)submit.disabled=false;
      showMsg('success',${JSON.stringify(tr("cta.thank_you", "Thank you!"))});
    },750);
  });
})();
        `,
          }}
        />
      </body>
    </html>
  );
}
