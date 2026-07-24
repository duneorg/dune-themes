---
title: Sidebar chrome and CC BY credit
date: 2026-03-15
template: post
published: true
summary: Title-bar toggle, recent posts, search, and the upstream design credit.
taxonomy:
  tag: [chrome, striped, fidelity]
---

Upstream Striped is a two-column blog: a sticky sidebar (title, tagline,
nav, search, recent posts, credit) and a main column of dated entries.
On narrow viewports the `#titleBar` control opens that same sidebar as a
drawer — open it on mobile when you dogfood this demo; if the toggle
does nothing, the fidelity pass failed.

Dune maps the chrome to real routes instead of static HTML files:

- Home / Blog / About / Search / Archives from demo fixtures and theme posts
- Search hits `/api/search` (server-side), not a client Fuse index
- Contact-style forms from the HTML5 UP demo are not wired to a backend

Compare side-by-side with [html5up.net/striped](https://html5up.net/striped):
coral accents, date badges, and the recent-posts list should feel like
the same family. The visible “Design: HTML5 UP” link is required under
CC BY when `show_html5up_credit` is on — don’t treat fidelity as license
to strip it.
