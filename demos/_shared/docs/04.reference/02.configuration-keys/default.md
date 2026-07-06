---
title: Configuration Keys
template: default
published: true
order: 2
metadata:
  description: Common site.yaml and system.yaml keys.
---

## `config/site.yaml`

| Key | Type | Description |
| --- | --- | --- |
| `title` | string | Site title |
| `description` | string | Site meta description |
| `url` | string | Canonical site URL |
| `theme.name` | string | Active theme slug |
| `taxonomies` | string[] | Enabled taxonomy vocabularies (e.g. `tag`) |

## `config/system.yaml`

| Key | Type | Description |
| --- | --- | --- |
| `content.dir` | string | Content root directory |
| `content.src` | string | External content source (for multisite fixture reuse) |
| `cache.enabled` | boolean | Enable the page cache |
| `languages.supported` | string[] | Enabled locales for multi-language sites |
