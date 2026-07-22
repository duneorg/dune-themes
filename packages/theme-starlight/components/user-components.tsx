/** @jsxImportSource preact */
/**
 * Ports of the Starlight user-components (usable from .mdx content):
 * Aside, Badge, Card, CardGrid, Icon, LinkButton, LinkCard, Steps,
 * Tabs/TabItem, FileTree. Steps/Tabs/FileTree transform their children as
 * vnodes instead of upstream's rehype passes over rendered slot HTML.
 */
import "./custom-elements.ts";
import { cloneElement, type ComponentChildren, h, toChildArray, type VNode } from "preact";
import Icon from "./icon.tsx";
import { Icons } from "./icons.ts";
import { safeHref } from "../utils/safe-url.ts";
export { default as Icon } from "./icon.tsx";
export { default as LinkButton } from "./link-button.tsx";

const asideIcons: Record<string, string> = {
  note: "information",
  tip: "rocket",
  caution: "warning",
  danger: "error",
};
const asideLabels: Record<string, string> = {
  note: "Note",
  tip: "Tip",
  caution: "Caution",
  danger: "Danger",
};

export function Aside(
  { type = "note", title, icon, children }: {
    type?: "note" | "tip" | "caution" | "danger";
    title?: string;
    icon?: string;
    children?: ComponentChildren;
  },
) {
  const label = title ?? asideLabels[type] ?? type;
  return (
    <aside aria-label={label} class={`starlight-aside starlight-aside--${type}`}>
      <p class="starlight-aside__title" aria-hidden="true">
        <Icon name={icon ?? asideIcons[type] ?? "information"} class="starlight-aside__icon" />
        {label}
      </p>
      <div class="starlight-aside__content">{children}</div>
    </aside>
  );
}

export function Badge(
  { text, variant = "default", size = "small", class: cls, ...attrs }: {
    text: string;
    variant?: string;
    size?: string;
    class?: string;
    [key: string]: unknown;
  },
) {
  const classes = ["sl-badge", variant, size, cls].filter(Boolean).join(" ");
  return <span class={classes} {...attrs}>{text}</span>;
}

export function Card(
  { icon, title, children }: { icon?: string; title: string; children?: ComponentChildren },
) {
  return (
    <article class="card sl-flex">
      <p class="title sl-flex">
        {icon && <Icon name={icon} class="icon" size="1.333em" />}
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </p>
      <div class="body">{children}</div>
    </article>
  );
}

export function CardGrid(
  { stagger = false, children }: { stagger?: boolean; children?: ComponentChildren },
) {
  return <div class={stagger ? "card-grid stagger" : "card-grid"}>{children}</div>;
}

