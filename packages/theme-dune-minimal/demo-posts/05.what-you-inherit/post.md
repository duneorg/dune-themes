---
title: What you actually inherit
date: 2026-07-10
template: post
published: true
summary: Templates, layout, and locales inherit per-file; config and mdx-components don't.
taxonomy:
  tag: [dune-minimal, architecture]
---

Inheriting from a parent theme in Dune isn't block-level template
inheritance — it's whole-file fallback, resolved child → parent for a
few specific things:

- **`templates/*.tsx`** — any template a child theme doesn't define falls
  back to the one here. Define `blog.tsx` in your own theme and only
  that file is overridden; `search.tsx`, `error.tsx`, and the rest still
  resolve to this package's copies.
- **`components/layout.tsx`** — the `Layout` prop every template receives
  resolves through the same chain. A child that ships its own layout
  gets it automatically threaded into every inherited template too.
- **`locales/*.json`** — merged per key. A child overriding one string
  doesn't need to copy the rest.

Two things deliberately **don't** inherit: `config_schema` in
`theme.yaml` (the admin UI only reads the active theme's manifest — copy
over the keys your templates actually reference), and
`mdx-components.ts` (Dune loads only the active theme's file; re-export
and extend the base one if you want its components too).

The theme's own README has the full breakdown, including the two
patterns for building on top of this — restyling the base outright, or
borrowing just the behavioral templates (`search`, `error`, `section`)
inside a fully independent layout.
