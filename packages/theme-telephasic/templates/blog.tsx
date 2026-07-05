/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import DefaultTemplate from "./default.tsx";
import { formatTelephasicDate, postExcerpt } from "../utils/content.ts";

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
    return <DefaultTemplate {...props} Layout={LayoutComponent} />;
  }

  return (
    <LayoutComponent {...props} landing={false}>
      <div class="wrapper">
        <div class="container" id="main">
          <article id="content">
            <header>
              <h2>{page.frontmatter.title ?? "Blog"}</h2>
            </header>
            {children}
            <div class="row features">
              {items.map((post) => {
                const fm = post.frontmatter;
                const date = fm.date ? String(fm.date) : "";
                const cover = typeof fm.cover === "string" ? fm.cover : undefined;
                const excerpt = postExcerpt(fm);
                return (
                  <section class="col-4 col-12-narrower feature" key={post.route}>
                    {cover && (
                      <div class="image-wrapper">
                        <a href={post.route} class="image featured">
                          <img src={cover} alt="" />
                        </a>
                      </div>
                    )}
                    <header>
                      <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                    </header>
                    {date && <p><time datetime={date}>{formatTelephasicDate(date)}</time></p>}
                    {excerpt && <p>{excerpt}</p>}
                    <ul class="actions">
                      <li><a href={post.route} class="button">Continue reading</a></li>
                    </ul>
                  </section>
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
          </article>
        </div>
      </div>
    </LayoutComponent>
  );
}
