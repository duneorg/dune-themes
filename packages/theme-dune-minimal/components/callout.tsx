/** @jsxImportSource preact */
import { h } from "preact";

/**
 * Simple callout/admonition for MDX content:
 *   <Callout type="warning">Careful with this.</Callout>
 */
export default function Callout({ type = "note", title, children }: any) {
  return (
    <aside class={`callout callout-${type}`} role="note">
      {title && <strong class="callout-title">{title}</strong>}
      <div>{children}</div>
    </aside>
  );
}
