---
title: Read Only chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Read Only’s resume sidebar and titleBar map onto Dune.
taxonomy:
  tag: [chrome, read-only, fidelity]
---

Upstream Read Only is known for its resume sidebar: avatar, identity, nav, and
copyright in `#header`, with `#titleBar` toggling that panel on small screens.
On this Dune port that chrome lives in `components/layout.tsx` over vendored
`static/html5up/` CSS — this post exists so the demo explains what you’re
seeing instead of shipping a generic clone.

Compare side-by-side with [html5up.net/read-only](https://html5up.net/read-only):

- Sidebar shows `avatar_url` (or the default avatar), site title, and
  `sidebar_tagline`
- `#nav` items resolve to Dune fixtures; active state is trailing-slash safe
- `#titleBar .toggle` opens/closes the sidebar on mobile width — check both
- Sidebar copyright/credit stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: upstream’s multi-page HTML becomes ordinary routes
under `/blog`; search is server-side `/api/search`, not a sidebar filter; there
is no contact form mail backend behind the chrome. A Dune lift may land later
as an enhancement, not as fidelity.
