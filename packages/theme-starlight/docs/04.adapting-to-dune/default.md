---
title: Adapting to Dune
template: default
published: true
order: 4
metadata:
  description: The handful of places this port genuinely differs from upstream, and why.
---

## Search

Upstream uses Pagefind. This port keeps the modal shell (Ctrl/Cmd+K, same
dialog markup) but queries Dune's `/api/search`, with `site.basePath`
baked into the fetch URL for path-prefix multisite hosting. A dedicated
`/search` results page covers direct/bookmarked/no-JS navigation — upstream
is modal-only.

## Sidebar

Built from `navAll`: a page with children becomes a collapsible group (open
when it contains the current page), with the page itself as the group's
first link. Splash pages are excluded. Upstream's per-entry badges and
manual sidebar config are not reproduced.

## Heading ids + ToC

Marked doesn't emit heading ids; the theme adds them and builds a ToC of
h2–h3 with the injected "Overview" entry like upstream.

## Section indexes

The shared docs fixture uses `template: section` with a `collection`
block. Upstream has no separate section template — this port lists child
pages so those indexes stay navigable.

## Not ported

Pagefind, Expressive Code, `<StarlightPage>` API, plugins/overrides,
fallback-content notices, per-page sidebar badges, the full FileTree
per-extension icon map (~700 entries — generic seti icons instead), and
Astro image optimization for hero dark/light variants.
