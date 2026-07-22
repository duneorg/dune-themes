/**
 * Blocks & shortcodes reference template — live preview + YAML for each
 * ported block, then the page body (shortcodes / not-ported).
 */
import type { TemplateProps } from "@dune/core/content/types";
import { stringify } from "@std/yaml";
import Layout from "../components/layout.tsx";
import { type BlockDef, renderBlock } from "../components/blocks.tsx";
import { BLOCK_DOC_GROUPS } from "../components/blocks-docs-data.ts";
import { markdownBlock, pageTitle, str } from "../utils/blox.ts";

function demoYaml(demo: BlockDef): string {
  const row: Record<string, unknown> = { block: demo.block };
  if (demo.id) row.id = demo.id;
  if (demo.content && Object.keys(demo.content).length) row.content = demo.content;
  if (demo.design && Object.keys(demo.design).length) row.design = demo.design;
  return stringify([row]).trimEnd();
}

export default async function BlocksDocsTemplate(props: TemplateProps) {
  const t = (props as unknown as { t?: (k: string) => string }).t ?? ((k: string) => k);
  const page = props.page;
  const fm = page.frontmatter as Record<string, unknown>;
  const html = await page.html();
  const Frame = (props.Layout ?? Layout) as typeof Layout;
  const lead = str(fm.lead);
  const ctx = { props, t };

  return (
    <Frame {...props}>
      <div class="mx-auto flex max-w-screen-xl">
        <article class="w-full break-words flex min-h-[calc(100vh-var(--navbar-height))] min-w-0 justify-center pb-8">
          <main class="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
            <h1 class="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {pageTitle(page)}
            </h1>

            {lead && (
              <div
                class="prose prose-slate lg:prose-xl dark:prose-invert mt-6 mb-12"
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{ __html: markdownBlock(lead) }}
              />
            )}

            {BLOCK_DOC_GROUPS.map((group) => (
              <section class="mb-20" key={group.title}>
                <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
                  {group.title}
                </h2>
                {group.intro && (
                  <div
                    class="prose prose-slate dark:prose-invert mb-10 max-w-3xl"
                    // deno-lint-ignore react-no-danger
                    dangerouslySetInnerHTML={{ __html: markdownBlock(group.intro) }}
                  />
                )}

                {group.examples.map((ex) => (
                  <div class="mb-16 scroll-mt-24" id={ex.anchor} key={ex.anchor}>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                      <code class="text-[0.92em]">{ex.title}</code>
                      {ex.alias ? (
                        <span class="font-normal text-base text-slate-500 dark:text-slate-400">
                          {" "}(alias: <code>{ex.alias}</code>)
                        </span>
                      ) : null}
                    </h3>
                    {ex.blurb && (
                      <p class="text-slate-600 dark:text-slate-300 mb-6 max-w-3xl">
                        {ex.blurb}
                      </p>
                    )}

                    <div class="mb-2 text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                      Example
                    </div>
                    <pre class="overflow-x-auto rounded-xl bg-slate-900 text-slate-100 p-4 text-sm leading-relaxed mb-8"><code class="language-yaml">{demoYaml(ex.demo)}</code></pre>

                    <div class="mb-2 text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
                      Preview
                    </div>
                    <div class="mb-8 rounded-2xl ring-1 ring-slate-200 dark:ring-slate-700 bg-[var(--hb-color-background)] overflow-hidden">
                      {renderBlock(ex.demo, ctx)}
                    </div>
                  </div>
                ))}
              </section>
            ))}

            <div
              class="prose prose-slate lg:prose-xl dark:prose-invert"
              // deno-lint-ignore react-no-danger
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </main>
        </article>
      </div>
    </Frame>
  );
}
