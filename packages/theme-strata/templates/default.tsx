/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { defaultThumbUrl, themeImage } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

function withBase(basePath: string, path: string): string {
  const joined = `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
  return joined.replace(/([^:]\/)\/+/g, "$1") || "/";
}

export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, t, site } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "strata";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const getStarted = tr("cta.get_started", "Get Started");
  const seeWork = tr("cta.see_work", "See my work");

  if (isHome) {
    const tiles = [
      { thumb: "thumbs/01.jpg", title: tr("nav.blog", "Projects"), href: blogHref, sub: tr("home.blog_sub", "Sample portfolio posts") },
      { thumb: "thumbs/02.jpg", title: tr("search.title", "Search"), href: searchHref, sub: tr("home.search_sub", "Query demo pages") },
      { thumb: "thumbs/03.jpg", title: tr("nav.archives", "Archives"), href: archivesHref, sub: tr("home.archives_sub", "Browse by year") },
      { thumb: "thumbs/04.jpg", title: tr("nav.about", "About"), href: aboutHref, sub: tr("home.about_sub", "Learn more") },
      { thumb: "thumbs/05.jpg", title: "Markdown", href: withBase(basePath, "/blog/markdown"), sub: tr("home.markdown_sub", "Formatting demo") },
      { thumb: "thumbs/06.jpg", title: "Welcome", href: withBase(basePath, "/blog/welcome"), sub: tr("home.welcome_sub", "Demo introduction") },
    ];

    return (
      <LayoutComponent {...props}>
        <section id="one">
          <header class="major">
            <h2>{String(fm.title ?? "Welcome")}</h2>
          </header>
          {children && <div data-dune-body>{children}</div>}
          {!children && subtitle && <p>{String(subtitle)}</p>}
          <ul class="actions">
            <li><a href={blogHref} class="button">{seeWork}</a></li>
          </ul>
        </section>

        <section id="two">
          <h2>{tr("home.recent_work", "Recent Work")}</h2>
          <div class="row">
            {tiles.map((tile) => (
              <article class="col-6 col-12-xsmall work-item" key={tile.href}>
                <a href={tile.href} class="image fit thumb">
                  <img src={img(tile.thumb)} alt="" />
                </a>
                <h3><a href={tile.href}>{tile.title}</a></h3>
                <p>{tile.sub}</p>
              </article>
            ))}
          </div>
          <ul class="actions">
            <li><a href={blogHref} class="button">{getStarted}</a></li>
          </ul>
        </section>
      </LayoutComponent>
    );
  }

  const pageCover = cover ?? defaultThumbUrl(themeName, 0);

  return (
    <LayoutComponent {...props}>
      <section>
        <header class="major">
          <h2>{String(fm.title ?? "")}</h2>
          {subtitle && <p>{String(subtitle)}</p>}
        </header>
        <a href={page.route} class="image fit thumb">
          <img src={pageCover} alt="" />
        </a>
        <div data-dune-body>{children}</div>
      </section>
    </LayoutComponent>
  );
}
