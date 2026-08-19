---
title: Elements — Verti typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Verti’s article content column.
taxonomy:
  tag: [elements, typography, verti]
---

Home is a banner plus three feature boxes before the sidebar/content split.
This post exists so `/blog` links land on something that exercises the plain
`#main-wrapper` → `#content` → `article` inner layout instead of another
feature card caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Verti’s landing already uses large feature and banner headings — keep in-post
hierarchy shallow so it doesn’t compete with that. A fourth level usually means
the post should split in two.

## Lists and quotes

- Feature boxes, thumbnail grids, and widget footers belong on home; posts read
  as plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column article

> A blockquote here should read like a client quote pulled for a case study,
> not a banner slogan.

## Code

Inline `theme.name: verti`, and a fence:

```ts
const chrome = { banner: "#banner", features: "#features-wrapper", footer: "#footer" };
```

When you’re done, return to [Home](/) and confirm the banner’s Blog / About
buttons still resolve before you scroll the feature row again.
