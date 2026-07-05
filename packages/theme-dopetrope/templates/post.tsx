/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatDopetropeDate, postExcerpt } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = typeof fm.subtitle === "string" ? fm.subtitle : postExcerpt(fm);

  return (
    <LayoutComponent {...props}>
      <article class="box post">
        {cover && (
          <span class="image featured">
            <img src={cover} alt="" />
          </span>
        )}
        <header>
          <h2>{page.frontmatter.title}</h2>
          {date && <p><time datetime={date}>{formatDopetropeDate(date)}</time></p>}
          {subtitle && !date && <p>{subtitle}</p>}
        </header>
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
