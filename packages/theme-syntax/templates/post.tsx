/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

function tags(fm: Record<string, unknown>): string[] {
  return (fm.taxonomy as Record<string, string[]>)?.tag ??
    (Array.isArray(fm.tags) ? fm.tags as string[] : []);
}

export default async function PostTemplate(props: TemplateProps & {
  children?: any;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
  t?: (key: string) => string;
  site?: { basePath?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig, t, site } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const fm = page.frontmatter as Record<string, unknown>;
  const meta = (fm.metadata ?? {}) as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const tagList = tags(fm);
  const pinned = fm.pinned === true;
  const basePath = site?.basePath ?? "";
  const tagHref = (tag: string) =>
    `${basePath}/tags/${encodeURIComponent(tag)}/`.replace(/([^:]\/)\/+/g, "$1");

  let readingMins = 0;
  if (themeConfig?.show_reading_time !== false) {
    const text = (await page.html()).replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    readingMins = Math.max(1, Math.round(words / 200));
  }

  return (
    <LayoutComponent {...props}>
      <article class="syntax-post-wrap">
        <header class="syntax-post-header">
          {pinned && <span class="syntax-pin">{tr("post.pinned", "Pinned")}</span>}
          <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
          {meta.description && <p class="syntax-post-desc">{String(meta.description)}</p>}
          <div class="syntax-post-meta">
            {date && (
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            )}
            {readingMins > 0 && (
              <span>{readingMins} {tr("post.reading_time", "min read")}</span>
            )}
            {fm.author && <span>{String(fm.author)}</span>}
            {tagList.length > 0 && (
              <div class="syntax-tags">
                {tagList.map((tag) => (
                  <a class="syntax-tag" key={tag} href={tagHref(tag)}>{tag}</a>
                ))}
              </div>
            )}
          </div>
        </header>
        <div class="syntax-content prose" data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
