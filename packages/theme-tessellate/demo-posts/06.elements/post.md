---
title: Elements — Tessellate typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Tessellate’s inner content band.
taxonomy:
  tag: [elements, typography, tessellate]
---

The home route is four dark scroll sections deep, each with its own section
heading. This post exists so `/blog` links land on something that exercises the
plain `section.main` + `content dark style1` inner-page layout instead of
another feature caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Tessellate’s landing already carries heavy section headers on home — keep
in-post hierarchy shallow so it doesn’t compete with that. A fourth level
usually means the post should split in two.

## Lists and quotes

- Icon features, gallery tiles, and scrolly CTAs belong on home; posts read as
  plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column content band

> A blockquote here should read like a note pulled from a case study, not a
> banner slogan.

## Code

Inline `theme.name: tessellate`, and a fence:

```ts
const sections = ["header", "first", "second", "third", "fourth", "footer"];
```

When you’re done, return to [Home](/) and confirm Explore still scrolls cleanly
into `#first` before you walk the gallery band again.
