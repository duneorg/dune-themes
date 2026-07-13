---
title: How Sirocco is put together
date: 2026-07-01
template: post
published: true
summary: What each template renders, and a few CSS variables worth knowing about.
taxonomy:
  tag: [customization, sirocco]
---

Everything so far in this demo has been about `config_schema` — the four
options the admin panel can change without touching any code. This post is
for the rest: what Sirocco's templates actually do, and a couple of things
you can override from your own site's stylesheet if you want to go further
than the config panel allows.

## Templates

A content file's name picks which template renders it — `post.md` gets
the `post` template, `default.md` gets `default` — and `template:` in
frontmatter overrides that when you need to.

- **`default`** — a plain page: title, then the markdown body. Used for
  anything that isn't a post or the blog listing itself — an About page,
  a contact page, whatever a site needs that isn't dated content.
- **`post`** — an individual entry: title, date, reading time, author,
  tags. What every post in this demo (including this one) renders through.
- **`blog`** — a card-list view driven by a `collection:` block in
  frontmatter. Used both for the home page (a short teaser list) and the
  full `/blog` archive — the only difference is a `limit` in the
  collection definition.
- **`archives`** — every post grouped by year and month, for browsing
  chronologically instead of paging through the listing.

`search` and `error` aren't in Sirocco's own `templates/` folder — they're
inherited from the `dune-minimal` base theme Sirocco declares as its
`parent` in `theme.yaml`, and render inside Sirocco's own layout.

## A few things you can override

`static/style.css` sets a handful of CSS custom properties on `:root`,
re-set again under `.dark` for dark mode. A few worth knowing if you want
to adjust the look from your own site's stylesheet, without waiting on a
config option that may not exist:

| Property | Used for |
| --- | --- |
| `--main-width` | Content column width (default `720px`) |
| `--radius` | Corner rounding on post cards, tags, buttons |
| `--entry` | Post card / tag background color |
| `--border` | Table borders, the archive list's dividing lines |
| `--code-bg` | Inline code and code block background |

Redeclare any of these in a site-level stylesheet and it takes precedence
over Sirocco's own CSS — no need to fork anything for a color tweak or a
narrower column.
