---
title: Elements — Telephasic typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Telephasic’s no-sidebar main article.
taxonomy:
  tag: [elements, typography, telephasic]
---

The home route is a hero, feature rows, and a promo band. This post exists so
`/blog` links land on something that exercises the `#main` inner-page article
instead of another feature caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Telephasic’s hero and major headers already carry landing weight on home —
keep in-post hierarchy shallow so it doesn’t compete with that. A fourth level
usually means the post should split in two.

## Lists and quotes

- Hero, feature thumbnails, and the promo band belong on home; posts read as
  plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column article

> A blockquote here should read like a short client note, not a hero slogan.

## Code

Inline `theme.name: telephasic`, and a fence:

```ts
const hero = { titleKey: "hero_title", subtitleKey: "hero_subtitle", cta: "/blog" };
```

When you’re done, return to [Home](/) and confirm the logo still sits in the
nav gap before you scroll through the feature rows and promo band.
