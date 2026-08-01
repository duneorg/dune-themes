---
title: Twenty chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Twenty's banner, feature sections, and CTA map onto Dune templates.
taxonomy:
  tag: [chrome, twenty, fidelity]
---

Upstream Twenty is the longest landing page in this theme set: `#header.alt` over `#banner`,
then `wrapper.style1/2/3` sections for icon features and image spotlights, a `#cta` band,
and a full icon footer. On this Dune port that shell lives in `templates/default.tsx` behind
the `landing` prop on `components/layout.tsx`, styled by the vendored `static/html5up/`
CSS — this post exists so the demo explains what you're seeing instead of shipping a generic
clone.

Compare side-by-side with [html5up.net/twenty](https://html5up.net/twenty):

- `#banner` headline (`banner_title`) and logo `tagline` should feel like the same family as
  upstream's landing copy
- The "Built for Dune CMS" section, feature-icon row, and "Featured images" grid all link to
  `/blog`, `/search`, `/archives`, and `/about` instead of upstream's static anchors
- `#cta` and the footer icon row (GitHub, Dune, HTML5 UP) close the page the same way
  upstream's contact/social row does
- Copyright/credit list stays visible on inner pages whenever `show_html5up_credit` is on

Honest Dune deviations: upstream's static feature pages become ordinary blog posts under
`/blog`; search is server-side `/api/search`, not a static filter; the GitHub/Dune icons
replace upstream's social links since this is a theme repo, not a product site. No dark
mode — Twenty upstream is one design; a Dune lift may land later as an enhancement, not as
fidelity.
