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
  const { page, searchQuery, searchResults, t } = props;
  const tr = t ?? ((k: string) => k);
  const action = getSearchUrl("").split("?")[0];

  return (
    <LayoutComponent {...props} landing={false}>
      <div id="main" class="wrapper style2">
        <div class="title">{page.frontmatter.title ?? tr("search.title")}</div>
        <div class="container">
          <div id="content">
            <article class="box post">
              <form class="search-form" action={action} method="get" role="search">
                <div class="row gtr-50">
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
                    <ul class="actions">
                      <li><input type="submit" class="style1" value={tr("search.submit")} /></li>
                    </ul>
                  </div>
                </div>
              </form>
              {searchQuery && (
                <section class="search-results" aria-live="polite">
                  {(searchResults ?? []).length === 0
                    ? <p>{tr("search.empty")}</p>
                    : (
                      <ul class="link-list last-child">
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
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
