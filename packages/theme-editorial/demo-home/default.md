---
title: Editorial
template: blog
published: true
description: >
  Editorial adapted from HTML5 UP for Dune — editorial sidebar + featured article layout.
  Single upstream design; no dark mode or color-scheme presets in this port.
collection:
  items:
    "@page.children": "/blog"
  order:
    by: date
    dir: desc
  limit: 5
taxonomy:
  tag: [demo, blog, editorial]
---

Editorial's layout is two columns everywhere, not just on home: `#main`
carries the article on the left, and a persistent `#sidebar` — search,
menu, recent posts, and an about blurb — sits on the right on every
route. This demo names that sidebar copy explicitly instead of leaving
it to the site description; open a post below to see the same sidebar
follow you off the listing page.
