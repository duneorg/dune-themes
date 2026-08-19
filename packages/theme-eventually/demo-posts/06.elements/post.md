---
title: Elements — Eventually content typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Eventually’s content panel.
taxonomy:
  tag: [elements, typography, eventually]
---

The home route is a coming-soon shell with almost no prose. This post exists so the thin
demo set still has something that exercises `.dune-content` under `body.is-content` —
readable type over the same rotating backgrounds, without pretending the landing grew a
feature grid.

## Headings

## Section heading (h2)

### Subsection (h3)

Eventually’s landing `#header` already owns the only display type on home — keep in-post
hierarchy shallow so it doesn’t compete when you open an inner page. A fourth level usually
means the post should split in two.

## Lists and quotes

- Signup fields and footer icons belong on the landing; posts read as plain markdown in
  the content panel
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan over the animated background

> A blockquote here should read like a launch-note aside, not a second hero tagline
> competing with `#header`.

## Code

Inline `theme.name: eventually`, and a fence:

```ts
const landing = { header: "#header", form: "#signup-form", bg: "#bg" };
```

When you’re done, return to [Home](/) and confirm the background rotator still cycles
after preload, then submit the signup form once to see the client-side thank-you message.
