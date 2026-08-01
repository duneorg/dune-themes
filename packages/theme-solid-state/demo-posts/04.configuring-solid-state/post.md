---
title: Configuring Solid State
date: 2026-03-08
template: post
published: true
summary: What this thin config surface actually controls on the live demo.
taxonomy:
  tag: [config, solid-state]
---

Solid State has the smallest config surface in this theme set — just the credit/copyright
pair every HTML5 UP port needs. Upstream's banner copy, spotlight sections, and feature
cards are fixed page content rather than schema knobs, so there's no tagline or headline to
seed here.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#footer .copyright` on
inner pages. Leave it on unless you hold a separate Pixelarity license — the toggle should
hide every credit surface together, not orphan one in the footer while another lingers
elsewhere.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets **"Solid State
Demo"** via `demo-config.json` so the footer reads as a short demo label instead of falling
back to a long site title. Empty falls back to the site title.

Because the schema stops there, Solid State's fidelity comes entirely from the fixed markup
in `templates/default.tsx` — see this demo's chrome post for what that markup actually
renders. There is no dark mode or color-scheme preset in this port; a Dune lift may land
later as an enhancement, not as fidelity.
