/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatDirectiveDate, postExcerpt } from "../utils/content.ts";

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
      <div class="box container">
        <header class="major">
          <h2>{page.frontmatter.title}</h2>
          {date && <p><time datetime={date}>{formatDirectiveDate(date)}</time></p>}
          {!date && subtitle && <p>{subtitle}</p>}
        </header>
        {cover && (
          <span class="image fit">
            <img src={cover} alt="" />
          </span>
        )}
        <div data-dune-body>{children}</div>
      </div>
    </LayoutComponent>
  );
}
