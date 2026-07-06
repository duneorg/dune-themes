# Caravan demo site

Local preview of `@dune/theme-caravan` using the shared docs fixture content.

```bash
# From repo root
deno task demo caravan
deno task demo:validate caravan
```

Open http://localhost:8810 after `demo` starts.

**Deploy target:** https://themes.getdune.org/caravan

Content is symlinked from `demos/_shared/docs/`. Theme is symlinked from
`packages/theme-caravan/`. Run `deno task demo:link caravan` if symlinks are
missing after checkout.
