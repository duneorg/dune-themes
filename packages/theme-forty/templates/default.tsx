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
  const fm = (page?.frontmatter ?? {}) as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = safeHref(fm.cover);
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "forty";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);
  const blogHref = withBase(basePath, "/blog");

  if (isHome) {
    const tiles = [
      { img: "pic01.jpg", title: "Blog", href: withBase(basePath, "/blog"), sub: "Read sample posts" },
      { img: "pic02.jpg", title: "Search", href: withBase(basePath, "/search"), sub: "Query demo pages" },
      {
        img: "pic03.jpg",
        title: "Archives",
        href: withBase(basePath, "/archives"),
        sub: "Browse by year",
      },
      { img: "pic04.jpg", title: "About", href: withBase(basePath, "/about"), sub: "Learn more" },
      {
        img: "pic05.jpg",
        title: "Markdown",
        href: withBase(basePath, "/blog/markdown"),
        sub: "Formatting demo",
      },
      {
        img: "pic06.jpg",
        title: "Welcome",
        href: withBase(basePath, "/blog/welcome"),
        sub: "Demo introduction",
      },
    ];
    return (
      <LayoutComponent {...props} landing>
        <section id="one" class="tiles">
          {tiles.map((tile) => (
            <article key={tile.href}>
              <span class="image">
                <img src={img(tile.img)} alt="" />
              </span>
              <header class="major">
                <h3><a href={tile.href} class="link">{tile.title}</a></h3>
                <p>{tile.sub}</p>
              </header>
            </article>
          ))}
        </section>

        <section id="two">
          <div class="inner">
            <header class="major">
              <h2>{String(fm.title ?? "Welcome")}</h2>
            </header>
            {children && <div data-dune-body>{children}</div>}
            {!children && subtitle && <p>{String(subtitle)}</p>}
            <ul class="actions">
              <li>
                <a href={blogHref} class="button next">
                  {tr("cta.get_started", "Get Started")}
                </a>
              </li>
            </ul>
          </div>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <section id="one">
        <div class="inner">
          <header class="major">
            <h1>{String(fm.title ?? "")}</h1>
            {subtitle && <p>{String(subtitle)}</p>}
          </header>
          {cover && (
            <span class="image main">
              <img src={cover} alt="" />
            </span>
          )}
          <div data-dune-body>{children}</div>
        </div>
      </section>
    </LayoutComponent>
  );
}
