---
title: Elements — Editorial typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code in Editorial’s post chrome.
taxonomy:
  tag: [elements, typography, editorial]
---

## Headings

## Section heading (h2)

### Subsection (h3)

Editorial’s `#sidebar` — search, `#menu`, recent posts, about blurb —
is louder and busier than a post body. This Elements leaf lives under
`/blog` next to that sidebar, so it checks that `#main`’s article column
still gets a readable, calm type scale beside all that chrome.

## Lists

- The sidebar’s recent-posts mini-list and `#menu` use their own
  markup; posts use ordinary markdown lists instead
- Nested lists should indent without inventing a fourth heading level
  - Like this

1. Ordered lists share the same rhythm as unordered ones
2. Keep them short — the sidebar’s About blurb is short too

> Blockquotes should read as citation, not as one of the sidebar’s
> boxed sections.

```ts
export const demo = { theme: "editorial", logoSuffix: "by HTML5 UP" };
```

When you’re done, return to [Blog](/blog) or [Home](/) and confirm
`#menu`’s active item still highlights correctly (trailing-slash safe),
and that the sidebar’s About section still shows `sidebar_blurb`
rather than falling back silently to an empty description.

