---
title: How Ink is put together
date: 2026-07-10
template: post
published: true
summary: Templates, the serif masthead, and CSS variables worth knowing.
taxonomy:
  tag: [customization, ink]
---

Everything so far has been about `config_schema`. This post is for the
rest: what Ink's templates actually do, and a couple of things you can
override from your own stylesheet.

## Templates

- **`default`** — a plain page: title, then the markdown body.
- **`post`** — title, date, reading time, author, tags, author box.
- **`blog`** — a list driven by a `collection:` block. Used for home (with
  a `limit`) and the full `/blog` archive.
- **`archives`** — every post grouped by year and month.
- **`search`** / **`error`** — themed search form and 404/500 pages.

## CSS variables

Ink's look is mostly a few custom properties on `:root`:

- `--font` / `--font-serif` — Libre Baskerville stack for body and titles
- `--max-width` — reading column (default `680px`)
- `--accent` — set from `accent_color` at render time
- `--bg`, `--text`, `--muted`, `--border` — light palette; dark mode swaps
  via `html.dark` (and a `prefers-color-scheme` fallback)

Override any of these from a site stylesheet loaded after the theme to
re-skin without forking the package.
