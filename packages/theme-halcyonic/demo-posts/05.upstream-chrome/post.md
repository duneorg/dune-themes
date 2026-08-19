---
title: Halcyonic chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Halcyonic’s banner, feature grid, and copyright strip map onto Dune.
taxonomy:
  tag: [chrome, halcyonic, fidelity]
---

Upstream Halcyonic is a classic business landing: `#header` carries the logo
and `#nav`, then `#banner` splits into copy/CTA and a bordered image, then
`#features` presents four equal columns. On this Dune port that shell lives in
`components/layout.tsx` (header, banner, copyright) and
`templates/default.tsx` (feature grid + home body), styled by the vendored
`static/html5up/` CSS — this post exists so the demo explains what you’re
seeing instead of shipping a generic clone.

Compare side-by-side with [html5up.net/halcyonic](https://html5up.net/halcyonic):

- `#banner` shows `banner_text` and `banner_image`, with the large button wired
  to `/blog`
- `#features` cards resolve to Blog, About, Archives, and the upstream design
  page — not dead `#` anchors
- Inner pages use the `subpage` body class and a single `#content` column
- `#copyright` keeps year, `footer_text`, and the HTML5 UP credit whenever
  `show_html5up_credit` is on

Honest Dune deviations: upstream’s multi-page HTML becomes ordinary routes
under `/blog`, `/search`, `/archives`, and `/about`; search is server-side
`/api/search`, not a static filter; there is no contact form mail backend behind
the chrome. A Dune lift may land later as an enhancement, not as fidelity.
