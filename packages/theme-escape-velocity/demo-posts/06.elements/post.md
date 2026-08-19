---
title: Elements — Escape Velocity typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside the no-sidebar inner layout.
taxonomy:
  tag: [elements, typography, escape-velocity]
---

The home route is four titled wrappers deep. This post exists so `/blog` links land on
something that exercises the `no-sidebar` `#main.wrapper.style2` article instead of another
highlight caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Escape Velocity’s section `.title` strips and `header.style1` blocks already carry heavy
display treatment on home — keep in-post hierarchy shallow so it doesn’t compete. A fourth
level usually means the post should split in two.

## Lists and quotes

- Feature icons, highlight cards, and large style buttons belong on home; posts read as
  plain markdown inside `.box.post`
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the single-column content pane

> A blockquote here should read like a product note from a launch brief, not a second
> intro-section slogan.

## Code

Inline `theme.name: escape-velocity`, and a fence:

```ts
const sections = ["#intro", "#main", "#highlights", "#footer"];
```

When you’re done, return to [Home](/) and confirm `#nav` still highlights correctly before
you scroll through the intro → features → highlights stack.
