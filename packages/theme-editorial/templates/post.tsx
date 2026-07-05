/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatEditorialDate, postExcerpt } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = postExcerpt(fm) ?? (typeof fm.subtitle === "string" ? fm.subtitle : undefined);

  return (
    <LayoutComponent {...props}>
      <section>
        <header class="main">
          <h1>{page.frontmatter.title}</h1>
          {date && <p><time datetime={date}>{formatEditorialDate(date)}</time></p>}
          {subtitle && !date && <p>{subtitle}</p>}
        </header>
        {cover && (
          <span class="image main">
            <img src={cover} alt="" />
          </span>
        )}
        <div data-dune-body>{children}</div>
      </section>
    </LayoutComponent>
  );
}
