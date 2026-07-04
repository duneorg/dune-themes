/**
 * MDX components for the Starlight port — the upstream user-components:
 *
 *   <Aside type="tip" title="…">markdown</Aside>
 *   <Badge text="New" variant="tip" size="small" />
 *   <CardGrid stagger><Card title="…" icon="rocket">…</Card></CardGrid>
 *   <LinkCard title="…" description="…" href="/docs/" />
 *   <LinkButton href="/docs/" variant="secondary" icon="right-arrow">Get started</LinkButton>
 *   <Steps>ordered markdown list</Steps>
 *   <Tabs syncKey="pkg"><TabItem label="npm">…</TabItem></Tabs>
 *   <FileTree>nested markdown list; names ending in / are folders</FileTree>
 *   <Icon name="star" color="goldenrod" size="2rem" />
 *
 * (mdx-components.ts does not inherit across themes; child themes must
 * re-export this module.)
 */
import {
  Aside,
  Badge,
  Card,
  CardGrid,
  FileTree,
  Icon,
  LinkButton,
  LinkCard,
  Steps,
  TabItem,
  Tabs,
} from "./components/user-components.tsx";

export default {
  Aside,
  Badge,
  Card,
  CardGrid,
  FileTree,
  Icon,
  LinkButton,
  LinkCard,
  Steps,
  TabItem,
  Tabs,
};

/**
 * Sanitizer allowances for the markup these components emit. Dune's MDX
 * output sanitizer merges this in, so sites don't need `trusted_html: true`
 * for the component set. Scripts, event handlers and unsafe URLs stay
 * blocked either way.
 */
export const sanitize = {
  tags: [
    "aside",
    "article",
    "section",
    "svg",
    "path",
    "starlight-tabs",
    "starlight-tabs-restore",
    "starlight-file-tree",
  ],
  attributes: {
    "*": ["role", "aria-*", "data-*", "tabindex", "hidden"],
    svg: ["viewBox", "width", "height", "fill", "style"],
    path: ["d", "fill", "fill-rule", "clip-rule"],
  },
};