export function LinkCard(
  { title, description, href, ...attributes }: {
    title: string;
    description?: string;
    href?: string;
    [key: string]: unknown;
  },
) {
  return (
    <div class="sl-link-card">
      <span class="sl-flex stack">
        <a href={safeHref(href)} {...attributes}>
          <span class="title" dangerouslySetInnerHTML={{ __html: title }} />
        </a>
        {description && (
          <span class="description" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </span>
      <Icon name="right-arrow" size="1.333em" class="icon rtl:flip" />
    </div>
  );
}

/** Wraps the contained ordered list with the sl-steps class (upstream
 * rehype-steps equivalent). */
export function Steps({ children }: { children?: ComponentChildren }) {
  const kids = toChildArray(children as never);
  const ol = kids.find(
    (k) => typeof k === "object" && k !== null && (k as VNode).type === "ol",
  ) as VNode<Record<string, unknown>> | undefined;
  if (ol) {
    const existing = (ol.props.class as string) ?? "";
    return cloneElement(ol, {
      class: existing ? `${existing} sl-steps` : "sl-steps",
      role: "list",
    });
  }
  return <ol class="sl-steps" role="list">{children}</ol>;
}

let tabCount = 0;

/** Marker component consumed by <Tabs>; renders nothing on its own. */
export function TabItem(
  _props: { label: string; icon?: string; children?: ComponentChildren },
) {
  return null;
}

export function Tabs(
  { syncKey, children }: { syncKey?: string; children?: ComponentChildren },
) {
  const items = toChildArray(children as never).filter(
    (k): k is VNode<Record<string, unknown>> =>
      typeof k === "object" && k !== null &&
      (k as VNode<Record<string, unknown>>).props?.label != null,
  );
  const entries = items.map((item) => {
    const count = ++tabCount;
    return {
      label: String(item.props.label),
      icon: item.props.icon as string | undefined,
      tabId: `tab-${count}`,
      panelId: `tab-panel-${count}`,
      children: item.props.children,
    };
  });
  return (
    <starlight-tabs data-sync-key={syncKey}>
      <div class="tablist-wrapper not-content">
        <ul role="tablist">
          {entries.map((entry, idx) => (
            <li role="presentation" class="tab">
              <a
                role="tab"
                href={"#" + entry.panelId}
                id={entry.tabId}
                aria-selected={idx === 0 ? "true" : "false"}
                tabindex={idx !== 0 ? -1 : 0}
              >
                {entry.icon && <Icon name={entry.icon} />}
                {entry.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {entries.map((entry, idx) => (
        <section
          id={entry.panelId}
          aria-labelledby={entry.tabId}
          role="tabpanel"
          hidden={idx !== 0}
        >
          {entry.children}
        </section>
      ))}
      {syncKey !== undefined && <starlight-tabs-restore />}
    </starlight-tabs>
  );
}

/* === FileTree ===
 * Vnode equivalent of rehype-file-tree.ts: a nested unordered list where
 * names ending in `/` (or containing a nested list) are directories, `...`
 * is a placeholder, and bold names are highlighted. Uses the generic seti
 * folder/file icons (the per-extension icon map is not ported). */

const FOLDER_ICON =
  '<path d="M22.073 4.900L22.073 4.900L12.148 4.900L12.148 3.950Q12.148 3.125 11.585 2.563Q11.023 2 10.198 2L10.198 2L0.048 2L0.048 22L23.948 22L23.948 6.850Q23.998 6.025 23.448 5.462Q22.898 4.900 22.073 4.900Z"/>';
const FILE_ICON =
  '<path d="M1.082 16.876L1.082 14.014L22.918 14.014L22.918 16.876L1.082 16.876ZM1.082 9.986L1.082 7.071L13.272 7.071L13.272 9.986L1.082 9.986ZM1.082 3.096L1.082 0.181L22.918 0.181L22.918 3.096L1.082 3.096ZM1.082 23.819L1.082 20.904L17.300 20.904L17.300 23.819L1.082 23.819Z"/>';

function TreeIcon({ dir }: { dir: boolean }) {
  return (
    <span>
      {dir && <span class="sr-only">Directory</span>}
      <svg
        class="tree-icon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        dangerouslySetInnerHTML={{ __html: dir ? FOLDER_ICON : FILE_ICON }}
      />
    </span>
  );
}

function vnodeText(node: unknown): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(vnodeText).join("");
  const vn = node as VNode<Record<string, unknown>>;
  return vnodeText(vn.props?.children);
}

function TreeEntry({ li }: { li: VNode<Record<string, unknown>> }) {
  const kids = toChildArray(li.props.children as never);
  const subTreeIndex = kids.findIndex(
    (k) => typeof k === "object" && (k as VNode).type === "ul",
  );
  const subTree = subTreeIndex > -1
    ? kids[subTreeIndex] as VNode<Record<string, unknown>>
    : null;
  const inline = subTreeIndex > -1 ? kids.slice(0, subTreeIndex) : kids;

  // First inline child is the name; a leading text node may also carry an
  // inline comment after the first space.
  let name: unknown = inline[0];
  let comment: unknown[] = inline.slice(1);
  const isHighlighted = typeof name === "object" && (name as VNode).type === "strong";
  if (typeof name === "string") {
    const [filename, ...fragments] = name.split(" ");
    name = filename;
    const text = fragments.join(" ").trim();
    if (text) comment = [text, ...comment];
  }
  const nameText = vnodeText(name);
  const isDirectory = /\/\s*$/.test(nameText) || subTree !== null;
  const isPlaceholder = /^\s*(\.{3}|…)\s*$/.test(nameText);

  const entry = (
    <span class="tree-entry">
      <span class={isHighlighted ? "highlight" : ""}>
        {!isPlaceholder && <TreeIcon dir={isDirectory} />}
        {name as never}
      </span>
      {comment.length > 0 && <span class="comment">{comment as never}</span>}
    </span>
  );

  if (isDirectory) {
    const contents = subTree
      ? <TreeList ul={subTree} />
      : <ul><li class="file empty">…</li></ul>;
    return (
      <li class="directory">
        <details open={subTree !== null}>
          <summary>{entry}</summary>
          {contents}
        </details>
      </li>
    );
  }
  return <li class={isPlaceholder ? "file empty" : "file"}>{entry}</li>;
}

function TreeList({ ul }: { ul: VNode<Record<string, unknown>> }) {
  const items = toChildArray(ul.props.children as never).filter(
    (k): k is VNode<Record<string, unknown>> =>
      typeof k === "object" && (k as VNode).type === "li",
  );
  return (
    <ul>
      {items.map((li) => <TreeEntry li={li} />)}
    </ul>
  );
}

export function FileTree({ children }: { children?: ComponentChildren }) {
  const ul = toChildArray(children as never).find(
    (k) => typeof k === "object" && (k as VNode).type === "ul",
  ) as VNode<Record<string, unknown>> | undefined;
  return (
    <starlight-file-tree class="not-content" data-pagefind-ignore>
      {ul ? <TreeList ul={ul} /> : children as never}
    </starlight-file-tree>
  );
}
