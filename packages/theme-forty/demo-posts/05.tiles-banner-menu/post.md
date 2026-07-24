---
title: Tiles, banner, and the slide-out menu
date: 2026-03-10
template: post
published: true
summary: How Forty’s landing chrome maps onto Dune fixtures and CTAs.
taxonomy:
  tag: [chrome, forty, fidelity]
---

Upstream Forty leads with a full-bleed banner and a six-tile mosaic. This
port keeps that structure on `/` and `/home`:

- Banner CTA and menu primary action point at `/blog` (fixture + theme posts)
- Tiles deep-link to Blog, Search, Archives, About, and sample posts
- `#menu` is the slide-out nav — open it on desktop and mobile; Esc / overlay
  click should close it the way upstream does

Compare with [html5up.net/forty](https://html5up.net/forty). You’re looking
for the alt header on the landing, major tile articles with background
images from `static/html5up/images/`, and the stacked “Get Started” action
in the menu. Contact forms from the static HTML5 UP demo are not connected
to a mail backend; Dune search is `/api/search`.
