---
title: Installation
template: default
published: true
order: 1
metadata:
  description: Install the Dune CLI with Deno.
---

Dune runs on [Deno](https://deno.com). Install the CLI directly from JSR:

```bash
deno run -A jsr:@dune/core/cli init my-site
cd my-site
deno task dev
```

> No `npm install`, no lockfile drift between machines — Deno resolves
> `jsr:` and `npm:` specifiers straight from the registry and caches them
> globally.

## Requirements

| Requirement | Minimum version |
| --- | --- |
| Deno | 2.0 |
| Node | not required |

Once `deno task dev` is running, open `http://localhost:8000` — you should
see the default starter content.
