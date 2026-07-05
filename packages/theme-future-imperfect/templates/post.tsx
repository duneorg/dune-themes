/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatFiDate, postExcerpt } from "../utils/content.ts";

export default function PostTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, themeConfig, config } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;
  const subtitle = typeof fm.subtitle === "string" ? fm.subtitle : postExcerpt(fm);
  const themeName = config?.theme?.name ?? "future-imperfect";
  const authorName = (themeConfig?.author_name as string) || "Author";
  const authorAvatar = (themeConfig?.author_avatar as string) ||
    `/themes/${themeName}/static/html5up/images/avatar.jpg`;

  return (
    <LayoutComponent {...props}>
      <article class="post">
        <header>
          <div class="title">
            <h2>{page.frontmatter.title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {date && (
            <div class="meta">
              <time class="published" datetime={date}>{formatFiDate(date)}</time>
              <span class="author">
                <span class="name">{authorName}</span>
                <img src={authorAvatar} alt="" />
              </span>
            </div>
          )}
        </header>
        {cover && (
          <span class="image featured">
            <img src={cover} alt="" />
          </span>
        )}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
