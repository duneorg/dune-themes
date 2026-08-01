---
title: Elements — Massively typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code in Massively’s post chrome.
taxonomy:
  tag: [elements, typography, massively]
---

## Headings

## Section heading (h2)

### Subsection (h3)

Massively’s `#intro` (full-screen title) and card grid are louder than
post bodies. This Elements leaf lives under `/blog` so its CTAs stay
real routes — it checks that an inner article, reached from a card,
still gets a readable type scale once you’re past the intro.

## Lists

- Buttons, icons, and card tiles belong on `#intro` and `#main`’s grid;
  posts use ordinary markdown lists instead
- Nested lists should indent without inventing a fourth heading level
  - Like this

1. Ordered lists share the same rhythm as unordered ones
2. Keep them short — Massively’s card excerpts are short too

> Blockquotes should read as citation, not as one of `#intro`’s promo
> buttons.

```ts
export const demo = { theme: "massively", introTitle: "Massively" };
```

When you’re done, return to [Blog](/blog) or [Home](/) and confirm
`#nav`’s active item still highlights correctly (trailing-slash safe),
and that `#intro` reappears if you navigate back to `/`.

