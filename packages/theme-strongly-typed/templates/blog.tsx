/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatStronglyTypedDate, postExcerpt } from "../utils/content.ts";
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
  const continueLabel = tr("post.continue", "Continue Reading");
  const items = collection?.items ?? [];
  const [featured, ...rest] = items;
  const featuredCover = featured ? safeHref(featured.frontmatter.cover) : undefined;
  const featuredExcerpt = featured ? postExcerpt(featured.frontmatter) : undefined;

  return (
    <LayoutComponent {...props}>
      <div class="row">
        <div id="content" class="col-8 col-12-medium">
          {page.frontmatter.title && (
            <header>
              <h2>{page.frontmatter.title}</h2>
            </header>
          )}
          {children}

          {featured && (
            <article class="box post">
              <header>
                <h2>
                  <a href={featured.route}>{String(featured.frontmatter.title ?? featured.route)}</a>
                </h2>
                {featured.frontmatter.date && (
                  <p>
                    <time datetime={String(featured.frontmatter.date)}>
                      {formatStronglyTypedDate(String(featured.frontmatter.date))}
                    </time>
                  </p>
                )}
              </header>
              {featuredCover && (
                <a href={featured.route} class="image featured">
                  <img src={featuredCover} alt="" />
                </a>
              )}
              {featuredExcerpt && <p>{featuredExcerpt}</p>}
              <ul class="actions">
                <li>
                  <a href={featured.route} class="button icon solid fa-file">{continueLabel}</a>
                </li>
              </ul>
            </article>
          )}

          {rest.map((post) => {
            const fm = post.frontmatter;
            const excerpt = postExcerpt(fm);
            const cover = safeHref(fm.cover);
            return (
              <article class="box post" key={post.route}>
                <header>
                  <h2><a href={post.route}>{String(fm.title ?? post.route)}</a></h2>
                  {fm.date && (
                    <p>
                      <time datetime={String(fm.date)}>
                        {formatStronglyTypedDate(String(fm.date))}
                      </time>
                    </p>
                  )}
                </header>
                {cover && (
                  <a href={post.route} class="image featured">
                    <img src={cover} alt="" />
                  </a>
                )}
                {excerpt && <p>{excerpt}</p>}
                <ul class="actions">
                  <li>
                    <a href={post.route} class="button icon solid fa-file">{continueLabel}</a>
                  </li>
                </ul>
              </article>
            );
          })}

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
        </div>

        {rest.length > 0 && (
          <div id="sidebar" class="col-4 col-12-medium">
            <section>
              <ul class="divided">
                {rest.slice(0, 5).map((post) => {
                  const fm = post.frontmatter;
                  const date = fm.date ? String(fm.date) : "";
                  return (
                    <li key={post.route}>
                      <article class="box excerpt">
                        <header>
                          {date && (
                            <span class="date">{formatStronglyTypedDate(date)}</span>
                          )}
                          <h3><a href={post.route}>{String(fm.title ?? post.route)}</a></h3>
                        </header>
                        {postExcerpt(fm) && <p>{postExcerpt(fm)}</p>}
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        )}
      </div>
    </LayoutComponent>
  );
}
