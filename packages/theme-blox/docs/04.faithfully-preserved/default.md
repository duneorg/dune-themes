---
title: What's faithfully preserved
template: post
published: true
order: 4
date: 2026-07-04
summary: What "faithful" means for this Hugo Blox port versus Oasis.
---

Dune ships two themes from the Hugo Blox / Academic lineage:

- **Oasis** — *inspired* landing / academic CV (still on the polish queue)
- **This theme (Blox)** — a **faithful port** of Hugo Blox's Tailwind block
  framework and Academic CV layout

## Stylesheet & JS

`static/blox.css` is the upstream Tailwind v4 pipeline compiled against this
port's markup. `static/blox.js` ports the light/dark toggle, mobile menu,
dropdowns, and search modal shell (Pagefind → Dune `/api/search`).

## Blocks & shortcodes

Academic CV and marketing landing blocks keep upstream markup and class
names — see [Blocks and shortcodes](../blocks-and-shortcodes/) and the
[Block showcase](../block-showcase/). Unknown icon names fall back like
upstream's emoji fallback. Interactive bits (FAQ, stats counters, pricing
toggle, portfolio filters, typewriter) live in `static/blox.js`.
