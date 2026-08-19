---
title: Elements — Strongly Typed typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Strongly Typed’s boxed main column.
taxonomy:
  tag: [elements, typography, strongly-typed]
---

The home route is header, banner strip, and a post listing. This post exists so
`/blog` links land on something that exercises the `no-sidebar` inner layout
instead of another list card.

## Headings

## Section heading (h2)

### Subsection (h3)

Strongly Typed’s header and banner already carry display weight on home — keep
in-post hierarchy shallow so it doesn’t compete with that. A fourth level
usually means the post should split in two.

## Lists and quotes

- Banner strip and boxed nav belong in the chrome; posts read as plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the main column

> A blockquote here should read like a pull-quote from an essay, not a banner
> slogan.

## Code

Inline `theme.name: strongly-typed`, and a fence:

```ts
const home = { tagline: "header_tagline", banner: { show: "show_banner", text: "banner_text" } };
```

When you’re done, return to [Home](/) and confirm the banner strip still sits
between header and listing before you open another post.
