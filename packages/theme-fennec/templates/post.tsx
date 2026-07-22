/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default function PostTemplate(props: any) {
  const { page, children, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const fm = page.frontmatter;
  const date = fm.date ? new Date(fm.date).getTime() : undefined;
  const tags: string[] = fm.taxonomy?.tag ?? fm.taxonomy?.tags ?? [];
  const cover = safeHref(fm.cover);

  return (
    <LayoutComponent {...props}>
      <article class="af-prose">
        <header class="af-post-header">
          {cover && <img class="af-post-cover" src={cover} alt="" />}
          <h1>{fm.title}</h1>
          <div class="af-post-meta">
            {date && (
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            {tags.map((tag) => (
              <a class="af-badge" key={tag} href={`/tags/${encodeURIComponent(tag)}/`}>
                {tag}
              </a>
            ))}
          </div>
          <hr />
        </header>
        {children}
      </article>
    </LayoutComponent>
  );
}
