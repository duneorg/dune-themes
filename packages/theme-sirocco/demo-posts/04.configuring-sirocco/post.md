---
title: Configuring Sirocco
date: 2026-06-01
template: post
published: true
summary: The four things you can change, and what this demo has set.
taxonomy:
  tag: [configuration, sirocco]
---

Sirocco keeps its `theme.yaml` config_schema to four options. Here's what
each one does, and what this demo site actually has set — you're reading
the result of these values right now, not a description of them.

## `accent_color`

A single color picker, not a preset list — this demo uses the schema
default, `#1e88e5`. It shows up in link hover states and the accent
underline on the active nav item. Change it and every one of those updates
without touching CSS.

## `default_dark`

Off in this demo (the schema default). The header's sun/moon toggle still
switches at runtime and remembers your choice in `localStorage` regardless
of this setting — `default_dark` only decides which mode a first-time
visitor sees before they've chosen for themselves.

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
