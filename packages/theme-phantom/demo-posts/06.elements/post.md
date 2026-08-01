---
title: Elements — Phantom typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside a Phantom tile-grid post.
taxonomy:
  tag: [elements, typography, phantom]
---

The tile grid on `/blog` is loud on purpose — bold covers, alternating tile
sizes, hover states. This post exists so a real article under that grid still
reads as an article, not a bigger tile.

## Headings

## Section heading (h2)

### Subsection heading (h3)

Keep hierarchy shallow inside `#main`. Phantom's post view is a single
column with no sidebar, so a wall of h2/h3/h4 nesting reads worse here than
it would in a doc-style theme — split into a new post before you reach a
fourth level.

## Lists and quotes

- Tiles, the logo mark, and the slide-out `#menu` belong to the chrome —
  posts stick to ordinary markdown
- Nested lists indent without inventing a new type scale
  - like this nested item, still body-sized
1. Ordered lists share the same line-height as unordered ones
2. Numbers don't trigger a separate stylesheet

> A blockquote here should read as a citation against the plain `#main`
> background, not as a tile-grid callout.

## Code

Inline `tileStyleClass(index)`, and a fence:

```ts
export function tileStyleClass(index: number): string {
  return `style${(index % 6) + 1}`;
}
```

When you're done, open [Menu](#menu) or return to [Home](/) and confirm the
active tile/nav state didn't get stuck mid-transition.
