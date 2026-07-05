/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatAlphaDate, postExcerpt } from "../utils/content.ts";

export default function BlogTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  pathname?: string;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
  pagination?: { newer?: string; older?: string };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection, pagination, pathname } = props;
  const isHome = (pathname ?? page?.route ?? "/") === "/";
  const items = collection?.items ?? [];

  if (isHome) {
    return <LayoutComponent {...props} />;
  }

  return (
    <LayoutComponent {...props}>
      <header>
        <h2>{page.frontmatter.title ?? "The Blog"}</h2>
      </header>
      {children}
      <div class="row">
        {items.map((post) => {
          const fm = post.frontmatter;
          const date = fm.date ? String(fm.date) : "";
          const cover = typeof fm.cover === "string" ? fm.cover : undefined;
          const excerpt = postExcerpt(fm);
          return (
            <div class="col-6 col-12-narrower" key={post.route}>
              <section class="box special">
                {cover && (
                  <span class="image featured">
                    <img src={cover} alt="" />
                  </span>
                )}
                <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                {date && <p><time datetime={date}>{formatAlphaDate(date)}</time></p>}
                {excerpt && <p>{excerpt}</p>}
                <ul class="actions special">
                  <li><a href={post.route} class="button alt">Learn More</a></li>
                </ul>
              </section>
            </div>
          );
        })}
      </div>
      {(pagination?.newer || pagination?.older) && (
        <ul class="actions special">
          {pagination.older && (
            <li><a href={pagination.older} class="button alt">← Older</a></li>
          )}
          {pagination.newer && (
            <li><a href={pagination.newer} class="button alt">Newer →</a></li>
          )}
        </ul>
      )}
    </LayoutComponent>
  );
}
