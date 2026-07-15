# Sirocco

Original Dune theme, design inspired by [hugo-PaperMod](https://github.com/adityatelange/hugo-PaperMod) — a fast, minimalist blog theme.

![Sirocco screenshot](https://themes.getdune.org/sirocco/themes/sirocco/static/screenshot.png)

**Demo**: https://themes.getdune.org/sirocco

**Tags**: dune-theme, blog, minimal, inspired

## Install

```bash
dune theme:install jsr:@dune/theme-sirocco@1.2.1 --activate
```

Or by hand, in `config/site.yaml`:

```yaml
themes:
  - name: sirocco
    src: jsr:@dune/theme-sirocco@1.2.1

theme:
  name: sirocco
  src: jsr:@dune/theme-sirocco@1.2.1
```

**Templates**: `default` (plain page) · `post` (date, reading time, author, tags) · `blog` (card list, also works as a shorter home teaser via a collection `limit`) · `archives` (every post grouped by year and month). `search` and `error` aren't in Sirocco's own `templates/` — they're inherited from the `dune-minimal` base theme declared as `parent` in `theme.yaml`.

**Config schema**: `color_scheme` (blue/slate/green/purple/amber/rose —
curated light/dark-mode presets, each driving the accent color — links,
the active nav item (text and underline), blockquote borders, pagination/
search-result hovers — plus a tinted card background (post entries, search
results, archive/section lists, table row striping) and subtly tinted
body and code-block backgrounds derived from it), `scheme_switcher` (adds
a dropdown next to the dark-mode toggle so
visitors can preview the other presets client-side via `localStorage` —
doesn't touch the site's actual config; off by default, useful for a
showcase/demo site), `default_dark`, `show_reading_time`, `home_subtitle`.

Light/dark toggle persisted in localStorage, falling back to the visitor's
OS preference (`prefers-color-scheme`) when there's no stored choice —
including for visitors with JS disabled, via a pure-CSS fallback; scroll-
to-top button; tags render as static badges on each post (Dune has no
per-value tag-listing route to link them to). UI strings are localized via
`locales/en.json`.

Full configuration reference and a template/customization walkthrough are
in the [live demo](https://themes.getdune.org/sirocco)'s posts.
