---
title: Solid State chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Solid State's banner, spotlight sections, and menu overlay map onto Dune.
taxonomy:
  tag: [chrome, solid-state, fidelity]
---

Upstream Solid State opens on a centered `#banner` (gem icon, `<h2>`, one line of copy),
then three alternating `wrapper.spotlight` sections (`#one`/`#two`/`#three`), a `#four`
panel with a four-card `features` grid, and a `#footer` closing CTA. Navigation lives behind
a slide-out `#menu` panel triggered from the header, not an inline nav bar. On this Dune
port that shell lives across `components/layout.tsx` (header + menu) and
`templates/default.tsx` (everything below it), styled by the vendored `static/html5up/`
CSS — this post exists so the demo explains what you're seeing instead of shipping a generic
clone.

Compare side-by-side with [html5up.net/solid-state](https://html5up.net/solid-state):

- `#one`/`#two`/`#three` spotlight Blog, Search, and Archives respectively, each with an
  image, a heading, and a "Read More" link
- `#four`'s feature grid repeats those links plus About, so every card resolves to a real
  route instead of a mock detail page
- The `#menu` overlay opens from the header link, closes on its own close button, an
  outside click, or <kbd>Escape</kbd> — check all three on mobile width
- Footer copyright/credit list stays visible on inner pages whenever
  `show_html5up_credit` is on

Honest Dune deviations: upstream's per-feature detail pages become ordinary blog posts under
`/blog`; search is server-side `/api/search`, not a static filter; the closing CTA has no
mail backend behind it. No dark mode — Solid State upstream is one design; a Dune lift may
land later as an enhancement, not as fidelity.
