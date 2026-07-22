---
title: Configuring Book
template: default
published: true
order: 2
metadata:
  description: config_schema options and per-page frontmatter, named like upstream Book* params.
---

Options live in `theme.yaml`'s `config_schema` and are stored under the
`book` key in `data/theme-config.json` (editable from the admin Theme
Settings tab). Names match upstream's `Book*` params where Dune allows it.

## Site options

| Key | Type | Default | Upstream | What it does |
| --- | --- | --- | --- | --- |
| `book_theme` | select | `auto` | `BookTheme` | `auto` / `light` / `dark` — compiled as `data-book-theme` on `<html>` (upstream bakes one mixin into CSS at build time; this port ships all three) |
| `book_search` | toggle | `true` | `BookSearch` | Live search box at the top of the sidebar (`/` or ⌘/Ctrl+K to focus) |
| `book_toc` | toggle | `true` | `BookToC` | Right-hand table of contents from h2–h4 |
| `book_logo` | text | *(empty)* | `BookLogo` | Optional logo image URL next to the site title |
| `book_section` | text | `docs` | `BookSection` | Sidebar root section route; `*` for all top-level sections |
| `language_labels` | select | `code` | — | `code` or native `name` via `Intl.DisplayNames` |
| `copyright` | text | *(empty)* | `Copyright` / site copyright | Centred line under the page footer |

Example:

```json
{
  "book": {
    "book_theme": "auto",
    "book_search": true,
    "book_toc": true,
    "book_section": "*",
    "copyright": "© 2026 Acme Docs"
  }
}
```

## Per-page frontmatter

| Key | Effect |
| --- | --- |
| `bookToC: false` | Hide the right-hand ToC for this page only |

There is no freeform accent colour picker — upstream hugo-book doesn't have
one either. For a Dune-native docs theme with curated colour schemes, see
[Caravan](https://themes.getdune.org/caravan).
