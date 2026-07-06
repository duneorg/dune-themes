/**
 * Landing template — port of home.html / landing_page.html.
 * Renders the page's `sections:` frontmatter through the block registry.
 * Collection blocks reference entries of the page's `collections:` map
 * via `content.collection: <name>`.
 */
import type { TemplateProps } from "@dune/core/content/types";
import Layout from "../components/layout.tsx";
import { type BlockDef, renderBlock } from "../components/blocks.tsx";

export default function LandingTemplate(props: TemplateProps) {
  const t = (props as unknown as { t?: (k: string) => string }).t ?? ((k: string) => k);
  const fm = props.page.frontmatter as Record<string, unknown>;
  const sections = Array.isArray(fm.sections) ? fm.sections as BlockDef[] : [];
  const Frame = (props.Layout ?? Layout) as typeof Layout;

  return (
    <Frame {...props} isLanding>
      {sections.map((block, i) => (
        <div key={block.id ?? i}>{renderBlock(block, { props, t })}</div>
      ))}
    </Frame>
  );
}
