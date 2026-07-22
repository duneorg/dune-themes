/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { postExcerpt } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: ComponentChildren;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const continueLabel = tr("post.continue", "More");
  const items = collection?.items ?? [];

  return (
    <LayoutComponent
      {...props}
      recentPosts={items.slice(0, 3).map((post) => ({
        route: post.route,
        title: String(post.frontmatter.title ?? post.route),
        excerpt: postExcerpt(post.frontmatter),
        cover: safeHref(post.frontmatter.cover),
      }))}
    >
      <section>
        {page.frontmatter.title && (
          <header class="major">
            <h2>{page.frontmatter.title}</h2>
          </header>
        )}
        {children}
        <div class="posts">
          {items.map((post) => {
            const fm = post.frontmatter;
            const excerpt = postExcerpt(fm);
            const cover = safeHref(fm.cover);
            return (
              <article key={post.route}>
                {cover && (
                  <a href={post.route} class="image">
                    <img src={cover} alt="" />
                  </a>
                )}
                <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                {excerpt && <p>{excerpt}</p>}
                <ul class="actions">
                  <li><a href={post.route} class="button">{continueLabel}</a></li>
                </ul>
              </article>
            );
          })}
        </div>
        {(pagination?.newer || pagination?.older) && (
          <ul class="actions">
            {pagination.older && (
              <li><a href={pagination.older} class="button">← {tr("pagination.older", "Older")}</a></li>
            )}
            {pagination.newer && (
              <li><a href={pagination.newer} class="button">{tr("pagination.newer", "Newer")} →</a></li>
            )}
          </ul>
        )}
      </section>
    </LayoutComponent>
  );
}
