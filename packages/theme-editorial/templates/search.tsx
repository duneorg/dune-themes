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
  const tr = t ?? ((k: string) => k);
  const action = getSearchUrl("").split("?")[0];

  return (
    <LayoutComponent {...props}>
      <section>
        <header class="main">
          <h1>{tr("search.title")}</h1>
        </header>
        <form class="search-form" action={action} method="get" role="search">
          <div class="row gtr-uniform">
            <div class="col-8 col-12-small">
              <input
                type="search"
                name="q"
                value={searchQuery ?? ""}
                placeholder={tr("search.placeholder")}
                aria-label={tr("search.placeholder")}
              />
            </div>
            <div class="col-4 col-12-small">
              <button type="submit" class="button fit">{tr("search.submit")}</button>
            </div>
          </div>
        </form>
        {searchQuery && (
          <section class="search-results" aria-live="polite">
            {(searchResults ?? []).length === 0
              ? <p>{tr("search.empty")}</p>
              : (
                <ul class="alt">
                  {searchResults!.map((r) => (
                    <li key={r.route}>
                      <a href={r.route}>{r.title}</a>
                      {r.excerpt && <p>{r.excerpt}</p>}
                    </li>
                  ))}
                </ul>
              )}
          </section>
        )}
      </section>
    </LayoutComponent>
  );
}
