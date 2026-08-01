---
title: Massively
template: blog
published: true
description: >
  Massively adapted from HTML5 UP for Dune — hero intro + post cards.
  Single upstream design; no dark mode or color-scheme presets in this port.
collection:
  items:
    "@page.children": "/blog"
  order:
    by: date
    dir: desc
  limit: 5
taxonomy:
  tag: [demo, blog, massively]
---

Massively opens on `#intro`: a full-screen title, a one-line subtitle, and
a scroll-down arrow that reveals the `#header` logo and card grid below.
This demo keeps that intro on (`show_intro: true`) so the fold isn’t just
a bare header. Scroll past it, or jump straight into a post below, to see
the card-based blog listing upstream ships instead of static HTML pages.
