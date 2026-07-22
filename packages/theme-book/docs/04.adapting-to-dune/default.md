---
title: Adapting to Dune
template: default
published: true
order: 4
metadata:
  description: The handful of places this port genuinely differs from upstream, and why.
---

A faithful port still has to live inside Dune's architecture. These are the
intentional deviations — also listed in the package README.

## Search

Upstream builds a Fuse.js index at Hugo-build time. This port hits Dune's
server-side `/api/search` instead, with the same sidebar input/results
markup, a 10-hit cap, `/` and ⌘/Ctrl+K focus shortcuts, and a section crumb
when the API provides one. The dedicated `/search` route has no upstream
equivalent — it exists so direct/bookmarked/no-JS navigation still works.

## Theme selection

Upstream bakes one theme mixin into CSS at build time (`BookTheme`). This
port compiles light, dark, and auto into `book.css` and switches via
`data-book-theme` on `<html>`.

## Sidebar + prev/next

Rendered on the server from `TemplateProps.navAll`. Only the live search
box is an island. Collapsible `bookCollapseSection` menu entries are not
ported yet.

## Heading ids + ToC

Marked doesn't emit heading ids; the theme adds GitHub-style slugs and
builds the right-hand ToC from h2–h4 like Hugo's `.TableOfContents`.

## Page titles

Upstream example content opens each page with `# Title` in the markdown
body. Dune fixtures keep the title in frontmatter only — so when the body
doesn't already start with an `<h1>`, the template renders one from
frontmatter. Without that, desktop pages would only show the title in the
mobile header.

## Section indexes

Upstream `list.html` is empty (content-only). This port's `section`
template also lists child pages from a Dune `collection` block, which is
how the shared docs fixture builds section indexes.

## Not ported

GitInfo footer (last-modified / edit-this-page), comments, service worker /
PWA, `bookCollapseSection`, `asciinema` / `openapi` / `i18n` / `html` /
`image` / deprecated `section` shortcodes, taxonomy `term.html`, and the
posts layouts.
