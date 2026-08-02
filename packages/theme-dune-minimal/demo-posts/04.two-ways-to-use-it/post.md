---
title: Two ways to use Dune Minimal
date: 2026-07-20
template: post
published: true
summary: Standalone theme, or the base every other theme's inheritance rests on.
taxonomy:
  tag: [dune-minimal, architecture]
---

Every other theme in this library either stands entirely on its own or
inherits from something — and for the ones that inherit, this is almost
always what they inherit *from*. Dune Minimal is the one theme in the
library designed to be used both ways.

## As a standalone theme

What you're looking at right now. `default`, `post`, `blog`, `section`,
`search`, and `error` templates; a layout with correct head metadata,
RTL support, and a persisted dark-mode toggle; a handful of reusable
components. No config beyond `accent_color`, `default_dark`, and
`footer_text`. It's deliberately small — a clean, semantic look you could
ship a real site with as-is.

## As a base

Set `parent: dune-minimal` in another theme's `theme.yaml` and Dune
resolves the theme chain child → parent for templates, the layout
component, and locale strings. A theme that only wants to change colors
and type needs nothing but a `theme.yaml` and a `style.css` — every
template, every behavior, comes from here. Sirocco is built exactly this
way: same base, own accent tokens and typography, `parent: dune-minimal`
in its own `theme.yaml`.

The next post walks through what "inherit" actually gets you, concretely.
