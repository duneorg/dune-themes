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
      <article class="box post">
        <header>
          <h2>{page.frontmatter.title}</h2>
        </header>
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
