/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatPhantomDate } from "../utils/content.ts";
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

  return (
    <LayoutComponent {...props}>
      <h1>{page.frontmatter.title}</h1>
      {date && <p><time datetime={date}>{formatPhantomDate(date)}</time></p>}
      {cover && (
        <span class="image main">
          <img src={cover} alt="" />
        </span>
      )}
      <div data-dune-body>{children}</div>
    </LayoutComponent>
  );
}
