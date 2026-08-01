---
title: Full-screen intro, nav, and card grid
date: 2026-03-15
template: post
published: true
summary: How Massively's home chrome maps onto Dune routes and this demo's config.
taxonomy:
  tag: [chrome, massively, fidelity]
---

Upstream Massively opens on a full-screen title card, then settles into
a logo header, a horizontal `#nav` bar, and a grid of post-excerpt
cards. This port keeps that exact structure, driven by
`demo-config.json` rather than hard-coded copy.

- `#intro` only renders on the home route (`/` or `/`, checked via
  `isHome` in `components/layout.tsx`) and only when `show_intro` is
  `true`, as it is in this demo. `intro_title` and `intro_subtitle` fill
  the `<h1>` and supporting paragraph
- The scroll-down button inside `#intro`
  (`a.button.icon.solid.solo.fa-arrow-down.scrolly`) is wired up by
  inline script to smooth-scroll to `#header` — click it and confirm the
  page eases down instead of jump-cutting
- `#nav` items come from Dune’s site nav, with the active item flagged
  `class="active"` by comparing the normalized route, not by upstream’s
  static per-page class

Compare side-by-side with [html5up.net/massively](https://html5up.net/massively):
the intro’s type scale, the header logo placement, and the post-card
rhythm in `#main` should feel like the same family. The visible “Design:
HTML5 UP” link in `#copyright` is required under CC BY while
`show_html5up_credit` is on — this demo leaves it on rather than testing
fidelity with the credit stripped.

Honest Dune deviations worth dogfooding: what was multi-page static HTML
becomes `/blog`, `/search`, `/archives`, and `/about` routes; search hits
server-side `/api/search` instead of a client-side Fuse index; and
contact-style forms from the original HTML5 UP demo have no mail backend
wired up. There is no dark mode — Massively upstream ships one design,
and a Dune dark lift would be a deliberate enhancement, not a fidelity
requirement.
