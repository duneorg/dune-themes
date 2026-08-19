---
title: Zerofour chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How ZeroFour’s header banner and minimal footer map onto Dune.
taxonomy:
  tag: [chrome, zerofour, fidelity]
---

Upstream ZeroFour centers on `#header-wrapper`: logo, `#nav`, and a homepage
`#banner` with a strong tagline plus a large Explore button, then a compact
`#footer` copyright strip. On this Dune port that entire shell lives in
`components/layout.tsx` (home also mounts demo-home inside `#main-wrapper`
`#content`), styled by vendored `static/html5up/` CSS.

Compare side-by-side with [html5up.net/zerofour](https://html5up.net/zerofour):

- `#banner` only renders on `/` and `/home` (`homepage` body class); inner
  routes use `no-sidebar` without the banner block
- Explore points at Blog; nav items cover the usual Blog / Search / Archives /
  About fixtures with `current_page_item` active state
- Footer is copyright + optional HTML5 UP credit — no multi-widget column set
- Credit stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: this port is thinner mid-page than some upstream
ZeroFour demos (no separate feature marketing band); multi-page HTML becomes
`/blog`, `/search`, `/archives`, `/about`; search is server-side `/api/search`.
No dark mode — ZeroFour upstream is one design; a Dune lift may land later as
an enhancement, not as fidelity.
