---
title: Helios chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Helios's banner, carousel reel, and feature strip map onto Dune.
taxonomy:
  tag: [chrome, helios, fidelity]
---

Upstream Helios opens with a page-wrapper header (title, `tagline`, a
scroll-triggered "Get Started" button), then — on home only — a `#banner`
section with the `banner_title` headline, a five-card carousel reel, and a
three-column feature strip pointing at Blog/Search/Archives. Inner pages
reuse the same header but skip the banner and reel entirely, landing straight
in a `no-sidebar` content wrapper.

Compare against [html5up.net/helios](https://html5up.net/helios):

- The carousel reel's five cards (Blog, Search, Archives, About, Welcome)
  should feel evenly paced, not cramped at narrow widths
- The "Get Started" button's smooth-scroll only fires for in-page `#`
  anchors — it's plain navigation everywhere else
- Leaving `/` for `/about` or `/blog` should not carry the banner or reel
  along; only the header persists

Honest Dune deviations: the upstream multi-page carousel targets become Dune
fixtures (`/blog`, `/search`, `/archives`, `/about`); search is server-side
`/api/search`; contact forms are not wired to a mail backend. No dark mode —
Helios upstream is a single design, and a Dune lift would be an enhancement,
not a fidelity fix.
