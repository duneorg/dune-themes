---
title: Customization
template: default
published: true
metadata:
  description: Templates, CSS variables, and how Lucid differs from Caravan.
---

## Templates

- **`default`** — a docs page with optional edit link.
- **`section`** — same chrome, with a lead description from metadata.
- **`post`** — blog-shaped page if you mix posts into a docs site.
- **`search`** / **`error`** — themed search form and 404/500 pages.

The gradient sidebar and breadcrumb bar live in `components/layout.tsx`.

## CSS variables

- `--accent` / `--bg` / `--bg-alt` / `--code-bg` — from `color_scheme`
- `--sidebar-bg` — sidebar wash (tints with the page background)
- `--text`, `--muted`, `--border` — swap via `data-theme`

## vs Caravan

Caravan is the hugo-book-inspired docs theme (nested book sidebar). Lucid
is the Hextra-inspired modern docs look — flatter chrome, breadcrumb bar,
violet accent by default. Pick whichever mood fits the site.
