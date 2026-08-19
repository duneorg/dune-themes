---
title: Telephasic chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Telephasic’s hero, feature rows, and promo band map onto Dune.
taxonomy:
  tag: [chrome, telephasic, fidelity]
---

Upstream Telephasic is a business landing with a logo-over-nav header, `#hero`,
paired feature rows, a `#promo` band, and a `#footer-wrapper` shell. On this
Dune port that chrome lives across `components/layout.tsx` (header, hero,
footer) and `templates/default.tsx` (feature rows + promo), styled by the
vendored `static/html5up/` CSS — this post exists so the demo explains what
you’re seeing instead of shipping a generic clone.

Compare side-by-side with [html5up.net/telephasic](https://html5up.net/telephasic):

- `#nav` uses a middle-item `.break` so the centered `#logo` has a gap
- `#hero` shows `hero_title` / `hero_subtitle` with a button to `/blog`
- Feature rows and the promo band resolve to Blog, About, Search, and Archives
- Landing footer lists those routes plus repo / getdune.org / upstream links
- `#copyright` keeps year, `footer_text`, and the HTML5 UP credit whenever
  `show_html5up_credit` is on

Honest Dune deviations: upstream’s multi-page HTML becomes ordinary routes
under `/blog`; search is server-side `/api/search`, not a static filter; the
footer has no mail backend behind “Get in touch”. A Dune lift may land later as
an enhancement, not as fidelity.
