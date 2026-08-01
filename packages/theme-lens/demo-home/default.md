---
title: Lens
template: default
published: true
description: >
  Lens adapted from HTML5 UP for Dune — fullscreen viewer / gallery chrome over image sets.
  Single upstream design; no dark mode or color-scheme presets in this port.
---

**A fullscreen thumbnail gallery for Dune demos** — set as `home_subtitle`
in `demo-config.json` — sits under the site title in the header, above the
icon row for Blog, Search, Archives, and About. That subtitle is the
fastest way to confirm theme config is reaching the header at all: an
empty string falls back to the site description, and a missing one leaves
the header looking unfinished.

Below the header, the fullscreen `#thumbnails` grid tiles twelve fixed demo
images from `static/html5up/images/thumbs/`, each linking to a real Dune
route — Blog, Search, Archives, About, and a few named after the project
posts (`project-alpha`, `project-beta`, `welcome`, `markdown`) so clicking
around actually goes somewhere instead of dead-ending on a static mockup.
Click any tile to see the same viewer chrome (`data-position="center"`)
that upstream Lens uses for `.thumbnail` links.

Scroll to the bottom for **See my work**, a single CTA into `/blog` — the
listing where the gallery's covered project posts live alongside the
theme's install, config, and chrome notes.
