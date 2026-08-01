---
title: Future Imperfect chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How the card grid, search overlay, and flyout menu map onto Dune.
taxonomy:
  tag: [chrome, future-imperfect, fidelity]
---

Upstream Future Imperfect is a magazine blog built from stacked `article.post`
cards, each with a title, byline, featured image, and a "Continue Reading"
button — plus two overlays that never touch the main scroll position: an
inline search box that expands from the header, and a slide-in `#menu`
panel with a second copy of the nav and its own search field.

On this Dune port, the card grid **is** the home route: `/` renders through
the `blog` template with `collection.items` pulled from `/blog`'s children,
capped at five and sorted newest-first. That's a deliberate departure from
upstream's separate landing/index split — Dune's fixture doesn't ship a
static index.html to fork from, so the magazine feed does double duty as
both landing page and archive.

Compare with [html5up.net/future-imperfect](https://html5up.net/future-imperfect)
for the header layout, the `.title`/`.meta` split on each card, and how
`#menu` slides in from the right on mobile widths. A few honest deviations:
search posts to Dune's server-side `/api/search` instead of a client-side
index; `/about`, `/archives`, and `/search` are real Dune routes standing
in for what upstream ships as static HTML files; and the CC BY design
credit lives inside `#menu`'s footer rather than the main page footer,
gated by `show_html5up_credit` exactly like every other HTML5 UP port in
this catalog. No dark mode — Future Imperfect upstream is a single design,
and a Dune scheme lift would be a future enhancement, not fidelity work.
