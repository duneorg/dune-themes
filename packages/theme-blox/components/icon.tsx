/** Icon component — renders an Iconify body from the pruned packs. */
import { iconSvg } from "./icons.ts";

export interface IconProps {
  name: string;
  class?: string;
  style?: string;
}

export function Icon({ name, class: cls, style }: IconProps) {
  const icon = iconSvg(name);
  if (!icon) {
    // Upstream falls back to treating bare names as emoji text.
    if (!name.includes("/")) return <span class={cls}>{name}</span>;
    return null;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${icon.size} ${icon.size}`}
      class={cls}
      style={style}
      aria-hidden
      // deno-lint-ignore react-no-danger
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
