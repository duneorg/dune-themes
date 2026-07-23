---
title: Sidebar chrome and CC BY credit
date: 2026-03-15
template: post
published: true
summary: Title-bar toggle, recent posts, search, and the upstream design credit.
taxonomy:
  tag: [chrome, striped, fidelity]
---

Upstream Striped is a two-column blog: sticky sidebar (title, tagline,
nav, search, recent posts, credit) and a main column of dated entries.
On narrow viewports the `#titleBar` control opens the same sidebar as a
drawer — exercise that on mobile when you dogfood this demo.

Dune maps the chrome to real routes:

- Home / Blog / About / Search / Archives from demo fixtures
- Search hits `/api/search` (server-side), not a static client index
- Contact-style forms from the HTML5 UP demo are not wired to a backend

The visible “Design: HTML5 UP” link is required under CC BY when
`show_html5up_credit` is on. Do not treat fidelity as license to strip it.
