/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatMultiverseDate, postExcerpt } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = safeHref(fm.cover);
  const subtitle = postExcerpt(fm);

  return (
    <LayoutComponent {...props} landing={false}>
      <h2>{page.frontmatter.title}</h2>
      {date && <p><time datetime={date}>{formatMultiverseDate(date)}</time></p>}
      {!date && subtitle && <p>{subtitle}</p>}
      {cover && <a href={cover} class="image"><img src={cover} alt="" /></a>}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
