/** @jsxImportSource preact */
/** Ports of Sidebar.astro, SidebarPersister.astro, SidebarRestorePoint.astro
 * and SidebarSublist.astro. Entries come from Dune's navAll page index:
 * a page with child pages becomes a collapsible group (open when it contains
 * the current page) with the page itself as the group's first link. */
import "./custom-elements.ts";
import { Fragment, h } from "preact";
import Icon from "./icon.tsx";
import { navLabel, type NavNode, normalizeRoute } from "../utils/starlight.ts";

function containsCurrent(node: NavNode, current: string): boolean {
  if (normalizeRoute(node.route) === current) return true;
  return node.children.some((c) => containsCurrent(c, current));
}

function SublistLink(
  { node, current, nested }: { node: NavNode; current: string; nested: boolean },
) {
  const isCurrent = normalizeRoute(node.route) === current;
  return (
    <a
      href={node.route}
      aria-current={isCurrent ? "page" : undefined}
      class={!nested ? "large" : undefined}
    >
      <span>{navLabel(node)}</span>
    </a>
  );
}

function Sublist(
  { nodes, current, nested, counter }: {
    nodes: NavNode[];
    current: string;
    nested: boolean;
    counter: { i: number };
  },
) {
  return (
    <ul class={!nested ? "top-level" : undefined}>
      {nodes.map((node) => (
        <li>
          {node.children.length === 0
            ? <SublistLink node={node} current={current} nested={nested} />
            : (
              <details open={containsCurrent(node, current)}>
                <summary>
                  <span class="group-label">
                    <span class="large">{navLabel(node)}</span>
                  </span>
                  <Icon name="right-caret" class="caret" size="1.25rem" />
                </summary>
                <sl-sidebar-restore data-index={counter.i++} />
                <ul>
                  <li>
                    <SublistLink node={node} current={current} nested={true} />
                  </li>
                  <Sublist
                    nodes={node.children}
                    current={current}
                    nested={true}
                    counter={counter}
                  />
                </ul>
              </details>
            )}
        </li>
      ))}
    </ul>
  );
}

/** Inline scripts from SidebarPersister.astro — must run before/after the
 * tree renders (ahead of starlight.js at the end of body). */
const RESTORE_SETUP_JS = `(() => {
	try {
		if (!matchMedia('(min-width: 50em)').matches) return;
		const target = document.querySelector('sl-sidebar-state-persist');
		const state = JSON.parse(sessionStorage.getItem('sl-sidebar-state') || '0');
		if (!target || !state || target.dataset.hash !== state.hash) return;
		window._starlightScrollRestore = state.scroll;
		customElements.define(
			'sl-sidebar-restore',
			class SidebarRestore extends HTMLElement {
				connectedCallback() {
					try {
						const idx = parseInt(this.dataset.index || '');
						const details = this.closest('details');
						if (details && typeof state.open[idx] === 'boolean') details.open = state.open[idx];
					} catch {}
				}
			}
		);
	} catch {}
})();`;

const RESTORE_SCROLL_JS = `(() => {
	const scroller = document.getElementById('starlight__sidebar');
	if (!window._starlightScrollRestore || !scroller) return;
	scroller.scrollTop = window._starlightScrollRestore;
	delete window._starlightScrollRestore;
})();`;

function hashTree(nodes: NavNode[]): string {
  // Stand-in for upstream getSidebarHash: stable across renders of the
  // same sidebar so persisted open/closed state can be matched.
  const routes: string[] = [];
  const walk = (list: NavNode[]) => {
    for (const n of list) {
      routes.push(n.route);
      walk(n.children);
    }
  };
  walk(nodes);
  let hash = 0;
  const s = routes.join("|");
  for (let i = 0; i < s.length; i++) {
    hash = (hash * 31 + s.charCodeAt(i)) | 0;
  }
  return hash.toString(36);
}

export default function Sidebar(
  { tree, current, mobileFooter }: {
    tree: NavNode[];
    current: string;
    mobileFooter?: preact.ComponentChildren;
  },
) {
  const counter = { i: 0 };
  return (
    <Fragment>
      <sl-sidebar-state-persist data-hash={hashTree(tree)}>
        <script
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: RESTORE_SETUP_JS }}
        />
        <Sublist nodes={tree} current={current} nested={false} counter={counter} />
        <script
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: RESTORE_SCROLL_JS }}
        />
      </sl-sidebar-state-persist>
      <div class="md:sl-hidden">
        {mobileFooter}
      </div>
    </Fragment>
  );
}
