---
title: Configuring Striped
date: 2026-03-08
template: post
published: true
summary: What each sidebar option changes on this live demo — not a schema dump.
taxonomy:
  tag: [config, striped]
---

Striped keeps three options, all set in this package’s `demo-config.json`
rather than left at schema defaults. You’re looking at the result of
those values right now: credit on, a coral-specific tagline under the
title, and a shortened copyright name.

## `show_html5up_credit`

Set to `true`. When on, the sidebar `.box.text-style1` panel appends
“Design by HTML5 UP” next to the tagline, and the `#copyright` list at
the bottom of the sidebar adds a second “Design: HTML5 UP” line — both
required under CC BY. The toggle gates both surfaces together on
purpose so a partial license swap can’t orphan one credit line while
hiding the other. This demo leaves it on so the fidelity bar stays
honest; the mobile drawer behind `#titleBar` shows the identical
sidebar markup, credit included.

## `sidebar_tagline`

This demo sets **“A coral-accented sidebar blog for Dune”**, replacing
the schema default (`A Dune site`). It renders directly under the
`#logo` site title inside the sticky sidebar, so it’s the first line of
copy a visitor reads before the nav, search box, or recent-posts list.
Because the sidebar is shared markup across `/`, `/blog`, and every
post route, one string brands the whole chrome instead of only the
home page.

## `footer_text`

Set to **“Striped Demo”** here instead of falling back to the site
title, so the `#copyright` line reads as a short, deliberate label
rather than a long marketing title wrapping awkwardly in a narrow
sidebar column.

There is **no** dark mode or color-scheme preset. Upstream Striped is one
light coral-accented design; a Dune dark lift may land later as an
enhancement, not as fidelity work.
