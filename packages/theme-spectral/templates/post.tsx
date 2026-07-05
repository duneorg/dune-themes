/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatSpectralDate } from "../utils/content.ts";

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
      <article id="main">
        <header>
          <h2>{page.frontmatter.title}</h2>
          {date && <p><time datetime={date}>{formatSpectralDate(date)}</time></p>}
        </header>
        <section class="wrapper style5">
          <div class="inner">
            <div data-dune-body>{children}</div>
          </div>
        </section>
      </article>
    </LayoutComponent>
  );
}
