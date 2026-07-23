# Landed

Scroll-snap spotlight landing with a sticky header. Adapted from
[HTML5 UP Landed](https://html5up.net/landed) (CC BY 3.0).

![Landed screenshot](https://themes.getdune.org/landed/themes/landed/static/screenshot.png)

**Demo**: https://themes.getdune.org/landed

**Tags**: dune-theme, landing, html5up, spotlights, scrolly

**License:** Design by [HTML5 UP](https://html5up.net) (CC BY 3.0). Sites
using this theme must keep visible design credit per the
[Creative Commons Attribution 3.0 License](https://html5up.net/license).

## Install

```bash
dune theme:install jsr:@dune/theme-landed@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: landed
    src: jsr:@dune/theme-landed@1.0.0

theme:
  name: landed
  src: jsr:@dune/theme-landed@1.0.0
```

Banner and spotlight sections on `/` with blog listing at `/blog`. See the
[live demo](https://themes.getdune.org/landed).

## Templates

| Template | Role |
|---|---|
| `default` | Spotlight landing on home; no-sidebar pages elsewhere |
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
