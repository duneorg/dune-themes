---
title: Installing Dimension
date: 2026-03-01
template: post
published: true
summary: Add Dimension’s modal-panel landing to a Dune site.
taxonomy:
  tag: [install, dimension]
---

Dimension’s home is a centered header with a gem logo and a short nav.
Clicking a nav item reveals an article panel over the landing — not a
full page reload in the upstream HTML. On Dune, those nav items are real
routes; the panel chrome still opens with `is-article-visible`.

## From JSR (recommended)

```bash
dune theme:install jsr:@dune/theme-dimension@1.0.2 --activate
```

## From a ZIP

Extract `dimension-1.0.1.zip` into `themes/dimension/` and set
`theme.name: dimension`.

Open `/` first — you should see only the landing. Then open Blog or About
and confirm the article panel appears with a close control and Escape
support. Prefer JSR for versioned updates.
