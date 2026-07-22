/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(
  props: TemplateProps & { children?: ComponentChildren; Layout?: typeof StaticLayout },
) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  return (
    <LayoutComponent {...props}>
      <div class="gale-page-hero"><h1>{page.frontmatter.title}</h1></div>
      <article class="gale-page-content prose">
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
