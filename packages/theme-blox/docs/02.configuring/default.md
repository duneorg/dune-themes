---
title: Configuring Blox
template: post
published: true
order: 2
date: 2026-07-02
summary: Navbar, theme mode, search, CTA, and landing block configuration.
---

## Site options (`config_schema`)

| Key | Default | What it does |
| --- | --- | --- |
| `title` | site title | Navbar brand text |
| `menu` | top-level nav | JSON `[{name, url}]` — leave empty to use auto nav |
| `theme_mode` | `system` | `system` / `light` / `dark` |
| `theme_toggle` | on | Show the light/dark control |
| `search` | on | Navbar search + Ctrl/Cmd+K modal |
| `sticky_header` | on | Sticky navbar |
| `cta` | *(empty)* | JSON `{text, url}` navbar button |
| `language_labels` | `code` | `code` or native `name` |
| `footer_text` | *(empty)* | HTML under the footer nav |

## Landing blocks

Academic CV plus marketing blocks (`hero`, `features`, `faq`, `stats`,
`pricing`, …). Author profiles live inline in `content.author`. Full YAML
and a live [Block showcase](../block-showcase/): see
[Blocks and shortcodes](../blocks-and-shortcodes/).
