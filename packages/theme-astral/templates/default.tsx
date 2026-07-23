/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";
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
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, site, config, themeConfig, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "astral";
  const basePath = site?.basePath ?? "";
  const avatarUrl = safeHref(themeConfig?.avatar) ||
    themeImage(themeName, "me.jpg");
  const homeSubtitle = (themeConfig?.home_subtitle as string) || site?.description ||
    String(subtitle ?? "");
  const blogHref = withBase(basePath, "/blog");
  const aboutHref = withBase(basePath, "/about");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const seeWork = tr("cta.see_work", "See my work");
  const learnMore = tr("post.read_more", "Learn More");

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        <article id="home" class="panel intro">
          <header>
            <h1>{String(fm.title ?? site?.title ?? "Astral")}</h1>
            {homeSubtitle && <p>{homeSubtitle}</p>}
          </header>
          <a href={blogHref} class="jumplink pic">
            <span class="arrow icon solid fa-chevron-right">
              <span>{seeWork}</span>
            </span>
            <img src={avatarUrl} alt="" />
          </a>
          {children && <div data-dune-body>{children}</div>}
        </article>

        <article class="panel">
          <header>
            <h2>{tr("home.explore", "Explore")}</h2>
          </header>
          <section>
            <div class="row">
              <div class="col-4 col-6-medium col-12-small">
                <a href={blogHref} class="image fit">
                  <img src={themeImage(themeName, "pic01.jpg")} alt="" />
                </a>
                <h3><a href={blogHref}>{tr("nav.blog", "Projects")}</a></h3>
                <p>{tr("home.blog_sub", "Sample portfolio posts.")}</p>
                <ul class="actions">
                  <li><a href={blogHref} class="button">{learnMore}</a></li>
                </ul>
              </div>
              <div class="col-4 col-6-medium col-12-small">
                <a href={searchHref} class="image fit">
                  <img src={themeImage(themeName, "pic02.jpg")} alt="" />
                </a>
                <h3><a href={searchHref}>{tr("search.title", "Search")}</a></h3>
                <p>{tr("home.search_sub", "Query demo pages.")}</p>
                <ul class="actions">
                  <li><a href={searchHref} class="button">{learnMore}</a></li>
                </ul>
              </div>
              <div class="col-4 col-6-medium col-12-small">
                <a href={archivesHref} class="image fit">
                  <img src={themeImage(themeName, "pic03.jpg")} alt="" />
                </a>
                <h3><a href={archivesHref}>{tr("nav.archives", "Archives")}</a></h3>
                <p>{tr("home.archives_sub", "Browse by year.")}</p>
                <ul class="actions">
                  <li><a href={archivesHref} class="button">{learnMore}</a></li>
                </ul>
              </div>
            </div>
            <ul class="actions">
              <li>
                <a href={aboutHref} class="button">
                  {tr("nav.about", "About")}
                </a>
              </li>
            </ul>
          </section>
        </article>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <article class="panel">
        <header>
          <h2>{String(fm.title ?? "")}</h2>
          {subtitle && <p>{String(subtitle)}</p>}
        </header>
        {cover && (
          <a href={page.route} class="image fit">
            <img src={cover} alt="" />
          </a>
        )}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
