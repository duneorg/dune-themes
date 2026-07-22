# Gale for Dune

Landing and blog theme inspired by [AstroWind](https://github.com/onwidget/astrowind)
— Dune-native, not a port.

![Gale screenshot](https://themes.getdune.org/gale/themes/gale/static/screenshot.png)

**Demo**: https://themes.getdune.org/gale

**Tags**: dune-theme, landing, blog, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-gale@1.0.0 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: gale
    src: jsr:@dune/theme-gale@1.0.0

theme:
  name: gale
  src: jsr:@dune/theme-gale@1.0.0
```

Sticky header with CTA, hero + feature grid on the homepage, card blog
grid, archives, search, and light/dark with an OS preference fallback.
Config covers `color_scheme` (blue/slate/green/purple/amber/rose/terracotta/teal), optional
`scheme_switcher`, hero copy/CTAs, three feature columns, and footer text —
see the [live demo](https://themes.getdune.org/gale) posts for a walkthrough.

**Templates**: `default` · `post` · `blog` · `archives` · `search` · `error`
(home hero and feature grid live in the layout)
