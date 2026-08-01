---
title: Configuring Hyperspace
date: 2026-03-08
template: post
published: true
summary: Intro toggle, headline, subtitle, credit, and copyright — what this demo has set.
taxonomy:
  tag: [config, hyperspace]
---

Hyperspace's config surface is entirely about the full-screen intro on
`/` — whether it shows, and what it says.

## `show_intro`

On in this demo. Renders `#intro` as a fullscreen fade-up section above
`#content` on the home route only; every inner page skips straight to the
content section. Turning this off is a legitimate choice for a site that
wants Hyperspace's sidebar chrome without the scroll-to-reveal intro.

## `intro_title`

Set to **“Hyperspace”**, the `<h1>` inside `#intro`. Empty falls back to
the site title — reasonable for a real deployment, but the demo names the
theme explicitly so the intro always matches what's being evaluated.

## `intro_subtitle`

Set to **“A responsive sidebar landing for Dune demos”**, the line under
the headline. A blank subtitle next to a full-screen title reads as
unfinished, since upstream Hyperspace always pairs the two.

## `show_html5up_credit`

On. Gates the visible **HTML5 UP** credit inside `#footer`'s menu list,
required under CC BY when the toggle is on. Turn it off only alongside a
separate Pixelarity license — the switch should hide the credit surface
entirely, not leave it half-visible.

## `footer_text`

Set to **“Hyperspace Demo”** so the copyright line reads as a demo rather
than quietly reusing the site's own title.

No dark mode — upstream Hyperspace is a single design; a Dune scheme lift
stays a future enhancement, not part of fidelity.
