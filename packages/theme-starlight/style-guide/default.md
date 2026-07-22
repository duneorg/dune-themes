---
title: Style Guide
template: default
published: true
nav_title: Style Guide
metadata:
  description: Starlight components and markdown surfaces this port styles, in one place.
---

Reference for the surfaces upstream's stylesheet already paints. MDX
authors get the same look via the ported components (`Aside`, `Card`,
`Steps`, …).

## Asides

<aside aria-label="Note" class="starlight-aside starlight-aside--note">
<p class="starlight-aside__title" aria-hidden="true">Note</p>
<div class="starlight-aside__content">

Use `<Aside type="note">` in `.mdx` — or this raw markup in Markdown.

</div>
</aside>

<aside aria-label="Tip" class="starlight-aside starlight-aside--tip">
<p class="starlight-aside__title" aria-hidden="true">Tip</p>
<div class="starlight-aside__content">

`type="tip"` — rocket icon upstream.

</div>
</aside>

<aside aria-label="Caution" class="starlight-aside starlight-aside--caution">
<p class="starlight-aside__title" aria-hidden="true">Caution</p>
<div class="starlight-aside__content">

`type="caution"`.

</div>
</aside>

<aside aria-label="Danger" class="starlight-aside starlight-aside--danger">
<p class="starlight-aside__title" aria-hidden="true">Danger</p>
<div class="starlight-aside__content">

`type="danger"`.

</div>
</aside>

## Cards

<div class="card-grid">
<article class="card sl-flex">
<p class="title sl-flex"><span>Install</span></p>
<div class="body">Pin the theme from JSR and activate it.</div>
</article>
<article class="card sl-flex">
<p class="title sl-flex"><span>Configure</span></p>
<div class="body">Toggle search, pagination, credits, social links.</div>
</article>
</div>

## Steps

<ol class="sl-steps" role="list">
<li>Install from JSR</li>
<li>Set <code>sidebar_section</code> (or leave <code>*</code>)</li>
<li>Press <kbd>Ctrl</kbd><kbd>K</kbd> to open search</li>
</ol>

## Badges

<span class="sl-badge default small">default</span>
<span class="sl-badge note small">note</span>
<span class="sl-badge success small">success</span>
<span class="sl-badge caution small">caution</span>
<span class="sl-badge danger small">danger</span>

## Typography

| Element | Example |
| --- | --- |
| Inline code | `sidebar_section` |
| Link | [Upstream docs](https://starlight.astro.build) |
| Emphasis | *italic* and **bold** |

```ts
export const sidebarSection = "*";
```

> A plain blockquote — distinct from the coloured asides above.

## Theme picker

Use the header control to switch Light / Dark / Auto — upstream
`starlight-theme-select`, preference in `localStorage` as `starlight-theme`.
