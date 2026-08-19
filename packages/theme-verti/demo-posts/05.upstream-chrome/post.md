---
title: Verti chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Verti’s banner, feature boxes, and widget footer map onto Dune.
taxonomy:
  tag: [chrome, verti, fidelity]
---

Upstream Verti opens with `#header-wrapper` (logo, tagline span, `#nav`), a
boxed `#banner` with dual CTAs, three `box.feature` cards in
`#features-wrapper`, then `#main-wrapper`’s sidebar thumbnails + content
column, and a three-widget `#footer` under `#footer-wrapper`. On this Dune port
the header, banner, and footer live in `components/layout.tsx`; features and
the home content split live in `templates/default.tsx`, styled by vendored
`static/html5up/` CSS.

Compare side-by-side with [html5up.net/verti](https://html5up.net/verti):

- Banner CTAs resolve to Blog and About; feature cards cover Blog, Search, and
  Archives with featured images
- Sidebar Quick links tiles hit Blog, About, Search, and the upstream Verti
  page; the “Read the blog” button under them is live
- Landing footer widgets list Explore (Blog / Search / Archives / About),
  Resources (Dune / source / HTML5 UP), and Connect icons
- Inner pages use `no-sidebar` and a copyright-only footer; credit stays
  visible when `show_html5up_credit` is on

Honest Dune deviations: multi-page upstream HTML becomes `/blog`, `/search`,
`/archives`, `/about`; search is server-side `/api/search`; there is no contact
form backend in the footer. No dark mode — Verti upstream is one design; a Dune
lift may land later as an enhancement, not as fidelity.
