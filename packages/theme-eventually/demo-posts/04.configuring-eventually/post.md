---
title: Configuring Eventually
date: 2026-03-08
template: post
published: true
summary: What each option changes on the live Eventually demo.
taxonomy:
  tag: [config, eventually]
---

Eventually has a deliberately thin config surface — upstream’s coming-soon page is mostly
fixed chrome, so the schema only brands the header line and copyright.

## `tagline`

Paragraph under the site title inside `#header`. This demo sets **"A coming-soon shell for
Dune"** via `demo-config.json`. Empty falls back to the site description; if that is also
empty, the paragraph is omitted entirely. Visible on every page, including the sparse
landing.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#footer .copyright`.
Leave it on unless you hold a separate Pixelarity license — the toggle should hide every
credit surface together, not orphan one in the footer while another lingers elsewhere.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets **"Eventually
Demo"** so the footer reads as a short demo label instead of falling back to a long site
title. Empty falls back to the site title.

There is no dark mode or color-scheme preset in this port; a Dune lift may land later as
an enhancement, not as fidelity. The rotating backgrounds and signup form are template
behavior, not config knobs.
