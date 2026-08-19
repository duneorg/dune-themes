---
title: Eventually chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Eventually’s sparse header, signup form, and backgrounds map onto Dune.
taxonomy:
  tag: [chrome, eventually, fidelity]
---

Upstream Eventually is almost nothing on purpose: `#header` (title + optional tagline),
`#signup-form` (email + Sign Up), `#footer` (social icons + copyright), and a script-built
`#bg` wrapper that cycles `bg01.jpg` / `bg02.jpg` / `bg03.jpg`. There is no `#nav`, no
feature grid, and no slide-out menu — the first viewport is the product. On this Dune port
that shell lives almost entirely in `components/layout.tsx`; `templates/default.tsx` only
flips `landing` so home stays sparse while inner pages wrap markdown in `.dune-content`
and add the `is-content` body class.

Compare side-by-side with [html5up.net/eventually](https://html5up.net/eventually):

- `#header` shows the site title plus the seeded tagline when present
- `#signup-form` still posts client-side to a fake success message — there is no mail
  backend
- `#bg` rotates the three vendored backgrounds on a timer after `is-preload` clears
- `#footer .copyright` stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: Blog / Search / Archives / About exist as ordinary Dune fixtures
behind this leaf set, but the landing does not surface them as CTAs — keep the sparse hero
honest. Search is server-side `/api/search` on its own route. Social icons only appear when
nav items supply social URLs. No dark mode — Eventually upstream is one design; a Dune
lift may land later as an enhancement, not as fidelity.
