---
title: Stellar chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Stellar’s spotlight, features, and statistics bands map onto Dune.
taxonomy:
  tag: [chrome, stellar, fidelity]
---

Upstream Stellar opens on `#header.alt` (logo mark, title, tagline) with a
sticky `#nav`, then `#main` sections: `#intro` spotlight, `#first` icon
features, `#second` statistics + About, `#cta` dual buttons, and a two-column
`#footer`. On this Dune port the alt header and nav live in
`components/layout.tsx`; section markup and the landing footer live in
`templates/default.tsx`, styled by vendored `static/html5up/` CSS (including
`noscript.css`).

Compare side-by-side with [html5up.net/stellar](https://html5up.net/stellar):

- `#intro` Learn More and `#cta` Get Started resolve to Blog; `#second` and
  secondary CTA buttons resolve to About
- `#first` features cover Blog, Search, and Archives with live headings
- Footer Explore icons repeat Blog / Search / Archives; copyright credit stays
  visible when `show_html5up_credit` is on
- Inner pages swap to a plain `#header` + `#content.main` shell without the alt
  logo treatment

Honest Dune deviations: placeholder Latin section titles remain decorative
template copy; multi-page upstream HTML becomes `/blog`, `/search`,
`/archives`, `/about`; search is server-side `/api/search`; footer CTAs have no
mail backend. No dark mode — Stellar upstream is one design; a Dune lift may
land later as an enhancement, not as fidelity.
