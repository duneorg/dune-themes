/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import { socialLinksFromNav } from "../utils/content.ts";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  /** When true, show the coming-soon landing shell only (no content panel). */
  landing?: boolean;
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
  const themeName = config?.theme?.name ?? "eventually";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? `${siteUrl}${currentPath}` : currentPath;
  const title = pageTitle || site?.title || "Eventually";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const copyrightName = (themeConfig?.footer_text as string) || site?.title || "Untitled";
  const siteTitle = site?.title ?? "Eventually";
  const tagline = (themeConfig?.tagline as string) || site?.description || "";
  const isHome = currentPath === "/";
  const isLanding = landing ?? isHome;
  const social = socialLinksFromNav(nav);
  const bodyClass = isLanding ? "is-preload" : "is-preload is-content";
  const bgBase = `/themes/${themeName}/static/html5up/images`;

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
          <h1>{siteTitle}</h1>
          {tagline && <p>{tagline}</p>}
        </header>

        {isLanding && (
          <form id="signup-form" method="post" action="#">
            <input type="email" name="email" id="email" placeholder="Email Address" />
            <input type="submit" value="Sign Up" />
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
          {showCredit && (
            <ul class="copyright">
              <li>&copy; {new Date().getFullYear()} {copyrightName}.</li>
              <li>
                Credits: <a href="https://html5up.net/eventually">HTML5 UP</a>
              </li>
            </ul>
          )}
        </footer>

        <script dangerouslySetInnerHTML={{ __html: `
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
      showMsg('success','Thank you!');
    },750);
  });
})();
        ` }} />
      </body>
    </html>
  );
}
