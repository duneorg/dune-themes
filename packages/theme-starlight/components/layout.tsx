/** @jsxImportSource preact */
/**
 * Port of Page.astro + PageFrame.astro + Header.astro + SiteTitle.astro +
 * Search.astro (shell) + ThemeProvider/ThemeSelect/LanguageSelect +
 * SocialIcons + MobileMenuToggle + MobileMenuFooter + TwoColumnContent +
 * ContentPanel + PageTitle + Banner + SkipLink. Markup matches upstream so
 * the descoped stylesheet applies unchanged; client behaviour lives in
 * static/starlight.js (custom elements, loaded at the end of body).
 */
import "./custom-elements.ts";
import { type ComponentChildren, Fragment, h } from "preact";
import Icon from "./icon.tsx";
import Select from "./select.tsx";
import Sidebar from "./sidebar.tsx";
import PageSidebar from "./toc.tsx";
import Footer from "./footer.tsx";
import Hero from "./hero.tsx";
import {
  buildTree,
  langSwitchLabel,
  type NavPage,
  normalizeRoute,
  prevNext,
  type TocItem,
} from "../utils/starlight.ts";

const ASSETS = "/themes/starlight/static";

// ThemeProvider.astro — inlined to avoid FOUC.
const THEME_PROVIDER_JS = `window.StarlightThemeProvider = (() => {
	const storedTheme =
		typeof localStorage !== 'undefined' && localStorage.getItem('starlight-theme');
	const theme =
		storedTheme ||
		(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
	document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
	return {
		updatePickers(theme = storedTheme || 'auto') {
			document.querySelectorAll('starlight-theme-select').forEach((picker) => {
				const select = picker.querySelector('select');
				if (select) select.value = theme;
				const tmpl = document.querySelector('#theme-icons');
				const newIcon = tmpl && tmpl.content.querySelector('.' + theme);
				if (newIcon) {
					const oldIcon = picker.querySelector('svg.label-icon');
					if (oldIcon) {
						oldIcon.replaceChildren(...newIcon.cloneNode(true).childNodes);
					}
				}
			});
		},
	};
})();`;

interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

function parseSocial(value: unknown): SocialLink[] {
  if (Array.isArray(value)) return value as SocialLink[];
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch { /* malformed config — render no icons */ }
  }
  return [];
}

function SiteTitle(
  { site, themeConfig }: {
    site: Record<string, unknown> | undefined;
    themeConfig: Record<string, unknown>;
  },
) {
  const logo = (themeConfig?.logo as string) || null;
  return (
    <a href="/" class="site-title sl-flex">
      {logo && <img alt="" src={logo} />}
      <span {...{ translate: "no" } as Record<string, unknown>}>{site?.title as string}</span>
    </a>
  );
}

function Search({ t }: { t: (k: string) => string }) {
  return (
    <site-search data-no-results={t("search.noResults")}>
      <button
        data-open-modal
        disabled
        aria-label={t("search.label")}
        aria-keyshortcuts="Control+K"
      >
        <Icon name="magnifier" />
        <span class="sl-hidden md:sl-block" aria-hidden="true">{t("search.label")}</span>
        <kbd class="sl-hidden md:sl-flex" style="display: none;">
          <kbd>{t("search.ctrlKey")}</kbd>
          <kbd>K</kbd>
        </kbd>
      </button>
      <dialog style="padding:0" aria-label={t("search.label")}>
        <div class="dialog-frame sl-flex">
          <button data-close-modal class="sl-flex md:sl-hidden">
            {t("search.cancelLabel")}
          </button>
          <div class="search-container">
            <div id="starlight__search">
              <input
                type="search"
                placeholder={t("search.label")}
                autocomplete="off"
              />
              <ul class="search-results"></ul>
              <p class="search-message"></p>
            </div>
          </div>
        </div>
      </dialog>
    </site-search>
  );
}

function SocialIcons({ links }: { links: SocialLink[] }) {
  return (
    <Fragment>
      {links.map(({ label, href, icon }) => (
        <a href={href} rel="me" class="sl-flex">
          <span class="sr-only">{label}</span>
          <Icon name={icon} />
        </a>
      ))}
    </Fragment>
  );
}

