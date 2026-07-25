---
title: Logo header, banner, and corporate footer
date: 2026-03-15
template: post
published: true
summary: Arcana’s landing structure on Dune — what to compare upstream.
taxonomy:
  tag: [chrome, arcana, fidelity]
---

Arcana’s `#page-wrapper` stacks `#header` (logo + `#nav`), an optional
`#banner`, main content, and a multi-slot `#footer`. On Dune:

- Logo home link respects `site.basePath` (critical under
  `themes.getdune.org/arcana/`)
- Banner CTA points at the blog route when present
- Nav items are capped so the bar doesn’t overflow on narrow widths
- Footer credit stays visible when `show_html5up_credit` is on

Compare with [html5up.net/arcana](https://html5up.net/arcana): logo weight,
banner copy block, and footer columns. We don’t port every static HTML
subpage — Blog / About / Search / Archives cover the CTAs. Contact forms
stay unwired; search is `/api/search`.

Mobile: confirm `#nav` remains usable and the banner doesn’t clip the
headline. That’s the class of bug CI never sees and browser QA is for.
