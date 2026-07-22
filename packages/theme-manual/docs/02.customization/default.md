---
title: Customization
template: default
published: true
label: Beta
metadata:
  description: Templates, CSS variables, and how Manual differs from Lucid.
---

## Templates

- **`default`** — a docs page; frontmatter `label: New` or `Beta` adds a
  title badge.
- **`section`** — same chrome, with a lead description from metadata.
- **`post`** — blog-shaped page if you mix posts into a docs site.
- **`search`** / **`error`** — themed search form and 404/500 pages.

The full-height sidebar and live search box live in `components/layout.tsx`.

## CSS variables

- `--accent` / `--bg` / `--bg-alt` / `--code-bg` — from `color_scheme`
- `--sidebar-bg` — sidebar wash
- `--text`, `--muted`, `--border` — swap via `data-theme`

## vs Lucid

Lucid is the Hextra-inspired modern docs look (top header, breadcrumb,
edit link). Manual is the Just the Docs-inspired product docs chrome —
full-height sidebar, brand + tagline, live sidebar search, and
active nav left border. Pick whichever mood fits the site.
