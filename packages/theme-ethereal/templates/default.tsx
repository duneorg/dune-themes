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
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, t, site } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "ethereal";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const aboutHref = withBase(basePath, "/about");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section class="panel spotlight medium right" id="first">
          <div class="content span-7">
            <h2 class="major">{page.frontmatter.title ?? tr("home.welcome", "Welcome")}</h2>
            {children && <div data-dune-body>{children}</div>}
            {!children && subtitle && <p>{String(subtitle)}</p>}
          </div>
          <div class="image filtered tinted" data-position="top left">
            <img src={img("pic02.jpg")} alt="" />
          </div>
        </section>

        <section class="panel color1">
          <div class="intro joined">
            <h2 class="major">{tr("home.built_for", "Built for Dune")}</h2>
            <p>
              {tr(
                "home.built_for_sub",
                "Blog posts, search, archives, and inner pages with the Ethereal panel layout.",
              )}
            </p>
          </div>
          <div class="inner">
            <ul class="grid-icons three connected">
              <li>
                <a href={blogHref} class="icon fa-comment">
                  <span class="label">{tr("nav.blog", "Blog")}</span>
                </a>
              </li>
              <li>
                <a href={searchHref} class="icon solid fa-search">
                  <span class="label">{tr("search.title", "Search")}</span>
                </a>
              </li>
              <li>
                <a href={archivesHref} class="icon solid fa-archive">
                  <span class="label">{tr("nav.archives", "Archives")}</span>
                </a>
              </li>
              <li>
                <a href={aboutHref} class="icon solid fa-user">
                  <span class="label">{tr("nav.about", "About")}</span>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <section class="panel spotlight large left">
          <div class="content span-5">
            <h2 class="major">{tr("home.explore", "Explore the demo")}</h2>
            <p>
              Sample posts with markdown, code blocks, and taxonomy tags from the shared demo
              content. Start with the <a href={blogHref}>{tr("nav.blog", "blog")}</a>.
            </p>
          </div>
          <div class="image filtered tinted" data-position="top right">
            <img src={img("pic03.jpg")} alt="" />
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <header>
        <h2 class="major">{page.frontmatter.title}</h2>
        {subtitle && <p>{String(subtitle)}</p>}
      </header>
      {cover && (
        <span class="image fit">
          <img src={cover} alt="" />
        </span>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
