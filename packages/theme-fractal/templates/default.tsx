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
  const isHome = (pathname ?? page?.route ?? "/") === "/";

  if (isHome) {
    return (
      <LayoutComponent {...props}>
        <section id="one" class="wrapper style2 special">
          {page.frontmatter.title && (
            <header class="major">
              <h2>{page.frontmatter.title}</h2>
            </header>
          )}
          {children && <div data-dune-body>{children}</div>}
        </section>
      </LayoutComponent>
    );
  }

  return (
    <LayoutComponent {...props}>
      <section class="wrapper">
        <div class="inner">
          <header class="major">
            <h2>{page.frontmatter.title}</h2>
          </header>
          {cover && (
            <span class="image fit">
              <img src={cover} alt="" />
            </span>
          )}
          <div data-dune-body>{children}</div>
        </div>
      </section>
    </LayoutComponent>
  );
}
