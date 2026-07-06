---
title: Deployment
template: default
published: true
order: 3
metadata:
  description: Running Dune in production.
---

Dune runs as a long-lived Deno process behind a reverse proxy, or as a
static export.

```bash
# systemd unit, simplified
[Service]
ExecStart=/usr/bin/deno run -A --unstable-kv jsr:@dune/core/cli serve --root /srv/mysite
Restart=on-failure
```

## Multisite

A single Dune process can serve several sites from one deployment via
`config/sites.yaml`, each with its own `path_prefix` (e.g.
`themes.getdune.org/caravan`) or hostname — no per-site vhost, TLS cert, or
process required.

> Client-side JavaScript that builds absolute paths (search widgets, theme
> toggles) needs to read `site.basePath` under path-prefix routing —
> server-rendered links are rewritten automatically, but inline `fetch()`
> calls are not.
