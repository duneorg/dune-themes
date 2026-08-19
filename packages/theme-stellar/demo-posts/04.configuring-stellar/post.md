---
title: Configuring Stellar
date: 2026-03-08
template: post
published: true
summary: What this thin Stellar config surface actually controls on the live demo.
taxonomy:
  tag: [config, stellar]
---

Stellar has the smallest config surface in this theme set — just the
credit/copyright pair. Upstream’s logo header, spotlight, features, and
statistics bands are fixed page content rather than schema knobs, so there’s no
tagline or headline key to seed here.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) in the home
`#footer .copyright` and the inner-page footer. Leave it on unless you hold a
separate Pixelarity license — the toggle should hide every credit surface
together.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Stellar Demo”** via `demo-config.json` so the line reads as a short demo
label instead of falling back to a long site title. Empty falls back to the
site title.

Header tagline text still comes from the site description (with a built-in
fallback string). The logo image path is not a documented schema key in this
package — the layout uses the vendored SVG. See the chrome post for `#intro` /
`#first` / `#second` / `#cta`. There is no dark mode or color-scheme preset in
this port; a Dune lift may land later as an enhancement, not as fidelity.
