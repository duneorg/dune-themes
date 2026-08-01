---
title: Elements — TXT typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside TXT's boxed post layout.
taxonomy:
  tag: [elements, typography, txt]
---

The banner and feature grid are the loud part of TXT's home. This post exists so `/blog`
links land on something that exercises the `.box.page-content` article wrapper instead of
another feature caption.

## Headings

## Section heading (h2)

### Subsection (h3)

TXT's boxed layout already gives section titles a `major` treatment on home — keep in-post
hierarchy shallow so it doesn't compete with that. A fourth level usually means the post
should split in two.

## Lists and quotes

- Feature tiles and banner CTAs belong on home; posts read as plain markdown
- Nested lists indent without borrowing a heading's type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan inside the boxed column

> A blockquote here should read like a pulled note from an essay, not a promo sticker.

## Code

Inline `theme.name: txt`, and a fence:

```ts
const banner = { tagline: "Notes, essays, and short-form writing on Dune" };
```

When you're done, return to [Home](/) and confirm the sidebar/top nav still highlights the
right route (trailing-slash safe).
