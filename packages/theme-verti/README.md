# Verti

Business landing with banner, feature boxes, and content sidebar. Adapted from
[HTML5 UP Verti](https://html5up.net/verti) (CC BY 3.0).

![Verti screenshot](https://themes.getdune.org/verti/themes/verti/static/screenshot.png)

**Demo**: https://themes.getdune.org/verti

**Tags**: dune-theme, landing, html5up, business

**License:** Design by [HTML5 UP](https://html5up.net) (CC BY 3.0). Sites
using this theme must keep visible design credit per the
[Creative Commons Attribution 3.0 License](https://html5up.net/license).

## Install

```bash
dune theme:install jsr:@dune/theme-verti@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: verti
    src: jsr:@dune/theme-verti@1.0.0

theme:
  name: verti
  src: jsr:@dune/theme-verti@1.0.0
```

Business landing with banner, feature boxes, and content sidebar. See the
[live demo](https://themes.getdune.org/verti).

## Templates

| Template | Role |
|---|---|
| `default` | Feature + sidebar landing on home; article pages elsewhere |
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
- **No dark mode / no color-scheme presets** — upstream Verti is a single design; a Dune dark or multi-scheme lift may land later as an optional enhancement, not as fidelity work.
- **CC BY credit** remains visible when `show_html5up_credit` is on (compare [https://html5up.net/verti](https://html5up.net/verti)).

