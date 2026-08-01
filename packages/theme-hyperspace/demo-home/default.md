---
title: Hyperspace
template: default
published: true
description: >
  Hyperspace adapted from HTML5 UP for Dune — sidebar features + spotlight grid on a dark landing shell (still single upstream design, no Dune scheme switcher).
  Single upstream design; no dark mode or color-scheme presets in this port.
---

Above this paragraph, `#intro` fills the screen with **“Hyperspace”** and
**“A responsive sidebar landing for Dune demos”** — `intro_title` and
`intro_subtitle` from `demo-config.json`, both falling back to the site
title and description when left empty. That full-screen intro only
appears on `/`, gated by `show_intro`; turn it off and inner content jumps
straight to this section instead.

This text itself lives inside `#content`, the section a "Learn more"
scroll button reaches after the intro — the same `id="content"` anchor the
button's `.scrolly` behavior targets, wired through the shared layout's
smooth-scroll script rather than jQuery. The persistent `#sidebar` nav on
the left edge stays fixed through both sections, so navigating away from
`/` never loses the same header chrome you started on.

Fold in the footer below — copyright and the HTML5 UP credit, gated by
`show_html5up_credit` — and that's the entire first viewport: sidebar,
intro, content, footer, no scroll-triggered surprises in between.
