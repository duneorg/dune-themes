---
title: Configuring Halcyonic
date: 2026-03-08
template: post
published: true
summary: What this config surface actually controls on the live demo.
taxonomy:
  tag: [config, halcyonic]
---

Halcyonic’s schema stops at branding the banner and the copyright strip.
Upstream’s four feature cards and their routes are fixed page content in
`templates/default.tsx`, so there is no “feature title” knob to seed here.

## `banner_text`

Paragraph in the home `#banner` left column. This demo sets a concrete line via
`demo-config.json` so side-by-side QA against html5up.net/halcyonic isn’t
comparing against an empty fallback. Empty uses the site description, then the
upstream-style “Learn all about it here …” default.

## `banner_image`

URL for the bordered image in the banner’s right column. Empty keeps the
vendored `static/html5up/images/banner.jpg`. Only safe `http(s)` or site-relative
paths are accepted — the layout runs the value through `safeHref`.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#copyright`.
Leave it on unless you hold a separate Pixelarity license — the toggle should
hide every credit surface together, not orphan one in the footer while another
lingers elsewhere.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Halcyonic Demo”** via `demo-config.json` so the strip reads as a short demo
label instead of falling back to a long site title. Empty falls back to the
site title.

Because the schema stops there, Halcyonic’s fidelity comes from the fixed
header/banner/features markup — see this demo’s chrome post for what that
markup actually renders.
