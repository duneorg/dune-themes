---
title: Parallelism chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Parallelism's horizontal scroll, masonry thumbs, and footer map onto Dune.
taxonomy:
  tag: [chrome, parallelism, fidelity]
---

Upstream Parallelism's whole home route is a single `#main` row: an intro
tile spanning two columns, then eight masonry thumbs cycling `span-1` through
`span-3` widths with staggered fade-in delays. On Dune, an inline script owns
the horizontal scroll: mouse wheel deltas (X or Y, whichever is larger) move
`main.scrollLeft`, arrow keys nudge it by 50px outside form fields, and two
invisible edge zones auto-scroll while hovered. Below 736px the script backs
off entirely and lets `overflow-x: auto` handle touch scrolling natively.

Compare against
[html5up.net/parallelism](https://html5up.net/parallelism):

- Wheel scroll should feel identical whether you're using a trackpad's
  natural horizontal gesture or a mouse wheel's vertical delta
- The edge scroll zones only exist above 736px — don't expect them on
  mobile widths, where native touch scroll takes over
- The `#footer` row below `#main` carries the "This is {site} —
  `home_subtitle`" sentence, the nav repeated as icon links, and the
  copyright row — all three should stay visible together

Honest deviations: upstream project pages become dated Dune posts tagged
`project`; search is server-side `/api/search`; no dark mode — one upstream
design, and a Dune lift would be a deliberate enhancement.
