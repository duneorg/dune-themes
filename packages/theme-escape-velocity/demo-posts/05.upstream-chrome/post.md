---
title: Escape Velocity chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Escape Velocity’s intro, features, and highlights map onto Dune.
taxonomy:
  tag: [chrome, escape-velocity, fidelity]
---

Upstream Escape Velocity wraps the site in `#page-wrapper`. `#header.wrapper` holds
`#logo` (site title + tagline) and an inline `#nav`. Home then stacks four titled sections:
`#intro.wrapper.style1`, `#main.wrapper.style2` with `#features`, `#highlights.wrapper.style3`
(three `.highlight` cards), and `#footer.wrapper` with `#copyright`. Inner pages switch the
body to `no-sidebar` and render a single `#main.wrapper.style2` article. On this Dune port
that shell lives across `components/layout.tsx` and `templates/default.tsx`, styled by the
vendored `static/html5up/` CSS.

Compare side-by-side with [html5up.net/escape-velocity](https://html5up.net/escape-velocity):

- `#intro` carries the seeded `intro_title` and a Get Started button aimed at `/blog`
- `#features` documents Blog, responsive shell, Search/Archives, and credit in a four-cell
  list with About as a secondary action
- `#highlights` cards spotlight Blog, Search, and Archives with featured images
- `#nav` marks the active route with `.current` (trailing-slash safe)

Honest Dune deviations: upstream’s multi-page HTML becomes ordinary posts under `/blog`;
search is server-side `/api/search`, not a static filter; the closing CTA has no mail
backend. No dark mode — Escape Velocity upstream is one design; a Dune lift may land later
as an enhancement, not as fidelity.
