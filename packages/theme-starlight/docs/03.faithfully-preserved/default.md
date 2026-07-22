---
title: What's faithfully preserved
template: default
published: true
order: 3
metadata:
  description: What "faithful" means for this port versus an inspired sibling.
---

Dune's theme library has two families for the same upstream design. This
theme is the **faithful** one: match Starlight pixel-for-pixel where Dune's
architecture allows it. Nightfall (inspired, dark-first) is the Dune-native
reimagining still waiting on its polish pass.

## The stylesheet is upstream

`static/starlight.css` bundles upstream global CSS verbatim (cascade layers,
props, reset, asides, utils, markdown, anchor-links) plus component styles
hand-descoped from each `.astro` scoped `<style>` block. Class names that
exist upstream exist here.

## Client behaviour is upstream

Theme picker, mobile menu, ToC scroll spy, tabs sync, sidebar state
persistence, and the search modal shell live in `static/starlight.js` —
the upstream custom-element scripts, bundled. Only the search *backend*
differs (see [Adapting to Dune](../adapting-to-dune/)).

## Components carry over

`Aside`, `Badge`, `Card`, `CardGrid`, `LinkCard`, `LinkButton`, `Steps`,
`Tabs`/`TabItem` (with `syncKey`), `FileTree`, `Icon` — markup identical to
upstream user-components. See the [Style Guide](/style-guide/).

## Config keeps familiar names

`sidebar_section`, `pagination`, `social`, `edit_link_base`, splash
`hero:` blocks, `tableOfContents`, `draft`, `banner` — if you've configured
Starlight before, you already know most of this surface.
