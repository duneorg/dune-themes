---
title: Elements — Zerofour typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside ZeroFour’s article shell.
taxonomy:
  tag: [elements, typography, zerofour]
---

Home is mostly banner chrome plus a content panel. This post exists so `/blog`
links land on something that exercises the inner `article` + `header.major`
layout instead of another banner caption.

## Headings

## Section heading (h2)

### Subsection (h3)

ZeroFour’s banner already carries a heavy `<h2>` on home — keep in-post
hierarchy shallow so it doesn’t compete with that. A fourth level usually means
the post should split in two.

## Lists and quotes

- Banner CTAs and header nav belong on every page; posts read as plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in `#content`

> A blockquote here should read like a short annotation, not a banner slogan.

## Code

Inline `theme.name: zerofour`, and a fence:

```ts
const banner = { id: "#banner", cta: "/blog", taglineKey: "tagline" };
```

When you’re done, return to [Home](/) and confirm Explore still hits Blog with
the configured tagline visible in the banner.
