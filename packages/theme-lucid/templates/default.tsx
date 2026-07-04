/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout; themeConfig?: Record<string, unknown> }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig } = props;
  const editUrl = (themeConfig?.edit_url as string) ?? "";
  return (
    <LayoutComponent {...props}>
      <article class="lucid-content prose">
        <h1>{page.frontmatter.title}</h1>
        <div data-dune-body>{children}</div>
        {editUrl && (
          <p class="lucid-edit">
            <a href={`${editUrl.replace(/\/$/, "")}${page.route}.md`} target="_blank" rel="noopener">Edit this page</a>
          </p>
        )}
      </article>
    </LayoutComponent>
  );
}
