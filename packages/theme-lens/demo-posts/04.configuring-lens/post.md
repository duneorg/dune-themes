---
title: Configuring Lens
date: 2026-03-08
template: post
published: true
summary: Header tagline, credit, and copyright — what this live demo has set.
taxonomy:
  tag: [config, lens]
---

Lens keeps three knobs — enough to brand the fullscreen gallery header
without inventing settings the upstream design never had.

## `home_subtitle`

This demo sets **“A fullscreen thumbnail gallery for Dune demos”** via
`demo-config.json`. It renders as the `<p>` directly under the site title
in `#header`, right above the icon nav row — upstream Lens always shows a
tagline there, so leaving this empty (falling back to the site
description) is fine, but leaving *both* empty makes the header feel cut
off mid-sentence.

## `show_html5up_credit`

On in this demo. Gates the visible **HTML5 UP** credit line inside
`#footer`'s copyright list, required under CC BY whenever the toggle is
on. Turn it off only alongside a separate Pixelarity license — the switch
should hide every credit surface at once, not leave one orphaned.

## `footer_text`

Set to **“Lens Demo”** so the copyright line reads as a demo installation
rather than borrowing the site's own title, which may be long or generic.

There is **no** dark mode or color-scheme preset in this port — upstream
Lens ships one fullscreen design, and a Dune lift stays a future
enhancement rather than part of fidelity work.
