---
title: Configuring Parallelism
date: 2026-03-08
template: post
published: true
summary: Subtitle, credit, and copyright — what this live Parallelism demo has set.
taxonomy:
  tag: [config, parallelism]
---

Parallelism's config surface is small, but one field — `home_subtitle` — is
specific to this theme's footer sentence, so this demo seeds all three
fields rather than leaving the footer half-finished.

## `home_subtitle`

Appended to the footer's "This is **{site title}**" line with an em dash.
This demo sets **"a horizontal scroll of frames"** so the sentence reads as a
complete thought instead of trailing off after the site title. Empty falls
back to `site.description`; if both are empty, the footer sentence just ends
after the linked title.

## `show_html5up_credit`

On here. Gates the "a responsive portfolio theme by HTML5 UP adapted for
Dune" clause and the separate copyright-row credit link. Both are wired to
the same toggle, so turning it off removes the design credit from the footer
entirely — leave it on unless you hold a separate Pixelarity license.

## `footer_text`

Copyright name shown in the final copyright row, separate from the "This is…"
sentence above it. This demo uses **Parallelism Demo** so the row stays short
regardless of the configured site title.

No dark mode in this port — upstream Parallelism is a single design.
