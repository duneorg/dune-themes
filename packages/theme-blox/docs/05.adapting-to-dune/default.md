---
title: Adapting to Dune
template: post
published: true
order: 5
date: 2026-07-05
summary: Where this port differs from upstream Hugo Blox, and why.
---

## Author profiles

Inline in each block's `content.author` map instead of `content/authors/`
pages — Dune templates don't read arbitrary pages. `avatar` is a URL.

## Collections

Upstream queries `site.Pages` by folder. Landing pages declare a
`collections:` map and collection blocks reference them by name.

## Search

Modal shell matches upstream (Ctrl/Cmd+K); backend is `/api/search` with
`site.basePath` for path-prefix hosting. Dedicated `/search` page for
no-JS / bookmarked queries.

## Icons

Pruned set (~55) covering the Academic CV blocks, callouts, and common
social links — not the full upstream hero/brands/academicons packs.

## Blocks and shortcodes

Academic CV and marketing landing blocks are ported, plus `Callout`,
`Button`, `InlineIcon`, `Spoiler`, `Video`, and `Audio`. Still deferred:
`search-hero`, `help-categories` / `help-questions` — listed under
[Not in this port](../blocks-and-shortcodes/#not-in-this-port).

`team-showcase` takes inline `people` / `groups` (not `content/authors/`
pages). `portfolio` uses named collections + tag chips. `map` loads
MapLibre from a CDN when present. `gallery` supports grid/masonry/
justified/carousel/slideshow plus lightbox.

Also not ported: docs layout + sidebar/ToC, BibTeX cite button, cover
image processing, author taxonomy pages, Alpine author-note tooltips.
