---
title: Tessellate chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Tessellate’s scroll sections and dark content bands map onto Dune.
taxonomy:
  tag: [chrome, tessellate, fidelity]
---

Upstream Tessellate opens on a dark `#header` (centered `<h1>`, subtitle, scrolly
Explore button), then four `section.main` blocks — `#first` (icon features),
`#second` (copy + six-tile gallery), `#third` (featured image + three columns),
`#fourth` (CTA actions) — before `#footer` with social icons and copyright. On
this Dune port that shell lives in `templates/default.tsx`, with shared credit
chrome in `components/layout.tsx` for inner pages, styled by vendored
`static/html5up/` CSS.

Compare side-by-side with [html5up.net/tessellate](https://html5up.net/tessellate):

- `#first`’s three feature cards spotlight Blog, Search, and Archives with live
  paths under each icon
- `#second`’s gallery tiles resolve to Blog, About, Search, Archives, Blog again,
  and the upstream Tessellate page — not decorative dead ends
- Scrolly buttons (`#first`, `#second`, `#third`, `#fourth`) should land on those
  section IDs at mobile width as well as desktop
- Footer copyright/credit stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: upstream’s single-page marketing copy becomes fixture
routes under `/blog`, `/search`, `/archives`, and `/about`; search is server-side
`/api/search`, not a static filter; the contact-style fourth band has no mail
backend. No dark mode — Tessellate upstream is one design; a Dune lift may land
later as an enhancement, not as fidelity.
