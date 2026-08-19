---
title: Configuring Multiverse
date: 2026-03-08
template: post
published: true
summary: What this thin config surface actually controls on the live demo.
taxonomy:
  tag: [config, multiverse]
---

Multiverse has the smallest config surface in this theme set — just the
credit/copyright pair every HTML5 UP port needs. Upstream’s twelve gallery
thumbs and footer panel copy are fixed page content rather than schema knobs,
so there is no tagline or headline to seed here.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside the footer
panel’s `.copyright` on home and the compact inner footer elsewhere. Leave it
on unless you hold a separate Pixelarity license — the toggle should hide every
credit surface together, not orphan one in the footer while another lingers
elsewhere.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Multiverse Demo”** via `demo-config.json` so the footer reads as a short
demo label instead of falling back to a long site title. Empty falls back to
the site title.

Because the schema stops there, Multiverse’s fidelity comes entirely from the
fixed markup in `templates/default.tsx` and `GALLERY_ITEMS` — see this demo’s
chrome post for what that markup actually renders.
