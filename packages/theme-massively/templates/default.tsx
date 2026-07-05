/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;

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
