/**
 * MDX components — ports of the Hugo Blox shortcodes most used in content:
 *
 *   <Callout type="warning">markdown</Callout>
 *   <Button url="/contact" style="outline" size="lg" icon="arrow-right">Learn more</Button>
 *   <InlineIcon name="brands/github" />
 *   <Spoiler text="Click to reveal">hidden content</Spoiler>
 *   <Video src="/media/demo.mp4" controls />
 *   <Audio src="/media/track.mp3" />
 */
import type { ComponentChildren } from "preact";
import { Icon } from "./icon.tsx";

// ── Callout ─────────────────────────────────────────────────────────────────

interface CalloutStyle {
  icon: string;
  class: string;
  textClass: string;
  borderClass: string;
}

const CALLOUTS: Record<string, CalloutStyle> = {
  note: { icon: "pencil", class: "bg-blue-100 dark:bg-blue-900", textClass: "text-blue-600 dark:text-blue-300", borderClass: "border-blue-500" },
  abstract: { icon: "clipboard-document-list", class: "bg-cyan-100 dark:bg-cyan-900", textClass: "text-cyan-600 dark:text-cyan-300", borderClass: "border-cyan-500" },
  summary: { icon: "clipboard-document-list", class: "bg-cyan-100 dark:bg-cyan-900", textClass: "text-cyan-600 dark:text-cyan-300", borderClass: "border-cyan-500" },
  info: { icon: "information-circle", class: "bg-blue-100 dark:bg-blue-900", textClass: "text-blue-600 dark:text-blue-300", borderClass: "border-blue-500" },
  todo: { icon: "check-circle", class: "bg-blue-100 dark:bg-blue-900", textClass: "text-blue-600 dark:text-blue-300", borderClass: "border-blue-500" },
  tip: { icon: "light-bulb", class: "bg-emerald-100 dark:bg-emerald-900", textClass: "text-emerald-600 dark:text-emerald-300", borderClass: "border-emerald-500" },
  success: { icon: "check-circle", class: "bg-green-100 dark:bg-green-900", textClass: "text-green-600 dark:text-green-300", borderClass: "border-green-500" },
  question: { icon: "question-mark-circle", class: "bg-yellow-100 dark:bg-yellow-900", textClass: "text-yellow-700 dark:text-yellow-300", borderClass: "border-yellow-500" },
  warning: { icon: "exclamation-triangle", class: "bg-orange-100 dark:bg-orange-900", textClass: "text-orange-600 dark:text-orange-300", borderClass: "border-orange-500" },
  failure: { icon: "x-circle", class: "bg-red-100 dark:bg-red-900", textClass: "text-red-600 dark:text-red-300", borderClass: "border-red-500" },
  danger: { icon: "exclamation-triangle", class: "bg-red-100 dark:bg-red-900", textClass: "text-red-600 dark:text-red-300", borderClass: "border-red-500" },
  bug: { icon: "bug-ant", class: "bg-red-100 dark:bg-red-900", textClass: "text-red-600 dark:text-red-300", borderClass: "border-red-500" },
  example: { icon: "beaker", class: "bg-purple-100 dark:bg-purple-900", textClass: "text-purple-600 dark:text-purple-300", borderClass: "border-purple-500" },
  quote: { icon: "chat-bubble-left-right", class: "bg-gray-100 dark:bg-gray-800", textClass: "text-gray-600 dark:text-gray-300", borderClass: "border-gray-500" },
  important: { icon: "exclamation-circle", class: "bg-purple-100 dark:bg-purple-900", textClass: "text-purple-600 dark:text-purple-300", borderClass: "border-purple-500" },
  caution: { icon: "exclamation-triangle", class: "bg-red-100 dark:bg-red-900", textClass: "text-red-600 dark:text-red-300", borderClass: "border-red-500" },
};

export function Callout(
  { type = "note", title, children }: { type?: string; title?: string; children?: ComponentChildren },
) {
  const cfg = CALLOUTS[type.toLowerCase()] ?? CALLOUTS.note;
  const heading = title ?? type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <div
      class={`callout flex px-4 py-3 mb-6 rounded-md border-l-4 ${cfg.class} ${cfg.borderClass}`}
      data-callout={type}
    >
      <span class={`callout-icon pr-3 pt-1 ${cfg.textClass}`}>
        <Icon name={cfg.icon} class="h-6 w-6" />
      </span>
      <div class="callout-content dark:text-neutral-300">
        <div class="callout-title font-semibold mb-1">{heading}</div>
        <div class="callout-body">{children}</div>
      </div>
    </div>
  );
}

