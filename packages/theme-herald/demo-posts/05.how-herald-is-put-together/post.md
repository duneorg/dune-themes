---
title: How Herald is put together
date: 2026-07-10
template: post
published: true
summary: Templates, the home hero, and CSS variables worth knowing.
taxonomy:
  tag: [customization, herald]
cover: /themes/herald/static/demo/cover-put-together.jpg
---

Everything so far has been about `config_schema`. This post is for the
rest: what Herald's templates actually do.

## Templates

- **`default`** — a plain page: title, then the markdown body.
- **`post`** — large title, author/date meta, optional full-bleed cover.
- **`blog`** — excerpt feed with optional cover thumbnails (home + `/blog`).
- **`archives`** — every post grouped by year and month.
- **`search`** / **`error`** — themed search form and 404/500 pages.

The dark site header and home hero live in `components/layout.tsx` — they
aren't separate templates.

## CSS variables

- `--accent` / `--bg` / `--bg-alt` / `--code-bg` — from `color_scheme`
- `--header-bg` — dark masthead (Casper-style)
- `--text`, `--muted`, `--border` — swap via `data-theme`

Override from a site stylesheet loaded after the theme to re-skin without
forking the package.

---

*Cover photo by [Aaron Burden](https://unsplash.com/@aaronburden?utm_source=dune_themes&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=dune_themes&utm_medium=referral).*
