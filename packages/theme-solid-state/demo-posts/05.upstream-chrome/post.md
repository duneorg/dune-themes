---
title: Upstream chrome on Dune
date: 2026-03-15
template: post
published: true
summary: What this port preserves from HTML5 UP Solid State, and what Dune changes.
taxonomy:
  tag: [chrome, solid-state, fidelity]
---

This demo exercises: banner + features + posts preview spots.

Honest deviations from the static HTML5 UP demo:

- Multi-page HTML files become Dune routes (`/blog`, `/search`, `/archives`, `/about`)
- Search uses server-side `/api/search`
- Contact forms are not wired to a mail backend
- Vendored CSS/JS under `static/html5up/` stay close to upstream; behavior is adapted only where Dune's architecture requires it

Compare side-by-side with [https://html5up.net/solid-state](https://html5up.net/solid-state) when QA'ing visual parity.