// ── Button ──────────────────────────────────────────────────────────────────

const BUTTON_BASE =
  "inline-flex items-center gap-2 font-medium no-underline transition-all duration-300 ease-out transform-gpu focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900";

const BUTTON_STYLES: Record<string, string> = {
  primary:
    "bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5 hover:scale-[1.02] focus:ring-primary-500/50",
  secondary:
    "bg-gradient-to-br from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white shadow-lg shadow-secondary-500/25 hover:shadow-xl hover:shadow-secondary-500/30 hover:scale-105 focus:ring-secondary-500/50",
  outline:
    "bg-white dark:bg-zinc-900 border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:border-primary-600 shadow-md hover:shadow-lg hover:scale-105 focus:ring-primary-500/50",
  ghost:
    "bg-transparent text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/50 hover:scale-105 focus:ring-primary-500/50",
};

const BUTTON_SIZES: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
};

const BUTTON_ROUNDED: Record<string, string> = {
  sm: "rounded",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  full: "rounded-full",
};

const BUTTON_ALIGN: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Button(props: {
  url: string;
  text?: string;
  new_tab?: boolean;
  style?: string;
  size?: string;
  align?: string;
  icon?: string;
  icon_position?: string;
  rounded?: string;
  children?: ComponentChildren;
}) {
  const external = /^https?:\/\//.test(props.url);
  const newTab = props.new_tab === true;
  const iconEl = props.icon ? <span class="flex-shrink-0"><Icon name={props.icon} class="w-4 h-4" /></span> : null;
  return (
    <div class={BUTTON_ALIGN[props.align ?? "left"] ?? "text-left"}>
      <a
        href={props.url}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? (external ? "noopener noreferrer" : "noopener") : external ? "noreferrer" : undefined}
        class={`${BUTTON_BASE} ${BUTTON_STYLES[props.style ?? "primary"] ?? BUTTON_STYLES.primary} ${
          BUTTON_SIZES[props.size ?? "md"] ?? BUTTON_SIZES.md
        } ${BUTTON_ROUNDED[props.rounded ?? "md"] ?? BUTTON_ROUNDED.md}`}
        role="button"
      >
        {(props.icon_position ?? "left") === "left" && iconEl}
        <span>{props.text ?? props.children}</span>
        {props.icon_position === "right" && iconEl}
      </a>
    </div>
  );
}

// ── InlineIcon ──────────────────────────────────────────────────────────────

export function InlineIcon(
  { name, padding_left, padding_right = 1 }: {
    name: string;
    padding_left?: number;
    padding_right?: number;
  },
) {
  return (
    <span
      class={`inline-block ${padding_left ? `pl-${padding_left}` : ""} ${
        padding_right ? `pr-${padding_right}` : ""
      }`}
    >
      <Icon name={name} class="inline-block" style="height: 1em; transform: translateY(0.1em);" />
    </span>
  );
}

// ── Spoiler ─────────────────────────────────────────────────────────────────

export function Spoiler(
  { text, class: cls, children }: { text: string; class?: string; children?: ComponentChildren },
) {
  return (
    <details class={`spoiler ${cls ?? ""}`}>
      <summary class="cursor-pointer">{text}</summary>
      <div class="rounded-lg bg-neutral-50 dark:bg-neutral-800 p-2">{children}</div>
    </details>
  );
}

// ── Video / Audio ───────────────────────────────────────────────────────────

export function Video(
  { src, poster, controls, id }: { src: string; poster?: string; controls?: boolean; id?: string },
) {
  const ext = src.split(".").pop() ?? "mp4";
  return (
    <video
      controls={controls}
      autoplay={!controls}
      loop={!controls}
      poster={poster}
      id={id ? `video-${id}` : undefined}
    >
      <source src={src} type={`video/${ext}`} />
    </video>
  );
}

export function Audio({ src, id }: { src: string; id?: string }) {
  const ext = (src.split(".").pop() ?? "mp3").toLowerCase().replace("mp3", "mpeg");
  return (
    <audio controls id={id ? `audio-${id}` : undefined}>
      <source src={src} type={`audio/${ext}`} />
    </audio>
  );
}
