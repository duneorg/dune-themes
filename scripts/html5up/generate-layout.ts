/**
 * Generate layout.tsx per HTML5 UP layout family.
 */

import type { ThemeDef } from "../theme-defs.ts";
import type { Html5UpLayoutFamily } from "./layout-families.ts";
import { PRELOAD_SCRIPT, html5UpCreditList } from "./style-css.ts";

function layoutHeader(def: ThemeDef, extraHead = ""): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import { getSearchUrl } from "@dune/core/theme-helpers";

interface LayoutProps extends TemplateProps {
  children?: unknown;
  themeConfig?: Record<string, unknown>;
  recentPosts?: Array<{ route: string; title: string }>;
}

export default function Layout({
  page, pageTitle, site, config, nav, pathname, dir, children, themeConfig, recentPosts,
}: LayoutProps) {
  const themeName = config?.theme?.name ?? "${def.slug}";
  const siteUrl = (site?.url ?? "").replace(/\\/$/, "");
  const currentPath = pathname ?? page?.route ?? "/";
  const canonicalUrl = siteUrl ? \`\${siteUrl}\${currentPath}\` : currentPath;
  const title = pageTitle || site?.title || "${def.name}";
  const description = (page?.frontmatter as Record<string, unknown>)?.metadata?.description ??
    (page?.frontmatter as Record<string, unknown>)?.description ?? site?.description ?? "";
  const showCredit = themeConfig?.show_html5up_credit !== false;
  const searchAction = getSearchUrl("").split("?")[0];
  const navItems = (nav ?? []).slice(0, 12);
  const isActive = (route: string) =>
    currentPath === route || (route !== "/" && currentPath.startsWith(route + "/"));
  ${extraHead}

  return (
    <html lang={page?.language ?? "en"} dir={dir ?? "ltr"} class="is-preload">
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
        <link rel="stylesheet" href={\`/themes/\${themeName}/static/style.css\`} />
      </head>`;
}

function layoutFooter(extraScript = ""): string {
  return `      <script dangerouslySetInnerHTML={{ __html: \`${PRELOAD_SCRIPT}${extraScript}\` }} />
      </body>
    </html>
  );
`;
}

function navLinksList(className = ""): string {
  return `{navItems.map((item) => (
              <li key={item.route} class={isActive(item.route) ? "current" : ""}>
                <a href={item.route}>{item.navTitle ?? item.frontmatter?.title ?? item.route}</a>
              </li>
            ))}`;
}

