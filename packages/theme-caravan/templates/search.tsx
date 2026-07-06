/** @jsxImportSource preact */
/**
 * Results page for Dune's built-in /search route. The sidebar already has a
 * live search widget (see components/layout.tsx); this covers the
 * bookmarkable/no-JS/direct-navigation case.
 */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

export default function SearchTemplate(props: any) {
  const { Layout, searchQuery, searchResults, t } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const LayoutComponent = Layout ?? StaticLayout;
  const results = searchResults ?? [];

  return (
    <LayoutComponent {...props}>
      <h1>{tr("search", "Search")}</h1>
      <form action="/search" method="get" class="book-search-form">
        <input
          type="search"
          name="q"
          value={searchQuery ?? ""}
          placeholder={tr("search_placeholder", "Search")}
          aria-label={tr("search", "Search")}
          autofocus
        />
      </form>
      {searchQuery && (
        <ul class="book-search-page-results">
          {results.map((r: any) => (
            <li key={r.route}>
              <a href={r.route}>{r.title}</a>
              {r.excerpt && <p>{r.excerpt}</p>}
            </li>
          ))}
          {results.length === 0 && <li class="empty">{tr("no_results", "No results")}</li>}
        </ul>
      )}
    </LayoutComponent>
  );
}
