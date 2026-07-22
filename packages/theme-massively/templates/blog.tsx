/** @jsxImportSource preact */
import type { ComponentChildren } from "preact";
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { formatMassivelyDate } from "../utils/content.ts";
import { safeHref } from "../utils/safe-url.ts";

function postExcerpt(fm: Record<string, unknown>): string | undefined {
  const meta = fm.metadata as Record<string, unknown> | undefined;
  if (meta?.description) return String(meta.description);
  if (typeof fm.summary === "string") return fm.summary;
  return undefined;
}

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
  const items = collection?.items ?? [];
  const [featured, ...rest] = items;
  const fullStory = tr("post.full_story", "Full Story");
  const featuredCover = featured ? safeHref(featured.frontmatter.cover) : undefined;
  const featuredExcerpt = featured ? postExcerpt(featured.frontmatter) : undefined;
  const route = props.page?.route ?? "";
  const path = route !== "/" && route.endsWith("/") ? route.slice(0, -1) : route;
  // Intro is for the site home (/ or /home); omit on /blog and posts.
  const hideIntro = path === "/blog" || path.startsWith("/blog/");

  return (
    <LayoutComponent {...props} hideIntro={hideIntro}>
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
            {featuredExcerpt && <p>{featuredExcerpt}</p>}
          </header>
          {featuredCover && (
            <a href={featured.route} class="image main">
              <img src={featuredCover} alt="" />
            </a>
          )}
          <ul class="actions special">
            <li><a href={featured.route} class="button large">{fullStory}</a></li>
          </ul>
        </article>
      )}

      {rest.length > 0 && (
        <section class="posts">
          {rest.map((post) => {
            const fm = post.frontmatter;
            const excerpt = postExcerpt(fm);
            const cover = safeHref(fm.cover);
            return (
              <article key={post.route}>
                <header>
                  {fm.date && (
                    <span class="date">{formatMassivelyDate(String(fm.date))}</span>
                  )}
                  <h2><a href={post.route}>{String(fm.title ?? post.route)}</a></h2>
                </header>
                {cover && (
                  <a href={post.route} class="image fit">
                    <img src={cover} alt="" />
                  </a>
                )}
                {excerpt && <p>{excerpt}</p>}
                <ul class="actions special">
                  <li><a href={post.route} class="button">{fullStory}</a></li>
                </ul>
              </article>
            );
          })}
        </section>
      )}

      {(pagination?.newer || pagination?.older) && (
        <footer>
          <div class="pagination">
            {pagination.older && (
              <a href={pagination.older} class="previous">
                {tr("pagination.previous", "Previous")}
              </a>
            )}
            {pagination.newer && (
              <a href={pagination.newer} class="next">
                {tr("pagination.next", "Next")}
              </a>
            )}
          </div>
        </footer>
      )}
    </LayoutComponent>
  );
}
