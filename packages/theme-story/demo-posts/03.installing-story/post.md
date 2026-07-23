---
title: Installing Story
date: 2026-03-01
template: post
published: true
summary: Add Story to a Dune site from JSR or a release ZIP.
taxonomy:
  tag: [install, story]
---

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-story@1.0.0 --activate
```

## From a ZIP

Grab `story-1.0.0.zip` from
[dune-themes releases](https://github.com/duneorg/dune-themes/releases),
extract into `themes/story/`, then set `theme.name: story` in `site.yaml`.
