---
title: Configuring Arcana
date: 2026-03-08
template: post
published: true
summary: What each option changes on the live Arcana demo.
taxonomy:
  tag: [config, arcana]
---

Arcana keeps a small config surface — enough to brand the chrome without inventing schemes upstream never had. Here’s what this demo actually shows.

## `tagline`

Branding line in the chrome visitors see on every page. This demo sets a short Arcana-specific string via `demo-config.json` when present so the hero/sidebar doesn’t fall back to empty defaults. Change it when the demo should read as your product.

## `banner_title`

Home banner headline. Empty uses the theme’s upstream-style default. Seed a concrete line in the demo so side-by-side QA against html5up.net/arcana isn’t comparing against a placeholder.

## `show_banner`

When on, the landing shows the banner block before tiles/sections. Turn off only if you’re deliberately testing a bannerless home — most fidelity checks want it on.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY). Leave it on unless you hold a Pixelarity license — the toggle should hide every credit surface together, not orphan one in the footer.

## `footer_text`

Copyright name. Empty falls back to the site title. Prefer a short demo name when the title is long.


There is **no** dark mode or color-scheme preset in this port. Upstream Arcana is a single design; a Dune lift may land later as an enhancement, not as fidelity.

