---
title: Elements — Multiverse typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code inside Multiverse’s compact inner article.
taxonomy:
  tag: [elements, typography, multiverse]
---

The home route is a twelve-thumb gallery with a footer panel. This post exists
so `/blog` links land on something that exercises the compact
`#main.dune-inner` layout instead of another thumb caption.

## Headings

## Section heading (h2)

### Subsection (h3)

Multiverse’s thumb titles and panel headings already carry display weight on
home — keep in-post hierarchy shallow so it doesn’t compete with that. A fourth
level usually means the post should split in two.

## Lists and quotes

- Gallery thumbs, lightbox fulls, and panel icons belong on home; posts read as
  plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan in the compact article

> A blockquote here should read like a gallery wall note, not a thumb title.

## Code

Inline `theme.name: multiverse`, and a fence:

```ts
const panel = { icons: ["/blog", "/search", "/archives", "/about"], credit: true };
```

When you’re done, return to [Home](/) and confirm the footer panel still opens
cleanly over the thumb grid before you click through to Blog again.
