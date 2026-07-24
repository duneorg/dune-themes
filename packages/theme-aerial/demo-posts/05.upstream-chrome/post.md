---
title: Aerial chrome on Dune
date: 2026-03-15
template: post
published: true
summary: Theme-specific fidelity notes for Aerial — not a generic clone.
taxonomy:
  tag: [chrome, aerial, fidelity]
---

Upstream Aerial is known for **fullscreen overlay**. On Dune that chrome is template-driven over vendored `static/html5up/` assets — this post exists so the demo explains what you’re seeing instead of shipping a generic clone.

Fullscreen background shell with overlay nav; dogfood that overlay links hit real Dune paths.

Compare side-by-side with [html5up.net/aerial](https://html5up.net/aerial):

- Hero / banner / first viewport should feel like the same family
- Nav, `#menu`, titleBar, or modal close behavior must work on mobile width
- Footer credit stays visible when `show_html5up_credit` is on

Honest Dune deviations: multi-page HTML becomes `/blog`, `/search`, `/archives`, `/about`; search is server-side `/api/search`; contact forms have no mail backend. No dark mode — one upstream design.

