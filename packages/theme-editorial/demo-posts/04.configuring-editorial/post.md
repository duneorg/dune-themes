---
title: Configuring Editorial
date: 2026-03-08
template: post
published: true
summary: Logo suffix, sidebar blurb, and credit — what this live demo has set.
taxonomy:
  tag: [config, editorial]
---

Editorial’s config surface is small, but every key affects the sidebar
that follows you across every route. This demo sets all four keys away
from their schema defaults in `demo-config.json`.

## `logo_suffix`

Set to **“by HTML5 UP”**. It renders right after the bold site title
inside the `#header` logo link, at the top of `#main`, so the header
reads “**Editorial** by HTML5 UP” instead of just the bare site title.
Empty omits the suffix entirely — there’s no fallback text, so leaving
it blank is a legitimate choice for a plain wordmark.

## `sidebar_blurb`

Set to **“A magazine-style Dune blog with a persistent sidebar for
search, recent posts, and a short about note.”** instead of falling
back to the site description. It fills the “About” section near the
bottom of `#sidebar`, under the recent-posts mini-list — the last thing
a reader sees before the `#footer` copyright line. If this and the site
description are both empty, that About section doesn’t render at all.

## `show_html5up_credit`

Set to `true`. The `#footer` paragraph inside `#sidebar` appends
“Design: HTML5 UP”, linking to
[html5up.net/editorial](https://html5up.net/editorial), required under
CC BY. The toggle gates that single credit line — turn it off only with
a separate Pixelarity license.

## `footer_text`

Set to **“Editorial Demo”**, replacing the site title in the `#footer`
copyright paragraph inside `#sidebar` so a long product name doesn’t
crowd that narrow column.

There is **no** dark mode or color-scheme preset in this port. Upstream
Editorial is a single design; a Dune dark lift may land later as an
enhancement, not as fidelity work.
