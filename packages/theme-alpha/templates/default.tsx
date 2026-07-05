/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;
  const isHome = (pathname ?? page?.route ?? "/") === "/";

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
