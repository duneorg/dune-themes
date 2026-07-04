/**
 * PaperMod shortcodes ported to MDX components.
 * Usage in .mdx content:
 *   <Figure src="/img.png" caption="..." align="center" />
 *   <Collapse summary="Details">hidden content</Collapse>
 *   <Video src="/clip.mp4" /> · <Audio src="/clip.mp3" />
 *   <Ltr>…</Ltr> · <Rtl>…</Rtl> · <InTextImg url="/icon.png" />
 */
import Figure from "./components/shortcodes/figure.tsx";
import Collapse from "./components/shortcodes/collapse.tsx";
import { Audio, InTextImg, Ltr, Rtl, Video } from "./components/shortcodes/media.tsx";

export default { Figure, Collapse, Video, Audio, Ltr, Rtl, InTextImg };
