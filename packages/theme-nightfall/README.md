# Nightfall

Dark-first documentation theme for Dune — design inspired by
[Starlight](https://starlight.astro.build), Dune-native (not a port).

![Nightfall screenshot](https://themes.getdune.org/nightfall/themes/nightfall/static/screenshot.png)

**Demo**: https://themes.getdune.org/nightfall

**Tags**: dune-theme, docs, dark, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-nightfall@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: nightfall
    src: jsr:@dune/theme-nightfall@1.0.0

theme:
  name: nightfall
  src: jsr:@dune/theme-nightfall@1.0.0
```

Fixed header with live search, nested sidebar, on-page TOC, optional splash
landing, and dark-first light/dark with OS fallback. Config covers
`color_scheme` (default purple), optional `scheme_switcher`, `github_url`,
and `tagline` — see the [live demo](https://themes.getdune.org/nightfall).

## Templates

| Template | Notes |
|---|---|
| `default` | Docs page + client TOC / scroll-spy |
| `section` | Section index with child links |
| `splash` | Sidebar-less hero (`hero.tagline` / `hero.actions`) |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

Not a port of Starlight. For the faithful Starlight port, see **Starlight**;
for Hextra-inspired modern docs, see **Lucid**.