function ThemeSelect({ t }: { t: (k: string) => string }) {
  return (
    <starlight-theme-select>
      <Select
        icon="laptop"
        label={t("themeSelect.accessibleLabel")}
        options={[
          { label: t("themeSelect.dark"), selected: false, value: "dark" },
          { label: t("themeSelect.light"), selected: false, value: "light" },
          { label: t("themeSelect.auto"), selected: true, value: "auto" },
        ]}
        width="6.25em"
      />
      <script dangerouslySetInnerHTML={{ __html: "StarlightThemeProvider.updatePickers();" }} />
    </starlight-theme-select>
  );
}

function LanguageSelect(
  { translations, currentLang, t, themeConfig }: {
    translations: Array<{ lang: string; url: string }>;
    currentLang: string;
    t: (k: string) => string;
    themeConfig: Record<string, unknown>;
  },
) {
  if (translations.length < 2) return null;
  return (
    <starlight-lang-select>
      <Select
        icon="translate"
        label={t("languageSelect.accessibleLabel")}
        options={translations.map((tl) => ({
          value: tl.url,
          selected: tl.lang === currentLang,
          label: langSwitchLabel(tl.lang, t, themeConfig?.language_labels),
        }))}
        width="7em"
      />
    </starlight-lang-select>
  );
}

function MobileMenuFooter(
  { social, translations, currentLang, t, themeConfig }: {
    social: SocialLink[];
    translations: Array<{ lang: string; url: string }>;
    currentLang: string;
    t: (k: string) => string;
    themeConfig: Record<string, unknown>;
  },
) {
  return (
    <div class="mobile-preferences sl-flex">
      <div class="social-icons">
        <SocialIcons links={social} />
      </div>
      <ThemeSelect t={t} />
      <LanguageSelect
        translations={translations}
        currentLang={currentLang}
        t={t}
        themeConfig={themeConfig}
      />
    </div>
  );
}

export interface LayoutProps {
  page?: Record<string, unknown>;
  pageTitle?: string;
  site?: Record<string, unknown>;
  dir?: string;
  pathname?: string;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  navAll?: NavPage[];
  translations?: Array<{ lang: string; route: string; url: string }>;
  /** Nested ToC items, or null for pages without a ToC. */
  tocItems?: TocItem[] | null;
  hasSidebar?: boolean;
  /** Render the hero layout (splash template). */
  hero?: boolean;
  children?: ComponentChildren;
}

