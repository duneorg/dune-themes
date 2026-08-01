---
title: Hyperspace chrome on Dune
date: 2026-03-15
template: post
published: true
summary: Sidebar nav, full-screen intro, and content wrapper — how Hyperspace maps onto Dune.
taxonomy:
  tag: [chrome, hyperspace, fidelity]
---

Upstream Hyperspace pairs a persistent left-edge `#sidebar` — icon-style
nav links that never move — with a scroll sequence of full-screen
sections: a fade-up `#intro`, a `#content` wrapper for the page body, and
a closing `#footer` with a menu-style copyright row.

On this Dune port, `#sidebar` renders on every route from the shared
layout, so navigating from `/` into a blog post or About page never loses
that fixed nav. `#intro` is home-only and conditional on `show_intro`; when
it's on, a `.scrolly` "Learn more" button smooth-scrolls to `#content`
using the same anchor-click handler the layout registers for every
`href="#..."` link, not a jQuery plugin. Inner pages skip `#intro`
entirely and drop straight into `#content` with the page's own title and
body.

Compare with [html5up.net/hyperspace](https://html5up.net/hyperspace) for
the sidebar's icon spacing, the intro's fade-up timing, and how the
sidebar collapses to a top bar at narrow widths. Honest deviations: search
is Dune's server-side `/api/search`, not a client-side index; `/archives`
and `/about` are generated Dune routes standing in for static HTML5 UP
pages; contact forms from the original zip have no mail backend. No dark
mode — Hyperspace upstream is one design, already dark by default, with no
Dune scheme switcher layered on top.
