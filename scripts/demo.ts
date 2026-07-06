#!/usr/bin/env -S deno run -A
/**
 * Run a theme demo dev server.
 *
 *   deno task demo papermod
 */

import { DEMO_SLUGS, demoDir, isDemoSlug, linkDemo } from "./demo-common.ts";

const slug = Deno.args[0];
if (!slug || !isDemoSlug(slug)) {
  console.error("Usage: deno task demo <slug>");
  console.error(`Available: ${DEMO_SLUGS.join(", ")}`);
  Deno.exit(1);
}

const dir = demoDir(slug);
try {
  await Deno.stat(dir);
} catch {
  console.error(`Demo site not found: demos/${slug}/`);
  Deno.exit(1);
}

await linkDemo(slug);

const manifest = JSON.parse(await Deno.readTextFile(`${dir}/deno.json`));
const port = manifest.tasks?.dev?.match(/--port (\d+)/)?.[1] ?? "8765";

console.log(`Starting demo for ${slug} at http://localhost:${port} …\n`);
const cmd = new Deno.Command("deno", {
  args: ["task", "dev"],
  cwd: dir,
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});
const { code } = await cmd.output();
Deno.exit(code ?? 0);
