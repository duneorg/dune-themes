/** @jsxImportSource preact */
/**
 * Ports of layouts/_shortcodes/*.html for use in .mdx content.
 * Markup and class names match the upstream shortcodes 1:1.
 */
import { h, Fragment } from "preact";
import type { ComponentChildren } from "preact";

const ASSETS = "/themes/book/static";

/** {{< hint info >}} — blockquote.book-hint.<type> */
export function Hint(
  { type = "default", children }: { type?: string; children?: ComponentChildren },
) {
  return <blockquote class={`book-hint ${type}`}>{children}</blockquote>;
}

/** {{< details "Title" open >}} */
export function Details(
  { title, open = false, children }: {
    title?: string;
    open?: boolean;
    children?: ComponentChildren;
  },
) {
  return (
    <details open={open || undefined}>
      <summary>{title}</summary>
      <div class="markdown-inner">{children}</div>
    </details>
  );
}

let tabsCounter = 0;

/** {{< tabs >}} wrapper — pass <Tab> children. */
export function Tabs({ children }: { children?: ComponentChildren }) {
  const group = `tabs-${++tabsCounter}`;
  const items = (Array.isArray(children) ? children : [children]).filter(Boolean);
  return (
    <div class="book-tabs">
      {items.map((child: any, i: number) => (
        <Fragment key={i}>
          <input
            type="radio"
            class="toggle"
            name={group}
            id={`${group}-${i}`}
            checked={i === 0 || undefined}
          />
          <label for={`${group}-${i}`}>{child?.props?.name ?? `Tab ${i + 1}`}</label>
          <div class="book-tabs-content markdown-inner">{child?.props?.children}</div>
        </Fragment>
      ))}
    </div>
  );
}

/** {{< tab "Name" >}} — only meaningful inside <Tabs>. */
export function Tab({ children }: { name: string; children?: ComponentChildren }) {
  return <Fragment>{children}</Fragment>;
}

/** {{< columns >}} — children should be a markdown list (one item per column). */
export function Columns({ children }: { children?: ComponentChildren }) {
  return <div class="book-columns">{children}</div>;
}

/** {{< button href="..." >}} */
export function Button(
  { href, children }: { href: string; children?: ComponentChildren },
) {
  const isRemote = /^[a-z]+:\/\//.test(href);
  return (
    <a
      href={href}
      class="book-btn"
      {...(isRemote ? { target: "_blank", rel: "noopener" } : {})}
    >
      {children}
    </a>
  );
}

/** {{< steps >}} — numbered steps from an ordered list child. */
export function Steps({ children }: { children?: ComponentChildren }) {
  return <div class="book-steps">{children}</div>;
}

/** {{< katex display >}} — requires the bundled KaTeX assets. */
export function Katex(
  { display = false, children }: { display?: boolean; children?: ComponentChildren },
) {
  const body = display ? <div class="book-katex">{"\\[ "}{children}{" \\]"}</div> : (
    <span class="book-katex">{"\\( "}{children}{" \\)"}</span>
  );
  return (
    <Fragment>
      {body}
      <link rel="stylesheet" href={`${ASSETS}/katex/katex.min.css`} />
      <script defer src={`${ASSETS}/katex/katex.min.js`}></script>
      <script
        defer
        src={`${ASSETS}/katex/auto-render.min.js`}
        {...{
          onload:
            'renderMathInElement(document.body, {"delimiters": [{"left": "$$", "right": "$$", "display": true}, {"left": "\\\\(", "right": "\\\\)", "display": false}, {"left": "\\\\[", "right": "\\\\]", "display": true}]});',
        }}
      >
      </script>
    </Fragment>
  );
}

/** {{< mermaid >}} — diagram source as plain-text children. */
export function Mermaid({ children }: { children?: ComponentChildren }) {
  return (
    <Fragment>
      <pre class="mermaid">{children}</pre>
      <script
        src={`${ASSETS}/mermaid.min.js`}
        {...{
          onload: 'mermaid.initialize({"flowchart": {"useMaxWidth": true}, "theme": "default"});',
        }}
      >
      </script>
    </Fragment>
  );
}
