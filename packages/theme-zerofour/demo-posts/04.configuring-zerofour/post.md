---
title: Configuring Zerofour
date: 2026-03-08
template: post
published: true
summary: What each ZeroFour config key actually changes on the live demo.
taxonomy:
  tag: [config, zerofour]
---

ZeroFour’s schema is the banner tagline plus the credit/copyright pair. There
are no hero headline knobs — the strong half of the banner always mirrors the
site title.

## `tagline`

Text after the site title inside `#banner h2` (`{title}: {tagline}`). This demo
sets **“Zerofour for Dune”** via `demo-config.json`. Empty falls back to the
site description, then a built-in “minimal page shell” sentence.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside
`#copyright`. Leave it on unless you hold a separate Pixelarity license — the
toggle should hide every credit surface together.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Zerofour Demo”** so the line reads as a short demo label instead of a long
site title. Empty falls back to the site title.

Banner presence is route-driven (home only), not a config flag — see the chrome
post for `#header-wrapper` / `#banner` behavior. There is no dark mode or
color-scheme preset in this port; a Dune lift may land later as an enhancement,
not as fidelity.
