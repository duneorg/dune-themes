---
title: Hero, icons, and gallery tiles
date: 2026-03-10
template: post
published: true
summary: Exercising Photon’s home chrome without inventing new UI.
taxonomy:
  tag: [chrome, photon, fidelity]
---

The homepage stacks a major hero, a six-icon feature column, and special
style sections that deep-link into `/blog`, `/about`, `/search`, and
`/archives`. Images come from `static/html5up/images/pic*.jpg` — the same
assets upstream ships.

Compare with [html5up.net/photon](https://html5up.net/photon): icon spans
(`fa-code`, `fa-bolt`, …), wide CTAs, and the gallery entry rhythm should
match. Dune deviations that matter for dogfooding: projects live under
`/blog`, search is `/api/search`, and contact forms have no mail backend.
