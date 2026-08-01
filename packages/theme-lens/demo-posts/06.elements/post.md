---
title: Elements — reading inside Lens's content panel
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code once you leave the fullscreen grid.
taxonomy:
  tag: [elements, typography, lens]
---

The home grid is all image and no prose. This post exists so clicking a
tile lands on something that actually exercises the `.content-panel`
typography Lens's stylesheet defines, not another thumbnail.

## Headings

## Section heading (h2)

### Subsection (h3)

Lens's viewer chrome is quiet by design — the content panel keeps that
same calm register. Stay to two heading levels; if a project write-up
needs a third, it's really two posts.

## Lists and quotes

- Thumbnails and the icon nav belong on `/`; posts use plain markdown
- Nested lists indent without inventing a fourth heading level
  - Like this nested item
- The lightbox overlay never appears inside a content panel

1. Ordered lists share the same rhythm as the rest of the body
2. Keep captions short — this is a gallery theme, not a manual

> Blockquotes should read as a photographer's note, not a promo callout
> competing with the thumbnail grid for attention.

## Code

Inline `theme.name: lens`, and a fence:

```ts
const tile = { thumb: "thumbs/07.jpg", href: "/blog/project-alpha" };
```

Return to [Home](/) and confirm the fullscreen grid comes back with all
twelve tiles intact — that's the round-trip this Elements leaf checks.
