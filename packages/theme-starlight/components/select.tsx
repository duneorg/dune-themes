/** @jsxImportSource preact */
/** Port of components/Select.astro. The label carries an extra `sl-select`
 * class so the descoped styles can target it. */
import { h } from "preact";
import Icon from "./icon.tsx";

export interface SelectOption {
  label: string;
  value: string;
  selected: boolean;
}

export default function Select(
  { label, icon, width, options }: {
    label: string;
    icon: string;
    width?: string;
    options: SelectOption[];
  },
) {
  return (
    <label class="sl-select" style={`--sl-select-width: ${width}`}>
      <span class="sr-only">{label}</span>
      <Icon name={icon} class="icon label-icon" />
      <select autocomplete="off">
        {options.map(({ value, selected, label }) => (
          <option value={value} selected={selected}>{label}</option>
        ))}
      </select>
      <Icon name="down-caret" class="icon caret" />
    </label>
  );
}
