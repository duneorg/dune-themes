/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatParadigmShiftDate, postExcerpt } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = postExcerpt(fm);

  return (
    <LayoutComponent {...props} landing={false}>
      {date && <p><time datetime={date}>{formatParadigmShiftDate(date)}</time></p>}
      {!date && subtitle && <p>{subtitle}</p>}
      {cover && <span class="image main"><img src={cover} alt="" /></span>}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
