---
title: Dopetrope
template: blog
published: true
description: >
  Dopetrope adapted from HTML5 UP for Dune — #header with #nav and optional #banner
  over a magazine blog grid of boxed posts. Single upstream design; no dark mode or
  color-scheme presets in this port.
collection:
  items:
    "@page.children": "/blog"
  order:
    by: date
    dir: desc
  limit: 5
taxonomy:
  tag: [demo, blog, dopetrope]
---

Upstream [Dopetrope](https://html5up.net/dopetrope) is a magazine blog: site title and
`#nav` sit in `#header`, an optional `#banner` carries the hero headline on home, and
`#main` lays out posts as boxed cards in a two-column row. This Dune port keeps that
chrome but drives the card grid from the blog collection — Blog, Search, Archives, and
About stay as real nav targets instead of static HTML5 UP page files.
