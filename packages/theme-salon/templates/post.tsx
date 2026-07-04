/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function PostTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const tags: string[] = (fm.taxonomy as Record<string, string[]>)?.tag ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const primaryTag = tags[0];

  return (
    <LayoutComponent {...props}>
      <header class="salon-post-header">
        {primaryTag && <a class="tag" href={`/tag:${encodeURIComponent(primaryTag)}`}>{primaryTag}</a>}
        <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
        <div class="salon-post-meta">
          {date && (
            <time datetime={new Date(date).toISOString()}>
              {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
            </time>
          )}
          {fm.author && <span>&nbsp;·&nbsp;{String(fm.author)}</span>}
        </div>
        {tags.length > 1 && (
          <div class="salon-post-tags">
            {tags.slice(1).map((t) => (
              <a class="tag" key={t} href={`/tag:${encodeURIComponent(t)}`} style="background:color-mix(in srgb, var(--accent) 15%, transparent);color:var(--accent)">{t}</a>
            ))}
          </div>
        )}
      </header>
      {cover && (
        <div class="salon-post-cover"><img src={cover} alt="" /></div>
      )}
      <article class="salon-post-content prose">
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
