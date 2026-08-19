---
title: Elements — Stellar typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Stellar’s inner content section.
taxonomy:
  tag: [elements, typography, stellar]
---

Home is a spotlight plus features, statistics, and CTA sections. This post
exists so `/blog` links land on something that exercises the plain
`#content.main` inner layout instead of another spotlight caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Stellar’s landing already uses `header.major` on every band — keep in-post
hierarchy shallow so it doesn’t compete with that. A fourth level usually means
the post should split in two.

## Lists and quotes

- Spotlights, icon features, and statistics belong on home; posts read as plain
  markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in `#content`

> A blockquote here should read like a pulled quote, not a CTA slogan.

## Code

Inline `theme.name: stellar`, and a fence:

```ts
const sections = ["intro", "first", "second", "cta", "footer"];
```

When you’re done, return to [Home](/) and confirm the alt header logo still
sits above `#nav` before you scroll the spotlight again.
