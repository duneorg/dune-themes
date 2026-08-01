---
title: Configuring Fractal
date: 2026-03-08
template: post
published: true
summary: Header title, subtitle, phone mockup, credit, and copyright — what this demo has set.
taxonomy:
  tag: [config, fractal]
---

Fractal's config surface is all first-viewport: everything it exposes
shows up in the phone-mockup hero on `/`, not buried in a settings page.

## `header_title`

This demo sets **“Fractal”** via `demo-config.json`, rendered as the `h1`
next to the phone mockup. Empty falls back to the site title — fine for a
real site, but the demo names the theme explicitly so the hero always
matches what you're evaluating.

## `header_subtitle`

Set to **“A phone-first portfolio for Dune demos”**, the `<p>` under the
title. Falls back to the site description when empty; a blank subtitle
next to a phone mockup reads as unfinished, since upstream Fractal always
pairs the two.

## `phone_image`

Pointed at the vendored `static/html5up/images/screen.jpg` — the same
placeholder screenshot upstream Fractal ships inside the device frame. A
real site would swap this for an actual screenshot of the product or app
being showcased; leaving it empty falls back to this same file, so the
demo makes that default explicit rather than implicit.

## `show_html5up_credit`

On. Gates the visible **HTML5 UP** credit in the footer, required under CC
BY when the toggle is on. Turn it off only with a separate Pixelarity
license — it should hide every credit surface together.

## `footer_text`

Set to **“Fractal Demo”** so the copyright line reads as a demo, not a
site borrowing its own long title.

No dark mode here — upstream Fractal is one design; a Dune lift would be a
future enhancement, not fidelity work.
