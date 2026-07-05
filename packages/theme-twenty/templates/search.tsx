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
    <LayoutComponent {...props} landing={false}>
      <article id="main">
        <header class="special container">
          <span class="icon solid fa-search"></span>
          <h2>{tr("search.title")}</h2>
        </header>
        <section class="wrapper style4 container">
          <div class="content">
            <form action={action} method="get" role="search" class="search-form">
              <input
                type="search"
                name="q"
                value={searchQuery ?? ""}
                placeholder={tr("search.placeholder")}
                aria-label={tr("search.placeholder")}
              />
              <ul class="buttons">
                <li><button type="submit" class="button">{tr("search.submit")}</button></li>
              </ul>
            </form>
            {searchQuery && (
              <section class="search-results" aria-live="polite">
                {(searchResults ?? []).length === 0
                  ? <p>{tr("search.empty")}</p>
                  : (
                    <ul>
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
          </div>
        </section>
      </article>
    </LayoutComponent>
  );
}
