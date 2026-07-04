/** @jsxImportSource preact */
/** Results page for Dune's /search?q= route. Starlight itself is
 * modal-only (Ctrl+K); this page reuses the same result styling. */
import { h } from "preact";
import Layout from "../components/layout.tsx";

export default function SearchTemplate(props: any) {
  const { t } = props;
  const tr = t ?? ((k: string) => k);
  const results: Array<{ title?: string; url?: string; route?: string; excerpt?: string }> =
    props.searchResults ?? [];
  const query: string = props.searchQuery ?? "";

  return (
    <Layout {...props} hasSidebar={false} tocItems={null}>
      <h2>{tr("search.label")}{query ? `: ${query}` : ""}</h2>
      <form action="/search" method="get">
        <input type="search" name="q" value={query} placeholder={tr("search.label")} />
      </form>
      <div id="starlight__search">
        <ul class="search-results">
          {results.map((r) => (
            <li>
              <a href={r.url ?? r.route ?? "#"}>
                {r.title ?? r.url}
                {r.excerpt && <span class="excerpt">{r.excerpt}</span>}
              </a>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p class="search-message">{tr("search.noResults")}</p>
        )}
      </div>
    </Layout>
  );
}
