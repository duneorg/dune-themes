---
title: Elements — type inside Aerial’s content panel
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code once you leave the fullscreen shell.
taxonomy:
  tag: [elements, typography, aerial]
---

The landing is intentionally quiet. This post exists so `/blog` CTAs land
on something that exercises the **content panel** typography, not another
marketing paragraph.

## Headings

## Section (h2)

### Subsection (h3)

Aerial’s post chrome is calmer than business landings like Alpha — keep
hierarchy shallow. If you need a fourth level, split the article.

## Lists and quotes

- Unordered lists share body line-height
- Nested items indent without shrinking type
  - Like this nested item
1. Ordered lists use the same rhythm
2. Numbers don’t invent a second stylesheet

> Blockquotes should read as citation against the dark-adjacent panel,
> not as neon callouts.

## Code

Inline `theme.name: aerial`, and a fence:

```ts
const shell = { bg: true, overlay: true, contentPanel: !isHome };
```

When you’re done, hit [Home](/) and confirm the fullscreen shell returns —
that round-trip is the fidelity check this Elements page supports.
