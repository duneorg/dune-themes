---
title: Configuring Telephasic
date: 2026-03-08
template: post
published: true
summary: What this config surface actually controls on the live demo.
taxonomy:
  tag: [config, telephasic]
---

Telephasic’s schema brands the hero and the copyright strip. Feature rows,
promo band, and footer link lists are fixed in the layout and home template, so
there is no per-card headline knob to seed here.

## `hero_title`

`<h2>` inside the home `#hero`. This demo sets the familiar upstream-style
line via `demo-config.json` so side-by-side QA isn’t comparing against an empty
fallback. Empty uses “{site title} is a responsive site template by HTML5 UP”.

## `hero_subtitle`

Paragraph under the hero headline. This demo seeds a concrete Dune-specific
subtitle. Empty uses the site description, then the layout’s short default.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#copyright`
(and the landing footer’s HTML5 UP link remains a separate design attribution
surface). Leave the toggle on unless you hold a separate Pixelarity license —
credit surfaces should hide together.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Telephasic Demo”** via `demo-config.json` so the strip reads as a short demo
label instead of falling back to a long site title. Empty falls back to the
site title.

Because the schema stops there, Telephasic’s fidelity comes from the fixed
hero/feature/promo markup — see this demo’s chrome post for what that markup
actually renders.
