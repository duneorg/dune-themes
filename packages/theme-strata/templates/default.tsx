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
        <section id="one">
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
      <section>
        <header class="major">
          <h2>{page.frontmatter.title}</h2>
        </header>
        {cover && (
          <a href={page.route} class="image fit thumb">
            <img src={cover} alt="" />
          </a>
        )}
        <div data-dune-body>{children}</div>
      </section>
    </LayoutComponent>
  );
}
