---
title: Read Only
template: blog
published: true
description: >
  Read Only adapted from HTML5 UP for Dune — persistent resume sidebar beside a
  post list, plus mobile titleBar toggle. Single upstream design; no dark mode
  or color-scheme presets in this port.
collection:
  items:
    "@page.children": "/blog"
  order:
    by: date
    dir: desc
  limit: 5
taxonomy:
  tag: [demo, blog, read-only]
---

Upstream [Read Only](https://html5up.net/read-only) is a two-pane resume blog:
a persistent `#header` sidebar carries avatar, title, tagline, nav, and
copyright; `#wrapper` / `#main` holds the reading surface. On narrow viewports
a `#titleBar` with `.toggle` slides the sidebar in and out. This Dune port
keeps that chrome but points every nav item at a real fixture — Home, Blog,
Search, Archives, About — so the sidebar never links into dead static HTML.
