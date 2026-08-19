---
title: Highlights chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How Highlights’ fullscreen sections and goto-next cues map onto Dune.
taxonomy:
  tag: [chrome, highlights, fidelity]
---

Upstream Highlights opens on `#header` (major title, tagline, Begin + Read the
Blog actions), then three `section.main.special` blocks (`#one` / `#two` /
`#three`) each with a primary image, content column, and `goto-next` scrolly
link, before `#footer` copyright. On this Dune port that shell lives in
`templates/default.tsx`, with shared credit chrome in `components/layout.tsx`
for inner pages, styled by vendored `static/html5up/` CSS.

Compare side-by-side with [html5up.net/highlights](https://html5up.net/highlights):

- Begin scrolls to `#one`; Read the Blog and Get Started resolve to `/blog`
- `#two`’s icons grid links Blog, Search, Archives, and About
- `goto-next` controls should chain `#one` → `#two` → `#three` → `#footer` at
  mobile width as well as desktop
- Footer credit stays visible whenever `show_html5up_credit` is on

Honest Dune deviations: multi-page upstream HTML becomes ordinary Dune routes;
search is server-side `/api/search`; there is no contact form in the footer. No
dark mode — Highlights upstream is one design; a Dune lift may land later as an
enhancement, not as fidelity.
