---
title: Fractal chrome on Dune
date: 2026-03-15
template: post
published: true
summary: How the phone mockup hero and spotlight grid map onto Dune routes.
taxonomy:
  tag: [chrome, fractal, fidelity]
---

Upstream Fractal's whole identity is the phone mockup hero: a two-column
header with title, subtitle, and a "Get Started" button on one side and a
device-framed screenshot on the other, followed by a row of spotlight
panels — image, heading, blurb, button — each pointed at a different
section of the one-page design.

On this Dune port, the mockup hero is the `landing` variant of the shared
layout, rendered only on `/`; every inner page (a project post, About, a
blog listing) falls back to the plain content wrapper with no mockup. The
three spotlight panels below the hero point at `/blog`, `/search`, and
`/archives` instead of upstream's in-page anchor sections — a deliberate
swap, since Dune's fixture is multi-page rather than a single scrolling
document. An icon row underneath repeats the same four destinations
(adding About) for a second, denser pass at the same links.

Compare with [html5up.net/fractal](https://html5up.net/fractal) for the
mockup frame proportions, the spotlight image/content split, and how the
hero stacks vertically at mobile widths. Honest deviations: search is
Dune's server-side `/api/search`; `/archives` and `/about` are generated
routes standing in for static HTML5 UP pages; contact forms from the
original zip aren't wired to a mail backend. The CC BY credit sits in the
plain-text footer, gated by `show_html5up_credit` like every other port in
this catalog. No dark mode — Fractal upstream is a single design.
