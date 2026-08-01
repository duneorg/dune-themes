---
title: Configuring Story
date: 2026-03-08
template: post
published: true
summary: Credit and copyright — what this live Story demo has set, and why the schema stays small.
taxonomy:
  tag: [config, story]
---

Story's config surface is the thinnest in this batch — two fields — because
the upstream design has no header tagline or banner headline slot to seed.
Every heading you see on the home route (banner `<h1>`, spotlight `<h2>`s,
gallery caption) comes straight from the template, not from `demo-config.json`.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit line rendered by
`StoryFooter` next to the copyright text (CC BY). Leave it on unless you hold
a separate Pixelarity license — the toggle should hide the credit sentence
entirely, not just fade it.

## `footer_text`

Copyright name. This demo uses **Story Demo** so the icon-footer's copyright
line stays short. Empty falls back to `site.title`, and — unusually for this
theme family — the layout's own fallback ("Story Demo") only fires when
`site.title` itself is also unset, so seeding `footer_text` here is mostly
about making the copyright name explicit rather than strictly required.

There is no dark mode or color-scheme preset in this port. Upstream Story is
a single design; a Dune lift may land later as an enhancement, not as
fidelity work.
