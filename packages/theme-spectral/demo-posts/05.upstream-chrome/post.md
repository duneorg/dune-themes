---
title: Spectral chrome on Dune
date: 2026-03-15
template: post
published: true
summary: Banner, spotlights, feature grid, and CTA band — how Spectral's five sections map onto Dune.
taxonomy:
  tag: [chrome, spectral, fidelity]
---

Upstream Spectral is a tall single-page landing built from five stacked
sections, each with its own visual weight, ending in a plain footer.
Every one of them survives the port, and each does a specific job.

## `#banner`

The first viewport: a full-height panel with the page title, a short line
of body copy crediting HTML5 UP, and a primary "Get Started" button
pointed at `/blog`. A `.more.scrolly` arrow beneath it smooth-scrolls to
`#one` — the same in-page anchor behavior upstream ships, wired up through
the shared layout's menu script rather than jQuery.

## `#one`

A centered header ("Built for Dune CMS") followed by a short paragraph,
theme content from `demo-home/default.md` when present, and a row of three
large icons (Blog, Search, Archives) — the first hint that this is a CMS
demo and not a static brochure site.

## `#two`

Three `.spotlight` panels, each pairing a vendored image with a heading and
a button: "Read the blog," "Search demo pages," and "Browse archives."
Upstream Spectral uses this same alternating image/content pattern for
whatever content a real site drops in; here it's wired directly to Dune's
three built-in listing routes.

## `#three` and `#cta`

A four-item feature grid (Blog, About, Search, Archives) restates the same
destinations a third time with icon-led descriptions, and the closing
`#cta` band offers two stacked buttons — "Get Started" and "Read More" —
before the plain-text footer with its own icon row and copyright line.

Compare with [html5up.net/spectral](https://html5up.net/spectral) for
section spacing and the `#menu` panel's slide-in behavior on mobile
widths. Honest deviations: search is server-side `/api/search`, not a
static index; `/archives` and `/about` are generated Dune routes; contact
forms from the original zip have no mail backend. No dark mode — Spectral
upstream is one design, single scheme.
