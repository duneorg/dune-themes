---
title: Phantom chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Phantom's slide-out menu and tile grid map onto Dune.
taxonomy:
  tag: [chrome, phantom, fidelity]
---

Upstream Phantom's chrome is deceptively small: a header with a logo mark and
a single "Menu" link, an off-canvas `#menu` panel that slides in from the
right, and a `#main` content area that holds either the tile grid or a single
post. On Dune, `layout.tsx` renders all of it and a small inline script owns
the `is-menu-visible` body class — click the trigger, click outside the panel,
or hit `Escape`, and the menu closes the same way upstream's jQuery did.

What to check against [html5up.net/phantom](https://html5up.net/phantom):

- The menu toggle and outside-click/`Escape` dismissal both work at mobile
  width, where the panel covers most of the viewport
- Tiles cycle through `style1`–`style6` every six items (`tileStyleClass`),
  so the grid doesn't repeat a size pattern within a single page of posts
- Active nav state persists inside `#menu` across `/blog`, `/about`,
  `/search`, and `/archives` — not just on the home tile grid

Honest Dune deviations: the upstream multi-page HTML becomes Dune fixtures
(`/blog`, `/search`, `/archives`, `/about`); search is server-side
`/api/search`, not a client-side index; contact forms have no mail backend.
No dark mode — Phantom upstream is a single design, and a Dune lift would be
a deliberate enhancement, not a fidelity fix.
