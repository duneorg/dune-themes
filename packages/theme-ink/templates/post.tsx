/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default async function PostTemplate(props: TemplateProps & {
  children?: any;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = page.frontmatter as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const tags: string[] = (fm.taxonomy as Record<string, string[]>)?.tag ??
    (fm.taxonomy as Record<string, string[]>)?.tags ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
  const cover = safeHref(fm.cover);
  const author = typeof fm.author === "string"
    ? fm.author
    : (themeConfig?.author_name as string) ?? "";

  let readingMins = 0;
  if (themeConfig?.show_reading_time !== false) {
    const text = (await page.html()).replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    readingMins = Math.max(1, Math.round(words / 200));
  }

  const authorBio = (themeConfig?.author_bio as string) ?? "";
  const authorAvatar = safeHref(themeConfig?.author_avatar);

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
                {formatDate(date, page.language ?? "en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            {readingMins > 0 && (
              <span>
                &nbsp;·&nbsp;{readingMins} {tr("post.reading_time", "min read")}
              </span>
            )}
            {author && <span>&nbsp;·&nbsp;{author}</span>}
          </div>
        </header>
        <div class="post-content">{children}</div>
        {tags.length > 0 && (
          <footer class="post-footer">
            <ul class="post-tags">
              {tags.map((tag) => (
                <li key={tag}>
                  <a href={`/tags/${encodeURIComponent(tag)}/`}>{tag}</a>
                </li>
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
