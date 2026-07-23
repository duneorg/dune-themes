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
  const themeName = config?.theme?.name ?? "big-picture";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const aboutHref = withBase(basePath, "/about");

  if (isHome) {
    return (
      <LayoutComponent {...props} landing>
        <section id="one" class="main style2 right dark fullscreen">
          <div class="content box style2">
            <header>
              <h2>{page.frontmatter.title ?? tr("home.what_i_do", "What I Do")}</h2>
            </header>
            {children && <div data-dune-body>{children}</div>}
            {!children && subtitle && <p>{String(subtitle)}</p>}
          </div>
          <a href="#two" class="button style2 down anchored">{tr("cta.next", "Next")}</a>
        </section>

        <section id="two" class="main style2 left dark fullscreen">
          <div class="content box style2">
            <header>
              <h2>{tr("home.built_for", "Built for Dune")}</h2>
            </header>
            <p>
              Blog posts, search, archives, and inner pages with the Big Picture scroll-driven shell.
              Explore the <a href={blogHref}>{tr("nav.blog", "blog")}</a>,{" "}
              <a href={searchHref}>{tr("search.title", "search")}</a>, or{" "}
              <a href={archivesHref}>{tr("nav.archives", "archives")}</a>.
            </p>
          </div>
          <a href="#work" class="button style2 down anchored">{tr("cta.next", "Next")}</a>
        </section>

        <section id="work" class="main style3 primary">
          <div class="content">
            <header>
              <h2>{tr("home.gallery", "Gallery")}</h2>
              <p>{tr("home.gallery_sub", "Sample imagery from the upstream Big Picture template.")}</p>
            </header>
            <div class="gallery">
              {[1, 2, 3, 4, 5, 6].map((n, i) => (
                <article class={i % 2 === 0 ? "from-left" : "from-right"} key={n}>
                  <span class="image fit">
                    <img src={img(`thumbs/0${n}.jpg`)} alt="" />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" class="main style3 secondary">
          <div class="content">
            <header>
              <h2>{tr("home.explore", "Explore")}</h2>
              <p>
                {tr(
                  "home.explore_sub",
                  "Start with the blog or browse the about page for more on this demo site.",
                )}
              </p>
            </header>
            <ul class="actions special">
              <li>
                <a href={blogHref} class="button">{tr("cta.read_blog", "Read the Blog")}</a>
              </li>
              <li>
                <a href={aboutHref} class="button">{tr("nav.about", "About")}</a>
              </li>
            </ul>
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <header>
        <h2>{page.frontmatter.title}</h2>
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
