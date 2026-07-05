/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatMassivelyDate } from "../utils/content.ts";

function postExcerpt(fm: Record<string, unknown>): string | undefined {
  const meta = fm.metadata as Record<string, unknown> | undefined;
  return meta?.description ? String(meta.description) : undefined;
}

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination } = props;
  const items = collection?.items ?? [];
  const [featured, ...rest] = items;

  return (
    <LayoutComponent {...props} hideIntro>
      {children}

      {featured && (
        <article class="post featured">
          <header class="major">
            {featured.frontmatter.date && (
              <span class="date">{formatMassivelyDate(String(featured.frontmatter.date))}</span>
            )}
            <h2>
              <a href={featured.route}>{String(featured.frontmatter.title ?? featured.route)}</a>
            </h2>
            {postExcerpt(featured.frontmatter) && <p>{postExcerpt(featured.frontmatter)}</p>}
          </header>
          {typeof featured.frontmatter.cover === "string" && (
            <a href={featured.route} class="image main">
              <img src={featured.frontmatter.cover} alt="" />
            </a>
          )}
          <ul class="actions special">
            <li><a href={featured.route} class="button large">Full Story</a></li>
          </ul>
        </article>
      )}

      {rest.length > 0 && (
        <section class="posts">
          {rest.map((post) => {
            const fm = post.frontmatter;
            const excerpt = postExcerpt(fm);
            return (
              <article key={post.route}>
                <header>
                  {fm.date && (
                    <span class="date">{formatMassivelyDate(String(fm.date))}</span>
                  )}
                  <h2><a href={post.route}>{String(fm.title ?? post.route)}</a></h2>
                </header>
                {typeof fm.cover === "string" && (
                  <a href={post.route} class="image fit">
                    <img src={fm.cover} alt="" />
                  </a>
                )}
                {excerpt && <p>{excerpt}</p>}
                <ul class="actions special">
                  <li><a href={post.route} class="button">Full Story</a></li>
                </ul>
              </article>
            );
          })}
        </section>
      )}

      {(pagination?.newer || pagination?.older) && (
        <footer>
          <div class="pagination">
            {pagination.older && <a href={pagination.older} class="previous">Previous</a>}
            {pagination.newer && <a href={pagination.newer} class="next">Next</a>}
          </div>
        </footer>
      )}
    </LayoutComponent>
  );
}
