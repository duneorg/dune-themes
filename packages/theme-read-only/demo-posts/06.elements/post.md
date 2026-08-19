---
title: Elements — Read Only typography
date: 2026-03-18
template: post
published: true
summary: Headings, lists, quotes, and code beside Read Only’s resume sidebar.
taxonomy:
  tag: [elements, typography, read-only]
---

The home route is a post listing beside the sidebar. This post exists so
`/blog` links land on something that exercises the `#main` reading column
instead of another list card.

## Headings

## Section heading (h2)

### Subsection (h3)

Read Only’s sidebar logo and tagline already carry identity weight — keep
in-post hierarchy shallow so it doesn’t compete with that. A fourth level
usually means the post should split in two.

## Lists and quotes

- Avatar, sidebar nav, and titleBar toggle belong in the chrome; posts read as
  plain markdown
- Nested lists indent without borrowing a heading’s type size
  - Like this nested item
1. Ordered lists share the same rhythm as unordered ones
2. Keep them short enough to scan beside the sidebar

> A blockquote here should read like a résumé excerpt, not a sidebar slogan.

## Code

Inline `theme.name: read-only`, and a fence:

```ts
const sidebar = { avatar: "avatar_url", tagline: "sidebar_tagline", toggle: "#titleBar" };
```

When you’re done, return to [Home](/) and confirm the titleBar toggle still
opens the sidebar cleanly at mobile width before you scroll the post list.
