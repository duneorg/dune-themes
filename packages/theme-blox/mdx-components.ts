/**
 * MDX components for the Blox port — Hugo Blox shortcodes as JSX:
 *
 *   <Callout type="tip">markdown</Callout>
 *   <Button url="/contact" style="outline">Contact</Button>
 *   <InlineIcon name="brands/github" />
 *   <Spoiler text="Show solution">…</Spoiler>
 *   <Video src="/media/demo.mp4" controls />
 *   <Audio src="/media/track.mp3" />
 *
 * (mdx-components.ts does not inherit across themes; child themes must
 * re-export this module.)
 */
import { Audio, Button, Callout, InlineIcon, Spoiler, Video } from "./components/shortcodes.tsx";

export default { Audio, Button, Callout, InlineIcon, Spoiler, Video };

/**
 * Sanitizer allowances for the markup these components emit, so sites don't
 * need `trusted_html: true`. Scripts, event handlers and unsafe URLs stay
 * blocked either way.
 */
export const sanitize = {
  tags: ["svg", "path", "video", "audio", "source"],
  attributes: {
    "*": ["role", "aria-*", "data-*"],
    svg: ["viewBox", "width", "height", "fill", "style"],
    path: ["d", "fill", "fill-rule", "clip-rule", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin"],
    video: ["controls", "autoplay", "loop", "poster", "src"],
    audio: ["controls", "src"],
    source: ["src", "type"],
    span: ["style"],
  },
};
