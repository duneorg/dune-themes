---
title: Configuring Landed
date: 2026-03-08
template: post
published: true
summary: What this config surface actually controls on the live demo.
taxonomy:
  tag: [config, landed]
---

Landed’s schema brands the banner and the copyright strip. Spotlight copy,
feature icons, and CTA routes are fixed in `templates/default.tsx`, so there
is no per-section headline knob to seed here.

## `banner_title`

`<h2>` inside the home `#banner`. This demo sets **“The future has landed”**
via `demo-config.json` so fidelity checks match the familiar upstream line.
Empty keeps that same default string in the template.

## `tagline`

Subtitle paragraph under the banner headline. This demo seeds a short
Landed-for-Dune sentence so the hero doesn’t fall back to a long site
description. Empty uses the site description, then the classic upstream apps
subtitle.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside `#footer
.copyright` on both the landing footer and inner-page footer. Leave it on
unless you hold a separate Pixelarity license — the toggle should hide every
credit surface together.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Landed Demo”** via `demo-config.json` so the footer reads as a short demo
label instead of falling back to a long site title. Empty falls back to the
site title.

Because the schema stops there, Landed’s fidelity comes from the fixed
spotlight markup and `.scrolly` behavior — see this demo’s chrome post for
what that markup actually renders.
