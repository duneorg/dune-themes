/** @jsxImportSource preact */
/** Ports of _shortcodes/video.html, audio.html, ltr.html, rtl.html,
 * inTextImg.html. */
import { h } from "preact";

export function Video({ src }: any) {
  return <video src={src} controls muted></video>;
}

export function Audio({ src }: any) {
  return <audio src={src} controls muted></audio>;
}

export function Ltr({ children }: any) {
  return <div dir="ltr">{children}</div>;
}

export function Rtl({ children }: any) {
  return <div dir="rtl">{children}</div>;
}

export function InTextImg({ url, height = 15, alt }: any) {
  return <img class="in-text" height={height} src={url} alt={alt} />;
}
