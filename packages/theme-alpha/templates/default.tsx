/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

function stripSlash(p: string) {
  return p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p;
}

export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = safeHref(fm.cover);
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const route = stripSlash(pathname ?? page?.route ?? "/");
  const isHome = route === "/" || route === "/home";

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        {page.frontmatter.title && (
          <section class="box special">
            <header class="major">
              <h2>{page.frontmatter.title}</h2>
              {subtitle && <p>{String(subtitle)}</p>}
            </header>
            {children && <div data-dune-body>{children}</div>}
          </section>
        )}
        {!page.frontmatter.title && children && (
          <div data-dune-body>{children}</div>
        )}
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <header>
        <h2>{page.frontmatter.title}</h2>
        {subtitle && <p>{String(subtitle)}</p>}
      </header>
      <div class="box">
        {cover && (
          <span class="image featured">
            <img src={cover} alt="" />
          </span>
        )}
        <div data-dune-body>{children}</div>
      </div>
    </LayoutComponent>
  );
}
