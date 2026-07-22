# Salon

Magazine-style blog theme for Dune — design inspired by
[Liebling](https://github.com/eddiesigner/liebling), Dune-native (not a port).

![Salon screenshot](https://themes.getdune.org/salon/themes/salon/static/screenshot.png)

**Demo**: https://themes.getdune.org/salon

**Tags**: dune-theme, blog, magazine, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-salon@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: salon
    src: jsr:@dune/theme-salon@1.0.0

theme:
  name: salon
  src: jsr:@dune/theme-salon@1.0.0
```

Featured lead post on the blog index, card grid for remaining posts, cover
images and category tags, archives, search, and light/dark with an OS
preference fallback. Config covers `color_scheme` (default rose / Crimson),
optional `scheme_switcher`, `home_subtitle`, and `footer_text` — see the
[live demo](https://themes.getdune.org/salon) posts for a walkthrough.

## Templates

| Template | Notes |
|---|---|
| `default` | Plain page |
| `post` | Centered title, tags, optional cover |
| `blog` | Featured lead + card grid (home + `/blog`) |
| `archives` | Posts grouped by year / month |
| `search` | Form search over Dune `/api/search` |
| `error` | Themed 404 / 500 |

Post frontmatter: `cover`, `tags` or `taxonomy.tag`.

Not a port of Liebling. For a near-identical upstream experience, use a
faithful port from the [dune-themes](https://github.com/duneorg/dune-themes)
catalog when available.
