---
title: What's faithfully preserved
template: default
published: true
order: 3
metadata:
  description: What "faithful" means for this port versus Caravan, the inspired sibling.
---

Dune ships two themes from the same upstream design:

- **[Caravan](https://themes.getdune.org/caravan)** — *inspired by* hugo-book.
  A Dune-native docs theme that borrows the sidebar idea and rebuilds it
  with curated colour schemes, a visitor-facing scheme switcher, and a
  lighter config surface.
- **This theme (Book)** — a **faithful port**. The goal isn't "similar,"
  it's "the same," down to the pixel.

## The stylesheet is upstream

`static/book.css` is the hugo-book SCSS bundle compiled as-is (defaults,
variables, normalize, utils, main, fonts, print, markdown, shortcodes,
custom — in Hugo's asset order), with all three theme mixins emitted under
`:root[data-book-theme=…]` selectors. Class names that exist upstream exist
here and do the same thing.

## Markup matches 1:1

Templates reproduce `baseof.html` and the `docs/` partials — brand,
filetree menu, mobile header, ToC, prev/next footer, clipboard helper,
menu-scroll restore, and the drifting-words `404.html`. Hugo constructs map
onto Dune equivalents; the *output* is what upstream would render for the
same content and options.

## Shortcodes carry over

Upstream shortcodes are MDX components with identical markup: `Hint`,
`Details`, `Tabs`/`Tab`, `Columns`, `Button`, `Steps`, `Katex`, `Mermaid`.
KaTeX and Mermaid assets ship in `static/` like upstream. See the
[Style Guide](/style-guide/) for a live walkthrough.

## Config keeps upstream names

`book_theme`, `book_search`, `book_toc`, `book_logo`, `book_section`, and
per-page `bookToC` mirror the corresponding `Book*` params. If you've
configured hugo-book before, you already know how to configure this.
