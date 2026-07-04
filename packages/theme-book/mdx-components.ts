/**
 * hugo-book shortcodes ported to MDX components.
 * Usage in .mdx content (no import needed — registered globally):
 *   <Hint type="info">…</Hint>
 *   <Details title="Expand" open>…</Details>
 *   <Tabs><Tab name="One">…</Tab><Tab name="Two">…</Tab></Tabs>
 *   <Columns>markdown list, one item per column</Columns>
 *   <Button href="/docs">Read</Button> · <Steps>ordered list</Steps>
 *   <Katex display>…</Katex> · <Mermaid>graph LR; A --> B</Mermaid>
 *
 * (mdx-components.ts does not inherit across themes; child themes must
 * re-export this module.)
 */
import {
  Button,
  Columns,
  Details,
  Hint,
  Katex,
  Mermaid,
  Steps,
  Tab,
  Tabs,
} from "./components/shortcodes/index.tsx";

export default { Hint, Details, Tabs, Tab, Columns, Button, Steps, Katex, Mermaid };
