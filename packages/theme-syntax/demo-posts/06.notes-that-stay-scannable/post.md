---
title: Notes that stay scannable
date: 2026-07-01
template: post
published: true
summary: Why Syntax uses a date column and tag chips instead of a magazine grid.
taxonomy:
  tag: [writing, syntax]
---

Syntax is for technical notes you skim as much as you read — changelogs,
how-tos, and short essays where the date and tags matter as much as the
headline.

The index keeps a monospace date column so a year's worth of posts stays
scannable. Tag chips jump to `/tags/{name}/`. Code blocks get a bordered
surface that fits the GitHub-adjacent palette without competing with the
prose.

None of that requires a faithful Chirpy port. Syntax borrows the mood —
compact header, date list, tech-blog chrome — and implements it as a
Dune-native theme with the usual templates, search, archives, and config
panel.
