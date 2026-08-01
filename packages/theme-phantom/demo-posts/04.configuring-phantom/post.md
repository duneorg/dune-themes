---
title: Configuring Phantom
date: 2026-03-08
template: post
published: true
summary: Logo, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, phantom]
---

Phantom's config surface is three fields wide, and this demo sets two of them
so the tile grid and footer read as a finished site rather than a schema
table.

## `logo_url`

Left empty on this demo, which falls back to the vendored
`static/html5up/images/logo.svg` symbol mark in the header. Point it at your
own square-ish image when you want the header logo to carry brand identity —
Phantom's header is compact, so oversized images get cropped by the symbol
container rather than resized.

## `show_html5up_credit`

On here. The footer credit is required under CC BY when the toggle is on.
Flip it off only with a separate Pixelarity license; the gate should hide the
credit list item in the footer entirely, not just visually mute it.

## `footer_text`

Copyright name. This demo uses **Phantom Demo** so a long site title doesn't
crowd the compact footer row. Empty falls back to the site title.

There is no dark mode or color-scheme preset in this port — upstream Phantom
ships one design, and this demo shows exactly that design with real values
in every slot, not placeholders.
