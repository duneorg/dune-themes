---
title: Configuring Telephasic
date: 2026-03-08
template: post
published: true
summary: What each option changes on the live Telephasic demo.
taxonomy:
  tag: [config, telephasic]
---

Telephasic keeps a small config surface — enough to brand the chrome without inventing schemes upstream never had. Here’s what this demo actually shows.

## `hero_title`

See `theme.yaml` for the schema default. On this demo, leave it at a value that makes Telephasic’s upstream chrome visible — don’t ship a demo that hides the design you’re trying to show.

## `hero_subtitle`

See `theme.yaml` for the schema default. On this demo, leave it at a value that makes Telephasic’s upstream chrome visible — don’t ship a demo that hides the design you’re trying to show.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY). Leave it on unless you hold a Pixelarity license — the toggle should hide every credit surface together, not orphan one in the footer.

## `footer_text`

Copyright name. Empty falls back to the site title. Prefer a short demo name when the title is long.


There is **no** dark mode or color-scheme preset in this port. Upstream Telephasic is a single design; a Dune lift may land later as an enhancement, not as fidelity.

