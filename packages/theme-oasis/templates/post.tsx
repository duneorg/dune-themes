/** @jsxImportSource preact */
import { h } from "preact";
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function PostTemplate(props: any) {
  const { page, children, Layout } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const fm = page.frontmatter;
  const date = fm.date ? new Date(fm.date).getTime() : undefined;
  const tags: string[] = fm.taxonomy?.tag ?? fm.taxonomy?.tags ?? [];

  return (
    <LayoutComponent {...props}>
      <article class="bx-article">
        <header class="bx-post-header">
          <h1>{fm.title}</h1>
          <div class="bx-post-meta">
            {fm.author && <span>{fm.author}</span>}
            {date && (
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            )}
          </div>
        </header>
        {children}
        {tags.length > 0 && (
          <div class="bx-tags">
            {tags.map((t) => <a key={t} href={`/tag:${encodeURIComponent(t)}`}>{t}</a>)}
          </div>
        )}
      </article>
    </LayoutComponent>
  );
}
