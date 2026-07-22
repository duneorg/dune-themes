/** @jsxImportSource preact */
import { formatDate } from "@dune/core/theme-helpers";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { safeHref } from "../utils/safe-url.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: any;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? new Date(String(fm.date)).getTime() : undefined;
  const cover = safeHref(fm.cover);
  const author = typeof fm.author === "string"
    ? fm.author
    : (themeConfig?.default_author as string) ?? "";
  const avatar = safeHref(fm.avatar) ?? safeHref(themeConfig?.default_avatar) ?? "";

  return (
    <LayoutComponent {...props}>
      {cover && <img class="herald-post-cover" src={cover} alt="" />}
      <article class="herald-post-wrap">
        <h1>{String(fm.title ?? page.frontmatter.title)}</h1>
        <div class="herald-post-meta">
          {avatar && <img class="herald-avatar" src={avatar} alt="" />}
          {author && <span>{author}</span>}
          {date && (
            <>
              {author && <span aria-hidden="true">·</span>}
              <time datetime={new Date(date).toISOString()}>
                {formatDate(date, page.language ?? "en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </>
          )}
        </div>
        <div class="herald-post-content prose" data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
