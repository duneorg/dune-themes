/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatStellarDate } from "../utils/content.ts";

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
      <div id="main">
        <section id="content" class="main">
          <h2>{page.frontmatter.title}</h2>
          {date && <p><time datetime={date}>{formatStellarDate(date)}</time></p>}
          <div data-dune-body>{children}</div>
        </section>
      </div>
    </LayoutComponent>
  );
}
