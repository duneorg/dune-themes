/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { postExcerpt } from "../utils/content.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination } = props;
  const items = collection?.items ?? [];

  return (
    <LayoutComponent
      {...props}
      recentPosts={items.slice(0, 3).map((post) => ({
        route: post.route,
        title: String(post.frontmatter.title ?? post.route),
        excerpt: postExcerpt(post.frontmatter),
        cover: typeof post.frontmatter.cover === "string" ? post.frontmatter.cover : undefined,
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
            const cover = typeof fm.cover === "string" ? fm.cover : undefined;
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
                  <li><a href={post.route} class="button">More</a></li>
                </ul>
              </article>
            );
          })}
        </div>
        {(pagination?.newer || pagination?.older) && (
          <ul class="actions">
            {pagination.older && (
              <li><a href={pagination.older} class="button">← Older</a></li>
            )}
            {pagination.newer && (
              <li><a href={pagination.newer} class="button">Newer →</a></li>
            )}
          </ul>
        )}
      </section>
    </LayoutComponent>
  );
}
