---
title: Adapting PaperMod to Dune's architecture
date: 2026-07-01
template: post
published: true
summary: The handful of places this port genuinely deviates from upstream, and why.
taxonomy:
  tag: [papermod, deviations]
---

Following the previous post — most of PaperMod ported over unchanged. A
few things needed to adapt, because they depend on something Hugo does at
build time that a request-time renderer like Dune approaches differently.

## Search: server-side, not Fuse.js

Upstream PaperMod's search page loads a client-side [Fuse.js](https://www.fusejs.io/)
index built from every post at Hugo build time. Dune has no build-time
search-index step, so this port's search page queries Dune's
server-side `/api/search` endpoint instead — same live-results UX
(debounce, arrow-key navigation), different mechanism underneath. Try it
on the [Search](/search/) page.

## Cover images: plain `<img>`, no responsive `srcset`

Hugo's image processing pipeline generates multiple resized variants of a
cover image at build time and serves the right one via `srcset`. Dune
doesn't have an image-processing pipeline, so cover images render as a
single plain `<img>` — functional, but not responsive the way upstream's
is.

## Heading anchors: theme-generated, not `marked`-emitted

Dune's markdown renderer (`marked`) doesn't emit `id` attributes on
headings the way Hugo's does, so this theme generates them itself, using
the same GitHub slug convention Hugo uses — in-page anchor links still
behave the way you'd expect.

## Not ported at all

A few upstream features don't have anywhere to attach in Dune's content
model, so they're simply not included: profile-mode home
(`index_profile.html` — an alternate homepage layout), the taxonomy terms
page (`terms.html`, which needs a full list of tag values Dune's
templates don't receive), the comments partial, and search-engine
verification meta tags.

None of these are things this port "got wrong" — they're the actual
boundary between what Hugo can do at static-build time and what a
request-time renderer like Dune can do. Everything else — the parts that
make PaperMod look and feel like PaperMod — carried straight over.
