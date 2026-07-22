/** @jsxImportSource preact */
/**
 * No upstream equivalent (hugo-book searches in the sidebar) — results page
 * for Dune's built-in `/search` route, styled as a book article. Covers
 * direct/bookmarked/no-JS navigation; the sidebar island covers the common case.
 */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

export default function SearchTemplate(props: any) {
  const { Layout, searchQuery, searchResults, t, site } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const results = searchResults ?? [];
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const basePath = site?.basePath ?? "";
  const action = `${basePath}/search`.replace(/([^:]\/)\/+/g, "$1") || "/search";

  return (
    <LayoutComponent {...props}>
      <article class="markdown book-article">
        <h1>{tr("Search", "Search")}</h1>
        <form action={action} method="get">
          <input
            type="text"
            name="q"
            value={searchQuery ?? ""}
            placeholder={tr("Search", "Search")}
            maxlength={64}
            autofocus
          />
        </form>
        {searchQuery && (
          <ul>
            {results.map((r: any) => (
              <li key={r.route}>
                <a href={r.route}>{r.title}</a>
                {r.excerpt && <p>{r.excerpt}</p>}
              </li>
            ))}
            {results.length === 0 && (
              <li>{tr("No results", "No results")}</li>
            )}
          </ul>
        )}
      </article>
    </LayoutComponent>
  );
}
