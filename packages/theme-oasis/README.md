# Oasis

Landing and academic résumé theme for Dune — design inspired by
[Hugo Blox](https://hugoblox.com), Dune-native (not a port).

![Oasis screenshot](https://themes.getdune.org/oasis/themes/oasis/static/screenshot.png)

**Demo**: https://themes.getdune.org/oasis

**Tags**: dune-theme, portfolio, academic, landing, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-oasis@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: oasis
    src: jsr:@dune/theme-oasis@1.0.0

theme:
  name: oasis
  src: jsr:@dune/theme-oasis@1.0.0
```

Centered CV landing with avatar, role, organisation, social links,
education and interests lists, plus card grids for writing. Config covers
`color_scheme` (default teal), optional `scheme_switcher`, `avatar_url`,
`role`, and `organization` — see the [live demo](https://themes.getdune.org/oasis).

## Templates

| Template | Notes |
|---|---|
| `landing` | Avatar hero + bio + education/interests + collection cards |
| `blog` / `list` | Card list with pagination |
| `post` | Single post with tags |
| `default` | Plain pages (e.g. publications) |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

Not a port of Hugo Blox. For the faithful Blox port, see **Blox**; for a
sidebar personal portfolio, see **Fennec**.
