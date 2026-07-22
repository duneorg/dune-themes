# Manual

Product documentation theme for Dune — design inspired by
[Just the Docs](https://github.com/just-the-docs/just-the-docs), Dune-native
(not a port).

![Manual screenshot](https://themes.getdune.org/manual/themes/manual/static/screenshot.png)

**Demo**: https://themes.getdune.org/manual

**Tags**: dune-theme, docs, sidebar, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-manual@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: manual
    src: jsr:@dune/theme-manual@1.0.0

theme:
  name: manual
  src: jsr:@dune/theme-manual@1.0.0
```

Full-height sidebar with brand + tagline, live search against `/api/search`,
active nav accent
border, and optional `label: New` / `Beta` title badges. Config covers
`color_scheme` (default purple / Just the Docs `#7253ed`), optional
`scheme_switcher`, `site_tagline`, and `footer_text` — see the
[live demo](https://themes.getdune.org/manual).

## Templates

| Template | Notes |
|---|---|
| `default` | Docs page + optional New/Beta label badge |
| `section` | Section index with lead description |
| `post` | Blog-shaped page if mixed into docs |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

Not a port of Just the Docs. For book-style sidebar docs, see **Caravan**;
for Hextra-inspired modern docs, see **Lucid**.
