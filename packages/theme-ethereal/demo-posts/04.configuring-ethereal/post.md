---
title: Configuring Ethereal
date: 2026-03-08
template: post
published: true
summary: What each option changes on the live Ethereal demo.
taxonomy:
  tag: [config, ethereal]
---

Ethereal’s config surface brands the banner panel and copyright line — spotlight panels and
the icon grid are fixed markup in `templates/default.tsx`.

## `banner_title`

Name spliced into the banner’s “Hello, my name is …” `<h1 class="major">` on the home
landing. This demo sets **"Welcome to Ethereal"**. Empty falls back to the site title.

## `tagline`

Paragraph under that major heading in `section.panel.banner`. This demo sets **"Panels and
spotlights for Dune"** so the banner doesn’t fall back to a long site description. Empty
uses the site description, then a built-in default.

## `show_banner`

When on (default), the landing renders the `panel.banner.right` block (copy + filtered
image + Next circle button). Flip it off and home starts at the first spotlight panel with
no intro banner. Inner pages never show the banner either way.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `.copyright` at the foot
of `#wrapper`. Leave it on unless you hold a separate Pixelarity license — the toggle
should hide every credit surface together.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets **"Ethereal Demo"**
so the credit line reads as a short demo label instead of falling back to a long site
title. Empty falls back to the site title.

There is no dark mode or color-scheme preset in this port; a Dune lift may land later as
an enhancement, not as fidelity.
