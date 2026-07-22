---
title: Installing Starlight
template: default
published: true
order: 1
metadata:
  description: Install Starlight for Dune from JSR or a local path.
---

Install from JSR and activate:

```bash
dune theme:install jsr:@dune/theme-starlight@1.0.0 --activate
```

Or pin it by hand in `config/site.yaml`:

```yaml
themes:
  - name: starlight
    src: jsr:@dune/theme-starlight@1.0.0

theme:
  name: starlight
  src: jsr:@dune/theme-starlight@1.0.0
```

For local development against this monorepo:

```yaml
theme:
  name: starlight
  src: ./packages/theme-starlight
```

## Content shape

Starlight is a **docs** theme. Use `template: splash` on a landing page for
the hero layout; everything else is a normal docs page with sidebar + ToC.
Set `sidebar_section` to a section route, or `*` (this demo) to show every
top-level section.
