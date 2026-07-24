---
title: Configuring Photon
date: 2026-03-08
template: post
published: true
summary: Avatar, tagline, and credit — what this demo shows on the hero.
taxonomy:
  tag: [config, photon]
---

Photon’s config is intentionally thin so the upstream single-page portfolio
shell stays intact.

## `tagline`

Hero supporting copy under the title. This demo sets **“A gallery-style
portfolio for Dune”** via `demo-config.json`. Empty falls back to the site
description — if both are empty the hero feels unfinished, so seed one.

## `avatar`

Optional image URL for themes that surface a portrait in the header. Leave
empty to keep the default Photon treatment; set an absolute or site-relative
URL when the demo should feel branded to a person or studio.

## `show_html5up_credit`

On here. Footer credit stays visible for CC BY. No dark mode or schemes —
Photon upstream is one light portfolio design.
