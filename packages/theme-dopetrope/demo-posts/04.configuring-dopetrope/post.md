---
title: Configuring Dopetrope
date: 2026-03-08
template: post
published: true
summary: What each option changes on the live Dopetrope demo.
taxonomy:
  tag: [config, dopetrope]
---

Dopetrope keeps a small config surface — enough to brand the chrome without inventing schemes upstream never had. Here’s what this demo actually shows.

## `show_banner`

When on, the landing shows the banner block before tiles/sections. Turn off only if you’re deliberately testing a bannerless home — most fidelity checks want it on.

## `banner_title`

Home banner headline. Empty uses the theme’s upstream-style default. Seed a concrete line in the demo so side-by-side QA against html5up.net/dopetrope isn’t comparing against a placeholder.

## `banner_subtitle`

See `theme.yaml` for the schema default. On this demo, leave it at a value that makes Dopetrope’s upstream chrome visible — don’t ship a demo that hides the design you’re trying to show.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY). Leave it on unless you hold a Pixelarity license — the toggle should hide every credit surface together, not orphan one in the footer.

## `footer_text`

Copyright name. Empty falls back to the site title. Prefer a short demo name when the title is long.


There is **no** dark mode or color-scheme preset in this port. Upstream Dopetrope is a single design; a Dune lift may land later as an enhancement, not as fidelity.