export function generateLayout(def: ThemeDef, family: Html5UpLayoutFamily): string {
  const credit = html5UpCreditList(def.slug, def.name, "showCredit");

  switch (family) {
    case "page-wrapper":
      return layoutHeader(def) + `
      <body class="landing is-preload">
        <div id="page-wrapper">
          <header id="header">
            <h1><a href="/">{site?.title ?? "${def.name}"}</a></h1>
            <nav id="nav">
              <ul>
                ${navLinksList()}
              </ul>
            </nav>
          </header>
          <section id="main" class="wrapper">
            <div class="inner">{children}</div>
          </section>
          <footer id="footer">
            ${credit.replace('id="copyright"', 'id="copyright" class="copyright"')}
          </footer>
        </div>
      ` + layoutFooter();

    case "wrapper-editorial":
      return layoutHeader(def) + `
      <body class="is-preload">
        <div id="wrapper">
          <div id="main">
            <div class="inner">
              <header id="header">
                <a href="/" class="logo"><strong>{site?.title ?? "${def.name}"}</strong></a>
              </header>
              {children}
            </div>
          </div>
          <div id="sidebar">
            <div class="inner">
              <nav id="menu">
                <header><h2>Menu</h2></header>
                <ul>
                  ${navLinksList()}
                </ul>
              </nav>
              <section class="box search">
                <form method="get" action={searchAction} role="search">
                  <input type="search" class="text" name="q" placeholder="Search" />
                </form>
              </section>
              ${credit}
            </div>
          </div>
        </div>
      ` + layoutFooter();

    case "wrapper-fi":
      return layoutHeader(def) + `
      <body class="is-preload">
        <div id="wrapper">
          <header id="header">
            <h1><a href="/">{site?.title ?? "${def.name}"}</a></h1>
            <nav class="links">
              <ul>${navLinksList()}</ul>
            </nav>
            <nav class="main">
              <ul>
                <li class="search">
                  <a class="fa-search" href={searchAction}>Search</a>
                </li>
              </ul>
            </nav>
          </header>
          <div id="main">{children}</div>
          ${credit}
        </div>
      ` + layoutFooter();

    case "wrapper-massively":
      return layoutHeader(def, `const isHome = currentPath === "/";`) + `
      <body class="is-preload">
        <div id="wrapper" class="fade-in">
          {isHome && (
            <div id="intro">
              <h1>{site?.title ?? "${def.name}"}</h1>
              <p>{site?.description ?? "Built with Dune CMS"}</p>
            </div>
          )}
          <header id="header">
            <a href="/" class="logo">{site?.title ?? "${def.name}"}</a>
          </header>
          <nav id="nav">
            <ul class="links">${navLinksList()}</ul>
          </nav>
          <div id="main">{children}</div>
          <footer id="footer">
            ${credit.replace("<ul", "<ul class=\"copyright\"")}
          </footer>
        </div>
      ` + layoutFooter();

    case "hyperspace":
      return layoutHeader(def) + `
      <body class="is-preload">
        <section id="sidebar">
          <div class="inner">
            <nav>
              <ul>${navLinksList()}</ul>
            </nav>
          </div>
        </section>
        <div id="wrapper">
          <section id="intro" class="wrapper style1 fullscreen fade-up">
            <div class="inner">
              <h1>{site?.title ?? "${def.name}"}</h1>
              <p>{site?.description ?? "Built with Dune CMS"}</p>
            </div>
          </section>
          <div class="inner">{children}</div>
          <footer id="footer" class="wrapper style1">
            <div class="inner">${credit}</div>
          </footer>
        </div>
      ` + layoutFooter();

    case "dimension":
      return layoutHeader(def) + `
      <body class="is-preload">
        <div id="wrapper">
          <header id="header">
            <div class="logo"><span class="icon fa-gem"></span></div>
            <div class="content">
              <div class="inner">
                <h1>{site?.title ?? "${def.name}"}</h1>
                <p>{site?.description ?? "Built with Dune CMS"}</p>
              </div>
            </div>
            <nav>
              <ul>${navLinksList()}</ul>
            </nav>
          </header>
          <div id="main">
            <article class="active">{children}</article>
          </div>
          <footer id="footer">${credit}</footer>
        </div>
      ` + layoutFooter();

    case "portfolio":
      return layoutHeader(def) + `
      <body class="is-preload">
        <div id="wrapper">
          <header id="header">
            <h1><a href="/">{site?.title ?? "${def.name}"}</a></h1>
            <nav>
              <ul>${navLinksList()}</ul>
            </nav>
          </header>
          <div id="main">{children}</div>
          ${credit}
        </div>
      ` + layoutFooter();

    case "aerial":
      return layoutHeader(def) + `
      <body class="is-preload">
        <div id="wrapper">
          <div id="main">
            <header id="header">
              <h1>{site?.title ?? "${def.name}"}</h1>
              <p>{site?.description ?? ""}</p>
            </header>
            <div class="inner">{children}</div>
            <footer id="footer">${credit}</footer>
          </div>
        </div>
      ` + layoutFooter();

    case "minimal":
      return layoutHeader(def) + `
      <body class="is-preload">
        <header id="header">
          <h1><a href="/">{site?.title ?? "${def.name}"}</a></h1>
        </header>
        <div id="main">{children}</div>
        <footer id="footer">${credit}</footer>
      ` + layoutFooter();

    case "wrapper-main":
    default:
      return layoutHeader(def) + `
      <body class="is-preload">
        <div id="wrapper">
          <header id="header">
            <h1><a href="/">{site?.title ?? "${def.name}"}</a></h1>
            <nav>
              <ul>${navLinksList()}</ul>
            </nav>
          </header>
          <div id="main">{children}</div>
          ${credit}
        </div>
      ` + layoutFooter();
  }
}
