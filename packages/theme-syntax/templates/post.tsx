/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

function tags(fm: Record<string, unknown>): string[] {
  return (fm.taxonomy as Record<string, string[]>)?.tag ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
}

export default async function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const tagList = tags(fm);
  const pinned = fm.pinned === true;

  let readingTime = "";
  if (themeConfig?.show_reading_time !== false) {
    const text = (await page.html()).replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    readingTime = `${Math.max(1, Math.round(words / 200))} min`;
  }

  return (
    <LayoutComponent {...props}>
      <article class="syntax-post-wrap">
        <header class="syntax-post-header">
          {pinned && <span class="syntax-pin">📌 Pinned</span>}
          <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
          {meta.description && <p class="syntax-post-desc">{String(meta.description)}</p>}
          <div class="syntax-post-meta">
            {date && (
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", { day: "numeric", month: "short", year: "numeric" })}
              </time>
            )}
            {readingTime && <span>{readingTime}</span>}
            {fm.author && <span>{String(fm.author)}</span>}
            {tagList.length > 0 && (
              <div class="syntax-tags">
                {tagList.map((t) => (
                  <a class="syntax-tag" key={t} href={`/tags/${encodeURIComponent(t)}/`}>{t}</a>
                ))}
              </div>
            )}
          </div>
        </header>
        <div class="syntax-content prose">{children}</div>
      </article>
    </LayoutComponent>
  );
}
