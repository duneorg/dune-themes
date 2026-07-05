/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { themeImage } from "../utils/content.ts";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  config?: { theme?: { name?: string } };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname, config } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const themeName = config?.theme?.name ?? "forty";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    const tiles = [
      { img: "pic01.jpg", title: "Blog", href: "/blog", sub: "Read sample posts" },
      { img: "pic02.jpg", title: "Search", href: "/search", sub: "Query demo pages" },
      { img: "pic03.jpg", title: "Archives", href: "/archives", sub: "Browse by year" },
      { img: "pic04.jpg", title: "About", href: "/about", sub: "Learn more" },
      { img: "pic05.jpg", title: "Markdown", href: "/blog/markdown", sub: "Formatting demo" },
      { img: "pic06.jpg", title: "Code", href: "/blog/code-samples", sub: "Syntax highlighting" },
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
              <h2>{page.frontmatter.title ?? "Welcome"}</h2>
            </header>
            {children && <div data-dune-body>{children}</div>}
            {!children && subtitle && <p>{String(subtitle)}</p>}
            <ul class="actions">
              <li><a href="/blog" class="button next">Get Started</a></li>
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
            <h1>{page.frontmatter.title}</h1>
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
