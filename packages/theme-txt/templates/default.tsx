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
  site?: { title?: string; description?: string; basePath?: string };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config, site, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = safeHref(fm.cover);
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "txt";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");
  const searchHref = withBase(basePath, "/search");
  const archivesHref = withBase(basePath, "/archives");
  const aboutHref = withBase(basePath, "/about");

  if (isHome) {
    const features = [
      { img: "pic01.jpg", title: tr("nav.blog", "Blog"), href: blogHref, sub: tr("home.blog_sub", "Read sample posts") },
      { img: "pic02.jpg", title: tr("search.title", "Search"), href: searchHref, sub: tr("home.search_sub", "Query demo pages") },
      { img: "pic03.jpg", title: tr("nav.archives", "Archives"), href: archivesHref, sub: tr("home.archives_sub", "Browse by year") },
      { img: "pic04.jpg", title: tr("nav.about", "About"), href: aboutHref, sub: tr("home.about_sub", "Learn more") },
    ];
    return (
      <LayoutComponent {...props}>
        <div class="row gtr-200">
          <div class="col-12">
            <section class="box highlight">
              {page.frontmatter.title && (
                <header>
                  <h2>{page.frontmatter.title}</h2>
                  {subtitle && <p>{String(subtitle)}</p>}
                </header>
              )}
              {children && <div data-dune-body>{children}</div>}
              <ul class="actions">
                <li>
                  <a href={blogHref} class="button large">
                    {tr("cta.get_started", "Get Started")}
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div class="row gtr-200">
          <div class="col-12">
            <section class="box features">
              <h2 class="major"><span>{tr("home.explore", "Explore")}</span></h2>
              <div>
                <div class="row">
                  {features.map((f) => (
                    <div class="col-3 col-6-medium col-12-small" key={f.href}>
                      <section class="box feature">
                        <a href={f.href} class="image featured">
                          <img src={img(f.img)} alt="" />
                        </a>
                        <h3><a href={f.href}>{f.title}</a></h3>
                        <p>{f.sub}</p>
                      </section>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <div class="row">
        <div class="col-12">
          <div class="content">
            <article class="box page-content">
              <header>
                <h2>{page.frontmatter.title}</h2>
                {subtitle && <p>{String(subtitle)}</p>}
              </header>
              {cover && (
                <span class="image featured">
                  <img src={cover} alt="" />
                </span>
              )}
              <section>
                <div data-dune-body>{children}</div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
