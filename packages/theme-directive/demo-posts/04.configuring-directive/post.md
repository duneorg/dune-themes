---
title: Configuring Directive
date: 2026-03-08
template: post
published: true
summary: What each option changes on the live Directive demo.
taxonomy:
  tag: [config, directive]
---

Directive’s config surface brands the paper-plane header and copyright line — the
feature bands themselves are fixed markup in `templates/default.tsx`, not schema knobs.

## `banner_title`

`<h1>` text inside `#header` on the home landing. This demo sets **"Welcome to
Directive"** via `demo-config.json`. Empty falls back to `Hi. This is {site title}.`

## `tagline`

Paragraph under that headline in `#header`. This demo sets **"A paper-plane landing for
Dune"** so the hero doesn’t fall back to the site description. Empty uses the site
description, then a built-in default.

## `show_banner`

When on (default), the landing renders the full `#header` block — icon, title, tagline,
and Get Started button. Flip it off and home jumps straight into `#main` feature bands
with no paper-plane hero. Inner pages never show `#header` either way.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#footer .copyright`.
Leave it on unless you hold a separate Pixelarity license — the toggle should hide every
credit surface together, not orphan one in the footer while another lingers elsewhere.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets **"Directive
Demo"** so the footer reads as a short demo label instead of falling back to a long site
title. Empty falls back to the site title.

There is no dark mode or color-scheme preset in this port; a Dune lift may land later as
an enhancement, not as fidelity.
