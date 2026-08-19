---
title: Configuring Read Only
date: 2026-03-08
template: post
published: true
summary: What this config surface actually controls on the live demo.
taxonomy:
  tag: [config, read-only]
---

Read Only’s schema brands the sidebar identity and the copyright strip.
Post listing layout and titleBar behavior are fixed in the layout and blog
templates, so there is no “sidebar width” knob to seed here.

## `avatar_url`

Image URL for `.image.avatar` at the top of `#header`. Empty keeps the
vendored `static/html5up/images/avatar.jpg`. Only safe `http(s)` or
site-relative paths are accepted — the layout runs the value through
`safeHref`.

## `sidebar_tagline`

Paragraph under the logo in the sidebar. This demo sets a concrete
Read Only-specific line via `demo-config.json` so the chrome doesn’t fall back
to an empty description. Empty uses the site description.

## `show_html5up_credit`

On in this demo. Gates the visible HTML5 UP credit (CC BY) inside the sidebar
footer’s `.copyright`. Leave it on unless you hold a separate Pixelarity
license — the toggle should hide every credit surface together, not orphan one
in the sidebar while another lingers elsewhere.

## `footer_text`

Copyright name shown as `&copy; {year} {footer_text}`. This demo sets
**“Read Only Demo”** via `demo-config.json` so the sidebar reads as a short
demo label instead of falling back to a long site title. Empty falls back to
the site title.

Because the schema stops there, Read Only’s fidelity comes from the fixed
sidebar and titleBar markup — see this demo’s chrome post for what that markup
actually renders.
