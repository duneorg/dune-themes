# PaperMod demo site

Local preview of `@dune/theme-papermod` using shared blog fixture content.

```bash
# From repo root
deno task demo papermod
deno task demo:validate papermod
```

Open http://localhost:8765 after `demo` starts.

**Deploy target:** https://themes.getdune.org/papermod

Content is symlinked from `demos/_shared/blog/`. Theme is symlinked from
`packages/theme-papermod/`. Run `deno task demo:link papermod` if symlinks are
missing after checkout.
