---
title: Configuring Spectral
date: 2026-03-08
template: post
published: true
summary: Credit and copyright are the only two knobs — what this live demo sets.
taxonomy:
  tag: [config, spectral]
---

Spectral has the thinnest config surface in this catalog — two options,
both about attribution rather than content. There's no hero title, banner
copy, or spotlight text to seed: the banner heading always mirrors the
page's own title, and the section copy is fixed template prose describing
Dune's blog, search, and archives.

## `show_html5up_credit`

On in this demo. Gates the visible **HTML5 UP** credit inside `#footer`'s
copyright list — the only place Spectral surfaces the CC BY attribution,
since the landing sections above it (`#one` through `#cta`) never carry a
footer of their own. Turn this off only alongside a separate Pixelarity
license; the toggle should hide the credit surface outright, not leave it
half-visible.

## `footer_text`

Set to **“Spectral Demo”** so the copyright line under the credit reads as
a demo installation instead of quietly reusing the site's own title, which
may be long, generic, or unrelated to this theme.

Why so thin? Upstream Spectral is a single scrolling page with fixed
section copy — there's no per-instance tagline or intro text the way
Aerial or Hyperspace expose. A future Dune lift could add one, but that
would be new functionality, not a fidelity gap in this port.
