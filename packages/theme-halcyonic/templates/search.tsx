/** @jsxImportSource preact */
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
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const action = getSearchUrl("").split("?")[0];

  return (
    <LayoutComponent {...props} landing={false}>
      <section>
        <header><h2>{tr("search.title", "Search")}</h2></header>
        <form class="search-form" action={action} method="get" role="search">
          <input
            type="search"
            name="q"
            class="text"
            value={searchQuery ?? ""}
            placeholder={tr("search.placeholder", "Search…")}
            aria-label={tr("search.placeholder", "Search…")}
          />
          <button type="submit" class="button-large">{tr("search.submit", "Search")}</button>
        </form>
        {searchQuery && (
          <section class="search-results" aria-live="polite">
            {(searchResults ?? []).length === 0
              ? <p>{tr("search.empty", "No results found.")}</p>
              : (
                <ol>
                  {searchResults!.map((r) => (
                    <li key={r.route}>
                      <a href={r.route}>{r.title}</a>
                      {r.excerpt && <p>{r.excerpt}</p>}
                    </li>
                  ))}
                </ol>
              )}
          </section>
        )}
      </section>
    </LayoutComponent>
  );
}
