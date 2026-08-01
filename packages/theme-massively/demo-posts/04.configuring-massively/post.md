---
title: Configuring Massively
date: 2026-03-08
template: post
published: true
summary: Intro headline, subtitle, and credit — what this live demo has set.
taxonomy:
  tag: [config, massively]
---

Massively’s config surface exists mostly to control the `#intro`
full-screen title card. This demo sets four of the five keys away from
their schema defaults via `demo-config.json`.

## `show_intro`

Set to `true`. When on, `components/layout.tsx` renders `#intro` above
`#header` on the home route only (`isHome && !hideIntro`), adding a
`fade-in` class to `#wrapper` for the entrance transition. Turn it off
and the home page starts directly at `#header` and the card grid —
useful if you want Massively to read like an ordinary blog index rather
than a hero landing, but off by default here so the upstream first
impression stays visible.

## `intro_title`

Set to **“Massively”** — the schema default already falls back to the
site title, so this demo makes that explicit rather than leaving it
implicit. It renders as the large `<h1>` inside `#intro`.

## `intro_subtitle`

Set to **“A full-screen intro for Dune, before the post cards begin.”**
instead of the schema default (site description). It’s the line under
the intro title, directly above the `#header` scroll-down button
(`a.button.icon.solid.solo.fa-arrow-down.scrolly`), which smooth-scrolls
to `#header` when clicked.

## `show_html5up_credit`

Set to `true`. The `#copyright` block at the bottom of `#main` appends
a “Design: HTML5 UP” link required under CC BY. Leave it on unless you
hold a separate Pixelarity license — the toggle should hide every
credit surface together, not orphan one in the footer.

## `footer_text`

Set to **“Massively Demo”**, replacing the site title in `#copyright`
so a long product name doesn’t crowd the footer next to the credit
line.

There is **no** dark mode or color-scheme preset in this port. Upstream
Massively is a single design; a Dune dark lift may land later as an
enhancement, not as fidelity work.
