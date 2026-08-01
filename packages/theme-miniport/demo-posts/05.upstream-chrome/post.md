---
title: Miniport chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Miniport's portrait-led scrolly home maps onto Dune templates.
taxonomy:
  tag: [chrome, miniport, fidelity]
---

Upstream Miniport pairs a fullbleed portrait with a headline, a short intro, and a single
scrolly CTA, then drops into an icon-tile grid pointing at the rest of the site. On this
Dune port that shell lives in `templates/default.tsx`, styled entirely by the vendored
`static/html5up/` CSS — this post exists so the demo explains what you're seeing instead of
shipping a generic clone.

Compare side-by-side with [html5up.net/miniport](https://html5up.net/miniport):

- The portrait + headline pairing (`hero_image` / `home_headline`) should feel like the same
  family as upstream's photo-led hero
- The four-box tile row below it (Blog, Search, Archives, About) stands in for upstream's
  project grid — icons come from a small rotation, not per-tile uploads
- Footer credit (`#copyright`) stays visible under `article.wrapper.style4` whenever
  `show_html5up_credit` is on
- Active nav in the top bar highlights correctly at mobile widths, trailing-slash safe

Honest Dune deviations: upstream's per-project detail pages become ordinary blog posts under
`/blog`; search is server-side `/api/search`, not a static filter; contact links have no
mail backend behind them. No dark mode — Miniport upstream is one design; a Dune lift may
land later as an enhancement, not as fidelity.
