/** @jsxImportSource preact */
import { h } from "preact";
import { formatDate } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default async function PostTemplate(props: any) {
  const { page, children, Layout, themeConfig } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const fm = page.frontmatter;
  const date = fm.date ? new Date(fm.date).getTime() : undefined;
  const tags: string[] = fm.taxonomy?.tag ?? fm.taxonomy?.tags ?? [];

  let readingTime = "";
  if (themeConfig?.show_reading_time !== false) {
    const text = (await page.html()).replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    readingTime = `${Math.max(1, Math.round(words / 200))} min`;
  }

  return (
    <LayoutComponent {...props}>
      <article class="post-single">
        <header class="post-header">
          <h1 class="post-title">{fm.title}</h1>
          {fm.metadata?.description && (
            <div class="post-description">{fm.metadata.description}</div>
          )}
          <div class="post-meta">
            {date && <time datetime={new Date(date).toISOString()}>{formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}</time>}
            {readingTime && <span>&nbsp;·&nbsp;{readingTime}</span>}
            {fm.author && <span>&nbsp;·&nbsp;{fm.author}</span>}
          </div>
        </header>
        <div class="post-content">{children}</div>
        {tags.length > 0 && (
          <footer class="post-footer">
            <ul class="post-tags">
              {tags.map((t) => (
                <li key={t}>
                  <a href={`/tag:${encodeURIComponent(t)}`}>{t}</a>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </article>
    </LayoutComponent>
  );
}
