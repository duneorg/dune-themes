---
title: Customization
template: default
published: true
order: 2
metadata:
  description: CSS custom properties, adding your own color scheme, and inheriting from Caravan.
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
target — a child theme or a site-level stylesheet override can redeclare any
of these without touching Caravan's own CSS.

## Adding your own color scheme

The six presets in `utils/color-schemes.ts` are deliberately curated, not
freeform — see [Configuration](../configuration/) for why. If none fit, fork
the theme (`dune theme:install ./packages/theme-caravan --name my-caravan`)
and add an entry to `COLOR_SCHEMES`:

```ts
// utils/color-schemes.ts
export const COLOR_SCHEMES: Record<string, ColorScheme> = {
  // ...existing presets...
  teal: {
    label: "Teal",
    light: { accent: "#0f766e", menuBackground: "#f0fdfa" },
    dark: { accent: "#2dd4bf", menuBackground: "#122421" },
  },
};
```

Pick the light shade for contrast against `#fff` and the dark shade for
contrast against `#1b1d1e` — Tailwind's 700/400 steps are a reasonable
starting point, which is what the built-in six use.

## Inheriting from Caravan

Rather than forking, a new theme can declare `parent: caravan` in its own
`theme.yaml` to reuse Caravan's templates and locales while overriding just
`components/layout.tsx` or `static/style.css` — see the `dune-minimal` base
theme's README for the two inheritance patterns (derived skin vs.
independent look, same templates).
