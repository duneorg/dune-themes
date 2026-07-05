/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatSolidStateDate } from "../utils/content.ts";

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
      <section id="wrapper">
        <header>
          <div class="inner">
            <h2>{page.frontmatter.title}</h2>
            {date && <p><time datetime={date}>{formatSolidStateDate(date)}</time></p>}
          </div>
        </header>
        <div class="wrapper">
          <div class="inner">
            <div data-dune-body>{children}</div>
          </div>
        </div>
      </section>
    </LayoutComponent>
  );
}
