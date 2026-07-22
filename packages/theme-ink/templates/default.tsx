/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(
  props: TemplateProps & { children?: any; Layout?: typeof StaticLayout },
) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  return (
    <LayoutComponent {...props}>
      <article class="prose">
        <h1>{page.frontmatter.title}</h1>
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
