---
title: Configuring Miniport
date: 2026-03-08
template: post
published: true
summary: Portrait, headline, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, miniport]
---

Miniport's config surface stays close to what upstream actually exposes: a portrait, a
headline next to it, and the credit/copyright pair every HTML5 UP port needs. Nothing here
invents a color scheme the original design never had.

## `hero_image`

The portrait beside the headline on `/` and `/home`. This demo leaves it at the theme
default (`pic00.jpg` from vendored `static/html5up/images/`) so the scrolly hero renders
without depending on an external URL staying online. Point it at your own portrait on a
real site.

## `home_headline`

The line next to the portrait. This demo sets **"Field Notes Studio"** via
`demo-config.json` so the hero reads like a working photographer's folio instead of a bare
site title. Empty falls back to the page title, then the site title.

## `show_html5up_credit`

On here. The footer link back to HTML5 UP is required under CC BY while the toggle is on;
turn it off only alongside a separate Pixelarity license, and hide every credit surface
together, not just the footer line.

## `footer_text`

Copyright name. This demo uses **Miniport Demo** so the footer stays short instead of
repeating a long site title.

There is no dark mode or color-scheme preset in this port — Miniport upstream ships one
design, and a Dune lift may land later as an enhancement, not as fidelity.
