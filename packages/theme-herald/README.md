# Herald

Publication-style blog theme for Dune — design inspired by
[Casper](https://github.com/TryGhost/Casper), Dune-native (not a port).

![Herald screenshot](https://themes.getdune.org/herald/themes/herald/static/screenshot.png)

**Demo**: https://themes.getdune.org/herald

**Tags**: dune-theme, blog, publication, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-herald@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: herald
    src: jsr:@dune/theme-herald@1.0.0

theme:
  name: herald
  src: jsr:@dune/theme-herald@1.0.0
```

Dark masthead, full-width home hero with optional background image, excerpt
feed with author lines and cover thumbnails, archives, search, and
light/dark with an OS preference fallback. Config covers `color_scheme`
(default blue / Casper sky), optional `scheme_switcher`, hero fields,
author defaults, and `footer_text` — see the
[live demo](https://themes.getdune.org/herald) posts for a walkthrough.

## Templates

| Template | Notes |
|---|---|
| `default` | Plain page |
| `post` | Title, author/date, optional cover |
| `blog` | Excerpt feed (home + `/blog`) |
| `archives` | Posts grouped by year / month |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

Home hero lives in the layout (not a separate template).

Not a port of Casper. For a near-identical upstream experience, use a
faithful port from the [dune-themes](https://github.com/duneorg/dune-themes)
catalog when available.
