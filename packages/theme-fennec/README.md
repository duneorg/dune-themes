# Fennec

Personal portfolio and blog theme for Dune — design inspired by
[Astrofy](https://github.com/manuelernestog/astrofy), Dune-native (not a port).

![Fennec screenshot](https://themes.getdune.org/fennec/themes/fennec/static/screenshot.png)

**Demo**: https://themes.getdune.org/fennec

**Tags**: dune-theme, portfolio, personal, blog, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-fennec@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: fennec
    src: jsr:@dune/theme-fennec@1.0.0

theme:
  name: fennec
  src: jsr:@dune/theme-fennec@1.0.0
```

Persistent sidebar with optional avatar, bold home greeting, DaisyUI-style
post cards, and light/dark with an OS preference fallback. Config covers
`color_scheme` (default terracotta / warm orange), optional
`scheme_switcher`, `avatar_url`, `hero_greeting`, and `footer_text` — see
the [live demo](https://themes.getdune.org/fennec).

## Templates

| Template | Notes |
|---|---|
| `home` | Greeting hero + latest blog cards |
| `blog` / `list` | Card list with pagination |
| `post` | Single post with tags |
| `default` | Plain pages (e.g. publications) |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

Not a port of Astrofy. For an academic CV block layout, see **Blox**.
