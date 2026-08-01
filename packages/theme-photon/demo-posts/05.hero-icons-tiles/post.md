---
title: Hero, icons, and gallery tiles
date: 2026-03-10
template: post
published: true
summary: Exercising Photon’s home chrome without inventing new UI.
taxonomy:
  tag: [chrome, photon, fidelity]
---

The homepage is the `#header` section rendered by `components/layout.tsx`
when `isLanding` is true (route is `/` or `/home`): a cloud icon span,
an `h1` reading “Hi, I’m Photon, a gallery-style portfolio for Dune”
built from `site.title` plus this demo’s `tagline`, the site description
as a supporting paragraph, and a single `.button.scrolly` action pointing
at `/blog`. Below it, inner content stacks a six-icon feature column and
gallery-style project tiles that deep-link into `/blog`, `/about`,
`/search`, and `/archives`. Images come from
`static/html5up/images/pic*.jpg` — the same asset set upstream ships,
just referenced from Dune content instead of hard-coded HTML.

Compare with [html5up.net/photon](https://html5up.net/photon): icon spans
(`fa-code`, `fa-bolt`, …), wide CTAs, and the gallery entry rhythm should
match. The `.button.scrolly` class is wired up in this port’s inline
script to smooth-scroll to an in-page anchor rather than a real page
navigation, matching upstream’s single-page feel even though the target
here is a full route. Dune deviations that matter for dogfooding:
projects live under `/blog` instead of static HTML files, search is
server-side `/api/search`, and contact forms from the original HTML5 UP
demo have no mail backend wired up.
