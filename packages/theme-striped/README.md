# Striped

Responsive sidebar blog theme for Dune, adapted from
[HTML5 UP Striped](https://html5up.net/striped) (CC BY 3.0).

![Striped screenshot](https://themes.getdune.org/striped/themes/striped/static/screenshot.png)

**Demo**: https://themes.getdune.org/striped

**Tags**: dune-theme, blog, html5up, sidebar

**License:** Design by [HTML5 UP](https://html5up.net) — [Striped](https://html5up.net/striped)
(CC BY 3.0). Sites using this theme must keep visible design credit per the
[Creative Commons Attribution 3.0 License](https://html5up.net/license).

## Install

```bash
dune theme:install jsr:@dune/theme-striped@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: striped
    src: jsr:@dune/theme-striped@1.0.0

theme:
  name: striped
  src: jsr:@dune/theme-striped@1.0.0
```

Sidebar blog chrome with search, recent posts, and a mobile title-bar
toggle. Config covers `show_html5up_credit`, `sidebar_tagline`, and
`footer_text` — see the [live demo](https://themes.getdune.org/striped).

## Templates

| Template | Notes |
|---|---|
| `blog` | Post list with date badges and optional covers |
| `post` | Single post |
| `default` | Plain pages |
| `archives` | Year-grouped post list |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

## Attribution on live sites

The sidebar includes a visible link to HTML5 UP by default
(`show_html5up_credit`). Do not remove upstream design credit unless you
hold a separate [Pixelarity](https://pixelarity.com) license.

## From template to your site

1. Choose a starting design — this theme, another [HTML5 UP](https://html5up.net) template,
   or a [Pixelarity](https://pixelarity.com) design (including Pixelarity-only templates)
2. We adapt structure, styling, and Dune configuration to your content
3. You get a deployed, maintained Dune site — not a redistributable theme package

Themes we implement from Pixelarity are **bespoke client projects only** (agency-licensed;
not part of the public Dune theme catalog). [Contact us →](https://getdune.org/services)

## Deviations from upstream

- **Routes** use Dune fixtures (`/blog`, `/search`, `/archives`, `/about`) instead of static HTML5 UP page files.
- **Search** is server-side `/api/search` via the theme's `search` template, not a client-only index.
- **Contact / forms** from the upstream demo are not wired to a mail backend.
- **No dark mode / no color-scheme presets** — upstream striped is a single design; a Dune dark or multi-scheme lift may land later as an optional enhancement, not as fidelity work.
- **CC BY credit** remains visible when `show_html5up_credit` is on.
