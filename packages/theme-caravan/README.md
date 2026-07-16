# Caravan

Original Dune theme, design inspired by [hugo-book](https://github.com/alex-shpak/hugo-book) — a clean documentation theme.

![Caravan screenshot](https://themes.getdune.org/caravan/themes/caravan/static/screenshot.png)

**Demo**: https://themes.getdune.org/caravan

**Tags**: dune-theme, docs, sidebar, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-caravan@1.1.2 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: caravan
    src: jsr:@dune/theme-caravan@1.1.2

theme:
  name: caravan
  src: jsr:@dune/theme-caravan@1.1.2
```

**Templates**: `default` (docs page) · `section` (page body + linked child-page list via a `collection` block) · `search` (dedicated `/search` results page — the sidebar's live search covers the common case, this covers direct/bookmarked/no-JS navigation) · `error` (404/500, kept inside the docs layout so a lost reader can navigate straight back into the sidebar)

**Config schema**: `color_scheme` (blue/slate/green/purple/amber/rose — curated
light/dark-mode accent + sidebar-tint pairs, see `utils/color-schemes.ts`),
`scheme_switcher` (adds a sidebar dropdown so visitors can preview the other
presets client-side via `localStorage` — doesn't touch the site's actual
config; off by default, useful for a showcase/demo site), `show_search`,
`flat_nav` (shows only top-level pages instead of the full nested tree —
see below), `nav_expand` (`auto`, default — sections open only around the
current page, no chevron; `click` — adds a chevron so visitors can also
expand/collapse manually), `footer_text`

Sticky sidebar built from the full page tree (the current page's ancestor
sections start expanded; `nav_expand: click` adds a zero-JS checkbox+CSS
toggle so visitors can expand/collapse sections themselves), live search
against `/api/search`, CSS-only mobile drawer, dark mode via a sidebar
toggle (persisted in `localStorage`, defaults to `prefers-color-scheme`).
UI strings are localized via `locales/en.json`.

Full configuration reference and a customization guide are in the "Using
Caravan" section of the [live demo](https://themes.getdune.org/caravan).

## Deviations / scope

Deliberately lighter than `book` (the faithful hugo-book port): no
breadcrumbs/table-of-contents/prev-next navigation, no edit-this-page
link, no KaTeX/Mermaid. If you need those, use `book` instead — caravan
is the "clean and small" alternative for docs that don't need the full
hugo-book feature set.
