import { inlineMarkdown, markdownBlock, str } from "../../utils/blox.ts";

export function MarkdownBlock({ content }: { content: Record<string, unknown> }) {
  const title = str(content.title);
  const text = str(content.text);
  return (
    <div class="flex flex-col items-center max-w-prose mx-auto gap-3 justify-center px-6">
      {title && (
        <div
          class="mb-6 text-3xl font-bold text-gray-900 dark:text-white"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(title) }}
        />
      )}
      {text && (
        <div
          class="prose prose-slate lg:prose-xl dark:prose-invert max-w-prose"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: markdownBlock(text) }}
        />
      )}
    </div>
  );
}
