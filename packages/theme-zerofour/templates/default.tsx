/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  pathname?: string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, pathname } = props;
  const isHome = (() => { const r = pathname ?? page?.route ?? "/"; const n = r !== "/" && r.endsWith("/") ? r.slice(0, -1) : r; return n === "/" || n === "/home"; })();

  if (isHome) {
    return <LayoutComponent {...props} landing />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <article>
        <header class="major">
          <h2>{page.frontmatter.title}</h2>
        </header>
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
