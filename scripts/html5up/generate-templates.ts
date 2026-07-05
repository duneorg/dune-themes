/**
 * Generate page templates per HTML5 UP blog/layout family.
 */

import type { ThemeDef } from "../theme-defs.ts";
import type { Html5UpLayoutFamily } from "./layout-families.ts";
import { BLOG_ARCHETYPES } from "./layout-families.ts";

const DATE_HELPER = `
function formatHtml5UpDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
`.trim();

export function generateDefaultTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function DefaultTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  return (
    <LayoutComponent {...props}>
      <article class="post">
        <header><h2>{page.frontmatter.title}</h2></header>
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
`;
}

export function generatePostTemplate(family: Html5UpLayoutFamily): string {
  const massively = family === "wrapper-massively";
  const stripedLike = family === "wrapper-fi";
  const headerDate = massively
    ? "{date && <span class=\"date\">{formatHtml5UpDate(date)}</span>}"
    : "";
  const metaDate = !massively
    ? "{date && <p class=\"meta\"><time>{date}</time></p>}"
    : "";
  const coverBlock =
    `{cover && <a href={page.route} class="image ${massively ? "main" : "featured"}"><img src={cover} alt="" /></a>}`;

  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
${massively || stripedLike ? DATE_HELPER : ""}

export default function PostTemplate(props: TemplateProps & { children?: unknown; Layout?: typeof StaticLayout }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children } = props;
  const fm = page.frontmatter as Record<string, unknown>;
  const date = fm.date ? String(fm.date) : "";
  const cover = typeof fm.cover === "string" ? fm.cover : undefined;

  return (
    <LayoutComponent {...props}>
      <article class="post">
        <header${massively ? ' class="major"' : ""}>
          ${headerDate}
          <h2>{page.frontmatter.title}</h2>
        </header>
        ${metaDate}
        ${coverBlock}
        <div data-dune-body>{children}</div>
      </article>
    </LayoutComponent>
  );
}
`;
}

export function generateBlogTemplate(family: Html5UpLayoutFamily): string {
  const massively = family === "wrapper-massively";
  const blogDateLine = massively
    ? "{date && <span class=\"date\">{formatHtml5UpDate(date)}</span>}"
    : "";

  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
${massively ? DATE_HELPER : ""}

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
      recentPosts={items.slice(0, 5).map((post) => ({
        route: post.route,
        title: String(post.frontmatter.title ?? post.route),
      }))}
    >
      {page.frontmatter.title && <header><h2>{page.frontmatter.title}</h2></header>}
      {children}
      <section class="posts">
        {items.map((post) => {
          const fm = post.frontmatter;
          const date = fm.date ? String(fm.date) : "";
          const cover = typeof fm.cover === "string" ? fm.cover : undefined;
          const excerpt = (fm.metadata as Record<string, unknown> | undefined)?.description;
          return (
            <article key={post.route}${massively ? "" : ' class="post"'}>
              <header>
                ${blogDateLine}
                <h2><a href={post.route}>{String(fm.title ?? post.route)}</a></h2>
                {excerpt && <p>{String(excerpt)}</p>}
              </header>
              {cover && (
                <a href={post.route} class="image ${massively ? "fit" : "featured"}">
                  <img src={cover} alt="" />
                </a>
              )}
            </article>
          );
        })}
      </section>
      {(pagination?.newer || pagination?.older) && (
        <div class="pagination">
          {pagination.older && <a href={pagination.older} class="button">← Older</a>}
          {pagination.newer && <a href={pagination.newer} class="button">Newer →</a>}
        </div>
      )}
    </LayoutComponent>
  );
}
`;
}

export function generateSearchTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { getSearchUrl } from "@dune/core/theme-helpers";

export default function SearchTemplate(props: TemplateProps & {
  Layout?: typeof StaticLayout;
  searchQuery?: string;
  searchResults?: { route: string; title: string; excerpt?: string }[];
  t?: (key: string) => string;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { searchQuery, searchResults, t } = props;
  const tr = t ?? ((k: string) => k);
  const action = getSearchUrl("").split("?")[0];

  return (
    <LayoutComponent {...props}>
      <article class="post prose-search">
        <header><h2>{tr("search.title")}</h2></header>
        <form class="search-form" action={action} method="get" role="search">
          <input type="search" name="q" class="text" value={searchQuery ?? ""} placeholder={tr("search.placeholder")} />
          <button type="submit" class="button">{tr("search.submit")}</button>
        </form>
        {searchQuery && (
          <section class="search-results" aria-live="polite">
            {(searchResults ?? []).length === 0 ? <p>{tr("search.empty")}</p> : (
              <ol>
                {searchResults!.map((r) => (
                  <li key={r.route}><a href={r.route}>{r.title}</a>{r.excerpt && <p>{r.excerpt}</p>}</li>
                ))}
              </ol>
            )}
          </section>
        )}
      </article>
    </LayoutComponent>
  );
}
`;
}

export function generateErrorTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function ErrorTemplate(props: TemplateProps & { Layout?: typeof StaticLayout; t?: (key: string) => string }) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const tr = props.t ?? ((k: string) => k);
  const code = (props.page?.frontmatter as Record<string, unknown>)?.errorCode ?? 404;
  return (
    <LayoutComponent {...props}>
      <article class="post error-page">
        <header><h2>{String(code)}</h2><p>{tr("error.notfound")}</p></header>
        <p><a href="/">{tr("error.home")}</a></p>
      </article>
    </LayoutComponent>
  );
}
`;
}

export function generateArchivesTemplate(): string {
  return `/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";

export default function ArchivesTemplate(props: TemplateProps & {
  children?: unknown;
  Layout?: typeof StaticLayout;
  collection?: { items?: Array<{ route: string; frontmatter: Record<string, unknown> }> };
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, children, collection } = props;
  const items = collection?.items ?? [];
  const byYear = new Map<number, typeof items>();
  for (const post of items) {
    const raw = post.frontmatter.date;
    if (!raw) continue;
    const year = new Date(String(raw)).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(post);
  }
  const years = [...byYear.keys()].sort((a, b) => b - a);

  return (
    <LayoutComponent {...props}>
      <article class="post">
        <header><h2>{page.frontmatter.title}</h2></header>
        {children}
        {years.map((year) => (
          <section key={year}>
            <h3>{year}</h3>
            <ul>
              {byYear.get(year)!.map((post) => (
                <li key={post.route}>
                  <a href={post.route}>{String(post.frontmatter.title ?? post.route)}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </article>
    </LayoutComponent>
  );
}
`;
}

export function needsBlogTemplate(def: ThemeDef): boolean {
  return BLOG_ARCHETYPES.has(def.archetype) || def.archetype === "landing";
}

/** Blog listing template only for blog archetypes (not generic landing). */
export function shouldGenerateBlog(def: ThemeDef): boolean {
  return BLOG_ARCHETYPES.has(def.archetype);
}
