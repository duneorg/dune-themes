/** @jsxImportSource preact */
/** Port of layouts/_partials/toc.html — <details class="toc"> with a
 * nested list. Upstream builds nesting with regex gymnastics over the
 * rendered HTML; here headings are pre-extracted (utils/content.ts) and
 * the nesting is built recursively. */
import { h } from "preact";
import type { Heading } from "../utils/content.ts";

interface Node {
  heading: Heading;
  children: Node[];
}

function buildTree(headings: Heading[]): Node[] {
  const roots: Node[] = [];
  const stack: Node[] = [];
  for (const heading of headings) {
    const node: Node = { heading, children: [] };
    while (stack.length && stack[stack.length - 1].heading.level >= heading.level) {
      stack.pop();
    }
    if (stack.length) stack[stack.length - 1].children.push(node);
    else roots.push(node);
    stack.push(node);
  }
  return roots;
}

function List({ nodes }: { nodes: Node[] }) {
  return (
    <ul>
      {nodes.map((n) => (
        <li key={n.heading.id}>
          <a href={`#${n.heading.id}`} aria-label={n.heading.text}>{n.heading.text}</a>
          {n.children.length > 0 && <List nodes={n.children} />}
        </li>
      ))}
    </ul>
  );
}

export default function Toc({ headings, open = false, t }: any) {
  const tr = t ?? ((k: string) => k);
  if (!headings?.length) return null;
  return (
    <details class="toc" open={open || undefined}>
      <summary accesskey="c" title="(Alt + C)">
        <span class="title">{tr("toc")}</span>
      </summary>
      <div class="inner">
        <List nodes={buildTree(headings)} />
      </div>
    </details>
  );
}
