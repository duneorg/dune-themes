---
title: Elements — Dopetrope magazine type
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Dopetrope’s boxed post article.
taxonomy:
  tag: [elements, typography, dopetrope]
---

The home route is a magazine index: `#banner` above a grid of `section.box` cards. This
post exists so “Continue Reading” lands on something that exercises `article.box.post`
instead of another card caption. Pair it with the dedicated typography leaf if you want a
fuller markdown workout.

## Headings

## Section heading (h2)

### Subsection (h3)

Dopetrope’s banner already owns display type on home — keep in-post hierarchy shallow so
it doesn’t compete with that. A fourth level usually means the post should split in two.

## Lists and quotes

- Featured images and Continue Reading buttons belong on the blog grid; posts read as
  plain markdown inside the box
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column article

> A blockquote here should read like a pull quote from a magazine feature, not a second
> banner subtitle.

## Code

Inline `theme.name: dopetrope`, and a fence:

```ts
const blogCard = { wrapper: "section.box", cols: "col-6 col-12-small" };
```

When you’re done, return to [Home](/) and confirm `#nav` still marks the active route
before you scroll past the banner into the post grid.
