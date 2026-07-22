/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import { formatDate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default function PostTemplate(
  props: TemplateProps & {
    children?: ComponentChildren;
    Layout?: typeof StaticLayout;
  },
) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const cover = safeHref(fm.cover);
  const tags: string[] = (fm.taxonomy as Record<string, string[]>)?.tag ??
    (fm.taxonomy as Record<string, string[]>)?.tags ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);

  return (
    <LayoutComponent {...props}>
      <div class="gale-page-hero">
        <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
        {date && (
          <time datetime={new Date(date).toISOString()}>
            {formatDate(date, page.language ?? "en", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        )}
      </div>
      <article class="gale-page-content prose">
        {cover && <img class="post-cover" src={cover} alt="" />}
        <div data-dune-body>{children}</div>
        {tags.length > 0 && (
          <footer class="gale-post-tags">
            <ul>
              {tags.map((tag) => (
                <li key={tag}>
                  <a href={`/tags/${encodeURIComponent(tag)}/`}>{tag}</a>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </article>
    </LayoutComponent>
  );
}
