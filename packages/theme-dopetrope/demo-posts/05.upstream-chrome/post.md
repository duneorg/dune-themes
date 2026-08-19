---
title: Dopetrope chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Dopetrope’s header, banner, and magazine grid map onto Dune.
taxonomy:
  tag: [chrome, dopetrope, fidelity]
---

Upstream Dopetrope wraps the site in `#page-wrapper`: `#header` holds the site title,
an inline `#nav` list, and (on home) an optional `#banner`; `#main .container` carries
the magazine layout; `#footer` closes with `#copyright`. The blog template lays posts out
as `section.box` cards in a `.row` of `.col-6` columns, each with an optional featured
image, dated header, excerpt, and “Continue Reading” action. On this Dune port that shell
lives in `components/layout.tsx` and `templates/blog.tsx`, styled by the vendored
`static/html5up/` CSS.

Compare side-by-side with [html5up.net/dopetrope](https://html5up.net/dopetrope):

- `#nav` lists Blog, Search, Archives, and About as real Dune routes with a `.current`
  active state (trailing-slash safe)
- Home `#banner` shows the seeded title/subtitle when `show_banner` is on
- The post grid is collection-driven — covers, dates, and excerpts come from frontmatter
- `#copyright` stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: upstream’s multi-page HTML becomes ordinary posts under `/blog`;
search is server-side `/api/search`, not a client index; there is no contact form wired to
mail. No dark mode — Dopetrope upstream is one design; a Dune lift may land later as an
enhancement, not as fidelity.
