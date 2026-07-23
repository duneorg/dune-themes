# Telephasic

Business landing with hero, feature rows, and promo band. Adapted from
[HTML5 UP Telephasic](https://html5up.net/telephasic) (CC BY 3.0).

![Telephasic screenshot](https://themes.getdune.org/telephasic/themes/telephasic/static/screenshot.png)

**Demo**: https://themes.getdune.org/telephasic

**Tags**: dune-theme, landing, html5up, business, hero

**License:** Design by [HTML5 UP](https://html5up.net) (CC BY 3.0). Sites
using this theme must keep visible design credit per the
[Creative Commons Attribution 3.0 License](https://html5up.net/license).

## Install

```bash
dune theme:install jsr:@dune/theme-telephasic@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: telephasic
    src: jsr:@dune/theme-telephasic@1.0.0

theme:
  name: telephasic
  src: jsr:@dune/theme-telephasic@1.0.0
```

Hero, feature rows, promo band, and no-sidebar inner pages. See the
[live demo](https://themes.getdune.org/telephasic).

## Templates

| Template | Role |
|---|---|
| `default` | Business landing on home; no-sidebar pages elsewhere |
| `blog` | Post listing |
| `post` | Single post |
| `archives` | Year-grouped post list |
| `search` | Form search |
| `error` | Themed 404 / 500 |

## Attribution on live sites

Visible HTML5 UP credit is on by default (`show_html5up_credit`). Do not
remove upstream design credit unless you hold a separate
[Pixelarity](https://pixelarity.com) license.

## Deviations from upstream

- **Routes** use Dune fixtures (`/blog`, `/search`, `/archives`, `/about`) instead of static HTML5 UP page files.
- **Search** is server-side `/api/search` via the theme's `search` template, not a client-only index.
- **Contact / forms** from the upstream demo are not wired to a mail backend.
- **No dark mode / no color-scheme presets** — upstream Telephasic is a single design; a Dune dark or multi-scheme lift may land later as an optional enhancement, not as fidelity work.
- **CC BY credit** remains visible when `show_html5up_credit` is on (compare [https://html5up.net/telephasic](https://html5up.net/telephasic)).

