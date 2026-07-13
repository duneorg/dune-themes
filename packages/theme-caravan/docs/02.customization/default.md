---
title: Customization
template: default
published: true
order: 2
metadata:
  description: CSS custom properties you can override from your own site's stylesheet.
---

## CSS custom properties

`static/style.css` drives everything off a small set of custom properties,
set on `:root` and re-set under `:root[data-theme="dark"]` /
`:root[data-theme="light"]` (the manual light/dark toggle) and a
`prefers-color-scheme: dark` media query (the default, before a visitor has
picked one explicitly):

| Property | Used for |
| --- | --- |
| `--color-text` / `--color-secondary` | Body text / muted text (dates, descriptions) |
| `--color-link` | Links, active sidebar item — driven by `color_scheme`, not set in the stylesheet itself |
| `--body-background` | Page background |
| `--menu-background` | Sidebar background — also driven by `color_scheme` |
| `--border-color` | Rules, table borders, input borders |
| `--code-background` | Inline code and code block background |
| `--menu-width` | Sidebar width (default `16rem`) |
| `--font-size` | Base font size (default `16px`) |

Everything except `--color-link` and `--menu-background` is a plain override
target — add your own site-level stylesheet redeclaring any of these and it
takes precedence over Caravan's own CSS, no theme changes needed.
