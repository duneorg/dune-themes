---
title: TXT chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How TXT's banner, boxed intro, and feature grid map onto Dune templates.
taxonomy:
  tag: [chrome, txt, fidelity]
---

Upstream TXT stacks a slim logo header, a top nav, a scrolly `#banner` welcome section (home
only), then a boxed `highlight` intro over a `features` grid inside `#main`. On this Dune
port that shell lives across `components/layout.tsx` and `templates/default.tsx`, styled by
the vendored `static/html5up/` CSS — this post exists so the demo explains what you're
seeing instead of shipping a generic clone.

Compare side-by-side with [html5up.net/txt](https://html5up.net/txt):

- Logo + `tagline` in `#header`, plus the scrolly "Alright let's go" banner CTA, should feel
  like the same family as upstream
- `.box.highlight` carries this page's intro copy and a "Get Started" CTA into `/blog`
- `.box.features` below it is a four-tile row (Blog, Search, Archives, About) standing in
  for upstream's generic feature icons
- Footer copyright list stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: upstream's static pages become ordinary blog posts under `/blog`;
search is server-side `/api/search`, not a static filter; contact links have no mail
backend behind them. No dark mode — TXT upstream is one design; a Dune lift may land later
as an enhancement, not as fidelity.
