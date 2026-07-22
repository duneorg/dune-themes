/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function PostTemplate(props: any) {
  const { page, children, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const fm = page.frontmatter;
  const date = fm.date ? new Date(fm.date).getTime() : undefined;
  const tags: string[] = fm.taxonomy?.tag ?? fm.taxonomy?.tags ?? [];
  const basePath = props.site?.basePath ?? "";

  return (
    <LayoutComponent {...props}>
      <article class="bx-article">
        <header class="bx-post-header">
          <h1>{fm.title}</h1>
          <div class="bx-post-meta">
            {fm.author && <span>{fm.author}</span>}
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
        </header>
        {children}
        {tags.length > 0 && (
          <div class="bx-tags">
            {tags.map((tag) => (
              <a
                key={tag}
                href={`${basePath}/tags/${encodeURIComponent(tag)}/`.replace(/([^:]\/)\/+/g, "$1")}
              >
                {tag}
              </a>
            ))}
          </div>
        )}
      </article>
    </LayoutComponent>
  );
}
