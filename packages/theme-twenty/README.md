# Twenty

Banner landing with icon features, image sections, and CTA. Adapted from
[HTML5 UP Twenty](https://html5up.net/twenty) (CC BY 3.0).

![Twenty screenshot](https://themes.getdune.org/twenty/themes/twenty/static/screenshot.png)

**Demo**: https://themes.getdune.org/twenty

**Tags**: dune-theme, landing, html5up, banner, features

**License:** Design by [HTML5 UP](https://html5up.net) (CC BY 3.0). Sites
using this theme must keep visible design credit per the
[Creative Commons Attribution 3.0 License](https://html5up.net/license).

## Install

```bash
dune theme:install jsr:@dune/theme-twenty@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: twenty
    src: jsr:@dune/theme-twenty@1.0.0

theme:
  name: twenty
  src: jsr:@dune/theme-twenty@1.0.0
```

Banner landing with icon features and no-sidebar inner pages. See the
[live demo](https://themes.getdune.org/twenty).

## Templates

| Template | Role |
|---|---|
| `default` | Banner landing on home; no-sidebar pages elsewhere |
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
- **No dark mode / no color-scheme presets** — upstream Twenty is a single design; a Dune dark or multi-scheme lift may land later as an optional enhancement, not as fidelity work.
- **CC BY credit** remains visible when `show_html5up_credit` is on (compare [https://html5up.net/twenty](https://html5up.net/twenty)).

