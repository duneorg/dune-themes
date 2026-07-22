/**
 * Blox layout — port of Hugo Blox baseof.html:
 * navbar (components/headers/navbar.html), page body, footer
 * (site_footer.html + footers/minimal.html), and the search modal shell.
 */
import type { ComponentChildren } from "preact";
import type { PageIndex, PageTranslation, TemplateProps } from "@dune/core/content/types";
import { Icon } from "./icon.tsx";
import { linkTarget, type MenuItem, normalizeRoute, parseMenu, str } from "../utils/blox.ts";
import { safeHref } from "../utils/safe-url.ts";

/* Runs before paint: applies stored/system theme to <html> (upstream hb-head.js). */
const THEME_INIT_JS = `
(function () {
  var root = document.documentElement;
  var def = root.dataset.wcThemeDefault || "system";
  window.hbb = {
    defaultTheme: def,
    setDarkTheme: function () { root.classList.add("dark"); root.style.colorScheme = "dark"; },
    setLightTheme: function () { root.classList.remove("dark"); root.style.colorScheme = "light"; },
  };
  var stored = localStorage.getItem("wc-color-theme");
  if (stored === "dark" || (!stored && (def === "dark" || (def === "system" && matchMedia("(prefers-color-scheme: dark)").matches)))) {
    window.hbb.setDarkTheme();
  } else {
    window.hbb.setLightTheme();
  }
})();
`;

export interface LayoutProps extends TemplateProps {
  /** Landing pages suppress the page-body vertical margin (upstream .Type "landing"). */
  isLanding?: boolean;
  children?: ComponentChildren;
}

interface Cta {
  text: string;
  url: string;
}

function parseCta(value: unknown): Cta | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const obj = JSON.parse(value);
    if (obj && typeof obj === "object" && obj.text && obj.url) {
      const url = safeHref(obj.url);
      if (!url) return null;
      return { text: String(obj.text), url };
    }
  } catch { /* ignore malformed config */ }
  return null;
}

function langLabel(code: string, mode: string, t: (k: string) => string): string {
  const translated = t(code);
  if (translated !== code) return translated;
  if (mode === "name") {
    try {
      const dn = new Intl.DisplayNames([code], { type: "language" });
      return dn.of(code) ?? code;
    } catch {
      return code;
    }
  }
  return code;
}

