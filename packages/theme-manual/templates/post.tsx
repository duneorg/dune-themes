/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: any;
  Layout?: typeof StaticLayout;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const tags = Array.isArray(fm.tags) ? fm.tags as string[] : [];
  const cover = safeHref(fm.cover);

  return (
    <LayoutComponent {...props}>
      <article class="manual-content prose">
        {cover && <img class="post-cover" src={cover} alt="" />}
        <h1>{page.frontmatter.title}</h1>
        <div class="post-meta">
          {date && <time>{date}</time>}
          {tags.length > 0 && (
            <div class="post-tags">
              {tags.map((t) => <span class="tag" key={t}>{t}</span>)}
            </div>
          )}
        </div>
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
