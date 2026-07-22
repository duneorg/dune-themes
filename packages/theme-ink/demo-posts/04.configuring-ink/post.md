---
title: Configuring Ink
date: 2026-07-15
template: post
published: true
summary: Every config_schema option, and what this demo has set.
taxonomy:
  tag: [configuration, ink]
---

Ink keeps its `theme.yaml` config_schema to a handful of blog-shaped
options. Here's what each one does, and what this demo site actually has
set — you're reading the result of these values right now.

## `accent_color`

Freeform colour (default `#c0392b`). Drives links, active nav, and a few
accents in the layout. This demo uses the schema default.

## `default_dark`

Off in this demo. The header toggle still switches at runtime and
remembers your choice in `localStorage`. When this is off and you haven't
chosen yet, your OS light/dark preference decides (including with JS
disabled, via a CSS media query).

## `show_reading_time`

On in this demo. Every post's meta line includes an "N min read" estimate
from the post's word count.

## `home_subtitle`

Shown under the home title on the `blog` template. Seeded in this demo so
the masthead introduces Ink instead of a blank subtitle.

## Author fields

`author_name`, `author_bio`, and `author_avatar` feed the author box at
the bottom of every post (and fill in when a post doesn't set its own
`author`). This demo sets a name and bio so you can see the box.

## Social URLs

`twitter_url` and `github_url` render in the footer when set. This demo
points them at the Ink package folder and [x.com/zumbrunn](https://x.com/zumbrunn).

## `footer_text`

Optional override for the footer line. Leave empty for the default
© year · Powered by Dune line.
