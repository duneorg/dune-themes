---
title: Installing Book
template: default
published: true
order: 1
metadata:
  description: Install Hugo Book for Dune from JSR or a local path.
---

Install from JSR and activate:

```bash
dune theme:install jsr:@dune/theme-book@1.0.0 --activate
```

Or pin it by hand in `config/site.yaml`:

```yaml
themes:
  - name: book
    src: jsr:@dune/theme-book@1.0.0

theme:
  name: book
  src: jsr:@dune/theme-book@1.0.0
```

For local development against this monorepo:

```yaml
theme:
  name: book
  src: ./packages/theme-book
```

## Content shape

Book is a **docs** theme. Put your documentation under a section (upstream
defaults to `docs/`) and set `book_section` to that section's route — or use
`*` to show every top-level section in the sidebar, which is what this demo
does against the shared docs fixture.
