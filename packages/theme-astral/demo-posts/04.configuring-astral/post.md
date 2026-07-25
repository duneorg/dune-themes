---
title: Configuring Astral
date: 2026-03-08
template: post
published: true
summary: Portrait, home subtitle, and credit — what this demo shows.
taxonomy:
  tag: [config, astral]
---

## `home_subtitle`

Copy under the intro `<h1>`. This demo sets **“Icon-nav portfolio panels
for Dune”** so the intro panel isn’t only a title. Empty falls back to the
site description — seed one string before screenshots.

## `avatar`

URL for the intro portrait / jumplink image. Empty uses the theme default
(`me.jpg` under static). Point it at your own portrait when the demo should
feel like a person, not a stock headshot. Paths should respect `basePath`
on multisite demos (use `/themes/astral/static/…` style URLs).

## `show_html5up_credit` / `footer_text`

Credit on; **Astral Demo** as copyright name. No dark mode — Astral
upstream is one design. Flip credit off only with a separate Pixelarity
license.
