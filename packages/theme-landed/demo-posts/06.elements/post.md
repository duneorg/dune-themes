---
title: Elements — Landed typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Landed’s no-sidebar inner wrapper.
taxonomy:
  tag: [elements, typography, landed]
---

The home route is five sections deep before the footer. This post exists so
`/blog` links land on something that exercises the `#main.wrapper.style1`
inner-page layout instead of another spotlight caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Landed’s banner and spotlight headers already carry a heavy `major`-adjacent
weight on home — keep in-post hierarchy shallow so it doesn’t compete with
that. A fourth level usually means the post should split in two.

## Lists and quotes

- Spotlight images, icon cards, and scrolly “Next” controls belong on home;
  posts read as plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column wrapper

> A blockquote here should read like a product pull-quote, not a banner slogan.

## Code

Inline `theme.name: landed`, and a fence:

```ts
const spotlights = ["#one", "#two", "#three"].map((id) => ({ id, scrolly: true }));
```

When you’re done, return to [Home](/) and confirm each `.goto-next` still
lands on the next spotlight before you scroll into the feature grid.
