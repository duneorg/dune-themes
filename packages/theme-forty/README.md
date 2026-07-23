# Forty

Tile-grid landing with a banner hero and slide-out menu. Adapted from
[HTML5 UP Forty](https://html5up.net/forty) (CC BY 3.0).

![Forty screenshot](https://themes.getdune.org/forty/themes/forty/static/screenshot.png)

**Demo**: https://themes.getdune.org/forty

**Tags**: dune-theme, landing, html5up, tiles

**License:** Design by [HTML5 UP](https://html5up.net) (CC BY 3.0). Sites
using this theme must keep visible design credit per the
[Creative Commons Attribution 3.0 License](https://html5up.net/license).

## Install

```bash
dune theme:install jsr:@dune/theme-forty@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: forty
    src: jsr:@dune/theme-forty@1.0.0

theme:
  name: forty
  src: jsr:@dune/theme-forty@1.0.0
```

Banner hero, tile grid, and slide-out menu. See the
[live demo](https://themes.getdune.org/forty).

## Templates

| Template | Role |
|---|---|
| `default` | Landing tiles on home; plain pages elsewhere |
| `blog` | Post listing |
| `post` | Single post |
| `archives` | Year-grouped post list |
| `search` | Form search |
| `error` | Themed 404 / 500 |

## Attribution on live sites

Visible HTML5 UP credit is on by default (`show_html5up_credit`). Do not
remove upstream design credit unless you hold a separate
[Pixelarity](https://pixelarity.com) license.

## From template to your site

1. Choose a starting design — this theme, another [HTML5 UP](https://html5up.net) template,
   or a [Pixelarity](https://pixelarity.com) design
2. We adapt structure, styling, and Dune configuration to your content
3. You get a deployed, maintained Dune site — not a redistributable theme package

Themes we implement from Pixelarity are **bespoke client projects only**.
[Contact us →](https://getdune.org/services)

## Deviations from upstream

- **Routes** use Dune fixtures (`/blog`, `/search`, `/archives`, `/about`) instead of static HTML5 UP page files.
- **Search** is server-side `/api/search` via the theme's `search` template, not a client-only index.
- **Contact / forms** from the upstream demo are not wired to a mail backend.
- **No dark mode / no color-scheme presets** — upstream forty is a single design; a Dune dark or multi-scheme lift may land later as an optional enhancement, not as fidelity work.
- **CC BY credit** remains visible when `show_html5up_credit` is on.
