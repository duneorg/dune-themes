---
title: Configuring Starlight
template: default
published: true
order: 2
metadata:
  description: config_schema options and per-page frontmatter, named like upstream where possible.
---

Options live in `theme.yaml`'s `config_schema` and are stored under the
`starlight` key in `data/theme-config.json`.

## Site options

| Key | Type | Default | What it does |
| --- | --- | --- | --- |
| `logo` | text | *(empty)* | Optional logo image URL before the site title |
| `sidebar_section` | text | `*` | Sidebar root section route; `*` for all top-level sections |
| `search` | toggle | `true` | Header search button (Ctrl/Cmd+K modal → `/api/search`) |
| `pagination` | toggle | `true` | Previous/next cards under the content |
| `social` | textarea | *(empty)* | JSON array of `{icon, label, href}` — icon names from Starlight's set |
| `edit_link_base` | text | *(empty)* | Upstream `editLink.baseUrl` — joined with the page content path |
| `language_labels` | select | `code` | `code` or native `name` via `Intl.DisplayNames` |
| `credits` | toggle | `false` | Show "Built with Starlight" in the footer |

This demo turns `credits` on and seeds two social links so you can see both.

## Per-page frontmatter

| Key | Effect |
| --- | --- |
| `template: splash` | Hero landing — no sidebar/ToC |
| `hero:` | Splash hero block (`title`, `tagline`, `image`, `actions`) |
| `sidebar: false` | Hide the sidebar on a docs page |
| `tableOfContents: false` | Hide the right-hand ToC |
| `draft: true` | Draft notice banner |
| `banner: { content }` | HTML banner above the page |
| `lastUpdated` / `updated` | Last-updated timestamp in the footer |

For a Dune-native dark-first docs theme inspired by Starlight, see
Nightfall (still on the polish queue).
