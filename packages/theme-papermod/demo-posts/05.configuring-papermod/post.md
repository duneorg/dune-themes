---
title: Configuring PaperMod
date: 2026-05-01
template: post
published: true
summary: The admin-editable options — and how they map onto upstream Hugo params.
taxonomy:
  tag: [configuration, papermod]
---

Most of PaperMod's upstream `params.yaml` options carry over as
`config_schema` entries, editable from the admin panel without touching
any code:

- **`default_theme`** — `auto` (respects the visitor's OS preference),
  `light`, or `dark`.
- **`show_reading_time`**, **`show_word_count`** — post meta line.
- **`show_breadcrumbs`** — the `Home > Blog > …` trail above a post title.
- **`show_toc`** / **`toc_open`** — table of contents sidebar on posts,
  and whether it starts expanded.
- **`show_share_buttons`** — social share row at the bottom of a post.
- **`show_code_copy_buttons`** — the little copy icon on fenced code
  blocks (see the "Code samples" post in this demo).
- **`show_rss_in_section`** — an RSS button on list pages, not just the
  usual `<link rel="alternate">` in `<head>`.
- **`home_title`** / **`home_content`** — the homepage intro block, unless
  a page's own `homeInfo:` frontmatter is set (frontmatter wins — this
  demo's home page uses frontmatter, which is why changing these two
  options wouldn't visibly do anything here without also removing that).
- **`footer_text`** — replaces the default "Powered by Dune" line.
- **`language_labels`** — `code` (shows `en`, `de`) or `name` (shows
  "English", "Deutsch" via `Intl.DisplayNames`) for the language switcher,
  when a site has more than one locale.

Everything above is set from `theme.yaml`'s `config_schema` block — the
same file that makes these options show up in the admin panel in the
first place. This demo runs with `show_toc`, `show_word_count`,
`show_breadcrumbs`, and `show_share_buttons` all turned on, so you can see
each of them on this very post.

Some things aren't admin-editable, because upstream PaperMod controls them
per-page instead of site-wide: `showToc`, `hideMeta`, `hideSummary`,
`cover: { image, alt, caption }`, `shareButtons: [x, reddit, …]` — all set
in a post's own frontmatter, same names as upstream.
