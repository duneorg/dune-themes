# Caravan

Original Dune theme, design inspired by [hugo-book](https://github.com/alex-shpak/hugo-book) — a clean documentation theme.

**Templates**: `default` (docs page) · `section` (page body + linked child-page list via a `collection` block) · `search` (dedicated `/search` results page — the sidebar's live search covers the common case, this covers direct/bookmarked/no-JS navigation) · `error` (404/500, kept inside the docs layout so a lost reader can navigate straight back into the sidebar)

**Config schema**: `color_scheme` (blue/slate/green/purple/amber/rose — curated
light/dark-mode accent pairs, see `utils/color-schemes.ts`), `show_search`,
`footer_text`

Sticky sidebar built from top-level nav, live search against `/api/search`, CSS-only mobile drawer, dark mode via a sidebar toggle (persisted in `localStorage`, defaults to `prefers-color-scheme`). UI strings are localized via `locales/en.json`.

## Deviations / scope

Deliberately lighter than [`book`](../theme-book/) (the faithful hugo-book port): flat top-level sidebar nav rather than a collapsible nested tree, no breadcrumbs/table-of-contents/prev-next navigation, no edit-this-page link, no KaTeX/Mermaid. If you need those, use `book` instead — caravan is the "clean and small" alternative for docs that don't need the full hugo-book feature set.
