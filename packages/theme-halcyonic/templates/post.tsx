/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatHalcyonicDate } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;

  return (
    <LayoutComponent {...props} landing={false}>
      <section>
        <header>
          <h2>{page.frontmatter.title}</h2>
          {date && <p><time datetime={date}>{formatHalcyonicDate(date)}</time></p>}
        </header>
        {cover && (
          <a href={page.route} class="feature-image">
            <img src={cover} alt="" />
          </a>
        )}
        <div data-dune-body>{children}</div>
      </section>
    </LayoutComponent>
  );
}
