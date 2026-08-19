---
title: Configuring Strongly Typed
date: 2026-03-08
template: post
published: true
summary: What this config surface actually controls on the live demo.
taxonomy:
  tag: [config, strongly-typed]
---

Strongly Typed’s schema brands the header, the optional home banner, and the
copyright strip. Post column layout is fixed in the templates, so there is no
“type scale” knob to seed here.

## `header_tagline`

Paragraph under the logo in `#header`. This demo sets a concrete
typography-forward line via `demo-config.json` so the chrome doesn’t fall back
to an empty description. Empty uses the site description, then the layout’s
upstream-style default.

## `show_banner`

When on (and the route is home), the landing shows the `#banner` strip before
`#main`. This demo leaves it on. Turn off only if you’re deliberately testing a
bannerless home — most fidelity checks want it visible.

## `banner_text`

Copy inside the home banner strip. This demo seeds an introduction line via
`demo-config.json`. Empty keeps the layout’s “profound thoughts” default.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#copyright`
under `#main`. Leave it on unless you hold a separate Pixelarity license — the
toggle should hide every credit surface together.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Strongly Typed Demo”** via `demo-config.json` so the row reads as a short
demo label instead of falling back to a long site title. Empty falls back to
the site title.

Because the schema stops there, Strongly Typed’s fidelity comes from the fixed
header/banner markup — see this demo’s chrome post for what that markup
actually renders.
