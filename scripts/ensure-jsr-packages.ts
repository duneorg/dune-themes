#!/usr/bin/env -S deno run -A
/**
 * Ensure @dune/theme-* JSR packages exist and are linked to duneorg/dune-themes.
 *
 * JSR OIDC publish (publish-jsr.yml) can only publish versions of packages that
 * already exist. Create them once with a personal token that has `all` scope
 * permission:
 *
 *   export JSR_TOKEN=...   # from https://jsr.io/account/tokens
 *   deno run -A scripts/ensure-jsr-packages.ts
 *   deno run -A scripts/ensure-jsr-packages.ts --slugs=striped,forty
 *
 * Then re-run: gh workflow run publish-jsr.yml -f tag={slug}-v1.0.0
 */

import { HTML5UP_TEMPLATES } from "./html5up-defs.ts";
import { jsrPackageName } from "./theme-package.ts";

const token = Deno.env.get("JSR_TOKEN");
if (!token) {
  console.error("JSR_TOKEN is not set. Create a token at https://jsr.io/account/tokens (permission: all).");
  Deno.exit(1);
}

const slugArg = Deno.args.find((a) => a.startsWith("--slugs="))?.slice("--slugs=".length);
const slugs = slugArg
  ? slugArg.split(",").map((s) => s.trim()).filter(Boolean)
  : HTML5UP_TEMPLATES.map((t) => t.slug);

const GH = { owner: "duneorg", name: "dune-themes" };

async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.jsr.io${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch { /* keep text */ }
  return { ok: res.ok, status: res.status, body };
}

let created = 0;
let linked = 0;
let existed = 0;
let failed = 0;

for (const slug of slugs) {
  const pkg = jsrPackageName(slug);
  const get = await api(`/scopes/dune/packages/${pkg}`);
  if (get.status === 404) {
    const create = await api(`/scopes/dune/packages`, {
      method: "POST",
      body: JSON.stringify({ package: pkg }),
    });
    if (!create.ok) {
      console.error(`✗ create ${pkg}: ${create.status}`, create.body);
      failed++;
      continue;
    }
    console.log(`✓ created @dune/${pkg}`);
    created++;
  } else if (get.ok) {
    existed++;
  } else {
    console.error(`✗ get ${pkg}: ${get.status}`, get.body);
    failed++;
    continue;
  }

  const link = await api(`/scopes/dune/packages/${pkg}`, {
    method: "PATCH",
    body: JSON.stringify({ githubRepository: GH }),
  });
  // Some API versions use PUT for github link — try common alternate if PATCH fails
  if (!link.ok) {
    const alt = await api(`/scopes/dune/packages/${pkg}/github`, {
      method: "PUT",
      body: JSON.stringify(GH),
    });
    if (!alt.ok) {
      console.warn(`  ! link github for ${pkg}: ${link.status}/${alt.status}`);
    } else {
      linked++;
      console.log(`  · linked github`);
    }
  } else {
    linked++;
    console.log(`  · linked github (@dune/${pkg})`);
  }
}

console.log(`\ncreated=${created} existed=${existed} linked=${linked} failed=${failed}`);
if (failed) Deno.exit(1);
