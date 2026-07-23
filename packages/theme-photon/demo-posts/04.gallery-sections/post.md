---
title: Hero, icons, and gallery tiles
date: 2026-03-08
template: post
published: true
summary: Exercising Photon’s home chrome without inventing new UI.
taxonomy:
  tag: [chrome, photon, fidelity]
---

The homepage sections are template-driven over vendored `pic*.jpg` assets
and Font Awesome-style icon spans from upstream CSS. Config is intentionally
thin: optional `avatar`, `tagline`, and `show_html5up_credit`.

Dune deviations that matter for dogfooding:

- “Projects” live under `/blog` (gallery fixture), not separate static HTML
- Search is `/api/search`, themed by `templates/search.tsx`
- No dark mode — Photon upstream is a single light portfolio shell
