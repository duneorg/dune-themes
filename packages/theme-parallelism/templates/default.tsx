/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { delayClass, GALLERY_ITEMS, spanClass, themeImage } from "../utils/content.ts";

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
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "parallelism";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        <div class="items">
          <div class="item intro span-2">
            <h1>{page.frontmatter.title ?? site?.title ?? "Parallelism"}</h1>
            {site?.description && <p>{site.description}</p>}
            {children && <div data-dune-body>{children}</div>}
            <p>
              <a href={withBase(basePath, "/blog")}>
                {tr("cta.see_work", "See my work")}
              </a>
            </p>
          </div>

          {GALLERY_ITEMS.map((item, index) => (
            <article
              class={`item thumb ${spanClass(index)} ${delayClass(index)}`}
              key={item.thumb}
            >
              <h2>{item.title}</h2>
              <a href={withBase(basePath, item.href)} class="image">
                <img src={img(item.thumb)} alt="" />
              </a>
            </article>
          ))}
        </div>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <div class="items">
        <div class="item intro span-2">
          <h1>{page.frontmatter.title}</h1>
        </div>
        <article class="item prose span-3">
          <div data-dune-body>{children}</div>
        </article>
      </div>
    </LayoutComponent>
  );
}
