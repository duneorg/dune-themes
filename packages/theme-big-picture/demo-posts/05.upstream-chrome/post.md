---
title: Intro, scroll sections, and gallery
date: 2026-03-15
template: post
published: true
summary: How Big Picture’s scroll chrome maps onto Dune home vs posts.
taxonomy:
  tag: [chrome, big-picture, fidelity]
---

Upstream Big Picture is a vertical reel. This port keeps the reel on home
and uses a quieter `main style1` content box on every other route.

On home you should see:

1. `#intro` — fullscreen, “Hey.”, down button to `#one`
2. `#one` / `#two` — alternating right/left fullscreen sections
3. `#work` — six-thumb gallery from vendored `thumbs/0N.jpg`
4. Explore actions toward Blog and About

The down buttons use `scrollIntoView` — if `#one` is missing, the first
CTA is a no-op and the demo feels broken. Compare with
[html5up.net/big-picture](https://html5up.net/big-picture) for section
rhythm and gallery density.

Inner pages (this post): no fullscreen stack — just the content box and
header/footer. That’s intentional. Don’t expect the gallery on `/blog`.
Search is `/api/search`; upstream contact forms stay unwired.
