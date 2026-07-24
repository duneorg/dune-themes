---
title: Configuring Striped
date: 2026-03-08
template: post
published: true
summary: What each sidebar option changes on this live demo — not a schema dump.
taxonomy:
  tag: [config, striped]
---

Striped keeps three options. You’re looking at the result of this demo’s
values right now: credit on, a short tagline under the title, and the
site title as the copyright name.

## `show_html5up_credit`

On by default. When on, the sidebar (and the mobile drawer behind
`#titleBar`) shows the HTML5 UP design credit required by CC BY. Flip it
off only if you hold a separate Pixelarity license — the toggle gates
both the tagline credit and the copyright-line credit so they don’t
drift. This demo leaves it on so the fidelity bar stays honest.

## `sidebar_tagline`

The muted line under the site title in the sidebar. Empty falls back to
the schema default (`A Dune site`). Change it when the demo should read
as your product, not a generic Dune sample — the home listing and post
pages both inherit the same sidebar, so one string brands the whole
chrome.

## `footer_text`

Copyright name in the sidebar footer. Empty uses the site title. Prefer
a short legal name here if the title is long or marketing-heavy.

There is **no** dark mode or color-scheme preset. Upstream Striped is one
light coral-accented design; a Dune dark lift may land later as an
enhancement, not as fidelity work.
