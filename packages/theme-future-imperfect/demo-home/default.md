---
title: Future Imperfect
template: blog
published: true
description: >
  Future Imperfect adapted from HTML5 UP for Dune — card grid with search/menu overlays.
  Single upstream design; no dark mode or color-scheme presets in this port.
collection:
  items:
    "@page.children": "/blog"
  order:
    by: date
    dir: desc
  limit: 5
taxonomy:
  tag: [demo, blog, future-imperfect]
---

Every article below carries the byline **Mara Solis**, set by `author_name` in
`demo-config.json` and rendered next to the avatar image on each card's meta
row. That's the fastest way to check the magazine grid is wired up: if the
name in the header doesn't match what's on the cards, the theme config isn't
reaching the `blog` template.

Upstream Future Imperfect's card-and-overlay pattern survives the port intact:
the flyout `#menu` (title links plus a search box) slides in from the right
when you tap the hamburger icon, and the inline search toggle in the header
opens a compact form without leaving the page. Neither overlay is decorative
— `#menu` reuses the same nav items as the header's `.links` row, and search
posts to Dune's `/api/search`, so results are real, not a static mockup.

Scroll past the cards and the pagination actions (`← Older` / `Newer →`) pick
up where the `limit: 5` collection cutoff leaves off. Open any card to reach
the Elements post for a typography sample, or the Configuring Future
Imperfect post, which walks through every knob this demo sets against the
live chrome instead of a schema table.
