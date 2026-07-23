/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { GALLERY_ITEMS, themeImage } from "../utils/content.ts";
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
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";
  const themeName = config?.theme?.name ?? "lens";
  const basePath = site?.basePath ?? "";
  const img = (file: string) => themeImage(themeName, file);

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        {page.frontmatter.title && (
          <h2 class="visually-hidden">{page.frontmatter.title}</h2>
        )}
        {children && <div class="content-panel" data-dune-body>{children}</div>}
        <section id="thumbnails">
          {GALLERY_ITEMS.map((item) => (
            <article key={item.thumb}>
              <a
                class="thumbnail"
                href={withBase(basePath, item.href)}
                data-position="center"
              >
                <img src={img(item.thumb)} alt="" />
              </a>
              <h2>
                <a href={withBase(basePath, item.href)}>{item.title}</a>
              </h2>
              <p>{item.text}</p>
            </article>
          ))}
        </section>
        <section class="content-panel">
          <ul class="actions">
            <li>
              <a href={withBase(basePath, "/blog")} class="button">
                {tr("cta.see_work", "See my work")}
              </a>
            </li>
          </ul>
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <section class="content-panel">
        {page.frontmatter.title && <h2>{page.frontmatter.title}</h2>}
        {cover && (
          <a href={page.route} class="thumbnail">
            <img src={cover} alt="" />
          </a>
        )}
        {children && <div data-dune-body>{children}</div>}
      </section>
    </LayoutComponent>
  );
}
