---
title: Configuring Paradigm Shift
date: 2026-03-08
template: post
published: true
summary: Tagline, banner headline, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, paradigm-shift]
---

Paradigm Shift's intro section reads two config fields directly, so this demo
seeds both instead of falling back to generated placeholders.

## `tagline`

The line under the intro headline, shown only on home inside the full-height
`section.intro`. This demo sets **"A responsive scroll landing for Dune
demos"** so the intro never renders with an empty second line under
`banner_title`.

## `banner_title`

The intro `<h1>`. Empty falls back to the site title. This demo sets
**"Paradigm Shift"** explicitly — short enough to sit comfortably next to the
arrow-scroll cue without wrapping awkwardly at narrow widths.

## `show_html5up_credit`

On here. Gates the CC BY credit line in the closing "Get in touch" section
and the footer copyright row. Leave it on unless you hold a separate
Pixelarity license — the toggle should hide both credit surfaces together.

## `footer_text`

Copyright name. This demo uses **Paradigm Shift Demo** so the footer
copyright line under the icon list stays short regardless of the configured
site title.

There is no dark mode or color-scheme preset in this port. Upstream Paradigm
Shift is a single design; a Dune lift may land later as an enhancement, not
as fidelity work.
