---
title: Elements — typography Forty actually paints
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, code, and buttons in Forty’s inner-page chrome.
taxonomy:
  tag: [elements, typography, forty]
---

Inner pages use the non-landing shell (`#main.alt`). This post dogfoods the
markdown surfaces the vendored stylesheet styles — so Elements isn’t a
separate style-guide route, it’s a normal `/blog` leaf the tiles can reach.

## Headings

## This is an h2 under the post title

### And an h3 for subsections

Forty’s type scale is bold and tight; if you need a fourth level, split
the post instead of inventing heading soup.

## Lists and quotes

- Unordered lists share body line-height
- Nested items indent without shrinking
  - Like this
1. Ordered lists use the same rhythm
2. Numbers don’t fight the indent

> Blockquotes get a clear left edge — enough to read as citation, not an alert.

## Code

Inline `like this`, and fences:

```ts
const tile = { title: "Blog", href: "/blog" };
```

## Actions

The theme’s button classes show up in banners and menus more than in
post bodies; use a normal markdown link when you need a CTA from a leaf:
[Back to the tile grid](/).
