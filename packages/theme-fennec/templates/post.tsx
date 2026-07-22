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
      <article class="af-prose">
        <header class="af-post-header">
          <h1>{fm.title}</h1>
          <div class="af-post-meta">
            {date && (
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            )}
            {tags.map((t) => (
              <a class="af-badge" key={t} href={`/tags/${encodeURIComponent(t)}/`}>{t}</a>
            ))}
          </div>
          <hr />
        </header>
        {children}
      </article>
    </LayoutComponent>
  );
}
