---
title: Tiles, banner, and the slide-out menu
date: 2026-03-10
template: post
published: true
summary: How Forty’s landing chrome maps onto Dune fixtures and CTAs.
taxonomy:
  tag: [chrome, forty, fidelity]
---

Upstream Forty leads with a full-bleed `#banner` and a six-tile mosaic.
This port keeps that structure on `/` and `/home`, driven by this
demo’s `demo-config.json`: `show_banner` is `true`, so `#banner.major`
renders with `banner_title` set to **“Hi, this is Forty”** instead of
the schema default “Hi, my name is {site title}”, and the `#header`
logo carries `tagline` (**“for Dune”**) next to the bold site title.

- The banner CTA and the menu’s stacked primary action both point at
  `/blog`, built from Dune fixtures and this theme’s own posts — not a
  dead HTML5 UP anchor
- The six tiles deep-link to Blog, Search, Archives, About, and sample
  posts, each rendered as a `major` article with a background image
  pulled from `static/html5up/images/`
- `#menu` is the slide-out nav toggled by the `a[href="#menu"]` link in
  `#header`; it adds `is-menu-visible` to `<body>`, and clicking outside
  the menu or pressing Escape closes it again — the same interaction
  upstream ships, reimplemented as inline script in `components/layout.tsx`

Compare side-by-side with [html5up.net/forty](https://html5up.net/forty).
You’re checking the `alt` header class on the landing route, the major
tile articles, and that the stacked “Get Started” action in the menu
still reads correctly once `banner_title` and `tagline` are non-default.
Contact forms from the static HTML5 UP demo are not wired to a mail
backend; Dune search goes through `/api/search` instead of a client-side
Fuse index.
