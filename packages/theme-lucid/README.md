# Lucid

Modern documentation theme for Dune — design inspired by
[Hextra](https://github.com/imfing/hextra), Dune-native (not a port).

![Lucid screenshot](https://themes.getdune.org/lucid/themes/lucid/static/screenshot.png)

**Demo**: https://themes.getdune.org/lucid

**Tags**: dune-theme, docs, modern, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-lucid@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: lucid
    src: jsr:@dune/theme-lucid@1.0.0

theme:
  name: lucid
  src: jsr:@dune/theme-lucid@1.0.0
```

Gradient sidebar, breadcrumb bar, optional “Edit this page” link, search,
and light/dark with an OS preference fallback. Config covers
`color_scheme` (default purple / Hextra violet), optional
`scheme_switcher`, `sidebar_label`, `edit_url`, and `footer_text` — see the
[live demo](https://themes.getdune.org/lucid).

## Templates

| Template | Notes |
|---|---|
| `default` | Docs page + optional edit link |
| `section` | Section index with lead description |
| `post` | Blog-shaped page if mixed into docs |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

Not a port of Hextra. For sidebar docs closer to hugo-book, see **Caravan**;
for dark-first Starlight-style docs, see **Nightfall**.
