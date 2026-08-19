---
title: Strongly Typed chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Strongly Typed’s header, banner strip, and main column map onto Dune.
taxonomy:
  tag: [chrome, strongly-typed, fidelity]
---

Upstream Strongly Typed leads with a centered `#header` (logo, tagline, boxed
nav) and an optional homepage `#banner` before `#main`. On this Dune port that
chrome lives in `components/layout.tsx` over vendored `static/html5up/` CSS —
this post exists so the demo explains what you’re seeing instead of shipping a
generic clone.

Compare side-by-side with [html5up.net/strongly-typed](https://html5up.net/strongly-typed):

- Header shows `header_tagline` under the site title
- `#banner` appears on home when `show_banner` is on, using `banner_text`
- Inner routes use the `no-sidebar` body class and skip the banner
- `#copyright` keeps year, `footer_text`, and the HTML5 UP credit whenever
  `show_html5up_credit` is on

Honest Dune deviations: upstream’s multi-page HTML becomes ordinary routes
under `/blog`; search is server-side `/api/search`, not a static filter; there
is no contact form mail backend behind the chrome. A Dune lift may land later
as an enhancement, not as fidelity.
