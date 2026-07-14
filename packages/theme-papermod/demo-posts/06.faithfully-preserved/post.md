---
title: What's faithfully preserved
date: 2026-06-01
template: post
published: true
summary: PaperMod is a port, not a reimagining — what "faithful" actually means here.
taxonomy:
  tag: [papermod, faithful, port]
---

Dune's theme library has two families for the same upstream design.
[Sirocco](https://themes.getdune.org/sirocco) is *inspired by* Hugo
PaperMod — a Dune-native theme that borrows the idea and rebuilds it its
own way. This theme is the other kind: a **faithful port**, meaning the
goal isn't "similar," it's "the same," down to the pixel.

## The stylesheet is unmodified

`static/style.css` is upstream PaperMod's actual CSS bundle — every
`core/`, `common/`, and `includes/` file Hugo would normally emit
separately, concatenated in the same order Hugo's asset pipeline uses.
Nothing was rewritten or "cleaned up." If a class name exists in upstream
PaperMod, it exists here, doing the same thing.

## Markup matches 1:1

Every template in this theme reproduces its upstream layout's HTML
structure and class names exactly — `single.html`, `list.html`,
`archives.html`, `search.html`, `404.html`. Hugo's own template constructs
(`{{ if }}`, `{{ range }}`, partials) map onto Dune's equivalents, but the
*output* is what upstream PaperMod would render for the same content and
options.

## Shortcodes carry over

Upstream PaperMod content can use Hugo shortcodes — `{{< figure >}}`,
`{{< collapse >}}`, and so on. This port exposes the same set as MDX
components (`Figure`, `Collapse`, `Video`, `Audio`, `Ltr`, `Rtl`,
`InTextImg`) usable in `.mdx` content, with markup identical to the
originals.

## Config options keep their upstream names

Nearly every `config_schema` option here — and every per-page frontmatter
field (`showToc`, `hideMeta`, `cover: {...}`, `shareButtons: [...]`, and
so on) — uses the exact same name as the corresponding upstream Hugo
param. If you've configured PaperMod before, you already know how to
configure this.

Not everything could carry over unchanged, though — see the next post for
the handful of places this port had to adapt to Dune's architecture.
