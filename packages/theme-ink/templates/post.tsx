/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

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
  const tags: string[] = (fm.taxonomy as Record<string, string[]>)?.tag ??
    (fm.taxonomy as Record<string, string[]>)?.tags ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const author = typeof fm.author === "string" ? fm.author : (themeConfig?.author_name as string) ?? "";

  let readingTime = "";
  if (themeConfig?.show_reading_time !== false) {
    const text = (await page.html()).replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    readingTime = `${Math.max(1, Math.round(words / 200))} min read`;
  }

  const authorBio = (themeConfig?.author_bio as string) ?? "";
  const authorAvatar = (themeConfig?.author_avatar as string) ?? "";

  return (
    <LayoutComponent {...props}>
      <article class="post-single">
        {cover && <img class="post-cover-full" src={cover} alt="" />}
        <header class="post-header">
          <h1 class="post-title">{String(fm.title ?? page.frontmatter.title)}</h1>
          {meta.description && <div class="post-description">{String(meta.description)}</div>}
          <div class="post-meta">
            {date && (
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", { day: "numeric", month: "long", year: "numeric" })}
              </time>
            )}
            {readingTime && <span>&nbsp;·&nbsp;{readingTime}</span>}
            {author && <span>&nbsp;·&nbsp;{author}</span>}
          </div>
        </header>
        <div class="post-content">{children}</div>
        {tags.length > 0 && (
          <footer class="post-footer">
            <ul class="post-tags">
              {tags.map((t) => (
                <li key={t}><a href={`/tag:${encodeURIComponent(t)}`}>{t}</a></li>
              ))}
            </ul>
          </footer>
        )}
        {(authorBio || author) && (
          <aside class="author-box">
            {authorAvatar && <img src={authorAvatar} alt={author || "Author"} />}
            <div>
              {author && <h4>{author}</h4>}
              {authorBio && <p>{authorBio}</p>}
            </div>
          </aside>
        )}
      </article>
    </LayoutComponent>
  );
}
