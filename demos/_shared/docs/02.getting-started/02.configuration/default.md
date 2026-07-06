---
title: Configuration
template: default
published: true
order: 2
metadata:
  description: Site, system, and theme configuration files.
---

Dune sites are configured with a handful of YAML files under `config/`:

```yaml
# config/site.yaml
title: My Site
description: A site built with Dune
theme:
  name: caravan
```

```yaml
# config/system.yaml
content:
  dir: content
cache:
  enabled: true
```

Theme-specific settings (colors, toggles, footer text) live under
`theme_config` in `site.yaml`, validated against the theme's
`config_schema` in `theme.yaml`.

## Environment overrides

Any config key can be overridden with an environment variable using the
`DUNE_` prefix and double-underscore path separator, e.g.
`DUNE_SITE__TITLE` overrides `site.title`.
