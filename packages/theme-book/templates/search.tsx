/** @jsxImportSource preact */
/**
 * No upstream equivalent (hugo-book searches in the sidebar) — minimal
 * results page for Dune's built-in /search route, styled as a book page.
 */
import { h } from "preact";
import StaticLayout from "../components/layout.tsx";

export default function SearchTemplate(props: any) {
  const { Layout, searchQuery, searchResults, t } = props;
  const LayoutComponent = Layout ?? StaticLayout;
  const results = searchResults ?? [];

  return (
    <LayoutComponent {...props}>
      <article class="markdown book-article">
        <h1>{t ? t("Search") : "Search"}</h1>
        <form action="/search" method="get">
          <input
            type="text"
            name="q"
            value={searchQuery ?? ""}
            placeholder={t ? t("Search") : "Search"}
            maxlength={64}
          />
        </form>
        {searchQuery && (
          <ul>
            {results.map((r: any) => (
              <li key={r.route}>
                <a href={r.route}>{r.title}</a>
                {r.excerpt && <p>{r.excerpt}</p>}
              </li>
            ))}
            {results.length === 0 && <li>—</li>}
          </ul>
        )}
      </article>
    </LayoutComponent>
  );
}
