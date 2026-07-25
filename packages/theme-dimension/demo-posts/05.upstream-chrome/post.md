---
title: Landing header, article panel, and Escape
date: 2026-03-15
template: post
published: true
summary: Dimension’s modal panel behavior on Dune routes.
taxonomy:
  tag: [chrome, dimension, fidelity]
---

Upstream Dimension treats nav as panel switches. This port keeps the
visual language while routing for real:

- **Home**: `#header` only (`landing`) — no article body in the first paint
- **Other routes**: `body.is-article-visible`, `#main article.active`, close
  control injected for return-to-landing
- **Even-count nav** gets `use-middle` so the gem divider still centers
- **Nav capped at six** — upstream density, not an infinite mega-menu

Compare with [html5up.net/dimension](https://html5up.net/dimension).
You’re checking the gem, the dimmed landing behind the article, and that
Escape / close returns you to the header.

Search and archives are Dune destinations inside the same article chrome.
Static HTML5 UP contact forms are not a mail backend. If the panel never
opens, you’re probably still on `/` — open Blog deliberately.
