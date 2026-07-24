---
title: Configuring Forty
date: 2026-03-08
template: post
published: true
summary: Banner headline, logo tagline, and credit — what this demo has set.
taxonomy:
  tag: [config, forty]
---

This demo seeds non-defaults via `demo-config.json` so the home page
doesn’t look like empty schema defaults.

## `banner_title` and `show_banner`

With `show_banner` on (default), the home hero shows `banner_title` — here
**“Hi, this is Forty”** instead of the empty-default “Hi, my name is
{site title}”. Turn `show_banner` off and the tile grid becomes the first
thing you see; useful for inner-page-like landings, less so for matching
upstream Forty.

## `tagline`

The muted span next to the bold logo word. This demo uses **“for Dune”**
so the header reads as a product demo, not the upstream “by HTML5 UP”
fallback alone (credit still appears in the footer when enabled).

## `show_html5up_credit` and `footer_text`

Credit stays on. `footer_text` is **Forty Demo** so the copyright line
doesn’t reuse a long site title. No dark mode or multi-scheme — upstream
Forty is one design.
