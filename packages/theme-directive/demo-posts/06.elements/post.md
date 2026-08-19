---
title: Elements — Directive typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Directive’s boxed inner layout.
taxonomy:
  tag: [elements, typography, directive]
---

The home route is a paper-plane `#header` plus three feature bands. This post exists so
`/blog` links land on something that exercises the plain `.box.container` inner-page
layout instead of another feature caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Directive’s landing `#header` already carries a heavy display treatment — keep in-post
hierarchy shallow so it doesn’t compete with that. A fourth level usually means the post
should split in two.

## Lists and quotes

- Feature images, icon spans, and major CTAs belong on home; posts read as plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column box

> A blockquote here should read like a product note pulled from a brief, not a banner
> slogan sitting under the paper-plane icon.

## Code

Inline `theme.name: directive`, and a fence:

```ts
const header = { id: "header", icon: "fa-paper-plane", showsOn: "landing" };
```

When you’re done, return to [Home](/) and confirm the feature bands still alternate
left/right before you scroll into the major footer CTA.
