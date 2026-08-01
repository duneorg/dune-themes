---
title: Elements — Parallelism typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Parallelism's prose item.
taxonomy:
  tag: [elements, typography, parallelism]
---

Individual posts render as an `item prose span-3` block inside the same
horizontally-scrolling `#main` row as the masonry thumbs. This page exists so
that prose block gets tested with real markdown, not just a thumbnail caption.

## Headings

## Section heading (h2)

### Subsection heading (h3)

Keep nesting shallow — the `prose` item already competes for attention with
thumb tiles on either side of it in the scroll row. A fourth heading level
reads as noise at this width; split the post instead.

## Lists and quotes

- Masonry thumbs, span classes, and delay classes belong to the home grid;
  posts use ordinary markdown lists
- Nested items indent without inventing a new `span-*` width
  - like this nested item
1. Ordered lists share the same rhythm as the intro tile's body copy
2. Keep numbered steps short — the `item` column is narrower than a normal
   article column

> A blockquote here should read as quiet citation, not as another thumb
> caption competing for the scroll row's attention.

## Code

Inline `span-2`, and a fence:

```ts
export function spanClass(index: number): string {
  return SPANS[index % SPANS.length]!;
}
```

When you're done, scroll (wheel, arrow keys, or an edge zone) back to the
intro tile and confirm [Home](/) still sits at the start of the row.
