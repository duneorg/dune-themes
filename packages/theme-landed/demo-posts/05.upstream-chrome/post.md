---
title: Landed chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Landed’s banner, spotlights, and scrolly jumps map onto Dune.
taxonomy:
  tag: [chrome, landed, fidelity]
---

Upstream Landed is known for its sticky header and nav-banner drops into
spotlight sections. On this Dune port that chrome lives across
`components/layout.tsx` (sticky `#header`, preload/scrolly script) and
`templates/default.tsx` (banner through `#five` plus landing footer), styled by
the vendored `static/html5up/` CSS — this post exists so the demo explains
what you’re seeing instead of shipping a generic clone.

Compare side-by-side with [html5up.net/landed](https://html5up.net/landed):

- `#banner` shows `banner_title` / `tagline` and a `.goto-next` into `#one`
- `#one` / `#two` / `#three` spotlight Blog, then Blog again, then Search +
  Archives, each with upstream-style image alignment
- `#four`’s icon grid and `#five`’s CTA band resolve to Blog / Search /
  Archives / About instead of mock detail pages
- `.scrolly` anchors smooth-scroll to the next section; check them at mobile
  width as well as desktop
- Footer copyright/credit list stays visible whenever `show_html5up_credit`
  is on

Honest Dune deviations: upstream’s multi-page HTML becomes ordinary routes
under `/blog`; search is server-side `/api/search`, not a static filter; the
closing CTA has no mail backend behind it. A Dune lift may land later as an
enhancement, not as fidelity.
