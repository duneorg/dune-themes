/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const subtitle = meta.description ?? fm.description;

  return (
    <LayoutComponent {...props} hideIntro>
      <section class="post">
        <header class="major">
          <h1>{page.frontmatter.title}</h1>
          {subtitle && <p>{String(subtitle)}</p>}
        </header>
        <div data-dune-body>{children}</div>
      </section>
    </LayoutComponent>
  );
}
