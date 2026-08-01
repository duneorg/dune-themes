---
title: Elements — Strata typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Strata's scrolling body.
taxonomy:
  tag: [elements, typography, strata]
---

The avatar header and thumbnail grid are the loud part of Strata. This post exists so
`/blog` links land on something that exercises ordinary post typography instead of another
thumbnail caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Strata's `#main` body already carries a `major` header style for section titles — keep
in-post hierarchy shallow so it doesn't compete with that. A fourth level usually means the
post should split in two.

## Lists and quotes

- Avatars, thumbnails, and work-item tiles belong on home; posts read as plain markdown
- Nested lists indent without borrowing a heading's type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan on mobile

> A blockquote here should read like a client testimonial, not a marketing callout.

## Code

Inline `theme.name: strata`, and a fence:

```ts
const header = { avatar: "avatar.jpg", tagline: "A visual studio built for Dune demos" };
```

When you're done, return to [Home](/) and confirm the icon footer still highlights the right
route (trailing-slash safe).
