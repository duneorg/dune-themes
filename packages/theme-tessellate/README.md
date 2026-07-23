# Tessellate

Scroll-section landing with icon features and dark content bands. Adapted from
[HTML5 UP Tessellate](https://html5up.net/tessellate) (CC BY 3.0).

![Tessellate screenshot](https://themes.getdune.org/tessellate/themes/tessellate/static/screenshot.png)

**Demo**: https://themes.getdune.org/tessellate

**Tags**: dune-theme, landing, html5up, scroll

**License:** Design by [HTML5 UP](https://html5up.net) (CC BY 3.0). Sites
using this theme must keep visible design credit per the
[Creative Commons Attribution 3.0 License](https://html5up.net/license).

## Install

```bash
dune theme:install jsr:@dune/theme-tessellate@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: tessellate
    src: jsr:@dune/theme-tessellate@1.0.0

theme:
  name: tessellate
  src: jsr:@dune/theme-tessellate@1.0.0
```

Scroll-section landing with icon features and dark content bands. See the
[live demo](https://themes.getdune.org/tessellate).

## Templates

| Template | Role |
|---|---|
| `default` | Full-page scroll sections on home; content bands elsewhere |
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
- **No dark mode / no color-scheme presets** — upstream Tessellate is a single design; a Dune dark or multi-scheme lift may land later as an optional enhancement, not as fidelity work.
- **CC BY credit** remains visible when `show_html5up_credit` is on (compare [https://html5up.net/tessellate](https://html5up.net/tessellate)).

