---
title: Configuring Helios
date: 2026-03-08
template: post
published: true
summary: Tagline, banner, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, helios]
---

Helios has the widest config surface in this batch of ports, because the
upstream design has both a header tagline and a separate home banner headline
to seed.

## `tagline`

The line under the site title in the page-wrapper header, shown on every
route when set. This demo sets **"A carousel landing for Dune demos"** so the
header never falls back to the raw site description mid-QA.

## `banner_title`

Home banner headline, rendered inside `#banner` above the carousel reel. Empty
falls back to `Hi. You're looking at {site title}.` — this demo seeds the
same phrasing explicitly so a side-by-side check against
[html5up.net/helios](https://html5up.net/helios) isn't comparing against a
generated placeholder.

## `show_banner`

On here. Turning it off skips straight to the carousel reel — useful for
testing a bannerless variant, but most fidelity passes want the banner
visible since it's most of Helios's first viewport.

## `show_html5up_credit`

On. Gates the visible HTML5 UP credit line in the footer (CC BY). Leave it on
unless you hold a separate Pixelarity license.

## `footer_text`

Copyright name — **Helios Demo** here, so the footer stays short regardless
of the configured site title.

No dark mode in this port; upstream Helios is a single design.
