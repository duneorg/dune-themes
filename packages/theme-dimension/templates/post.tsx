/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatDimensionDate } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = (fm.metadata as Record<string, unknown> | undefined)?.description ??
    fm.description;

  return (
    <LayoutComponent {...props}>
      <h2 class="major">{page.frontmatter.title}</h2>
      {date && <p><time datetime={date}>{formatDimensionDate(date)}</time></p>}
      {subtitle && <p>{String(subtitle)}</p>}
      {cover && (
        <span class="image main">
          <img src={cover} alt="" />
        </span>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
