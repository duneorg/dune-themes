---
title: Elements — Solid State typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Solid State's inner-page wrapper.
taxonomy:
  tag: [elements, typography, solid-state]
---

The home route is four spotlight sections deep, each with its own `major`-styled heading.
This post exists so `/blog` links land on something that exercises the plain `#wrapper`
inner-page layout instead of another spotlight caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Solid State's spotlight sections already carry a heavier `major` heading treatment on home —
keep in-post hierarchy shallow so it doesn't compete with that. A fourth level usually means
the post should split in two.

## Lists and quotes

- Spotlight images, feature cards, and the slide-out menu belong on home; posts read as
  plain markdown
- Nested lists indent without borrowing a heading's type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column wrapper

> A blockquote here should read like a client quote pulled for a case study, not a banner
> slogan.

## Code

Inline `theme.name: solid-state`, and a fence:

```ts
const menu = { trigger: "#menu-link", closesOn: ["button", "outsideClick", "Escape"] };
```

When you're done, return to [Home](/) and confirm the slide-out menu still closes cleanly
before you scroll back through the spotlight sections.
