# Massively

Hero blog theme for Dune, adapted from
[HTML5 UP Massively](https://html5up.net/massively) (CC BY 3.0).

![Massively screenshot](https://themes.getdune.org/massively/themes/massively/static/screenshot.png)

**Demo**: https://themes.getdune.org/massively

**Tags**: dune-theme, blog, html5up, hero

**License:** Design by [HTML5 UP](https://html5up.net) (CC BY 3.0). Sites
using this theme must keep visible design credit per the
[Creative Commons Attribution 3.0 License](https://html5up.net/license).

## Install

```bash
dune theme:install jsr:@dune/theme-massively@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: massively
    src: jsr:@dune/theme-massively@1.0.0

theme:
  name: massively
  src: jsr:@dune/theme-massively@1.0.0
```

Full-screen intro on home, featured post, and post grid. Config covers
`show_intro`, `intro_title`, `intro_subtitle`, `show_html5up_credit`, and
`footer_text` — see the [live demo](https://themes.getdune.org/massively).

## Templates

| Template | Notes |
|---|---|
| `blog` | Featured post + grid with “Full Story” actions |
| `post` | Single post |
| `default` | Plain pages |
| `archives` | Year-grouped post list |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

## Attribution on live sites

The footer includes a visible link to HTML5 UP by default
(`show_html5up_credit`). Do not remove upstream design credit unless you
hold a separate [Pixelarity](https://pixelarity.com) license.

## From template to your site

1. Choose a starting design — this theme, another [HTML5 UP](https://html5up.net) template,
   or a [Pixelarity](https://pixelarity.com) design (including Pixelarity-only templates)
2. We adapt structure, styling, and Dune configuration to your content
3. You get a deployed, maintained Dune site — not a redistributable theme package

Themes we implement from Pixelarity are **bespoke client projects only** (agency-licensed;
not part of the public Dune theme catalog). [Contact us →](https://getdune.org/services)
