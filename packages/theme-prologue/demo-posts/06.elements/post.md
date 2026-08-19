---
title: Elements — Prologue typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Prologue’s main section shell.
taxonomy:
  tag: [elements, typography, prologue]
---

Home is a cover plus portfolio, about, and contact sections beside the fixed
sidebar. This post exists so `/blog` links land on something that exercises the
plain `#main` section wrapper instead of another cover caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Prologue’s landing already uses large section headers in `#top` and
`#portfolio` — keep in-post hierarchy shallow so it doesn’t compete with that.
A fourth level usually means the post should split in two.

## Lists and quotes

- Sidebar icons, portfolio tiles, and scrolly CTAs belong on home; posts read as
  plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan beside the fixed sidebar

> A blockquote here should read like a bio aside, not a cover slogan.

## Code

Inline `theme.name: prologue`, and a fence:

```ts
const sections = ["top", "portfolio", "about", "contact"];
```

When you’re done, return to [Home](/) and confirm Explore still scrolls into
`#portfolio` before you click through the grid again.
