---
title: Configuring Aerial
date: 2026-03-08
template: post
published: true
summary: Tagline, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, aerial]
---

Aerial’s config surface is small on purpose. Upstream is a single light
fullscreen design; this port does not invent dark mode or color schemes.

## `tagline`

The line under the site title in the header. This demo sets **“A fullscreen
landing for Dune demos”** via `demo-config.json`. Empty falls back to the
site description — if both are empty the hero feels unfinished, so seed
one string before you screenshot.

## `show_html5up_credit`

On here. The footer credit is required under CC BY when the toggle is on.
Flip it off only with a separate Pixelarity license; the gate should hide
every credit surface together.

## `footer_text`

Copyright name. This demo uses **Aerial Demo** so a long site title doesn’t
crowd the footer. Empty falls back to the site title.

You’re reading the result of these values on the live demo — not a schema
table about hypothetical knobs.
