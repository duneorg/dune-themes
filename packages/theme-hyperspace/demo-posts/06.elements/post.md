---
title: Elements — inside Hyperspace's content section
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code once you scroll past the full-screen intro.
taxonomy:
  tag: [elements, typography, hyperspace]
---

The intro is one headline, one subtitle, and a scroll button — nothing to
dogfood typography against. This post exists so `#content` has something
that actually exercises headings, lists, and code once you're past it.

## Headings

## Section heading (h2)

### Subsection (h3)

Hyperspace's intro is louder than any post body needs to be. Keep
hierarchy to two levels inside `#content` — a third level starts competing
with the fixed sidebar's own nav labels for attention.

## Lists and quotes

- Sidebar nav and the intro's scroll button belong on every page; posts use plain markdown
- Nested lists indent without inventing a fourth heading level
  - Like this nested item
- The fullscreen intro never appears twice on the same route

1. Ordered lists share the same rhythm as the rest of the body
2. Numbers don't reset margin or type size

> Blockquotes should read as a quiet citation against the dark content
> panel, not as a second intro headline.

## Code

Inline `theme.name: hyperspace`, and a fence:

```ts
const intro = { title: "Hyperspace", subtitle: "A responsive sidebar landing for Dune demos" };
```

Return to [Home](/) and confirm the full-screen intro fades back in above
this same content section — that round-trip is what this Elements leaf
checks.