export default function Layout(props: LayoutProps) {
  const { page, pageTitle, site, pathname, children } = props;
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const tc = props.themeConfig ?? {};
  const t = props.t ?? ((k: string) => k);
  const dir = props.dir ?? "ltr";
  const lang = (page?.language as string) ?? "en";
  const hero = props.hero === true;
  const hasSidebar = props.hasSidebar ?? true;
  const toc = hero ? null : (props.tocItems ?? null);
  const banner = (fm.banner as { content?: string } | undefined)?.content;
  const social = parseSocial(tc.social);
  const translations = props.translations ?? [];
  const currentPath = pathname ?? (page?.route as string) ?? "/";
  const section = (tc.sidebar_section as string) ?? "*";
  // Starlight's sidebar lists docs pages only — leave out splash pages
  // (the landing page) like upstream.
  const navAll = (props.navAll ?? []).filter(
    (p) => (p as { template?: string }).template !== "splash",
  );
  const tree = buildTree(navAll, section);
  const { prev, next } = prevNext(navAll, section, currentPath);
  const description = (fm as Record<string, any>).metadata?.description ??
    fm.description ?? site?.description ?? "";

  return (
    <html
      lang={lang}
      dir={dir as "ltr" | "rtl"}
      data-theme="dark"
      data-has-toc={toc ? "" : undefined}
      data-has-sidebar={hasSidebar ? "" : undefined}
      data-has-hero={hero ? "" : undefined}
    >
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {pageTitle ?? `${fm.title ? fm.title + " | " : ""}${site?.title ?? ""}`}
        </title>
        {description && <meta name="description" content={description} />}
        <meta name="generator" content="Dune (Starlight port)" />
        {translations.map((tl) => (
          <link rel="alternate" hreflang={tl.lang} href={tl.url} />
        ))}
        <link rel="stylesheet" href={`${ASSETS}/starlight.css`} />
        <script dangerouslySetInnerHTML={{ __html: THEME_PROVIDER_JS }} />
        <link rel="stylesheet" href={`${ASSETS}/print.css`} media="print" />
      </head>
      <body>
        <template
          id="theme-icons"
          dangerouslySetInnerHTML={{
            __html:
              `<svg aria-hidden="true" class="sl-icon light" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">${iconHtml("sun")}</svg>` +
              `<svg aria-hidden="true" class="sl-icon dark" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">${iconHtml("moon")}</svg>` +
              `<svg aria-hidden="true" class="sl-icon auto" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">${iconHtml("laptop")}</svg>`,
          }}
        />
        <a class="sl-skip-link" href="#_top">{t("skipLink.label")}</a>
        <div class="page sl-flex">
          <header class="header">
            <div class="header">
              <div class="title-wrapper sl-flex">
                <SiteTitle site={site} themeConfig={tc} />
              </div>
              <div class="sl-flex print:hidden">
                {tc.search !== false && <Search t={t} />}
              </div>
              <div class="sl-hidden md:sl-flex print:hidden right-group">
                <div class="sl-flex social-icons">
                  <SocialIcons links={social} />
                </div>
                <ThemeSelect t={t} />
                <LanguageSelect
                  translations={translations}
                  currentLang={lang}
                  t={t}
                  themeConfig={tc}
                />
              </div>
            </div>
          </header>
          {hasSidebar && (
            <nav class="sidebar print:hidden" aria-label={t("sidebarNav.accessibleLabel")}>
              <starlight-menu-button class="print:hidden">
                <button
                  aria-expanded="false"
                  aria-label={t("menuButton.accessibleLabel")}
                  aria-controls="starlight__sidebar"
                  class="sl-flex md:sl-hidden"
                >
                  <Icon name="bars" class="open-menu" />
                  <Icon name="close" class="close-menu" />
                </button>
              </starlight-menu-button>
              <div id="starlight__sidebar" class="sidebar-pane">
                <div class="sidebar-content sl-flex">
                  <Sidebar
                    tree={tree}
                    current={normalizeRoute(currentPath)}
                    mobileFooter={
                      <MobileMenuFooter
                        social={social}
                        translations={translations}
                        currentLang={lang}
                        t={t}
                        themeConfig={tc}
                      />
                    }
                  />
                </div>
              </div>
            </nav>
          )}
          <div class="main-frame">
            <div class="lg:sl-flex">
              {toc && (
                <aside class="right-sidebar-container print:hidden">
                  <div class="right-sidebar">
                    <PageSidebar toc={toc} t={t} />
                  </div>
                </aside>
              )}
              <div class="main-pane">
                <main lang={lang} dir={dir as "ltr" | "rtl"}>
                  {banner && (
                    <div
                      class="sl-banner"
                      dangerouslySetInnerHTML={{ __html: banner }}
                    />
                  )}
                  {hero
                    ? (
                      <div class="content-panel">
                        <div class="sl-container">
                          <Hero page={page ?? {}} />
                          <div class="sl-markdown-content">{children}</div>
                          <Footer
                            page={page}
                            prev={null}
                            next={null}
                            dir={dir as "ltr" | "rtl"}
                            t={t}
                            themeConfig={tc}
                          />
                        </div>
                      </div>
                    )
                    : (
                      <Fragment>
                        <div class="content-panel">
                          <div class="sl-container">
                            <h1 id="_top" class="sl-page-title">{fm.title as string}</h1>
                            {fm.draft === true && (
                              <p class="sl-flex sl-content-notice">
                                <Icon
                                  name="warning"
                                  size="1.5em"
                                  color="var(--sl-color-orange-high)"
                                />
                                <span>{t("page.draft")}</span>
                              </p>
                            )}
                          </div>
                        </div>
                        <div class="content-panel">
                          <div class="sl-container">
                            <div class="sl-markdown-content">{children}</div>
                            <Footer
                              page={page}
                              prev={prev}
                              next={next}
                              dir={dir as "ltr" | "rtl"}
                              t={t}
                              themeConfig={tc}
                            />
                          </div>
                        </div>
                      </Fragment>
                    )}
                </main>
              </div>
            </div>
          </div>
        </div>
        <script src={`${ASSETS}/starlight.js`} defer></script>
      </body>
    </html>
  );
}

import { Icons } from "./icons.ts";
function iconHtml(name: string): string {
  return (Icons as Record<string, string>)[name] ?? "";
}
