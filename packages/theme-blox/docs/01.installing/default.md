---
title: Installing Blox
template: post
published: true
order: 1
date: 2026-07-01
summary: Install Hugo Blox for Dune from JSR or a local path.
---

```bash
dune theme:install jsr:@dune/theme-blox@1.0.0 --activate
```

Or pin it in `config/site.yaml`:

```yaml
themes:
  - name: blox
    src: jsr:@dune/theme-blox@1.0.0

theme:
  name: blox
  src: jsr:@dune/theme-blox@1.0.0
```

Landing pages use `template: landing` with a `sections:` list of blocks and
a `collections:` map for any `collection` blocks to reference.
