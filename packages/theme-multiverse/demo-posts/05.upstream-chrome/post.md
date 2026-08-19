---
title: Multiverse chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Multiverse’s thumb grid and footer panel map onto Dune.
taxonomy:
  tag: [chrome, multiverse, fidelity]
---

Upstream Multiverse opens on a dense `#main` of `article.thumb` tiles, with a
slide-up `#footer.panel` that splits intro copy from actions. Navigation lives
in a compact `#header` over the grid. On this Dune port that shell lives across
`components/layout.tsx` (header + inner footer) and `templates/default.tsx`
(gallery + panel), styled by the vendored `static/html5up/` CSS — this post
exists so the demo explains what you’re seeing instead of shipping a generic
clone.

Compare side-by-side with [html5up.net/multiverse](https://html5up.net/multiverse):

- Twelve thumbs from `GALLERY_ITEMS` keep upstream full/thumb pairs under
  `static/html5up/images/`
- Footer panel icons and buttons resolve to Blog, Search, Archives, and About
- Inner pages use a compact `#main.dune-inner` article instead of the thumb grid
- Panel copyright/credit stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: upstream’s per-image narrative becomes ordinary blog
posts under `/blog`; search is server-side `/api/search`, not a static gallery
filter; the panel has no mail backend behind it. A Dune lift may land later as
an enhancement, not as fidelity.
