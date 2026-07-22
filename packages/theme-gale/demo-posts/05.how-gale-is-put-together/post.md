---
title: How Gale is put together
date: 2026-07-22
template: post
published: true
summary: Layout-owned hero, blog cards, and what stays out of the template set.
taxonomy:
  tag: [customization, gale]
---

Gale is a **landing + blog** theme. The homepage hero and feature grid
live in `components/layout.tsx` so every route shares one chrome, and
only `/` (and `/home/`) get the marketing band.

## Templates

| Template | Role |
| --- | --- |
| `default` | Plain pages (About, etc.) |
| `blog` | Card grid — home teaser and `/blog/` |
| `post` | Single article |
| `archives` | Year / month grouping |
| `search` / `error` | Themed search and 404 |

## Inspired, not a port

AstroWind’s shape (sticky header, dual CTAs, feature grid, blog cards)
informed the layout. Markup, CSS, and config are Dune-native — there is
no upstream stylesheet to keep in sync.
