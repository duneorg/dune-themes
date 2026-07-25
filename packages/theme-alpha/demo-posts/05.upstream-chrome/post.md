---
title: Alt header, banner, and container main
date: 2026-03-15
template: post
published: true
summary: What Alpha’s landing chrome looks like on Dune routes — and what to click.
taxonomy:
  tag: [chrome, alpha, fidelity]
---

Upstream Alpha switches the header class on home (`alt`) and leads with
`#banner` before `#main.container`. This port keeps that split on purpose:

- **Home** (`/` / `/home`): alt header, banner, CTA toward `/blog` when a
  blog nav item exists
- **Inner pages**: solid header, container main, same footer credit
- **Nav**: capped so the bar doesn’t overflow; active state follows the
  current route (including trailing-slash variants)

Compare with [html5up.net/alpha](https://html5up.net/alpha). Check banner
type size, nav density, and mobile collapse of `#nav`. Dune search is
`/api/search` via the theme’s `search` template — not a client-only index.
Contact forms from the HTML5 UP zip are not wired to a mail backend.

If the banner is missing on home, check `show_banner` and that you’re
actually on the home route. That class of “looks broken but config is off”
bug is why this post exists next to the install note.
