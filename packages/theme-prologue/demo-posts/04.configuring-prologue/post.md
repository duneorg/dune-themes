---
title: Configuring Prologue
date: 2026-03-08
template: post
published: true
summary: What each Prologue config key actually changes on the live demo.
taxonomy:
  tag: [config, prologue]
---

Prologue’s schema brands the sidebar tagline and footer — cover copy,
portfolio tiles, and contact actions stay fixed markup in
`templates/default.tsx`. Here’s what this demo sets.

## `home_subtitle`

Tagline under the site title inside `#logo` on the fixed sidebar. This demo
sets **“Prologue for Dune”** via `demo-config.json`. Empty falls back to the
site description, then a built-in “responsive site template” sentence.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#footer`
`.copyright`. Leave it on unless you hold a separate Pixelarity license — the
toggle should hide every credit surface together.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Prologue Demo”** so the line reads as a short demo label instead of a long
site title. Empty falls back to the site title.

The avatar image path is not a documented schema key in this package — the
layout uses the vendored `avatar.jpg`. Cover headline text still mirrors the
site title inside `#top`. See the chrome post for `#portfolio` / `#about` /
`#contact`. There is no dark mode or color-scheme preset in this port; a Dune
lift may land later as an enhancement, not as fidelity.
