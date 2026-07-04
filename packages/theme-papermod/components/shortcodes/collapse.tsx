/** @jsxImportSource preact */
/** Port of _shortcodes/collapse.html. */
import { h } from "preact";

export default function Collapse({ summary, openByDefault, children }: any) {
  return (
    <p>
      <details open={openByDefault === true || undefined}>
        <summary>{summary}</summary>
        {children}
      </details>
    </p>
  );
}
