---
title: Two-column layout, sidebar, and search
date: 2026-03-15
template: post
published: true
summary: How Editorial's persistent sidebar maps onto Dune routes and this demo's config.
taxonomy:
  tag: [chrome, editorial, fidelity]
---

Upstream Editorial is a two-column magazine layout that never collapses
to a single-column home the way Aerial or Massively do: `#main` carries
the article, and `#sidebar` — search, `#menu`, recent posts, and an
about blurb — sits on the right on every route, home included. This
port keeps that split intact, driven by `demo-config.json` rather than
hard-coded copy.

- `#header`’s logo shows the site title plus `logo_suffix` (**“by
  HTML5 UP”** in this demo) — set via `components/layout.tsx`, not
  hard-coded markup
- `#sidebar`’s search form posts to Dune’s `/api/search` endpoint via
  the `#query` input, not a client-side Fuse index like the original
  static demo
- `#menu` inside the sidebar lists live site nav, with the active route
  flagged `class="active"` by comparing normalized paths
- The recent-posts mini-list and the About section (filled by
  `sidebar_blurb`) sit below `#menu`, in that order, on every route —
  scroll a long post and the sidebar stays visible via CSS positioning

Compare side-by-side with [html5up.net/editorial](https://html5up.net/editorial):
the sidebar’s proportions, the mini-post thumbnails, and the About
section copy should feel like the same family once `logo_suffix` and
`sidebar_blurb` are non-default. The visible “Design: HTML5 UP” line in
the sidebar `#footer` is required under CC BY while
`show_html5up_credit` is on — this demo leaves it on.

Honest Dune deviations: what was multi-page static HTML becomes
`/blog`, `/search`, `/archives`, and `/about` routes; contact-style
forms from the original HTML5 UP demo have no mail backend wired up.
There is no dark mode — Editorial upstream ships one design, and a Dune
dark lift would be a deliberate enhancement, not a fidelity requirement.
