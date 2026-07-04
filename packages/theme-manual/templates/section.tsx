/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function SectionTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const meta = (page.frontmatter.metadata ?? {}) as Record<string, unknown>;
  return (
    <LayoutComponent {...props}>
      <article class="manual-content prose">
        <h1>{page.frontmatter.title}</h1>
        {meta.description && <p class="manual-lead">{String(meta.description)}</p>}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
