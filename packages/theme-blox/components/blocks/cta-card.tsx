import { inlineMarkdown, linkTarget, markdownBlock, str } from "../../utils/blox.ts";
import { safeHref } from "../../utils/safe-url.ts";

// ── cta-card ────────────────────────────────────────────────────────────────

export function CtaCard(
  { content, design }: { content: Record<string, unknown>; design: Record<string, unknown> },
) {
  const card = (design.card ?? {}) as Record<string, unknown>;
  const cardClass = str(card.css_class);
  const cardStyle = str(card.css_style);

  let textColorMode = str(card.text_color).toLowerCase();
  if (!["light", "dark"].includes(textColorMode)) {
    const looksColored = cardClass.includes("bg-gradient") ||
      /\bbg-(primary|secondary|violet|indigo|blue|purple|pink|fuchsia|rose|red|orange|amber|emerald|teal|cyan|sky)-[4-9]\d{0,2}\b/
        .test(cardClass) ||
      /\bfrom-(primary|secondary|violet|indigo|blue|purple|pink|fuchsia|rose|red|orange|amber|emerald|teal|cyan|sky)-[4-9]/
        .test(cardClass);
    textColorMode = looksColored ? "light" : "dark";
  }

  const titleClasses = textColorMode === "light" ? "text-white" : "text-gray-900 dark:text-white";
  const bodyClasses = textColorMode === "light" ? "text-white/80" : "text-gray-700 dark:text-gray-300";
  const buttonBgClasses = textColorMode === "light"
    ? "bg-white ring-1 ring-white/40 hover:bg-white/95 hover:ring-white/60 shadow-lg"
    : "bg-gray-900 dark:bg-white ring-1 ring-gray-900/10 dark:ring-white/10 hover:bg-gray-800 dark:hover:bg-gray-100 shadow-lg";
  const buttonTextClasses = textColorMode === "light" ? "text-gray-900" : "text-white dark:text-gray-900";

  const button = (content.button ?? {}) as Record<string, unknown>;
  const buttonText = str(button.text);
  const buttonUrl = safeHref(button.url) ?? "";

  const defaultBgClass = "bg-gradient-to-br from-primary-500/90 via-primary-600/95 to-primary-700/90";
  const finalCardClass = cardClass || defaultBgClass;

  return (
    <div
      class={`relative overflow-hidden ${finalCardClass} p-8 sm:p-12 lg:p-16 xl:p-20 mx-auto max-w-6xl rounded-3xl shadow-2xl flex flex-col items-center text-center`}
      style={`--glassmorphism-opacity: 0.15; ${cardStyle}`}
    >
      {str(content.title) && (
        <h2
          class={`${titleClasses} text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight`}
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: inlineMarkdown(str(content.title)) }}
        />
      )}
      {str(content.text) && (
        <div
          class={`${bodyClasses} mt-6 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light`}
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: markdownBlock(str(content.text)) }}
        />
      )}
      {buttonText && buttonUrl && (
        <div class="flex mt-10">
          <a
            href={buttonUrl}
            {...linkTarget(buttonUrl)}
            class={`group inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-semibold ${buttonBgClasses} ${buttonTextClasses} transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
          >
            <span>{buttonText}</span>
          </a>
        </div>
      )}
    </div>
  );
}
