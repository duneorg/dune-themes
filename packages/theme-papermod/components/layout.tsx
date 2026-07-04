/** @jsxImportSource preact */
/**
 * Port of layouts/baseof.html + _partials/head.html + header.html +
 * footer.html. Markup and class names match upstream so the vendored
 * PaperMod stylesheet applies unchanged.
 */
import { h } from "preact";
import { ChevronsUpIcon, ExternalIcon, MoonIcon, SunIcon } from "./icons.tsx";
import { langLabel as langLabelFor } from "../utils/content.ts";

export default function Layout(props: any) {
  const {
    children, site, config, nav, page, pageTitle, pathname, dir,
    themeConfig, t, bodyClass, isPost,
  } = props;
  const translations: Array<{ lang: string; route: string; url: string }> =
    props.translations ?? [];
  const currentLang = page?.language ?? "en";
  const otherLangs = translations.filter((tl) => tl.lang !== currentLang);
  const langLabel = (lang: string) =>
    langLabelFor(lang, t, themeConfig?.language_labels);
  const tr = t ?? ((k: string) => k);
  const themeName = config?.theme?.name ?? "papermod";
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const canonicalPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = page?.frontmatter?.canonicalURL ?? `${siteUrl}${canonicalPath}`;
  const stripSlash = (p: string) => p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
  const normalizedPath = stripSlash(canonicalPath);
  const description = page?.frontmatter?.metadata?.description ??
    page?.frontmatter?.description ?? site?.description ?? "";
  const defaultTheme = (themeConfig?.default_theme ?? "auto") as string;
  const dataTheme = defaultTheme === "dark" ? "dark" : defaultTheme === "light" ? "light" : "auto";
  const footerText = themeConfig?.footer_text ?? "";
  const showCodeCopy = themeConfig?.show_code_copy_buttons !== false && isPost === true;

  // pref-theme restore, per upstream head.html (auto also consults matchMedia)
  const themeScript = defaultTheme === "light"
    ? `if (localStorage.getItem("pref-theme") === "dark") { document.querySelector("html").dataset.theme = 'dark'; }`
    : defaultTheme === "dark"
    ? `if (localStorage.getItem("pref-theme") === "light") { document.querySelector("html").dataset.theme = 'light'; }`
    : `if (localStorage.getItem("pref-theme") === "dark") {
        document.querySelector("html").dataset.theme = 'dark';
    } else if (localStorage.getItem("pref-theme") === "light") {
       document.querySelector("html").dataset.theme = 'light';
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.querySelector("html").dataset.theme = 'dark';
    } else {
        document.querySelector("html").dataset.theme = 'light';
    }`;

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "auto"} data-theme={dataTheme}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="robots" content="index, follow" />
        <title>{pageTitle ?? site?.title}</title>
        <meta name="description" content={description} />
        {page?.frontmatter?.author && <meta name="author" content={page.frontmatter.author} />}
        <link rel="canonical" href={canonicalUrl} />
        <link
          crossorigin="anonymous"
          href={`/themes/${themeName}/static/style.css`}
          rel="preload stylesheet"
          as="style"
        />
        <meta name="theme-color" content="#2e2e33" />
        <meta name="msapplication-TileColor" content="#2e2e33" />
        <link rel="alternate" type="application/rss+xml" href={`${siteUrl}/feed.xml`} title={site?.title} />
        <link rel="alternate" type="application/atom+xml" href={`${siteUrl}/atom.xml`} title={site?.title} />
        <meta property="og:title" content={pageTitle ?? site?.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={page?.frontmatter?.date ? "article" : "website"} />
        <meta property="og:url" content={canonicalUrl} />
        {page?.coverImage && <meta property="og:image" content={`${siteUrl}${page.coverImage}`} />}
        <meta name="twitter:card" content={page?.coverImage ? "summary_large_image" : "summary"} />
        <meta name="twitter:title" content={pageTitle ?? site?.title} />
        <meta name="twitter:description" content={description} />
        {translations.map((tl) => (
          <link rel="alternate" hreflang={tl.lang} href={`${siteUrl}${tl.url}`} />
        ))}
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `
            #theme-toggle, .top-link { display: none; }
          ` }} />
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body class={bodyClass} id="top">
        <header class="header">
          <nav class="header-nav">
            <div class="logo">
              <a href="/" accesskey="h" title={`${site?.title} (Alt + H)`}>{site?.title}</a>
              <div class="logo-switches">
                <button id="theme-toggle" class="theme-toggle" accesskey="t" title="(Alt + T)" aria-label="Toggle theme">
                  <MoonIcon />
                  <SunIcon />
                </button>
                {otherLangs.length > 0 && (
                  <>
                    <span class="nav-sep">|</span>
                    <ul class="lang-menu">
                      {otherLangs.map((tl) => (
                        <li key={tl.lang}>
                          <a
                            href={tl.url}
                            title={langLabel(tl.lang)}
                            aria-label={langLabel(tl.lang)}
                          >
                            {langLabel(tl.lang)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
            <ul id="menu" class="menu">
              {(nav ?? []).map((item: any) => {
                const active = normalizedPath === stripSlash(item.route) ||
                  (item.route !== "/" && canonicalPath.startsWith(item.route + "/"));
                const external = /:\/\//.test(item.route);
                return (
                  <li key={item.route}>
                    <a href={item.route} title={item.navTitle ?? item.title}>
                      <span class={active ? "active" : undefined}>{item.navTitle ?? item.title}</span>
                      {external && <ExternalIcon />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>
        <main class="main">
          {children}
        </main>
        <footer class="footer">
          <span>&copy; {new Date().getFullYear()} <a href="/">{site?.title}</a></span>
          {footerText && <span> · {footerText}</span>}
          <span>
            {" · "}Powered by{" "}
            <a href="https://getdune.org" rel="noopener" target="_blank">Dune</a> &{" "}
            <a href="https://github.com/adityatelange/hugo-PaperMod/" rel="noopener" target="_blank">PaperMod</a>
          </span>
        </footer>
        <a href="#top" id="top-link" class="top-link hidden" aria-label="go to top" title="Go to Top (Alt + G)" accesskey="g">
          <ChevronsUpIcon />
        </a>
        <script dangerouslySetInnerHTML={{ __html: `
    let menu = document.getElementById('menu');
    if (menu) {
        const scrollPosition = localStorage.getItem("menu-scroll-position");
        if (scrollPosition) {
            menu.scrollLeft = parseInt(scrollPosition, 10);
        }
        menu.onscroll = function () {
            localStorage.setItem("menu-scroll-position", menu.scrollLeft);
        }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            var id = this.getAttribute("href").substr(1);
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.querySelector(\`[id='\${decodeURIComponent(id)}']\`).scrollIntoView({
                    behavior: "smooth"
                });
            } else {
                document.querySelector(\`[id='\${decodeURIComponent(id)}']\`).scrollIntoView();
            }
            if (id === "top") {
                history.replaceState(null, null, " ");
            } else {
                history.pushState(null, null, \`#\${id}\`);
            }
        });
    });

    var toplink = document.getElementById("top-link");
    window.onscroll = function () {
        const scrollThreshold = window.innerHeight;
        if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
            toplink.classList.remove("hidden");
        } else {
            toplink.classList.add("hidden");
        }
    };

    document.getElementById("theme-toggle").addEventListener("click", () => {
        const html = document.querySelector("html");
        if (html.dataset.theme === "dark") {
            html.dataset.theme = 'light';
            localStorage.setItem("pref-theme", 'light');
        } else {
            html.dataset.theme = 'dark';
            localStorage.setItem("pref-theme", 'dark');
        }
    })
        ` }} />
        {showCodeCopy && (
          <script dangerouslySetInnerHTML={{ __html: `
    document.querySelectorAll('pre > code').forEach((codeblock) => {
        const container = codeblock.parentNode.parentNode;

        const copybutton = document.createElement('button');
        copybutton.classList.add('copy-code');
        copybutton.innerHTML = '${tr("code_copy")}';

        function copyingDone() {
            copybutton.innerHTML = '${tr("code_copied")}';
            setTimeout(() => {
                copybutton.innerHTML = '${tr("code_copy")}';
            }, 2000);
        }

        copybutton.addEventListener('click', (cb) => {
            if ('clipboard' in navigator) {
                navigator.clipboard.writeText(codeblock.textContent);
                copyingDone();
                return;
            }
            const range = document.createRange();
            range.selectNodeContents(codeblock);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                copyingDone();
            } catch (e) { };
            selection.removeRange(range);
        });

        if (container.classList.contains("highlight")) {
            container.appendChild(copybutton);
        } else {
            codeblock.parentNode.appendChild(copybutton);
        }
    });
          ` }} />
        )}
      </body>
    </html>
  );
}
