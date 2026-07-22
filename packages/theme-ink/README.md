# Ink

Long-form writing theme for Dune — design inspired by
[Attila](https://github.com/zutrinken/attila), Dune-native (not a port).

![Ink screenshot](https://themes.getdune.org/ink/themes/ink/static/screenshot.png)

**Demo**: https://themes.getdune.org/ink

**Tags**: dune-theme, blog, writing, serif, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-ink@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: ink
    src: jsr:@dune/theme-ink@1.0.0

theme:
  name: ink
  src: jsr:@dune/theme-ink@1.0.0
```

Centered serif masthead, dark mode, reading time, author box, and tag
links (`/tags/{name}/`). Config options live in `theme.yaml` (`color_scheme`,
`scheme_switcher`, `default_dark`, `show_reading_time`, `home_subtitle`, author fields,
social URLs, `footer_text`). Full walkthrough is in the
[live demo](https://themes.getdune.org/ink)'s Installing / Configuring
posts.

## Templates

| Template | Notes |
|---|---|
| `default` | Plain page |
| `post` | Reading time, tags, author box |
| `blog` | Collection card list (home + `/blog`) |
| `archives` | Posts grouped by year / month |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

Not a port of Attila. For a near-identical upstream experience, use a
faithful port from the [dune-themes](https://github.com/duneorg/dune-themes)
catalog when available.
