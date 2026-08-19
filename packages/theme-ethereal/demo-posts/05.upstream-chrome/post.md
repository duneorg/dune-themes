---
title: Ethereal chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Ethereal’s banner, spotlights, and icon grid map onto Dune.
taxonomy:
  tag: [chrome, ethereal, fidelity]
---

Upstream Ethereal scrolls as panels inside `#page-wrapper > #wrapper`. Home opens with
`section.panel.banner.right` (major heading, tagline, circle Next action, filtered image),
then a `panel.spotlight` carrying the page title, a `panel.color1` with
`ul.grid-icons.three.connected`, and another spotlight. There is no conventional top nav on
landing — inner pages inject a `panel.color1` action row for Home plus site nav. On this
Dune port that shell lives across `components/layout.tsx` and `templates/default.tsx`,
styled by the vendored `static/html5up/` CSS (plus `noscript.css` when JS is off).

Compare side-by-side with [html5up.net/ethereal](https://html5up.net/ethereal):

- The banner’s Next circle aims at `/blog` when a blog route exists
- The connected icon grid links Blog, Search, Archives, and About as real routes
- Spotlights use filtered/tinted images from the vendored set (`pic02`, `pic03`)
- `.copyright` stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: upstream’s multi-page HTML becomes ordinary posts under `/blog`;
search is server-side `/api/search`, not a client filter; Ethereal’s gallery/lightbox
demo pages are not fully ported — the Dune demo uses panel spotlights and the icon grid
instead. No dark mode — Ethereal upstream is one design; a Dune lift may land later as an
enhancement, not as fidelity.
