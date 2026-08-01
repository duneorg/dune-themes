---
title: Strata chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Strata's avatar header and icon footer map onto Dune templates.
taxonomy:
  tag: [chrome, strata, fidelity]
---

Upstream Strata is a fixed avatar header (`#header`) over a scrolling body (`#main`), closed
out by an icon footer (`#footer`) linking Home, Projects, Search, Archives, and About. On
this Dune port that shell lives across `components/layout.tsx` and `templates/default.tsx`,
styled by the vendored `static/html5up/` CSS — this post exists so the demo explains what
you're seeing instead of shipping a generic clone.

Compare side-by-side with [html5up.net/strata](https://html5up.net/strata):

- Avatar + name + `tagline` in `#header` should feel like the same family as upstream's
  studio byline
- `#one` carries this page's intro copy; `#two` is a six-tile thumbnail grid pointing at
  Blog, Search, Archives, About, and two named posts
- The icon footer (`fa-home`, `fa-folder`, `fa-search`, `fa-archive`, `fa-envelope`) stays
  usable at mobile widths, and the home icon swaps target depending on route
- Copyright/credit list in `#footer .copyright` stays visible whenever
  `show_html5up_credit` is on

Honest Dune deviations: upstream's individual project pages become ordinary blog posts
under `/blog`; search is server-side `/api/search`, not a static filter; the envelope icon
has no mail backend behind it. No dark mode — Strata upstream is one design; a Dune lift may
land later as an enhancement, not as fidelity.
