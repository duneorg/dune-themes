/** @jsxImportSource preact */
import type { TemplateProps } from "@dune/core/content/types";
import StaticLayout from "../components/layout.tsx";
import { getSearchUrl } from "@dune/core/theme-helpers";
import { themeImage } from "../utils/content.ts";

export default function SearchTemplate(props: TemplateProps & {
  Layout?: typeof StaticLayout;
  config?: { theme?: { name?: string } };
  searchQuery?: string;
  searchResults?: { route: string; title: string; excerpt?: string }[];
  t?: (key: string) => string;
  themeConfig?: Record<string, unknown>;
}) {
  const LayoutComponent = props.Layout ?? StaticLayout;
  const { page, searchQuery, searchResults, t, config, themeConfig } = props;
  const tr = (key: string, fallback: string) => (t ? t(key) : undefined) ?? fallback;
  const action = getSearchUrl("").split("?")[0];
  const themeName = config?.theme?.name ?? "story";
  const img = (file: string) => themeImage(themeName, file);
  const showCredit = themeConfig?.show_html5up_credit !== false;

  return (
    <LayoutComponent {...props} landing={false}>
      <section class="banner style1 orient-left content-align-left image-position-right">
        <div class="content"><h1>{tr("search.title", "Search")}</h1></div>
        <div class="image"><img src={img("spotlight03.jpg")} alt="" /></div>
      </section>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <form class="search-form" action={action} method="get" role="search">
            <div class="fields">
              <div class="field">
                <label for="q">{tr("search.placeholder", "Search…")}</label>
                <input type="search" name="q" id="q" value={searchQuery ?? ""} />
              </div>
            </div>
            <ul class="actions special">
              <li><input type="submit" value={tr("search.submit", "Search")} class="button wide" /></li>
            </ul>
          </form>
          {searchQuery && (
            <section class="search-results" aria-live="polite">
              {(searchResults ?? []).length === 0
                ? <p>{tr("search.empty", "No results found.")}</p>
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
      {showCredit && (
        <footer class="wrapper style1 align-center">
          <div class="inner"><p>Design: <a href="https://html5up.net/story">HTML5 UP</a></p></div>
        </footer>
      )}
    </LayoutComponent>
  );
}
