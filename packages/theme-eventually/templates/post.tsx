/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatEventuallyDate } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";

  return (
    <LayoutComponent {...props} landing={false}>
      <h2>{page.frontmatter.title}</h2>
      {date && (
        <div class="post-meta">
          <time datetime={date}>{formatEventuallyDate(date)}</time>
        </div>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
