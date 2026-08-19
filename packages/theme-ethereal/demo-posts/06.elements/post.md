---
title: Elements — Ethereal panel typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Ethereal’s inner panel.
taxonomy:
  tag: [elements, typography, ethereal]
---

The home route is a stack of panels with `major` headings. This post exists so `/blog`
links land on something that exercises the plain `section.panel > .inner` layout instead of
another spotlight caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Ethereal’s banner and spotlight panels already carry heavy `major` treatment on home —
keep in-post hierarchy shallow so it doesn’t compete. A fourth level usually means the
post should split in two.

## Lists and quotes

- Filtered images, grid icons, and circle actions belong on home; posts read as plain
  markdown inside the panel
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column inner pane

> A blockquote here should read like a quiet aside in a portfolio note, not a second
> banner tagline.

## Code

Inline `theme.name: ethereal`, and a fence:

```ts
const panels = ["banner", "spotlight", "color1", "spotlight"];
```

When you’re done, return to [Home](/) and confirm the icon grid still resolves Blog /
Search / Archives / About before you scroll back through the spotlights.
