---
title: Elements — Twenty typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Twenty's no-sidebar inner pages.
taxonomy:
  tag: [elements, typography, twenty]
---

The landing page is six stacked sections deep. This post exists so `/blog` links land on
something that exercises the plain `wrapper.style4` inner-page layout instead of another
spotlight section.

## Headings

## Section heading (h2)

### Subsection (h3)

Twenty's landing sections already carry their own `major`/`special` header treatments —
keep in-post hierarchy shallow so it doesn't compete with them. A fourth level usually means
the post should split in two.

## Lists and quotes

- Banner CTAs, icon rows, and image spotlights belong on home; posts read as plain markdown
- Nested lists indent without borrowing a heading's type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the no-sidebar column

> A blockquote here should read like a pull-quote from a case study, not a banner slogan.

## Code

Inline `theme.name: twenty`, and a fence:

```ts
const banner = { title: "TWENTY", tagline: "for Dune demos" };
```

When you're done, return to [Home](/) and confirm the `#banner` landing shell comes back
with the alt header, not the inner-page nav.
