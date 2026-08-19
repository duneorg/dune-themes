---
title: Directive chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Directive’s header, feature bands, and footer map onto Dune.
taxonomy:
  tag: [chrome, directive, fidelity]
---

Upstream Directive opens on a centered `#header` (paper-plane icon, `<h1>`, one tagline
paragraph, Get Started action), then three alternating `section.feature` bands inside a
`box.alt.container` (left / right / left), and a `footer.major` closing CTA before
`#footer` copyright. There is no slide-out `#menu` — navigation on inner pages is a
compact `ul.actions` button row above the boxed article. On this Dune port that shell
lives across `components/layout.tsx` (`#header` + `#footer`) and
`templates/default.tsx` (feature bands), styled by the vendored `static/html5up/` CSS.

Compare side-by-side with [html5up.net/directive](https://html5up.net/directive):

- The three feature bands spotlight Blog, Search, and Archives respectively, each with an
  image, a heading link, and short copy
- The major footer CTA pairs “Read the Blog” with About, so every button resolves to a
  real route
- Inner pages drop `#header` and wrap content in `.box.container` instead of feature bands
- Footer copyright/credit stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: upstream’s multi-page HTML becomes ordinary blog posts under
`/blog`; search is server-side `/api/search`, not a static filter; the Get Started /
signup-style actions have no mail backend behind them. No dark mode — Directive upstream
is one design; a Dune lift may land later as an enhancement, not as fidelity.
