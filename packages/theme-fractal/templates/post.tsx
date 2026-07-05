/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function PostTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";

  return (
    <LayoutComponent {...props}>
      <article class="prose">
        <h1>{page.frontmatter.title}</h1>
        {date && <div class="post-meta"><time>{date}</time></div>}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
