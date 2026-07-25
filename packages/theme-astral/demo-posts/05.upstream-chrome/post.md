---
title: Intro panel, icon nav, and project tiles
date: 2026-03-15
template: post
published: true
summary: How Astral’s panel UI maps onto Dune blog and search routes.
taxonomy:
  tag: [chrome, astral, fidelity]
---

Astral’s home is an `#home.panel.intro` with a chevron jumplink into
projects, plus further panels that tile toward Blog / About / Search /
Archives. Icon nav (from the layout) switches “rooms” the way upstream
switches panels.

On Dune:

- “See my work” lands on `/blog` (fixture + project posts)
- Panel images come from vendored `pic0N.jpg` / avatar assets
- Search is themed `/search` → `/api/search`, not a fake panel
- Covered project leaves keep the grid from looking like empty chrome

Compare with [html5up.net/astral](https://html5up.net/astral). You’re
looking for the intro portrait rhythm, icon rail, and panel padding. If
project tiles look empty, add covered posts (this demo ships three) —
chrome without leaves fails the depth bar even when coverage is green.
