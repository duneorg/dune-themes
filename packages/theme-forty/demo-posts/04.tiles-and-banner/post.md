---
title: Tiles, banner, and the slide-out menu
date: 2026-03-10
template: post
published: true
summary: How Forty’s landing chrome maps onto Dune fixtures.
taxonomy:
  tag: [chrome, forty, fidelity]
---

Upstream Forty leads with a full-bleed banner and a six-tile mosaic. This
port keeps that structure:

- `show_banner` / `banner_title` / `tagline` brand the hero without forking CSS
- Home tiles point at `/blog`, `/search`, `/archives`, `/about`, and sample posts
- `#menu` is the slide-out nav (open it on desktop and mobile)

There is no dark mode or multi-scheme switcher — upstream is one design.
Contact forms from the HTML5 UP demo are not connected to a mail backend.
