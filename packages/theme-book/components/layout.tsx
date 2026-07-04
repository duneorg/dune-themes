/** @jsxImportSource preact */
/**
 * Port of layouts/baseof.html + _partials/docs/{html-head,header,menu,brand,
 * copyright}.html. The sidebar filetree + search live in the BookMenu island
 * (they need the full nav tree, fetched from /api/nav); everything else is
 * server-rendered 1:1 from the upstream markup.
 */
import { h } from "preact";
import BookSearch from "../islands/BookSearch.tsx";
import MenuTree from "./menu-tree.tsx";
import { buildTree, langSwitchLabel, navLabel, prevNext } from "../utils/nav.ts";

const ASSETS = "/themes/book/static";

// assets/clipboard.js, verbatim
const CLIPBOARD_JS = `(function () {
  document.querySelectorAll("pre:has(code)").forEach(code => {
    code.addEventListener("click", code.focus);
    code.addEventListener("copy", function (event) {
      event.preventDefault();
      if (navigator.clipboard) {
        const content = window.getSelection().toString() || code.textContent;
        navigator.clipboard.writeText(content);
      }
    });
  });
})();`;

// assets/menu-reset.js, verbatim
const MENU_RESET_JS = `(function() {
  var menu = document.querySelector("aside .book-menu-content");
  if (!menu) return;
  addEventListener("beforeunload", function(event) {
      localStorage.setItem("menu.scrollTop", menu.scrollTop);
  });
  menu.scrollTop = localStorage.getItem("menu.scrollTop");
})();`;

export default function Layout(props: any) {
  const { page, pageTitle, site, dir, pathname, themeConfig, t, children } = props;
  const fm = page?.frontmatter ?? {};
  const tc = themeConfig ?? {};

  const bookTheme = (tc.book_theme as string) ?? "auto";
  const searchEnabled = tc.book_search !== false;
  const showToc = fm.bookToC !== false && tc.book_toc !== false;
  const tocHtml: string = props.tocHtml ?? "";
  const hasToc = showToc && tocHtml.length > 0;
  const logo = (tc.book_logo as string) || null;
  const copyright = (tc.copyright as string) || "";
  const section = (tc.book_section as string) ?? "docs";
  const currentPath = pathname ?? page?.route ?? "/";
  const navAll = props.navAll ?? [];
  const tree = buildTree(navAll, section);
  const { prev, next } = prevNext(navAll, section, currentPath);
  const translations: Array<{ lang: string; route: string; url: string }> =
    props.translations ?? [];
  const currentLang = page?.language ?? "en";
  const langLabel = (lang: string) =>
    langSwitchLabel(lang, t, tc.language_labels);

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"} data-book-theme={bookTheme}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={fm.metadata?.description ?? fm.description ?? site?.description ?? ""} />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#2e3440" />
        <meta name="color-scheme" content="light dark" />
        <title>{pageTitle ?? fm.title}</title>
        {translations.map((tl) => (
          <link rel="alternate" hreflang={tl.lang} href={tl.url} />
        ))}
        <link rel="icon" href={`${ASSETS}/favicon.svg`} type="image/svg+xml" />
        <link rel="stylesheet" href={`${ASSETS}/book.css`} />
      </head>
      <body
        dir={dir ?? "ltr"}
        class={`book-kind-page book-type-${page?.template ?? "default"}`}
      >
        <input type="checkbox" class="hidden toggle" id="menu-control" />
        <input type="checkbox" class="hidden toggle" id="toc-control" />
        <main class="container flex">
          {/* Left menu */}
          <aside class="book-menu">
            <div class="book-menu-content">
              <nav>
                <h2 class="book-brand">
                  <a class="flex align-center" href="/">
                    {logo && <img src={logo} alt="Logo" />}
                    <span>{site?.title}</span>
                  </a>
                </h2>
                {searchEnabled && <BookSearch placeholder={t ? t("Search") : "Search"} />}
                {translations.filter((tl) => tl.lang !== currentLang).length > 0 && (
                  <ul class="book-languages">
                    <li>
                      <input type="checkbox" id="languages" class="toggle" />
                      <label for="languages" class="flex">
                        <a role="button">
                          <img
                            src={`${ASSETS}/svg/translate.svg`}
                            class="book-icon"
                            alt={t ? t("Languages") : "Languages"}
                          />
                          {langLabel(currentLang)}
                        </a>
                        <img
                          src={`${ASSETS}/svg/chevron-right.svg`}
                          class="book-icon"
                          alt={t ? t("Expand") : "Expand"}
                        />
                      </label>
                      <ul>
                        {translations
                          .filter((tl) => tl.lang !== currentLang)
                          .map((tl) => (
                            <li key={tl.lang}>
                              <a href={tl.url} class="flex flex-auto">
                                {langLabel(tl.lang)}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </li>
                  </ul>
                )}
                <MenuTree nodes={tree} pathname={currentPath} />
              </nav>
              <script dangerouslySetInnerHTML={{ __html: MENU_RESET_JS }} />
            </div>
          </aside>

          <div class="book-page">
            {/* Mobile layout header */}
            <header class="book-header hidden">
              <div class="flex align-center justify-between">
                <label for="menu-control">
                  <img src={`${ASSETS}/svg/menu.svg`} class="book-icon" alt={t ? t("Menu") : "Menu"} />
                </label>
                <h3>{fm.title}</h3>
                <label for="toc-control">
                  {hasToc && (
                    <img
                      src={`${ASSETS}/svg/toc.svg`}
                      class="book-icon"
                      alt={t ? t("Table of Contents") : "Table of Contents"}
                    />
                  )}
                </label>
              </div>
              {hasToc && (
                <aside class="hidden">
                  <div dangerouslySetInnerHTML={{ __html: tocHtml }} />
                </aside>
              )}
            </header>

            {children}

            <footer class="book-footer">
              {(prev || next) && (
                <div class="flex flex-wrap justify-between">
                  <span>
                    {prev && (
                      <a href={prev.route} class="flex align-center">
                        <img
                          src={`${ASSETS}/svg/backward.svg`}
                          class="book-icon"
                          alt={t ? t("Backward") : "Backward"}
                        />
                        <span>{navLabel(prev)}</span>
                      </a>
                    )}
                  </span>
                  <span>
                    {next && (
                      <a href={next.route} class="flex align-center">
                        <span>{navLabel(next)}</span>
                        <img
                          src={`${ASSETS}/svg/forward.svg`}
                          class="book-icon"
                          alt={t ? t("Forward") : "Forward"}
                        />
                      </a>
                    )}
                  </span>
                </div>
              )}
              {copyright && (
                <div class="book-copyright flex justify-center">{copyright}</div>
              )}
              <script dangerouslySetInnerHTML={{ __html: CLIPBOARD_JS }} />
            </footer>

            <label for="menu-control" class="hidden book-menu-overlay"></label>
          </div>

          {/* Table of Contents */}
          {hasToc && (
            <aside class="book-toc">
              <div class="book-toc-content" dangerouslySetInnerHTML={{ __html: tocHtml }} />
            </aside>
          )}
        </main>
      </body>
    </html>
  );
}
