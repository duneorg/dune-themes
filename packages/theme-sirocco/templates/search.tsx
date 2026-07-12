/** @jsxImportSource preact */
import { h } from "preact";
import { getSearchUrl } from "@dune/core/theme-helpers";
import StaticLayout from "../components/layout.tsx";

export default function SearchTemplate(props: any) {
  const { children, Layout, searchQuery, searchResults, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const LayoutComponent = Layout ?? StaticLayout;
  const results = searchResults ?? [];

  return (
    <LayoutComponent {...props}>
      <h1>{tr("search", "Search")}</h1>
      {children}
      <form action={getSearchUrl("").split("?")[0]} method="get" role="search">
        <input
          type="search"
          name="q"
          value={searchQuery ?? ""}
          placeholder={tr("search_placeholder", "Search…")}
          aria-label={tr("search", "Search")}
          autofocus
        />
        <button type="submit">{tr("search_submit", "Search")}</button>
      </form>
      {searchQuery && (
        <section class="search-results" aria-live="polite">
          {results.length === 0
            ? <p>{tr("no_results", "No results found.")}</p>
            : (
              <ol>
                {results.map((r: any) => (
                  <li key={r.route}>
                    <a href={r.route}>{r.title}</a>
                    {r.excerpt && <p>{r.excerpt}</p>}
                  </li>
                ))}
              </ol>
            )}
        </section>
      )}
    </LayoutComponent>
  );
}
