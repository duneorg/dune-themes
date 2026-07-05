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
      <article class="post">
        <header>
          <div class="title">
            <h2>{tr("search.title")}</h2>
          </div>
        </header>
        <form class="search" action={action} method="get" role="search">
          <input
            type="search"
            name="q"
            value={searchQuery ?? ""}
            placeholder={tr("search.placeholder")}
            aria-label={tr("search.placeholder")}
          />
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
      </article>
    </LayoutComponent>
  );
}
