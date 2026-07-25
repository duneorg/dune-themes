---
title: Fullscreen shell, overlay, and icon nav
date: 2026-03-15
template: post
published: true
summary: How Aerial’s home chrome maps onto Dune — and what to click on mobile.
taxonomy:
  tag: [chrome, aerial, fidelity]
---

Upstream Aerial is almost nothing: `#bg`, `#overlay`, `#main`, a header
with the site name, and a row of icon links. Inner pages get a content
panel; the home route stays the landing shell (`landing` prop on the
layout).

On this Dune port:

- Home (`/` / `/home`) is fullscreen only — no blog listing jammed into the
  hero
- Icon/nav links come from site nav (and social-shaped items where present)
- Opening a real page (Blog, About, Search) drops you into the content
  panel with the same footer credit
- Returning home should restore the sparse shell without leftover panel
  chrome

Compare with [html5up.net/aerial](https://html5up.net/aerial). You’re
checking the overlay contrast, the sparse header, and that mobile still
has usable hit targets on the icon row. Search is Dune `/api/search`, not
a static page; contact forms from the HTML5 UP zip are not wired to mail.

No dark mode — Aerial upstream is one design. A Dune lift may land later
as an enhancement, not as “fidelity.”
