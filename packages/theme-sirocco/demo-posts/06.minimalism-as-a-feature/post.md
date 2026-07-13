---
title: Minimalism is a feature, not an aesthetic
date: 2026-04-01
template: post
published: true
author: Sirocco
summary: Why this theme has four config options instead of forty.
taxonomy:
  tag: [design, minimalism]
---

Most blog themes accumulate options the way a junk drawer accumulates
batteries — nobody sets out to add forty settings, it just happens one
reasonable-sounding feature request at a time. Sirocco's `theme.yaml` has
exactly four: an accent color, a default color mode, a reading-time
toggle, and a home page subtitle. That's not an oversight. It's the actual
design.

## The cost of an option nobody asked for

Every config option is a promise: it has to be documented, it has to be
tested in combination with every other option, and it has to keep working
across every future change to the theme. A toggle that ships because it
seemed easy to add is still a toggle someone has to reason about a year
later when something breaks in a configuration nobody actually uses. The
cheapest option to maintain is the one that doesn't exist.

This isn't an argument against configurability in general — it's an
argument for being deliberate about which four things earn a place in
`config_schema` versus which hundred things get quietly decided once, in
the stylesheet, and never revisited. Sirocco's type scale, its spacing
rhythm, the shape of its post cards — none of that is configurable, and
none of it needs to be. A visitor to a Sirocco-powered site should never
be able to tell whether the person running it changed a setting or just
left everything at its default, because the defaults are the actual
design decision, not a placeholder waiting to be overridden.

## What earns a config option

The four options that did make the cut share something: each one is a
choice that's genuinely a matter of taste or context, not a matter of
quality. Whether your brand color is blue or green isn't a design
question Sirocco can answer for you — that's `accent_color`. Whether your
readers land in a dark room or a bright office by default isn't something
the theme can know — that's `default_dark`. Whether a reading-time
estimate is useful or noise depends entirely on your audience — that's
`show_reading_time`. And whether your home page needs an extra line of
context is a decision about your specific site, not about Sirocco — that's
`home_subtitle`.

Everything else — the grid, the type scale, the way a post's meta line is
laid out, the exact shade of gray used for secondary text — is a design
decision Sirocco has already made, on your behalf, so you don't have to.
That's the actual value of using a theme instead of building a site from
scratch: someone else already spent the time arguing with themselves about
whether blockquotes should have a background tint (they shouldn't) so you
don't have to.

If you're reading this in the demo site with `show_reading_time` turned
on, you've just seen the feature working: this post is long enough to
clock in at more than the flat "1 min" every shorter post here shows,
because the estimate is computed from the actual rendered word count, not
guessed.
