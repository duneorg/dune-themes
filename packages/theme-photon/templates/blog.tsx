/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatPhotonDate, postExcerpt } from "../utils/content.ts";

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
    <LayoutComponent {...props} landing={false}>
      {page.frontmatter.title && (
        <header class="major">
          <h2>{page.frontmatter.title}</h2>
        </header>
      )}
      {children}
      <div class="row gtr-150">
        {items.map((post) => {
          const fm = post.frontmatter;
          const cover = typeof fm.cover === "string" ? fm.cover : undefined;
          const excerpt = postExcerpt(fm);
          const date = fm.date ? String(fm.date) : "";
          return (
            <div class="col-6 col-12-medium" key={post.route}>
              {cover && (
                <a href={post.route} class="image fit">
                  <img src={cover} alt="" />
                </a>
              )}
              <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
              {date && <p><time datetime={date}>{formatPhotonDate(date)}</time></p>}
              {excerpt && <p>{excerpt}</p>}
              <ul class="actions special">
                <li><a href={post.route} class="button">Read More</a></li>
              </ul>
            </div>
          );
        })}
      </div>
      {(pagination?.newer || pagination?.older) && (
        <ul class="actions special">
          {pagination.older && (
            <li><a href={pagination.older} class="button">← Older</a></li>
          )}
          {pagination.newer && (
            <li><a href={pagination.newer} class="button">Newer →</a></li>
          )}
        </ul>
      )}
    </LayoutComponent>
  );
}
