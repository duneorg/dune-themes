---
title: Configuring Big Picture
date: 2026-03-08
template: post
published: true
summary: Intro headline, tagline, and credit — seeded for this demo.
taxonomy:
  tag: [config, big-picture]
---

## `banner_title` / `show_banner`

The fullscreen `#intro` headline defaults to **“Hey.”** — this demo keeps
that upstream voice. `show_banner: false` removes the first fullscreen
plane; useful for debugging, wrong for fidelity screenshots.

Empty title falls back to that same “Hey.” default in the schema — seed
only when you want a custom greeting.

## `tagline`

Appended after the welcome line (“Welcome to **Site** — tagline”). Seeded
as **“Scroll the picture.”** Empty falls back to the site description.

## `show_html5up_credit` / `footer_text`

Credit on; copyright name **Big Picture Demo**. One upstream design — no
dark mode toggle, no scheme presets. The “dark” classes on sections are
layout chrome for contrast over photography, not a user preference.
