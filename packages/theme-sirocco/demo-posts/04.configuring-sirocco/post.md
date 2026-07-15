---
title: Configuring Sirocco
date: 2026-06-15
template: post
published: true
summary: The five things you can change, and what this demo has set.
taxonomy:
  tag: [configuration, sirocco]
---

Sirocco keeps its `theme.yaml` config_schema to five options. Here's what
each one does, and what this demo site actually has set — you're reading
the result of these values right now, not a description of them.

## `color_scheme`

Six curated presets — blue, slate, green, purple, amber, rose — rather
than a freeform color picker. This demo uses the schema default, blue.
Each preset drives the accent color (link color, the underline on the
active nav item, blockquote borders, pagination and search-result hovers)
plus a tinted card background on post entries, search results, and
archive/section lists, and a subtler tint on the page body itself derived
from that same card tint — so switching presets recolors the whole page,
not just the links.

## `scheme_switcher`

Off by default — most sites want one consistent brand color, not a menu of
options for visitors. This demo turns it on: the dropdown next to the
dark-mode toggle lets you preview the other five presets without touching
this site's actual configuration (your pick is remembered in
`localStorage`, same as the light/dark choice).

## `default_dark`

Off in this demo (the schema default). The header's sun/moon toggle still
switches at runtime and remembers your choice in `localStorage` regardless
of this setting. `default_dark` only decides which mode a first-time
visitor sees before they've chosen for themselves — and only when it's
turned on; left off, a first-time visitor's own OS light/dark preference
decides instead (including for visitors with JS disabled, via a pure-CSS
fallback), rather than always defaulting to light.

## `show_reading_time`

On in this demo. Every post's meta line — the one under the title, next to
the date — includes a "N min" estimate computed from the post's actual
word count. Turn it off and that meta line just shows the date and author
instead.

## `home_subtitle`

The line under the title on the home page. This demo sets it to introduce
what you're looking at, instead of leaving it blank.

None of these require touching a template file — the admin panel's Theme
Settings tab renders a form from this same `config_schema`, no code
changes needed for any of the above.
