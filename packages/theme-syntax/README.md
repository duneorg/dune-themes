# Syntax

Technical blog theme for Dune — design inspired by
[jekyll-theme-chirpy](https://github.com/cotes2020/jekyll-theme-chirpy),
Dune-native (not a port).

![Syntax screenshot](https://themes.getdune.org/syntax/themes/syntax/static/screenshot.png)

**Demo**: https://themes.getdune.org/syntax

**Tags**: dune-theme, blog, tech, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-syntax@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: syntax
    src: jsr:@dune/theme-syntax@1.0.0

theme:
  name: syntax
  src: jsr:@dune/theme-syntax@1.0.0
```

Date-column blog index, tag chips, reading time, pinned posts, archives,
search, and light/dark with an OS preference fallback. Config covers
`color_scheme` (default blue / Cobalt), optional `scheme_switcher`,
`show_reading_time`, `home_subtitle`, and `footer_text` — see the
[live demo](https://themes.getdune.org/syntax) posts for a walkthrough.

## Templates

| Template | Notes |
|---|---|
| `default` | Plain page |
| `post` | Reading time, tags, optional pin |
| `blog` | Date-column list (home + `/blog`) |
| `archives` | Posts grouped by year / month |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

Post frontmatter: `pinned: true`, `tags` or `taxonomy.tag`.

Not a port of Chirpy. For a near-identical upstream experience, use a
faithful port from the [dune-themes](https://github.com/duneorg/dune-themes)
catalog when available.
