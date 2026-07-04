/** @jsxImportSource preact */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";
import { getSearchUrl } from "@dune/core/theme-helpers";

/**
 * Built-in /search page: query form plus ranked results
 * (`searchQuery` / `searchResults` props are provided by the engine).
 */
export default function SearchTemplate(props: any) {
  const { children, Layout, searchQuery, searchResults, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const tr = t ?? ((k: string) => k);
  return (
    <LayoutComponent {...props}>
      <h1>{tr("search.title")}</h1>
      {children}
      <form action={getSearchUrl("").split("?")[0]} method="get" role="search">
        <input
          type="search"
          name="q"
          value={searchQuery ?? ""}
          placeholder={tr("search.placeholder")}
          aria-label={tr("search.placeholder")}
        />
        <button type="submit">{tr("search.submit")}</button>
      </form>
      {searchQuery && (
        <section class="search-results" aria-live="polite">
          {(searchResults ?? []).length === 0
            ? <p>{tr("search.empty")}</p>
            : (
              <ol>
                {searchResults.map((r: any) => (
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