export default function Layout(props: LayoutProps) {
  const cfg = props.themeConfig ?? {};
  const t = (props as unknown as { t?: (k: string) => string }).t ?? ((k: string) => k);
  const page = props.page;
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;

  const siteTitle = str(cfg.title) || props.site.title || "Hugo Blox";
  const mode = str(cfg.theme_mode) || "system";
  const sticky = cfg.sticky_header !== false;
  const showSearch = cfg.search !== false;
  const showModeToggle = cfg.theme_toggle !== false;
  const menu: MenuItem[] = parseMenu(cfg.menu, props.nav ?? []);
  const cta = parseCta(cfg.cta);
  const footerText = str(cfg.footer_text);
  const labelMode = str(cfg.language_labels) || "code";

  const pathname = props.pathname ?? normalizeRoute(page?.route ?? "/");
  const translations: PageTranslation[] = props.translations ?? [];
  const currentLang = page?.language ?? "en";
  const others = translations.filter((tr) => tr.lang !== currentLang);
  const basePath = (props.site as { basePath?: string } | undefined)?.basePath ?? "";
  const homeHref = `${basePath}/`.replace(/([^:]\/)\/+/g, "$1") || "/";

  const isActive = (url: string) => normalizeRoute(url) === normalizeRoute(pathname);

  // Sanitize menu URLs (config-supplied JSON can carry any scheme).
  const safeMenu = menu
    .map((item) => {
      const url = safeHref(item.url);
      return url ? { ...item, url } : null;
    })
    .filter((item): item is MenuItem => item !== null);

  return (
    <html
      lang={currentLang}
      dir={props.dir}
      data-wc-theme-default={mode}
      data-hbb-relurl={homeHref}
      data-base-path={basePath || undefined}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.pageTitle}</title>
        {str(fm.summary) && <meta name="description" content={str(fm.summary)} />}
        {translations.map((tr) => (
          <link rel="alternate" hreflang={tr.lang} href={tr.url} key={tr.lang} />
        ))}
        <link rel="stylesheet" href="/themes/blox/static/blox.css" />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_JS }} />
      </head>
      <body
        class="bg-[var(--hb-color-background)] text-[var(--hb-color-foreground)] page-wrapper"
        id="top"
      >
        <div id="page-bg"></div>
        <div class={`page-header ${sticky ? "sticky top-0 z-30" : ""}`}>
          <header id="site-header" class="header">
            <nav class="navbar px-3 flex justify-start">
              <div class="order-0 h-full">
                <a class="navbar-brand" href={homeHref} title={siteTitle}>
                  {siteTitle}
                </a>
              </div>
              {/* Mobile menu */}
              <input id="nav-toggle" type="checkbox" class="hidden" />
              <label
                for="nav-toggle"
                class="order-3 cursor-pointer flex items-center lg:hidden text-[var(--hb-color-header-fg)] lg:order-1"
              >
                <svg id="show-button" class="h-6 fill-current block" viewBox="0 0 20 20">
                  <title>Open Menu</title>
                  <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
                </svg>
                <svg id="hide-button" class="h-6 fill-current hidden" viewBox="0 0 20 20">
                  <title>Close Menu</title>
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"
                  >
                  </polygon>
                </svg>
              </label>

              {/* Main menu */}
              <ul
                id="nav-menu"
                class="navbar-nav order-3 hidden lg:flex w-full pb-6 lg:order-1 lg:w-auto lg:space-x-2 lg:pb-0 xl:space-x-8 justify-start"
              >
                {safeMenu.map((item) => (
                  <li class="nav-item" key={item.url}>
                    <a
                      class={`nav-link ${isActive(item.url) ? "active" : ""}`}
                      href={item.url}
                      {...linkTarget(item.url)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                {cta && (
                  <li class="mt-4 inline-block lg:hidden">
                    <a class="" href={cta.url}>{cta.text}</a>
                  </li>
                )}
              </ul>

              <div class="order-1 ml-auto flex items-center md:order-2 lg:ml-0">
                {showSearch && (
                  <button
                    aria-label="toggle search"
                    class="inline-block px-3 text-xl text-[var(--hb-color-header-fg)] hover:text-primary-500 cursor-pointer"
                    data-search-toggle
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                  </button>
                )}

                {showModeToggle && (
                  <div class="px-3 text-[var(--hb-color-header-fg)] hover:text-primary-500 [&.active]:font-bold [&.active]:text-primary-500">
                    <button class="theme-toggle mt-1" accesskey="t" title="appearance">
                      <svg
                        id="moon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="block dark:hidden"
                      >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                      </svg>
                      <svg
                        id="sun"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="hidden dark:block"
                      >
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>
                    </button>
                  </div>
                )}

                {others.length > 0 && (
                  <div class="pl-1 mr-5 text-[var(--hb-color-header-fg)] hover:text-primary-500 [&.active]:font-bold [&.active]:text-primary-500">
                    <div class="nav-item nav-dropdown group relative">
                      <span
                        role="button"
                        tabindex={0}
                        aria-haspopup
                        aria-expanded={false}
                        class="nav-link cursor-pointer select-none inline-flex items-center"
                      >
                        <Icon name="globe-alt" class="h-4 w-4 mr-1" />
                        {langLabel(currentLang, labelMode, t)}
                        <svg class="h-4 w-4 fill-current inline-block" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                      <ul class="nav-dropdown-list lg:group-hover:visible lg:group-hover:opacity-100">
                        {others.map((tr) => (
                          <li class="nav-dropdown-item" key={tr.lang}>
                            <a class="nav-dropdown-link" href={tr.url}>
                              {langLabel(tr.lang, labelMode, t)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {cta && (
                  <a
                    href={cta.url}
                    class="inline-block rounded border px-5 py-2 font-semibold transition md:ml-4 px-4 py-1.5 text-sm border-black hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white dark:border-white dark:text-white hidden lg:inline-block"
                  >
                    {cta.text}
                  </a>
                )}
              </div>
            </nav>
          </header>
        </div>

        <div class={`page-body${props.isLanding ? "" : " my-10"}`}>
          {props.children}
        </div>

        <div class="page-footer">
          <footer class="container mx-auto flex flex-col justify-items-center text-sm leading-6 mt-24 mb-4 text-slate-700 dark:text-slate-200">
            {safeMenu.length > 0 && (
              <nav class="flex flex-wrap justify-center gap-x-8 gap-y-2 py-4">
                {safeMenu.map((item) => (
                  <a
                    href={item.url}
                    class="text-base font-medium text-gray-500 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-300"
                    key={item.url}
                    {...linkTarget(item.url)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            )}
            {footerText && (
              <p
                class="text-center"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: footerText }}
              />
            )}
            <p class="powered-by text-center text-sm opacity-80 py-1">
              {t("published_with").split("{hugoblox}")[0] || "Made with "}
              <a
                class="underline hover:opacity-100"
                href="https://hugoblox.com"
                target="_blank"
                rel="noopener"
              >
                Hugo Blox
              </a>
              {" "}(ported to Dune).
            </p>
          </footer>
        </div>

        {showSearch && <SearchModal t={t} />}
        <script src="/themes/blox/static/blox.js" defer></script>
      </body>
    </html>
  );
}

/** Search modal shell — upstream markup, driven by static/blox.js over /api/search. */
function SearchModal({ t }: { t: (k: string) => string }) {
  return (
    <div
      id="hb-search-modal"
      class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm hidden"
      data-no-results={t("search.noResults")}
    >
      <div class="absolute inset-0" data-search-close></div>
      <div class="relative mx-auto mt-[10vh] max-w-3xl search-modal-enter">
        <div class="mx-4 overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
          <div class="border-b border-gray-200 dark:border-gray-800">
            <div class="flex items-center gap-3 px-4 py-3">
              <svg class="h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                >
                </path>
              </svg>
              <input
                id="hb-search-input"
                type="text"
                placeholder="Search..."
                class="flex-1 bg-transparent text-lg outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                autocomplete="off"
              />
              <kbd class="hidden sm:block flex-shrink-0 rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                ESC
              </kbd>
              <button
                data-search-close
                class="flex-shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  >
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <div id="hb-search-results" class="max-h-[60vh] overflow-y-auto"></div>
        </div>
      </div>
    </div>
  );
}
