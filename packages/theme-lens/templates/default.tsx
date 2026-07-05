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

  if (isHome && !children) {
    return <LayoutComponent {...props} />;
  }

  return (
    <LayoutComponent {...props}>
      <section class="content-panel">
        {!isHome && page.frontmatter.title && <h2>{page.frontmatter.title}</h2>}
        {isHome && page.frontmatter.title && <h2>{page.frontmatter.title}</h2>}
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
