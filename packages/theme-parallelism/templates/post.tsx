/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatParallelismDate } from "../utils/content.ts";

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
    <LayoutComponent {...props}>
      <div class="items">
        <div class="item intro span-2">
          <h1>{page.frontmatter.title}</h1>
          {date && (
            <p><time datetime={date}>{formatParallelismDate(date)}</time></p>
          )}
        </div>
        {cover && (
          <article class="item thumb span-3">
            <h2>{page.frontmatter.title}</h2>
            <span class="image">
              <img src={cover} alt="" />
            </span>
          </article>
        )}
        <article class="item prose span-3">
          <div data-dune-body>{children}</div>
        </article>
      </div>
    </LayoutComponent>
  );
}
