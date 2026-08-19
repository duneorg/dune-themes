---
title: Elements — Highlights typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Highlights’ inner-page shell.
taxonomy:
  tag: [elements, typography, highlights]
---

Home is three fullscreen special sections deep. This post exists so `/blog`
links land on something that exercises the compact major-header inner layout
instead of another section caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Highlights’ landing already uses `header.major` treatments on every section —
keep in-post hierarchy shallow so it doesn’t compete with that. A fourth level
usually means the post should split in two.

## Lists and quotes

- Goto-next cues, icons grids, and fullscreen images belong on home; posts read
  as plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the inner content column

> A blockquote here should read like a pulled quote, not a header tagline.

## Code

Inline `theme.name: highlights`, and a fence:

```ts
const flow = ["#header", "#one", "#two", "#three", "#footer"];
```

When you’re done, return to [Home](/) and confirm Begin still scrolls into
`#one` before you walk the icons grid again.
